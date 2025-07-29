# Contributor Testing Guide

## Understanding Test Failures

When contributing to Syntha SDK, you'll encounter comprehensive tests designed to help you understand exactly what went wrong and how to fix it. This guide explains how to interpret test failures and use our debugging tools.

## Types of Error Messages

### Standard pytest Errors

```
AssertionError: assert 3 == 2
 +  where 3 = len(['agent1', 'agent2', 'agent3'])
```

### Enhanced Contributor-Friendly Errors

```
IMMUTABILITY VIOLATION DETECTED!
Issue: ContextItem.subscribers is not properly isolated from external modifications
Expected: subscribers length should remain 2 after external list modification
Actual: subscribers length is 3 (was modified externally!)
Current subscribers: ['agent1', 'agent2', 'agent3']
Modified original: ['agent1', 'agent2', 'agent3']

HOW TO FIX:
   In ContextItem.__init__, ensure you create a copy of mutable parameters:
   ✓ self.subscribers = list(subscribers) if subscribers else []
   ✗ self.subscribers = subscribers  # This creates a reference, not a copy!

   Pro tip: Python references are like sharing a Netflix password - 
   everyone gets affected when someone changes it.
```

## Debugging Workflow

### 1. Read the Error Message Carefully

Our enhanced error messages include:

- **Issue**: What went wrong
- **Expected vs Actual**: What should happen vs what did happen
- **HOW TO FIX**: Specific steps to resolve the issue
- **WHY THIS MATTERS**: Context about why this requirement exists

### 2. Run the Specific Test with Verbose Output

```bash
# Run a specific test with detailed output
pytest tests/unit/test_context.py::TestContextItem::test_subscribers_immutability -v -s

# Run all tests in a specific category
pytest tests/unit/ -v --tb=short

# Run with even more detail
pytest tests/unit/test_context.py::TestContextItem::test_subscribers_immutability -v -s --tb=long
```

### 3. Use Debug Mode

```bash
# Drop into debugger on failure
pytest tests/unit/test_context.py::TestContextItem::test_subscribers_immutability --pdb

# Run with debug output
pytest tests/unit/test_context.py::TestContextItem::test_subscribers_immutability -v -s --capture=no
```

### 4. Check Related Tests

```bash
# Run all tests for a specific class
pytest tests/unit/test_context.py::TestContextItem -v

# Run tests that might be related
pytest tests/unit/test_context.py -k "immutability" -v
```

## Common Test Failure Patterns

### 1. Data Immutability Issues

**Problem**: External code can modify internal data structures

**Common Error**:
```
IMMUTABILITY VIOLATION: Expected data to remain unchanged
```

**Fix**: Always create copies of mutable inputs:
```python
# Wrong
self.subscribers = subscribers

# Right
self.subscribers = list(subscribers) if subscribers else []
```

### 2. Thread Safety Issues

**Problem**: Race conditions in concurrent operations

**Common Error**:
```
THREAD SAFETY VIOLATION: Concurrent access detected
```

**Fix**: Use proper locking mechanisms:
```python
# Wrong
self.data[key] = value

# Right
with self._lock:
    self.data[key] = value
```

### 3. Memory Leaks

**Problem**: Resources not properly cleaned up

**Common Error**:
```
MEMORY LEAK DETECTED: Resources not cleaned up
```

**Fix**: Always clean up resources:
```python
# Wrong
def process_data(self):
    connection = create_connection()
    # ... use connection

# Right
def process_data(self):
    connection = create_connection()
    try:
        # ... use connection
    finally:
        connection.close()
```

### 4. Database Connection Issues

**Problem**: Database connections not properly managed

**Common Error**:
```
DATABASE CONNECTION ERROR: Connection pool exhausted
```

**Fix**: Use connection managers:
```python
# Wrong
conn = get_connection()
conn.execute(query)

# Right
with get_connection() as conn:
    conn.execute(query)
```

## Test Categories and Their Focus

### Unit Tests (`tests/unit/`)

**Focus**: Individual component behavior
**Speed**: Fast (<1s per test)
**Isolation**: No external dependencies

**Common Failures**:
- Logic errors in individual functions
- Incorrect return values
- Missing error handling

### Integration Tests (`tests/integration/`)

**Focus**: Component interactions
**Speed**: Medium (1-10s per test)
**Dependencies**: May use real databases

**Common Failures**:
- Database connection issues
- Cross-component communication problems
- Configuration mismatches

### Performance Tests (`tests/performance/`)

**Focus**: Speed and resource usage
**Speed**: Slow (10s+ per test)
**Dependencies**: May require specific hardware

**Common Failures**:
- Slow operations
- Memory usage spikes
- Resource leaks

### Security Tests (`tests/security/`)

**Focus**: Security vulnerabilities
**Speed**: Variable
**Dependencies**: May simulate attack scenarios

**Common Failures**:
- SQL injection vulnerabilities
- Access control bypasses
- Data exposure issues

## Advanced Debugging Techniques

### Using pytest fixtures for debugging

```python
@pytest.fixture
def debug_context():
    """Fixture that provides debug information."""
    import logging
    logging.basicConfig(level=logging.DEBUG)
    yield
    logging.basicConfig(level=logging.WARNING)
```

### Custom assertion messages

```python
def test_custom_assertion():
    result = complex_operation()
    assert result is not None, f"Expected result, got None. Debug info: {debug_info()}"
```

### Using pytest markers

```bash
# Run only tests marked as 'slow'
pytest -m slow

# Skip slow tests
pytest -m "not slow"

# Run tests with custom markers
pytest -m "integration and not slow"
```

## Test Environment Setup

### Local Development

```bash
# Set up test environment
export SYNTHA_TEST_MODE=true
export SYNTHA_LOG_LEVEL=DEBUG

# Run tests with environment
pytest tests/
```

### Docker Testing

```bash
# Run tests in Docker container
docker run -v $(pwd):/app -w /app python:3.9 pytest tests/

# Run specific test suite
docker run -v $(pwd):/app -w /app python:3.9 pytest tests/integration/
```

## Contributing Test Improvements

### Writing Better Test Messages

```python
# Poor error message
assert len(result) == 2

# Good error message
assert len(result) == 2, f"Expected 2 items, got {len(result)}: {result}"

# Excellent error message with context
assert len(result) == 2, (
    f"Expected 2 items after filtering, got {len(result)}: {result}\n"
    f"Filter criteria: {filter_criteria}\n"
    f"Original data: {original_data}"
)
```

### Adding Debug Helpers

```python
def debug_context_state(mesh):
    """Helper to print context mesh state for debugging."""
    print(f"Context items: {len(mesh._context)}")
    print(f"Subscribers: {mesh._subscribers}")
    print(f"Agent topics: {mesh._agent_topics}")
```

### Test Documentation

```python
def test_complex_scenario():
    """
    Test complex multi-agent scenario.
    
    This test verifies that:
    1. Agents can subscribe to multiple topics
    2. Context is properly filtered by topic
    3. Data persists across agent restarts
    4. Performance remains within acceptable limits
    
    Common failure points:
    - Topic filtering logic in ContextMesh.push()
    - Database connection handling in persistence layer
    - Memory cleanup in agent lifecycle
    """
    # Test implementation
```

## Getting Help

If you're stuck on a test failure:

1. **Read the error message carefully** - our enhanced messages provide specific guidance
2. **Check the test documentation** - look for comments explaining the test purpose
3. **Run related tests** - see if the issue is isolated or widespread
4. **Use debug mode** - step through the code with a debugger
5. **Ask for help** - create a GitHub issue with the full error message and context

## Performance Testing Guidelines

### Benchmarking

```python
import time

def test_performance_baseline():
    """Test that operations meet performance requirements."""
    mesh = ContextMesh()
    
    # Measure operation time
    start = time.time()
    for i in range(1000):
        mesh.push(f"key_{i}", {"data": i})
    duration = time.time() - start
    
    # Assert performance requirement
    assert duration < 1.0, f"1000 operations took {duration:.2f}s, expected <1.0s"
```

### Memory Testing

```python
import tracemalloc

def test_memory_usage():
    """Test that memory usage stays within limits."""
    tracemalloc.start()
    
    mesh = ContextMesh()
    for i in range(10000):
        mesh.push(f"key_{i}", {"data": i})
    
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    # Assert memory limit (in MB)
    assert peak < 100 * 1024 * 1024, f"Peak memory usage: {peak / 1024 / 1024:.2f}MB"
```

This testing guide helps ensure that contributors can effectively diagnose and fix issues while maintaining the high quality standards of the Syntha SDK.
