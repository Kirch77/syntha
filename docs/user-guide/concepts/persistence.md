# Persistence

Syntha's persistence layer provides reliable, scalable storage for context data across different database backends. The system supports both embedded and distributed database solutions with automatic schema management and data migration.

## Overview

The persistence system handles:
- Context data storage and retrieval
- Database schema management
- Data migration and versioning
- Multi-user data isolation
- Performance optimization

## Supported Backends

### SQLite (Default)
- Embedded database
- Zero configuration
- Perfect for development and small deployments
- ACID compliance
- Cross-platform compatibility

### PostgreSQL
- Production-ready distributed database
- Advanced querying capabilities
- Horizontal scaling support
- Full ACID compliance
- Rich data types and indexing

## Key Features

- **Automatic Schema Management**: Database tables created automatically
- **Data Migration**: Seamless upgrades between schema versions
- **User Isolation**: Complete data separation between users
- **Performance Optimization**: Intelligent indexing and query optimization
- **Backup and Recovery**: Built-in data protection mechanisms

## Configuration

### SQLite Setup
```python
from syntha import ContextMesh

# SQLite (default - no configuration needed)
mesh = ContextMesh(user_id="user123")
```

### PostgreSQL Setup
```python
from syntha import ContextMesh

# PostgreSQL configuration
mesh = ContextMesh(
    user_id="user123",
    connection_string="postgresql://user:password@localhost:5432/syntha"
)
```

## Data Models

The persistence layer automatically manages these core data structures:
- **Context Entries**: Individual pieces of context data
- **Topics**: Organization and routing of context
- **User Metadata**: User-specific configuration and preferences
- **Schema Versions**: Migration tracking and compatibility

## Performance Considerations

- **Indexing**: Automatic indexes on frequently queried fields
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Optimized queries for common operations
- **Caching**: Smart caching of frequently accessed data

## See Also

- [SQLite Setup Example](../../examples/persistence/sqlite.md)
- [PostgreSQL Setup Example](../../examples/persistence/postgresql.md)
- [Context Mesh Documentation](context-mesh.md)
