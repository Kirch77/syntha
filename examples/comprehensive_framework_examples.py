#!/usr/bin/env python3
"""
Comprehensive Framework Integration Examples

This example demonstrates real-world usage scenarios for Syntha with
all major AI frameworks: LangChain, LangGraph, Agno, and OpenAI.

Real-World Scenarios:
1. Customer Support System (LangChain)
2. Content Creation Workflow (LangGraph)
3. Research Team Collaboration (Agno)
4. Function Calling API (OpenAI)

Requirements:
- pip install langchain langgraph agno openai
- OPENAI_API_KEY environment variable set
"""

import json
import os
from typing import Any, Dict, List, Optional

# Framework imports with fallbacks
LANGCHAIN_AVAILABLE = False
LANGGRAPH_AVAILABLE = False
AGNO_AVAILABLE = False
OPENAI_AVAILABLE = False

try:
    from langchain.agents import AgentExecutor, create_openai_functions_agent
    from langchain.prompts import ChatPromptTemplate
    from langchain_openai import ChatOpenAI

    LANGCHAIN_AVAILABLE = True
except ImportError:
    print("⚠️ LangChain not available - skipping LangChain examples")

try:
    from langgraph.graph import END, StateGraph
    from langgraph.prebuilt import ToolExecutor

    LANGGRAPH_AVAILABLE = True
except ImportError:
    print("⚠️ LangGraph not available - skipping LangGraph examples")

try:
    from agno.agent import Agent
    from agno.models.openai import OpenAIChat
    from agno.team import Team

    AGNO_AVAILABLE = True
except ImportError:
    print("⚠️ Agno not available - skipping Agno examples")

try:
    import openai

    OPENAI_AVAILABLE = True
except ImportError:
    print("⚠️ OpenAI not available - skipping OpenAI examples")

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter


class CustomerSupportSystem:
    """Real-world customer support system using LangChain + Syntha."""

    def __init__(self):
        if not LANGCHAIN_AVAILABLE:
            raise ImportError("LangChain required for CustomerSupportSystem")

        self.context_mesh = ContextMesh()
        self.setup_knowledge_base()

    def setup_knowledge_base(self):
        """Setup customer support knowledge base."""
        # Simulate customer support knowledge
        support_data = {
            "billing_issues": {
                "common_solutions": [
                    "Check payment method on file",
                    "Verify billing address",
                    "Review recent transactions",
                ],
                "escalation_criteria": "Payment disputes over $100",
            },
            "technical_support": {
                "common_solutions": [
                    "Clear browser cache",
                    "Update to latest version",
                    "Check internet connection",
                ],
                "escalation_criteria": "System outages or data loss",
            },
            "account_management": {
                "common_solutions": [
                    "Password reset via email",
                    "Account verification process",
                    "Profile update instructions",
                ],
                "escalation_criteria": "Security concerns or data breaches",
            },
        }

        # Store knowledge in context mesh
        for category, data in support_data.items():
            self.context_mesh.push(
                f"support_{category}", data, topics=["customer_support", category]
            )

    def create_support_agent(self, agent_id: str, specialization: str) -> Any:
        """Create a specialized customer support agent."""

        # Create tool handler for this agent
        tool_handler = ToolHandler(
            self.context_mesh,
            agent_name=f"SupportAgent_{agent_id}",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

        # Get LangChain tools
        adapter = create_framework_adapter("langchain", tool_handler)
        syntha_tools = adapter.create_tools()

        # Create LangChain agent
        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    f"""You are a {specialization} customer support specialist.
            
            Use the available tools to:
            - Retrieve relevant support information
            - Log customer interactions
            - Access knowledge base solutions
            
            Always be helpful, professional, and thorough in your responses.
            If you need to escalate, clearly explain why.
            """,
                ),
                ("human", "{input}"),
                ("placeholder", "{agent_scratchpad}"),
            ]
        )

        agent = create_openai_functions_agent(llm, syntha_tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=syntha_tools, verbose=True)

        return agent_executor

    def handle_customer_request(self, request: str, category: str) -> str:
        """Handle a customer support request."""

        print(f"\n🎧 Customer Support: {category}")
        print("-" * 40)

        # Create specialized agent
        agent = self.create_support_agent("001", category)

        # Process the request
        response = agent.invoke({"input": f"Customer request ({category}): {request}"})

        return response["output"]


class ContentCreationWorkflow:
    """Real-world content creation workflow using LangGraph + Syntha."""

    def __init__(self):
        if not LANGGRAPH_AVAILABLE:
            raise ImportError("LangGraph required for ContentCreationWorkflow")

        self.context_mesh = ContextMesh()
        self.setup_content_templates()

    def setup_content_templates(self):
        """Setup content creation templates and guidelines."""

        templates = {
            "blog_post": {
                "structure": ["Introduction", "Main Points", "Conclusion", "CTA"],
                "word_count": "800-1200 words",
                "tone": "Professional yet engaging",
            },
            "social_media": {
                "structure": ["Hook", "Value", "CTA"],
                "word_count": "50-280 characters",
                "tone": "Casual and engaging",
            },
            "email_campaign": {
                "structure": ["Subject", "Greeting", "Body", "CTA", "Signature"],
                "word_count": "150-300 words",
                "tone": "Personal and persuasive",
            },
        }

        for content_type, template in templates.items():
            self.context_mesh.push(
                f"template_{content_type}",
                template,
                topics=["content_creation", content_type],
            )

    def create_content_workflow(self):
        """Create a LangGraph workflow for content creation."""

        # Define workflow state
        class ContentState:
            def __init__(self):
                self.topic = ""
                self.content_type = ""
                self.draft = ""
                self.review_notes = ""
                self.final_content = ""

        # Create tool handlers for different stages
        research_handler = ToolHandler(
            self.context_mesh,
            agent_name="ContentResearcher",
            allowed_tools=["get_context", "push_context"],
        )

        writer_handler = ToolHandler(
            self.context_mesh,
            agent_name="ContentWriter",
            allowed_tools=["get_context", "push_context"],
        )

        reviewer_handler = ToolHandler(
            self.context_mesh,
            agent_name="ContentReviewer",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

        # Get tools for each stage
        research_tools = create_framework_adapter(
            "langgraph", research_handler
        ).create_tools()
        writer_tools = create_framework_adapter(
            "langgraph", writer_handler
        ).create_tools()
        reviewer_tools = create_framework_adapter(
            "langgraph", reviewer_handler
        ).create_tools()

        # Define workflow nodes
        def research_node(state: ContentState):
            print("🔍 Research phase...")
            # Simulate research using Syntha tools
            return state

        def writing_node(state: ContentState):
            print("✍️ Writing phase...")
            # Simulate writing using Syntha tools
            return state

        def review_node(state: ContentState):
            print("📝 Review phase...")
            # Simulate review using Syntha tools
            return state

        # Build workflow graph
        workflow = StateGraph(ContentState)
        workflow.add_node("research", research_node)
        workflow.add_node("writing", writing_node)
        workflow.add_node("review", review_node)

        workflow.set_entry_point("research")
        workflow.add_edge("research", "writing")
        workflow.add_edge("writing", "review")
        workflow.add_edge("review", END)

        return workflow.compile()

    def create_content(self, topic: str, content_type: str) -> Dict[str, Any]:
        """Create content using the workflow."""

        print(f"\n📝 Content Creation: {content_type} about {topic}")
        print("-" * 50)

        # Initialize workflow
        workflow = self.create_content_workflow()

        # Create initial state
        initial_state = ContentState()
        initial_state.topic = topic
        initial_state.content_type = content_type

        # Run workflow
        result = workflow.invoke(initial_state)

        return {
            "topic": topic,
            "content_type": content_type,
            "status": "completed",
            "workflow_steps": ["research", "writing", "review"],
        }


class ResearchTeamCollaboration:
    """Real-world research team collaboration using Agno + Syntha."""

    def __init__(self):
        if not AGNO_AVAILABLE:
            raise ImportError("Agno required for ResearchTeamCollaboration")

        self.context_mesh = ContextMesh()
        self.setup_research_topics()

    def setup_research_topics(self):
        """Setup research topics and methodology."""

        research_areas = {
            "ai_ethics": {
                "key_questions": [
                    "Bias in AI systems",
                    "Transparency and explainability",
                    "Privacy and data protection",
                ],
                "methodologies": ["Literature review", "Case studies", "Surveys"],
            },
            "machine_learning": {
                "key_questions": [
                    "Model interpretability",
                    "Performance optimization",
                    "Robustness and generalization",
                ],
                "methodologies": [
                    "Experiments",
                    "Benchmarking",
                    "Theoretical analysis",
                ],
            },
            "human_ai_interaction": {
                "key_questions": [
                    "User experience design",
                    "Trust and acceptance",
                    "Collaborative workflows",
                ],
                "methodologies": [
                    "User studies",
                    "Prototyping",
                    "Ethnographic research",
                ],
            },
        }

        for area, data in research_areas.items():
            self.context_mesh.push(f"research_{area}", data, topics=["research", area])

    def create_research_team(self) -> List[Agent]:
        """Create a team of research agents."""

        # Lead Researcher
        lead_handler = ToolHandler(
            self.context_mesh,
            agent_name="LeadResearcher",
            allowed_tools=[
                "get_context",
                "push_context",
                "discover_topics",
                "list_context",
            ],
        )

        lead_tools = create_framework_adapter("agno", lead_handler).create_tools()

        lead_researcher = Agent(
            name="Lead Researcher",
            model=OpenAIChat(id="gpt-4o-mini"),
            tools=lead_tools,
            instructions="""
            You are a lead researcher coordinating a research team.
            
            Responsibilities:
            - Define research objectives and scope
            - Coordinate team activities
            - Review and synthesize findings
            - Ensure research quality and methodology
            """,
            markdown=True,
            show_tool_calls=True,
        )

        # Data Analyst
        analyst_handler = ToolHandler(
            self.context_mesh,
            agent_name="DataAnalyst",
            allowed_tools=["get_context", "push_context", "subscribe_to_topics"],
        )

        analyst_tools = create_framework_adapter("agno", analyst_handler).create_tools()

        data_analyst = Agent(
            name="Data Analyst",
            model=OpenAIChat(id="gpt-4o-mini"),
            tools=analyst_tools,
            instructions="""
            You are a data analyst supporting research projects.
            
            Responsibilities:
            - Collect and analyze research data
            - Create visualizations and reports
            - Identify patterns and trends
            - Validate statistical findings
            """,
            markdown=True,
            show_tool_calls=True,
        )

        # Literature Reviewer
        reviewer_handler = ToolHandler(
            self.context_mesh,
            agent_name="LiteratureReviewer",
            allowed_tools=["get_context", "push_context", "subscribe_to_topics"],
        )

        reviewer_tools = create_framework_adapter(
            "agno", reviewer_handler
        ).create_tools()

        literature_reviewer = Agent(
            name="Literature Reviewer",
            model=OpenAIChat(id="gpt-4o-mini"),
            tools=reviewer_tools,
            instructions="""
            You are a literature reviewer for research projects.
            
            Responsibilities:
            - Conduct systematic literature reviews
            - Identify relevant papers and sources
            - Summarize key findings and gaps
            - Track research trends and developments
            """,
            markdown=True,
            show_tool_calls=True,
        )

        return [lead_researcher, data_analyst, literature_reviewer]

    def conduct_research_project(self, research_topic: str) -> Dict[str, Any]:
        """Conduct a collaborative research project."""

        print(f"\n🔬 Research Project: {research_topic}")
        print("-" * 50)

        # Create research team
        team = self.create_research_team()
        lead_researcher, data_analyst, literature_reviewer = team

        # Phase 1: Project Planning
        print("\n📋 Phase 1: Project Planning")
        planning_response = lead_researcher.run(
            f"Plan a research project on '{research_topic}'. Define objectives, methodology, and timeline."
        )

        # Phase 2: Literature Review
        print("\n📚 Phase 2: Literature Review")
        literature_response = literature_reviewer.run(
            f"Conduct a literature review for the research project on '{research_topic}'. Store findings for the team."
        )

        # Phase 3: Data Analysis
        print("\n📊 Phase 3: Data Analysis")
        analysis_response = data_analyst.run(
            f"Analyze available data for the '{research_topic}' project. Create summary of key insights."
        )

        # Phase 4: Synthesis and Reporting
        print("\n📝 Phase 4: Synthesis and Reporting")
        synthesis_response = lead_researcher.run(
            f"Synthesize the literature review and data analysis for '{research_topic}'. Create final research summary."
        )

        return {
            "project": research_topic,
            "phases_completed": [
                "planning",
                "literature_review",
                "data_analysis",
                "synthesis",
            ],
            "team_members": [agent.name for agent in team],
            "status": "completed",
        }


class FunctionCallingAPI:
    """Real-world function calling API using OpenAI + Syntha."""

    def __init__(self):
        if not OPENAI_AVAILABLE:
            raise ImportError("OpenAI required for FunctionCallingAPI")

        self.context_mesh = ContextMesh()
        self.client = openai.OpenAI()
        self.setup_api_context()

    def setup_api_context(self):
        """Setup API context and configurations."""

        api_configs = {
            "rate_limits": {"requests_per_minute": 60, "tokens_per_minute": 40000},
            "supported_models": ["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"],
            "function_categories": [
                "data_retrieval",
                "data_storage",
                "analytics",
                "notifications",
            ],
        }

        self.context_mesh.push(
            "api_config", api_configs, topics=["api", "configuration"]
        )

    def create_api_handler(self, api_key: str, user_id: str) -> ToolHandler:
        """Create an API handler for a specific user."""

        return ToolHandler(
            self.context_mesh,
            agent_name=f"APIUser_{user_id}",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

    def process_function_call(self, user_id: str, query: str) -> Dict[str, Any]:
        """Process a function call request using OpenAI + Syntha."""

        print(f"\n🔌 API Call from User: {user_id}")
        print("-" * 40)

        # Create handler for this user
        handler = self.create_api_handler("dummy_key", user_id)

        # Get OpenAI-compatible tools
        adapter = create_framework_adapter("openai", handler)
        syntha_tools = adapter.create_tools()

        # Convert tools to OpenAI format
        openai_tools = []
        for tool in syntha_tools:
            openai_tools.append({"type": "function", "function": tool})

        # Make OpenAI API call
        messages = [
            {
                "role": "system",
                "content": "You are an API assistant that helps users manage their data and context. Use the available functions to help them.",
            },
            {"role": "user", "content": query},
        ]

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                tools=openai_tools,
                tool_choice="auto",
            )

            # Process tool calls if any
            if response.choices[0].message.tool_calls:
                print("🛠️ Processing tool calls...")
                for tool_call in response.choices[0].message.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)

                    # Execute the function using handler
                    if hasattr(handler, f"handle_{function_name}"):
                        result = getattr(handler, f"handle_{function_name}")(
                            **function_args
                        )
                        print(f"   {function_name}: {result}")

            return {
                "user_id": user_id,
                "query": query,
                "response": response.choices[0].message.content,
                "tool_calls_made": len(response.choices[0].message.tool_calls or []),
                "status": "success",
            }

        except Exception as e:
            return {
                "user_id": user_id,
                "query": query,
                "error": str(e),
                "status": "error",
            }


def demonstrate_customer_support():
    """Demonstrate customer support system."""

    if not LANGCHAIN_AVAILABLE:
        print("⚠️ Skipping customer support demo - LangChain not available")
        return

    print("\n" + "=" * 60)
    print("🎧 CUSTOMER SUPPORT SYSTEM (LangChain + Syntha)")
    print("=" * 60)

    support_system = CustomerSupportSystem()

    # Handle different types of customer requests
    requests = [
        ("I can't access my account after the password reset", "account_management"),
        ("My credit card was charged twice this month", "billing_issues"),
        ("The app keeps crashing when I try to upload files", "technical_support"),
    ]

    for request, category in requests:
        response = support_system.handle_customer_request(request, category)
        print(f"\n✅ Response: {response[:200]}...")


def demonstrate_content_creation():
    """Demonstrate content creation workflow."""

    if not LANGGRAPH_AVAILABLE:
        print("⚠️ Skipping content creation demo - LangGraph not available")
        return

    print("\n" + "=" * 60)
    print("📝 CONTENT CREATION WORKFLOW (LangGraph + Syntha)")
    print("=" * 60)

    content_system = ContentCreationWorkflow()

    # Create different types of content
    content_requests = [
        ("AI in Healthcare", "blog_post"),
        ("New Product Launch", "social_media"),
        ("Monthly Newsletter", "email_campaign"),
    ]

    for topic, content_type in content_requests:
        result = content_system.create_content(topic, content_type)
        print(f"\n✅ Created {content_type} about {topic}")
        print(f"   Workflow: {' → '.join(result['workflow_steps'])}")


def demonstrate_research_collaboration():
    """Demonstrate research team collaboration."""

    if not AGNO_AVAILABLE:
        print("⚠️ Skipping research collaboration demo - Agno not available")
        return

    print("\n" + "=" * 60)
    print("🔬 RESEARCH TEAM COLLABORATION (Agno + Syntha)")
    print("=" * 60)

    research_system = ResearchTeamCollaboration()

    # Conduct research projects
    research_topics = [
        "Ethical Implications of Large Language Models",
        "Human-AI Collaboration in Creative Tasks",
    ]

    for topic in research_topics:
        result = research_system.conduct_research_project(topic)
        print(f"\n✅ Completed research on: {topic}")
        print(f"   Team: {', '.join(result['team_members'])}")
        print(f"   Phases: {' → '.join(result['phases_completed'])}")


def demonstrate_function_calling_api():
    """Demonstrate function calling API."""

    if not OPENAI_AVAILABLE:
        print("⚠️ Skipping function calling demo - OpenAI not available")
        return

    print("\n" + "=" * 60)
    print("🔌 FUNCTION CALLING API (OpenAI + Syntha)")
    print("=" * 60)

    api_system = FunctionCallingAPI()

    # Process API requests
    api_requests = [
        ("user_123", "Store my project preferences: theme=dark, language=python"),
        ("user_456", "Retrieve my recent activity data"),
        ("user_789", "List all available data categories"),
    ]

    for user_id, query in api_requests:
        result = api_system.process_function_call(user_id, query)
        print(f"\n✅ API Response for {user_id}:")
        print(f"   Status: {result['status']}")
        if result["status"] == "success":
            print(f"   Tool calls: {result['tool_calls_made']}")
        else:
            print(f"   Error: {result.get('error', 'Unknown error')}")


def main():
    """Run all comprehensive framework examples."""

    # Check for OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Please set OPENAI_API_KEY environment variable")
        print("   export OPENAI_API_KEY=your_api_key_here")
        return

    print("🎉 COMPREHENSIVE FRAMEWORK INTEGRATION EXAMPLES")
    print("=" * 80)
    print("This demo showcases real-world usage scenarios for Syntha")
    print("integrated with LangChain, LangGraph, Agno, and OpenAI.")
    print()

    try:
        # Run all demonstrations
        demonstrate_customer_support()
        demonstrate_content_creation()
        demonstrate_research_collaboration()
        demonstrate_function_calling_api()

        print("\n\n🎊 ALL COMPREHENSIVE DEMOS COMPLETED!")
        print("\nReal-world scenarios demonstrated:")
        print("✅ Customer Support System (LangChain)")
        print("✅ Content Creation Workflow (LangGraph)")
        print("✅ Research Team Collaboration (Agno)")
        print("✅ Function Calling API (OpenAI)")
        print("\nKey benefits:")
        print("• Seamless integration across all major frameworks")
        print("• Shared context and state management")
        print("• Role-based access control")
        print("• Scalable multi-agent architectures")
        print("• Production-ready error handling")

    except Exception as e:
        print(f"\n❌ Demo failed: {e}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    main()
