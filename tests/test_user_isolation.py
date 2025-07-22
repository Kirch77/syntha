"""
Tests for user isolation functionality in Syntha.

These tests verify that users cannot access each other's context data
and that the user isolation feature works correctly.
"""

import json
import tempfile
import time
import os
import pytest

from syntha.context import ContextMesh
from syntha.tools import ToolHandler


class TestUserIsolation:
    """Test user isolation functionality."""

    def setup_method(self):
        """Set up test fixtures with user isolation."""
        # Create temporary database for tests
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
        self.temp_db.close()

        # Create separate ContextMesh instances for different users
        self.user1_mesh = ContextMesh(
            user_id="user_1", db_path=self.temp_db.name, enable_persistence=True
        )

        self.user2_mesh = ContextMesh(
            user_id="user_2",
            db_path=self.temp_db.name,  # Same database file
            enable_persistence=True,
        )

        # Create tool handlers for each user
        self.user1_handler = ToolHandler(self.user1_mesh, agent_name="user1_agent")
        self.user2_handler = ToolHandler(self.user2_mesh, agent_name="user2_agent")

    def teardown_method(self):
        """Clean up test fixtures."""
        # Close meshes
        if hasattr(self, "user1_mesh"):
            self.user1_mesh.close()
        if hasattr(self, "user2_mesh"):
            self.user2_mesh.close()

        # Clean up database file
        if hasattr(self, "temp_db") and os.path.exists(self.temp_db.name):
            try:
                os.unlink(self.temp_db.name)
            except PermissionError:
                # On Windows, sometimes need to wait
                time.sleep(0.1)
                try:
                    os.unlink(self.temp_db.name)
                except PermissionError:
                    pass

    def test_basic_user_isolation(self):
        """Test that users cannot access each other's context."""
        # First, agents need to subscribe to topics to receive context
        self.user1_handler.handle_tool_call("subscribe_to_topics", topics=["personal"])
        self.user2_handler.handle_tool_call("subscribe_to_topics", topics=["personal"])

        # User 1 pushes context
        self.user1_handler.handle_tool_call(
            "push_context",
            key="user_data",
            value=json.dumps({"name": "Alice", "secret": "password123"}),
            topics=["personal"],
        )

        # User 2 pushes context with same key
        self.user2_handler.handle_tool_call(
            "push_context",
            key="user_data",
            value=json.dumps({"name": "Bob", "secret": "different_password"}),
            topics=["personal"],
        )

        # User 1 can access their own data
        user1_result = self.user1_handler.handle_tool_call(
            "get_context", keys=["user_data"]
        )
        assert user1_result["success"] is True
        assert "user_data" in user1_result["context"]
        user1_data = user1_result["context"]["user_data"]
        assert user1_data["name"] == "Alice"
        assert user1_data["secret"] == "password123"

        # User 2 can access their own data
        user2_result = self.user2_handler.handle_tool_call(
            "get_context", keys=["user_data"]
        )
        assert user2_result["success"] is True
        assert "user_data" in user2_result["context"]
        user2_data = user2_result["context"]["user_data"]
        assert user2_data["name"] == "Bob"
        assert user2_data["secret"] == "different_password"

    def test_topic_isolation(self):
        """Test that users have isolated topic spaces."""
        # Both users subscribe to the same topic name
        self.user1_handler.handle_tool_call("subscribe_to_topics", topics=["sales"])
        self.user2_handler.handle_tool_call("subscribe_to_topics", topics=["sales"])

        # User 1 pushes to sales topic
        self.user1_handler.handle_tool_call(
            "push_context",
            key="sales_data",
            value=json.dumps({"revenue": 100000}),
            topics=["sales"],
        )

        # User 2 pushes to sales topic
        self.user2_handler.handle_tool_call(
            "push_context",
            key="sales_data",
            value=json.dumps({"revenue": 75000}),
            topics=["sales"],
        )

        # User 1 only sees their own sales data
        user1_topics = self.user1_handler.handle_tool_call("discover_topics")
        assert "sales" in user1_topics["topics"]
        assert user1_topics["topics"]["sales"]["subscriber_count"] == 1

        # User 2 only sees their own sales data
        user2_topics = self.user2_handler.handle_tool_call("discover_topics")
        assert "sales" in user2_topics["topics"]
        assert user2_topics["topics"]["sales"]["subscriber_count"] == 1

    def test_context_listing_isolation(self):
        """Test that context listing is isolated per user."""
        # User 1 creates context
        self.user1_handler.handle_tool_call("subscribe_to_topics", topics=["work"])
        self.user1_handler.handle_tool_call(
            "push_context", key="project_status", value="In Progress", topics=["work"]
        )

        # User 2 creates context
        self.user2_handler.handle_tool_call("subscribe_to_topics", topics=["personal"])
        self.user2_handler.handle_tool_call(
            "push_context",
            key="shopping_list",
            value="Milk, Bread, Eggs",
            topics=["personal"],
        )

        # User 1 only sees their own context
        user1_context = self.user1_handler.handle_tool_call("list_context")
        assert "work" in user1_context["keys_by_topic"]
        assert "personal" not in user1_context["keys_by_topic"]

        # User 2 only sees their own context
        user2_context = self.user2_handler.handle_tool_call("list_context")
        assert "personal" in user2_context["keys_by_topic"]
        assert "work" not in user2_context["keys_by_topic"]

    def test_unsubscribe_isolation(self):
        """Test that unsubscribing is isolated per user."""
        # Both users subscribe to topics
        self.user1_handler.handle_tool_call(
            "subscribe_to_topics", topics=["topic1", "topic2"]
        )
        self.user2_handler.handle_tool_call(
            "subscribe_to_topics", topics=["topic1", "topic2"]
        )

        # User 1 unsubscribes from topic1
        self.user1_handler.handle_tool_call(
            "unsubscribe_from_topics", topics=["topic1"]
        )

        # User 1 should only have topic2
        user1_topics = self.user1_handler.handle_tool_call("discover_topics")
        assert "topic1" not in user1_topics["topics"]
        assert "topic2" in user1_topics["topics"]

        # User 2 should still have both topics
        user2_topics = self.user2_handler.handle_tool_call("discover_topics")
        assert "topic1" in user2_topics["topics"]
        assert "topic2" in user2_topics["topics"]

    def test_topic_deletion_isolation(self):
        """Test that topic deletion is isolated per user."""
        # Both users create the same topic
        self.user1_handler.handle_tool_call(
            "subscribe_to_topics", topics=["shared_topic"]
        )
        self.user2_handler.handle_tool_call(
            "subscribe_to_topics", topics=["shared_topic"]
        )

        # Both users push context to the topic
        self.user1_handler.handle_tool_call(
            "push_context",
            key="user1_data",
            value="User 1 data",
            topics=["shared_topic"],
        )

        self.user2_handler.handle_tool_call(
            "push_context",
            key="user2_data",
            value="User 2 data",
            topics=["shared_topic"],
        )

        # User 1 deletes their topic
        self.user1_handler.handle_tool_call(
            "delete_topic", topic="shared_topic", confirm=True
        )

        # User 1 should no longer have the topic
        user1_topics = self.user1_handler.handle_tool_call("discover_topics")
        assert "shared_topic" not in user1_topics["topics"]

        # User 2 should still have the topic
        user2_topics = self.user2_handler.handle_tool_call("discover_topics")
        assert "shared_topic" in user2_topics["topics"]

        # User 2 should still have their context
        user2_context = self.user2_handler.handle_tool_call(
            "get_context", keys=["user2_data"]
        )
        assert user2_context["context"]["user2_data"] == "User 2 data"

    def test_persistence_isolation(self):
        """Test that user isolation persists across sessions."""
        # User 1 creates context
        self.user1_handler.handle_tool_call(
            "subscribe_to_topics", topics=["persistent"]
        )
        self.user1_handler.handle_tool_call(
            "push_context",
            key="persistent_data",
            value="This should persist",
            topics=["persistent"],
        )

        # Close and reopen User 1's mesh
        self.user1_mesh.close()
        self.user1_mesh = ContextMesh(
            user_id="user_1", db_path=self.temp_db.name, enable_persistence=True
        )
        self.user1_handler = ToolHandler(self.user1_mesh, agent_name="user1_agent")

        # User 1 should still have their data
        user1_context = self.user1_handler.handle_tool_call(
            "get_context", keys=["persistent_data"]
        )
        assert user1_context["context"]["persistent_data"] == "This should persist"

        # User 2 should not have access to User 1's data
        user2_context = self.user2_handler.handle_tool_call(
            "get_context", keys=["persistent_data"]
        )
        assert "persistent_data" not in user2_context["context"]

    def test_no_user_id_backward_compatibility(self):
        """Test that ContextMesh works without user_id for backward compatibility."""
        # Create mesh without user_id
        legacy_mesh = ContextMesh(db_path=self.temp_db.name, enable_persistence=True)
        legacy_handler = ToolHandler(legacy_mesh, agent_name="legacy_agent")

        # Should work normally
        legacy_handler.handle_tool_call("subscribe_to_topics", topics=["legacy"])
        legacy_handler.handle_tool_call(
            "push_context", key="legacy_data", value="Legacy data", topics=["legacy"]
        )

        result = legacy_handler.handle_tool_call("get_context", keys=["legacy_data"])
        assert result["context"]["legacy_data"] == "Legacy data"

        legacy_mesh.close()

    def test_empty_user_id_handling(self):
        """Test handling of empty/None user_id."""
        # Test with None user_id
        mesh_none = ContextMesh(
            user_id=None, db_path=self.temp_db.name, enable_persistence=True
        )
        handler_none = ToolHandler(mesh_none, agent_name="none_agent")

        # Should work normally
        handler_none.handle_tool_call("subscribe_to_topics", topics=["none_topic"])
        handler_none.handle_tool_call(
            "push_context", key="none_data", value="None data", topics=["none_topic"]
        )

        result = handler_none.handle_tool_call("get_context", keys=["none_data"])
        assert result["context"]["none_data"] == "None data"

        mesh_none.close()
