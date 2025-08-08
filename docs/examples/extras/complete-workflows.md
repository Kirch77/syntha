# Complete Workflows

Comprehensive end-to-end workflow using Syntha’s multi-agent tools, mirroring `examples/extras/complete_workflows.py`.

```python
from syntha import ContextMesh, create_multi_agent_handlers

context = ContextMesh(user_id="ecommerce_team", enable_persistence=True, db_backend="sqlite", db_path="product_launch.db")

agent_configs = [
    {"name": "MarketResearcher", "role": "contributor", "topics": ["research", "market", "trends"]},
    {"name": "ProductManager", "role": "admin", "topics": ["product", "requirements", "strategy"]},
    {"name": "EngineeringLead", "role": "contributor", "topics": ["development", "technical", "timeline"]},
    {"name": "MarketingManager", "role": "contributor", "topics": ["marketing", "campaign", "launch"]},
    {"name": "SalesDirector", "role": "contributor", "topics": ["sales", "pricing", "materials"]},
    {"name": "ProjectCoordinator", "role": "admin", "topics": ["coordination", "status", "timeline"]},
]

handlers = create_multi_agent_handlers(context, agent_configs)

# Example actions
handlers["MarketResearcher"].handle_tool_call("push_context", key="market_analysis", value={"target_market": "Eco-conscious millennials"}, topics=["research", "market"])
handlers["ProductManager"].handle_tool_call("push_context", key="product_requirements", value={"product_name": "EcoSmart Water Bottle"}, topics=["product", "requirements"])
handlers["EngineeringLead"].handle_tool_call("push_context", key="development_plan", value={"phases": {"design": {"duration": "3 weeks"}}}, topics=["development", "timeline"]) 
```

See full runnable script at `examples/extras/complete_workflows.py`.
