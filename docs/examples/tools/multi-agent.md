# Multi-Agent Setup

Coordinate multiple agents with shared context and topic routing.

## Quick Example

```python
from syntha import ContextMesh, create_multi_agent_handlers

# Create shared context mesh
mesh = ContextMesh(user_id="project_team")

# Define agent configurations (role controls tool access)
agent_configs = [
    {"name": "ProjectManager", "role": "admin", "topics": ["planning", "status", "team"]},
    {"name": "Developer", "role": "contributor", "topics": ["development", "bugs", "features"]},
    {"name": "Designer", "role": "contributor", "topics": ["design", "ui", "branding"]},
]

# Create handlers
handlers = create_multi_agent_handlers(mesh, agent_configs)

# Push context to topics
handlers["ProjectManager"].handle_tool_call(
    "push_context",
    key="project_info",
    value={"name": "Customer Portal v2", "deadline": "2025-04-01"},
    topics=["planning", "team"],
)

handlers["Developer"].handle_tool_call(
    "push_context",
    key="development_status",
    value={"backend_api": "80%", "auth": "in_progress"},
    topics=["development", "status"],
)

handlers["Designer"].handle_tool_call(
    "push_context",
    key="design_assets",
    value={"mockups": "approved", "style_guide": "finalized"},
    topics=["design", "status"],
)

# Retrieve context for Developer
dev_ctx = handlers["Developer"].handle_tool_call("get_context")
print(list(dev_ctx["context"].keys()))

# Keys organized by topic for Designer
print(mesh.get_available_keys_by_topic("Designer"))
```

## See Also

- [Tool Basics](tool-basics.md)
- [Topic Routing](../context-mesh/topic-routing.md)
- [Complete Workflows](../extras/complete-workflows.md)
