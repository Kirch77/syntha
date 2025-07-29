# Tools API Reference

The Tools API provides LLM-compatible function calling interfaces for agents to interact with the context mesh. It includes the `ToolHandler` class and various utility functions for managing tool access control.

## ToolHandler Class

The `ToolHandler` class provides a unified interface for processing function calls from LLM frameworks with automatic agent identification and configurable access control.

### Class Definition

```python
class ToolHandler:
    def __init__(
        self,
        context_mesh: ContextMesh,
        agent_name: Optional[str] = None,
        allowed_tools: Optional[List[str]] = None,
        denied_tools: Optional[List[str]] = None,
        role_based_access: Optional[Dict[str, List[str]]] = None,
    )
```

#### Parameters

- **context_mesh** (ContextMesh): The shared context mesh instance
- **agent_name** (Optional[str]): Agent name for automatic injection
- **allowed_tools** (Optional[List[str]]): List of tool names this agent can access
- **denied_tools** (Optional[List[str]]): List of tool names this agent cannot access
- **role_based_access** (Optional[Dict[str, List[str]]]): Dict mapping roles to allowed tools

#### Examples

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")

# Allow all tools (default)
handler = ToolHandler(context, "MyAgent")

# Only allow read operations
handler = ToolHandler(context, "ReadOnlyAgent", 
                     allowed_tools=["get_context", "list_context"])

# Allow all except dangerous operations
handler = ToolHandler(context, "SafeAgent", 
                     denied_tools=["delete_topic"])

# Role-based access
roles = {
    "reader": ["get_context", "list_context", "discover_topics"],
    "contributor": ["get_context", "push_context", "subscribe_to_topics"],
    "admin": ["delete_topic"]
}
handler = ToolHandler(context, "MyAgent", role_based_access=roles)
```

### Core Methods

#### handle_tool_call()

Process a function call from an LLM framework.

```python
def handle_tool_call(self, tool_name: str, **kwargs) -> Dict[str, Any]
```

**Parameters:**
- **tool_name** (str): Name of the tool to execute
- **kwargs**: Tool-specific parameters

**Returns:** Dictionary with execution result and metadata

**Example:**
```python
# Handle a function call from an LLM
result = handler.handle_tool_call("push_context", 
                                  key="user_status", 
                                  value="online",
                                  topics=["presence"])

if result["success"]:
    print(f"Context pushed: {result['message']}")
else:
    print(f"Error: {result['error']}")
```

#### get_tool_schemas()

Get OpenAI-compatible function schemas for all available tools.

```python
def get_tool_schemas(self) -> List[Dict[str, Any]]
```

**Returns:** List of function schemas compatible with OpenAI API

**Example:**
```python
# Get schemas for LLM function calling
schemas = handler.get_tool_schemas()

# Use with OpenAI
client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=[{"type": "function", "function": schema} for schema in schemas]
)
```

#### set_agent_role()

Set the agent's role for role-based access control.

```python
def set_agent_role(self, role: str) -> None
```

**Example:**
```python
handler.set_agent_role("admin")
```

#### get_available_tools()

Get list of tools available to this agent.

```python
def get_available_tools(self) -> List[str]
```

## Available Tools

The following tools are available through ToolHandler:

### get_context
Retrieve specific context from the shared knowledge base.

**Parameters:**
- `keys` (Optional[List[str]]): Specific context keys to retrieve

**Example:**
```python
result = handler.handle_tool_call("get_context", keys=["user_preferences"])
```

### push_context
Share context with other agents through topic-based routing.

**Parameters:**
- `key` (str): Context identifier
- `value` (str): Context data (JSON string for complex data)
- `topics` (Optional[List[str]]): Topics to broadcast to
- `ttl` (Optional[int]): Time-to-live in seconds

**Example:**
```python
result = handler.handle_tool_call("push_context",
                                  key="customer_update",
                                  value='{"name": "Acme Corp", "status": "active"}',
                                  topics=["sales", "support"])
```

### list_context
Discover available context keys.

**Parameters:**
- `pattern` (Optional[str]): Filter pattern for keys

**Example:**
```python
result = handler.handle_tool_call("list_context", pattern="user_*")
```

### subscribe_to_topics
Subscribe to topic-based context routing.

**Parameters:**
- `topics` (List[str]): Topics to subscribe to

**Example:**
```python
result = handler.handle_tool_call("subscribe_to_topics", 
                                  topics=["sales", "customers"])
```

### discover_topics
Find available topics and their subscriber counts.

**Parameters:**
- `pattern` (Optional[str]): Filter pattern for topic names

**Example:**
```python
result = handler.handle_tool_call("discover_topics")
```

### unsubscribe_from_topics
Unsubscribe from specific topics.

**Parameters:**
- `topics` (List[str]): Topics to unsubscribe from

**Example:**
```python
result = handler.handle_tool_call("unsubscribe_from_topics", 
                                  topics=["old_topic"])
```

### delete_topic
Delete an entire topic and all associated context.

**Parameters:**
- `topic` (str): Name of the topic to delete
- `confirm` (bool): Confirmation flag (must be True)

!!! warning "Destructive Operation"
    This permanently removes the topic and all associated context.

**Example:**
```python
result = handler.handle_tool_call("delete_topic", 
                                  topic="obsolete_topic", 
                                  confirm=True)
```

## Access Control Functions

### Predefined Roles

Syntha includes predefined roles for common access patterns:

```python
from syntha import PREDEFINED_ROLES, get_role_info

# View all available roles
print(get_role_info())

# Get specific role info
admin_info = get_role_info("admin")
```

**Available Roles:**

- **readonly**: Read-only access to context and discovery
  - Tools: `get_context`, `list_context`, `discover_topics`

- **contributor**: Can read, write, and manage topic subscriptions
  - Tools: `get_context`, `list_context`, `discover_topics`, `push_context`, `subscribe_to_topics`, `unsubscribe_from_topics`

- **moderator**: Contributor permissions plus ability to manage others' subscriptions
  - Tools: Same as contributor (currently identical to contributor)

- **admin**: Full access including destructive operations
  - Tools: All tools including `delete_topic`

### create_role_based_handler()

Create a ToolHandler with predefined role-based access.

```python
def create_role_based_handler(
    context_mesh: ContextMesh,
    agent_name: str,
    role: str,
    custom_roles: Optional[Dict[str, Dict[str, Any]]] = None,
) -> ToolHandler
```

**Example:**
```python
from syntha import create_role_based_handler

# Use predefined roles
readonly_handler = create_role_based_handler(context, "viewer", "readonly")
admin_handler = create_role_based_handler(context, "admin", "admin")

# Use custom roles
custom_roles = {
    "analyst": {
        "description": "Data analysis role",
        "tools": ["get_context", "list_context", "push_context"]
    }
}
analyst_handler = create_role_based_handler(context, "analyst1", "analyst", custom_roles)
```

### create_restricted_handler()

Create a ToolHandler with common restriction patterns.

```python
def create_restricted_handler(
    context_mesh: ContextMesh, 
    agent_name: str, 
    restriction_level: str = "safe"
) -> ToolHandler
```

**Restriction Levels:**
- **safe**: All tools except destructive ones
- **minimal**: Only basic context operations
- **readonly**: No write operations

**Example:**
```python
from syntha import create_restricted_handler

# Safe mode: all tools except destructive ones
safe_handler = create_restricted_handler(context, "agent1", "safe")

# Minimal mode: only basic context operations
minimal_handler = create_restricted_handler(context, "agent1", "minimal")

# Readonly mode: no write operations
readonly_handler = create_restricted_handler(context, "agent1", "readonly")
```

### create_multi_agent_handlers()

Create multiple ToolHandlers with different access configurations.

```python
def create_multi_agent_handlers(
    context_mesh: ContextMesh, 
    agent_configs: Dict[str, Dict[str, Any]]
) -> Dict[str, ToolHandler]
```

**Example:**
```python
from syntha import create_multi_agent_handlers

configs = {
    "admin": {"role": "admin"},
    "user1": {"role": "contributor"},
    "viewer": {"role": "readonly"},
    "analyst": {"allowed_tools": ["get_context", "push_context"]},
    "restricted": {"denied_tools": ["delete_topic", "unsubscribe_from_topics"]}
}

handlers = create_multi_agent_handlers(context, configs)

# Use individual handlers
admin_result = handlers["admin"].handle_tool_call("delete_topic", 
                                                  topic="test", 
                                                  confirm=True)
```

## Tool Schemas

### get_all_tool_schemas()

Get all essential tool schemas for Syntha context operations.

```python
def get_all_tool_schemas() -> List[Dict[str, Any]]
```

**Returns:** List of OpenAI-compatible function schemas

**Example:**
```python
from syntha import get_all_tool_schemas

# Get all available tool schemas
schemas = get_all_tool_schemas()

# Use with any LLM framework
for schema in schemas:
    print(f"Tool: {schema['name']}")
    print(f"Description: {schema['description']}")
```

## Error Handling

Tool calls return standardized response formats:

**Success Response:**
```python
{
    "success": True,
    "message": "Operation completed successfully",
    # Additional result data...
}
```

**Error Response:**
```python
{
    "success": False,
    "error": "Description of what went wrong",
    "suggestion": "How to fix the issue",
    # Additional error context...
}
```

**Example Error Handling:**
```python
result = handler.handle_tool_call("push_context", key="test", value="data")

if result["success"]:
    print(f"Success: {result['message']}")
else:
    print(f"Error: {result['error']}")
    if "suggestion" in result:
        print(f"Suggestion: {result['suggestion']}")
```

## Integration Examples

### OpenAI Function Calling

```python
import openai
from syntha import ContextMesh, ToolHandler

# Set up context and handler
context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "AssistantAgent")

# Get tool schemas
tools = [{"type": "function", "function": schema} 
         for schema in handler.get_tool_schemas()]

# Use with OpenAI
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Share the current status"}],
    tools=tools
)

# Handle function calls
if response.choices[0].message.tool_calls:
    for tool_call in response.choices[0].message.tool_calls:
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        
        result = handler.handle_tool_call(function_name, **arguments)
        print(f"Tool result: {result}")
```

### Anthropic Function Calling

```python
import anthropic
from syntha import ContextMesh, ToolHandler

# Set up context and handler
context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "ClaudeAgent")

# Convert schemas to Anthropic format
tools = handler.get_tool_schemas()

# Use with Anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Check available context"}],
    tools=tools
)

# Handle function calls
for content in response.content:
    if content.type == "tool_use":
        result = handler.handle_tool_call(content.name, **content.input)
        print(f"Tool result: {result}")
```

---

**Next**: Learn about [Prompts API](prompts.md) for direct context injection