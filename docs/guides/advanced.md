# Advanced Patterns: Mastering Complex Workflows

This guide shows you sophisticated patterns for building production-ready multi-agent systems. You'll learn how to combine topic-based and subscription-based routing, optimize performance, and handle complex real-world scenarios.

## Hybrid Routing: The Best of Both Worlds

The most powerful pattern is combining topic-based routing for general communication with subscription-based routing for private coordination.

### Pattern: Public Broadcast + Private Escalation

```python
from syntha import ContextMesh, ToolHandler

def setup_hybrid_system():
    """Demonstrates hybrid routing for customer service"""
    
    context = ContextMesh(user_id="hybrid_system", enable_persistence=False)
    
    # Set up agents with topic subscriptions
    context.register_agent_topics("TierOneAgent", ["support", "customers"])
    context.register_agent_topics("TierTwoAgent", ["support", "escalations"])
    context.register_agent_topics("ManagerAgent", ["escalations", "management"])
    context.register_agent_topics("SalesAgent", ["customers", "opportunities"])
    
    # Create tool handlers
    tier1 = ToolHandler(context, "TierOneAgent")
    tier2 = ToolHandler(context, "TierTwoAgent") 
    manager = ToolHandler(context, "ManagerAgent")
    sales = ToolHandler(context, "SalesAgent")
    
    print("=== Hybrid Routing Pattern ===")
    
    # Step 1: Public customer information (topic-based)
    tier1.handle_tool_call("push_context",
        key="customer_inquiry",
        value='{"customer": "BigCorp", "issue": "Performance questions", "value": 100000}',
        topics=["customers"]
    )
    
    # Step 2: Support-specific details (topic-based)
    tier1.handle_tool_call("push_context",
        key="technical_details",
        value='{"response_time": "5s", "error_rate": "0.1%", "diagnosis": "Database optimization needed"}',
        topics=["support"]
    )
    
    # Step 3: Private escalation (subscription-based)
    tier1.handle_tool_call("push_context",
        key="escalation_request",
        value='{"reason": "Customer threatening to cancel", "urgency": "high", "internal_notes": "They mentioned competitor pricing"}',
        subscribers=["ManagerAgent", "TierTwoAgent"]
    )
    
    # Step 4: Manager's private strategy (subscription-based)
    manager.handle_tool_call("push_context",
        key="retention_strategy",
        value='{"discount_authorized": "15%", "priority_support": true, "account_manager_assigned": "Sarah"}',
        subscribers=["TierTwoAgent", "SalesAgent"]
    )
    
    # Step 5: Sales opportunity (topic + subscription hybrid)
    sales.handle_tool_call("push_context",
        key="upsell_opportunity",
        value='{"potential": "Enterprise plan", "probability": 0.8, "value": 50000}',
        topics=["opportunities"],  # Visible to other sales agents
        subscribers=["ManagerAgent"]  # Also visible to manager
    )
    
    # Show access patterns
    print("\nAccess Patterns:")
    agents = [("TierOneAgent", tier1), ("TierTwoAgent", tier2), ("ManagerAgent", manager), ("SalesAgent", sales)]
    
    for name, handler in agents:
        result = handler.handle_tool_call("list_context")
        print(f"{name} sees: {result['keys']}")
    
    return context

context = setup_hybrid_system()
context.close()
```

**Key Benefits:**
- **Scalable communication** via topics for general information
- **Private coordination** via subscriptions for sensitive data
- **Flexible access control** - different information for different roles
- **Natural information flow** - public details flow broadly, private details flow precisely

## Advanced Agent Coordination Patterns

### Pattern: Self-Organizing Agent Network

```python
from syntha import ContextMesh, ToolHandler
import json

def create_self_organizing_network():
    """Agents discover each other and form coordination patterns"""
    
    context = ContextMesh(user_id="self_organizing", enable_persistence=False)
    
    # Create agents that don't know about each other initially
    agents = {
        "DataCollector": ToolHandler(context, "DataCollector"),
        "DataProcessor": ToolHandler(context, "DataProcessor"),
        "QualityChecker": ToolHandler(context, "QualityChecker"),
        "ReportGenerator": ToolHandler(context, "ReportGenerator"),
        "AlertManager": ToolHandler(context, "AlertManager")
    }
    
    print("=== Self-Organizing Agent Network ===")
    
    # Phase 1: Agents announce their capabilities
    agents["DataCollector"].handle_tool_call("push_context",
        key="capabilities_datacollector",
        value='{"role": "data_collection", "inputs": ["api", "files"], "outputs": ["raw_data"], "topics": ["data_pipeline"]}',
        topics=["agent_discovery"]
    )
    
    agents["DataProcessor"].handle_tool_call("push_context",
        key="capabilities_dataprocessor", 
        value='{"role": "data_processing", "inputs": ["raw_data"], "outputs": ["processed_data"], "topics": ["data_pipeline"]}',
        topics=["agent_discovery"]
    )
    
    agents["QualityChecker"].handle_tool_call("push_context",
        key="capabilities_qualitychecker",
        value='{"role": "quality_assurance", "inputs": ["processed_data"], "outputs": ["quality_report"], "topics": ["quality"]}',
        topics=["agent_discovery"]
    )
    
    agents["ReportGenerator"].handle_tool_call("push_context",
        key="capabilities_reportgenerator",
        value='{"role": "reporting", "inputs": ["processed_data", "quality_report"], "outputs": ["final_report"], "topics": ["reports"]}',
        topics=["agent_discovery"]
    )
    
    agents["AlertManager"].handle_tool_call("push_context",
        key="capabilities_alertmanager",
        value='{"role": "monitoring", "inputs": ["quality_report"], "outputs": ["alerts"], "topics": ["alerts"]}',
        topics=["agent_discovery"]
    )
    
    # Phase 2: Agents discover each other and self-organize
    for name, agent in agents.items():
        # Each agent subscribes to discovery to see others
        agent.handle_tool_call("subscribe_to_topics", topics=["agent_discovery"])
        
        # Get capabilities of all agents
        result = agent.handle_tool_call("get_context")
        capabilities = {k: v for k, v in result["context"].items() if k.startswith("capabilities_")}
        
        # Agent decides what topics to subscribe to based on its role and others' capabilities
        if name == "DataCollector":
            agent.handle_tool_call("subscribe_to_topics", topics=["data_pipeline"])
        elif name == "DataProcessor":
            agent.handle_tool_call("subscribe_to_topics", topics=["data_pipeline"])
        elif name == "QualityChecker":
            agent.handle_tool_call("subscribe_to_topics", topics=["data_pipeline", "quality"])
        elif name == "ReportGenerator":
            agent.handle_tool_call("subscribe_to_topics", topics=["data_pipeline", "quality", "reports"])
        elif name == "AlertManager":
            agent.handle_tool_call("subscribe_to_topics", topics=["quality", "alerts"])
    
    # Phase 3: Workflow execution with self-coordination
    print("\nWorkflow Execution:")
    
    # Data flows through the self-organized pipeline
    agents["DataCollector"].handle_tool_call("push_context",
        key="raw_dataset_001",
        value='{"source": "customer_api", "records": 1000, "timestamp": "2024-01-15T10:00:00"}',
        topics=["data_pipeline"]
    )
    
    agents["DataProcessor"].handle_tool_call("push_context",
        key="processed_dataset_001",
        value='{"source_key": "raw_dataset_001", "cleaned_records": 995, "transformations": ["normalize", "validate"]}',
        topics=["data_pipeline"]
    )
    
    agents["QualityChecker"].handle_tool_call("push_context",
        key="quality_report_001",
        value='{"dataset": "processed_dataset_001", "quality_score": 0.95, "issues": ["5 duplicate records"], "status": "acceptable"}',
        topics=["quality"]
    )
    
    agents["ReportGenerator"].handle_tool_call("push_context",
        key="final_report_001",
        value='{"datasets": ["processed_dataset_001"], "quality": "quality_report_001", "summary": "1000 records processed, 99.5% quality"}',
        topics=["reports"]
    )
    
    # Show final network state
    print("\nFinal Network State:")
    for name, agent in agents.items():
        result = agent.handle_tool_call("list_context")
        relevant_keys = [k for k in result['keys'] if not k.startswith('capabilities_')]
        print(f"{name} processes: {relevant_keys}")
    
    return context

context = create_self_organizing_network()
context.close()
```

### Pattern: Dynamic Load Balancing

```python
from syntha import ContextMesh, ToolHandler
import random

def create_load_balanced_system():
    """Multiple agents share work dynamically"""
    
    context = ContextMesh(user_id="load_balanced", enable_persistence=False)
    
    # Create multiple worker agents
    workers = {}
    for i in range(3):
        worker_name = f"Worker{i+1}"
        workers[worker_name] = ToolHandler(context, worker_name)
        # All workers subscribe to the work queue
        workers[worker_name].handle_tool_call("subscribe_to_topics", topics=["work_queue", "coordination"])
    
    # Create coordinator
    coordinator = ToolHandler(context, "Coordinator")
    coordinator.handle_tool_call("subscribe_to_topics", topics=["work_queue", "coordination", "results"])
    
    print("=== Dynamic Load Balancing ===")
    
    # Coordinator distributes work
    tasks = [
        {"task_id": "task_001", "type": "data_analysis", "priority": "high", "estimated_time": 30},
        {"task_id": "task_002", "type": "report_generation", "priority": "medium", "estimated_time": 15},
        {"task_id": "task_003", "type": "data_validation", "priority": "low", "estimated_time": 10},
        {"task_id": "task_004", "type": "data_analysis", "priority": "high", "estimated_time": 25},
        {"task_id": "task_005", "type": "report_generation", "priority": "medium", "estimated_time": 20}
    ]
    
    # Coordinator announces available work
    for task in tasks:
        coordinator.handle_tool_call("push_context",
            key=f"available_{task['task_id']}",
            value=json.dumps(task),
            topics=["work_queue"]
        )
    
    # Workers claim tasks (simulated)
    assignments = {}
    for i, task in enumerate(tasks):
        worker_name = f"Worker{(i % 3) + 1}"  # Round-robin assignment
        assignments[task["task_id"]] = worker_name
        
        # Worker claims the task
        workers[worker_name].handle_tool_call("push_context",
            key=f"claimed_{task['task_id']}",
            value=json.dumps({"worker": worker_name, "status": "claimed", "start_time": "2024-01-15T10:00:00"}),
            topics=["coordination"]
        )
        
        # Worker completes the task
        workers[worker_name].handle_tool_call("push_context",
            key=f"completed_{task['task_id']}",
            value=json.dumps({"worker": worker_name, "status": "completed", "result": f"Result for {task['task_id']}"}),
            topics=["results"]
        )
    
    # Coordinator monitors progress
    result = coordinator.handle_tool_call("list_context")
    completed_tasks = [k for k in result['keys'] if k.startswith('completed_')]
    claimed_tasks = [k for k in result['keys'] if k.startswith('claimed_')]
    
    print(f"Tasks assigned: {len(claimed_tasks)}")
    print(f"Tasks completed: {len(completed_tasks)}")
    print(f"Work distribution: {assignments}")
    
    return context

context = create_load_balanced_system()
context.close()
```

## Performance Optimization Patterns

### Pattern: Efficient Context Batching

```python
from syntha import ContextMesh, ToolHandler
import time

def demonstrate_batching_patterns():
    """Show efficient ways to handle high-volume context operations"""
    
    context = ContextMesh(
        user_id="high_performance",
        enable_persistence=True,
        db_backend="sqlite",
        db_path="perf_test.db",
        enable_indexing=True,
        auto_cleanup=True
    )
    
    handler = ToolHandler(context, "HighVolumeAgent")
    handler.handle_tool_call("subscribe_to_topics", topics=["metrics", "events"])
    
    print("=== Performance Optimization Patterns ===")
    
    # Pattern 1: Batching similar operations
    print("1. Batching similar operations...")
    
    start_time = time.time()
    
    # Instead of individual pushes, batch related data
    batch_data = {
        "cpu_metrics": [
            {"timestamp": "10:00", "value": 75},
            {"timestamp": "10:01", "value": 78},
            {"timestamp": "10:02", "value": 82}
        ],
        "memory_metrics": [
            {"timestamp": "10:00", "value": 65},
            {"timestamp": "10:01", "value": 67},
            {"timestamp": "10:02", "value": 69}
        ],
        "disk_metrics": [
            {"timestamp": "10:00", "value": 45},
            {"timestamp": "10:01", "value": 47},
            {"timestamp": "10:02", "value": 44}
        ]
    }
    
    # Single push with all related metrics
    handler.handle_tool_call("push_context",
        key="system_metrics_batch",
        value=json.dumps(batch_data),
        topics=["metrics"],
        ttl_hours=1
    )
    
    batch_time = time.time() - start_time
    print(f"   Batch operation took: {batch_time:.3f}s")
    
    # Pattern 2: Smart context retrieval
    print("2. Smart context retrieval...")
    
    start_time = time.time()
    
    # Use list_context first to see what's available
    available = handler.handle_tool_call("list_context")
    
    # Only get what you need
    metrics_keys = [k for k in available['keys'] if 'metrics' in k]
    if metrics_keys:
        specific_context = handler.handle_tool_call("get_context", keys=metrics_keys)
        print(f"   Retrieved {len(specific_context['context'])} specific items")
    
    smart_time = time.time() - start_time
    print(f"   Smart retrieval took: {smart_time:.3f}s")
    
    # Pattern 3: TTL-based cleanup
    print("3. TTL-based cleanup...")
    
    # Short-lived status updates
    handler.handle_tool_call("push_context",
        key="temp_status",
        value="Processing batch job...",
        topics=["events"],
        ttl_hours=0.01  # 36 seconds
    )
    
    # Medium-lived session data
    handler.handle_tool_call("push_context",
        key="session_info",
        value='{"session_id": "sess_123", "user": "admin"}',
        topics=["events"],
        ttl_hours=1
    )
    
    # Long-lived configuration (no TTL)
    handler.handle_tool_call("push_context",
        key="system_config",
        value='{"version": "2.0", "features": ["batch", "realtime"]}',
        topics=["events"]
    )
    
    print("   Set up TTL-based lifecycle management")
    
    context.close()
    
    # Clean up test database
    import os
    if os.path.exists("perf_test.db"):
        os.remove("perf_test.db")

demonstrate_batching_patterns()
```

### Pattern: Context Partitioning for Scale

```python
from syntha import ContextMesh, ToolHandler

def demonstrate_partitioning():
    """Show how to partition context for better performance"""
    
    # Create separate contexts for different domains
    contexts = {
        "user_data": ContextMesh(user_id="user_partition", enable_persistence=False),
        "analytics": ContextMesh(user_id="analytics_partition", enable_persistence=False),
        "system": ContextMesh(user_id="system_partition", enable_persistence=False)
    }
    
    print("=== Context Partitioning Pattern ===")
    
    # Agents work in their specialized domains
    user_agent = ToolHandler(contexts["user_data"], "UserAgent")
    analytics_agent = ToolHandler(contexts["analytics"], "AnalyticsAgent")
    system_agent = ToolHandler(contexts["system"], "SystemAgent")
    
    # Each agent manages its domain
    user_agent.handle_tool_call("subscribe_to_topics", topics=["users", "profiles"])
    user_agent.handle_tool_call("push_context",
        key="user_profile_123",
        value='{"name": "John Doe", "preferences": {"theme": "dark"}}',
        topics=["profiles"]
    )
    
    analytics_agent.handle_tool_call("subscribe_to_topics", topics=["metrics", "reports"])
    analytics_agent.handle_tool_call("push_context",
        key="daily_metrics",
        value='{"active_users": 1500, "sessions": 3200}',
        topics=["metrics"]
    )
    
    system_agent.handle_tool_call("subscribe_to_topics", topics=["config", "health"])
    system_agent.handle_tool_call("push_context",
        key="system_health",
        value='{"cpu": 65, "memory": 78, "status": "healthy"}',
        topics=["health"]
    )
    
    # Cross-domain coordination when needed
    def cross_domain_query(user_id: str):
        """Example of querying across partitions"""
        user_data = contexts["user_data"].get_all_for_agent("UserAgent")
        analytics_data = contexts["analytics"].get_all_for_agent("AnalyticsAgent")
        
        return {
            "user_info": user_data,
            "user_analytics": analytics_data
        }
    
    result = cross_domain_query("123")
    print(f"Cross-domain query result: {len(result['user_info']) + len(result['user_analytics'])} items")
    
    # Cleanup
    for context in contexts.values():
        context.close()

demonstrate_partitioning()
```

## Production Deployment Patterns

### Pattern: Multi-Tenant Architecture

```python
from syntha import ContextMesh, ToolHandler
from typing import Dict
import threading

class TenantContextManager:
    """Production-ready multi-tenant context management"""
    
    def __init__(self, db_backend: str = "postgresql", **db_config):
        self._tenant_contexts: Dict[str, ContextMesh] = {}
        self._lock = threading.Lock()
        self.db_backend = db_backend
        self.db_config = db_config
    
    def get_tenant_context(self, tenant_id: str) -> ContextMesh:
        """Get or create context for a tenant"""
        with self._lock:
            if tenant_id not in self._tenant_contexts:
                self._tenant_contexts[tenant_id] = ContextMesh(
                    user_id=tenant_id,
                    enable_persistence=True,
                    db_backend=self.db_backend,
                    **self.db_config
                )
            return self._tenant_contexts[tenant_id]
    
    def create_agent_handler(self, tenant_id: str, agent_name: str, role: str = "contributor") -> ToolHandler:
        """Create an agent handler for a specific tenant"""
        from syntha import create_role_based_handler
        context = self.get_tenant_context(tenant_id)
        return create_role_based_handler(context, agent_name, role)
    
    def cleanup_tenant(self, tenant_id: str):
        """Clean up a tenant's context"""
        with self._lock:
            if tenant_id in self._tenant_contexts:
                self._tenant_contexts[tenant_id].close()
                del self._tenant_contexts[tenant_id]
    
    def get_tenant_stats(self, tenant_id: str) -> dict:
        """Get statistics for a tenant"""
        context = self.get_tenant_context(tenant_id)
        return context.get_stats()
    
    def cleanup_all(self):
        """Clean up all tenant contexts"""
        with self._lock:
            for context in self._tenant_contexts.values():
                context.close()
            self._tenant_contexts.clear()

def demonstrate_multi_tenant():
    """Show multi-tenant deployment pattern"""
    
    print("=== Multi-Tenant Architecture ===")
    
    # Create tenant manager (would use PostgreSQL in production)
    manager = TenantContextManager(
        db_backend="sqlite",  # Would be PostgreSQL in production
        db_path="multi_tenant.db"
    )
    
    # Create agents for different tenants
    tenant_a_sales = manager.create_agent_handler("tenant_a", "SalesAgent", "contributor")
    tenant_a_support = manager.create_agent_handler("tenant_a", "SupportAgent", "contributor")
    
    tenant_b_sales = manager.create_agent_handler("tenant_b", "SalesAgent", "contributor")
    tenant_b_support = manager.create_agent_handler("tenant_b", "SupportAgent", "contributor")
    
    # Each tenant's agents work in isolation
    tenant_a_sales.handle_tool_call("subscribe_to_topics", topics=["sales", "customers"])
    tenant_a_sales.handle_tool_call("push_context",
        key="deal_001",
        value='{"company": "ClientA", "value": 50000}',
        topics=["sales"]
    )
    
    tenant_b_sales.handle_tool_call("subscribe_to_topics", topics=["sales", "customers"])
    tenant_b_sales.handle_tool_call("push_context",
        key="deal_001",  # Same key, different tenant
        value='{"company": "ClientB", "value": 75000}',
        topics=["sales"]
    )
    
    # Verify isolation
    tenant_a_context = tenant_a_sales.handle_tool_call("list_context")
    tenant_b_context = tenant_b_sales.handle_tool_call("list_context")
    
    print(f"Tenant A sees: {tenant_a_context['keys']}")
    print(f"Tenant B sees: {tenant_b_context['keys']}")
    
    # Get tenant statistics
    stats_a = manager.get_tenant_stats("tenant_a")
    stats_b = manager.get_tenant_stats("tenant_b")
    
    print(f"Tenant A stats: {stats_a}")
    print(f"Tenant B stats: {stats_b}")
    
    # Cleanup
    manager.cleanup_all()
    
    # Clean up test database
    import os
    if os.path.exists("multi_tenant.db"):
        os.remove("multi_tenant.db")

demonstrate_multi_tenant()
```

### Pattern: Circuit Breaker for Resilience

```python
from syntha import ContextMesh, ToolHandler, SynthaError
import time
from typing import Optional
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered

class CircuitBreaker:
    """Circuit breaker pattern for context operations"""
    
    def __init__(self, failure_threshold: int = 5, timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time: Optional[float] = None
        self.state = CircuitState.CLOSED
    
    def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection"""
        
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time < self.timeout:
                raise Exception("Circuit breaker is OPEN")
            else:
                self.state = CircuitState.HALF_OPEN
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e
    
    def _on_success(self):
        """Handle successful operation"""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        """Handle failed operation"""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

class ResilientContextHandler:
    """Context handler with circuit breaker protection"""
    
    def __init__(self, context: ContextMesh, agent_name: str):
        self.handler = ToolHandler(context, agent_name)
        self.circuit_breaker = CircuitBreaker()
    
    def safe_tool_call(self, tool_name: str, **kwargs):
        """Tool call with circuit breaker protection"""
        try:
            return self.circuit_breaker.call(
                self.handler.handle_tool_call,
                tool_name,
                **kwargs
            )
        except Exception as e:
            return {
                "success": False,
                "error": f"Circuit breaker: {str(e)}",
                "circuit_state": self.circuit_breaker.state.value
            }

def demonstrate_resilience():
    """Show resilience patterns"""
    
    print("=== Circuit Breaker Pattern ===")
    
    context = ContextMesh(user_id="resilience_test", enable_persistence=False)
    resilient_handler = ResilientContextHandler(context, "ResilientAgent")
    
    # Normal operations work fine
    result = resilient_handler.safe_tool_call("subscribe_to_topics", topics=["test"])
    print(f"Normal operation: {result['success']}")
    
    # Simulate failures by trying invalid operations
    for i in range(6):  # More than failure threshold
        result = resilient_handler.safe_tool_call("invalid_tool")
        print(f"Attempt {i+1}: {result.get('circuit_state', 'unknown')}")
    
    # Circuit breaker should now be OPEN
    result = resilient_handler.safe_tool_call("subscribe_to_topics", topics=["test"])
    print(f"After failures: {result.get('circuit_state', 'unknown')}")
    
    context.close()

demonstrate_resilience()
```

## Advanced Integration Patterns

### Pattern: Event-Driven Architecture

```python
from syntha import ContextMesh, ToolHandler
import json
from typing import Callable, Dict, List

class EventDrivenSystem:
    """Event-driven system using context mesh as event store"""
    
    def __init__(self, user_id: str):
        self.context = ContextMesh(user_id=user_id, enable_persistence=False)
        self.event_handlers: Dict[str, List[Callable]] = {}
        self.agents: Dict[str, ToolHandler] = {}
    
    def register_agent(self, agent_name: str, event_types: List[str]):
        """Register an agent to handle specific event types"""
        handler = ToolHandler(self.context, agent_name)
        handler.handle_tool_call("subscribe_to_topics", topics=["events"])
        self.agents[agent_name] = handler
        
        # Store agent's event interests
        handler.handle_tool_call("push_context",
            key=f"agent_interests_{agent_name}",
            value=json.dumps({"agent": agent_name, "event_types": event_types}),
            topics=["agent_registry"]
        )
    
    def publish_event(self, event_type: str, event_data: dict, source_agent: str = "system"):
        """Publish an event to the system"""
        event = {
            "event_type": event_type,
            "data": event_data,
            "source": source_agent,
            "timestamp": "2024-01-15T10:00:00",
            "event_id": f"evt_{event_type}_{int(time.time())}"
        }
        
        # Store event in context mesh
        if source_agent in self.agents:
            self.agents[source_agent].handle_tool_call("push_context",
                key=event["event_id"],
                value=json.dumps(event),
                topics=["events"]
            )
        else:
            # System event
            self.context.push(event["event_id"], event, topics=["events"])
        
        return event["event_id"]
    
    def get_events_by_type(self, event_type: str, agent_name: str) -> List[dict]:
        """Get all events of a specific type"""
        if agent_name not in self.agents:
            return []
        
        result = self.agents[agent_name].handle_tool_call("get_context")
        events = []
        
        for key, value in result["context"].items():
            if key.startswith("evt_") and isinstance(value, dict):
                if value.get("event_type") == event_type:
                    events.append(value)
        
        return events

def demonstrate_event_driven():
    """Show event-driven architecture"""
    
    print("=== Event-Driven Architecture ===")
    
    system = EventDrivenSystem("event_system")
    
    # Register agents for different event types
    system.register_agent("OrderProcessor", ["order_created", "payment_received"])
    system.register_agent("InventoryManager", ["order_created", "item_shipped"])
    system.register_agent("NotificationService", ["order_created", "payment_received", "item_shipped"])
    system.register_agent("AnalyticsEngine", ["order_created", "payment_received", "item_shipped"])
    
    # Simulate event flow
    events = [
        ("order_created", {"order_id": "ORD-001", "customer": "John Doe", "items": ["laptop", "mouse"]}, "OrderProcessor"),
        ("payment_received", {"order_id": "ORD-001", "amount": 1200, "method": "credit_card"}, "OrderProcessor"),
        ("item_shipped", {"order_id": "ORD-001", "tracking": "TRK-123", "carrier": "FedEx"}, "InventoryManager")
    ]
    
    # Publish events
    for event_type, data, source in events:
        event_id = system.publish_event(event_type, data, source)
        print(f"Published {event_type}: {event_id}")
    
    # Show how different agents see different aspects
    for agent_name in system.agents:
        result = system.agents[agent_name].handle_tool_call("list_context")
        event_keys = [k for k in result['keys'] if k.startswith('evt_')]
        print(f"{agent_name} sees {len(event_keys)} events")
    
    # Analytics agent analyzes order flow
    order_events = system.get_events_by_type("order_created", "AnalyticsEngine")
    payment_events = system.get_events_by_type("payment_received", "AnalyticsEngine")
    
    print(f"Analytics: {len(order_events)} orders, {len(payment_events)} payments")
    
    system.context.close()

demonstrate_event_driven()
```

## What You've Mastered

You now understand advanced patterns for:

- ✅ **Hybrid routing** - Combining topic-based and subscription-based approaches
- ✅ **Self-organizing systems** - Agents that discover and coordinate automatically
- ✅ **Load balancing** - Dynamic work distribution among agents
- ✅ **Performance optimization** - Batching, partitioning, and efficient retrieval
- ✅ **Multi-tenant architecture** - Secure isolation for multiple customers
- ✅ **Resilience patterns** - Circuit breakers and error handling
- ✅ **Event-driven systems** - Using context mesh as an event store

## Next Steps

Ready to see these patterns in action? Continue to [Real-World Examples](examples.md) for complete integrations including:

- **OpenAI Integration** - Complete working example with real API calls
- **Multi-User Applications** - Production-ready user isolation
- **Microservices Architecture** - Context mesh across service boundaries
- **Monitoring and Observability** - Production deployment patterns