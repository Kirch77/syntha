# SQLite Setup

Guide for configuring Syntha with SQLite database backend.

## Overview

SQLite is the default persistence backend for Syntha, providing:
- Zero configuration setup
- Embedded database
- ACID compliance
- Cross-platform compatibility

## Basic Configuration

```python
from syntha import ContextMesh

# Default SQLite setup (automatic)
mesh = ContextMesh(user_id="sqlite_user")

# Custom SQLite database file
mesh = ContextMesh(
    user_id="sqlite_user",
    db_backend="sqlite",
    db_path="custom_path/syntha.db"
)

# In-memory SQLite (for testing)
mesh = ContextMesh(
    user_id="test_user",
    db_backend="sqlite",
    db_path= ":memory:"
)
```

## Advanced Configuration

```python
# SQLite with custom settings
mesh = ContextMesh(
    user_id="advanced_user",
    db_backend="sqlite",
    db_path="syntha.db"
)
```

## See Also

- [PostgreSQL Setup](postgresql.md)
- [Persistence Concepts](../../user-guide/concepts/persistence.md)
