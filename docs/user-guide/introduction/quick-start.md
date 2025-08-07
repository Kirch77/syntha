# Quick Start Guide

Get up and running with Syntha in 5 minutes. This guide walks you through creating your first multi-agent system with shared context.

## Installation

```bash
pip install syntha
```

## Your First Multi-Agent System

### 1. Create a Context Mesh

```python
from syntha import ContextMesh, ToolHandler

# Create shared context space
context = ContextMesh(user_id="demo_user")
```

### 2. Add Some Context

```python
# Add global context (accessible by all agents)
context.push("project_name", "AI Customer Service")
context.push("deadline", "2025-03-15")

# Add agent-specific context
context.push(
    "api_credentials", 
    {"endpoint": "https://api.example.com", "version": "v2"},
    subscribers=["BackendAgent", "APIAgent"]
)
```

### 3. Create Agent Handlers

```python
# Create handlers for different agents
backend_handler = ToolHandler(context, "BackendAgent")
frontend_handler = ToolHandler(context, "FrontendAgent")
```

### 4. Agents Share Context

```python
# Backend agent shares status update
backend_handler.handle_tool_call(
    "push_context",
    key="api_status",
    value="API endpoints are ready for integration",
    subscribers=["FrontendAgent"]
)

# Frontend agent retrieves context
frontend_context = frontend_handler.handle_tool_call("get_context")
print(f"Frontend sees: {list(frontend_context['context'].keys())}")
```

### 5. Use with Your LLM

```python
from syntha import build_system_prompt

# Get context-aware system prompt
system_prompt = build_system_prompt("BackendAgent", context)

# Get tools for your LLM framework
tools = backend_handler.get_schemas()  # OpenAI format
# OR
langchain_tools = backend_handler.get_langchain_tools()  # LangChain format
# OR  
anthropic_tools = backend_handler.get_anthropic_tools()  # Anthropic format
```

## Complete Example

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

def main():
    # Create context mesh
    context = ContextMesh(user_id="demo_user")
    
    # Add shared knowledge
    context.push("project_goal", "Build an AI customer service system")
    context.push("deadline", "2025-03-01")
    
    # Create agents
    sales_agent = ToolHandler(context, "SalesAgent")
    support_agent = ToolHandler(context, "SupportAgent")
    
    # Agents can now share context through tools
    sales_agent.handle_tool_call(
        "push_context",
        key="customer_inquiry",
        value="Customer interested in enterprise plan",
        topics=["sales", "support"]
    )
    
    # Support agent automatically has access
    support_context = support_agent.handle_tool_call("get_context")
    print(f"Support agent sees: {list(support_context['context'].keys())}")
    
    # Get LLM-ready prompts and tools
    sales_prompt = build_system_prompt("SalesAgent", context)
    sales_tools = sales_agent.get_schemas()
    
    print("✅ Your multi-agent system is ready!")

if __name__ == "__main__":
    main()
```

## What Just Happened?

1. **Context Mesh** created a shared knowledge space
2. **Agents** could push and retrieve context through tools
3. **Topic-based routing** ensured relevant context reached the right agents
4. **Framework integration** provided LLM-ready prompts and tools

## Next Steps

- **[Core Concepts](../concepts/overview.md)** - Understand how Syntha works under the hood
- **[Examples](../../examples/overview.md)** - See working code examples for each feature
- **[Framework Integration](../concepts/adapters.md)** - Learn about integrating with your LLM framework

## Need Help?

- Check the [Examples](../../examples/overview.md) for working code samples
- Review [Core Concepts](../concepts/overview.md) for deeper understanding
- See [API Reference](../../api/overview.md) for complete documentation