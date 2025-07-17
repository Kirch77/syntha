from syntha import ContextMesh, ToolHandler
# Agent starts with basic subscriptions
mesh = ContextMesh(enable_persistence=True)

agent = ToolHandler(mesh, agent_name="FlexibleAgent")

# Initial subscription
agent.handle_tool_call("subscribe_to_topics", topics=["general"])

# Later, agent needs more specific information
agent.handle_tool_call("subscribe_to_topics", topics=[
    "sales",
    "marketing",
    "support"
])

# Check current subscriptions
topics_info = agent.handle_tool_call("discover_topics")
print(f"Available topics: {topics_info}")

mesh.close()
print("ContextMesh closed successfully")