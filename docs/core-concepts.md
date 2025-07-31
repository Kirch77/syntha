# Core Concepts

Understanding Syntha's architecture and design principles will help you build more effective multi-agent systems.

## The Context Mesh

At the heart of Syntha is the **Context Mesh** - a shared knowledge space where agents can store and retrieve information. Think of it as a smart database that understands agent relationships and access patterns.

### Design Philosophy

Syntha was built around three core principles:

1. **Shared Intelligence**: Agents should learn from each other's work
2. **Secure Isolation**: Different users must have completely separate contexts  
3. **Simple Integration**: Adding context sharing shouldn't require architectural changes

### Key Components

```mermaid
graph TB
    A[Agent 1] --> CM[Context Mesh]
    B[Agent 2] --> CM
    C[Agent 3] --> CM
    CM --> D[Persistent Storage]
    CM --> E[Topic Router]
    CM --> F[Access Control]
```

## Context Routing Strategies

Syntha provides three ways to route context between agents:

### 1. Global Context (Default)
Context accessible by all agents in the system.

```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")
# Available to all agents
context.push("api_status", "healthy")
```

**Best for**: System configuration, shared resources, public announcements

### 2. Subscriber-Based Routing
Context targeted to specific named agents.

```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")
# Only accessible by "Agent1" and "Agent2"  
context.push("private_data", {"key": "value"}, subscribers=["Agent1", "Agent2"])
```

**Best for**: Private communication, specific coordination, sensitive data

### 3. Topic-Based Routing (Recommended)
Context broadcast to agents subscribed to specific topics.

```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")
# Available to agents subscribed to "sales" or "analytics" topics
context.push("revenue_data", {"q4": 150000}, topics=["sales", "analytics"])
```

**Best for**: Agent workflows, domain-specific broadcasts, scalable coordination

## User Isolation

One of Syntha's most important features is complete user isolation. Each user gets their own context space that's invisible to other users.

```python
from syntha import ContextMesh

# User A's context
context_a = ContextMesh(user_id="user_a")
context_a.push("secret", "user_a_data")

# User B's context  
context_b = ContextMesh(user_id="user_b")
context_b.push("secret", "user_b_data")

# These are completely separate - no cross-contamination
```

### Why User Isolation Matters

- **Security**: Prevents accidental data leaks between users
- **Privacy**: Each user's conversations remain private
- **Scalability**: Clean separation enables horizontal scaling
- **Compliance**: Meets data protection requirements

!!! danger "Critical Security Note"
    Always specify a `user_id` when creating a ContextMesh in production. Without it, all users share the same context space, creating serious security and privacy risks.

## Context Lifecycle

### Time-to-Live (TTL)
Context items can automatically expire after a specified duration:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")
# Expires after 1 hour (3600 seconds)
context.push("temporary_token", "abc123", ttl=3600)
```

### Persistence
Context automatically persists to a database backend:

```python
# SQLite (default)
context = ContextMesh(enable_persistence=True)

# PostgreSQL - Connection String
context = ContextMesh(
    enable_persistence=True,
    db_backend="postgresql",
    connection_string="postgresql://username:password@localhost:5432/syntha_db"
)

# PostgreSQL - Individual Parameters  
context = ContextMesh(
    enable_persistence=True,
    db_backend="postgresql",
    host="localhost",
    database="syntha_db", 
    user="username",
    password="password"
)
```

### Cleanup
Expired items are automatically cleaned up to prevent memory bloat:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")
# Manual cleanup
context.cleanup_expired()

# Automatic cleanup (default: every 5 minutes)
context = ContextMesh(user_id="user123", auto_cleanup=True)
```

## Agent Integration Patterns

### Tool-Based Integration
Agents use function calls to interact with context:

```python
from syntha import ToolHandler

handler = ToolHandler(context, agent_name="SalesAgent")

# Agent can call these tools:
# - get_context: Retrieve context
# - push_context: Share context  
# - list_context: Discover available context
# - subscribe_to_topics: Subscribe to topics
# - discover_topics: Find available topics
```

### Prompt-Based Integration  
Context is injected directly into agent prompts:

```python
from syntha import build_system_prompt

# Context automatically included in system prompt
system_prompt = build_system_prompt("SalesAgent", context)
```

## Performance Considerations

### Indexing
Syntha maintains indexes for fast context lookups:

```python
from syntha import ContextMesh

# Enable indexing for better performance (default)
context = ContextMesh(user_id="user123", enable_indexing=True)
```

### Database Backends
Choose the right backend for your scale:

- **SQLite**: Perfect for development, single-node deployments
- **PostgreSQL**: Production-ready, supports clustering and replication

### Memory Management
Control memory usage with cleanup settings:

```python
from syntha import ContextMesh

context = ContextMesh(
    user_id="user123",
    auto_cleanup=True,        # Automatic cleanup
    cleanup_interval=300      # Every 5 minutes
)
```

## Development Methodology

Syntha was developed using several key methodologies:

### Test-Driven Development
- 168+ comprehensive tests covering all functionality
- Integration tests with real database backends
- Performance benchmarks and security tests

### Framework Agnostic Design
- Works with any LLM provider (OpenAI, Anthropic, etc.)
- No vendor lock-in or framework dependencies
- Clean separation between context logic and AI integration

### Production-First Approach
- Comprehensive error handling with recovery suggestions
- Structured logging for observability
- Security framework with access controls
- Performance monitoring capabilities

---

Next: Learn how to [install Syntha](installation.md) or jump to the [practical guides](guides/overview.md).