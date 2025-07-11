# Contributor Testing Guide

## 🧪 Understanding Test Failures

When contributing to Syntha SDK, you'll encounter comprehensive tests designed to help you understand exactly what went wrong and how to fix it. This guide explains how to interpret test failures and use our debugging tools.

## 🚨 Types of Error Messages

### Standard pytest Errors (Basic)

```
AssertionError: assert 3 == 2
 +  where 3 = len(['agent1', 'agent2', 'agent3'])
```

### Enhanced Contributor-Friendly Errors

```
❌ IMMUTABILITY VIOLATION DETECTED!
📍 Issue: ContextItem.subscribers is not properly isolated from external modifications
🔍 Expected: subscribers length should remain 2 after external list modification
💥 Actual: subscribers length is 3 (was modified externally!)
📋 Current subscribers: ['agent1', 'agent2', 'agent3']
📋 Modified original: ['agent1', 'agent2', 'agent3']

🔧 HOW TO FIX:
   In ContextItem.__init__, ensure you create a copy of mutable parameters:
   ✅ self.subscribers = list(subscribers) if subscribers else []
   ❌ self.subscribers = subscribers  # This creates a reference, not a copy!

💡 WHY THIS MATTERS:
   If ContextItem doesn't copy mutable inputs, external code can accidentally
   modify the context data, leading to hard-to-debug issues in production.
   This is a critical data integrity requirement for the Syntha SDK.
```

## 🛠️ Debugging Workflow

### 1. Read the Error Message Carefully

Our enhanced error messages include:

- **📍 Issue**: What went wrong
- **🔍 Expected vs 💥 Actual**: What should happen vs what did happen
- **🔧 HOW TO FIX**: Specific steps to resolve the issue
- **💡 WHY THIS MATTERS**: Context about why this requirement exists

### 2. Run the Specific Test with Verbose Output

```bash
# Run a specific failing test with detailed output
python -m pytest tests/unit/test_context.py::TestContextItem::test_immutability -v -s

# Run with extra debugging information
python -m pytest tests/unit/test_context.py::TestContextItem::test_immutability -v -s --tb=long
```

### 3. Use Our Debugging Utilities

#### Debug Context Mesh State

```python
from tests.test_helpers import debug_context_mesh_state

def test_my_feature():
    mesh = ContextMesh()
    mesh.put("key", "value", subscribers=["agent1"])

    # Debug the current state
    debug_context_mesh_state(mesh, "After adding data")

    # Your test logic here...
```

#### Use Test Scenario Reporter

```python
from tests.test_helpers import TestExecutionReporter

def test_with_clear_reporting():
    reporter = TestExecutionReporter()

    with reporter.test_scenario(
        scenario_name="My Feature Test",
        description="Testing that my feature works correctly",
        expected_behavior="Feature should return expected results",
        setup_notes="Create test data and configure system"
    ):
        reporter.log_step("Setting up test data")
        # your setup code

        reporter.log_data("Input data", my_input)
        # your test logic

        reporter.log_step("Verifying results")
        # your assertions
```

## 🎯 Common Test Categories & What They Check

### Unit Tests (`@pytest.mark.unit`)

- **What**: Individual function/class behavior
- **When they fail**: Your code logic has bugs
- **How to fix**: Check the specific function implementation

### Integration Tests (`@pytest.mark.integration`)

- **What**: Multiple components working together
- **When they fail**: Components don't interact correctly
- **How to fix**: Check interfaces between components

### Security Tests (`@pytest.mark.security`)

- **What**: Protection against common vulnerabilities
- **When they fail**: Security holes exist in your code
- **How to fix**: Validate inputs, escape outputs, check permissions

### Performance Tests (`@pytest.mark.performance`)

- **What**: Operations complete within time limits
- **When they fail**: Code is too slow
- **How to fix**: Profile code, optimize algorithms, check for bottlenecks

### Edge Case Tests (`@pytest.mark.edge_case`)

- **What**: Unusual inputs and boundary conditions
- **When they fail**: Code doesn't handle edge cases
- **How to fix**: Add validation, handle special cases

## 🔧 Common Issues & Solutions

### 1. Immutability Violations

**Problem**: Modifying mutable inputs affects internal state

```python
# ❌ Wrong - creates reference
def __init__(self, subscribers):
    self.subscribers = subscribers

# ✅ Correct - creates copy
def __init__(self, subscribers):
    self.subscribers = list(subscribers) if subscribers else []
```

### 2. Access Control Issues

**Problem**: Agents can access data they shouldn't

```python
# Check subscription logic
def get(self, key, agent):
    if not self._is_agent_subscribed(key, agent):
        return None  # Access denied
    return self._contexts.get(key)
```

### 3. Data Integrity Problems

**Problem**: Data changes during storage/retrieval

```python
# Ensure deep copies for complex data
import copy

def put(self, key, value, **kwargs):
    safe_value = copy.deepcopy(value)
    self._contexts[key] = ContextItem(safe_value, **kwargs)
```

### 4. Performance Regressions

**Problem**: Operations take too long

```python
# Profile your code
import cProfile
cProfile.run('your_slow_function()')

# Check time complexity
# O(n) is usually acceptable
# O(n²) might be too slow for large datasets
```

### 5. Thread Safety Issues

**Problem**: Race conditions in concurrent code

```python
import threading

class ThreadSafeContextMesh:
    def __init__(self):
        self._lock = threading.RLock()
        self._contexts = {}

    def put(self, key, value, **kwargs):
        with self._lock:
            # Safe concurrent access
            self._contexts[key] = ContextItem(value, **kwargs)
```

## 📊 Running Different Test Categories

```bash
# Run all tests
python -m pytest

# Run only unit tests
python -m pytest -m unit

# Run only failing tests
python -m pytest --lf

# Run with coverage report
python -m pytest --cov=syntha --cov-report=html

# Run specific test file
python -m pytest tests/unit/test_context.py

# Run specific test function
python -m pytest tests/unit/test_context.py::test_context_item_creation
```

## 🆘 Getting Help

1. **Read the error message** - Our enhanced errors include fix instructions
2. **Check existing tests** - Look for similar test patterns
3. **Use debug utilities** - Add debugging output to understand what's happening
4. **Run tests incrementally** - Test small changes frequently
5. **Ask for help** - Create an issue with:
   - The failing test output
   - What you're trying to implement
   - What you've already tried

## ✅ Test Quality Checklist

When writing new tests:

- [ ] Test has clear, descriptive name
- [ ] Test includes docstring explaining what it checks
- [ ] Test uses appropriate pytest markers
- [ ] Error messages are helpful for debugging
- [ ] Test covers both success and failure cases
- [ ] Test is isolated and doesn't depend on other tests
- [ ] Test data is realistic but simple
- [ ] Performance-sensitive tests include timing assertions

## 🎓 Example: Writing a Good Test

```python
@pytest.mark.unit
def test_context_item_ttl_expiration_with_clear_errors(self):
    """
    Test that ContextItem correctly expires after TTL period.

    This test verifies the time-to-live functionality works correctly
    and that expired items are properly identified.
    """
    reporter = TestExecutionReporter()

    with reporter.test_scenario(
        scenario_name="TTL Expiration",
        description="Verify ContextItem expires after specified TTL",
        expected_behavior="Item should be expired after TTL seconds pass",
        setup_notes="Create item with 0.1 second TTL, wait, then check"
    ):
        # Setup
        reporter.log_step("Creating ContextItem with short TTL")
        item = ContextItem("test_value", ttl=0.1)
        reporter.log_data("TTL", 0.1)

        # Verify not expired initially
        reporter.log_step("Checking item is not expired initially")
        assert not item.is_expired(), "Item should not be expired immediately"

        # Wait for expiration
        reporter.log_step("Waiting for TTL to pass")
        time.sleep(0.15)

        # Verify expired
        reporter.log_step("Checking item is expired after TTL")
        assert item.is_expired(), "Item should be expired after TTL period"
```

This approach ensures that when your test fails, contributors get clear guidance on what went wrong and how to fix it!
