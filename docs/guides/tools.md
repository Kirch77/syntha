# Tools & Permissions: Empowering Your Agents

This guide shows you how to give agents powerful tools to manage context, and when to use permissions to control what they can do. You'll learn what each tool is for, why permissions matter, and how to build sophisticated agent coordination systems.

## Understanding the Tool Ecosystem

When you give tools to agents, you're giving them the ability to actively manage their own context. This is different from just injecting context into prompts - agents become active participants in the information flow.

### Tools vs Direct API: When to Use Each

**Use Tools When:**
- Agents need to actively discover and manage context
- You want agents to coordinate with each other
- Working with LLMs that support function calling
- Building dynamic, multi-agent workflows

**Use Direct API When:**
- You're building system infrastructure
- Setting up initial configurations
- Managing agents from your application code
- You need precise control over context flow

## What Each Tool Does: User vs AI Perspective

Understanding what each tool is **really** for helps you decide which ones to give to your agents:

| Tool | **For Users** | **For AI Agents** | **Why Give It** |
|------|---------------|-------------------|-----------------|
| `get_context` | Retrieve specific data | Get context they need for current task | Always - agents need to access information |
| `list_context` | See what's available | **Discover what exists without pulling everything** | Critical - prevents token waste |
| `push_context` | Share information | Share results/findings with other agents | Usually - enables agent collaboration |
| `subscribe_to_topics` | Join conversations | **Subscribe to relevant information streams** | Often - lets agents self-organize |
| `discover_topics` | Find active topics | **Find what topics exist and who's listening** | Often - helps agents find the right audience |
| `unsubscribe_from_topics` | Leave conversations | Stop receiving irrelevant updates | Sometimes - prevents information overload |
| `delete_topic` | Clean up | Remove entire topics and all context | Rarely - only for trusted/admin agents |

**Key Insight**: `list_context` is the most important tool for AI efficiency. It lets agents see what's available without pulling all context (which wastes tokens). They can then selectively use `get_context` for only what they need.

## Setting Up Basic Agent Tools

Let's start with a simple example:

```python
from syntha import ContextMesh, ToolHandler

# Create context and tool handler
context = ContextMesh(user_id="company_workspace", enable_persistence=False)
handler = ToolHandler(context, agent_name="SalesAgent")

# Get the tool schemas to give to your LLM
tool_schemas = handler.get_schemas()
print(f"Available tools: {[schema['name'] for schema in tool_schemas]}")

# Simulate agent workflow
print("\n=== Agent Workflow ===")

# Step 1: Agent subscribes to relevant topics
result = handler.handle_tool_call("subscribe_to_topics", topics=["sales", "customers"])
print(f"1. Subscribe: {result['message']}")

# Step 2: Agent discovers what topics exist
result = handler.handle_tool_call("discover_topics")
print(f"2. Topics found: {result['topics']}")

# Step 3: Agent shares information
result = handler.handle_tool_call("push_context", 
    key="new_lead", 
    value='{"company": "TechCorp", "value": 75000, "status": "qualified"}',
    topics=["sales", "customers"]
)
print(f"3. Push result: {result['message']}")

# Step 4: Agent lists available context (efficient discovery)
result = handler.handle_tool_call("list_context")
print(f"4. Available context: {result['keys']}")

# Step 5: Agent gets specific context
result = handler.handle_tool_call("get_context", keys=["new_lead"])
print(f"5. Retrieved: {result['context']}")

context.close()
```

## The Smart Agent Pattern: List Before Get

The most efficient pattern for AI agents is **list first, then get selectively**:

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="smart_agent_demo", enable_persistence=False)

# Set up some context first
context.register_agent_topics("SmartAgent", ["projects", "tasks", "updates"])
context.push("project_alpha", {"status": "in_progress", "deadline": "2024-03-01"}, topics=["projects"])
context.push("task_123", {"priority": "high", "assigned_to": "SmartAgent"}, topics=["tasks"])
context.push("daily_standup", {"meeting_time": "09:00", "participants": 15}, topics=["updates"])
context.push("project_beta", {"status": "planning", "budget": 50000}, topics=["projects"])

handler = ToolHandler(context, agent_name="SmartAgent")

print("=== Smart Agent Pattern ===")

# ❌ INEFFICIENT: Get all context (wastes tokens)
# result = handler.handle_tool_call("get_context")  # Don't do this!

# ✅ EFFICIENT: List first to see what's available
result = handler.handle_tool_call("list_context")
available_keys = result['keys']
print(f"Available context: {available_keys}")

# Agent can now make smart decisions about what to retrieve
# For example, only get high-priority items
priority_keys = [key for key in available_keys if 'task' in key or 'project_alpha' in key]
result = handler.handle_tool_call("get_context", keys=priority_keys)
print(f"Retrieved priority items: {list(result['context'].keys())}")

context.close()
```

**Why this matters:**
- Saves tokens (and money) by not retrieving unnecessary context
- Helps agents focus on relevant information
- Scales better as context grows
- Gives agents control over their information diet

## Permissions and Roles: When You Need Them

**Simple Answer**: Most applications don't need complex permissions. Use them when you have specific security or control requirements.

### When to Use Permissions

**Use permissions when:**
- Different agents should have different capabilities
- You want to prevent agents from deleting topics
- You have untrusted or experimental agents
- You need audit trails of who did what
- Some agents are more privileged than others

**Skip permissions when:**
- All your agents are trusted
- You want simplicity
- You're in development/prototyping phase
- All agents should have the same capabilities

### Available Roles Explained

```python
from syntha import create_role_based_handler, get_role_info, PREDEFINED_ROLES

# See what roles are available
print("Available roles:")
for role_name, role_info in PREDEFINED_ROLES.items():
    print(f"  {role_name}: {role_info['description']}")
    print(f"    Tools: {role_info['tools']}")
```

**Role Breakdown:**

- **`readonly`**: Can only view and discover context
  - Good for: Monitoring agents, reporting agents, read-only integrations
  - Tools: `get_context`, `list_context`, `discover_topics`

- **`contributor`**: Can read, write, and manage subscriptions
  - Good for: Most working agents, collaborative agents
  - Tools: All readonly tools + `push_context`, `subscribe_to_topics`, `unsubscribe_from_topics`

- **`moderator`**: Contributor + can manage others' subscriptions
  - Good for: Supervisor agents, workflow coordinators
  - Tools: All contributor tools (no additional tools currently)

- **`admin`**: Full access including destructive operations
  - Good for: System agents, cleanup agents, administrative tools
  - Tools: All tools including `delete_topic`

### Role-Based Access Control Example

```python
from syntha import ContextMesh, create_role_based_handler

context = ContextMesh(user_id="company", enable_persistence=False)

# Create handlers with different roles
admin_handler = create_role_based_handler(context, "AdminAgent", "admin")
worker_handler = create_role_based_handler(context, "WorkerAgent", "contributor")
monitor_handler = create_role_based_handler(context, "MonitorAgent", "readonly")

print("=== Role-Based Access Control ===")

# Set up some topics and context
admin_handler.handle_tool_call("push_context", 
    key="system_config", 
    value='{"version": "1.0", "debug": false}',
    topics=["system"]
)

# Worker can contribute
worker_result = worker_handler.handle_tool_call("push_context",
    key="work_progress",
    value='{"task": "feature_x", "progress": 75}',
    topics=["work"]
)
print(f"Worker push: {worker_result['success']}")

# Monitor can only read
monitor_result = monitor_handler.handle_tool_call("list_context")
print(f"Monitor can see: {monitor_result['keys']}")

# Monitor cannot push (will fail)
try:
    monitor_push = monitor_handler.handle_tool_call("push_context",
        key="unauthorized",
        value="should fail",
        topics=["work"]
    )
except Exception as e:
    print(f"Monitor push failed (expected): Tool 'push_context' not available")

# Only admin can delete topics
admin_delete = admin_handler.handle_tool_call("delete_topic", 
    topic="system", 
    confirm=True
)
print(f"Admin delete: {admin_delete['success']}")

context.close()
```

## Advanced Agent Coordination Patterns

### Pattern 1: Agent Discovery and Self-Organization

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="self_organizing", enable_persistence=False)

# Create multiple agents
agents = {
    "DataAgent": ToolHandler(context, "DataAgent"),
    "AnalysisAgent": ToolHandler(context, "AnalysisAgent"),
    "ReportAgent": ToolHandler(context, "ReportAgent")
}

print("=== Self-Organizing Agent Pattern ===")

# Step 1: Agents discover existing topics
for name, handler in agents.items():
    result = handler.handle_tool_call("discover_topics")
    print(f"{name} discovers topics: {result.get('topics', [])}")

# Step 2: Agents self-organize by subscribing to relevant topics
agents["DataAgent"].handle_tool_call("subscribe_to_topics", topics=["data", "raw_input"])
agents["AnalysisAgent"].handle_tool_call("subscribe_to_topics", topics=["data", "analysis"])
agents["ReportAgent"].handle_tool_call("subscribe_to_topics", topics=["analysis", "reports"])

# Step 3: Data flows through the pipeline
agents["DataAgent"].handle_tool_call("push_context",
    key="raw_data",
    value='{"sales": [100, 200, 150], "date": "2024-01-15"}',
    topics=["data"]
)

agents["AnalysisAgent"].handle_tool_call("push_context",
    key="analysis_result", 
    value='{"trend": "increasing", "growth_rate": 0.25}',
    topics=["analysis"]
)

agents["ReportAgent"].handle_tool_call("push_context",
    key="final_report",
    value='{"summary": "Sales trending up 25%", "recommendation": "Increase inventory"}',
    topics=["reports"]
)

# Step 4: Each agent sees only relevant information
for name, handler in agents.items():
    result = handler.handle_tool_call("list_context")
    print(f"{name} sees: {result['keys']}")

context.close()
```

### Pattern 2: Selective Tool Distribution

Not all agents need all tools. Here's how to give different capabilities:

```python
from syntha import ContextMesh, create_restricted_handler

context = ContextMesh(user_id="selective_tools", enable_persistence=False)

print("=== Selective Tool Distribution ===")

# Create agents with only the tools they need

# Discovery agent: Only needs to find and read
discovery_handler = create_restricted_handler(
    context, 
    "DiscoveryAgent", 
    allowed_tools=["list_context", "get_context", "discover_topics"]
)

# Worker agent: Can read, write, and subscribe, but not delete
worker_handler = create_restricted_handler(
    context,
    "WorkerAgent",
    allowed_tools=["list_context", "get_context", "push_context", "subscribe_to_topics"]
)

# Cleanup agent: Has destructive powers
cleanup_handler = create_restricted_handler(
    context,
    "CleanupAgent", 
    allowed_tools=["list_context", "discover_topics", "delete_topic"]
)

# Test the restrictions
print(f"Discovery tools: {discovery_handler.get_available_tools()}")
print(f"Worker tools: {worker_handler.get_available_tools()}")
print(f"Cleanup tools: {cleanup_handler.get_available_tools()}")

# Worker sets up topics and data
worker_handler.handle_tool_call("subscribe_to_topics", topics=["work"])
worker_handler.handle_tool_call("push_context",
    key="completed_task",
    value='{"task_id": "123", "status": "done"}',
    topics=["work"]
)

# Discovery agent can find and read
result = discovery_handler.handle_tool_call("discover_topics")
print(f"Discovery found topics: {result['topics']}")

# Cleanup agent can remove topics when needed
# cleanup_handler.handle_tool_call("delete_topic", topic="work", confirm=True)

context.close()
```

### Pattern 3: Agent Hierarchies and Escalation

```python
from syntha import ContextMesh, create_role_based_handler

context = ContextMesh(user_id="hierarchy", enable_persistence=False)

# Create agent hierarchy
junior_agent = create_role_based_handler(context, "JuniorAgent", "readonly")
senior_agent = create_role_based_handler(context, "SeniorAgent", "contributor") 
manager_agent = create_role_based_handler(context, "ManagerAgent", "admin")

print("=== Agent Hierarchy Pattern ===")

# Manager sets up initial context
manager_agent.handle_tool_call("push_context",
    key="project_guidelines",
    value='{"quality_threshold": 0.95, "deadline": "2024-03-01"}',
    topics=["guidelines"]
)

# Senior agent does work and reports
senior_agent.handle_tool_call("subscribe_to_topics", topics=["guidelines", "work"])
senior_agent.handle_tool_call("push_context",
    key="work_in_progress",
    value='{"feature": "user_auth", "progress": 80, "quality": 0.92}',
    topics=["work"]
)

# Junior agent can only observe
junior_result = junior_agent.handle_tool_call("list_context")
print(f"Junior can see: {junior_result['keys']}")

# Senior agent notices quality issue and escalates
senior_agent.handle_tool_call("push_context",
    key="quality_concern",
    value='{"issue": "Quality below threshold", "current": 0.92, "required": 0.95}',
    topics=["escalation"]
)

# Manager can see everything and take action
manager_result = manager_agent.handle_tool_call("list_context") 
print(f"Manager sees: {manager_result['keys']}")

context.close()
```

## Production Best Practices

### 1. Start Simple, Add Complexity When Needed

```python
# ✅ GOOD: Start with basic tools
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="simple_start", enable_persistence=False)
handler = ToolHandler(context, "SimpleAgent")  # All tools available

# Later, add restrictions if needed
# handler = create_role_based_handler(context, "SimpleAgent", "contributor")
```

### 2. Give Agents the Minimum Tools They Need

```python
# ✅ GOOD: Specific tools for specific purposes
discovery_agent = create_restricted_handler(
    context, "DiscoveryAgent", 
    allowed_tools=["list_context", "get_context", "discover_topics"]
)

# ❌ OVERKILL: Giving all tools when only some are needed
# discovery_agent = ToolHandler(context, "DiscoveryAgent")  # Has delete_topic too!
```

### 3. Use Roles for Common Patterns

```python
# ✅ GOOD: Use predefined roles
monitor = create_role_based_handler(context, "MonitorAgent", "readonly")
worker = create_role_based_handler(context, "WorkerAgent", "contributor")
admin = create_role_based_handler(context, "AdminAgent", "admin")

# ❌ VERBOSE: Custom restrictions for common patterns
# monitor = create_restricted_handler(context, "MonitorAgent", 
#                                   allowed_tools=["get_context", "list_context", "discover_topics"])
```

### 4. Handle Tool Call Errors Gracefully

```python
from syntha import ContextMesh, ToolHandler, SynthaError

context = ContextMesh(user_id="error_handling", enable_persistence=False)
handler = ToolHandler(context, "ErrorProneAgent")

def safe_tool_call(handler, tool_name, **kwargs):
    """Safely handle tool calls with proper error handling"""
    try:
        result = handler.handle_tool_call(tool_name, **kwargs)
        if not result.get('success', False):
            print(f"Tool call failed: {result.get('error', 'Unknown error')}")
            return None
        return result
    except Exception as e:
        print(f"Exception during tool call: {e}")
        return None

# Use the safe wrapper
result = safe_tool_call(handler, "push_context", 
    key="test_data", 
    value="test_value",
    topics=["test"]
)

if result:
    print(f"Success: {result['message']}")

context.close()
```

## Complete Real-World Example: Customer Service System

Here's a complete example showing sophisticated agent coordination:

```python
from syntha import ContextMesh, create_role_based_handler, create_restricted_handler

def setup_customer_service():
    """Complete customer service system with proper tool distribution"""
    
    context = ContextMesh(user_id="customer_service", enable_persistence=False)
    
    # Create agents with appropriate tool access
    agents = {
        # Frontline agents can read, write, and subscribe
        "tier1_agent": create_role_based_handler(context, "Tier1Agent", "contributor"),
        
        # Supervisors have full access for escalations
        "supervisor": create_role_based_handler(context, "SupervisorAgent", "admin"),
        
        # Analytics agent only reads for reporting
        "analytics": create_role_based_handler(context, "AnalyticsAgent", "readonly"),
        
        # Notification agent only pushes updates
        "notifier": create_restricted_handler(
            context, "NotificationAgent",
            allowed_tools=["push_context", "discover_topics"]
        )
    }
    
    return context, agents

def simulate_customer_interaction(agents):
    """Simulate a customer service interaction"""
    
    print("=== Customer Service Simulation ===")
    
    # Step 1: Tier 1 agent receives customer issue
    agents["tier1_agent"].handle_tool_call("subscribe_to_topics", 
        topics=["support", "customers"]
    )
    
    agents["tier1_agent"].handle_tool_call("push_context",
        key="ticket_001",
        value='{"customer": "TechCorp", "issue": "API not working", "priority": "high"}',
        topics=["support"]
    )
    
    # Step 2: Analytics agent monitors (read-only)
    analytics_result = agents["analytics"].handle_tool_call("list_context")
    print(f"Analytics sees: {analytics_result['keys']}")
    
    # Step 3: Issue needs escalation - supervisor takes over
    agents["supervisor"].handle_tool_call("push_context",
        key="escalation_001", 
        value='{"ticket": "ticket_001", "reason": "Complex technical issue", "assigned": "senior_engineer"}',
        topics=["escalations"]
    )
    
    # Step 4: Notification agent sends updates
    agents["notifier"].handle_tool_call("push_context",
        key="notification_001",
        value='{"type": "escalation", "customer": "TechCorp", "status": "assigned"}',
        topics=["notifications"]
    )
    
    # Step 5: Show what each agent can see
    for name, handler in agents.items():
        if hasattr(handler, 'handle_tool_call'):
            try:
                result = handler.handle_tool_call("list_context")
                print(f"{name} can see: {result.get('keys', [])}")
            except:
                print(f"{name} cannot list context (restricted)")

if __name__ == "__main__":
    context, agents = setup_customer_service()
    simulate_customer_interaction(agents)
    context.close()
```

## What You've Mastered

You now understand:

- ✅ **Tool purposes** - What each tool is really for (users vs AI)
- ✅ **Efficient patterns** - List first, then get selectively
- ✅ **Permission strategy** - When to use roles vs when to keep it simple
- ✅ **Role-based access** - Readonly, contributor, moderator, admin
- ✅ **Selective tools** - Giving agents only what they need
- ✅ **Agent coordination** - Self-organization and hierarchy patterns
- ✅ **Production practices** - Error handling and gradual complexity

## Next Steps

Ready for advanced patterns? Continue to [Advanced Patterns](advanced.md) to learn:

- Combining topic-based and subscription-based routing
- Complex multi-agent workflows
- Performance optimization for large systems
- Integration patterns with external services

Or jump to [Real-World Examples](examples.md) for complete integrations with:

- OpenAI with actual API keys
- Multi-user applications
- Production deployment patterns