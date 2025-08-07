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

def simulate_openai_call(messages, tools=None, model="gpt-4"):
    """Simulate OpenAI API call for demonstration."""
    print(f"🤖 [SIMULATED] OpenAI API Call to {model}")
    print(f"   Messages: {len(messages)}")
    if tools:
        tool_names = [tool['function']['name'] for tool in tools]
        print(f"   Tools: {tool_names}")
    
    # Simulate agent deciding to use a tool
    return {
        "choices": [{
            "message": {
                "content": "I'll help you with the sales analysis. Let me check the current context first.",
                "tool_calls": [{
                    "id": "call_123",
                    "type": "function",
                    "function": {
                        "name": "get_context",
                        "arguments": json.dumps({})
                    }
                }]
            }
        }]
    }

def main():
    print("🚀 Framework Adapters - OpenAI Integration")
    print("=" * 50)
    
    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        print("✅ OpenAI API key found")
    else:
        print("⚠️  No OpenAI API key found - using simulation mode")
    
    # Set up Syntha
    context = ContextMesh(user_id="sales_team")
    handler = ToolHandler(context, "SalesAgent")
    
    # Add business context
    context.push("company_info", {
        "name": "TechSolutions Inc",
        "industry": "Software Development"
    })
    
    context.push("sales_data", {
        "q4_revenue": 250000,
        "leads_generated": 45,
        "conversion_rate": 0.12
    })
    
    print("✅ Business context added to mesh")
    
    # Build context-aware system prompt
    system_prompt = build_system_prompt("SalesAgent", context)
    
    # Prepare OpenAI function calling tools
    tools = [
        {"type": "function", "function": schema}
        for schema in handler.get_schemas()
    ]
    
    print(f"🔧 Available tools: {[tool['function']['name'] for tool in tools]}")
    
    # Simulate conversation
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Analyze our sales performance"}
    ]
    
    # Simulate OpenAI response
    response = simulate_openai_call(messages, tools)
    
    # Handle tool calls
    if response["choices"][0]["message"].get("tool_calls"):
        for tool_call in response["choices"][0]["message"]["tool_calls"]:
            function_name = tool_call["function"]["name"]
            function_args = json.loads(tool_call["function"]["arguments"])
            
            print(f"\n🔧 Agent wants to call: {function_name}")
            print(f"   Arguments: {function_args}")
            
            # Execute the tool call
            result = handler.handle_tool_call(function_name, **function_args)
            print(f"   Result: {result['success']}")
            
            if result['success'] and 'context' in result:
                print("   Retrieved context:")
                for key, value in result['context'].items():
                    print(f"     - {key}: {type(value).__name__}")
    
    print("\n✅ OpenAI integration example complete!")

if __name__ == "__main__":
    main()
```

## Real OpenAI Usage

```python
# Uncomment for real OpenAI usage:
# import openai
# client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# 
# response = client.chat.completions.create(
#     model="gpt-4",
#     messages=messages,
#     tools=tools,
#     tool_choice="auto"
# )
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
