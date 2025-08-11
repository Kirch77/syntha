# Tool Access Control

Control which tools an agent can use via roles or explicit restrictions.

## Role-based handlers

```python
from syntha import ContextMesh, create_role_based_handler, PREDEFINED_ROLES, get_role_info

mesh = ContextMesh(user_id="secure_user")

# Show built-in roles
for role in PREDEFINED_ROLES:
    print(role, get_role_info(role)["description"])

admin = create_role_based_handler(mesh, "AdminAgent", "admin")
viewer = create_role_based_handler(mesh, "ViewerAgent", "readonly")

print([s["name"] for s in admin.get_schemas()])
print([s["name"] for s in viewer.get_schemas()])
```

## Restricted handler

```python
from syntha import create_restricted_handler

restricted = create_restricted_handler(mesh, "RestrictedAgent", "minimal")
print([s["name"] for s in restricted.get_schemas()])
```

## Using tools

```python
# Admin can push
admin.handle_tool_call("push_context", key="config", value="{\"max_users\": 100}")

# Viewer reads
viewer.handle_tool_call("get_context")
```

## See Also

- [Tool Basics](tool-basics.md)
- [Multi-Agent Setup](multi-agent.md)
- [Security Best Practices](../../user-guide/how-to/setup.md)
