"""
Syntha SDK - Basic Usage Example

This example shows the core concepts:
- Setting up ContextMesh
- Sharing context between agents
- Using prompt builders
- Basic agent communication
"""

from syntha import ContextMesh, ToolHandler, build_system_prompt


def main():
    print("🚀 Syntha SDK - Basic Usage")
    print("=" * 40)

    # 1. Initialize ContextMesh
    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="BackendDev")

    # 2. Add shared context
    mesh.push("project_name", "CustomerPortal")
    mesh.push("deadline", "2025-02-28")
    mesh.push("team_size", 5)

    # Team-specific context
    mesh.push(
        "api_endpoint",
        "https://api.example.com",
        subscribers=["BackendDev", "FrontendDev"],
    )

    print("✅ Context added to mesh")

    # 3. Generate context-aware prompts
    backend_prompt = build_system_prompt("BackendDev", mesh)
    frontend_prompt = build_system_prompt("FrontendDev", mesh)

    print("✅ Generated prompts with context injection")
    backend_context = mesh.get_all_for_agent('BackendDev')
    print(f"Backend has access to: {list(backend_context.keys())}")

    # 4. Agent communication using context sharing
    # BackendDev shares API information with FrontendDev
    result = handler.handle_tool_call(
        "push_context",
        key="api_status",
        value="API endpoints are ready for integration",
        subscribers=["FrontendDev"],
    )
    print(f"📤 Context shared: {result['success']}")

    # Create a handler for FrontendDev to check context
    frontend_handler = ToolHandler(mesh, agent_name="FrontendDev")
    context = frontend_handler.handle_tool_call("get_context")
    frontend_context_keys = list(context['context'].keys())
    print(f"📥 FrontendDev has access to: {frontend_context_keys}")

    # 5. Topic-based communication
    # Subscribe both agents to a development topic
    handler.handle_tool_call("subscribe_to_topics", topics=["development"])
    frontend_handler.handle_tool_call("subscribe_to_topics", topics=["development"])
    
    # Share development updates via topics
    handler.handle_tool_call(
        "push_context",
        key="dev_update",
        value="Database schema updated",
        topics=["development"]
    )
    
    # Check what topics are available
    topics = handler.handle_tool_call("discover_topics")
    topic_names = list(topics['topics'].keys()) if topics['success'] else []
    print(f"📋 Available topics: {topic_names}")

    # 6. Use with LLM (example pattern)
    print("\n💡 Integration with your LLM:")
    print("# Add this to your LLM calls:")
    print(f"# tools = {[schema['name'] for schema in handler.get_schemas()]}")
    print("# system_prompt = build_system_prompt('YourAgent', mesh)")

    print("\n✅ Basic usage complete!")


if __name__ == "__main__":
    main()
