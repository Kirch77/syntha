# Tool Access Control Implementation

## Overview

This document summarizes the comprehensive tool access control feature implemented for Syntha, allowing users to specify which tools AI agents can access.

## ✨ Features Implemented

### 1. **Basic Access Control**
- **Allowed Tools**: Specify exactly which tools an agent can use
- **Denied Tools**: Block specific tools from being used
- **Precedence Rules**: Denied tools take precedence over allowed tools
- **Empty Lists**: Empty allowed_tools list denies all tools

### 2. **Role-Based Access Control**
- **Predefined Roles**: `readonly`, `contributor`, `moderator`, `admin`
- **Custom Roles**: Create your own role definitions
- **Role Transitions**: Change agent roles dynamically
- **Role Info**: Query available roles and their permissions

### 3. **Convenience Functions**
- **Restricted Handlers**: Quick setup with `safe`, `minimal`, `readonly` modes
- **Multi-Agent Handlers**: Bulk creation for multiple agents
- **Role-Based Handlers**: Create handlers directly from roles

### 4. **Dynamic Access Control**
- **Runtime Modifications**: Change access permissions dynamically
- **Add/Remove Tools**: Individual tool access management
- **Access Summaries**: Get detailed access information
- **Tool Availability**: Check if specific tools are accessible

### 5. **Integration Features**
- **Schema Filtering**: Only return schemas for allowed tools
- **Hybrid Handlers**: Access control works with custom tools
- **Error Handling**: Clear error messages for denied access
- **Performance**: Minimal overhead for access control

## 🏗️ Architecture

### Core Classes

#### `ToolHandler` (Enhanced)
```python
ToolHandler(
    context_mesh: ContextMesh,
    agent_name: Optional[str] = None,
    allowed_tools: Optional[List[str]] = None,      # ✨ NEW
    denied_tools: Optional[List[str]] = None,       # ✨ NEW  
    role_based_access: Optional[Dict] = None        # ✨ NEW
)
```

#### New Methods Added
- `get_available_tools()` - List accessible tools
- `has_tool_access(tool_name)` - Check tool access
- `set_allowed_tools(tools)` - Update allowed tools
- `set_denied_tools(tools)` - Update denied tools
- `add_allowed_tool(tool)` - Add single tool
- `remove_allowed_tool(tool)` - Remove single tool
- `add_denied_tool(tool)` - Deny single tool
- `remove_denied_tool(tool)` - Allow single tool
- `get_access_summary()` - Get access information
- `set_agent_role(role)` - Change agent role

### Convenience Functions

#### Role-Based Creation
```python
create_role_based_handler(mesh, agent, role, custom_roles=None)
create_restricted_handler(mesh, agent, level)  # safe/minimal/readonly
create_multi_agent_handlers(mesh, configs)
```

#### Utility Functions
```python
get_role_info(role=None)  # Get role information
PREDEFINED_ROLES  # Dictionary of built-in roles
```

## 📚 Usage Examples

### Basic Access Control
```python
# Read-only agent
handler = ToolHandler(mesh, "agent1", 
    allowed_tools=["get_context", "list_context", "discover_topics"])

# Safe agent (no delete)
handler = ToolHandler(mesh, "agent2",
    denied_tools=["delete_topic"])
```

### Role-Based Access
```python
# Use predefined role
handler = create_role_based_handler(mesh, "agent1", "contributor")

# Custom role
custom_roles = {
    "analyst": {
        "description": "Data analysis role",
        "tools": ["get_context", "list_context", "push_context"]
    }
}
handler = create_role_based_handler(mesh, "agent1", "analyst", custom_roles)
```

### Multi-Agent Setup
```python
configs = {
    "admin": {"role": "admin"},
    "user": {"role": "readonly"},
    "analyst": {"allowed_tools": ["get_context", "push_context"]},
    "safe_bot": {"denied_tools": ["delete_topic"]}
}
handlers = create_multi_agent_handlers(mesh, configs)
```

### Dynamic Control
```python
# Start with full access
handler = ToolHandler(mesh, "agent1")

# Restrict during operation
handler.set_allowed_tools(["get_context", "push_context"])

# Grant emergency access
handler.remove_denied_tool("delete_topic")

# Check access
if handler.has_tool_access("delete_topic"):
    result = handler.handle_tool_call("delete_topic", topic="temp", confirm=True)
```

## 🎭 Predefined Roles

| Role | Description | Tools |
|------|-------------|-------|
| `readonly` | Read-only access | `get_context`, `list_context`, `discover_topics` |
| `contributor` | Read/write access | All except `delete_topic` |
| `moderator` | Enhanced contributor | All except `delete_topic` |
| `admin` | Full access | All tools |

## 🛡️ Security Features

### Access Control Rules
1. **Denied tools take precedence** over allowed tools
2. **Empty allowed_tools** denies all tools
3. **Unknown tools** are automatically excluded
4. **Agent name validation** for tool calls
5. **Clear error messages** for denied access

### Error Responses
```python
{
    "success": False,
    "error": "Access denied to tool: delete_topic",
    "reason": "Agent 'agent1' does not have permission to use this tool",
    "available_tools": ["get_context", "push_context", "list_context"],
    "agent_role": "contributor"
}
```

## 🧪 Testing

### Comprehensive Test Suite
- **49 total tests** covering all access control features
- **Unit tests**: Basic functionality, edge cases, error handling
- **Integration tests**: Real-world scenarios, performance, concurrency
- **Test markers**: `@pytest.mark.access_control` for easy filtering
- **CI Integration**: Automatically runs in GitHub Actions

### Test Categories
- **Basic Access Control**: allowed/denied tools, precedence rules
- **Role-Based Access**: predefined/custom roles, role transitions
- **Dynamic Control**: runtime modifications, access summaries
- **Multi-Agent**: bulk setup, team scenarios
- **Integration**: LLM compatibility, hybrid handlers
- **Performance**: overhead measurement, large-scale setup
- **Edge Cases**: concurrency, error handling, validation

### Running Tests
```bash
# All access control tests
python -m pytest -m access_control

# Specific categories
python -m pytest -m "access_control and unit"
python -m pytest -m "access_control and integration"

# Use test runner script
python scripts/test_access_control.py
python scripts/test_access_control.py --categories
```

## 🚀 Performance

### Benchmarks
- **Schema Generation**: <50% overhead with access control
- **Tool Calls**: <20% overhead with access control
- **Large Scale**: 100 agents created in <1 second
- **Memory**: Minimal additional memory usage

### Optimizations
- **Lazy Filtering**: Handlers filtered only when needed
- **Set Operations**: Fast intersection/difference operations
- **Caching**: Access summaries cached for performance
- **Thread Safety**: Safe for concurrent modifications

## 🔄 Backward Compatibility

### Full Compatibility
- **Existing code works unchanged** - all parameters are optional
- **Default behavior unchanged** - agents have full access by default
- **API additions only** - no breaking changes to existing methods
- **Schema compatibility** - existing tool schemas work unchanged

### Migration Path
```python
# Before: Full access (unchanged)
handler = ToolHandler(mesh, "agent1")

# After: Optional access control
handler = ToolHandler(mesh, "agent1", allowed_tools=["get_context"])
```

## 📁 Files Added/Modified

### New Files
- `tests/unit/test_tool_access_control.py` - Unit tests (36 tests)
- `tests/integration/test_tool_access_control_integration.py` - Integration tests (13 tests)
- `examples/tool_access_control.py` - Comprehensive examples
- `scripts/test_access_control.py` - Test runner script

### Modified Files
- `syntha/tools.py` - Enhanced ToolHandler class
- `syntha/__init__.py` - Added new exports
- `pytest.ini` - Added access_control marker
- `examples/tool_access_control.py` - Updated examples

## 🎯 Real-World Use Cases

### Development Team
```python
team_configs = {
    "tech_lead": {"role": "admin"},
    "senior_dev": {"role": "contributor"},
    "junior_dev": {"allowed_tools": ["get_context", "push_context", "list_context"]},
    "pm": {"allowed_tools": ["get_context", "list_context", "discover_topics"]},
}
```

### Customer Support
```python
support_configs = {
    "support_manager": {"role": "admin"},
    "senior_support": {"role": "contributor"},
    "junior_support": {"role": "readonly"},
    "support_bot": {"allowed_tools": ["get_context", "push_context"]},
}
```

### Research Environment
```python
research_configs = {
    "lab_director": {"role": "admin"},
    "researcher": {"role": "contributor"},
    "data_analyst": {"allowed_tools": ["get_context", "push_context", "list_context"]},
    "intern": {"role": "readonly"},
}
```

## 📋 Implementation Summary

### ✅ Completed Features
- [x] Basic allowed/denied tools
- [x] Role-based access control
- [x] Dynamic access modification
- [x] Multi-agent setup
- [x] Convenience functions
- [x] Error handling & validation
- [x] Performance optimization
- [x] Comprehensive testing
- [x] Documentation & examples
- [x] CI/CD integration
- [x] Backward compatibility

### 🎉 Key Benefits
- **Security**: Control what tools agents can access
- **Flexibility**: Multiple ways to configure access
- **Performance**: Minimal overhead
- **Usability**: Easy-to-use convenience functions
- **Reliability**: Comprehensive test coverage
- **Maintainability**: Clean, well-documented code

This implementation provides a robust, flexible, and secure way to control tool access in Syntha, meeting enterprise security requirements while maintaining ease of use. 