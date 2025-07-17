# User Isolation in Syntha

## Overview

Syntha now supports **user isolation** to ensure complete separation between different users in multi-user applications. This feature prevents users from accessing each other's context data, topics, and agent interactions.

## Problem Solved

Without user isolation, agents from different users could potentially access each other's data if they subscribed to the same topics. This created serious privacy and security concerns for multi-user applications.

### Before (without user isolation):
- **User 1** has `sales_agent` subscribed to `"sales"` topic
- **User 2** has `sales_agent` subscribed to `"sales"` topic  
- ❌ **Both agents could see each other's sales data**

### After (with user isolation):
- **User 1** has `sales_agent` subscribed to `"sales"` topic in **User 1's context**
- **User 2** has `sales_agent` subscribed to `"sales"` topic in **User 2's context**
- ✅ **Each agent only sees their own user's sales data**

## How It Works

### 1. User-Scoped Context

Each `ContextMesh` instance can now be associated with a specific user:

```python
# User 1's context mesh
user1_mesh = ContextMesh(
    user_id="user_alice_123",
    db_path="app_database.db",
    enable_persistence=True
)

# User 2's context mesh  
user2_mesh = ContextMesh(
    user_id="user_bob_456", 
    db_path="app_database.db",  # Same database, but isolated
    enable_persistence=True
)
```

### 2. Complete Isolation

- **Context Data**: Users can only access their own context items
- **Topics**: Topic namespaces are isolated per user
- **Agent Subscriptions**: Agents only see topics within their user's scope
- **Database Storage**: All data is stored with user isolation in the database

### 3. Backward Compatibility

The feature is fully backward compatible:

```python
# Still works exactly as before
mesh = ContextMesh(db_path="legacy_database.db")
```

## Usage Examples

### Basic Multi-User Setup

```python
import json
from syntha.context import ContextMesh
from syntha.tools import ToolHandler

# Create user-specific contexts
def create_user_context(user_id: str) -> ContextMesh:
    return ContextMesh(
        user_id=user_id,
        db_path="multi_user_app.db",
        enable_persistence=True
    )

# Create agents for each user
def create_user_agent(user_id: str, agent_name: str) -> ToolHandler:
    mesh = create_user_context(user_id)
    return ToolHandler(mesh, agent_name=agent_name)

# User 1 setup
alice_agent = create_user_agent("user_alice_123", "alice_assistant")
alice_agent.handle_tool_call("subscribe_to_topics", topics=["personal", "work"])

# User 2 setup  
bob_agent = create_user_agent("user_bob_456", "bob_assistant")
bob_agent.handle_tool_call("subscribe_to_topics", topics=["personal", "work"])

# Users can use same topic names without interference
alice_agent.handle_tool_call(
    "push_context",
    key="personal_notes",
    value=json.dumps({"secret": "Alice's private data"}),
    topics=["personal"]
)

bob_agent.handle_tool_call(
    "push_context", 
    key="personal_notes",
    value=json.dumps({"secret": "Bob's private data"}),
    topics=["personal"]
)

# Each user only sees their own data
alice_data = alice_agent.handle_tool_call("get_context", keys=["personal_notes"])
bob_data = bob_agent.handle_tool_call("get_context", keys=["personal_notes"])

print(alice_data["context"]["personal_notes"])  # Alice's private data
print(bob_data["context"]["personal_notes"])    # Bob's private data
```

### Web Application Integration

```python
# Flask/Django example
from flask import Flask, session
from syntha.context import ContextMesh
from syntha.tools import ToolHandler

app = Flask(__name__)

def get_user_context():
    """Get user-specific context mesh."""
    user_id = session.get('user_id')
    if not user_id:
        raise ValueError("User not authenticated")
    
    return ContextMesh(
        user_id=user_id,
        db_path="app_database.db",
        enable_persistence=True
    )

@app.route('/api/agent/message', methods=['POST'])
def handle_agent_message():
    """Handle agent message with user isolation."""
    user_mesh = get_user_context()
    agent_handler = ToolHandler(user_mesh, agent_name="user_assistant")
    
    # Process agent request - automatically isolated to this user
    result = agent_handler.handle_tool_call("get_context", keys=["conversation_history"])
    
    return {"response": result}
```

## Database Schema

The user isolation feature extends the database schema to include user scoping:

### SQLite Schema (Updated)

```sql
-- Context items with user isolation
CREATE TABLE context_items (
    key TEXT NOT NULL,
    user_id TEXT,
    value TEXT NOT NULL,
    subscribers TEXT NOT NULL,
    ttl REAL,
    created_at REAL NOT NULL,
    PRIMARY KEY (key, user_id)
);

-- Agent topics with user isolation
CREATE TABLE agent_topics (
    agent_name TEXT NOT NULL,
    user_id TEXT,
    topics TEXT NOT NULL,
    PRIMARY KEY (agent_name, user_id)
);

-- Agent permissions with user isolation
CREATE TABLE agent_permissions (
    agent_name TEXT NOT NULL,
    user_id TEXT,
    allowed_topics TEXT NOT NULL,
    PRIMARY KEY (agent_name, user_id)
);
```

### Migration

Existing databases are automatically migrated to support user isolation:
- Legacy data (without `user_id`) continues to work
- New data with `user_id` is properly isolated
- No data loss during migration

## Security Best Practices

### 1. User ID Management
```python
# ✅ Good: Use secure, unique user IDs
user_id = f"user_{uuid.uuid4()}"

# ❌ Bad: Predictable or exposing user IDs
user_id = "user_1"  # Too predictable
user_id = user_email  # Exposes PII
```

### 2. Input Validation
```python
def validate_user_id(user_id: str) -> str:
    """Validate and sanitize user ID."""
    if not user_id or len(user_id) < 10:
        raise ValueError("Invalid user ID")
    
    # Remove any potential injection characters
    return re.sub(r'[^\w\-]', '', user_id)
```

### 3. Session Management
```python
# Always validate user sessions
def get_authenticated_user_id() -> str:
    """Get authenticated user ID from session."""
    user_id = session.get('user_id')
    if not user_id or not is_valid_session(user_id):
        raise AuthenticationError("Invalid session")
    return user_id
```

### 4. Rate Limiting
```python
# Implement per-user rate limiting
@rate_limit(key=lambda: f"user_{get_authenticated_user_id()}", 
           rate="100/hour")
def create_user_agent():
    pass
```

## Performance Considerations

### 1. Database Indexing
- User-scoped queries use composite indexes on `(user_id, key)` and `(user_id, agent_name)`
- Performance scales well with number of users
- Each user's data is efficiently isolated

### 2. Memory Usage
- Each user should have their own `ContextMesh` instance
- Consider connection pooling for high-concurrency applications
- Implement cleanup for inactive user sessions

### 3. Monitoring
```python
# Monitor per-user resource usage
def get_user_stats(user_id: str) -> dict:
    """Get resource usage stats for a user."""
    mesh = ContextMesh(user_id=user_id)
    return mesh.get_stats()
```

## Migration Guide

### From Single-User to Multi-User

1. **Update ContextMesh initialization**:
```python
# Before
mesh = ContextMesh(db_path="app.db")

# After  
mesh = ContextMesh(user_id=get_user_id(), db_path="app.db")
```

2. **Update application architecture**:
```python
# Before: Global context mesh
global_mesh = ContextMesh()

# After: User-specific context mesh
def get_user_mesh(user_id: str) -> ContextMesh:
    return ContextMesh(user_id=user_id)
```

3. **Test isolation**:
```python
# Add tests to verify user isolation
def test_user_isolation():
    user1_mesh = ContextMesh(user_id="user1")
    user2_mesh = ContextMesh(user_id="user2")
    
    # Verify users can't access each other's data
    assert user1_data != user2_data
```

## API Reference

### ContextMesh Constructor

```python
ContextMesh(
    user_id: Optional[str] = None,  # NEW: User ID for isolation
    enable_indexing: bool = True,
    auto_cleanup: bool = True,
    enable_persistence: bool = True,
    db_backend: str = "sqlite",
    **db_config
)
```

### New Parameters

- `user_id`: Optional user identifier for isolation
  - If provided, all operations are scoped to this user
  - If `None`, works in legacy mode (no isolation)
  - Must be a non-empty string for user isolation

## Testing

Run the user isolation tests:

```bash
# Test user isolation functionality
python -m pytest tests/test_user_isolation.py -v

# Run the example
python examples/multi_user_isolation.py
```

## Troubleshooting

### Common Issues

1. **Users can see each other's data**
   - Ensure each user has a unique `user_id`
   - Verify `user_id` is passed to `ContextMesh` constructor

2. **Database migration issues**
   - Check that database schema was updated correctly
   - Verify write permissions on database file

3. **Performance degradation**
   - Ensure proper indexing on user-scoped tables
   - Consider connection pooling for high-concurrency apps

### Debug Mode

```python
# Enable debug logging to trace user operations
import logging
logging.basicConfig(level=logging.DEBUG)

mesh = ContextMesh(user_id="debug_user", db_path="debug.db")
```

## Conclusion

User isolation in Syntha provides enterprise-grade multi-user support while maintaining backward compatibility. The feature ensures complete data separation between users while preserving the familiar Syntha API.

For questions or issues, please refer to the test suite in `tests/test_user_isolation.py` or the example in `examples/multi_user_isolation.py`. 