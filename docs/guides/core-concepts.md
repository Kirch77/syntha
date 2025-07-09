# Core Concepts

Understanding Syntha's architecture and core concepts will help you build robust multi-agent systems.

## Architecture Overview

Syntha is built around three main components that work together seamlessly:

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Agent System                      │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Agent A   │  │   Agent B   │  │   Agent C   │       │
│  │             │  │             │  │             │       │
│  │ LLM + Tools │  │ LLM + Tools │  │ LLM + Tools │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
│         │                │                │               │
│         └────────────────┼────────────────┘               │
│                          │                                 │
│  ┌──────────────────────▼──────────────────────┐          │
│  │              Syntha Mesh                    │          │
│  │                                             │          │
│  │  ┌─────────────┐ ┌─────────────┐ ┌────────┐ │          │
│  │  │ContextMesh  │ │ToolHandler  │ │Prompts │ │          │
│  │  │             │ │             │ │        │ │          │
│  │  │ • Context   │ │ • 7 Tools   │ │ • Auto │ │          │
│  │  │ • Messages  │ │ • Schemas   │ │   Inject│ │          │
│  │  │ • TTL       │ │ • Execution │ │ • Templates│         │
│  │  │ • Access    │ │ • Responses │ │        │ │          │
│  │  └─────────────┘ └─────────────┘ └────────┘ │          │
│  └─────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 1. ContextMesh - Shared Memory System

The `ContextMesh` is the heart of Syntha - a high-performance, thread-safe shared memory system where agents store and retrieve context.

### Key Features

**Shared Knowledge**: All agents can access common information

```python
mesh.push("company_name", "TechCorp")  # Global access
mesh.push("project_status", "In Progress")
```

**Access Control**: Restrict sensitive information to specific agents

```python
mesh.push("database_credentials", {"user": "admin", "pass": "secret"},
          subscribers=["Backend", "Database"])
```

**Time-To-Live (TTL)**: Automatic expiration for temporary data

```python
mesh.push("session_token", "abc123", ttl=3600)  # Expires in 1 hour
```

**Performance Optimization**: Optional indexing for large datasets

```python
mesh = ContextMesh(enable_indexing=True)  # 10x faster lookups
```

### Context Lifecycle

```python
# 1. Store context
mesh.push("user_count", 1500)

# 2. Retrieve context
count = mesh.get("user_count")

# 3. Update context
mesh.push("user_count", 1600)  # Overwrites previous value

# 4. Automatic cleanup (if TTL set)
# Context expires and is removed automatically
```

### Access Patterns

**Global Context**: Accessible to all agents

```python
mesh.push("environment", "production")
mesh.push("api_version", "v2.1")
```

**Team Context**: Accessible to specific agents

```python
mesh.push("frontend_config", config, subscribers=["Frontend", "QA"])
mesh.push("backend_config", config, subscribers=["Backend", "DevOps"])
```

**Agent-Specific Context**: Accessible to one agent

```python
mesh.push("user_preferences", preferences, subscribers=["UserAgent"])
```

## 2. ToolHandler - LLM Integration Interface

The `ToolHandler` provides standardized tool schemas and execution for LLM function calling.

### The 7 Core Tools

| Tool                          | Purpose                    | When to Use                      |
| ----------------------------- | -------------------------- | -------------------------------- |
| `get_context`                 | Retrieve shared context    | Agent needs current state/data   |
| `push_context`                | Store shared context       | Agent wants to share information |
| `list_context_keys`           | Discover available context | Debugging or exploration         |
| `send_message_to_agent`       | Direct messaging           | Task assignment, notifications   |
| `get_messages_from_agents`    | Retrieve messages          | Check for new tasks/updates      |
| `broadcast_message_to_agents` | Multi-agent messaging      | Announcements, team updates      |
| `batch_context_operation`     | Bulk operations            | Performance optimization         |

### Tool Integration Flow

```python
# 1. Get tool schemas for your LLM
handler = ToolHandler(mesh)
schemas = handler.get_schemas()

# 2. LLM makes function calls
# (Your LLM framework handles this)

# 3. Execute tool calls
result = handler.handle_tool_call("send_message_to_agent",
    from_agent="Agent1",
    to_agent="Agent2",
    message="Task completed"
)

# 4. Handle results
if result["success"]:
    print("Message sent successfully")
else:
    print(f"Error: {result['error']}")
```

### Error Handling

All tools return standardized responses:

```python
# Success response
{
    "success": True,
    "message": "Operation completed",
    # ... tool-specific data
}

# Error response
{
    "success": False,
    "error": "Descriptive error message",
    "error_code": "ERROR_TYPE",
    "suggestions": ["How to fix", "Alternative approaches"]
}
```

## 3. Prompt Builders - Context Injection

Prompt builders automatically inject relevant context into LLM system prompts.

### Automatic Context Injection

```python
# Generate context-aware system prompt
prompt = build_system_prompt("Backend", mesh)

# The generated prompt includes:
# - Agent-specific context (respects access control)
# - Available tool descriptions
# - Current system state
# - Formatted for optimal LLM understanding
```

### Custom Templates

```python
from syntha.prompts import build_message_prompt

# Custom template with variables
template = """
You are {agent_name} working on {context[project_name]}.
Current environment: {context[environment]}
Your available tools: {tools}

Task: {task}
"""

prompt = build_message_prompt("Backend", mesh, template,
                              task="Implement user authentication")
```

### Context Filtering

Prompts automatically respect access control:

```python
# Backend agent only sees backend-specific + global context
backend_prompt = build_system_prompt("Backend", mesh)

# Frontend agent only sees frontend-specific + global context
frontend_prompt = build_system_prompt("Frontend", mesh)
```

## Agent Communication Patterns

### Direct Messaging

One agent sends a message to another specific agent:

```python
handler.handle_tool_call("send_message_to_agent",
    from_agent="ProductManager",
    to_agent="DevLead",
    message="Please prioritize the authentication feature"
)
```

### Broadcasting

One agent sends a message to multiple agents:

```python
handler.handle_tool_call("broadcast_message_to_agents",
    from_agent="CEO",
    to_agents=["DevLead", "ProductManager", "QA"],
    message="All-hands meeting at 3 PM"
)
```

### Threading

Organize related messages into conversations:

```python
# Start a discussion thread
handler.handle_tool_call("send_message_to_agent",
    from_agent="QA",
    to_agent="Dev",
    message="Found bug in payment flow",
    thread_id="payment_bug_investigation"
)

# Continue the thread
handler.handle_tool_call("send_message_to_agent",
    from_agent="Dev",
    to_agent="QA",
    message="Can you provide reproduction steps?",
    thread_id="payment_bug_investigation"
)
```

### Message Priorities

Control urgency and importance:

```python
# Urgent message
handler.handle_tool_call("send_message_to_agent",
    from_agent="Monitoring",
    to_agent="DevOps",
    message="Production server down!",
    priority="urgent"
)

# Normal priority (default)
handler.handle_tool_call("send_message_to_agent",
    from_agent="PM",
    to_agent="Dev",
    message="Update progress on feature X",
    priority="normal"
)
```

## Data Flow Patterns

### Context Sharing Pattern

```python
# 1. Agent A generates data
result = process_user_data(user_input)

# 2. Agent A shares with team
mesh.push("user_analysis", result, subscribers=["Backend", "Frontend"])

# 3. Agent B accesses shared data
analysis = mesh.get("user_analysis")

# 4. Agent B uses data and shares results
processed = enhance_analysis(analysis)
mesh.push("enhanced_analysis", processed)
```

### Request-Response Pattern

```python
# 1. Agent A requests work
handler.handle_tool_call("send_message_to_agent",
    from_agent="Frontend",
    to_agent="Backend",
    message="Please validate user data: " + json.dumps(user_data),
    message_type="request"
)

# 2. Agent B processes and responds
validation_result = validate_user_data(user_data)
handler.handle_tool_call("send_message_to_agent",
    from_agent="Backend",
    to_agent="Frontend",
    message="Validation result: " + json.dumps(validation_result),
    message_type="result"
)
```

### Workflow Coordination Pattern

```python
# 1. Coordinator starts workflow
workflow_id = "user_onboarding_" + str(uuid.uuid4())

handler.handle_tool_call("broadcast_message_to_agents",
    from_agent="Coordinator",
    to_agents=["EmailAgent", "DatabaseAgent", "NotificationAgent"],
    message=f"Starting user onboarding workflow {workflow_id}",
    thread_id=workflow_id
)

# 2. Each agent performs their part
# EmailAgent: Send welcome email
# DatabaseAgent: Create user record
# NotificationAgent: Send push notification

# 3. Agents report completion
handler.handle_tool_call("send_message_to_agent",
    from_agent="EmailAgent",
    to_agent="Coordinator",
    message="Welcome email sent successfully",
    thread_id=workflow_id,
    message_type="result"
)
```

## Performance Concepts

### Indexing System

Enable for systems with >100 context items:

```python
# Fast agent lookups
mesh = ContextMesh(enable_indexing=True)

# 10x performance improvement for:
# - get_all_for_agent() calls
# - Large context datasets
# - Frequent context access
```

### Auto-Cleanup System

Prevents memory leaks in long-running systems:

```python
# Automatic TTL processing
mesh = ContextMesh(auto_cleanup=True)

# Benefits:
# - Expired context automatically removed
# - Memory usage stays constant
# - No manual cleanup required
```

### Batch Operations

Optimize multiple operations:

```python
# Instead of multiple individual calls
handler.handle_tool_call("batch_context_operation",
    agent_name="DataProcessor",
    operations=[
        {"type": "push", "key": "metric1", "value": 100},
        {"type": "push", "key": "metric2", "value": 200},
        {"type": "get", "key": "previous_total"}
    ],
    atomic=True  # All succeed or all fail
)
```

## Security Concepts

### Access Control

Protect sensitive information:

```python
# Public information
mesh.push("company_name", "TechCorp")

# Team-specific information
mesh.push("api_keys", secrets, subscribers=["Backend", "DevOps"])

# Agent-specific information
mesh.push("user_session", session_data, subscribers=["UserAgent"])
```

### TTL for Sensitive Data

Automatic expiration for temporary sensitive data:

```python
# Short-lived session token
mesh.push("auth_token", token, ttl=3600, subscribers=["AuthAgent"])

# Temporary cache
mesh.push("api_response", data, ttl=300)  # 5 minutes
```

## Best Practices Summary

### Context Management

- Use descriptive keys: `"user_preferences"` not `"up"`
- Set appropriate TTL for temporary data
- Use subscribers for sensitive information
- Enable indexing for large datasets

### Agent Communication

- Use meaningful message types and priorities
- Create threads for related conversations
- Include context in messages when needed
- Handle errors gracefully

### Performance

- Enable indexing for >100 context items
- Enable auto-cleanup for long-running systems
- Use batch operations for multiple changes
- Monitor system stats regularly

### Security

- Use subscribers for access control
- Set TTL for sensitive temporary data
- Avoid storing secrets in global context
- Regular cleanup of expired data

---

**Next Steps**: Now that you understand the core concepts, try the [Basic Usage Tutorial](../tutorials/basic-usage.md) or explore [real-world examples](../examples/).
