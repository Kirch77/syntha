"""
Syntha SDK Logging Framework

Provides structured logging capabilities for the Syntha SDK with:
- Configurable log levels and formats
- Structured JSON logging for production
- Context-aware logging with agent and operation tracking
- Performance monitoring integration
- Security event logging
"""

import json
import logging
import logging.handlers
import os
import sys
import threading
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Optional, Union


class SynthaFormatter(logging.Formatter):
    """Custom formatter for Syntha SDK logs with structured output."""

    def __init__(self, format_type: str = "standard", include_context: bool = True):
        """
        Initialize the formatter.

        Args:
            format_type: "standard", "json", or "detailed"
            include_context: Whether to include context information
        """
        self.format_type = format_type
        self.include_context = include_context
        super().__init__()

    def format(self, record: logging.LogRecord) -> str:
        """Format the log record according to the specified type."""
        # Add extra context if available
        if hasattr(record, "agent_name"):
            record.agent_name = getattr(record, "agent_name", "unknown")
        if hasattr(record, "operation"):
            record.operation = getattr(record, "operation", "unknown")

        if self.format_type == "json":
            return self._format_json(record)
        elif self.format_type == "detailed":
            return self._format_detailed(record)
        else:
            return self._format_standard(record)

    def _format_json(self, record: logging.LogRecord) -> str:
        """Format as JSON for structured logging."""
        log_entry = {
            "timestamp": datetime.fromtimestamp(record.created).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
            "thread": record.thread,
            "process": record.process,
        }

        # Add context information if available
        if self.include_context:
            for attr in [
                "agent_name",
                "operation",
                "context_key",
                "performance_metrics",
            ]:
                if hasattr(record, attr):
                    log_entry[attr] = getattr(record, attr)

        # Add exception info if present
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)

        # Add extra fields from record
        for key, value in record.__dict__.items():
            if key not in [
                "name",
                "msg",
                "args",
                "levelname",
                "levelno",
                "pathname",
                "filename",
                "module",
                "exc_info",
                "exc_text",
                "stack_info",
                "lineno",
                "funcName",
                "created",
                "msecs",
                "relativeCreated",
                "thread",
                "threadName",
                "processName",
                "process",
                "message",
            ]:
                log_entry[key] = value

        return json.dumps(log_entry, default=str)

    def _format_detailed(self, record: logging.LogRecord) -> str:
        """Format with detailed context information."""
        timestamp = datetime.fromtimestamp(record.created).strftime("%Y-%m-%d %H:%M:%S")

        parts = [
            f"[{timestamp}]",
            f"[{record.levelname:8}]",
            f"[{record.name}]",
        ]

        if hasattr(record, "agent_name"):
            parts.append(f"[Agent:{record.agent_name}]")

        if hasattr(record, "operation"):
            parts.append(f"[Op:{record.operation}]")

        parts.append(f"{record.getMessage()}")

        if hasattr(record, "performance_metrics"):
            parts.append(f"[Metrics:{record.performance_metrics}]")

        base_msg = " ".join(parts)

        if record.exc_info:
            base_msg += "\n" + self.formatException(record.exc_info)

        return base_msg

    def _format_standard(self, record: logging.LogRecord) -> str:
        """Format as standard log message."""
        timestamp = datetime.fromtimestamp(record.created).strftime("%Y-%m-%d %H:%M:%S")

        agent_info = ""
        if hasattr(record, "agent_name"):
            agent_info = f" [{record.agent_name}]"

        return f"[{timestamp}] {record.levelname:8} {record.name}{agent_info}: {record.getMessage()}"


class SynthaLogger:
    """Main logging class for Syntha SDK."""

    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        """Singleton pattern for global logger configuration."""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        """Initialize the logger if not already initialized."""
        if not hasattr(self, "_initialized"):
            self._initialized = True
            self.loggers = {}
            self.configure_logging()

    def configure_logging(
        self,
        level: str = "INFO",
        format_type: str = "standard",
        log_file: Optional[str] = None,
        enable_console: bool = True,
        enable_file: bool = False,
        max_file_size: int = 10 * 1024 * 1024,  # 10MB
        backup_count: int = 5,
    ):
        """
        Configure logging for the entire SDK.

        Args:
            level: Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
            format_type: Format type (standard, json, detailed)
            log_file: Path to log file
            enable_console: Whether to log to console
            enable_file: Whether to log to file
            max_file_size: Maximum size of log file before rotation
            backup_count: Number of backup files to keep
        """
        self.level = getattr(logging, level.upper())
        self.format_type = format_type
        self.log_file = log_file

        # Configure root logger
        root_logger = logging.getLogger("syntha")
        root_logger.setLevel(self.level)

        # Clear existing handlers
        for handler in root_logger.handlers[:]:
            root_logger.removeHandler(handler)

        # Console handler
        if enable_console:
            console_handler = logging.StreamHandler(sys.stdout)
            console_handler.setLevel(self.level)
            console_handler.setFormatter(SynthaFormatter(format_type))
            root_logger.addHandler(console_handler)

        # File handler
        if enable_file and log_file:
            log_path = Path(log_file)
            log_path.parent.mkdir(parents=True, exist_ok=True)

            if max_file_size > 0:
                file_handler = logging.handlers.RotatingFileHandler(
                    log_file, maxBytes=max_file_size, backupCount=backup_count
                )
            else:
                file_handler = logging.FileHandler(log_file)

            file_handler.setLevel(self.level)
            file_handler.setFormatter(SynthaFormatter("json", include_context=True))
            root_logger.addHandler(file_handler)

        # Prevent duplicate logs
        root_logger.propagate = False

    def get_logger(self, name: str) -> logging.Logger:
        """Get a logger for a specific component."""
        if name not in self.loggers:
            self.loggers[name] = logging.getLogger(f"syntha.{name}")
        return self.loggers[name]

    def configure_from_env(self):
        """Configure logging from environment variables."""
        level = os.getenv("SYNTHA_LOG_LEVEL", "INFO")
        format_type = os.getenv("SYNTHA_LOG_FORMAT", "standard")
        log_file = os.getenv("SYNTHA_LOG_FILE")
        enable_console = os.getenv("SYNTHA_LOG_CONSOLE", "true").lower() == "true"
        enable_file = os.getenv("SYNTHA_LOG_FILE_ENABLED", "false").lower() == "true"

        self.configure_logging(
            level=level,
            format_type=format_type,
            log_file=log_file,
            enable_console=enable_console,
            enable_file=enable_file,
        )


class ContextLogger:
    """Context-aware logger for agent operations."""

    def __init__(self, logger: logging.Logger, agent_name: str = None):
        """
        Initialize context logger.

        Args:
            logger: Base logger instance
            agent_name: Name of the agent for context
        """
        self.logger = logger
        self.agent_name = agent_name
        self.context_data = {}

    def set_context(self, **kwargs):
        """Set context data for logging."""
        self.context_data.update(kwargs)

    def clear_context(self):
        """Clear context data."""
        self.context_data.clear()

    def _log_with_context(self, level: int, message: str, **kwargs):
        """Log message with context information."""
        extra = {"agent_name": self.agent_name, **self.context_data, **kwargs}

        self.logger.log(level, message, extra=extra)

    def debug(self, message: str, **kwargs):
        """Log debug message with context."""
        self._log_with_context(logging.DEBUG, message, **kwargs)

    def info(self, message: str, **kwargs):
        """Log info message with context."""
        self._log_with_context(logging.INFO, message, **kwargs)

    def warning(self, message: str, **kwargs):
        """Log warning message with context."""
        self._log_with_context(logging.WARNING, message, **kwargs)

    def error(self, message: str, **kwargs):
        """Log error message with context."""
        self._log_with_context(logging.ERROR, message, **kwargs)

    def critical(self, message: str, **kwargs):
        """Log critical message with context."""
        self._log_with_context(logging.CRITICAL, message, **kwargs)


class PerformanceLogger:
    """Logger for performance monitoring."""

    def __init__(self, logger: logging.Logger):
        """Initialize performance logger."""
        self.logger = logger
        self.start_times = {}

    def start_timer(self, operation: str, **context):
        """Start timing an operation."""
        timer_id = f"{operation}_{id(context)}"
        self.start_times[timer_id] = {
            "start_time": time.time(),
            "operation": operation,
            "context": context,
        }
        return timer_id

    def end_timer(self, timer_id: str, **additional_metrics):
        """End timing and log performance metrics."""
        if timer_id not in self.start_times:
            self.logger.warning(f"Timer {timer_id} not found")
            return

        timer_data = self.start_times.pop(timer_id)
        duration = time.time() - timer_data["start_time"]

        metrics = {
            "duration": duration,
            "operation": timer_data["operation"],
            **timer_data["context"],
            **additional_metrics,
        }

        self.logger.info(
            f"Performance: {timer_data['operation']} completed in {duration:.3f}s",
            extra={"performance_metrics": metrics},
        )

    def log_metrics(self, operation: str, metrics: Dict[str, Any], **context):
        """Log performance metrics directly."""
        self.logger.info(
            f"Performance: {operation} metrics",
            extra={"performance_metrics": metrics, "operation": operation, **context},
        )


class SecurityLogger:
    """Logger for security events."""

    def __init__(self, logger: logging.Logger):
        """Initialize security logger."""
        self.logger = logger

    def log_security_event(
        self,
        event_type: str,
        severity: str,
        description: str,
        agent_name: str = None,
        **context,
    ):
        """Log a security event."""
        security_data = {
            "event_type": event_type,
            "severity": severity,
            "agent_name": agent_name,
            "timestamp": datetime.now().isoformat(),
            **context,
        }

        level = logging.WARNING if severity == "medium" else logging.ERROR

        self.logger.log(
            level,
            f"SECURITY: {event_type} - {description}",
            extra={"security_event": security_data},
        )

    def log_access_attempt(
        self, agent_name: str, resource: str, success: bool, reason: str = None
    ):
        """Log an access attempt."""
        self.log_security_event(
            event_type="access_attempt",
            severity="low" if success else "medium",
            description=f"Agent {agent_name} {'accessed' if success else 'denied access to'} {resource}",
            agent_name=agent_name,
            resource=resource,
            success=success,
            reason=reason,
        )

    def log_authentication_event(
        self, agent_name: str, success: bool, method: str = None, reason: str = None
    ):
        """Log an authentication event."""
        self.log_security_event(
            event_type="authentication",
            severity="low" if success else "high",
            description=f"Agent {agent_name} authentication {'successful' if success else 'failed'}",
            agent_name=agent_name,
            success=success,
            method=method,
            reason=reason,
        )


# Global logger instance
_syntha_logger = SynthaLogger()

# Configure from environment on import
_syntha_logger.configure_from_env()


def get_logger(name: str) -> logging.Logger:
    """Get a logger for a specific component."""
    return _syntha_logger.get_logger(name)


def get_context_logger(name: str, agent_name: str = None) -> ContextLogger:
    """Get a context-aware logger."""
    base_logger = get_logger(name)
    return ContextLogger(base_logger, agent_name)


def get_performance_logger(name: str) -> PerformanceLogger:
    """Get a performance logger."""
    base_logger = get_logger(name)
    return PerformanceLogger(base_logger)


def get_security_logger(name: str) -> SecurityLogger:
    """Get a security logger."""
    base_logger = get_logger(name)
    return SecurityLogger(base_logger)


def configure_logging(**kwargs):
    """Configure global logging settings."""
    _syntha_logger.configure_logging(**kwargs)


# Export main classes and functions
__all__ = [
    "SynthaLogger",
    "SynthaFormatter",
    "ContextLogger",
    "PerformanceLogger",
    "SecurityLogger",
    "get_logger",
    "get_context_logger",
    "get_performance_logger",
    "get_security_logger",
    "configure_logging",
]
