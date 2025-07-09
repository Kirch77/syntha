# Context Management Tutorial

Learn how to effectively manage shared context and data between agents in your multi-agent system.

## Overview

Context management is the foundation of multi-agent collaboration in Syntha. The ContextMesh provides a shared knowledge space where agents can:

- Store and retrieve shared data
- Control access to sensitive information
- Set automatic expiration for time-sensitive data
- Optimize performance with indexing
- Maintain data consistency across agents

## Basic Context Operations

### Storing Context Data

```python
from syntha import ContextMesh, ToolHandler

# Initialize the context system
mesh = ContextMesh()
handler = ToolHandler(mesh)

# Store global context (accessible to all agents)
handler.handle_tool_call(
    "push_context",
    agent_name="DataCollector",
    key="system_status",
    value={"status": "operational", "uptime": "99.9%"}
)

# Store context with access control
handler.handle_tool_call(
    "push_context",
    agent_name="DataCollector",
    key="user_metrics",
    value={"daily_users": 1500, "revenue": 50000},
    subscribers=["AnalyticsAgent", "ReportGenerator"]
)
```

### Retrieving Context Data

```python
# Get context data
user_metrics = handler.handle_tool_call(
    "get_context",
    agent_name="AnalyticsAgent",
    key="user_metrics"
)

print(f"Daily users: {user_metrics['value']['daily_users']}")

# List available context keys
available_keys = handler.handle_tool_call(
    "list_context_keys",
    agent_name="AnalyticsAgent",
    pattern="user_*"  # Filter keys starting with "user_"
)

print(f"Available user data: {available_keys['keys']}")
```

## Access Control and Security

### Subscriber-Based Access Control

```python
# Store sensitive data with restricted access
handler.handle_tool_call(
    "push_context",
    agent_name="SecurityManager",
    key="api_credentials",
    value={"api_key": "secret_key_123", "endpoint": "https://api.example.com"},
    subscribers=["APIClient", "AuthenticationAgent"]  # Only these agents can access
)

# Attempt to access restricted data
try:
    credentials = handler.handle_tool_call(
        "get_context",
        agent_name="UnauthorizedAgent",
        key="api_credentials"
    )
except PermissionError:
    print("Access denied - agent not in subscribers list")
```

### Role-Based Context Organization

```python
class ContextRoles:
    def __init__(self, handler):
        self.handler = handler

    def store_admin_data(self, agent_name, key, value):
        """Store data accessible only to admin agents"""
        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"admin.{key}",
            value=value,
            subscribers=["AdminAgent", "SupervisorAgent", "SystemManager"]
        )

    def store_user_data(self, agent_name, key, value):
        """Store data accessible to user-facing agents"""
        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"user.{key}",
            value=value,
            subscribers=["UserAgent", "SupportAgent", "ChatBot"]
        )

    def store_public_data(self, agent_name, key, value):
        """Store globally accessible data"""
        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"public.{key}",
            value=value
            # No subscribers = global access
        )
```

## Time-Based Context Management

### Setting Time-To-Live (TTL)

```python
# Store temporary data that expires in 1 hour
handler.handle_tool_call(
    "push_context",
    agent_name="SessionManager",
    key="user_session_12345",
    value={"user_id": 12345, "login_time": "2024-01-01T10:00:00Z"},
    ttl=3600  # Expires in 1 hour
)

# Store cache data with shorter TTL
handler.handle_tool_call(
    "push_context",
    agent_name="CacheManager",
    key="api_response_cache",
    value={"data": "cached_response", "timestamp": "2024-01-01T10:00:00Z"},
    ttl=300  # Expires in 5 minutes
)
```

### Working with Expiring Data

```python
def get_or_refresh_cache(handler, agent_name, cache_key, refresh_function):
    """Get cached data or refresh if expired"""
    try:
        cached_data = handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key=cache_key
        )
        return cached_data["value"]
    except KeyError:
        # Cache expired or doesn't exist, refresh
        fresh_data = refresh_function()
        handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=cache_key,
            value=fresh_data,
            ttl=600  # Cache for 10 minutes
        )
        return fresh_data
```

## Performance Optimization

### Using Indexing

```python
# Enable indexing for better performance
mesh = ContextMesh(enable_indexing=True)
handler = ToolHandler(mesh)

# Store frequently accessed data
for i in range(1000):
    handler.handle_tool_call(
        "push_context",
        agent_name="DataLoader",
        key=f"user_{i}",
        value={"id": i, "name": f"User{i}", "active": True}
    )

# Fast retrieval with indexing
user_data = handler.handle_tool_call(
    "get_context",
    agent_name="UserService",
    key="user_500"
)
```

### Batch Operations

```python
# Perform multiple context operations atomically
batch_result = handler.handle_tool_call(
    "batch_context_operation",
    agent_name="DataProcessor",
    operations=[
        {"type": "push", "key": "processed_count", "value": 1000},
        {"type": "push", "key": "error_count", "value": 5},
        {"type": "push", "key": "success_rate", "value": 0.995},
        {"type": "get", "key": "previous_stats"}
    ],
    atomic=True  # All operations succeed or all fail
)

print(f"Batch operation results: {batch_result}")
```

## Data Patterns and Organization

### Hierarchical Context Keys

```python
# Organize context with hierarchical keys
class ContextHierarchy:
    def __init__(self, handler):
        self.handler = handler

    def store_user_profile(self, agent_name, user_id, profile_data):
        """Store user profile data"""
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"users.{user_id}.profile",
            value=profile_data
        )

    def store_user_preferences(self, agent_name, user_id, preferences):
        """Store user preferences"""
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"users.{user_id}.preferences",
            value=preferences
        )

    def store_user_activity(self, agent_name, user_id, activity_data):
        """Store user activity data"""
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"users.{user_id}.activity",
            value=activity_data,
            ttl=86400  # Expire daily activity after 24 hours
        )

    def get_all_user_data(self, agent_name, user_id):
        """Get all data for a user"""
        keys = self.handler.handle_tool_call(
            "list_context_keys",
            agent_name=agent_name,
            pattern=f"users.{user_id}.*"
        )

        user_data = {}
        for key in keys["keys"]:
            data = self.handler.handle_tool_call(
                "get_context",
                agent_name=agent_name,
                key=key
            )
            user_data[key] = data["value"]

        return user_data
```

### Event-Driven Context Updates

```python
class EventDrivenContext:
    def __init__(self, handler):
        self.handler = handler
        self.event_handlers = {}

    def register_event_handler(self, event_type, handler_func):
        """Register a handler for context events"""
        if event_type not in self.event_handlers:
            self.event_handlers[event_type] = []
        self.event_handlers[event_type].append(handler_func)

    def trigger_event(self, event_type, agent_name, data):
        """Trigger an event and update context"""
        # Store event data
        event_key = f"events.{event_type}.{int(time.time())}"
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=event_key,
            value={"type": event_type, "data": data, "timestamp": time.time()},
            ttl=3600  # Events expire after 1 hour
        )

        # Notify registered handlers
        for handler_func in self.event_handlers.get(event_type, []):
            handler_func(agent_name, data)

    def handle_user_login(self, agent_name, user_data):
        """Handle user login event"""
        # Update active users count
        active_users = self.handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key="stats.active_users"
        ).get("value", 0)

        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key="stats.active_users",
            value=active_users + 1
        )

        # Store user session
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"sessions.{user_data['user_id']}",
            value={"login_time": time.time(), "user_data": user_data},
            ttl=7200  # Session expires in 2 hours
        )
```

## Advanced Context Patterns

### Context Versioning

```python
class VersionedContext:
    def __init__(self, handler):
        self.handler = handler

    def store_versioned_data(self, agent_name, key, value, version=None):
        """Store data with versioning"""
        if version is None:
            version = int(time.time())

        # Store current version
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"{key}.current",
            value={"version": version, "data": value}
        )

        # Store versioned data
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"{key}.v{version}",
            value=value,
            ttl=86400  # Keep versions for 24 hours
        )

        return version

    def get_versioned_data(self, agent_name, key, version=None):
        """Get data by version"""
        if version is None:
            # Get current version
            current = self.handler.handle_tool_call(
                "get_context",
                agent_name=agent_name,
                key=f"{key}.current"
            )
            return current["value"]["data"]
        else:
            # Get specific version
            versioned = self.handler.handle_tool_call(
                "get_context",
                agent_name=agent_name,
                key=f"{key}.v{version}"
            )
            return versioned["value"]
```

### Context Synchronization

```python
class ContextSynchronizer:
    def __init__(self, handler):
        self.handler = handler

    def sync_context_across_agents(self, source_agent, target_agents, key_patterns):
        """Synchronize context data across multiple agents"""

        # Get source data
        source_keys = self.handler.handle_tool_call(
            "list_context_keys",
            agent_name=source_agent,
            pattern="*"
        )

        sync_data = {}
        for key in source_keys["keys"]:
            if any(pattern in key for pattern in key_patterns):
                data = self.handler.handle_tool_call(
                    "get_context",
                    agent_name=source_agent,
                    key=key
                )
                sync_data[key] = data["value"]

        # Sync to target agents
        for target_agent in target_agents:
            operations = []
            for key, value in sync_data.items():
                operations.append({
                    "type": "push",
                    "key": key,
                    "value": value
                })

            self.handler.handle_tool_call(
                "batch_context_operation",
                agent_name=target_agent,
                operations=operations,
                atomic=True
            )
```

## Practical Examples

### E-commerce System Context

```python
class EcommerceContext:
    def __init__(self):
        self.mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
        self.handler = ToolHandler(self.mesh)

    def setup_product_catalog(self, agent_name, products):
        """Set up product catalog in context"""
        for product in products:
            self.handler.handle_tool_call(
                "push_context",
                agent_name=agent_name,
                key=f"products.{product['id']}",
                value=product,
                subscribers=["ProductService", "SearchAgent", "RecommendationEngine"]
            )

    def update_inventory(self, agent_name, product_id, stock_level):
        """Update product inventory"""
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"inventory.{product_id}",
            value={"stock": stock_level, "last_updated": time.time()},
            subscribers=["InventoryManager", "OrderProcessor"]
        )

    def store_user_cart(self, agent_name, user_id, cart_items):
        """Store user shopping cart"""
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"carts.{user_id}",
            value={"items": cart_items, "updated": time.time()},
            ttl=3600,  # Cart expires in 1 hour
            subscribers=[f"UserSession_{user_id}", "CheckoutService"]
        )

    def process_order(self, agent_name, order_data):
        """Process a new order"""
        order_id = order_data["order_id"]

        # Store order
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"orders.{order_id}",
            value=order_data,
            subscribers=["OrderProcessor", "PaymentService", "ShippingService"]
        )

        # Update order status
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"order_status.{order_id}",
            value={"status": "processing", "updated": time.time()}
        )
```

### Monitoring and Analytics Context

```python
class MonitoringContext:
    def __init__(self):
        self.mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
        self.handler = ToolHandler(self.mesh)

    def store_system_metrics(self, agent_name, metrics):
        """Store system performance metrics"""
        timestamp = int(time.time())

        # Store current metrics
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key="system.current_metrics",
            value=metrics,
            ttl=300  # Refresh every 5 minutes
        )

        # Store historical data
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"system.metrics.{timestamp}",
            value=metrics,
            ttl=86400  # Keep for 24 hours
        )

    def check_alerts(self, agent_name, thresholds):
        """Check metrics against alert thresholds"""
        current_metrics = self.handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key="system.current_metrics"
        )

        alerts = []
        for metric, value in current_metrics["value"].items():
            if metric in thresholds and value > thresholds[metric]:
                alerts.append({
                    "metric": metric,
                    "value": value,
                    "threshold": thresholds[metric],
                    "timestamp": time.time()
                })

        if alerts:
            self.handler.handle_tool_call(
                "push_context",
                agent_name=agent_name,
                key="system.active_alerts",
                value=alerts,
                subscribers=["AlertManager", "NotificationService"]
            )

        return alerts

    def generate_report(self, agent_name, time_range):
        """Generate performance report"""
        # Get historical metrics
        metric_keys = self.handler.handle_tool_call(
            "list_context_keys",
            agent_name=agent_name,
            pattern="system.metrics.*"
        )

        report_data = []
        for key in metric_keys["keys"]:
            # Extract timestamp from key
            timestamp = int(key.split(".")[-1])
            if time_range[0] <= timestamp <= time_range[1]:
                metrics = self.handler.handle_tool_call(
                    "get_context",
                    agent_name=agent_name,
                    key=key
                )
                report_data.append({
                    "timestamp": timestamp,
                    "metrics": metrics["value"]
                })

        # Store report
        self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"reports.{int(time.time())}",
            value={"data": report_data, "generated": time.time()},
            ttl=604800  # Keep reports for 1 week
        )

        return report_data
```

## Best Practices

### 1. Context Key Naming

```python
# Use hierarchical naming
"users.12345.profile"
"orders.order_123.status"
"system.metrics.cpu_usage"

# Include timestamps for time-series data
"events.user_login.1704067200"
"metrics.hourly.1704067200"

# Use prefixes for categorization
"cache.api_response.endpoint_1"
"temp.session.user_456"
"config.feature_flags.new_ui"
```

### 2. Error Handling

```python
def safe_context_operation(handler, operation, agent_name, key, value=None, **kwargs):
    """Safely perform context operations with error handling"""
    try:
        if operation == "get":
            return handler.handle_tool_call("get_context", agent_name=agent_name, key=key)
        elif operation == "push":
            return handler.handle_tool_call("push_context", agent_name=agent_name, key=key, value=value, **kwargs)
        elif operation == "list":
            return handler.handle_tool_call("list_context_keys", agent_name=agent_name, **kwargs)
    except KeyError:
        return {"error": "Key not found", "key": key}
    except PermissionError:
        return {"error": "Access denied", "agent": agent_name, "key": key}
    except Exception as e:
        return {"error": str(e), "operation": operation}
```

### 3. Memory Management

```python
# Enable auto-cleanup
mesh = ContextMesh(auto_cleanup=True)

# Use appropriate TTL values
SHORT_TTL = 300      # 5 minutes - for cache data
MEDIUM_TTL = 3600    # 1 hour - for session data
LONG_TTL = 86400     # 24 hours - for daily data

# Clean up expired data manually if needed
def cleanup_expired_context(handler, agent_name, pattern):
    """Remove expired context data"""
    keys = handler.handle_tool_call(
        "list_context_keys",
        agent_name=agent_name,
        pattern=pattern
    )

    for key in keys["keys"]:
        try:
            handler.handle_tool_call("get_context", agent_name=agent_name, key=key)
        except KeyError:
            # Key has expired and been cleaned up
            pass
```

## Integration with Agent Communication

Context and messaging work together for comprehensive agent coordination:

```python
# Agent stores processing result in context
handler.handle_tool_call(
    "push_context",
    agent_name="ProcessingAgent",
    key="processing_results",
    value={"status": "completed", "items_processed": 1000},
    subscribers=["ReportingAgent", "MonitoringAgent"]
)

# Agent notifies others about the update
handler.handle_tool_call(
    "broadcast_message_to_agents",
    from_agent="ProcessingAgent",
    to_agents=["ReportingAgent", "MonitoringAgent"],
    message="Processing completed. Results available in context key: processing_results",
    message_type="result",
    priority="normal"
)
```

## Next Steps

- Learn about [Agent Communication](agent-communication.md) for inter-agent messaging
- Explore [LLM Integration](llm-integration.md) for framework-specific patterns
- Check out [Performance Optimization](../guides/performance.md) for production tuning

## See Also

- [ContextMesh API](../api/context-mesh.md) - Complete API reference
- [Best Practices](../guides/best-practices.md) - Production deployment patterns
- [Examples](../examples/) - Real-world implementation examples
