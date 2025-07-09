# Quick Start Guide

Get your first multi-agent system running with Syntha in under 5 minutes!

## Overview

This guide will teach you to:
1. Set up the basic components
2. Create shared context between agents
3. Enable agent-to-agent communication
4. Integrate with your LLM of choice

## Step 1: Initialize Syntha (30 seconds)

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Create the shared memory system
mesh = ContextMesh(
    enable_indexing=True,  # 10x faster lookups
    auto_cleanup=True      # Automatic memory management
)

# Create the tool handler for LLM integration
handler = ToolHandler(mesh)

print("✅ Syntha initialized!")
```

## Step 2: Add Shared Context (1 minute)

```python
# Global context (accessible to all agents)
mesh.push("company", "TechCorp")
mesh.push("project", "CustomerPortal")
mesh.push("deadline", "2025-03-15")

# Team-specific context with access control
mesh.push("api_config", {
    "endpoint": "https://api.techcorp.com",
    "timeout": 30,
    "retries": 3
}, subscribers=["Backend", "QA"])

# Temporary context with auto-expiration
mesh.push("deployment_token", "temp_token_123", 
          ttl=3600)  # Expires in 1 hour

print("✅ Context added!")
print(f"Available keys: {mesh.list_keys()}")
```

## Step 3: Set Up Agent Communication (1 minute)

```python
# Send a message between agents
result = handler.handle_tool_call("send_message_to_agent",
    from_agent="ProductManager",
    to_agent="DevLead", 
    message="Please prioritize the authentication feature",
    priority="high"
)

print(f"Message sent: {result['success']}")

# Check messages for an agent
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="DevLead",
    unread_only=True
)

print(f"DevLead has {messages['count']} unread messages")
```

## Step 4: Generate Context-Aware Prompts (1 minute)

```python
# Generate system prompt with automatic context injection
system_prompt = build_system_prompt("Backend", mesh)
print("System prompt generated!")
print("Preview:", system_prompt[:200] + "...")

# Get tool schemas for your LLM
tool_schemas = handler.get_schemas()
print(f"✅ {len(tool_schemas)} tools available for LLM")
```

## Step 5: LLM Integration (2 minutes)

Choose your framework and integrate:

### OpenAI Integration

```python
import openai
import json

# Configure with your API key
# openai.api_key = "your-api-key"

def run_agent(agent_name, user_message):
    # Get context-aware prompt
    system_prompt = build_system_prompt(agent_name, mesh)
    
    # Get tool schemas  
    tools = [{"type": "function", "function": schema} 
             for schema in handler.get_schemas()]
    
    # Make LLM call
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        tools=tools
    )
    
    # Handle tool calls
    if response.choices[0].message.tool_calls:
        for tool_call in response.choices[0].message.tool_calls:
            result = handler.handle_tool_call(
                tool_call.function.name,
                **json.loads(tool_call.function.arguments)
            )
            print(f"Tool executed: {tool_call.function.name}")
            print(f"Result: {result}")
    
    return response.choices[0].message.content

# Test the agent
# response = run_agent("Backend", "Check for new tasks and update project status")
print("✅ LLM integration ready!")
```

### Anthropic Claude Integration

```python
import anthropic

def run_claude_agent(agent_name, user_message):
    # Get context and tools
    system_prompt = build_system_prompt(agent_name, mesh)
    tools = handler.get_schemas()
    
    # Create client
    client = anthropic.Anthropic(api_key="your-api-key")
    
    # Make request
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
        tools=tools
    )
    
    # Handle tool use
    if response.content:
        for block in response.content:
            if block.type == "tool_use":
                result = handler.handle_tool_call(
                    block.name,
                    **block.input
                )
                print(f"Tool executed: {block.name}")
    
    return response

print("✅ Claude integration ready!")
```

## Complete Example: Multi-Agent Team

Here's a complete example with multiple agents working together:

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

class MultiAgentTeam:
    def __init__(self):
        # Initialize Syntha
        self.mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
        self.handler = ToolHandler(self.mesh)
        
        # Set up team context
        self.setup_team_context()
    
    def setup_team_context(self):
        """Initialize shared team knowledge"""
        # Project information
        self.mesh.push("project_name", "CustomerPortal")
        self.mesh.push("sprint_goal", "Implement user authentication")
        self.mesh.push("deadline", "2025-03-15")
        
        # Team configurations
        self.mesh.push("backend_config", {
            "api_url": "https://api.company.com",
            "database": "postgresql://...",
            "redis_cache": "redis://..."
        }, subscribers=["Backend", "DevOps"])
        
        self.mesh.push("frontend_config", {
            "app_url": "https://app.company.com", 
            "cdn": "https://cdn.company.com"
        }, subscribers=["Frontend", "QA"])
    
    def create_workflow(self, workflow_name, participants):
        """Start a coordinated workflow"""
        # Broadcast workflow start
        result = self.handler.handle_tool_call("broadcast_message_to_agents",
            from_agent="ProjectManager",
            to_agents=participants,
            message=f"Starting workflow: {workflow_name}",
            create_thread=True
        )
        
        return result.get("thread_id")
    
    def get_agent_prompt(self, agent_name):
        """Get context-aware prompt for any agent"""
        return build_system_prompt(agent_name, self.mesh)
    
    def get_llm_tools(self):
        """Get tool schemas for LLM integration"""
        return self.handler.get_schemas()

# Usage
team = MultiAgentTeam()

# Start authentication workflow
thread_id = team.create_workflow("user_authentication", 
                                ["Backend", "Frontend", "QA"])

# Get prompts for each agent
backend_prompt = team.get_agent_prompt("Backend")
frontend_prompt = team.get_agent_prompt("Frontend")

# Get tools for LLM
tools = team.get_llm_tools()

print("✅ Multi-agent team ready!")
print(f"Workflow thread: {thread_id}")
print(f"Available tools: {len(tools)}")
```

## Testing Your Setup

Run this verification script:

```python
def test_syntha_setup():
    """Test all Syntha components"""
    print("🧪 Testing Syntha setup...")
    
    # Test 1: Context Management
    mesh = ContextMesh()
    mesh.push("test", "value")
    assert mesh.get("test") == "value"
    print("✅ Context management working")
    
    # Test 2: Tool Handler
    handler = ToolHandler(mesh)
    schemas = handler.get_schemas()
    assert len(schemas) == 7
    print("✅ Tool handler working")
    
    # Test 3: Agent Communication
    result = handler.handle_tool_call("send_message_to_agent",
        from_agent="Test1", to_agent="Test2", message="Hello")
    assert result["success"] == True
    print("✅ Agent communication working")
    
    # Test 4: Prompt Generation
    prompt = build_system_prompt("TestAgent", mesh)
    assert len(prompt) > 0
    print("✅ Prompt generation working")
    
    print("🎉 All tests passed! Syntha is ready to use.")

# Run the test
test_syntha_setup()
```

## Next Steps

Congratulations! You now have a working multi-agent system. Here's what to explore next:

### Immediate Next Steps
1. **[Core Concepts](core-concepts.md)** - Understand the architecture deeply
2. **[Basic Usage Tutorial](../tutorials/basic-usage.md)** - Learn all the fundamentals
3. **[Agent Communication Tutorial](../tutorials/agent-communication.md)** - Master agent messaging

### Choose Your Path
- **Web Developer**: Try the [E-commerce Example](../examples/ecommerce.md)
- **Data Scientist**: Explore [Data Processing Patterns](../examples/data-processing.md)
- **DevOps Engineer**: Check [Development Team Coordination](../examples/dev-team.md)

### Advanced Features
- **[Performance Optimization](performance.md)** - Production-ready optimizations
- **[Security Guide](security.md)** - Protect sensitive data
- **[Best Practices](best-practices.md)** - Production deployment patterns

## Need Help?

- **Stuck?** Check the [Troubleshooting Guide](troubleshooting.md)
- **Questions?** Browse the [API Reference](../api/)
- **Examples?** Explore [complete examples](../examples/)

---

**🚀 Ready to build something amazing?** Start with the [tutorials](../tutorials/) or dive into a [real-world example](../examples/)!
