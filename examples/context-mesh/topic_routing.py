"""
Context Mesh - Topic-Based Routing Example

This example demonstrates how to use topic-based routing to organize
and distribute context between agents based on their interests.

Copy and run this code to see topic routing in action!
"""

from syntha import ContextMesh


def main():
    print("🚀 Context Mesh - Topic Routing")
    print("=" * 40)

    # Create context mesh
    context = ContextMesh(user_id="team_alpha")

    # Subscribe agents to different topics
    context.register_agent_topics("SalesAgent", ["sales", "customers"])
    context.register_agent_topics("MarketingAgent", ["marketing", "customers"])
    context.register_agent_topics("TechAgent", ["engineering", "api"])
    context.register_agent_topics("ManagerAgent", ["sales", "marketing", "engineering"])

    print("✅ Agents subscribed to topics")

    # Push context to specific topics
    context.push(
        "new_customer_lead",
        {"company": "TechCorp", "budget": 50000, "contact": "jane@techcorp.com"},
        topics=["sales", "customers"],
    )

    context.push(
        "api_update",
        {
            "version": "v2.1",
            "breaking_changes": False,
            "new_features": ["auth", "webhooks"],
        },
        topics=["engineering", "api"],
    )

    context.push(
        "campaign_results",
        {"campaign": "Q1 Launch", "clicks": 15000, "conversions": 450},
        topics=["marketing"],
    )

    print("✅ Context pushed to topics")

    # Check what each agent can see
    agents = ["SalesAgent", "MarketingAgent", "TechAgent", "ManagerAgent"]

    for agent in agents:
        agent_context = context.get_all_for_agent(agent)
        print(f"\n📋 {agent} sees: {list(agent_context.keys())}")

    # Show keys by topic for agents
    sales_keys = context.get_available_keys_by_topic("SalesAgent").get("sales", [])
    customer_keys = context.get_available_keys_by_topic("MarketingAgent").get("customers", [])

    print(f"\n🎯 Sales-related keys: {sales_keys}")
    print(f"🎯 Customer-related keys: {customer_keys}")

    # Discover available topics (from context)
    topics = context.get_all_topics()
    print(f"\n📚 Available topics: {topics}")
    for topic in topics:
        print(f"   - {topic}: {len(context.get_subscribers_for_topic(topic))} subscribers")

    print("\n✅ Topic routing complete!")


if __name__ == "__main__":
    main()
