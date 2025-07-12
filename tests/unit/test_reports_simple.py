"""
Simplified unit tests for reports module that match actual implementation.

These tests verify that the reporting system works correctly
for tracking agent outcomes and performance metrics.
"""

import os
import tempfile
import time

import pytest

from syntha.reports import AgentOutcome, OutcomeLogger


class TestAgentOutcome:
    """Test AgentOutcome data structure."""

    def test_agent_outcome_creation(self):
        """Test creating AgentOutcome with basic fields."""
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

    def test_agent_outcome_with_all_fields(self):
        """Test AgentOutcome with all optional fields."""
        metadata = {"tools_used": ["tool1", "tool2"]}
        input_context = {"context_key": "context_value"}
        output_data = {"result": "success"}

        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="analysis",
            success=True,
            duration_seconds=2.5,
            input_context=input_context,
            output_data=output_data,
            error_message=None,
            metadata=metadata,
        )

        assert outcome.metadata == metadata
        assert outcome.input_context == input_context
        assert outcome.output_data == output_data
        assert outcome.error_message is None

    def test_agent_outcome_to_dict(self):
        """Test converting AgentOutcome to dictionary."""
        outcome = AgentOutcome(
            timestamp=1234567890.0,
            agent_name="test_agent",
            task_type="processing",
            success=True,
            duration_seconds=1.0,
        )

        outcome_dict = outcome.to_dict()

        assert outcome_dict["agent_name"] == "test_agent"
        assert outcome_dict["task_type"] == "processing"
        assert outcome_dict["success"] is True
        assert outcome_dict["duration_seconds"] == 1.0
        assert outcome_dict["timestamp"] == 1234567890.0

    def test_agent_outcome_from_dict(self):
        """Test creating AgentOutcome from dictionary."""
        outcome_dict = {
            "timestamp": 1234567890.0,
            "agent_name": "test_agent",
            "task_type": "processing",
            "success": True,
            "duration_seconds": 1.0,
            "input_context": None,
            "output_data": None,
            "error_message": None,
            "metadata": None,
        }

        outcome = AgentOutcome.from_dict(outcome_dict)

        assert outcome.agent_name == "test_agent"
        assert outcome.task_type == "processing"
        assert outcome.success is True
        assert outcome.duration_seconds == 1.0
        assert outcome.timestamp == 1234567890.0


class TestOutcomeLoggerMemory:
    """Test OutcomeLogger with memory storage."""

    def test_outcome_logger_creation(self):
        """Test creating OutcomeLogger with memory storage."""
        logger = OutcomeLogger(storage_type="memory")
        assert logger.storage_type == "memory"
        assert len(logger._memory_outcomes) == 0

    def test_log_outcome_memory(self):
        """Test logging outcomes to memory."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome(
            agent_name="test_agent",
            task_type="test_task",
            success=True,
            duration_seconds=1.0,
        )

        assert len(logger._memory_outcomes) == 1
        outcome = logger._memory_outcomes[0]
        assert outcome.agent_name == "test_agent"
        assert outcome.task_type == "test_task"
        assert outcome.success is True

    def test_get_recent_outcomes_memory(self):
        """Test getting recent outcomes from memory."""
        logger = OutcomeLogger(storage_type="memory")

        # Add some outcomes
        for i in range(3):
            logger.log_outcome(
                agent_name=f"agent_{i}", task_type="test_task", success=True
            )

        recent = logger.get_recent_outcomes(hours=24)
        assert len(recent) == 3
        # Check that all agents are present
        agent_names = [outcome.agent_name for outcome in recent]
        assert "agent_0" in agent_names
        assert "agent_1" in agent_names
        assert "agent_2" in agent_names

    def test_get_recent_outcomes_filtered(self):
        """Test getting recent outcomes with filters."""
        logger = OutcomeLogger(storage_type="memory")

        # Add outcomes for different agents and task types
        logger.log_outcome("agent1", "task_type_a", True)
        logger.log_outcome("agent2", "task_type_b", True)
        logger.log_outcome("agent1", "task_type_a", False)

        # Filter by agent
        agent1_outcomes = logger.get_recent_outcomes(agent_name="agent1")
        assert len(agent1_outcomes) == 2
        assert all(o.agent_name == "agent1" for o in agent1_outcomes)

        # Filter by task type
        type_a_outcomes = logger.get_recent_outcomes(task_type="task_type_a")
        assert len(type_a_outcomes) == 2
        assert all(o.task_type == "task_type_a" for o in type_a_outcomes)

    def test_get_performance_metrics_memory(self):
        """Test getting performance metrics from memory."""
        logger = OutcomeLogger(storage_type="memory")

        # Add various outcomes
        logger.log_outcome("agent1", "task1", True, duration_seconds=1.0)
        logger.log_outcome("agent1", "task1", False, duration_seconds=2.0)
        logger.log_outcome("agent2", "task2", True, duration_seconds=1.5)

        metrics = logger.get_performance_metrics()

        assert metrics["total_tasks"] == 3
        assert metrics["successful_tasks"] == 2
        assert metrics["failed_tasks"] == 1
        assert metrics["success_rate"] == 2 / 3
        assert metrics["average_duration"] == 1.5  # (1.0 + 2.0 + 1.5) / 3

        # Check task type breakdown
        assert "task1" in metrics["tasks_by_type"]
        assert metrics["tasks_by_type"]["task1"]["total"] == 2
        assert metrics["tasks_by_type"]["task1"]["successful"] == 1

    def test_clear_outcomes_memory(self):
        """Test clearing outcomes from memory."""
        logger = OutcomeLogger(storage_type="memory")

        # Add outcomes
        for i in range(5):
            logger.log_outcome(f"agent_{i}", "task", True)

        assert len(logger._memory_outcomes) == 5

        # Clear all
        cleared_count = logger.clear_outcomes()
        assert cleared_count == 5
        assert len(logger._memory_outcomes) == 0


class TestOutcomeLoggerFile:
    """Test OutcomeLogger with file storage."""

    def test_outcome_logger_file(self):
        """Test OutcomeLogger with file storage."""
        with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".jsonl") as f:
            file_path = f.name

        try:
            logger = OutcomeLogger(storage_type="file", file_path=file_path)

            # Log an outcome
            logger.log_outcome("test_agent", "test_task", True, duration_seconds=1.0)

            # Read outcomes back
            recent = logger.get_recent_outcomes()
            assert len(recent) == 1
            assert recent[0].agent_name == "test_agent"

        finally:
            os.unlink(file_path)


class TestOutcomeLoggerSQLite:
    """Test OutcomeLogger with SQLite storage."""

    def test_outcome_logger_sqlite(self):
        """Test OutcomeLogger with SQLite storage."""
        with tempfile.NamedTemporaryFile(delete=False, suffix=".db") as f:
            db_path = f.name

        try:
            logger = OutcomeLogger(storage_type="sqlite", db_path=db_path)

            # Log an outcome
            logger.log_outcome(
                agent_name="test_agent",
                task_type="test_task",
                success=True,
                duration_seconds=1.0,
                metadata={"key": "value"},
            )

            # Read outcomes back
            recent = logger.get_recent_outcomes()
            assert len(recent) == 1
            assert recent[0].agent_name == "test_agent"
            assert recent[0].metadata == {"key": "value"}

        finally:
            os.unlink(db_path)

    def test_sqlite_performance_metrics(self):
        """Test performance metrics with SQLite storage."""
        with tempfile.NamedTemporaryFile(delete=False, suffix=".db") as f:
            db_path = f.name

        try:
            logger = OutcomeLogger(storage_type="sqlite", db_path=db_path)

            # Add test data
            logger.log_outcome("agent1", "task_type_a", True, 1.0)
            logger.log_outcome("agent1", "task_type_a", False, 2.0)
            logger.log_outcome("agent2", "task_type_b", True, 1.5)

            metrics = logger.get_performance_metrics()

            assert metrics["total_tasks"] == 3
            assert metrics["success_rate"] == 2 / 3
            assert len(metrics["agents_summary"]) == 2

        finally:
            os.unlink(db_path)


class TestOutcomeLoggerEdgeCases:
    """Test edge cases for OutcomeLogger."""

    def test_empty_logger_metrics(self):
        """Test metrics on empty logger."""
        logger = OutcomeLogger(storage_type="memory")

        metrics = logger.get_performance_metrics()

        assert metrics["total_tasks"] == 0
        assert metrics["success_rate"] == 0.0
        assert metrics["average_duration"] == 0.0
        assert metrics["tasks_by_type"] == {}

    def test_outcome_without_duration(self):
        """Test outcome without duration data."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome("agent1", "task1", True)  # No duration
        logger.log_outcome("agent1", "task1", True, duration_seconds=2.0)

        metrics = logger.get_performance_metrics()

        # Average should only include outcomes with duration
        assert metrics["average_duration"] == 2.0

    def test_outcome_with_error_message(self):
        """Test outcome with error message."""
        logger = OutcomeLogger(storage_type="memory")

        logger.log_outcome(
            agent_name="agent1",
            task_type="failing_task",
            success=False,
            error_message="Something went wrong",
        )

        recent = logger.get_recent_outcomes()
        assert len(recent) == 1
        assert recent[0].success is False
        assert recent[0].error_message == "Something went wrong"

    def test_time_window_filtering(self):
        """Test time window filtering for recent outcomes."""
        logger = OutcomeLogger(storage_type="memory")

        # Manually create outcomes with specific timestamps
        old_outcome = AgentOutcome(
            timestamp=time.time() - 7200,  # 2 hours ago
            agent_name="agent1",
            task_type="old_task",
            success=True,
        )
        recent_outcome = AgentOutcome(
            timestamp=time.time() - 1800,  # 30 minutes ago
            agent_name="agent1",
            task_type="recent_task",
            success=True,
        )

        logger._memory_outcomes.append(old_outcome)
        logger._memory_outcomes.append(recent_outcome)

        # Get outcomes from last hour only
        recent = logger.get_recent_outcomes(hours=1)
        assert len(recent) == 1
        assert recent[0].task_type == "recent_task"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
