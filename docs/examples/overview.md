# Examples Overview

Welcome to the Syntha examples! These working code samples demonstrate every feature and concept in Syntha. Each example is ready to copy, paste, and run.

## Getting Started

All examples are located in the `/examples` directory and are organized by concept. Each example includes:

- **Clear documentation** explaining what it demonstrates
- **Working code** that you can run immediately
- **Real-world scenarios** showing practical applications
- **Best practices** and common patterns

## Example Categories

### 🧩 Context Mesh
Learn the core context sharing system:

- **[Basic Usage](context-mesh/basic-usage.md)** - Creating and using a Context Mesh
  ```bash
  python examples/context-mesh/basic_usage.py
  ```

- **[Topic Routing](context-mesh/topic-routing.md)** - Topic-based context distribution
  ```bash
  python examples/context-mesh/topic_routing.py
  ```

- **[User Isolation](context-mesh/user-isolation.md)** - Multi-user context separation
  ```bash
  python examples/context-mesh/user_isolation.py
  ```

### 🔧 Tools & Tool Handler
Master agent-context interaction:

- **[Tool Basics](tools/tool-basics.md)** - Using ToolHandler for context operations
  ```bash
  python examples/tools/tool_basics.py
  ```

- **[Access Control](tools/access-control.md)** - Role-based permissions and restrictions
  ```bash
  python examples/tools/access_control.py
  ```

- **[Multi-Agent Setup](tools/multi-agent.md)** - Coordinating multiple agents
  ```bash
  python examples/tools/multi_agent.py
  ```

### 🔌 Framework Adapters
Integrate with your LLM framework:

- **[OpenAI Integration](adapters/openai.md)** - Using Syntha with OpenAI's API
  ```bash
  export OPENAI_API_KEY="your-key"
  python examples/adapters/openai.py
  ```

- **[Anthropic Integration](adapters/anthropic.md)** - Using Syntha with Claude
  ```bash
  export ANTHROPIC_API_KEY="your-key"
  python examples/adapters/anthropic.py
  ```

- **[LangChain Integration](adapters/langchain.md)** - Building LangChain agents with Syntha
  ```bash
  python examples/adapters/langchain.py
  ```

- **[Agno Integration](adapters/agno.md)** - Flexible multi-agent coordination
  ```bash
  python examples/adapters/agno.py
  ```

### 📝 Prompts
Build context-aware prompts:

- **[System Prompts](prompts/system-prompts.md)** - Automatic context-aware prompts
  ```bash
  python examples/prompts/system_prompts.py
  ```

- **[Context Injection](prompts/context-injection.md)** - Custom prompt templates
  ```bash
  python examples/prompts/context_injection.py
  ```

### 💾 Persistence
Configure database storage:

- **[SQLite Setup](persistence/sqlite.md)** - Local development with SQLite
  ```bash
  python examples/persistence/sqlite.py
  ```

- **[PostgreSQL Setup](persistence/postgresql.md)** - Production setup with PostgreSQL
  ```bash
  export DATABASE_URL="postgresql://user:pass@localhost:5432/syntha_db"
  python examples/persistence/postgresql.py
  ```

### 🚀 Complete Examples
End-to-end real-world scenarios:

- **[Complete Workflows](extras/complete-workflows.md)** - Full product launch workflow
  ```bash
  python examples/extras/complete_workflows.py
  ```

- **[Real-World Use Cases](extras/real-world.md)** - Industry-specific applications
  ```bash
  python examples/extras/real_world.py
  ```

## Quick Start Examples

### 5-Minute Setup
```python
from syntha import ContextMesh, ToolHandler

# Create context mesh
context = ContextMesh(user_id="demo")

# Add some context
context.push("project", "AI Assistant")
context.push("status", "active")

# Create agent handler
handler = ToolHandler(context, "DemoAgent")

# Agent retrieves context
result = handler.handle_tool_call("get_context")
print(f"Context: {result['context']}")
```

### Multi-Agent Communication
```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="team")

# Create multiple agents
sales = ToolHandler(context, "SalesAgent")
support = ToolHandler(context, "SupportAgent")

# Sales agent shares information
sales.handle_tool_call(
    "push_context",
    key="customer_info",
    value={"name": "Acme Corp", "tier": "Enterprise"},
    subscribers=["SupportAgent"]
)

# Support agent gets the information
result = support.handle_tool_call("get_context")
print(f"Support sees: {list(result['context'].keys())}")
```

### Framework Integration
```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "AssistantAgent")

# Add business context
context.push("company", "TechCorp")
context.push("role", "Customer Success Manager")

# Get LLM-ready components
system_prompt = build_system_prompt("AssistantAgent", context)
tools = handler.get_schemas()  # OpenAI format
langchain_tools = handler.get_langchain_tools()  # LangChain format

print("Ready for your LLM framework!")
```

## Running Examples

### Prerequisites
```bash
# Install Syntha
pip install syntha

# For framework examples, install additional packages:
pip install openai anthropic langchain langchain-openai agno

# Set API keys (for framework examples)
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"
```

### Running Individual Examples
```bash
# Navigate to the examples directory
cd examples

# Run any example
python context-mesh/basic_usage.py
python tools/tool_basics.py
python adapters/openai.py
```

### Running All Examples
```bash
# Run a test script that executes all examples
python run_all_examples.py
```

## Example Structure

Each example follows a consistent structure:

```python
"""
Category - Example Name

Brief description of what this example demonstrates.

Prerequisites:
- Any required packages or setup

Copy and run this code to see [feature] in action!
"""

from syntha import ContextMesh, ToolHandler

def main():
    print("🚀 Example Name")
    print("=" * 40)
    
    # 1. Setup
    # Clear setup code
    
    # 2. Demonstration
    # Working example code
    
    # 3. Results
    # Show what happened
    
    print("\n✅ Example complete!")

if __name__ == "__main__":
    main()
```

## Best Practices Shown

The examples demonstrate these best practices:

### Context Organization
- Use descriptive context keys
- Structure data consistently
- Apply appropriate access control
- Leverage topic-based routing

### Agent Coordination
- Set up clear topic subscriptions
- Use role-based access control
- Handle errors gracefully
- Monitor context flow

### Framework Integration
- Get native tool formats
- Build context-aware prompts
- Handle tool call responses
- Integrate with existing workflows

### Production Readiness
- Use persistent storage
- Implement user isolation
- Configure appropriate backends
- Monitor performance

## Troubleshooting Examples

If an example doesn't work:

1. **Check Prerequisites**: Ensure all required packages are installed
2. **Verify API Keys**: Make sure environment variables are set correctly
3. **Check Python Version**: Syntha requires Python 3.9+
4. **Database Issues**: For persistence examples, verify database connectivity

```bash
# Debug mode
SYNTHA_LOG_LEVEL=DEBUG python examples/your_example.py
```

## Contributing Examples

Want to add an example? See our [Contributing Guide](../user-guide/how-to/contributing.md) for:

- Example structure guidelines
- Code style requirements
- Documentation standards
- Testing procedures

## Next Steps

- **[User Guide](../user-guide/introduction/what-is-syntha.md)** - Learn the concepts
- **[API Reference](../api/overview.md)** - Complete API documentation
- **[Setup Guide](../user-guide/how-to/setup.md)** - Production deployment
