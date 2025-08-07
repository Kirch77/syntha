# Setup & Installation

This guide walks you through setting up Syntha for different use cases, from development to production deployment.

## Quick Setup

### 1. Install Syntha
```bash
pip install syntha
```

### 2. Verify Installation
```python
from syntha import ContextMesh, ToolHandler

# Test basic functionality
context = ContextMesh(user_id="test")
handler = ToolHandler(context, "TestAgent")
print("✅ Syntha is ready!")
```

## Development Setup

### Local Development
Perfect for building and testing your multi-agent applications:

```python
from syntha import ContextMesh, ToolHandler

# SQLite backend (default) - no configuration needed
context = ContextMesh(
    user_id="dev_user",
    db_backend="sqlite",
    db_path="dev_syntha.db"  # Creates local file
)
```

### In-Memory Testing
For unit tests and rapid iteration:

```python
context = ContextMesh(
    user_id="test_user",
    db_backend="sqlite",
    db_path=":memory:"  # In-memory database
)
```

## Production Setup

### PostgreSQL Backend
For production deployments with high concurrency:

#### 1. Install PostgreSQL Driver
```bash
pip install psycopg2-binary
```

#### 2. Setup Database
```sql
-- Create database and user
CREATE DATABASE syntha_prod;
CREATE USER syntha_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE syntha_prod TO syntha_user;
```

#### 3. Configure Syntha
```python
context = ContextMesh(
    user_id="prod_user",
    db_backend="postgresql",
    connection_string="postgresql://syntha_user:secure_password@localhost:5432/syntha_prod"
)
```

Or use environment variables:
```bash
export CONNECTION_STRING="postgresql://syntha_user:secure_password@localhost:5432/syntha_prod"
```

```python
import os
context = ContextMesh(
    user_id="prod_user",
    db_backend="postgresql",
    connection_string=os.getenv("CONNECTION_STRING")
)
```

## Framework Integration Setup

### OpenAI Setup
```bash
pip install openai
export OPENAI_API_KEY="your-api-key"
```

```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "AssistantAgent")

# Get OpenAI-compatible tools
tools = [{"type": "function", "function": schema} 
         for schema in handler.get_schemas()]

# Get context-aware system prompt
system_prompt = build_system_prompt("AssistantAgent", context)

# Use with OpenAI
client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Help me analyze our sales data"}
    ],
    tools=tools
)
```

### LangChain Setup
```bash
pip install langchain langchain-openai
```

```python
from langchain.agents import initialize_agent, AgentType
from langchain_openai import ChatOpenAI
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "LangChainAgent")

# Get LangChain-compatible tools
langchain_tools = handler.get_langchain_tools()

# Create LangChain agent
llm = ChatOpenAI(temperature=0)
agent = initialize_agent(
    tools=langchain_tools,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)
```

### Anthropic Claude Setup
```bash
pip install anthropic
export ANTHROPIC_API_KEY="your-api-key"
```

```python
import anthropic
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "ClaudeAgent")

# Get Anthropic-compatible tools
tools = handler.get_anthropic_tools()

# Use with Claude
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    tools=tools,
    messages=[{"role": "user", "content": "Analyze our customer feedback"}]
)
```

## Docker Setup

### Dockerfile
```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install Syntha and dependencies
RUN pip install syntha psycopg2-binary

# Copy your application
COPY . .

# Run your app
CMD ["python", "app.py"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      - DATABASE_URL=postgresql://syntha:password@db:5432/syntha
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=syntha
      - POSTGRES_USER=syntha
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Environment Configuration

### Required Environment Variables
```bash
# Database (for PostgreSQL)
export CONNECTION_STRING="postgresql://user:pass@host:5432/db"

# LLM API Keys
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"
```

### Optional Environment Variables
```bash
# Logging
export SYNTHA_LOG_LEVEL="INFO"  # DEBUG, INFO, WARNING, ERROR

# Performance
export SYNTHA_ENABLE_INDEXING="true"
export SYNTHA_AUTO_CLEANUP="true"
```

## Configuration File

Create a `syntha_config.py`:

```python
# syntha_config.py
import os

SYNTHA_CONFIG = {
    # Database
    "db_backend": "postgresql",
    "connection_string": os.getenv("CONNECTION_STRING"),
    
    # Performance
    "enable_indexing": True,
    "auto_cleanup": True,
    
    # Logging
    "enable_logging": True,
    "log_level": "INFO",
    
    # Framework defaults
    "default_agent_role": "contributor",
    "max_context_items": 10000,
}
```

Use in your application:
```python
from syntha_config import SYNTHA_CONFIG
from syntha import ContextMesh

context = ContextMesh(
    user_id="user123",
    **SYNTHA_CONFIG
)
```

## Health Checks

### Basic Health Check
```python
def health_check():
    try:
        context = ContextMesh(user_id="health_check")
        handler = ToolHandler(context, "HealthAgent")
        
        # Test basic operations
        result = handler.handle_tool_call("list_context")
        return result["success"]
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

if health_check():
    print("✅ Syntha is healthy")
else:
    print("❌ Syntha health check failed")
```

### Database Connection Check
```python
def check_database_connection():
    try:
        context = ContextMesh(user_id="db_check")
        # Try to push and retrieve test data
        context.push("health_check", {"status": "ok"})
        result = context.get("health_check", "TestAgent")
        return result is not None
    except Exception as e:
        print(f"Database check failed: {e}")
        return False
```

## Performance Tuning

### SQLite Optimization
```python
context = ContextMesh(
    user_id="user123",
    db_backend="sqlite",
    db_path="optimized.db",
    enable_indexing=True,    # Enable indexes
    auto_cleanup=True        # Auto-remove expired items
)
```

### PostgreSQL Optimization
```python
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    connection_string="postgresql://user:pass@host:5432/db",
    enable_indexing=True,
    auto_cleanup=True
)
```

## Troubleshooting

### Common Issues

#### Import Errors
```bash
# Check Python version
python --version  # Should be 3.9+

# Reinstall if needed
pip uninstall syntha
pip install syntha
```

#### Database Connection Issues
```python
# Test PostgreSQL connection
import psycopg2
try:
    conn = psycopg2.connect("your-database-url")
    print("✅ Database connection successful")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
```

#### Permission Issues
```bash
# Use virtual environment
python -m venv syntha_env
source syntha_env/bin/activate  # Windows: syntha_env\Scripts\activate
pip install syntha
```

## Next Steps

- **[Contributing](contributing.md)** - Learn how to contribute to Syntha
- **[Examples](../../examples/overview.md)** - See working examples
- **[API Reference](../../api/overview.md)** - Complete API documentation