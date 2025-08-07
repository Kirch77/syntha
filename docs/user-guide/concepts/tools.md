# Tools & Tool Handler

The Tool Handler is the interface that agents use to interact with the Context Mesh. It provides LLM-compatible tools and handles all the complexity of context operations.

## What is a Tool Handler?

A Tool Handler creates standardized tools that your agents can use to push, pull, and manage context. It acts as the bridge between your LLM and the Context Mesh.

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "SalesAgent")
```

## Core Tools

Every Tool Handler provides these essential tools:

### 1. get_context
Retrieve context from the mesh.

```python
# Agent retrieves accessible context
result = handler.handle_tool_call("get_context")
# Returns: {"success": True, "context": {...}, "keys_found": [...]}

# Get specific keys
result = handler.handle_tool_call("get_context", keys=["customer_data", "project_status"])
```

### 2. push_context  
Share context with other agents.

```python
# Push to specific agents
handler.handle_tool_call(
    "push_context",
    key="sales_update",
    value={"deals_closed": 5, "revenue": 50000},
    subscribers=["ManagerAgent"]
)

# Push to topics
handler.handle_tool_call(
    "push_context", 
    key="customer_feedback",
    value=feedback_data,
    topics=["sales", "product"]
)
```

### 3. list_context
Discover available context keys.

```python
result = handler.handle_tool_call("list_context")
# Returns: {"success": True, "keys": ["customer_data", "project_status", ...]}
```

### 4. subscribe_to_topics
Subscribe to topic-based context routing.

```python
handler.handle_tool_call("subscribe_to_topics", topics=["sales", "customers"])
```

### 5. discover_topics
Find available topics and subscribers.

```python
result = handler.handle_tool_call("discover_topics")
# Returns: {"success": True, "topics": {"sales": ["SalesAgent"], ...}}
```

## Framework Integration

Get tools in your framework's native format:

### OpenAI Functions
```python
tools = handler.get_schemas()  # OpenAI function calling format
openai_functions = handler.get_openai_functions()  # Alternative method
```

### LangChain Tools
```python
langchain_tools = handler.get_langchain_tools()  # BaseTool instances
```

### Anthropic Tools
```python
anthropic_tools = handler.get_anthropic_tools()  # Claude tool format
```

### Generic Framework
```python
generic_tools = handler.get_tools_for_framework("your_framework")
```

## Access Control

### Role-Based Access
```python
from syntha import create_role_based_handler

# Create handler with predefined role
admin_handler = create_role_based_handler(context, "AdminAgent", "admin")
viewer_handler = create_role_based_handler(context, "ViewerAgent", "viewer")
```

### Custom Restrictions
```python
from syntha import create_restricted_handler

# Limit to specific tools
restricted_handler = create_restricted_handler(
    context, 
    "RestrictedAgent",
    allowed_tools=["get_context", "list_context"]
)
```

## Multi-Agent Setup

Create multiple handlers efficiently:

```python
from syntha import create_multi_agent_handlers

agent_configs = [
    {"name": "SalesAgent", "role": "contributor", "topics": ["sales"]},
    {"name": "SupportAgent", "role": "contributor", "topics": ["support"]},
    {"name": "ManagerAgent", "role": "admin", "topics": ["sales", "support"]}
]

handlers = create_multi_agent_handlers(context, agent_configs)
# Returns: {"SalesAgent": handler1, "SupportAgent": handler2, ...}
```

## Best Practices

### 1. Use Descriptive Agent Names
```python
# Good
handler = ToolHandler(context, "CustomerSupportAgent")

# Avoid
handler = ToolHandler(context, "Agent1")
```

### 2. Set Up Topic Subscriptions Early
```python
# Subscribe to relevant topics when creating handler
handler = ToolHandler(context, "SalesAgent")
handler.handle_tool_call("subscribe_to_topics", topics=["sales", "customers", "revenue"])
```

### 3. Handle Tool Call Results
```python
result = handler.handle_tool_call("push_context", key="data", value="info")
if result["success"]:
    print("Context shared successfully")
else:
    print(f"Error: {result.get('error', 'Unknown error')}")
```

### 4. Use Appropriate Access Levels
```python
# Admin agents get full access
admin = create_role_based_handler(context, "AdminAgent", "admin")

# Regular agents get contributor access  
agent = create_role_based_handler(context, "WorkerAgent", "contributor")

# Read-only agents get viewer access
viewer = create_role_based_handler(context, "ViewerAgent", "viewer")
```

## Tool Schemas

Each tool has a well-defined schema for LLM integration:

```python
schemas = handler.get_schemas()
for schema in schemas:
    print(f"Tool: {schema['name']}")
    print(f"Description: {schema['description']}")
    print(f"Parameters: {schema['parameters']['properties'].keys()}")
```

## Error Handling

Tool calls return structured results:

```python
result = handler.handle_tool_call("get_context", keys=["nonexistent"])
if not result["success"]:
    error_message = result.get("error", "Unknown error")
    print(f"Tool call failed: {error_message}")
else:
    context_data = result["context"]
```

## Next Steps

- **[Framework Adapters](adapters.md)** - Learn about LLM framework integration
- **[Examples](../../examples/tools/tool-basics.md)** - See working code examples
- **[API Reference](../../api/tool-handler.md)** - Complete API documentation