# PostgreSQL Setup

Guide for configuring Syntha with PostgreSQL database backend for production deployments.

## Basic Configuration

```python
from syntha import ContextMesh

mesh = ContextMesh(
    user_id="postgres_user",
    connection_string="postgresql://username:password@localhost:5432/syntha"
)
```

## Environment Configuration

```bash
export CONNECTION_STRING="postgresql://user:pass@localhost:5432/syntha"
```

```python
import os
from syntha import ContextMesh

mesh = ContextMesh(
    user_id="env_user",
    connection_string=os.getenv("CONNECTION_STRING")
)
```

## See Also

- [SQLite Setup](sqlite.md)
- [Persistence Concepts](../../user-guide/concepts/persistence.md)
