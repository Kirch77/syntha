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
) -> str
```

#### Parameters

- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **template** (Optional[str]): Custom template with `{context}` placeholder
- **include_context_header** (bool): Whether to include "[Context Update]" header

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
    agent_name: str,
    context_mesh: ContextMesh,
    template: str,
    context_keys: Optional[List[str]] = None,
) -> str
```

#### Parameters

- **agent_name** (str): Name of the agent requesting the prompt
- **context_mesh** (ContextMesh): The ContextMesh instance to pull context from
- **template** (str): Template string with `{key}` placeholders
- **context_keys** (Optional[List[str]]): Specific keys to inject (if None, uses all accessible context)

#### Returns

Template with context values injected.

#### Example

```python
from syntha import inject_context_into_prompt

context.push("customer_name", "John Smith")
context.push("order_id", "ORD-12345")

template = """
Hello {customer_name},

Your order {order_id} has been processed.
Thank you for your business!
"""

message = inject_context_into_prompt("OrderAgent", context, template)
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
        {"role": "user", "content": "Explain machine learning"}
    ]
)
```

### Anthropic Integration

```python
import anthropic
from syntha import ContextMesh, build_system_prompt

context = ContextMesh(user_id="user123")
context.push("conversation_style", "professional")
context.push("domain_expertise", "software engineering")

system_prompt = build_system_prompt("CodeReviewAgent", context)

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-3-sonnet-20240229",
    system=system_prompt,
    messages=[{"role": "user", "content": "Review this Python code"}]
)
```

### Dynamic Context Updates

```python
from syntha import ContextMesh, build_message_prompt

context = ContextMesh(user_id="user123")

# Initial context
context.push("session_start", "2024-01-15 10:30:00")

# During conversation, update context
context.push("last_topic", "database optimization")
context.push("user_satisfaction", "high")

# Inject updated context into next message
context_update = build_message_prompt("ConversationAgent", context)

# Combine with user message
full_message = f"{context_update}\n\nUser: Can you help with API design?"
```

## Advanced Usage

### Custom Context Formatting

```python
from syntha import ContextMesh

def format_context_value(value):
    """Custom formatter for context values."""
    if isinstance(value, dict):
        return "\n".join(f"  {k}: {v}" for k, v in value.items())
    elif isinstance(value, list):
        return "\n".join(f"  - {item}" for item in value)
    return str(value)

context = ContextMesh(user_id="user123")
context.push("user_goals", ["learn Python", "build web app", "deploy to cloud"])

# Custom template with formatting
template = """You are a coding mentor.

Student Goals:
{user_goals}

Tailor your responses to help achieve these goals."""

# Note: You'll need to implement custom formatting logic
# The built-in functions use JSON formatting for complex objects
```

### Conditional Context Injection

```python
from syntha import ContextMesh, build_system_prompt

def build_conditional_prompt(agent_name: str, context: ContextMesh, user_role: str) -> str:
    """Build prompt with role-based context filtering."""
    
    if user_role == "admin":
        # Admins see all context
        return build_system_prompt(agent_name, context)
    elif user_role == "user":
        # Regular users see limited context
        template = """You are a helpful assistant.
        
{context}

Note: Some advanced features may not be available."""
        return build_system_prompt(agent_name, context, template=template)
    else:
        # Guests see minimal context
        return "You are a helpful assistant. Please ask the user to log in for personalized help."

# Usage
context = ContextMesh(user_id="user123")
context.push("user_tier", "premium")
context.push("api_limits", {"daily": 10000, "burst": 100})

admin_prompt = build_conditional_prompt("AssistantAgent", context, "admin")
user_prompt = build_conditional_prompt("AssistantAgent", context, "user")
```

### Multi-Agent Context Coordination

```python
from syntha import ContextMesh, build_system_prompt

context = ContextMesh(user_id="team_workspace")

# Shared context for all agents
context.push("project_deadline", "2024-02-15")
context.push("current_sprint", "Sprint 12")

# Role-specific context
context.push("dev_tasks", ["implement auth", "fix bug #123"], subscribers=["DevAgent"])
context.push("qa_tasks", ["test login flow", "regression testing"], subscribers=["QAAgent"])

# Each agent gets appropriate context
dev_prompt = build_system_prompt("DevAgent", context)
qa_prompt = build_system_prompt("QAAgent", context)

print("Dev agent sees:", dev_prompt)
print("QA agent sees:", qa_prompt)
```

## Error Handling

```python
from syntha import ContextMesh, build_system_prompt, SynthaError

context = ContextMesh(user_id="user123")

try:
    # This will work fine
    prompt = build_system_prompt("ValidAgent", context)
    
    # Handle case where agent has no accessible context
    empty_prompt = build_system_prompt("UnknownAgent", context)
    print(f"Empty prompt: '{empty_prompt}'")  # Will be empty string
    
except SynthaError as e:
    print(f"Syntha error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Best Practices

### When to Use Prompt Injection

**Good for:**
- Background context that should always be available
- User preferences and settings
- Static configuration information
- Simple scenarios with minimal context

**Not ideal for:**
- Dynamic, frequently changing context
- Large amounts of context (can exceed token limits)
- Scenarios where agents need to actively manage context

### Performance Considerations

```python
# Efficient: Build prompt once, reuse if context hasn't changed
context = ContextMesh(user_id="user123")
cached_prompt = None
last_context_size = 0

def get_efficient_prompt(agent_name: str) -> str:
    global cached_prompt, last_context_size
    
    current_size = context.size()
    if cached_prompt is None or current_size != last_context_size:
        cached_prompt = build_system_prompt(agent_name, context)
        last_context_size = current_size
    
    return cached_prompt
```

### Template Best Practices

```python
# Good: Clear structure with context section
template = """You are a customer service agent.

Current Customer Context:
{context}

Instructions:
- Be helpful and professional
- Use the customer context to personalize responses
- Escalate complex issues to human agents
"""

# Avoid: Context mixed with instructions (harder to parse)
template = """You are a customer service agent for {customer_name} 
who prefers {communication_style} and has {account_type} account..."""
```

---

**Next**: Learn about [Persistence API](persistence.md) for database configuration