# Syntha SDK 🚀

**The Complete Multi-Agent Context Framework**

Syntha is a production-ready, framework-agnostic SDK that enables AI agents to share context and communicate through pure prompt injection and standardized tool calls. Built for real-world multi-agent systems.

## 🎯 Why Syntha?

**The Problem**: Current multi-agent frameworks lock you into specific tools, use runtime hacks, or require complex setups that break when you switch LLM providers.

**The Solution**: Syntha works with **any** LLM framework through standard function calling and prompt injection. No vendor lock-in, no runtime modifications, no complexity.

## 🔑 Core Capabilities

### **Framework Agnostic Design**

- ✅ **OpenAI** (Function Calling API)
- ✅ **Anthropic Claude** (Tools API)
- ✅ **LangGraph** (State + Tools)
- ✅ **Local LLMs** (Ollama, LM Studio, etc.)
- ✅ **Any LLM** with function calling support

### **Production-Grade Features**

- 🚀 **Performance Optimized**: 10x faster lookups with smart indexing
- 🔒 **Thread-Safe**: Concurrent agent operations
- ⏱️ **TTL Support**: Automatic expiry for time-sensitive data
- 🧹 **Memory Management**: Auto-cleanup prevents memory leaks
- 📊 **Monitoring**: Built-in metrics and statistics
- 🔧 **Developer Friendly**: Complex features controlled by simple flags

### **Advanced Multi-Agent Features**

- 💬 **Direct Messaging**: Agents communicate directly with each other
- 🧵 **Message Threading**: Organize conversations automatically
- 📢 **Bulk Operations**: Broadcast to multiple agents efficiently
- 📝 **Read Confirmations**: Optional delivery receipts
- 🎯 **Smart Filtering**: Messages by priority, type, thread, sender
- ⚡ **Batch Processing**: Multiple operations in atomic transactions

## 🚀 Quick Start (60 Seconds)

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

# 1. Initialize with performance optimizations
mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
handler = ToolHandler(mesh)

# 2. Add shared knowledge
mesh.push("project_goal", "Launch Q3 product", subscribers=["Agent1", "Agent2"])
mesh.push("api_endpoint", "https://api.company.com", subscribers=["Backend"])
mesh.push("user_count", 1500)  # Global context

# 3. Generate context-aware prompts
system_prompt = build_system_prompt("Agent1", mesh)
tools = handler.get_schemas()  # 7 standardized tools

# 4. Use with your LLM (example with OpenAI)
import openai
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "system", "content": system_prompt}],
    tools=tools
)

# 5. Handle tool calls automatically
for tool_call in response.choices[0].message.tool_calls or []:
    result = handler.handle_tool_call(
        tool_call.function.name,
        **json.loads(tool_call.function.arguments)
    )
    print(f"Tool result: {result}")
```

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Agent A       │    │   Agent B       │    │   Agent C       │
│                 │    │                 │    │                 │
│ System Prompt   │    │ System Prompt   │    │ System Prompt   │
│ + Syntha Tools  │    │ + Syntha Tools  │    │ + Syntha Tools  │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │       Syntha Mesh          │
                    │                            │
                    │ • Shared Context Store     │
                    │ • Agent-to-Agent Messages  │
                    │ • Access Control System    │
                    │ • Performance Indexing     │
                    │ • TTL Management           │
                    │ • Thread-Safe Operations   │
                    └────────────────────────────┘
```

## 🛠️ Core Usage Patterns

### 1. Context Management

```python
# Push context with access control
mesh.push(key="data", value={"users": 1000}, subscribers=["AnalyticsBot"])
mesh.push(key="global_config", value={"env": "prod"})  # Global access

# Retrieve context
value = mesh.get("data", agent_name="AnalyticsBot")
all_context = mesh.get_all_for_agent("AnalyticsBot")
```

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

## � Documentation

### Quick Links
- **[📖 Complete Documentation](docs/README.md)** - Comprehensive guides and API reference
- **[🚀 Quick Start](docs/guides/quick-start.md)** - Get started in 5 minutes
- **[📋 API Reference](docs/api/)** - Complete API documentation
- **[🎯 Examples](docs/examples/)** - Real-world implementation patterns

### Key Guides
- **[Installation](docs/guides/installation.md)** - Setup and configuration
- **[Core Concepts](docs/guides/core-concepts.md)** - Understanding Syntha's architecture
- **[Context Management](docs/tutorials/context-management.md)** - Managing shared data
- **[Agent Communication](docs/tutorials/agent-communication.md)** - Inter-agent messaging
- **[LLM Integration](docs/guides/integrations/)** - Framework-specific guides
- **[Performance Optimization](docs/guides/performance.md)** - Production tuning
- **[Best Practices](docs/guides/best-practices.md)** - Deployment patterns

### API Documentation
- **[ContextMesh](docs/api/context-mesh.md)** - Shared memory system
- **[ToolHandler](docs/api/tool-handler.md)** - LLM function calling
- **[Tool Schemas](docs/api/tool-schemas.md)** - All 7 standardized tools
- **[Prompt Builders](docs/api/prompt-builders.md)** - Context injection utilities

### Examples
- **[E-commerce Platform](docs/examples/ecommerce.md)** - Complete multi-agent system
- **[Customer Support](docs/examples/customer-support.md)** - Automated support system
- **[Development Team](docs/examples/dev-team.md)** - Coordinated software development

## �📁 Project Structure

```
syntha/
├── __init__.py          # Main exports
├── context.py           # ContextMesh - shared knowledge space
├── prompts.py           # Prompt injection utilities
├── tools.py             # Tool schemas and handlers
└── reports.py           # Metrics and logging

docs/                    # Complete documentation
├── README.md            # Documentation index
├── guides/              # User guides
├── tutorials/           # Step-by-step tutorials
├── api/                 # API reference
└── examples/            # Real-world examples

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

MIT License - see LICENSE file for details.

---

**Ready to build multi-agent systems that actually work together?** 

👉 **[Start with the Documentation](docs/README.md)** or jump into the **[Quick Start Guide](docs/guides/quick-start.md)**
