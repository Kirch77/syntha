# Syntha SDK

**The multi-agent context framework that actually works**

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
[![Tests](https://img.shields.io/badge/tests-168%2B-brightgreen.svg)]()
[![Documentation](https://img.shields.io/badge/docs-available-blue.svg)](https://docs.syntha.ai)

> Stop fighting context chaos. Start building intelligent agent teams.

---

## The Problem with Multi-Agent AI Today

If you've tried building systems with multiple AI agents, you know the frustration. Agent A discovers something important, but Agent B has no idea it happened. Agent C repeats work that Agent A already completed. Your carefully orchestrated workflow breaks when one agent fails, and suddenly your entire system is passing stale context around like a game of telephone.

Most developers end up writing brittle code that manually shuttles data between agents:

```python
# The painful reality of multi-agent systems today
agent1_result = call_agent1(user_input)
agent2_result = call_agent2(user_input, agent1_result)  # Hope this doesn't fail
agent3_result = call_agent3(user_input, agent1_result, agent2_result)  # Getting unwieldy...

# What happens when agent2 crashes? How do you handle user isolation? 
# Where does this context live between sessions?
```

We built Syntha because we were tired of reinventing context management for every multi-agent project.

## What Syntha Actually Does

Syntha creates a **Context Mesh** - think of it as a smart, persistent memory that your agents can read from and write to. Instead of manually passing data around, agents automatically share relevant context through this intelligent layer.

Here's the same workflow, but with Syntha handling the complexity:

```python
from syntha import ContextMesh, ToolHandler

# Create a shared context space (automatically isolated by user)
context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "SalesAgent")

# Agents push context as they work
context.push("customer_preferences", {"budget": 50000, "timeline": "Q2"})
context.push("market_analysis", research_data, topics=["sales", "strategy"])

# Other agents automatically get relevant context when they need it
# No manual passing, no broken chains, no lost information
```

The magic happens behind the scenes. Agents get the context they need, when they need it, without you having to orchestrate every handoff.

## Why This Approach Works

**Intelligent Routing**: Context gets routed based on topics, agent subscriptions, or globally. Your sales agent doesn't get flooded with engineering context, but gets everything related to customers and deals.

**User Isolation**: Every user gets their own completely separate context space. No data leakage, no privacy concerns.

**Persistent Memory**: Context survives between sessions. Your agents remember previous conversations and build on past work.

**Framework Agnostic**: Works with OpenAI, Anthropic, or whatever LLM framework you prefer. Syntha doesn't lock you into any particular AI provider.

**Production Ready**: We've battle-tested this with 168+ comprehensive tests, structured logging, and proper error handling. It's designed for real applications, not just demos.

## See It in Action

Let's say you're building a customer service system with specialized agents:

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Each customer gets isolated context
context = ContextMesh(user_id="customer_456")

# First agent gathers customer info
context.push("customer_issue", {
    "type": "billing_question",
    "account_id": "ACC123", 
    "priority": "high"
})

# Technical agent adds account details
context.push("account_status", {
    "plan": "premium",
    "last_payment": "2025-01-15",
    "outstanding_balance": 0
}, topics=["billing", "account"])

# Manager agent automatically has full context
manager_handler = ToolHandler(context, "ManagerAgent")
manager_prompt = build_system_prompt("ManagerAgent", context)

# No manual context passing required - the manager sees everything relevant
```

Or imagine agents coordinating on a sales opportunity:

```python
# Sales agent discovers a lead
context.push("sales_lead", {
    "company": "TechCorp",
    "budget": 100000,
    "decision_maker": "CTO"
}, topics=["sales", "enterprise"])

# Marketing agent enriches with research
context.push("company_research", {
    "tech_stack": ["Python", "AWS"],
    "recent_funding": "Series B",
    "competitors": ["CompetitorA", "CompetitorB"]  
}, topics=["sales", "research"])

# Account manager gets the complete picture
sales_keys = context.get_available_keys_by_topic("AccountManager").get("sales", [])
# Perfect handoff with zero information loss
```

## Works with Your Existing Setup

Syntha integrates seamlessly with whatever LLM framework you're already using:

**OpenAI Integration:**
```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "AssistantAgent")

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": build_system_prompt("AssistantAgent", context)},
        {"role": "user", "content": "Help me with my project"}
    ],
    tools=handler.get_schemas(),  # Syntha tools automatically included
    tool_choice="auto"
)
```

**Anthropic Claude:**
```python
import anthropic
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "ClaudeAgent")

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    tools=handler.get_schemas(),
    messages=[{"role": "user", "content": "Analyze our sales data"}]
)
```

## Real-World Applications

**Customer Support Teams**: Route complex issues through specialized agents while maintaining complete conversation history and customer context.

**Sales Intelligence**: Coordinate research agents, outreach agents, and account managers with shared lead intelligence and company research.

**Content Operations**: Manage editorial workflows where writers, editors, and publishers collaborate with shared style guides and content calendars.

**Development Workflows**: Build code review systems where different agents handle security analysis, performance review, and style checking with shared codebase context.

**Research Projects**: Coordinate data collection agents, analysis agents, and reporting agents with shared datasets and findings.

## Performance That Scales

| Configuration | Context Operations/sec | Concurrent Users | Best For |
|---------------|----------------------|------------------|----------|
| **SQLite** | 10,000+ | 100+ | Development, small teams |
| **PostgreSQL** | 50,000+ | 10,000+ | Production, enterprise |

Both configurations provide full ACID compliance and data persistence.

## Getting Started

Install Syntha:
```bash
pip install syntha
```

Create your first multi-agent system:
```python
from syntha import ContextMesh, ToolHandler

# Create context mesh
context = ContextMesh(user_id="demo_user")

# Add shared knowledge
context.push("project_goal", "Build an AI customer service system")
context.push("deadline", "2025-03-01")

# Create agents that share context
sales_agent = ToolHandler(context, "SalesAgent")
support_agent = ToolHandler(context, "SupportAgent")

print("Your first multi-agent system is ready!")
```

Integrate with your LLM:
```python
# Get Syntha tools and context-aware prompts
tools = sales_agent.get_schemas()
system_prompt = build_system_prompt("SalesAgent", context)

# Use with your preferred LLM framework
```

## Learn More

- **[Documentation](https://docs.syntha.ai)** - Complete guides and API reference
- **[Installation Guide](docs/installation.md)** - Get running in 5 minutes  
- **[Core Concepts](docs/core-concepts.md)** - Understand the architecture
- **[Examples](examples/)** - Real-world implementation patterns
- **[API Reference](docs/api/)** - Detailed API documentation

## Community

- **Issues**: [GitHub Issues](https://github.com/syntha/syntha-sdk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/syntha/syntha-sdk/discussions)
- **Email**: [contact@syntha.ai](mailto:contact@syntha.ai)

## License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

---

**Ready to build intelligent agent teams?**

[Get Started](docs/installation.md) • [Examples](examples/) • [Documentation](https://docs.syntha.ai)

*Built by the Syntha Team*
