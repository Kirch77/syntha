# Exceptions API Reference

Syntha defines specific exception classes to handle different error conditions that may occur during context management and framework integration operations.

## Core Exception Classes

### SynthaError

Base exception class for all Syntha-related errors.

```python
class SynthaError(Exception):
    """Base exception for all Syntha errors."""
    pass
```

### ContextError

Base class for context-related errors.

```python
class ContextError(SynthaError):
    """Base exception for context-related errors."""
    pass
```

## Context Management Exceptions

### ContextNotFoundError

Raised when attempting to access context that doesn't exist.

```python
class ContextNotFoundError(ContextError):
    """Raised when requested context is not found."""
    pass
```

**Example:**
```python
try:
    data = handler.get_context("nonexistent_key")
except ContextNotFoundError:
    print("Context not found")
```

### InvalidContextKeyError

Raised when using an invalid context key format.

```python
class InvalidContextKeyError(ContextError):
    """Raised when context key format is invalid."""
    pass
```

**Example:**
```python
try:
    handler.push_context("", data)  # Empty key
except InvalidContextKeyError:
    print("Invalid context key")
```

### ContextDataError

Raised when context data is invalid or corrupted.

```python
class ContextDataError(ContextError):
    """Raised when context data is invalid."""
    pass
```

### TopicError

Raised for topic-related operations.

```python
class TopicError(ContextError):
    """Raised for topic-related errors."""
    pass
```

## Framework Integration Exceptions

### FrameworkError

Base class for framework adapter errors.

```python
class FrameworkError(SynthaError):
    """Base exception for framework adapter errors."""
    pass
```

### UnsupportedFrameworkError

Raised when requesting an unsupported framework.

```python
class UnsupportedFrameworkError(FrameworkError):
    """Raised when framework is not supported."""
    pass
```

**Example:**
```python
try:
    adapter = create_framework_adapter("unsupported_framework", handler)
except UnsupportedFrameworkError:
    print("Framework not supported")
```

### AdapterCreationError

Raised when adapter creation fails.

```python
class AdapterCreationError(FrameworkError):
    """Raised when adapter creation fails."""
    pass
```

### ToolExecutionError

Raised when tool execution fails.

```python
class ToolExecutionError(FrameworkError):
    """Raised when tool execution fails."""
    pass
```

**Example:**
```python
try:
    result = adapter.execute_function("invalid_function", {})
except ToolExecutionError as e:
    print(f"Tool execution failed: {e}")
```

## Database and Persistence Exceptions

### PersistenceError

Base class for persistence-related errors.

```python
class PersistenceError(SynthaError):
    """Base exception for persistence errors."""
    pass
```

### DatabaseConnectionError

Raised when database connection fails.

```python
class DatabaseConnectionError(PersistenceError):
    """Raised when database connection fails."""
    pass
```

### DatabaseOperationError

Raised when database operations fail.

```python
class DatabaseOperationError(PersistenceError):
    """Raised when database operations fail."""
    pass
```

### SchemaError

Raised for database schema issues.

```python
class SchemaError(PersistenceError):
    """Raised for database schema errors."""
    pass
```

## Security and Access Control Exceptions

### SecurityError

Base class for security-related errors.

```python
class SecurityError(SynthaError):
    """Base exception for security errors."""
    pass
```

### PermissionDeniedError

Raised when access is denied due to insufficient permissions.

```python
class PermissionDeniedError(SecurityError):
    """Raised when access is denied."""
    pass
```

**Example:**
```python
try:
    handler.push_context("restricted_data", data)
except PermissionDeniedError:
    print("Access denied")
```

### AuthenticationError

Raised when authentication fails.

```python
class AuthenticationError(SecurityError):
    """Raised when authentication fails."""
    pass
```

### AuthorizationError

Raised when authorization fails.

```python
class AuthorizationError(SecurityError):
    """Raised when authorization fails."""
    pass
```

## Configuration and Validation Exceptions

### ConfigurationError

Raised for configuration-related errors.

```python
class ConfigurationError(SynthaError):
    """Raised for configuration errors."""
    pass
```

### ValidationError

Raised when data validation fails.

```python
class ValidationError(SynthaError):
    """Raised when validation fails."""
    pass
```

## Usage Examples

### Basic Error Handling

```python
from syntha import ContextMesh, ToolHandler
from syntha.exceptions import (
    ContextNotFoundError,
    InvalidContextKeyError,
    PermissionDeniedError
)

mesh = ContextMesh(user_id="user123")
handler = ToolHandler(mesh, "Agent")

# Handle missing context
try:
    data = handler.get_context("missing_key")
except ContextNotFoundError:
    print("Context not found, using default")
    data = {"default": True}

# Handle invalid keys
try:
    handler.push_context("", {"data": "value"})
except InvalidContextKeyError:
    print("Invalid key format")

# Handle permission errors
try:
    handler.push_context("restricted_key", {"secret": "data"})
except PermissionDeniedError as e:
    print(f"Access denied: {e}")
```

### Framework Error Handling

```python
from syntha.framework_adapters import create_framework_adapter
from syntha.exceptions import (
    UnsupportedFrameworkError,
    AdapterCreationError,
    ToolExecutionError
)

# Handle unsupported frameworks
try:
    adapter = create_framework_adapter("fake_framework", handler)
except UnsupportedFrameworkError:
    print("Framework not supported, falling back to default")
    adapter = create_framework_adapter("openai", handler)

# Handle adapter creation errors
try:
    tools = adapter.create_tools()
except AdapterCreationError as e:
    print(f"Failed to create tools: {e}")
    tools = []

# Handle tool execution errors
try:
    result = adapter.execute_function("push_context", {
        "context_key": "test",
        "context_data": {"test": True}
    })
except ToolExecutionError as e:
    print(f"Tool execution failed: {e}")
```

### Database Error Handling

```python
from syntha.exceptions import (
    DatabaseConnectionError,
    DatabaseOperationError
)

try:
    mesh = ContextMesh(
        user_id="user123",
        database_url="postgresql://invalid:connection@localhost/db"
    )
except DatabaseConnectionError:
    print("Failed to connect to PostgreSQL, using SQLite")
    mesh = ContextMesh(user_id="user123")  # Falls back to SQLite

try:
    handler.push_context("large_data", very_large_data)
except DatabaseOperationError as e:
    print(f"Database operation failed: {e}")
```

### Comprehensive Error Handling

```python
def safe_context_operation(handler, operation, *args, **kwargs):
    """Safely execute a context operation with comprehensive error handling."""
    
    try:
        return getattr(handler, operation)(*args, **kwargs)
    
    except ContextNotFoundError:
        print(f"Context not found for operation: {operation}")
        return None
    
    except InvalidContextKeyError:
        print(f"Invalid context key in operation: {operation}")
        return None
    
    except PermissionDeniedError:
        print(f"Permission denied for operation: {operation}")
        return None
    
    except DatabaseOperationError as e:
        print(f"Database error in operation {operation}: {e}")
        return None
    
    except SynthaError as e:
        print(f"Syntha error in operation {operation}: {e}")
        return None
    
    except Exception as e:
        print(f"Unexpected error in operation {operation}: {e}")
        return None

# Usage
result = safe_context_operation(handler, "get_context", "some_key")
if result is not None:
    print(f"Operation successful: {result}")
```

## Custom Exception Handling

### Creating Custom Exceptions

```python
class CustomBusinessLogicError(SynthaError):
    """Custom exception for business logic errors."""
    
    def __init__(self, message, error_code=None):
        super().__init__(message)
        self.error_code = error_code

# Usage
def validate_business_rules(data):
    if not data.get("required_field"):
        raise CustomBusinessLogicError(
            "Missing required field",
            error_code="MISSING_FIELD"
        )

try:
    validate_business_rules(user_data)
except CustomBusinessLogicError as e:
    print(f"Business logic error: {e} (Code: {e.error_code})")
```

## Error Context and Debugging

### Enhanced Error Information

Many Syntha exceptions include additional context for debugging:

```python
try:
    handler.push_context("invalid_key", data)
except InvalidContextKeyError as e:
    print(f"Error: {e}")
    print(f"Key that caused error: {e.context_key}")
    print(f"Validation rules: {e.validation_info}")

try:
    adapter.execute_function("unknown_function", {})
except ToolExecutionError as e:
    print(f"Error: {e}")
    print(f"Function name: {e.function_name}")
    print(f"Arguments: {e.arguments}")
    print(f"Framework: {e.framework}")
```

## Best Practices

1. **Specific Exception Handling**: Catch specific exceptions rather than generic ones
2. **Graceful Degradation**: Provide fallbacks when operations fail
3. **Logging**: Log exceptions with appropriate detail levels
4. **User-Friendly Messages**: Convert technical errors to user-friendly messages
5. **Context Preservation**: Include relevant context in error messages

## Complete Example

```python
#!/usr/bin/env python3
"""
Comprehensive exception handling example for Syntha operations.
"""

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter
from syntha.exceptions import *
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def robust_syntha_operations():
    """Demonstrate robust error handling for Syntha operations."""
    
    mesh = None
    try:
        # Initialize with error handling
        mesh = ContextMesh(user_id="demo_user")
        handler = ToolHandler(mesh, "RobustAgent")
        
        # Safe context operations
        try:
            handler.push_context("test_data", {"value": 123})
            logger.info("Context pushed successfully")
        except (InvalidContextKeyError, ValidationError) as e:
            logger.error(f"Invalid data: {e}")
            return False
        
        # Safe context retrieval
        try:
            data = handler.get_context("test_data")
            logger.info(f"Retrieved data: {data}")
        except ContextNotFoundError:
            logger.warning("Context not found, using defaults")
            data = {"default": True}
        
        # Safe framework adapter creation
        try:
            adapter = create_framework_adapter("openai", handler)
            tools = adapter.create_tools()
            logger.info(f"Created {len(tools)} tools")
        except UnsupportedFrameworkError:
            logger.error("OpenAI not supported, using fallback")
            adapter = None
        except AdapterCreationError as e:
            logger.error(f"Failed to create adapter: {e}")
            adapter = None
        
        return True
        
    except DatabaseConnectionError:
        logger.error("Database connection failed")
        return False
    except ConfigurationError as e:
        logger.error(f"Configuration error: {e}")
        return False
    except SynthaError as e:
        logger.error(f"Syntha error: {e}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return False
    finally:
        if mesh:
            mesh.close()
            logger.info("Cleanup completed")

if __name__ == "__main__":
    success = robust_syntha_operations()
    print(f"Operations {'succeeded' if success else 'failed'}")
```

## See Also

- [Tool Handler API](tool-handler.md)
- [Framework Adapters API](framework-adapters.md)
- [Context Mesh API](context-mesh.md)
- [Error Handling Best Practices](../user-guide/how-to/setup.md)
