# Best Practices Guide

Production-ready patterns and guidelines for building robust multi-agent systems with Syntha.

## Overview

This guide covers essential best practices for:

- **System Architecture**: Designing scalable multi-agent systems
- **Performance Optimization**: Maximizing throughput and minimizing latency
- **Security Implementation**: Protecting data and ensuring secure communication
- **Error Handling**: Building resilient systems that gracefully handle failures
- **Monitoring & Observability**: Tracking system health and performance
- **Development Workflow**: Efficient development and deployment practices

## System Architecture Best Practices

### 1. Agent Design Patterns

#### Single Responsibility Principle

```python
# Good: Focused, single-purpose agents
class UserProfileAgent:
    """Handles only user profile operations"""
    def __init__(self, handler):
        self.handler = handler

    def get_profile(self, user_id):
        return self.handler.handle_tool_call(
            "get_context",
            agent_name="UserProfileAgent",
            key=f"profiles.{user_id}"
        )

    def update_profile(self, user_id, updates):
        # Profile-specific logic only
        pass

# Avoid: Overly broad, multi-purpose agents
class UserEverythingAgent:  # Anti-pattern
    """Handles profiles, orders, billing, support, etc."""
    pass
```

#### Clear Agent Boundaries

```python
class EcommerceAgentSystem:
    """Well-defined agent boundaries"""

    def __init__(self):
        self.mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
        self.handler = ToolHandler(self.mesh)

        # Each agent has clear responsibilities
        self.agents = {
            "catalog": ProductCatalogAgent(self.handler),      # Product data
            "inventory": InventoryAgent(self.handler),         # Stock levels
            "orders": OrderProcessingAgent(self.handler),      # Order lifecycle
            "payments": PaymentAgent(self.handler),            # Payment processing
            "shipping": ShippingAgent(self.handler),           # Fulfillment
            "support": CustomerServiceAgent(self.handler),     # Customer support
            "analytics": AnalyticsAgent(self.handler)          # Business intelligence
        }

    def route_request(self, request_type, **kwargs):
        """Route requests to appropriate agents"""
        routing_map = {
            "product_search": "catalog",
            "check_inventory": "inventory",
            "create_order": "orders",
            "process_payment": "payments",
            "track_shipment": "shipping",
            "customer_inquiry": "support",
            "generate_report": "analytics"
        }

        agent_name = routing_map.get(request_type)
        if not agent_name:
            raise ValueError(f"Unknown request type: {request_type}")

        return self.agents[agent_name].handle_request(**kwargs)
```

### 2. Context Organization

#### Hierarchical Context Keys

```python
# Good: Organized, hierarchical structure
class ContextKeyManager:
    """Standardized context key patterns"""

    @staticmethod
    def user_key(user_id, data_type):
        return f"users.{user_id}.{data_type}"

    @staticmethod
    def order_key(order_id, data_type="details"):
        return f"orders.{order_id}.{data_type}"

    @staticmethod
    def product_key(product_id, data_type="details"):
        return f"products.{product_id}.{data_type}"

    @staticmethod
    def system_key(component, metric):
        return f"system.{component}.{metric}"

    @staticmethod
    def cache_key(category, identifier):
        return f"cache.{category}.{identifier}"

# Usage
keys = ContextKeyManager()
profile_key = keys.user_key("12345", "profile")        # "users.12345.profile"
order_key = keys.order_key("ORDER_123", "status")      # "orders.ORDER_123.status"
metric_key = keys.system_key("api", "response_time")   # "system.api.response_time"
```

#### Data Lifecycle Management

```python
class DataLifecycleManager:
    """Manage data lifecycle with appropriate TTLs"""

    def __init__(self, handler):
        self.handler = handler
        self.ttl_policies = {
            "session": 3600,          # 1 hour
            "cache": 1800,            # 30 minutes
            "temporary": 300,         # 5 minutes
            "daily": 86400,           # 24 hours
            "permanent": None         # No expiration
        }

    def store_with_lifecycle(self, agent_name, key, value, lifecycle_type, subscribers=None):
        """Store data with appropriate lifecycle policy"""
        ttl = self.ttl_policies.get(lifecycle_type)

        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=key,
            value=value,
            subscribers=subscribers,
            ttl=ttl
        )

    def store_user_session(self, agent_name, user_id, session_data):
        """Store user session with appropriate TTL"""
        return self.store_with_lifecycle(
            agent_name=agent_name,
            key=f"sessions.{user_id}",
            value=session_data,
            lifecycle_type="session"
        )

    def store_cache_data(self, agent_name, cache_key, data):
        """Store cache data with short TTL"""
        return self.store_with_lifecycle(
            agent_name=agent_name,
            key=f"cache.{cache_key}",
            value=data,
            lifecycle_type="cache"
        )
```

## Performance Best Practices

### 1. Efficient Context Operations

#### Batch Operations for Bulk Changes

```python
def efficient_bulk_update(handler, agent_name, updates):
    """Use batch operations for multiple context changes"""

    # Good: Single batch operation
    operations = []
    for key, value in updates.items():
        operations.append({
            "type": "push",
            "key": key,
            "value": value
        })

    return handler.handle_tool_call(
        "batch_context_operation",
        agent_name=agent_name,
        operations=operations,
        atomic=True
    )

# Avoid: Multiple individual operations
def inefficient_bulk_update(handler, agent_name, updates):
    """Anti-pattern: Individual operations"""
    results = []
    for key, value in updates.items():
        result = handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=key,
            value=value
        )
        results.append(result)
    return results
```

#### Smart Context Retrieval

```python
class SmartContextRetriever:
    """Efficient context retrieval patterns"""

    def __init__(self, handler):
        self.handler = handler
        self.cache = {}
        self.cache_ttl = 300  # 5 minutes

    def get_with_cache(self, agent_name, key, use_cache=True):
        """Retrieve context with optional caching"""
        cache_key = f"{agent_name}:{key}"
        current_time = time.time()

        # Check cache first
        if use_cache and cache_key in self.cache:
            cached_data, timestamp = self.cache[cache_key]
            if current_time - timestamp < self.cache_ttl:
                return cached_data

        # Fetch from context mesh
        result = self.handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key=key
        )

        # Update cache
        if use_cache:
            self.cache[cache_key] = (result, current_time)

        return result

    def get_multiple_keys(self, agent_name, keys):
        """Efficiently retrieve multiple keys"""
        # Use list_context_keys to get available keys first
        available_keys = self.handler.handle_tool_call(
            "list_context_keys",
            agent_name=agent_name,
            pattern="*"
        )["keys"]

        # Filter to only requested keys that exist
        existing_keys = [key for key in keys if key in available_keys]

        # Batch retrieve existing keys
        operations = [{"type": "get", "key": key} for key in existing_keys]

        if operations:
            results = self.handler.handle_tool_call(
                "batch_context_operation",
                agent_name=agent_name,
                operations=operations
            )
            return {key: result for key, result in zip(existing_keys, results["results"])}

        return {}
```

### 2. Message Optimization

#### Message Batching and Prioritization

```python
class MessageOptimizer:
    """Optimize agent communication patterns"""

    def __init__(self, handler):
        self.handler = handler
        self.message_queue = []
        self.batch_size = 10
        self.batch_interval = 5  # seconds

    def queue_message(self, from_agent, to_agent, message, priority="normal", **kwargs):
        """Queue message for batch sending"""
        self.message_queue.append({
            "from_agent": from_agent,
            "to_agent": to_agent,
            "message": message,
            "priority": priority,
            "timestamp": time.time(),
            **kwargs
        })

        # Send batch if queue is full or high priority
        if len(self.message_queue) >= self.batch_size or priority == "urgent":
            self.flush_message_queue()

    def flush_message_queue(self):
        """Send all queued messages"""
        if not self.message_queue:
            return

        # Sort by priority and timestamp
        priority_order = {"urgent": 0, "high": 1, "normal": 2, "low": 3}
        self.message_queue.sort(
            key=lambda msg: (priority_order.get(msg["priority"], 2), msg["timestamp"])
        )

        # Send messages
        for msg in self.message_queue:
            try:
                self.handler.handle_tool_call("send_message_to_agent", **msg)
            except Exception as e:
                print(f"Failed to send message: {e}")

        # Clear queue
        self.message_queue.clear()

    def broadcast_efficiently(self, from_agent, to_agents, message, **kwargs):
        """Efficient broadcasting to multiple agents"""

        # Use single broadcast instead of multiple individual messages
        return self.handler.handle_tool_call(
            "broadcast_message_to_agents",
            from_agent=from_agent,
            to_agents=to_agents,
            message=message,
            **kwargs
        )
```

## Error Handling Best Practices

### 1. Graceful Degradation

```python
class ResilientAgent:
    """Agent with robust error handling"""

    def __init__(self, handler, agent_name):
        self.handler = handler
        self.agent_name = agent_name
        self.fallback_data = {}
        self.circuit_breaker = CircuitBreaker()

    def get_context_with_fallback(self, key, fallback_value=None):
        """Get context with fallback handling"""
        try:
            if self.circuit_breaker.can_execute():
                result = self.handler.handle_tool_call(
                    "get_context",
                    agent_name=self.agent_name,
                    key=key
                )
                self.circuit_breaker.record_success()
                return result["value"]

        except KeyError:
            # Key doesn't exist
            if fallback_value is not None:
                return fallback_value
            raise

        except Exception as e:
            self.circuit_breaker.record_failure()

            # Use cached fallback if available
            if key in self.fallback_data:
                print(f"Using fallback data for {key}: {e}")
                return self.fallback_data[key]

            # Use provided fallback
            if fallback_value is not None:
                return fallback_value

            raise

    def update_fallback_data(self, key, value):
        """Update fallback data cache"""
        self.fallback_data[key] = value

class CircuitBreaker:
    """Simple circuit breaker implementation"""

    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "closed"  # closed, open, half-open

    def can_execute(self):
        """Check if operation can be executed"""
        if self.state == "closed":
            return True

        if self.state == "open":
            if time.time() - self.last_failure_time > self.timeout:
                self.state = "half-open"
                return True
            return False

        # half-open state
        return True

    def record_success(self):
        """Record successful operation"""
        self.failure_count = 0
        self.state = "closed"

    def record_failure(self):
        """Record failed operation"""
        self.failure_count += 1
        self.last_failure_time = time.time()

        if self.failure_count >= self.failure_threshold:
            self.state = "open"
```

### 2. Comprehensive Error Handling

```python
class ErrorHandler:
    """Centralized error handling for multi-agent systems"""

    def __init__(self, handler):
        self.handler = handler
        self.error_patterns = {
            "timeout": self.handle_timeout_error,
            "permission": self.handle_permission_error,
            "not_found": self.handle_not_found_error,
            "network": self.handle_network_error
        }

    def handle_tool_call_safely(self, tool_name, max_retries=3, **kwargs):
        """Execute tool call with comprehensive error handling"""

        for attempt in range(max_retries + 1):
            try:
                return self.handler.handle_tool_call(tool_name, **kwargs)

            except PermissionError as e:
                return self.handle_permission_error(e, tool_name, kwargs)

            except KeyError as e:
                return self.handle_not_found_error(e, tool_name, kwargs)

            except TimeoutError as e:
                if attempt < max_retries:
                    time.sleep(2 ** attempt)  # Exponential backoff
                    continue
                return self.handle_timeout_error(e, tool_name, kwargs)

            except Exception as e:
                if attempt < max_retries and self.is_retryable_error(e):
                    time.sleep(2 ** attempt)
                    continue
                return self.handle_generic_error(e, tool_name, kwargs)

    def handle_permission_error(self, error, tool_name, kwargs):
        """Handle permission denied errors"""
        agent_name = kwargs.get("agent_name", "unknown")

        # Log security incident
        self.log_security_incident(agent_name, tool_name, str(error))

        return {
            "error": "access_denied",
            "message": "Agent does not have permission for this operation",
            "agent": agent_name,
            "tool": tool_name
        }

    def handle_not_found_error(self, error, tool_name, kwargs):
        """Handle missing data errors"""
        key = kwargs.get("key", "unknown")

        return {
            "error": "not_found",
            "message": f"Requested data not found: {key}",
            "key": key,
            "tool": tool_name,
            "suggestions": self.get_similar_keys(key, kwargs.get("agent_name"))
        }

    def handle_timeout_error(self, error, tool_name, kwargs):
        """Handle timeout errors"""
        return {
            "error": "timeout",
            "message": "Operation timed out",
            "tool": tool_name,
            "retry_after": 30
        }

    def is_retryable_error(self, error):
        """Determine if error is retryable"""
        retryable_errors = [
            "ConnectionError",
            "TimeoutError",
            "TemporaryFailure"
        ]
        return type(error).__name__ in retryable_errors

    def log_security_incident(self, agent_name, tool_name, error_message):
        """Log security-related incidents"""
        try:
            self.handler.handle_tool_call(
                "push_context",
                agent_name="SecurityLogger",
                key=f"incidents.{int(time.time())}",
                value={
                    "timestamp": datetime.now().isoformat(),
                    "agent": agent_name,
                    "tool": tool_name,
                    "error": error_message,
                    "type": "permission_denied"
                },
                ttl=86400  # Keep for 24 hours
            )
        except Exception:
            # Don't fail if logging fails
            pass
```

## Monitoring and Observability

### 1. Health Monitoring

```python
class SystemHealthMonitor:
    """Monitor system health and performance"""

    def __init__(self, handler):
        self.handler = handler
        self.metrics = {}
        self.alert_thresholds = {
            "response_time": 1.0,        # 1 second
            "error_rate": 0.05,          # 5%
            "memory_usage": 0.8,         # 80%
            "message_queue_size": 1000   # 1000 messages
        }

    def record_metric(self, metric_name, value, tags=None):
        """Record a metric value"""
        timestamp = time.time()

        if metric_name not in self.metrics:
            self.metrics[metric_name] = []

        self.metrics[metric_name].append({
            "value": value,
            "timestamp": timestamp,
            "tags": tags or {}
        })

        # Check thresholds
        if metric_name in self.alert_thresholds:
            if value > self.alert_thresholds[metric_name]:
                self.send_alert(metric_name, value)

        # Store in context for persistence
        self.handler.handle_tool_call(
            "push_context",
            agent_name="HealthMonitor",
            key=f"metrics.{metric_name}.{int(timestamp)}",
            value={"value": value, "tags": tags or {}},
            ttl=3600  # Keep for 1 hour
        )

    def get_metric_summary(self, metric_name, time_window=300):
        """Get metric summary for time window"""
        current_time = time.time()
        start_time = current_time - time_window

        if metric_name not in self.metrics:
            return {"error": f"Metric {metric_name} not found"}

        # Filter metrics within time window
        recent_metrics = [
            m for m in self.metrics[metric_name]
            if m["timestamp"] >= start_time
        ]

        if not recent_metrics:
            return {"error": "No recent data"}

        values = [m["value"] for m in recent_metrics]

        return {
            "metric": metric_name,
            "count": len(values),
            "average": sum(values) / len(values),
            "min": min(values),
            "max": max(values),
            "latest": values[-1],
            "time_window": time_window
        }

    def send_alert(self, metric_name, value):
        """Send alert for threshold violation"""
        alert_message = f"ALERT: {metric_name} exceeded threshold. Current value: {value}, Threshold: {self.alert_thresholds[metric_name]}"

        self.handler.handle_tool_call(
            "broadcast_message_to_agents",
            from_agent="HealthMonitor",
            to_agents=["SystemAdmin", "AlertManager"],
            message=alert_message,
            message_type="error",
            priority="urgent"
        )

    def health_check(self):
        """Perform comprehensive health check"""
        health_status = {"status": "healthy", "checks": {}}

        # Check context mesh responsiveness
        try:
            start_time = time.time()
            self.handler.handle_tool_call(
                "get_context",
                agent_name="HealthMonitor",
                key="health_check_test"
            )
            response_time = time.time() - start_time

            health_status["checks"]["context_mesh"] = {
                "status": "ok" if response_time < 1.0 else "slow",
                "response_time": response_time
            }

        except Exception as e:
            health_status["status"] = "unhealthy"
            health_status["checks"]["context_mesh"] = {
                "status": "error",
                "error": str(e)
            }

        # Check message system
        try:
            self.handler.handle_tool_call(
                "send_message_to_agent",
                from_agent="HealthMonitor",
                to_agent="HealthMonitor",
                message="Health check test",
                message_type="info"
            )

            health_status["checks"]["messaging"] = {"status": "ok"}

        except Exception as e:
            health_status["status"] = "unhealthy"
            health_status["checks"]["messaging"] = {
                "status": "error",
                "error": str(e)
            }

        return health_status
```

### 2. Performance Monitoring

```python
class PerformanceMonitor:
    """Monitor and analyze system performance"""

    def __init__(self, handler):
        self.handler = handler
        self.operation_stats = {}

    def time_operation(self, operation_name):
        """Context manager for timing operations"""
        return OperationTimer(self, operation_name)

    def record_operation(self, operation_name, duration, success=True, metadata=None):
        """Record operation performance"""
        if operation_name not in self.operation_stats:
            self.operation_stats[operation_name] = {
                "total_calls": 0,
                "total_duration": 0,
                "success_count": 0,
                "error_count": 0,
                "avg_duration": 0
            }

        stats = self.operation_stats[operation_name]
        stats["total_calls"] += 1
        stats["total_duration"] += duration

        if success:
            stats["success_count"] += 1
        else:
            stats["error_count"] += 1

        stats["avg_duration"] = stats["total_duration"] / stats["total_calls"]
        stats["success_rate"] = stats["success_count"] / stats["total_calls"]

        # Store detailed performance data
        self.handler.handle_tool_call(
            "push_context",
            agent_name="PerformanceMonitor",
            key=f"operations.{operation_name}.{int(time.time())}",
            value={
                "duration": duration,
                "success": success,
                "metadata": metadata or {},
                "timestamp": time.time()
            },
            ttl=3600  # Keep for 1 hour
        )

    def get_performance_report(self):
        """Generate performance report"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "operations": self.operation_stats.copy()
        }

        # Add system-wide metrics
        total_calls = sum(stats["total_calls"] for stats in self.operation_stats.values())
        total_errors = sum(stats["error_count"] for stats in self.operation_stats.values())

        report["summary"] = {
            "total_operations": total_calls,
            "total_errors": total_errors,
            "overall_error_rate": total_errors / total_calls if total_calls > 0 else 0,
            "slowest_operations": self.get_slowest_operations()
        }

        return report

    def get_slowest_operations(self, limit=5):
        """Get slowest operations"""
        sorted_ops = sorted(
            self.operation_stats.items(),
            key=lambda x: x[1]["avg_duration"],
            reverse=True
        )

        return [
            {"operation": name, "avg_duration": stats["avg_duration"]}
            for name, stats in sorted_ops[:limit]
        ]

class OperationTimer:
    """Context manager for timing operations"""

    def __init__(self, monitor, operation_name):
        self.monitor = monitor
        self.operation_name = operation_name
        self.start_time = None
        self.success = True
        self.metadata = {}

    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        duration = time.time() - self.start_time
        self.success = exc_type is None

        if exc_type:
            self.metadata["error"] = str(exc_val)

        self.monitor.record_operation(
            self.operation_name,
            duration,
            self.success,
            self.metadata
        )

    def add_metadata(self, key, value):
        """Add metadata to the operation"""
        self.metadata[key] = value

# Usage example
performance_monitor = PerformanceMonitor(handler)

with performance_monitor.time_operation("user_profile_lookup") as timer:
    timer.add_metadata("user_id", "12345")
    result = handler.handle_tool_call(
        "get_context",
        agent_name="UserAgent",
        key="users.12345.profile"
    )
```

## Development Workflow Best Practices

### 1. Testing Strategies

```python
import unittest
from unittest.mock import Mock, patch

class TestMultiAgentSystem(unittest.TestCase):
    """Test multi-agent system components"""

    def setUp(self):
        """Set up test environment"""
        self.mock_mesh = Mock()
        self.mock_handler = Mock()
        self.agent = UserProfileAgent(self.mock_handler)

    def test_get_profile_success(self):
        """Test successful profile retrieval"""
        # Mock successful response
        self.mock_handler.handle_tool_call.return_value = {
            "value": {"name": "John Doe", "email": "john@example.com"}
        }

        result = self.agent.get_profile("12345")

        # Verify correct tool call
        self.mock_handler.handle_tool_call.assert_called_with(
            "get_context",
            agent_name="UserProfileAgent",
            key="profiles.12345"
        )

        # Verify result
        self.assertEqual(result["value"]["name"], "John Doe")

    def test_get_profile_not_found(self):
        """Test profile not found scenario"""
        # Mock KeyError for missing profile
        self.mock_handler.handle_tool_call.side_effect = KeyError("Profile not found")

        with self.assertRaises(KeyError):
            self.agent.get_profile("nonexistent")

    @patch('time.time')
    def test_performance_monitoring(self, mock_time):
        """Test performance monitoring"""
        mock_time.side_effect = [1000.0, 1001.5]  # 1.5 second operation

        monitor = PerformanceMonitor(self.mock_handler)

        with monitor.time_operation("test_operation"):
            time.sleep(0.1)  # Simulate work

        # Verify performance was recorded
        stats = monitor.operation_stats["test_operation"]
        self.assertEqual(stats["total_calls"], 1)
        self.assertEqual(stats["avg_duration"], 1.5)

class IntegrationTest(unittest.TestCase):
    """Integration tests with real Syntha components"""

    def setUp(self):
        """Set up real Syntha environment for integration tests"""
        self.mesh = ContextMesh(enable_indexing=True)
        self.handler = ToolHandler(self.mesh)

    def test_agent_communication_flow(self):
        """Test complete agent communication flow"""
        # Agent 1 stores data
        self.handler.handle_tool_call(
            "push_context",
            agent_name="Agent1",
            key="test_data",
            value={"message": "Hello from Agent1"}
        )

        # Agent 1 sends message to Agent 2
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent="Agent1",
            to_agent="Agent2",
            message="Check the test_data context"
        )

        # Agent 2 receives message
        messages = self.handler.handle_tool_call(
            "get_messages_from_agents",
            agent_name="Agent2",
            unread_only=True
        )

        self.assertEqual(len(messages["messages"]), 1)
        self.assertEqual(messages["messages"][0]["from_agent"], "Agent1")

        # Agent 2 retrieves data
        data = self.handler.handle_tool_call(
            "get_context",
            agent_name="Agent2",
            key="test_data"
        )

        self.assertEqual(data["value"]["message"], "Hello from Agent1")
```

### 2. Configuration Management

```python
import os
from dataclasses import dataclass
from typing import Optional

@dataclass
class SynthaConfig:
    """Configuration for Syntha system"""

    # Performance settings
    enable_indexing: bool = True
    auto_cleanup: bool = True
    cleanup_interval: int = 300

    # Security settings
    enable_encryption: bool = False
    audit_logging: bool = True

    # Monitoring settings
    health_check_interval: int = 60
    metrics_retention: int = 3600

    # Development settings
    debug_mode: bool = False
    log_level: str = "INFO"

    @classmethod
    def from_environment(cls):
        """Create configuration from environment variables"""
        return cls(
            enable_indexing=os.getenv("SYNTHA_ENABLE_INDEXING", "true").lower() == "true",
            auto_cleanup=os.getenv("SYNTHA_AUTO_CLEANUP", "true").lower() == "true",
            cleanup_interval=int(os.getenv("SYNTHA_CLEANUP_INTERVAL", "300")),
            enable_encryption=os.getenv("SYNTHA_ENABLE_ENCRYPTION", "false").lower() == "true",
            audit_logging=os.getenv("SYNTHA_AUDIT_LOGGING", "true").lower() == "true",
            health_check_interval=int(os.getenv("SYNTHA_HEALTH_CHECK_INTERVAL", "60")),
            metrics_retention=int(os.getenv("SYNTHA_METRICS_RETENTION", "3600")),
            debug_mode=os.getenv("SYNTHA_DEBUG_MODE", "false").lower() == "true",
            log_level=os.getenv("SYNTHA_LOG_LEVEL", "INFO")
        )

    def validate(self):
        """Validate configuration values"""
        if self.cleanup_interval < 60:
            raise ValueError("Cleanup interval must be at least 60 seconds")

        if self.health_check_interval < 10:
            raise ValueError("Health check interval must be at least 10 seconds")

        if self.log_level not in ["DEBUG", "INFO", "WARNING", "ERROR"]:
            raise ValueError("Invalid log level")

def create_syntha_system(config: Optional[SynthaConfig] = None):
    """Factory function for creating configured Syntha system"""

    if config is None:
        config = SynthaConfig.from_environment()

    config.validate()

    # Create mesh with configuration
    mesh = ContextMesh(
        enable_indexing=config.enable_indexing,
        auto_cleanup=config.auto_cleanup,
        cleanup_interval=config.cleanup_interval
    )

    handler = ToolHandler(mesh, enable_logging=config.audit_logging)

    # Set up monitoring if enabled
    if config.health_check_interval > 0:
        health_monitor = SystemHealthMonitor(handler)
        performance_monitor = PerformanceMonitor(handler)

        return {
            "mesh": mesh,
            "handler": handler,
            "health_monitor": health_monitor,
            "performance_monitor": performance_monitor,
            "config": config
        }

    return {
        "mesh": mesh,
        "handler": handler,
        "config": config
    }
```

## Production Deployment Checklist

### Pre-Deployment Checklist

```python
def production_readiness_checklist():
    """Comprehensive production readiness checklist"""
    return {
        "performance": [
            "✓ Enable indexing for production workloads",
            "✓ Configure auto-cleanup to prevent memory leaks",
            "✓ Set appropriate TTL values for all data types",
            "✓ Implement connection pooling for high throughput",
            "✓ Use batch operations for bulk data changes",
            "✓ Configure proper cache strategies"
        ],
        "security": [
            "✓ Implement access control with subscribers",
            "✓ Enable encryption for sensitive data",
            "✓ Set up comprehensive audit logging",
            "✓ Configure role-based agent permissions",
            "✓ Use TTL for security-sensitive data",
            "✓ Regular security reviews and updates"
        ],
        "reliability": [
            "✓ Implement circuit breakers for external dependencies",
            "✓ Configure graceful degradation patterns",
            "✓ Set up comprehensive error handling",
            "✓ Implement retry logic with exponential backoff",
            "✓ Configure health checks and monitoring",
            "✓ Set up alerting for critical failures"
        ],
        "monitoring": [
            "✓ Deploy health monitoring systems",
            "✓ Configure performance metrics collection",
            "✓ Set up log aggregation and analysis",
            "✓ Configure alerting thresholds",
            "✓ Implement distributed tracing",
            "✓ Regular performance reviews"
        ],
        "scalability": [
            "✓ Design for horizontal scaling",
            "✓ Implement proper load balancing",
            "✓ Configure resource limits and quotas",
            "✓ Plan for data partitioning if needed",
            "✓ Test under expected load conditions",
            "✓ Plan capacity growth strategies"
        ]
    }
```

## Next Steps

- Implement [Performance Optimization](performance.md) techniques
- Review [Security Guide](security.md) for production security
- Check [Troubleshooting Guide](troubleshooting.md) for common issues
- Explore [Examples](../examples/) for real-world implementations

## See Also

- [API Reference](../api/) - Complete API documentation
- [Tutorials](../tutorials/) - Step-by-step implementation guides
- [Integration Guides](integrations/) - Framework-specific patterns
