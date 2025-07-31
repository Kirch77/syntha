"""
Example demonstrating topic-based context routing in Syntha SDK.

This example shows how agents can:
1. Register for topics they're interested in
2. Push context to specific topics
3. Discover available context by topic
4. Automatically receive context from subscribed topics
"""

from syntha import ContextMesh, ToolHandler


def main():
    # Initialize the system
    mesh = ContextMesh()

    # Create tool handlers for different agents (they know their own names)
    marketing_handler = ToolHandler(mesh, agent_name="MarketingBot")
    sales_handler = ToolHandler(mesh, agent_name="SalesBot")
    support_handler = ToolHandler(mesh, agent_name="SupportBot")

    print("=== Topic-Based Multi-Agent System Demo ===\n")

    # Step 1: Agents subscribe to topics they care about
    print("📋 Step 1: Agents subscribe to topics")

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
    print("🔍 Step 3: SalesBot discovers available context")

    sales_context_result = sales_handler.handle_tool_call("get_context")
    if sales_context_result["success"]:
        context_items = sales_context_result.get('context', {})
        print(f"SalesBot found context:")
        print(f"  📊 Total accessible context items: {len(context_items)}")
        for key, value in context_items.items():
            print(f"  🔑 {key}: {str(value)[:50]}...")
        print()

    # Step 4: Sales agent retrieves specific context
    print("📥 Step 4: SalesBot retrieves campaign context")

    sales_context_result = sales_handler.handle_tool_call(
        "get_context", keys=["q4_campaign"]
    )
    if sales_context_result["success"]:
        print(f"SalesBot retrieved: {sales_context_result['context']}\n")

    # Step 5: Support agent also gets access to customer insights
    print("📥 Step 5: SupportBot checks for customer insights")

    support_context_result = support_handler.handle_tool_call("get_context")
    if support_context_result["success"]:
        support_items = support_context_result.get('context', {})
        print(f"SupportBot found context:")
        print(f"  📊 Total accessible context items: {len(support_items)}")
        for key, value in support_items.items():
            print(f"  🔑 {key}: {str(value)[:50]}...")
        print()

    # Step 6: Multiple agents can push to the same topic
    print("📢 Step 6: Multiple agents sharing customer insights")

    # Sales adds customer feedback
    sales_insight_result = sales_handler.handle_tool_call(
        "push_context",
        key="customer_feedback_q4",
        value="Customers are asking for mobile app improvements and better API documentation.",
        topics=["customer_insights", "product_updates"],
    )
    print(f"SalesBot: Customer feedback shared successfully")

    # Support adds technical insights
    support_insight_result = support_handler.handle_tool_call(
        "push_context",
        key="support_trends_q4",
        value="Top support issues: API rate limiting (40%), mobile sync problems (25%), onboarding confusion (20%).",
        topics=["customer_insights", "customer_issues"],
    )
    print(f"SupportBot: Support trends shared successfully\n")

    # Step 7: Marketing sees all customer insights
    print("📊 Step 7: MarketingBot discovers all customer insights")

    # Get all context available to MarketingBot
    marketing_context_result = marketing_handler.handle_tool_call("get_context")
    if marketing_context_result["success"]:
        marketing_items = marketing_context_result.get('context', {})
        customer_insight_keys = [key for key in marketing_items.keys() if 'customer' in key.lower() or 'insight' in key.lower()]
        
        if customer_insight_keys:
            print(f"MarketingBot found {len(customer_insight_keys)} customer insight keys: {customer_insight_keys}")

            # Retrieve all customer insights
            marketing_insights_result = marketing_handler.handle_tool_call(
                "get_context", keys=customer_insight_keys
            )
            if marketing_insights_result["success"]:
                print("MarketingBot retrieved customer insights:")
                for key, value in marketing_insights_result["context"].items():
                    print(f"  • {key}: {value}")

    # Step 8: Show system statistics
    print(f"\n📈 Step 8: System Statistics")
    stats = mesh.get_stats()
    print(f"Total context items: {stats['total_items']}")
    print(f"Active topics: {stats['total_topics']}")
    print(f"Agents with topic subscriptions: {stats['agents_with_topics']}")

    print("\n✅ Topic-based routing demo completed!")
    print("\nKey benefits demonstrated:")
    print("- Agents don't need to know other agent names")
    print("- Context automatically routes to interested agents")
    print("- Agents can discover available context by topic")
    print("- No manual agent name specification required")


if __name__ == "__main__":
    main()
