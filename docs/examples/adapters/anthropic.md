# Anthropic Integration

This example demonstrates how to integrate Syntha with Anthropic's Claude models using tool use capabilities.

## Overview

The Anthropic integration provides:
- Tool use compatibility with Claude models
- Automatic tool generation for context operations
- Seamless context sharing across conversations
- Support for Claude 3 and Claude 2 models

## Basic Setup

```python
import anthropic
from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter

# Initialize Syntha
mesh = ContextMesh(user_id="anthropic_user")
handler = ToolHandler(mesh, "Claude_Assistant")

# Create Anthropic adapter
adapter = create_framework_adapter("anthropic", handler)
tools = adapter.create_tools()

print(f"Created {len(tools)} Anthropic tools")
```

## Complete Integration Example

```python
#!/usr/bin/env python3
"""
Anthropic + Syntha Integration Example
"""

import anthropic
import json
from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter

class AnthropicSynthaAgent:
    def __init__(self, api_key: str, user_id: str, agent_name: str):
        # Initialize Anthropic client
        self.client = anthropic.Anthropic(api_key=api_key)
        
        # Initialize Syntha
        self.mesh = ContextMesh(user_id=user_id)
        self.handler = ToolHandler(self.mesh, agent_name)
        
        # Create Anthropic-compatible tools
        adapter = create_framework_adapter("anthropic", self.handler)
        self.tools = adapter.create_tools()
        self.adapter = adapter
        
        print(f"🤖 Anthropic Agent initialized with {len(self.tools)} tools")
    
    def chat_with_context(self, message: str, model: str = "claude-3-sonnet-20240229") -> str:
        """Send a message to Claude with context management tools."""
        
        try:
            response = self.client.messages.create(
                model=model,
                max_tokens=1000,
                system="You are a helpful assistant with access to context management. Use the available tools to store and retrieve information.",
                messages=[{"role": "user", "content": message}],
                tools=self.tools
            )
            
            # Handle tool use
            if response.stop_reason == "tool_use":
                # Execute tools and get final response
                tool_results = []
                
                for content_block in response.content:
                    if content_block.type == "tool_use":
                        tool_name = content_block.name
                        tool_input = content_block.input
                        
                        print(f"🔧 Executing tool: {tool_name}")
                        result = self.execute_tool(tool_name, tool_input)
                        
                        tool_results.append({
                            "tool_use_id": content_block.id,
                            "content": json.dumps(result)
                        })
                
                # Continue conversation with tool results
                messages = [
                    {"role": "user", "content": message},
                    {"role": "assistant", "content": response.content},
                    {"role": "user", "content": tool_results}
                ]
                
                final_response = self.client.messages.create(
                    model=model,
                    max_tokens=1000,
                    messages=messages,
                    tools=self.tools
                )
                
                return final_response.content[0].text
            
            else:
                return response.content[0].text
                
        except Exception as e:
            return f"Error: {str(e)}"
    
    def execute_tool(self, tool_name: str, tool_input: dict):
        """Execute a Syntha tool called by Claude."""
        
        try:
            # Map tool names to handler methods
            if tool_name == "push_context":
                self.handler.push_context(
                    tool_input["context_key"],
                    tool_input["context_data"],
                    topic=tool_input.get("topic")
                )
                return {"status": "success", "message": "Context stored"}
            
            elif tool_name == "get_context":
                result = self.handler.get_context(tool_input["context_key"])
                return {"status": "success", "data": result}
            
            elif tool_name == "list_context_keys":
                result = self.handler.list_context_keys()
                return {"status": "success", "keys": result}
            
            # Add other tool implementations as needed
            
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    def cleanup(self):
        """Clean up resources."""
        self.mesh.close()

def main():
    """Demonstrate Anthropic integration."""
    
    print("🤖 Anthropic + Syntha Integration")
    print("=" * 35)
    
    # Note: Requires ANTHROPIC_API_KEY environment variable
    try:
        agent = AnthropicSynthaAgent(
            api_key="your-anthropic-api-key",
            user_id="anthropic_demo",
            agent_name="ClaudeAssistant"
        )
        
        # Demo conversation
        response = agent.chat_with_context(
            "Please store my preference for dark mode and remember that I'm a Python developer."
        )
        print(f"Claude: {response}")
        
        agent.cleanup()
        
    except Exception as e:
        print(f"Error: {e}")
        print("Note: Requires valid Anthropic API key")

if __name__ == "__main__":
    main()
```

## See Also

- [OpenAI Integration](openai.md)
- [Framework Adapters](../../user-guide/concepts/adapters.md)
