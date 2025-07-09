"""
Prompt Injection Builders for Syntha Context Framework.

Functions to build system and message prompts that inject context
from the ContextMesh into agent conversations.
"""

import json
from typing import Any, Dict, Optional
from .context import ContextMesh


def _format_context_value(value: Any) -> str:
    """Format a context value for prompt injection."""
    if isinstance(value, str):
        return value
    elif isinstance(value, (dict, list)):
        return json.dumps(value, indent=2)
    else:
        return str(value)


def build_system_prompt(
    agent_name: str, 
    context_mesh: ContextMesh,
    template: Optional[str] = None,
    include_context_header: bool = True
) -> str:
    """
    Build a system prompt with long-term context injection.
    
    This function retrieves all context accessible by the specified agent
    and formats it for injection into the system prompt.
    
    Args:
        agent_name: Name of the agent requesting the prompt
        context_mesh: The ContextMesh instance to pull context from
        template: Optional custom template. Use {context} placeholder for injection.
        include_context_header: Whether to include "[Context]" header
        
    Returns:
        Formatted system prompt with injected context
    """
    # Get all accessible context for this agent
    context_data = context_mesh.get_all_for_agent(agent_name)
    
    if not context_data:
        # No context available
        if template:
            return template.format(context="")
        return ""
    
    # Format context for injection
    context_lines = []
    if include_context_header:
        context_lines.append("[Context]")
    
    for key, value in context_data.items():
        formatted_value = _format_context_value(value)
        # Create human-readable key name
        readable_key = key.replace("_", " ").title()
        context_lines.append(f"{readable_key}: {formatted_value}")
    
    context_text = "\n".join(context_lines)
    
    if template:
        return template.format(context=context_text)
    
    return context_text


def build_message_prompt(
    agent_name: str,
    context_mesh: ContextMesh,
    template: Optional[str] = None,
    include_context_header: bool = True,
    recent_only: bool = False,
    max_age_seconds: Optional[float] = None
) -> str:
    """
    Build a message prompt with short-term/recent context injection.
    
    This can be used for injecting recent context updates into user messages
    or for providing context that should appear in the conversation flow.
    
    Args:
        agent_name: Name of the agent requesting the prompt
        context_mesh: The ContextMesh instance to pull context from  
        template: Optional custom template. Use {context} placeholder for injection.
        include_context_header: Whether to include "[Context Update]" header
        recent_only: Whether to only include recently added context
        max_age_seconds: Maximum age of context to include (if recent_only=True)
        
    Returns:
        Formatted message prompt with injected context
    """
    # Get all accessible context for this agent
    context_data = context_mesh.get_all_for_agent(agent_name)
    
    # TODO: Implement recent_only filtering when ContextItem tracks creation time
    # For now, we'll include all context but this can be enhanced
    if recent_only and max_age_seconds:
        # Filter by age (this would require modification to ContextMesh to track timestamps)
        pass  # Placeholder for future enhancement
    
    if not context_data:
        # No context available
        if template:
            return template.format(context="")
        return ""
    
    # Format context for injection
    context_lines = []
    if include_context_header:
        context_lines.append("[Context Update]")
    
    for key, value in context_data.items():
        formatted_value = _format_context_value(value)
        # Create human-readable key name
        readable_key = key.replace("_", " ").title()
        context_lines.append(f"{readable_key}: {formatted_value}")
    
    context_text = "\n".join(context_lines)
    
    if template:
        return template.format(context=context_text)
    
    return context_text


def build_custom_prompt(
    agent_name: str,
    context_mesh: ContextMesh,
    keys: list[str],
    template: str,
    fallback_text: str = ""
) -> str:
    """
    Build a custom prompt with specific context keys.
    
    Args:
        agent_name: Name of the agent requesting the prompt
        context_mesh: The ContextMesh instance to pull context from
        keys: Specific context keys to include
        template: Template string with {key_name} placeholders
        fallback_text: Text to use if a key is not accessible
        
    Returns:
        Formatted prompt with specific context injected
    """
    # Build context dictionary for template formatting
    template_data = {}
    
    for key in keys:
        value = context_mesh.get(key, agent_name)
        if value is not None:
            template_data[key] = _format_context_value(value)
        else:
            template_data[key] = fallback_text
    
    try:
        return template.format(**template_data)
    except KeyError as e:
        raise ValueError(f"Template contains placeholder {e} not found in keys: {keys}")


# Convenience templates for common use cases
SYSTEM_PROMPT_TEMPLATES = {
    "basic": """You are an AI assistant with access to shared context.

{context}

Use this context to inform your responses and maintain consistency across conversations.""",

    "agent_specific": """You are {agent_name}, an AI agent in a multi-agent system.

{context}

Your role is to use this shared context to collaborate effectively with other agents.""",

    "context_aware": """You have access to the following shared context:

{context}

Always consider this context when responding and update it as needed through tool calls."""
}

MESSAGE_PROMPT_TEMPLATES = {
    "update": """
{context}

Please consider this updated context for the following request:""",

    "reminder": """
Reminder of current context:
{context}

Now, please proceed with:""",

    "context_only": "{context}"
}
