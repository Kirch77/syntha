"""
Comprehensive unit tests for ToolHandler and tool-related functionality.

These tests ensure the tool system works correctly in isolation
and handles various edge cases properly.
"""
import pytest
import asyncio
import time
import json
from unittest.mock import Mock, patch
from syntha.tools import ToolHandler, get_all_tool_schemas
from syntha.context import ContextMesh


class TestToolHandlerCore:
    """Test core ToolHandler functionality."""
    
    def test_tool_handler_creation(self):
        """Test basic ToolHandler creation."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        assert handler.context_mesh is mesh
        assert handler.agent_name is None
        assert len(handler.handlers) == 5  # Built-in Syntha tools
        assert "get_context" in handler.handlers
        assert "push_context" in handler.handlers
        assert "list_context" in handler.handlers
        assert "subscribe_to_topics" in handler.handlers
        assert "discover_topics" in handler.handlers
        
        mesh.close()
    
    def test_tool_handler_with_agent_name(self):
        """Test ToolHandler with specific agent name."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        assert handler.agent_name == "test_agent"
        mesh.close()
    
    def test_set_agent_name(self):
        """Test setting agent name after creation."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        assert handler.agent_name == "test_agent"
        mesh.close()
    
    def test_tool_handler_no_agent_name_error(self):
        """Test that calling tools without agent name returns error."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        result = handler.handle_tool_call("get_context")
        assert result["success"] is False
        assert "Agent name not set" in result["error"]
        
        mesh.close()
    
    def test_get_schemas(self):
        """Test getting all tool schemas."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        schemas = handler.get_schemas()
        assert len(schemas) == 5
        
        schema_names = {schema["name"] for schema in schemas}
        expected_names = {"get_context", "push_context", "list_context", "subscribe_to_topics", "discover_topics"}
        assert schema_names == expected_names
        
        mesh.close()
    
    def test_get_syntha_schemas_only(self):
        """Test getting only Syntha schemas."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        schemas = handler.get_syntha_schemas_only()
        assert len(schemas) == 5
        
        mesh.close()


class TestBuiltInTools:
    """Test built-in Syntha tools."""
    
    def test_push_context_tool(self):
        """Test push_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        result = handler.handle_tool_call("push_context", 
            key="test_key",
            value="test_value",
            topics=["test_topic"]
        )
        
        assert result["success"] is True
        assert "shared with agents" in result["message"]
        
        mesh.close()
    
    def test_get_context_tool(self):
        """Test get_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Setup test data
        mesh.push("accessible_key", "accessible_value")
        mesh.push("private_key", "private_value", subscribers=["other_agent"])
        
        # Test accessible data
        result = handler.handle_tool_call("get_context", keys=["accessible_key"])
        assert result["success"] is True
        assert result["context"]["accessible_key"] == "accessible_value"
        
        # Test inaccessible data
        result = handler.handle_tool_call("get_context", keys=["private_key"])
        assert result["success"] is True
        assert "private_key" not in result["context"]
        
        mesh.close()
    
    def test_list_context_tool(self):
        """Test list_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Setup test data
        mesh.push("key1", "value1")
        mesh.push("key2", "value2")
        mesh.push("private_key", "private", subscribers=["other_agent"])
        
        result = handler.handle_tool_call("list_context")
        assert result["success"] is True
        
        # Should contain accessible keys
        assert "key1" in result["all_accessible_keys"]
        assert "key2" in result["all_accessible_keys"]
        # Should not contain private key
        assert "private_key" not in result["all_accessible_keys"]
        
        mesh.close()
    
    def test_subscribe_to_topics_tool(self):
        """Test subscribe_to_topics tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        result = handler.handle_tool_call("subscribe_to_topics", 
            topics=["sales", "analytics"]
        )
        
        assert result["success"] is True
        assert "registered for topics" in result["message"]
        
        # Verify subscription
        topics = mesh.get_topics_for_agent("test_agent")
        assert "sales" in topics
        assert "analytics" in topics
        
        mesh.close()
    
    def test_discover_topics_tool(self):
        """Test discover_topics tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Setup topics
        mesh.register_agent_topics("agent1", ["sales", "analytics"])
        mesh.register_agent_topics("agent2", ["workflow", "analytics"])
        
        result = handler.handle_tool_call("discover_topics")
        assert result["success"] is True
        
        # Should contain all topics - note the API returns topics as a dict
        topics = result["topics"]
        assert "sales" in topics
        assert "analytics" in topics
        assert "workflow" in topics
        
        mesh.close()


class TestToolParameterValidation:
    """Test tool parameter validation and error handling."""
    
    def test_missing_required_parameter(self):
        """Test handling of missing required parameters."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Missing required 'key' parameter for push_context
        # The actual implementation will raise TypeError due to missing parameter
        with pytest.raises(TypeError):
            handler.handle_tool_call("push_context", 
                value="test_value", 
                topics=["test_topic"]
            )
        
        mesh.close()
    
    def test_invalid_parameter_type(self):
        """Test handling of invalid parameter types."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Invalid type for 'topics' parameter (should be list)
        result = handler.handle_tool_call("push_context", 
            key="test_key",
            value="test_value",
            topics="not_a_list"
        )
        assert result["success"] is False
        assert "error" in result
        
        mesh.close()
    
    def test_nonexistent_tool(self):
        """Test calling non-existent tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        result = handler.handle_tool_call("nonexistent_tool")
        assert result["success"] is False
        assert "Unknown tool" in result["error"]
        assert "available_tools" in result
        
        mesh.close()


class TestToolSchemas:
    """Test tool schema generation."""
    
    def test_get_all_schemas(self):
        """Test getting all tool schemas."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        schemas = handler.get_schemas()
        assert len(schemas) == 5
        
        # Check that all schemas have required fields
        for schema in schemas:
            assert "name" in schema
            assert "description" in schema
            assert "parameters" in schema
            assert "type" in schema["parameters"]
            assert "properties" in schema["parameters"]
        
        mesh.close()
    
    def test_schema_merge_with_existing(self):
        """Test merging Syntha schemas with existing tools."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        existing_tools = [
            {
                "name": "custom_tool",
                "description": "Custom tool",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "param": {"type": "string"}
                    }
                }
            }
        ]
        
        merged_schemas = handler.get_schemas(merge_with=existing_tools)
        assert len(merged_schemas) == 6  # 5 Syntha + 1 custom
        
        tool_names = {schema["name"] for schema in merged_schemas}
        assert "custom_tool" in tool_names
        assert "get_context" in tool_names
        
        mesh.close()


class TestHybridToolHandler:
    """Test hybrid tool handler functionality."""
    
    def test_create_hybrid_handler(self):
        """Test creating hybrid handler."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        def external_handler(tool_name, **kwargs):
            if tool_name == "external_tool":
                return {"success": True, "result": "external_result"}
            return {"success": False, "error": "Unknown external tool"}
        
        hybrid = handler.create_hybrid_handler(external_handler)
        
        # Test Syntha tool
        result = hybrid("get_context")
        assert result["success"] is True
        
        # Test external tool
        result = hybrid("external_tool")
        assert result["success"] is True
        assert result["result"] == "external_result"
        
        mesh.close()
    
    def test_hybrid_handler_unknown_tool(self):
        """Test hybrid handler with unknown tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        hybrid = handler.create_hybrid_handler()
        
        result = hybrid("unknown_tool")
        assert result["success"] is False
        assert "Unknown tool" in result["error"]
        
        mesh.close()


class TestToolEdgeCases:
    """Test edge cases and error conditions."""
    
    def test_tool_call_with_empty_parameters(self):
        """Test tool call with empty parameters."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        result = handler.handle_tool_call("list_context")
        assert result["success"] is True
        
        mesh.close()
    
    def test_tool_call_with_extra_parameters(self):
        """Test tool call with extra parameters (should cause error)."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # The implementation doesn't actually ignore extra parameters - it passes them through
        # and the underlying function will reject them
        with pytest.raises(TypeError):
            handler.handle_tool_call("list_context", 
                extra_param="ignored"
            )
        
        mesh.close()
    
    def test_concurrent_tool_execution(self):
        """Test concurrent tool execution safety."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        def worker(agent_suffix):
            local_handler = ToolHandler(context_mesh=mesh, agent_name=f"agent_{agent_suffix}")
            return local_handler.handle_tool_call("push_context",
                key=f"key_{agent_suffix}",
                value=f"value_{agent_suffix}",
                topics=["test_topic"]
            )
        
        import threading
        
        # Run multiple threads
        threads = []
        results = []
        
        for i in range(5):
            thread = threading.Thread(target=lambda i=i: results.append(worker(i)))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # All operations should succeed
        assert len(results) == 5
        for result in results:
            assert result["success"] is True
        
        mesh.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
