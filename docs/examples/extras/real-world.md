# Real-World Use Cases

Practical examples of Syntha implementations. Mirrors `examples/extras/real_world.py`.

```python
from syntha import ContextMesh, ToolHandler

# Use Case 1: Customer Support
context = ContextMesh(user_id="customer_12345")

# Initial customer context
context.push("customer_profile", {"id": "CUST-12345", "name": "Sarah Johnson", "tier": "Premium"})

# L1 Support adds ticket and actions
l1 = ToolHandler(context, "L1Support")
l1.handle_tool_call("push_context", key="initial_inquiry", value={"issue": "Unable to generate quarterly reports"}, topics=["support", "escalation"]) 

# L2 Technical gets full context and resolves
l2 = ToolHandler(context, "L2Technical")
l2.handle_tool_call("push_context", key="technical_analysis", value={"root_cause": "DB query timeout", "fix_applied": "Optimized query"}, topics=["support", "resolution"]) 

# Customer Success follow-up
csm = ToolHandler(context, "CustomerSuccess")
csm.handle_tool_call("push_context", key="follow_up", value={"satisfaction_check": "Resolved"}) 
```

See full runnable script at `examples/extras/real_world.py`.
