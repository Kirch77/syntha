# Installation

Get started with Syntha SDK in just a few minutes.

## Requirements

- Python 3.9 or higher
- pip (Python package installer)

## Basic Installation

Install Syntha using pip:

```bash
pip install syntha
```

That's it! Syntha is now ready to use with sensible defaults.

## Framework-Specific Installation

For seamless integration with your preferred AI framework, install the optional dependencies:

### LangChain Integration

```bash
pip install syntha langchain
```

### LangGraph Integration

```bash
pip install syntha langgraph
```

### OpenAI Integration

```bash
pip install syntha openai
```

### Anthropic Claude Integration

```bash
pip install syntha anthropic
```

### Agno Integration

```bash
pip install syntha agno
```

### All Frameworks (Complete Setup)

```bash
pip install syntha langchain langgraph openai anthropic agno
```

!!! tip "Framework Dependencies"
    Syntha works without any framework dependencies - they're only needed if you want to use the specific `get_*_tools()` methods. The core context management works with any framework using `get_schemas()`.

## Quick Start

Verify your installation with this simple example:

```python
from syntha import ContextMesh

# Create a context mesh
context = ContextMesh(user_id="demo_user")

# Add some context
context.push("greeting", "Hello from Syntha!")

# Retrieve it
result = context.get("greeting", "demo_agent")
print(result)  # Output: Hello from Syntha!

# Clean up
context.close()
```

If this runs without errors, you're ready to go!

## Framework Quick Start Examples

### LangChain Quick Start

```python
from syntha import ContextMesh, ToolHandler

# Create context and handler
context = ContextMesh(user_id="langchain_user", enable_persistence=True)
handler = ToolHandler(context, "MyAgent")

# Get LangChain tools - just one line!
langchain_tools = handler.get_langchain_tools()

# Use with your LangChain agent
print(f"Ready! {len(langchain_tools)} LangChain tools available")
context.close()
```

### OpenAI Quick Start

```python
from syntha import ContextMesh, ToolHandler

# Create context and handler  
context = ContextMesh(user_id="openai_user", enable_persistence=True)
handler = ToolHandler(context, "MyAgent")

# Get OpenAI function definitions - just one line!
openai_functions = handler.get_openai_functions()

# Use with OpenAI API
print(f"Ready! {len(openai_functions)} OpenAI functions available")
context.close()
```

### Anthropic Quick Start

```python
from syntha import ContextMesh, ToolHandler

# Create context and handler
context = ContextMesh(user_id="anthropic_user", enable_persistence=True) 
handler = ToolHandler(context, "MyAgent")

# Get Anthropic tool definitions - just one line!
anthropic_tools = handler.get_anthropic_tools()

# Use with Anthropic Claude
print(f"Ready! {len(anthropic_tools)} Anthropic tools available")
context.close()
```

### Universal Framework Support

```python
from syntha import ContextMesh, ToolHandler

# Create context and handler
context = ContextMesh(user_id="any_framework_user", enable_persistence=True)
handler = ToolHandler(context, "MyAgent")

# Works with any framework using JSON schemas
tools = handler.get_schemas()

# Or get tools for a specific framework
agno_tools = handler.get_tools_for_framework("agno")

print(f"Universal: {len(tools)} tools available")
print(f"Agno: {len(agno_tools)} tools available")
context.close()
```

## Database Setup (Optional)

By default, Syntha uses SQLite with an in-memory database. For production use, you'll want persistent storage:

### SQLite (Recommended for Development)

```python
from syntha import ContextMesh

# Persistent SQLite database
context = ContextMesh(
    user_id="your_user_id",
    enable_persistence=True,
    db_backend="sqlite",
    db_path="syntha.db"  # Will be created automatically
)
```

### PostgreSQL (Recommended for Production)

First, install the PostgreSQL adapter:

For production environments, install `psycopg2`:

```bash
pip install psycopg2
```

Then configure Syntha using **either** approach:

#### Option 1: Connection String (Recommended)

```python
from syntha import ContextMesh

# Using a PostgreSQL connection string
context = ContextMesh(
    user_id="your_user_id", 
    enable_persistence=True,
    db_backend="postgresql",
    connection_string="postgresql://syntha_user:your_password@localhost:5432/syntha_db"
)
```

#### Option 2: Individual Parameters

```python
from syntha import ContextMesh

# Using individual database parameters
context = ContextMesh(
    user_id="your_user_id",
    enable_persistence=True,
    db_backend="postgresql",
    host="localhost",          # Default: "localhost"
    port=5432,                 # Default: 5432
    database="syntha_db",      # Required (or use db_name)
    user="syntha_user",        # Required (or use username)
    password="your_password",  # Required
    sslmode="prefer"          # Optional: SSL mode
)
```

!!! tip "Connection String Format"
    The PostgreSQL connection string follows the standard format:
    ```
    postgresql://username:password@host:port/database_name
    ```
    
    **Examples:**
    - Local development: `postgresql://user:pass@localhost:5432/syntha`
    - With SSL: `postgresql://user:pass@host:5432/db?sslmode=require`
    - Cloud database: `postgresql://user:pass@your-cloud-host.com:5432/production_db`

!!! note "Parameter Flexibility"
    When using individual parameters, you can use either:
    - `database` or `db_name` for the database name
    - `user` or `username` for the username
    - `host` defaults to `"localhost"` if not specified
    - `port` defaults to `5432` if not specified

!!! note "Database Creation"
    Syntha will automatically create the necessary tables when it first connects to your database.

## Development Setup (Optional)

If you plan to contribute to Syntha or need development tools:

```bash
pip install syntha[dev]
```

This includes testing and code formatting tools.

## Troubleshooting

### Import Errors

If you get import errors, make sure you're using Python 3.9+:

```bash
python --version
```

### Database Connection Issues

For PostgreSQL connection problems:

1. Ensure PostgreSQL is running
2. Check your connection parameters
3. Verify the database exists
4. Confirm user permissions

### Permission Errors

If you get permission errors during installation:

```bash
pip install --user syntha
```

## Next Steps

Now that Syntha is installed:

1. **Learn the basics**: Check out our [Guides](guides/overview.md)
2. **Understand the concepts**: Read about [Core Concepts](core-concepts.md)  
3. **Explore the API**: Browse the [API Reference](api/overview.md)

---

Ready to build your first multi-agent system? Start with the [Basics Guide](guides/basics.md)!