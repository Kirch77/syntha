# Tool Schemas Reference

This page provides the complete OpenAI-compatible function schemas for all Syntha tools. These schemas can be used directly with any LLM that supports function calling.

## Getting All Schemas

```python
from syntha import get_all_tool_schemas, ToolHandler

# Get all available tool schemas
all_schemas = get_all_tool_schemas()

# Or get schemas from a specific handler
handler = ToolHandler(context, "MyAgent")
handler_schemas = handler.get_schemas()
```

## Core Tool Schemas

### get_context

Retrieve specific context from the shared knowledge base.

```json
{
  "name": "get_context",
  "description": "Retrieve specific context from the shared knowledge base.\n        \n        💡 TIP: Use 'list_context' first to see what's available!\n        \n        You don't need to specify your agent name - the system knows who you are.",
  "parameters": {
    "type": "object",
    "properties": {
      "keys": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Specific context keys to retrieve. Use list_context to see available options."
      }
    },
    "required": []
  }
}
```

**Usage Example:**
```python
# Get specific context items
result = handler.handle_tool_call("get_context", keys=["user_preferences", "session_data"])

# Get all accessible context
result = handler.handle_tool_call("get_context")
```

### push_context

Share context with other agents through topic-based routing.

```json
{
  "name": "push_context",
  "description": "Share context with other agents through flexible routing options.\n        \n        🎯 ROUTING OPTIONS (choose one or combine):\n        \n        1. **Topic Broadcasting** (RECOMMENDED):\n           - Use 'topics' parameter: [\"sales\", \"support\"]\n           - Routes to agents subscribed to those topics\n           - Best for: workflows, broadcasts, team coordination\n        \n        2. **Direct Agent Targeting**:\n           - Use 'subscribers' parameter: [\"Agent1\", \"Agent2\"]\n           - Routes only to those specific agents\n           - Best for: private messages, specific coordination\n        \n        3. **Combined Routing** (NEW):\n           - Use both 'topics' and 'subscribers'\n           - Routes to topic subscribers PLUS direct subscribers\n           - Best for: \"notify sales team AND the manager\"\n        \n        💡 TIP: Use 'discover_topics' first to see what topics exist and have subscribers!\n        \n        You don't need to specify your agent name - the system knows who you are.",
  "parameters": {
    "type": "object",
    "properties": {
      "key": {
        "type": "string",
        "description": "Unique identifier for this context (use descriptive names like 'customer_update' or 'task_status')"
      },
      "value": {
        "type": "string",
        "description": "Context data as a JSON string. For complex data, use JSON.stringify() first."
      },
      "topics": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Topics to broadcast to (e.g., ['sales', 'marketing', 'support'])"
      },
      "subscribers": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Specific agent names to send this context to (e.g., ['ManagerAgent', 'AdminAgent'])"
      },
      "ttl_hours": {
        "type": "number",
        "description": "How long context should remain available (hours). Default: 24 hours"
      }
    },
    "required": ["key", "value"]
  }
}
```

**Usage Example:**
```python
# Topic-based broadcasting (recommended)
result = handler.handle_tool_call("push_context",
    key="customer_update",
    value='{"name": "Acme Corp", "status": "active"}',
    topics=["sales", "support"]
)

# Direct agent targeting
result = handler.handle_tool_call("push_context",
    key="private_message",
    value="Confidential information",
    subscribers=["AdminAgent", "ManagerAgent"]
)

# Global context
result = handler.handle_tool_call("push_context",
    key="system_status",
    value="operational"
)

# Combined routing
result = handler.handle_tool_call("push_context",
    key="urgent_update",
    value="System maintenance required",
    topics=["support"], subscribers=["ManagerAgent"])

# With expiration
result = handler.handle_tool_call("push_context",
    key="temp_token",
    value="abc123",
    ttl=300  # 5 minutes
)
```

### list_context

Discover available context keys and their metadata.

```json
{
  "name": "list_context",
  "description": "Discover available context keys and their metadata.\n        \n        💡 TIP: Use this to explore what context is available before calling get_context!\n        \n        Returns keys you have access to, along with helpful metadata.",
  "parameters": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "Optional filter pattern for context keys (e.g., 'user_*' to find all user-related context)"
      }
    },
    "required": []
  }
}
```

**Usage Example:**
```python
# List all accessible context
result = handler.handle_tool_call("list_context")

# Filter by pattern
result = handler.handle_tool_call("list_context", pattern="user_*")
```

### subscribe_to_topics

Subscribe to topic-based context routing.

```json
{
  "name": "subscribe_to_topics",
  "description": "Subscribe to topic-based context routing.\n        \n        🎯 This is how you tell the system what kinds of context you want to receive!\n        \n        After subscribing, you'll automatically receive context pushed to these topics.\n        \n        💡 TIP: Choose topics that match your role (e.g., 'sales', 'support', 'analytics')",
  "parameters": {
    "type": "object",
    "properties": {
      "topics": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "List of topics to subscribe to (e.g., ['sales', 'customers', 'reports'])"
      }
    },
    "required": ["topics"]
  }
}
```

**Usage Example:**
```python
# Subscribe to relevant topics
result = handler.handle_tool_call("subscribe_to_topics", 
    topics=["sales", "customers", "leads"]
)
```

### discover_topics

Find available topics and their subscriber counts.

```json
{
  "name": "discover_topics",
  "description": "Find available topics and their subscriber counts.\n        \n        🔍 Use this to explore what topics exist in the system!\n        \n        Great for understanding the communication landscape and finding relevant topics to subscribe to.\n        \n        💡 TIP: Look for topics with active subscribers - they're likely to have interesting context!",
  "parameters": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "description": "Optional filter pattern for topic names (e.g., 'sales*' to find sales-related topics)"
      }
    },
    "required": []
  }
}
```

**Usage Example:**
```python
# Discover all topics
result = handler.handle_tool_call("discover_topics")

# Find topics matching a pattern
result = handler.handle_tool_call("discover_topics", pattern="sales*")
```

### unsubscribe_from_topics

Unsubscribe from specific topics.

```json
{
  "name": "unsubscribe_from_topics",
  "description": "Unsubscribe from specific topics.\n        \n        🚫 Stop receiving context from topics you're no longer interested in.\n        \n        This helps keep your context feed focused and relevant.\n        \n        💡 TIP: Regularly review and clean up your subscriptions to avoid information overload!",
  "parameters": {
    "type": "object",
    "properties": {
      "topics": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "List of topics to unsubscribe from"
      }
    },
    "required": ["topics"]
  }
}
```

**Usage Example:**
```python
# Unsubscribe from topics
result = handler.handle_tool_call("unsubscribe_from_topics", 
    topics=["old_topic", "unused_topic"]
)
```

### delete_topic

Delete an entire topic and all associated context.

```json
{
  "name": "delete_topic",
  "description": "Delete an entire topic and all its associated context.\n        \n        ⚠️ WARNING: This is a destructive operation that will:\n        - Remove the topic from all agent subscriptions\n        - Delete all context items that were only pushed to this topic\n        - Cannot be undone\n        \n        Use with caution! Consider checking topic subscribers first with discover_topics.",
  "parameters": {
    "type": "object",
    "properties": {
      "topic": {
        "type": "string",
        "description": "Name of the topic to delete"
      },
      "confirm": {
        "type": "boolean",
        "description": "Confirmation that you want to delete this topic (must be true)"
      }
    },
    "required": ["topic", "confirm"]
  }
}
```

**Usage Example:**
```python
# Delete a topic (requires confirmation)
result = handler.handle_tool_call("delete_topic", 
    topic="obsolete_topic", 
    confirm=True
)
```

## Schema Response Formats

All tools return responses in a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "agent_name": "MyAgent",
  // Additional tool-specific data...
}
```

### Error Response

```json
{
  "success": false,
  "error": "Description of what went wrong",
  "suggestion": "How to fix the issue",
  "agent_name": "MyAgent",
  // Additional error context...
}
```

## Tool-Specific Response Examples

### get_context Response

```json
{
  "success": true,
  "context": {
    "user_preferences": {"theme": "dark", "language": "en"},
    "session_data": {"logged_in": true, "role": "user"}
  },
  "agent_name": "MyAgent",
  "keys_requested": ["user_preferences", "session_data"],
  "keys_found": ["user_preferences", "session_data"],
  "message": "Retrieved 2 context items"
}
```

### push_context Response

```json
{
  "success": true,
  "key": "customer_update",
  "topics": ["sales", "support"],
  "subscribers_notified": ["SalesAgent", "SupportAgent"],
  "message": "Context pushed to 2 topics, notified 2 subscribers",
  "agent_name": "MyAgent"
}
```

### list_context Response

```json
{
  "success": true,
  "context_keys": [
    {
      "key": "user_preferences",
      "accessible": true,
      "has_ttl": false,
      "source": "global"
    },
    {
      "key": "session_data", 
      "accessible": true,
      "has_ttl": true,
      "ttl_remaining": 3542,
      "source": "topic:user_sessions"
    }
  ],
  "total_keys": 2,
  "agent_name": "MyAgent",
  "message": "Found 2 accessible context keys"
}
```

### subscribe_to_topics Response

```json
{
  "success": true,
  "topics_subscribed": ["sales", "customers", "leads"],
  "new_subscriptions": ["leads"],
  "existing_subscriptions": ["sales", "customers"],
  "total_subscriptions": 3,
  "agent_name": "MyAgent",
  "message": "Successfully subscribed to 3 topics (1 new, 2 existing)"
}
```

### discover_topics Response

```json
{
  "success": true,
  "topics": [
    {
      "name": "sales",
      "subscriber_count": 3,
      "subscribers": ["SalesAgent", "ManagerAgent", "AnalyticsAgent"],
      "recent_activity": true
    },
    {
      "name": "support",
      "subscriber_count": 2,
      "subscribers": ["SupportAgent", "ManagerAgent"],
      "recent_activity": false
    }
  ],
  "total_topics": 2,
  "agent_name": "MyAgent",
  "message": "Found 2 available topics"
}
```

### unsubscribe_from_topics Response

```json
{
  "success": true,
  "topics_unsubscribed": ["old_topic"],
  "topics_not_found": ["nonexistent_topic"],
  "remaining_subscriptions": ["sales", "support"],
  "agent_name": "MyAgent",
  "message": "Successfully unsubscribed from: old_topic. Remaining subscriptions: sales, support"
}
```

### delete_topic Response

```json
{
  "success": true,
  "topic": "obsolete_topic",
  "subscribers_affected": ["Agent1", "Agent2"],
  "context_items_deleted": 5,
  "message": "Successfully deleted topic 'obsolete_topic'. Removed 2 subscribers and 5 context items."
}
```

## Using Schemas with Different LLM Frameworks

### OpenAI Function Calling

```python
import openai
from syntha import ToolHandler

handler = ToolHandler(context, "MyAgent")
tools = [{"type": "function", "function": schema} 
         for schema in handler.get_tool_schemas()]

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Check available context"}],
    tools=tools
)

# Handle function calls
if response.choices[0].message.tool_calls:
    for tool_call in response.choices[0].message.tool_calls:
        result = handler.handle_tool_call(
            tool_call.function.name,
            **json.loads(tool_call.function.arguments)
        )
```

### Anthropic Claude

```python
import anthropic
from syntha import ToolHandler

handler = ToolHandler(context, "MyAgent")
tools = handler.get_tool_schemas()

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Help me manage context"}],
    tools=tools
)

# Handle tool calls
for content in response.content:
    if content.type == "tool_use":
        result = handler.handle_tool_call(content.name, **content.input)
```

### Custom LLM Integration

```python
from syntha import ToolHandler

# Get schemas in standard format
handler = ToolHandler(context, "MyAgent")
schemas = handler.get_tool_schemas()

# Convert to your LLM's format if needed
def convert_schema_format(schema):
    """Convert OpenAI format to your LLM's format."""
    return {
        "function_name": schema["name"],
        "description": schema["description"],
        "parameters": schema["parameters"]
    }

custom_schemas = [convert_schema_format(s) for s in schemas]

# Use with your LLM...
# response = your_llm.generate(messages, tools=custom_schemas)

# Handle the response
# result = handler.handle_tool_call(function_name, **parameters)
```

## Access Control and Schema Filtering

Tool schemas are automatically filtered based on agent permissions:

```python
from syntha import ToolHandler

# Admin agent sees all tools
admin_handler = ToolHandler(context, "AdminAgent", denied_tools=[])
admin_schemas = admin_handler.get_tool_schemas()
print(f"Admin tools: {[s['name'] for s in admin_schemas]}")

# Readonly agent sees limited tools
readonly_handler = ToolHandler(context, "ReadonlyAgent", 
                              allowed_tools=["get_context", "list_context"])
readonly_schemas = readonly_handler.get_tool_schemas()
print(f"Readonly tools: {[s['name'] for s in readonly_schemas]}")

# Safe agent sees all except dangerous tools
safe_handler = ToolHandler(context, "SafeAgent", denied_tools=["delete_topic"])
safe_schemas = safe_handler.get_tool_schemas()
print(f"Safe tools: {[s['name'] for s in safe_schemas]}")
```

## Validation and Error Handling

The schemas include validation that helps catch common errors:

```python
# This will succeed
result = handler.handle_tool_call("push_context",
    key="valid_key",
    value="valid_value",
    topics=["sales"]
)

# This will fail - can't use both topics and subscribers
result = handler.handle_tool_call("push_context",
    key="invalid_key", 
    value="value",
    topics=["sales"],
    subscribers=["Agent1"]  # Error: can't use both
)

# Response will be:
# {
#   "success": false,
#   "error": "Cannot specify both 'topics' and 'subscribers'",
#   "suggestion": "Use either topics for broadcasting or subscribers for direct targeting"
# }
```

---

This completes the comprehensive tool schemas reference. All schemas are directly derived from the actual Syntha codebase and are ready to use with any LLM framework supporting function calling.