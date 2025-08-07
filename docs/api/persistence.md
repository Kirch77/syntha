# Persistence API Reference

The Persistence API provides database backends for storing context data permanently. Syntha supports multiple database backends with a pluggable architecture that makes it easy to switch between different storage systems.

## Overview

Syntha's persistence layer automatically handles:

- Context item storage and retrieval
- Topic subscription management
- Agent permission tracking
- User isolation at the database level
- Automatic schema creation and migration


!!! info "Recommendation"
    It is not recommended to use database backends directly as it is safer and more practical to handle context through the context mesh.

## Database Backends

### create_database_backend()

Factory function to create database backend instances.

```python
def create_database_backend(backend_type: str = "sqlite", **config) -> DatabaseBackend
```

#### Parameters

- **backend_type** (str): Type of database backend ("sqlite" or "postgresql")
- **config**: Database-specific configuration parameters

#### Returns

Database backend instance implementing the `DatabaseBackend` interface.

#### Examples

**SQLite Backend:**
```python
from syntha import create_database_backend

# In-memory SQLite (for testing)
backend = create_database_backend("sqlite", db_path=":memory:")

# File-based SQLite (for development)
backend = create_database_backend("sqlite", db_path="syntha.db")

# SQLite with custom settings
backend = create_database_backend(
    "sqlite",
    db_path="production.db",
    timeout=30,
    check_same_thread=False
)
```

**PostgreSQL Backend:**
```python
# Basic PostgreSQL connection
backend = create_database_backend(
    "postgresql",
    host="localhost",
    port=5432,
    database="syntha",
    user="syntha_user",
    password="secure_password"
)

# PostgreSQL with SSL configuration
backend = create_database_backend(
    "postgresql",
    host="db.company.com",
    database="syntha_prod",
    user="syntha_app",
    password="prod_password",
    sslmode="prefer"
)

# PostgreSQL with SSL
backend = create_database_backend(
    "postgresql",
    host="secure-db.company.com",
    database="syntha",
    user="syntha_user",
    password="password",
    sslmode="require",
    sslcert="/path/to/client-cert.pem",
    sslkey="/path/to/client-key.pem",
    sslrootcert="/path/to/ca-cert.pem"
)
```

## DatabaseBackend Interface

The `DatabaseBackend` abstract base class defines the interface that all database backends must implement.

### Core Methods

#### connect()

Establish connection to the database and initialize schema.

```python
def connect(self) -> None
```

**Example:**
```python
backend = create_database_backend("postgresql", host="localhost", database="syntha")
backend.connect()  # Creates tables if they don't exist
```

#### close()

Close database connection and cleanup resources.

```python
def close(self) -> None
```

#### save_context_item()

Store a context item in the database.

```python
def save_context_item(
    self,
    key: str,
    value: Any,
    subscribers: List[str],
    ttl: Optional[float],
    created_at: float,
) -> None
```

#### get_context_item()

Retrieve a context item from the database.

```python
def get_context_item(
    self, key: str
) -> Optional[Tuple[Any, List[str], Optional[float], float]]
```

**Returns:** Tuple of (value, subscribers, ttl, created_at) or None if not found.

#### delete_context_item()

Delete a context item from the database.

```python
def delete_context_item(self, key: str) -> bool
```

**Returns:** True if item was deleted, False if it didn't exist.

#### get_all_context_items()

Get all context items from the database.

```python
def get_all_context_items(
    self,
) -> Dict[str, Tuple[Any, List[str], Optional[float], float]]
```

**Returns:** Dictionary mapping keys to (value, subscribers, ttl, created_at) tuples.

#### cleanup_expired()

Remove expired items from the database.

```python
def cleanup_expired(self, current_time: float) -> int
```

**Returns:** Number of items removed.

#### clear_all()

Remove all context items from the database.

```python
def clear_all(self) -> None
```

### Topic Management Methods

#### save_agent_topics()

Save agent topic subscriptions.

```python
def save_agent_topics(self, agent_name: str, topics: List[str]) -> None
```

#### get_agent_topics()

Get agent topic subscriptions.

```python
def get_agent_topics(self, agent_name: str) -> List[str]
```

#### get_all_agent_topics()

Get all agent topic mappings.

```python
def get_all_agent_topics(self) -> Dict[str, List[str]]
```

#### remove_agent_topics()

Remove agent topic subscriptions.

```python
def remove_agent_topics(self, agent_name: str) -> None
```

### Permission Management Methods

#### save_agent_permissions()

Save agent posting permissions.

```python
def save_agent_permissions(self, agent_name: str, allowed_topics: List[str]) -> None
```

#### get_agent_permissions()

Get agent posting permissions.

```python
def get_agent_permissions(self, agent_name: str) -> List[str]
```

#### get_all_agent_permissions()

Get all agent permission mappings.

```python
def get_all_agent_permissions(self) -> Dict[str, List[str]]
```

## User Isolation Methods

For user-isolated deployments, additional methods provide user-scoped operations:

### Context Item Methods (User-Scoped)

```python
def save_context_item_for_user(
    self,
    user_id: str,
    key: str,
    value: Any,
    subscribers: List[str],
    ttl: Optional[float],
    created_at: float,
) -> None

def get_context_item_for_user(
    self, user_id: str, key: str
) -> Optional[Tuple[Any, List[str], Optional[float], float]]

def get_all_context_items_for_user(
    self, user_id: str
) -> Dict[str, Tuple[Any, List[str], Optional[float], float]]

def clear_all_for_user(self, user_id: str) -> None
```

### Topic Methods (User-Scoped)

```python
def save_agent_topics_for_user(
    self, user_id: str, agent_name: str, topics: List[str]
) -> None

def get_agent_topics_for_user(self, user_id: str, agent_name: str) -> List[str]

def get_all_agent_topics_for_user(self, user_id: str) -> Dict[str, List[str]]

def remove_agent_topics_for_user(self, user_id: str, agent_name: str) -> None
```

### Permission Methods (User-Scoped)

```python
def save_agent_permissions_for_user(
    self, user_id: str, agent_name: str, allowed_topics: List[str]
) -> None

def get_agent_permissions_for_user(
    self, user_id: str, agent_name: str
) -> List[str]

def get_all_agent_permissions_for_user(
    self, user_id: str
) -> Dict[str, List[str]]
```

## SQLiteBackend

SQLite implementation of the DatabaseBackend interface.

### Configuration Options

```python
backend = create_database_backend(
    "sqlite",
    db_path="syntha.db",           # Database file path (":memory:" for in-memory)
)
```

**Note**: SQLite backend uses optimized settings internally including:
- 30-second connection timeout
- Thread-safe connections (`check_same_thread=False`)
- Optimized PRAGMA settings for performance and concurrency

### Example Usage

```python
from syntha import create_database_backend

# Create SQLite backend
backend = create_database_backend("sqlite", db_path="example.db")
backend.connect()

# Store context item
backend.save_context_item(
    key="user_preferences",
    value={"theme": "dark", "language": "en"},
    subscribers=["ChatAgent"],
    ttl=None,
    created_at=time.time()
)

# Retrieve context item
result = backend.get_context_item("user_preferences")
if result:
    value, subscribers, ttl, created_at = result
    print(f"Retrieved: {value}")

# Clean up
backend.close()
```

## PostgreSQLBackend

PostgreSQL implementation with advanced features like connection pooling.

### Configuration Options

```python
backend = create_database_backend(
    "postgresql",
    # Connection parameters
    host="localhost",
    port=5432,
    database="syntha",
    user="syntha_user",
    password="password",
    
    # SSL configuration (optional)
    sslmode="prefer",              # SSL mode (disable, allow, prefer, require)
    sslcert="/path/to/cert.pem",   # Client certificate
    sslkey="/path/to/key.pem",     # Client key
    sslrootcert="/path/to/ca.pem", # CA certificate
)
```

**Alternative**: Provide a complete connection string via `connection_string`:

```python
backend = create_database_backend(
    "postgresql",
    connection_string="postgresql://user:password@host:port/database?sslmode=require"
)
```

### Example Usage

```python
from syntha import create_database_backend
import os

# Production PostgreSQL setup
backend = create_database_backend(
    "postgresql",
    host=os.getenv("DB_HOST", "localhost"),
    database=os.getenv("DB_NAME", "syntha"),
    user=os.getenv("DB_USER", "syntha"),
    password=os.getenv("DB_PASSWORD"),
    sslmode="require"
)

try:
    backend.connect()
    
    # Store user-isolated context
    backend.save_context_item_for_user(
        user_id="user_123",
        key="session_data",
        value={"logged_in": True, "role": "admin"},
        subscribers=[],
        ttl=3600,  # 1 hour
        created_at=time.time()
    )
    
    # Retrieve user-specific context
    result = backend.get_all_context_items_for_user("user_123")
    print(f"User context: {result}")
    
finally:
    backend.close()
```

## Integration with ContextMesh

The ContextMesh automatically uses the persistence backend when enabled:

```python
from syntha import ContextMesh

# ContextMesh with SQLite persistence
context = ContextMesh(
    user_id="user123",
    enable_persistence=True,
    db_backend="sqlite",
    db_path="context.db"
)

# ContextMesh with PostgreSQL persistence
context = ContextMesh(
    user_id="user123", 
    enable_persistence=True,
    db_backend="postgresql",
    connection_string="postgresql://syntha_user:password@localhost:5432/syntha"
)

# All context operations are automatically persisted
context.push("data", "value")
context.register_agent_topics("Agent1", ["topic1", "topic2"])

# Data survives across restarts
context.close()

# Reopen - data is still there
context = ContextMesh(
    user_id="user123",
    enable_persistence=True, 
    db_backend="sqlite",
    db_path="context.db"
)

data = context.get("data", "agent")  # Returns "value"
```

## Error Handling

Database operations can raise various exceptions:

```python
from syntha import create_database_backend, SynthaConnectionError, SynthaPersistenceError

try:
    backend = create_database_backend(
        "postgresql",
        host="nonexistent-host",
        database="syntha"
    )
    backend.connect()
    
except SynthaConnectionError as e:
    print(f"Connection failed: {e}")
    print(f"Suggestion: {e.suggestion}")
    
except SynthaPersistenceError as e:
    print(f"Persistence error: {e}")
    print(f"Suggestion: {e.suggestion}")
```

## Performance Considerations

### Connection Management

The PostgreSQL backend uses direct connections via psycopg2. For production deployments requiring connection pooling, consider using external connection pooling solutions like PgBouncer or implementing a custom backend with SQLAlchemy.

```python
# Production setup with SSL
backend = create_database_backend(
    "postgresql",
    host="db.company.com",
    database="syntha_prod", 
    user="syntha_app",
    password="prod_password",
    sslmode="require"
)
```

### Indexing

Both SQLite and PostgreSQL backends automatically create indexes on:
- Context item keys
- User IDs (for user isolation)
- Agent names
- Topic names
- Created timestamps (for TTL cleanup)

### Cleanup Performance

For large datasets, consider running cleanup operations during off-peak hours:

```python
# Manual cleanup with monitoring
start_time = time.time()
items_removed = backend.cleanup_expired(time.time())
duration = time.time() - start_time

print(f"Cleaned up {items_removed} items in {duration:.2f} seconds")
```

## Migration and Backup

### Schema Migration

Syntha automatically handles schema creation and updates:

```python
# Schema is created/updated automatically on connect()
backend = create_database_backend("postgresql", **config)
backend.connect()  # Creates tables if needed, updates schema if required
```

### Data Export/Import

```python
# Export all data
all_context = backend.get_all_context_items()
all_topics = backend.get_all_agent_topics()
all_permissions = backend.get_all_agent_permissions()

# Save to file
import json
export_data = {
    "context": all_context,
    "topics": all_topics, 
    "permissions": all_permissions
}

with open("syntha_backup.json", "w") as f:
    json.dump(export_data, f)

# Import data (implementation depends on your needs)
with open("syntha_backup.json", "r") as f:
    import_data = json.load(f)
    
# Restore context items
for key, (value, subscribers, ttl, created_at) in import_data["context"].items():
    backend.save_context_item(key, value, subscribers, ttl, created_at)
```

---

**Next**: Learn about [Tool Handler API](tool-handler.md) for complete function call reference