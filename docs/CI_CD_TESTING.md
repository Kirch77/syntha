# CI/CD Testing Guide

## CI/CD Pipeline Overview

Our CI/CD pipeline runs comprehensive tests on every push to ensure code quality and catch issues before they reach production.

## GitHub Actions Workflow

Every push triggers a comprehensive test suite that includes:

### Test Matrix

- **Python Versions**: 3.8, 3.9, 3.10, 3.11, 3.12
- **Operating Systems**: Ubuntu, Windows, macOS
- **Database Backends**: SQLite, PostgreSQL

### Pipeline Stages

1. **Dependency Installation**
2. **Code Quality Checks**
3. **Security Scanning**
4. **Unit Tests**
5. **Integration Tests**
6. **Performance Tests**

## Test Categories

### Unit Tests
- **Purpose**: Test individual components in isolation
- **Speed**: Fast (< 5 seconds total)
- **Coverage**: 95%+ required
- **Motto**: "If it's not tested, it's broken"

### Integration Tests
- **Purpose**: Test component interactions
- **Speed**: Medium (30-60 seconds)
- **Coverage**: End-to-end workflows

### Performance Tests
- **Purpose**: Ensure acceptable performance under load
- **Speed**: Slow but necessary (2-5 minutes)
- **Coverage**: Critical operations under load

### Security Tests
- **Purpose**: Prevent security vulnerabilities
- **Speed**: Medium (30 seconds)
- **Coverage**: Common vulnerabilities

## Running Tests Locally

### Quick Test
```bash
# Run the basic test suite
pytest tests/unit/ -v
```

### Full Test Suite
```bash
# Run everything
pytest tests/ -v
```

### Performance Tests
```bash
# Run performance benchmarks
pytest tests/performance/ -v -s
```

## Test Configuration

### pytest.ini Settings
```ini
[pytest]
minversion = 6.0
addopts = -v --strict-markers --strict-config --color=yes --tb=long --showlocals --durations=10
testpaths = tests
python_files = test_*.py *_test.py
python_classes = Test*
python_functions = test_*

# Markers for test categorization
markers =
    unit: Unit tests that test individual components in isolation
    integration: Integration tests that test component interactions
    performance: Performance tests that benchmark operations and detect regressions
    security: Security tests that verify protection against vulnerabilities
    slow: Tests that take more than a few seconds to complete
    database: Tests that require database connections (SQLite/PostgreSQL)
    concurrent: Tests that use threading or multiprocessing
    edge_case: Tests that cover edge cases and boundary conditions
    smoke: Quick smoke tests for basic functionality verification

# Filter warnings
filterwarnings =
    ignore::DeprecationWarning
    ignore::PendingDeprecationWarning
    ignore:.*urllib3.*:DeprecationWarning

# Logging configuration
log_cli = true
log_cli_level = INFO
log_cli_format = %(asctime)s [%(levelname)8s] %(name)s: %(message)s
log_cli_date_format = %Y-%m-%d %H:%M:%S
```

## Test Directory Structure

```
tests/
├── unit/               # Unit tests
├── integration/        # Integration tests  
├── performance/        # Performance tests
├── security/           # Security tests
├── examples/           # Example tests
├── conftest.py         # Test configuration
└── test_*.py           # Individual test files
```

## Common CI Issues

### "Tests pass locally but fail in CI"
- **Cause**: Environment differences or timing issues
- **Solution**: Check Python version, OS, and add debugging output
- **Prevention**: Use same Python version as CI locally

### "Flaky tests"
- **Cause**: Race conditions or timing assumptions
- **Solution**: Add proper synchronization or increase timeouts
- **Prevention**: Write deterministic tests

### "Out of memory"
- **Cause**: Memory leaks or large test datasets
- **Solution**: Profile memory usage and optimize
- **Prevention**: Clean up resources in test teardown

## Best Practices

### Test Writing
- Write tests first (TDD)
- Test edge cases
- Use descriptive test names
- Keep tests independent

### Performance Testing
- Test realistic scenarios
- Use consistent test data
- Monitor trends
- Set reasonable thresholds

### Security Testing
- Test input validation
- Check authentication
- Verify authorization
- Test rate limiting

## CI Benefits

### Quality Assurance
- Catch bugs early
- Ensure consistent quality
- Prevent regressions
- Maintain code standards

### Team Collaboration
- Shared quality standards
- Automated feedback
- Documentation enforcement
- Knowledge sharing

### Deployment Confidence
- Automated testing
- Consistent environments
- Rapid feedback
- Deployment automation

## Troubleshooting

### Reading Test Output
```
FAILED tests/test_context.py::test_context_isolation[sqlite] - AssertionError: Context leaked between agents
```

### Common Fixes
1. Clear test database between tests
2. Reset global state
3. Check test dependencies
4. Verify test setup

### Getting Help
- Check the GitHub Actions logs
- Run tests locally to reproduce
- Ask for help in issues
- Submit detailed bug reports

The CI/CD pipeline helps maintain code quality and catches issues before they reach production. When tests fail, read the error messages carefully and use the debugging tools provided.
