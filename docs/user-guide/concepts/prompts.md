# Prompts

Syntha's prompt system enables intelligent context injection and system prompt management for AI agents. The framework provides tools for dynamic prompt generation, context-aware messaging, and cross-framework prompt compatibility.

## Overview

The prompt system in Syntha handles:
- Dynamic context injection into prompts
- System prompt management
- Context-aware message formatting
- Framework-specific prompt adaptation

## Key Features

- **Context Injection**: Automatically inject relevant context into prompts
- **Template System**: Reusable prompt templates with variables
- **Framework Adaptation**: Convert prompts to framework-specific formats
- **History Management**: Maintain conversation history with context

## Context Injection

Syntha can automatically inject relevant context into your prompts based on:
- Current conversation topics
- User-specific data
- Historical interactions
- Cross-agent communications

## System Prompts

Define reusable system prompts that can be:
- Dynamically updated with context
- Shared across multiple agents
- Customized per user or session

## Usage Examples

### Basic Context Injection
```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh(user_id="user123")
handler = ToolHandler(mesh, "Assistant")

# Push context that can be injected into prompts
handler.push_context("user_preferences", {
    "language": "English",
    "expertise_level": "beginner"
})

# Context is automatically available for prompt injection
```

### Custom System Prompts
```python
from syntha.prompts import SystemPromptManager

prompt_manager = SystemPromptManager(handler)

# Define a system prompt template
prompt_manager.set_system_prompt(
    "assistant",
    "You are a helpful assistant. User preferences: {user_preferences}"
)

# The prompt will automatically inject context
rendered_prompt = prompt_manager.get_system_prompt("assistant")
```

## See Also

- [Context Mesh Documentation](context-mesh.md)
- [System Prompts Example](../../examples/prompts/system-prompts.md)
- [Context Injection Example](../../examples/prompts/context-injection.md)
