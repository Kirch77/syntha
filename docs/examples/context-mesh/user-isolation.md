# User Isolation Example

Demonstrates complete separation between different users’ context spaces.

```python
from syntha import ContextMesh

# Create separate context meshes for different users
alice_ctx = ContextMesh(user_id="user_alice")
bob_ctx = ContextMesh(user_id="user_bob")

# Add context for Alice
alice_ctx.push("customer_data", {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "preferences": {"theme": "dark", "notifications": True},
})
alice_ctx.push("project_status", "Phase 2 Complete")
alice_ctx.push("budget", 25000)

# Add context for Bob
bob_ctx.push("customer_data", {
    "name": "Bob Smith",
    "email": "bob@example.com",
    "preferences": {"theme": "light", "notifications": False},
})
bob_ctx.push("project_status", "Planning Phase")
bob_ctx.push("budget", 15000)

# Verify isolation – each user only sees their own data
alice_view = alice_ctx.get_all_for_agent("AssistantAgent")
bob_view = bob_ctx.get_all_for_agent("AssistantAgent")
print(list(alice_view.keys()))
print(list(bob_view.keys()))

# Topic routing remains isolated per user
alice_ctx.register_agent_topics("SalesAgent", ["sales"]) 
bob_ctx.register_agent_topics("SalesAgent", ["sales"]) 

alice_ctx.push("sales_lead", "Alice's Premium Lead", topics=["sales"]) 
bob_ctx.push("sales_lead", "Bob's Standard Lead", topics=["sales"]) 

print(alice_ctx.get("sales_lead", "SalesAgent"))
print(bob_ctx.get("sales_lead", "SalesAgent"))
```

See the runnable file at `examples/context-mesh/user_isolation.py`.
