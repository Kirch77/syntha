"""
Syntha Agent Tools - Essential Context Management

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

Provides OpenAI-compatible function call schemas and handlers for agents
to manage and share context through topic-based routing.

Core Tools:
- get_context: Retrieve shared context data
- push_context: Share context with topic subscribers
- list_context: Discover available context keys
- subscribe_to_topics: Subscribe to topic-based context routing
- discover_topics: Find available topics and subscriber counts
"""

import json
from typing import Any, Dict, List, Optional

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
        "description": """Retrieve specific context from the shared knowledge base.
        
        💡 TIP: Use 'list_context' first to see what's available!
        
        You don't need to specify your agent name - the system knows who you are.""",
        "parameters": {
            "type": "object",
            "properties": {
                "keys": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Specific context keys to retrieve. Use list_context to see available options.",
                }
            },
            "required": [],
        },
    }


def handle_get_context_call(
    context_mesh: ContextMesh, agent_name: str, keys: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Handle a get_context function call from an agent.

    Args:
        context_mesh: The ContextMesh instance to query
        agent_name: Name of the requesting agent (auto-injected by ToolHandler)
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
            "keys_found": list(result.keys()),
            "message": f"Retrieved {len(result)} context items",
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "keys_requested": keys,
            "context": {},
        }


def get_push_context_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for pushing context to topics.

    This allows agents to share context with other agents via topic-based routing.

    Returns:
        Function schema dictionary for pushing context to topics
    """
    return {
        "name": "push_context",
        "description": """Share context with other agents by pushing to specific topics.
        
        💡 TIP: Use 'discover_topics' first to see what topics exist and have subscribers!
        
        Choose topics based on:
        - Content relevance (e.g., 'sales' for pricing data, 'support' for customer issues)
        - Subscriber count (more subscribers = broader reach)
        - Common patterns: sales, marketing, support, product, analytics, customer_data
        
        For keys, use descriptive names like: 'q4_pricing', 'customer_feedback_summary', 'product_roadmap'
        
        You don't need to specify your agent name - the system knows who you are.""",
        "parameters": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string",
                    "description": "Unique identifier for this context",
                },
                "value": {"type": "string", "description": "The context data to share"},
                "topics": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Topics to broadcast to (e.g., ['sales', 'marketing', 'support'])",
                },
                "ttl_hours": {
                    "type": "number",
                    "description": "How long context should remain available (hours). Default: 24 hours",
                },
            },
            "required": ["key", "value", "topics"],
        },
    }


def handle_push_context_call(
    context_mesh: ContextMesh,
    key: str,
    value: str,
    topics: List[str],
    ttl_hours: float = 24.0,
    sender_agent: str = None,
) -> Dict[str, Any]:
    """
    Handle a push_context_to_topics function call from an agent.

    Args:
        context_mesh: The ContextMesh instance to update
        key: Context key to set
        value: Context value (will attempt JSON parsing)
        topics: List of topics to broadcast to
        ttl_hours: Time-to-live in hours
        sender_agent: Agent sending the context (auto-injected by ToolHandler)

    Returns:
        Dictionary with operation status
    """
    try:
        # Try to parse value as JSON, fall back to string
        try:
            parsed_value = json.loads(value)
        except (json.JSONDecodeError, TypeError):
            parsed_value = value

        ttl_seconds = ttl_hours * 3600 if ttl_hours > 0 else None

        # Use the unified push API with topics
        context_mesh.push(key=key, value=parsed_value, topics=topics, ttl=ttl_seconds)

        return {
            "success": True,
            "message": f"Context '{key}' shared with agents subscribed to topics: {', '.join(topics)}",
            "key": key,
            "value": parsed_value,
            "topics": topics,
            "ttl_hours": ttl_hours,
            "sender_agent": sender_agent,
        }

    except Exception as e:
        return {"success": False, "error": str(e), "key": key, "topics": topics}


def get_list_context_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for listing available context keys.

    Returns:
        Function schema dictionary for listing context keys
    """
    return {
        "name": "list_context",
        "description": """List all context keys you have access to, organized by topic. 
        
        ⚠️ IMPORTANT: Use this tool FIRST before trying to retrieve context!
        This shows you what context is available so you can decide which keys to retrieve.
        
        You don't need to specify your agent name - the system knows who you are.""",
        "parameters": {"type": "object", "properties": {}, "required": []},
    }


def handle_list_context_call(
    context_mesh: ContextMesh, agent_name: str
) -> Dict[str, Any]:
    """
    Handle a list_context_keys function call from an agent.

    Args:
        context_mesh: The ContextMesh instance to query
        agent_name: Name of the requesting agent (auto-injected by ToolHandler)

    Returns:
        Dictionary with available keys organized by topic
    """
    try:
        # Get keys organized by topic
        keys_by_topic = context_mesh.get_available_keys_by_topic(agent_name)

        # Also get all accessible keys (for backward compatibility)
        all_keys = context_mesh.get_keys_for_agent(agent_name)

        return {
            "success": True,
            "keys_by_topic": keys_by_topic,
            "all_accessible_keys": all_keys,
            "topics_subscribed": context_mesh.get_topics_for_agent(agent_name),
            "message": "Use these keys with get_context tool. Keys are organized by topics you're subscribed to.",
            "agent_name": agent_name,
            "total_keys": len(all_keys),
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent_name": agent_name,
            "keys_by_topic": {},
            "all_accessible_keys": [],
        }


def get_subscribe_to_topics_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for registering topic interests.

    This allows agents to subscribe to specific topics to receive relevant context.

    Returns:
        Function schema dictionary for topic registration
    """
    return {
        "name": "subscribe_to_topics",
        "description": """Subscribe to specific topics to receive relevant context.
        
        After subscribing, you'll automatically receive context that other agents push to these topics.
        
        You don't need to specify your agent name - the system knows who you are.""",
        "parameters": {
            "type": "object",
            "properties": {
                "topics": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Topics you want to receive context for (e.g., ['sales', 'customer_data', 'pricing'])",
                }
            },
            "required": ["topics"],
        },
    }


def handle_subscribe_to_topics_call(
    context_mesh: ContextMesh, topics: List[str], agent_name: str
) -> Dict[str, Any]:
    """
    Handle a register_for_topics function call from an agent.

    Args:
        context_mesh: The ContextMesh instance to update
        topics: List of topics the agent wants to subscribe to
        agent_name: Agent name (auto-injected by ToolHandler)

    Returns:
        Dictionary with registration result
    """
    try:
        context_mesh.register_agent_topics(agent_name, topics)
        return {
            "success": True,
            "agent": agent_name,
            "topics": topics,
            "message": f"Successfully registered for topics: {', '.join(topics)}. You'll now receive context shared to these topics.",
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "agent": agent_name,
            "topics": topics,
        }


def get_discover_topics_tool_schema() -> Dict[str, Any]:
    """
    Get the function schema for discovering available topics.

    This helps agents understand what topics exist and how many subscribers they have,
    making it easier to choose appropriate topics for pushing context.

    Returns:
        Function schema dictionary for topic discovery
    """
    return {
        "name": "discover_topics",
        "description": """Discover available topics in the system and see subscriber counts.
        
        🎯 Use this BEFORE pushing context to understand:
        - What topics exist in the system
        - How many agents are subscribed to each topic
        - Popular topics vs niche ones
        
        This helps you choose the right topics for your context.""",
        "parameters": {
            "type": "object",
            "properties": {
                "include_subscriber_names": {
                    "type": "boolean",
                    "description": "Whether to include names of subscribers for each topic (default: false)",
                }
            },
            "required": [],
        },
    }


def handle_discover_topics_call(
    context_mesh: ContextMesh, include_subscriber_names: bool = False
) -> Dict[str, Any]:
    """
    Handle a discover_topics function call from an agent.

    Args:
        context_mesh: The ContextMesh instance to query
        include_subscriber_names: Whether to include subscriber names

    Returns:
        Dictionary with available topics and their subscriber information
    """
    try:
        # Get all topics by examining the topic subscribers mapping
        all_topics = {}

        # Access the internal topic mapping if available
        if hasattr(context_mesh, "_topic_subscribers"):
            for topic, agents in context_mesh._topic_subscribers.items():
                subscriber_count = len(agents)
                topic_info = {
                    "subscriber_count": subscriber_count,
                    "is_active": subscriber_count > 0,
                }

                if include_subscriber_names:
                    topic_info["subscribers"] = list(agents)

                all_topics[topic] = topic_info

        # Sort topics by subscriber count (most popular first)
        sorted_topics = dict(
            sorted(
                all_topics.items(), key=lambda x: x[1]["subscriber_count"], reverse=True
            )
        )

        # Generate suggestions
        popular_topics = [
            topic
            for topic, info in sorted_topics.items()
            if info["subscriber_count"] >= 2
        ]

        return {
            "success": True,
            "topics": sorted_topics,
            "total_topics": len(all_topics),
            "popular_topics": popular_topics,
            "suggestions": {
                "for_broad_reach": popular_topics[:3] if popular_topics else [],
                "common_patterns": [
                    "sales",
                    "marketing",
                    "support",
                    "product",
                    "analytics",
                    "customer_data",
                ],
            },
            "message": f"Found {len(all_topics)} topics. Popular topics (2+ subscribers): {', '.join(popular_topics[:5])}",
        }

    except Exception as e:
        return {"success": False, "error": str(e), "topics": {}, "total_topics": 0}


def get_all_tool_schemas() -> List[Dict[str, Any]]:
    """
    Get all essential tool schemas for Syntha context operations.

    Returns:
        List of core function schemas for topic-based context management
    """
    return [
        get_context_tool_schema(),
        get_push_context_tool_schema(),
        get_list_context_tool_schema(),
        get_subscribe_to_topics_tool_schema(),
        get_discover_topics_tool_schema(),
    ]


class ToolHandler:
    """
    Handler for Syntha context management tools with automatic agent identification.

    Provides a unified interface for processing function calls from LLM frameworks
    and automatically injects agent names for context operations.
    """

    def __init__(self, context_mesh: ContextMesh, agent_name: str = None):
        """
        Initialize the tool handler.

        Args:
            context_mesh: The shared context mesh instance
            agent_name: Agent name for automatic injection
        """
        self.context_mesh = context_mesh
        self.agent_name = agent_name
        self.handlers = {
            "get_context": self.handle_get_context,
            "push_context": self.handle_push_context,
            "list_context": self.handle_list_context,
            "subscribe_to_topics": self.handle_subscribe_to_topics,
            "discover_topics": self.handle_discover_topics,
        }

    def set_agent_name(self, agent_name: str):
        """Set the agent name for this tool handler instance."""
        self.agent_name = agent_name

    def _check_agent_name(self) -> Dict[str, Any]:
        """Check if agent name is set, return error dict if not."""
        if not self.agent_name:
            return {"success": False, "error": "Agent name not set"}
        return None

    def handle_get_context(self, **kwargs) -> Dict[str, Any]:
        """Handle get_context tool call."""
        error = self._check_agent_name()
        if error:
            return error
        kwargs["agent_name"] = self.agent_name
        return handle_get_context_call(self.context_mesh, **kwargs)

    def handle_push_context(self, **kwargs) -> Dict[str, Any]:
        """Handle push_context tool call."""
        error = self._check_agent_name()
        if error:
            return error
        kwargs["sender_agent"] = self.agent_name
        return handle_push_context_call(self.context_mesh, **kwargs)

    def handle_list_context(self, **kwargs) -> Dict[str, Any]:
        """Handle list_context tool call."""
        error = self._check_agent_name()
        if error:
            return error
        kwargs["agent_name"] = self.agent_name
        return handle_list_context_call(self.context_mesh, **kwargs)

    def handle_subscribe_to_topics(self, **kwargs) -> Dict[str, Any]:
        """Handle subscribe_to_topics tool call."""
        error = self._check_agent_name()
        if error:
            return error
        kwargs["agent_name"] = self.agent_name
        return handle_subscribe_to_topics_call(self.context_mesh, **kwargs)

    def handle_discover_topics(self, **kwargs) -> Dict[str, Any]:
        """Handle discover_topics tool call."""
        error = self._check_agent_name()
        if error:
            return error
        return handle_discover_topics_call(self.context_mesh, **kwargs)

    def handle_tool_call(self, tool_name: str, **kwargs) -> Dict[str, Any]:
        """
        Route a tool call to the appropriate handler with automatic agent name injection.

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
                "available_tools": list(self.handlers.keys()),
            }

        return self.handlers[tool_name](**kwargs)

    def get_schemas(
        self, merge_with: Optional[List[Dict[str, Any]]] = None
    ) -> List[Dict[str, Any]]:
        """
        Get all tool schemas for the topic-based context system.

        Args:
            merge_with: Optional list of existing tool schemas to merge with Syntha tools

        Returns:
            List of tool schemas (existing tools + Syntha tools, avoiding conflicts)
        """
        syntha_schemas = get_all_tool_schemas()

        if merge_with is None:
            return syntha_schemas

        # Start with user's existing tools
        all_schemas = merge_with.copy()
        existing_names = {schema.get("name") for schema in merge_with}

        # Add Syntha tools that don't conflict
        for schema in syntha_schemas:
            tool_name = schema.get("name")
            if tool_name not in existing_names:
                all_schemas.append(schema)
            else:
                # Rename Syntha tool to avoid conflict
                renamed_schema = schema.copy()
                renamed_schema["name"] = f"syntha_{tool_name}"
                renamed_schema["description"] = (
                    f"[Syntha] {schema.get('description', '')}"
                )
                all_schemas.append(renamed_schema)
                print(
                    f"Info: Renamed Syntha tool '{tool_name}' to 'syntha_{tool_name}' to avoid conflict"
                )

        return all_schemas

    def get_syntha_schemas_only(self) -> List[Dict[str, Any]]:
        """Get only Syntha's context management tool schemas."""
        return get_all_tool_schemas()

    def create_hybrid_handler(self, user_tool_handler=None):
        """
        Create a hybrid tool handler that can handle both Syntha and user tools.

        Args:
            user_tool_handler: Function that handles user's custom tools
                             Should accept (tool_name, **kwargs) and return result dict

        Returns:
            Function that can handle both Syntha and user tools
        """

        def hybrid_handler(tool_name: str, **kwargs) -> Dict[str, Any]:
            # Handle Syntha tools first
            if tool_name in self.handlers:
                return self.handlers[tool_name](**kwargs)

            # Handle renamed Syntha tools
            if tool_name.startswith("syntha_"):
                original_name = tool_name[7:]  # Remove "syntha_" prefix
                if original_name in self.handlers:
                    return self.handlers[original_name](**kwargs)

            # Fallback to user's tools
            if user_tool_handler:
                try:
                    return user_tool_handler(tool_name, **kwargs)
                except Exception as e:
                    return {
                        "success": False,
                        "error": f"User tool handler error: {str(e)}",
                    }

            return {
                "success": False,
                "error": f"Unknown tool: {tool_name}",
                "syntha_tools": list(self.handlers.keys()),
            }

        # Add utility methods to the hybrid handler
        hybrid_handler.get_syntha_schemas = self.get_syntha_schemas_only
        hybrid_handler.handle_syntha_tool = self.handle_tool_call
        hybrid_handler.syntha_handler = self

        return hybrid_handler


# Integration utility functions for existing systems
def merge_tool_schemas(
    syntha_tools: List[Dict[str, Any]],
    user_tools: List[Dict[str, Any]],
    handle_conflicts: str = "warn",
) -> List[Dict[str, Any]]:
    """
    Merge Syntha tool schemas with user's existing tool schemas.

    Args:
        syntha_tools: Syntha's context management tools
        user_tools: User's existing tools
        handle_conflicts: How to handle name conflicts ("warn", "skip", "prefix")

    Returns:
        Combined list of tool schemas
    """
    syntha_names = {tool["name"] for tool in syntha_tools}
    combined_tools = syntha_tools.copy()

    for tool in user_tools:
        tool_name = tool.get("name")

        if tool_name in syntha_names:
            if handle_conflicts == "warn":
                print(f"Warning: Tool name conflict '{tool_name}' - user tool skipped")
                continue
            elif handle_conflicts == "skip":
                continue
            elif handle_conflicts == "prefix":
                tool = tool.copy()
                tool["name"] = f"user_{tool_name}"
                combined_tools.append(tool)
        else:
            combined_tools.append(tool)

    return combined_tools


def create_hybrid_tool_handler(context_mesh, agent_name: str, user_tool_handler=None):
    """
    Create a tool handler that combines Syntha tools with user's existing tools.

    Args:
        context_mesh: ContextMesh instance
        agent_name: Name of the agent
        user_tool_handler: User's existing tool handler function

    Returns:
        Function that can handle both Syntha and user tools
    """
    syntha_handler = ToolHandler(context_mesh, agent_name)

    def hybrid_handler(tool_name: str, **kwargs):
        """Handle both Syntha and user tools."""
        # Try Syntha tools first
        if tool_name in syntha_handler.handlers:
            return syntha_handler.handle_tool_call(tool_name, **kwargs)

        # Fallback to user's tools
        if user_tool_handler:
            try:
                return user_tool_handler(tool_name, **kwargs)
            except Exception as e:
                return {"success": False, "error": f"User tool handler error: {str(e)}"}

        return {"success": False, "error": f"Unknown tool: {tool_name}"}

    # Add utility methods
    hybrid_handler.get_syntha_schemas = syntha_handler.get_syntha_schemas_only
    hybrid_handler.handle_syntha_tool = syntha_handler.handle_tool_call

    return hybrid_handler
