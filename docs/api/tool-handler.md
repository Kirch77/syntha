# Tool Handler API Reference

The ToolHandler class provides the primary interface for AI agents to interact with the Syntha context mesh. It offers methods for storing, retrieving, and managing context data.

## Class: ToolHandler

```python
class ToolHandler:
    def __init__(self, context_mesh: ContextMesh, agent_name: str, **kwargs)
```

### Constructor Parameters

- `context_mesh`: The ContextMesh instance to operate on
- `agent_name`: Unique identifier for the agent using this handler
- `**kwargs`: Additional configuration options

## Core Methods

### Context Management

#### push_context(key, data, topic=None, metadata=None)
Store context data in the mesh.

**Parameters:**
- `key` (str): Unique identifier for the context data
- `data` (Any): The context data to store
- `topic` (str, optional): Topic to associate with this context
- `metadata` (dict, optional): Additional metadata

**Returns:** None

**Example:**
```python
handler.push_context("user_preferences", {
    "theme": "dark",
    "language": "en"
}, topic="user_settings")
```

#### get_context(key)
Retrieve context data by key.

**Parameters:**
- `key` (str): The context key to retrieve

**Returns:** The stored context data or None if not found

**Example:**
```python
preferences = handler.get_context("user_preferences")
```

#### has_context(key)
Check if context exists for a given key.

**Parameters:**
- `key` (str): The context key to check

**Returns:** bool - True if context exists

**Example:**
```python
if handler.has_context("user_preferences"):
    preferences = handler.get_context("user_preferences")
```

#### remove_context(key)
Remove context data by key.

**Parameters:**
- `key` (str): The context key to remove

**Returns:** bool - True if context was removed

**Example:**
```python
handler.remove_context("temporary_data")
```

#### list_context_keys()
Get a list of all context keys.

**Returns:** List[str] - All available context keys

**Example:**
```python
keys = handler.list_context_keys()
print(f"Available context: {keys}")
```

### Topic Management

#### get_context_by_topic(topic)
Retrieve all context data for a specific topic.

**Parameters:**
- `topic` (str): The topic to retrieve context for

**Returns:** Dict[str, Any] - All context data associated with the topic

**Example:**
```python
user_data = handler.get_context_by_topic("user_settings")
```

#### list_topics()
Get a list of all available topics.

**Returns:** List[str] - All available topics

**Example:**
```python
topics = handler.list_topics()
```

#### subscribe_to_topic(topic, callback)
Subscribe to updates on a specific topic.

**Parameters:**
- `topic` (str): The topic to subscribe to
- `callback` (callable): Function to call when topic is updated

**Callback Signature:**
```python
def callback(topic: str, context_key: str, data: Any) -> None:
    pass
```

**Example:**
```python
def on_user_update(topic, key, data):
    print(f"User data updated: {key}")

handler.subscribe_to_topic("user_settings", on_user_update)
```

### Advanced Methods

#### get_context_pattern(pattern)
Retrieve context data matching a pattern.

**Parameters:**
- `pattern` (str): Glob-style pattern to match keys

**Returns:** Dict[str, Any] - All matching context data

**Example:**
```python
user_data = handler.get_context_pattern("user_*")
```

#### clear_all_context()
Remove all context data for this handler's user.

**Warning:** This operation cannot be undone.

**Returns:** None

**Example:**
```python
handler.clear_all_context()  # Use with caution!
```

## Properties

### agent_name
The name of the agent using this handler.

```python
print(f"Agent name: {handler.agent_name}")
```

### context_mesh
Reference to the underlying context mesh.

```python
mesh = handler.context_mesh
```

## Error Handling

The ToolHandler raises specific exceptions for different error conditions:

```python
from syntha.exceptions import (
    ContextNotFoundError,
    InvalidContextKeyError,
    PermissionDeniedError
)

try:
    data = handler.get_context("nonexistent_key")
except ContextNotFoundError:
    print("Context not found")
except PermissionDeniedError:
    print("Access denied")
```

## Thread Safety

ToolHandler instances are thread-safe and can be used concurrently:

```python
import threading

def agent_task(handler, task_id):
    handler.push_context(f"task_{task_id}", {"status": "completed"})

# Multiple threads can use the same handler safely
threads = [
    threading.Thread(target=agent_task, args=(handler, i))
    for i in range(10)
]

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()
```

## Best Practices

1. **Descriptive Keys**: Use clear, descriptive context keys
2. **Consistent Naming**: Establish naming conventions for your application
3. **Topic Organization**: Use topics to group related context data
4. **Error Handling**: Always handle potential exceptions
5. **Resource Cleanup**: Consider removing temporary context when done

## Complete Example

```python
from syntha import ContextMesh, ToolHandler

# Create context mesh and handler
mesh = ContextMesh(user_id="example_user")
handler = ToolHandler(mesh, "ExampleAgent")

# Store and retrieve context
handler.push_context("config", {"debug": True}, topic="settings")
config = handler.get_context("config")

# Use topics for organization
handler.subscribe_to_topic("settings", lambda t, k, d: print(f"Setting changed: {k}"))

# Clean up
mesh.close()
```

## See Also

- [Context Mesh API](context-mesh.md)
- [Framework Adapters API](framework-adapters.md)
- [Tool Basics Example](../examples/tools/tool-basics.md)
- [Multi-Agent Setup](../examples/tools/multi-agent.md)
