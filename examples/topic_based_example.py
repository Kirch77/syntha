"""
Example demonstrating topic-based context routing in Syntha SDK.

This example shows how agents can:
1. Register for topics they're interested in
2. Push context to topics (instead of specific agents)
3. Discover available context keys by topic
4. Use improved tools without specifying their own agent names
"""

from syntha import ContextMesh, ToolHandler


def main():
    print("=== Topic-Based Multi-Agent System Demo ===\n")

    # Initialize the system
    mesh = ContextMesh()

    # Create tool handlers for different agents (they know their own names)
    marketing_handler = ToolHandler(mesh, agent_name="MarketingBot")
    sales_handler = ToolHandler(mesh, agent_name="SalesBot")
    support_handler = ToolHandler(mesh, agent_name="SupportBot")

    # Step 1: Agents subscribe to topics they care about
    print("📋 Step 1: Agents subscribe to topics\n")

    marketing_result = marketing_handler.handle_tool_call(
        "subscribe_to_topics",
        topics=["campaigns", "customer_insights", "product_launches"],
    )
    print(f"MarketingBot: Subscribed to {len(marketing_result.get('subscribed_topics', []))} topics")

    sales_result = sales_handler.handle_tool_call(
        "subscribe_to_topics", topics=["leads", "customer_insights", "pricing"]
    )
    print(f"SalesBot: Subscribed to {len(sales_result.get('subscribed_topics', []))} topics")

    support_result = support_handler.handle_tool_call(
        "subscribe_to_topics",
        topics=["customer_issues", "product_updates", "customer_insights"],
    )
    print(f"SupportBot: Subscribed to {len(support_result.get('subscribed_topics', []))} topics\n")

    # Step 2: Marketing agent shares campaign information
    print("📢 Step 2: MarketingBot shares campaign data\n")

    campaign_result = marketing_handler.handle_tool_call(
        "push_context",
        key="q4_campaign",
        value="Holiday promotion targeting small businesses. 25% discount on annual plans. Focus on cost savings and productivity.",
        topics=["campaigns", "customer_insights"],
        ttl_hours=48,
    )
    print(f"MarketingBot: Campaign data shared successfully")

    # Marketing also shares customer research
    research_result = marketing_handler.handle_tool_call(
        "push_context",
        key="customer_research",
        value="Survey shows 78% of SMBs struggle with team productivity. Top pain points: communication, project tracking, time management.",
        topics=["customer_insights"],
        ttl_hours=72,
    )
    print(f"MarketingBot: Customer research shared successfully\n")

    # Step 3: Sales agent discovers available context
    print("🔍 Step 3: SalesBot discovers available context\n")

    # Get all context available to SalesBot
    context_result = sales_handler.handle_tool_call("get_context")
    print(f"SalesBot discovered context:")

    if context_result["success"]:
        context_items = context_result.get('context', {})
        print(f"  📊 Total accessible context items: {len(context_items)}")
        for key, value in context_items.items():
            print(f"  🔑 {key}: {str(value)[:50]}...")
        print()

    # Step 4: Sales agent retrieves relevant context
    print("📥 Step 4: SalesBot retrieves relevant context\n")

    context_result = sales_handler.handle_tool_call(
        "get_context", keys=["q4_campaign", "customer_research"]
    )

    if context_result["success"]:
        print(f"SalesBot retrieved {len(context_result['context'])} context items:")
        for key, value in context_result["context"].items():
            print(
                f"  🔑 {key}: {value[:100]}..."
                if len(str(value)) > 100
                else f"  🔑 {key}: {value}"
            )
        print()

    # Step 5: Support agent also discovers their context
    print("🔍 Step 5: SupportBot checks their available context\n")

    support_context_result = support_handler.handle_tool_call("get_context")

    if support_context_result["success"]:
        support_context_items = support_context_result.get('context', {})
        print(f"SupportBot's available context:")
        print(f"  📊 Total accessible context items: {len(support_context_items)}")
        for key, value in support_context_items.items():
            print(f"  🔑 {key}: {str(value)[:50]}...")
        print()

    # Step 6: Support shares product update
    print("📢 Step 6: SupportBot shares product update\n")

    update_result = support_handler.handle_tool_call(
        "push_context",
        key="feature_release",
        value="New team collaboration features released: real-time document editing, video calling integration, task automation.",
        topics=["product_updates"],
        ttl_hours=24,
    )
    print(f"SupportBot: Product update shared successfully\n")

    # Step 7: Show final system state
    print("📊 Step 7: Final system statistics\n")

    stats = mesh.get_stats()
    print(f"Context Mesh Statistics:")
    print(f"  🗃️  Total items: {stats['total_items']}")
    print(f"  ✅ Active items: {stats['active_items']}")
    print(f"  🏷️  Total topics: {stats['total_topics']}")
    print(f"  👥 Agents with topics: {stats['agents_with_topics']}")

    print(f"\nTopic Subscribers:")
    for topic in [
        "campaigns",
        "customer_insights",
        "product_updates",
        "leads",
        "pricing",
        "customer_issues",
    ]:
        subscribers = mesh.get_subscribers_for_topic(topic)
        if subscribers:
            print(f"  📂 {topic}: {subscribers}")


if __name__ == "__main__":
    main()
