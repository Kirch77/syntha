"""
Extras - Real-World Use Cases Example

This example demonstrates practical real-world applications of Syntha
across different industries and business scenarios.

Uses a real OpenAI model if OPENAI_API_KEY is available; otherwise prints flows.
"""

import os
import json
from syntha import ContextMesh, ToolHandler, build_system_prompt

try:
    from openai import OpenAI  # type: ignore
except Exception:
    OpenAI = None


def maybe_openai_summarize(agent_name: str, handler: ToolHandler, mesh: ContextMesh, user_message: str) -> None:
    api_key = os.getenv("OPENAI_API_KEY")
    use_real = bool(api_key and OpenAI)
    print("\n🤖 LLM step:", "Using real OpenAI" if use_real else "Simulation mode")

    system_prompt = build_system_prompt(agent_name, mesh)
    tools = [{"type": "function", "function": schema} for schema in handler.get_schemas()]

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message},
    ]

    if use_real:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )
        tool_calls = response.choices[0].message.tool_calls or []
    else:
        tool_calls = [{"function": {"name": "get_context", "arguments": json.dumps({})}}]

    for call in tool_calls:
        fn = call["function"]["name"]
        args = call["function"].get("arguments")
        args = json.loads(args) if isinstance(args, str) and args else {}
        result = handler.handle_tool_call(fn, **args)
        print(f"🔧 {fn} -> {result['success']} ({len(result.get('context', {}))} items)")


def customer_support_use_case():
    """Customer Support: Multi-tier support with context continuity."""
    print("🎧 Use Case 1: Customer Support System")
    print("-" * 40)

    context = ContextMesh(user_id="customer_12345")

    # Initial customer context
    context.push(
        "customer_profile",
        {
            "id": "CUST-12345",
            "name": "Sarah Johnson",
            "tier": "Premium",
            "subscription": "Enterprise Plan",
            "account_value": 15000,
        },
    )

    # L1 Support Agent handles initial inquiry
    l1_agent = ToolHandler(context, "L1Support")
    l1_agent.handle_tool_call(
        "push_context",
        key="initial_inquiry",
        value={
            "issue": "Unable to generate quarterly reports",
            "urgency": "high",
        },
        topics=["support", "escalation"],
    )

    # L2 Technical Support gets full context
    l2_agent = ToolHandler(context, "L2Technical")
    l2_agent.handle_tool_call(
        "push_context",
        key="technical_analysis",
        value={
            "root_cause": "Database query timeout in reporting module",
            "fix_applied": "Optimized query and increased timeout limit",
        },
        topics=["support", "resolution"],
    )

    # Customer Success Manager follows up
    csm_agent = ToolHandler(context, "CustomerSuccess")
    csm_agent.handle_tool_call(
        "push_context",
        key="follow_up",
        value={
            "satisfaction_check": "Customer confirmed issue resolved",
            "additional_support": "Training offered",
        },
    )

    # Optional: Ask OpenAI to summarize the case using tools
    maybe_openai_summarize(
        agent_name="CustomerSuccess",
        handler=csm_agent,
        mesh=context,
        user_message="Summarize the current support case for handoff.",
    )

    print("✅ Multi-tier support with complete context continuity")


def sales_intelligence_use_case():
    """Sales Intelligence: Coordinated lead nurturing and conversion."""
    print("\n💼 Use Case 2: Sales Intelligence System")
    print("-" * 42)

    context = ContextMesh(user_id="lead_techcorp_001")

    # Marketing Qualified Lead (MQL) data
    context.push(
        "lead_profile",
        {
            "company": "TechCorp Solutions",
            "contact": "Michael Chen",
            "title": "VP of Operations",
        },
    )

    # Marketing team shares campaign context
    marketing_agent = ToolHandler(context, "MarketingAgent")
    marketing_agent.handle_tool_call(
        "push_context",
        key="marketing_intelligence",
        value={
            "source_campaign": "Automation ROI Webinar",
            "engagement_score": 85,
        },
        topics=["sales", "intelligence"],
    )

    # Sales Development Rep (SDR) qualifies lead
    sdr_agent = ToolHandler(context, "SDRAgent")
    sdr_agent.handle_tool_call(
        "push_context",
        key="qualification_call",
        value={
            "qualification_score": 92,
            "next_steps": "Schedule technical demo with AE",
        },
        topics=["sales", "qualified"],
    )

    # Account Executive takes over with full context
    ae_agent = ToolHandler(context, "AccountExecutive")

    # Optional: Ask OpenAI to draft follow-up email using context
    maybe_openai_summarize(
        agent_name="AccountExecutive",
        handler=ae_agent,
        mesh=context,
        user_message="Draft a follow-up email for the qualified lead.",
    )

    print("✅ Coordinated sales process with shared intelligence")


def content_operations_use_case():
    """Content Operations: Editorial workflow with review cycles."""
    print("\n📝 Use Case 3: Content Operations Workflow")
    print("-" * 43)

    context = ContextMesh(user_id="content_team")

    # Content strategy context
    context.push(
        "content_strategy",
        {
            "campaign": "Thought Leadership Series",
            "target_audience": "C-level executives",
        },
    )

    # Content Writer creates article
    writer = ToolHandler(context, "ContentWriter")
    writer.handle_tool_call(
        "push_context",
        key="article_draft",
        value={"title": "5 Innovation Strategies"},
        topics=["content", "review"],
    )

    # Optional: Ask OpenAI to propose title variations using context
    maybe_openai_summarize(
        agent_name="ContentWriter",
        handler=writer,
        mesh=context,
        user_message="Propose 3 title variations based on current context.",
    )

    print("✅ Streamlined content workflow with quality controls")


def main():
    print("🚀 Real-World Use Cases for Syntha")
    print("=" * 45)

    customer_support_use_case()
    sales_intelligence_use_case()
    content_operations_use_case()

    print("\n✅ Real-world use cases demonstration complete!")


if __name__ == "__main__":
    main()
