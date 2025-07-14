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
    handler = ToolHandler(mesh)

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
    print(f"Backend has access to: {list(mesh.get_all_for_agent('BackendDev').keys())}")

    # 4. Agent communication
    # Send a message
    result = handler.handle_tool_call(
        "send_message_to_agent",
        from_agent="BackendDev",
        to_agent="FrontendDev",
        message="API endpoints are ready for integration",
        message_type="info",
    )
    print(f"📤 Message sent: {result['success']}")

    # Check for messages
    messages = handler.handle_tool_call(
        "get_messages_from_agents", agent_name="FrontendDev"
    )
    print(f"📥 FrontendDev received {messages['count']} messages")

    # 5. Use with LLM (example pattern)
    print("\n💡 Integration with your LLM:")
    print("# Add this to your LLM calls:")
    print(f"# tools = {[schema['name'] for schema in handler.get_schemas()]}")
    print("# system_prompt = build_system_prompt('YourAgent', mesh)")

    print("\n✅ Basic usage complete!")


if __name__ == "__main__":
    main()
