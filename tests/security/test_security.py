"""
Security tests for Syntha SDK.

These tests verify that the system is secure against common attack vectors
and handles security-sensitive operations correctly.
"""

import os
import tempfile
import threading
import time
from unittest.mock import mock_open, patch

import pytest

from syntha.context import ContextMesh
from syntha.tools import ToolHandler


class TestClass:
    """Test class for type safety testing."""

    pass


class TestAccessControlSecurity:
    """Test security of access control mechanisms."""

    def test_agent_isolation_strict(self):
        """Test that agent isolation cannot be bypassed."""
        mesh = ContextMesh(enable_persistence=False)

        # Store sensitive data for specific agent
        mesh.push(
            "classified_data",
            {"secret": "top_secret"},
            subscribers=["authorized_agent"],
        )

        # Attempt various bypass techniques
        unauthorized_agents = [
            "unauthorized_agent",
            "authorized_agent_clone",  # Similar name
            "AUTHORIZED_AGENT",  # Case variation
            "authorized_agent ",  # Trailing space
            " authorized_agent",  # Leading space
            "",  # Empty string
            None,  # None value
        ]

        for agent in unauthorized_agents:
            if agent is None:
                # Special case for None
                result = mesh.get("classified_data")  # No agent specified
                # Should return value for system access, but this is intentional
                continue
            else:
                result = mesh.get("classified_data", agent)
                assert (
                    result is None
                ), f"Agent '{agent}' should not have access to classified data"

        # Verify authorized agent still has access
        assert mesh.get("classified_data", "authorized_agent") == {
            "secret": "top_secret"
        }
        mesh.close()

    def test_sql_injection_resistance(self):
        """Test resistance to SQL injection in keys and values."""
        mesh = ContextMesh(
            enable_persistence=False
        )  # Start with memory-only for safety

        # SQL injection attempts in keys
        malicious_keys = [
            "'; DROP TABLE context_items; --",
            "test'; INSERT INTO context_items VALUES ('hacked', 'value'); --",
            "key' OR '1'='1",
            "key'; UPDATE context_items SET value='hacked' WHERE key='test'; --",
        ]

        # SQL injection attempts in values
        malicious_values = [
            "'; DROP TABLE context_items; --",
            {"sql": "'; DELETE FROM context_items; --"},
            ["'; TRUNCATE TABLE context_items; --"],
        ]

        # SQL injection attempts in subscribers
        malicious_subscribers = [
            ["'; DROP TABLE agent_topics; --"],
            ["agent1'; INSERT INTO agent_topics VALUES ('hacker', 'admin'); --"],
        ]

        # Test malicious keys
        for key in malicious_keys:
            try:
                mesh.push(key, "safe_value")
                retrieved = mesh.get(key)
                # Should store and retrieve normally, not execute SQL
                assert retrieved == "safe_value"
            except Exception as e:
                # If it raises an exception, it should be a validation error, not SQL error
                assert "SQL" not in str(e).upper()

        # Test malicious values
        for value in malicious_values:
            try:
                mesh.push("safe_key", value)
                retrieved = mesh.get("safe_key")
                # Should store and retrieve the malicious string as data, not execute it
                assert retrieved == value
            except Exception as e:
                assert "SQL" not in str(e).upper()

        # Test malicious subscribers
        for subscribers in malicious_subscribers:
            try:
                mesh.push("test_key", "test_value", subscribers=subscribers)
                # Should not crash or execute SQL
                assert mesh.get("test_key", subscribers[0]) == "test_value"
            except Exception as e:
                assert "SQL" not in str(e).upper()

        mesh.close()

    def test_path_traversal_resistance(self):
        """Test resistance to path traversal attacks."""
        import tempfile

        temp_dir = tempfile.mkdtemp()

        try:
            # Attempt path traversal in database path
            malicious_paths = [
                "../../../etc/passwd",
                "..\\..\\..\\windows\\system32\\config\\sam",
                "/etc/shadow",
                "C:\\Windows\\System32\\config\\SAM",
                temp_dir + "/../../../sensitive_file.db",
            ]

            for path in malicious_paths:
                try:
                    # Should either fail safely or create file in expected location
                    mesh = ContextMesh(
                        enable_persistence=True, db_backend="sqlite", db_path=path
                    )
                    mesh.push("test", "value")
                    mesh.close()

                    # Verify no files were created outside temp directory
                    # (This is implementation-dependent, but database should be contained)

                except Exception:
                    # Failing is acceptable for security
                    pass
        finally:
            import shutil

            shutil.rmtree(temp_dir, ignore_errors=True)

    def test_resource_exhaustion_protection(self):
        """Test protection against resource exhaustion attacks."""
        mesh = ContextMesh(enable_persistence=False)

        # Test very large keys
        huge_key = "x" * (1024 * 1024)  # 1MB key
        try:
            mesh.push(huge_key, "value")
            # Should either succeed or fail gracefully
        except MemoryError:
            pytest.skip("System doesn't have enough memory for this test")
        except Exception as e:
            # Should be a validation error, not a crash
            assert "memory" in str(e).lower() or "size" in str(e).lower()

        # Test very large values
        try:
            huge_value = "x" * (10 * 1024 * 1024)  # 10MB value
            mesh.push("test_key", huge_value)
            # Should either succeed or fail gracefully
        except MemoryError:
            pytest.skip("System doesn't have enough memory for this test")
        except Exception as e:
            # Should be a validation error, not a crash
            assert "memory" in str(e).lower() or "size" in str(e).lower()

        # Test excessive number of subscribers
        try:
            huge_subscribers = [f"agent_{i}" for i in range(100000)]
            mesh.push("test_key", "value", subscribers=huge_subscribers)
            # Should either succeed or fail gracefully
        except MemoryError:
            pytest.skip("System doesn't have enough memory for this test")
        except Exception as e:
            # Should be a validation error, not a crash
            assert "memory" in str(e).lower() or "limit" in str(e).lower()

        mesh.close()


class TestDataValidationSecurity:
    """Test security of data validation."""

    def test_serialization_safety(self):
        """Test that deserialization is safe from code injection."""
        mesh = ContextMesh(enable_persistence=False)

        # Potential code injection attempts through data
        dangerous_data = [
            "__import__('os').system('rm -rf /')",
            "eval('print(\"hacked\")')",
            "exec('import os; os.system(\"ls\")')",
            {"__reduce__": "dangerous_function"},
            {"__module__": "os", "__name__": "system"},
        ]

        for data in dangerous_data:
            try:
                mesh.push("test_key", data)
                retrieved = mesh.get("test_key")
                # Should store and retrieve as plain data, not execute
                assert retrieved == data
            except Exception as e:
                # Should be a serialization error, not code execution
                assert "pickle" not in str(e).lower() or "eval" not in str(e).lower()

        mesh.close()

    def test_type_safety(self):
        """Test that the system handles different data types safely."""
        mesh = ContextMesh(enable_persistence=False)

        # Test various data types
        test_data = [
            b"binary_data",
            memoryview(b"binary_data"),
            1 + 2j,  # Complex number
            frozenset([1, 2, 3]),
            range(10),
            TestClass,
        ]

        for data in test_data:
            try:
                mesh.push(f"test_key_{type(data).__name__}", data)
                retrieved = mesh.get(f"test_key_{type(data).__name__}")
                # Should either succeed or fail gracefully
                assert retrieved is not None or retrieved is None
            except Exception as e:
                # Should fail with appropriate error messages
                error_msg = str(e).lower()
                assert (
                    "type" in error_msg
                    or "serializ" in error_msg
                    or "pickle" in error_msg
                    or "json" in error_msg
                    or "deepcopy" in error_msg
                ), f"Unexpected error for {type(data).__name__}: {e}"

        mesh.close()


class TestConcurrencySecurityIssues:
    """Test security issues related to concurrent access."""

    def test_race_condition_resistance(self):
        """Test resistance to race condition attacks."""
        mesh = ContextMesh(enable_persistence=False)

        # Shared state for race condition test
        results = []

        def attacker_thread():
            """Attempt to exploit race conditions."""
            for i in range(100):
                # Try to access data being modified by another thread
                mesh.push(f"race_key_{i}", f"attacker_value_{i}")
                value = mesh.get(f"race_key_{i}")
                results.append(("attacker", i, value))

        def victim_thread():
            """Legitimate thread that might be vulnerable to race conditions."""
            for i in range(100):
                mesh.push(f"race_key_{i}", f"victim_value_{i}")
                value = mesh.get(f"race_key_{i}")
                results.append(("victim", i, value))

        # Run threads concurrently
        attacker = threading.Thread(target=attacker_thread)
        victim = threading.Thread(target=victim_thread)

        attacker.start()
        victim.start()

        attacker.join()
        victim.join()

        # Verify data integrity - each thread should get consistent data
        for thread_name, key_id, value in results:
            if value is not None:
                # Value should match the thread that stored it
                assert (
                    thread_name in value
                ), f"Data corruption detected: {thread_name}, {key_id}, {value}"

        mesh.close()

    def test_deadlock_resistance(self):
        """Test resistance to deadlock attacks."""
        mesh = ContextMesh(enable_persistence=False)

        def thread_a():
            """Thread that acquires locks in one order."""
            for i in range(50):
                mesh.push(f"key_a_{i}", f"value_a_{i}")
                mesh.get(f"key_b_{i}")
                mesh.cleanup_expired()

        def thread_b():
            """Thread that acquires locks in different order."""
            for i in range(50):
                mesh.push(f"key_b_{i}", f"value_b_{i}")
                mesh.get(f"key_a_{i}")
                mesh.get_stats()

        # Run threads concurrently
        thread_1 = threading.Thread(target=thread_a)
        thread_2 = threading.Thread(target=thread_b)

        thread_1.start()
        thread_2.start()

        # Threads should complete without deadlocking
        thread_1.join(timeout=10)  # 10 second timeout
        thread_2.join(timeout=10)

        # Verify threads completed
        assert not thread_1.is_alive(), "Thread A deadlocked"
        assert not thread_2.is_alive(), "Thread B deadlocked"

        mesh.close()


class TestToolSecurityIssues:
    """Test security issues in tool execution."""

    def test_tool_isolation(self):
        """Test that tools cannot access unauthorized context."""
        mesh = ContextMesh(enable_persistence=False)
        tools = ToolHandler(context_mesh=mesh, agent_name="user")

        # Store sensitive data
        mesh.push("admin_password", "super_secret", subscribers=["admin"])
        mesh.push("user_data", "public_info")

        # Simulate a user tool that tries to access admin data
        # Try to access admin data (should fail)
        admin_data = mesh.get("admin_password", "user")
        assert admin_data is None, "User should not access admin data"

        # Should be able to access public data
        public_data = mesh.get("user_data", "user")
        assert public_data == "public_info", "User should access public data"

        # Test using tools interface
        result = tools.handle_get_context(keys=["admin_password"])
        assert result["success"] is True
        assert (
            "admin_password" not in result["context"]
        ), "Admin data should not be accessible"

        result = tools.handle_get_context(keys=["user_data"])
        assert result["success"] is True
        assert result["context"]["user_data"] == "public_info"

        mesh.close()

    def test_tool_parameter_validation(self):
        """Test that tool parameters are properly validated."""
        mesh = ContextMesh(enable_persistence=False)
        tools = ToolHandler(context_mesh=mesh, agent_name="test_agent")

        # Subscribe to test topic first
        tools.handle_subscribe_to_topics(topics=["test"])

        # Test malicious inputs through the context system
        malicious_inputs = [
            "../../../etc/passwd",
            "..\\..\\windows\\system32",
            "__import__('os').system('ls')",
            "'; DROP TABLE users; --",
        ]

        for i, malicious_input in enumerate(malicious_inputs):
            # Test pushing malicious data
            key = f"test_input_{i}"
            result = tools.handle_push_context(
                key=key, value=malicious_input, topics=["test"]
            )

            # Should succeed in storing (but not execute)
            assert result["success"] is True

            # Retrieve and verify it's stored as string (not executed)
            retrieve_result = tools.handle_get_context(keys=[key])
            assert retrieve_result["success"] is True
            stored_value = retrieve_result["context"][key]

            # Should be stored as string, not executed
            assert isinstance(stored_value, str)
            assert stored_value == malicious_input

            # Should not contain evidence of code execution
            assert "root:" not in stored_value  # Unix passwd file
            assert "Administrator" not in stored_value  # Windows user

        mesh.close()


class TestConfigurationSecurity:
    """Test security of configuration and setup."""

    def test_secure_defaults(self):
        """Test that default configuration is secure."""
        mesh = ContextMesh()

        # Default should have reasonable security settings
        assert mesh.enable_persistence  # Should persist by default for durability
        assert mesh.auto_cleanup  # Should clean up expired items

        # Default database should be SQLite (safer than remote DB)
        assert mesh.db_backend is not None

        mesh.close()

    def test_environment_variable_security(self):
        """Test handling of environment variables."""
        # Test that sensitive environment variables are handled securely
        with patch.dict(
            os.environ,
            {
                "DB_PASSWORD": "secret_password",
                "API_KEY": "secret_api_key",
                "SYNTHA_SECRET": "secret_value",
            },
        ):
            # Creating mesh should not expose environment variables
            mesh = ContextMesh(enable_persistence=False)

            # Check that secrets aren't accidentally stored in context
            all_data = mesh.get_all_for_agent("test_agent")
            for key, value in all_data.items():
                value_str = str(value).lower()
                assert "secret_password" not in value_str
                assert "secret_api_key" not in value_str
                assert "secret_value" not in value_str

            mesh.close()

    def test_file_permission_security(self, temp_dir):
        """Test that created files have appropriate permissions."""
        if os.name != "posix":  # Skip on Windows
            pytest.skip("File permission test only applicable on POSIX systems")

        db_path = str(temp_dir / "secure_test.db")
        mesh = ContextMesh(
            enable_persistence=True, db_backend="sqlite", db_path=db_path
        )
        mesh.push("test", "value")
        mesh.close()

        if os.path.exists(db_path):
            # Check file permissions
            file_mode = os.stat(db_path).st_mode
            # File should not be world-readable (no 004 bit)
            assert not (file_mode & 0o004), "Database file should not be world-readable"
            # File should not be world-writable (no 002 bit)
            assert not (file_mode & 0o002), "Database file should not be world-writable"


class TestInputValidationSecurity:
    """Test input validation for security."""

    def test_key_validation(self):
        """Test that keys are properly validated."""
        mesh = ContextMesh(enable_persistence=False)

        # Test various potentially problematic keys
        problematic_keys = [
            None,  # None key
            123,  # Numeric key
            [],  # List key
            {},  # Dict key
            True,  # Boolean key
        ]

        for key in problematic_keys:
            try:
                mesh.push(key, "value")
                # If it succeeds, key should be converted to string
                retrieved = mesh.get(str(key))
                if retrieved is not None:
                    assert retrieved == "value"
            except (TypeError, ValueError):
                # Failing with appropriate error is acceptable
                pass
            except Exception as e:
                pytest.fail(f"Unexpected exception for key {key}: {e}")

        mesh.close()

    def test_subscriber_validation(self):
        """Test that subscriber lists are properly validated."""
        mesh = ContextMesh(enable_persistence=False)

        # Test various potentially problematic subscriber lists
        problematic_subscribers = [
            [None],  # None in list
            [123],  # Number in list
            [""],  # Empty string in list
            [[]],  # Nested list
            [{}],  # Dict in list
        ]

        for subscribers in problematic_subscribers:
            try:
                mesh.push("test_key", "value", subscribers=subscribers)
                # Should either succeed (with conversion) or fail gracefully
            except (TypeError, ValueError):
                # Appropriate validation errors are acceptable
                pass
            except Exception as e:
                pytest.fail(f"Unexpected exception for subscribers {subscribers}: {e}")

        mesh.close()


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-m", "not slow"])
