# OpenAI Integration

Integration with OpenAI's function calling for context-aware conversations.

## Prerequisites

```bash
pip install openai
export OPENAI_API_KEY='your-key-here'
```

## Example

```python
import os
import json
from syntha import ContextMesh, ToolHandler, build_system_prompt

try:
    import openai  # type: ignore
    from openai import OpenAI
except ImportError:
    openai = None
    OpenAI = None

def main():
    print("🚀 Framework Adapters - OpenAI Integration")
    print("=" * 50)

    api_key = os.getenv("OPENAI_API_KEY")
    use_real = bool(api_key and OpenAI)
    print("✅ Using real OpenAI client" if use_real else "⚠️  Using simulation mode")

    # Set up Syntha
    context = ContextMesh(user_id="sales_team")
    handler = ToolHandler(context, "SalesAgent")

    # Add business context
    context.push("company_info", {"name": "TechSolutions Inc", "industry": "Software"})
    context.push("sales_data", {"q4_revenue": 250000, "leads_generated": 45, "conversion_rate": 0.12})

    # Build context-aware system prompt
    system_prompt = build_system_prompt("SalesAgent", context)

    # Prepare OpenAI-compatible tools
    tools = [{"type": "function", "function": schema} for schema in handler.get_schemas()]

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Analyze our sales performance"},
    ]

    if use_real:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )
    else:
        # Simulated response that triggers a get_context call
        response = {
            "choices": [
                {
                    "message": {
                        "content": "I'll check the current context first.",
                        "tool_calls": [
                            {
                                "id": "call_123",
                                "type": "function",
                                "function": {"name": "get_context", "arguments": json.dumps({})},
                            }
                        ],
                    }
                }
            ]
        }

    # Handle tool calls
    choice = response["choices"][0]
    tool_calls = choice["message"].get("tool_calls", []) if isinstance(choice, dict) else choice.message.tool_calls

    if tool_calls:
        for call in tool_calls:
            fn = call["function"]["name"] if isinstance(call, dict) else call.function.name
            args_raw = call["function"]["arguments"] if isinstance(call, dict) else call.function.arguments
            args = json.loads(args_raw) if isinstance(args_raw, str) else (args_raw or {})
            result = handler.handle_tool_call(fn, **args)
            print(f"🔧 {fn} -> {result['success']} ({len(result.get('context', {}))} items)")
    else:
        print("No tool calls issued by the model.")

    print("\n✅ OpenAI integration example complete!")

if __name__ == "__main__":
    main()
```

## Framework-Specific Tools

```python
# Get OpenAI-specific tool formats
openai_tools = handler.get_openai_functions()
for tool in openai_tools:
    print(f"{tool['name']}: {tool['description']}")
```

## See Also

- [Anthropic Integration](anthropic.md)
- [LangChain Integration](langchain.md)
- [Tool Basics](../tools/tool-basics.md)
