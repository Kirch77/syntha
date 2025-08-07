# Tool Handler API Reference

The `ToolHandler` lets an agent call Syntha tools (get, push, list, topic ops) and fetch framework-specific tool definitions.

## Class: ToolHandler

```python
class ToolHandler:
    def __init__(
        self,
        context_mesh: ContextMesh,
        agent_name: Optional[str] = None,
        allowed_tools: Optional[List[str]] = None,
        denied_tools: Optional[List[str]] = None,
        role_based_access: Optional[Dict[str, List[str]]] = None,
    )
```

### Core usage

```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh(user_id="demo")
handler = ToolHandler(mesh, "Agent")

# Get all accessible context
ctx = handler.handle_tool_call("get_context")

# Push context with topics
handler.handle_tool_call(
    "push_context",
    key="status",
    value="API ready",
    topics=["development"],
)

# Subscribe to topics
handler.handle_tool_call("subscribe_to_topics", topics=["development", "support"]) 

# List keys (also grouped by topic)
keys = handler.handle_tool_call("list_context")
```

### Available tools and payloads

- get_context(keys?: List[str]) -> `{ success, context, keys_found, ... }`
- push_context(key: str, value: str|json, topics?: List[str], subscribers?: List[str], ttl_hours?: float=24) -> `{ success, ... }`
- list_context() -> `{ success, keys_by_topic, all_accessible_keys, topics_subscribed, total_keys }`
- subscribe_to_topics(topics: List[str]) -> `{ success, agent, topics, message }`
- discover_topics(include_subscriber_names?: bool=False) -> `{ success, topics, total_topics, popular_topics, suggestions }`
- unsubscribe_from_topics(topics: List[str]) -> `{ success, topics_unsubscribed, remaining_topics, ... }`
- delete_topic(topic: str, confirm: bool) -> `{ success, ... }`

### Access control helpers

```python
# Role-based presets and ad-hoc allow/deny
handler.set_agent_role("contributor")
handler.set_allowed_tools(["get_context", "push_context"])  # only these
handler.add_denied_tool("delete_topic")                      # explicitly deny

handler.get_available_tools()  # -> ["get_context", ...]
handler.has_tool_access("push_context")  # -> True/False
```

### Framework adapters

```python
# OpenAI function calling definitions
openai_functions = handler.get_openai_functions()

# LangChain tools (BaseTool instances)
langchain_tools = handler.get_langchain_tools()

# Anthropic tool definitions
anthropic_tools = handler.get_anthropic_tools()

# Generic helper: any supported framework
tools = handler.get_tools_for_framework("langgraph")
```

### Hybrid handler (optional)

```python
# Let one function handle both Syntha and your own tools
hybrid = handler.create_hybrid_handler(user_tool_handler=my_handler)
result = hybrid("get_context")
```

### Notes
- All examples above are copy‑paste runnable with the SDK.
- Tool names are strictly: `get_context`, `push_context`, `list_context`, `subscribe_to_topics`, `discover_topics`, `unsubscribe_from_topics`, `delete_topic`.
