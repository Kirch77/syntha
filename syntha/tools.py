"""
Real-Time Context Retrieval Tools for Syntha.

Provides OpenAI-compatible function call schemas and handlers for agents
to retrieve context from the ContextMesh during conversations.
"""

import json
from typing import Any, Dict, List, Optional, Union
from .context import ContextMesh


def get_context_tool_schema() -> Dict[str, Any]:
    """
    Get the OpenAI function call schema for context retrieval.
    
    This schema can be used with OpenAI, Anthropic, or any other LLM
    that supports function calling.
    
    Returns:
        Function schema dictionary compatible with OpenAI API
    """
    return {
        "name": "get_context",
        "description": "Retrieve context from Syntha's shared mesh. Use this to access shared knowledge, campaign data, company information, or any other context that might be relevant to your task.",
        "parameters": {
            "type": "object",
            "properties": {
                "agent_name": {
                    "type": "string",
                    "description": "The name of the agent requesting context (usually your own name)"
                },
                "keys": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Specific context keys to retrieve. Leave empty to get all accessible context."
                }
            },
            "required": ["agent_name"]
        }
    }


def handle_get_context_call(
    context_mesh: ContextMesh,
    agent_name: str,
    keys: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Handle a get_context function call from an agent.
    
    Args:
        context_mesh: The ContextMesh instance to query
        agent_name: Name of the requesting agent
        keys: Optional list of specific keys to retrieve
        
    Returns:
        Dictionary with context data and metadata
    """
    try:
        if keys:
            # Retrieve specific keys
            result = {}
            for key in keys:
                value = context_mesh.get(key, agent_name)
                if value is not None:
                    result[key] = value
        else:
            # Retrieve all accessible context
            result = context_mesh.get_all_for_agent(agent_name)
        
        return {
            "success": True,
            "context": result,
            "agent_name": agent_name,
            "keys_requested": keys or list(result.keys()),
            "keys_found": list(result.keys())
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "keys_requested": keys,
            "context": {}
        }


def get_push_context_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for pushing context to the mesh.
    
    This allows agents to add or update shared context during conversations.
    
    Returns:
        Function schema dictionary for pushing context
    """
    return {
        "name": "push_context",
        "description": "Add or update context in Syntha's shared mesh. Use this to share information with other agents or update existing context.",
        "parameters": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string",
                    "description": "Unique identifier for the context item"
                },
                "value": {
                    "type": "string",
                    "description": "The context data to store (will be parsed as JSON if possible)"
                },
                "subscribers": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of agent names that can access this context. Leave empty for global access."
                },
                "ttl_seconds": {
                    "type": "number",
                    "description": "Time-to-live in seconds. Context will expire after this time."
                }
            },
            "required": ["key", "value"]
        }
    }


def handle_push_context_call(
    context_mesh: ContextMesh,
    key: str,
    value: str,
    subscribers: Optional[List[str]] = None,
    ttl_seconds: Optional[float] = None
) -> Dict[str, Any]:
    """
    Handle a push_context function call from an agent.
    
    Args:
        context_mesh: The ContextMesh instance to update
        key: Context key to set
        value: Context value (will attempt JSON parsing)
        subscribers: List of agents that can access this context
        ttl_seconds: Time-to-live in seconds
        
    Returns:
        Dictionary with operation status
    """
    try:
        # Try to parse value as JSON, fall back to string
        try:
            parsed_value = json.loads(value)
        except (json.JSONDecodeError, TypeError):
            parsed_value = value
        
        context_mesh.push(
            key=key,
            value=parsed_value,
            subscribers=subscribers or [],
            ttl=ttl_seconds
        )
        
        return {
            "success": True,
            "message": f"Context '{key}' updated successfully",
            "key": key,
            "value": parsed_value,
            "subscribers": subscribers or [],
            "ttl_seconds": ttl_seconds
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "key": key
        }


def get_list_context_keys_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for listing available context keys.
    
    Returns:
        Function schema dictionary for listing context keys
    """
    return {
        "name": "list_context_keys",
        "description": "List all context keys accessible by the agent. Useful for discovering available context.",
        "parameters": {
            "type": "object",
            "properties": {
                "agent_name": {
                    "type": "string",
                    "description": "The name of the agent requesting the key list"
                }
            },
            "required": ["agent_name"]
        }
    }


def handle_list_context_keys_call(
    context_mesh: ContextMesh,
    agent_name: str
) -> Dict[str, Any]:
    """
    Handle a list_context_keys function call from an agent.
    
    Args:
        context_mesh: The ContextMesh instance to query
        agent_name: Name of the requesting agent
        
    Returns:
        Dictionary with available keys
    """
    try:
        keys = context_mesh.get_keys_for_agent(agent_name)
        
        return {
            "success": True,
            "agent_name": agent_name,
            "available_keys": keys,
            "count": len(keys)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "available_keys": []
        }


def get_send_message_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for sending messages to other agents.
    
    Returns:
        Function schema dictionary for sending messages between agents
    """
    return {
        "name": "send_message_to_agent",
        "description": "Send a specific message or context to another agent. Use this to share relevant information directly with a specific agent without broadcasting to everyone.",
        "parameters": {
            "type": "object",
            "properties": {
                "from_agent": {
                    "type": "string",
                    "description": "Your agent name (the sender)"
                },
                "to_agent": {
                    "type": "string", 
                    "description": "The name of the agent you want to send the message to"
                },
                "message": {
                    "type": "string",
                    "description": "The message or context you want to share with the other agent"
                },
                "message_type": {
                    "type": "string",
                    "enum": ["info", "request", "update", "question", "result"],
                    "description": "Type of message: info (sharing information), request (asking for something), update (status update), question (asking a question), result (sharing results)"
                },
                "priority": {
                    "type": "string",
                    "enum": ["low", "normal", "high", "urgent"],
                    "description": "Priority level of the message"
                },
                "ttl_hours": {
                    "type": "number",
                    "description": "Time-to-live in hours for the message (default: 24 hours). Use 0 for permanent messages."
                },
                "requires_confirmation": {
                    "type": "boolean",
                    "description": "Whether this message requires read confirmation from the recipient (default: false)"
                },
                "thread_id": {
                    "type": "string",
                    "description": "Optional thread ID to group related messages in a conversation"
                }
            },
            "required": ["from_agent", "to_agent", "message"]
        }
    }


def handle_send_message_call(
    context_mesh: ContextMesh,
    from_agent: str,
    to_agent: str,
    message: str,
    message_type: str = "info",
    priority: str = "normal",
    ttl_hours: float = 24.0,
    requires_confirmation: bool = False,
    thread_id: Optional[str] = None
) -> Dict[str, Any]:
    """
    Handle sending a message from one agent to another.
    
    Args:
        context_mesh: The ContextMesh instance to store the message
        from_agent: Name of the sending agent
        to_agent: Name of the receiving agent
        message: The message content
        message_type: Type of message
        priority: Priority level
        ttl_hours: Time-to-live in hours (default 24, use 0 for permanent)
        requires_confirmation: Whether the message requires read confirmation
        thread_id: Optional thread ID for conversation grouping
        
    Returns:
        Dictionary with operation status
    """
    try:
        import time
        import uuid
        
        # Generate thread_id if not provided but needed
        if thread_id is None and requires_confirmation:
            thread_id = f"thread_{int(time.time() * 1000)}"
        
        # Create message data structure
        message_data = {
            "from": from_agent,
            "to": to_agent,
            "message": message,
            "type": message_type,
            "priority": priority,
            "timestamp": time.time(),
            "read": False,
            "requires_confirmation": requires_confirmation,
            "thread_id": thread_id,
            "confirmed": False if requires_confirmation else None
        }
        
        # Store message with a unique key for the receiving agent
        # Use UUID to ensure uniqueness even for simultaneous messages
        unique_id = str(uuid.uuid4())[:8]
        message_key = f"_agent_message_{to_agent}_{unique_id}_{int(time.time() * 1000000)}"
        
        # Store message with TTL (convert hours to seconds, None for permanent)
        ttl_seconds = None if ttl_hours == 0 else ttl_hours * 3600
        context_mesh.push(
            key=message_key,
            value=message_data,
            subscribers=[to_agent],  # Only the receiving agent can access
            ttl=ttl_seconds
        )
        
        return {
            "success": True,
            "message": f"Message sent from {from_agent} to {to_agent}",
            "from_agent": from_agent,
            "to_agent": to_agent,
            "message_type": message_type,
            "priority": priority,
            "ttl_hours": ttl_hours,
            "message_id": message_key,
            "thread_id": thread_id,
            "requires_confirmation": requires_confirmation
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "from_agent": from_agent,
            "to_agent": to_agent
        }


def get_receive_messages_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for receiving messages from other agents.
    
    Returns:
        Function schema dictionary for receiving agent messages
    """
    return {
        "name": "get_messages_from_agents",
        "description": "Retrieve messages that other agents have sent to you. Use this to check for communications from other agents in the system.",
        "parameters": {
            "type": "object",
            "properties": {
                "agent_name": {
                    "type": "string",
                    "description": "Your agent name (the receiver)"
                },
                "unread_only": {
                    "type": "boolean",
                    "description": "Whether to only retrieve unread messages (default: true)"
                },
                "from_agent": {
                    "type": "string",
                    "description": "Optional: only get messages from a specific agent"
                },
                "message_type": {
                    "type": "string",
                    "enum": ["info", "request", "update", "question", "result", "announcement"],
                    "description": "Optional: only get messages of a specific type"
                },
                "mark_as_read": {
                    "type": "boolean",
                    "description": "Whether to mark retrieved messages as read (default: true)"
                },
                "thread_id": {
                    "type": "string",
                    "description": "Optional: only get messages from a specific thread/conversation"
                },
                "priority": {
                    "type": "string",
                    "enum": ["low", "normal", "high", "urgent"],
                    "description": "Optional: filter by priority level"
                },
                "limit": {
                    "type": "number",
                    "description": "Maximum number of messages to return (default: 50)"
                },
                "sort_by_priority": {
                    "type": "boolean",
                    "description": "Whether to sort messages by priority (urgent first) instead of timestamp (default: false)"
                },
                "include_confirmations": {
                    "type": "boolean",
                    "description": "Whether to automatically send read confirmations for messages that require them (default: true)"
                }
            },
            "required": ["agent_name"]
        }
    }


def handle_receive_messages_call(
    context_mesh: ContextMesh,
    agent_name: str,
    unread_only: bool = True,
    from_agent: Optional[str] = None,
    message_type: Optional[str] = None,
    mark_as_read: bool = True,
    thread_id: Optional[str] = None,
    priority: Optional[str] = None,
    limit: int = 50,
    sort_by_priority: bool = False,
    include_confirmations: bool = True
) -> Dict[str, Any]:
    """
    Handle retrieving messages for an agent with enhanced filtering and performance.
    
    Args:
        context_mesh: The ContextMesh instance to query
        agent_name: Name of the receiving agent
        unread_only: Only return unread messages
        from_agent: Filter by sender
        message_type: Filter by message type
        mark_as_read: Mark messages as read after retrieval
        thread_id: Filter by specific thread
        priority: Filter by priority level
        limit: Maximum number of messages to return
        sort_by_priority: Sort by priority instead of timestamp
        include_confirmations: Send read confirmations automatically
        
    Returns:
        Dictionary with messages and metadata
    """
    try:
        import time
        
        # Performance optimization: Get all context once
        all_context = context_mesh.get_all_for_agent(agent_name)
        
        # Pre-filter message keys for better performance
        message_keys = [
            key for key in all_context.keys() 
            if key.startswith(f"_agent_message_{agent_name}_") and 
               not key.startswith(f"_agent_message_{agent_name}_to_")
        ]
        
        # Process messages with filters
        messages = []
        message_data_map = {}  # For efficient read marking
        confirmations_to_send = []
        
        for key in message_keys:
            value = all_context[key]
            
            # Validate message structure
            if not isinstance(value, dict) or "from" not in value or "message" not in value:
                continue
            
            # Apply filters efficiently
            if unread_only and value.get("read", False):
                continue
            if from_agent and value.get("from") != from_agent:
                continue
            if message_type and value.get("type") != message_type:
                continue
            if thread_id and value.get("thread_id") != thread_id:
                continue
            if priority and value.get("priority") != priority:
                continue
            
            # Add to results
            messages.append(value)
            message_data_map[key] = value
            
            # Track confirmations needed
            if (include_confirmations and 
                value.get("requires_confirmation") and 
                not value.get("confirmed", False)):
                confirmations_to_send.append({
                    "original_sender": value.get("from"),
                    "thread_id": value.get("thread_id"),
                    "message_id": key
                })
        
        # Sort messages
        if sort_by_priority:
            # Priority order: urgent, high, normal, low
            priority_order = {"urgent": 0, "high": 1, "normal": 2, "low": 3}
            messages.sort(key=lambda x: (
                priority_order.get(x.get("priority", "normal"), 2),
                -x.get("timestamp", 0)
            ))
        else:
            # Sort by timestamp (newest first)
            messages.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
        
        # Apply limit
        if limit > 0:
            messages = messages[:limit]
            # Update message_data_map to match limited messages
            limited_keys = set()
            for msg in messages:
                for key, value in message_data_map.items():
                    if value is msg:
                        limited_keys.add(key)
                        break
            message_data_map = {k: v for k, v in message_data_map.items() if k in limited_keys}
        
        # Mark messages as read if requested
        read_confirmations_sent = 0
        if mark_as_read:
            for key, message_data in message_data_map.items():
                if not message_data.get("read", False):
                    message_data["read"] = True
                    
                    # Preserve original TTL
                    original_item = context_mesh._data.get(key)
                    original_ttl = None
                    if original_item and original_item.ttl:
                        elapsed = time.time() - original_item.created_at
                        remaining_ttl = original_item.ttl - elapsed
                        original_ttl = max(0, remaining_ttl) if remaining_ttl > 0 else None
                    
                    context_mesh.push(
                        key=key,
                        value=message_data,
                        subscribers=[agent_name],
                        ttl=original_ttl
                    )
            
            # Send read confirmations
            if include_confirmations:
                for confirmation in confirmations_to_send:
                    try:
                        # Send confirmation message back to original sender
                        confirmation_result = handle_send_message_call(
                            context_mesh=context_mesh,
                            from_agent=agent_name,
                            to_agent=confirmation["original_sender"],
                            message=f"Message confirmed as read",
                            message_type="result",
                            priority="low",
                            ttl_hours=1,  # Short TTL for confirmations
                            thread_id=confirmation["thread_id"]
                        )
                        
                        if confirmation_result["success"]:
                            read_confirmations_sent += 1
                            
                    except Exception:
                        # Don't fail the whole operation if confirmation fails
                        pass
        
        # Group messages by thread if any have thread_ids
        threads = {}
        unthreaded_messages = []
        
        for msg in messages:
            thread_id = msg.get("thread_id")
            if thread_id:
                if thread_id not in threads:
                    threads[thread_id] = []
                threads[thread_id].append(msg)
            else:
                unthreaded_messages.append(msg)
        
        return {
            "success": True,
            "agent_name": agent_name,
            "messages": messages,
            "count": len(messages),
            "total_available": len(message_keys),
            "threads": threads if threads else None,
            "unthreaded_messages": unthreaded_messages if threads else None,
            "confirmations_sent": read_confirmations_sent,
            "filters_applied": {
                "unread_only": unread_only,
                "from_agent": from_agent,
                "message_type": message_type,
                "thread_id": thread_id,
                "priority": priority,
                "limit": limit
            },
            "performance": {
                "sort_by_priority": sort_by_priority,
                "total_keys_checked": len(message_keys),
                "messages_after_filter": len(messages)
            }
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "messages": []
        }


def get_broadcast_message_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for broadcasting messages to multiple agents.
    
    Returns:
        Function schema dictionary for broadcasting messages
    """
    return {
        "name": "broadcast_message_to_agents",
        "description": "Send the same message to multiple agents at once. Efficient for announcements, updates, or sharing information with a team.",
        "parameters": {
            "type": "object",
            "properties": {
                "from_agent": {
                    "type": "string",
                    "description": "Your agent name (the sender)"
                },
                "to_agents": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of agent names to send the message to"
                },
                "message": {
                    "type": "string",
                    "description": "The message to broadcast to all agents"
                },
                "message_type": {
                    "type": "string",
                    "enum": ["info", "request", "update", "question", "result", "announcement"],
                    "description": "Type of message being broadcast"
                },
                "priority": {
                    "type": "string",
                    "enum": ["low", "normal", "high", "urgent"],
                    "description": "Priority level of the broadcast"
                },
                "ttl_hours": {
                    "type": "number",
                    "description": "Time-to-live in hours for the broadcast (default: 24 hours)"
                },
                "create_thread": {
                    "type": "boolean",
                    "description": "Whether to create a shared thread for responses (default: false)"
                },
                "exclude_sender": {
                    "type": "boolean",
                    "description": "Whether to exclude the sender from receiving the broadcast (default: true)"
                }
            },
            "required": ["from_agent", "to_agents", "message"]
        }
    }


def handle_broadcast_message_call(
    context_mesh: ContextMesh,
    from_agent: str,
    to_agents: List[str],
    message: str,
    message_type: str = "announcement",
    priority: str = "normal",
    ttl_hours: float = 24.0,
    create_thread: bool = False,
    exclude_sender: bool = True
) -> Dict[str, Any]:
    """
    Handle broadcasting a message to multiple agents.
    
    Args:
        context_mesh: The ContextMesh instance to store messages
        from_agent: Name of the sending agent
        to_agents: List of receiving agent names
        message: The message content
        message_type: Type of message
        priority: Priority level
        ttl_hours: Time-to-live in hours
        create_thread: Whether to create a shared thread
        exclude_sender: Whether to exclude sender from recipients
        
    Returns:
        Dictionary with broadcast results
    """
    try:
        import time
        import uuid
        
        # Filter out sender if requested
        if exclude_sender and from_agent in to_agents:
            to_agents = [agent for agent in to_agents if agent != from_agent]
        
        # Generate thread ID if creating a thread
        thread_id = None
        if create_thread:
            thread_id = f"broadcast_thread_{int(time.time() * 1000)}"
        
        # Store each message individually for better performance and access control
        results = []
        broadcast_id = str(uuid.uuid4())[:8]
        
        for to_agent in to_agents:
            try:
                # Create individual message
                message_data = {
                    "from": from_agent,
                    "to": to_agent,
                    "message": message,
                    "type": message_type,
                    "priority": priority,
                    "timestamp": time.time(),
                    "read": False,
                    "thread_id": thread_id,
                    "broadcast_id": broadcast_id,
                    "is_broadcast": True
                }
                
                # Unique key for each recipient
                unique_id = str(uuid.uuid4())[:8]
                message_key = f"_agent_message_{to_agent}_{unique_id}_{int(time.time() * 1000000)}"
                
                # Store with TTL
                ttl_seconds = None if ttl_hours == 0 else ttl_hours * 3600
                context_mesh.push(
                    key=message_key,
                    value=message_data,
                    subscribers=[to_agent],
                    ttl=ttl_seconds
                )
                
                results.append({
                    "agent": to_agent,
                    "success": True,
                    "message_id": message_key
                })
                
            except Exception as e:
                results.append({
                    "agent": to_agent,
                    "success": False,
                    "error": str(e)
                })
        
        successful_sends = len([r for r in results if r["success"]])
        
        return {
            "success": True,
            "broadcast_id": broadcast_id,
            "from_agent": from_agent,
            "total_recipients": len(to_agents),
            "successful_sends": successful_sends,
            "failed_sends": len(to_agents) - successful_sends,
            "thread_id": thread_id,
            "message_type": message_type,
            "priority": priority,
            "results": results
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "from_agent": from_agent,
            "to_agents": to_agents
        }


def get_batch_context_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for batch context operations.
    
    Returns:
        Function schema dictionary for batch context operations
    """
    return {
        "name": "batch_context_operation",
        "description": "Perform multiple context operations in a single call for better performance. Supports getting, pushing, and removing multiple context items efficiently.",
        "parameters": {
            "type": "object",
            "properties": {
                "agent_name": {
                    "type": "string",
                    "description": "The name of the agent performing the operations"
                },
                "operations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": ["get", "push", "remove"],
                                "description": "Type of operation to perform"
                            },
                            "key": {
                                "type": "string",
                                "description": "Context key to operate on"
                            },
                            "value": {
                                "description": "Value to push (only for push operations)"
                            },
                            "subscribers": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Subscribers for push operations (optional)"
                            },
                            "ttl": {
                                "type": "number",
                                "description": "TTL in seconds for push operations (optional)"
                            }
                        },
                        "required": ["type", "key"]
                    },
                    "description": "List of operations to perform in batch"
                },
                "atomic": {
                    "type": "boolean",
                    "description": "Whether all operations should succeed or all fail (default: false)"
                },
                "continue_on_error": {
                    "type": "boolean",
                    "description": "Whether to continue processing if one operation fails (default: true)"
                }
            },
            "required": ["agent_name", "operations"]
        }
    }


def handle_batch_context_call(
    context_mesh: ContextMesh,
    agent_name: str,
    operations: List[Dict[str, Any]],
    atomic: bool = False,
    continue_on_error: bool = True
) -> Dict[str, Any]:
    """
    Handle batch context operations for improved performance.
    
    Args:
        context_mesh: The ContextMesh instance
        agent_name: Name of the requesting agent
        operations: List of operations to perform
        atomic: Whether all operations must succeed
        continue_on_error: Whether to continue on individual failures
        
    Returns:
        Dictionary with batch operation results
    """
    try:
        results = []
        successful_ops = 0
        failed_ops = 0
        
        # Store original state for atomic rollback
        original_state = {}
        if atomic:
            for op in operations:
                if op["type"] in ["push", "remove"]:
                    key = op["key"]
                    original_state[key] = context_mesh.get(key)
        
        for i, operation in enumerate(operations):
            try:
                op_type = operation["type"]
                key = operation["key"]
                
                if op_type == "get":
                    value = context_mesh.get(key, agent_name)
                    results.append({
                        "operation": i,
                        "type": op_type,
                        "key": key,
                        "success": True,
                        "value": value
                    })
                    successful_ops += 1
                    
                elif op_type == "push":
                    value = operation.get("value")
                    subscribers = operation.get("subscribers")
                    ttl = operation.get("ttl")
                    
                    context_mesh.push(
                        key=key,
                        value=value,
                        subscribers=subscribers,
                        ttl=ttl
                    )
                    
                    results.append({
                        "operation": i,
                        "type": op_type,
                        "key": key,
                        "success": True,
                        "pushed": True
                    })
                    successful_ops += 1
                    
                elif op_type == "remove":
                    removed = context_mesh.remove(key)
                    results.append({
                        "operation": i,
                        "type": op_type,
                        "key": key,
                        "success": True,
                        "removed": removed
                    })
                    successful_ops += 1
                    
            except Exception as e:
                failed_ops += 1
                results.append({
                    "operation": i,
                    "type": operation["type"],
                    "key": operation["key"],
                    "success": False,
                    "error": str(e)
                })
                
                if atomic or not continue_on_error:
                    # Rollback if atomic or not continuing on error
                    if atomic:
                        for rollback_key, rollback_value in original_state.items():
                            if rollback_value is not None:
                                context_mesh.push(rollback_key, rollback_value)
                            else:
                                context_mesh.remove(rollback_key)
                    
                    return {
                        "success": False,
                        "error": f"Operation {i} failed: {str(e)}",
                        "agent_name": agent_name,
                        "completed_operations": i,
                        "results": results[:i+1]
                    }
        
        return {
            "success": True,
            "agent_name": agent_name,
            "total_operations": len(operations),
            "successful_operations": successful_ops,
            "failed_operations": failed_ops,
            "atomic": atomic,
            "results": results
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "operations": len(operations)
        }


def get_all_tool_schemas() -> List[Dict[str, Any]]:
    """
    Get all available tool schemas for Syntha context operations.
    
    Returns:
        List of all function schemas
    """
    return [
        get_context_tool_schema(),
        get_push_context_tool_schema(),
        get_list_context_keys_tool_schema(),
        get_send_message_tool_schema(),
        get_receive_messages_tool_schema(),
        get_broadcast_message_tool_schema(),
        get_batch_context_tool_schema()
    ]


class ToolHandler:
    """
    Convenience class for handling Syntha tool calls.
    
    This provides a unified interface for processing function calls
    from various LLM frameworks.
    """
    
    def __init__(self, context_mesh: ContextMesh):
        self.context_mesh = context_mesh
        self.handlers = {
            "get_context": self.handle_get_context,
            "push_context": self.handle_push_context,
            "list_context_keys": self.handle_list_context_keys,
            "send_message_to_agent": self.handle_send_message,
            "get_messages_from_agents": self.handle_receive_messages,
            "broadcast_message_to_agents": self.handle_broadcast_message,
            "batch_context_operation": self.handle_batch_context
        }
    
    def handle_get_context(self, **kwargs) -> Dict[str, Any]:
        """Handle get_context tool call."""
        return handle_get_context_call(self.context_mesh, **kwargs)
    
    def handle_push_context(self, **kwargs) -> Dict[str, Any]:
        """Handle push_context tool call."""
        return handle_push_context_call(self.context_mesh, **kwargs)
    
    def handle_list_context_keys(self, **kwargs) -> Dict[str, Any]:
        """Handle list_context_keys tool call."""
        return handle_list_context_keys_call(self.context_mesh, **kwargs)
    
    def handle_send_message(self, **kwargs) -> Dict[str, Any]:
        """Handle send_message_to_agent tool call."""
        return handle_send_message_call(self.context_mesh, **kwargs)
    
    def handle_receive_messages(self, **kwargs) -> Dict[str, Any]:
        """Handle get_messages_from_agents tool call."""
        return handle_receive_messages_call(self.context_mesh, **kwargs)
    
    def handle_broadcast_message(self, **kwargs) -> Dict[str, Any]:
        """Handle broadcast_message_to_agents tool call."""
        return handle_broadcast_message_call(self.context_mesh, **kwargs)
    
    def handle_batch_context(self, **kwargs) -> Dict[str, Any]:
        """Handle batch_context_operation tool call."""
        return handle_batch_context_call(self.context_mesh, **kwargs)
    
    def handle_tool_call(self, tool_name: str, **kwargs) -> Dict[str, Any]:
        """
        Route a tool call to the appropriate handler.
        
        Args:
            tool_name: Name of the tool being called
            **kwargs: Tool arguments
            
        Returns:
            Tool response dictionary
        """
        if tool_name not in self.handlers:
            return {
                "success": False,
                "error": f"Unknown tool: {tool_name}",
                "available_tools": list(self.handlers.keys())
            }
        
        return self.handlers[tool_name](**kwargs)
    
    def get_schemas(self) -> List[Dict[str, Any]]:
        """Get all tool schemas."""
        return get_all_tool_schemas()
