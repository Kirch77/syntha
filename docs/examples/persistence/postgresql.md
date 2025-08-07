# PostgreSQL Setup

Guide for configuring Syntha with PostgreSQL database backend for production deployments.

## Overview

PostgreSQL provides:
- Production-ready scalability
- Advanced querying capabilities
- Full ACID compliance
- Rich data types and indexing

## Basic Configuration

```python
from syntha import ContextMesh

# PostgreSQL connection
mesh = ContextMesh(
    user_id="postgres_user",
    connection_string="postgresql://username:password@localhost:5432/syntha"
)

# With connection pool settings
mesh = ContextMesh(
    user_id="postgres_user",
    connection_string="postgresql://username:password@localhost:5432/syntha",
    database_config={
        "pool_size": 10,
        "max_overflow": 20,
        "pool_timeout": 30,
        "pool_recycle": 3600
    }
)
```

## Environment Configuration

```bash
# Set environment variables
export SYNTHA_DB_URL="postgresql://user:pass@localhost:5432/syntha"
export SYNTHA_DB_POOL_SIZE=10
export SYNTHA_DB_MAX_OVERFLOW=20
```

```python
import os
from syntha import ContextMesh

# Use environment variables
mesh = ContextMesh(
    user_id="env_user",
    connection_string=os.getenv("CONNECTION_STRING")
)
```

## See Also

- [SQLite Setup](sqlite.md)
- [Persistence Concepts](../../user-guide/concepts/persistence.md)
