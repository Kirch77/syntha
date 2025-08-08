"""
Framework Adapters - OpenAI Integration Example

This example demonstrates how to integrate Syntha with OpenAI's API
for context-aware multi-agent conversations.

Prerequisites:
- pip install openai
- Set OPENAI_API_KEY environment variable

Copy and run this code to see OpenAI integration in action!
"""

import json
import os

from syntha import ContextMesh, ToolHandler, build_system_prompt

try:
    from openai import OpenAI  # type: ignore
except Exception:
    OpenAI = None


def simulate_openai_call(messages, tools=None, model="gpt-4"):
    """
    Simulate OpenAI API call for demonstration.
    Replace this with actual OpenAI client in real usage.
    """
    print(f"🤖 [SIMULATED] OpenAI API Call to {model}")
    print(f"   Messages: {len(messages)}")
    if tools:
        tool_names = [tool["function"]["name"] for tool in tools]
        print(f"   Tools: {tool_names}")

    # Simulate agent deciding to use a tool
    return {
        "choices": [
            {
                "message": {
                    "content": "I'll help you with the sales analysis. Let me check the current context first.",
                    "tool_calls": [
                        {
                            "id": "call_123",
                            "type": "function",
                            "function": {
                                "name": "get_context",
                                "arguments": json.dumps({}),
                            },
                        }
                    ],
                }
            }
        ]
    }


def real_openai_example():
    """
    Example of real OpenAI integration (commented out for demo).
    Uncomment and modify for actual usage.
    """
    # Uncomment these lines for real OpenAI usage:

    # import openai
    # client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    #
    # response = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=messages,
    #     tools=tools,
    #     tool_choice="auto"
    # )
    #
    # return response


def main():
    print("🚀 Framework Adapters - OpenAI Integration")
    print("=" * 50)

    # Check for API key (for real usage)
    api_key = os.getenv("OPENAI_API_KEY")
    use_real = bool(api_key and OpenAI)
    print("✅ Using real OpenAI client" if use_real else "⚠️  Using simulation mode")

    # 1. Set up Syntha
    context = ContextMesh(user_id="sales_team")
    handler = ToolHandler(context, "SalesAgent")

    # Add business context
    context.push(
        "company_info",
        {
            "name": "TechSolutions Inc",
            "industry": "Software Development",
            "size": "50-100 employees",
            "target_market": "Small to medium businesses",
        },
    )

    context.push(
        "sales_data",
        {
            "q4_revenue": 250000,
            "leads_generated": 45,
            "conversion_rate": 0.12,
            "top_products": ["CRM Pro", "Analytics Suite", "Mobile App"],
        },
    )

    context.push(
        "current_campaign",
        {
            "name": "New Year Growth",
            "budget": 15000,
            "channels": ["email", "social_media", "webinars"],
            "start_date": "2025-01-01",
        },
    )

    print("✅ Business context added to mesh")

    # 2. Build context-aware system prompt
    system_prompt = build_system_prompt("SalesAgent", context)

    # 3. Prepare OpenAI function calling tools
    tools = [
        {"type": "function", "function": schema} for schema in handler.get_schemas()
    ]

    print(f"🔧 Available tools: {[tool['function']['name'] for tool in tools]}")

    # 4. Conversation
    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": "Analyze our sales performance and suggest improvements for Q1.",
        },
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
        # Simulated response (triggers get_context)
        response = simulate_openai_call(messages, tools)

    # 5. Handle tool calls
    if response["choices"][0]["message"].get("tool_calls"):
        for tool_call in response["choices"][0]["message"]["tool_calls"]:
            function_name = tool_call["function"]["name"]
            function_args = json.loads(tool_call["function"]["arguments"])

            print(f"\n🔧 Agent wants to call: {function_name}")
            print(f"   Arguments: {function_args}")

            # Execute the tool call
            result = handler.handle_tool_call(function_name, **function_args)
            print(f"   Result: {result['success']}")

            if result["success"] and "context" in result:
                print("   Retrieved context:")
                for key, value in result["context"].items():
                    print(f"     - {key}: {type(value).__name__}")

    if not use_real:
        print("\n💡 To use a real LLM: pip install openai && export OPENAI_API_KEY='<key>'")

    # 7. Demonstrate framework-specific tool formats
    print("\n🔄 OpenAI-specific tool formats:")
    openai_tools = handler.get_openai_functions()
    for tool in openai_tools[:2]:  # Show first 2 tools
        fn = tool.get("function", {})
        print(f"   {fn.get('name')}: {fn.get('description', '')[:50]}...")

    print("\n✅ OpenAI integration example complete!")


if __name__ == "__main__":
    main()
