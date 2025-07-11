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
from syntha.tools import ToolHandler
from syntha.context import ContextMesh


class TestToolHandlerCore:
    """Test core ToolHandler functionality."""
    
    def test_tool_handler_creation(self):
        """Test basic ToolHandler creation."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        assert handler.context_mesh is mesh
        assert handler.agent_name is None
        assert len(handler.tools) == 5  # Built-in Syntha tools
        
        mesh.close()
    
    def test_tool_handler_with_agent_name(self):
        """Test ToolHandler with specific agent name."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        assert handler.agent_name == "test_agent"
        mesh.close()
    
    def test_register_custom_tool(self):
        """Test registering custom tools."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("custom_tool")
        def custom_tool(param1: str, param2: int = 42) -> str:
            """A custom tool for testing."""
            return f"Result: {param1}, {param2}"
        
        assert "custom_tool" in handler.tools
        schema = handler.get_schemas()["custom_tool"]
        assert schema["name"] == "custom_tool"
        assert "param1" in schema["parameters"]["properties"]
        assert "param2" in schema["parameters"]["properties"]
        
        mesh.close()
    
    def test_tool_execution(self):
        """Test basic tool execution."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("test_tool")
        def test_tool(message: str) -> str:
            return f"Processed: {message}"
        
        result = handler.handle_tool_call("test_tool", {"message": "hello"})
        assert result == "Processed: hello"
        
        mesh.close()
    
    def test_async_tool_execution(self):
        """Test async tool execution."""
        async def run_async_test():
            mesh = ContextMesh(enable_persistence=False)
            handler = ToolHandler(context_mesh=mesh)
            
            @handler.tool("async_tool")
            async def async_tool(delay: float) -> str:
                await asyncio.sleep(delay)
                return f"Completed after {delay}s"
            
            result = await handler.handle_tool_call_async("async_tool", {"delay": 0.1})
            assert "Completed after 0.1s" == result
            
            mesh.close()
        
        asyncio.run(run_async_test())


class TestBuiltInTools:
    """Test built-in Syntha tools."""
    
    def test_push_context_tool(self):
        """Test push_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        result = handler.handle_tool_call("push_context", {
            "key": "test_key",
            "value": {"data": "test_value"},
            "routing_type": "global"
        })
        
        assert "pushed to context mesh" in result.lower()
        assert mesh.get("test_key") == {"data": "test_value"}
        
        mesh.close()
    
    def test_get_context_tool(self):
        """Test get_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        # Setup test data
        mesh.push("accessible_key", {"data": "accessible"})
        mesh.push("private_key", {"data": "private"}, subscribers=["other_agent"])
        
        # Test accessible data
        result = handler.handle_tool_call("get_context", {"key": "accessible_key"})
        assert "accessible" in result
        
        # Test inaccessible data
        result = handler.handle_tool_call("get_context", {"key": "private_key"})
        assert "not found" in result.lower() or "no access" in result.lower()
        
        mesh.close()
    
    def test_list_context_tool(self):
        """Test list_context tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        # Setup test data
        mesh.push("key1", "value1")
        mesh.push("key2", "value2")
        mesh.push("private_key", "private", subscribers=["other_agent"])
        
        result = handler.handle_tool_call("list_context", {})
        
        # Should contain accessible keys
        assert "key1" in result
        assert "key2" in result
        # Should not contain private key
        assert "private_key" not in result
        
        mesh.close()
    
    def test_subscribe_to_topics_tool(self):
        """Test subscribe_to_topics tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        handler.set_agent_name("test_agent")
        
        result = handler.handle_tool_call("subscribe_to_topics", {
            "topics": ["sales", "analytics"]
        })
        
        assert "subscribed" in result.lower()
        
        # Verify subscription
        topics = mesh.get_topics_for_agent("test_agent")
        assert "sales" in topics
        assert "analytics" in topics
        
        mesh.close()
    
    def test_discover_topics_tool(self):
        """Test discover_topics tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        # Setup topics
        mesh.register_agent_topics("agent1", ["sales", "analytics"])
        mesh.register_agent_topics("agent2", ["workflow", "analytics"])
        
        result = handler.handle_tool_call("discover_topics", {})
        
        # Should contain all topics
        assert "sales" in result
        assert "analytics" in result
        assert "workflow" in result
        
        mesh.close()


class TestToolParameterValidation:
    """Test tool parameter validation and error handling."""
    
    def test_missing_required_parameter(self):
        """Test handling of missing required parameters."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("test_tool")
        def test_tool(required_param: str) -> str:
            return f"Got: {required_param}"
        
        # Should handle missing parameter gracefully
        result = handler.handle_tool_call("test_tool", {})
        assert "error" in result.lower() or "missing" in result.lower()
        
        mesh.close()
    
    def test_invalid_parameter_type(self):
        """Test handling of invalid parameter types."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("test_tool")
        def test_tool(number_param: int) -> str:
            return f"Number: {number_param}"
        
        # Should handle type conversion or error gracefully
        result = handler.handle_tool_call("test_tool", {"number_param": "not_a_number"})
        # Implementation should handle this gracefully
        assert isinstance(result, str)
        
        mesh.close()
    
    def test_extra_parameters(self):
        """Test handling of extra parameters."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("test_tool")
        def test_tool(param1: str) -> str:
            return f"Got: {param1}"
        
        # Should ignore extra parameters
        result = handler.handle_tool_call("test_tool", {
            "param1": "value1",
            "extra_param": "ignored"
        })
        assert "Got: value1" == result
        
        mesh.close()
    
    def test_tool_exception_handling(self):
        """Test handling of exceptions in tool execution."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("failing_tool")
        def failing_tool(should_fail: bool) -> str:
            if should_fail:
                raise ValueError("Intentional failure")
            return "Success"
        
        # Should handle exceptions gracefully
        result = handler.handle_tool_call("failing_tool", {"should_fail": True})
        assert "error" in result.lower() or "fail" in result.lower()
        
        # Should work when not failing
        result = handler.handle_tool_call("failing_tool", {"should_fail": False})
        assert result == "Success"
        
        mesh.close()


class TestToolSchemas:
    """Test tool schema generation and management."""
    
    def test_get_all_schemas(self):
        """Test retrieving all tool schemas."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("custom_tool")
        def custom_tool(param: str) -> str:
            """Custom tool description."""
            return param
        
        schemas = handler.get_all_tool_schemas()
        
        # Should include built-in tools
        assert "push_context" in schemas
        assert "get_context" in schemas
        assert "custom_tool" in schemas
        
        # Check schema structure
        custom_schema = schemas["custom_tool"]
        assert custom_schema["name"] == "custom_tool"
        assert "description" in custom_schema
        assert "parameters" in custom_schema
        
        mesh.close()
    
    def test_syntha_only_schemas(self):
        """Test retrieving only Syntha schemas."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("custom_tool")
        def custom_tool(param: str) -> str:
            return param
        
        syntha_schemas = handler.get_syntha_schemas_only()
        
        # Should only include Syntha tools
        assert "push_context" in syntha_schemas
        assert "get_context" in syntha_schemas
        assert "custom_tool" not in syntha_schemas
        
        mesh.close()
    
    def test_schema_parameter_types(self):
        """Test that schema generation handles various parameter types."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("typed_tool")
        def typed_tool(
            str_param: str,
            int_param: int,
            float_param: float,
            bool_param: bool,
            optional_param: str = "default"
        ) -> str:
            """Tool with various parameter types."""
            return "ok"
        
        schema = handler.get_schemas()["typed_tool"]
        properties = schema["parameters"]["properties"]
        
        # Check parameter types are correctly represented
        assert "str_param" in properties
        assert "int_param" in properties
        assert "float_param" in properties
        assert "bool_param" in properties
        assert "optional_param" in properties
        
        # Check required parameters
        required = schema["parameters"]["required"]
        assert "str_param" in required
        assert "optional_param" not in required
        
        mesh.close()


class TestHybridToolHandler:
    """Test hybrid tool handler functionality."""
    
    def test_create_hybrid_handler(self):
        """Test creating hybrid tool handler."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Mock external tools
        external_tools = {
            "external_tool": {
                "name": "external_tool",
                "description": "External tool",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "param": {"type": "string"}
                    }
                }
            }
        }
        
        def external_handler(tool_name, parameters):
            return f"External result: {parameters.get('param', 'none')}"
        
        hybrid_handler = ToolHandler.create_hybrid_handler(
            context_mesh=mesh,
            external_schemas=external_tools,
            external_handler=external_handler
        )
        
        # Should have both Syntha and external tools
        all_schemas = hybrid_handler.get_all_tool_schemas()
        assert "push_context" in all_schemas  # Syntha tool
        assert "external_tool" in all_schemas  # External tool
        
        # Test executing external tool
        result = hybrid_handler.handle_tool_call("external_tool", {"param": "test"})
        assert "External result: test" == result
        
        mesh.close()
    
    def test_hybrid_tool_conflicts(self):
        """Test handling of tool name conflicts in hybrid handler."""
        mesh = ContextMesh(enable_persistence=False)
        
        # External tool with same name as Syntha tool
        external_tools = {
            "push_context": {
                "name": "push_context",
                "description": "Conflicting external tool",
                "parameters": {"type": "object", "properties": {}}
            }
        }
        
        def external_handler(tool_name, parameters):
            return "External push_context called"
        
        hybrid_handler = ToolHandler.create_hybrid_handler(
            context_mesh=mesh,
            external_schemas=external_tools,
            external_handler=external_handler
        )
        
        # External tool should override Syntha tool
        result = hybrid_handler.handle_tool_call("push_context", {})
        assert "External push_context called" == result
        
        mesh.close()


class TestToolEdgeCases:
    """Test edge cases in tool functionality."""
    
    def test_tool_with_no_parameters(self):
        """Test tool with no parameters."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("no_params_tool")
        def no_params_tool() -> str:
            """Tool with no parameters."""
            return "No params needed"
        
        result = handler.handle_tool_call("no_params_tool", {})
        assert result == "No params needed"
        
        mesh.close()
    
    def test_tool_with_complex_return_type(self):
        """Test tool with complex return types."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("complex_tool")
        def complex_tool() -> dict:
            """Tool returning complex data."""
            return {
                "status": "success",
                "data": [1, 2, 3],
                "nested": {"key": "value"}
            }
        
        result = handler.handle_tool_call("complex_tool", {})
        # Result should be serialized to string for LLM consumption
        assert isinstance(result, str)
        assert "success" in result
        
        mesh.close()
    
    def test_nonexistent_tool(self):
        """Test calling nonexistent tool."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        result = handler.handle_tool_call("nonexistent_tool", {})
        assert "not found" in result.lower() or "unknown" in result.lower()
        
        mesh.close()
    
    def test_tool_with_very_long_parameters(self):
        """Test tool with very long parameter values."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("long_param_tool")
        def long_param_tool(long_text: str) -> str:
            return f"Length: {len(long_text)}"
        
        long_text = "x" * 10000  # 10KB string
        result = handler.handle_tool_call("long_param_tool", {"long_text": long_text})
        assert "Length: 10000" == result
        
        mesh.close()
    
    def test_concurrent_tool_execution(self):
        """Test concurrent tool execution."""
        mesh = ContextMesh(enable_persistence=False)
        handler = ToolHandler(context_mesh=mesh)
        
        @handler.tool("counter_tool")
        def counter_tool(increment: int) -> str:
            # Simulate some work
            time.sleep(0.01)
            current_count = mesh.get("counter") or 0
            new_count = current_count + increment
            mesh.push("counter", new_count)
            return f"Count: {new_count}"
        
        import threading
        
        def worker(increment_value):
            return handler.handle_tool_call("counter_tool", {"increment": increment_value})
        
        # Run multiple tools concurrently
        threads = []
        for i in range(10):
            thread = threading.Thread(target=worker, args=(1,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # Final count should be 10 (though order may vary due to concurrency)
        final_count = mesh.get("counter")
        assert final_count == 10
        
        mesh.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
