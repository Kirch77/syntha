# Framework Integration Guide: Connect Syntha to Your Existing Tools

This guide shows you how to seamlessly integrate Syntha with your existing frameworks and tools. You'll learn practical patterns that work immediately in production environments.

## Quick Start: Add Context to Any Agent in 3 Steps

Want to add powerful context management to an existing agent? Here's how:

```python
from syntha import ContextMesh, ToolHandler

# Step 1: Create context for your user/workspace
context = ContextMesh(user_id="your_user_id", enable_persistence=True)

# Step 2: Create a tool handler for your agent
handler = ToolHandler(context, agent_name="YourAgent")

# Step 3: Get tools for your framework - just one line!
langchain_tools = handler.get_langchain_tools()      # LangChain
openai_functions = handler.get_openai_functions()    # OpenAI
anthropic_tools = handler.get_anthropic_tools()      # Anthropic Claude
agno_tools = handler.get_tools_for_framework("agno") # Agno
generic_tools = handler.get_schemas()                # Any framework

# That's it! Your agent now has context management superpowers
```

## Framework Adapters Overview

Syntha provides dedicated adapters for popular AI frameworks:

| Framework | Method | Output Format | Use Case |
|-----------|--------|---------------|----------|
| **LangChain** | `get_langchain_tools()` | `List[BaseTool]` | Agent workflows, chains |
| **LangGraph** | `get_langgraph_tools()` | `List[Dict]` | Multi-agent graphs |
| **OpenAI** | `get_openai_functions()` | `List[Dict]` | Function calling API |
| **Anthropic** | `get_anthropic_tools()` | `List[Dict]` | Claude tool use |
| **Agno** | `get_tools_for_framework("agno")` | `List[Dict]` | Agno agent framework |
| **Universal** | `get_schemas()` | `List[Dict]` | Any framework |

## Framework-Specific Integrations

### LangChain Integration: Complete Workflow

LangChain is perfect for building complex agent workflows. Here's how to add Syntha's context management:

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from syntha import ContextMesh, ToolHandler
import json

# Step 1: Your existing LangChain tools (unchanged)
@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email to someone."""
    return f"Email sent to {to} with subject '{subject}'"

@tool  
def search_web(query: str) -> str:
    """Search the web for information."""
    return f"Search results for: {query}"

# Step 2: Create Syntha context management
context = ContextMesh(user_id="langchain_user", enable_persistence=True)
syntha_handler = ToolHandler(context, agent_name="LangChainAgent")

# Step 3: Get tools in LangChain format - automatic conversion!
existing_tools = [send_email, search_web]
syntha_tools = syntha_handler.get_langchain_tools()  # Native LangChain BaseTool instances
all_tools = existing_tools + syntha_tools

print(f"LangChain Tools: {len(existing_tools)}")
print(f"Syntha Tools: {len(syntha_tools)}")
print(f"Combined Tools: {len(all_tools)}")

# Step 4: Create LangChain agent with context awareness
llm = ChatOpenAI(model="gpt-4", temperature=0)

# Enhanced prompt that leverages context
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful assistant with access to context management tools.
    
    IMPORTANT: Before answering questions, use list_context to see what information is available,
    then use get_context to retrieve relevant information. This makes your responses much more helpful.
    
    When you learn new information, use push_context to save it for future conversations.
    Use subscribe_to_topics to organize information by topics like 'emails', 'research', 'tasks'.
    """),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

# Create the agent
agent = create_openai_functions_agent(llm, all_tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=all_tools, verbose=True)

# Step 5: Use the context-aware agent
def run_langchain_example():
    print("\n=== LangChain + Syntha Integration ===")
    
    # Agent subscribes to topics
    result1 = agent_executor.invoke({
        "input": "Subscribe to topics 'emails' and 'research' so I can organize information."
    })
    print(f"Subscribe result: {result1['output']}")
    
    # Agent saves information with context
    result2 = agent_executor.invoke({
        "input": "I'm working on a project about AI in healthcare. Save this information and send an email to alice@company.com about our research progress."
    })
    print(f"Research + Email result: {result2['output']}")
    
    # Agent retrieves and uses context
    result3 = agent_executor.invoke({
        "input": "What information do I have about my current projects? Use the context tools to check."
    })
    print(f"Context retrieval result: {result3['output']}")

# Run the example
run_langchain_example()
context.close()
```

**Key Benefits:**
- **Native Integration**: `get_langchain_tools()` returns actual LangChain `BaseTool` instances
- **Automatic Schemas**: Pydantic schemas generated automatically for type safety
- **Context-Aware Prompting**: Agents know how to use context tools effectively
- **Persistent Memory**: Information persists across conversations

### OpenAI Function Calling Integration

OpenAI's function calling is perfect for structured interactions. Here's seamless integration:

```python
from openai import OpenAI
from syntha import ContextMesh, ToolHandler
import json

# Step 1: Create Syntha context
context = ContextMesh(user_id="openai_user", enable_persistence=True)
handler = ToolHandler(context, agent_name="OpenAIAgent")

# Step 2: Get OpenAI function definitions - automatic conversion!
openai_functions = handler.get_openai_functions()

print(f"OpenAI Functions: {len(openai_functions)}")
print(f"Available functions: {[f['function']['name'] for f in openai_functions]}")

# Step 3: Use with OpenAI API
client = OpenAI()  # Uses OPENAI_API_KEY from environment

def run_openai_example():
    print("\n=== OpenAI + Syntha Integration ===")
    
    # Create a conversation with function calling
    messages = [
        {"role": "system", "content": "You are a helpful assistant with access to context management. Always check for existing context before answering questions."},
        {"role": "user", "content": "I'm working on a machine learning project about image classification. Save this information and then tell me what context you have available."}
    ]
    
    # Call OpenAI with function definitions
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        functions=[func["function"] for func in openai_functions],
        function_call="auto"
    )
    
    message = response.choices[0].message
    
    # Handle function calls
    if message.function_call:
        function_name = message.function_call.name
        function_args = json.loads(message.function_call.arguments)
        
        print(f"OpenAI wants to call: {function_name}")
        print(f"With arguments: {function_args}")
        
        # Execute the function through Syntha
        result = handler.handle_tool_call(function_name, **function_args)
        print(f"Function result: {result}")
        
        # Continue conversation with function result
        messages.append({
            "role": "assistant", 
            "content": None,
            "function_call": message.function_call
        })
        messages.append({
            "role": "function",
            "name": function_name,
            "content": json.dumps(result)
        })
        
        # Get final response
        final_response = client.chat.completions.create(
            model="gpt-4",
            messages=messages
        )
        
        print(f"Final response: {final_response.choices[0].message.content}")
    else:
        print(f"Direct response: {message.content}")

# Run the example
run_openai_example()
context.close()
```

**Key Benefits:**
- **Perfect Function Schemas**: OpenAI-compatible function definitions with proper types
- **Seamless Integration**: Drop-in replacement for manual function definitions
- **Type Safety**: Automatic parameter validation and conversion
- **Context Persistence**: Functions automatically manage persistent context

### Anthropic Claude Integration

Anthropic Claude's tool use is powerful and flexible. Here's how to integrate:

```python
from anthropic import Anthropic
from syntha import ContextMesh, ToolHandler
import json

# Step 1: Create Syntha context
context = ContextMesh(user_id="anthropic_user", enable_persistence=True)
handler = ToolHandler(context, agent_name="ClaudeAgent")

# Step 2: Get Anthropic tool definitions - automatic conversion!
anthropic_tools = handler.get_anthropic_tools()

print(f"Anthropic Tools: {len(anthropic_tools)}")
print(f"Available tools: {[tool['name'] for tool in anthropic_tools]}")

# Step 3: Use with Anthropic API
client = Anthropic()  # Uses ANTHROPIC_API_KEY from environment

def run_anthropic_example():
    print("\n=== Anthropic Claude + Syntha Integration ===")
    
    # Create a conversation with tool use
    response = client.messages.create(
        model="claude-3-sonnet-20240229",
        max_tokens=1024,
        tools=anthropic_tools,
        messages=[
            {
                "role": "user", 
                "content": "I'm researching renewable energy trends. Save this topic and then check what context information you have access to."
            }
        ]
    )
    
    print(f"Claude response type: {response.content[0].type}")
    
    # Handle tool use
    if response.content[0].type == "tool_use":
        tool_use = response.content[0]
        tool_name = tool_use.name
        tool_input = tool_use.input
        
        print(f"Claude wants to use tool: {tool_name}")
        print(f"With input: {tool_input}")
        
        # Execute the tool through Syntha
        result = handler.handle_tool_call(tool_name, **tool_input)
        print(f"Tool result: {result}")
        
        # Continue conversation with tool result
        follow_up = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1024,
            messages=[
                {
                    "role": "user", 
                    "content": "I'm researching renewable energy trends. Save this topic and then check what context information you have access to."
                },
                {
                    "role": "assistant",
                    "content": response.content
                },
                {
                    "role": "user",
                    "content": f"Tool result: {json.dumps(result)}"
                }
            ]
        )
        
        print(f"Claude follow-up: {follow_up.content[0].text}")
    else:
        print(f"Direct response: {response.content[0].text}")

# Run the example
run_anthropic_example()
context.close()
```

**Key Benefits:**
- **Native Tool Definitions**: Claude-compatible tool schemas with proper input validation
- **Flexible Integration**: Works with Claude's advanced reasoning capabilities
- **Context-Aware Responses**: Claude can leverage persistent context for better answers
- **Tool Chaining**: Multiple tool calls in conversation flow

### Agno Integration: Flexible Agent Framework

Agno provides a flexible agent framework. Here's seamless Syntha integration:

```python
from syntha import ContextMesh, ToolHandler
import asyncio

# Note: Agno integration example - adjust based on actual Agno API
class AgnoAgent:
    """Simple Agno-style agent for demonstration."""
    
    def __init__(self, name: str, context_mesh: ContextMesh):
        self.name = name
        self.syntha_handler = ToolHandler(context_mesh, agent_name=name)
        
        # Get Agno-compatible tools
        self.agno_tools = self.syntha_handler.get_tools_for_framework("agno")
        print(f"Agent {name} has {len(self.agno_tools)} Syntha tools available")
    
    async def execute_tool(self, tool_name: str, **kwargs):
        """Execute a tool through Syntha."""
        return self.syntha_handler.handle_tool_call(tool_name, **kwargs)
    
    async def think_and_act(self, task: str):
        """Agent reasoning with context awareness."""
        print(f"\n{self.name} thinking about: {task}")
        
        # Check available context first
        context_list = await self.execute_tool("list_context")
        print(f"Available context: {context_list.get('keys', [])}")
        
        # Get relevant context if available
        if context_list.get('keys'):
            context_data = await self.execute_tool("get_context", 
                                                 keys=context_list['keys'])
            print(f"Retrieved context: {list(context_data.get('context', {}).keys())}")
        
        # Perform task and save results
        result = f"Completed task: {task}"
        await self.execute_tool("push_context", 
                               key=f"task_{self.name.lower()}", 
                               value=result,
                               topics=["tasks", "results"])
        
        return result

# Step 1: Create Syntha context for Agno workflow
context = ContextMesh(user_id="agno_user", enable_persistence=True)

# Step 2: Create Agno agents with Syntha integration
async def run_agno_example():
    print("\n=== Agno + Syntha Integration ===")
    
    # Create specialized agents
    researcher = AgnoAgent("Researcher", context)
    analyst = AgnoAgent("Analyst", context)
    reporter = AgnoAgent("Reporter", context)
    
    # Set up topic subscriptions
    await researcher.execute_tool("subscribe_to_topics", topics=["research", "data"])
    await analyst.execute_tool("subscribe_to_topics", topics=["research", "analysis"])
    await reporter.execute_tool("subscribe_to_topics", topics=["analysis", "reports"])
    
    # Coordinated workflow with shared context
    print("\n🔍 Phase 1: Research")
    research_result = await researcher.think_and_act("Research market trends in renewable energy")
    
    print("\n📊 Phase 2: Analysis")  
    analysis_result = await analyst.think_and_act("Analyze the research findings for key insights")
    
    print("\n📋 Phase 3: Reporting")
    report_result = await reporter.think_and_act("Create executive summary from analysis")
    
    # Show final shared context
    final_context = await reporter.execute_tool("list_context")
    print(f"\n💾 Final Context Keys: {final_context.get('keys', [])}")

# Run the example
asyncio.run(run_agno_example())
context.close()
```

**Key Benefits:**
- **Universal Compatibility**: `get_tools_for_framework("agno")` provides flexible tool definitions
- **Async Support**: Works with Agno's asynchronous architecture
- **Shared Context**: Multiple agents share context seamlessly
- **Topic-Based Organization**: Agents subscribe to relevant information streams

### LangGraph Integration: Multi-Agent Workflows

LangGraph excels at complex multi-agent workflows. Here's how to add shared context:

```python
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolExecutor
from langchain_openai import ChatOpenAI
from langchain.tools import tool
from syntha import ContextMesh, ToolHandler
from typing import TypedDict, List
import json

# Step 1: Define workflow state
class WorkflowState(TypedDict):
    messages: List[str]
    current_task: str
    context_updates: List[dict]

# Step 2: Your existing LangGraph tools
@tool
def analyze_data(data: str) -> str:
    """Analyze data and return insights."""
    return f"Analysis of {data}: Key insights found"

@tool
def generate_report(insights: str) -> str:  
    """Generate a report from insights."""
    return f"Report generated based on: {insights}"

# Step 3: Set up Syntha for multi-agent context sharing
context = ContextMesh(user_id="langgraph_workflow", enable_persistence=True)

# Create handlers for different agents in the workflow
researcher_handler = ToolHandler(context, agent_name="ResearcherAgent")
analyst_handler = ToolHandler(context, agent_name="AnalystAgent") 
reporter_handler = ToolHandler(context, agent_name="ReporterAgent")

# Get LangGraph-compatible tools
researcher_tools = researcher_handler.get_langgraph_tools()
analyst_tools = analyst_handler.get_langgraph_tools()
reporter_tools = reporter_handler.get_langgraph_tools()

print(f"Researcher tools: {len(researcher_tools)}")
print(f"Analyst tools: {len(analyst_tools)}")
print(f"Reporter tools: {len(reporter_tools)}")

# Step 4: Create workflow nodes with context integration
def researcher_node(state: WorkflowState):
    """Research agent that gathers and shares information."""
    print("🔍 Researcher Node")
    
    # Subscribe to research topics
    researcher_handler.handle_tool_call("subscribe_to_topics", 
                                       topics=["research", "data"])
    
    # Push research data
    researcher_handler.handle_tool_call("push_context",
        key="research_findings",
        value="Market analysis shows 40% growth in renewable energy",
        topics=["research"]
    )
    
    state["messages"].append("Research completed and shared")
    state["context_updates"].append({"agent": "researcher", "action": "push_context"})
    return state

def analyst_node(state: WorkflowState):
    """Analysis agent that processes shared research."""
    print("📊 Analyst Node")
    
    # Subscribe to research and analysis topics
    analyst_handler.handle_tool_call("subscribe_to_topics", 
                                    topics=["research", "analysis"])
    
    # Get research context
    research_context = analyst_handler.handle_tool_call("get_context")
    print(f"Analyst found context: {list(research_context.get('context', {}).keys())}")
    
    # Push analysis results
    analyst_handler.handle_tool_call("push_context",
        key="analysis_results", 
        value="Growth trend confirmed, recommend investment focus",
        topics=["analysis"]
    )
    
    state["messages"].append("Analysis completed using research context")
    state["context_updates"].append({"agent": "analyst", "action": "get_and_push_context"})
    return state

def reporter_node(state: WorkflowState):
    """Reporter agent that creates final output."""
    print("📋 Reporter Node")
    
    # Subscribe to analysis and reports topics
    reporter_handler.handle_tool_call("subscribe_to_topics", 
                                     topics=["analysis", "reports"])
    
    # Get all available context
    all_context = reporter_handler.handle_tool_call("get_context")
    print(f"Reporter found context: {list(all_context.get('context', {}).keys())}")
    
    # Create final report
    reporter_handler.handle_tool_call("push_context",
        key="final_report",
        value="Executive Summary: Strong renewable energy growth presents investment opportunity",
        topics=["reports"]
    )
    
    state["messages"].append("Final report generated using all context")
    state["context_updates"].append({"agent": "reporter", "action": "final_report"})
    return state

# Step 5: Build the workflow graph
workflow = StateGraph(WorkflowState)

# Add nodes
workflow.add_node("researcher", researcher_node)
workflow.add_node("analyst", analyst_node) 
workflow.add_node("reporter", reporter_node)

# Define the flow
workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "analyst")
workflow.add_edge("analyst", "reporter")
workflow.add_edge("reporter", END)

# Compile the graph
app = workflow.compile()

# Step 6: Run the context-aware workflow
def run_langgraph_example():
    print("\n=== LangGraph + Syntha Multi-Agent Workflow ===")
    
    initial_state = {
        "messages": [],
        "current_task": "Market Research Analysis",
        "context_updates": []
    }
    
    # Execute the workflow
    result = app.invoke(initial_state)
    
    print("\n📋 Workflow Results:")
    for message in result["messages"]:
        print(f"  {message}")
    
    print(f"\n🔄 Context Updates: {len(result['context_updates'])}")
    
    # Show final shared context state
    final_context = reporter_handler.handle_tool_call("get_context")
    print(f"\n💾 Final Shared Context:")
    for key, value in final_context.get("context", {}).items():
        print(f"  {key}: {value}")

# Run the example
run_langgraph_example()
context.close()
```

**Key Benefits:**
- **Shared Context**: All agents in the workflow share the same context mesh
- **Topic-based Organization**: Agents subscribe to relevant information streams  
- **Persistent State**: Context persists across workflow steps and reruns
- **Automatic Coordination**: Agents automatically discover what others have shared

## Integration with Pre-Existing Tool Ecosystems

### Pattern: Wrapping Existing APIs and Services

You often have existing APIs, databases, and services that your agents need to use. Here's how to add Syntha context to them:

```python
from syntha import ContextMesh, ToolHandler
import requests
import json
from typing import Dict, Any, List

# Your existing API client (unchanged)
class ExistingAPIClient:
    """Your current API client - no changes needed."""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.yourservice.com"
    
    def search_documents(self, query: str) -> List[dict]:
        """Search your document database."""
        response = requests.get(f"{self.base_url}/search", 
                               params={"q": query},
                               headers={"Authorization": f"Bearer {self.api_key}"})
        return response.json().get("results", [])
    
    def create_ticket(self, title: str, description: str) -> dict:
        """Create a support ticket."""
        data = {"title": title, "description": description}
        response = requests.post(f"{self.base_url}/tickets", 
                                json=data,
                                headers={"Authorization": f"Bearer {self.api_key}"})
        return response.json()
    
    def get_user_profile(self, user_id: str) -> dict:
        """Get user profile information."""
        response = requests.get(f"{self.base_url}/users/{user_id}",
                               headers={"Authorization": f"Bearer {self.api_key}"})
        return response.json()

# Step 1: Create a context-aware wrapper
class ContextAwareAPIWrapper:
    """Wrapper that adds Syntha context to your existing API."""
    
    def __init__(self, api_client: ExistingAPIClient, context: ContextMesh, agent_name: str):
        self.api_client = api_client  # Your existing client, unchanged
        self.syntha_handler = ToolHandler(context, agent_name)
        
        # Subscribe to relevant topics
        self.syntha_handler.handle_tool_call("subscribe_to_topics",
                                           topics=["api_calls", "user_data", "search_results"])
    
    def context_aware_search(self, query: str, save_results: bool = True) -> List[dict]:
        """Search with context awareness."""
        
        # Check if we have previous search results for this query
        context_result = self.syntha_handler.handle_tool_call("get_context", 
                                                            keys=[f"search_{query}"])
        
        if context_result.get("context", {}).get(f"search_{query}"):
            print(f"🔍 Found cached search results for: {query}")
            cached_results = json.loads(context_result["context"][f"search_{query}"])
            return cached_results
        
        # Perform new search using existing API
        print(f"🔍 Performing new search for: {query}")
        results = self.api_client.search_documents(query)
        
        # Save results to context for future use
        if save_results and results:
            self.syntha_handler.handle_tool_call("push_context",
                key=f"search_{query}",
                value=json.dumps(results),
                topics=["search_results"],
                ttl_hours=24  # Cache for 24 hours
            )
        
        return results
    
    def context_aware_ticket_creation(self, title: str, description: str) -> dict:
        """Create ticket with context enrichment."""
        
        # Get user context to enrich the ticket
        user_context = self.syntha_handler.handle_tool_call("get_context")
        context_data = user_context.get("context", {})
        
        # Enrich description with relevant context
        enriched_description = description
        if context_data:
            relevant_info = []
            for key, value in context_data.items():
                if any(keyword in key.lower() for keyword in ["user", "profile", "recent"]):
                    relevant_info.append(f"{key}: {str(value)[:100]}")
            
            if relevant_info:
                enriched_description += f"\n\nRelevant Context:\n" + "\n".join(relevant_info)
        
        # Create ticket using existing API
        ticket = self.api_client.create_ticket(title, enriched_description)
        
        # Save ticket info to context
        self.syntha_handler.handle_tool_call("push_context",
            key=f"ticket_{ticket.get('id', 'unknown')}",
            value=json.dumps({
                "title": title,
                "original_description": description,
                "ticket_id": ticket.get("id"),
                "status": ticket.get("status", "created"),
                "created_at": ticket.get("created_at")
            }),
            topics=["tickets", "user_actions"]
        )
        
        return ticket
    
    def get_enhanced_user_profile(self, user_id: str) -> dict:
        """Get user profile enhanced with context."""
        
        # Get profile from existing API
        profile = self.api_client.get_user_profile(user_id)
        
        # Enhance with context data
        context_result = self.syntha_handler.handle_tool_call("get_context")
        context_data = context_result.get("context", {})
        
        # Add context-based insights
        profile["context_insights"] = {
            "recent_searches": [key for key in context_data.keys() if key.startswith("search_")],
            "recent_tickets": [key for key in context_data.keys() if key.startswith("ticket_")],
            "total_context_items": len(context_data)
        }
        
        return profile

# Step 2: Use the context-aware wrapper
def demonstrate_existing_api_integration():
    """Show how to add context to existing APIs."""
    
    print("=== Existing API + Syntha Integration ===")
    
    # Your existing setup (unchanged)
    api_client = ExistingAPIClient("your-api-key")
    
    # Add Syntha context capabilities
    context = ContextMesh(user_id="api_user", enable_persistence=True)
    wrapper = ContextAwareAPIWrapper(api_client, context, "APIAgent")
    
    # Now your API calls are context-aware
    
    # First search - hits the API
    results1 = wrapper.context_aware_search("machine learning tutorials")
    print(f"First search returned {len(results1)} results")
    
    # Second search with same query - uses cached results
    results2 = wrapper.context_aware_search("machine learning tutorials") 
    print(f"Second search returned {len(results2)} results (from cache)")
    
    # Create a ticket with context enrichment
    ticket = wrapper.context_aware_ticket_creation(
        "Need help with ML implementation",
        "I'm having trouble implementing the machine learning model."
    )
    print(f"Created ticket: {ticket.get('id')}")
    
    # Get enhanced user profile
    profile = wrapper.get_enhanced_user_profile("user123")
    print(f"User profile with context insights: {profile.get('context_insights')}")
    
    context.close()

# Run the example
demonstrate_existing_api_integration()
```

### Pattern: Database Integration with Context

Here's how to add context awareness to your existing database operations:

```python
import sqlite3
from syntha import ContextMesh, ToolHandler
import json
from datetime import datetime

# Your existing database class (unchanged)
class ExistingDatabase:
    """Your current database operations - no changes needed."""
    
    def __init__(self, db_path: str):
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        """Initialize database tables."""
        conn = sqlite3.connect(self.db_path)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT,
                created_at TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                customer_id INTEGER,
                product TEXT,
                amount DECIMAL,
                created_at TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customers (id)
            )
        """)
        conn.commit()
        conn.close()
    
    def get_customer(self, customer_id: int) -> dict:
        """Get customer by ID."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.execute("SELECT * FROM customers WHERE id = ?", (customer_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return {
                "id": row[0],
                "name": row[1], 
                "email": row[2],
                "created_at": row[3]
            }
        return {}
    
    def get_customer_orders(self, customer_id: int) -> List[dict]:
        """Get all orders for a customer."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.execute("SELECT * FROM orders WHERE customer_id = ?", (customer_id,))
        rows = cursor.fetchall()
        conn.close()
        
        return [{
            "id": row[0],
            "customer_id": row[1],
            "product": row[2],
            "amount": row[3],
            "created_at": row[4]
        } for row in rows]

# Context-aware database wrapper
class ContextAwareDatabase:
    """Database wrapper with Syntha context integration."""
    
    def __init__(self, database: ExistingDatabase, context: ContextMesh, agent_name: str):
        self.db = database  # Your existing database, unchanged
        self.syntha_handler = ToolHandler(context, agent_name)
        
        # Subscribe to relevant topics
        self.syntha_handler.handle_tool_call("subscribe_to_topics",
                                           topics=["customers", "orders", "analytics"])
    
    def get_customer_with_context(self, customer_id: int) -> dict:
        """Get customer with context-enhanced information."""
        
        # Check if we have cached customer analysis
        context_key = f"customer_analysis_{customer_id}"
        context_result = self.syntha_handler.handle_tool_call("get_context", keys=[context_key])
        
        # Get customer from existing database
        customer = self.db.get_customer(customer_id)
        if not customer:
            return {}
        
        # Get customer orders
        orders = self.db.get_customer_orders(customer_id)
        
        # Add context-based analytics
        if context_result.get("context", {}).get(context_key):
            # Use cached analysis
            cached_analysis = json.loads(context_result["context"][context_key])
            customer["cached_analysis"] = cached_analysis
        else:
            # Generate new analysis
            analysis = self._analyze_customer(customer, orders)
            customer["analysis"] = analysis
            
            # Save analysis to context
            self.syntha_handler.handle_tool_call("push_context",
                key=context_key,
                value=json.dumps(analysis),
                topics=["customers", "analytics"],
                ttl_hours=168  # Cache for 1 week
            )
        
        # Track customer lookup
        self.syntha_handler.handle_tool_call("push_context",
            key=f"lookup_{customer_id}_{datetime.now().isoformat()}",
            value=json.dumps({
                "action": "customer_lookup",
                "customer_id": customer_id,
                "timestamp": datetime.now().isoformat()
            }),
            topics=["customer_activity"],
            ttl_hours=24
        )
        
        return customer
    
    def _analyze_customer(self, customer: dict, orders: List[dict]) -> dict:
        """Analyze customer behavior."""
        total_spent = sum(float(order["amount"]) for order in orders)
        avg_order_value = total_spent / len(orders) if orders else 0
        
        return {
            "total_orders": len(orders),
            "total_spent": total_spent,
            "average_order_value": avg_order_value,
            "customer_tier": "VIP" if total_spent > 1000 else "Regular",
            "analysis_date": datetime.now().isoformat()
        }
    
    def get_customer_insights(self) -> dict:
        """Get insights from customer context data."""
        
        # Get all customer-related context
        context_result = self.syntha_handler.handle_tool_call("get_context")
        context_data = context_result.get("context", {})
        
        # Analyze patterns
        lookups = [key for key in context_data.keys() if key.startswith("lookup_")]
        analyses = [key for key in context_data.keys() if key.startswith("customer_analysis_")]
        
        return {
            "total_customer_lookups": len(lookups),
            "customers_analyzed": len(analyses),
            "most_recent_lookups": sorted(lookups)[-5:] if lookups else [],
            "context_summary": f"{len(context_data)} total context items"
        }

# Example usage
def demonstrate_database_integration():
    """Show database integration with context."""
    
    print("=== Database + Syntha Integration ===")
    
    # Your existing database setup (unchanged)
    db = ExistingDatabase("example.db")
    
    # Add some test data
    conn = sqlite3.connect("example.db")
    conn.execute("INSERT OR IGNORE INTO customers (id, name, email, created_at) VALUES (1, 'John Doe', 'john@example.com', ?)", 
                 (datetime.now().isoformat(),))
    conn.execute("INSERT OR IGNORE INTO orders (customer_id, product, amount, created_at) VALUES (1, 'Widget', 29.99, ?)",
                 (datetime.now().isoformat(),))
    conn.execute("INSERT OR IGNORE INTO orders (customer_id, product, amount, created_at) VALUES (1, 'Gadget', 49.99, ?)",
                 (datetime.now().isoformat(),))
    conn.commit()
    conn.close()
    
    # Add Syntha context capabilities
    context = ContextMesh(user_id="db_user", enable_persistence=True)
    context_db = ContextAwareDatabase(db, context, "DatabaseAgent")
    
    # Now your database operations are context-aware
    
    # First lookup - generates analysis
    customer1 = context_db.get_customer_with_context(1)
    print(f"Customer analysis: {customer1.get('analysis', {})}")
    
    # Second lookup - uses cached analysis
    customer2 = context_db.get_customer_with_context(1)
    print(f"Cached analysis available: {'cached_analysis' in customer2}")
    
    # Get insights from context
    insights = context_db.get_customer_insights()
    print(f"Customer insights: {insights}")
    
    context.close()

# Run the example
demonstrate_database_integration()
```

### Pattern: Microservices with Shared Context

Here's how to share context across different services:

```python
from syntha import ContextMesh, ToolHandler
import requests
import json
from typing import Optional

# Service A: User Management Service
class UserService:
    """Existing user management service."""
    
    def __init__(self, context: ContextMesh):
        self.syntha_handler = ToolHandler(context, "UserService")
        self.syntha_handler.handle_tool_call("subscribe_to_topics",
                                           topics=["users", "authentication", "profiles"])
    
    def authenticate_user(self, username: str, password: str) -> Optional[dict]:
        """Authenticate user and share context."""
        
        # Your existing authentication logic
        if username == "demo" and password == "password":
            user_data = {
                "user_id": "user123",
                "username": username,
                "role": "admin",
                "authenticated_at": "2024-01-15T10:00:00Z"
            }
            
            # Share authentication context with other services
            self.syntha_handler.handle_tool_call("push_context",
                key=f"auth_{user_data['user_id']}",
                value=json.dumps(user_data),
                topics=["authentication", "users"],
                ttl_hours=24
            )
            
            return user_data
        
        return None

# Service B: Order Service  
class OrderService:
    """Existing order processing service."""
    
    def __init__(self, context: ContextMesh):
        self.syntha_handler = ToolHandler(context, "OrderService")
        self.syntha_handler.handle_tool_call("subscribe_to_topics",
                                           topics=["orders", "users", "authentication"])
    
    def create_order(self, user_id: str, product: str, amount: float) -> dict:
        """Create order with user context awareness."""
        
        # Check user authentication status from shared context
        auth_result = self.syntha_handler.handle_tool_call("get_context", 
                                                         keys=[f"auth_{user_id}"])
        
        user_data = auth_result.get("context", {}).get(f"auth_{user_id}")
        if not user_data:
            return {"error": "User not authenticated"}
        
        user_info = json.loads(user_data)
        
        # Create order with user context
        order = {
            "order_id": "order456",
            "user_id": user_id,
            "username": user_info["username"],
            "user_role": user_info["role"],
            "product": product,
            "amount": amount,
            "created_at": "2024-01-15T10:30:00Z"
        }
        
        # Share order context
        self.syntha_handler.handle_tool_call("push_context",
            key=f"order_{order['order_id']}",
            value=json.dumps(order),
            topics=["orders", "users"]
        )
        
        return order

# Service C: Notification Service
class NotificationService:
    """Existing notification service."""
    
    def __init__(self, context: ContextMesh):
        self.syntha_handler = ToolHandler(context, "NotificationService")
        self.syntha_handler.handle_tool_call("subscribe_to_topics",
                                           topics=["orders", "users", "notifications"])
    
    def send_order_confirmation(self, order_id: str) -> dict:
        """Send notification using shared context."""
        
        # Get order details from shared context
        order_result = self.syntha_handler.handle_tool_call("get_context",
                                                          keys=[f"order_{order_id}"])
        
        order_data = order_result.get("context", {}).get(f"order_{order_id}")
        if not order_data:
            return {"error": "Order not found in context"}
        
        order = json.loads(order_data)
        
        # Create personalized notification using context
        notification = {
            "notification_id": "notif789",
            "user_id": order["user_id"],
            "message": f"Hi {order['username']}, your order for {order['product']} (${order['amount']}) has been confirmed!",
            "sent_at": "2024-01-15T10:35:00Z"
        }
        
        # Save notification to context
        self.syntha_handler.handle_tool_call("push_context",
            key=f"notification_{notification['notification_id']}",
            value=json.dumps(notification),
            topics=["notifications"]
        )
        
        return notification

# Demonstrate microservices integration
def demonstrate_microservices_integration():
    """Show how services share context."""
    
    print("=== Microservices + Syntha Integration ===")
    
    # Shared context across all services
    shared_context = ContextMesh(user_id="microservices_demo", enable_persistence=True)
    
    # Initialize services with shared context
    user_service = UserService(shared_context)
    order_service = OrderService(shared_context) 
    notification_service = NotificationService(shared_context)
    
    # Service workflow with context sharing
    
    # Step 1: User authenticates (UserService)
    auth_result = user_service.authenticate_user("demo", "password")
    print(f"Authentication: {auth_result['username']} authenticated")
    
    # Step 2: User creates order (OrderService uses auth context)
    order_result = order_service.create_order(auth_result["user_id"], "Premium Widget", 99.99)
    print(f"Order created: {order_result['order_id']}")
    
    # Step 3: Send notification (NotificationService uses order context)
    notification_result = notification_service.send_order_confirmation(order_result["order_id"])
    print(f"Notification sent: {notification_result['message']}")
    
    # Show shared context state
    final_context = user_service.syntha_handler.handle_tool_call("list_context")
    print(f"Shared context keys: {final_context['keys']}")
    
    shared_context.close()

# Run the example
demonstrate_microservices_integration()
```

**Key Benefits of These Integration Patterns:**

1. **Zero Disruption**: Your existing code works exactly as before
2. **Gradual Enhancement**: Add context capabilities incrementally
3. **Automatic Caching**: Reduce API calls and database queries
4. **Cross-Service Intelligence**: Services become aware of each other's context
5. **Rich Context**: Every operation becomes context-aware automatically

## Next Steps: Start Integrating Today

Ready to add context superpowers to your agents? Here's your roadmap:

### 1. Choose Your Integration Pattern

- **Framework Integration**: Using LangChain, LangGraph, or Agno? Use the examples above
- **API/Database Wrapper**: Have existing services? Use the wrapper patterns
- **Microservices**: Multiple services? Use shared context patterns

### 2. Start Small, Scale Up

```python
# Start with this simple pattern
from syntha import ContextMesh, ToolHandler

context = ContextMesh(user_id="your_user", enable_persistence=True)
handler = ToolHandler(context, "YourAgent")

# Add to your existing tools
your_tools = [...existing tools...]
enhanced_tools = handler.get_schemas(merge_with=your_tools)

# Your agent now has context superpowers!
```

### 3. Key Integration Principles

1. **Non-Destructive**: Never modify existing code
2. **Incremental**: Add context capabilities gradually
3. **Topic-Based**: Organize context with meaningful topics
4. **Cache-Aware**: Let context reduce redundant operations
5. **User-Isolated**: Always use proper `user_id` separation

### 4. Common Integration Patterns

| Your Current Setup | Integration Approach | Key Benefits |
|-------------------|---------------------|--------------|
| **LangChain Agents** | `handler.get_langchain_tools()` | Native BaseTool instances, automatic schemas |
| **LangGraph Workflows** | `handler.get_langgraph_tools()` + Shared `ContextMesh` | Multi-agent coordination, persistent state |
| **OpenAI Function Calling** | `handler.get_openai_functions()` | Perfect function schemas, type safety |
| **Anthropic Claude** | `handler.get_anthropic_tools()` | Native tool definitions, flexible integration |
| **Agno Framework** | `handler.get_tools_for_framework("agno")` | Universal compatibility, async support |
| **Any Framework** | `handler.get_schemas()` or `handler.get_tools_for_framework("name")` | Universal JSON schemas, framework-agnostic |
| **Custom APIs** | Wrapper pattern with context enhancement | Automatic caching, enriched data |
| **Database Operations** | Context-aware wrapper with analytics | Smart caching, behavioral insights |
| **Microservices** | Shared context mesh | Cross-service intelligence |

### 5. Production Checklist

- ✅ Use persistent storage (`enable_persistence=True`)
- ✅ Set up proper user isolation with unique `user_id`
- ✅ Organize context with meaningful topics
- ✅ Set appropriate TTL values for context data
- ✅ Monitor context usage and performance
- ✅ Test integration thoroughly before deployment

## What You've Accomplished

You now know how to:

- ✅ **Integrate Seamlessly**: Add Syntha to any existing framework or tool
- ✅ **Enhance Without Breaking**: Keep existing code working while adding context
- ✅ **Scale Intelligently**: Build multi-agent systems with shared context
- ✅ **Cache Effectively**: Reduce API calls and database queries automatically
- ✅ **Coordinate Services**: Share context across microservices and APIs

Your agents now have the memory and context awareness they need to provide truly intelligent, personalized experiences.

**Ready to get started?** Pick the integration pattern that matches your setup and start building context-aware agents today!

class ServiceContextBridge:
    """Bridge context between microservices"""
    
    def __init__(self, service_name: str, user_id: str, db_config: dict):
        self.service_name = service_name
        self.user_id = user_id
        
        # Each service has its own context mesh
        self.context = ContextMesh(
            user_id=user_id,
            enable_persistence=True,
            **db_config
        )
        
        # Service-specific agent
        self.agent = ToolHandler(self.context, f"{service_name}Service")
        
        # Subscribe to inter-service topics
        self.agent.handle_tool_call("subscribe_to_topics",
                                    topics=["inter_service", f"to_{service_name}"])
    
    def publish_to_service(self, target_service: str, event_type: str, data: dict):
        """Publish event to another service"""
        event = {
            "source_service": self.service_name,
            "target_service": target_service,
            "event_type": event_type,
            "data": data,
            "timestamp": time.time()
        }
        
        self.agent.handle_tool_call("push_context",
            key=f"event_{target_service}_{int(time.time())}",
            value=json.dumps(event),
            topics=[f"to_{target_service}", "inter_service"]
        )
    
    def get_service_events(self) -> List[dict]:
        """Get events for this service"""
        result = self.agent.handle_tool_call("get_context")
        events = []
        
        for key, value in result.get("context", {}).items():
            if key.startswith("event_") and isinstance(value, dict):
                if value.get("target_service") == self.service_name:
                    events.append(value)
        
        return events
    
    def close(self):
        """Close context connection"""
        self.context.close()

class UserService:
    """Example user management service"""
    
    def __init__(self, user_id: str):
        self.bridge = ServiceContextBridge("user", user_id, {
            "db_backend": "sqlite",
            "db_path": f"user_service_{user_id}.db"
        })
    
    def create_user(self, user_data: dict) -> dict:
        """Create a new user"""
        # Store user data locally
        self.bridge.agent.handle_tool_call("push_context",
            key=f"user_{user_data['id']}",
            value=json.dumps(user_data),
            topics=["users"]
        )
        
        # Notify other services
        self.bridge.publish_to_service("analytics", "user_created", user_data)
        self.bridge.publish_to_service("notification", "welcome_user", user_data)
        
        return {"success": True, "user_id": user_data["id"]}
    
    def update_user(self, user_id: str, updates: dict) -> dict:
        """Update user data"""
        # Get existing user
        result = self.bridge.agent.handle_tool_call("get_context", keys=[f"user_{user_id}"])
        
        if f"user_{user_id}" not in result.get("context", {}):
            return {"success": False, "error": "User not found"}
        
        # Update user data
        user_data = json.loads(result["context"][f"user_{user_id}"])
        user_data.update(updates)
        
        self.bridge.agent.handle_tool_call("push_context",
            key=f"user_{user_id}",
            value=json.dumps(user_data),
            topics=["users"]
        )
        
        # Notify other services
        self.bridge.publish_to_service("analytics", "user_updated", {
            "user_id": user_id,
            "updates": updates
        })
        
        return {"success": True}
    
    def close(self):
        self.bridge.close()

class AnalyticsService:
    """Example analytics service"""
    
    def __init__(self, user_id: str):
        self.bridge = ServiceContextBridge("analytics", user_id, {
            "db_backend": "sqlite", 
            "db_path": f"analytics_service_{user_id}.db"
        })
        self.metrics = {}
    
    def process_events(self):
        """Process incoming events"""
        events = self.bridge.get_service_events()
        
        for event in events:
            event_type = event.get("event_type")
            data = event.get("data", {})
            
            if event_type == "user_created":
                self._track_user_creation(data)
            elif event_type == "user_updated":
                self._track_user_update(data)
    
    def _track_user_creation(self, user_data: dict):
        """Track user creation metrics"""
        self.metrics["users_created"] = self.metrics.get("users_created", 0) + 1
        
        # Store metrics in context
        self.bridge.agent.handle_tool_call("push_context",
            key="user_creation_metrics",
            value=json.dumps(self.metrics),
            topics=["metrics"]
        )
    
    def _track_user_update(self, data: dict):
        """Track user update metrics"""
        self.metrics["users_updated"] = self.metrics.get("users_updated", 0) + 1
        
        # Store metrics in context
        self.bridge.agent.handle_tool_call("push_context",
            key="user_update_metrics", 
            value=json.dumps(self.metrics),
            topics=["metrics"]
        )
    
    def get_metrics(self) -> dict:
        """Get current metrics"""
        return self.metrics
    
    def close(self):
        self.bridge.close()

def microservices_example():
    """Microservices integration example"""
    
    print("=== Microservices Integration ===")
    
    user_id = "microservices_demo"
    
    # Create services
    user_service = UserService(user_id)
    analytics_service = AnalyticsService(user_id)
    
    try:
        # Create some users
        users = [
            {"id": "user1", "name": "Alice", "email": "alice@example.com"},
            {"id": "user2", "name": "Bob", "email": "bob@example.com"}
        ]
        
        for user_data in users:
            result = user_service.create_user(user_data)
            print(f"Created user: {result}")
        
        # Update a user
        update_result = user_service.update_user("user1", {"status": "active"})
        print(f"Updated user: {update_result}")
        
        # Process events in analytics service
        analytics_service.process_events()
        
        # Get metrics
        metrics = analytics_service.get_metrics()
        print(f"Analytics metrics: {metrics}")
        
    finally:
        # Clean up
        user_service.close()
        analytics_service.close()
        
        # Clean up test databases
        import os
        for db_file in [f"user_service_{user_id}.db", f"analytics_service_{user_id}.db"]:
            if os.path.exists(db_file):
                os.remove(db_file)

microservices_example()
```

## Production Monitoring and Observability

Here's how to add monitoring and observability to your Syntha applications:

```python
from syntha import ContextMesh, ToolHandler
import logging
import time
import json
from typing import Dict, List
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class ContextMetric:
    """Represents a context operation metric"""
    timestamp: float
    operation: str
    agent_name: str
    success: bool
    duration_ms: float
    context_size: int
    error: str = None

class SynthaMonitor:
    """Production monitoring for Syntha applications"""
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.metrics: List[ContextMetric] = []
        self.context = ContextMesh(
            user_id=f"monitor_{user_id}",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=f"monitoring_{user_id}.db"
        )
        
        # Monitoring agent
        self.monitor_agent = ToolHandler(self.context, "MonitorAgent")
        self.monitor_agent.handle_tool_call("subscribe_to_topics", 
                                            topics=["monitoring", "alerts"])
        
        # Set up logging
        self.logger = logging.getLogger(f"syntha_monitor_{user_id}")
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def track_operation(self, operation: str, agent_name: str, 
                       success: bool, duration_ms: float, 
                       context_size: int, error: str = None):
        """Track a context operation"""
        
        metric = ContextMetric(
            timestamp=time.time(),
            operation=operation,
            agent_name=agent_name,
            success=success,
            duration_ms=duration_ms,
            context_size=context_size,
            error=error
        )
        
        self.metrics.append(metric)
        
        # Log the operation
        if success:
            self.logger.info(f"{agent_name} {operation} completed in {duration_ms:.2f}ms")
        else:
            self.logger.error(f"{agent_name} {operation} failed: {error}")
        
        # Store in context for analysis
        self.monitor_agent.handle_tool_call("push_context",
            key=f"metric_{int(metric.timestamp)}",
            value=json.dumps({
                "timestamp": metric.timestamp,
                "operation": metric.operation,
                "agent_name": metric.agent_name,
                "success": metric.success,
                "duration_ms": metric.duration_ms,
                "context_size": metric.context_size,
                "error": metric.error
            }),
            topics=["monitoring"],
            ttl_hours=24
        )
        
        # Check for alerts
        self._check_alerts(metric)
    
    def _check_alerts(self, metric: ContextMetric):
        """Check if metric triggers any alerts"""
        
        # Alert on failures
        if not metric.success:
            self._send_alert("operation_failed", {
                "operation": metric.operation,
                "agent": metric.agent_name,
                "error": metric.error
            })
        
        # Alert on slow operations (>1000ms)
        if metric.duration_ms > 1000:
            self._send_alert("slow_operation", {
                "operation": metric.operation,
                "agent": metric.agent_name,
                "duration_ms": metric.duration_ms
            })
        
        # Alert on large context (>100 items)
        if metric.context_size > 100:
            self._send_alert("large_context", {
                "agent": metric.agent_name,
                "context_size": metric.context_size
            })
    
    def _send_alert(self, alert_type: str, data: dict):
        """Send an alert"""
        alert = {
            "type": alert_type,
            "timestamp": time.time(),
            "data": data,
            "severity": self._get_alert_severity(alert_type)
        }
        
        self.monitor_agent.handle_tool_call("push_context",
            key=f"alert_{int(alert['timestamp'])}",
            value=json.dumps(alert),
            topics=["alerts"],
            ttl_hours=48
        )
        
        # Log alert
        severity = alert["severity"]
        if severity == "critical":
            self.logger.critical(f"ALERT: {alert_type} - {data}")
        elif severity == "warning":
            self.logger.warning(f"ALERT: {alert_type} - {data}")
        else:
            self.logger.info(f"ALERT: {alert_type} - {data}")
    
    def _get_alert_severity(self, alert_type: str) -> str:
        """Get severity level for alert type"""
        severity_map = {
            "operation_failed": "critical",
            "slow_operation": "warning", 
            "large_context": "info"
        }
        return severity_map.get(alert_type, "info")
    
    def get_performance_stats(self, hours: int = 1) -> dict:
        """Get performance statistics for the last N hours"""
        
        cutoff_time = time.time() - (hours * 3600)
        recent_metrics = [m for m in self.metrics if m.timestamp > cutoff_time]
        
        if not recent_metrics:
            return {"message": "No metrics in time range"}
        
        # Calculate statistics
        total_ops = len(recent_metrics)
        successful_ops = len([m for m in recent_metrics if m.success])
        failed_ops = total_ops - successful_ops
        
        durations = [m.duration_ms for m in recent_metrics]
        avg_duration = sum(durations) / len(durations)
        max_duration = max(durations)
        min_duration = min(durations)
        
        # Operations by type
        ops_by_type = {}
        for metric in recent_metrics:
            ops_by_type[metric.operation] = ops_by_type.get(metric.operation, 0) + 1
        
        # Agents by activity
        agents_by_activity = {}
        for metric in recent_metrics:
            agents_by_activity[metric.agent_name] = agents_by_activity.get(metric.agent_name, 0) + 1
        
        return {
            "time_range_hours": hours,
            "total_operations": total_ops,
            "successful_operations": successful_ops,
            "failed_operations": failed_ops,
            "success_rate": successful_ops / total_ops if total_ops > 0 else 0,
            "avg_duration_ms": avg_duration,
            "max_duration_ms": max_duration,
            "min_duration_ms": min_duration,
            "operations_by_type": ops_by_type,
            "agents_by_activity": agents_by_activity
        }
    
    def get_alerts(self, hours: int = 24) -> List[dict]:
        """Get recent alerts"""
        
        result = self.monitor_agent.handle_tool_call("get_context")
        alerts = []
        
        cutoff_time = time.time() - (hours * 3600)
        
        for key, value in result.get("context", {}).items():
            if key.startswith("alert_") and isinstance(value, dict):
                if value.get("timestamp", 0) > cutoff_time:
                    alerts.append(value)
        
        # Sort by timestamp (newest first)
        alerts.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
        
        return alerts
    
    def close(self):
        """Close monitoring resources"""
        self.context.close()

class MonitoredContextHandler:
    """Context handler with built-in monitoring"""
    
    def __init__(self, context: ContextMesh, agent_name: str, monitor: SynthaMonitor):
        self.handler = ToolHandler(context, agent_name)
        self.agent_name = agent_name
        self.monitor = monitor
    
    def handle_tool_call(self, tool_name: str, **kwargs) -> dict:
        """Handle tool call with monitoring"""
        
        start_time = time.time()
        context_size = len(self.handler.context_mesh._data)
        
        try:
            result = self.handler.handle_tool_call(tool_name, **kwargs)
            duration_ms = (time.time() - start_time) * 1000
            
            self.monitor.track_operation(
                operation=tool_name,
                agent_name=self.agent_name,
                success=result.get("success", True),
                duration_ms=duration_ms,
                context_size=context_size
            )
            
            return result
            
        except Exception as e:
            duration_ms = (time.time() - start_time) * 1000
            
            self.monitor.track_operation(
                operation=tool_name,
                agent_name=self.agent_name,
                success=False,
                duration_ms=duration_ms,
                context_size=context_size,
                error=str(e)
            )
            
            raise

def monitoring_example():
    """Production monitoring example"""
    
    print("=== Production Monitoring ===")
    
    user_id = "monitored_user"
    
    # Set up monitoring
    monitor = SynthaMonitor(user_id)
    
    # Create monitored context
    context = ContextMesh(user_id=user_id, enable_persistence=False)
    
    try:
        # Create monitored agents
        agent1 = MonitoredContextHandler(context, "Agent1", monitor)
        agent2 = MonitoredContextHandler(context, "Agent2", monitor)
        
        # Simulate operations
        operations = [
            (agent1, "subscribe_to_topics", {"topics": ["test"]}),
            (agent1, "push_context", {"key": "test1", "value": "data1", "topics": ["test"]}),
            (agent2, "subscribe_to_topics", {"topics": ["test"]}),
            (agent2, "get_context", {"keys": ["test1"]}),
            (agent1, "push_context", {"key": "test2", "value": "data2", "topics": ["test"]}),
            (agent2, "list_context", {}),
        ]
        
        for agent, operation, kwargs in operations:
            result = agent.handle_tool_call(operation, **kwargs)
            print(f"Operation {operation}: {result.get('success', 'N/A')}")
            time.sleep(0.1)  # Small delay between operations
        
        # Simulate a failure
        try:
            agent1.handle_tool_call("invalid_operation")
        except:
            pass  # Expected failure
        
        # Get performance statistics
        stats = monitor.get_performance_stats(hours=1)
        print(f"\nPerformance Stats:")
        print(f"  Total operations: {stats['total_operations']}")
        print(f"  Success rate: {stats['success_rate']:.2%}")
        print(f"  Average duration: {stats['avg_duration_ms']:.2f}ms")
        print(f"  Operations by type: {stats['operations_by_type']}")
        
        # Get alerts
        alerts = monitor.get_alerts(hours=1)
        print(f"\nAlerts ({len(alerts)} total):")
        for alert in alerts[:3]:  # Show first 3
            print(f"  {alert['type']} ({alert['severity']}): {alert['data']}")
        
    finally:
        # Clean up
        context.close()
        monitor.close()
        
        # Clean up test database
        import os
        if os.path.exists(f"monitoring_{user_id}.db"):
            os.remove(f"monitoring_{user_id}.db")

monitoring_example()
```

## What You've Learned

You now have complete, production-ready examples for:

- ✅ **OpenAI Integration** - Single and multi-agent systems with real API calls
- ✅ **Multi-User Applications** - Complete user isolation and session management
- ✅ **Microservices Architecture** - Context sharing across service boundaries
- ✅ **Production Monitoring** - Comprehensive observability and alerting

These examples provide the foundation for building sophisticated, scalable multi-agent systems with Syntha. Each pattern includes proper error handling, logging, and production best practices.

## Next Steps

You're now ready to build production applications with Syntha! Consider:

1. **Start Small** - Begin with a single-agent system and add complexity gradually
2. **Focus on User Isolation** - Always use proper `user_id` separation
3. **Monitor Everything** - Implement monitoring from day one
4. **Plan for Scale** - Use the patterns shown here as your system grows
5. **Test Thoroughly** - All examples include error handling patterns to follow