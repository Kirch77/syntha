---
layout: default
title: Home
nav_order: 1
description: "Syntha SDK - Multi-Agent AI Systems"
permalink: /
---

# Syntha SDK Documentation
{: .fs-9 }

Lightweight, framework-agnostic SDK for building multi-agent AI systems where agents share context through pure prompt injection and real-time tool calls.
{: .fs-6 .fw-300 }

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

## Features

### 🧠 Context Mesh
Share data between agents through intelligent context management.

### 🛠️ Tool System  
7 standardized tools for agent communication and coordination.

### 🚀 Framework Agnostic
Works with OpenAI, Anthropic, LangChain, or any LLM framework.

### 🔒 Security First
Built-in access controls and data protection.

---

## Documentation Sections

### [📚 Guides](guides/)
Step-by-step guides for installation, quick start, and core concepts.

### [🔧 API Reference](api/)
Detailed documentation of all classes and methods.

### [🎓 Tutorials](tutorials/)
Learn through practical examples and use cases.

### [💡 Examples](examples/)
Real-world implementations and patterns.

---

## Community & Support

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Contributing**: Help improve the SDK

---

*Last updated: {{ site.time | date: "%B %d, %Y" }}*
