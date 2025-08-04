#!/usr/bin/env python3
"""
Framework Integration Examples

This example demonstrates how Syntha tools integrate seamlessly with:
1. OpenAI Function Calling
2. LangChain Tools
3. LangGraph Tools
4. Custom Tool Decorators

Key integration patterns:
- Non-destructive: Existing tools remain unchanged
- Automatic merging: Syntha tools are added to existing tool sets
- Conflict resolution: Automatic renaming to avoid conflicts
- Access control: Role-based permissions for different agents
"""

import json
from typing import Dict, Any, List
from syntha import ContextMesh, ToolHandler, build_system_prompt

# ============================================================================
# 1. OPENAI FUNCTION CALLING INTEGRATION
# ============================================================================


def openai_integration_example():
    """Show how to integrate Syntha with OpenAI's function calling."""
    print("🚀 OpenAI Function Calling Integration")
    print("=" * 50)

    # Initialize Syntha
    mesh = ContextMesh()
    syntha_handler = ToolHandler(mesh, agent_name="MarketingBot")

    # Your existing OpenAI tools (unchanged)
    existing_tools = [
        {
            "type": "function",
            "function": {
                "name": "send_email",
                "description": "Send an email to a recipient",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "to": {"type": "string"},
                        "subject": {"type": "string"},
                        "body": {"type": "string"},
                    },
                    "required": ["to", "subject", "body"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get current weather for a location",
                "parameters": {
                    "type": "object",
                    "properties": {"location": {"type": "string"}},
                    "required": ["location"],
                },
            },
        },
    ]

    # Convert existing tools to the format Syntha expects
    existing_tool_schemas = []
    for tool in existing_tools:
        existing_tool_schemas.append(
            {
                "name": tool["function"]["name"],
                "description": tool["function"]["description"],
                "parameters": tool["function"]["parameters"],
            }
        )

    # Merge Syntha tools with existing tools (automatic conflict resolution)
    all_tools = syntha_handler.get_schemas(merge_with=existing_tool_schemas)

    print(f"📦 Original tools: {len(existing_tools)}")
    print(f"🔧 Syntha tools: {len(syntha_handler.get_syntha_schemas_only())}")
    print(f"🎯 Combined tools: {len(all_tools)}")

    # Show the merged tool list
    print("\n📋 Available Tools:")
    for tool in all_tools:
        if "function" in tool:  # OpenAI format
            tool_name = tool["function"]["name"]
            description = tool["function"]["description"]
        else:  # Direct schema format
            tool_name = tool["name"]
            description = tool["description"]

        is_syntha = tool_name in syntha_handler.get_available_tools()
        prefix = "[Syntha]" if is_syntha else "[Existing]"
        print(f"  {prefix} {tool_name}: {description}")

    # Simulate OpenAI API call
    print("\n🤖 Simulated OpenAI API Call:")
    print("openai.chat.completions.create(")
    print("    model='gpt-4',")
    print("    messages=[...],")
    print(f"    tools={all_tools}  # All tools merged automatically")
    print(")")

    return all_tools


# ============================================================================
# 2. LANGCHAIN TOOLS INTEGRATION
# ============================================================================


def langchain_integration_example():
    """Show how to integrate Syntha with LangChain tools."""
    print("\n\n🔗 LangChain Tools Integration")
    print("=" * 50)

    mesh = ContextMesh()
    syntha_handler = ToolHandler(mesh, agent_name="DataAnalyst")

    # Your existing LangChain tools (using @tool decorator)
    class ExistingLangChainTools:
        @staticmethod
        def send_email(to: str, subject: str, body: str) -> str:
            """Send an email to a recipient."""
            return f"Email sent to {to}: {subject}"

        @staticmethod
        def get_weather(location: str) -> str:
            """Get current weather for a location."""
            return f"Weather in {location}: Sunny, 72°F"

    # Convert existing tools to schemas
    existing_langchain_tools = [
        {
            "name": "send_email",
            "description": "Send an email to a recipient",
            "parameters": {
                "type": "object",
                "properties": {
                    "to": {"type": "string"},
                    "subject": {"type": "string"},
                    "body": {"type": "string"},
                },
                "required": ["to", "subject", "body"],
            },
        },
        {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {"location": {"type": "string"}},
                "required": ["location"],
            },
        },
    ]

    # Merge with Syntha tools
    all_tools = syntha_handler.get_schemas(merge_with=existing_langchain_tools)

    print(f"📦 LangChain tools: {len(existing_langchain_tools)}")
    print(f"🔧 Syntha tools: {len(syntha_handler.get_syntha_schemas_only())}")
    print(f"🎯 Combined tools: {len(all_tools)}")

    # Create hybrid handler for LangChain
    existing_tool_handler = ExistingLangChainTools()
    hybrid_handler = syntha_handler.create_hybrid_handler(
        user_tool_handler=lambda tool_name, **kwargs: getattr(
            existing_tool_handler, tool_name
        )(**kwargs)
    )

    print("\n🔄 Hybrid Handler Example:")
    print("result = hybrid_handler('get_context', agent_name='DataAnalyst')")
    print(
        "result = hybrid_handler('send_email', to='user@example.com', subject='Test', body='Hello')"
    )

    return hybrid_handler, all_tools


# ============================================================================
# 3. LANGGRAPH TOOLS INTEGRATION
# ============================================================================


def langgraph_integration_example():
    """Show how to integrate Syntha with LangGraph tools."""
    print("\n\n🌐 LangGraph Tools Integration")
    print("=" * 50)

    mesh = ContextMesh()

    # Create multiple agents with different access levels
    agent_configs = {
        "Manager": {
            "agent_name": "Manager",
            "allowed_tools": [
                "get_context",
                "push_context",
                "list_context",
                "delete_topic",
            ],
            "role": "admin",
        },
        "Analyst": {
            "agent_name": "Analyst",
            "allowed_tools": [
                "get_context",
                "push_context",
                "list_context",
                "subscribe_to_topics",
            ],
            "role": "contributor",
        },
        "Viewer": {
            "agent_name": "Viewer",
            "allowed_tools": ["get_context", "list_context", "discover_topics"],
            "role": "readonly",
        },
    }

    # Create handlers for each agent
    from syntha.tools import create_multi_agent_handlers

    agent_handlers = create_multi_agent_handlers(mesh, agent_configs)

    print("👥 Multi-Agent Setup:")
    for agent_name, handler in agent_handlers.items():
        available_tools = handler.get_available_tools()
        print(f"  {agent_name}: {available_tools}")

    # Your existing LangGraph tools
    existing_langgraph_tools = [
        {
            "name": "process_data",
            "description": "Process data files",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string"},
                    "operation": {
                        "type": "string",
                        "enum": ["analyze", "transform", "validate"],
                    },
                },
                "required": ["file_path", "operation"],
            },
        }
    ]

    # Merge tools for each agent
    print("\n📋 Tools per Agent:")
    for agent_name, handler in agent_handlers.items():
        all_tools = handler.get_schemas(merge_with=existing_langgraph_tools)
        print(f"  {agent_name}: {len(all_tools)} tools total")

    return agent_handlers


# ============================================================================
# 4. CUSTOM TOOL DECORATOR INTEGRATION
# ============================================================================


def custom_decorator_integration_example():
    """Show how to integrate with custom tool decorators."""
    print("\n\n🎨 Custom Tool Decorator Integration")
    print("=" * 50)

    mesh = ContextMesh()
    syntha_handler = ToolHandler(mesh, agent_name="Developer")

    # Simulate a custom tool decorator system
    class CustomToolDecorator:
        def __init__(self):
            self.tools = {}

        def tool(self, name: str, description: str = ""):
            def decorator(func):
                self.tools[name] = {
                    "function": func,
                    "description": description,
                    "name": name,
                }
                return func

            return decorator

        def get_tool_schemas(self):
            schemas = []
            for name, tool_info in self.tools.items():
                schemas.append(
                    {
                        "name": name,
                        "description": tool_info["description"],
                        "parameters": {
                            "type": "object",
                            "properties": {"input": {"type": "string"}},
                            "required": ["input"],
                        },
                    }
                )
            return schemas

        def execute_tool(self, name: str, **kwargs):
            if name in self.tools:
                return self.tools[name]["function"](**kwargs)
            return {"error": f"Tool {name} not found"}

    # Create custom tool decorator instance
    custom_tools = CustomToolDecorator()

    # Define tools using the decorator
    @custom_tools.tool("deploy_app", "Deploy application to production")
    def deploy_app(input: str):
        return f"Deployed: {input}"

    @custom_tools.tool("run_tests", "Run test suite")
    def run_tests(input: str):
        return f"Tests completed: {input}"

    # Merge with Syntha tools
    existing_custom_tools = custom_tools.get_tool_schemas()
    all_tools = syntha_handler.get_schemas(merge_with=existing_custom_tools)

    print(f"📦 Custom decorator tools: {len(existing_custom_tools)}")
    print(f"🔧 Syntha tools: {len(syntha_handler.get_syntha_schemas_only())}")
    print(f"🎯 Combined tools: {len(all_tools)}")

    # Create hybrid handler
    hybrid_handler = syntha_handler.create_hybrid_handler(
        user_tool_handler=custom_tools.execute_tool
    )

    print("\n🔄 Hybrid Handler with Custom Decorators:")
    print("result = hybrid_handler('get_context', agent_name='Developer')")
    print("result = hybrid_handler('deploy_app', input='my-app-v1.0')")

    return hybrid_handler, all_tools


# ============================================================================
# 5. ROLE-BASED ACCESS CONTROL EXAMPLE
# ============================================================================


def role_based_access_example():
    """Show role-based access control with existing tools."""
    print("\n\n🔐 Role-Based Access Control")
    print("=" * 50)

    mesh = ContextMesh()

    # Define roles with different access levels
    roles = {
        "admin": {
            "description": "Full access including destructive operations",
            "tools": [
                "get_context",
                "push_context",
                "list_context",
                "delete_topic",
                "send_email",
                "deploy_app",
            ],
        },
        "contributor": {
            "description": "Can read, write, and manage topic subscriptions",
            "tools": [
                "get_context",
                "push_context",
                "list_context",
                "subscribe_to_topics",
                "send_email",
            ],
        },
        "readonly": {
            "description": "Read-only access to context and discovery",
            "tools": ["get_context", "list_context", "discover_topics", "get_weather"],
        },
        "viewer": {
            "description": "Basic read access",
            "tools": ["get_context", "list_context"],
        },
    }

    # Create handlers for different roles
    from syntha.tools import create_role_based_handler

    print("👥 Role-Based Access:")
    for role in ["admin", "contributor", "readonly", "viewer"]:
        handler = create_role_based_handler(mesh, "Agent", role, custom_roles=roles)
        available_tools = handler.get_available_tools()
        print(f"  {role}: {available_tools}")

    # Show how existing tools are filtered by role
    existing_tools = [
        {"name": "send_email", "description": "Send email"},
        {"name": "deploy_app", "description": "Deploy application"},
        {"name": "get_weather", "description": "Get weather"},
    ]

    print("\n📋 Tools by Role (with existing tools):")
    for role in ["admin", "contributor", "readonly"]:
        handler = create_role_based_handler(mesh, "Agent", role, custom_roles=roles)
        all_tools = handler.get_schemas(merge_with=existing_tools)
        print(f"  {role}: {len(all_tools)} tools total")


# ============================================================================
# 6. CONFLICT RESOLUTION EXAMPLE
# ============================================================================


def conflict_resolution_example():
    """Show how Syntha handles tool name conflicts."""
    print("\n\n⚔️ Conflict Resolution Example")
    print("=" * 50)

    mesh = ContextMesh()
    syntha_handler = ToolHandler(mesh, agent_name="User")

    # Create existing tools that conflict with Syntha tool names
    conflicting_tools = [
        {
            "name": "get_context",  # Conflicts with Syntha's get_context
            "description": "Get user context from external system",
            "parameters": {
                "type": "object",
                "properties": {"user_id": {"type": "string"}},
                "required": ["user_id"],
            },
        },
        {
            "name": "push_context",  # Conflicts with Syntha's push_context
            "description": "Push data to external context system",
            "parameters": {
                "type": "object",
                "properties": {"data": {"type": "string"}},
                "required": ["data"],
            },
        },
    ]

    # Merge tools (automatic conflict resolution)
    all_tools = syntha_handler.get_schemas(merge_with=conflicting_tools)

    print("🔧 Original Syntha tools:")
    for tool in syntha_handler.get_syntha_schemas_only():
        print(f"  {tool['name']}: {tool['description']}")

    print("\n📦 Existing conflicting tools:")
    for tool in conflicting_tools:
        print(f"  {tool['name']}: {tool['description']}")

    print("\n🎯 Merged tools (conflicts resolved):")
    for tool in all_tools:
        is_renamed = tool["name"].startswith("syntha_")
        prefix = "[Renamed]" if is_renamed else "[Original]"
        print(f"  {prefix} {tool['name']}: {tool['description']}")

    # Show how to handle renamed tools
    print("\n🔄 Using renamed tools:")
    print(
        "result = syntha_handler.handle_tool_call('syntha_get_context', agent_name='User')"
    )
    print("result = syntha_handler.handle_tool_call('get_context', user_id='123')")


# ============================================================================
# MAIN DEMONSTRATION
# ============================================================================


def main():
    """Run all integration examples."""
    print("🚀 Syntha Framework Integration Examples")
    print("=" * 60)
    print("This demonstrates how Syntha tools integrate seamlessly with")
    print("existing frameworks without replacing or breaking existing tools.\n")

    # Run all examples
    openai_integration_example()
    langchain_integration_example()
    langgraph_integration_example()
    custom_decorator_integration_example()
    role_based_access_example()
    conflict_resolution_example()

    print("\n" + "=" * 60)
    print("✅ All integration examples completed!")
    print("\nKey Benefits:")
    print("• Non-destructive: Existing tools remain unchanged")
    print("• Automatic merging: Syntha tools added to existing sets")
    print("• Conflict resolution: Automatic renaming to avoid conflicts")
    print("• Access control: Role-based permissions for different agents")
    print("• Framework agnostic: Works with any tool decorator system")


if __name__ == "__main__":
    main()
