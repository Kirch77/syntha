# Syntha SDK Documentation

**The Complete Multi-Agent Context Framework**

Welcome to the Syntha SDK documentation. Syntha is a production-ready, framework-agnostic SDK that enables AI agents to share context and communicate through pure prompt injection and standardized tool calls.

## 🚀 Quick Navigation

### Getting Started
- [Installation](guides/installation.md) - Get Syntha up and running
- [Quick Start](guides/quick-start.md) - Build your first multi-agent system in 5 minutes
- [Core Concepts](guides/core-concepts.md) - Understanding the Syntha architecture

### Tutorials
- [Basic Usage](tutorials/basic-usage.md) - Learn the fundamentals
- [Multi-Agent Communication](tutorials/agent-communication.md) - Agent-to-agent messaging
- [Context Management](tutorials/context-management.md) - Shared knowledge systems
- [LLM Integration](tutorials/llm-integration.md) - Connect with any LLM framework

### API Reference
- [ContextMesh](api/context-mesh.md) - Shared memory system
- [ToolHandler](api/tool-handler.md) - LLM function calling
- [Prompt Builders](api/prompt-builders.md) - Context injection utilities
- [Tool Schemas](api/tool-schemas.md) - All 7 standardized tools

### Advanced Guides
- [Advanced Features](guides/advanced-features.md) - Message confirmations, threading, batch operations
- [Performance Optimization](guides/performance.md) - Production-ready optimizations
- [Security & Access Control](guides/security.md) - Protecting sensitive data
- [Best Practices](guides/best-practices.md) - Production deployment patterns
- [Troubleshooting](guides/troubleshooting.md) - Common issues and solutions

### Framework Integration
- [OpenAI](guides/integrations/openai.md) - Function calling with GPT models
- [Anthropic Claude](guides/integrations/anthropic.md) - Tools API integration
- [LangGraph](guides/integrations/langgraph.md) - State management integration
- [LangChain](guides/integrations/langchain.md) - Agent framework integration
- [Custom Frameworks](guides/integrations/custom.md) - Integrate with any LLM framework

### Examples
- [E-commerce Platform](examples/ecommerce.md) - Multi-agent online store
- [Development Team](examples/dev-team.md) - Coordinated software development
- [Customer Support](examples/customer-support.md) - Automated support system
- [Data Processing](examples/data-processing.md) - Distributed data pipeline

## 🎯 Why Syntha?

**The Problem**: Current multi-agent frameworks lock you into specific tools, use runtime hacks, or require complex setups that break when you switch LLM providers.

**The Solution**: Syntha works with **any** LLM framework through standard function calling and prompt injection. No vendor lock-in, no runtime modifications, no complexity.

## 🔑 Key Features

### Framework Agnostic
- ✅ **OpenAI** (Function Calling API)
- ✅ **Anthropic Claude** (Tools API) 
- ✅ **LangGraph** (State + Tools)
- ✅ **Local LLMs** (Ollama, LM Studio, etc.)
- ✅ **Any LLM** with function calling support

### Production-Grade
- 🚀 **Performance**: 10x faster lookups with smart indexing
- 🔒 **Thread-Safe**: Concurrent agent operations
- ⏱️ **TTL Support**: Automatic expiry for time-sensitive data
- 🧹 **Memory Management**: Auto-cleanup prevents memory leaks
- 📊 **Monitoring**: Built-in metrics and statistics

### Advanced Multi-Agent Features
- 💬 **Direct Messaging**: Agents communicate directly
- 🧵 **Message Threading**: Organize conversations
- 📢 **Bulk Operations**: Broadcast to multiple agents
- 📝 **Read Confirmations**: Optional delivery receipts
- 🎯 **Smart Filtering**: Messages by priority, type, thread
- ⚡ **Batch Processing**: Atomic transactions

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

## 📋 What's New

### Version 0.2.0 Features
- **Advanced Messaging**: Threading, priorities, confirmations
- **Batch Operations**: Atomic multi-operation transactions
- **Outcome Logging**: Performance tracking and analytics
- **Enhanced Security**: Granular access control
- **Performance Optimizations**: 10x faster context lookups

## 🌐 Documentation Hosting

This documentation is set up for easy hosting with modern platforms:

### GitHub Pages (Recommended) 
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch - docs auto-deploy to `https://yourusername.github.io/syntha_v2`

### Local Development
```bash
cd docs
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000
```

### Alternative Platforms
- **GitBook** - Connect repo for beautiful auto-generated docs
- **Docusaurus** - Modern static site generator for documentation  
- **MkDocs** - Python-based documentation generator
- **Sphinx** - Industry standard for Python projects

## 🤝 Support

- **GitHub Issues**: Report bugs and request features
- **Examples**: Complete implementation patterns in `/examples`
- **Tests**: Comprehensive test suite in `/tests`
- **Community**: Join our growing developer community

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

---

**Ready to build multi-agent systems that actually work together?**

Start with our [Quick Start Guide](guides/quick-start.md) and explore the [tutorials](tutorials/) for hands-on learning.
