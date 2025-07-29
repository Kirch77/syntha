"""
Comprehensive unit tests for Tool Access Control functionality.

Tests the new access control features including:
- Basic allowed/denied tools
- Role-based access control
- Dynamic access modification
- Multi-agent setups
- Access validation and error handling
"""

import pytest
from unittest.mock import Mock, patch

pytestmark = [pytest.mark.access_control, pytest.mark.tools, pytest.mark.unit]

from syntha.context import ContextMesh
from syntha.tools import (
    ToolHandler,
    create_role_based_handler,
    create_restricted_handler,
    create_multi_agent_handlers,
    get_role_info,
    PREDEFINED_ROLES
)


class TestBasicAccessControl:
    """Test basic access control with allowed_tools and denied_tools."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_default_access_all_tools(self):
        """Test that default handler has access to all tools."""
        handler = ToolHandler(self.mesh, "agent1")
        available_tools = handler.get_available_tools()
        
        assert len(available_tools) == 7
        assert "get_context" in available_tools
        assert "push_context" in available_tools
        assert "list_context" in available_tools
        assert "subscribe_to_topics" in available_tools
        assert "discover_topics" in available_tools
        assert "unsubscribe_from_topics" in available_tools
        assert "delete_topic" in available_tools

    def test_allowed_tools_restriction(self):
        """Test restricting access to only allowed tools."""
        allowed_tools = ["get_context", "list_context", "discover_topics"]
        handler = ToolHandler(self.mesh, "agent1", allowed_tools=allowed_tools)
        
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 3
        assert set(available_tools) == set(allowed_tools)

    def test_denied_tools_restriction(self):
        """Test denying access to specific tools."""
        denied_tools = ["delete_topic", "unsubscribe_from_topics"]
        handler = ToolHandler(self.mesh, "agent1", denied_tools=denied_tools)
        
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 5
        assert "delete_topic" not in available_tools
        assert "unsubscribe_from_topics" not in available_tools
        assert "get_context" in available_tools

    def test_denied_tools_take_precedence(self):
        """Test that denied_tools takes precedence over allowed_tools."""
        allowed_tools = ["get_context", "push_context", "delete_topic"]
        denied_tools = ["delete_topic"]
        
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=allowed_tools, 
            denied_tools=denied_tools
        )
        
        available_tools = handler.get_available_tools()
        assert "delete_topic" not in available_tools
        assert "get_context" in available_tools
        assert "push_context" in available_tools

    def test_empty_allowed_tools_denies_all(self):
        """Test that empty allowed_tools list denies all tools."""
        handler = ToolHandler(self.mesh, "agent1", allowed_tools=[])
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 0

    def test_has_tool_access_method(self):
        """Test the has_tool_access method."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "push_context"]
        )
        
        assert handler.has_tool_access("get_context") is True
        assert handler.has_tool_access("push_context") is True
        assert handler.has_tool_access("delete_topic") is False
        assert handler.has_tool_access("nonexistent_tool") is False


class TestToolCallAccessControl:
    """Test access control during actual tool calls."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_allowed_tool_call_succeeds(self):
        """Test that allowed tool calls work normally."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "list_context"]
        )
        
        result = handler.handle_tool_call("list_context")
        assert result["success"] is True

    def test_denied_tool_call_fails_with_access_denied(self):
        """Test that denied tool calls fail with access denied error."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "list_context"]
        )
        
        result = handler.handle_tool_call("delete_topic", topic="test", confirm=True)
        assert result["success"] is False
        assert "Access denied" in result["error"]
        assert result["reason"] == "Agent 'agent1' does not have permission to use this tool"
        assert "available_tools" in result

    def test_unknown_tool_call_fails_with_unknown_error(self):
        """Test that unknown tool calls fail with unknown tool error."""
        handler = ToolHandler(self.mesh, "agent1")
        
        result = handler.handle_tool_call("nonexistent_tool")
        assert result["success"] is False
        assert "Unknown tool" in result["error"]

    def test_get_schemas_only_returns_allowed_tools(self):
        """Test that get_schemas only returns schemas for allowed tools."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "push_context"]
        )
        
        schemas = handler.get_schemas()
        schema_names = {schema["name"] for schema in schemas}
        assert len(schemas) == 2
        assert schema_names == {"get_context", "push_context"}


class TestRoleBasedAccessControl:
    """Test role-based access control functionality."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_predefined_roles_exist(self):
        """Test that predefined roles are available."""
        assert "readonly" in PREDEFINED_ROLES
        assert "contributor" in PREDEFINED_ROLES
        assert "moderator" in PREDEFINED_ROLES
        assert "admin" in PREDEFINED_ROLES
        
        # Check role structure
        for role_name, role_data in PREDEFINED_ROLES.items():
            assert "description" in role_data
            assert "tools" in role_data
            assert isinstance(role_data["tools"], list)

    def test_create_readonly_role_handler(self):
        """Test creating a handler with readonly role."""
        handler = create_role_based_handler(self.mesh, "agent1", "readonly")
        
        available_tools = handler.get_available_tools()
        expected_tools = PREDEFINED_ROLES["readonly"]["tools"]
        assert set(available_tools) == set(expected_tools)
        assert handler.agent_role == "readonly"

    def test_create_admin_role_handler(self):
        """Test creating a handler with admin role."""
        handler = create_role_based_handler(self.mesh, "agent1", "admin")
        
        available_tools = handler.get_available_tools()
        expected_tools = PREDEFINED_ROLES["admin"]["tools"]
        assert set(available_tools) == set(expected_tools)
        assert "delete_topic" in available_tools  # Admin should have delete access

    def test_create_custom_role_handler(self):
        """Test creating a handler with custom role."""
        custom_roles = {
            "analyst": {
                "description": "Data analysis role",
                "tools": ["get_context", "list_context", "push_context"]
            }
        }
        
        handler = create_role_based_handler(
            self.mesh, "agent1", "analyst", custom_roles
        )
        
        available_tools = handler.get_available_tools()
        assert set(available_tools) == {"get_context", "list_context", "push_context"}
        assert handler.agent_role == "analyst"

    def test_invalid_role_raises_error(self):
        """Test that invalid role raises ValueError."""
        with pytest.raises(ValueError, match="Unknown role 'invalid_role'"):
            create_role_based_handler(self.mesh, "agent1", "invalid_role")

    def test_get_role_info_function(self):
        """Test the get_role_info utility function."""
        # Get all roles
        all_roles = get_role_info()
        assert isinstance(all_roles, dict)
        assert "readonly" in all_roles
        
        # Get specific role
        readonly_info = get_role_info("readonly")
        assert readonly_info == PREDEFINED_ROLES["readonly"]
        
        # Invalid role
        with pytest.raises(ValueError):
            get_role_info("invalid_role")


class TestRestrictedHandlers:
    """Test restricted handler convenience functions."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_create_safe_restricted_handler(self):
        """Test creating a safe restricted handler."""
        handler = create_restricted_handler(self.mesh, "agent1", "safe")
        
        available_tools = handler.get_available_tools()
        assert "delete_topic" not in available_tools
        assert "get_context" in available_tools
        assert "push_context" in available_tools

    def test_create_minimal_restricted_handler(self):
        """Test creating a minimal restricted handler."""
        handler = create_restricted_handler(self.mesh, "agent1", "minimal")
        
        available_tools = handler.get_available_tools()
        expected_tools = {"get_context", "push_context", "list_context"}
        assert set(available_tools) == expected_tools

    def test_create_readonly_restricted_handler(self):
        """Test creating a readonly restricted handler."""
        handler = create_restricted_handler(self.mesh, "agent1", "readonly")
        
        available_tools = handler.get_available_tools()
        expected_tools = {"get_context", "list_context", "discover_topics"}
        assert set(available_tools) == expected_tools

    def test_invalid_restriction_level_raises_error(self):
        """Test that invalid restriction level raises ValueError."""
        with pytest.raises(ValueError, match="Unknown restriction level 'invalid'"):
            create_restricted_handler(self.mesh, "agent1", "invalid")


class TestMultiAgentHandlers:
    """Test multi-agent handler creation functionality."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_create_multi_agent_handlers_with_roles(self):
        """Test creating multiple handlers with role-based configs."""
        configs = {
            "admin": {"role": "admin"},
            "user": {"role": "readonly"},
            "contributor": {"role": "contributor"}
        }
        
        handlers = create_multi_agent_handlers(self.mesh, configs)
        
        assert len(handlers) == 3
        assert "admin" in handlers
        assert "user" in handlers
        assert "contributor" in handlers
        
        # Check admin has delete access
        admin_tools = handlers["admin"].get_available_tools()
        assert "delete_topic" in admin_tools
        
        # Check user has limited access
        user_tools = handlers["user"].get_available_tools()
        assert "delete_topic" not in user_tools
        assert "get_context" in user_tools

    def test_create_multi_agent_handlers_with_direct_config(self):
        """Test creating multiple handlers with direct tool configs."""
        configs = {
            "analyst": {"allowed_tools": ["get_context", "push_context"]},
            "restricted": {"denied_tools": ["delete_topic", "unsubscribe_from_topics"]}
        }
        
        handlers = create_multi_agent_handlers(self.mesh, configs)
        
        assert len(handlers) == 2
        
        # Check analyst has only specific tools
        analyst_tools = handlers["analyst"].get_available_tools()
        assert set(analyst_tools) == {"get_context", "push_context"}
        
        # Check restricted agent doesn't have denied tools
        restricted_tools = handlers["restricted"].get_available_tools()
        assert "delete_topic" not in restricted_tools
        assert "unsubscribe_from_topics" not in restricted_tools


class TestDynamicAccessControl:
    """Test dynamic modification of access control."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_set_allowed_tools_dynamically(self):
        """Test dynamically changing allowed tools."""
        handler = ToolHandler(self.mesh, "agent1")
        
        # Initially has all tools
        assert len(handler.get_available_tools()) == 7
        
        # Restrict to specific tools
        handler.set_allowed_tools(["get_context", "push_context"])
        available_tools = handler.get_available_tools()
        assert set(available_tools) == {"get_context", "push_context"}

    def test_set_denied_tools_dynamically(self):
        """Test dynamically changing denied tools."""
        handler = ToolHandler(self.mesh, "agent1")
        
        # Initially has all tools
        assert "delete_topic" in handler.get_available_tools()
        
        # Deny specific tools
        handler.set_denied_tools(["delete_topic"])
        assert "delete_topic" not in handler.get_available_tools()

    def test_add_and_remove_allowed_tools(self):
        """Test adding and removing individual allowed tools."""
        handler = ToolHandler(self.mesh, "agent1", allowed_tools=["get_context"])
        
        # Initially only has one tool
        assert handler.get_available_tools() == ["get_context"]
        
        # Add another tool
        handler.add_allowed_tool("push_context")
        available_tools = handler.get_available_tools()
        assert "push_context" in available_tools
        assert len(available_tools) == 2
        
        # Remove a tool
        handler.remove_allowed_tool("get_context")
        available_tools = handler.get_available_tools()
        assert "get_context" not in available_tools
        assert "push_context" in available_tools

    def test_add_and_remove_denied_tools(self):
        """Test adding and removing individual denied tools."""
        handler = ToolHandler(self.mesh, "agent1")
        
        # Initially has all tools
        assert "delete_topic" in handler.get_available_tools()
        
        # Deny a tool
        handler.add_denied_tool("delete_topic")
        assert "delete_topic" not in handler.get_available_tools()
        
        # Re-allow the tool
        handler.remove_denied_tool("delete_topic")
        assert "delete_topic" in handler.get_available_tools()

    def test_set_agent_role_dynamically(self):
        """Test dynamically changing agent role."""
        handler = ToolHandler(self.mesh, "agent1", allowed_tools=["get_context"])
        
        # Initially has limited tools
        assert len(handler.get_available_tools()) == 1
        
        # Set role (this should work with role-based access if implemented)
        handler.set_agent_role("admin")
        assert handler.agent_role == "admin"


class TestAccessSummaryAndValidation:
    """Test access summary and validation features."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_get_access_summary(self):
        """Test getting access summary information."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "push_context"],
            denied_tools=["delete_topic"]
        )
        handler.set_agent_role("contributor")
        
        summary = handler.get_access_summary()
        
        assert summary["agent_name"] == "agent1"
        assert summary["agent_role"] == "contributor"
        assert isinstance(summary["available_tools"], list)
        assert isinstance(summary["denied_tools"], list)
        assert summary["total_available"] == len(handler.get_available_tools())
        assert summary["total_possible"] == 7  # Total Syntha tools

    def test_access_summary_with_all_tools_allowed(self):
        """Test access summary when all tools are allowed."""
        handler = ToolHandler(self.mesh, "agent1")
        
        summary = handler.get_access_summary()
        
        assert summary["allowed_tools"] == "all"
        assert summary["total_available"] == summary["total_possible"]


class TestEdgeCasesAndErrorHandling:
    """Test edge cases and error handling in access control."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_handler_without_agent_name(self):
        """Test handler behavior without agent name."""
        handler = ToolHandler(self.mesh, allowed_tools=["get_context"])
        
        # Should still have filtered handlers
        available_tools = handler.get_available_tools()
        assert "get_context" in available_tools
        
        # But tool calls should fail due to missing agent name
        result = handler.handle_tool_call("get_context")
        assert result["success"] is False
        assert "Agent name not set" in result["error"]

    def test_nonexistent_tool_in_allowed_tools(self):
        """Test behavior when nonexistent tool is in allowed_tools."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "nonexistent_tool"]
        )
        
        # Should only include existing tools
        available_tools = handler.get_available_tools()
        assert "get_context" in available_tools
        assert "nonexistent_tool" not in available_tools

    def test_nonexistent_tool_in_denied_tools(self):
        """Test behavior when nonexistent tool is in denied_tools."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            denied_tools=["nonexistent_tool"]
        )
        
        # Should not affect anything
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 7  # All real tools should be available

    def test_empty_role_based_access_dict(self):
        """Test behavior with empty role_based_access dict."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            role_based_access={}
        )
        
        # Should behave like normal handler
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 7

    def test_role_based_access_with_nonexistent_role(self):
        """Test setting a role that doesn't exist in role_based_access."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            role_based_access={"admin": ["get_context"]}
        )
        
        # Set a role that doesn't exist in the mapping
        handler.set_agent_role("nonexistent_role")
        
        # Should still have all tools since role doesn't exist in mapping
        available_tools = handler.get_available_tools()
        assert len(available_tools) == 7


class TestIntegrationWithExistingTools:
    """Test integration with existing ToolHandler functionality."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_access_control_with_merge_schemas(self):
        """Test access control works with schema merging."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "push_context"]
        )
        
        custom_tools = [
            {
                "name": "custom_tool",
                "description": "Custom tool",
                "parameters": {"type": "object", "properties": {}}
            }
        ]
        
        merged_schemas = handler.get_schemas(merge_with=custom_tools)
        
        # Should have 2 Syntha tools + 1 custom tool
        assert len(merged_schemas) == 3
        tool_names = {schema["name"] for schema in merged_schemas}
        assert "get_context" in tool_names
        assert "push_context" in tool_names
        assert "custom_tool" in tool_names
        assert "delete_topic" not in tool_names  # Not allowed

    def test_access_control_with_hybrid_handler(self):
        """Test access control works with hybrid handlers."""
        handler = ToolHandler(
            self.mesh, "agent1", 
            allowed_tools=["get_context", "push_context"]
        )
        
        def custom_tool_handler(tool_name, **kwargs):
            return {"success": True, "custom": True}
        
        hybrid_handler = handler.create_hybrid_handler(custom_tool_handler)
        
        # Test allowed Syntha tool
        result = hybrid_handler("get_context")
        assert result["success"] is True
        assert "custom" not in result
        
        # Test denied Syntha tool
        result = hybrid_handler("delete_topic")
        assert result["success"] is False
        assert "Access denied" in result["error"]
        
        # Test custom tool
        result = hybrid_handler("custom_tool")
        assert result["success"] is True
        assert result["custom"] is True 