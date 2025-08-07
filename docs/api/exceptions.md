# Exceptions API Reference

Syntha defines a consistent exception hierarchy with rich context and suggestions.

## Core Classes

```python
from syntha.exceptions import (
    SynthaError,
    SynthaConfigurationError,
    SynthaConnectionError,
    SynthaValidationError,
    SynthaPermissionError,
    SynthaContextError,
    SynthaPersistenceError,
    SynthaToolError,
    SynthaSecurityError,
    SynthaPerformanceError,
    SynthaTimeoutError,
    SynthaFrameworkError,
    ErrorHandler,
    handle_syntha_error,
)
```

## Usage

```python
from syntha import ContextMesh, ToolHandler
from syntha.exceptions import SynthaError

mesh = ContextMesh(user_id="user123")
handler = ToolHandler(mesh, "Agent")

try:
    handler.handle_tool_call("push_context", key="demo", value="42")
except SynthaError as e:
    print(e.to_dict())
```

## Decorator

```python
from syntha.exceptions import handle_syntha_error

@handle_syntha_error
def do_work():
    raise ValueError("boom")

try:
    do_work()
except SynthaError as e:
    ...
```

## Error mapping

`ErrorHandler` converts non-Syntha exceptions into specific Syntha errors when possible (e.g., connection/validation/permission/timeout).
