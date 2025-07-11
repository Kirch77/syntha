"""
Unit tests for Syntha Context Mesh - Core functionality and edge cases.

These tests ensure the core ContextMesh functionality works correctly
in isolation without external dependencies.
"""
import pytest
import time
import threading
from unittest.mock import Mock, patch
from syntha.context import ContextMesh, ContextItem


@pytest.mark.edge_case
class TestContextItemEdgeCases:
    """Edge case tests for ContextItem."""
    
    def test_context_item_with_zero_ttl(self):
        """Test context item with zero TTL (should expire immediately)."""
        item = ContextItem("test_value", ttl=0)
        time.sleep(0.01)  # Small delay to ensure time passes
        assert item.is_expired()
    
    def test_context_item_with_negative_ttl(self):
        """Test context item with negative TTL (should expire immediately)."""
        item = ContextItem("test_value", ttl=-1)
        assert item.is_expired()
    
    def test_context_item_subscribers_immutability(self):
        """Test that modifying subscribers list doesn't affect original."""
        original_subscribers = ["agent1", "agent2"]
        item = ContextItem("test_value", subscribers=original_subscribers)
        
        # Modify the original list
        original_subscribers.append("agent3")
        
        # Item should not be affected
        assert len(item.subscribers) == 2
        assert "agent3" not in item.subscribers
    
    def test_context_item_large_value(self):
        """Test context item with large data value."""
        large_data = {"data": "x" * 100000}  # 100KB string
        item = ContextItem(large_data)
        assert item.value["data"] == "x" * 100000
        assert item.is_accessible_by("any_agent")


@pytest.mark.edge_case
class TestContextMeshEdgeCases:
    """Edge case tests for ContextMesh."""
    
    def test_empty_string_key(self):
        """Test handling of empty string as key."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.push("", "empty_key_value")
        assert mesh.get("") == "empty_key_value"
        mesh.close()
    
    def test_special_character_keys(self):
        """Test handling of keys with special characters."""
        mesh = ContextMesh(enable_persistence=False)
        special_keys = [
            "key with spaces",
            "key.with.dots",
            "key-with-dashes",
            "key_with_underscores",
            "key/with/slashes",
            "key@with#symbols$",
            "キー",  # Unicode
            "🔑",   # Emoji
        ]
        
        for key in special_keys:
            mesh.push(key, f"value_for_{key}")
            assert mesh.get(key) == f"value_for_{key}"
        
        mesh.close()
    
    def test_none_values(self):
        """Test handling of None values."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.push("none_key", None)
        assert mesh.get("none_key") is None
        
        # Should be distinguishable from missing key
        assert "none_key" in mesh.get_keys_for_agent("test_agent")
        mesh.close()
    
    def test_very_long_key(self):
        """Test handling of very long key names."""
        mesh = ContextMesh(enable_persistence=False)
        long_key = "a" * 1000  # 1000 character key
        mesh.push(long_key, "long_key_value")
        assert mesh.get(long_key) == "long_key_value"
        mesh.close()
    
    def test_duplicate_agent_in_subscribers(self):
        """Test handling of duplicate agents in subscribers list."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.push("test_key", "test_value", subscribers=["agent1", "agent1", "agent2"])
        
        # Should work correctly despite duplicates
        assert mesh.get("test_key", "agent1") == "test_value"
        assert mesh.get("test_key", "agent2") == "test_value"
        mesh.close()
    
    def test_massive_subscriber_list(self):
        """Test performance with large subscriber lists."""
        mesh = ContextMesh(enable_persistence=False)
        large_subscribers = [f"agent_{i}" for i in range(1000)]
        
        mesh.push("test_key", "test_value", subscribers=large_subscribers)
        
        # Random agents should have access
        assert mesh.get("test_key", "agent_500") == "test_value"
        assert mesh.get("test_key", "agent_999") == "test_value"
        assert mesh.get("test_key", "non_subscribed_agent") is None
        mesh.close()
    
    def test_concurrent_cleanup_during_access(self):
        """Test cleanup happening during data access."""
        mesh = ContextMesh(enable_persistence=False, auto_cleanup=True)
        
        # Add expired item
        mesh.push("expired_key", "expired_value", ttl=0.001)
        time.sleep(0.01)
        
        def cleanup_worker():
            mesh.cleanup_expired()
        
        def access_worker():
            return mesh.get("expired_key")
        
        # Run cleanup and access concurrently
        cleanup_thread = threading.Thread(target=cleanup_worker)
        access_thread = threading.Thread(target=access_worker)
        
        cleanup_thread.start()
        access_thread.start()
        
        cleanup_thread.join()
        access_thread.join()
        
        # Should not crash, expired item should be cleaned up
        assert mesh.get("expired_key") is None
        mesh.close()
    
    def test_context_mesh_as_context_manager(self):
        """Test ContextMesh as context manager."""
        with ContextMesh(enable_persistence=False) as mesh:
            mesh.push("test_key", "test_value")
            assert mesh.get("test_key") == "test_value"
        # Should close automatically


@pytest.mark.edge_case
class TestTopicSystemEdgeCases:
    """Edge case tests for topic system."""
    
    def test_agent_subscribed_to_no_topics(self):
        """Test agent with no topic subscriptions."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.register_agent_topics("agent1", [])
        
        # Should not receive topic-based messages
        mesh.push("test_key", "test_value", topics=["sales"])
        assert mesh.get("test_key", "agent1") is None
        mesh.close()
    
    def test_push_to_nonexistent_topic(self):
        """Test pushing to topic with no subscribers."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Should not crash, just no recipients
        mesh.push("test_key", "test_value", topics=["nonexistent_topic"])
        assert mesh.size() == 1  # Data still stored
        
        # No agent should receive it
        assert mesh.get("test_key", "any_agent") is None
        mesh.close()
    
    def test_topic_with_special_characters(self):
        """Test topics with special characters."""
        mesh = ContextMesh(enable_persistence=False)
        special_topics = ["topic.with.dots", "topic-with-dashes", "topic with spaces"]
        
        mesh.register_agent_topics("agent1", special_topics)
        
        for topic in special_topics:
            mesh.push(f"key_{topic}", f"value_{topic}", topics=[topic])
            assert mesh.get(f"key_{topic}", "agent1") == f"value_{topic}"
        
        mesh.close()
    
    def test_massive_topic_list(self):
        """Test performance with large number of topics."""
        mesh = ContextMesh(enable_persistence=False)
        many_topics = [f"topic_{i}" for i in range(100)]
        
        mesh.register_agent_topics("agent1", many_topics)
        
        # Push to many topics at once
        mesh.push("broadcast_key", "broadcast_value", topics=many_topics)
        assert mesh.get("broadcast_key", "agent1") == "broadcast_value"
        mesh.close()


@pytest.mark.edge_case
class TestErrorHandling:
    """Test error handling and resilience."""
    
    def test_invalid_routing_combination(self):
        """Test error when both topics and subscribers are provided."""
        mesh = ContextMesh(enable_persistence=False)
        
        with pytest.raises(ValueError, match="Cannot specify both 'topics' and 'subscribers'"):
            mesh.push("test_key", "test_value", 
                     subscribers=["agent1"], 
                     topics=["topic1"])
        mesh.close()
    
    def test_database_connection_failure_graceful_degradation(self):
        """Test graceful degradation when database fails."""
        with patch('syntha.persistence.create_database_backend') as mock_db:
            mock_backend = Mock()
            mock_backend.connect.side_effect = Exception("Database connection failed")
            mock_db.return_value = mock_backend
            
            # Should not crash, should work in memory-only mode
            try:
                mesh = ContextMesh(enable_persistence=True, db_backend="sqlite")
                mesh.push("test_key", "test_value")
                assert mesh.get("test_key") == "test_value"
                mesh.close()
            except Exception as e:
                pytest.fail(f"ContextMesh should handle database failures gracefully: {e}")
    
    def test_thread_safety_stress_test(self):
        """Stress test for thread safety."""
        mesh = ContextMesh(enable_persistence=False)
        num_threads = 20
        operations_per_thread = 50
        
        def worker(thread_id):
            for i in range(operations_per_thread):
                # Mix of operations
                mesh.push(f"key_{thread_id}_{i}", f"value_{thread_id}_{i}")
                mesh.get(f"key_{thread_id}_{i}")
                if i % 10 == 0:
                    mesh.get_stats()
                if i % 15 == 0 and i > 0:
                    mesh.remove(f"key_{thread_id}_{i-1}")
        
        threads = []
        for thread_id in range(num_threads):
            thread = threading.Thread(target=worker, args=(thread_id,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # Should be in consistent state
        stats = mesh.get_stats()
        assert stats["total_items"] >= 0
        mesh.close()
    
    def test_memory_cleanup_on_close(self):
        """Test that resources are properly cleaned up."""
        mesh = ContextMesh(enable_persistence=False)
        mesh.push("test_key", "test_value")
        
        # Store reference to internal data
        initial_size = len(mesh._data)
        assert initial_size > 0
        
        mesh.close()
        
        # After close, mesh should still function but resources should be cleaned
        # (Implementation detail: some cleanup might happen in close())


@pytest.mark.edge_case
class TestDataIntegrity:
    """Test data integrity and consistency."""
    
    def test_data_immutability_after_storage(self):
        """Test that stored data cannot be modified externally."""
        mesh = ContextMesh(enable_persistence=False)
        original_data = {"list": [1, 2, 3], "dict": {"key": "value"}}
        
        mesh.push("test_key", original_data)
        
        # Modify original data
        original_data["list"].append(4)
        original_data["dict"]["new_key"] = "new_value"
        
        # Retrieved data should not be affected
        retrieved_data = mesh.get("test_key")
        assert len(retrieved_data["list"]) == 3
        assert "new_key" not in retrieved_data["dict"]
        mesh.close()
    
    def test_ttl_precision(self):
        """Test TTL precision and timing."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Test various TTL values
        ttl_values = [0.1, 0.5, 1.0, 2.0]
        
        for ttl in ttl_values:
            key = f"ttl_test_{ttl}"
            mesh.push(key, f"value_{ttl}", ttl=ttl)
            
            # Should be accessible immediately
            assert mesh.get(key) == f"value_{ttl}"
            
            # Wait and check expiration (with some tolerance)
            time.sleep(ttl + 0.1)
            assert mesh.get(key) is None
        
        mesh.close()
    
    def test_agent_isolation_integrity(self):
        """Test that agent isolation is maintained under stress."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Create private data for 100 agents
        for i in range(100):
            agent_name = f"agent_{i}"
            mesh.push(f"private_{i}", f"secret_data_{i}", subscribers=[agent_name])
        
        # Each agent should only access their own data
        for i in range(100):
            agent_name = f"agent_{i}"
            accessible_keys = mesh.get_keys_for_agent(agent_name)
            
            # Should only have access to their own key
            assert f"private_{i}" in accessible_keys
            
            # Should not have access to other agents' keys
            for j in range(100):
                if i != j:
                    assert f"private_{j}" not in accessible_keys
        
        mesh.close()


@pytest.mark.edge_case
class TestPerformanceConstraints:
    """Test performance constraints and limitations."""
    
    def test_large_value_handling(self):
        """Test handling of large values."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Test with 1MB of data
        large_value = {"data": "x" * (1024 * 1024)}
        
        start_time = time.time()
        mesh.push("large_key", large_value)
        push_time = time.time() - start_time
        
        start_time = time.time()
        retrieved_value = mesh.get("large_key")
        get_time = time.time() - start_time
        
        # Should complete reasonably quickly (adjust thresholds as needed)
        assert push_time < 1.0  # Less than 1 second
        assert get_time < 1.0   # Less than 1 second
        assert retrieved_value["data"] == "x" * (1024 * 1024)
        mesh.close()
    
    def test_high_frequency_operations(self):
        """Test high-frequency push/get operations."""
        mesh = ContextMesh(enable_persistence=False)
        
        num_operations = 1000
        
        # High-frequency pushes
        start_time = time.time()
        for i in range(num_operations):
            mesh.push(f"freq_key_{i}", f"freq_value_{i}")
        push_duration = time.time() - start_time
        
        # High-frequency gets
        start_time = time.time()
        for i in range(num_operations):
            mesh.get(f"freq_key_{i}")
        get_duration = time.time() - start_time
        
        # Should maintain reasonable performance
        # (Adjust thresholds based on expected performance)
        assert push_duration < 5.0  # Less than 5 seconds for 1000 pushes
        assert get_duration < 5.0   # Less than 5 seconds for 1000 gets
        
        mesh.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
