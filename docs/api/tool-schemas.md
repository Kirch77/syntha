# Tool Schemas Reference

This document provides the complete schema definitions for all 7 standardized Syntha tools. These schemas are compatible with OpenAI Function Calling, Anthropic Tools API, and other LLM frameworks.

## Schema Format

All tool schemas follow the OpenAI Function Calling format, which is widely supported:

```json
{
  "type": "function",
  "function": {
    "name": "tool_name",
    "description": "Tool description",
    "parameters": {
      "type": "object",
      "properties": {
        "param_name": {
          "type": "string",
          "description": "Parameter description"
        }
      },
      "required": ["param_name"]
    }
  }
}
```

## Context Management Tools

### 1. get_context

Retrieve context data for an agent.

```json
{
  "type": "function",
  "function": {
    "name": "get_context",
    "description": "Retrieve context data from the shared knowledge mesh for a specific agent",
    "parameters": {
      "type": "object",
      "properties": {
        "agent_name": {
          "type": "string",
          "description": "Name of the agent requesting the context"
        },
        "key": {
          "type": "string", 
          "description": "The context key to retrieve"
        }
      },
      "required": ["agent_name", "key"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "get_context",
    agent_name="DataAnalyst",
    key="user_metrics"
)
```

### 2. push_context

Store context data with optional access control and TTL.

```json
{
  "type": "function",
  "function": {
    "name": "push_context",
    "description": "Store context data in the shared knowledge mesh with optional access control",
    "parameters": {
      "type": "object",
      "properties": {
        "agent_name": {
          "type": "string",
          "description": "Name of the agent storing the context"
        },
        "key": {
          "type": "string",
          "description": "The context key to store"
        },
        "value": {
          "description": "The context value to store (any JSON-serializable data)"
        },
        "subscribers": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Optional list of agent names that can access this context"
        },
        "ttl": {
          "type": "integer",
          "description": "Optional time-to-live in seconds"
        }
      },
      "required": ["agent_name", "key", "value"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "push_context",
    agent_name="DataCollector",
    key="daily_metrics",
    value={"users": 1500, "revenue": 50000},
    subscribers=["DataAnalyst", "ReportGenerator"],
    ttl=86400  # 24 hours
)
```

### 3. list_context_keys

List all context keys accessible to an agent.

```json
{
  "type": "function", 
  "function": {
    "name": "list_context_keys",
    "description": "List all context keys that an agent can access",
    "parameters": {
      "type": "object",
      "properties": {
        "agent_name": {
          "type": "string",
          "description": "Name of the agent requesting the key list"
        },
        "pattern": {
          "type": "string",
          "description": "Optional glob pattern to filter keys (e.g., 'user_*')"
        }
      },
      "required": ["agent_name"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "list_context_keys",
    agent_name="DataAnalyst",
    pattern="metrics_*"
)
```

## Agent Communication Tools

### 4. send_message_to_agent

Send a direct message to another agent.

```json
{
  "type": "function",
  "function": {
    "name": "send_message_to_agent",
    "description": "Send a direct message to another agent in the system",
    "parameters": {
      "type": "object",
      "properties": {
        "from_agent": {
          "type": "string",
          "description": "Name of the agent sending the message"
        },
        "to_agent": {
          "type": "string", 
          "description": "Name of the agent receiving the message"
        },
        "message": {
          "type": "string",
          "description": "The message content to send"
        },
        "message_type": {
          "type": "string",
          "enum": ["info", "task", "result", "error", "question"],
          "description": "Type of message being sent"
        },
        "priority": {
          "type": "string",
          "enum": ["low", "normal", "high", "urgent"],
          "description": "Priority level of the message"
        },
        "thread_id": {
          "type": "string",
          "description": "Optional thread ID to group related messages"
        },
        "requires_confirmation": {
          "type": "boolean",
          "description": "Whether the message requires read confirmation"
        }
      },
      "required": ["from_agent", "to_agent", "message"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="TaskManager",
    to_agent="DataProcessor", 
    message="Please process the new user data file",
    message_type="task",
    priority="high",
    requires_confirmation=True
)
```

### 5. get_messages_from_agents

Retrieve messages for an agent with filtering options.

```json
{
  "type": "function",
  "function": {
    "name": "get_messages_from_agents",
    "description": "Retrieve messages for an agent with various filtering options",
    "parameters": {
      "type": "object",
      "properties": {
        "agent_name": {
          "type": "string",
          "description": "Name of the agent retrieving messages"
        },
        "unread_only": {
          "type": "boolean",
          "description": "Only return unread messages"
        },
        "priority": {
          "type": "string",
          "enum": ["low", "normal", "high", "urgent"],
          "description": "Filter by message priority"
        },
        "message_type": {
          "type": "string", 
          "enum": ["info", "task", "result", "error", "question"],
          "description": "Filter by message type"
        },
        "thread_id": {
          "type": "string",
          "description": "Filter by thread ID"
        },
        "from_agent": {
          "type": "string",
          "description": "Filter by sender agent name"
        },
        "limit": {
          "type": "integer",
          "description": "Maximum number of messages to return"
        },
        "mark_as_read": {
          "type": "boolean",
          "description": "Mark retrieved messages as read"
        }
      },
      "required": ["agent_name"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="DataProcessor",
    unread_only=True,
    priority="high",
    message_type="task",
    mark_as_read=True
)
```

### 6. broadcast_message_to_agents

Send a message to multiple agents simultaneously.

```json
{
  "type": "function",
  "function": {
    "name": "broadcast_message_to_agents", 
    "description": "Send a message to multiple agents simultaneously",
    "parameters": {
      "type": "object",
      "properties": {
        "from_agent": {
          "type": "string",
          "description": "Name of the agent sending the broadcast"
        },
        "to_agents": {
          "type": "array",
          "items": {"type": "string"},
          "description": "List of agent names to receive the message"
        },
        "message": {
          "type": "string",
          "description": "The message content to broadcast"
        },
        "message_type": {
          "type": "string",
          "enum": ["info", "task", "result", "error", "question"],
          "description": "Type of message being sent"
        },
        "priority": {
          "type": "string",
          "enum": ["low", "normal", "high", "urgent"], 
          "description": "Priority level of the message"
        },
        "create_thread": {
          "type": "boolean",
          "description": "Whether to create a new thread for this broadcast"
        },
        "thread_id": {
          "type": "string",
          "description": "Optional existing thread ID to use"
        }
      },
      "required": ["from_agent", "to_agents", "message"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "broadcast_message_to_agents",
    from_agent="SystemManager",
    to_agents=["DataProcessor", "FileHandler", "Logger"],
    message="System maintenance scheduled for 3 PM",
    message_type="info",
    priority="normal",
    create_thread=True
)
```

## Advanced Tools

### 7. batch_context_operation

Execute multiple context operations atomically.

```json
{
  "type": "function",
  "function": {
    "name": "batch_context_operation",
    "description": "Execute multiple context operations in a single atomic transaction",
    "parameters": {
      "type": "object", 
      "properties": {
        "agent_name": {
          "type": "string",
          "description": "Name of the agent performing the batch operation"
        },
        "operations": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": ["push", "get", "delete"],
                "description": "Type of operation to perform"
              },
              "key": {
                "type": "string",
                "description": "Context key for the operation"
              },
              "value": {
                "description": "Value to push (only for push operations)"
              },
              "subscribers": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Subscribers for push operations"
              },
              "ttl": {
                "type": "integer",
                "description": "TTL for push operations"
              }
            },
            "required": ["type", "key"]
          },
          "description": "List of operations to execute"
        },
        "atomic": {
          "type": "boolean",
          "description": "Whether all operations must succeed or all fail"
        }
      },
      "required": ["agent_name", "operations"]
    }
  }
}
```

**Usage Example:**
```python
result = handler.handle_tool_call(
    "batch_context_operation",
    agent_name="DataManager",
    operations=[
        {"type": "push", "key": "user_count", "value": 1500},
        {"type": "push", "key": "active_sessions", "value": 245},
        {"type": "get", "key": "previous_metrics"},
        {"type": "delete", "key": "temp_data"}
    ],
    atomic=True
)
```

## Framework-Specific Usage

### OpenAI Function Calling

```python
import openai
from syntha import ToolHandler

handler = ToolHandler(context_mesh)
tools = handler.get_schemas()

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Get the user metrics"}],
    tools=tools,
    tool_choice="auto"
)

# Process tool calls
for tool_call in response.choices[0].message.tool_calls or []:
    result = handler.handle_tool_call(
        tool_call.function.name,
        **json.loads(tool_call.function.arguments)
    )
```

### Anthropic Claude Tools

```python
import anthropic
from syntha import ToolHandler

handler = ToolHandler(context_mesh)
tools = handler.get_schemas()

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Get the user metrics"}],
    tools=tools
)

# Process tool uses
for content in response.content:
    if content.type == "tool_use":
        result = handler.handle_tool_call(content.name, **content.input)
```

### LangGraph Integration

```python
from langgraph import StateGraph
from syntha import ToolHandler

def create_syntha_node(context_mesh):
    handler = ToolHandler(context_mesh)
    tools = handler.get_schemas()
    
    def syntha_node(state):
        # Use tools in LangGraph node
        result = handler.handle_tool_call(
            state["tool_name"], 
            **state["tool_args"]
        )
        return {"result": result}
    
    return syntha_node
```

## Schema Validation

### Custom Validation

```python
def validate_tool_call(tool_name, **kwargs):
    """Validate tool call parameters against schema"""
    handler = ToolHandler(context_mesh)
    schemas = {tool["function"]["name"]: tool["function"] for tool in handler.get_schemas()}
    
    if tool_name not in schemas:
        raise ValueError(f"Unknown tool: {tool_name}")
    
    schema = schemas[tool_name]
    required_params = schema["parameters"].get("required", [])
    
    for param in required_params:
        if param not in kwargs:
            raise ValueError(f"Missing required parameter: {param}")
    
    return True
```

### Type Checking

```python
from typing import Dict, Any, List

def type_check_parameters(tool_name: str, parameters: Dict[str, Any]) -> bool:
    """Type check tool parameters"""
    handler = ToolHandler(context_mesh)
    schemas = {tool["function"]["name"]: tool["function"] for tool in handler.get_schemas()}
    
    schema = schemas[tool_name]["parameters"]["properties"]
    
    for param_name, param_value in parameters.items():
        if param_name in schema:
            expected_type = schema[param_name]["type"]
            if not _check_type(param_value, expected_type):
                raise TypeError(f"Parameter {param_name} should be {expected_type}")
    
    return True
```

## Performance Considerations

- **Schema Caching**: Tool schemas are static; cache them to avoid repeated generation
- **Batch Operations**: Use `batch_context_operation` for multiple context changes
- **Selective Tools**: Only include necessary tools in your LLM requests
- **Parameter Validation**: Validate parameters before making tool calls

## Error Handling

All tools return consistent error formats:

```json
{
  "error": "Error description",
  "error_code": "ERROR_CODE",
  "tool": "tool_name",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

Common error codes:
- `INVALID_AGENT`: Agent name not found
- `ACCESS_DENIED`: Permission denied for context/message
- `KEY_NOT_FOUND`: Context key doesn't exist
- `INVALID_PARAMETERS`: Invalid tool parameters
- `TIMEOUT`: Operation timed out

## See Also

- [ToolHandler API](tool-handler.md) - Using the tool handler
- [ContextMesh API](context-mesh.md) - Understanding the context system
- [Integration Guides](../guides/integrations/) - Framework-specific implementations
