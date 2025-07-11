"""
Syntha SDK - Context-Based Multi-Agent Framework

Copyright 2025 Syntha

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A lightweight, framework-agnostic SDK for building multi-agent AI systems
where agents share context through persistent storage and real-time tool calls.
"""

from .context import ContextMesh
from .prompts import build_system_prompt, build_message_prompt, inject_context_into_prompt
from .tools import ToolHandler, get_all_tool_schemas
from .reports import OutcomeLogger
from .persistence import DatabaseBackend, SQLiteBackend, create_database_backend

__version__ = "0.2.0"
__author__ = "Syntha Team"

__all__ = [
    "ContextMesh",
    "build_system_prompt", 
    "build_message_prompt",
    "inject_context_into_prompt",
    "ToolHandler",
    "get_all_tool_schemas",
    "OutcomeLogger",
    "DatabaseBackend",
    "SQLiteBackend", 
    "create_database_backend"
]
