# Context Management: Routing Information Like a Pro

This guide teaches you advanced context routing patterns. You'll learn when to use topic-based vs subscription-based routing, how to combine them effectively, and best practices for production systems.

## The Two Routing Strategies

Syntha offers two powerful ways to route context between agents. Understanding when to use each is key to building scalable systems.

### Topic-Based Routing: The Scalable Choice

**How it works**: Agents subscribe to topics they care about. When you push context to topics, all subscribed agents automatically receive it.

**Perfect for**:
- Agent-to-agent communication
- Broadcast scenarios (one-to-many)
- Scalable workflows where agents join/leave dynamically
- Domain-specific coordination (sales, support, analytics)

### Subscription-Based Routing: The Precise Choice

**How it works**: You specify exactly which agents should receive the context by name.

**Perfect for**:
- Private communication between specific agents
- Sensitive data that only certain agents should see
- Direct coordination scenarios
- When you know exactly who needs the information

## Topic-Based Routing Deep Dive

Let's start with a comprehensive topic-based example:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="company_workspace", enable_persistence=False)

# Step 1: Set up agent topic subscriptions
context.register_agent_topics("SalesAgent", ["sales", "customers", "leads"])
context.register_agent_topics("SupportAgent", ["support", "customers", "issues"])
context.register_agent_topics("AnalyticsAgent", ["sales", "support", "analytics"])
context.register_agent_topics("MarketingAgent", ["marketing", "customers", "leads"])

# Step 2: Push context to topics - notice how it routes automatically
context.push("new_customer", {
    "name": "Acme Corp",
    "industry": "Technology", 
    "value": 50000,
    "contact": "john@acme.com",
    "source": "website_form"
}, topics=["customers", "leads"])

# Step 3: See who gets what
sales_context = context.get_all_for_agent("SalesAgent")
support_context = context.get_all_for_agent("SupportAgent")
analytics_context = context.get_all_for_agent("AnalyticsAgent")
marketing_context = context.get_all_for_agent("MarketingAgent")

print("Who sees the new customer:")
print(f"  SalesAgent: {'new_customer' in sales_context}")      # True (subscribed to customers + leads)
print(f"  SupportAgent: {'new_customer' in support_context}")  # True (subscribed to customers)
print(f"  AnalyticsAgent: {'new_customer' in analytics_context}")  # False (not subscribed to customers or leads)
print(f"  MarketingAgent: {'new_customer' in marketing_context}")  # True (subscribed to customers + leads)

context.close()
```

**Why this is powerful**:
- Add new agents without changing existing code
- Clear separation by business domain
- Agents automatically get relevant information
- Easy to understand information flow

### Dynamic Topic Management

Agents can change their subscriptions at runtime:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="dynamic_workspace", enable_persistence=False)

# Initial subscription
context.register_agent_topics("FlexibleAgent", ["general"])

# Agent discovers it needs more specific information
context.register_agent_topics("FlexibleAgent", ["general", "sales", "analytics"])

# Check current subscriptions
current_topics = context.get_topics_for_agent("FlexibleAgent")
print(f"Current topics: {current_topics}")  # ['general', 'sales', 'analytics']

# Remove specific topics while keeping others
context.unsubscribe_from_topics("FlexibleAgent", ["general"])

updated_topics = context.get_topics_for_agent("FlexibleAgent")
print(f"Updated topics: {updated_topics}")  # ['sales', 'analytics']

context.close()
```

### Topic Discovery and Management

```python
from syntha import ContextMesh

context = ContextMesh(user_id="discovery_workspace", enable_persistence=False)

# Set up some agents with different interests
context.register_agent_topics("Agent1", ["sales", "marketing"])
context.register_agent_topics("Agent2", ["sales", "support"])
context.register_agent_topics("Agent3", ["marketing", "analytics"])

# Add some context to different topics
context.push("q4_sales", "Sales up 25% this quarter", topics=["sales"])
context.push("new_campaign", "Holiday promotion launching", topics=["marketing"])
context.push("support_metrics", "Response time improved 30%", topics=["support"])

# Discover what topics exist
all_topics = context.get_all_topics()
print(f"Available topics: {all_topics}")  # ['sales', 'marketing', 'support']

# See who's subscribed to each topic
for topic in all_topics:
    subscribers = context.get_subscribers_for_topic(topic)
    print(f"Topic '{topic}' has subscribers: {subscribers}")

# Check how many context items each topic has
for topic in all_topics:
    topic_keys = context.get_keys_for_topic(topic)
    print(f"Topic '{topic}' has {len(topic_keys)} context items: {topic_keys}")

context.close()
```

## Subscription-Based Routing Deep Dive

For private communication and sensitive data:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="secure_workspace", enable_persistence=False)

# Scenario 1: API credentials only for specific agents
context.push("api_credentials", {
    "service": "payment_processor",
    "key": "sk-live-abc123",
    "endpoint": "https://api.payments.com",
    "rate_limit": "1000/hour"
}, subscribers=["PaymentAgent", "AdminAgent"])

# Scenario 2: Customer complaint for support chain
context.push("urgent_complaint", {
    "customer": "BigClient Corp",
    "issue": "Service outage affecting 1000+ users",
    "priority": "critical",
    "escalation_needed": True
}, subscribers=["SupportManagerAgent", "CTOAgent", "CustomerSuccessAgent"])

# Scenario 3: Internal strategy discussion
context.push("strategy_discussion", {
    "topic": "Q1 pricing changes",
    "participants": ["CEO", "CFO", "VP_Sales"],
    "confidential": True
}, subscribers=["StrategyAgent", "ExecutiveAssistantAgent"])

# Test access patterns
print("Access patterns:")
print(f"PaymentAgent can see API creds: {'api_credentials' in context.get_all_for_agent('PaymentAgent')}")
print(f"RandomAgent can see API creds: {'api_credentials' in context.get_all_for_agent('RandomAgent')}")
print(f"SupportManagerAgent can see complaint: {'urgent_complaint' in context.get_all_for_agent('SupportManagerAgent')}")
print(f"MarketingAgent can see complaint: {'urgent_complaint' in context.get_all_for_agent('MarketingAgent')}")

context.close()
```

**When to use subscription-based routing**:
- Sensitive information (API keys, passwords, financial data)
- Private conversations between specific agents
- Escalation workflows with specific participants
- Information that should only be available to certain roles

## Combining Both Approaches

The most powerful pattern is using both routing methods together:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="hybrid_workspace", enable_persistence=False)

# Set up topic subscriptions for general communication
context.register_agent_topics("SalesAgent", ["sales", "customers"])
context.register_agent_topics("SupportAgent", ["support", "customers"])
context.register_agent_topics("ManagerAgent", ["sales", "support", "management"])

# Public announcement - use topics for broad communication
context.push("company_announcement", {
    "title": "New Office Opening",
    "message": "We're expanding to Austin, Texas next month!",
    "date": "2024-03-01",
    "public": True
}, topics=["sales", "support", "management"])

# Private escalation - use subscribers for specific targeting
context.push("performance_issue", {
    "agent": "SalesAgent",
    "issue": "Missing quarterly targets",
    "action_required": "Performance improvement plan",
    "confidential": True
}, subscribers=["ManagerAgent", "HRAgent"])

# Mixed approach - some agents get it via topics, others via direct subscription
context.push("customer_feedback", {
    "customer": "TechCorp",
    "feedback": "Excellent service, wants to upgrade plan",
    "opportunity": "upsell_potential"
}, topics=["sales"], subscribers=["AccountManagerAgent"])  # Sales team + specific account manager

# Verify access patterns
print("Access verification:")
print(f"SalesAgent sees announcement: {'company_announcement' in context.get_all_for_agent('SalesAgent')}")
print(f"SalesAgent sees performance issue: {'performance_issue' in context.get_all_for_agent('SalesAgent')}")
print(f"ManagerAgent sees both: {len(context.get_all_for_agent('ManagerAgent'))} items")
print(f"AccountManagerAgent sees feedback: {'customer_feedback' in context.get_all_for_agent('AccountManagerAgent')}")

context.close()
```

**Best practices for combining approaches**:
- Use topics for general, domain-specific communication
- Use subscribers for sensitive or private information
- Don't duplicate the same information in both - choose the most appropriate method
- Consider your audience: broad (topics) vs specific (subscribers)

## Advanced User Isolation Patterns

User isolation is critical for multi-tenant applications:

```python
from syntha import ContextMesh

# Different users get completely separate contexts
alice_context = ContextMesh(user_id="alice_123", enable_persistence=False)
bob_context = ContextMesh(user_id="bob_456", enable_persistence=False)

# Alice's agents and topics
alice_context.register_agent_topics("AliceSalesAgent", ["sales", "alice_customers"])
alice_context.push("customer_data", {
    "name": "Alice's Client",
    "value": 10000
}, topics=["alice_customers"])

# Bob's agents and topics (completely separate)
bob_context.register_agent_topics("BobSalesAgent", ["sales", "bob_customers"])
bob_context.push("customer_data", {
    "name": "Bob's Client", 
    "value": 25000
}, topics=["bob_customers"])

# Verify complete isolation
alice_data = alice_context.get_all_for_agent("AliceSalesAgent")
bob_data = bob_context.get_all_for_agent("BobSalesAgent")

print(f"Alice sees: {alice_data}")  # Only Alice's data
print(f"Bob sees: {bob_data}")      # Only Bob's data

# Cross-user access fails silently (returns empty)
alice_cant_see_bob = alice_context.get_all_for_agent("BobSalesAgent")
print(f"Alice trying to see Bob's agent: {alice_cant_see_bob}")  # {}

alice_context.close()
bob_context.close()
```

## Context Lifecycle and TTL Strategies

Different types of context need different lifespans:

```python
from syntha import ContextMesh
import time

context = ContextMesh(user_id="lifecycle_demo", enable_persistence=False)

# Permanent context (no TTL)
context.push("user_preferences", {
    "theme": "dark",
    "language": "en",
    "timezone": "PST"
})

# Session context (expires in 1 hour)
context.push("session_data", {
    "login_time": "2024-01-15 09:00:00",
    "session_id": "sess_abc123",
    "ip_address": "192.168.1.100"
}, ttl=3600)

# Temporary status (expires in 30 seconds)
context.push("processing_status", {
    "task": "generating_report",
    "progress": 45,
    "eta": "2 minutes"
}, ttl=30)

# Real-time data (expires in 5 seconds)
context.push("live_metrics", {
    "cpu_usage": 78,
    "memory_usage": 65,
    "active_users": 1247
}, ttl=5)

print("Immediate check:")
print(f"Preferences: {context.get('user_preferences', 'Agent') is not None}")
print(f"Session: {context.get('session_data', 'Agent') is not None}")
print(f"Status: {context.get('processing_status', 'Agent') is not None}")
print(f"Metrics: {context.get('live_metrics', 'Agent') is not None}")

# Wait and check expiration
time.sleep(6)
print("\nAfter 6 seconds:")
print(f"Preferences: {context.get('user_preferences', 'Agent') is not None}")  # Still there
print(f"Session: {context.get('session_data', 'Agent') is not None}")         # Still there
print(f"Status: {context.get('processing_status', 'Agent') is not None}")     # Still there
print(f"Metrics: {context.get('live_metrics', 'Agent') is not None}")         # Expired!

context.close()
```

**TTL strategy guidelines**:
- **No TTL**: User preferences, system configuration, permanent knowledge
- **Hours/Days**: Session data, user state, cached results
- **Minutes**: Task status, temporary tokens, workflow state
- **Seconds**: Real-time metrics, live status updates, temporary flags

## Performance Optimization Patterns

For high-performance applications:

```python
from syntha import ContextMesh

# Enable all performance optimizations
context = ContextMesh(
    user_id="performance_demo",
    enable_persistence=True,
    db_backend="sqlite",
    db_path="fast_context.db",
    enable_indexing=True,      # Faster lookups
    auto_cleanup=True          # Automatic expired item removal
)

# Efficient topic organization
context.register_agent_topics("HighVolumeAgent", ["critical", "alerts"])
context.register_agent_topics("BatchAgent", ["batch_jobs", "reports"])

# Use specific keys and targeted topics
context.push("critical_alert_001", {
    "severity": "high",
    "service": "payment_api",
    "message": "Response time > 5s"
}, topics=["critical"])

# Batch operations for efficiency
batch_data = [
    ("metric_cpu", {"value": 75, "timestamp": "2024-01-15T10:00:00"}),
    ("metric_memory", {"value": 68, "timestamp": "2024-01-15T10:00:00"}),
    ("metric_disk", {"value": 45, "timestamp": "2024-01-15T10:00:00"})
]

for key, value in batch_data:
    context.push(key, value, topics=["metrics"], ttl=300)  # 5 minute TTL

context.close()
```

## Production Best Practices

### 1. Always Use User Isolation
```python
# ✅ CORRECT - Every context has a user_id
context = ContextMesh(user_id="user_12345")

# ❌ DANGEROUS - Shared context across users
context = ContextMesh()
```

### 2. Choose Appropriate Persistence
```python
# Development
context = ContextMesh(user_id="dev_user", enable_persistence=False)

# Production
context = ContextMesh(
    user_id="prod_user",
    enable_persistence=True,
    db_backend="postgresql",
    host="db.company.com",
    database="syntha_prod"
)
```

### 3. Organize Topics by Domain
```python
# ✅ GOOD - Clear domain separation
context.register_agent_topics("SalesAgent", ["sales", "customers", "leads"])
context.register_agent_topics("SupportAgent", ["support", "customers", "issues"])

# ❌ CONFUSING - Mixed domains
context.register_agent_topics("Agent1", ["sales", "random", "stuff", "support"])
```

### 4. Use Appropriate TTL
```python
# ✅ GOOD - Match TTL to data lifecycle
context.push("user_session", session_data, ttl=3600)      # 1 hour
context.push("temp_token", auth_token, ttl=300)           # 5 minutes
context.push("user_prefs", preferences)                   # No TTL (permanent)

# ❌ WASTEFUL - Wrong TTL for data type
context.push("user_prefs", preferences, ttl=60)          # Too short for preferences
context.push("temp_status", status)                      # No TTL for temporary data
```

### 5. Handle Errors Gracefully
```python
from syntha import ContextMesh, SynthaError

try:
    with ContextMesh(user_id="user123") as context:
        # Your context operations here
        pass
except SynthaError as e:
    print(f"Syntha error: {e}")
    print(f"Suggestion: {e.suggestion}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Complete Real-World Example

Here's a complete example showing all concepts together:

```python
from syntha import ContextMesh
import json

def setup_customer_service_system():
    """Complete customer service system with proper context routing"""
    
    # Production-ready context mesh
    context = ContextMesh(
        user_id="customer_service_tenant_1",
        enable_persistence=True,
        db_backend="sqlite",
        db_path="customer_service.db"
    )
    
    # Set up agent topic subscriptions
    context.register_agent_topics("TierOneAgent", ["support", "customers", "tickets"])
    context.register_agent_topics("TierTwoAgent", ["support", "escalations", "technical"])
    context.register_agent_topics("ManagerAgent", ["support", "escalations", "management"])
    context.register_agent_topics("SalesAgent", ["sales", "customers", "opportunities"])
    
    # Incoming customer ticket (public to support team)
    context.push("ticket_12345", {
        "customer": "TechCorp Inc",
        "issue": "API integration not working",
        "priority": "high",
        "category": "technical",
        "created": "2024-01-15T10:30:00"
    }, topics=["support", "tickets"])
    
    # Customer history (available to sales and support)
    context.push("customer_history_techcorp", {
        "total_value": 150000,
        "contract_end": "2024-12-31",
        "satisfaction_score": 8.5,
        "previous_issues": 2
    }, topics=["customers"])
    
    # Escalation (private to management)
    context.push("escalation_12345", {
        "ticket_id": "12345",
        "reason": "Customer threatening to cancel contract",
        "assigned_manager": "ManagerAgent",
        "priority": "critical"
    }, subscribers=["ManagerAgent", "TierTwoAgent"])
    
    # Sales opportunity (private between sales and account manager)
    context.push("upsell_opportunity", {
        "customer": "TechCorp Inc",
        "opportunity": "Enterprise plan upgrade",
        "potential_value": 50000,
        "probability": 0.7
    }, subscribers=["SalesAgent", "AccountManagerAgent"])
    
    return context

def demonstrate_access_patterns(context):
    """Show how different agents see different context"""
    
    agents = ["TierOneAgent", "TierTwoAgent", "ManagerAgent", "SalesAgent"]
    
    for agent in agents:
        agent_context = context.get_all_for_agent(agent)
        print(f"\n{agent} sees:")
        for key, value in agent_context.items():
            print(f"  {key}: {type(value).__name__}")
    
    # Show topic-based organization
    print(f"\nSupport topic has: {len(context.get_keys_for_topic('support'))} items")
    print(f"Customers topic has: {len(context.get_keys_for_topic('customers'))} items")

if __name__ == "__main__":
    context = setup_customer_service_system()
    demonstrate_access_patterns(context)
    context.close()
```

## What You've Mastered

You now understand:

- ✅ **Topic-based routing** - For scalable, domain-organized communication
- ✅ **Subscription-based routing** - For private, targeted communication  
- ✅ **Hybrid approaches** - Combining both methods effectively
- ✅ **User isolation** - Keeping different users completely separate
- ✅ **TTL strategies** - Managing context lifecycle appropriately
- ✅ **Performance patterns** - Optimizing for production workloads
- ✅ **Best practices** - Building maintainable, secure systems

## Next Steps

Ready to give your agents powerful tools? Continue to [Tools & Permissions](tools.md) to learn:

- How agents interact with context through tools
- When and why to use different permission levels
- Building sophisticated agent coordination workflows
- Advanced access control patterns