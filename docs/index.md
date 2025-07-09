---
layout: default
title: Home
nav_order: 1
description: "Syntha SDK - Multi-Agent AI Systems"
permalink: /
---

# Syntha SDK Documentation

{: .fs-9 }

**The Complete Multi-Agent Context Framework**
{: .fs-6 .fw-300 }

Syntha is a production-ready, framework-agnostic SDK that enables AI agents to share context and communicate through pure prompt injection and standardized tool calls.

[Get started now](guides/quick-start){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View on GitHub](https://github.com/yourusername/syntha_v2){: .btn .fs-5 .mb-4 .mb-md-0 }

---

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

---

## 🎯 Why Syntha?

{: .highlight }

> **The Problem**: Current multi-agent frameworks lock you into specific tools, use runtime hacks, or require complex setups that break when you switch LLM providers.
>
> **The Solution**: Syntha works with **any** LLM framework through standard function calling and prompt injection. No vendor lock-in, no runtime modifications, no complexity.

---

## 🔑 Key Features

<div class="code-example" markdown="1">

### Framework Agnostic

- ✅ **OpenAI** (Function Calling API)
- ✅ **Anthropic Claude** (Tools API)
- ✅ **LangGraph** (State + Tools)
- ✅ **Local LLMs** (Ollama, LM Studio, etc.)
- ✅ **Any LLM** with function calling support

</div>

<div class="code-example" markdown="1">

### Production-Grade

- 🚀 **Performance**: 10x faster lookups with smart indexing
- 🔒 **Thread-Safe**: Concurrent agent operations
- ⏱️ **TTL Support**: Automatic expiry for time-sensitive data
- 🧹 **Memory Management**: Auto-cleanup prevents memory leaks
- 📊 **Monitoring**: Built-in metrics and statistics

</div>

<div class="code-example" markdown="1">

### Advanced Multi-Agent Features

- 💬 **Direct Messaging**: Agents communicate directly
- 🧵 **Message Threading**: Organize conversations
- 📢 **Bulk Operations**: Broadcast to multiple agents
- 📝 **Read Confirmations**: Optional delivery receipts
- 🎯 **Smart Filtering**: Messages by priority, type, thread
- ⚡ **Batch Processing**: Atomic transactions

</div>

---

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

---

## 📚 Documentation

<div class="grid">
  <div class="grid-item">
    <h3><a href="guides/installation">🚀 Getting Started</a></h3>
    <ul>
      <li><a href="guides/installation">Installation</a> - Setup and requirements</li>
      <li><a href="guides/quick-start">Quick Start</a> - 5-minute setup guide</li>
      <li><a href="guides/core-concepts">Core Concepts</a> - Architecture overview</li>
    </ul>
  </div>

  <div class="grid-item">
    <h3><a href="tutorials/basic-usage">🎓 Tutorials</a></h3>
    <ul>
      <li><a href="tutorials/basic-usage">Basic Usage</a> - Learn the fundamentals</li>
      <li><a href="tutorials/agent-communication">Agent Communication</a> - Messaging system</li>
      <li><a href="tutorials/context-management">Context Management</a> - Shared knowledge</li>
    </ul>
  </div>

  <div class="grid-item">
    <h3><a href="api/context-mesh">🔧 API Reference</a></h3>
    <ul>
      <li><a href="api/context-mesh">ContextMesh</a> - Shared memory system</li>
      <li><a href="api/tool-handler">ToolHandler</a> - LLM function calling</li>
      <li><a href="api/tool-schemas">Tool Schemas</a> - All 7 standardized tools</li>
    </ul>
  </div>

  <div class="grid-item">
    <h3><a href="guides/advanced-features">⚡ Advanced</a></h3>
    <ul>
      <li><a href="guides/advanced-features">Advanced Features</a> - Threading, batch ops</li>
      <li><a href="guides/performance">Performance</a> - Production optimization</li>
      <li><a href="guides/security">Security</a> - Access control & protection</li>
    </ul>
  </div>

  <div class="grid-item">
    <h3><a href="guides/integrations/openai">🔌 Integrations</a></h3>
    <ul>
      <li><a href="guides/integrations/openai">OpenAI</a> - Function calling with GPT</li>
      <li><a href="guides/troubleshooting">Troubleshooting</a> - Common issues</li>
      <li><a href="guides/best-practices">Best Practices</a> - Production patterns</li>
    </ul>
  </div>

  <div class="grid-item">
    <h3><a href="examples/ecommerce">💡 Examples</a></h3>
    <ul>
      <li><a href="examples/ecommerce">E-commerce Platform</a> - Multi-agent store</li>
      <li>More examples coming soon...</li>
    </ul>
  </div>
</div>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.grid-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
}

.grid-item h3 {
  margin-top: 0;
  color: #495057;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

.grid-item ul {
  margin: 1rem 0 0 0;
  padding-left: 1.2rem;
}

.grid-item li {
  margin: 0.5rem 0;
}

.grid-item a {
  text-decoration: none;
  color: #007bff;
}

.grid-item a:hover {
  text-decoration: underline;
}
</style>

---

## 📋 What's New

### Version 0.2.0 Features

- **Advanced Messaging**: Threading, priorities, confirmations
- **Batch Operations**: Atomic multi-operation transactions
- **Outcome Logging**: Performance tracking and analytics
- **Enhanced Security**: Granular access control
- **Performance Optimizations**: 10x faster context lookups

---

## 🤝 Community & Support

- **GitHub Issues**: Report bugs and request features
- **Examples**: Complete implementation patterns
- **Tests**: Comprehensive test suite
- **Community**: Join our growing developer community

---

**Ready to build multi-agent systems that actually work together?**

Start with our [Quick Start Guide](guides/quick-start) and explore the [tutorials](tutorials/) for hands-on learning.

_Last updated: {{ site.time | date: "%B %d, %Y" }}_
