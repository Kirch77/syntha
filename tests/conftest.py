"""
Test configuration and shared fixtures for the Syntha test suite.

This module provides common test configuration, fixtures, and utilities
used across all test modules.
"""

import os
import shutil
import tempfile
from pathlib import Path

import pytest

from syntha.context import ContextMesh
from syntha.tools import ToolHandler


@pytest.fixture
def temp_dir():
    """Provide a temporary directory for tests."""
    temp_path = tempfile.mkdtemp()
    yield Path(temp_path)
    shutil.rmtree(temp_path, ignore_errors=True)


@pytest.fixture
def sqlite_db_path(temp_dir):
    """Provide a temporary SQLite database path."""
    return str(temp_dir / "test.db")


@pytest.fixture
def context_mesh_memory():
    """Provide a memory-only ContextMesh instance."""
    mesh = ContextMesh(enable_persistence=False)
    yield mesh
    mesh.close()


@pytest.fixture
def context_mesh_sqlite(sqlite_db_path):
    """Provide a ContextMesh instance with SQLite persistence."""
    mesh = ContextMesh(
        enable_persistence=True, db_backend="sqlite", db_path=sqlite_db_path
    )
    yield mesh
    mesh.close()


@pytest.fixture
def tool_handler_memory():
    """Provide a ToolHandler with memory-only ContextMesh."""
    mesh = ContextMesh(enable_persistence=False)
    handler = ToolHandler(context_mesh=mesh)
    yield handler
    mesh.close()


@pytest.fixture
def sample_agents():
    """Provide a list of sample agent names for testing."""
    return ["agent1", "agent2", "agent3", "coordinator", "analyzer"]


@pytest.fixture
def sample_topics():
    """Provide a list of sample topics for testing."""
    return ["sales", "analytics", "workflow", "alerts", "reports"]


@pytest.fixture
def large_dataset():
    """Provide a large dataset for performance testing."""
    return {
        f"key_{i}": {
            "id": i,
            "data": f"value_{i}",
            "metadata": {
                "timestamp": 1234567890 + i,
                "category": f"category_{i % 10}",
                "tags": [f"tag_{j}" for j in range(i % 5)],
            },
        }
        for i in range(1000)
    }


class DatabaseTestMixin:
    """Mixin class for database-related test utilities."""

    @staticmethod
    def verify_persistence(mesh1, mesh2, test_key, expected_value):
        """Verify that data persists between mesh instances."""
        # Store data in first mesh
        mesh1.push(test_key, expected_value)
        mesh1.close()

        # Verify data exists in second mesh
        retrieved_value = mesh2.get(test_key)
        assert retrieved_value == expected_value
        return True


class PerformanceTestMixin:
    """Mixin class for performance test utilities."""

    @staticmethod
    def time_operation(operation, *args, **kwargs):
        """Time a specific operation and return duration and result."""
        import time

        start_time = time.time()
        result = operation(*args, **kwargs)
        duration = time.time() - start_time
        return duration, result

    @staticmethod
    def assert_performance(duration, max_duration, operation_name):
        """Assert that an operation completed within expected time."""
        assert duration < max_duration, (
            f"{operation_name} took {duration:.3f}s, " f"expected < {max_duration}s"
        )


# Test markers for different test categories
pytest_plugins = []


def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "unit: Unit tests that test individual components"
    )
    config.addinivalue_line(
        "markers", "integration: Integration tests that test component interactions"
    )
    config.addinivalue_line(
        "markers", "performance: Performance tests that benchmark operations"
    )
    config.addinivalue_line(
        "markers", "slow: Slow tests that take more than a few seconds"
    )
    config.addinivalue_line(
        "markers", "database: Tests that require database connections"
    )
    config.addinivalue_line(
        "markers", "concurrent: Tests that use threading or multiprocessing"
    )


def pytest_collection_modifyitems(config, items):
    """Automatically mark tests based on their location."""
    for item in items:
        # Add markers based on test file location
        if "unit" in str(item.fspath):
            item.add_marker(pytest.mark.unit)
        elif "integration" in str(item.fspath):
            item.add_marker(pytest.mark.integration)
        elif "performance" in str(item.fspath):
            item.add_marker(pytest.mark.performance)

        # Mark slow tests
        if any(
            keyword in item.name.lower()
            for keyword in ["large", "stress", "concurrent", "massive"]
        ):
            item.add_marker(pytest.mark.slow)

        # Mark database tests
        if any(
            keyword in item.name.lower()
            for keyword in ["persistence", "database", "sqlite", "postgresql"]
        ):
            item.add_marker(pytest.mark.database)

        # Mark concurrent tests
        if any(
            keyword in item.name.lower()
            for keyword in ["concurrent", "thread", "parallel"]
        ):
            item.add_marker(pytest.mark.concurrent)


# Environment-specific test configuration
def pytest_runtest_setup(item):
    """Setup for individual tests based on markers."""
    # Skip database tests if no database available
    if item.get_closest_marker("database"):
        # Only skip PostgreSQL tests if they're specifically marked as requiring PostgreSQL
        # Integration tests should handle PostgreSQL unavailability gracefully
        if item.get_closest_marker("requires_postgresql"):
            postgres_url = os.getenv("POSTGRES_URL")
            if not postgres_url:
                pytest.skip("PostgreSQL not available (set POSTGRES_URL)")

    # Skip slow tests in fast mode
    if item.get_closest_marker("slow"):
        if item.config.getoption("--fast", default=False):
            pytest.skip("Skipping slow test in fast mode")


def pytest_addoption(parser):
    """Add custom command line options."""
    parser.addoption(
        "--fast",
        action="store_true",
        default=False,
        help="Run only fast tests, skip slow tests",
    )
    parser.addoption(
        "--integration",
        action="store_true",
        default=False,
        help="Run integration tests",
    )
    parser.addoption(
        "--performance",
        action="store_true",
        default=False,
        help="Run performance tests",
    )


# Custom assertions for Syntha-specific testing
class SynthaAssertions:
    """Custom assertions for Syntha testing."""

    @staticmethod
    def assert_context_accessible(mesh, key, agent, expected_value):
        """Assert that context is accessible by agent with expected value."""
        actual_value = mesh.get(key, agent)
        assert actual_value == expected_value, (
            f"Agent '{agent}' should have access to key '{key}' "
            f"with value {expected_value}, got {actual_value}"
        )

    @staticmethod
    def assert_context_not_accessible(mesh, key, agent):
        """Assert that context is not accessible by agent."""
        actual_value = mesh.get(key, agent)
        assert actual_value is None, (
            f"Agent '{agent}' should not have access to key '{key}', "
            f"but got {actual_value}"
        )

    @staticmethod
    def assert_agent_keys_count(mesh, agent, expected_count):
        """Assert that agent has access to expected number of keys."""
        keys = mesh.get_keys_for_agent(agent)
        actual_count = len(keys)
        assert actual_count == expected_count, (
            f"Agent '{agent}' should have access to {expected_count} keys, "
            f"got {actual_count}: {keys}"
        )

    @staticmethod
    def assert_mesh_stats(mesh, **expected_stats):
        """Assert mesh statistics match expected values."""
        actual_stats = mesh.get_stats()
        for stat_name, expected_value in expected_stats.items():
            actual_value = actual_stats.get(stat_name)
            assert actual_value == expected_value, (
                f"Mesh stat '{stat_name}' should be {expected_value}, "
                f"got {actual_value}. Full stats: {actual_stats}"
            )


# Make assertions available as pytest fixture
@pytest.fixture
def syntha_assert():
    """Provide Syntha-specific assertions."""
    return SynthaAssertions()


# Test data generators
class TestDataGenerators:
    """Generators for test data."""

    @staticmethod
    def agent_names(count=5):
        """Generate agent names."""
        return [f"agent_{i}" for i in range(count)]

    @staticmethod
    def topic_names(count=5):
        """Generate topic names."""
        topics = [
            "sales",
            "analytics",
            "workflow",
            "alerts",
            "reports",
            "notifications",
            "logs",
            "metrics",
            "events",
            "data",
        ]
        return topics[:count]

    @staticmethod
    def context_items(count=10):
        """Generate context items."""
        return {
            f"key_{i}": {
                "id": i,
                "value": f"test_value_{i}",
                "timestamp": 1234567890 + i,
            }
            for i in range(count)
        }

    @staticmethod
    def large_context_value(size_mb=1):
        """Generate large context value for testing."""
        size_bytes = size_mb * 1024 * 1024
        return {"large_data": "x" * size_bytes, "metadata": {"size_mb": size_mb}}


@pytest.fixture
def test_data():
    """Provide test data generators."""
    return TestDataGenerators()
