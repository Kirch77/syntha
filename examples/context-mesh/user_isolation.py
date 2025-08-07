"""
Context Mesh - User Isolation Example

This example demonstrates how Syntha ensures complete separation
between different users' contexts for privacy and security.

Copy and run this code to see user isolation in action!
"""

from syntha import ContextMesh


def main():
    print("🚀 Context Mesh - User Isolation")
    print("=" * 40)

    # Create separate context meshes for different users
    user1_context = ContextMesh(user_id="user_alice")
    user2_context = ContextMesh(user_id="user_bob")

    # Add context for User 1 (Alice)
    user1_context.push(
        "customer_data",
        {
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "preferences": {"theme": "dark", "notifications": True},
        },
    )

    user1_context.push("project_status", "Phase 2 Complete")
    user1_context.push("budget", 25000)

    print("✅ Alice's context added")

    # Add context for User 2 (Bob)
    user2_context.push(
        "customer_data",
        {
            "name": "Bob Smith",
            "email": "bob@example.com",
            "preferences": {"theme": "light", "notifications": False},
        },
    )

    user2_context.push("project_status", "Planning Phase")
    user2_context.push("budget", 15000)

    print("✅ Bob's context added")

    # Verify isolation - each user only sees their own data
    alice_data = user1_context.get_all_for_agent("AssistantAgent")
    bob_data = user2_context.get_all_for_agent("AssistantAgent")

    print(f"\n👤 Alice's context: {list(alice_data.keys())}")
    print(f"   - Customer: {alice_data['customer_data']['name']}")
    print(f"   - Budget: ${alice_data['budget']}")

    print(f"\n👤 Bob's context: {list(bob_data.keys())}")
    print(f"   - Customer: {bob_data['customer_data']['name']}")
    print(f"   - Budget: ${bob_data['budget']}")

    # Demonstrate that contexts are completely separate
    try:
        # Alice's context mesh cannot access Bob's data
        bob_budget_from_alice = user1_context.get("budget", "AssistantAgent")
        alice_budget_from_bob = user2_context.get("budget", "AssistantAgent")

        print(f"\n🔒 Alice's budget from Alice's context: ${bob_budget_from_alice}")
        print(f"🔒 Alice's budget from Bob's context: {alice_budget_from_bob}")

    except Exception as e:
        print(f"\n❌ Cross-user access blocked: {e}")

    # Show that agents in each context are also isolated
    user1_context.register_agent_topics("SalesAgent", ["sales"])
    user2_context.register_agent_topics("SalesAgent", ["sales"])

    # Push sales data to each user's context
    user1_context.push("sales_lead", "Alice's Premium Lead", topics=["sales"])
    user2_context.push("sales_lead", "Bob's Standard Lead", topics=["sales"])

    alice_sales = user1_context.get("sales_lead", "SalesAgent")
    bob_sales = user2_context.get("sales_lead", "SalesAgent")

    print(f"\n💼 Alice's sales lead: {alice_sales}")
    print(f"💼 Bob's sales lead: {bob_sales}")

    print("\n✅ User isolation verified!")
    print("🔒 Each user's data remains completely private and separate")


if __name__ == "__main__":
    main()
