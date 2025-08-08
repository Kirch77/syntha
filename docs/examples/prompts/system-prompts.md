# System Prompts

Example of using Syntha for dynamic system prompt management.

## Basic Usage

```python
from syntha import ContextMesh, build_system_prompt, build_custom_prompt

# Create context
mesh = ContextMesh(user_id="prompt_user")

mesh.push("company_profile", {"name": "InnovateTech", "industry": "B2B SaaS"})
mesh.push("current_goals", {"revenue_target": 2500000, "expansion": ["EU", "APAC"]})
mesh.push("team_structure", {"engineering": 45, "sales": 25, "marketing": 20})

# Build system prompts
sales_prompt = build_system_prompt("SalesAgent", mesh)
print(len(sales_prompt))

# Build a custom prompt from selected keys and a template
sales_template = (
    "You are a senior sales consultant.\n\n"
    "Company: {company_profile}\n"
    "Goals: {current_goals}\n"
    "Team: {team_structure}\n"
)
custom = build_custom_prompt(
    agent_name="SalesAgent",
    context_mesh=mesh,
    keys=["company_profile", "current_goals", "team_structure"],
    template=sales_template,
)
print(len(custom))
```

## See Also

- [Context Injection](context-injection.md)
- [Prompts Concepts](../../user-guide/concepts/prompts.md)
