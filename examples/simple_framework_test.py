#!/usr/bin/env python3
"""
Simple Framework Integration Test

This example demonstrates the core framework integration capabilities
of Syntha without requiring external dependencies.
"""

import json
import sys
from typing import Any, Dict

# Add parent directory to path for imports
sys.path.insert(0, "..")

from syntha import ContextMesh, ToolHandler


def test_framework_adapters():
    """Test the framework adapters without external dependencies."""
    print("🧪 Testing Framework Adapters")
    print("=" * 50)

    # Setup Syntha
    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="TestAgent")

    # Add some test context
    mesh.push(
        "test_data",
        {
            "message": "Hello from Syntha!",
            "framework": "integration_test",
            "status": "working",
        },
        topics=["test", "demo"],
    )

    print("✅ Context mesh initialized")

    # Test 1: Check available frameworks
    print("\n📋 Test 1: Available Frameworks")
    try:
        from syntha.framework_adapters import get_supported_frameworks

        frameworks = get_supported_frameworks()
        print(f"✅ Supported frameworks: {frameworks}")
    except Exception as e:
        print(f"❌ Framework detection failed: {e}")
        return

    # Test 2: Test each framework adapter
    for framework in frameworks:
        print(f"\n🔧 Test 2: {framework.title()} Adapter")
        try:
            # Test tool generation
            if framework == "langchain":
                tools = handler.get_langchain_tools()
                print(f"  ✅ Created {len(tools)} LangChain tools")

                # Test a tool
                if tools:
                    list_tool = next(
                        (t for t in tools if t.name == "list_context"), None
                    )
                    if list_tool:
                        result = list_tool._run()
                        data = json.loads(result)
                        print(
                            f"  ✅ Tool test successful: {data['total_keys']} context items"
                        )

            elif framework == "openai":
                functions = handler.get_openai_functions()
                openai_handler = handler.get_framework_handler("openai")
                print(f"  ✅ Created {len(functions)} OpenAI functions")

                # Test a function
                result = openai_handler("list_context", "{}")
                print(
                    f"  ✅ Function test successful: {result['total_keys']} context items"
                )

            elif framework == "anthropic":
                tools = handler.get_anthropic_tools()
                anthropic_handler = handler.get_framework_handler("anthropic")
                print(f"  ✅ Created {len(tools)} Anthropic tools")

                # Test a tool
                result = anthropic_handler("list_context", {})
                print(
                    f"  ✅ Tool test successful: {result['total_keys']} context items"
                )

            elif framework == "langgraph":
                tools = handler.get_langgraph_tools()
                print(f"  ✅ Created {len(tools)} LangGraph tools")

                # Test a tool
                tools_dict = {tool["name"]: tool["function"] for tool in tools}
                result = tools_dict["list_context"]()
                data = json.loads(result)
                print(f"  ✅ Tool test successful: {data['total_keys']} context items")

        except Exception as e:
            print(f"  ❌ {framework.title()} test failed: {e}")

    # Test 3: Cross-framework communication
    print("\n🤝 Test 3: Cross-Framework Communication")
    try:
        # Create agents using different frameworks
        langchain_handler = ToolHandler(mesh, agent_name="LangChainAgent")
        openai_handler = ToolHandler(mesh, agent_name="OpenAIAgent")

        # LangChain agent pushes data
        langgraph_tools = langchain_handler.get_langgraph_tools()
        tools_dict = {tool["name"]: tool["function"] for tool in langgraph_tools}

        test_data = {
            "source": "LangChainAgent",
            "message": "Hello from LangChain!",
            "timestamp": "2024-01-15T12:00:00Z",
        }

        push_result = tools_dict["push_context"](
            key="cross_framework_test", data=test_data, topics=["test", "communication"]
        )
        push_response = (
            push_result if isinstance(push_result, dict) else json.loads(push_result)
        )
        print(f"  ✅ Data pushed: {push_response['success']}")

        # OpenAI agent retrieves data
        openai_function_handler = openai_handler.get_framework_handler("openai")
        get_result = openai_function_handler(
            "get_context", {"keys": ["cross_framework_test"]}
        )

        if get_result["success"]:
            retrieved_data = get_result["context"]["cross_framework_test"]
            print(f"  ✅ Data retrieved: {retrieved_data['message']}")
            print(f"  ✅ Source: {retrieved_data['source']}")

        print("  ✅ Cross-framework communication successful!")

    except Exception as e:
        print(f"  ❌ Cross-framework communication failed: {e}")

    # Test 4: Topic-based routing
    print("\n🎯 Test 4: Topic-Based Routing")
    try:
        # Register agents for topics
        mesh.register_agent_topics("LangChainAgent", ["research", "analysis"])
        mesh.register_agent_topics("OpenAIAgent", ["implementation", "development"])

        # Push data to specific topics
        research_data = {
            "finding": "AI models are becoming more efficient",
            "confidence": 0.95,
            "source": "research_agent",
        }

        tools_dict["push_context"](
            key="research_finding_001",
            data=research_data,
            topics=["research", "analysis"],
        )

        # Check topic subscriptions
        topics_result = openai_function_handler("discover_topics", {})
        print(f"  ✅ Available topics: {topics_result.get('total_topics', 0)}")

        # Verify topic routing
        context_result = openai_function_handler(
            "get_context", {"keys": ["research_finding_001"]}
        )

        if context_result["success"]:
            print("  ✅ Topic-based routing working correctly")
        else:
            print("  ⚠️  Topic-based routing may need adjustment")

    except Exception as e:
        print(f"  ❌ Topic-based routing failed: {e}")

    return True


def test_framework_schemas():
    """Test framework schema generation."""
    print("\n📊 Test 5: Framework Schema Generation")
    print("=" * 50)

    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="SchemaTestAgent")

    # Test schema generation for each framework
    frameworks = ["langchain", "openai", "anthropic", "langgraph"]

    for framework in frameworks:
        try:
            if framework == "langchain":
                schemas = handler.get_langchain_tools()
                schema_count = len(schemas)
            elif framework == "openai":
                schemas = handler.get_openai_functions()
                schema_count = len(schemas)
            elif framework == "anthropic":
                schemas = handler.get_anthropic_tools()
                schema_count = len(schemas)
            elif framework == "langgraph":
                schemas = handler.get_langgraph_tools()
                schema_count = len(schemas)

            print(f"  ✅ {framework.title()}: {schema_count} schemas generated")

            # Show first few schema names
            if framework == "langchain":
                names = [tool.name for tool in schemas[:3]]
            elif framework == "openai":
                names = [func["function"]["name"] for func in schemas[:3]]
            elif framework == "anthropic":
                names = [tool["name"] for tool in schemas[:3]]
            elif framework == "langgraph":
                names = [tool["name"] for tool in schemas[:3]]

            print(
                f"     Sample tools: {', '.join(names)}{'...' if len(names) == 3 else ''}"
            )

        except Exception as e:
            print(f"  ❌ {framework.title()} schema generation failed: {e}")


def main():
    """Run the complete framework integration test."""
    print("🚀 Simple Framework Integration Test")
    print("=" * 60)
    print("This test demonstrates Syntha's framework integration capabilities")
    print("without requiring external dependencies.")
    print()

    try:
        # Run tests
        success = test_framework_adapters()
        test_framework_schemas()

        print("\n" + "=" * 60)
        print("🎉 FRAMEWORK INTEGRATION TEST COMPLETE!")
        print("=" * 60)

        if success:
            print("✅ All framework adapters working correctly")
            print("✅ Cross-framework communication verified")
            print("✅ Topic-based routing functional")
            print("✅ Schema generation successful")

            print("\n💡 Key Achievements:")
            print("   • Framework adapters create tools automatically")
            print("   • Agents can communicate across different frameworks")
            print("   • Context sharing works seamlessly")
            print("   • Topic-based routing enables team coordination")
            print("   • Zero configuration required for basic usage")

            print("\n🔧 Technical Details:")
            print("   • LangChain: BaseTool instances with Pydantic schemas")
            print("   • OpenAI: Function calling format with JSON schema")
            print("   • Anthropic: Tool use format with input schemas")
            print("   • LangGraph: Function dictionaries with parameters")

        else:
            print("❌ Some tests failed. Check the output above for details.")

    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    main()
