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

Production-ready features:
- Comprehensive logging with structured output
- Custom exception hierarchy with recovery suggestions
- Multi-database support (SQLite, PostgreSQL)
- Security framework with access control
- Performance monitoring and benchmarking
- 168+ comprehensive tests
"""

# Core components
from .context import ContextMesh

# Error handling
from .exceptions import (
    ErrorHandler,
    SynthaConfigurationError,
    SynthaConnectionError,
    SynthaContextError,
    SynthaError,
    SynthaPerformanceError,
    SynthaPermissionError,
    SynthaPersistenceError,
    SynthaSecurityError,
    SynthaTimeoutError,
    SynthaToolError,
    SynthaValidationError,
    handle_syntha_error,
)

# Logging framework
from .logging import (
    configure_logging,
    get_context_logger,
    get_logger,
    get_performance_logger,
    get_security_logger,
)
from .persistence import DatabaseBackend, SQLiteBackend, create_database_backend
from .prompts import (
    build_message_prompt,
    build_system_prompt,
    inject_context_into_prompt,
)
from .reports import OutcomeLogger
from .tools import ToolHandler, get_all_tool_schemas

__version__ = "0.2.0"
__author__ = "Syntha Team"

__all__ = [
    # Core components
    "ContextMesh",
    "build_system_prompt",
    "build_message_prompt",
    "inject_context_into_prompt",
    "ToolHandler",
    "get_all_tool_schemas",
    "OutcomeLogger",
    "DatabaseBackend",
    "SQLiteBackend",
    "create_database_backend",
    # Logging
    "get_logger",
    "get_context_logger",
    "get_performance_logger",
    "get_security_logger",
    "configure_logging",
    # Error handling
    "SynthaError",
    "SynthaConfigurationError",
    "SynthaConnectionError",
    "SynthaValidationError",
    "SynthaPermissionError",
    "SynthaContextError",
    "SynthaPersistenceError",
    "SynthaToolError",
    "SynthaSecurityError",
    "SynthaPerformanceError",
    "SynthaTimeoutError",
    "ErrorHandler",
    "handle_syntha_error",
]
