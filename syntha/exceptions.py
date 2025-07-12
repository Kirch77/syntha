"""
Syntha SDK Exception Classes

Comprehensive error handling for the Syntha SDK with:
- Custom exception hierarchy
- Detailed error messages
- Context preservation
- Error recovery suggestions
- Logging integration
"""

import traceback
from datetime import datetime
from typing import Any, Dict, Optional, Union


class SynthaError(Exception):
    """Base exception class for all Syntha SDK errors."""

    def __init__(
        self,
        message: str,
        error_code: str = None,
        context: Dict[str, Any] = None,
        cause: Exception = None,
        suggestions: list = None,
    ):
        """
        Initialize base Syntha error.

        Args:
            message: Human-readable error message
            error_code: Machine-readable error code
            context: Additional context information
            cause: Original exception that caused this error
            suggestions: List of suggestions for fixing the error
        """
        super().__init__(message)
        self.message = message
        self.error_code = error_code or self.__class__.__name__
        self.context = context or {}
        self.cause = cause
        self.suggestions = suggestions or []
        self.timestamp = datetime.now().isoformat()

    def __str__(self) -> str:
        """String representation of the error."""
        parts = [f"[{self.error_code}] {self.message}"]

        if self.context:
            parts.append(f"Context: {self.context}")

        if self.suggestions:
            parts.append(f"Suggestions: {'; '.join(self.suggestions)}")

        if self.cause:
            parts.append(f"Caused by: {self.cause}")

        return " | ".join(parts)

    def to_dict(self) -> Dict[str, Any]:
        """Convert error to dictionary for logging/serialization."""
        return {
            "error_type": self.__class__.__name__,
            "error_code": self.error_code,
            "message": self.message,
            "context": self.context,
            "suggestions": self.suggestions,
            "timestamp": self.timestamp,
            "cause": str(self.cause) if self.cause else None,
            "traceback": traceback.format_exc() if self.cause else None,
        }


class SynthaConfigurationError(SynthaError):
    """Error in SDK configuration."""

    def __init__(self, message: str, config_key: str = None, **kwargs):
        """
        Initialize configuration error.

        Args:
            message: Error message
            config_key: Configuration key that caused the error
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if config_key:
            context["config_key"] = config_key

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check your configuration parameters",
                "Verify environment variables are set correctly",
                "Consult documentation for valid configuration options",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaConnectionError(SynthaError):
    """Error connecting to external services."""

    def __init__(self, message: str, service: str = None, **kwargs):
        """
        Initialize connection error.

        Args:
            message: Error message
            service: Service that failed to connect
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if service:
            context["service"] = service

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check network connectivity",
                "Verify service is running and accessible",
                "Check firewall and port settings",
                "Verify credentials and permissions",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaValidationError(SynthaError):
    """Error in data validation."""

    def __init__(self, message: str, field: str = None, value: Any = None, **kwargs):
        """
        Initialize validation error.

        Args:
            message: Error message
            field: Field that failed validation
            value: Invalid value
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if field:
            context["field"] = field
        if value is not None:
            context["value"] = str(value)

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check input data format and types",
                "Verify required fields are provided",
                "Consult API documentation for valid values",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaPermissionError(SynthaError):
    """Error due to insufficient permissions."""

    def __init__(self, message: str, agent: str = None, resource: str = None, **kwargs):
        """
        Initialize permission error.

        Args:
            message: Error message
            agent: Agent that lacks permissions
            resource: Resource that couldn't be accessed
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if agent:
            context["agent"] = agent
        if resource:
            context["resource"] = resource

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check agent permissions and access levels",
                "Verify agent is subscribed to required topics",
                "Contact administrator for permission escalation",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaContextError(SynthaError):
    """Error related to context operations."""

    def __init__(self, message: str, key: str = None, operation: str = None, **kwargs):
        """
        Initialize context error.

        Args:
            message: Error message
            key: Context key that caused the error
            operation: Operation that failed
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if key:
            context["key"] = key
        if operation:
            context["operation"] = operation

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Verify context key exists",
                "Check agent has access to the context",
                "Ensure context hasn't expired (TTL)",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaPersistenceError(SynthaError):
    """Error in persistence operations."""

    def __init__(
        self, message: str, backend: str = None, operation: str = None, **kwargs
    ):
        """
        Initialize persistence error.

        Args:
            message: Error message
            backend: Database backend that failed
            operation: Database operation that failed
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if backend:
            context["backend"] = backend
        if operation:
            context["operation"] = operation

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check database connection and credentials",
                "Verify database server is running",
                "Check disk space and permissions",
                "Review database logs for details",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaToolError(SynthaError):
    """Error in tool execution."""

    def __init__(self, message: str, tool: str = None, agent: str = None, **kwargs):
        """
        Initialize tool error.

        Args:
            message: Error message
            tool: Tool that failed
            agent: Agent that executed the tool
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if tool:
            context["tool"] = tool
        if agent:
            context["agent"] = agent

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check tool parameters and arguments",
                "Verify agent has permission to use the tool",
                "Check tool implementation for bugs",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaSecurityError(SynthaError):
    """Security-related error."""

    def __init__(self, message: str, security_event: str = None, **kwargs):
        """
        Initialize security error.

        Args:
            message: Error message
            security_event: Type of security event
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if security_event:
            context["security_event"] = security_event

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Review security logs for suspicious activity",
                "Check authentication and authorization settings",
                "Ensure input validation is working correctly",
                "Contact security team if necessary",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaPerformanceError(SynthaError):
    """Performance-related error."""

    def __init__(
        self, message: str, operation: str = None, duration: float = None, **kwargs
    ):
        """
        Initialize performance error.

        Args:
            message: Error message
            operation: Operation that performed poorly
            duration: Duration of the slow operation
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if operation:
            context["operation"] = operation
        if duration:
            context["duration"] = duration

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Check system resource usage",
                "Optimize queries and data structures",
                "Consider caching frequently accessed data",
                "Review performance monitoring metrics",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class SynthaTimeoutError(SynthaError):
    """Timeout error."""

    def __init__(
        self, message: str, timeout: float = None, operation: str = None, **kwargs
    ):
        """
        Initialize timeout error.

        Args:
            message: Error message
            timeout: Timeout value that was exceeded
            operation: Operation that timed out
            **kwargs: Additional arguments passed to base class
        """
        context = kwargs.get("context", {})
        if timeout:
            context["timeout"] = timeout
        if operation:
            context["operation"] = operation

        suggestions = kwargs.get("suggestions", [])
        if not suggestions:
            suggestions = [
                "Increase timeout values if appropriate",
                "Check system performance and load",
                "Optimize slow operations",
                "Consider asynchronous processing",
            ]

        super().__init__(message, context=context, suggestions=suggestions, **kwargs)


class ErrorHandler:
    """Central error handler for the Syntha SDK."""

    def __init__(self, logger=None):
        """
        Initialize error handler.

        Args:
            logger: Logger instance for error logging
        """
        self.logger = logger

    def handle_error(
        self, error: Exception, context: Dict[str, Any] = None
    ) -> SynthaError:
        """
        Handle and transform errors into Syntha errors.

        Args:
            error: Original exception
            context: Additional context information

        Returns:
            SynthaError: Transformed error
        """
        # If already a Syntha error, just log and return
        if isinstance(error, SynthaError):
            if self.logger:
                self.logger.error(f"Syntha error: {error}", extra=error.to_dict())
            return error

        # Transform common errors
        if isinstance(error, ConnectionError):
            syntha_error = SynthaConnectionError(
                message=str(error), context=context, cause=error
            )
        elif isinstance(error, ValueError):
            syntha_error = SynthaValidationError(
                message=str(error), context=context, cause=error
            )
        elif isinstance(error, PermissionError):
            syntha_error = SynthaPermissionError(
                message=str(error), context=context, cause=error
            )
        elif isinstance(error, TimeoutError):
            syntha_error = SynthaTimeoutError(
                message=str(error), context=context, cause=error
            )
        else:
            # Generic transformation
            syntha_error = SynthaError(message=str(error), context=context, cause=error)

        # Log the error
        if self.logger:
            self.logger.error(
                f"Error transformed: {syntha_error}", extra=syntha_error.to_dict()
            )

        return syntha_error

    def wrap_function(self, func, context: Dict[str, Any] = None):
        """
        Decorator to wrap functions with error handling.

        Args:
            func: Function to wrap
            context: Additional context for errors

        Returns:
            Wrapped function
        """

        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                raise self.handle_error(e, context)

        return wrapper


def handle_syntha_error(func):
    """
    Decorator to handle Syntha errors in functions.

    Args:
        func: Function to decorate

    Returns:
        Decorated function
    """

    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            handler = ErrorHandler()
            raise handler.handle_error(e)

    return wrapper


# Export all exception classes
__all__ = [
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
