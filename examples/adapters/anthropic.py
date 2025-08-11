"""
Framework Adapters - Anthropic Claude Integration Example

This example demonstrates how to integrate Syntha with Anthropic's Claude API
for context-aware multi-agent conversations.

Prerequisites:
- pip install anthropic
- Set ANTHROPIC_API_KEY environment variable

Copy and run this code to see Anthropic integration in action!
"""

import json
import os

from syntha import ContextMesh, ToolHandler, build_system_prompt

try:
    import anthropic  # type: ignore
except Exception:
    anthropic = None


def simulate_anthropic_call(messages, tools=None, model="claude-3-sonnet-20240229"):
    """
    Simulate Anthropic API call for demonstration.
    Replace this with actual Anthropic client in real usage.
    """
    print(f"🤖 [SIMULATED] Anthropic API Call to {model}")
    print(f"   Messages: {len(messages)}")
    if tools:
        tool_names = [tool["name"] for tool in tools]
        print(f"   Tools: {tool_names}")

    # Simulate Claude deciding to use a tool
    return {
        "content": [
            {
                "type": "text",
                "text": "I'll help you analyze the customer support data. Let me first check what context is available.",
            },
            {"type": "tool_use", "id": "toolu_123", "name": "get_context", "input": {}},
        ]
    }


def real_anthropic_example():
    """
    Example of real Anthropic integration (commented out for demo).
    Uncomment and modify for actual usage.
    """
    # Uncomment these lines for real Anthropic usage:

    # import anthropic
    # client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    #
    # response = client.messages.create(
    #     model="claude-3-sonnet-20240229",
    #     max_tokens=1000,
    #     tools=tools,
    #     messages=messages
    # )
    #
    # return response


def main():
    print("🚀 Framework Adapters - Anthropic Claude Integration")
    print("=" * 55)

    # Check for API key (for real usage)
    api_key = os.getenv("ANTHROPIC_API_KEY")
    use_real = bool(api_key and anthropic)
    print("✅ Using real Anthropic client" if use_real else "⚠️  Using simulation mode")

    # 1. Set up Syntha
    context = ContextMesh(user_id="support_team")
    handler = ToolHandler(context, "SupportAgent")

    # Add customer support context
    context.push(
        "support_metrics",
        {
            "avg_response_time": "2.5 hours",
            "resolution_rate": 0.87,
            "customer_satisfaction": 4.2,
            "open_tickets": 23,
            "resolved_today": 15,
        },
    )

    context.push(
        "common_issues",
        {
            "login_problems": {"frequency": "high", "avg_resolution": "15 minutes"},
            "billing_questions": {
                "frequency": "medium",
                "avg_resolution": "30 minutes",
            },
            "feature_requests": {"frequency": "low", "avg_resolution": "varies"},
            "bug_reports": {"frequency": "medium", "avg_resolution": "2 hours"},
        },
    )

    context.push(
        "team_info",
        {
            "agents_online": 5,
            "total_agents": 8,
            "current_shift": "day",
            "escalation_available": True,
        },
    )

    print("✅ Support context added to mesh")

    # 2. Build context-aware system prompt
    system_prompt = build_system_prompt("SupportAgent", context)

    # 3. Prepare Anthropic tool definitions
    tools = handler.get_anthropic_tools()

    print(f"🔧 Available tools: {[tool['name'] for tool in tools]}")

    # 4. Simulate conversation
    messages = [
        {
            "role": "user",
            "content": "I need a summary of our support performance and recommendations for improvement.",
        }
    ]

    if use_real:
        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=700,
            system="You have access to context tools. Use them when appropriate.",
            messages=[{"role": "user", "content": messages[0]["content"]}],
            tools=tools,
        )
        # Normalize real response to a dict-like structure with content blocks
        content_blocks = response.content
    else:
        sim = simulate_anthropic_call(messages, tools)
        content_blocks = sim.get("content", [])

    # 5. Handle tool calls
    if content_blocks:
        for content_block in content_blocks:
            if content_block.get("type") == "tool_use":
                tool_name = content_block["name"]
                tool_input = content_block.get("input", {})

                print(f"\n🔧 Claude wants to call: {tool_name}")
                print(f"   Input: {tool_input}")

                # Execute the tool call
                result = handler.handle_tool_call(tool_name, **tool_input)
                print(f"   Result: {result['success']}")

                if result["success"] and "context" in result:
                    print("   Retrieved context:")
                    for key, value in result["context"].items():
                        print(f"     - {key}: {type(value).__name__}")

    # 6. Show how to continue the conversation with tool results
    print("\n💬 Tool result would be sent back to Claude:")
    print("   This allows Claude to analyze the context and provide insights")

    # 7. Demonstrate Anthropic-specific features
    print("\n🎯 Anthropic-specific tool format example:")
    if tools:
        example_tool = tools[0]
        print(f"   Name: {example_tool['name']}")
        print(f"   Description: {example_tool['description'][:60]}...")
        if "input_schema" in example_tool:
            print(f"   Schema type: {example_tool['input_schema']['type']}")

    # 8. Show how to add context based on conversation
    handler.handle_tool_call(
        "push_context",
        key="conversation_summary",
        value="User requested support performance analysis",
        topics=["support", "analytics"],
    )

    print("\n📝 Added conversation context for future reference")

    print("\n💡 Next steps for real integration:")
    print("1. Install: pip install anthropic")
    print("2. Set environment variable: export ANTHROPIC_API_KEY='your-key-here'")
    print("3. Replace simulate_anthropic_call() with real Anthropic client")
    print("4. Handle tool results in conversation flow")
    print("5. Use Claude's analysis capabilities with Syntha's context")

    print("\n✅ Anthropic integration example complete!")


if __name__ == "__main__":
    main()
