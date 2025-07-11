"""
Performance benchmarks for Syntha SDK.

These tests ensure that performance doesn't regress with changes.
Run with: pytest tests/performance/ --benchmark-only
"""
import pytest
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from syntha.context import ContextMesh


class TestContextMeshPerformance:
    """Performance tests for ContextMesh operations."""
    
    def test_single_push_performance(self, benchmark):
        """Benchmark single context push operation."""
        mesh = ContextMesh(enable_persistence=False)
        
        def push_operation():
            mesh.push("test_key", {"data": "test_value"})
        
        result = benchmark(push_operation)
        
        # Cleanup
        mesh.close()
    
    def test_single_get_performance(self, benchmark):
        """Benchmark single context get operation."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.push("test_key", {"data": "test_value"})
        
        def get_operation():
            return mesh.get("test_key")
        
        result = benchmark(get_operation)
        assert result == {"data": "test_value"}
        
        # Cleanup
        mesh.close()
    
    def test_batch_push_performance(self, benchmark):
        """Benchmark batch push operations."""
        mesh = ContextMesh(enable_persistence=False)
        
        def batch_push():
            for i in range(100):
                mesh.push(f"key_{i}", {"data": f"value_{i}"})
        
        result = benchmark(batch_push)
        
        # Verify data
        assert mesh.size() == 100
        
        # Cleanup
        mesh.close()
    
    def test_batch_get_performance(self, benchmark):
        """Benchmark batch get operations."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Setup data
        for i in range(100):
            mesh.push(f"key_{i}", {"data": f"value_{i}"})
        
        def batch_get():
            results = []
            for i in range(100):
                result = mesh.get(f"key_{i}")
                results.append(result)
            return results
        
        results = benchmark(batch_get)
        assert len(results) == 100
        
        # Cleanup
        mesh.close()
    
    def test_concurrent_access_performance(self, benchmark):
        """Benchmark concurrent access to ContextMesh."""
        mesh = ContextMesh(enable_persistence=False)
        
        def concurrent_operations():
            def worker(worker_id):
                for i in range(10):
                    mesh.push(f"worker_{worker_id}_key_{i}", f"value_{i}")
                    mesh.get(f"worker_{worker_id}_key_{i}")
            
            threads = []
            for worker_id in range(10):
                thread = threading.Thread(target=worker, args=(worker_id,))
                threads.append(thread)
                thread.start()
            
            for thread in threads:
                thread.join()
        
        result = benchmark(concurrent_operations)
        
        # Verify data
        assert mesh.size() == 100
        
        # Cleanup
        mesh.close()
    
    def test_topic_routing_performance(self, benchmark):
        """Benchmark topic-based routing performance."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Setup agents with topics
        for i in range(10):
            mesh.register_agent_topics(f"agent_{i}", [f"topic_{i}", "global"])
        
        def topic_routing():
            for i in range(100):
                topic = "global" if i % 10 == 0 else f"topic_{i % 10}"
                mesh.push(f"message_{i}", f"data_{i}", topics=[topic])
        
        result = benchmark(topic_routing)
        
        # Cleanup
        mesh.close()
    
    def test_ttl_cleanup_performance(self, benchmark):
        """Benchmark TTL cleanup performance."""
        mesh = ContextMesh(enable_persistence=False, auto_cleanup=False)
        
        # Setup expired items
        for i in range(1000):
            mesh.push(f"expired_key_{i}", f"value_{i}", ttl=0.001)  # 1ms TTL
        
        time.sleep(0.1)  # Ensure items are expired
        
        def cleanup_operation():
            return mesh.cleanup_expired()
        
        removed_count = benchmark(cleanup_operation)
        assert removed_count == 1000
        
        # Cleanup
        mesh.close()
    
    def test_database_persistence_performance(self, benchmark):
        """Benchmark database persistence operations."""
        mesh = ContextMesh(enable_persistence=True, db_backend="sqlite")
        
        def persistence_operations():
            for i in range(50):
                mesh.push(f"persistent_key_{i}", {"data": f"value_{i}"})
                mesh.get(f"persistent_key_{i}")
        
        result = benchmark(persistence_operations)
        
        # Cleanup
        mesh.close()


class TestToolHandlerPerformance:
    """Performance tests for ToolHandler operations."""
    
    def test_tool_execution_performance(self, benchmark):
        """Benchmark tool execution performance."""
        from syntha.tools import ToolHandler
        
        tools = ToolHandler()
        
        @tools.tool("benchmark_tool")
        def simple_tool(x: int, y: int) -> int:
            return x + y
        
        def tool_execution():
            return tools.handle_tool_call("benchmark_tool", {"x": 5, "y": 10})
        
        result = benchmark(tool_execution)
        assert result == 15
    
    def test_batch_tool_execution_performance(self, benchmark):
        """Benchmark batch tool execution performance."""
        from syntha.tools import ToolHandler
        
        tools = ToolHandler()
        
        @tools.tool("batch_tool")
        def batch_tool(data: list) -> int:
            return sum(data)
        
        def batch_execution():
            results = []
            for i in range(100):
                result = tools.handle_tool_call("batch_tool", {"data": list(range(10))})
                results.append(result)
            return results
        
        results = benchmark(batch_execution)
        assert len(results) == 100
        assert all(r == 45 for r in results)


class TestMemoryUsage:
    """Memory usage tests to ensure efficient resource utilization."""
    
    def test_memory_growth_with_large_dataset(self):
        """Test memory usage with large amounts of data."""
        import psutil
        import os
        
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss
        
        mesh = ContextMesh(enable_persistence=False)
        
        # Add large dataset
        for i in range(10000):
            mesh.push(f"large_key_{i}", {"data": "x" * 100})  # 100 bytes per item
        
        mid_memory = process.memory_info().rss
        
        # Clean up
        mesh.clear()
        
        final_memory = process.memory_info().rss
        
        # Memory should be released after cleanup
        memory_growth = mid_memory - initial_memory
        memory_released = mid_memory - final_memory
        
        # Should release at least 50% of allocated memory
        assert memory_released > memory_growth * 0.5
        
        mesh.close()
    
    def test_ttl_memory_cleanup(self):
        """Test that TTL cleanup properly releases memory."""
        import psutil
        import os
        
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss
        
        mesh = ContextMesh(enable_persistence=False, auto_cleanup=False)
        
        # Add items with short TTL
        for i in range(5000):
            mesh.push(f"ttl_key_{i}", {"data": "x" * 100}, ttl=0.001)
        
        time.sleep(0.1)  # Wait for expiration
        
        before_cleanup_memory = process.memory_info().rss
        
        # Trigger cleanup
        removed_count = mesh.cleanup_expired()
        
        after_cleanup_memory = process.memory_info().rss
        
        # Should have removed all items
        assert removed_count == 5000
        assert mesh.size() == 0
        
        # Memory should be significantly reduced
        memory_released = before_cleanup_memory - after_cleanup_memory
        assert memory_released > 0  # Some memory should be released
        
        mesh.close()


@pytest.fixture
def benchmark_mesh():
    """Fixture for performance tests."""
    mesh = ContextMesh(enable_persistence=False)
    yield mesh
    mesh.close()


if __name__ == "__main__":
    # Run performance tests standalone
    pytest.main([__file__, "--benchmark-only", "-v"])
