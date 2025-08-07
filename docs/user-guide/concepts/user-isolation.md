# User Isolation

User isolation in Syntha ensures complete data separation between different users, providing security, privacy, and multi-tenancy support. Each user operates in their own isolated context space with no cross-contamination of data.

## Overview

User isolation provides:
- Complete data separation between users
- Security and privacy protection
- Multi-tenant application support
- Scalable user management
- Access control and permissions

## Key Features

### Data Separation
- **User-Specific Contexts**: Each user has their own isolated context mesh
- **Topic Isolation**: Topics are scoped to individual users
- **History Separation**: Conversation and interaction history is user-specific
- **Agent Isolation**: Agents operate within user-specific contexts

### Security
- **Access Control**: Users can only access their own data
- **Data Encryption**: Optional encryption for sensitive context data
- **Audit Trails**: Track user actions and data access
- **Permission Management**: Fine-grained control over user capabilities

### Multi-Tenancy
- **Scalable Architecture**: Support for thousands of concurrent users
- **Resource Allocation**: Fair resource distribution across users
- **Performance Isolation**: User activities don't impact others
- **Database Isolation**: Logical or physical database separation

## Implementation

### Basic User Isolation
```python
from syntha import ContextMesh, ToolHandler

# Create isolated context for user
user1_mesh = ContextMesh(user_id="user1")
user1_handler = ToolHandler(user1_mesh, "Assistant")

user2_mesh = ContextMesh(user_id="user2")
user2_handler = ToolHandler(user2_mesh, "Assistant")

# Users operate in completely separate contexts
user1_handler.push_context("preferences", {"theme": "dark"})
user2_handler.push_context("preferences", {"theme": "light"})

# No cross-contamination - each user sees only their data
```

### Advanced Isolation Features
```python
from syntha import ContextMesh
from syntha.isolation import UserManager

# Create user manager for advanced isolation
user_manager = UserManager(
    encryption_enabled=True,
    audit_logging=True,
    resource_limits={
        "max_contexts": 1000,
        "max_agents": 10,
        "storage_limit_mb": 100
    }
)

# Create isolated user session
mesh = user_manager.create_user_session("user123")
```

## Database-Level Isolation

### SQLite Isolation
- Separate database file per user
- Complete physical isolation
- Simple backup and recovery per user

### PostgreSQL Isolation
- Schema-based isolation (default)
- Row-level security policies
- Optional database-per-user setup

## Security Considerations

- **Authentication**: Verify user identity before creating context
- **Authorization**: Check user permissions for operations
- **Data Encryption**: Encrypt sensitive context data at rest
- **Audit Logging**: Track all user operations for compliance

## See Also

- [User Isolation Example](../../examples/context-mesh/user-isolation.md)
- [Context Mesh Documentation](context-mesh.md)
- [Multi-User Setup Guide](../how-to/setup.md)
