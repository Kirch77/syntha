# Tools Guide: Give Your Agents Context Superpowers

This guide shows you exactly which tools to give your agents and when. You'll learn practical patterns that make agents smarter and more efficient.

## Quick Start: Essential Tools Every Agent Needs

```python
from syntha import ContextMesh, ToolHandler

# Create context and handler
context = ContextMesh(user_id="your_user", enable_persistence=True)
handler = ToolHandler(context, agent_name="SmartAgent")

# Get tools for your agent (these are the essentials)
essential_tools = handler.get_schemas()

# Give these to your LLM - your agent now has context superpowers!
```

## The Smart Agent Pattern: List → Get → Push

The most efficient pattern for AI agents:

```python
# 1. ALWAYS start by listing what's available (saves tokens!)
available = agent.use_tool("list_context")

# 2. Get only what you need (selective retrieval)
if "user_preferences" in available["keys"]:
    context = agent.use_tool("get_context", keys=["user_preferences"])

# 3. Share your findings (enable collaboration)  
agent.use_tool("push_context", 
               key="analysis_results", 
               value="Key insights: ...",
               topics=["analysis", "results"])
```

## Tool Decision Matrix: Which Tools to Give When

| Agent Type | Essential Tools | Optional Tools | Skip These |
|------------|----------------|----------------|------------|
| **Single Agent** | `get_context`, `push_context`, `list_context` | `subscribe_to_topics` | `discover_topics`, `unsubscribe_from_topics` |
| **Multi-Agent Team** | All tools | None | `delete_topic` (unless admin) |
| **Read-Only Agent** | `get_context`, `list_context` | `subscribe_to_topics` | `push_context`, `delete_topic` |
| **Admin Agent** | All tools | None | None |

## Practical Integration Patterns

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

## When to Use Permissions and Roles

**Simple Answer**: Most applications don't need complex permissions. Use them when you have specific security or control requirements.

### Use Permissions When:

- **Multi-tenant applications**: Different users should see different data
- **Agent hierarchies**: Junior agents shouldn't delete senior agent work
- **Production safety**: Prevent agents from accidentally destroying important data
- **Compliance requirements**: Audit trails and access controls are mandatory

### Skip Permissions When:

- **Single user applications**: Just use different `user_id` values
- **Trusted environments**: All agents are working toward the same goal
- **Prototyping**: Keep it simple until you need the complexity

## Tool Performance Tips

### 1. Use `list_context` First (Always!)

```python
# ❌ Inefficient - pulls all context
context_result = handler.handle_tool_call("get_context")

# ✅ Efficient - see what's available first
available = handler.handle_tool_call("list_context")
if "user_preferences" in available["keys"]:
    context_result = handler.handle_tool_call("get_context", keys=["user_preferences"])
```

### 2. Set Smart TTL Values

```python
# Short-lived data (user session)
handler.handle_tool_call("push_context",
    key="current_session",
    value=session_data,
    ttl_hours=8  # Expires after 8 hours
)

# Long-lived data (user preferences)
handler.handle_tool_call("push_context", 
    key="user_preferences",
    value=preferences,
    ttl_hours=168  # Expires after 1 week
)
```

### 3. Use Topics for Organization

```python
# Organize by function
handler.handle_tool_call("subscribe_to_topics", topics=["user_data", "preferences"])

# Organize by urgency  
handler.handle_tool_call("subscribe_to_topics", topics=["urgent", "normal", "low_priority"])

# Organize by workflow stage
handler.handle_tool_call("subscribe_to_topics", topics=["input", "processing", "output"])
```

## Common Patterns Summary

### The Efficient Agent (Most Common)

```python
# 1. List what's available (saves tokens)
available = handler.handle_tool_call("list_context")

# 2. Get only what you need
relevant_keys = [k for k in available["keys"] if "user" in k]
if relevant_keys:
    context = handler.handle_tool_call("get_context", keys=relevant_keys)

# 3. Do your work with context

# 4. Share results for other agents
handler.handle_tool_call("push_context",
    key="analysis_result",
    value=results,
    topics=["analysis"]
)
```

### The Team Player (Multi-Agent)

```python
# Subscribe to team topics
handler.handle_tool_call("subscribe_to_topics", topics=["team", "project_alpha"])

# Check what teammates have shared
available = handler.handle_tool_call("list_context")

# Share your contributions
handler.handle_tool_call("push_context",
    key="my_contribution",
    value=work_result,
    topics=["team", "project_alpha"]
)
```

### The Explorer (Discovery-Focused)

```python
# Find active topics
topics_result = handler.handle_tool_call("discover_topics")
active_topics = topics_result.get("topics", [])

# Join interesting conversations
relevant_topics = [t for t in active_topics if "research" in t]
if relevant_topics:
    handler.handle_tool_call("subscribe_to_topics", topics=relevant_topics)
```

## Quick Reference: Tool Cheat Sheet

| Tool | When to Use | Performance Impact |
|------|-------------|-------------------|
| `list_context` | **Always first!** | Low - just returns keys |
| `get_context` | After listing, get specific items | Medium - depends on data size |
| `push_context` | Share results, save for later | Low - async operation |
| `subscribe_to_topics` | Multi-agent setups | Low - just updates subscriptions |
| `discover_topics` | Find existing conversations | Low - returns topic list |
| `unsubscribe_from_topics` | Reduce noise | Low - updates subscriptions |
| `delete_topic` | Cleanup, admin tasks | Medium - removes all data |

## What You've Learned

You now know:

- ✅ **Which tools to give which agents** - Use the decision matrix
- ✅ **The smart agent pattern** - List → Get → Push
- ✅ **When to use permissions** - Security and hierarchy scenarios
- ✅ **Performance optimization** - List first, selective retrieval
- ✅ **Common integration patterns** - Self-organization, hierarchies, teams

**Your agents are now ready to be context-aware and efficient!**

## Framework Integration: Get Tools in Your Format

Syntha provides dedicated adapters for popular AI frameworks. Instead of dealing with JSON schemas, get tools in your framework's native format:

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="your_user", enable_persistence=True)
handler = ToolHandler(context, "YourAgent")

# Get tools in your framework's native format - just one line!
langchain_tools = handler.get_langchain_tools()      # LangChain BaseTool instances
openai_functions = handler.get_openai_functions()    # OpenAI function definitions  
anthropic_tools = handler.get_anthropic_tools()      # Anthropic tool schemas
agno_tools = handler.get_tools_for_framework("agno") # Agno-compatible tools
generic_tools = handler.get_schemas()                # Universal JSON schemas
```

### Framework Adapter Benefits

| Framework | Method | What You Get | Key Benefits |
|-----------|--------|--------------|--------------|
| **LangChain** | `get_langchain_tools()` | Native `BaseTool` instances | Automatic Pydantic schemas, type safety |
| **LangGraph** | `get_langgraph_tools()` | Tool dictionaries | Perfect for multi-agent workflows |
| **OpenAI** | `get_openai_functions()` | Function call definitions | Drop-in replacement for manual functions |
| **Anthropic** | `get_anthropic_tools()` | Claude tool schemas | Native tool use integration |
| **Agno** | `get_tools_for_framework("agno")` | Agno-compatible tools | Flexible async support |
| **Universal** | `get_schemas()` | JSON schemas | Works with any framework |

Next: Check out the [Framework Integration Guide](examples.md) to see complete examples for LangChain, OpenAI, Anthropic, Agno, and more.

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