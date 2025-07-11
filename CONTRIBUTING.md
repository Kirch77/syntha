# Contributing to Syntha SDK

Thank you for your interest in contributing to Syntha! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be collaborative**: Work together towards common goals
- **Be professional**: Keep discussions focused and constructive
- **Be patient**: Remember that people have different skill levels and time zones

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Git
- A GitHub account

### First-time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/syntha.git
   cd syntha
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/syntha.git
   ```

## Development Setup

### Virtual Environment

We strongly recommend using a virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Install Dependencies

```bash
# Install the package in development mode
pip install -e .

# Install development dependencies
pip install -r requirements-test.txt
```

### Database Setup (for testing)

For integration tests, you may need PostgreSQL and Redis:

```bash
# PostgreSQL (using Docker)
docker run --name syntha-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=syntha_test -p 5432:5432 -d postgres:13

# Redis (using Docker)
docker run --name syntha-redis -p 6379:6379 -d redis:alpine
```

## Making Changes

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test improvements
- `perf/` - Performance improvements

Examples:

- `feature/context-mesh-expiration`
- `fix/sqlite-connection-leak`
- `docs/api-reference-update`

### Commit Messages

Use clear, descriptive commit messages following the conventional commit format:

```
type(scope): description

body (optional)

footer (optional)
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `perf`: Performance improvements
- `ci`: CI/CD changes

Examples:

```
feat(context): add TTL support for context items

Add time-to-live functionality to ContextMesh items with automatic
cleanup of expired entries.

Closes #123
```

### Code Style

We use several tools to maintain code quality:

- **Black** for code formatting
- **isort** for import sorting
- **flake8** for linting
- **mypy** for type checking

Run all quality checks:

```bash
# Format code
black syntha/ tests/
isort syntha/ tests/

# Check linting
flake8 syntha/ tests/

# Type checking
mypy syntha/
```

### Type Hints

All new code should include type hints:

```python
def process_data(data: List[Dict[str, Any]]) -> Optional[str]:
    """Process data and return result."""
    if not data:
        return None
    return f"Processed {len(data)} items"
```

## Testing

We maintain a comprehensive test suite with multiple types of tests.

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=syntha --cov-report=html

# Run specific test types
pytest tests/unit/           # Unit tests only
pytest tests/integration/    # Integration tests only
pytest tests/performance/    # Performance tests only

# Run tests in parallel
pytest -n auto
```

### Test Categories

1. **Unit Tests** (`tests/unit/`): Test individual components in isolation
2. **Integration Tests** (`tests/integration/`): Test component interactions
3. **Performance Tests** (`tests/performance/`): Benchmark performance and detect regressions

### Writing Tests

#### Unit Tests

```python
import pytest
from syntha.context import ContextMesh

def test_context_mesh_basic_operations():
    """Test basic ContextMesh operations."""
    mesh = ContextMesh()

    # Test data storage
    mesh.push("test_key", {"data": "value"})
    result = mesh.get("test_key")

    assert result == {"data": "value"}
    assert mesh.size() == 1

    mesh.close()
```

#### Integration Tests

```python
def test_persistence_integration(tmp_path):
    """Test persistence with real database."""
    db_path = str(tmp_path / "test.db")

    # Create mesh with persistence
    mesh1 = ContextMesh(enable_persistence=True, db_path=db_path)
    mesh1.push("persistent_data", {"value": 123})
    mesh1.close()

    # Verify data persists
    mesh2 = ContextMesh(enable_persistence=True, db_path=db_path)
    assert mesh2.get("persistent_data") == {"value": 123}
    mesh2.close()
```

#### Performance Tests

```python
import time

def test_large_dataset_performance():
    """Test performance with large datasets."""
    mesh = ContextMesh()

    # Measure insertion time
    start_time = time.time()
    for i in range(10000):
        mesh.push(f"key_{i}", {"index": i, "data": f"value_{i}"})
    insertion_time = time.time() - start_time

    # Assert reasonable performance
    assert insertion_time < 5.0  # Should complete in under 5 seconds
    assert mesh.size() == 10000

    mesh.close()
```

### Test Requirements

- **Coverage**: Aim for >90% code coverage
- **Isolation**: Each test should be independent
- **Deterministic**: Tests should pass consistently
- **Fast**: Unit tests should run quickly (<1s each)
- **Clear**: Test names and assertions should be descriptive

## Code Quality

### Documentation

- **Docstrings**: All public functions/classes need docstrings
- **Type hints**: Required for all new code
- **Comments**: Use sparingly, prefer self-documenting code
- **README updates**: Update if adding new features

Example docstring:

```python
def process_context_data(
    data: Dict[str, Any],
    filters: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Process context data with optional filtering.

    Args:
        data: The context data to process
        filters: Optional list of keys to filter by

    Returns:
        Processed context data dictionary

    Raises:
        ValueError: If data is empty or invalid

    Example:
        >>> data = {"key1": "value1", "key2": "value2"}
        >>> result = process_context_data(data, filters=["key1"])
        >>> print(result)
        {"key1": "value1"}
    """
```

### Performance Considerations

- **Memory usage**: Avoid memory leaks, clean up resources
- **Time complexity**: Consider algorithmic efficiency
- **Database queries**: Optimize database operations
- **Concurrency**: Ensure thread safety where needed

### Security Guidelines

- **Input validation**: Validate all inputs
- **SQL injection**: Use parameterized queries
- **Path traversal**: Sanitize file paths
- **Secrets**: Never commit secrets or passwords

## Submitting Changes

### Before Submitting

1. **Update your branch** with the latest upstream changes:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run the full test suite**:

   ```bash
   pytest
   ```

3. **Check code quality**:

   ```bash
   black syntha/ tests/
   isort syntha/ tests/
   flake8 syntha/ tests/
   mypy syntha/
   ```

4. **Update documentation** if needed

### Pull Request Process

1. **Push your branch** to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:

   - Clear title describing the change
   - Detailed description of what changed and why
   - Reference to any related issues
   - Screenshots if UI changes are involved

3. **Fill out the PR template** completely

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Added new tests for changes
- [ ] Updated existing tests

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings introduced
```

## Review Process

### Review Criteria

Reviewers will check for:

- **Functionality**: Does the code work as intended?
- **Tests**: Are there adequate tests with good coverage?
- **Code quality**: Is the code readable and well-structured?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Documentation**: Is documentation updated and clear?

### Review Timeline

- **Initial review**: Within 2-3 business days
- **Follow-up reviews**: Within 1-2 business days
- **Final approval**: After all feedback is addressed

### Addressing Feedback

- **Be responsive**: Address feedback promptly
- **Ask questions**: If feedback is unclear, ask for clarification
- **Make incremental commits**: Don't squash commits during review
- **Test changes**: Ensure fixes don't break anything else

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in `setup.py` and `syntha/__init__.py`
2. **Update CHANGELOG.md** with release notes
3. **Create release tag**: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. **Push tag**: `git push origin v1.0.0`
5. **GitHub Actions** will automatically build and publish

## Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For security issues or private concerns

### Useful Resources

- [Python Testing Best Practices](https://docs.python-guide.org/writing/tests/)
- [Git Workflow Guidelines](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Recognition

Contributors will be recognized in:

- **CONTRIBUTORS.md** file
- **Release notes** for significant contributions
- **GitHub contributors** page

Thank you for contributing to Syntha! 🎉
