# Tools & Permissions Guide

This guide shows how agents interact with the context mesh through tools, and how to implement sophisticated access control systems. You'll learn to build secure multi-agent systems where different agents have different capabilities.

## Tools vs. Direct API: When to Use Each

### Tool-Based Integration (Recommended for Agents)

Tools provide a standardized interface that works with any LLM supporting function calling:

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, agent_name="SalesAgent")

# Agent uses tools to interact with context
result = handler.handle_tool_call("subscribe_to_topics", topics=["sales", "customers"])
result = handler.handle_tool_call("push_context", 
                                  key="lead_status", 
                                  value="qualified",
                                  topics=["sales"])
```

### Direct API (For System Integration)

Use direct API calls when you're building the system infrastructure:

```python
# System code managing agents
context.register_agent_topics("SalesAgent", ["sales", "customers"])
context.push("lead_status", "qualified", topics=["sales"])
```

## Setting Up Agent Tools

### Basic Tool Handler

```python
from syntha import ContextMesh, ToolHandler

# Create context and tool handler
context = ContextMesh(user_id="company_workspace")
sales_handler = ToolHandler(context, agent_name="SalesAgent")

# Get tool schemas for your LLM
tool_schemas = sales_handler.get_tool_schemas()
print(f"Available tools: {[schema['name'] for schema in tool_schemas]}")

# Agent workflow
sales_handler.handle_tool_call("subscribe_to_topics", topics=["sales", "leads"])
sales_handler.handle_tool_call("push_context", 
                               key="new_lead", 
                               value='{"company": "Acme Corp", "value": 50000}',
                               topics=["sales"])

context.close()
```

### Available Tools Overview

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `get_context` | Retrieve context data | `keys` (optional) |
| `push_context` | Share context with others | `key`, `value`, `topics`/`subscribers`, `ttl` |
| `list_context` | Discover available context | `pattern` (optional) |
| `subscribe_to_topics` | Subscribe to topics | `topics` |
| `discover_topics` | Find available topics | `pattern` (optional) |
| `unsubscribe_from_topics` | Unsubscribe from topics | `topics` |
| `delete_topic` | Delete topic and context | `topic`, `confirm` |

## Access Control Patterns

### Role-Based Access Control

Use predefined roles for common access patterns:

```python
from syntha import create_role_based_handler, get_role_info

# See available roles
print("Available roles:", get_role_info())

# Create handlers with different roles
admin_handler = create_role_based_handler(context, "AdminAgent", "admin")
readonly_handler = create_role_based_handler(context, "ViewerAgent", "readonly")
contributor_handler = create_role_based_handler(context, "WorkerAgent", "contributor")

# Test permissions
admin_tools = admin_handler.get_available_tools()
readonly_tools = readonly_handler.get_available_tools()

print(f"Admin can use: {admin_tools}")
print(f"Readonly can use: {readonly_tools}")

# Only admin can delete topics
admin_result = admin_handler.handle_tool_call("delete_topic", 
                                              topic="test_topic", 
                                              confirm=True)
print(f"Admin delete result: {admin_result['success']}")

# Readonly cannot delete topics
readonly_result = readonly_handler.handle_tool_call("delete_topic", 
                                                    topic="test_topic", 
                                                    confirm=True)
print(f"Readonly delete result: {readonly_result['success']}")  # False

context.close()
```

### Custom Permissions

Create fine-grained access control:

```python
from syntha import ToolHandler

context = ContextMesh(user_id="secure_workspace")

# Agent that can only read and subscribe
limited_handler = ToolHandler(
    context, 
    agent_name="LimitedAgent",
    allowed_tools=["get_context", "list_context", "subscribe_to_topics"]
)

# Agent that can do everything except delete
safe_handler = ToolHandler(
    context,
    agent_name="SafeAgent", 
    denied_tools=["delete_topic"]
)

# Test the restrictions
limited_result = limited_handler.handle_tool_call("push_context", 
                                                  key="test", 
                                                  value="data")
print(f"Limited agent push: {limited_result['success']}")  # False

safe_result = safe_handler.handle_tool_call("push_context", 
                                            key="test", 
                                            value="data")
print(f"Safe agent push: {safe_result['success']}")  # True

context.close()
```

### Multi-Agent Access Control

Set up multiple agents with different permissions:

```python
from syntha import create_multi_agent_handlers

context = ContextMesh(user_id="team_workspace")

# Define agent configurations
agent_configs = {
    "TeamLead": {"role": "admin"},
    "Developer": {"role": "contributor"},
    "Intern": {"role": "readonly"},
    "DataAnalyst": {
        "allowed_tools": ["get_context", "list_context", "push_context"],
        "denied_tools": ["delete_topic"]
    },
    "Monitor": {
        "allowed_tools": ["get_context", "list_context", "discover_topics"]
    }
}

# Create all handlers at once
handlers = create_multi_agent_handlers(context, agent_configs)

# Set up topic subscriptions
handlers["Developer"].handle_tool_call("subscribe_to_topics", 
                                       topics=["development", "bugs"])
handlers["DataAnalyst"].handle_tool_call("subscribe_to_topics", 
                                         topics=["analytics", "reports"])

# Developer shares a bug report
dev_result = handlers["Developer"].handle_tool_call(
    "push_context",
    key="bug_report",
    value='{"id": "BUG-123", "severity": "high", "component": "auth"}',
    topics=["bugs", "development"]
)

# Team lead can see everything
lead_context = handlers["TeamLead"].handle_tool_call("get_context")
print(f"Team lead sees: {list(lead_context['context'].keys())}")

# Intern can only read
intern_context = handlers["Intern"].handle_tool_call("get_context")
print(f"Intern sees: {list(intern_context['context'].keys())}")

context.close()
```

## Advanced Tool Usage

### Topic-Based Workflows

Build scalable agent coordination using topics:

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="workflow_demo")

# Create agents for different stages of a workflow
intake_agent = ToolHandler(context, "IntakeAgent")
processing_agent = ToolHandler(context, "ProcessingAgent") 
quality_agent = ToolHandler(context, "QualityAgent")
delivery_agent = ToolHandler(context, "DeliveryAgent")

# Set up the workflow pipeline
intake_agent.handle_tool_call("subscribe_to_topics", topics=["intake", "requests"])
processing_agent.handle_tool_call("subscribe_to_topics", topics=["processing", "intake"])
quality_agent.handle_tool_call("subscribe_to_topics", topics=["quality", "processing"])
delivery_agent.handle_tool_call("subscribe_to_topics", topics=["delivery", "quality"])

# Simulate workflow
# Step 1: New request comes in
intake_agent.handle_tool_call(
    "push_context",
    key="request_001",
    value='{"type": "feature", "priority": "high", "description": "Add user dashboard"}',
    topics=["intake"]
)

# Step 2: Processing agent picks it up and adds analysis
processing_agent.handle_tool_call(
    "push_context", 
    key="analysis_001",
    value='{"request_id": "request_001", "estimated_hours": 40, "complexity": "medium"}',
    topics=["processing"]
)

# Step 3: Quality agent reviews
quality_agent.handle_tool_call(
    "push_context",
    key="review_001", 
    value='{"request_id": "request_001", "status": "approved", "notes": "Good to proceed"}',
    topics=["quality"]
)

# Step 4: Delivery agent can see the complete pipeline
delivery_context = delivery_agent.handle_tool_call("get_context")
print("Delivery agent sees complete workflow:")
for key, value in delivery_context["context"].items():
    print(f"  {key}: {value}")

context.close()
```

### Error Handling and Recovery

Handle tool errors gracefully:

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="error_demo")
handler = ToolHandler(context, "ErrorProneAgent")

def safe_tool_call(handler, tool_name, **kwargs):
    """Safely execute tool calls with error handling."""
    try:
        result = handler.handle_tool_call(tool_name, **kwargs)
        
        if result["success"]:
            print(f"✅ {tool_name} succeeded: {result.get('message', 'OK')}")
            return result
        else:
            print(f"❌ {tool_name} failed: {result['error']}")
            if "suggestion" in result:
                print(f"💡 Suggestion: {result['suggestion']}")
            return None
            
    except Exception as e:
        print(f"🚨 Unexpected error in {tool_name}: {e}")
        return None

# Try various operations
safe_tool_call(handler, "subscribe_to_topics", topics=["sales"])
safe_tool_call(handler, "push_context", key="test", value="data", topics=["sales"])
safe_tool_call(handler, "get_context", keys=["test"])
safe_tool_call(handler, "delete_topic", topic="nonexistent", confirm=True)

context.close()
```

### Dynamic Permission Management

Change agent permissions at runtime:

```python
from syntha import ToolHandler

context = ContextMesh(user_id="dynamic_permissions")

# Start with limited permissions
agent = ToolHandler(context, "DynamicAgent", 
                   allowed_tools=["get_context", "list_context"])

print(f"Initial tools: {agent.get_available_tools()}")

# Try to push context (should fail)
result = agent.handle_tool_call("push_context", key="test", value="data")
print(f"Push with limited permissions: {result['success']}")

# Upgrade permissions by creating new handler
agent = ToolHandler(context, "DynamicAgent", 
                   allowed_tools=["get_context", "list_context", "push_context"])

print(f"Upgraded tools: {agent.get_available_tools()}")

# Now push should work
result = agent.handle_tool_call("push_context", key="test", value="data")
print(f"Push with upgraded permissions: {result['success']}")

context.close()
```

## LLM Integration Examples

### OpenAI Function Calling

```python
import openai
import json
from syntha import ContextMesh, ToolHandler

# Set up context and agent
context = ContextMesh(user_id="openai_demo")
handler = ToolHandler(context, "OpenAIAgent")

# Subscribe to topics first
handler.handle_tool_call("subscribe_to_topics", topics=["sales", "support"])

# Get tool schemas for OpenAI
tools = [{"type": "function", "function": schema} 
         for schema in handler.get_tool_schemas()]

# Simulate conversation with function calling
messages = [
    {"role": "system", "content": "You are a sales assistant. Use tools to manage context."},
    {"role": "user", "content": "I just closed a deal with Acme Corp for $50k. Please record this."}
]

# This would be your actual OpenAI call
# response = openai.chat.completions.create(
#     model="gpt-4",
#     messages=messages,
#     tools=tools
# )

# Simulate the function call that would come from OpenAI
simulated_function_call = {
    "name": "push_context",
    "arguments": json.dumps({
        "key": "deal_acme_corp",
        "value": json.dumps({"company": "Acme Corp", "value": 50000, "status": "closed"}),
        "topics": ["sales"]
    })
}

# Handle the function call
result = handler.handle_tool_call(
    simulated_function_call["name"],
    **json.loads(simulated_function_call["arguments"])
)

print(f"Function call result: {result}")

# Verify the context was stored
verification = handler.handle_tool_call("get_context", keys=["deal_acme_corp"])
print(f"Stored context: {verification}")

context.close()
```

### Anthropic Claude Integration

```python
# Anthropic integration example
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="claude_demo")
handler = ToolHandler(context, "ClaudeAgent")

# Get tool schemas (Anthropic format is similar to OpenAI)
tools = handler.get_tool_schemas()

# Example of how you'd use with Anthropic's client
"""
import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[{"role": "user", "content": "Help me organize project information"}],
    tools=tools
)

# Handle tool calls from Claude
for content in response.content:
    if content.type == "tool_use":
        result = handler.handle_tool_call(content.name, **content.input)
        print(f"Tool result: {result}")
"""

context.close()
```

## Best Practices

### Security Guidelines

```python
from syntha import ContextMesh, ToolHandler

# ✅ GOOD: Always use user isolation
user_context = ContextMesh(user_id="user_123")

# ✅ GOOD: Principle of least privilege
restricted_agent = ToolHandler(
    user_context,
    "RestrictedAgent",
    allowed_tools=["get_context", "list_context"]  # Only what's needed
)

# ✅ GOOD: Validate tool results
result = restricted_agent.handle_tool_call("get_context")
if result and result.get("success"):
    # Process the result
    context_data = result["context"]
else:
    # Handle the error
    print(f"Tool call failed: {result.get('error', 'Unknown error')}")

# ❌ BAD: No user isolation
# shared_context = ContextMesh()  # Security risk!

# ❌ BAD: Overly permissive
# admin_for_everything = ToolHandler(context, "Agent", denied_tools=[])

user_context.close()
```

### Performance Optimization

```python
from syntha import ContextMesh, ToolHandler

# ✅ GOOD: Reuse handlers for the same agent
context = ContextMesh(user_id="perf_demo")
agent_handler = ToolHandler(context, "Agent1")

# Multiple operations with same handler
for i in range(10):
    agent_handler.handle_tool_call("push_context", 
                                   key=f"metric_{i}", 
                                   value=f"value_{i}")

# ✅ GOOD: Batch context retrieval
all_context = agent_handler.handle_tool_call("get_context")  # Gets all at once
# vs. multiple individual calls

# ✅ GOOD: Use appropriate TTL
agent_handler.handle_tool_call("push_context",
                               key="temp_status",
                               value="processing", 
                               ttl=300)  # 5 minutes

context.close()
```

### Topic Organization

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="topic_demo")

# ✅ GOOD: Hierarchical topic naming
sales_agent = ToolHandler(context, "SalesAgent")
sales_agent.handle_tool_call("subscribe_to_topics", topics=[
    "sales.leads",      # Specific to leads
    "sales.deals",      # Specific to deals
    "sales.reports",    # Specific to reports
    "company.announcements"  # Company-wide info
])

# ✅ GOOD: Logical grouping
support_agent = ToolHandler(context, "SupportAgent") 
support_agent.handle_tool_call("subscribe_to_topics", topics=[
    "support.tickets",
    "support.escalations",
    "company.announcements"  # Shared with sales
])

# ✅ GOOD: Context with clear naming
sales_agent.handle_tool_call("push_context",
                             key="q4_sales_target",  # Clear, descriptive
                             value='{"target": 1000000, "current": 750000}',
                             topics=["sales.reports"])

context.close()
```

!!! warning "Critical Security Reminder"
    - **Always use `user_id`** - Never share context between users
    - **Apply least privilege** - Give agents only the tools they need
    - **Validate tool results** - Always check success/failure before proceeding
    - **Use appropriate TTL** - Don't let sensitive data live forever
    - **Monitor tool usage** - Log and audit agent tool calls in production

## Troubleshooting

### Common Tool Issues

**Agent can't access context:**
```python
# Check agent's subscriptions
result = handler.handle_tool_call("discover_topics")
print(f"Available topics: {result}")

# Verify agent is subscribed
handler.handle_tool_call("subscribe_to_topics", topics=["needed_topic"])
```

**Permission denied errors:**
```python
# Check available tools
available = handler.get_available_tools()
print(f"Agent can use: {available}")

# Create handler with needed permissions
handler = ToolHandler(context, "Agent", allowed_tools=["needed_tool"])
```

**Context not persisting:**
```python
# Verify persistence is enabled
context = ContextMesh(user_id="user123", enable_persistence=True)
```

## Next Steps

You now understand how to build sophisticated multi-agent systems with proper access control! You can:

- Set up role-based permissions for different agent types
- Build scalable topic-based workflows
- Integrate with any LLM that supports function calling
- Apply security best practices
- Handle errors gracefully

Continue to [Final Remarks](final-remarks.md) to tie everything together with production deployment tips and overall best practices.