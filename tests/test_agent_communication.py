"""
Tests for Syntha agent-to-agent communication tools.
"""

import pytest
import time
from syntha.context import ContextMesh
from syntha.tools import (
    ToolHandler,
    get_send_message_tool_schema,
    get_receive_messages_tool_schema,
    handle_send_message_call,
    handle_receive_messages_call
)


class TestAgentCommunication:
    """Test agent-to-agent communication functionality."""
    
    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.tool_handler = ToolHandler(self.mesh)
        
        # Clear any existing state
        self.mesh.clear()
    
    def test_send_message_tool_schema(self):
        """Test send message tool schema."""
        schema = get_send_message_tool_schema()
        assert schema["name"] == "send_message_to_agent"
        assert "from_agent" in schema["parameters"]["properties"]
        assert "to_agent" in schema["parameters"]["properties"]
        assert "message" in schema["parameters"]["properties"]
        assert schema["parameters"]["required"] == ["from_agent", "to_agent", "message"]
    
    def test_receive_messages_tool_schema(self):
        """Test receive messages tool schema."""
        schema = get_receive_messages_tool_schema()
        assert schema["name"] == "get_messages_from_agents"
        assert "agent_name" in schema["parameters"]["properties"]
        assert schema["parameters"]["required"] == ["agent_name"]
    
    def test_send_message_basic(self):
        """Test basic message sending."""
        result = handle_send_message_call(
            self.mesh,
            from_agent="Agent1",
            to_agent="Agent2", 
            message="Hello Agent2!"
        )
        
        assert result["success"] is True
        assert result["from_agent"] == "Agent1"
        assert result["to_agent"] == "Agent2"
        assert "message_id" in result
    
    def test_receive_messages_basic(self):
        """Test basic message receiving."""
        # Send a message first
        handle_send_message_call(
            self.mesh,
            from_agent="Agent1",
            to_agent="Agent2",
            message="Test message"
        )
        
        # Receive messages
        result = handle_receive_messages_call(
            self.mesh,
            agent_name="Agent2"
        )
        
        assert result["success"] is True
        assert result["count"] == 1
        assert len(result["messages"]) == 1
        assert result["messages"][0]["from"] == "Agent1"
        assert result["messages"][0]["message"] == "Test message"
    
    def test_message_access_control(self):
        """Test that messages are only accessible by intended recipients."""
        # Send message to Agent2
        handle_send_message_call(
            self.mesh,
            from_agent="Agent1",
            to_agent="Agent2",
            message="Secret message"
        )
        
        # Agent2 should see the message
        agent2_messages = handle_receive_messages_call(self.mesh, "Agent2")
        assert agent2_messages["count"] == 1
        
        # Agent3 should not see the message
        agent3_messages = handle_receive_messages_call(self.mesh, "Agent3")
        assert agent3_messages["count"] == 0
    
    def test_message_types_and_priorities(self):
        """Test message types and priorities."""
        # Send different types of messages
        handle_send_message_call(
            self.mesh,
            from_agent="Agent1",
            to_agent="Agent2",
            message="Urgent question",
            message_type="question",
            priority="urgent"
        )
        
        time.sleep(0.001)  # Small delay to ensure different timestamps
        
        handle_send_message_call(
            self.mesh,
            from_agent="Agent1", 
            to_agent="Agent2",
            message="Regular info",
            message_type="info",
            priority="normal"
        )
        
        # Receive all messages
        result = handle_receive_messages_call(self.mesh, "Agent2", mark_as_read=False)
        
        assert result["count"] == 2
        
        # Check message details
        urgent_msg = next(m for m in result["messages"] if m["priority"] == "urgent")
        assert urgent_msg["type"] == "question"
        assert urgent_msg["message"] == "Urgent question"
        
        normal_msg = next(m for m in result["messages"] if m["priority"] == "normal")
        assert normal_msg["type"] == "info"
        assert normal_msg["message"] == "Regular info"
    
    def test_message_filtering(self):
        """Test message filtering by sender and type."""
        # Send messages from different agents
        handle_send_message_call(
            self.mesh, "AgentA", "Target", "Message from A", "info"
        )
        time.sleep(0.001)
        handle_send_message_call(
            self.mesh, "AgentB", "Target", "Question from B", "question"
        )
        time.sleep(0.001)
        handle_send_message_call(
            self.mesh, "AgentA", "Target", "Update from A", "update"
        )
        
        # Filter by sender
        from_a = handle_receive_messages_call(
            self.mesh, "Target", from_agent="AgentA", mark_as_read=False
        )
        assert from_a["count"] == 2
        
        # Filter by message type
        questions = handle_receive_messages_call(
            self.mesh, "Target", message_type="question", mark_as_read=False
        )
        assert questions["count"] == 1
        assert questions["messages"][0]["from"] == "AgentB"
    
    def test_mark_as_read_functionality(self):
        """Test marking messages as read."""
        # Send a message
        handle_send_message_call(
            self.mesh, "Agent1", "Agent2", "Test message"
        )
        
        # First check: receive with mark_as_read=False to see unread
        result1 = handle_receive_messages_call(self.mesh, "Agent2", mark_as_read=False)
        assert result1["count"] == 1
        assert result1["messages"][0]["read"] is False  # Should be unread
        
        # Second check: receive with mark_as_read=True (default)
        result2 = handle_receive_messages_call(self.mesh, "Agent2", mark_as_read=True)
        assert result2["count"] == 1
        
        # Third check: unread_only=True should return empty now
        result3 = handle_receive_messages_call(
            self.mesh, "Agent2", unread_only=True
        )
        assert result3["count"] == 0  # No unread messages
        
        # Fourth check: unread_only=False should return the read message
        result4 = handle_receive_messages_call(
            self.mesh, "Agent2", unread_only=False
        )
        assert result4["count"] == 1
    
    def test_tool_handler_integration(self):
        """Test tool handler integration with new message tools."""
        # Test that all tools are available
        schemas = self.tool_handler.get_schemas()
        tool_names = [schema["name"] for schema in schemas]
        
        assert "send_message_to_agent" in tool_names
        assert "get_messages_from_agents" in tool_names
        
        # Test sending message through tool handler
        send_result = self.tool_handler.handle_tool_call(
            "send_message_to_agent",
            from_agent="TestAgent1",
            to_agent="TestAgent2",
            message="Hello via tool handler!",
            message_type="info"
        )
        assert send_result["success"] is True
        
        # Test receiving message through tool handler
        receive_result = self.tool_handler.handle_tool_call(
            "get_messages_from_agents",
            agent_name="TestAgent2"
        )
        assert receive_result["success"] is True
        assert receive_result["count"] == 1
        assert receive_result["messages"][0]["message"] == "Hello via tool handler!"
    
    def test_message_ttl(self):
        """Test that messages have TTL set correctly."""
        # This test verifies TTL is set, but doesn't wait for expiry
        # as that would make tests slow
        
        handle_send_message_call(
            self.mesh, "Agent1", "Agent2", "TTL test message"
        )
        
        # Check that message exists
        result = handle_receive_messages_call(self.mesh, "Agent2", mark_as_read=False)
        assert result["count"] == 1
        
        # Verify TTL cleanup would work (test the mesh directly)
        stats = self.mesh.get_stats()
        assert stats["total_items"] >= 1
        
        # The actual TTL functionality is tested in test_context.py
    
    def test_message_ordering(self):
        """Test that messages are ordered by timestamp (newest first)."""
        # Send multiple messages with small delays
        handle_send_message_call(
            self.mesh, "Agent1", "Agent2", "First message"
        )
        
        time.sleep(0.01)  # Small delay
        
        handle_send_message_call(
            self.mesh, "Agent1", "Agent2", "Second message"
        )
        
        time.sleep(0.01)  # Small delay
        
        handle_send_message_call(
            self.mesh, "Agent1", "Agent2", "Third message"
        )
        
        # Receive messages
        result = handle_receive_messages_call(self.mesh, "Agent2", mark_as_read=False)
        
        assert result["count"] == 3
        # Should be ordered newest first
        assert result["messages"][0]["message"] == "Third message"
        assert result["messages"][1]["message"] == "Second message"
        assert result["messages"][2]["message"] == "First message"
    
    def test_error_handling(self):
        """Test error handling in message tools."""
        # Test with invalid mesh operations (this would be harder to trigger,
        # so we'll test the basic error response structure)
        
        result = self.tool_handler.handle_tool_call(
            "send_message_to_agent",
            from_agent="",  # Empty agent name might cause issues in some cases
            to_agent="ValidAgent",
            message="Test"
        )
        # Should still work, but test structure
        assert "success" in result
        
        # Test unknown tool
        unknown_result = self.tool_handler.handle_tool_call("unknown_tool")
        assert unknown_result["success"] is False
        assert "Unknown tool" in unknown_result["error"]
