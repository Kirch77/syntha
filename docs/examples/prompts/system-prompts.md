# System Prompts

Example of using Syntha for dynamic system prompt management.

## Overview

System prompts with context injection allow for:
- Dynamic prompt generation based on context
- Personalized system instructions
- Context-aware prompt templates

## Basic Usage

```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh(user_id="prompt_user")
handler = ToolHandler(mesh, "PromptAgent")

# Store user context for prompt injection
handler.push_context("user_profile", {
    "name": "Alice",
    "expertise": "machine learning",
    "preferences": {"style": "technical", "detail": "high"}
})

# Create context-aware system prompt
def generate_system_prompt():
    profile = handler.get_context("user_profile")
    return f"""You are an AI assistant helping {profile['name']}.
    User expertise: {profile['expertise']}
    Communication style: {profile['preferences']['style']}
    Detail level: {profile['preferences']['detail']}
    
    Adapt your responses accordingly."""

system_prompt = generate_system_prompt()
print(system_prompt)
```

## See Also

- [Context Injection](context-injection.md)
- [Prompts Concepts](../../user-guide/concepts/prompts.md)
