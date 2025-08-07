"""
OpenAI Integration Example

This example shows how to integrate Syntha with OpenAI's API
for multi-agent conversations with shared context.
"""

import json

from syntha import ContextMesh, ToolHandler, build_system_prompt

# Note: This example requires OpenAI API key and the openai package
# pip install openai


def simulate_openai_call(messages, tools=None):
    """
    Simulate an OpenAI API call for demonstration purposes.
    In real usage, replace this with actual openai.chat.completions.create()
    """
    print("🤖 Simulated OpenAI API Call:")
    print(f"Messages: {len(messages)} messages")
    if tools:
        print(f"Tools: {[tool['function']['name'] for tool in tools]}")

    # Simulate agent response with tool call
    return {
        "choices": [
            {
                "message": {
                    "content": "I'll help you with the product launch campaign. Let me check the current context first.",
                    "tool_calls": [
                        {
                            "id": "call_123",
                            "type": "function",
                            "function": {
                                "name": "get_context",
                                "arguments": json.dumps(
                                    {
                                        "agent_name": "MarketingBot",
                                        "keys": ["campaign", "company_vision"],
                                    }
                                ),
                            },
                        }
                    ],
                }
            }
        ]
    }


def main():
    print("🚀 Syntha + OpenAI Integration Example")
    print("=" * 50)

    # 1. Set up Syntha
    mesh = ContextMesh()
    tool_handler = ToolHandler(mesh)

    # Push initial context
    mesh.push("company_vision", "To democratize AI for small businesses")
    mesh.push(
        "campaign",
        {
            "name": "ProductLaunch",
            "budget": 10000,
            "target_audience": "small business owners",
            "goals": ["increase_awareness", "generate_leads"],
        },
        subscribers=["MarketingBot", "SalesBot"],
    )

    mesh.push(
        "brand_guidelines",
        {
            "tone": "friendly and professional",
            "colors": ["#007bff", "#28a745"],
            "voice": "encouraging and supportive",
        },
    )

    # 2. Build system prompt with context
    agent_name = "MarketingBot"
    system_prompt = build_system_prompt(agent_name, mesh)

    # 3. Prepare OpenAI function calling tools
    tools = [
        {"type": "function", "function": schema}
        for schema in tool_handler.get_schemas()
    ]

    # 4. Simulate conversation
    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": "Help me create a marketing strategy for our product launch campaign.",
        },
    ]

    print("📝 System Prompt:")
    print("-" * 30)
    print(system_prompt)
    print()

    print("🔧 Available Tools:")
    for tool in tools:
        print(f"- {tool['function']['name']}: {tool['function']['description']}")
    print()

    # Simulate the OpenAI call
    response = simulate_openai_call(messages, tools)

    # 5. Handle tool calls
    if response["choices"][0]["message"].get("tool_calls"):
        print("🛠️ Processing tool calls...")

        for tool_call in response["choices"][0]["message"]["tool_calls"]:
            function_name = tool_call["function"]["name"]
            function_args = json.loads(tool_call["function"]["arguments"])

            print(f"Tool: {function_name}")
            print(f"Args: {function_args}")

            # Handle the tool call
            result = tool_handler.handle_tool_call(function_name, **function_args)
            print(f"Result: {result}")

            # Add tool result to conversation
            messages.append(
                {
                    "role": "assistant",
                    "content": response["choices"][0]["message"]["content"],
                    "tool_calls": response["choices"][0]["message"]["tool_calls"],
                }
            )
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_call["id"],
                    "content": json.dumps(result),
                }
            )

    # 6. Show how context can be updated during conversation
    print("\n📤 Updating context during conversation...")

    # Simulate agent pushing new context
    strategy_update = tool_handler.handle_tool_call(
        "push_context",
        key="marketing_strategy",
        value=json.dumps(
            {
                "channels": ["social_media", "email", "content_marketing"],
                "timeline": "Q1 2025",
                "budget_allocation": {
                    "social_media": 0.4,
                    "email": 0.3,
                    "content": 0.3,
                },
            }
        ),
        subscribers=["MarketingBot", "SalesBot", "ContentBot"],
    )

    print(f"Strategy update: {strategy_update['success']}")

    # 7. Show updated context for other agents
    print("\n🔄 Context now available to other agents:")
    sales_context = mesh.get_all_for_agent("SalesBot")
    print(f"SalesBot can access: {list(sales_context.keys())}")

    print("\n✅ Integration example completed!")


def real_openai_example():
    """
    Example of actual OpenAI integration (requires API key).
    Uncomment and modify as needed.
    """
    # import openai
    #
    # # Set up your OpenAI client
    # client = openai.OpenAI(api_key="your-api-key")
    #
    # mesh = ContextMesh()
    # tool_handler = ToolHandler(mesh)
    #
    # # ... set up context ...
    #
    # response = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=[
    #         {"role": "system", "content": build_system_prompt("MarketingBot", mesh)},
    #         {"role": "user", "content": "Create a marketing campaign"}
    #     ],
    #     tools=[
    #         {"type": "function", "function": schema}
    #         for schema in tool_handler.get_schemas()
    #     ]
    # )
    #
    # # Handle tool calls...
    pass


if __name__ == "__main__":
    main()
