# Context Injection

Examples of injecting context data into prompts for more informed AI responses.

## Overview

Context injection enables:
- Automatic insertion of relevant context into prompts
- Dynamic prompt enhancement
- Personalized AI interactions

## Basic Context Injection

```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh(user_id="injection_user")
handler = ToolHandler(mesh, "InjectionAgent")

# Store relevant context
handler.push_context("recent_activity", {
    "last_project": "ML Pipeline",
    "current_focus": "data preprocessing",
    "challenges": ["missing data", "feature scaling"]
})

# Inject context into prompt
def create_context_aware_prompt(user_message):
    context = handler.get_context("recent_activity")
    
    return f"""Context: User is working on {context['last_project']}, 
    focusing on {context['current_focus']}. 
    Current challenges: {', '.join(context['challenges'])}.
    
    User message: {user_message}
    
    Please provide relevant assistance based on this context."""

prompt = create_context_aware_prompt("How should I handle this data issue?")
print(prompt)
```

## See Also

- [System Prompts](system-prompts.md)
- [Prompts Concepts](../../user-guide/concepts/prompts.md)
