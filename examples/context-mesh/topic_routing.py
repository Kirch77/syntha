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
    context.subscribe_to_topics("SalesAgent", ["sales", "customers"])
    context.subscribe_to_topics("MarketingAgent", ["marketing", "customers"])
    context.subscribe_to_topics("TechAgent", ["engineering", "api"])
    context.subscribe_to_topics("ManagerAgent", ["sales", "marketing", "engineering"])
    
    print("✅ Agents subscribed to topics")
    
    # Push context to specific topics
    context.push(
        "new_customer_lead",
        {"company": "TechCorp", "budget": 50000, "contact": "jane@techcorp.com"},
        topics=["sales", "customers"]
    )
    
    context.push(
        "api_update",
        {"version": "v2.1", "breaking_changes": False, "new_features": ["auth", "webhooks"]},
        topics=["engineering", "api"]
    )
    
    context.push(
        "campaign_results",
        {"campaign": "Q1 Launch", "clicks": 15000, "conversions": 450},
        topics=["marketing"]
    )
    
    print("✅ Context pushed to topics")
    
    # Check what each agent can see
    agents = ["SalesAgent", "MarketingAgent", "TechAgent", "ManagerAgent"]
    
    for agent in agents:
        agent_context = context.get_all_for_agent(agent)
        print(f"\n📋 {agent} sees: {list(agent_context.keys())}")
    
    # Get context by topics
    sales_context = context.get_by_topics(["sales"], "SalesAgent")
    customer_context = context.get_by_topics(["customers"], "MarketingAgent")
    
    print(f"\n🎯 Sales-related context: {list(sales_context.keys())}")
    print(f"🎯 Customer-related context: {list(customer_context.keys())}")
    
    # Discover available topics
    topics = context.discover_topics()
    print(f"\n📚 Available topics: {list(topics.keys())}")
    for topic, subscribers in topics.items():
        print(f"   - {topic}: {len(subscribers)} subscribers")
    
    print("\n✅ Topic routing complete!")

if __name__ == "__main__":
    main()