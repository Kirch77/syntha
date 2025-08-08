# Anthropic Integration

Integrate Syntha with Anthropic Claude tool use, executing real tool calls when `ANTHROPIC_API_KEY` is available.

## Prerequisites

```bash
pip install anthropic
export ANTHROPIC_API_KEY='your-key-here'
```

## Example

```python
import os
import json
from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter

try:
    import anthropic
except ImportError:
    anthropic = None

def main():
    print("🤖 Anthropic + Syntha Integration")
    print("=" * 35)

    api_key = os.getenv("ANTHROPIC_API_KEY")
    use_real = bool(api_key and anthropic)
    print("✅ Using real Anthropic client" if use_real else "⚠️  Anthropic client not available")

    # Initialize Syntha
    mesh = ContextMesh(user_id="anthropic_user")
    handler = ToolHandler(mesh, "ClaudeAssistant")

    # Add some initial context
    mesh.push("preferences", {"theme": "dark", "language": "en"})

    # Create Anthropic adapter and tools
    adapter = create_framework_adapter("anthropic", handler)
    tools = adapter.create_tools()

    if not use_real:
        print("Set ANTHROPIC_API_KEY to run this example against Claude")
        return

    client = anthropic.Anthropic(api_key=api_key)

    # Ask Claude to list context and then push an update using tools
    user_message = "List available context keys, then store a note under key 'user_note' with value 'hello'."

    response = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=700,
        system="You have access to context tools. Use them when appropriate.",
        messages=[{"role": "user", "content": user_message}],
        tools=tools,
    )

    # Handle tool uses
    tool_outputs = []
    for block in response.content:
        if getattr(block, "type", None) == "tool_use":
            tool_name = block.name
            tool_input = block.input or {}
            print(f"🔧 Executing tool: {tool_name} -> {tool_input}")
            # Route to Syntha ToolHandler
            result = handler.handle_tool_call(tool_name, **tool_input)
            tool_outputs.append({"tool_use_id": block.id, "content": json.dumps(result)})

    if tool_outputs:
        followup = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=700,
            messages=[
                {"role": "user", "content": user_message},
                {"role": "assistant", "content": response.content},
                {"role": "user", "content": tool_outputs},
            ],
            tools=tools,
        )
        print(followup.content[0].text if followup.content else "(no text)")
    else:
        print(response.content[0].text if response.content else "(no text)")

if __name__ == "__main__":
    main()
```

## See Also

- [OpenAI Integration](openai.md)
- [Framework Adapters](../../user-guide/concepts/adapters.md)
