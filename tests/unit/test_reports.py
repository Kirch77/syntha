"""
Unit tests for reports and outcome tracking functionality.

These tests verify that the reporting system works correctly
for tracking agent outcomes and performance metrics.
"""
import pytest
import time
import json
from syntha.reports import AgentOutcome, OutcomeLogger


class TestAgentOutcome:
    """Test AgentOutcome data structure."""
    
    def test_agent_outcome_creation(self):
        """Test creating AgentOutcome."""
        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="data_processing",
            success=True,
            duration_seconds=1.5
        )
        
        assert outcome.agent_name == "test_agent"
        assert outcome.task_type == "data_processing"
        assert outcome.success is True
        assert outcome.duration_seconds == 1.5
        assert outcome.timestamp == 1234567890.0
    
    def test_agent_outcome_with_metadata(self):
        """Test AgentOutcome with metadata."""
        metadata = {
            "tools_used": ["tool1", "tool2"],
            "context_accessed": ["key1", "key2"]
        }
        
        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="analysis",
            success=True,
            duration_seconds=2.5,
            metadata=metadata
        )
        
        assert outcome.metadata == metadata
        assert "tool1" in outcome.metadata["tools_used"]
    
    def test_agent_outcome_to_dict(self):
        """Test converting AgentOutcome to dictionary."""
        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="processing",
            success=True,
            duration_seconds=1.0,
            metadata={"key": "value"}
        )
        
        outcome_dict = outcome.to_dict()
        
        assert outcome_dict["agent_name"] == "test_agent"
        assert outcome_dict["task_type"] == "processing"
        assert outcome_dict["success"] is True
        assert outcome_dict["duration_seconds"] == 1.0
        assert outcome_dict["timestamp"] == 1234567890.0
        assert outcome_dict["metadata"] == {"key": "value"}
    
    def test_agent_outcome_from_dict(self):
        """Test creating AgentOutcome from dictionary."""
        outcome_dict = {
            "timestamp": 1234567890.0,
            "agent_name": "test_agent",
            "task_type": "processing",
            "success": True,
            "duration_seconds": 1.0,
            "metadata": {"key": "value"}
        }
        
        outcome = AgentOutcome.from_dict(outcome_dict)
        
        assert outcome.agent_name == "test_agent"
        assert outcome.task_type == "processing"
        assert outcome.success is True
        assert outcome.duration_seconds == 1.0
        assert outcome.timestamp == 1234567890.0
        assert outcome.metadata == {"key": "value"}
    
    def test_agent_outcome_equality(self):
        """Test AgentOutcome equality comparison."""
        outcome1 = AgentOutcome(
            agent_name="agent1",
            task_id="task1",
            outcome_type="success",
            details="details1",
            timestamp=123.0
        )
        
        outcome2 = AgentOutcome(
            agent_name="agent1",
            task_id="task1",
            outcome_type="success",
            details="details1",
            timestamp=123.0
        )
        
        outcome3 = AgentOutcome(
            agent_name="agent2",
            task_id="task1",
            outcome_type="success",
            details="details1",
            timestamp=123.0
        )
        
        assert outcome1 == outcome2
        assert outcome1 != outcome3


class TestOutcomeLogger:
    """Test OutcomeLogger functionality."""
    
    def test_outcome_logger_creation(self):
        """Test creating OutcomeLogger."""
        logger = OutcomeLogger()
        assert logger.outcomes == []
        assert logger.max_outcomes == 1000
    
    def test_outcome_logger_with_custom_max(self):
        """Test OutcomeLogger with custom max outcomes."""
        logger = OutcomeLogger(max_outcomes=500)
        assert logger.max_outcomes == 500
    
    def test_log_outcome(self):
        """Test logging outcomes."""
        logger = OutcomeLogger()
        
        outcome = AgentOutcome(
            agent_name="test_agent",
            task_id="task_123",
            outcome_type="success",
            details="Task completed"
        )
        
        logger.log_outcome(outcome)
        
        assert len(logger.outcomes) == 1
        assert logger.outcomes[0] == outcome
    
    def test_log_multiple_outcomes(self):
        """Test logging multiple outcomes."""
        logger = OutcomeLogger()
        
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Completed"),
            AgentOutcome("agent2", "task2", "failure", "Failed"),
            AgentOutcome("agent1", "task3", "success", "Completed"),
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        assert len(logger.outcomes) == 3
        assert logger.outcomes == outcomes
    
    def test_max_outcomes_limit(self):
        """Test that max outcomes limit is enforced."""
        logger = OutcomeLogger(max_outcomes=3)
        
        # Add more outcomes than the limit
        for i in range(5):
            outcome = AgentOutcome(
                agent_name=f"agent_{i}",
                task_id=f"task_{i}",
                outcome_type="success",
                details=f"Task {i} completed"
            )
            logger.log_outcome(outcome)
        
        # Should only keep the last 3 outcomes
        assert len(logger.outcomes) == 3
        assert logger.outcomes[0].agent_name == "agent_2"
        assert logger.outcomes[1].agent_name == "agent_3"
        assert logger.outcomes[2].agent_name == "agent_4"
    
    def test_get_recent_outcomes(self):
        """Test getting recent outcomes."""
        logger = OutcomeLogger()
        
        # Add outcomes with different timestamps
        for i in range(5):
            outcome = AgentOutcome(
                agent_name=f"agent_{i}",
                task_id=f"task_{i}",
                outcome_type="success",
                details=f"Task {i}",
                timestamp=time.time() + i  # Different timestamps
            )
            logger.log_outcome(outcome)
        
        # Get recent outcomes
        recent = logger.get_recent_outcomes(count=3)
        
        assert len(recent) == 3
        # Should be in reverse chronological order (most recent first)
        assert recent[0].agent_name == "agent_4"
        assert recent[1].agent_name == "agent_3"
        assert recent[2].agent_name == "agent_2"
    
    def test_get_recent_outcomes_by_agent(self):
        """Test getting recent outcomes filtered by agent."""
        logger = OutcomeLogger()
        
        # Add outcomes for different agents
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Task 1", timestamp=1.0),
            AgentOutcome("agent2", "task2", "failure", "Task 2", timestamp=2.0),
            AgentOutcome("agent1", "task3", "success", "Task 3", timestamp=3.0),
            AgentOutcome("agent2", "task4", "success", "Task 4", timestamp=4.0),
            AgentOutcome("agent1", "task5", "failure", "Task 5", timestamp=5.0),
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        # Get recent outcomes for agent1
        agent1_outcomes = logger.get_recent_outcomes(agent_name="agent1", count=2)
        
        assert len(agent1_outcomes) == 2
        assert agent1_outcomes[0].task_id == "task5"  # Most recent
        assert agent1_outcomes[1].task_id == "task3"
        assert all(outcome.agent_name == "agent1" for outcome in agent1_outcomes)
    
    def test_get_recent_outcomes_by_type(self):
        """Test getting recent outcomes filtered by type."""
        logger = OutcomeLogger()
        
        # Add outcomes with different types
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Success 1", timestamp=1.0),
            AgentOutcome("agent1", "task2", "failure", "Failure 1", timestamp=2.0),
            AgentOutcome("agent1", "task3", "success", "Success 2", timestamp=3.0),
            AgentOutcome("agent1", "task4", "error", "Error 1", timestamp=4.0),
            AgentOutcome("agent1", "task5", "success", "Success 3", timestamp=5.0),
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        # Get recent success outcomes
        success_outcomes = logger.get_recent_outcomes(outcome_type="success", count=2)
        
        assert len(success_outcomes) == 2
        assert success_outcomes[0].task_id == "task5"  # Most recent success
        assert success_outcomes[1].task_id == "task3"
        assert all(outcome.outcome_type == "success" for outcome in success_outcomes)
    
    def test_get_performance_metrics(self):
        """Test getting performance metrics."""
        logger = OutcomeLogger()
        
        # Add various outcomes
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Success", timestamp=time.time() - 3600),  # 1 hour ago
            AgentOutcome("agent1", "task2", "failure", "Failure", timestamp=time.time() - 1800),  # 30 min ago
            AgentOutcome("agent1", "task3", "success", "Success", timestamp=time.time() - 900),   # 15 min ago
            AgentOutcome("agent2", "task4", "success", "Success", timestamp=time.time() - 600),   # 10 min ago
            AgentOutcome("agent1", "task5", "error", "Error", timestamp=time.time() - 300),       # 5 min ago
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        # Get metrics for agent1
        metrics = logger.get_performance_metrics(agent_name="agent1")
        
        assert metrics["total_outcomes"] == 4
        assert metrics["success_count"] == 2
        assert metrics["failure_count"] == 1
        assert metrics["error_count"] == 1
        assert metrics["success_rate"] == 0.5  # 2/4 = 0.5
        
        # Get overall metrics
        overall_metrics = logger.get_performance_metrics()
        
        assert overall_metrics["total_outcomes"] == 5
        assert overall_metrics["success_count"] == 3
        assert overall_metrics["success_rate"] == 0.6  # 3/5 = 0.6
    
    def test_get_performance_metrics_time_window(self):
        """Test getting performance metrics within time window."""
        logger = OutcomeLogger()
        
        current_time = time.time()
        
        # Add outcomes at different times
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Old success", timestamp=current_time - 7200),  # 2 hours ago
            AgentOutcome("agent1", "task2", "success", "Recent success", timestamp=current_time - 1800),  # 30 min ago
            AgentOutcome("agent1", "task3", "failure", "Recent failure", timestamp=current_time - 900),   # 15 min ago
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        # Get metrics for last hour (3600 seconds)
        metrics = logger.get_performance_metrics(agent_name="agent1", time_window_seconds=3600)
        
        assert metrics["total_outcomes"] == 2  # Only recent outcomes
        assert metrics["success_count"] == 1
        assert metrics["failure_count"] == 1
        assert metrics["success_rate"] == 0.5
    
    def test_clear_outcomes(self):
        """Test clearing all outcomes."""
        logger = OutcomeLogger()
        
        # Add some outcomes
        for i in range(5):
            outcome = AgentOutcome(f"agent_{i}", f"task_{i}", "success", f"Task {i}")
            logger.log_outcome(outcome)
        
        assert len(logger.outcomes) == 5
        
        # Clear outcomes
        logger.clear_outcomes()
        
        assert len(logger.outcomes) == 0
    
    def test_clear_outcomes_by_agent(self):
        """Test clearing outcomes for specific agent."""
        logger = OutcomeLogger()
        
        # Add outcomes for different agents
        outcomes = [
            AgentOutcome("agent1", "task1", "success", "Task 1"),
            AgentOutcome("agent2", "task2", "success", "Task 2"),
            AgentOutcome("agent1", "task3", "success", "Task 3"),
            AgentOutcome("agent3", "task4", "success", "Task 4"),
        ]
        
        for outcome in outcomes:
            logger.log_outcome(outcome)
        
        assert len(logger.outcomes) == 4
        
        # Clear outcomes for agent1
        logger.clear_outcomes(agent_name="agent1")
        
        assert len(logger.outcomes) == 2
        remaining_agents = [outcome.agent_name for outcome in logger.outcomes]
        assert "agent1" not in remaining_agents
        assert "agent2" in remaining_agents
        assert "agent3" in remaining_agents


class TestOutcomeLoggerEdgeCases:
    """Test edge cases in outcome logging."""
    
    def test_empty_logger_metrics(self):
        """Test metrics on empty logger."""
        logger = OutcomeLogger()
        
        metrics = logger.get_performance_metrics()
        
        assert metrics["total_outcomes"] == 0
        assert metrics["success_count"] == 0
        assert metrics["failure_count"] == 0
        assert metrics["error_count"] == 0
        assert metrics["success_rate"] == 0.0
    
    def test_single_outcome_metrics(self):
        """Test metrics with single outcome."""
        logger = OutcomeLogger()
        
        outcome = AgentOutcome("agent1", "task1", "success", "Single task")
        logger.log_outcome(outcome)
        
        metrics = logger.get_performance_metrics()
        
        assert metrics["total_outcomes"] == 1
        assert metrics["success_count"] == 1
        assert metrics["success_rate"] == 1.0
    
    def test_get_recent_outcomes_empty(self):
        """Test getting recent outcomes from empty logger."""
        logger = OutcomeLogger()
        
        recent = logger.get_recent_outcomes(count=5)
        
        assert recent == []
    
    def test_get_recent_outcomes_more_than_available(self):
        """Test requesting more recent outcomes than available."""
        logger = OutcomeLogger()
        
        # Add only 2 outcomes
        for i in range(2):
            outcome = AgentOutcome(f"agent_{i}", f"task_{i}", "success", f"Task {i}")
            logger.log_outcome(outcome)
        
        # Request 5 recent outcomes
        recent = logger.get_recent_outcomes(count=5)
        
        assert len(recent) == 2  # Should return all available
    
    def test_outcome_with_large_metadata(self):
        """Test outcome with large metadata."""
        logger = OutcomeLogger()
        
        # Create large metadata
        large_metadata = {
            "large_data": "x" * 10000,  # 10KB string
            "nested": {
                "level1": {
                    "level2": ["item"] * 1000  # Large nested structure
                }
            }
        }
        
        outcome = AgentOutcome(
            agent_name="test_agent",
            task_id="large_task",
            outcome_type="success",
            details="Task with large metadata",
            metadata=large_metadata
        )
        
        logger.log_outcome(outcome)
        
        assert len(logger.outcomes) == 1
        assert logger.outcomes[0].metadata["large_data"] == "x" * 10000
    
    def test_outcome_with_special_characters(self):
        """Test outcome with special characters in strings."""
        logger = OutcomeLogger()
        
        special_chars_outcome = AgentOutcome(
            agent_name="агент_测试",  # Unicode characters
            task_id="task_🚀_🎯",     # Emoji
            outcome_type="success",
            details="Task with special chars: \n\t\"quotes\" & symbols!",
            metadata={"unicode": "测试数据", "emoji": "🎉✨"}
        )
        
        logger.log_outcome(special_chars_outcome)
        
        assert len(logger.outcomes) == 1
        retrieved = logger.outcomes[0]
        assert retrieved.agent_name == "агент_测试"
        assert retrieved.task_id == "task_🚀_🎯"
        assert retrieved.metadata["unicode"] == "测试数据"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
