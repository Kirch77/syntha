# ContextMesh API Reference

The `ContextMesh` class is the core shared memory system in Syntha, providing high-performance, thread-safe context storage and retrieval for multi-agent systems.

## Class Overview

```python
from syntha import ContextMesh

class ContextMesh:
    def __init__(self, enable_indexing=False, auto_cleanup=False)
```

## Constructor

### `ContextMesh(enable_indexing=False, auto_cleanup=False)`

Create a new context mesh instance.

**Parameters:**

- `enable_indexing` (bool, optional): Enable fast lookups for large datasets. Provides 10x performance improvement for systems with >100 context items. Default: `False`
- `auto_cleanup` (bool, optional): Enable automatic TTL processing and memory management. Prevents memory leaks in long-running systems. Default: `False`

**Example:**

```python
# Basic usage
mesh = ContextMesh()

# Production setup with optimizations
mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
```

## Core Methods

### `push(key, value, subscribers=None, ttl=None)`

Store context with optional access control and expiration.

**Parameters:**

- `key` (str): Unique identifier for the context
- `value` (Any): Context data (automatically JSON serialized if needed)
- `subscribers` (List[str], optional): List of agent names with access. If `None`, context is globally accessible
- `ttl` (int, optional): Time-to-live in seconds. Context expires after this duration

**Returns:** `None`

**Examples:**

```python
# Global context
mesh.push("company_name", "TechCorp")

# Agent-specific context
mesh.push("api_credentials", {"key": "secret"},
          subscribers=["Backend", "API"])

# Temporary context
mesh.push("session_token", "abc123", ttl=3600)  # 1 hour

# Complex data structures
mesh.push("user_data", {
    "id": 123,
    "preferences": {"theme": "dark"},
    "permissions": ["read", "write"]
})
```

### `get(key, default=None)`

Retrieve context by key.

**Parameters:**

- `key` (str): Context key to retrieve
- `default` (Any, optional): Default value if key not found

**Returns:** Context value or default

**Examples:**

```python
# Basic retrieval
company = mesh.get("company_name")

# With default value
theme = mesh.get("user_theme", "light")

# Handle missing keys
api_key = mesh.get("api_key")
if api_key is None:
    print("API key not configured")
```

### `get_all_for_agent(agent_name)`

Get all context accessible to a specific agent (respects subscriber permissions).

**Parameters:**

- `agent_name` (str): Name of the agent

**Returns:** `Dict[str, Any]` - Dictionary of all accessible context

**Examples:**

```python
# Get all context for Backend agent
backend_context = mesh.get_all_for_agent("Backend")

# Check what's available
print("Backend can access:", list(backend_context.keys()))

# Use in prompt generation
context_str = json.dumps(backend_context, indent=2)
```

### `list_keys(agent_name=None)`

List available context keys, optionally filtered by agent permissions.

**Parameters:**

- `agent_name` (str, optional): Filter by agent permissions. If `None`, returns all keys

**Returns:** `List[str]` - List of available context keys

**Examples:**

```python
# All keys
all_keys = mesh.list_keys()

# Keys accessible to specific agent
backend_keys = mesh.list_keys("Backend")

# Check if key exists
if "user_data" in mesh.list_keys("Frontend"):
    user_data = mesh.get("user_data")
```

### `remove(key)`

Remove context by key.

**Parameters:**

- `key` (str): Context key to remove

**Returns:** `bool` - `True` if removed, `False` if key not found

**Examples:**

```python
# Remove context
success = mesh.remove("old_data")
if success:
    print("Data removed successfully")

# Clean up temporary data
mesh.remove("temp_calculation")
mesh.remove("cached_response")
```

### `clear_all()`

Remove all context from the mesh (use with caution).

**Returns:** `None`

**Examples:**

```python
# Clear all context (development/testing only)
mesh.clear_all()

# Reset for new test
def reset_test_environment():
    mesh.clear_all()
    mesh.push("test_mode", True)
```

## Memory Management

### `cleanup_expired()`

Manually remove expired context items.

**Returns:** `int` - Number of items removed

**Examples:**

```python
# Manual cleanup
cleaned_count = mesh.cleanup_expired()
print(f"Cleaned up {cleaned_count} expired items")

# Periodic cleanup in long-running systems
def periodic_cleanup():
    while True:
        time.sleep(300)  # 5 minutes
        mesh.cleanup_expired()
```

### `get_stats()`

Get system statistics and performance metrics.

**Returns:** `Dict` with keys:

- `total_items` (int): Total context items stored
- `agents_count` (int): Number of unique agents with context
- `expired_items` (int): Number of expired items
- `memory_usage` (float): Approximate memory usage in MB

**Examples:**

```python
# Monitor system health
stats = mesh.get_stats()
print(f"Total items: {stats['total_items']}")
print(f"Memory usage: {stats['memory_usage']:.2f} MB")

# Performance monitoring
if stats['total_items'] > 1000:
    print("Consider enabling indexing")

if stats['expired_items'] > 100:
    print("Consider enabling auto-cleanup")
```

## Properties

### `enable_indexing`

Control indexing system at runtime.

**Type:** `bool`

**Examples:**

```python
# Enable indexing for better performance
mesh.enable_indexing = True

# Disable if memory constrained
mesh.enable_indexing = False

# Check current state
if mesh.enable_indexing:
    print("Indexing enabled - fast lookups active")
```

### `auto_cleanup`

Control automatic cleanup system at runtime.

**Type:** `bool`

**Examples:**

```python
# Enable auto-cleanup
mesh.auto_cleanup = True

# Disable for debugging
mesh.auto_cleanup = False

# Check current state
if mesh.auto_cleanup:
    print("Auto-cleanup enabled - memory managed automatically")
```

## Advanced Usage

### Context Item Introspection

```python
# Check if context has expired
item = mesh._data.get("session_token")
if item and item.is_expired():
    print("Session token has expired")

# Get item metadata
if item:
    print(f"Created: {item.created_at}")
    print(f"Expires: {item.expires_at}")
    print(f"Subscribers: {item.subscribers}")
```

### Batch Operations

```python
# Efficient multiple operations
operations = [
    ("push", "metric1", 100),
    ("push", "metric2", 200),
    ("get", "previous_total")
]

for op, key, *args in operations:
    if op == "push":
        mesh.push(key, args[0])
    elif op == "get":
        value = mesh.get(key)
        print(f"{key}: {value}")
```

### Thread Safety

```python
import threading
import time

# ContextMesh is thread-safe
def worker_thread(thread_id):
    for i in range(100):
        mesh.push(f"thread_{thread_id}_item_{i}", f"value_{i}")
        time.sleep(0.01)

# Multiple threads can safely access mesh
threads = []
for i in range(5):
    t = threading.Thread(target=worker_thread, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print(f"Total items: {mesh.get_stats()['total_items']}")
```

## Performance Characteristics

### Without Indexing

- `push()`: O(1)
- `get()`: O(1)
- `get_all_for_agent()`: O(n) where n = total items
- `list_keys()`: O(n)

### With Indexing

- `push()`: O(1)
- `get()`: O(1)
- `get_all_for_agent()`: O(1) - 10x faster
- `list_keys()`: O(1)

### Memory Usage

- Base overhead: ~1KB per context item
- Indexing overhead: ~500 bytes per agent
- Auto-cleanup: Minimal CPU overhead

## Error Handling

### Common Exceptions

```python
try:
    mesh.push("key", "value")
except ValueError as e:
    print(f"Invalid key or value: {e}")

try:
    value = mesh.get("nonexistent_key")
    if value is None:
        print("Key not found")
except Exception as e:
    print(f"Unexpected error: {e}")
```

### Validation

```python
# Key validation
def is_valid_key(key):
    return isinstance(key, str) and len(key) > 0

# Value validation
def is_valid_value(value):
    try:
        json.dumps(value)
        return True
    except (TypeError, ValueError):
        return False
```

## Best Practices

### Production Setup

```python
# Recommended production configuration
mesh = ContextMesh(
    enable_indexing=True,    # Better performance
    auto_cleanup=True        # Memory management
)
```

### Context Organization

```python
# Use hierarchical naming
mesh.push("config_database_url", "postgresql://...")
mesh.push("config_redis_url", "redis://...")
mesh.push("metrics_daily_users", 1500)
mesh.push("metrics_monthly_revenue", 50000)
```

### Access Control

```python
# Principle of least privilege
mesh.push("public_info", data)  # Global access
mesh.push("team_info", data, subscribers=["Team1", "Team2"])  # Team access
mesh.push("secret_keys", data, subscribers=["Admin"])  # Restricted access
```

### TTL Management

```python
# Short TTL for sensitive data
mesh.push("auth_token", token, ttl=3600)  # 1 hour

# Medium TTL for cached data
mesh.push("api_response", data, ttl=300)  # 5 minutes

# Long TTL for temporary features
mesh.push("beta_feature", True, ttl=86400)  # 24 hours
```

## Integration Examples

### With LLM Prompt Building

```python
def build_context_prompt(agent_name):
    context = mesh.get_all_for_agent(agent_name)

    prompt = f"You are {agent_name}.\n\n"
    prompt += "Available context:\n"

    for key, value in context.items():
        prompt += f"- {key}: {value}\n"

    return prompt
```

### With Monitoring

```python
def monitor_mesh_health():
    stats = mesh.get_stats()

    if stats['total_items'] > 10000:
        print("WARNING: High context count")

    if stats['memory_usage'] > 100:
        print("WARNING: High memory usage")

    if stats['expired_items'] > 500:
        print("INFO: Many expired items - consider cleanup")
```

---

**Next**: Explore the [ToolHandler API](tool-handler.md) for LLM integration capabilities.
