---
layout: default
title: Home
nav_order: 1
description: "Syntha SDK - Multi-Agent AI Systems"
permalink: /
---

# Syntha SDK Documentation

**The Complete Multi-Agent Context Framework**

Welcome to the Syntha SDK documentation. Syntha is a production-ready, framework-agnostic SDK that enables AI agents to share context and communicate through pure prompt injection and standardized tool calls.

## 🚀 Quick Navigation

### Getting Started
- [Installation](guides/installation.html) - Get Syntha up and running
- [Quick Start](guides/quick-start.html) - Build your first multi-agent system in 5 minutes
- [Core Concepts](guides/core-concepts.html) - Understanding the Syntha architecture

### Tutorials
- [Basic Usage](tutorials/basic-usage.html) - Learn the fundamentals
- [Multi-Agent Communication](tutorials/agent-communication.html) - Agent-to-agent messaging
- [Context Management](tutorials/context-management.html) - Shared knowledge systems

### API Reference
- [ContextMesh](api/context-mesh.html) - Shared memory system
- [ToolHandler](api/tool-handler.html) - LLM function calling
- [Prompt Builders](api/prompt-builders.html) - Context injection utilities
- [Tool Schemas](api/tool-schemas.html) - All 7 standardized tools

### Advanced Guides
- [Advanced Features](guides/advanced-features.html) - Message confirmations, threading, batch operations
- [Performance Optimization](guides/performance.html) - Production-ready optimizations
- [Security & Access Control](guides/security.html) - Protecting sensitive data
- [Best Practices](guides/best-practices.html) - Production deployment patterns
- [Troubleshooting](guides/troubleshooting.html) - Common issues and solutions

### Framework Integration
- [OpenAI](guides/integrations/openai.html) - Function calling with GPT models

### Examples
- [E-commerce Platform](examples/ecommerce.html) - Multi-agent online store

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

## Quick Start

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Initialize
mesh = ContextMesh()
handler = ToolHandler(mesh)

# Add context
mesh.push("project", "CustomerPortal")

# Generate LLM prompt
prompt = build_system_prompt("Dev", mesh)
tools = handler.get_schemas()

# Use with any LLM framework
# response = openai.chat.completions.create(
#     messages=[{"role": "system", "content": prompt}],
#     tools=tools
# )
```

## 📋 What's New

### Version 0.2.0 Features
- **Advanced Messaging**: Threading, priorities, confirmations
- **Batch Operations**: Atomic multi-operation transactions
- **Outcome Logging**: Performance tracking and analytics
- **Enhanced Security**: Granular access control
- **Performance Optimizations**: 10x faster context lookups

---

## Community & Support

- **GitHub Issues**: Report bugs and request features
- **Examples**: Complete implementation patterns
- **Tests**: Comprehensive test suite
- **Community**: Join our growing developer community

---

**Ready to build multi-agent systems that actually work together?**

Start with our [Quick Start Guide](guides/quick-start.html) and explore the [tutorials](tutorials/) for hands-on learning.

*Last updated: {{ site.time | date: "%B %d, %Y" }}*
