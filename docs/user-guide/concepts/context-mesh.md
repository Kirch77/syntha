# Context Mesh

The Context Mesh is Syntha's shared knowledge space where agents store, discover, and retrieve information.

## Basic Usage

```python
from syntha import ContextMesh

# Create a context mesh for a specific user
context = ContextMesh(user_id="user123")
```

## Core Operations

### Pushing Context

```python
# Global context (accessible by all agents)
context.push("project_name", "AI Customer Service")

# Agent-specific context
context.push(
    "api_credentials", 
    {"endpoint": "https://api.example.com"},
    subscribers=["BackendAgent", "APIAgent"]
)

# Topic-based context
context.push(
    "customer_feedback", 
    {"rating": 4.5, "comments": "Great service!"},
    topics=["sales", "support"]
)
```

### Retrieving Context

```python
# Get specific context item
project_name = context.get("project_name", "SalesAgent")

# Get all accessible context for an agent
all_context = context.get_all_for_agent("SalesAgent")
```

## Context Routing

### Global Context
Available to all agents.

```python
context.push("company_policy", policy_data)
```

### Subscriber-Based Routing
Direct agent targeting.

```python
context.push(
    "sensitive_data", 
    confidential_info,
    subscribers=["ManagerAgent", "AdminAgent"]
)
```

### Topic-Based Routing
Agents can receive context based on topics.

```python
context.push("customer_issue", issue_data, topics=["support"])
```

## Configuration

```python
# SQLite (default)
context = ContextMesh(user_id="user123")

# PostgreSQL
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    connection_string="postgresql://user:pass@localhost:5432/syntha_db"
)
```

## See Also

- [Tools & Tool Handler](tools.md)
- [User Isolation](user-isolation.md)
- [Basic Usage Example](../../examples/context-mesh/basic-usage.md)