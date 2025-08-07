# Installation

This guide covers installing Syntha and setting up your development environment.

## Requirements

- Python 3.9 or higher
- pip (Python package installer)

## Basic Installation

Install Syntha using pip:

```bash
pip install syntha
```

That's it! Syntha works out of the box with SQLite (no additional setup required).

## Verify Installation

Test your installation:

```python
from syntha import ContextMesh, ToolHandler

# Create a test context mesh
context = ContextMesh(user_id="test_user")
handler = ToolHandler(context, "TestAgent")

print("✅ Syntha installed successfully!")
```

## Development Installation

For development or contributing to Syntha:

```bash
# Clone the repository
git clone https://github.com/syntha/syntha-sdk.git
cd syntha-sdk

# Install in development mode
pip install -e .

# Install development dependencies
pip install -r requirements-test.txt
```

## Database Backends

### SQLite (Default)

No additional setup required. Great for:
- Development and testing
- Small teams (up to 100 users)
- Single-server deployments

```python
context = ContextMesh(
    user_id="user123",
    db_backend="sqlite",
    db_path="my_app.db"  # Optional: defaults to syntha.db
)
```

### PostgreSQL (Production)

For production deployments with high concurrency:

```bash
# Install PostgreSQL driver
pip install psycopg2-binary
```

```python
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    connection_string="postgresql://user:pass@localhost:5432/syntha_db"
)
```

Or use environment variables:

```bash
export CONNECTION_STRING="postgresql://user:pass@localhost:5432/syntha_db"
```

```python
import os
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    connection_string=os.getenv("CONNECTION_STRING")
)
```

## Framework Integration

Install additional packages for your LLM framework:

### OpenAI

```bash
pip install openai
```

### Anthropic Claude

```bash
pip install anthropic
```

### LangChain

```bash
pip install langchain langchain-openai
```

### Agno

```bash
pip install agno
```

## Configuration

### Environment Variables

Set these environment variables for your setup:

```bash
# Database (if using PostgreSQL)
export CONNECTION_STRING="postgresql://user:pass@localhost:5432/syntha_db"

# LLM API Keys
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"

# Optional: Logging level
export SYNTHA_LOG_LEVEL="INFO"
```

### Configuration File

Create a `syntha_config.py` file:

```python
# syntha_config.py
SYNTHA_CONFIG = {
    "db_backend": "postgresql",
    "connection_string": "postgresql://user:pass@localhost:5432/syntha_db",
    "enable_logging": True,
    "log_level": "INFO"
}
```

## Docker Setup

Use Syntha with Docker:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install Syntha
RUN pip install syntha

# For PostgreSQL support
RUN pip install psycopg2-binary

COPY . .

CMD ["python", "your_app.py"]
```

With docker-compose:

```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/syntha_db
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=syntha_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Troubleshooting

### Import Errors

If you see import errors:

```bash
# Ensure you're in the right Python environment
python --version
pip list | grep syntha

# Reinstall if needed
pip uninstall syntha
pip install syntha
```

### Database Connection Issues

For PostgreSQL connection problems:

```python
# Test connection
import psycopg2
conn = psycopg2.connect("postgresql://user:pass@localhost:5432/syntha_db")
print("✅ PostgreSQL connection successful")
```

### Permission Issues

If you encounter permission errors:

```bash
# Install for current user only
pip install --user syntha

# Or use virtual environment
python -m venv syntha_env
source syntha_env/bin/activate  # On Windows: syntha_env\Scripts\activate
pip install syntha
```

## Next Steps

- **[Quick Start](quick-start.md)** - Create your first multi-agent system
- **[What is Syntha](what-is-syntha.md)** - Learn about Syntha's core concepts
- **[Examples](../../examples/overview.md)** - See working code examples

## Need Help?

- Check the [troubleshooting section](#troubleshooting) above
- Review [Examples](../../examples/overview.md) for working setups
- Open an issue on [GitHub](https://github.com/syntha/syntha-sdk/issues)