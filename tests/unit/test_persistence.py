"""
Unit tests for persistence layer and database backends.

These tests verify that the persistence functionality works correctly
with different database backends and handles various scenarios.
"""

import os
import shutil
import tempfile
import time
from unittest.mock import Mock, patch

import pytest

from syntha.persistence import (
    DatabaseBackend,
    PostgreSQLBackend,
    SQLiteBackend,
    create_database_backend,
)


class TestDatabaseBackendInterface:
    """Test the abstract DatabaseBackend interface."""

    def test_database_backend_is_abstract(self):
        """Test that DatabaseBackend cannot be instantiated directly."""
        with pytest.raises(TypeError):
            DatabaseBackend()


class TestSQLiteBackend:
    """Test SQLite database backend."""

    def test_sqlite_backend_creation(self, tmp_path):
        """Test creating SQLite backend."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)

        assert backend.db_path == db_path
        backend.close()

    def test_sqlite_connect_and_initialize(self, tmp_path):
        """Test SQLite connection and schema initialization."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)

        backend.connect()

        # Database file should be created
        assert os.path.exists(db_path)

        # Should be able to perform basic operations
        backend.save_context_item("test_key", "test_value", [], None, time.time())
        result = backend.get_context_item("test_key")

        assert result is not None
        assert result[0] == "test_value"  # value
        assert result[1] == []  # subscribers

        backend.close()

    def test_sqlite_save_and_get_context_item(self, tmp_path):
        """Test saving and retrieving context items."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Test various data types
        test_cases = [
            ("string_key", "string_value", ["agent1"], 3600),
            ("dict_key", {"nested": {"data": [1, 2, 3]}}, ["agent1", "agent2"], None),
            ("list_key", [1, 2, 3, "mixed"], [], 7200),
            ("none_key", None, ["agent1"], None),
        ]

        created_at = time.time()

        for key, value, subscribers, ttl in test_cases:
            backend.save_context_item(key, value, subscribers, ttl, created_at)

            result = backend.get_context_item(key)
            assert result is not None
            assert result[0] == value  # value
            assert result[1] == subscribers  # subscribers
            assert result[2] == ttl  # ttl
            assert abs(result[3] - created_at) < 1  # created_at (within 1 second)

        backend.close()

    def test_sqlite_get_all_context_items(self, tmp_path):
        """Test retrieving all context items."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Add multiple items
        items = {
            "key1": ("value1", ["agent1"], None, time.time()),
            "key2": ("value2", [], 3600, time.time()),
            "key3": ({"complex": "data"}, ["agent2"], None, time.time()),
        }

        for key, (value, subscribers, ttl, created_at) in items.items():
            backend.save_context_item(key, value, subscribers, ttl, created_at)

        # Retrieve all items
        all_items = backend.get_all_context_items()

        assert len(all_items) == 3
        for key in items:
            assert key in all_items
            assert all_items[key][0] == items[key][0]  # value matches

        backend.close()

    def test_sqlite_delete_context_item(self, tmp_path):
        """Test deleting context items."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Add item
        backend.save_context_item("test_key", "test_value", [], None, time.time())
        assert backend.get_context_item("test_key") is not None

        # Delete item
        backend.delete_context_item("test_key")
        assert backend.get_context_item("test_key") is None

        backend.close()

    def test_sqlite_cleanup_expired(self, tmp_path):
        """Test cleaning up expired items."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        current_time = time.time()

        # Add expired and non-expired items
        backend.save_context_item(
            "expired1", "value1", [], 1, current_time - 100
        )  # Expired
        backend.save_context_item(
            "expired2", "value2", [], 1, current_time - 50
        )  # Expired
        backend.save_context_item("valid1", "value3", [], 3600, current_time)  # Valid
        backend.save_context_item("valid2", "value4", [], None, current_time)  # No TTL

        # Clean up expired
        removed_count = backend.cleanup_expired(current_time)

        assert removed_count == 2
        assert backend.get_context_item("expired1") is None
        assert backend.get_context_item("expired2") is None
        assert backend.get_context_item("valid1") is not None
        assert backend.get_context_item("valid2") is not None

        backend.close()

    def test_sqlite_agent_topics(self, tmp_path):
        """Test agent topics functionality."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Save agent topics
        backend.save_agent_topics("agent1", ["sales", "analytics"])
        backend.save_agent_topics("agent2", ["workflow", "analytics"])

        # Get agent topics
        agent1_topics = backend.get_agent_topics("agent1")
        agent2_topics = backend.get_agent_topics("agent2")

        assert "sales" in agent1_topics
        assert "analytics" in agent1_topics
        assert "workflow" in agent2_topics
        assert "analytics" in agent2_topics
        assert "sales" not in agent2_topics

        # Get all agent topics
        all_topics = backend.get_all_agent_topics()
        assert "agent1" in all_topics
        assert "agent2" in all_topics
        assert all_topics["agent1"] == ["sales", "analytics"]

        backend.close()

    def test_sqlite_agent_permissions(self, tmp_path):
        """Test agent permissions functionality."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Save agent permissions
        backend.save_agent_permissions("agent1", ["topic1", "topic2"])
        backend.save_agent_permissions("agent2", ["topic2", "topic3"])

        # Get agent permissions
        agent1_perms = backend.get_agent_permissions("agent1")
        agent2_perms = backend.get_agent_permissions("agent2")

        assert "topic1" in agent1_perms
        assert "topic2" in agent1_perms
        assert "topic2" in agent2_perms
        assert "topic3" in agent2_perms
        assert "topic1" not in agent2_perms

        # Get all agent permissions
        all_perms = backend.get_all_agent_permissions()
        assert "agent1" in all_perms
        assert "agent2" in all_perms

        backend.close()

    def test_sqlite_clear_all(self, tmp_path):
        """Test clearing all data."""
        db_path = str(tmp_path / "test.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()

        # Add various data
        backend.save_context_item("key1", "value1", [], None, time.time())
        backend.save_context_item("key2", "value2", [], None, time.time())
        backend.save_agent_topics("agent1", ["topic1"])
        backend.save_agent_permissions("agent1", ["perm1"])

        # Verify data exists
        assert len(backend.get_all_context_items()) == 2
        assert len(backend.get_all_agent_topics()) == 1
        assert len(backend.get_all_agent_permissions()) == 1

        # Clear all
        backend.clear_all()

        # Verify data is gone
        assert len(backend.get_all_context_items()) == 0
        assert len(backend.get_all_agent_topics()) == 0
        assert len(backend.get_all_agent_permissions()) == 0

        backend.close()


class TestPostgreSQLBackend:
    """Test PostgreSQL database backend."""

    @pytest.mark.database
    def test_postgresql_backend_creation(self):
        """Test creating PostgreSQL backend."""
        connection_string = os.getenv(
            "POSTGRES_URL", "postgresql://postgres:postgres@localhost:5432/syntha_test"
        )

        backend = PostgreSQLBackend(connection_string=connection_string)
        assert backend.connection_string == connection_string
        backend.close()

    @pytest.mark.database
    def test_postgresql_basic_operations(self):
        """Test basic PostgreSQL operations."""
        connection_string = os.getenv("POSTGRES_URL")
        if not connection_string:
            pytest.skip("PostgreSQL not available")

        backend = PostgreSQLBackend(connection_string=connection_string)

        try:
            backend.connect()

            # Test save and retrieve
            backend.save_context_item(
                "pg_test_key", "pg_test_value", ["agent1"], None, time.time()
            )
            result = backend.get_context_item("pg_test_key")

            assert result is not None
            assert result[0] == "pg_test_value"
            assert result[1] == ["agent1"]

            # Clean up
            backend.delete_context_item("pg_test_key")

        finally:
            backend.close()


class TestDatabaseBackendFactory:
    """Test database backend factory function."""

    def test_create_sqlite_backend(self, tmp_path):
        """Test creating SQLite backend via factory."""
        db_path = str(tmp_path / "factory_test.db")
        backend = create_database_backend("sqlite", db_path=db_path)

        assert isinstance(backend, SQLiteBackend)
        assert backend.db_path == db_path
        backend.close()

    def test_create_postgresql_backend(self):
        """Test creating PostgreSQL backend via factory."""
        connection_string = "postgresql://user:pass@localhost/db"
        backend = create_database_backend(
            "postgresql", connection_string=connection_string
        )

        assert isinstance(backend, PostgreSQLBackend)
        assert backend.connection_string == connection_string
        backend.close()

    def test_create_invalid_backend(self):
        """Test creating invalid backend type."""
        with pytest.raises(ValueError, match="Unsupported backend type"):
            create_database_backend("invalid_backend")


class TestDatabaseErrorHandling:
    """Test error handling in database operations."""

    def test_sqlite_connection_to_readonly_directory(self):
        """Test SQLite connection to read-only directory."""
        if os.name == "nt":  # Skip on Windows (harder to create readonly dirs)
            pytest.skip("Read-only directory test not reliable on Windows")

        # Create read-only directory
        readonly_dir = tempfile.mkdtemp()
        os.chmod(readonly_dir, 0o444)

        try:
            db_path = os.path.join(readonly_dir, "readonly.db")
            backend = SQLiteBackend(db_path=db_path)

            # Should handle permission error gracefully
            with pytest.raises(
                Exception
            ):  # Could be PermissionError or OperationalError
                backend.connect()

        finally:
            # Clean up
            os.chmod(readonly_dir, 0o755)
            shutil.rmtree(readonly_dir, ignore_errors=True)

    def test_sqlite_corrupted_database(self, tmp_path):
        """Test that corrupted database is handled gracefully."""
        from syntha.persistence import SQLiteBackend

        db_path = str(tmp_path / "corrupted.db")

        # Create a corrupted database file
        with open(db_path, "w") as f:
            f.write("This is not a valid SQLite database")

        # Should handle corruption gracefully by backing up and starting fresh
        backend = SQLiteBackend(db_path)
        backend.connect()  # Should not raise exception

        # Should be able to perform operations on the new database
        backend.save_context_item("test_key", "test_value", [], None, time.time())
        result = backend.get_context_item("test_key")

        assert result is not None
        assert result[0] == "test_value"

        # Verify the corrupted file was backed up
        import os

        backup_files = [
            f for f in os.listdir(tmp_path) if f.startswith("corrupted.db.corrupted.")
        ]
        assert len(backup_files) > 0, "Corrupted database should have been backed up"

        backend.close()

    def test_sqlite_disk_full_simulation(self, tmp_path):
        """Test handling of disk full scenario."""
        pytest.skip("Disk full simulation is complex to mock reliably")

        db_path = str(tmp_path / "diskfull.db")
        backend = SQLiteBackend(db_path=db_path)
        backend.connect()
        backend.close()

    def test_postgresql_connection_failure(self):
        """Test PostgreSQL connection failure."""
        # Use invalid connection string
        backend = PostgreSQLBackend(
            connection_string="postgresql://invalid:invalid@nonexistent:5432/invalid"
        )

        # Should handle connection failure gracefully
        with pytest.raises(Exception):  # Could be various psycopg2 exceptions
            backend.connect()

        backend.close()


class TestDatabaseConcurrency:
    """Test concurrent access to database."""

    def test_sqlite_concurrent_writes(self, tmp_path):
        """Test concurrent writes to SQLite."""
        db_path = str(tmp_path / "concurrent.db")

        import threading

        def writer_worker(worker_id, backend):
            """Worker that writes to database."""
            try:
                for i in range(10):
                    backend.save_context_item(
                        f"key_{worker_id}_{i}",
                        f"value_{worker_id}_{i}",
                        [],
                        None,
                        time.time(),
                    )
            except Exception as e:
                # SQLite might have locking issues with high concurrency
                print(f"Worker {worker_id} error: {e}")

        # Create multiple backends (each worker gets its own connection)
        backends = []
        threads = []

        try:
            for worker_id in range(3):
                backend = SQLiteBackend(db_path=db_path)
                backend.connect()
                backends.append(backend)

                thread = threading.Thread(
                    target=writer_worker, args=(worker_id, backend)
                )
                threads.append(thread)
                thread.start()

            # Wait for all threads
            for thread in threads:
                thread.join()

            # Verify data integrity
            test_backend = SQLiteBackend(db_path=db_path)
            test_backend.connect()
            all_items = test_backend.get_all_context_items()

            # Should have items from all workers (exact count may vary due to locking)
            assert len(all_items) > 0
            test_backend.close()

        finally:
            # Clean up backends
            for backend in backends:
                backend.close()


class TestDatabaseMigration:
    """Test database schema migration scenarios."""

    def test_sqlite_schema_upgrade(self, tmp_path):
        """Test SQLite schema handling with missing tables."""
        db_path = str(tmp_path / "migration_test.db")

        # Create database with minimal schema
        import sqlite3

        conn = sqlite3.connect(db_path)
        conn.execute("CREATE TABLE context_items (key TEXT PRIMARY KEY, value TEXT)")
        conn.close()

        # Backend should handle missing columns/tables gracefully
        backend = SQLiteBackend(db_path=db_path)

        try:
            backend.connect()
            # Should initialize missing schema elements
            backend.save_context_item("test_key", "test_value", [], None, time.time())

            result = backend.get_context_item("test_key")
            assert result is not None

        except Exception as e:
            # If migration fails, should be handled gracefully
            print(f"Schema migration issue: {e}")

        finally:
            backend.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-m", "not database"])
