# Syntha SDK 🚀

**The Complete Multi-Agent Context Framework with Production-Grade Persistence**

Syntha is a framework-agnostic SDK that enables AI agents to share context and communicate through pure prompt injection and standardized tool calls. Build scalable multi-agent systems with robust database persistence and real-world deployment capabilities.

## 🎯 Why Syntha?

**The Problem**: Multi-agent frameworks lock you into specific tools, use runtime hacks, or require complex setups. Data doesn't persist across restarts, and scaling to production is an afterthought.

**The Solution**: Syntha works with **any** LLM framework through standard function calling. No vendor lock-in, production-ready persistence, and a complete learning path from first agent to enterprise deployment.

## 🔑 Core Capabilities

### **Framework Agnostic Design**

- ✅ **OpenAI** (Function Calling API)
- ✅ **Anthropic Claude** (Tools API)
- ✅ **LangGraph** (State + Tools)
- ✅ **Local LLMs** (Ollama, LM Studio, etc.)
- ✅ **Any LLM** with function calling support

### **Production-Grade Persistence**

- 🗄️ **SQLite**: Zero-config for development
- 🐘 **PostgreSQL**: Production-grade with advanced features
- � **Migration Tools**: Seamless database transitions
- � **Performance Optimization**: Indexes, pooling, caching

### **Enterprise Features**

- � **Scalable Architecture**: Multi-tenant support
- 📊 **Monitoring & Metrics**: Prometheus integration
- 🔒 **Security**: Authentication, rate limiting, encryption
- 📋 **Documentation**: Complete tutorials and API reference
- � **Containerization**: Docker and Kubernetes ready

### **Essential Agent Tools**

- 🔍 **discover_topics**: Find available topics and subscriber counts
- 📋 **subscribe_to_topics**: Subscribe to topic-based context routing
- 📤 **push_context**: Share context with topic subscribers
- 📋 **list_context**: Discover available context keys by topic
- 📥 **get_context**: Retrieve specific context data

## 🚀 Quick Start (60 Seconds)

```python
from syntha import ContextMesh, ToolHandler

# 1. Initialize with persistence (SQLite by default)
mesh = ContextMesh(enable_persistence=True)
sales_agent = ToolHandler(mesh, agent_name="SalesBot")
marketing_agent = ToolHandler(mesh, agent_name="MarketingBot")

# 2. Agents subscribe to topics
sales_agent.handle_tool_call("subscribe_to_topics",
    topics=["sales", "pricing", "customer_data"])
marketing_agent.handle_tool_call("subscribe_to_topics",
    topics=["marketing", "campaigns", "customer_data"])

# 3. Share context via topics
sales_agent.handle_tool_call("push_context",
    key="q4_pricing",
    value="Enterprise: $99/month, Pro: $49/month",
    topics=["sales", "pricing"])

# 4. Marketing agent automatically receives pricing data
result = marketing_agent.handle_tool_call("list_context")
print(f"Marketing has access to {result['total_keys']} context items")

# 5. Data persists across restarts - try restarting and running again!
mesh.close()
```

## 🔧 Database Backends

Choose the right persistence backend for your needs:

```python
# SQLite (default) - Perfect for development and small-medium deployments
mesh = ContextMesh(enable_persistence=True, db_backend="sqlite", db_path="syntha.db")

# PostgreSQL - For high-performance production environments
mesh = ContextMesh(
    enable_persistence=True,
    db_backend="postgresql",
    connection_string="postgresql://user:pass@localhost/syntha"
)

# In-memory only - For testing or temporary agents
mesh = ContextMesh(enable_persistence=False)
```

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SalesBot      │    │  MarketingBot   │    │  SupportBot     │
│                 │    │                 │    │                 │
│ • subscribe     │    │ • subscribe     │    │ • subscribe     │
│ • push_context  │    │ • list_context  │    │ • get_context   │
│ • discover      │    │ • get_context   │    │ • push_context  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                   ┌─────────────▼─────────────┐
                   │      Syntha ContextMesh   │
                   │                           │
                   │ 📊 Topic-Based Routing    │
                   │ 🗄️  Database Persistence  │
                   │ 🚀 Smart Indexing         │
                   │ 🔒 Thread-Safe Operations │
                   │ ⏱️  TTL Management        │
                   └─────────────┬─────────────┘
                                 │
                   ┌─────────────▼─────────────┐
                   │     Database Layer        │
                   │  SQLite / PostgreSQL      │
                   │                           │
                   │ • Context Storage         │
                   │ • Topic Subscriptions     │
                   │ • Agent Permissions       │
                   └───────────────────────────┘
```

│ │ │ │ │ │
│ System Prompt │ │ System Prompt │ │ System Prompt │
│ + Syntha Tools │ │ + Syntha Tools │ │ + Syntha Tools │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
│ │ │
└──────────────────────┼──────────────────────┘
│
┌─────────────▼──────────────┐
│ Syntha Mesh │
│ │
│ • Shared Context Store │
│ • Agent-to-Agent Messages │
│ • Access Control System │
│ • Performance Indexing │
│ • TTL Management │
│ • Thread-Safe Operations │
└────────────────────────────┘

````

## 🛠️ Core Usage Patterns

### 1. Context Management

```python
# Push context with access control
mesh.push(key="data", value={"users": 1000}, subscribers=["AnalyticsBot"])
mesh.push(key="global_config", value={"env": "prod"})  # Global access

# Retrieve context
value = mesh.get("data", agent_name="AnalyticsBot")
all_context = mesh.get_all_for_agent("AnalyticsBot")
````

### 2. Agent Communication

```python
# Send targeted message
handler.handle_tool_call("send_message_to_agent",
    from_agent="Agent1", to_agent="Agent2",
    message="Task completed successfully",
    message_type="result", priority="high"
)

# Broadcast to multiple agents
handler.handle_tool_call("broadcast_message_to_agents",
    from_agent="Manager", to_agents=["Dev1", "Dev2", "QA"],
    message="Deploy at 3 PM", create_thread=True
)

# Check messages with filtering
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Agent2", unread_only=True, priority="high"
)
```

### 3. Performance & Advanced Features

```python
# Batch operations for efficiency
handler.handle_tool_call("batch_context_operation",
    agent_name="Agent1",
    operations=[
        {"type": "push", "key": "metric1", "value": 100},
        {"type": "push", "key": "metric2", "value": 200},
        {"type": "get", "key": "existing_data"}
    ],
    atomic=True  # All succeed or all fail
)

# Message threading and confirmations
handler.handle_tool_call("send_message_to_agent",
    from_agent="Manager", to_agent="Developer",
    message="Critical bug detected",
    requires_confirmation=True,  # Sends read receipt
    thread_id="bug_thread",     # Groups related messages
    ttl_hours=2                 # Expires in 2 hours
)
```

## 🔧 Tool Schemas

Syntha provides 7 standardized tool schemas for LLM function calling:

| Tool                          | Purpose                 | Key Parameters                              |
| ----------------------------- | ----------------------- | ------------------------------------------- |
| `get_context`                 | Retrieve shared context | `agent_name`, `keys`                        |
| `push_context`                | Store shared context    | `agent_name`, `key`, `value`, `subscribers` |
| `list_context_keys`           | List available keys     | `agent_name`                                |
| `send_message_to_agent`       | Send targeted message   | `from_agent`, `to_agent`, `message`         |
| `get_messages_from_agents`    | Retrieve messages       | `agent_name`, filters                       |
| `broadcast_message_to_agents` | Send to multiple agents | `from_agent`, `to_agents`, `message`        |
| `batch_context_operation`     | Bulk operations         | `agent_name`, `operations`                  |

```python
# Get all schemas for your LLM
schemas = handler.get_schemas()

# Handle function calls from LLM
result = handler.handle_tool_call(tool_name, **parameters)
```

## ⚡ Performance Controls

Simple boolean flags control complex optimizations:

```python
# Initialize with optimizations
mesh = ContextMesh(
    enable_indexing=True,    # 10x faster agent lookups
    auto_cleanup=True        # Automatic memory management
)

# Runtime performance toggles
mesh.enable_indexing = False  # Disable if memory is constrained
mesh.auto_cleanup = True      # Keep cleanup for memory efficiency
```

## 📝 LLM Integration Examples

### OpenAI

```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

mesh = ContextMesh()
handler = ToolHandler(mesh)

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": build_system_prompt("Agent1", mesh)},
        {"role": "user", "content": "Analyze the project status"}
    ],
    tools=handler.get_schemas()
)

# Handle tool calls
for tool_call in response.choices[0].message.tool_calls or []:
    result = handler.handle_tool_call(
        tool_call.function.name,
        **json.loads(tool_call.function.arguments)
    )
```

### Anthropic Claude

```python
import anthropic
from syntha import ContextMesh, ToolHandler, build_system_prompt

mesh = ContextMesh()
handler = ToolHandler(mesh)

response = anthropic.messages.create(
    model="claude-3-5-sonnet-20241022",
    system=build_system_prompt("Agent1", mesh),
    messages=[{"role": "user", "content": "Check team messages"}],
    tools=handler.get_schemas()
)
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Agent A       │    │   Agent B       │    │   Agent C       │
│                 │    │                 │    │                 │
│ System Prompt   │    │ System Prompt   │    │ System Prompt   │
│ + Context       │    │ + Context       │    │ + Context       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │       Context Mesh         │
                    │                            │
                    │ • Shared Knowledge         │
                    │ • Agent Messages           │
                    │ • Access Control           │
                    │ • TTL Management           │
                    │ • Performance Indexing     │
                    └────────────────────────────┘
```

## 📚 Documentation

### Quick Links

- **[📖 Complete Documentation](docs-new/)** - Comprehensive guides and API reference
- **[🚀 Quick Start](docs-new/docs/getting-started/quick-start.md)** - Get started in 5 minutes
- **[📋 API Reference](docs-new/docs/api/)** - Complete API documentation
- **[🎯 Examples](docs-new/docs/examples/)** - Real-world implementation patterns

### Getting Started

- **[Installation](docs-new/docs/getting-started/installation.md)** - Setup and configuration
- **[Quick Start](docs-new/docs/getting-started/quick-start.md)** - Build your first agent in 5 minutes

### Progressive Learning Path

Follow our step-by-step tutorials to master Syntha:

1. **[Your First Agent](docs-new/docs/tutorials/first-agent.md)** - Learn the fundamentals
2. **[Multi-Agent Systems](docs-new/docs/tutorials/multi-agent-setup.md)** - Build collaborative agents
3. **[Database Persistence](docs-new/docs/tutorials/persistence.md)** - Add SQLite & PostgreSQL support
4. **[Custom Tools](docs-new/docs/tutorials/tool-integration.md)** - Create specialized capabilities
5. **[Production Deployment](docs-new/docs/tutorials/production.md)** - Scale to enterprise

### Core Concepts

- **[Context Management](docs-new/docs/core-concepts/context-management.md)** - Shared memory system
- **[Agent Architecture](docs-new/docs/core-concepts/agent-architecture.md)** - Design patterns
- **[Tool System](docs-new/docs/core-concepts/tool-system.md)** - Function calling framework

### Database Backends

- **[Database Comparison](docs-new/docs/database/comparison.md)** - SQLite vs PostgreSQL guide

### API Reference

- **[API Overview](docs-new/docs/api/index.md)** - Complete API documentation
- **[ContextMesh API](docs-new/docs/api/context-mesh.md)** - Shared memory system
- **[Tools API](docs-new/docs/api/tools.md)** - Function calling interface
- **[Persistence API](docs-new/docs/api/persistence.md)** - Database operations

### Examples

- **[Customer Support System](docs-new/docs/examples/customer-support.md)** - Real-world implementation

## �📁 Project Structure

```
syntha/
├── __init__.py          # Main exports
├── context.py           # ContextMesh - shared knowledge space
├── prompts.py           # Prompt injection utilities
├── tools.py             # Tool schemas and handlers
└── reports.py           # Metrics and logging

docs-new/                 # Progressive documentation
├── mkdocs.yml           # Documentation configuration
├── docs/                # Documentation source
│   ├── getting-started/ # Installation and quick start
│   ├── tutorials/       # Progressive learning path (1-5)
│   ├── core-concepts/   # Architecture and patterns
│   ├── database/        # SQLite and PostgreSQL guides
│   ├── api/             # Complete API reference
│   └── examples/        # Real-world implementations
└── site/                # Built documentation (auto-generated)

examples/
├── basic_usage.py       # Core concepts
├── openai_integration.py # OpenAI + Syntha
└── multi_agent_collaboration.py # Team workflows

tests/
├── test_context.py      # ContextMesh tests
├── test_prompts.py      # Prompt builder tests
└── test_agent_communication.py # Messaging tests
```

## 🔧 Installation

```bash
pip install syntha
```

## 🧪 Testing

```bash
pytest tests/ -v
```

## 📄 License

Apache License 2.0 - see LICENSE file for details.

---

**Ready to build multi-agent systems that actually work together?**

👉 **[Start with the Documentation](docs-new/)** or jump into the **[Progressive Tutorial Path](docs-new/docs/tutorials/first-agent.md)**
