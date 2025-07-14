"""
Example demonstrating topic-based context routing in Syntha SDK.
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

    # Step 1: Agents register for topics they care about
    print("📋 Step 1: Agents register for topics")

    marketing_result = marketing_handler.handle_tool_call(
        "register_for_topics",
        topics=["campaigns", "customer_insights", "product_launches"],
    )
    print(f"MarketingBot: {marketing_result['message']}")

    sales_result = sales_handler.handle_tool_call(
        "register_for_topics", topics=["leads", "customer_insights", "pricing"]
    )
    print(f"SalesBot: {sales_result['message']}")

    support_result = support_handler.handle_tool_call(
        "register_for_topics",
        topics=["customer_issues", "product_updates", "customer_insights"],
    )
    print(f"SupportBot: {support_result['message']}\n")

    # Step 2: Marketing agent shares campaign information
    print("📢 Step 2: MarketingBot shares campaign data")

    campaign_result = marketing_handler.handle_tool_call(
        "push_context_to_topics",
        key="q4_campaign",
        value="Holiday promotion targeting small businesses. 25% discount on annual plans. Focus on cost savings and productivity.",
        topics=["campaigns", "customer_insights"],
        ttl_hours=48,
    )
    print(f"MarketingBot: {campaign_result['message']}\n")

    # Step 3: Sales agent discovers available context
    print("🔍 Step 3: SalesBot checks what context is available")

    keys_result = sales_handler.handle_tool_call("list_context_keys")
    if keys_result["success"]:
        print(f"SalesBot found context organized by topics:")
        for topic, keys in keys_result["keys_by_topic"].items():
            print(f"  📂 {topic}: {keys}")
        print(f"  📝 Total accessible keys: {keys_result['total_keys']}")
        print(f"  🏷️ Subscribed topics: {keys_result['topics_subscribed']}\n")

    # Step 4: Sales agent retrieves relevant context
    print("📥 Step 4: SalesBot retrieves campaign context")

    context_result = sales_handler.handle_tool_call("get_context", keys=["q4_campaign"])
    if context_result["success"]:
        print(f"SalesBot retrieved: {context_result['context']}\n")

    # Step 5: Support agent also sees what's available
    print("🔍 Step 5: SupportBot checks available context")

    support_keys = support_handler.handle_tool_call("list_context_keys")
    if support_keys["success"]:
        print(f"SupportBot's view:")
        for topic, keys in support_keys["keys_by_topic"].items():
            print(f"  📂 {topic}: {keys}")
        print(f"  🏷️ Subscribed topics: {support_keys['topics_subscribed']}")

        # Support can access customer_insights topic
        if "q4_campaign" in support_keys["all_accessible_keys"]:
            print(
                f"  ✅ SupportBot can access campaign data (shares 'customer_insights' topic)\n"
            )
        else:
            print(f"  ❌ SupportBot cannot access campaign data\n")

    # Step 6: Sales agent shares pricing update
    print("💰 Step 6: SalesBot shares pricing information")

    pricing_result = sales_handler.handle_tool_call(
        "push_context_to_topics",
        key="pricing_update",
        value="New pricing tier: Starter plan now $29/month (was $39). Enterprise discounts available for 100+ users.",
        topics=["pricing", "customer_insights"],
        ttl_hours=72,
    )
    print(f"SalesBot: {pricing_result['message']}\n")

    # Step 7: Marketing sees the pricing update
    print("💡 Step 7: MarketingBot discovers new pricing context")

    marketing_keys = marketing_handler.handle_tool_call("list_context_keys")
    if marketing_keys["success"]:
        print(f"MarketingBot now sees:")
        for topic, keys in marketing_keys["keys_by_topic"].items():
            print(f"  📂 {topic}: {keys}")

        # Get the pricing update
        pricing_context = marketing_handler.handle_tool_call(
            "get_context", keys=["pricing_update"]
        )
        if pricing_context["success"]:
            print(
                f"  💰 Retrieved pricing update: {pricing_context['context']['pricing_update']}\n"
            )

    # Step 8: Show final system stats
    print("📊 Step 8: System statistics")
    stats = mesh.get_stats()
    print(f"  📈 Total context items: {stats['total_items']}")
    print(f"  🔄 Active items: {stats['active_items']}")
    print(f"  🏷️ Total topics: {stats['total_topics']}")
    print(f"  👥 Agents with topics: {stats['agents_with_topics']}")

    print("\n✅ Topic-based routing demo completed!")
    print("Key benefits demonstrated:")
    print("  🎯 Agents only see relevant context for their topics")
    print("  🤝 Automatic context sharing based on shared topics")
    print("  🔍 Easy discovery of available context")
    print("  🏷️ No need to specify recipient agents manually")


if __name__ == "__main__":
    main()
