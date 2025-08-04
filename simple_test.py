#!/usr/bin/env python3
"""
Simple Cross-Framework Test
"""

import json
import sys

sys.path.insert(0, '.')

from syntha import ContextMesh, ToolHandler

def main():
    print("🧪 Simple Cross-Framework Test", flush=True)
    print("=" * 40, flush=True)
    
    # Setup
    print("Setting up...", flush=True)
    mesh = ContextMesh()
    handler = ToolHandler(mesh, agent_name="TestAgent")
    print("Setup complete", flush=True)
    
    # Test direct push
    print("1. Testing direct push...", flush=True)
    mesh.push("test_key", {"message": "Hello World"}, topics=["test"])
    print("✅ Direct push successful", flush=True)
    
    # Test LangGraph tool
    print("2. Testing LangGraph tool...", flush=True)
    langgraph_tools = handler.get_langgraph_tools()
    print(f"Found {len(langgraph_tools)} tools", flush=True)
    
    push_tool = None
    for tool in langgraph_tools:
        if tool["name"] == "push_context":
            push_tool = tool["function"]
            break
    
    if push_tool:
        print("Calling push tool...", flush=True)
        result = push_tool(
            key="tool_test",
            value=json.dumps({"message": "From LangGraph tool"}),
            topics=["test"]
        )
        print(f"✅ LangGraph tool result: {result}", flush=True)
    else:
        print("❌ Push tool not found", flush=True)
    
    # Test retrieval
    print("3. Testing retrieval...", flush=True)
    data = mesh.get("test_key")
    print(f"✅ Retrieved: {data}", flush=True)
    
    data2 = mesh.get("tool_test")
    print(f"✅ Retrieved tool data: {data2}", flush=True)

if __name__ == "__main__":
    main() 