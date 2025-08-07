# Framework Adapters API Reference

Framework adapters provide the bridge between Syntha's context management system and specific AI frameworks. They translate Syntha's generic tool interface into framework-specific implementations.

## Core Functions

### create_framework_adapter(framework_name, tool_handler)

Create an adapter for a specific AI framework.

**Parameters:**
- `framework_name` (str): Name of the framework ("openai", "anthropic", "langchain", "agno")
- `tool_handler` (ToolHandler): The tool handler instance to wrap

**Returns:** Framework-specific adapter instance

**Example:**
```python
from syntha.framework_adapters import create_framework_adapter
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh(user_id="user123")
handler = ToolHandler(mesh, "Assistant")
adapter = create_framework_adapter("openai", handler)
```

### get_supported_frameworks()

Get a list of all supported framework names.

**Returns:** List[str] - Supported framework names

**Example:**
```python
from syntha.framework_adapters import get_supported_frameworks

frameworks = get_supported_frameworks()
print(f"Supported frameworks: {frameworks}")
# Output: ['openai', 'anthropic', 'langchain', 'agno']
```

## Framework-Specific Adapters

### OpenAIAdapter

Provides OpenAI function calling compatible tools.

#### Methods

##### create_tools() -> List[Dict]
Generate OpenAI function calling definitions.

**Returns:** List of OpenAI function definitions

**Example:**
```python
adapter = create_framework_adapter("openai", handler)
tools = adapter.create_tools()

# OpenAI function calling format
for tool in tools:
    print(f"Function: {tool['function']['name']}")
    print(f"Description: {tool['function']['description']}")
    print(f"Parameters: {tool['function']['parameters']}")
```

##### execute_function(function_name, arguments) -> Any
Execute a Syntha function with OpenAI arguments.

**Parameters:**
- `function_name` (str): Name of the function to execute
- `arguments` (dict): Function arguments from OpenAI

**Returns:** Function execution result

**Example:**
```python
result = adapter.execute_function("push_context", {
    "context_key": "user_data",
    "context_data": {"name": "John"},
    "topic": "users"
})
```

### AnthropicAdapter

Provides Anthropic tool use compatible tools.

#### Methods

##### create_tools() -> List[Dict]
Generate Anthropic tool definitions.

**Returns:** List of Anthropic tool definitions

**Example:**
```python
adapter = create_framework_adapter("anthropic", handler)
tools = adapter.create_tools()

# Anthropic tool format
for tool in tools:
    print(f"Tool: {tool['name']}")
    print(f"Description: {tool['description']}")
    print(f"Input Schema: {tool['input_schema']}")
```

### LangChainAdapter

Provides LangChain tool compatible tools.

#### Methods

##### create_tools() -> List[Tool]
Generate LangChain Tool objects.

**Returns:** List of LangChain Tool instances

**Example:**
```python
adapter = create_framework_adapter("langchain", handler)
tools = adapter.create_tools()

# LangChain tool objects
for tool in tools:
    print(f"Tool: {tool.name}")
    print(f"Description: {tool.description}")
```

### AgnoAdapter

Provides Agno framework compatible tools.

#### Methods

##### create_tools() -> List[Dict]
Generate Agno tool definitions.

**Returns:** List of Agno-compatible tool definitions

**Example:**
```python
adapter = create_framework_adapter("agno", handler)
tools = adapter.create_tools()

# Use with Agno agents
from agno import Agent

agent = Agent(tools=tools)
```

## Tool Factory Integration

### SynthaToolFactory

High-level factory for creating framework-specific tools.

```python
from syntha.tool_factory import SynthaToolFactory

factory = SynthaToolFactory(tool_handler)

# Create tools for specific framework
openai_tools = factory.create_tools("openai")
anthropic_tools = factory.create_tools("anthropic")
langchain_tools = factory.create_tools("langchain")
agno_tools = factory.create_tools("agno")
```

#### Methods

##### create_tools(framework_name) -> List
Create tools for specified framework.

##### get_adapter(framework_name) -> Adapter
Get cached adapter instance.

##### clear_cache()
Clear adapter cache.

##### get_cache_info() -> Dict
Get cache statistics.

## Custom Adapter Development

### Creating Custom Adapters

```python
from syntha.framework_adapters.base import BaseAdapter

class CustomFrameworkAdapter(BaseAdapter):
    def __init__(self, tool_handler):
        super().__init__(tool_handler)
        self.framework_name = "custom"
    
    def create_tools(self):
        """Create custom framework tool definitions."""
        tools = []
        
        # Define push_context tool
        tools.append({
            "name": "store_context",
            "description": "Store context data",
            "parameters": {
                "key": {"type": "string", "required": True},
                "data": {"type": "object", "required": True},
                "category": {"type": "string", "required": False}
            },
            "handler": self.tool_handler.push_context
        })
        
        return tools
    
    def execute_tool(self, tool_name, arguments):
        """Execute a tool with custom argument processing."""
        # Custom execution logic
        pass

# Register custom adapter
from syntha.framework_adapters import register_adapter
register_adapter("custom", CustomFrameworkAdapter)
```

## Error Handling

Framework adapters handle various error conditions:

```python
from syntha.exceptions import (
    UnsupportedFrameworkError,
    AdapterCreationError,
    ToolExecutionError
)

try:
    adapter = create_framework_adapter("unsupported", handler)
except UnsupportedFrameworkError as e:
    print(f"Framework not supported: {e}")

try:
    tools = adapter.create_tools()
except AdapterCreationError as e:
    print(f"Failed to create tools: {e}")

try:
    result = adapter.execute_function("invalid_function", {})
except ToolExecutionError as e:
    print(f"Tool execution failed: {e}")
```

## Performance Considerations

### Adapter Caching

Adapters are automatically cached for performance:

```python
# First call creates and caches adapter
adapter1 = create_framework_adapter("openai", handler)

# Second call returns cached adapter
adapter2 = create_framework_adapter("openai", handler)

assert adapter1 is adapter2  # Same instance
```

### Tool Creation Optimization

```python
# Create tools once and reuse
tools = adapter.create_tools()

# Reuse tools across multiple operations
for operation in operations:
    # Use cached tools
    pass
```

## Complete Example

```python
#!/usr/bin/env python3
"""
Framework Adapter Usage Example
"""

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter, get_supported_frameworks
from syntha.tool_factory import SynthaToolFactory

def main():
    # Setup
    mesh = ContextMesh(user_id="adapter_demo")
    handler = ToolHandler(mesh, "DemoAgent")
    
    # Show supported frameworks
    frameworks = get_supported_frameworks()
    print(f"Supported frameworks: {frameworks}")
    
    # Create adapters for each framework
    for framework in frameworks:
        try:
            adapter = create_framework_adapter(framework, handler)
            tools = adapter.create_tools()
            print(f"{framework}: {len(tools)} tools created")
            
        except Exception as e:
            print(f"{framework}: Error - {e}")
    
    # Use tool factory for convenience
    factory = SynthaToolFactory(handler)
    
    # Create OpenAI tools and demonstrate usage
    openai_tools = factory.create_tools("openai")
    
    # Simulate function call
    push_tool = next(t for t in openai_tools if t['function']['name'] == 'push_context')
    print(f"\nExample tool: {push_tool['function']['name']}")
    print(f"Description: {push_tool['function']['description']}")
    
    # Execute function directly
    handler.push_context("demo_data", {"example": "value"})
    retrieved = handler.get_context("demo_data")
    print(f"Stored and retrieved: {retrieved}")
    
    # Cleanup
    mesh.close()

if __name__ == "__main__":
    main()
```

## See Also

- [Tool Handler API](tool-handler.md)
- [Context Mesh API](context-mesh.md)
- [OpenAI Integration Example](../examples/adapters/openai.md)
- [Framework Concepts](../user-guide/concepts/adapters.md)
