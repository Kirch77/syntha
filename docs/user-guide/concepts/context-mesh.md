# Context Mesh

The Context Mesh is the heart of Syntha - a shared knowledge space where agents can store, discover, and retrieve relevant information automatically.

## What is a Context Mesh?

Think of the Context Mesh as a smart, persistent memory that sits between your agents and provides intelligent context sharing. Instead of manually passing data between agents, they interact with this shared space.

```python
from syntha import ContextMesh

# Create a context mesh for a specific user
context = ContextMesh(user_id="user123")
```

## Core Operations

### Pushing Context

Agents add information to the mesh:

```python
# Global context (accessible by all agents)
context.push("project_name", "AI Customer Service")
context.push("deadline", "2025-03-15")

# Agent-specific context
context.push(
    "api_credentials", 
    {"endpoint": "https://api.example.com", "version": "v2"},
    subscribers=["BackendAgent", "APIAgent"]
)

# Topic-based context
context.push(
    "customer_feedback", 
    {"rating": 4.5, "comments": "Great service!"},
    topics=["sales", "product", "support"]
)
```

### Retrieving Context

Agents get relevant information:

```python
# Get specific context item
project_name = context.get("project_name", "SalesAgent")

# Get all accessible context for an agent
all_context = context.get_all_for_agent("SalesAgent")

# Get context by topics
sales_context = context.get_by_topics(["sales"], "SalesAgent")
```

## Context Routing

The Context Mesh intelligently routes information based on three mechanisms:

### 1. Global Context
Available to all agents in the user's context space.

```python
context.push("company_policy", policy_data)
# All agents can access this
```

### 2. Subscriber-Based Routing
Direct agent targeting for private or specific information.

```python
context.push(
    "sensitive_data", 
    confidential_info,
    subscribers=["ManagerAgent", "AdminAgent"]
)
# Only specified agents can access this
```

### 3. Topic-Based Routing
Agents subscribe to topics they're interested in.

```python
# Agents subscribe to topics
context.subscribe_to_topics("SalesAgent", ["sales", "customers"])
context.subscribe_to_topics("SupportAgent", ["support", "customers"])

# Push to topics
context.push("customer_issue", issue_data, topics=["support", "customers"])
# Both SalesAgent and SupportAgent will receive this
```

## Advanced Features

### Topic Discovery

Find what topics are available and who's subscribed:

```python
topics = context.discover_topics()
# Returns: {"sales": ["SalesAgent"], "support": ["SupportAgent"]}
```

### Context Filtering

Get context based on specific criteria:

```python
# Get context by multiple topics
multi_topic_context = context.get_by_topics(
    ["sales", "marketing"], 
    "AnalystAgent"
)

# Get context with specific keys
specific_context = context.get_multiple(
    ["project_name", "deadline"], 
    "ProjectAgent"
)
```

### Time-To-Live (TTL)

Set expiration times for context:

```python
# Context expires after 1 hour (3600 seconds)
context.push(
    "session_token", 
    token_data, 
    ttl=3600
)
```

## Context Item Structure

Each context item contains:

- **Value**: The actual data
- **Subscribers**: List of agents who can access it
- **Topics**: Associated topics for routing
- **Created At**: Timestamp when created
- **TTL**: Optional expiration time

## Best Practices

### 1. Use Descriptive Keys

```python
# Good
context.push("customer_satisfaction_q4_2024", survey_data)

# Avoid
context.push("data", survey_data)
```

### 2. Leverage Topic Routing

```python
# Organize by functional areas
context.subscribe_to_topics("SalesAgent", ["sales", "revenue", "customers"])
context.subscribe_to_topics("SupportAgent", ["support", "customers", "issues"])
context.subscribe_to_topics("ProductAgent", ["product", "features", "roadmap"])
```

### 3. Use Appropriate Access Control

```python
# Public information - use global context
context.push("company_news", news_data)

# Team information - use topics
context.push("team_metrics", metrics, topics=["management"])

# Private information - use subscribers
context.push("performance_review", review, subscribers=["ManagerAgent"])
```

### 4. Structure Your Data

```python
# Well-structured context
context.push("customer_profile", {
    "id": "CUST-123",
    "name": "Acme Corp",
    "tier": "Enterprise",
    "contact": {
        "name": "John Smith",
        "email": "john@acme.com"
    },
    "preferences": {
        "communication": "email",
        "support_level": "premium"
    }
})
```

### 5. Use TTL for Temporary Data

```python
# Session data expires after 24 hours
context.push("user_session", session_data, ttl=86400)

# Temporary cache expires after 1 hour
context.push("api_cache", cache_data, ttl=3600)
```

## Configuration Options

### Basic Configuration

```python
context = ContextMesh(
    user_id="user123",
    enable_persistence=True,  # Store in database
    auto_cleanup=True,        # Remove expired items
    enable_indexing=True      # Optimize lookups
)
```

### Database Backend

```python
# SQLite (default)
context = ContextMesh(
    user_id="user123",
    db_backend="sqlite",
    db_path="my_app.db"
)

# PostgreSQL
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    database_url="postgresql://user:pass@localhost:5432/syntha_db"
)
```

## Performance Considerations

### Indexing

Enable indexing for faster lookups:

```python
context = ContextMesh(
    user_id="user123",
    enable_indexing=True  # Builds indexes for faster queries
)
```

### Cleanup

Enable automatic cleanup of expired items:

```python
context = ContextMesh(
    user_id="user123",
    auto_cleanup=True  # Removes expired TTL items automatically
)
```

### Batch Operations

For high-volume scenarios, consider batching:

```python
# Instead of multiple individual pushes
for item in large_dataset:
    context.push(f"item_{item.id}", item)

# Consider structuring as a single push
context.push("dataset", large_dataset)
```

## Error Handling

The Context Mesh handles common error scenarios:

```python
# Non-existent keys return None
missing_data = context.get("non_existent_key", "Agent")
if missing_data is None:
    print("Key not found or not accessible")

# Expired items are automatically filtered out
expired_data = context.get("expired_key", "Agent")  # Returns None if expired
```

## Next Steps

- **[Tools & Tool Handler](tools.md)** - Learn how agents interact with the Context Mesh
- **[User Isolation](user-isolation.md)** - Understand how users are separated
- **[Examples](../../examples/context-mesh/basic-usage.md)** - See working code examples