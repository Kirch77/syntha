# Prompts API Reference

The Prompts API provides utilities for injecting context directly into agent prompts. This is ideal for scenarios where you want context to appear automatically in agent conversations without requiring function calls.

## Overview

Syntha's prompt builders automatically retrieve relevant context from the ContextMesh and format it for injection into system or message prompts. This approach works with any LLM, even those that don't support function calling.

## Core Functions

### build_system_prompt()

Build a system prompt with long-term context injection.

```python
def build_system_prompt(
    agent_name: str,
    context_mesh: ContextMesh,
    template: Optional[str] = None,
    include_context_header: bool = True,
    prepend_to_existing: bool = False,
    existing_prompt: Optional[str] = None,
) -> str
```

#### Parameters

- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **template** (Optional[str]): Custom template with `{context}` placeholder
- **include_context_header** (bool): Whether to include "[Context]" header. Default: `True`
- **prepend_to_existing** (bool): Whether to add context before existing prompt. Default: `False`
- **existing_prompt** (Optional[str]): Existing system prompt to augment

#### Returns

Formatted system prompt with injected context.

#### Examples

**Basic usage:**
```python
from syntha import ContextMesh, build_system_prompt

context = ContextMesh(user_id="user123")
context.push("user_name", "Alice Johnson")
context.push("preferences", {"theme": "dark", "language": "en"})

prompt = build_system_prompt("AssistantAgent", context)
print(prompt)
```

**Output:**
```
[Context]
User Name: Alice Johnson
Preferences: {
  "theme": "dark",
  "language": "en"
}
```

**With custom template:**
```python
template = """You are a helpful assistant.

Current context:
{context}

Please use this information to provide personalized responses."""

prompt = build_system_prompt("AssistantAgent", context, template=template)
```

**Augmenting existing prompt:**
```python
existing = "You are a customer service agent."
prompt = build_system_prompt("ServiceAgent", context, 
                           existing_prompt=existing,
                           prepend_to_existing=True)
```

**Output:**
```
[Context]
User Name: Alice Johnson
Preferences: {...}

You are a customer service agent.
```

### build_message_prompt()

Build a message prompt with context update information.

```python
def build_message_prompt(
    agent_name: str,
    context_mesh: ContextMesh,
    template: Optional[str] = None,
    include_context_header: bool = True,
    recent_only: bool = False,
    max_age_seconds: Optional[float] = None,
) -> str
```

#### Parameters

- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **template** (Optional[str]): Custom template with `{context}` placeholder
- **include_context_header** (bool): Whether to include "[Context Update]" header. Default: `True`
- **recent_only** (bool): Whether to only include recently added context. Default: `False`
- **max_age_seconds** (Optional[float]): Maximum age of context to include (if recent_only=True)

#### Returns

Formatted message prompt with current context.

#### Example

```python
from syntha import build_message_prompt

# Add some dynamic context
context.push("current_task", "Processing customer inquiry #12345")
context.push("priority", "high")

message_prompt = build_message_prompt("SupportAgent", context)
print(message_prompt)
```

**Output:**
```
[Context Update]
Current Task: Processing customer inquiry #12345
Priority: high
```

### inject_context_into_prompt()

Low-level function to inject context into any prompt template.

```python
def inject_context_into_prompt(
    existing_prompt: str,
    agent_name: str,
    context_mesh: ContextMesh,
    placement: str = "prepend",
    separator: str = "\n\n",
) -> str
```

#### Parameters

- **existing_prompt** (str): The user's existing system prompt
- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **placement** (str): Where to place context ("prepend", "append", or "replace_placeholder"). Default: `"prepend"`
- **separator** (str): Text to separate context from existing prompt. Default: `"\n\n"`

#### Returns

Existing prompt with context injected.

#### Example

```python
from syntha import inject_context_into_prompt

context.push("customer_name", "John Smith")
context.push("order_id", "ORD-12345")

existing_prompt = "You are a helpful assistant."

# Inject context at the beginning
enhanced_prompt = inject_context_into_prompt(
    existing_prompt, "OrderAgent", context, placement="prepend"
)
print(enhanced_prompt)
```

**Output:**
```
[Shared Context]
Customer Name: John Smith
Order Id: ORD-12345

You are a helpful assistant.
```

### build_custom_prompt()

Build a custom prompt with specific context keys.

```python
def build_custom_prompt(
    agent_name: str,
    context_mesh: ContextMesh,
    keys: List[str],
    template: str,
    fallback_text: str = "",
) -> str
```

#### Parameters

- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **keys** (List[str]): Specific context keys to include
- **template** (str): Template string with `{key_name}` placeholders
- **fallback_text** (str): Text to use if a key is not accessible. Default: `""`

#### Returns

Formatted prompt with specific context injected.

#### Example

```python
from syntha import build_custom_prompt

context.push("customer_name", "John Smith")
context.push("order_id", "ORD-12345")

template = """
Hello {customer_name},

Your order {order_id} has been processed.
Thank you for your business!
"""

message = build_custom_prompt("OrderAgent", context, 
                             keys=["customer_name", "order_id"], 
                             template=template)
print(message)
```

**Output:**
```
Hello John Smith,

Your order ORD-12345 has been processed.
Thank you for your business!
```

## Integration Patterns

### OpenAI Integration

```python
import openai
from syntha import ContextMesh, build_system_prompt

# Set up context
context = ContextMesh(user_id="user123")
context.push("user_preferences", {"style": "concise", "expertise": "beginner"})

# Build system prompt with context
system_prompt = build_system_prompt("TutorAgent", context)

# Use with OpenAI
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Explain quantum computing"}
    ]
)
```

### Anthropic Integration

```python
import anthropic
from syntha import ContextMesh, build_system_prompt

# Set up context
context = ContextMesh(user_id="user123")
context.push("conversation_history", "Previous discussion about AI safety")

# Build system prompt with context
system_prompt = build_system_prompt("ClaudeAgent", context)

# Use with Anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    messages=[
        {"role": "user", "content": "Continue our discussion"}
    ],
    system=system_prompt
)
```

### Dynamic Context Updates

```python
from syntha import ContextMesh, build_message_prompt

context = ContextMesh(user_id="user123")

# Initial context
context.push("user_name", "Alice")
context.push("session_start", "2024-01-15 10:00:00")

# During conversation, add dynamic context
context.push("current_topic", "Python programming")
context.push("difficulty_level", "intermediate")

# Build message prompt with updated context
message_prompt = build_message_prompt("TutorAgent", context)
```

## Best Practices

### Context Key Naming

Use descriptive, consistent naming for context keys:

```python
# Good examples
context.push("user_preferences", {...})
context.push("conversation_history", [...])
context.push("current_task", "Processing order #12345")

# Avoid generic names
context.push("data", {...})  # Too vague
context.push("info", "value")  # Not descriptive
```

### Template Design

Design templates that gracefully handle missing context:

```python
# Robust template with fallbacks
template = """
Hello {user_name|there},

Your order {order_id|#unknown} has been processed.
{special_message|Thank you for your business!}
"""

# Use build_custom_prompt for specific keys
message = build_custom_prompt("Agent", context, 
                             keys=["user_name", "order_id", "special_message"],
                             template=template,
                             fallback_text="")
```

### Performance Considerations

- Use `build_system_prompt()` for long-term context that doesn't change frequently
- Use `build_message_prompt()` for dynamic context that updates during conversation
- Consider using `build_custom_prompt()` when you only need specific context keys

---

**Next**: Learn about [Persistence API](persistence.md) for database storage