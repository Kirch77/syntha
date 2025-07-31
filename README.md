# 🧠 Syntha SDK

**The Multi-Agent Context Framework That Actually Works**

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
[![Tests](https://img.shields.io/badge/tests-168%2B-brightgreen.svg)]()
[![Documentation](https://img.shields.io/badge/docs-available-blue.svg)](https://docs.syntha.ai)

> **Stop fighting context chaos. Start building intelligent agent teams.**

---

## 🎯 What is Syntha?

Syntha is a **production-ready Python SDK** that solves the hardest problem in multi-agent AI systems: **intelligent context sharing**. 

Instead of manually passing data between agents through complex chains, Syntha creates a **Context Mesh** - a smart memory system where agents automatically share knowledge, coordinate work, and build on each other's insights.

### The Problem We Solve

Building multi-agent AI systems today feels like this:

```python
# 😫 The old way - context chaos
agent1_result = call_agent1(user_input)
agent2_result = call_agent2(user_input, agent1_result)  # Manual passing
agent3_result = call_agent3(user_input, agent1_result, agent2_result)  # Getting messy...
# What if agent2 fails? What about persistence? User isolation? 😵‍💫
```

### The Syntha Way

```python
# ✨ The Syntha way - intelligent context sharing
from syntha import ContextMesh, ToolHandler

# Create shared intelligence layer
context = ContextMesh(user_id="user123")  # Automatic user isolation
handler = ToolHandler(context, "SalesAgent")

# Agents share context automatically
context.push("customer_preferences", {"budget": 50000, "timeline": "Q2"})
context.push("market_analysis", data, topics=["sales", "strategy"])

# Other agents get relevant context automatically
# No manual passing, no broken chains, no lost context
```

---

## 🚀 Why Developers Love Syntha

### ⚡ **Instant Setup, Zero Architecture Changes**
```bash
pip install syntha
# That's it. No databases to configure, no complex setup.
```

### 🧠 **Smart Context Routing**
- **Topic-based**: Route context by subject matter (`["sales", "analytics"]`)
- **Agent-specific**: Target specific agents (`subscribers=["Agent1", "Agent2"]`)
- **Global**: Share with everyone (default behavior)

### 🔒 **Production-Grade Security**
- **User isolation**: Complete separation between users' contexts
- **Access control**: Role-based permissions for tools and data
- **Audit logging**: Track every context operation

### 🗄️ **Persistent & Scalable**
- **SQLite**: Perfect for development and small deployments
- **PostgreSQL**: Production-ready with full ACID compliance
- **Framework agnostic**: Works with OpenAI, Anthropic, or any LLM

### 🛡️ **Battle-Tested Reliability**
- **168+ comprehensive tests** covering edge cases
- **Structured logging** with performance monitoring
- **Custom exception hierarchy** with recovery suggestions
- **Type hints** throughout for better IDE support

---

## 🎬 See It In Action

### Multi-Agent Customer Service System
```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Initialize with user isolation (required for production)
context = ContextMesh(user_id="customer_456")

# Customer service agent gathers info
context.push("customer_issue", {
    "type": "billing_question",
    "account_id": "ACC123",
    "priority": "high"
})

# Technical agent adds context
context.push("account_status", {
    "plan": "premium",
    "last_payment": "2025-01-15",
    "outstanding_balance": 0
}, topics=["billing", "account"])

# Manager agent gets full context automatically
manager_handler = ToolHandler(context, "ManagerAgent")
manager_prompt = build_system_prompt("ManagerAgent", context)

# Manager now has complete customer context without manual passing!
```

### Real-Time Agent Coordination
```python
# Sales agent discovers opportunity
context.push("sales_lead", {
    "company": "TechCorp",
    "budget": 100000,
    "decision_maker": "CTO"
}, topics=["sales", "enterprise"])

# Marketing agent adds intelligence
context.push("company_research", {
    "tech_stack": ["Python", "AWS"],
    "recent_funding": "Series B",
    "competitors": ["CompetitorA", "CompetitorB"]
}, topics=["sales", "research"])

# Account manager gets complete picture
account_data = context.get_by_topics(["sales"], "AccountManager")
# Perfect handoff with zero information loss
```

---

## 🛠️ Framework Integration

### OpenAI Integration
```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "AssistantAgent")

# Syntha tools work seamlessly with OpenAI
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": build_system_prompt("AssistantAgent", context)},
        {"role": "user", "content": "Help me with my project"}
    ],
    tools=handler.get_schemas(),  # Syntha tools auto-included
    tool_choice="auto"
)
```

### Anthropic Claude Integration
```python
import anthropic
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "ClaudeAgent")

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1000,
    tools=handler.get_schemas(),  # Works perfectly with Claude
    messages=[{"role": "user", "content": "Analyze our sales data"}]
)
```

---

## 📊 Real-World Use Cases

### 🏢 **Enterprise AI Assistants**
- Customer service teams with specialized agents
- Sales intelligence with research and outreach coordination
- Technical support with escalation workflows

### 🔬 **Research & Analysis**
- Multi-step data analysis pipelines
- Document processing with specialist agents
- Market research with coordinated intelligence gathering

### 🏗️ **Development Workflows**
- Code review agents with context sharing
- DevOps automation with state management
- Project management with cross-team coordination

### 🎯 **Content Creation**
- Editorial workflows with writer/editor coordination
- Marketing campaigns with multi-channel agents
- Social media management with brand consistency

---

## 📈 Performance & Scale

| Metric | SQLite | PostgreSQL |
|--------|--------|------------|
| **Context Operations/sec** | 10,000+ | 50,000+ |
| **Concurrent Users** | 100+ | 10,000+ |
| **Storage Limit** | 281 TB | Unlimited |
| **ACID Compliance** | ✅ | ✅ |
| **Production Ready** | Small-Medium | Enterprise |

---

## 🚀 Quick Start

### 1. Install Syntha
```bash
pip install syntha
```

### 2. Your First Multi-Agent System
```python
from syntha import ContextMesh, ToolHandler

# Create context mesh
context = ContextMesh(user_id="demo_user")

# Add some shared knowledge
context.push("project_goal", "Build an AI customer service system")
context.push("deadline", "2025-03-01")

# Create agents that share context
sales_agent = ToolHandler(context, "SalesAgent")
support_agent = ToolHandler(context, "SupportAgent")

# Agents now have shared context automatically!
print("🎉 Your first multi-agent system is ready!")
```

### 3. Integrate with Your LLM
```python
# Works with any LLM framework
tools = sales_agent.get_schemas()  # Get Syntha tools
system_prompt = build_system_prompt("SalesAgent", context)  # Context-aware prompt

# Use with your preferred LLM (OpenAI, Anthropic, etc.)
```

---

## 📚 Learn More

| Resource | Description |
|----------|-------------|
| 📖 **[Documentation](https://docs.syntha.ai)** | Complete guides and API reference |
| 🚀 **[Quick Start Guide](docs/installation.md)** | Get running in 5 minutes |
| 🧠 **[Core Concepts](docs/core-concepts.md)** | Understand the architecture |
| 💡 **[Examples](examples/)** | Real-world implementation patterns |
| 🔧 **[API Reference](docs/api/)** | Detailed API documentation |

---

## 🤝 Community & Support

- **🐛 Issues**: [GitHub Issues](https://github.com/syntha/syntha-sdk/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/syntha/syntha-sdk/discussions)
- **📧 Email**: [contact@syntha.ai](mailto:contact@syntha.ai)
- **📖 Documentation**: [docs.syntha.ai](https://docs.syntha.ai)

---

## 📄 License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Ready to build intelligent agent teams?**

[Get Started](docs/installation.md) • [View Examples](examples/) • [Read Docs](https://docs.syntha.ai)

---

*Built with ❤️ by the Syntha Team*

</div>
