"""
Framework Adapters - LangChain Integration Example

This example demonstrates how to integrate Syntha with LangChain
for building context-aware agent workflows.

Prerequisites:
- pip install langchain langchain-openai
- Set OPENAI_API_KEY environment variable

Copy and run this code to see LangChain integration in action!
"""

import os

from syntha import ContextMesh, ToolHandler, build_system_prompt, SynthaFrameworkError


def simulate_langchain_agent():
    """
    Simulate LangChain agent for demonstration.
    Replace this with actual LangChain agent in real usage.
    """
    print("🤖 [SIMULATED] LangChain Agent Execution")
    print("   Agent would process the prompt and use tools as needed")

    return {
        "output": "Based on the context, I can see we have project data and team information. I'll analyze the current status and provide recommendations.",
        "tool_calls": [
            {"tool": "get_context", "result": "Retrieved project context"},
            {"tool": "push_context", "result": "Shared analysis results"},
        ],
    }


def real_langchain_example(langchain_tools, prompt):
    """
    Example of real LangChain integration (commented out for demo).
    Uncomment and modify for actual usage.
    """
    # Real LangChain usage (will execute only if called)
    from langchain.agents import initialize_agent, AgentType  # type: ignore
    from langchain_openai import ChatOpenAI  # type: ignore

    llm = ChatOpenAI(temperature=0, openai_api_key=os.getenv("OPENAI_API_KEY"))

    agent = initialize_agent(
        tools=langchain_tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True,
    )

    result = agent.run(prompt)
    return result


def main():
    print("🚀 Framework Adapters - LangChain Integration")
    print("=" * 50)

    # Check for API key (for real usage)
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        print("✅ OpenAI API key found for LangChain")
    else:
        print("⚠️  No OpenAI API key found - using simulation mode")
        print("   Set OPENAI_API_KEY environment variable for real usage")

    # 1. Set up Syntha
    context = ContextMesh(user_id="research_team")
    handler = ToolHandler(context, "ResearchAgent")

    # Add research project context
    context.push(
        "project_overview",
        {
            "name": "Market Analysis Q1 2025",
            "objective": "Analyze competitor landscape and market opportunities",
            "deadline": "2025-03-31",
            "budget": 25000,
            "team_size": 4,
        },
    )

    context.push(
        "data_sources",
        {
            "industry_reports": ["Gartner", "Forrester", "IDC"],
            "survey_data": "1000 respondents",
            "competitor_analysis": "Top 10 competitors",
            "market_size": "$2.5B globally",
        },
    )

    context.push(
        "research_progress",
        {
            "literature_review": "completed",
            "data_collection": "80% complete",
            "analysis": "in_progress",
            "report_writing": "not_started",
        },
    )

    print("✅ Research context added to mesh")

    # 2. Get LangChain-compatible tools (fallback if LangChain not installed)
    langchain_tools = None
    try:
        langchain_tools = handler.get_langchain_tools()
        print(f"🔧 LangChain tools created: {len(langchain_tools)} tools")
        for tool in langchain_tools:
            # BaseTool objects expose name/description
            name = getattr(tool, "name", getattr(tool, "__name__", "unknown"))
            description = getattr(tool, "description", "")
            print(f"   - {name}: {description[:50]}...")
    except SynthaFrameworkError as e:
        print("⚠️  LangChain not available (pip install langchain langchain-openai). Using schema fallback.")
        schemas = handler.get_schemas()
        print(f"🔧 Available tool schemas: {len(schemas)}")
        for schema in schemas:
            print(f"   - {schema.get('name')}: {schema.get('description', '')[:50]}...")

    # 3. Build context-aware prompt
    system_prompt = build_system_prompt("ResearchAgent", context)

    user_query = "Analyze our research progress and suggest next steps for the market analysis project."

    full_prompt = f"{system_prompt}\n\nUser Query: {user_query}"

    print(f"\n📝 Generated context-aware prompt ({len(full_prompt)} characters)")

    # 4. Run LangChain agent if available; otherwise, simulate
    try:
        if langchain_tools and api_key:
            # Avoid local module shadowing when running this file directly
            import sys, os
            here_dir = os.path.dirname(__file__)
            if sys.path and sys.path[0] == here_dir:
                sys.path.pop(0)
            result_text = real_langchain_example(langchain_tools, full_prompt)
            result = {"output": result_text, "tool_calls": []}
        else:
            result = simulate_langchain_agent()
    except Exception as e:
        print(f"⚠️  LangChain execution failed ({e}). Falling back to simulation.")
        result = simulate_langchain_agent()

    print(f"\n🤖 Agent Output: {result['output']}")
    print("   Tool calls made:")
    for call in result["tool_calls"]:
        print(f"     - {call['tool']}: {call['result']}")

    # 5. Demonstrate tool usage
    print("\n🔧 Demonstrating actual tool usage:")

    # Agent retrieves context
    context_result = handler.handle_tool_call("get_context")
    print(f"   Retrieved {len(context_result['context'])} context items")

    # Agent adds new insights
    analysis_result = handler.handle_tool_call(
        "push_context",
        key="analysis_insights",
        value={
            "key_findings": [
                "Market growing at 15% CAGR",
                "3 main competitor gaps identified",
            ],
            "recommendations": [
                "Focus on SMB segment",
                "Accelerate product development",
            ],
            "next_steps": ["Complete competitor interviews", "Finalize market sizing"],
        },
        topics=["research", "analysis"],
    )
    print(f"   Shared analysis: {analysis_result['success']}")

    # 6. Show LangChain-specific features
    print("\n🔗 LangChain-specific capabilities:")
    print("   - Tools are BaseTool instances with proper schemas")
    print("   - Compatible with all LangChain agent types")
    print("   - Supports async operations")
    print("   - Integrates with LangChain memory systems")

    # 7. Demonstrate multi-agent workflow potential
    context.register_agent_topics("DataAnalyst", ["research", "data"])
    context.register_agent_topics("ReportWriter", ["analysis", "writing"])

    handler.handle_tool_call(
        "push_context",
        key="workflow_status",
        value="Research analysis complete, ready for report writing",
        topics=["analysis", "writing"],
    )

    print("\n🔄 Multi-agent workflow:")
    print("   - ResearchAgent completed analysis")
    print("   - Context shared with DataAnalyst and ReportWriter")
    print("   - Next agent can pick up where this one left off")

    print("\n💡 Next steps for real integration:")
    print("1. Install: pip install langchain langchain-openai")
    print("2. Set environment variable: export OPENAI_API_KEY='your-key-here'")
    print("3. Replace simulate_langchain_agent() with real LangChain agent")
    print("4. Use langchain_tools in your agent initialization")
    print("5. Build complex multi-agent workflows with shared context")

    print("\n✅ LangChain integration example complete!")


if __name__ == "__main__":
    main()
