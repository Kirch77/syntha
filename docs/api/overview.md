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
| `db_path` | `str` | `"syntha_context.db"` | SQLite database file path |
| `connection_string` | `str` | `None` | PostgreSQL connection string (alternative to host/user/etc.) |
| `host,user,password,database,port` | various | `None` | PostgreSQL connection parameters (if not using `connection_string`) |

**Key Methods:**
- `push(key, value, subscribers=None, topics=None, ttl=None)`
- `get(key, agent_name=None)`
- `get_all_for_agent(agent_name)`
- `get_keys_for_agent(agent_name)`
- `register_agent_topics(agent_name, topics)`
- `get_topics_for_agent(agent_name)`
- `unsubscribe_from_topics(agent_name, topics)`
- `get_all_topics()` / `get_subscribers_for_topic(topic)`
- `get_available_keys_by_topic(agent_name)`
- `delete_topic(topic)`
- `cleanup_expired()` / `remove(key)`

### ToolHandler
Primary interface for agents to interact via tools.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `context_mesh` | `ContextMesh` | Required | The Context Mesh instance |
| `agent_name` | `str` | `None` | Name of the agent using this handler |
| `allowed_tools` | `List[str]` | `None` | Restrict available tools |
| `denied_tools` | `List[str]` | `[]` | Explicitly deny tools |
| `role_based_access` | `Dict[str,List[str]]` | `{}` | Optional role map |

**Key Methods:**
- `handle_tool_call(tool_name, **kwargs)`
- `get_schemas()` / `get_syntha_schemas_only()`
- `get_langchain_tools()` / `get_langgraph_tools()` / `get_openai_functions()` / `get_anthropic_tools()` / `get_tools_for_framework(name)`
- Access control helpers: `set_agent_role`, `set_allowed_tools`, `set_denied_tools`, `add_allowed_tool`, `add_denied_tool`, `get_available_tools`, `has_tool_access`

## Available Tools

All ToolHandler instances provide these tools:

### get_context
Retrieve context for the calling agent.

Parameters: `keys` (optional `List[str]`)

Returns:
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
Share context with routing options.

Parameters: `key: str`, `value: Any (string or JSON)`, `topics?: List[str]`, `subscribers?: List[str]`, `ttl_hours?: float` (default 24)

Returns:
```python
{
  "success": bool,
  "message": str,
  "key": str,
  "value": Any,
  "topics": Optional[List[str]],
  "subscribers": Optional[List[str]],
  "ttl_hours": float
}
```

### list_context
Discover available context keys (and by topic).

Returns:
```python
{
  "success": bool,
  "keys_by_topic": Dict[str, List[str]],
  "all_accessible_keys": List[str],
  "topics_subscribed": List[str],
  "agent_name": str,
  "total_keys": int
}
```

### subscribe_to_topics
Subscribe the calling agent to topics.

Parameters: `topics: List[str]`

Returns:
```python
{ "success": True, "agent": str, "topics": List[str], "message": str }
```

### discover_topics
Find available topics and subscriber info.

Returns:
```python
{
  "success": bool,
  "topics": { "topic": { "subscriber_count": int, "is_active": bool, "subscribers"?: List[str] } },
  "total_topics": int,
  "popular_topics": List[str],
  "suggestions": Dict
}
```

## Framework Adapters

### Supported Frameworks

| Framework | How to get tools |
|-----------|------------------|
| OpenAI | `handler.get_openai_functions()` or `handler.get_schemas()` |
| LangChain | `handler.get_langchain_tools()` |
| LangGraph | `handler.get_langgraph_tools()` |
| Anthropic | `handler.get_anthropic_tools()` |
| Agno | `handler.get_tools_for_framework("agno")` |

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
| `readonly` | Read-only access | Get/list tools only |

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
    connection_string="postgresql://user:pass@host:5432/db"
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

- **[Context Mesh Details](context-mesh.md)**
- **[Tool Handler Details](tool-handler.md)**
- **[Framework Adapters Details](framework-adapters.md)**
- **[Examples](../examples/overview.md)**