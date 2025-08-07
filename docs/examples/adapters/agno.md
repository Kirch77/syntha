# Agno Integration

Integration guide for using Syntha with Agno multi-agent framework.

## Basic Setup

```python
from agno import Agent
from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter

# Initialize Syntha
mesh = ContextMesh(user_id="agno_user")
handler = ToolHandler(mesh, "Agno_Agent")

# Create Agno-compatible tools
adapter = create_framework_adapter("agno", handler)
tools = adapter.create_tools()

# Create Agno agent with Syntha tools
agent = Agent(
    name="ContextAgent",
    tools=tools,
    instructions="You have access to context management tools."
)
```

## See Also

- [Multi-Agent Setup](../tools/multi-agent.md)
- [Framework Adapters](../../user-guide/concepts/adapters.md)
