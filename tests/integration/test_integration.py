"""
Integration tests for Syntha SDK.

These tests verify that different components work together correctly
and that the system behaves properly with real databases and external services.
"""
import pytest
import os
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from syntha.context import ContextMesh
from syntha.tools import ToolHandler


class TestDatabaseIntegration:
    """Integration tests with real databases."""
    
    @pytest.mark.parametrize("db_backend", ["sqlite", "postgresql"])
    def test_full_persistence_cycle(self, db_backend, tmp_path):
        """Test complete persistence lifecycle with real databases."""
        if db_backend == "postgresql":
            db_config = {
                "connection_string": os.getenv("POSTGRES_URL", "postgresql://postgres:postgres@localhost:5432/syntha_test")
            }
        else:
            db_config = {
                "db_path": str(tmp_path / "test.db")
            }
        
        # Create mesh with persistence
        mesh1 = ContextMesh(
            enable_persistence=True,
            db_backend=db_backend,
            **db_config
        )
        
        # Add various types of data
        test_data = [
            ("simple_string", "hello world"),
            ("complex_dict", {"nested": {"data": [1, 2, 3]}, "timestamp": time.time()}),
            ("agent_specific", {"agent_data": True}, ["agent1", "agent2"]),
            ("with_ttl", {"expires": True}, None, 3600),
            ("topic_data", {"broadcast": True}, None, None, ["sales", "analytics"])
        ]
        
        for item in test_data:
            if len(item) == 5:  # Topic-based
                key, value, _, ttl, topics = item
                mesh1.push(key, value, topics=topics, ttl=ttl)
            elif len(item) == 4:  # With TTL
                key, value, subscribers, ttl = item
                mesh1.push(key, value, subscribers=subscribers, ttl=ttl)
            else:  # Simple or with subscribers
                key, value = item[:2]
                subscribers = item[2] if len(item) > 2 else None
                mesh1.push(key, value, subscribers=subscribers)
        
        # Verify data is accessible
        assert mesh1.get("simple_string") == "hello world"
        assert mesh1.get("complex_dict")["nested"]["data"] == [1, 2, 3]
        assert mesh1.get("agent_specific", "agent1")["agent_data"] is True
        assert mesh1.get("agent_specific", "agent3") is None  # No access
        
        # Close first mesh
        mesh1.close()
        
        # Create new mesh with same config - should load persisted data
        mesh2 = ContextMesh(
            enable_persistence=True,
            db_backend=db_backend,
            **db_config
        )
        
        # Verify data persisted correctly
        assert mesh2.get("simple_string") == "hello world"
        assert mesh2.get("complex_dict")["nested"]["data"] == [1, 2, 3]
        assert mesh2.get("agent_specific", "agent1")["agent_data"] is True
        assert mesh2.get("with_ttl")["expires"] is True
        
        # Verify stats
        stats = mesh2.get_stats()
        assert stats["total_items"] >= 4  # At least the non-expired items
        
        mesh2.close()
    
    def test_concurrent_database_access(self, tmp_path):
        """Test concurrent access to database."""
        db_path = str(tmp_path / "concurrent.db")
        
        def worker(worker_id, barrier):
            mesh = ContextMesh(
                enable_persistence=True,
                db_backend="sqlite",
                db_path=db_path
            )
            
            barrier.wait()  # Synchronize start
            
            # Each worker adds data
            for i in range(100):
                mesh.push(f"worker_{worker_id}_item_{i}", {
                    "worker_id": worker_id,
                    "item_id": i,
                    "data": f"data_{i}"
                })
            
            # Read some data
            for i in range(0, 100, 10):
                value = mesh.get(f"worker_{worker_id}_item_{i}")
                assert value["worker_id"] == worker_id
            
            mesh.close()
        
        # Run multiple workers concurrently
        num_workers = 5
        barrier = threading.Barrier(num_workers)
        threads = []
        
        for worker_id in range(num_workers):
            thread = threading.Thread(target=worker, args=(worker_id, barrier))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # Verify final state
        final_mesh = ContextMesh(
            enable_persistence=True,
            db_backend="sqlite",
            db_path=db_path
        )
        
        # Should have all items from all workers
        assert final_mesh.size() == num_workers * 100
        
        # Verify data integrity
        for worker_id in range(num_workers):
            for i in range(0, 100, 20):  # Check every 20th item
                value = final_mesh.get(f"worker_{worker_id}_item_{i}")
                assert value["worker_id"] == worker_id
                assert value["item_id"] == i
        
        final_mesh.close()


class TestToolIntegration:
    """Integration tests for tool system."""
    
    def test_tools_with_context_integration(self):
        """Test tools working with context mesh."""
        mesh = ContextMesh(enable_persistence=False)
        tools = ToolHandler(context_mesh=mesh, agent_name="test_agent")
        
        # Test storing context data using the tool handler
        result = tools.handle_push_context(
            key="user.123",
            value={"name": "Test User", "email": "test@example.com"},
            topics=["users"]
        )
        assert result["success"] is True
        
        # Test retrieving context data using the tool handler  
        result = tools.handle_get_context(key="user.123")
        assert result["success"] is True
        assert result["value"]["name"] == "Test User"
        assert result["value"]["email"] == "test@example.com"
        
        # Test listing available context
        result = tools.handle_list_context()
        assert result["success"] is True
        assert "user.123" in result["keys"]
        
        # Test subscribing to topics
        result = tools.handle_subscribe_to_topics(topics=["users", "admin"])
        assert result["success"] is True
        
        # Test discovering topics
        result = tools.handle_discover_topics()
        assert result["success"] is True
        assert "users" in result["topics"]
        assert result2["email"] == "john@example.com"
        
        # 3. Update stats multiple times
        for action in ["login", "view_profile", "update_email"]:
            result3 = tools.handle_tool_call("update_user_stats", {
                "user_id": "user123",
                "action": action
            })
            assert "Stats updated" in result3
        
        # 4. Verify final state
        user_data = mesh.get("user.user123")
        stats_data = mesh.get("stats.user123")
        
        assert user_data["name"] == "John Doe"
        assert stats_data["actions"] == 3
        assert stats_data["last_action"] == "update_email"
        
        mesh.close()
    
    def test_async_tool_integration(self):
        """Test async tools with context mesh."""
        import asyncio
        
        async def run_async_test():
            mesh = ContextMesh(enable_persistence=False)
            tools = ToolHandler(context_mesh=mesh)
            
            @tools.tool("async_data_processor")
            async def async_data_processor(data_list: list) -> dict:
                """Simulate async data processing."""
                await asyncio.sleep(0.1)  # Simulate async work
                
                processed_data = {
                    "count": len(data_list),
                    "sum": sum(data_list),
                    "avg": sum(data_list) / len(data_list) if data_list else 0,
                    "processed_at": time.time()
                }
                
                # Store in context
                tools.context_mesh.push("last_processed", processed_data)
                return processed_data
            
            # Test async tool execution
            result = await tools.handle_tool_call_async("async_data_processor", {
                "data_list": [1, 2, 3, 4, 5]
            })
            
            assert result["count"] == 5
            assert result["sum"] == 15
            assert result["avg"] == 3.0
            
            # Verify context storage
            stored_data = mesh.get("last_processed")
            assert stored_data["count"] == 5
            
            mesh.close()
        
        # Run the async test
        asyncio.run(run_async_test())


class TestMultiAgentIntegration:
    """Integration tests for multi-agent scenarios."""
    
    def test_multi_agent_workflow(self):
        """Test complex multi-agent workflow."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Setup agents with different topic subscriptions
        agents = {
            "coordinator": ["workflow", "status"],
            "data_processor": ["workflow", "data"],
            "analyzer": ["data", "analysis"],
            "reporter": ["analysis", "reports"]
        }
        
        for agent_name, topics in agents.items():
            mesh.register_agent_topics(agent_name, topics)
        
        # Simulate workflow
        # 1. Coordinator starts workflow
        mesh.push("workflow_start", {
            "workflow_id": "wf_001",
            "task": "analyze_sales_data",
            "started_by": "coordinator",
            "timestamp": time.time()
        }, topics=["workflow"])
        
        # 2. Data processor receives workflow and processes data
        workflow_data = mesh.get("workflow_start", "data_processor")
        assert workflow_data["workflow_id"] == "wf_001"
        
        mesh.push("raw_data", {
            "workflow_id": "wf_001",
            "data": [100, 200, 150, 300, 250],
            "source": "sales_db",
            "processed_by": "data_processor"
        }, topics=["data"])
        
        # 3. Analyzer receives data and performs analysis
        raw_data = mesh.get("raw_data", "analyzer")
        assert len(raw_data["data"]) == 5
        
        mesh.push("analysis_results", {
            "workflow_id": "wf_001",
            "total_sales": sum(raw_data["data"]),
            "avg_sales": sum(raw_data["data"]) / len(raw_data["data"]),
            "trend": "increasing",
            "analyzed_by": "analyzer"
        }, topics=["analysis"])
        
        # 4. Reporter generates report
        analysis = mesh.get("analysis_results", "reporter")
        assert analysis["total_sales"] == 1000
        
        mesh.push("final_report", {
            "workflow_id": "wf_001",
            "summary": f"Total sales: {analysis['total_sales']}, Average: {analysis['avg_sales']}",
            "status": "completed",
            "generated_by": "reporter"
        }, topics=["reports"])
        
        # 5. Coordinator receives completion status
        mesh.push("workflow_complete", {
            "workflow_id": "wf_001",
            "status": "success",
            "completed_at": time.time()
        }, topics=["status"])
        
        # Verify workflow completion
        completion = mesh.get("workflow_complete", "coordinator")
        assert completion["status"] == "success"
        
        # Verify each agent can access relevant data
        coordinator_keys = mesh.get_keys_for_agent("coordinator")
        data_processor_keys = mesh.get_keys_for_agent("data_processor")
        analyzer_keys = mesh.get_keys_for_agent("analyzer")
        reporter_keys = mesh.get_keys_for_agent("reporter")
        
        # Each agent should have access to relevant workflow data
        assert "workflow_start" in coordinator_keys
        assert "workflow_start" in data_processor_keys
        assert "raw_data" in analyzer_keys
        assert "analysis_results" in reporter_keys
        
        mesh.close()
    
    def test_agent_isolation(self):
        """Test that agent isolation works correctly."""
        mesh = ContextMesh(enable_persistence=False)
        
        # Create private data for different agents
        mesh.push("agent1_private", {"secret": "agent1_data"}, subscribers=["agent1"])
        mesh.push("agent2_private", {"secret": "agent2_data"}, subscribers=["agent2"])
        mesh.push("shared_data", {"public": "everyone_can_see"})
        
        # Test access control
        assert mesh.get("agent1_private", "agent1") == {"secret": "agent1_data"}
        assert mesh.get("agent1_private", "agent2") is None  # No access
        
        assert mesh.get("agent2_private", "agent2") == {"secret": "agent2_data"}
        assert mesh.get("agent2_private", "agent1") is None  # No access
        
        # Both can access shared data
        assert mesh.get("shared_data", "agent1") == {"public": "everyone_can_see"}
        assert mesh.get("shared_data", "agent2") == {"public": "everyone_can_see"}
        
        # Verify key listings
        agent1_keys = mesh.get_keys_for_agent("agent1")
        agent2_keys = mesh.get_keys_for_agent("agent2")
        
        assert "agent1_private" in agent1_keys
        assert "agent1_private" not in agent2_keys
        assert "agent2_private" in agent2_keys
        assert "agent2_private" not in agent1_keys
        assert "shared_data" in agent1_keys
        assert "shared_data" in agent2_keys
        
        mesh.close()


class TestErrorHandlingIntegration:
    """Integration tests for error scenarios."""
    
    def test_database_failure_recovery(self, tmp_path):
        """Test recovery from database failures."""
        db_path = str(tmp_path / "test.db")
        
        # Create mesh and add data
        mesh = ContextMesh(
            enable_persistence=True,
            db_backend="sqlite",
            db_path=db_path
        )
        
        mesh.push("test_data", {"value": "persistent"})
        mesh.close()
        
        # Corrupt the database file
        with open(db_path, 'w') as f:
            f.write("corrupted data")
        
        # Creating new mesh should handle corruption gracefully
        # (Implementation should have error handling for this)
        try:
            mesh2 = ContextMesh(
                enable_persistence=True,
                db_backend="sqlite",
                db_path=db_path
            )
            # Should start with empty mesh if database is corrupted
            assert mesh2.size() == 0
            mesh2.close()
        except Exception as e:
            # Should not crash - should handle database errors gracefully
            pytest.fail(f"ContextMesh should handle database corruption gracefully: {e}")
    
    def test_concurrent_access_edge_cases(self):
        """Test edge cases in concurrent access."""
        mesh = ContextMesh(enable_persistence=False)
        
        def aggressive_worker(worker_id):
            """Worker that performs many operations rapidly."""
            for i in range(100):
                # Mix of operations
                mesh.push(f"worker_{worker_id}_key_{i}", f"value_{i}")
                
                if i % 10 == 0:
                    mesh.cleanup_expired()
                
                if i % 5 == 0:
                    mesh.get(f"worker_{worker_id}_key_{i}")
                
                if i % 15 == 0:
                    mesh.remove(f"worker_{worker_id}_key_{i-5}")
        
        # Run multiple aggressive workers
        threads = []
        for worker_id in range(10):
            thread = threading.Thread(target=aggressive_worker, args=(worker_id,))
            threads.append(thread)
            thread.start()
        
        for thread in threads:
            thread.join()
        
        # Mesh should still be in a consistent state
        stats = mesh.get_stats()
        assert stats["total_items"] >= 0  # Should not be negative
        
        mesh.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
