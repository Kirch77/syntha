# Tools & Tool Handler

The Tool Handler provides LLM-compatible tools for agents to interact with the Context Mesh.

## Basic Usage

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "SalesAgent")
```

## Core Tools

### get_context
Retrieve context from the mesh.

```python
# Get all accessible context
result = handler.handle_tool_call("get_context")

# Get specific keys
result = handler.handle_tool_call("get_context", keys=["customer_data"])
```

### push_context
Share context with other agents.

```python
# Push to specific agents
handler.handle_tool_call(
    "push_context",
    key="sales_update",
    value={"deals_closed": 5},
    subscribers=["ManagerAgent"]
)

# Push to topics
handler.handle_tool_call(
    "push_context",
    key="feedback",
    value=data,
    topics=["sales"]
)
```

### list_context
List available context keys.

```python
result = handler.handle_tool_call("list_context")
```

### subscribe_to_topics
Subscribe to topic-based routing.

```python
handler.handle_tool_call("subscribe_to_topics", topics=["sales"])
```

### discover_topics
Find available topics.

```python
result = handler.handle_tool_call("discover_topics")
```

## Framework Integration

Get tools in your framework's format:

```python
# OpenAI function calling format
tools = handler.get_schemas()
openai_functions = handler.get_openai_functions()

# LangChain tools
langchain_tools = handler.get_langchain_tools()

# Anthropic tools
anthropic_tools = handler.get_anthropic_tools()
```

## Access Control

```python
from syntha import create_role_based_handler, create_restricted_handler

# Role-based access
admin_handler = create_role_based_handler(context, "AdminAgent", "admin")

# Custom restrictions (predefined levels: safe, minimal, readonly)
restricted_handler = create_restricted_handler(context, "RestrictedAgent", "minimal")
```

## Multi-Agent Setup

```python
from syntha import create_multi_agent_handlers

configs = [
    {"name": "SalesAgent", "role": "contributor"},
    {"name": "ManagerAgent", "role": "admin"}
]

handlers = create_multi_agent_handlers(context, configs)
```

## See Also

- [Framework Adapters](adapters.md)
- [Tool Examples](../../examples/tools/tool-basics.md)
- [API Reference](../../api/tool-handler.md)