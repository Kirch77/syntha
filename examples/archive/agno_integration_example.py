#!/usr/bin/env python3
"""
Syntha + Agno Integration Example

This example demonstrates how to integrate Syntha's context management tools
with the Agno framework for building AI agents.

Key Features Demonstrated:
- Creating Agno agents with Syntha tools
- Multi-agent collaboration using shared context
- Topic-based routing with Agno agents
- Error handling and tool access control

Requirements:
- pip install agno
- OPENAI_API_KEY environment variable set
"""

import os

# Check if Agno is available
try:
    from agno.agent import Agent
    from agno.models.openai import OpenAIChat
    from agno.team import Team
except ImportError:
    print("❌ Agno not installed. Please install with: pip install agno")
    exit(1)

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter


def create_research_agent(context_mesh: ContextMesh, debug=False) -> Agent:
    """Create a research agent that can store and retrieve information."""

    # Create tool handler for this agent
    tool_handler = ToolHandler(
        context_mesh,
        agent_name="ResearchAgent",
        allowed_tools=["get_context", "push_context", "subscribe_to_topics"],
    )

    # Create Agno adapter and get Syntha tools
    adapter = create_framework_adapter("agno", tool_handler)
    syntha_tools = adapter.create_tools()

    if debug:
        print(f"🔧 ResearchAgent created with {len(syntha_tools)} Syntha tools:")
        for tool in syntha_tools:
            print(f"   • {tool.name}: {tool.description}")

    # Create Agno agent with Syntha tools
    agent = Agent(
        name="Research Agent",
        model=OpenAIChat(id="gpt-4o-mini"),
        tools=syntha_tools,
        instructions="""
        You are a research agent that helps gather and organize information.
        
        Use the available tools to:
        - Store research findings using push_context
        - Retrieve previous research using get_context  
        - Subscribe to research topics to stay updated
        
        Always organize information by topic and provide clear summaries.
        IMPORTANT: Always check existing context first using get_context before adding new information.
        """,
        markdown=True,
        show_tool_calls=True,
        debug_mode=debug,
    )

    return agent


def create_analysis_agent(context_mesh: ContextMesh) -> Agent:
    """Create an analysis agent that processes stored information."""

    # Create tool handler for this agent
    tool_handler = ToolHandler(
        context_mesh,
        agent_name="AnalysisAgent",
        allowed_tools=[
            "get_context",
            "push_context",
            "list_context",
            "discover_topics",
        ],
    )

    # Create Agno adapter and get Syntha tools
    adapter = create_framework_adapter("agno", tool_handler)
    syntha_tools = adapter.create_tools()

    # Create Agno agent with Syntha tools
    agent = Agent(
        name="Analysis Agent",
        model=OpenAIChat(id="gpt-4o-mini"),
        tools=syntha_tools,
        instructions="""
        You are an analysis agent that processes and synthesizes information.
        
        Use the available tools to:
        - Retrieve research data using get_context
        - Analyze patterns and trends
        - Share insights using push_context
        - Discover what topics are available
        
        Provide detailed analysis with supporting evidence.
        """,
        markdown=True,
        show_tool_calls=True,
    )

    return agent


def create_coordinator_agent(context_mesh: ContextMesh) -> Agent:
    """Create a coordinator agent that manages the workflow."""

    # Create tool handler with full access
    tool_handler = ToolHandler(context_mesh, agent_name="CoordinatorAgent")

    # Create Agno adapter and get Syntha tools
    adapter = create_framework_adapter("agno", tool_handler)
    syntha_tools = adapter.create_tools()

    # Create Agno agent with Syntha tools
    agent = Agent(
        name="Coordinator Agent",
        model=OpenAIChat(id="gpt-4o-mini"),
        tools=syntha_tools,
        instructions="""
        You are a coordinator agent that manages multi-agent workflows.
        
        Use the available tools to:
        - Coordinate between research and analysis agents
        - Monitor topic activity using discover_topics
        - Manage context flow between agents
        - Provide workflow summaries
        
        Keep track of the overall progress and ensure smooth collaboration.
        """,
        markdown=True,
        show_tool_calls=True,
    )

    return agent


def demonstrate_single_agent():
    """Demonstrate a single Agno agent using Syntha tools."""

    print("🔬 Single Agent Demo")
    print("=" * 50)

    # Create context mesh
    context_mesh = ContextMesh()

    # Pre-populate with some initial data
    print("\n📊 Setting up initial context data...")
    context_mesh.push(
        "healthcare_stats",
        {
            "market_size": "$15.1 billion by 2030",
            "growth_rate": "37.5% CAGR",
            "key_areas": ["diagnostics", "drug_discovery", "patient_monitoring"],
        },
        topics=["healthcare-ai"],
        ttl_hours=24,
    )

    context_mesh.push(
        "ai_research_2024",
        {
            "breakthrough": "GPT-4 medical applications",
            "accuracy": "95% in radiology diagnosis",
            "adoption": "60% of hospitals exploring AI",
        },
        topics=["healthcare-ai"],
        ttl_hours=24,
    )

    print("✅ Initial context populated")

    # Show what's in context before agent starts
    print("\n🔍 Current context state:")
    stats = context_mesh.get_stats()
    print(f"   • Total items: {stats['total_items']}")
    all_context = context_mesh.get_context()
    for key, value in all_context.items():
        print(f"   • {key}: {str(value)[:100]}...")

    # Create research agent
    research_agent = create_research_agent(context_mesh, debug=True)

    # Have the agent do some research
    print("\n📚 Research Agent working...")
    print("🔧 Agent will see this context and tools:")

    response = research_agent.run(
        "First, check what healthcare AI information is already available in the context. Then research additional benefits of AI in healthcare and store your findings under the topic 'healthcare-ai'"
    )

    print(f"\n✅ Research completed!")
    print(f"Response: {response.content}")

    # Show updated context after agent work
    print("\n📈 Context after agent work:")
    updated_stats = context_mesh.get_stats()
    print(f"   • Total items: {updated_stats['total_items']}")
    updated_context = context_mesh.get_context()
    for key, value in updated_context.items():
        if key not in all_context:  # Show new items
            print(f"   • NEW: {key}: {str(value)[:100]}...")

    return context_mesh


def demonstrate_multi_agent_collaboration():
    """Demonstrate multiple Agno agents collaborating through Syntha."""

    print("\n🤝 Multi-Agent Collaboration Demo")
    print("=" * 50)

    # Create context mesh
    context_mesh = ContextMesh()

    # Pre-populate with initial renewable energy data
    print("\n📊 Setting up initial renewable energy context...")
    context_mesh.push(
        "solar_trends_2024",
        {
            "efficiency": "22.8% average for commercial panels",
            "cost_reduction": "85% decrease since 2010",
            "capacity": "1.2 TW global installed capacity",
            "growth": "25% year-over-year growth",
        },
        topics=["renewable-energy"],
        ttl_hours=48,
    )

    context_mesh.push(
        "wind_energy_stats",
        {
            "offshore_growth": "30% increase in offshore installations",
            "turbine_size": "Average 3.0 MW capacity per turbine",
            "capacity_factor": "35-45% average capacity factor",
            "investment": "$380 billion global investment in 2024",
        },
        topics=["renewable-energy"],
        ttl_hours=48,
    )

    context_mesh.push(
        "battery_storage",
        {
            "technology": "Lithium-ion dominates with 90% market share",
            "cost_decline": "70% cost reduction since 2020",
            "grid_scale": "15 GW of grid-scale storage deployed",
            "duration": "4-hour duration standard for grid storage",
        },
        topics=["energy-storage"],
        ttl_hours=48,
    )

    print("✅ Initial renewable energy context populated")

    # Show initial context state
    print("\n🔍 Initial context available to agents:")
    stats = context_mesh.get_stats()
    print(f"   • Total items: {stats['total_items']}")
    all_topics = context_mesh.get_all_topics()
    print(f"   • Active topics: {', '.join(all_topics)}")

    initial_context = context_mesh.get_context()
    for key, value in initial_context.items():
        print(f"   • {key}: {str(value)[:80]}...")

    # Create agents
    research_agent = create_research_agent(context_mesh)
    analysis_agent = create_analysis_agent(context_mesh)
    coordinator_agent = create_coordinator_agent(context_mesh)

    # Step 1: Research agent gathers information
    print("\n📚 Step 1: Research Agent gathering information...")
    print(
        "🔧 Agent prompt: Analyze existing renewable energy data and add new research"
    )
    research_response = research_agent.run(
        "Review the existing renewable energy data in context. Then research and add information about emerging trends like green hydrogen and floating solar. Store under topic 'renewable-energy'"
    )
    print(f"Research: {research_response.content[:300]}...")

    # Step 2: Analysis agent processes the information
    print("\n🔍 Step 2: Analysis Agent processing information...")
    print("🔧 Agent prompt: Analyze all renewable energy data and identify top trends")
    analysis_response = analysis_agent.run(
        "Analyze ALL renewable energy research data available in context. Identify the top 3 most significant trends and their market impact. Store your analysis under topic 'energy-analysis'"
    )
    print(f"Analysis: {analysis_response.content[:300]}...")

    # Step 3: Coordinator summarizes the workflow
    print("\n🎯 Step 3: Coordinator Agent summarizing...")
    print("🔧 Agent prompt: Create comprehensive workflow summary")
    coordinator_response = coordinator_agent.run(
        "Review ALL research and analysis work on renewable energy. Create a comprehensive workflow summary showing what each agent contributed and the key insights discovered."
    )
    print(f"Summary: {coordinator_response.content[:300]}...")

    # Show final context state
    print("\n📈 Final context state after all agent work:")
    final_stats = context_mesh.get_stats()
    print(f"   • Total items: {final_stats['total_items']}")
    final_context = context_mesh.get_context()
    for key, value in final_context.items():
        if key not in initial_context:  # Show new items
            print(f"   • NEW: {key}: {str(value)[:80]}...")

    return context_mesh


def demonstrate_topic_based_routing():
    """Demonstrate topic-based routing with Agno agents."""

    print("\n📡 Topic-Based Routing Demo")
    print("=" * 50)

    # Create context mesh
    context_mesh = ContextMesh()

    # Create specialized agents
    research_agent = create_research_agent(context_mesh)
    analysis_agent = create_analysis_agent(context_mesh)

    # Set up topic subscriptions
    print("\n🔔 Setting up topic subscriptions...")

    # Research agent subscribes to research topics
    research_agent.run("Subscribe to topics: research, data-collection, studies")

    # Analysis agent subscribes to analysis topics
    analysis_agent.run("Subscribe to topics: analysis, insights, trends")

    # Demonstrate topic-based communication
    print("\n📤 Broadcasting research update...")
    research_agent.run(
        "I've completed a study on machine learning applications. Share this update with the research topic subscribers."
    )

    print("\n📤 Broadcasting analysis update...")
    analysis_agent.run(
        "I've identified key trends in the ML applications data. Share this insight with analysis topic subscribers."
    )

    # Check topic activity
    print("\n📊 Checking topic activity...")
    coordinator_agent = create_coordinator_agent(context_mesh)
    coordinator_agent.run("Discover what topics are active and show subscriber counts")

    return context_mesh


def demonstrate_error_handling():
    """Demonstrate error handling and tool access control."""

    print("\n🛡️ Error Handling & Access Control Demo")
    print("=" * 50)

    # Create context mesh
    context_mesh = ContextMesh()

    # Create agent with restricted access
    restricted_handler = ToolHandler(
        context_mesh,
        agent_name="RestrictedAgent",
        allowed_tools=["get_context", "list_context"],  # No push_context access
    )

    adapter = create_framework_adapter("agno", restricted_handler)
    syntha_tools = adapter.create_tools()

    restricted_agent = Agent(
        name="Restricted Agent",
        model=OpenAIChat(id="gpt-4o-mini"),
        tools=syntha_tools,
        instructions="You can only read context, not modify it.",
        markdown=True,
        show_tool_calls=True,
    )

    # Try to use allowed tools
    print("\n✅ Testing allowed operations...")
    response1 = restricted_agent.run("List all available context keys")
    print(f"Allowed operation result: {response1.content[:100]}...")

    # This should work but show the agent can't push
    print("\n⚠️ Testing restricted operations...")
    response2 = restricted_agent.run("Try to store some information about AI safety")
    print(f"Restricted operation result: {response2.content[:200]}...")


def main():
    """Run all demonstration examples."""

    # Check for OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Please set OPENAI_API_KEY environment variable")
        print("   export OPENAI_API_KEY=your_api_key_here")
        return

    print("🎉 Syntha + Agno Integration Examples")
    print("=" * 60)
    print("This demo shows how Syntha's context management integrates")
    print("seamlessly with Agno's AI agent framework.")
    print()

    try:
        # Run demonstrations
        demonstrate_single_agent()
        demonstrate_multi_agent_collaboration()
        demonstrate_topic_based_routing()
        demonstrate_error_handling()

        print("\n\n🎊 All demos completed successfully!")
        print("\nKey benefits demonstrated:")
        print("✅ Easy integration of Syntha tools with Agno agents")
        print("✅ Multi-agent collaboration through shared context")
        print("✅ Topic-based routing for organized communication")
        print("✅ Tool access control for security")
        print("✅ Automatic error handling and recovery")

    except Exception as e:
        print(f"\n❌ Demo failed: {e}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    main()
