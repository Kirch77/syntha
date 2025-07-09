# ToolHandler API Reference

The `ToolHandler` class provides the interface between your LLM and the Syntha context system through standardized function calling.

## Constructor

```python
from syntha import ToolHandler

handler = ToolHandler(context_mesh, enable_logging=True)
```

### Parameters

- `context_mesh` (ContextMesh): The mesh instance to connect to
- `enable_logging` (bool, optional): Enable detailed logging. Default: `True`

## Methods

### get_schemas()

Returns the tool schemas for all 7 standardized Syntha tools.

```python
schemas = handler.get_schemas()
# Returns list of OpenAI-compatible function schemas
```

**Returns**: List of tool schema dictionaries compatible with OpenAI, Anthropic, and other LLM APIs.

### handle_tool_call(tool_name, **kwargs)

Processes a tool call from the LLM and returns the result.

```python
result = handler.handle_tool_call(
    "get_context",
    agent_name="Agent1",
    key="user_data"
)
```

**Parameters**:
- `tool_name` (str): Name of the tool to execute
- `**kwargs`: Tool-specific parameters

**Returns**: Tool execution result (varies by tool)

**Raises**: 
- `ValueError`: Invalid tool name or parameters
- `KeyError`: Context key not found (for get_context)
- `PermissionError`: Access denied (for restricted context)

## Tool Reference

### Context Management Tools

#### get_context
Retrieve context data for an agent.

```python
result = handler.handle_tool_call(
    "get_context",
    agent_name="Agent1",
    key="data_key"
)
```

#### push_context
Store context data with optional access control.

```python
result = handler.handle_tool_call(
    "push_context",
    agent_name="Agent1",
    key="data_key",
    value={"important": "data"},
    subscribers=["Agent2", "Agent3"],  # Optional
    ttl=3600  # Optional, seconds
)
```

#### list_context_keys
List all context keys accessible to an agent.

```python
result = handler.handle_tool_call(
    "list_context_keys",
    agent_name="Agent1",
    pattern="user_*"  # Optional filter
)
```

### Agent Communication Tools

#### send_message_to_agent
Send a direct message to another agent.

```python
result = handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Agent1",
    to_agent="Agent2",
    message="Task completed",
    message_type="result",  # info, task, result, error
    priority="normal",      # low, normal, high, urgent
    thread_id="thread_123", # Optional
    requires_confirmation=False  # Optional
)
```

#### get_messages_from_agents
Retrieve messages for an agent with filtering.

```python
result = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="Agent1",
    unread_only=True,
    priority="high",
    message_type="task",
    thread_id="thread_123",
    limit=10,
    mark_as_read=True
)
```

#### broadcast_message_to_agents
Send a message to multiple agents.

```python
result = handler.handle_tool_call(
    "broadcast_message_to_agents",
    from_agent="Manager",
    to_agents=["Agent1", "Agent2", "Agent3"],
    message="System maintenance at 3 PM",
    message_type="info",
    priority="normal",
    create_thread=True
)
```

### Advanced Tools

#### batch_context_operation
Execute multiple context operations atomically.

```python
result = handler.handle_tool_call(
    "batch_context_operation",
    agent_name="Agent1",
    operations=[
        {"type": "push", "key": "metric1", "value": 100},
        {"type": "push", "key": "metric2", "value": 200},
        {"type": "get", "key": "existing_data"}
    ],
    atomic=True  # All operations succeed or all fail
)
```

## Error Handling

The ToolHandler provides comprehensive error handling:

```python
try:
    result = handler.handle_tool_call("get_context", agent_name="Agent1", key="nonexistent")
except KeyError as e:
    print(f"Context key not found: {e}")
except PermissionError as e:
    print(f"Access denied: {e}")
except ValueError as e:
    print(f"Invalid parameters: {e}")
```

## Best Practices

### 1. Always Handle Errors
```python
def safe_tool_call(handler, tool_name, **kwargs):
    try:
        return handler.handle_tool_call(tool_name, **kwargs)
    except Exception as e:
        return {"error": str(e), "tool": tool_name}
```

### 2. Use Type Hints
```python
from typing import Dict, Any, List

def process_tool_calls(handler: ToolHandler, calls: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    results = []
    for call in calls:
        result = handler.handle_tool_call(call["name"], **call["args"])
        results.append(result)
    return results
```

### 3. Validate Tool Results
```python
def validate_context_result(result):
    if isinstance(result, dict) and "error" in result:
        raise ValueError(f"Tool error: {result['error']}")
    return result
```

## Integration Examples

### OpenAI Integration
```python
import openai
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh()
handler = ToolHandler(mesh)

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Get user data"}],
    tools=handler.get_schemas()
)

# Process tool calls
for tool_call in response.choices[0].message.tool_calls or []:
    result = handler.handle_tool_call(
        tool_call.function.name,
        **json.loads(tool_call.function.arguments)
    )
```

### Anthropic Claude Integration
```python
import anthropic
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh()
handler = ToolHandler(mesh)

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Get user data"}],
    tools=handler.get_schemas()
)

# Process tool calls
for content in response.content:
    if content.type == "tool_use":
        result = handler.handle_tool_call(content.name, **content.input)
```

## Performance Considerations

- **Batch Operations**: Use `batch_context_operation` for multiple context changes
- **Connection Pooling**: Reuse ToolHandler instances across requests
- **Error Caching**: Cache error responses to avoid repeated failures
- **Schema Caching**: Cache tool schemas to avoid repeated generation

## See Also

- [ContextMesh API](context-mesh.md) - Understanding the underlying context system
- [Tool Schemas](tool-schemas.md) - Detailed schemas for all tools
- [LLM Integration Guide](../guides/integrations/) - Framework-specific integration patterns
