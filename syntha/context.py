"""
Context Mesh - The heart of Syntha's shared knowledge system.

Stores context as key-value pairs with subscriber-based access control
and optional time-to-live (TTL) functionality.
"""

import time
from typing import Any, Dict, List, Optional, Union
from threading import Lock


class ContextItem:
    """Represents a single context item with value, subscribers, and TTL."""
    
    def __init__(
        self, 
        value: Any, 
        subscribers: List[str] = None, 
        ttl: Optional[float] = None
    ):
        self.value = value
        self.subscribers = subscribers or []  # Empty list = global context
        self.created_at = time.time()
        self.ttl = ttl
        
    def is_expired(self) -> bool:
        """Check if this context item has expired."""
        if self.ttl is None:
            return False
        return time.time() > (self.created_at + self.ttl)
    
    def is_accessible_by(self, agent_name: str) -> bool:
        """Check if the given agent can access this context item."""
        if self.is_expired():
            return False
        # Empty subscribers list means global context
        return len(self.subscribers) == 0 or agent_name in self.subscribers


class ContextMesh:
    """
    The core context sharing system for Syntha.
    
    Manages shared knowledge space where agents can push and retrieve context
    with subscriber-based access control and optional TTL.
    """
    
    def __init__(self, enable_indexing: bool = True, auto_cleanup: bool = True):
        self._data: Dict[str, ContextItem] = {}
        self._lock = Lock()  # Thread safety for concurrent access
        
        # Performance optimizations (controlled by simple flags)
        self.enable_indexing = enable_indexing
        self.auto_cleanup = auto_cleanup
        
        # Agent-based indexes for faster lookups (only if indexing enabled)
        self._agent_index: Dict[str, List[str]] = {} if enable_indexing else None
        self._global_keys: List[str] = [] if enable_indexing else None
        
        # Cleanup tracking
        self._last_cleanup = time.time()
        self._cleanup_interval = 300  # 5 minutes
    
    def push(
        self, 
        key: str, 
        value: Any, 
        subscribers: List[str] = None, 
        ttl: Optional[float] = None
    ) -> None:
        """
        Add or update context in the mesh.
        
        Args:
            key: Unique identifier for the context
            value: The context data (can be any serializable type)
            subscribers: List of agent names that can access this context.
                        Empty list means global context (accessible by all).
            ttl: Time-to-live in seconds. None means no expiration.
        """
        with self._lock:
            # Auto-cleanup if enabled and interval passed
            if self.auto_cleanup and time.time() - self._last_cleanup > self._cleanup_interval:
                self._cleanup_expired()
            
            # Remove old index entries if updating
            if key in self._data and self.enable_indexing:
                self._remove_from_index(key, self._data[key])
            
            # Store the context item
            self._data[key] = ContextItem(value, subscribers, ttl)
            
            # Update indexes if enabled
            if self.enable_indexing:
                self._add_to_index(key, subscribers or [])
    
    def get(self, key: str, agent_name: Optional[str] = None) -> Optional[Any]:
        """
        Retrieve a specific context item.
        
        Args:
            key: The context key to retrieve
            agent_name: Name of the requesting agent (for access control)
            
        Returns:
            The context value if accessible, None otherwise
        """
        with self._lock:
            item = self._data.get(key)
            if item is None:
                return None
                
            # If no agent specified, skip access control (for system use)
            if agent_name is None:
                return item.value if not item.is_expired() else None
                
            # Check if agent has access
            if item.is_accessible_by(agent_name):
                return item.value
                
            return None
    
    def get_all_for_agent(self, agent_name: str) -> Dict[str, Any]:
        """
        Retrieve all context items accessible by the specified agent.
        
        Args:
            agent_name: Name of the requesting agent
            
        Returns:
            Dictionary of {key: value} for all accessible context
        """
        with self._lock:
            # Auto-cleanup if enabled
            if self.auto_cleanup and time.time() - self._last_cleanup > self._cleanup_interval:
                self._cleanup_expired()
            
            # Use index for faster lookup if enabled
            if self.enable_indexing:
                result = {}
                
                # Get keys from agent index
                agent_keys = self._agent_index.get(agent_name, [])
                for key in agent_keys:
                    item = self._data.get(key)
                    if item and item.is_accessible_by(agent_name):
                        result[key] = item.value
                
                # Get global context keys
                for key in self._global_keys:
                    item = self._data.get(key)
                    if item and item.is_accessible_by(agent_name):
                        result[key] = item.value
                
                return result
            else:
                # Fallback to full scan
                result = {}
                for key, item in self._data.items():
                    if item.is_accessible_by(agent_name):
                        result[key] = item.value
                return result
    
    def get_keys_for_agent(self, agent_name: str) -> List[str]:
        """
        Get list of context keys accessible by the specified agent.
        
        Args:
            agent_name: Name of the requesting agent
            
        Returns:
            List of accessible context keys
        """
        with self._lock:
            # Use index for faster lookup if enabled
            if self.enable_indexing:
                keys = []
                
                # Get keys from agent index
                agent_keys = self._agent_index.get(agent_name, [])
                for key in agent_keys:
                    item = self._data.get(key)
                    if item and item.is_accessible_by(agent_name):
                        keys.append(key)
                
                # Get global context keys
                for key in self._global_keys:
                    item = self._data.get(key)
                    if item and item.is_accessible_by(agent_name):
                        keys.append(key)
                
                return keys
            else:
                # Fallback to full scan
                return [
                    key for key, item in self._data.items() 
                    if item.is_accessible_by(agent_name)
                ]
    
    def remove(self, key: str) -> bool:
        """
        Remove a context item from the mesh.
        
        Args:
            key: The context key to remove
            
        Returns:
            True if item was removed, False if it didn't exist
        """
        with self._lock:
            return self._data.pop(key, None) is not None
    
    def cleanup_expired(self) -> int:
        """
        Remove all expired context items.
        
        Returns:
            Number of items removed
        """
        with self._lock:
            expired_keys = [
                key for key, item in self._data.items() 
                if item.is_expired()
            ]
            for key in expired_keys:
                del self._data[key]
            return len(expired_keys)
    
    def clear(self) -> None:
        """Remove all context items from the mesh."""
        with self._lock:
            self._data.clear()
    
    def size(self) -> int:
        """Get the total number of context items."""
        with self._lock:
            return len(self._data)
    
    def get_stats(self) -> Dict[str, Any]:
        """
        Get statistics about the context mesh.
        
        Returns:
            Dictionary with mesh statistics
        """
        with self._lock:
            total_items = len(self._data)
            expired_items = sum(1 for item in self._data.values() if item.is_expired())
            global_items = sum(1 for item in self._data.values() if len(item.subscribers) == 0 and not item.is_expired())
            active_items = total_items - expired_items
            
            return {
                "total_items": total_items,
                "active_items": active_items,
                "expired_items": expired_items,
                "global_items": global_items,
                "private_items": active_items - global_items
            }
    
    def _add_to_index(self, key: str, subscribers: List[str]) -> None:
        """Add a key to the appropriate indexes."""
        if not self.enable_indexing:
            return
        
        if not subscribers:  # Global context
            if key not in self._global_keys:
                self._global_keys.append(key)
        else:
            # Add to each subscriber's index
            for agent in subscribers:
                if agent not in self._agent_index:
                    self._agent_index[agent] = []
                if key not in self._agent_index[agent]:
                    self._agent_index[agent].append(key)
    
    def _remove_from_index(self, key: str, item: ContextItem) -> None:
        """Remove a key from all indexes."""
        if not self.enable_indexing:
            return
        
        # Remove from global index
        if key in self._global_keys:
            self._global_keys.remove(key)
        
        # Remove from agent indexes
        for agent in item.subscribers:
            if agent in self._agent_index and key in self._agent_index[agent]:
                self._agent_index[agent].remove(key)
                # Clean up empty agent indexes
                if not self._agent_index[agent]:
                    del self._agent_index[agent]
    
    def _cleanup_expired(self) -> None:
        """Internal method to clean up expired items and update indexes."""
        if not self.auto_cleanup:
            return
        
        expired_keys = [
            key for key, item in self._data.items() 
            if item.is_expired()
        ]
        
        for key in expired_keys:
            item = self._data[key]
            # Remove from indexes
            if self.enable_indexing:
                self._remove_from_index(key, item)
            # Remove from data
            del self._data[key]
        
        self._last_cleanup = time.time()
    
    def enable_performance_mode(self, indexing: bool = True, auto_cleanup: bool = True) -> None:
        """
        Enable or disable performance optimizations.
        
        Args:
            indexing: Enable agent-based indexing for faster lookups
            auto_cleanup: Enable automatic cleanup of expired items
        """
        with self._lock:
            # Update indexing
            if indexing and not self.enable_indexing:
                # Build indexes from scratch
                self.enable_indexing = True
                self._agent_index = {}
                self._global_keys = []
                
                for key, item in self._data.items():
                    if not item.is_expired():
                        self._add_to_index(key, item.subscribers)
                        
            elif not indexing and self.enable_indexing:
                # Disable indexing
                self.enable_indexing = False
                self._agent_index = None
                self._global_keys = None
            
            self.auto_cleanup = auto_cleanup
    
    def get_performance_stats(self) -> Dict[str, Any]:
        """
        Get performance-related statistics.
        
        Returns:
            Dictionary with performance metrics
        """
        with self._lock:
            stats = {
                "indexing_enabled": self.enable_indexing,
                "auto_cleanup_enabled": self.auto_cleanup,
                "last_cleanup": self._last_cleanup,
                "cleanup_interval": self._cleanup_interval
            }
            
            if self.enable_indexing:
                stats.update({
                    "indexed_agents": len(self._agent_index) if self._agent_index else 0,
                    "global_keys_count": len(self._global_keys) if self._global_keys else 0
                })
            
            return stats
