# API Reference

Complete API documentation for Syntha's classes, methods, and functions. All information is extracted directly from the source code to ensure accuracy.

## Core Components

### ContextMesh
The central context sharing system.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `user_id` | `str` | `None` | Unique identifier for user isolation |
| `enable_indexing` | `bool` | `True` | Enable performance optimizations |
| `auto_cleanup` | `bool` | `True` | Automatically remove expired items |
| `enable_persistence` | `bool` | `True` | Store context in database |
| `db_backend` | `str` | `"sqlite"` | Database backend ("sqlite" or "postgresql") |
| `db_path` | `str` | `"syntha.db"` | SQLite database file path |
| `database_url` | `str` | `None` | PostgreSQL connection string |

**Key Methods:**
- `push(key, value, subscribers=None, topics=None, ttl=None)` - Add context to mesh
- `get(key, agent_name)` - Retrieve specific context item
- `get_all_for_agent(agent_name)` - Get all accessible context for agent
- `get_by_topics(topics, agent_name)` - Get context filtered by topics
- `subscribe_to_topics(agent_name, topics)` - Subscribe agent to topics
- `discover_topics()` - List available topics and subscribers

### ToolHandler
Interface for agents to interact with Context Mesh.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `context_mesh` | `ContextMesh` | Required | The Context Mesh instance |
| `agent_name` | `str` | Required | Name of the agent using this handler |
| `allowed_tools` | `List[str]` | `None` | Restrict available tools |
| `role` | `str` | `"contributor"` | Agent role for access control |

**Key Methods:**
- `handle_tool_call(tool_name, **kwargs)` - Execute a tool call
- `get_schemas()` - Get OpenAI-compatible tool schemas
- `get_langchain_tools()` - Get LangChain BaseTool instances
- `get_anthropic_tools()` - Get Anthropic tool definitions
- `get_tools_for_framework(framework)` - Get framework-specific tools
- `has_tool_access(tool_name)` - Check if agent can use tool

## Available Tools

All ToolHandler instances provide these tools:

### get_context
Retrieve context from the mesh.

**Parameters:**
- `keys` (optional): `List[str]` - Specific keys to retrieve

**Returns:**
```python
{
    "success": bool,
    "context": dict,
    "agent_name": str,
    "keys_requested": List[str],
    "keys_found": List[str],
    "message": str
}
```

### push_context
Share context with other agents.

**Parameters:**
- `key`: `str` - Context identifier
- `value`: `Any` - Context data
- `subscribers` (optional): `List[str]` - Target agents
- `topics` (optional): `List[str]` - Topic routing
- `ttl` (optional): `float` - Time-to-live in seconds

**Returns:**
```python
{
    "success": bool,
    "key": str,
    "routing": dict,
    "message": str
}
```

### list_context
Discover available context keys.

**Returns:**
```python
{
    "success": bool,
    "keys": List[str],
    "total_count": int,
    "agent_name": str
}
```

### subscribe_to_topics
Subscribe to topic-based routing.

**Parameters:**
- `topics`: `List[str]` - Topics to subscribe to

**Returns:**
```python
{
    "success": bool,
    "topics": List[str],
    "agent_name": str,
    "message": str
}
```

### discover_topics
Find available topics and subscribers.

**Returns:**
```python
{
    "success": bool,
    "topics": Dict[str, List[str]],
    "agent_name": str
}
```

## Framework Adapters

### Supported Frameworks

| Framework | Method | Returns |
|-----------|--------|---------|
| OpenAI | `get_schemas()` | `List[Dict]` - Function calling schemas |
| OpenAI | `get_openai_functions()` | `List[Dict]` - Alternative format |
| LangChain | `get_langchain_tools()` | `List[BaseTool]` - LangChain tools |
| Anthropic | `get_anthropic_tools()` | `List[Dict]` - Claude tool definitions |
| Agno | `get_tools_for_framework("agno")` | `List[Dict]` - Agno format |
| Generic | `get_tools_for_framework("generic")` | `List[Dict]` - JSON schemas |

## Prompt Builders

### build_system_prompt
Create context-aware system prompts.

**Parameters:**
- `agent_name`: `str` - Name of the agent
- `context_mesh`: `ContextMesh` - Context mesh instance
- `custom_instructions` (optional): `str` - Additional instructions

**Returns:** `str` - Complete system prompt with context

### build_custom_prompt
Build prompts with advanced customization.

**Parameters:**
- `agent_name`: `str` - Name of the agent
- `context_mesh`: `ContextMesh` - Context mesh instance
- `custom_instructions`: `str` - Custom prompt instructions
- `include_context_summary`: `bool` - Include context overview
- `include_agent_context`: `bool` - Include agent-specific context

**Returns:** `str` - Customized prompt

### inject_context_into_prompt
Inject context into custom templates.

**Parameters:**
- `prompt_template`: `str` - Template with placeholders
- `context_mesh`: `ContextMesh` - Context mesh instance
- `agent_name`: `str` - Name of the agent
- `context_mappings`: `Dict[str, str]` - Field mappings
- `additional_context` (optional): `Dict` - Extra context data
- `use_fallbacks` (optional): `bool` - Handle missing fields

**Returns:** `str` - Template with injected context

### build_message_prompt
Create conversation-style prompts.

**Parameters:**
- `agent_name`: `str` - Name of the agent
- `context_mesh`: `ContextMesh` - Context mesh instance
- `system_message`: `str` - System message
- `user_message`: `str` - User message
- `include_context`: `bool` - Include context in messages

**Returns:** `List[Dict]` - Message array for chat APIs

## Access Control

### Predefined Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `admin` | Full system access | All tools, all context |
| `contributor` | Standard agent access | Most tools, relevant context |
| `viewer` | Read-only access | Get/list tools only |

### Role-Based Handlers

```python
from syntha import create_role_based_handler

handler = create_role_based_handler(context, "AgentName", "admin")
```

### Restricted Handlers

```python
from syntha import create_restricted_handler

handler = create_restricted_handler(
    context, 
    "AgentName", 
    allowed_tools=["get_context", "list_context"]
)
```

### Multi-Agent Handlers

```python
from syntha import create_multi_agent_handlers

configs = [
    {"name": "Agent1", "role": "admin", "topics": ["management"]},
    {"name": "Agent2", "role": "contributor", "topics": ["sales"]}
]

handlers = create_multi_agent_handlers(context, configs)
```

## Persistence Backends

### SQLiteBackend
File-based storage for development and small teams.

**Configuration:**
```python
context = ContextMesh(
    user_id="user123",
    db_backend="sqlite",
    db_path="app.db"  # or ":memory:" for testing
)
```

### PostgreSQLBackend
Production database for high concurrency.

**Configuration:**
```python
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    database_url="postgresql://user:pass@host:5432/db"
)
```

## Exception Handling

### Exception Hierarchy

- `SynthaError` - Base exception
  - `SynthaConfigurationError` - Configuration issues
  - `SynthaConnectionError` - Database connection problems
  - `SynthaValidationError` - Invalid input data
  - `SynthaPermissionError` - Access control violations
  - `SynthaContextError` - Context operation failures
  - `SynthaPersistenceError` - Database operation failures
  - `SynthaToolError` - Tool execution failures
  - `SynthaSecurityError` - Security violations
  - `SynthaPerformanceError` - Performance issues
  - `SynthaTimeoutError` - Operation timeouts
  - `SynthaFrameworkError` - Framework integration issues

### Error Handler

```python
from syntha import handle_syntha_error

try:
    result = handler.handle_tool_call("push_context", key="test", value="data")
except SynthaError as e:
    handle_syntha_error(e)  # Provides recovery suggestions
```

## Logging

### Logger Configuration

```python
from syntha import configure_logging

configure_logging(level="INFO")  # DEBUG, INFO, WARNING, ERROR
```

### Specialized Loggers

```python
from syntha import get_logger, get_context_logger, get_performance_logger

logger = get_logger("my_module")
context_logger = get_context_logger()  # Context operations
perf_logger = get_performance_logger()  # Performance metrics
```

## Performance Monitoring

### Context Operations
- Push operations per second
- Get operations per second
- Database query performance
- Memory usage tracking

### Optimization Settings

```python
context = ContextMesh(
    user_id="user123",
    enable_indexing=True,     # Faster lookups
    auto_cleanup=True,        # Remove expired items
    enable_persistence=True   # Database storage
)
```

## Next Steps

- **[Context Mesh Details](context-mesh.md)** - Complete ContextMesh API
- **[Tool Handler Details](tool-handler.md)** - Complete ToolHandler API
- **[Framework Adapters Details](framework-adapters.md)** - Integration specifics
- **[Examples](../examples/overview.md)** - Working code samples