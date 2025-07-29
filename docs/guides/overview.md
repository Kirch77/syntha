# Guides Overview

Welcome to the Syntha SDK guides! These practical tutorials will help you understand how to effectively use Syntha in your multi-agent systems. Unlike typical documentation that can be overwhelming, these guides focus on real-world usage patterns with working examples you can copy and run immediately.

## Why These Guides Exist

API documentation tells you *what* you can do, but guides show you *how* and *when* to do it. After working with many developers, we've learned that the biggest challenges aren't understanding individual functions—they're understanding how everything fits together and what patterns work best in production.

## Context Management Approaches

Syntha provides two primary ways to manage context between agents, each with distinct advantages:

### 1. Topic-Based Context (Recommended for Tools)

**How it works:** Agents subscribe to topics and automatically receive relevant context pushed to those topics.

**Best for:**
- Agent-to-agent communication through tools
- Scalable workflows where agents join/leave dynamically  
- Broadcast scenarios (one agent sharing with many)
- Domain-specific coordination (sales, support, analytics)

**Example pattern:**
```python
# Agents subscribe to topics they care about
sales_agent.subscribe_to_topics(["sales", "customers"])
support_agent.subscribe_to_topics(["support", "customers"])

# When context is pushed to a topic, subscribers automatically get it
context.push("new_customer", customer_data, topics=["sales", "support"])
```

### 2. Subscription-Based Context (For Direct Targeting)

**How it works:** Context is pushed directly to specific named agents.

**Best for:**
- Private communication between specific agents
- Sensitive data that should only go to certain agents
- Direct coordination scenarios
- Legacy integrations where you know exact agent names

**Example pattern:**
```python
# Direct targeting to specific agents
context.push("confidential_data", secret_info, subscribers=["AdminAgent", "SecurityAgent"])
```

## Integration Strategies

### Tools vs. Prompts: Choosing Your Approach

Syntha offers two ways to integrate context with your agents:

#### Tool-Based Integration (Agents Control Context)
Agents actively manage context through function calls:

```python
# Agent can discover, subscribe, and share context
handler = ToolHandler(context, "MyAgent")
result = handler.handle_tool_call("subscribe_to_topics", topics=["sales"])
```

**Advantages:**
- Agents have full control over their context
- Dynamic topic management
- Works with any LLM that supports function calling
- Scales well with complex workflows

**Best for:** Multi-agent systems where agents need to actively coordinate

#### Prompt-Based Integration (Context Injected Automatically)
Context is automatically injected into agent prompts:

```python
# Context automatically included in prompts
system_prompt = build_system_prompt("MyAgent", context)
```

**Advantages:**
- Simple integration - no function calling needed
- Works with any LLM (even those without function calling)
- Transparent to the agent - just appears in prompts
- Good for simple scenarios

**Best for:** Single agents or simple systems where context is mostly read-only

### Combining Approaches: When and How

You *can* use both tools and prompts together, but be careful about information overload:

**Good combination:**
- Use prompts for stable, long-term context (user preferences, system config)
- Use tools for dynamic, workflow-specific context (current tasks, real-time updates)

**Avoid:**
- Duplicating the same information in both prompts and tools
- Overwhelming agents with too much context from multiple sources

## Security and User Isolation

One of Syntha's most critical features is user isolation. **Every production deployment must use proper user separation.**

### The Golden Rule: Always Use user_id

```python
# ✅ CORRECT - Each user gets isolated context
user1_context = ContextMesh(user_id="user_123")
user2_context = ContextMesh(user_id="user_456")

# ❌ WRONG - All users share the same context (major security risk)
shared_context = ContextMesh()  # No user_id!
```

### Why User Isolation Matters

- **Privacy:** Users can't see each other's conversations or data
- **Security:** Prevents accidental data leaks between users
- **Compliance:** Meets data protection requirements (GDPR, CCPA, etc.)
- **Scalability:** Clean separation enables better performance and scaling

## Performance and Persistence

### Context Lifecycle Management

Context items can have different lifespans:

- **Permanent:** Configuration, user preferences, long-term knowledge
- **Session-based:** Temporary data that expires after a session
- **Time-limited:** Data with explicit TTL (time-to-live)

```python
# Permanent context
context.push("user_preferences", prefs)

# Session context (expires in 1 hour)
context.push("session_data", data, ttl=3600)

# Temporary context (expires in 5 minutes)
context.push("temp_token", token, ttl=300)
```

### Best Practices for TTL

- **Short TTL (minutes):** Temporary tokens, real-time status
- **Medium TTL (hours):** Session data, current tasks
- **Long TTL (days):** Cached data, temporary preferences
- **No TTL:** User preferences, system configuration

## What's Coming Next

Our guides are structured to build your understanding progressively:

1. **[Basics](basics.md):** Get started with simple context sharing
2. **[Context Management](context.md):** Master the context mesh with security best practices
3. **[Tools & Permissions](tools.md):** Build sophisticated agent coordination with proper access control
4. **[Final Remarks](final-remarks.md):** Tie everything together with production best practices

Each guide includes:
- Working code examples you can copy and run
- Common pitfalls and how to avoid them
- Performance tips and best practices
- Real-world usage patterns

!!! tip "Follow the Order"
    These guides build on each other. Even if you're experienced, we recommend reading them in order to understand how the concepts connect.

## Getting Help

As you work through these guides:

- All code examples are tested and should work immediately
- If something seems wrong or confusing, it might be - look for red warning boxes
- Each guide focuses on practical usage, not exhaustive API coverage
- For complete API details, see the [API Reference](../api/overview.md)

Ready to start building? Let's begin with the [Basics](basics.md)!