# API Reference Overview

Syntha SDK provides a clean, Python-native API for building multi-agent context systems. All APIs are designed to be framework-agnostic and production-ready.

## Core Components

### [ContextMesh](context-mesh.md)
The heart of Syntha - manages shared context storage, routing, and persistence.

```python
from syntha import ContextMesh

# Create context mesh with user isolation
context = ContextMesh(user_id="user123")

# Share context globally
context.push("system_status", "operational")

# Share with specific topics
context.push("customer_data", {"name": "Acme"}, topics=["sales", "support"])

# Retrieve context
result = context.get("system_status", "agent_name")
```

### [ToolHandler](tools.md)
Provides LLM-compatible function calling interface for agents to interact with context.

```python
from syntha import ToolHandler

# Create handler for an agent
handler = ToolHandler(context, "MyAgent")

# Get available tool schemas for your LLM
schemas = handler.get_schemas()

# Handle function calls from LLM
result = handler.handle_tool_call("get_context", keys=["customer_data"])
```

### [Prompt Builders](prompts.md)
Utilities for injecting context directly into agent prompts.

```python
from syntha import build_system_prompt

# Build system prompt with relevant context
prompt = build_system_prompt("MyAgent", context)

# Or inject context into existing prompts
enhanced_prompt = inject_context_into_prompt(
    "You are a sales assistant", 
    context, 
    "SalesAgent"
)
```

### [Persistence](persistence.md)
Database backends for persistent context storage.

```python
from syntha import create_database_backend

# SQLite for development
backend = create_database_backend("sqlite", path="./data.db")

# PostgreSQL for production
backend = create_database_backend("postgresql", 
    host="localhost", database="syntha", user="user", password="pass")
```

## Quick Reference

### Essential Imports

```python
# Core functionality
from syntha import ContextMesh, ToolHandler

# Prompt integration
from syntha import build_system_prompt, build_message_prompt, build_custom_prompt, inject_context_into_prompt

# Tool schemas
from syntha import get_all_tool_schemas

# Database backends
from syntha import create_database_backend, SQLiteBackend

# Error handling
from syntha import SynthaError, handle_syntha_error

# Logging
from syntha import get_logger, configure_logging
```

### Common Patterns

#### Basic Context Sharing
```python
# Create context mesh
context = ContextMesh(user_id="user123")

# Share context
context.push("user_preferences", {"theme": "dark"})

# Retrieve context
prefs = context.get("user_preferences", "agent_name")
```

#### Topic-Based Routing
```python
from syntha import ContextMesh

context = ContextMesh(user_id="user123")

# Agent subscribes to topics
context.register_agent_topics("SalesAgent", ["sales", "customers"])

# Push to topics
context.push("lead_data", {"name": "Acme Corp"}, topics=["sales"])

# Agent automatically receives relevant context
sales_context = context.get_all_for_agent("SalesAgent")
```

#### Tool-Based Integration
```python
# Set up tool handler
handler = ToolHandler(context, "MyAgent")

# Get all available tool schemas
schemas = handler.get_schemas()

# Handle function calls from LLM
result = handler.handle_tool_call("push_context", 
    key="status", 
    value="processing"
)
```

## Error Handling

All Syntha APIs use a consistent error handling pattern:

```python
from syntha import SynthaError, handle_syntha_error

try:
    context.push("key", "value")
except SynthaError as e:
    # Syntha-specific error with recovery suggestions
    print(f"Error: {e}")
    print(f"Suggestion: {e.suggestion}")
```

## Type Safety

Syntha includes comprehensive type hints for better IDE support:

```python
from typing import Optional, List, Dict, Any
from syntha import ContextMesh

def setup_context(user_id: str) -> ContextMesh:
    return ContextMesh(user_id=user_id)
```

## Next Steps

- **New to Syntha?** Start with [ContextMesh](context-mesh.md)
- **Building agents?** See [Tools](tools.md) and [Tool Schemas](schemas.md)
- **Need prompt integration?** Check [Prompt Builders](prompts.md)
- **Going to production?** Review [Persistence](persistence.md)