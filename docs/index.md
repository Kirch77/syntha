# Welcome to Syntha SDK

## The Problem: Context Chaos in Multi-Agent Systems

Building AI applications with multiple agents is like trying to coordinate a team where everyone speaks different languages and has no shared memory. Agents work in isolation, repeat work, and lack the context needed to make intelligent decisions together.

Traditional approaches force you to:

- Manually pass context between agents through complex message chains
- Rebuild shared knowledge from scratch for each interaction
- Handle agent coordination with brittle, hard-coded workflows
- Struggle with context persistence across sessions

## The Solution: Intelligent Context Sharing

Syntha SDK provides a **context mesh** - a shared knowledge space where AI agents can intelligently store, discover, and retrieve relevant information. Think of it as a smart memory system that grows with your agents' interactions.

### How It Works

Syntha creates a unified context layer that sits between your agents and their environment:

```python
from syntha import ContextMesh, ToolHandler

# Create shared context space
context = ContextMesh(user_id="user123")

# Agents can push context for others
context.push("user_preferences", {"theme": "dark", "language": "en"})
context.push("sales_data", {"q4_revenue": 150000}, topics=["sales", "analytics"])

# Agents automatically receive relevant context
agent_handler = ToolHandler(context, "SalesAgent")

# Get tools for your favorite framework - just one line!
langchain_tools = agent_handler.get_langchain_tools()      # LangChain
openai_functions = agent_handler.get_openai_functions()    # OpenAI
anthropic_tools = agent_handler.get_anthropic_tools()      # Anthropic Claude
agno_tools = agent_handler.get_tools_for_framework("agno") # Agno
```

### Key Features

- **Real-time Context Sharing**: Agents push and pull context as they work
- **Smart Routing**: Topic-based and subscriber-based context distribution  
- **User Isolation**: Complete separation between different users' contexts
- **Persistent Storage**: Context survives across sessions with SQLite/PostgreSQL
- **Framework Adapters**: One-line integration with LangChain, LangGraph, OpenAI, Anthropic, Agno, and more
- **Production Ready**: 168+ tests, comprehensive logging, error handling

### Framework Integration Made Simple

Syntha works seamlessly with your existing AI framework:

```python
# LangChain - Get tools in native format
langchain_tools = handler.get_langchain_tools()

# OpenAI - Function calling ready
openai_functions = handler.get_openai_functions()

# Anthropic Claude - Tool definitions ready  
anthropic_tools = handler.get_anthropic_tools()

# Any framework - Universal method
tools = handler.get_tools_for_framework("your_framework")
```

**Supported Frameworks:**
- ✅ **LangChain** - Full BaseTool integration with schemas
- ✅ **LangGraph** - Multi-agent workflow support
- ✅ **OpenAI** - Function calling definitions
- ✅ **Anthropic Claude** - Tool use specifications
- ✅ **Agno** - Flexible agent framework integration
- ✅ **Generic** - JSON schemas for any framework

## Quick Navigation

<div class="grid cards" markdown>

-   :material-rocket-launch: **[Installation](installation.md)**

    ---

    Get up and running with Syntha in minutes

-   :material-lightbulb: **[Core Concepts](core-concepts.md)**

    ---

    Understand the fundamental concepts and architecture

-   :material-book-open: **[Guides](guides/overview.md)**

    ---

    Step-by-step tutorials with working examples

-   :material-code-braces: **[API Reference](api/overview.md)**

    ---

    Complete API documentation and schemas

</div>

## Why Syntha?

**For Developers**: Stop reinventing context management. Focus on your agent logic while Syntha handles the complex coordination.

**For Teams**: Build scalable multi-agent systems without the usual coordination headaches.

**For Production**: Deploy with confidence using battle-tested persistence, security, and monitoring features.

---

Ready to build smarter agent systems? Start with our [Installation Guide](installation.md) or dive into the [Core Concepts](core-concepts.md).