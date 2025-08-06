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


def create_research_agent(context_mesh: ContextMesh) -> Agent:
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
        """,
        markdown=True,
        show_tool_calls=True,
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

    # Create research agent
    research_agent = create_research_agent(context_mesh)

    # Have the agent do some research
    print("\n📚 Research Agent working...")
    response = research_agent.run(
        "Research the benefits of AI in healthcare and store your findings under the topic 'healthcare-ai'"
    )

    print(f"\n✅ Research completed!")
    print(f"Response: {response.content}")

    return context_mesh


def demonstrate_multi_agent_collaboration():
    """Demonstrate multiple Agno agents collaborating through Syntha."""

    print("\n🤝 Multi-Agent Collaboration Demo")
    print("=" * 50)

    # Create context mesh
    context_mesh = ContextMesh()

    # Create agents
    research_agent = create_research_agent(context_mesh)
    analysis_agent = create_analysis_agent(context_mesh)
    coordinator_agent = create_coordinator_agent(context_mesh)

    # Step 1: Research agent gathers information
    print("\n📚 Step 1: Research Agent gathering information...")
    research_response = research_agent.run(
        "Research current trends in renewable energy and store the findings under topic 'renewable-energy'"
    )
    print(f"Research: {research_response.content[:200]}...")

    # Step 2: Analysis agent processes the information
    print("\n🔍 Step 2: Analysis Agent processing information...")
    analysis_response = analysis_agent.run(
        "Analyze the renewable energy research data and identify the top 3 trends. Store your analysis under topic 'energy-analysis'"
    )
    print(f"Analysis: {analysis_response.content[:200]}...")

    # Step 3: Coordinator summarizes the workflow
    print("\n🎯 Step 3: Coordinator Agent summarizing...")
    coordinator_response = coordinator_agent.run(
        "Review the research and analysis work done on renewable energy and provide a workflow summary"
    )
    print(f"Summary: {coordinator_response.content[:200]}...")

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
