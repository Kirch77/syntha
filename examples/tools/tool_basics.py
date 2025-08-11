"""
Tools - Basic Tool Handler Example

This example demonstrates how to use Syntha's ToolHandler to enable
agents to interact with the Context Mesh through tool calls.

Copy and run this code to see Tool Handler in action!
"""

from syntha import ContextMesh, ToolHandler


def main():
    print("🚀 Tools - Basic Tool Handler")
    print("=" * 40)

    # Create context mesh and tool handler
    context = ContextMesh(user_id="demo_user")
    handler = ToolHandler(context, "AssistantAgent")

    print("✅ Context Mesh and Tool Handler created")

    # Add some initial context
    context.push("project", "Customer Support Bot")
    context.push("version", "1.0.0")

    # Use tool handler to get context
    result = handler.handle_tool_call("get_context")
    print(f"\n📥 Retrieved context: {result['success']}")
    print(f"   Keys found: {result['keys_found']}")

    # Use tool handler to push new context (use topics broadcast for clarity)
    push_result = handler.handle_tool_call(
        "push_context",
        key="status",
        value="development",
        topics=["development"],
    )
    print(f"\n📤 Pushed context: {push_result['success']}")

    # List all available context
    list_result = handler.handle_tool_call("list_context")
    keys_by_topic = list_result.get("keys_by_topic", {}) if list_result.get("success") else {}
    all_keys = list_result.get("all_accessible_keys", []) if list_result.get("success") else []
    print(f"\n📋 Available context keys (by topic): {keys_by_topic}")
    print(f"   All keys: {all_keys}")

    # Subscribe to topics
    subscribe_result = handler.handle_tool_call(
        "subscribe_to_topics", topics=["development", "support"]
    )
    print(f"\n🎯 Subscribed to topics: {subscribe_result['success']}")

    # Push context to topics
    topic_push_result = handler.handle_tool_call(
        "push_context",
        key="team_update",
        value="Sprint planning completed",
        topics=["development"],
    )
    print(f"\n📡 Pushed to topics: {topic_push_result['success']}")

    # Discover available topics
    discover_result = handler.handle_tool_call("discover_topics", include_subscriber_names=True)
    if discover_result["success"]:
        topics = discover_result["topics"]
        print(f"\n📚 Available topics: {list(topics.keys())}")
        for topic, subscribers in topics.items():
            print(f"   - {topic}: {subscribers}")

    # Get tool schemas (for LLM integration)
    schemas = handler.get_schemas()
    print(f"\n🔧 Available tools: {[schema['name'] for schema in schemas]}")

    print("\n✅ Tool Handler basics complete!")


if __name__ == "__main__":
    main()
