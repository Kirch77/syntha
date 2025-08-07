#!/usr/bin/env python3
"""
Multi-User Isolation Example for Syntha

This example demonstrates how to use Syntha's user isolation feature to ensure
complete separation between different users in a multi-user application.

Key Features Demonstrated:
1. User-scoped context management
2. Complete isolation between users
3. Proper setup for multi-user applications
4. Database persistence with user isolation

Copyright 2025 Syntha
Licensed under the Apache License, Version 2.0
"""

import json
import tempfile

from syntha.context import ContextMesh
from syntha.tools import ToolHandler


def main():
    """Demonstrate multi-user isolation in Syntha."""

    # Create temporary database for the example
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_path = tmp.name

    print("🔒 Multi-User Isolation Example for Syntha")
    print("=" * 50)

    # === USER 1 SETUP ===
    print("\n👤 Setting up User 1 (Alice) with her agents...")

    # Create a ContextMesh for User 1 with user_id
    user1_mesh = ContextMesh(
        user_id="user_alice_123", db_path=db_path, enable_persistence=True
    )

    # Create tool handlers for User 1's agents
    alice_sales_handler = ToolHandler(user1_mesh, agent_name="alice_sales_agent")
    alice_support_handler = ToolHandler(user1_mesh, agent_name="alice_support_agent")

    # User 1's agents subscribe to topics
    alice_sales_handler.handle_tool_call(
        "subscribe_to_topics", topics=["sales", "pricing"]
    )
    alice_support_handler.handle_tool_call(
        "subscribe_to_topics", topics=["support", "tickets"]
    )

    # User 1's agents push some context
    alice_sales_handler.handle_tool_call(
        "push_context",
        key="quarterly_sales",
        value=json.dumps({"q1": 100000, "q2": 120000, "target": 500000}),
        topics=["sales"],
    )

    alice_support_handler.handle_tool_call(
        "push_context",
        key="support_tickets",
        value=json.dumps({"open": 5, "resolved": 45, "priority_high": 2}),
        topics=["support"],
    )

    print("✅ Alice's agents have pushed context to their topics")

    # === USER 2 SETUP ===
    print("\n👤 Setting up User 2 (Bob) with his agents...")

    # Create a SEPARATE ContextMesh for User 2 with different user_id
    user2_mesh = ContextMesh(
        user_id="user_bob_456",
        db_path=db_path,  # Same database file, but user isolation in effect
        enable_persistence=True,
    )

    # Create tool handlers for User 2's agents
    bob_sales_handler = ToolHandler(user2_mesh, agent_name="bob_sales_agent")
    bob_marketing_handler = ToolHandler(user2_mesh, agent_name="bob_marketing_agent")

    # User 2's agents subscribe to topics (same topic names as User 1!)
    bob_sales_handler.handle_tool_call(
        "subscribe_to_topics", topics=["sales", "pricing"]
    )
    bob_marketing_handler.handle_tool_call(
        "subscribe_to_topics", topics=["marketing", "campaigns"]
    )

    # User 2's agents push some context
    bob_sales_handler.handle_tool_call(
        "push_context",
        key="quarterly_sales",  # Same key as User 1, but isolated!
        value=json.dumps({"q1": 75000, "q2": 95000, "target": 400000}),
        topics=["sales"],
    )

    bob_marketing_handler.handle_tool_call(
        "push_context",
        key="campaign_results",
        value=json.dumps(
            {"email_ctr": 2.5, "social_engagement": 1200, "budget_used": 5000}
        ),
        topics=["marketing"],
    )

    print("✅ Bob's agents have pushed context to their topics")

    # === DEMONSTRATE ISOLATION ===
    print("\n🔍 Demonstrating User Isolation:")
    print("-" * 30)

    # User 1 tries to access their own data - should work
    alice_sales_result = alice_sales_handler.handle_tool_call(
        "get_context", keys=["quarterly_sales"]
    )
    print(f"Alice's sales data: {alice_sales_result['context']['quarterly_sales']}")

    # User 2 tries to access their own data - should work
    bob_sales_result = bob_sales_handler.handle_tool_call(
        "get_context", keys=["quarterly_sales"]
    )
    print(f"Bob's sales data: {bob_sales_result['context']['quarterly_sales']}")

    # Show that they have different data despite same key and topic
    print("\n📊 Key Insight: Same key 'quarterly_sales' but different data!")
    print(f"Alice's Q1 sales: {alice_sales_result['context']['quarterly_sales']['q1']}")
    print(f"Bob's Q1 sales: {bob_sales_result['context']['quarterly_sales']['q1']}")

    # === CROSS-USER ACCESS TEST ===
    print("\n🚫 Testing Cross-User Access (Should Fail):")
    print("-" * 40)

    # User 1 tries to access User 2's context - should fail
    try:
        # This won't work because User 1's mesh only sees User 1's data
        alice_marketing_result = alice_sales_handler.handle_tool_call(
            "get_context", keys=["campaign_results"]  # This exists in User 2's context
        )
        print(f"Alice trying to access Bob's marketing data: {alice_marketing_result}")
    except Exception as e:
        print(f"❌ Alice cannot access Bob's data: {str(e)}")

    # === TOPIC DISCOVERY PER USER ===
    print("\n🔍 Topic Discovery Per User:")
    print("-" * 25)

    # User 1's available topics
    alice_topics = alice_sales_handler.handle_tool_call("discover_topics")
    print(f"Alice's available topics: {list(alice_topics['topics'].keys())}")

    # User 2's available topics
    bob_topics = bob_sales_handler.handle_tool_call("discover_topics")
    print(f"Bob's available topics: {list(bob_topics['topics'].keys())}")

    # === CONTEXT LISTING PER USER ===
    print("\n📋 Context Listing Per User:")
    print("-" * 25)

    # User 1's available context
    alice_context = alice_sales_handler.handle_tool_call("list_context")
    print(
        f"Alice's available context keys: {list(alice_context.get('context_by_topic', {}).keys())}"
    )

    # User 2's available context
    bob_context = bob_sales_handler.handle_tool_call("list_context")
    print(
        f"Bob's available context keys: {list(bob_context.get('context_by_topic', {}).keys())}"
    )

    # === PRODUCTION USAGE PATTERNS ===
    print("\n🏭 Production Usage Patterns:")
    print("-" * 30)

    print(
        """
    For production applications:
    
    1. 🔑 User ID Management:
       - Use unique user IDs (e.g., UUID, database primary key)
       - Validate user IDs on every request
       - Never expose user IDs to other users
    
    2. 🏗️ Application Architecture:
       - Create one ContextMesh per user session
       - Pass user_id during ContextMesh initialization
       - Use dependency injection for user-scoped contexts
    
    3. 🔒 Security Best Practices:
       - Validate user permissions before creating agents
       - Use secure user session management
       - Implement rate limiting per user
       - Log all user actions for audit trails
    
    4. 📊 Example Multi-User App Setup:
       ```python
       def create_user_context(user_id: str) -> ContextMesh:
           return ContextMesh(
               user_id=user_id,
               db_path="app_database.db",
               enable_persistence=True
           )
       
       def create_user_agent(user_id: str, agent_name: str) -> ToolHandler:
           mesh = create_user_context(user_id)
           return ToolHandler(mesh, agent_name=agent_name)
       ```
    """
    )

    # Clean up
    user1_mesh.close()
    user2_mesh.close()

    print("\n✅ Multi-user isolation example completed!")
    print("🔒 Users' data remains completely isolated")


if __name__ == "__main__":
    main()
