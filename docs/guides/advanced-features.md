# Advanced Features

This guide covers advanced capabilities of the Syntha SDK for power users and complex use cases.

## Message Confirmations

Require explicit confirmations for important messages to ensure critical operations are acknowledged.

### Basic Confirmations

```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh()
handler = ToolHandler(mesh)

# Send message requiring confirmation
result = handler.handle_tool_call("send_message_to_agent",
    from_agent="DevOps",
    to_agent="Backend",
    message="Deploy to production now?",
    requires_confirmation=True,
    priority="high"
)

print(f"Confirmation request sent: {result}")
```

### Handling Confirmations

```python
# Backend agent confirms the message
confirmation = handler.handle_tool_call("send_message_to_agent",
    from_agent="Backend",
    to_agent="DevOps",
    message="Confirmed - deploying now",
    message_type="confirmation"
)

# Check for confirmations
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="DevOps",
    include_confirmations=True,
    unread_only=False
)

# Process confirmations
for msg in messages["messages"]:
    if msg["message_type"] == "confirmation":
        print(f"Confirmed by {msg['from_agent']}: {msg['message']}")
```

### Confirmation Workflows

```python
class ConfirmationWorkflow:
    def __init__(self, mesh, handler):
        self.mesh = mesh
        self.handler = handler
        self.pending_confirmations = {}
    
    def request_confirmation(self, from_agent, to_agent, action, timeout=300):
        """Request confirmation with timeout"""
        import uuid
        import time
        
        confirmation_id = str(uuid.uuid4())
        
        # Send confirmation request
        result = self.handler.handle_tool_call("send_message_to_agent",
            from_agent=from_agent,
            to_agent=to_agent,
            message=f"Please confirm: {action}",
            requires_confirmation=True,
            priority="high"
        )
        
        # Track pending confirmation
        self.pending_confirmations[confirmation_id] = {
            "action": action,
            "from_agent": from_agent,
            "to_agent": to_agent,
            "timestamp": time.time(),
            "timeout": timeout
        }
        
        return confirmation_id
    
    def check_confirmations(self):
        """Check for received confirmations"""
        import time
        current_time = time.time()
        
        for conf_id, conf_data in list(self.pending_confirmations.items()):
            # Check timeout
            if current_time - conf_data["timestamp"] > conf_data["timeout"]:
                print(f"Confirmation timeout: {conf_data['action']}")
                del self.pending_confirmations[conf_id]
                continue
            
            # Check for confirmation message
            messages = self.handler.handle_tool_call("get_messages_from_agents",
                agent_name=conf_data["from_agent"],
                unread_only=True
            )
            
            for msg in messages["messages"]:
                if (msg["from_agent"] == conf_data["to_agent"] and 
                    msg["message_type"] == "confirmation"):
                    print(f"Confirmation received: {conf_data['action']}")
                    del self.pending_confirmations[conf_id]
                    return True
        
        return False

# Usage
workflow = ConfirmationWorkflow(mesh, handler)
conf_id = workflow.request_confirmation("Admin", "User", "Delete database")
workflow.check_confirmations()
```

## Context Templating

Advanced context injection with custom templates for complex prompt building.

### Template System

```python
from syntha.prompts import build_message_prompt

# Define custom template
template = """
Agent: {agent_name}
Project: {context[project_name]}
Environment: {context[environment]}
Available Tools: {tools}

Current Task: {task}
Priority Level: {priority}

Context Data:
{context}

Instructions:
- Follow security protocols
- Log all actions
- Report completion status
"""

# Build prompt with template
prompt = build_message_prompt("Backend", mesh, template,
    task="Implement user authentication",
    priority="high"
)

print(prompt)
```

### Dynamic Template Selection

```python
class TemplateManager:
    def __init__(self):
        self.templates = {
            "development": """
            Developer: {agent_name}
            Sprint: {context[sprint_name]}
            Story Points: {context[story_points]}
            
            Task: {task}
            Code Guidelines: {context[coding_standards]}
            """,
            
            "deployment": """
            DevOps Engineer: {agent_name}
            Environment: {context[environment]}
            Release Version: {context[release_version]}
            
            Deployment Task: {task}
            Rollback Plan: {context[rollback_plan]}
            """,
            
            "testing": """
            QA Engineer: {agent_name}
            Test Suite: {context[test_suite]}
            Coverage Target: {context[coverage_target]}
            
            Testing Task: {task}
            Test Data: {context[test_data]}
            """
        }
    
    def get_template(self, agent_type):
        """Get appropriate template based on agent type"""
        return self.templates.get(agent_type, self.templates["development"])
    
    def build_prompt(self, agent_name, agent_type, mesh, **kwargs):
        """Build context-aware prompt"""
        template = self.get_template(agent_type)
        return build_message_prompt(agent_name, mesh, template, **kwargs)

# Usage
template_manager = TemplateManager()

# Different prompts for different agent types
dev_prompt = template_manager.build_prompt(
    "Alice", "development", mesh,
    task="Fix authentication bug"
)

devops_prompt = template_manager.build_prompt(
    "Bob", "deployment", mesh,
    task="Deploy v2.1.0 to staging"
)
```

## Thread Management

Advanced conversation threading for organizing complex multi-agent interactions.

### Thread Creation and Management

```python
import datetime

class ThreadManager:
    def __init__(self, handler):
        self.handler = handler
        self.active_threads = {}
    
    def create_thread(self, thread_type, description):
        """Create a new conversation thread"""
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        thread_id = f"{thread_type}_{timestamp}"
        
        self.active_threads[thread_id] = {
            "type": thread_type,
            "description": description,
            "created": datetime.datetime.now(),
            "participants": set(),
            "message_count": 0
        }
        
        return thread_id
    
    def send_to_thread(self, thread_id, from_agent, to_agent, message, **kwargs):
        """Send message to specific thread"""
        if thread_id not in self.active_threads:
            raise ValueError(f"Thread {thread_id} does not exist")
        
        # Track participants
        thread_data = self.active_threads[thread_id]
        thread_data["participants"].add(from_agent)
        thread_data["participants"].add(to_agent)
        thread_data["message_count"] += 1
        
        # Send message with thread ID
        return self.handler.handle_tool_call("send_message_to_agent",
            from_agent=from_agent,
            to_agent=to_agent,
            message=message,
            thread_id=thread_id,
            **kwargs
        )
    
    def get_thread_messages(self, thread_id, agent_name):
        """Get all messages in a thread for an agent"""
        return self.handler.handle_tool_call("get_messages_from_agents",
            agent_name=agent_name,
            thread_id=thread_id,
            unread_only=False
        )
    
    def list_threads(self, agent_name=None):
        """List active threads, optionally filtered by agent"""
        threads = []
        for thread_id, thread_data in self.active_threads.items():
            if agent_name is None or agent_name in thread_data["participants"]:
                threads.append({
                    "id": thread_id,
                    "type": thread_data["type"],
                    "description": thread_data["description"],
                    "participants": list(thread_data["participants"]),
                    "message_count": thread_data["message_count"],
                    "created": thread_data["created"]
                })
        return threads

# Usage
thread_manager = ThreadManager(handler)

# Create themed threads
bug_thread = thread_manager.create_thread("bug_fix", "Authentication login issue")
feature_thread = thread_manager.create_thread("feature", "New dashboard widget")

# Send messages to threads
thread_manager.send_to_thread(
    bug_thread, "QA", "Dev",
    "Found critical bug in login validation",
    priority="high"
)

thread_manager.send_to_thread(
    feature_thread, "PM", "Designer",
    "Need mockups for new dashboard widget",
    priority="normal"
)

# List threads for specific agent
dev_threads = thread_manager.list_threads("Dev")
print(f"Dev is participating in {len(dev_threads)} threads")
```

### Thread Lifecycles

```python
class ThreadLifecycleManager(ThreadManager):
    def __init__(self, handler):
        super().__init__(handler)
        self.thread_states = {}  # active, paused, completed, archived
    
    def set_thread_state(self, thread_id, state, reason=None):
        """Change thread state with optional reason"""
        valid_states = ["active", "paused", "completed", "archived"]
        if state not in valid_states:
            raise ValueError(f"Invalid state. Must be one of: {valid_states}")
        
        self.thread_states[thread_id] = {
            "state": state,
            "reason": reason,
            "timestamp": datetime.datetime.now()
        }
        
        # Notify participants of state change
        if thread_id in self.active_threads:
            participants = self.active_threads[thread_id]["participants"]
            for participant in participants:
                self.handler.handle_tool_call("send_message_to_agent",
                    from_agent="System",
                    to_agent=participant,
                    message=f"Thread {thread_id} is now {state}" + 
                           (f": {reason}" if reason else ""),
                    thread_id=thread_id,
                    message_type="system"
                )
    
    def auto_archive_completed_threads(self, days_old=7):
        """Automatically archive threads completed more than X days ago"""
        cutoff_date = datetime.datetime.now() - datetime.timedelta(days=days_old)
        archived_count = 0
        
        for thread_id, state_data in list(self.thread_states.items()):
            if (state_data["state"] == "completed" and 
                state_data["timestamp"] < cutoff_date):
                
                self.set_thread_state(thread_id, "archived", 
                                    f"Auto-archived after {days_old} days")
                archived_count += 1
        
        return archived_count

# Usage
lifecycle_manager = ThreadLifecycleManager(handler)

# Create and manage thread lifecycle
thread_id = lifecycle_manager.create_thread("release", "v2.1.0 release preparation")
lifecycle_manager.set_thread_state(thread_id, "active")

# Later...
lifecycle_manager.set_thread_state(thread_id, "completed", "Release deployed successfully")

# Auto-cleanup
archived = lifecycle_manager.auto_archive_completed_threads(days_old=30)
print(f"Archived {archived} old threads")
```

## Batch Operations

Perform multiple operations efficiently with batch processing.

### Batch Context Operations

```python
# Batch context updates
batch_operations = [
    {"type": "push", "key": "user_count", "value": 1500},
    {"type": "push", "key": "server_status", "value": "healthy"},
    {"type": "push", "key": "last_deployment", "value": "2025-01-15"},
    {"type": "get", "key": "current_version"}
]

result = handler.handle_tool_call("batch_context_operation",
    agent_name="Monitor",
    operations=batch_operations
)

print(f"Batch operation results: {result}")
```

### Batch Message Processing

```python
class BatchMessageProcessor:
    def __init__(self, handler):
        self.handler = handler
        self.message_queue = []
    
    def queue_message(self, from_agent, to_agent, message, **kwargs):
        """Add message to batch queue"""
        self.message_queue.append({
            "from_agent": from_agent,
            "to_agent": to_agent,
            "message": message,
            **kwargs
        })
    
    def process_batch(self):
        """Send all queued messages at once"""
        results = []
        for msg_data in self.message_queue:
            result = self.handler.handle_tool_call("send_message_to_agent", **msg_data)
            results.append(result)
        
        # Clear queue after processing
        processed_count = len(self.message_queue)
        self.message_queue.clear()
        
        return {
            "processed": processed_count,
            "results": results
        }

# Usage
batch_processor = BatchMessageProcessor(handler)

# Queue multiple messages
batch_processor.queue_message("Scheduler", "Worker1", "Process queue batch 1")
batch_processor.queue_message("Scheduler", "Worker2", "Process queue batch 2") 
batch_processor.queue_message("Scheduler", "Worker3", "Process queue batch 3")

# Send all at once
results = batch_processor.process_batch()
print(f"Sent {results['processed']} messages in batch")
```

## Event-Driven Architecture

Implement event-driven patterns with Syntha's messaging system.

### Event Publisher/Subscriber

```python
class EventSystem:
    def __init__(self, handler):
        self.handler = handler
        self.subscribers = {}  # event_type -> [agent_names]
    
    def subscribe(self, event_type, agent_name):
        """Subscribe agent to event type"""
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        
        if agent_name not in self.subscribers[event_type]:
            self.subscribers[event_type].append(agent_name)
    
    def unsubscribe(self, event_type, agent_name):
        """Unsubscribe agent from event type"""
        if event_type in self.subscribers:
            self.subscribers[event_type] = [
                agent for agent in self.subscribers[event_type] 
                if agent != agent_name
            ]
    
    def publish_event(self, event_type, event_data, from_agent="System"):
        """Publish event to all subscribers"""
        if event_type not in self.subscribers:
            return {"published": 0, "subscribers": []}
        
        subscribers = self.subscribers[event_type]
        results = []
        
        for subscriber in subscribers:
            result = self.handler.handle_tool_call("send_message_to_agent",
                from_agent=from_agent,
                to_agent=subscriber,
                message=f"Event: {event_type}",
                message_type="event",
                priority="normal"
            )
            results.append(result)
        
        return {
            "published": len(subscribers),
            "subscribers": subscribers,
            "results": results
        }

# Usage
event_system = EventSystem(handler)

# Subscribe agents to events
event_system.subscribe("user_registered", "EmailService")
event_system.subscribe("user_registered", "AnalyticsService")
event_system.subscribe("order_placed", "InventoryService")
event_system.subscribe("order_placed", "PaymentService")

# Publish events
event_system.publish_event("user_registered", {
    "user_id": 12345,
    "email": "user@example.com"
})

event_system.publish_event("order_placed", {
    "order_id": 67890,
    "total": 99.99
})
```

## Advanced Security Features

Enhanced security patterns for sensitive operations.

### Role-Based Access Control

```python
class RoleBasedAccess:
    def __init__(self, mesh, handler):
        self.mesh = mesh
        self.handler = handler
        self.roles = {}
        self.permissions = {}
    
    def define_role(self, role_name, permissions):
        """Define a role with specific permissions"""
        self.roles[role_name] = permissions
    
    def assign_role(self, agent_name, role_name):
        """Assign role to agent"""
        if role_name not in self.roles:
            raise ValueError(f"Role {role_name} not defined")
        
        self.mesh.push(f"agent_role_{agent_name}", role_name, 
                      subscribers=[agent_name])
        self.mesh.push(f"agent_permissions_{agent_name}", 
                      self.roles[role_name],
                      subscribers=[agent_name])
    
    def check_permission(self, agent_name, permission):
        """Check if agent has specific permission"""
        permissions = self.mesh.get(f"agent_permissions_{agent_name}")
        return permission in permissions if permissions else False
    
    def secure_tool_call(self, agent_name, tool_name, required_permission, **kwargs):
        """Make tool call with permission check"""
        if not self.check_permission(agent_name, required_permission):
            return {
                "success": False,
                "error": f"Access denied: {agent_name} lacks {required_permission} permission"
            }
        
        return self.handler.handle_tool_call(tool_name, **kwargs)

# Usage
rbac = RoleBasedAccess(mesh, handler)

# Define roles
rbac.define_role("admin", ["read", "write", "delete", "deploy"])
rbac.define_role("developer", ["read", "write"])
rbac.define_role("viewer", ["read"])

# Assign roles
rbac.assign_role("Alice", "admin")
rbac.assign_role("Bob", "developer")
rbac.assign_role("Charlie", "viewer")

# Secure operations
result = rbac.secure_tool_call(
    "Alice", "send_message_to_agent", "write",
    from_agent="Alice",
    to_agent="Bob", 
    message="Deploy to production"
)
```

---

## Next Steps

- Explore [Performance Optimization](performance.md) for scaling advanced features
- Review [Security Guide](security.md) for additional security patterns
- Check [Best Practices](best-practices.md) for recommended usage patterns

These advanced features enable sophisticated multi-agent orchestration patterns. Use them selectively based on your specific requirements and complexity needs.
