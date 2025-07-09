"""
Syntha SDK - Prompt-Based Multi-Agent Context Framework

A lightweight, framework-agnostic SDK for building multi-agent AI systems
where agents share context through pure prompt injection and real-time tool calls.
"""

from .context import ContextMesh
from .prompts import build_system_prompt, build_message_prompt
from .tools import get_context_tool_schema, handle_get_context_call, ToolHandler
from .reports import OutcomeLogger

__version__ = "0.2.0"
__author__ = "Syntha Team"

__all__ = [
    "ContextMesh",
    "build_system_prompt", 
    "build_message_prompt",
    "get_context_tool_schema",
    "handle_get_context_call",
    "ToolHandler",
    "OutcomeLogger",
]
