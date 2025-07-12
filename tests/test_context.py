"""
Tests for Syntha ContextMesh functionality.
"""

import time

import pytest

from syntha.context import ContextItem, ContextMesh


class TestContextItem:
    """Test ContextItem class."""

    def test_context_item_creation(self):
        item = ContextItem("test_value", ["agent1"], 60)
        assert item.value == "test_value"
        assert item.subscribers == ["agent1"]
        assert item.ttl == 60
        assert not item.is_expired()

    def test_context_item_expiry(self):
        # Create item with very short TTL
        item = ContextItem("test_value", [], 0.1)
        time.sleep(0.2)
        assert item.is_expired()

    def test_context_item_access_control(self):
        # Global context (empty subscribers)
        global_item = ContextItem("global", [])
        assert global_item.is_accessible_by("any_agent")

        # Private context
        private_item = ContextItem("private", ["agent1", "agent2"])
        assert private_item.is_accessible_by("agent1")
        assert private_item.is_accessible_by("agent2")
        assert not private_item.is_accessible_by("agent3")


class TestContextMesh:
    """Test ContextMesh class."""

    def setup_method(self):
        """Set up test fixtures."""
        # Use in-memory database for tests to ensure isolation
        import os
        import tempfile

        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
        self.temp_db.close()
        self.mesh = ContextMesh(db_path=self.temp_db.name)

    def teardown_method(self):
        """Clean up test fixtures."""
        # Properly close the database connection first
        if hasattr(self, "mesh") and self.mesh.db_backend:
            self.mesh.db_backend.close()

        # Clean up the temporary database
        import os
        import time

        if hasattr(self, "temp_db") and os.path.exists(self.temp_db.name):
            try:
                os.unlink(self.temp_db.name)
            except PermissionError:
                # On Windows, sometimes need to wait a bit for the file to be released
                time.sleep(0.1)
                try:
                    os.unlink(self.temp_db.name)
                except PermissionError:
                    # If still locked, just skip cleanup - temp files will be cleaned up by OS
                    pass

    def test_push_and_get(self):
        """Test basic push and get functionality."""
        self.mesh.push("test_key", "test_value")
        assert self.mesh.get("test_key") == "test_value"

    def test_agent_specific_access(self):
        """Test agent-specific access control."""
        # Push context for specific agents
        self.mesh.push("private_key", "private_value", subscribers=["agent1"])

        # Agent1 can access
        assert self.mesh.get("private_key", "agent1") == "private_value"

        # Agent2 cannot access
        assert self.mesh.get("private_key", "agent2") is None

    def test_global_context(self):
        """Test global context access."""
        self.mesh.push("global_key", "global_value", subscribers=[])

        # Any agent can access global context
        assert self.mesh.get("global_key", "agent1") == "global_value"
        assert self.mesh.get("global_key", "agent2") == "global_value"

    def test_get_all_for_agent(self):
        """Test getting all context for an agent."""
        self.mesh.push("global", "global_value", subscribers=[])
        self.mesh.push("private", "private_value", subscribers=["agent1"])
        self.mesh.push("other", "other_value", subscribers=["agent2"])

        agent1_context = self.mesh.get_all_for_agent("agent1")
        assert "global" in agent1_context
        assert "private" in agent1_context
        assert "other" not in agent1_context

        agent2_context = self.mesh.get_all_for_agent("agent2")
        assert "global" in agent2_context
        assert "private" not in agent2_context
        assert "other" in agent2_context

    def test_ttl_functionality(self):
        """Test TTL (time-to-live) functionality."""
        # Push context with short TTL
        self.mesh.push("temp_key", "temp_value", ttl=0.1)

        # Should be accessible immediately
        assert self.mesh.get("temp_key") == "temp_value"

        # Wait for expiry
        time.sleep(0.2)

        # Should be None after expiry
        assert self.mesh.get("temp_key") is None

    def test_cleanup_expired(self):
        """Test cleanup of expired items."""
        # Add some items with short TTL
        self.mesh.push("temp1", "value1", ttl=0.1)
        self.mesh.push("temp2", "value2", ttl=0.1)
        self.mesh.push("permanent", "value3")  # No TTL

        assert self.mesh.size() == 3

        # Wait for expiry
        time.sleep(0.2)

        # Clean up expired items
        expired_count = self.mesh.cleanup_expired()
        assert expired_count == 2
        assert self.mesh.size() == 1
        assert self.mesh.get("permanent") == "value3"

    def test_remove(self):
        """Test removing context items."""
        self.mesh.push("test_key", "test_value")
        assert self.mesh.get("test_key") == "test_value"

        # Remove the item
        assert self.mesh.remove("test_key") is True
        assert self.mesh.get("test_key") is None

        # Try to remove non-existent item
        assert self.mesh.remove("non_existent") is False

    def test_clear(self):
        """Test clearing all context."""
        self.mesh.push("key1", "value1")
        self.mesh.push("key2", "value2")
        assert self.mesh.size() == 2

        self.mesh.clear()
        assert self.mesh.size() == 0

    def test_get_stats(self):
        """Test getting mesh statistics."""
        self.mesh.push("global", "value", subscribers=[])
        self.mesh.push("private", "value", subscribers=["agent1"])
        self.mesh.push("expired", "value", ttl=0.1)

        time.sleep(0.2)  # Let one item expire

        stats = self.mesh.get_stats()
        assert stats["total_items"] == 3
        assert stats["expired_items"] == 1
        assert stats["global_items"] == 1

    def test_get_keys_for_agent(self):
        """Test getting accessible keys for an agent."""
        self.mesh.push("global", "value", subscribers=[])
        self.mesh.push("private", "value", subscribers=["agent1"])
        self.mesh.push("other", "value", subscribers=["agent2"])

        keys = self.mesh.get_keys_for_agent("agent1")
        assert "global" in keys
        assert "private" in keys
        assert "other" not in keys
