# Topic-Based Routing

This example shows how to organize and route context between agents using topics.

## Basic Topic Operations

```python
from syntha import ContextMesh

# Create context mesh and register agent topic interests
mesh = ContextMesh(user_id="user123")
mesh.register_agent_topics("Coordinator", ["data_processing", "report_generation"]) 
mesh.register_agent_topics("DataAnalyst", ["data_processing", "analysis_results"]) 
mesh.register_agent_topics("Reporter", ["report_generation", "final_report"]) 

# Push context to specific topics
mesh.push(
    "raw_data",
    {"sales": [100, 150, 200], "period": "Q1_2024"},
    topics=["data_processing"],
)

mesh.push(
    "requirements",
    {"format": "PDF", "charts": True, "deadline": "2024-01-15"},
    topics=["report_generation"],
)

# Discover topics and subscribers
for topic in mesh.get_all_topics():
    print(topic, mesh.get_subscribers_for_topic(topic))

# Keys available to DataAnalyst by topic
print(mesh.get_available_keys_by_topic("DataAnalyst"))
```

## See Also

- [Basic Usage](basic-usage.md)
- [Multi-Agent Setup](../tools/multi-agent.md)
- [Context Mesh Concepts](../../user-guide/concepts/context-mesh.md)
