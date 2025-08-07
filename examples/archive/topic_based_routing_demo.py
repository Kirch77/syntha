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
    print("📋 Step 1: Agents subscribe to topics")

    marketing_result = marketing_handler.handle_tool_call(
        "subscribe_to_topics",
        topics=["campaigns", "customer_insights", "product_launches"],
    )
    print(
        f"MarketingBot: Subscribed to {len(marketing_result.get('subscribed_topics', []))} topics"
    )

    sales_result = sales_handler.handle_tool_call(
        "subscribe_to_topics", topics=["leads", "customer_insights", "pricing"]
    )
    print(
        f"SalesBot: Subscribed to {len(sales_result.get('subscribed_topics', []))} topics"
    )

    support_result = support_handler.handle_tool_call(
        "subscribe_to_topics",
        topics=["customer_issues", "product_updates", "customer_insights"],
    )
    print(
        f"SupportBot: Subscribed to {len(support_result.get('subscribed_topics', []))} topics\n"
    )

    # Step 2: Marketing agent shares campaign information
    print("📢 Step 2: MarketingBot shares campaign data")

    campaign_result = marketing_handler.handle_tool_call(
        "push_context",
        key="q4_campaign",
        value="Holiday promotion targeting small businesses. 25% discount on annual plans. Focus on cost savings and productivity.",
        topics=["campaigns", "customer_insights"],
        ttl_hours=48,
    )
    print(f"MarketingBot: Campaign data shared successfully\n")

    # Step 3: Sales agent discovers available context
    print("🔍 Step 3: SalesBot checks what context is available")

    context_result = sales_handler.handle_tool_call("get_context")
    if context_result["success"]:
        context_items = context_result.get("context", {})
        print(f"SalesBot found context:")
        print(f"  📊 Total accessible context items: {len(context_items)}")
        for key, value in context_items.items():
            print(f"  🔑 {key}: {str(value)[:50]}...")
        print()

    # Step 4: Sales agent retrieves relevant context
    print("📥 Step 4: SalesBot retrieves campaign context")

    context_result = sales_handler.handle_tool_call("get_context", keys=["q4_campaign"])
    if context_result["success"]:
        print(f"SalesBot retrieved: {context_result['context']}\n")

    # Step 5: Support agent also sees what's available
    print("🔍 Step 5: SupportBot checks available context")

    support_context = support_handler.handle_tool_call("get_context")
    if support_context["success"]:
        support_items = support_context.get("context", {})
        print(f"SupportBot's view:")
        print(f"  📊 Total accessible context items: {len(support_items)}")

        # Check if SupportBot can access campaign data
        if "q4_campaign" in support_items:
            print(
                f"  ✅ SupportBot can access campaign data (shares 'customer_insights' topic)"
            )
        else:
            print(f"  ❌ SupportBot cannot access campaign data")
        print()

    # Step 6: Sales agent shares pricing update
    print("💰 Step 6: SalesBot shares pricing information")

    pricing_result = sales_handler.handle_tool_call(
        "push_context",
        key="pricing_update",
        value="New pricing tier: Starter plan now $29/month (was $39). Enterprise discounts available for 100+ users.",
        topics=["pricing", "customer_insights"],
        ttl_hours=72,
    )
    print(f"SalesBot: Pricing update shared successfully\n")

    # Step 7: Marketing sees the pricing update
    print("💡 Step 7: MarketingBot discovers new pricing context")

    # Get the pricing update
    pricing_context = marketing_handler.handle_tool_call(
        "get_context", keys=["pricing_update"]
    )
    if pricing_context["success"]:
        pricing_value = pricing_context.get("context", {}).get(
            "pricing_update", "Not found"
        )
        print(f"  💰 Retrieved pricing update: {pricing_value}\n")

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
