# Framework Adapters API Reference

Framework adapters translate Syntha tool schemas into framework-specific tools.

## Core Functions

### create_framework_adapter(framework_name, tool_handler)

```python
from syntha.framework_adapters import create_framework_adapter
adapter = create_framework_adapter("openai", handler)
```

### get_supported_frameworks()

```python
from syntha.framework_adapters import get_supported_frameworks
print(get_supported_frameworks())  # ['langchain', 'langgraph', 'openai', 'anthropic', 'agno']
```

## Framework-Specific Adapters

### OpenAIAdapter

- Tools: `adapter.create_tools()` -> list of OpenAI function definitions
- Function handler: `adapter.create_function_handler()` to execute a function call

```python
adapter = create_framework_adapter("openai", handler)
openai_tools = adapter.create_tools()

handle_fn = adapter.create_function_handler()
result = handle_fn("get_context", {"keys": ["project"]})
```

### AnthropicAdapter

- Tools: `adapter.create_tools()` -> list of Anthropic tool definitions
- Tool handler: `adapter.create_tool_handler()` to execute a tool call

```python
adapter = create_framework_adapter("anthropic", handler)
claude_tools = adapter.create_tools()

handle_tool = adapter.create_tool_handler()
result = handle_tool("push_context", {"key": "status", "value": "ok"})
```

### LangChainAdapter

- Tools: `adapter.create_tools()` -> list of LangChain `BaseTool`

```python
adapter = create_framework_adapter("langchain", handler)
langchain_tools = adapter.create_tools()
```

### LangGraphAdapter

- Tools: `adapter.create_tools()` -> list of LangGraph tool dicts

### AgnoAdapter

- Tools: `adapter.create_tools()` -> list of Agno-compatible functions

## Tool Factory

```python
from syntha.tool_factory import SynthaToolFactory
factory = SynthaToolFactory(handler)
openai_tools = factory.create_tools("openai")
```

## Error Handling

Creating tools may raise `SynthaFrameworkError` if the framework is unsupported or missing.
