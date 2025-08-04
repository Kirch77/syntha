#!/usr/bin/env python3
"""
Automatic Framework Integration Examples

This example demonstrates Syntha's new automatic framework integration capabilities.
With the new system, users can integrate Syntha with any supported framework in just
a few lines of code, without manual tool creation or parameter conversion.

Key Features Demonstrated:
1. One-line framework integration
2. Automatic tool generation
3. Parameter conversion
4. Error handling and validation
5. Hybrid integrations with existing tools
6. Multiple framework support

Before/After Comparison:
- BEFORE: 50+ lines of manual tool creation and parameter handling
- AFTER: 1-3 lines for complete integration
"""

import json
import sys
from typing import Any, Dict, List

# Add the parent directory to the path so we can import syntha
sys.path.insert(0, "..")

# Import Syntha components
from syntha import ContextMesh, ToolHandler


def demonstrate_langchain_integration():
    """
    Demonstrate automatic LangChain integration.

    BEFORE (manual approach):
    - Create custom BaseTool subclasses
    - Handle parameter conversion
    - Manage schema mapping
    - Handle errors manually

    AFTER (automatic approach):
    - One line: handler.get_langchain_tools()
    """
    print("🚀 LangChain Integration - Automatic Approach")
    print("=" * 60)

    # Setup Syntha (same as before)
    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="LangChainAgent")

    # Add some test context
    mesh.push(
        "user_preferences", {"theme": "dark", "language": "en"}, subscribers=["system"]
    )
    mesh.push(
        "project_status",
        {"phase": "development", "progress": 75},
        subscribers=["system"],
    )

    # OLD WAY (commented out for comparison):
    # class SynthaGetContextTool(BaseTool):
    #     name = "get_context"
    #     description = "Retrieve context data"
    #     args_schema: Type[BaseModel] = GetContextInput
    #
    #     def _run(self, keys: Optional[List[str]] = None) -> str:
    #         # Manual parameter handling and conversion
    #         result = handler.handle_tool_call("get_context", keys=keys)
    #         return json.dumps(result)
    #
    # langchain_tools = [SynthaGetContextTool(), ...]  # Repeat for each tool

    # NEW WAY - Just one line! 🎉
    try:
        langchain_tools = handler.get_langchain_tools()

        print(f"✅ Created {len(langchain_tools)} LangChain tools automatically!")
        print("\n📋 Available Tools:")
        for tool in langchain_tools:
            print(f"  • {tool.name}: {tool.description}")

        # Test a tool
        print("\n🧪 Testing get_context tool:")
        get_context_tool = next(
            tool for tool in langchain_tools if tool.name == "get_context"
        )
        result = get_context_tool._run()
        print(f"Result: {result[:100]}...")

        return langchain_tools

    except Exception as e:
        print(f"❌ LangChain not installed: {e}")
        print("💡 Install with: pip install langchain")
        return []


def demonstrate_openai_integration():
    """
    Demonstrate automatic OpenAI function calling integration.
    """
    print("\n\n🤖 OpenAI Function Calling - Automatic Approach")
    print("=" * 60)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="OpenAIAgent")

    # NEW WAY - One line for all OpenAI functions! 🎉
    openai_functions = handler.get_openai_functions()

    print(f"✅ Created {len(openai_functions)} OpenAI functions automatically!")
    print("\n📋 Available Functions:")
    for func in openai_functions:
        func_def = func["function"]
        print(f"  • {func_def['name']}: {func_def['description']}")

    # Get function handler for processing calls
    openai_handler = handler.get_framework_handler("openai")

    print("\n🧪 Testing function call:")
    result = openai_handler("list_context", "{}")
    print(f"Result: {json.dumps(result, indent=2)}")

    return openai_functions, openai_handler


def demonstrate_anthropic_integration():
    """
    Demonstrate automatic Anthropic Claude tool integration.
    """
    print("\n\n🤖 Anthropic Claude Tools - Automatic Approach")
    print("=" * 60)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="AnthropicAgent")

    # NEW WAY - One line for all Anthropic tools! 🎉
    anthropic_tools = handler.get_anthropic_tools()

    print(f"✅ Created {len(anthropic_tools)} Anthropic tools automatically!")
    print("\n📋 Available Tools:")
    for tool in anthropic_tools:
        print(f"  • {tool['name']}: {tool['description']}")

    # Get tool handler for processing calls
    anthropic_handler = handler.get_framework_handler("anthropic")

    print("\n🧪 Testing tool use:")
    result = anthropic_handler("discover_topics", {})
    print(f"Result: {json.dumps(result, indent=2)}")

    return anthropic_tools, anthropic_handler


def demonstrate_multi_framework_support():
    """
    Demonstrate getting tools for multiple frameworks from the same handler.
    """
    print("\n\n🌐 Multi-Framework Support")
    print("=" * 60)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="MultiFrameworkAgent")

    # Get supported frameworks
    frameworks = handler.get_supported_frameworks()
    print(f"📦 Supported frameworks: {frameworks}")

    # Get tools for each framework
    framework_tools = {}
    for framework in frameworks:
        try:
            tools = handler.get_tools_for_framework(framework)
            framework_tools[framework] = tools
            print(f"✅ {framework}: {len(tools)} tools")
        except Exception as e:
            print(f"⚠️  {framework}: {e}")

    return framework_tools


def demonstrate_validation_and_error_handling():
    """
    Demonstrate framework validation and error handling.
    """
    print("\n\n🔍 Framework Validation & Error Handling")
    print("=" * 60)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="ValidationAgent")

    # Validate different frameworks
    frameworks_to_check = ["langchain", "openai", "anthropic", "nonexistent"]

    for framework in frameworks_to_check:
        print(f"\n🔍 Validating {framework}:")
        result = handler.validate_framework(framework)

        if result["valid"]:
            print(f"  ✅ {framework} is ready!")
            print(f"  📊 Available tools: {len(result['available_tools'])}")
        else:
            print(f"  ❌ {framework} issue: {result['error']}")
            if "suggestion" in result:
                print(f"  💡 Suggestion: {result['suggestion']}")


def demonstrate_hybrid_integration():
    """
    Demonstrate hybrid integration with existing tools.
    """
    print("\n\n🔄 Hybrid Integration with Existing Tools")
    print("=" * 60)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="HybridAgent")

    # Simulate existing tools (in real usage, these would be actual framework tools)
    existing_tools = [
        {
            "name": "weather_tool",
            "description": "Get current weather",
            "type": "existing",
        },
        {"name": "email_tool", "description": "Send emails", "type": "existing"},
    ]

    print(f"📦 Existing tools: {len(existing_tools)}")

    # Create hybrid integration for OpenAI (works with any framework)
    integration = handler.create_framework_integration("openai", existing_tools)

    print(f"✅ Hybrid integration created!")
    print(f"  📊 Total tools: {integration['total_tools']}")
    print(f"  🔧 Syntha tools: {integration['syntha_tool_count']}")
    print(f"  📦 Existing tools: {integration['existing_tool_count']}")

    # Show all tools
    print("\n📋 Combined Tool List:")
    for i, tool in enumerate(integration["tools"], 1):
        if isinstance(tool, dict):
            if "function" in tool:  # OpenAI format
                name = tool["function"]["name"]
                desc = tool["function"]["description"]
            else:  # Direct format
                name = tool.get("name", f"tool_{i}")
                desc = tool.get("description", "No description")
        else:
            name = getattr(tool, "name", f"tool_{i}")
            desc = getattr(tool, "description", "No description")

        source = "Syntha" if name in handler.get_available_tools() else "Existing"
        print(f"  {i}. [{source}] {name}: {desc}")

    return integration


def demonstrate_role_based_framework_access():
    """
    Demonstrate how role-based access control works with framework integration.
    """
    print("\n\n🔐 Role-Based Framework Access")
    print("=" * 60)

    mesh = ContextMesh()

    # Create handlers with different access levels
    admin_handler = ToolHandler(
        mesh,
        agent_name="AdminAgent",
        allowed_tools=["get_context", "push_context", "list_context", "delete_topic"],
    )

    readonly_handler = ToolHandler(
        mesh,
        agent_name="ReadOnlyAgent",
        allowed_tools=["get_context", "list_context", "discover_topics"],
    )

    # Get tools for each role
    print("👑 Admin Agent Tools:")
    admin_tools = admin_handler.get_tools_for_framework("openai")
    for tool in admin_tools:
        print(f"  • {tool['function']['name']}")

    print(f"\n👀 Read-Only Agent Tools:")
    readonly_tools = readonly_handler.get_tools_for_framework("openai")
    for tool in readonly_tools:
        print(f"  • {tool['function']['name']}")

    print(
        f"\n📊 Admin tools: {len(admin_tools)}, Read-only tools: {len(readonly_tools)}"
    )


def demonstrate_performance_comparison():
    """
    Demonstrate performance comparison between old manual approach and new automatic approach.
    """
    print("\n\n⚡ Performance Comparison")
    print("=" * 60)

    import time

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="PerformanceAgent")

    # Time the automatic approach
    start_time = time.time()

    # Create tools for multiple frameworks
    langchain_tools = []
    openai_tools = []
    anthropic_tools = []

    try:
        langchain_tools = handler.get_langchain_tools()
    except Exception:
        pass

    openai_tools = handler.get_openai_functions()
    anthropic_tools = handler.get_anthropic_tools()

    end_time = time.time()

    total_tools = len(langchain_tools) + len(openai_tools) + len(anthropic_tools)
    duration = end_time - start_time

    print(f"⚡ Automatic Integration Results:")
    print(f"  📊 Total tools created: {total_tools}")
    print(f"  ⏱️  Time taken: {duration:.3f} seconds")
    print(f"  🚀 Tools per second: {total_tools/duration:.1f}")
    print(f"  📝 Lines of code: ~3 lines")

    print(f"\n📊 Manual Approach (estimated):")
    print(f"  📝 Lines of code: ~{total_tools * 15} lines")
    print(f"  ⏱️  Development time: ~{total_tools * 5} minutes")
    print(f"  🐛 Potential bugs: ~{total_tools * 2} issues")

    print(f"\n🎯 Improvement:")
    print(
        f"  📉 Code reduction: {((total_tools * 15 - 3) / (total_tools * 15)) * 100:.1f}%"
    )
    print(f"  ⚡ Time savings: ~{total_tools * 5 - 1} minutes")
    print(f"  🛡️  Error reduction: Automatic validation & conversion")


def main():
    """
    Run all demonstration examples.
    """
    print("🎉 Syntha Automatic Framework Integration Demo")
    print("=" * 60)
    print("This demo shows how Syntha now provides seamless integration")
    print("with popular LLM frameworks in just 1-3 lines of code!")
    print()

    # Run all demonstrations
    demonstrate_langchain_integration()
    demonstrate_openai_integration()
    demonstrate_anthropic_integration()
    demonstrate_multi_framework_support()
    demonstrate_validation_and_error_handling()
    demonstrate_hybrid_integration()
    demonstrate_role_based_framework_access()
    demonstrate_performance_comparison()

    print("\n\n🎊 Demo Complete!")
    print("=" * 60)
    print("Key Takeaways:")
    print("✅ 1-3 lines of code for complete framework integration")
    print("✅ Automatic tool generation from Syntha schemas")
    print("✅ Built-in parameter conversion and validation")
    print("✅ Comprehensive error handling with helpful suggestions")
    print("✅ Support for multiple frameworks from single handler")
    print("✅ Hybrid integration with existing tools")
    print("✅ Role-based access control preserved")
    print("✅ Significant code reduction and time savings")
    print()
    print("🚀 Ready to integrate Syntha with your favorite framework!")


if __name__ == "__main__":
    main()
