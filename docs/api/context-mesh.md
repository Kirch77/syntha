# ContextMesh API Reference

The `ContextMesh` class is the core of Syntha's context sharing system. It manages a shared knowledge space where agents can store and retrieve information with sophisticated routing and access control.

## Class Definition

```python
class ContextMesh:
    def __init__(
        self,
        enable_indexing: bool = True,
        auto_cleanup: bool = True,
        enable_persistence: bool = True,
        db_backend: str = "sqlite",
        user_id: Optional[str] = None,
        **db_config
    )
```

### Parameters

- **enable_indexing** (bool): Enable performance indexes for faster lookups. Default: `True`
- **auto_cleanup** (bool): Automatically clean up expired items. Default: `True`
- **enable_persistence** (bool): Enable database persistence. Default: `True`
- **db_backend** (str): Database backend ("sqlite" or "postgresql"). Default: `"sqlite"`
- **user_id** (Optional[str]): User ID for isolation. **Critical for production security**
- **db_config**: Additional database configuration parameters

### Example

```python
from syntha import ContextMesh

# Basic usage
context = ContextMesh(user_id="user123")

# Production PostgreSQL setup
context = ContextMesh(
    user_id="user123",
    db_backend="postgresql",
    host="localhost",
    database="syntha_db",
    user="syntha_user",
    password="password"
)
```

## Core Methods

### push()

Add or update context in the mesh with flexible routing options.

```python
def push(
    self,
    key: str,
    value: Any,
    subscribers: Optional[List[str]] = None,
    topics: Optional[List[str]] = None,
    ttl: Optional[float] = None,
) -> None
```

#### Parameters

- **key** (str): Unique identifier for the context
- **value** (Any): The context data (must be serializable)
- **subscribers** (Optional[List[str]]): Specific agents to receive this context
- **topics** (Optional[List[str]]): Topics to broadcast this context to
- **ttl** (Optional[float]): Time-to-live in seconds

#### Routing Options

You can use exactly one routing method:

1. **Global context** (default): `push("key", value)`
2. **Direct targeting**: `push("key", value, subscribers=["Agent1", "Agent2"])`
3. **Topic broadcasting**: `push("key", value, topics=["sales", "support"])`

#### Examples

```python
# Global context (available to all agents)
context.push("api_status", "healthy")

# Private context for specific agents
context.push("secret", "password123", subscribers=["AdminAgent"])

# Topic-based broadcasting
context.push("customer_data", {"name": "Acme"}, topics=["sales", "support"])

# With expiration (1 hour)
context.push("session_token", "abc123", ttl=3600)
```

### get()

Retrieve a specific context item for an agent.

```python
def get(self, key: str, agent_name: Optional[str] = None) -> Any
```

#### Parameters

- **key** (str): The context key to retrieve
- **agent_name** (Optional[str]): Name of the requesting agent (optional for global context)

#### Returns

The context value, or `None` if not found or not accessible.

#### Example

```python
# Retrieve context for an agent
user_prefs = context.get("user_preferences", "ChatAgent")
if user_prefs:
    print(f"Theme: {user_prefs['theme']}")

# Retrieve global context (no agent name needed)
status = context.get("api_status")
```

### get_all_for_agent()

Retrieve all accessible context for a specific agent.

```python
def get_all_for_agent(self, agent_name: str) -> Dict[str, Any]
```

#### Parameters

- **agent_name** (str): Name of the requesting agent

#### Returns

Dictionary mapping context keys to values that the agent can access.

#### Example

```python
# Get all context available to an agent
all_context = context.get_all_for_agent("SalesAgent")
for key, value in all_context.items():
    print(f"{key}: {value}")
```

### get_keys_for_agent()

Get all context keys accessible to an agent.

```python
def get_keys_for_agent(self, agent_name: str) -> List[str]
```

#### Parameters

- **agent_name** (str): Name of the requesting agent

#### Returns

List of context keys that the agent can access.

#### Example

```python
# Get all accessible keys for an agent
keys = context.get_keys_for_agent("SalesAgent")
print(f"Available keys: {keys}")
```

## Topic Management

### register_agent_topics()

Register what topics an agent is interested in.

```python
def register_agent_topics(self, agent_name: str, topics: List[str]) -> None
```

#### Example

```python
# Agent subscribes to topics
context.register_agent_topics("SalesAgent", ["sales", "customers", "leads"])
```

### get_topics_for_agent()

Get all topics an agent is subscribed to.

```python
def get_topics_for_agent(self, agent_name: str) -> List[str]
```

### get_subscribers_for_topic()

Get all agents subscribed to a specific topic.

```python
def get_subscribers_for_topic(self, topic: str) -> List[str]
```

### get_all_topics()

Get all available topics in the system.

```python
def get_all_topics(self) -> List[str]
```

### unsubscribe_from_topics()

Unsubscribe an agent from specific topics.

```python
def unsubscribe_from_topics(self, agent_name: str, topics: List[str]) -> None
```

### delete_topic()

Delete a topic and all associated context.

```python
def delete_topic(self, topic: str) -> int
```

!!! warning "Destructive Operation"
    This permanently removes the topic, unsubscribes all agents, and deletes associated context items.

#### Returns

Number of context items removed.

## Utility Methods

### remove()

Remove a specific context item.

```python
def remove(self, key: str) -> bool
```

#### Parameters

- **key** (str): The context key to remove

#### Returns

`True` if item was removed, `False` if it didn't exist.

### clear()

Remove all context items (respects user isolation).

```python
def clear(self) -> None
```

### cleanup_expired()

Manually remove expired context items.

```python
def cleanup_expired(self) -> int
```

#### Returns

Number of items removed.

### size()

Get the total number of context items.

```python
def size(self) -> int
```

### get_stats()

Get detailed statistics about the context mesh.

```python
def get_stats(self) -> Dict[str, Any]
```

#### Returns

Dictionary with statistics:

- `total_items`: Total number of context items
- `active_items`: Non-expired items
- `expired_items`: Expired items awaiting cleanup
- `global_items`: Items accessible to all agents
- `private_items`: Items with restricted access
- `total_topics`: Number of active topics
- `agents_with_topics`: Number of agents with topic subscriptions

#### Example

```python
stats = context.get_stats()
print(f"Active items: {stats['active_items']}")
print(f"Topics: {stats['total_topics']}")
```

### get_available_keys_by_topic()

Get context keys available to an agent organized by topic.

```python
def get_available_keys_by_topic(self, agent_name: str) -> Dict[str, List[str]]
```

#### Parameters

- **agent_name** (str): Name of the requesting agent

#### Returns

Dictionary mapping topic names to lists of available context keys.

#### Example

```python
# Get context keys organized by topic
topic_keys = context.get_available_keys_by_topic("SalesAgent")
for topic, keys in topic_keys.items():
    print(f"Topic '{topic}': {keys}")
```

## Agent Permissions

### set_agent_post_permissions()

Set which topics an agent can post to.

```python
def set_agent_post_permissions(self, agent_name: str, allowed_topics: List[str]) -> None
```

#### Example

```python
# Allow agent to post to specific topics
context.set_agent_post_permissions("SalesAgent", ["sales", "leads"])
```

### get_agent_post_permissions()

Get topics an agent can post to.

```python
def get_agent_post_permissions(self, agent_name: str) -> List[str]
```

### can_agent_post_to_topic()

Check if an agent can post to a specific topic.

```python
def can_agent_post_to_topic(self, agent_name: str, topic: str) -> bool
```

## Context Manager Support

ContextMesh supports Python's context manager protocol for automatic cleanup:

```python
with ContextMesh(user_id="user123") as context:
    context.push("data", "value")
    # Automatically closes database connection when done
```

## Thread Safety

ContextMesh is fully thread-safe and can be safely used in multi-threaded applications:

```python
import threading
from syntha import ContextMesh

context = ContextMesh(user_id="user123")

def worker():
    context.push(f"thread_{threading.current_thread().name}", "data")

# Safe to use from multiple threads
threads = [threading.Thread(target=worker) for _ in range(5)]
for t in threads:
    t.start()
```

## Error Handling

ContextMesh methods raise specific exceptions for different error conditions:

```python
from syntha import SynthaContextError, SynthaValidationError

try:
    # This will raise SynthaValidationError
    context.push("key", "value", subscribers=["agent1"], topics=["topic1"])
except SynthaValidationError as e:
    print(f"Validation error: {e}")
```

---

**Next**: Learn about [Tools API](tools.md) for agent integration