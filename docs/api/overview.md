# API Reference Overview

Syntha SDK provides a clean, Python-native API for building multi-agent context systems. All APIs are designed to be framework-agnostic and production-ready.

## 🚀 Quick Start Path

New to Syntha? Follow this recommended learning path:

1. **[ContextMesh](context-mesh.md)** - Start here to understand the core context sharing system
2. **[Tools](tools.md)** - Learn how agents interact with context through LLM-compatible tools
3. **[Tool Schemas](schemas.md)** - Reference for all available tools and their exact formats
4. **[Prompts](prompts.md)** - Advanced: Inject context directly into prompts
5. **[Persistence](persistence.md)** - Production: Set up database backends

## Core Components

### 🧠 [ContextMesh](context-mesh.md) - The Foundation
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

**Key Features:**
- Topic-based routing
- User isolation for security
- Automatic cleanup of expired data
- Database persistence

### 🛠️ [ToolHandler](tools.md) - LLM Integration
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

**Key Features:**
- OpenAI-compatible function schemas
- Automatic agent identification
- Access control and permissions
- Error handling with suggestions

### 📝 [Prompt Builders](prompts.md) - Direct Integration
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

### 💾 [Persistence](persistence.md) - Production Ready
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

Choose your path based on your needs:

### 🎯 I'm new to Syntha
Start with [ContextMesh](context-mesh.md) to understand the fundamentals, then move to [Tools](tools.md) for agent integration.

### 🤖 I'm building LLM agents
Jump to [Tools](tools.md) for the agent interface, then reference [Tool Schemas](schemas.md) for exact function definitions.

### 🔧 I need custom integration
Check out [Prompt Builders](prompts.md) for direct prompt injection or [Persistence](persistence.md) for custom backends.

### 📚 I want the complete reference
Browse [Tool Schemas](schemas.md) for all available functions and their exact OpenAI-compatible schemas.