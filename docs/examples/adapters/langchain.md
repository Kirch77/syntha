# LangChain Integration

Integration guide for using Syntha with LangChain framework.

## Basic Setup

```python
from langchain.agents import create_openai_functions_agent
from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter

# Initialize Syntha
mesh = ContextMesh(user_id="langchain_user")
handler = ToolHandler(mesh, "LangChain_Agent")

# Create LangChain-compatible tools
adapter = create_framework_adapter("langchain", handler)
tools = adapter.create_tools()

# Use with LangChain agent
agent = create_openai_functions_agent(llm, tools, prompt)
```

## See Also

- [OpenAI Integration](openai.md)
- [Framework Adapters](../../user-guide/concepts/adapters.md)
