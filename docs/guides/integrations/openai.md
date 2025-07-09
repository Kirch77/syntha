# OpenAI Integration Guide

Complete guide to integrating Syntha with OpenAI's GPT models using function calling.

## Overview

This guide covers:

- Setting up OpenAI with Syntha
- Function calling with GPT models
- Multi-agent conversation flows
- Error handling and best practices
- Production deployment patterns

## Prerequisites

- OpenAI API key
- Syntha SDK installed
- Python 3.8+

```bash
pip install syntha openai
```

## Quick Setup

```python
import openai
import json
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Configure OpenAI
openai.api_key = "your-api-key-here"

# Initialize Syntha
mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
handler = ToolHandler(mesh)
```

## Basic Integration

### Simple Agent with Function Calling

```python
def create_openai_agent(agent_name, mesh, handler):
    """Create an OpenAI-powered agent with Syntha tools"""

    def run_agent(user_message, model="gpt-4"):
        # Get context-aware system prompt
        system_prompt = build_system_prompt(agent_name, mesh)

        # Get tool schemas in OpenAI format
        tools = [{"type": "function", "function": schema}
                 for schema in handler.get_schemas()]

        # Initial conversation
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        # Make OpenAI API call
        response = openai.chat.completions.create(
            model=model,
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        # Handle tool calls
        if response.choices[0].message.tool_calls:
            # Add assistant message with tool calls
            messages.append({
                "role": "assistant",
                "content": response.choices[0].message.content,
                "tool_calls": response.choices[0].message.tool_calls
            })

            # Execute each tool call
            for tool_call in response.choices[0].message.tool_calls:
                try:
                    # Execute the tool
                    result = handler.handle_tool_call(
                        tool_call.function.name,
                        **json.loads(tool_call.function.arguments)
                    )

                    # Add tool result to conversation
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result)
                    })

                except Exception as e:
                    # Handle tool execution errors
                    error_result = {
                        "success": False,
                        "error": str(e),
                        "tool_name": tool_call.function.name
                    }

                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(error_result)
                    })

            # Get final response after tool execution
            final_response = openai.chat.completions.create(
                model=model,
                messages=messages
            )

            return final_response.choices[0].message.content

        return response.choices[0].message.content

    return run_agent

# Create agents
backend_agent = create_openai_agent("Backend", mesh, handler)
frontend_agent = create_openai_agent("Frontend", mesh, handler)
```

## Multi-Agent System Example

### Development Team Coordination

```python
class OpenAIMultiAgentTeam:
    def __init__(self, api_key):
        openai.api_key = api_key

        # Initialize Syntha
        self.mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
        self.handler = ToolHandler(self.mesh)

        # Setup team context
        self.setup_team_context()

        # Create agents
        self.agents = {
            "ProductManager": self.create_agent("ProductManager"),
            "Backend": self.create_agent("Backend"),
            "Frontend": self.create_agent("Frontend"),
            "QA": self.create_agent("QA")
        }

    def setup_team_context(self):
        """Initialize shared team knowledge"""
        # Project context
        self.mesh.push("project", "E-commerce Platform")
        self.mesh.push("sprint", "User Authentication")
        self.mesh.push("deadline", "2025-02-15")

        # Technical context
        self.mesh.push("backend_stack", {
            "framework": "FastAPI",
            "database": "PostgreSQL",
            "cache": "Redis",
            "auth": "OAuth2"
        }, subscribers=["Backend", "ProductManager"])

        self.mesh.push("frontend_stack", {
            "framework": "React",
            "state": "Redux",
            "styling": "Tailwind CSS",
            "auth": "Auth0"
        }, subscribers=["Frontend", "ProductManager"])

    def create_agent(self, agent_name):
        """Create an OpenAI agent with specific role"""

        def agent_function(user_input, conversation_history=None):
            # Build context-aware system prompt
            system_prompt = self.build_agent_prompt(agent_name)

            # Prepare conversation
            messages = [{"role": "system", "content": system_prompt}]

            # Add conversation history if provided
            if conversation_history:
                messages.extend(conversation_history)

            messages.append({"role": "user", "content": user_input})

            # Get tools
            tools = [{"type": "function", "function": schema}
                     for schema in self.handler.get_schemas()]

            # Make API call
            response = openai.chat.completions.create(
                model="gpt-4",
                messages=messages,
                tools=tools,
                temperature=0.1  # Lower temperature for consistent behavior
            )

            # Process tool calls
            return self.process_tool_calls(response, messages)

        return agent_function

    def build_agent_prompt(self, agent_name):
        """Build specialized prompt for each agent type"""
        base_prompt = build_system_prompt(agent_name, self.mesh)

        role_prompts = {
            "ProductManager": """
You are a Product Manager responsible for:
- Defining requirements and priorities
- Coordinating between team members
- Making decisions on feature scope
- Tracking project progress
- Communicating with stakeholders

Always consider business impact and user needs in your responses.
""",
            "Backend": """
You are a Backend Developer responsible for:
- API design and implementation
- Database schema design
- Authentication and security
- Performance optimization
- Integration with external services

Focus on scalability, security, and maintainability.
""",
            "Frontend": """
You are a Frontend Developer responsible for:
- User interface implementation
- User experience optimization
- Integration with backend APIs
- Cross-browser compatibility
- Performance optimization

Focus on usability, accessibility, and performance.
""",
            "QA": """
You are a QA Engineer responsible for:
- Test planning and execution
- Bug identification and reporting
- Quality assurance processes
- Automated testing setup
- User acceptance testing

Focus on thoroughness, edge cases, and user scenarios.
"""
        }

        return base_prompt + "\n\n" + role_prompts.get(agent_name, "")

    def process_tool_calls(self, response, messages):
        """Process OpenAI tool calls with Syntha"""
        assistant_message = response.choices[0].message

        if not assistant_message.tool_calls:
            return assistant_message.content

        # Add assistant message to conversation
        messages.append({
            "role": "assistant",
            "content": assistant_message.content,
            "tool_calls": assistant_message.tool_calls
        })

        # Execute each tool call
        for tool_call in assistant_message.tool_calls:
            try:
                # Parse arguments
                args = json.loads(tool_call.function.arguments)

                # Execute tool
                result = self.handler.handle_tool_call(
                    tool_call.function.name,
                    **args
                )

                # Add result to conversation
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result, indent=2)
                })

            except json.JSONDecodeError as e:
                error_result = {
                    "success": False,
                    "error": f"Invalid JSON in tool arguments: {e}"
                }
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(error_result)
                })

            except Exception as e:
                error_result = {
                    "success": False,
                    "error": f"Tool execution failed: {e}"
                }
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(error_result)
                })

        # Get final response
        final_response = openai.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.1
        )

        return final_response.choices[0].message.content

    def run_workflow(self, workflow_description):
        """Run a coordinated workflow across agents"""
        print(f"🚀 Starting workflow: {workflow_description}")

        # ProductManager analyzes and plans
        pm_response = self.agents["ProductManager"](
            f"Analyze this workflow and create a plan: {workflow_description}"
        )
        print(f"📋 ProductManager: {pm_response}")

        # Backend implements
        backend_response = self.agents["Backend"](
            "Check for new tasks and implement any backend requirements"
        )
        print(f"⚙️ Backend: {backend_response}")

        # Frontend implements
        frontend_response = self.agents["Frontend"](
            "Check for new tasks and implement any frontend requirements"
        )
        print(f"🎨 Frontend: {frontend_response}")

        # QA tests
        qa_response = self.agents["QA"](
            "Check for completed features and perform testing"
        )
        print(f"🧪 QA: {qa_response}")

        return {
            "pm": pm_response,
            "backend": backend_response,
            "frontend": frontend_response,
            "qa": qa_response
        }

# Usage example
team = OpenAIMultiAgentTeam("your-api-key")
results = team.run_workflow("Implement OAuth2 login with Google")
```

## Advanced Patterns

### Streaming Responses

```python
def create_streaming_agent(agent_name, mesh, handler):
    """Create agent with streaming responses"""

    def stream_agent(user_message):
        system_prompt = build_system_prompt(agent_name, mesh)
        tools = [{"type": "function", "function": schema}
                 for schema in handler.get_schemas()]

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        # Stream the response
        stream = openai.chat.completions.create(
            model="gpt-4",
            messages=messages,
            tools=tools,
            stream=True
        )

        collected_chunks = []
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                content = chunk.choices[0].delta.content
                print(content, end="", flush=True)
                collected_chunks.append(content)

        return "".join(collected_chunks)

    return stream_agent
```

### Conversation Memory

```python
class ConversationalAgent:
    def __init__(self, agent_name, mesh, handler, max_history=10):
        self.agent_name = agent_name
        self.mesh = mesh
        self.handler = handler
        self.conversation_history = []
        self.max_history = max_history

    def chat(self, user_message):
        """Chat with memory of previous conversations"""

        # Build system prompt
        system_prompt = build_system_prompt(self.agent_name, self.mesh)

        # Prepare messages with history
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(self.conversation_history[-self.max_history:])
        messages.append({"role": "user", "content": user_message})

        # Get tools
        tools = [{"type": "function", "function": schema}
                 for schema in self.handler.get_schemas()]

        # Make API call
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=messages,
            tools=tools
        )

        # Process tool calls and get final response
        final_response = self.process_response(response, messages)

        # Update conversation history
        self.conversation_history.append({"role": "user", "content": user_message})
        self.conversation_history.append({"role": "assistant", "content": final_response})

        return final_response

    def process_response(self, response, messages):
        """Process response and handle tool calls"""
        assistant_message = response.choices[0].message

        if not assistant_message.tool_calls:
            return assistant_message.content

        # Handle tool calls (similar to previous examples)
        # ... (implementation similar to above)

        return "Response after tool execution"

    def reset_conversation(self):
        """Clear conversation history"""
        self.conversation_history = []

# Usage
agent = ConversationalAgent("Developer", mesh, handler)
response1 = agent.chat("What's my current task?")
response2 = agent.chat("Update the status to 50% complete")
```

## Error Handling

### Comprehensive Error Management

```python
class RobustOpenAIAgent:
    def __init__(self, agent_name, mesh, handler, api_key):
        self.agent_name = agent_name
        self.mesh = mesh
        self.handler = handler
        openai.api_key = api_key

        # Rate limiting
        self.last_request_time = 0
        self.min_request_interval = 1.0  # seconds

    def safe_api_call(self, **kwargs):
        """Make API call with error handling and rate limiting"""
        import time

        # Rate limiting
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        if time_since_last < self.min_request_interval:
            time.sleep(self.min_request_interval - time_since_last)

        max_retries = 3
        for attempt in range(max_retries):
            try:
                self.last_request_time = time.time()
                return openai.chat.completions.create(**kwargs)

            except openai.RateLimitError as e:
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    print(f"Rate limit hit, waiting {wait_time}s...")
                    time.sleep(wait_time)
                    continue
                raise e

            except openai.APIConnectionError as e:
                if attempt < max_retries - 1:
                    print(f"Connection error, retrying... ({attempt + 1}/{max_retries})")
                    time.sleep(1)
                    continue
                raise e

            except openai.InvalidRequestError as e:
                print(f"Invalid request: {e}")
                raise e

            except Exception as e:
                print(f"Unexpected error: {e}")
                if attempt < max_retries - 1:
                    time.sleep(1)
                    continue
                raise e

    def run(self, user_message):
        """Run agent with comprehensive error handling"""
        try:
            # Build prompt and tools
            system_prompt = build_system_prompt(self.agent_name, self.mesh)
            tools = [{"type": "function", "function": schema}
                     for schema in self.handler.get_schemas()]

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]

            # Make safe API call
            response = self.safe_api_call(
                model="gpt-4",
                messages=messages,
                tools=tools,
                timeout=30
            )

            # Handle tool calls safely
            return self.safe_tool_execution(response, messages)

        except Exception as e:
            error_message = f"Agent {self.agent_name} failed: {str(e)}"
            print(error_message)

            # Log error to context for debugging
            self.handler.handle_tool_call("push_context",
                key=f"error_{self.agent_name}_{int(time.time())}",
                value={
                    "agent": self.agent_name,
                    "error": str(e),
                    "user_message": user_message,
                    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
                }
            )

            return f"I encountered an error: {str(e)}. Please try again."

    def safe_tool_execution(self, response, messages):
        """Safely execute tool calls"""
        assistant_message = response.choices[0].message

        if not assistant_message.tool_calls:
            return assistant_message.content

        # Process tool calls with error handling
        messages.append({
            "role": "assistant",
            "content": assistant_message.content,
            "tool_calls": assistant_message.tool_calls
        })

        for tool_call in assistant_message.tool_calls:
            try:
                # Validate arguments
                args = json.loads(tool_call.function.arguments)

                # Execute tool with timeout
                result = self.handler.handle_tool_call(
                    tool_call.function.name,
                    **args
                )

                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result)
                })

            except json.JSONDecodeError:
                error_result = {"success": False, "error": "Invalid JSON arguments"}
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(error_result)
                })

            except Exception as e:
                error_result = {"success": False, "error": f"Tool failed: {str(e)}"}
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(error_result)
                })

        # Get final response
        try:
            final_response = self.safe_api_call(
                model="gpt-4",
                messages=messages
            )
            return final_response.choices[0].message.content
        except Exception as e:
            return f"Failed to get final response: {str(e)}"
```

## Production Best Practices

### Configuration Management

```python
import os
from dataclasses import dataclass

@dataclass
class OpenAIConfig:
    api_key: str
    model: str = "gpt-4"
    temperature: float = 0.1
    max_tokens: int = 2000
    timeout: int = 30
    max_retries: int = 3

def create_production_agent(agent_name, config: OpenAIConfig):
    """Create production-ready agent with proper configuration"""

    # Initialize with environment-specific settings
    mesh = ContextMesh(
        enable_indexing=True,
        auto_cleanup=True
    )
    handler = ToolHandler(mesh)

    # Set API key
    openai.api_key = config.api_key

    def production_agent(user_message, conversation_id=None):
        """Production agent with logging and monitoring"""
        import time
        import uuid

        request_id = str(uuid.uuid4())
        start_time = time.time()

        try:
            # Log request
            print(f"[{request_id}] Agent {agent_name} processing: {user_message[:100]}...")

            # Build context
            system_prompt = build_system_prompt(agent_name, mesh)
            tools = [{"type": "function", "function": schema}
                     for schema in handler.get_schemas()]

            # Make API call with configuration
            response = openai.chat.completions.create(
                model=config.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                tools=tools,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                timeout=config.timeout
            )

            # Process response
            result = process_tool_calls(response, handler)

            # Log success
            duration = time.time() - start_time
            print(f"[{request_id}] Completed in {duration:.2f}s")

            return result

        except Exception as e:
            # Log error
            duration = time.time() - start_time
            print(f"[{request_id}] Failed after {duration:.2f}s: {e}")

            # Return graceful error response
            return f"I'm having trouble processing that request. Please try again."

    return production_agent

# Environment-specific configurations
configs = {
    "development": OpenAIConfig(
        api_key=os.getenv("OPENAI_API_KEY_DEV"),
        model="gpt-3.5-turbo",
        temperature=0.2
    ),
    "production": OpenAIConfig(
        api_key=os.getenv("OPENAI_API_KEY_PROD"),
        model="gpt-4",
        temperature=0.1,
        max_tokens=1000
    )
}

# Create agent based on environment
env = os.getenv("ENVIRONMENT", "development")
agent = create_production_agent("ProductionAgent", configs[env])
```

## Testing

### Unit Tests for OpenAI Integration

```python
import unittest
from unittest.mock import Mock, patch

class TestOpenAIIntegration(unittest.TestCase):
    def setUp(self):
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh)

    @patch('openai.chat.completions.create')
    def test_basic_agent_response(self, mock_openai):
        """Test basic agent response without tool calls"""
        # Mock OpenAI response
        mock_response = Mock()
        mock_response.choices = [Mock()]
        mock_response.choices[0].message.content = "Hello, I'm ready to help!"
        mock_response.choices[0].message.tool_calls = None
        mock_openai.return_value = mock_response

        # Create and test agent
        agent = create_openai_agent("TestAgent", self.mesh, self.handler)
        response = agent("Hello")

        self.assertEqual(response, "Hello, I'm ready to help!")
        mock_openai.assert_called_once()

    @patch('openai.chat.completions.create')
    def test_agent_with_tool_calls(self, mock_openai):
        """Test agent handling tool calls"""
        # Mock OpenAI response with tool call
        mock_tool_call = Mock()
        mock_tool_call.id = "call_123"
        mock_tool_call.function.name = "push_context"
        mock_tool_call.function.arguments = '{"key": "test", "value": "data"}'

        mock_response = Mock()
        mock_response.choices = [Mock()]
        mock_response.choices[0].message.content = "I'll update the context"
        mock_response.choices[0].message.tool_calls = [mock_tool_call]

        # Mock second response after tool execution
        mock_final_response = Mock()
        mock_final_response.choices = [Mock()]
        mock_final_response.choices[0].message.content = "Context updated successfully"

        mock_openai.side_effect = [mock_response, mock_final_response]

        # Test agent
        agent = create_openai_agent("TestAgent", self.mesh, self.handler)
        response = agent("Update context with test data")

        # Verify tool was executed
        self.assertEqual(self.mesh.get("test"), "data")
        self.assertEqual(response, "Context updated successfully")

if __name__ == "__main__":
    unittest.main()
```

## Performance Optimization

### Optimize for Production

```python
class OptimizedOpenAIAgent:
    def __init__(self, agent_name, mesh, handler):
        self.agent_name = agent_name
        self.mesh = mesh
        self.handler = handler

        # Cache system prompts
        self._cached_prompt = None
        self._prompt_cache_time = 0
        self._prompt_cache_ttl = 300  # 5 minutes

        # Tool schema cache
        self._cached_tools = None

    def get_system_prompt(self):
        """Get cached system prompt"""
        import time

        current_time = time.time()
        if (self._cached_prompt is None or
            current_time - self._prompt_cache_time > self._prompt_cache_ttl):

            self._cached_prompt = build_system_prompt(self.agent_name, self.mesh)
            self._prompt_cache_time = current_time

        return self._cached_prompt

    def get_tools(self):
        """Get cached tool schemas"""
        if self._cached_tools is None:
            self._cached_tools = [{"type": "function", "function": schema}
                                  for schema in self.handler.get_schemas()]
        return self._cached_tools

    def run(self, user_message):
        """Optimized agent execution"""
        # Use cached prompts and tools
        system_prompt = self.get_system_prompt()
        tools = self.get_tools()

        # Optimized API call
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            tools=tools,
            temperature=0.1,  # Lower temperature for consistency
            max_tokens=1000   # Limit response length
        )

        return self.process_response_optimized(response)
```

## Troubleshooting

### Common Issues and Solutions

```python
def diagnose_openai_integration():
    """Diagnose common OpenAI integration issues"""

    print("🔍 Diagnosing OpenAI + Syntha integration...")

    # Check 1: API Key
    try:
        response = openai.models.list()
        print("✅ OpenAI API key is valid")
    except Exception as e:
        print(f"❌ OpenAI API key issue: {e}")
        return

    # Check 2: Syntha components
    try:
        mesh = ContextMesh()
        handler = ToolHandler(mesh)
        schemas = handler.get_schemas()
        print(f"✅ Syntha working - {len(schemas)} tools available")
    except Exception as e:
        print(f"❌ Syntha issue: {e}")
        return

    # Check 3: Tool schema format
    try:
        tools = [{"type": "function", "function": schema}
                 for schema in handler.get_schemas()]
        print("✅ Tool schemas formatted correctly")
    except Exception as e:
        print(f"❌ Tool schema format issue: {e}")
        return

    # Check 4: Basic integration
    try:
        mesh.push("test", "value")
        prompt = build_system_prompt("TestAgent", mesh)

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": "Say hello"}
            ],
            max_tokens=50
        )

        print("✅ Basic OpenAI + Syntha integration working")
        print(f"Test response: {response.choices[0].message.content}")

    except Exception as e:
        print(f"❌ Integration test failed: {e}")

# Run diagnostics
diagnose_openai_integration()
```

## Next Steps

After mastering OpenAI integration:

1. **[Anthropic Claude Integration](anthropic.md)** - Compare with Claude
2. **[LangGraph Integration](langgraph.md)** - State management patterns
3. **[Production Deployment](../best-practices.md)** - Scale your system

---

**Questions?** Check the [Troubleshooting Guide](../troubleshooting.md) or explore more [integration examples](./)
