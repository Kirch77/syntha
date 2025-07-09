"""
Complete Syntha SDK Example - All Features in One Script

This example demonstrates all key Syntha features:
- Context management with access control
- Agent-to-agent communication
- Performance optimizations
- Bulk operations
- Message threading
- Integration with LLM frameworks
"""

import json
import time
from syntha import ContextMesh, ToolHandler, build_system_prompt

def main():
    print("🚀 Syntha SDK - Complete Feature Demo")
    print("=" * 50)
    
    # 1. Initialize with performance optimizations
    print("\n1️⃣ Initializing ContextMesh with optimizations...")
    mesh = ContextMesh(
        enable_indexing=True,    # 10x faster lookups
        auto_cleanup=True        # Automatic memory management
    )
    handler = ToolHandler(mesh)
    
    print(f"✅ ContextMesh initialized")
    print(f"📊 Available tools: {len(handler.get_schemas())}")
    
    # 2. Context Management - Shared Knowledge
    print("\n2️⃣ Setting up shared context...")
    
    # Global context (accessible by all agents)
    mesh.push("company_name", "TechCorp Inc")
    mesh.push("project_deadline", "2025-03-15")
    mesh.push("environment", "production")
    
    # Team-specific context
    mesh.push("dev_server", "https://api-dev.techcorp.com", 
              subscribers=["DevLead", "Backend", "Frontend"])
    
    # Sensitive context with limited access
    mesh.push("api_keys", {"stripe": "sk_test_...", "openai": "sk-..."}, 
              subscribers=["Backend"], ttl=3600)  # Expires in 1 hour
    
    # Analytics data
    mesh.push("user_metrics", {"daily_active": 1500, "conversion": 0.045}, 
              subscribers=["Analytics", "Product", "Marketing"])
    
    print("✅ Context added: global, team-specific, and secure data")
    
    # 3. Generate LLM Prompts with Context
    print("\n3️⃣ Generating context-aware prompts...")
    
    # System prompt for different agents
    dev_prompt = build_system_prompt("Backend", mesh)
    analytics_prompt = build_system_prompt("Analytics", mesh)
    
    print("✅ Generated context-injected prompts for agents")
    print(f"📄 Backend agent has access to {len(mesh.get_all_for_agent('Backend'))} context items")
    print(f"📄 Analytics agent has access to {len(mesh.get_all_for_agent('Analytics'))} context items")
    
    # 4. Agent Communication - Direct Messaging
    print("\n4️⃣ Agent-to-agent communication...")
    
    # DevLead sends task to Backend
    result1 = handler.handle_tool_call("send_message_to_agent",
        from_agent="DevLead",
        to_agent="Backend", 
        message="Please implement user authentication endpoint with JWT tokens",
        message_type="request",
        priority="high",
        requires_confirmation=True,
        thread_id="auth_implementation"
    )
    print(f"📤 DevLead → Backend: {result1['message']}")
    
    # Backend responds with confirmation
    result2 = handler.handle_tool_call("send_message_to_agent",
        from_agent="Backend",
        to_agent="DevLead",
        message="Authentication endpoint implemented. Added JWT middleware and user validation.",
        message_type="result", 
        priority="high",
        thread_id="auth_implementation"
    )
    print(f"📤 Backend → DevLead: {result2['message']}")
    
    # 5. Bulk Operations - Broadcast
    print("\n5️⃣ Bulk messaging and operations...")
    
    # Broadcast to entire team
    broadcast_result = handler.handle_tool_call("broadcast_message_to_agents",
        from_agent="Product",
        to_agents=["DevLead", "Backend", "Frontend", "Analytics", "Marketing"],
        message="🎉 New feature ready for testing: User authentication system",
        message_type="announcement",
        priority="normal",
        create_thread=True,
        exclude_sender=True  # Product won't receive their own message
    )
    print(f"📢 Broadcast sent to {broadcast_result['successful_sends']} agents")
    
    # Batch context operations
    batch_result = handler.handle_tool_call("batch_context_operation",
        agent_name="Analytics",
        operations=[
            {"type": "push", "key": "feature_flag_auth", "value": True},
            {"type": "push", "key": "test_users", "value": ["test@example.com"], "subscribers": ["Backend", "Frontend"]},
            {"type": "get", "key": "user_metrics"}
        ],
        atomic=True,
        continue_on_error=False
    )
    print(f"⚡ Batch operation: {batch_result['successful_operations']}/{batch_result['total_operations']} succeeded")
    
    # 6. Message Retrieval with Advanced Filtering
    print("\n6️⃣ Advanced message retrieval...")
    
    # DevLead checks all messages
    dev_messages = handler.handle_tool_call("get_messages_from_agents",
        agent_name="DevLead",
        unread_only=False,
        sort_by_priority=True,
        limit=10
    )
    print(f"📥 DevLead has {dev_messages['count']} messages")
    
    # Backend checks only high priority messages
    backend_urgent = handler.handle_tool_call("get_messages_from_agents",
        agent_name="Backend", 
        priority="high",
        thread_id="auth_implementation",
        include_confirmations=True
    )
    print(f"🔥 Backend has {backend_urgent['count']} high priority messages in auth thread")
    
    # 7. Performance Demonstration
    print("\n7️⃣ Performance features...")
    
    # Add many context items to demonstrate indexing
    start_time = time.time()
    for i in range(100):
        mesh.push(f"metric_{i}", f"value_{i}", subscribers=["Analytics"])
    
    # Fast retrieval with indexing
    all_analytics_data = mesh.get_all_for_agent("Analytics")
    end_time = time.time()
    
    print(f"⚡ Added 100 items and retrieved {len(all_analytics_data)} items in {end_time - start_time:.4f}s")
    print(f"🚀 Indexing enabled: {mesh.enable_indexing}")
    print(f"🧹 Auto-cleanup enabled: {mesh.auto_cleanup}")
    
    # 8. LLM Integration Example
    print("\n8️⃣ LLM integration pattern...")
    
    # Show how to use with OpenAI (commented to avoid API calls)
    print("📝 OpenAI integration example:")
    print("""
    import openai
    
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": build_system_prompt("Backend", mesh)},
            {"role": "user", "content": "Check for new tasks and report status"}
        ],
        tools=handler.get_schemas()  # All 7 Syntha tools
    )
    
    # Handle tool calls from LLM
    for tool_call in response.choices[0].message.tool_calls or []:
        result = handler.handle_tool_call(
            tool_call.function.name,
            **json.loads(tool_call.function.arguments)
        )
        print(f"Tool result: {result}")
    """)
    
    # 9. Statistics and Monitoring
    print("\n9️⃣ System statistics...")
    
    stats = mesh.get_stats()
    print(f"📊 Total context items: {stats['total_items']}")
    print(f"📊 Unique agents: {len(set(agent for item in mesh._data.values() for agent in item.subscribers))}")
    
    # Check message threads
    all_messages = handler.handle_tool_call("get_messages_from_agents",
        agent_name="DevLead", 
        unread_only=False,
        mark_as_read=False
    )
    
    threads = all_messages.get('threads', {})
    print(f"🧵 Active conversation threads: {len(threads)}")
    for thread_id, messages in threads.items():
        print(f"   • {thread_id}: {len(messages)} messages")
    
    print("\n" + "="*50)
    print("✅ Complete Syntha SDK demo finished!")
    print("🔗 Ready for production multi-agent systems")
    
    return {
        "context_items": len(mesh._data),
        "messages_sent": 3,  # Individual + broadcast
        "agents_active": 6,
        "threads_created": 2,
        "performance_optimized": mesh.enable_indexing and mesh.auto_cleanup
    }

if __name__ == "__main__":
    results = main()
    print(f"\n📈 Demo Results: {results}")
