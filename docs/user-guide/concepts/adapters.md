# Framework Adapters

Bridge between Syntha's context management and AI frameworks like OpenAI, Anthropic, LangChain, and Agno.

## Supported Frameworks

- **OpenAI**: Function calling with GPT models
- **Anthropic**: Tool use with Claude models  
- **LangChain**: Tool integration and agent compatibility
- **LangGraph**: State-based agent workflows
- **Agno**: Multi-agent coordination

## Usage

### Direct Tool Handler Methods (Recommended)

```python
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="user123")
handler = ToolHandler(context, "MyAgent")

# Get tools for different frameworks
schemas = handler.get_schemas()
openai_tools = handler.get_openai_functions()
langchain_tools = handler.get_langchain_tools()
anthropic_tools = handler.get_anthropic_tools()
```

### Framework Adapters

```python
from syntha.framework_adapters import create_framework_adapter

# Create adapter for specific framework
adapter = create_framework_adapter("openai", handler)
tools = adapter.create_tools()
```

## See Also

- [Tool Handler](tools.md)
- [OpenAI Example](../../examples/adapters/openai.md)
- [LangChain Example](../../examples/adapters/langchain.md)
