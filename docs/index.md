# What is Syntha?

Syntha is a multi-agent context framework that solves the coordination problem in AI systems. Instead of manually passing data between agents, Syntha creates a shared knowledge space where agents can intelligently store, discover, and retrieve relevant information.

## The Problem

Building AI applications with multiple agents is challenging because:

- **Context Chaos**: Agents work in isolation without shared knowledge
- **Manual Coordination**: You have to manually pass data between agents
- **Information Loss**: Context gets lost during agent handoffs
- **Brittle Workflows**: One failed agent breaks the entire system

## The Solution

Syntha creates a **Context Mesh** - a smart, persistent memory layer that:

- **Automatically shares context** between agents based on topics and subscriptions
- **Maintains context continuity** across sessions and agent handoffs
- **Provides user isolation** to keep different users' data completely separate
- **Integrates seamlessly** with your existing LLM framework

## How It Works

```python
from syntha import ContextMesh, ToolHandler

# Create shared context space
context = ContextMesh(user_id="user123")

# Agents push context as they work
context.push("customer_data", {"name": "John", "tier": "Premium"})
context.push("analysis_result", research_data, topics=["sales", "strategy"])

# Other agents automatically get relevant context when they need it
handler = ToolHandler(context, "SalesAgent")
# Agent now has access to all relevant context through tools
```

## Key Benefits

- **Zero Configuration**: Works out of the box with SQLite, scales to PostgreSQL
- **Framework Agnostic**: Integrates with OpenAI, Anthropic, LangChain, and more
- **Production Ready**: 168+ tests, structured logging, proper error handling
- **User Isolation**: Complete separation between different users' contexts
- **Persistent Memory**: Context survives between sessions

## Who Should Use Syntha?

**Developers** building multi-agent AI applications who want to focus on agent logic instead of context management.

**Teams** creating scalable AI systems that need reliable agent coordination.

**Companies** deploying production AI applications that require robust context handling and user isolation.

## Next Steps

- [Quick Start Guide](quick-start.md) - Get up and running in 5 minutes
- [Installation](installation.md) - Detailed setup instructions
- [Core Concepts](../concepts/overview.md) - Understand how Syntha works