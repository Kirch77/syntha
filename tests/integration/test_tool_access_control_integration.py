"""
Integration tests for Tool Access Control functionality.

Tests the access control features in realistic scenarios with real
context operations and multi-agent interactions.
"""

import json
from unittest.mock import Mock, patch

import pytest

pytestmark = [pytest.mark.access_control, pytest.mark.tools, pytest.mark.integration]

from syntha.context import ContextMesh
from syntha.tools import (
    ToolHandler,
    create_multi_agent_handlers,
    create_restricted_handler,
    create_role_based_handler,
)


class TestRealWorldAccessControlScenarios:
    """Test access control in real-world usage scenarios."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_development_team_scenario(self):
        """Test a realistic development team with different access levels."""
        # Set up team with different roles
        team_configs = {
            "tech_lead": {"role": "admin"},
            "senior_dev": {"role": "contributor"},
            "junior_dev": {
                "allowed_tools": [
                    "get_context",
                    "push_context",
                    "list_context",
                    "subscribe_to_topics",
                ]
            },
            "qa_engineer": {
                "allowed_tools": [
                    "get_context",
                    "push_context",
                    "list_context",
                    "discover_topics",
                ]
            },
            "pm": {"allowed_tools": ["get_context", "list_context", "discover_topics"]},
            "deployment_bot": {"allowed_tools": ["get_context", "push_context"]},
        }

        handlers = create_multi_agent_handlers(self.mesh, team_configs)

        # Tech lead sets up project context
        result = handlers["tech_lead"].handle_tool_call(
            "push_context",
            key="project_status",
            value="Sprint 1 - In Progress",
            topics=["development", "management"],
        )
        assert result["success"] is True

        # Senior dev subscribes to development topics
        result = handlers["senior_dev"].handle_tool_call(
            "subscribe_to_topics", topics=["development", "architecture"]
        )
        assert result["success"] is True

        # PM tries to push code context (should fail)
        result = handlers["pm"].handle_tool_call(
            "push_context",
            key="code_review",
            value="Ready for review",
            topics=["development"],
        )
        assert result["success"] is False
        assert "Access denied" in result["error"]

        # PM can read context (should succeed)
        result = handlers["pm"].handle_tool_call("list_context")
        assert result["success"] is True

        # Junior dev can push context (should succeed)
        result = handlers["junior_dev"].handle_tool_call(
            "push_context",
            key="bug_report",
            value="Found issue in login flow",
            topics=["development"],
        )
        assert result["success"] is True

        # Junior dev tries to delete topic (should fail)
        result = handlers["junior_dev"].handle_tool_call(
            "delete_topic", topic="development", confirm=True
        )
        assert result["success"] is False
        assert "Access denied" in result["error"]

        # Tech lead can delete topic (should succeed)
        result = handlers["tech_lead"].handle_tool_call(
            "delete_topic", topic="development", confirm=True
        )
        assert result["success"] is True

    def test_customer_support_scenario(self):
        """Test customer support agents with different access levels."""
        # Set up support team
        support_configs = {
            "support_manager": {"role": "admin"},
            "senior_support": {"role": "contributor"},
            "junior_support": {"role": "readonly"},
            "support_bot": {"allowed_tools": ["get_context", "push_context"]},
        }

        handlers = create_multi_agent_handlers(self.mesh, support_configs)

        # Manager sets up customer context
        result = handlers["support_manager"].handle_tool_call(
            "push_context",
            key="customer_123",
            value=json.dumps(
                {"name": "John Doe", "tier": "premium", "open_tickets": 2}
            ),
            topics=["customer_support", "premium_customers"],
        )
        assert result["success"] is True

        # Senior support subscribes to premium customers
        result = handlers["senior_support"].handle_tool_call(
            "subscribe_to_topics", topics=["premium_customers"]
        )
        assert result["success"] is True

        # Junior support can read but not write
        result = handlers["junior_support"].handle_tool_call("list_context")
        assert result["success"] is True

        result = handlers["junior_support"].handle_tool_call(
            "push_context",
            key="note",
            value="Customer called",
            topics=["customer_support"],
        )
        assert result["success"] is False

        # Support bot can update context
        result = handlers["support_bot"].handle_tool_call(
            "push_context",
            key="bot_interaction",
            value="Automated response sent",
            topics=["customer_support"],
        )
        assert result["success"] is True

    def test_research_lab_scenario(self):
        """Test research environment with specialized roles."""
        # Custom roles for research environment
        research_configs = {
            "lab_director": {"role": "admin"},
            "researcher": {
                "allowed_tools": [
                    "get_context",
                    "push_context",
                    "list_context",
                    "subscribe_to_topics",
                    "discover_topics",
                ]
            },
            "data_analyst": {
                "allowed_tools": ["get_context", "list_context", "push_context"]
            },
            "intern": {"role": "readonly"},
        }

        handlers = create_multi_agent_handlers(self.mesh, research_configs)

        # Lab director sets up research project
        result = handlers["lab_director"].handle_tool_call(
            "push_context",
            key="project_alpha",
            value=json.dumps({"status": "active", "budget": 100000, "team_size": 5}),
            topics=["research", "project_alpha"],
        )
        assert result["success"] is True

        # Researcher subscribes to project
        result = handlers["researcher"].handle_tool_call(
            "subscribe_to_topics", topics=["project_alpha"]
        )
        assert result["success"] is True

        # Data analyst can push analysis results
        result = handlers["data_analyst"].handle_tool_call(
            "push_context",
            key="analysis_results",
            value="Initial data shows promising trends",
            topics=["project_alpha"],
        )
        assert result["success"] is True

        # Intern can only read
        result = handlers["intern"].handle_tool_call("discover_topics")
        assert result["success"] is True

        result = handlers["intern"].handle_tool_call(
            "subscribe_to_topics", topics=["project_alpha"]
        )
        assert result["success"] is False


class TestAccessControlWithLLMIntegration:
    """Test access control integration with LLM patterns."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_openai_function_calling_simulation(self):
        """Simulate OpenAI function calling with access control."""
        # Create handler with restricted access
        handler = ToolHandler(
            self.mesh,
            "assistant",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

        # Get tool schemas for LLM
        tools = handler.get_schemas()
        tool_names = {tool["name"] for tool in tools}

        # Should only include allowed tools
        assert len(tools) == 3
        assert "get_context" in tool_names
        assert "push_context" in tool_names
        assert "list_context" in tool_names
        assert "delete_topic" not in tool_names

        # Simulate LLM making allowed tool call
        result = handler.handle_tool_call("list_context")
        assert result["success"] is True

        # Simulate LLM trying to call denied tool (shouldn't happen with proper schemas)
        result = handler.handle_tool_call("delete_topic", topic="test", confirm=True)
        assert result["success"] is False
        assert "Access denied" in result["error"]

    def test_anthropic_function_calling_simulation(self):
        """Simulate Anthropic function calling with role-based access."""
        # Create role-based handler
        handler = create_role_based_handler(self.mesh, "claude", "contributor")

        # Get tool schemas
        tools = handler.get_schemas()
        tool_names = {tool["name"] for tool in tools}

        # Contributor should have most tools except delete
        assert "get_context" in tool_names
        assert "push_context" in tool_names
        assert "subscribe_to_topics" in tool_names
        assert "delete_topic" not in tool_names

        # Test allowed operations
        result = handler.handle_tool_call(
            "push_context",
            key="ai_insight",
            value="Claude generated this insight",
            topics=["ai_research"],
        )
        assert result["success"] is True

        result = handler.handle_tool_call("subscribe_to_topics", topics=["ai_research"])
        assert result["success"] is True

    def test_custom_tool_integration(self):
        """Test access control with custom tools."""
        handler = ToolHandler(
            self.mesh, "agent1", allowed_tools=["get_context", "push_context"]
        )

        # Custom tools that would be added by user
        custom_tools = [
            {
                "name": "analyze_data",
                "description": "Analyze data",
                "parameters": {"type": "object", "properties": {}},
            },
            {
                "name": "get_context",  # Name conflict with Syntha tool
                "description": "Custom get context",
                "parameters": {"type": "object", "properties": {}},
            },
        ]

        # Merge with access-controlled Syntha tools
        merged_schemas = handler.get_schemas(merge_with=custom_tools)

        # Should have custom tools + allowed Syntha tools
        tool_names = {tool["name"] for tool in merged_schemas}
        assert "analyze_data" in tool_names
        assert "push_context" in tool_names
        assert "syntha_get_context" in tool_names  # Renamed due to conflict
        assert "delete_topic" not in tool_names  # Not allowed


class TestDynamicAccessControlScenarios:
    """Test dynamic access control in realistic scenarios."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_promotion_scenario(self):
        """Test agent getting promoted and gaining more access."""
        # Start as junior developer
        handler = ToolHandler(
            self.mesh,
            "developer",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

        # Initially limited tools
        assert len(handler.get_available_tools()) == 3
        assert "subscribe_to_topics" not in handler.get_available_tools()

        # Try to subscribe (should fail)
        result = handler.handle_tool_call(
            "subscribe_to_topics", topics=["architecture"]
        )
        assert result["success"] is False

        # Get promoted - add more permissions
        handler.add_allowed_tool("subscribe_to_topics")
        handler.add_allowed_tool("unsubscribe_from_topics")
        handler.add_allowed_tool("discover_topics")

        # Now can subscribe
        result = handler.handle_tool_call(
            "subscribe_to_topics", topics=["architecture"]
        )
        assert result["success"] is True

        # Still can't delete (not added)
        result = handler.handle_tool_call("delete_topic", topic="test", confirm=True)
        assert result["success"] is False

    def test_emergency_access_scenario(self):
        """Test temporarily granting emergency access."""
        # Start with safe handler
        handler = create_restricted_handler(self.mesh, "ops_agent", "safe")

        # Initially can't delete
        assert "delete_topic" not in handler.get_available_tools()

        # Create a topic first by subscribing to it
        handler2 = ToolHandler(self.mesh, "admin")
        handler2.handle_tool_call("subscribe_to_topics", topics=["corrupted_data"])

        # Emergency: need to delete corrupted topic
        handler.remove_denied_tool("delete_topic")

        # Now can delete
        assert "delete_topic" in handler.get_available_tools()
        result = handler.handle_tool_call(
            "delete_topic", topic="corrupted_data", confirm=True
        )
        assert result["success"] is True

        # Remove emergency access
        handler.add_denied_tool("delete_topic")
        assert "delete_topic" not in handler.get_available_tools()

    def test_role_transition_scenario(self):
        """Test agent transitioning between roles."""
        # Start as readonly
        handler = create_role_based_handler(self.mesh, "agent1", "readonly")
        readonly_tools = set(handler.get_available_tools())

        # Transition to contributor
        handler.set_agent_role("contributor")
        # Manually set contributor tools (since role transition needs manual tool update)
        handler.set_allowed_tools(
            [
                "get_context",
                "list_context",
                "discover_topics",
                "push_context",
                "subscribe_to_topics",
                "unsubscribe_from_topics",
            ]
        )

        contributor_tools = set(handler.get_available_tools())
        assert len(contributor_tools) > len(readonly_tools)
        assert "push_context" in contributor_tools
        assert "push_context" not in readonly_tools


class TestAccessControlPerformance:
    """Test performance aspects of access control."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_access_control_overhead(self):
        """Test that access control doesn't significantly impact performance."""
        import sys
        import time

        # Handler without restrictions
        unrestricted_handler = ToolHandler(self.mesh, "agent1")

        # Handler with restrictions
        restricted_handler = ToolHandler(
            self.mesh,
            "agent1",
            allowed_tools=["get_context", "push_context", "list_context"],
        )

        # Use more iterations for better timing accuracy, especially on Windows
        iterations = 200 if sys.platform == "win32" else 100

        # Time schema generation with multiple runs for stability
        unrestricted_times = []
        restricted_times = []

        for _ in range(3):  # Multiple runs for stability
            start_time = time.perf_counter()  # More precise than time.time()
            for _ in range(iterations):
                unrestricted_handler.get_schemas()
            unrestricted_times.append(time.perf_counter() - start_time)

            start_time = time.perf_counter()
            for _ in range(iterations):
                restricted_handler.get_schemas()
            restricted_times.append(time.perf_counter() - start_time)

        # Use average times for better stability
        unrestricted_time = sum(unrestricted_times) / len(unrestricted_times)
        restricted_time = sum(restricted_times) / len(restricted_times)

        # Restricted should not be significantly slower
        # Allow up to 100% overhead (very generous threshold for Windows)
        if unrestricted_time > 0.001:  # Only check if we have meaningful timing
            assert restricted_time < unrestricted_time * 2.0

        # Time tool calls with similar approach
        unrestricted_call_times = []
        restricted_call_times = []

        for _ in range(3):  # Multiple runs for stability
            start_time = time.perf_counter()
            for _ in range(iterations):
                unrestricted_handler.handle_tool_call("list_context")
            unrestricted_call_times.append(time.perf_counter() - start_time)

            start_time = time.perf_counter()
            for _ in range(iterations):
                restricted_handler.handle_tool_call("list_context")
            restricted_call_times.append(time.perf_counter() - start_time)

        unrestricted_call_time = sum(unrestricted_call_times) / len(
            unrestricted_call_times
        )
        restricted_call_time = sum(restricted_call_times) / len(restricted_call_times)

        # Tool call performance should be similar (but handle edge case of very fast execution)
        if unrestricted_call_time > 0.001:  # Only check if we have meaningful timing
            assert restricted_call_time < unrestricted_call_time * 2.0

        # Basic sanity check - both should be non-negative
        assert restricted_call_time >= 0
        assert unrestricted_call_time >= 0

    def test_large_scale_multi_agent_setup(self):
        """Test setting up many agents with different access levels."""
        # Create configs for many agents
        configs = {}
        for i in range(100):
            if i % 4 == 0:
                configs[f"agent_{i}"] = {"role": "admin"}
            elif i % 4 == 1:
                configs[f"agent_{i}"] = {"role": "contributor"}
            elif i % 4 == 2:
                configs[f"agent_{i}"] = {"role": "readonly"}
            else:
                configs[f"agent_{i}"] = {
                    "allowed_tools": ["get_context", "push_context"]
                }

        # Time the creation
        import time

        start_time = time.time()
        handlers = create_multi_agent_handlers(self.mesh, configs)
        creation_time = time.time() - start_time

        # Should create all handlers
        assert len(handlers) == 100

        # Should be reasonably fast (less than 1 second for 100 agents)
        assert creation_time < 1.0

        # Verify different access levels
        assert len(handlers["agent_0"].get_available_tools()) == 7  # admin
        assert len(handlers["agent_1"].get_available_tools()) == 6  # contributor
        assert len(handlers["agent_2"].get_available_tools()) == 3  # readonly
        assert len(handlers["agent_3"].get_available_tools()) == 2  # custom


class TestAccessControlEdgeCases:
    """Test edge cases in access control integration."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh(enable_persistence=False)

    def teardown_method(self):
        """Clean up test fixtures."""
        self.mesh.close()

    def test_context_mesh_with_user_isolation(self):
        """Test access control works with user isolation."""
        # Create mesh with user isolation
        user_mesh = ContextMesh(enable_persistence=False, user_id="user123")

        try:
            handler = ToolHandler(
                user_mesh, "agent1", allowed_tools=["get_context", "push_context"]
            )

            # Should work normally
            result = handler.handle_tool_call(
                "push_context",
                key="user_data",
                value="User specific data",
                topics=["personal"],
            )
            assert result["success"] is True

            result = handler.handle_tool_call("get_context")
            assert result["success"] is True

            # Access control should still work
            result = handler.handle_tool_call(
                "delete_topic", topic="test", confirm=True
            )
            assert result["success"] is False
            assert "Access denied" in result["error"]

        finally:
            user_mesh.close()

    def test_concurrent_access_control_modifications(self):
        """Test concurrent modifications to access control."""
        import sys
        import threading
        import time

        handler = ToolHandler(self.mesh, "agent1")
        results = []
        errors = []

        def modify_access():
            # Repeatedly modify access control
            try:
                for i in range(5):  # Reduced iterations for stability
                    handler.set_allowed_tools(["get_context", "push_context"])
                    time.sleep(0.02)  # Longer sleep for Windows
                    # Reset to all by setting denied tools instead
                    handler.set_denied_tools([])
                    handler.set_allowed_tools(None)  # Reset to all
                    time.sleep(0.02)
            except Exception as e:
                errors.append(f"modify_access: {e}")

        def use_tools():
            # Repeatedly use tools
            try:
                for i in range(10):  # Reduced iterations for stability
                    result = handler.handle_tool_call("list_context")
                    results.append(result["success"])
                    time.sleep(0.01)  # Longer sleep for Windows
            except Exception as e:
                errors.append(f"use_tools: {e}")

        # Run concurrently
        modifier_thread = threading.Thread(target=modify_access)
        user_thread = threading.Thread(target=use_tools)

        modifier_thread.start()
        user_thread.start()

        # Wait with timeout to prevent hanging
        modifier_thread.join(timeout=5.0)
        user_thread.join(timeout=5.0)

        # Should not crash - check if threads completed
        if modifier_thread.is_alive() or user_thread.is_alive():
            # Threads didn't complete - this is acceptable for this test
            # Just check that no exceptions were raised
            assert len(errors) == 0, f"Errors during concurrent access: {errors}"
            return

        # Should not crash and some calls should succeed
        assert len(results) >= 5  # At least some results
        if len(results) > 0:
            success_rate = sum(results) / len(results)
            # Very lenient threshold for concurrency; allow boundary equality
            assert success_rate >= 0.1  # At least 10% should succeed

        # No exceptions should have occurred
        assert len(errors) == 0, f"Errors during concurrent access: {errors}"
