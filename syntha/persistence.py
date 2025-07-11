"""
Database persistence layer for Syntha ContextMesh.

Copyright 2025 Syntha

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Provides pluggable database backends with SQLite as default.
Supports easy switching to PostgreSQL, MySQL, or other databases.
"""

import json
import sqlite3
import time
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Tuple
from threading import Lock


class DatabaseBackend(ABC):
    """Abstract base class for database backends."""
    
    @abstractmethod
    def connect(self) -> None:
        """Establish database connection."""
        pass
    
    @abstractmethod
    def close(self) -> None:
        """Close database connection."""
        pass
    
    @abstractmethod
    def initialize_schema(self) -> None:
        """Create necessary tables and indexes."""
        pass
    
    @abstractmethod
    def save_context_item(self, key: str, value: Any, subscribers: List[str], 
                         ttl: Optional[float], created_at: float) -> None:
        """Save a context item to the database."""
        pass
    
    @abstractmethod
    def get_context_item(self, key: str) -> Optional[Tuple[Any, List[str], Optional[float], float]]:
        """Retrieve a context item from the database.
        
        Returns:
            Tuple of (value, subscribers, ttl, created_at) or None if not found
        """
        pass
    
    @abstractmethod
    def delete_context_item(self, key: str) -> bool:
        """Delete a context item from the database.
        
        Returns:
            True if item was deleted, False if it didn't exist
        """
        pass
    
    @abstractmethod
    def get_all_context_items(self) -> Dict[str, Tuple[Any, List[str], Optional[float], float]]:
        """Get all context items from the database.
        
        Returns:
            Dict mapping keys to (value, subscribers, ttl, created_at) tuples
        """
        pass
    
    @abstractmethod
    def cleanup_expired(self, current_time: float) -> int:
        """Remove expired items from the database.
        
        Returns:
            Number of items removed
        """
        pass
    
    @abstractmethod
    def clear_all(self) -> None:
        """Remove all context items from the database."""
        pass
    
    @abstractmethod
    def save_agent_topics(self, agent_name: str, topics: List[str]) -> None:
        """Save agent topic subscriptions."""
        pass
    
    @abstractmethod
    def get_agent_topics(self, agent_name: str) -> List[str]:
        """Get agent topic subscriptions."""
        pass
    
    @abstractmethod
    def get_all_agent_topics(self) -> Dict[str, List[str]]:
        """Get all agent topic mappings."""
        pass
    
    @abstractmethod
    def save_agent_permissions(self, agent_name: str, allowed_topics: List[str]) -> None:
        """Save agent posting permissions."""
        pass
    
    @abstractmethod
    def get_agent_permissions(self, agent_name: str) -> List[str]:
        """Get agent posting permissions."""
        pass
    
    @abstractmethod
    def get_all_agent_permissions(self) -> Dict[str, List[str]]:
        """Get all agent permission mappings."""
        pass


class SQLiteBackend(DatabaseBackend):
    """SQLite database backend implementation."""
    
    def __init__(self, db_path: str = "syntha_context.db"):
        self.db_path = db_path
        self.connection = None
        self._lock = Lock()
    
    def __enter__(self):
        """Context manager entry."""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.close()
    
    def connect(self) -> None:
        """Establish SQLite connection."""
        self.connection = sqlite3.connect(self.db_path, check_same_thread=False, timeout=10.0)
        # Use DELETE mode instead of WAL to avoid Windows file locking issues
        self.connection.execute("PRAGMA journal_mode=DELETE")
        self.connection.execute("PRAGMA synchronous=NORMAL")  # Better performance
        self.connection.execute("PRAGMA foreign_keys=ON")  # Enable foreign keys
        self.connection.execute("PRAGMA busy_timeout=5000")  # 5 second timeout
        self.initialize_schema()
    
    def close(self) -> None:
        """Close SQLite connection."""
        if self.connection:
            try:
                # Close any open cursors and commit pending transactions
                self.connection.execute("PRAGMA optimize")  # Optimize database before closing
                self.connection.commit()
                self.connection.close()
            except sqlite3.Error:
                # Ignore errors during close
                pass
            finally:
                self.connection = None
    
    def initialize_schema(self) -> None:
        """Create SQLite tables and indexes."""
        with self._lock:
            if not self.connection:
                return
            
            cursor = self.connection.cursor()
            
            # Context items table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS context_items (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL,
                    subscribers TEXT NOT NULL,
                    ttl REAL,
                    created_at REAL NOT NULL
                )
            """)
            
            # Agent topics table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS agent_topics (
                    agent_name TEXT PRIMARY KEY,
                    topics TEXT NOT NULL
                )
            """)
            
            # Agent permissions table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS agent_permissions (
                    agent_name TEXT PRIMARY KEY,
                    allowed_topics TEXT NOT NULL
                )
            """)
            
            # Create indexes for better performance
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_context_created_at ON context_items(created_at)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_context_ttl ON context_items(ttl)")
            
            self.connection.commit()
    
    def save_context_item(self, key: str, value: Any, subscribers: List[str], 
                         ttl: Optional[float], created_at: float) -> None:
        """Save a context item to SQLite."""
        with self._lock:
            self._ensure_connection()
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO context_items 
                (key, value, subscribers, ttl, created_at) 
                VALUES (?, ?, ?, ?, ?)
            """, (
                key,
                json.dumps(value),
                json.dumps(subscribers),
                ttl,
                created_at
            ))
            self.connection.commit()
    
    def get_context_item(self, key: str) -> Optional[Tuple[Any, List[str], Optional[float], float]]:
        """Retrieve a context item from SQLite."""
        with self._lock:
            self._ensure_connection()
            cursor = self.connection.cursor()
            cursor.execute("SELECT value, subscribers, ttl, created_at FROM context_items WHERE key = ?", (key,))
            row = cursor.fetchone()
            
            if row is None:
                return None
            
            value_json, subscribers_json, ttl, created_at = row
            value = json.loads(value_json)
            subscribers = json.loads(subscribers_json)
            
            return (value, subscribers, ttl, created_at)
    
    def delete_context_item(self, key: str) -> bool:
        """Delete a context item from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM context_items WHERE key = ?", (key,))
            self.connection.commit()
            return cursor.rowcount > 0
    
    def get_all_context_items(self) -> Dict[str, Tuple[Any, List[str], Optional[float], float]]:
        """Get all context items from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT key, value, subscribers, ttl, created_at FROM context_items")
            
            result = {}
            for row in cursor.fetchall():
                key, value_json, subscribers_json, ttl, created_at = row
                value = json.loads(value_json)
                subscribers = json.loads(subscribers_json)
                result[key] = (value, subscribers, ttl, created_at)
            
            return result
    
    def cleanup_expired(self, current_time: float) -> int:
        """Remove expired items from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                DELETE FROM context_items 
                WHERE ttl IS NOT NULL AND (created_at + ttl) < ?
            """, (current_time,))
            self.connection.commit()
            return cursor.rowcount
    
    def clear_all(self) -> None:
        """Remove all context items from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM context_items")
            cursor.execute("DELETE FROM agent_topics")
            cursor.execute("DELETE FROM agent_permissions")
            self.connection.commit()
    
    def save_agent_topics(self, agent_name: str, topics: List[str]) -> None:
        """Save agent topic subscriptions to SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO agent_topics (agent_name, topics) 
                VALUES (?, ?)
            """, (agent_name, json.dumps(topics)))
            self.connection.commit()
    
    def get_agent_topics(self, agent_name: str) -> List[str]:
        """Get agent topic subscriptions from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT topics FROM agent_topics WHERE agent_name = ?", (agent_name,))
            row = cursor.fetchone()
            
            if row is None:
                return []
            
            return json.loads(row[0])
    
    def get_all_agent_topics(self) -> Dict[str, List[str]]:
        """Get all agent topic mappings from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT agent_name, topics FROM agent_topics")
            
            result = {}
            for agent_name, topics_json in cursor.fetchall():
                result[agent_name] = json.loads(topics_json)
            
            return result
    
    def save_agent_permissions(self, agent_name: str, allowed_topics: List[str]) -> None:
        """Save agent posting permissions to SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO agent_permissions (agent_name, allowed_topics) 
                VALUES (?, ?)
            """, (agent_name, json.dumps(allowed_topics)))
            self.connection.commit()
    
    def get_agent_permissions(self, agent_name: str) -> List[str]:
        """Get agent posting permissions from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT allowed_topics FROM agent_permissions WHERE agent_name = ?", (agent_name,))
            row = cursor.fetchone()
            
            if row is None:
                return []
            
            return json.loads(row[0])
    
    def get_all_agent_permissions(self) -> Dict[str, List[str]]:
        """Get all agent permission mappings from SQLite."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT agent_name, allowed_topics FROM agent_permissions")
            
            result = {}
            for agent_name, allowed_topics_json in cursor.fetchall():
                result[agent_name] = json.loads(allowed_topics_json)
            
            return result
        
    def _ensure_connection(self) -> None:
        """Ensure database connection is alive, reconnect if needed."""
        if self.connection is None:
            self.connect()
            return
        
        try:
            # Test the connection
            self.connection.execute("SELECT 1")
        except sqlite3.Error:
            # Connection is broken, reconnect
            self.close()
            self.connect()
    

class PostgreSQLBackend(DatabaseBackend):
    """PostgreSQL database backend implementation."""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connection = None
        self._lock = Lock()
    
    def connect(self) -> None:
        """Establish PostgreSQL connection."""
        try:
            import psycopg2
            import psycopg2.extras
        except ImportError:
            raise ImportError("psycopg2 is required for PostgreSQL backend. Install with: pip install psycopg2-binary")
        
        self.connection = psycopg2.connect(self.connection_string)
        self.initialize_schema()
    
    def close(self) -> None:
        """Close PostgreSQL connection."""
        if self.connection:
            self.connection.close()
            self.connection = None
    
    def initialize_schema(self) -> None:
        """Create PostgreSQL tables and indexes."""
        with self._lock:
            cursor = self.connection.cursor()
            
            # Context items table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS context_items (
                    key TEXT PRIMARY KEY,
                    value JSONB NOT NULL,
                    subscribers JSONB NOT NULL,
                    ttl REAL,
                    created_at REAL NOT NULL
                )
            """)
            
            # Agent topics table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS agent_topics (
                    agent_name TEXT PRIMARY KEY,
                    topics JSONB NOT NULL
                )
            """)
            
            # Agent permissions table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS agent_permissions (
                    agent_name TEXT PRIMARY KEY,
                    allowed_topics JSONB NOT NULL
                )
            """)
            
            # Create indexes
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_context_created_at ON context_items(created_at)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_context_ttl ON context_items(ttl)")
            
            self.connection.commit()
    
    def save_context_item(self, key: str, value: Any, subscribers: List[str], 
                         ttl: Optional[float], created_at: float) -> None:
        """Save a context item to PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT INTO context_items (key, value, subscribers, ttl, created_at) 
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (key) DO UPDATE SET
                    value = EXCLUDED.value,
                    subscribers = EXCLUDED.subscribers,
                    ttl = EXCLUDED.ttl,
                    created_at = EXCLUDED.created_at
            """, (key, json.dumps(value), json.dumps(subscribers), ttl, created_at))
            self.connection.commit()
    
    def get_context_item(self, key: str) -> Optional[Tuple[Any, List[str], Optional[float], float]]:
        """Retrieve a context item from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT value, subscribers, ttl, created_at FROM context_items WHERE key = %s", (key,))
            row = cursor.fetchone()
            
            if row is None:
                return None
            
            value_json, subscribers_json, ttl, created_at = row
            value = json.loads(value_json)
            subscribers = json.loads(subscribers_json)
            
            return (value, subscribers, ttl, created_at)
    
    def delete_context_item(self, key: str) -> bool:
        """Delete a context item from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM context_items WHERE key = %s", (key,))
            self.connection.commit()
            return cursor.rowcount > 0
    
    def get_all_context_items(self) -> Dict[str, Tuple[Any, List[str], Optional[float], float]]:
        """Get all context items from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT key, value, subscribers, ttl, created_at FROM context_items")
            
            result = {}
            for row in cursor.fetchall():
                key, value_json, subscribers_json, ttl, created_at = row
                value = json.loads(value_json)
                subscribers = json.loads(subscribers_json)
                result[key] = (value, subscribers, ttl, created_at)
            
            return result
    
    def cleanup_expired(self, current_time: float) -> int:
        """Remove expired items from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                DELETE FROM context_items 
                WHERE ttl IS NOT NULL AND (created_at + ttl) < %s
            """, (current_time,))
            self.connection.commit()
            return cursor.rowcount
    
    def clear_all(self) -> None:
        """Remove all context items from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("DELETE FROM context_items")
            cursor.execute("DELETE FROM agent_topics")
            cursor.execute("DELETE FROM agent_permissions")
            self.connection.commit()
    
    def save_agent_topics(self, agent_name: str, topics: List[str]) -> None:
        """Save agent topic subscriptions to PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT INTO agent_topics (agent_name, topics) 
                VALUES (%s, %s)
                ON CONFLICT (agent_name) DO UPDATE SET topics = EXCLUDED.topics
            """, (agent_name, json.dumps(topics)))
            self.connection.commit()
    
    def get_agent_topics(self, agent_name: str) -> List[str]:
        """Get agent topic subscriptions from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT topics FROM agent_topics WHERE agent_name = %s", (agent_name,))
            row = cursor.fetchone()
            
            if row is None:
                return []
            
            return json.loads(row[0])
    
    def get_all_agent_topics(self) -> Dict[str, List[str]]:
        """Get all agent topic mappings from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT agent_name, topics FROM agent_topics")
            
            result = {}
            for agent_name, topics_json in cursor.fetchall():
                result[agent_name] = json.loads(topics_json)
            
            return result
    
    def save_agent_permissions(self, agent_name: str, allowed_topics: List[str]) -> None:
        """Save agent posting permissions to PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("""
                INSERT INTO agent_permissions (agent_name, allowed_topics) 
                VALUES (%s, %s)
                ON CONFLICT (agent_name) DO UPDATE SET allowed_topics = EXCLUDED.allowed_topics
            """, (agent_name, json.dumps(allowed_topics)))
            self.connection.commit()
    
    def get_agent_permissions(self, agent_name: str) -> List[str]:
        """Get agent posting permissions from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT allowed_topics FROM agent_permissions WHERE agent_name = %s", (agent_name,))
            row = cursor.fetchone()
            
            if row is None:
                return []
            
            return json.loads(row[0])
    
    def get_all_agent_permissions(self) -> Dict[str, List[str]]:
        """Get all agent permission mappings from PostgreSQL."""
        with self._lock:
            cursor = self.connection.cursor()
            cursor.execute("SELECT agent_name, allowed_topics FROM agent_permissions")
            
            result = {}
            for agent_name, allowed_topics_json in cursor.fetchall():
                result[agent_name] = json.loads(allowed_topics_json)
            
            return result


def create_database_backend(backend_type: str = "sqlite", **kwargs) -> DatabaseBackend:
    """
    Factory function to create database backends.
    
    Args:
        backend_type: Type of backend ("sqlite", "postgresql", "mysql")
        **kwargs: Backend-specific configuration
        
    Returns:
        Configured database backend instance
    """
    if backend_type.lower() == "sqlite":
        db_path = kwargs.get("db_path", "syntha_context.db")
        return SQLiteBackend(db_path)
    
    elif backend_type.lower() == "postgresql":
        connection_string = kwargs.get("connection_string")
        if not connection_string:
            raise ValueError("connection_string is required for PostgreSQL backend")
        return PostgreSQLBackend(connection_string)
    
    # Add more backends as needed
    # elif backend_type.lower() == "mysql":
    #     return MySQLBackend(kwargs.get("connection_string"))
    
    else:
        raise ValueError(f"Unsupported backend type: {backend_type}")
