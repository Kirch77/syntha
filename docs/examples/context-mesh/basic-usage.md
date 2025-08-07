# Basic Context Mesh Usage

Core functionality of Syntha's Context Mesh for managing shared context between agents.

## Example

```python
import os
from syntha import ContextMesh

def main():
    print("🚀 Context Mesh - Basic Usage")
    print("=" * 40)
    
    # Create a context mesh for a specific user
    context = ContextMesh(user_id="demo_user")
    
    # Push some global context (accessible by all agents)
    context.push("project_name", "AI Customer Service")
    context.push("deadline", "2025-03-15")
    context.push("status", "in_development")
    
    print("✅ Global context added")
    
    # Push context for specific agents
    context.push(
        "api_credentials", 
        {"endpoint": "https://api.example.com", "version": "v2"},
        subscribers=["BackendAgent", "APIAgent"]
    )
    
    context.push(
        "ui_guidelines",
        {"theme": "dark", "primary_color": "#007bff"},
        subscribers=["FrontendAgent", "DesignAgent"]
    )
    
    print("✅ Agent-specific context added")
    
    # Retrieve context as different agents
    backend_context = context.get_all_for_agent("BackendAgent")
    frontend_context = context.get_all_for_agent("FrontendAgent")
    
    print(f"\n📋 BackendAgent sees: {list(backend_context.keys())}")
    print(f"📋 FrontendAgent sees: {list(frontend_context.keys())}")
    
    # Get specific context item
    project_name = context.get("project_name", "BackendAgent")
    print(f"\n📄 Project name: {project_name}")
    
    # Update existing context
    context.push("status", "testing_phase")
    updated_status = context.get("status", "BackendAgent")
    print(f"📄 Updated status: {updated_status}")
    
    print("\n✅ Basic usage complete!")

if __name__ == "__main__":
    main()
```

## Key Operations

- **Push context**: `context.push(key, value)` or `context.push(key, value, subscribers=["Agent1"])`
- **Get context**: `context.get(key, agent_name)` 
- **Get all for agent**: `context.get_all_for_agent(agent_name)`

## See Also

- [Topic Routing](topic-routing.md)
- [User Isolation](user-isolation.md)
- [Tool Handler](../tools/tool-basics.md)
