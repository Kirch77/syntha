"""
Unit tests for reports and outcome tracking functionality.

These tests verify that the reporting system works correctly
for tracking agent outcomes and performance metrics.
"""

import json
import time

import pytest

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
            duration_seconds=1.5,
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
            "context_accessed": ["key1", "key2"],
        }

        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="analysis",
            success=True,
            duration_seconds=2.5,
            metadata=metadata,
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
            metadata={"key": "value"},
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
            "metadata": {"key": "value"},
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
            timestamp=123.0,
            agent_name="agent1",
            task_type="success",
            success=True,
            duration_seconds=1.0,
        )

        outcome2 = AgentOutcome(
            timestamp=123.0,
            agent_name="agent1",
            task_type="success",
            success=True,
            duration_seconds=1.0,
        )

        outcome3 = AgentOutcome(
            timestamp=123.0,
            agent_name="agent2",
            task_type="success",
            success=True,
            duration_seconds=1.0,
        )

        assert outcome1 == outcome2
        assert outcome1 != outcome3


class TestOutcomeLogger:
    """Test OutcomeLogger functionality."""

    def test_outcome_logger_creation(self):
        """Test creating OutcomeLogger."""
        logger = OutcomeLogger(storage_type="memory")
        assert logger.storage_type == "memory"
        assert logger._memory_outcomes == []

    def test_outcome_logger_with_file_storage(self):
        """Test OutcomeLogger with file storage."""
        logger = OutcomeLogger(storage_type="file", file_path="test.log")
        assert logger.storage_type == "file"
        assert logger.file_path == "test.log"

    def test_log_outcome(self):
        """Test logging outcomes."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome(
            agent_name="test_agent",
            task_type="data_processing",
            success=True,
            duration_seconds=1.5,
        )

        assert len(logger._memory_outcomes) == 1
        outcome = logger._memory_outcomes[0]
        assert outcome.agent_name == "test_agent"
        assert outcome.task_type == "data_processing"
        assert outcome.success is True
        assert outcome.duration_seconds == 1.5

    def test_log_multiple_outcomes(self):
        """Test logging multiple outcomes."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True, 1.0)
        logger.log_outcome("agent2", "task2", False, 2.0)
        logger.log_outcome("agent1", "task3", True, 1.5)

        assert len(logger._memory_outcomes) == 3
        assert logger._memory_outcomes[0].agent_name == "agent1"
        assert logger._memory_outcomes[1].agent_name == "agent2"
        assert logger._memory_outcomes[2].agent_name == "agent1"

    def test_log_outcome_with_metadata(self):
        """Test logging outcome with metadata."""
        logger = OutcomeLogger(storage_type="memory")

        metadata = {"tools_used": ["tool1", "tool2"]}
        logger.log_outcome(
            agent_name="test_agent",
            task_type="analysis",
            success=True,
            duration_seconds=2.0,
            metadata=metadata,
        )

        assert len(logger._memory_outcomes) == 1
        outcome = logger._memory_outcomes[0]
        assert outcome.metadata == metadata

    def test_get_recent_outcomes(self):
        """Test getting recent outcomes."""
        logger = OutcomeLogger(storage_type="memory")

        # Add outcomes with different timestamps
        current_time = time.time()

        # Old outcome (more than 24 hours ago)
        old_outcome = AgentOutcome(
            timestamp=current_time - 25 * 3600,  # 25 hours ago
            agent_name="agent1",
            task_type="old_task",
            success=True,
        )
        logger._memory_outcomes.append(old_outcome)

        # Recent outcome
        logger.log_outcome("agent2", "recent_task", True, 1.0)

        recent_outcomes = logger.get_recent_outcomes(hours=24)
        assert len(recent_outcomes) == 1
        assert recent_outcomes[0].task_type == "recent_task"

    def test_get_recent_outcomes_by_agent(self):
        """Test getting recent outcomes filtered by agent."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True, 1.0)
        logger.log_outcome("agent2", "task2", True, 2.0)
        logger.log_outcome("agent1", "task3", False, 1.5)

        agent1_outcomes = logger.get_recent_outcomes(hours=24, agent_name="agent1")
        assert len(agent1_outcomes) == 2
        assert all(outcome.agent_name == "agent1" for outcome in agent1_outcomes)

    def test_get_recent_outcomes_by_type(self):
        """Test getting recent outcomes filtered by task type."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "analysis", True, 1.0)
        logger.log_outcome("agent2", "processing", True, 2.0)
        logger.log_outcome("agent1", "analysis", False, 1.5)

        analysis_outcomes = logger.get_recent_outcomes(hours=24, task_type="analysis")
        assert len(analysis_outcomes) == 2
        assert all(outcome.task_type == "analysis" for outcome in analysis_outcomes)

    def test_get_performance_metrics(self):
        """Test getting performance metrics."""
        logger = OutcomeLogger(storage_type="memory")

        # Add some test outcomes
        logger.log_outcome("agent1", "task1", True, 1.0)
        logger.log_outcome("agent1", "task2", True, 2.0)
        logger.log_outcome("agent1", "task3", False, 1.5)
        logger.log_outcome("agent2", "task4", True, 3.0)

        metrics = logger.get_performance_metrics(hours=24)

        assert "total_tasks" in metrics
        assert "success_rate" in metrics
        assert "average_duration" in metrics
        assert "agents_summary" in metrics
        assert "tasks_by_type" in metrics

        assert metrics["total_tasks"] == 4
        assert metrics["success_rate"] == 0.75  # 3/4 successful
        assert metrics["average_duration"] == 1.875  # (1+2+1.5+3)/4

    def test_get_performance_metrics_time_window(self):
        """Test performance metrics with time window."""
        logger = OutcomeLogger(storage_type="memory")

        current_time = time.time()

        # Old outcome (outside time window)
        old_outcome = AgentOutcome(
            timestamp=current_time - 25 * 3600,  # 25 hours ago
            agent_name="agent1",
            task_type="old_task",
            success=True,
            duration_seconds=1.0,
        )
        logger._memory_outcomes.append(old_outcome)

        # Recent outcome
        logger.log_outcome("agent1", "recent_task", True, 2.0)

        metrics = logger.get_performance_metrics(hours=24)

        # Should only include recent outcome
        assert metrics["total_tasks"] == 1
        assert metrics["average_duration"] == 2.0

    def test_clear_outcomes(self):
        """Test clearing outcomes."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True, 1.0)
        logger.log_outcome("agent2", "task2", True, 2.0)

        assert len(logger._memory_outcomes) == 2

        cleared_count = logger.clear_outcomes()
        assert cleared_count == 2
        assert len(logger._memory_outcomes) == 0

    def test_clear_outcomes_by_time(self):
        """Test clearing outcomes older than specified time."""
        logger = OutcomeLogger(storage_type="memory")

        current_time = time.time()

        # Old outcome
        old_outcome = AgentOutcome(
            timestamp=current_time - 25 * 3600,  # 25 hours ago
            agent_name="agent1",
            task_type="old_task",
            success=True,
        )
        logger._memory_outcomes.append(old_outcome)

        # Recent outcome
        logger.log_outcome("agent1", "recent_task", True, 1.0)

        assert len(logger._memory_outcomes) == 2

        cleared_count = logger.clear_outcomes(older_than_hours=24)
        assert cleared_count == 1
        assert len(logger._memory_outcomes) == 1
        assert logger._memory_outcomes[0].task_type == "recent_task"


class TestOutcomeLoggerEdgeCases:
    """Test edge cases and error conditions."""

    def test_empty_logger_metrics(self):
        """Test metrics on empty logger."""
        logger = OutcomeLogger(storage_type="memory")

        metrics = logger.get_performance_metrics()

        assert metrics["total_tasks"] == 0
        assert metrics["success_rate"] == 0.0
        assert metrics["average_duration"] == 0.0
        assert metrics["agents_summary"] == {}
        assert metrics["tasks_by_type"] == {}

    def test_single_outcome_metrics(self):
        """Test metrics with single outcome."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True, 1.5)

        metrics = logger.get_performance_metrics()

        assert metrics["total_tasks"] == 1
        assert metrics["success_rate"] == 1.0
        assert metrics["average_duration"] == 1.5

    def test_get_recent_outcomes_empty(self):
        """Test getting recent outcomes from empty logger."""
        logger = OutcomeLogger(storage_type="memory")

        recent_outcomes = logger.get_recent_outcomes(hours=24)
        assert len(recent_outcomes) == 0

    def test_get_recent_outcomes_more_than_available(self):
        """Test getting more outcomes than available."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True, 1.0)
        logger.log_outcome("agent2", "task2", True, 2.0)

        # Request more outcomes than available
        recent_outcomes = logger.get_recent_outcomes(hours=24)
        assert len(recent_outcomes) == 2

    def test_outcome_with_large_metadata(self):
        """Test outcome with large metadata."""
        logger = OutcomeLogger(storage_type="memory")

        large_metadata = {
            "large_data": ["item"] * 1000,
            "nested": {"deep": {"data": "x" * 1000}},
        }

        logger.log_outcome(
            agent_name="test_agent",
            task_type="large_data_task",
            success=True,
            duration_seconds=2.0,
            metadata=large_metadata,
        )

        assert len(logger._memory_outcomes) == 1
        outcome = logger._memory_outcomes[0]
        assert len(outcome.metadata["large_data"]) == 1000

    def test_outcome_with_special_characters(self):
        """Test outcome with special characters in fields."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome(
            agent_name="test_agent_🤖",
            task_type="unicode_task_❤️",
            success=True,
            duration_seconds=1.0,
            error_message="Error with special chars: 中文, русский, 🚀",
        )

        assert len(logger._memory_outcomes) == 1
        outcome = logger._memory_outcomes[0]
        assert "🤖" in outcome.agent_name
        assert "❤️" in outcome.task_type
        assert "🚀" in outcome.error_message


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
