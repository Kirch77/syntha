# Context Injection

Examples of injecting context data into prompts for more informed AI responses.

## Basic Context Injection

```python
from syntha import ContextMesh, build_message_prompt

mesh = ContextMesh(user_id="injection_user")

# Store relevant context
mesh.push("recent_activity", {
    "last_project": "ML Pipeline",
    "current_focus": "data preprocessing",
    "challenges": ["missing data", "feature scaling"],
})

# Build a message prompt with injected context
prompt = build_message_prompt(
    agent_name="InjectionAgent",
    context_mesh=mesh,
    template=(
        "{context}\n\n"
        "Please provide relevant assistance based on this context."
    ),
    include_context_header=True,
)
print(prompt)
```

## See Also

- [System Prompts](system-prompts.md)
- [Prompts Concepts](../../user-guide/concepts/prompts.md)
