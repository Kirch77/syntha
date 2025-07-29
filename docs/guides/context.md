# Context Management Guide

This guide covers advanced context management patterns, security best practices, and production-ready configurations. You'll learn how to build scalable multi-agent systems with proper isolation and access control.

## Topic-Based Routing: The Scalable Approach

Topic-based routing is Syntha's most powerful feature for coordinating multiple agents. Instead of manually specifying which agents should receive context, you broadcast to topics and let agents subscribe to what they need.

### Basic Topic Workflow

```python
from syntha import ContextMesh

context = ContextMesh(user_id="company_workspace")

# Step 1: Agents subscribe to topics they care about
context.register_agent_topics("SalesAgent", ["sales", "customers", "leads"])
context.register_agent_topics("SupportAgent", ["support", "customers", "issues"])
context.register_agent_topics("AnalyticsAgent", ["sales", "support", "analytics"])

# Step 2: Push context to topics (not specific agents)
context.push("new_customer", {
    "name": "Acme Corp",
    "industry": "Technology", 
    "value": 50000,
    "contact": "john@acme.com"
}, topics=["sales", "customers"])

# Step 3: Agents automatically receive relevant context
sales_context = context.get_all_for_agent("SalesAgent")
support_context = context.get_all_for_agent("SupportAgent")

print(f"Sales agent sees: {list(sales_context.keys())}")
print(f"Support agent sees: {list(support_context.keys())}")

context.close()
```

**Why this works better than direct targeting:**
- **Scalable:** Add new agents without changing existing code
- **Flexible:** Agents can subscribe/unsubscribe dynamically
- **Maintainable:** Clear separation of concerns by domain

### Dynamic Topic Management

Agents can change their subscriptions at runtime:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="dynamic_workspace")

# Initial subscription
context.register_agent_topics("FlexibleAgent", ["general"])

# Agent discovers it needs more specific information
context.register_agent_topics("FlexibleAgent", ["general", "sales", "analytics"])

# Later, agent focuses on just one area
context.register_agent_topics("FlexibleAgent", ["sales"])

# Remove specific topics while keeping others
current_topics = context.get_topics_for_agent("FlexibleAgent")
print(f"Current topics: {current_topics}")

# Unsubscribe from specific topics
context.unsubscribe_from_topics("FlexibleAgent", ["general"])

updated_topics = context.get_topics_for_agent("FlexibleAgent")
print(f"Updated topics: {updated_topics}")

context.close()
```

### Topic Discovery and Management

```python
from syntha import ContextMesh

context = ContextMesh(user_id="discovery_workspace")

# Set up some agents with different interests
context.register_agent_topics("Agent1", ["sales", "marketing"])
context.register_agent_topics("Agent2", ["sales", "support"])
context.register_agent_topics("Agent3", ["marketing", "analytics"])

# Discover what topics exist
all_topics = context.get_all_topics()
print(f"Available topics: {all_topics}")

# See who's subscribed to each topic
for topic in all_topics:
    subscribers = context.get_subscribers_for_topic(topic)
    print(f"Topic '{topic}' has subscribers: {subscribers}")

# Clean up a topic entirely (removes all context and subscriptions)
items_deleted = context.delete_topic("marketing")
print(f"Deleted {items_deleted} context items from 'marketing' topic")

context.close()
```

## User Isolation: Critical for Production Security

User isolation is not optional—it's a security requirement. Here's how to implement it correctly:

### The Security Problem

Without proper isolation, users can see each other's data:

```python
from syntha import ContextMesh

# ❌ DANGEROUS: No user isolation
shared_context = ContextMesh()  # No user_id!

# User A's agent pushes private data
shared_context.push("private_key", "user_a_secret_key")

# User B's agent can access User A's data!
stolen_key = shared_context.get("private_key", "user_b_agent")
print(f"User B stole: {stolen_key}")  # This should never happen!

shared_context.close()
```

### The Correct Approach

Always create separate context meshes for each user:

```python
from syntha import ContextMesh

# ✅ SECURE: Proper user isolation
def create_user_context(user_id: str) -> ContextMesh:
    return ContextMesh(
        user_id=user_id,
        enable_persistence=True,
        db_backend="sqlite",
        db_path=f"context_{user_id}.db"  # Separate database per user
    )

# User A's context
user_a_context = create_user_context("user_a")
user_a_context.push("private_data", "user_a_secret")

# User B's context  
user_b_context = create_user_context("user_b")
user_b_context.push("private_data", "user_b_secret")

# Each user can only see their own data
a_data = user_a_context.get("private_data", "agent")
b_data = user_b_context.get("private_data", "agent")

print(f"User A sees: {a_data}")  # user_a_secret
print(f"User B sees: {b_data}")  # user_b_secret

# Cross-contamination is impossible
b_cannot_see_a = user_b_context.get("private_data", "malicious_agent")
print(f"User B trying to access A's data: {b_cannot_see_a}")  # None

user_a_context.close()
user_b_context.close()
```

### Production User Management Pattern

Here's a production-ready pattern for managing user contexts:

```python
from syntha import ContextMesh
from typing import Dict
import threading

class UserContextManager:
    """Thread-safe manager for user-isolated context meshes."""
    
    def __init__(self, db_backend: str = "postgresql", **db_config):
        self._contexts: Dict[str, ContextMesh] = {}
        self._lock = threading.Lock()
        self.db_backend = db_backend
        self.db_config = db_config
    
    def get_context(self, user_id: str) -> ContextMesh:
        """Get or create a context mesh for a user."""
        if not user_id:
            raise ValueError("user_id is required for security")
            
        with self._lock:
            if user_id not in self._contexts:
                self._contexts[user_id] = ContextMesh(
                    user_id=user_id,
                    enable_persistence=True,
                    db_backend=self.db_backend,
                    **self.db_config
                )
            return self._contexts[user_id]
    
    def close_user_context(self, user_id: str):
        """Close and remove a user's context."""
        with self._lock:
            if user_id in self._contexts:
                self._contexts[user_id].close()
                del self._contexts[user_id]
    
    def close_all(self):
        """Close all user contexts."""
        with self._lock:
            for context in self._contexts.values():
                context.close()
            self._contexts.clear()

# Usage in your application
context_manager = UserContextManager(
    db_backend="postgresql",
    host="localhost",
    database="syntha_prod",
    user="syntha_user",
    password="secure_password"
)

def handle_user_request(user_id: str, agent_name: str):
    """Handle a request from a specific user."""
    user_context = context_manager.get_context(user_id)
    
    # Now you can safely work with user-isolated context
    user_context.push("last_request", "user made a request")
    return user_context.get_all_for_agent(agent_name)

# Example usage
user1_data = handle_user_request("user_123", "AssistantAgent")
user2_data = handle_user_request("user_456", "AssistantAgent")

# Clean up when done
context_manager.close_all()
```

## Advanced Persistence Configurations

### SQLite for Development

```python
from syntha import ContextMesh

# Simple file-based persistence
context = ContextMesh(
    user_id="dev_user",
    enable_persistence=True,
    db_backend="sqlite",
    db_path="development.db"
)

# Add some data
context.push("dev_config", {"debug": True, "log_level": "INFO"})

context.close()
```

### PostgreSQL for Production

```python
from syntha import ContextMesh

# Production-grade persistence
context = ContextMesh(
    user_id="prod_user",
    enable_persistence=True,
    db_backend="postgresql",
    host="db.company.com",
    port=5432,
    database="syntha_production",
    user="syntha_app",
    password="secure_password_from_env",
    # Additional PostgreSQL options
    sslmode="require",
    connect_timeout=10
)

# Production data with proper lifecycle
context.push("user_session", {
    "login_time": "2024-01-15T10:30:00Z",
    "permissions": ["read", "write"],
    "last_activity": "2024-01-15T11:45:00Z"
}, ttl=3600)  # 1 hour session

context.close()
```

### Connection Pooling and Performance

```python
from syntha import ContextMesh
import os

def create_production_context(user_id: str) -> ContextMesh:
    """Create a production-ready context with optimal settings."""
    return ContextMesh(
        user_id=user_id,
        enable_persistence=True,
        enable_indexing=True,      # Fast lookups
        auto_cleanup=True,         # Automatic TTL cleanup
        db_backend="postgresql",
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "5432")),
        database=os.getenv("DB_NAME", "syntha"),
        user=os.getenv("DB_USER", "syntha"),
        password=os.getenv("DB_PASSWORD"),
        # Performance settings
        pool_size=20,              # Connection pool size
        max_overflow=30,           # Additional connections
        pool_timeout=30,           # Connection timeout
        pool_recycle=3600         # Recycle connections hourly
    )

# Usage
context = create_production_context("user_123")
context.push("high_volume_data", {"metrics": "..."})
context.close()
```

## Context Lifecycle Best Practices

### TTL Strategies by Use Case

```python
from syntha import ContextMesh

context = ContextMesh(user_id="lifecycle_demo")

# Real-time status (very short TTL)
context.push("processing_status", "In progress...", ttl=30)  # 30 seconds

# Session data (medium TTL)
context.push("user_session", {
    "authenticated": True,
    "role": "user",
    "preferences": {"theme": "dark"}
}, ttl=3600)  # 1 hour

# Daily context (reset daily)
context.push("daily_quota", {"api_calls": 0, "limit": 1000}, ttl=86400)  # 24 hours

# Cached data (longer TTL)
context.push("user_profile_cache", {
    "name": "John Doe",
    "email": "john@example.com"
}, ttl=604800)  # 1 week

# Permanent configuration (no TTL)
context.push("app_config", {"version": "1.0", "features": ["chat", "files"]})

context.close()
```

### Cleanup and Maintenance

```python
from syntha import ContextMesh
import time

context = ContextMesh(user_id="maintenance_demo", auto_cleanup=True)

# Add some temporary data
for i in range(5):
    context.push(f"temp_item_{i}", f"data_{i}", ttl=2)  # 2 second TTL

print(f"Items before expiration: {context.size()}")

# Wait for expiration
time.sleep(3)

# Manual cleanup (automatic cleanup also runs periodically)
cleaned_count = context.cleanup_expired()
print(f"Cleaned up {cleaned_count} expired items")
print(f"Items after cleanup: {context.size()}")

# Get detailed statistics
stats = context.get_stats()
print(f"Context statistics: {stats}")

context.close()
```

## Performance Optimization

### Indexing for Fast Lookups

```python
from syntha import ContextMesh

# Enable indexing for better performance (default: True)
context = ContextMesh(
    user_id="performance_demo",
    enable_indexing=True,      # Maintains indexes for fast agent lookups
    auto_cleanup=True          # Automatic cleanup prevents memory bloat
)

# Large-scale context operations
for i in range(1000):
    context.push(f"item_{i}", f"data_{i}", 
                 subscribers=["Agent1", "Agent2"] if i % 2 == 0 else [])

# Fast retrieval thanks to indexing
agent1_context = context.get_all_for_agent("Agent1")
print(f"Agent1 has access to {len(agent1_context)} items")

context.close()
```

### Memory Management

```python
from syntha import ContextMesh

# Configure for memory-conscious environments
context = ContextMesh(
    user_id="memory_demo",
    auto_cleanup=True,         # Enable automatic cleanup
    cleanup_interval=60        # Clean up every minute (default: 300s)
)

# Monitor memory usage
def monitor_context_size():
    stats = context.get_stats()
    print(f"Total items: {stats['total_items']}")
    print(f"Active items: {stats['active_items']}")
    print(f"Expired items awaiting cleanup: {stats['expired_items']}")

monitor_context_size()

# Add temporary data
for i in range(100):
    context.push(f"temp_{i}", f"data_{i}", ttl=1)

monitor_context_size()

# Force cleanup
context.cleanup_expired()
monitor_context_size()

context.close()
```

## Security Best Practices

### Access Control Patterns

```python
from syntha import ContextMesh

context = ContextMesh(user_id="secure_user")

# Sensitive data - only for specific agents
context.push("api_keys", {
    "stripe": "sk_live_...",
    "openai": "sk-..."
}, subscribers=["PaymentAgent", "AIAgent"])

# Public configuration - available to all
context.push("app_settings", {
    "theme": "dark",
    "language": "en"
})

# Department-specific data - use topics
context.push("sales_targets", {
    "q1": 100000,
    "q2": 120000
}, topics=["sales", "management"])

# Verify access control
payment_agent_context = context.get_all_for_agent("PaymentAgent")
random_agent_context = context.get_all_for_agent("RandomAgent")

print(f"Payment agent can see: {list(payment_agent_context.keys())}")
print(f"Random agent can see: {list(random_agent_context.keys())}")

context.close()
```

### Data Validation and Sanitization

```python
from syntha import ContextMesh, SynthaValidationError
import json

def secure_push_context(context: ContextMesh, key: str, value: any, **kwargs):
    """Securely push context with validation."""
    
    # Validate key format
    if not key or not isinstance(key, str) or len(key) > 100:
        raise ValueError("Invalid key format")
    
    # Sanitize and validate value
    if isinstance(value, dict):
        # Ensure no sensitive keys leak
        sensitive_keys = ["password", "secret", "token", "key"]
        for sensitive in sensitive_keys:
            if any(sensitive in str(k).lower() for k in value.keys()):
                raise ValueError(f"Potentially sensitive data in key: {key}")
    
    # Validate JSON serialization
    try:
        json.dumps(value)
    except (TypeError, ValueError) as e:
        raise ValueError(f"Value must be JSON serializable: {e}")
    
    # Push with validation passed
    context.push(key, value, **kwargs)

# Usage
context = ContextMesh(user_id="validated_user")

try:
    # This will work
    secure_push_context(context, "user_prefs", {"theme": "dark"})
    
    # This will be rejected
    secure_push_context(context, "credentials", {"password": "secret123"})
except ValueError as e:
    print(f"Validation error: {e}")

context.close()
```

!!! danger "Critical Security Reminders"
    - **Always use `user_id`** in production - never share context between users
    - **Validate all input** before pushing to context
    - **Use TTL for sensitive data** to limit exposure window
    - **Monitor access patterns** to detect potential security issues
    - **Use HTTPS/TLS** for database connections in production

## Next Steps

You now understand advanced context management! You can:
- Design scalable topic-based routing systems
- Implement secure user isolation
- Configure production-ready persistence
- Optimize performance for large-scale deployments
- Apply security best practices

Continue to [Tools & Permissions](tools.md) to learn how agents interact with this context through sophisticated access control systems.