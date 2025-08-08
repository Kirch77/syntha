"""
Extras - Complete Workflows (Concise, Runnable)

End-to-end product launch workflow using Syntha’s multi-agent tools.
Uses a real OpenAI model if OPENAI_API_KEY is available; otherwise simulates.
"""

import os
import json
from typing import Dict, Any

from syntha import ContextMesh, create_multi_agent_handlers, build_system_prompt

try:
    from openai import OpenAI  # type: ignore
except Exception:
    OpenAI = None


def maybe_run_openai(handler_name: str, handlers: Dict[str, Any], context: ContextMesh) -> None:
    api_key = os.getenv("OPENAI_API_KEY")
    use_real = bool(api_key and OpenAI)
    print("\n🤖 LLM step:", "Using real OpenAI" if use_real else "Simulation mode")

    system_prompt = build_system_prompt(handler_name, context)
    handler = handlers[handler_name]

    # Prepare OpenAI tools (function calling)
    tools = [{"type": "function", "function": schema} for schema in handler.get_schemas()]

    messages = [
        {"role": "system", "content": system_prompt},
        {
            "role": "user",
            "content": "Summarize our current product launch status. If needed, call tools to read context.",
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
        choice = response.choices[0]
        tool_calls = choice.message.tool_calls or []
    else:
        # Simulate a get_context tool call
        tool_calls = [
            {
                "function": {"name": "get_context", "arguments": json.dumps({})}
            }
        ]

    # Execute tool calls
    for call in tool_calls:
        fn = call["function"]["name"]
        args = call["function"].get("arguments")
        args = json.loads(args) if isinstance(args, str) and args else {}
        result = handler.handle_tool_call(fn, **args)
        print(f"🔧 {fn} -> {result['success']} ({len(result.get('context', {}))} items)")


def main():
    print("🚀 Complete Workflow - Product Launch")
    print("=" * 50)

    # 1) Create mesh and agents
    context = ContextMesh(user_id="ecommerce_team", enable_persistence=True, db_backend="sqlite", db_path="product_launch.db")

    agent_configs = [
        {"name": "MarketResearcher", "role": "contributor", "topics": ["research", "market", "trends"]},
        {"name": "ProductManager", "role": "admin", "topics": ["product", "requirements", "strategy"]},
        {"name": "EngineeringLead", "role": "contributor", "topics": ["development", "technical", "timeline"]},
        {"name": "MarketingManager", "role": "contributor", "topics": ["marketing", "campaign", "launch"]},
        {"name": "SalesDirector", "role": "contributor", "topics": ["sales", "pricing", "materials"]},
        {"name": "ProjectCoordinator", "role": "admin", "topics": ["coordination", "status", "timeline"]},
    ]

    handlers = create_multi_agent_handlers(context, agent_configs)
    print(f"✅ Created {len(handlers)} handlers")

    # 2) Push core context by role
    handlers["MarketResearcher"].handle_tool_call(
        "push_context",
        key="market_analysis",
        value={"target_market": "Eco-conscious millennials", "growth_rate": "15%"},
        topics=["research", "market"],
    )

    handlers["ProductManager"].handle_tool_call(
        "push_context",
        key="product_requirements",
        value={
            "name": "EcoSmart Water Bottle",
            "features": ["recycled_materials", "insulation", "sensor"],
            "launch_timeline": "Q2 2025",
        },
        topics=["product", "requirements", "strategy"],
    )

    handlers["EngineeringLead"].handle_tool_call(
        "push_context",
        key="development_plan",
        value={"phases": {"design": "3w", "prototype": "4w"}},
        topics=["development", "timeline"],
    )

    handlers["MarketingManager"].handle_tool_call(
        "push_context",
        key="marketing_strategy",
        value={"theme": "Hydrate Sustainably", "channels": ["social", "influencers", "paid"]},
        topics=["marketing", "campaign"],
    )

    handlers["SalesDirector"].handle_tool_call(
        "push_context",
        key="sales_strategy",
        value={"tiers": {"early_bird": 39.99, "launch": 49.99}},
        topics=["sales", "pricing"],
    )

    # 3) Optional: Ask LLM (ProjectCoordinator) to summarize using tools
    maybe_run_openai("ProjectCoordinator", handlers, context)

    # 4) Show aggregated view for coordinator
    coord = handlers["ProjectCoordinator"].handle_tool_call("get_context")
    print(f"\n📋 Coordinator sees {len(coord['context'])} items")
    print("Keys:", list(coord["context"].keys()))

    print("\n✅ Complete workflow finished")


if __name__ == "__main__":
    main()
