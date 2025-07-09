# Prompt Builders API Reference

The prompt builders module provides utilities for injecting context into LLM prompts, enabling agents to access shared knowledge and communicate through natural language.

## Functions

### build_system_prompt()

Creates a system prompt with injected context and tool availability information.

```python
from syntha import build_system_prompt

system_prompt = build_system_prompt(
    agent_name="Agent1",
    context_mesh=mesh,
    include_tools=True,
    custom_instructions="You are a helpful assistant."
)
```

### Parameters

- `agent_name` (str): Name of the agent receiving the prompt
- `context_mesh` (ContextMesh): The mesh instance to pull context from
- `include_tools` (bool, optional): Include tool usage instructions. Default: `True`
- `custom_instructions` (str, optional): Additional instructions to include
- `max_context_length` (int, optional): Maximum context length in tokens. Default: `4000`
- `priority_keys` (List[str], optional): High-priority context keys to include first

### Returns

String containing the complete system prompt with injected context.

## Advanced Usage

### Context Filtering

```python
# Include only specific context patterns
system_prompt = build_system_prompt(
    agent_name="Agent1",
    context_mesh=mesh,
    context_filter=lambda key, value: key.startswith("user_") or key.startswith("task_")
)
```

### Dynamic Context Updates

```python
def get_dynamic_prompt(agent_name, context_mesh):
    """Generate prompt with fresh context each time"""
    return build_system_prompt(
        agent_name=agent_name,
        context_mesh=context_mesh,
        include_recent_messages=True,
        message_limit=10
    )
```

### Multi-Language Support

```python
# Spanish system prompt
system_prompt = build_system_prompt(
    agent_name="Agent1",
    context_mesh=mesh,
    language="es",
    custom_instructions="Eres un asistente útil."
)
```

## Helper Functions

### format_context_for_prompt()

Formats context data for inclusion in prompts.

```python
from syntha.prompts import format_context_for_prompt

formatted = format_context_for_prompt(
    context_data={"user_count": 1500, "status": "active"},
    format_style="json"  # json, yaml, or text
)
```

### build_message_summary()

Creates a summary of recent agent messages.

```python
from syntha.prompts import build_message_summary

summary = build_message_summary(
    agent_name="Agent1",
    context_mesh=mesh,
    message_limit=5,
    include_threads=True
)
```

### inject_tool_instructions()

Adds tool usage instructions to a prompt.

```python
from syntha.prompts import inject_tool_instructions

prompt_with_tools = inject_tool_instructions(
    base_prompt="You are a helpful assistant.",
    available_tools=["get_context", "send_message_to_agent"],
    instruction_style="detailed"  # brief, detailed, or examples
)
```

## Prompt Templates

### Basic Agent Template

```python
AGENT_TEMPLATE = """
You are {agent_name}, a specialized AI agent in a multi-agent system.

## Your Role
{role_description}

## Available Context
{context_data}

## Recent Messages
{message_summary}

## Available Tools
{tool_instructions}

## Instructions
{custom_instructions}

Remember to:
- Use tools to access shared context and communicate with other agents
- Always specify your agent name when using tools
- Coordinate with other agents when needed
"""
```

### Task-Specific Template

```python
TASK_TEMPLATE = """
You are {agent_name}, working on: {task_description}

## Task Context
{task_context}

## Team Members
{team_members}

## Current Status
{status_info}

## Next Steps
{next_steps}

Use the available tools to coordinate with your team and access shared resources.
"""
```

## Best Practices

### 1. Context Prioritization

```python
# Prioritize important context
system_prompt = build_system_prompt(
    agent_name="Agent1",
    context_mesh=mesh,
    priority_keys=["current_task", "user_preferences", "active_session"]
)
```

### 2. Token Management

```python
def build_efficient_prompt(agent_name, context_mesh, max_tokens=2000):
    """Build prompt within token limits"""
    return build_system_prompt(
        agent_name=agent_name,
        context_mesh=context_mesh,
        max_context_length=max_tokens,
        summarize_long_context=True
    )
```

### 3. Dynamic Updates

```python
class PromptManager:
    def __init__(self, context_mesh):
        self.context_mesh = context_mesh
        self.last_update = None
        self.cached_prompt = None

    def get_prompt(self, agent_name, force_refresh=False):
        """Get prompt with caching"""
        if force_refresh or self._needs_update():
            self.cached_prompt = build_system_prompt(
                agent_name=agent_name,
                context_mesh=self.context_mesh
            )
            self.last_update = time.time()
        return self.cached_prompt
```

## Integration Examples

### OpenAI Integration

```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

mesh = ContextMesh()
handler = ToolHandler(mesh)

# Build system prompt
system_prompt = build_system_prompt("Agent1", mesh)

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "What's the current user count?"}
    ],
    tools=handler.get_schemas()
)
```

### Anthropic Claude Integration

```python
import anthropic
from syntha import ContextMesh, ToolHandler, build_system_prompt

mesh = ContextMesh()
handler = ToolHandler(mesh)

client = anthropic.Anthropic()
system_prompt = build_system_prompt("Agent1", mesh)

response = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    system=system_prompt,
    messages=[{"role": "user", "content": "What's the current status?"}],
    tools=handler.get_schemas()
)
```

### Custom Framework Integration

```python
def integrate_with_custom_framework(agent_name, user_message, context_mesh):
    """Integration with any LLM framework"""

    # Build context-aware prompt
    system_prompt = build_system_prompt(agent_name, context_mesh)

    # Get tool schemas
    handler = ToolHandler(context_mesh)
    tools = handler.get_schemas()

    # Use with your framework
    response = your_llm_framework.generate(
        system_prompt=system_prompt,
        user_message=user_message,
        tools=tools
    )

    return response
```

## Advanced Features

### Contextual Prompt Generation

```python
def generate_contextual_prompt(agent_name, context_mesh, situation):
    """Generate situation-specific prompts"""

    if situation == "crisis":
        return build_system_prompt(
            agent_name=agent_name,
            context_mesh=context_mesh,
            priority_keys=["emergency_contacts", "crisis_procedures"],
            custom_instructions="You are in crisis mode. Prioritize safety and clear communication."
        )
    elif situation == "maintenance":
        return build_system_prompt(
            agent_name=agent_name,
            context_mesh=context_mesh,
            priority_keys=["maintenance_schedule", "system_status"],
            custom_instructions="System is in maintenance mode. Inform users of any service disruptions."
        )
    else:
        return build_system_prompt(agent_name, context_mesh)
```

### Prompt Validation

```python
def validate_prompt_quality(prompt):
    """Validate prompt for completeness and quality"""
    checks = {
        "has_agent_name": "agent_name" in prompt.lower(),
        "has_context": "context" in prompt.lower(),
        "has_tools": "tools" in prompt.lower(),
        "reasonable_length": 100 < len(prompt) < 8000,
        "has_instructions": "instructions" in prompt.lower()
    }

    failed_checks = [check for check, passed in checks.items() if not passed]
    if failed_checks:
        raise ValueError(f"Prompt validation failed: {failed_checks}")

    return True
```

## Performance Optimization

### Caching Strategies

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def cached_system_prompt(agent_name, context_hash):
    """Cache system prompts based on context hash"""
    return build_system_prompt(agent_name, context_mesh)

def get_optimized_prompt(agent_name, context_mesh):
    """Get prompt with caching optimization"""
    context_hash = hash(str(context_mesh.get_all_for_agent(agent_name)))
    return cached_system_prompt(agent_name, context_hash)
```

### Batch Prompt Generation

```python
def generate_prompts_for_agents(agent_names, context_mesh):
    """Generate prompts for multiple agents efficiently"""
    prompts = {}

    # Pre-load common context
    common_context = context_mesh.get_global_context()

    for agent_name in agent_names:
        prompts[agent_name] = build_system_prompt(
            agent_name=agent_name,
            context_mesh=context_mesh,
            preloaded_context=common_context
        )

    return prompts
```

## See Also

- [ContextMesh API](context-mesh.md) - Understanding the context system
- [ToolHandler API](tool-handler.md) - Function calling interface
- [Integration Guides](../guides/integrations/) - Framework-specific patterns
