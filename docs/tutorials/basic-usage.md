# Basic Usage Tutorial

Learn the fundamentals of building multi-agent systems with Syntha through hands-on examples.

## What You'll Build

In this tutorial, you'll create a simple multi-agent system with:
- **ProductManager**: Assigns tasks and coordinates work
- **Developer**: Implements features and reports progress  
- **QA**: Tests features and reports issues

## Prerequisites

- Syntha SDK installed ([Installation Guide](../guides/installation.md))
- Basic Python knowledge
- 15 minutes

## Step 1: Setup the Foundation

Create a new Python file `basic_tutorial.py`:

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt
import json
import time

# Initialize Syntha with optimizations
mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
handler = ToolHandler(mesh)

print("✅ Syntha initialized")
```

## Step 2: Create Shared Context

Add project information that all agents can access:

```python
# Project information (global context)
mesh.push("project_name", "UserAuth System")
mesh.push("deadline", "2025-02-15")
mesh.push("priority", "high")

# Team-specific configurations
mesh.push("dev_environment", {
    "api_url": "https://dev-api.company.com",
    "database": "postgresql://dev-db:5432/userauth",
    "redis": "redis://dev-cache:6379"
}, subscribers=["Developer"])

mesh.push("qa_environment", {
    "test_url": "https://test-api.company.com", 
    "test_database": "postgresql://test-db:5432/userauth"
}, subscribers=["QA"])

print("✅ Context setup complete")
print(f"Available keys: {mesh.list_keys()}")
```

## Step 3: Agent Communication Basics

Let's see how agents communicate:

```python
# ProductManager assigns a task to Developer
task_result = handler.handle_tool_call("send_message_to_agent",
    from_agent="ProductManager",
    to_agent="Developer",
    message="Please implement OAuth2 login functionality",
    message_type="request",
    priority="high"
)

print(f"Task assigned: {task_result['success']}")

# Developer checks for new messages
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Developer",
    unread_only=True
)

print(f"Developer has {messages['count']} new messages")
if messages['count'] > 0:
    latest_message = messages['messages'][0]
    print(f"Latest task: {latest_message['message']}")
```

## Step 4: Context-Aware Prompts

Generate prompts that include relevant context:

```python
# Generate system prompt for Developer
dev_prompt = build_system_prompt("Developer", mesh)

print("\n" + "="*50)
print("DEVELOPER SYSTEM PROMPT:")
print("="*50)
print(dev_prompt[:500] + "..." if len(dev_prompt) > 500 else dev_prompt)
print("="*50)

# Generate system prompt for QA
qa_prompt = build_system_prompt("QA", mesh)

print("\nQA SYSTEM PROMPT (first 200 chars):")
print(qa_prompt[:200] + "...")
```

## Step 5: Simulate Work Progress

Let's simulate agents working and sharing updates:

```python
# Developer starts work and updates context
handler.handle_tool_call("push_context",
    key="feature_status",
    value={
        "oauth2_login": "in_progress",
        "started_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "progress": 30
    }
)

# Developer sends progress update
handler.handle_tool_call("send_message_to_agent",
    from_agent="Developer",
    to_agent="ProductManager",
    message="OAuth2 implementation is 30% complete. Database schema ready.",
    message_type="result"
)

print("✅ Developer progress updated")

# Later... Developer completes the feature
handler.handle_tool_call("push_context",
    key="feature_status", 
    value={
        "oauth2_login": "completed",
        "completed_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "progress": 100
    }
)

# Developer notifies QA for testing
handler.handle_tool_call("send_message_to_agent",
    from_agent="Developer",
    to_agent="QA",
    message="OAuth2 login feature is ready for testing. Deployed to test environment.",
    message_type="request",
    priority="normal"
)

print("✅ Feature completed, QA notified")
```

## Step 6: Testing and Issue Reporting

QA agent tests and provides feedback:

```python
# QA checks messages and starts testing
qa_messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="QA",
    unread_only=True
)

print(f"QA has {qa_messages['count']} new messages")

# QA finds an issue and reports it
handler.handle_tool_call("send_message_to_agent",
    from_agent="QA",
    to_agent="Developer",
    message="Found issue: OAuth2 redirect URL is not working with HTTPS. Error: 'Invalid redirect_uri'",
    message_type="bug_report",
    priority="high"
)

# QA updates issue tracker in shared context
handler.handle_tool_call("push_context",
    key="qa_issues",
    value=[
        {
            "id": "OAUTH-001",
            "title": "HTTPS redirect URL not working",
            "severity": "high",
            "status": "open",
            "found_by": "QA",
            "assigned_to": "Developer"
        }
    ]
)

print("✅ Issue reported and tracked")
```

## Step 7: Thread-Based Conversations

Organize related communications:

```python
# Start a discussion thread about the bug
thread_id = "oauth_bug_investigation"

handler.handle_tool_call("send_message_to_agent",
    from_agent="Developer",
    to_agent="QA", 
    message="Can you provide exact steps to reproduce the HTTPS redirect issue?",
    thread_id=thread_id,
    message_type="question"
)

handler.handle_tool_call("send_message_to_agent",
    from_agent="QA",
    to_agent="Developer",
    message="Steps: 1) Login with Google OAuth 2) Redirect to https://app.com/callback 3) Error appears",
    thread_id=thread_id,
    message_type="info"
)

# Get all messages in the thread
thread_messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Developer",
    thread_id=thread_id
)

print(f"Bug investigation thread has {thread_messages['count']} messages")
```

## Step 8: Team Coordination

ProductManager coordinates the team:

```python
# ProductManager broadcasts an update to the team
broadcast_result = handler.handle_tool_call("broadcast_message_to_agents",
    from_agent="ProductManager",
    to_agents=["Developer", "QA"],
    message="Great progress on OAuth2! Let's target completion by EOD for the demo.",
    message_type="announcement",
    create_thread=True
)

print(f"Team update broadcast to {broadcast_result['successful_sends']} agents")

# Check overall project status
feature_status = mesh.get("feature_status")
qa_issues = mesh.get("qa_issues", [])

print("\n" + "="*40)
print("PROJECT STATUS DASHBOARD")
print("="*40)
print(f"Project: {mesh.get('project_name')}")
print(f"Deadline: {mesh.get('deadline')}")
print(f"Feature Status: {feature_status}")
print(f"Open Issues: {len(qa_issues)}")
print("="*40)
```

## Step 9: Advanced Features

Explore more sophisticated patterns:

```python
# Batch operations for efficiency
batch_result = handler.handle_tool_call("batch_context_operation",
    agent_name="ProductManager",
    operations=[
        {"type": "push", "key": "sprint_status", "value": "active"},
        {"type": "push", "key": "team_velocity", "value": 8.5},
        {"type": "get", "key": "feature_status"},
        {"type": "push", "key": "next_review", "value": "2025-01-15"}
    ],
    atomic=True
)

print(f"Batch operation: {batch_result['successful_operations']} operations completed")

# Message confirmations for critical communications
handler.handle_tool_call("send_message_to_agent",
    from_agent="ProductManager",
    to_agent="Developer",
    message="URGENT: Customer demo moved to tomorrow. Need OAuth2 working by 9 AM.",
    priority="urgent",
    requires_confirmation=True,
    message_type="alert"
)

print("✅ Critical message sent with confirmation required")
```

## Step 10: LLM Integration (Simulation)

Here's how you'd integrate with an actual LLM:

```python
def simulate_llm_agent(agent_name, user_input):
    """
    Simulates LLM integration - replace with your actual LLM calls
    """
    # 1. Get context-aware system prompt
    system_prompt = build_system_prompt(agent_name, mesh)
    
    # 2. Get available tools
    tools = handler.get_schemas()
    
    # 3. Simulate LLM processing
    print(f"\n🤖 {agent_name} LLM Agent Processing...")
    print(f"System prompt length: {len(system_prompt)} chars")
    print(f"Available tools: {len(tools)}")
    print(f"User input: {user_input}")
    
    # 4. Simulate tool usage
    if "check messages" in user_input.lower():
        messages = handler.handle_tool_call("get_messages_from_agents",
            agent_name=agent_name,
            unread_only=True
        )
        print(f"✅ Found {messages['count']} unread messages")
        return f"You have {messages['count']} unread messages"
    
    elif "update status" in user_input.lower():
        handler.handle_tool_call("push_context",
            key=f"{agent_name.lower()}_last_activity",
            value=time.strftime("%Y-%m-%d %H:%M:%S")
        )
        print("✅ Status updated")
        return "Status updated successfully"
    
    return "Task processed"

# Test LLM simulation
response1 = simulate_llm_agent("Developer", "Check my messages and update my status")
response2 = simulate_llm_agent("QA", "Check if there are any new features to test")

print(f"Developer response: {response1}")
print(f"QA response: {response2}")
```

## Summary and System Stats

```python
# Final system overview
stats = mesh.get_stats()
all_keys = mesh.list_keys()

print("\n" + "="*50)
print("TUTORIAL COMPLETE - SYSTEM OVERVIEW")
print("="*50)
print(f"Total context items: {stats['total_items']}")
print(f"Context keys: {', '.join(all_keys)}")
print(f"Indexing enabled: {mesh.enable_indexing}")
print(f"Auto-cleanup enabled: {mesh.auto_cleanup}")

# Show all messages for each agent
for agent in ["ProductManager", "Developer", "QA"]:
    messages = handler.handle_tool_call("get_messages_from_agents",
        agent_name=agent,
        unread_only=False,
        limit=10
    )
    print(f"{agent}: {messages['count']} total messages")

print("="*50)
print("🎉 Tutorial completed successfully!")
print("Next steps:")
print("- Try the Agent Communication Tutorial")
print("- Explore LLM Integration examples")
print("- Build your own multi-agent system")
```

## Complete Code

Here's the complete tutorial code:

<details>
<summary>Click to expand complete code</summary>

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt
import json
import time

def main():
    """Complete basic usage tutorial"""
    
    # Step 1: Initialize
    mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
    handler = ToolHandler(mesh)
    print("✅ Syntha initialized")
    
    # Step 2: Setup context
    mesh.push("project_name", "UserAuth System")
    mesh.push("deadline", "2025-02-15")
    mesh.push("priority", "high")
    
    mesh.push("dev_environment", {
        "api_url": "https://dev-api.company.com",
        "database": "postgresql://dev-db:5432/userauth"
    }, subscribers=["Developer"])
    
    # Step 3: Agent communication
    handler.handle_tool_call("send_message_to_agent",
        from_agent="ProductManager",
        to_agent="Developer", 
        message="Please implement OAuth2 login functionality",
        message_type="request",
        priority="high"
    )
    
    # Step 4: Progress tracking
    handler.handle_tool_call("push_context",
        key="feature_status",
        value={"oauth2_login": "completed", "progress": 100}
    )
    
    # Step 5: Issue reporting
    handler.handle_tool_call("send_message_to_agent",
        from_agent="QA",
        to_agent="Developer",
        message="Found OAuth2 HTTPS redirect issue",
        message_type="bug_report",
        priority="high"
    )
    
    # Step 6: Team coordination
    handler.handle_tool_call("broadcast_message_to_agents",
        from_agent="ProductManager",
        to_agents=["Developer", "QA"],
        message="Great progress! Demo target: EOD",
        message_type="announcement"
    )
    
    # Final stats
    stats = mesh.get_stats()
    print(f"\n🎉 Tutorial complete! {stats['total_items']} context items created")

if __name__ == "__main__":
    main()
```

</details>

## Key Learnings

After completing this tutorial, you now understand:

✅ **Context Management**: How to store and share data between agents  
✅ **Agent Communication**: Direct messaging, broadcasting, and threading  
✅ **Access Control**: Restricting context to specific agents  
✅ **Prompt Generation**: Creating context-aware LLM prompts  
✅ **Tool Integration**: Using Syntha's 7 core tools  
✅ **Performance Features**: Indexing and auto-cleanup benefits  

## Next Steps

### Immediate Next Steps
1. **[Agent Communication Tutorial](agent-communication.md)** - Master advanced messaging patterns
2. **[Context Management Tutorial](context-management.md)** - Deep dive into context strategies
3. **[LLM Integration Tutorial](llm-integration.md)** - Connect with real LLM frameworks

### Real-World Applications
- **[E-commerce Example](../examples/ecommerce.md)** - Multi-agent online store
- **[Development Team Example](../examples/dev-team.md)** - Coordinated software development
- **[Customer Support Example](../examples/customer-support.md)** - Automated support system

### Advanced Topics
- **[Performance Optimization](../guides/performance.md)** - Production-ready optimizations
- **[Security Guide](../guides/security.md)** - Protect sensitive data
- **[Best Practices](../guides/best-practices.md)** - Professional deployment patterns

---

**Questions?** Check the [Troubleshooting Guide](../guides/troubleshooting.md) or explore the [API Reference](../api/).

**Ready for more?** Try the [Agent Communication Tutorial](agent-communication.md) next!
