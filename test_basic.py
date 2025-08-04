#!/usr/bin/env python3
"""
Basic Test
"""

print("Starting basic test...")

try:
    from syntha import ContextMesh, ToolHandler

    print("✅ Import successful")

    mesh = ContextMesh()
    print("✅ ContextMesh created")

    mesh.push("test_key", "test_value")
    print("✅ Push successful")

    result = mesh.get("test_key")
    print(f"✅ Get successful: {result}")

    handler = ToolHandler(mesh, agent_name="TestAgent")
    print("✅ ToolHandler created")

    tools = handler.get_langgraph_tools()
    print(f"✅ Got {len(tools)} LangGraph tools")

    print("🎉 All tests passed!")

except Exception as e:
    print(f"❌ Error: {e}")
    import traceback

    traceback.print_exc()
