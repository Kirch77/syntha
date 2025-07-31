# Getting Started with Syntha

Welcome to Syntha! This guide will take you on a step-by-step journey to master context-based multi-agent systems. By the end, you'll understand how to build secure, scalable agent workflows that share information intelligently.

## What You'll Learn

These guides are designed as **tutorials**, not reference documentation. Each section builds on the previous one with working examples you can copy and run immediately. You'll learn:

1. **Core Concepts** - How context sharing works and why user isolation matters
2. **Basic Patterns** - Simple context sharing between agents  
3. **Advanced Routing** - Topic-based vs subscription-based context routing
4. **Tools & Permissions** - How agents interact with context and access control
5. **Real-World Integration** - Complete examples with OpenAI and other LLMs

## The Big Picture: Why Syntha Exists

Traditional multi-agent systems struggle with:

- **Information Silos**: Agents can't share knowledge effectively
- **Security Risks**: No isolation between different users
- **Complex Coordination**: Manual agent-to-agent communication
- **Inconsistent State**: No single source of truth

Syntha solves these problems with a **Context Mesh** - a shared knowledge layer where:

- Agents push and pull context automatically
- Users are completely isolated from each other
- Information routes intelligently based on topics or direct targeting
- Everything persists across sessions

## User Isolation: The Foundation

**🔐 Critical Security Principle**: Every production deployment MUST use user isolation.

```python
# ✅ CORRECT - Each user gets their own isolated context
user1_context = ContextMesh(user_id="user_123")
user2_context = ContextMesh(user_id="user_456")

# ❌ DANGEROUS - All users share the same context (security risk!)
shared_context = ContextMesh()  # No user_id!
```

**Why this matters:**

- **Privacy**: Users can't see each other's data
- **Security**: Prevents accidental data leaks
- **Compliance**: Meets GDPR, CCPA, and other data protection requirements
- **Scalability**: Clean separation enables better performance

## Two Ways to Route Context

Syntha provides two powerful routing mechanisms:

### Topic-Based Routing (Recommended)
Agents subscribe to topics they care about, and context automatically routes to interested parties.

```python
# Agents declare their interests
context.register_agent_topics("SalesAgent", ["sales", "customers"])
context.register_agent_topics("SupportAgent", ["support", "customers"])

# Push context to topics - all subscribers automatically receive it
context.push("new_customer", customer_data, topics=["customers"])
```

**Best for**: Scalable workflows, agent-to-agent communication, broadcast scenarios

### Subscription-Based Routing (For Private Communication)
Context goes directly to specific named agents.

```python
# Private communication between specific agents
context.push("api_credentials", secret_data, subscribers=["AuthAgent", "AdminAgent"])
```

**Best for**: Sensitive information, private coordination, direct messaging

## Two Ways to Use Context

### 1. Tool-Based Integration (Agents Control Context)
Agents actively manage context through function calls:

```python
handler = ToolHandler(context, "MyAgent")
result = handler.handle_tool_call("subscribe_to_topics", topics=["sales"])
result = handler.handle_tool_call("push_context", key="data", value="info", topics=["sales"])
```

**Advantages:**

- Agents have full control
- Dynamic topic management  
- Works with any LLM supporting function calling
- Scales well with complex workflows

### 2. Prompt-Based Integration (Context Injected Automatically)
Context automatically appears in agent prompts:

```python
system_prompt = build_system_prompt("MyAgent", context)
# Prompt now includes all accessible context
```

**Advantages:**

- Simple integration
- Works with any LLM (even without function calling)
- Transparent to agents
- Good for simple scenarios

## What Each Tool Does

When you give tools to agents, here's what each one is for:

| Tool | **For Users** | **For AI Agents** |
|------|---------------|-------------------|
| `get_context` | Retrieve specific data | Get context they need for current task |
| `list_context` | See what's available | **Discover what context exists** (avoids pulling everything) |
| `push_context` | Share information | Share results/findings with other agents |
| `subscribe_to_topics` | Join conversations | **Subscribe to relevant information streams** |
| `discover_topics` | Find active topics | **Find what topics exist and who's subscribed** |
| `unsubscribe_from_topics` | Leave conversations | Stop receiving updates from topics |
| `delete_topic` | Clean up | Remove entire topics (admin only) |

**Key Insight**: `list_context` is crucial for AI efficiency. It lets agents see what's available without pulling all context (which wastes tokens). They can then selectively use `get_context` for only what they need.

## Persistence: Only Context Mesh Needed

**Simple Rule**: Use Context Mesh persistence instead of separate databases.

```python
# ✅ RECOMMENDED - Context Mesh handles persistence
context = ContextMesh(
    user_id="user123",
    enable_persistence=True,
    db_backend="sqlite",  # or "postgresql" 
    db_path="context.db"
)
```

**Why**: Context Mesh already handles:

- User isolation
- TTL (time-to-live) expiration
- Topic-based routing
- Access control

Adding a separate database creates complexity without benefits.

## Roles and Permissions: When You Need Them

**Simple Answer**: Most applications don't need complex permissions.

**Use roles when**:

- Different agents should have different capabilities
- You want to prevent agents from deleting topics
- You need audit trails of who did what
- You have untrusted or experimental agents
- You want to save tokens/agent complexity (less tools means less bloated)

**Available roles**:

- `readonly`: Can only view context and discover topics
- `contributor`: Can read, write, and manage subscriptions  
- `moderator`: Contributor + can manage others' subscriptions
- `admin`: Full access including destructive operations

```python
# Only give delete permissions to trusted agents
admin_handler = create_role_based_handler(context, "AdminAgent", "admin")
worker_handler = create_role_based_handler(context, "WorkerAgent", "contributor")
```

**Skip permissions if**: All your agents are trusted and you want simplicity.

## What's Next

Ready to start building? Our guides follow this progression:

1. **[Basics](basics.md)** - Get your first context mesh working
2. **[Context Management](context.md)** - Master topic-based and subscription routing  
3. **[Tools & Permissions](tools.md)** - Build sophisticated agent interactions
4. **[Advanced Patterns](advanced.md)** - Combine approaches for complex workflows
5. **[Real-World Examples](examples.md)** - Complete integrations with OpenAI and more

Each guide includes:

- ✅ **Working code** you can copy and run immediately
- 🎯 **Clear explanations** of when and why to use each pattern
- ⚠️ **Common pitfalls** and how to avoid them
- 🏗️ **Complete examples** that tie everything together

Let's start with the [Basics](basics.md)!