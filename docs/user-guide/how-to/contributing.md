# Contributing

Thank you for your interest in contributing to Syntha! This guide will help you get started with contributing to the project.

## Development Setup

### Prerequisites
- Python 3.8 or higher
- Git
- Virtual environment tool (venv, conda, etc.)

### Setting Up the Development Environment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/syntha/syntha-sdk.git
   cd syntha-sdk
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -e ".[dev,test,docs]"
   ```

4. **Run Tests**
   ```bash
   pytest
   ```

## Contributing Guidelines

### Code Style
- Follow PEP 8 style guidelines
- Use type hints for all functions and methods
- Write docstrings for all public functions and classes
- Maximum line length: 88 characters (Black formatter)

### Code Formatting
We use several tools to maintain code quality:

```bash
# Format code with Black
black syntha tests

# Sort imports with isort
isort syntha tests

# Lint with flake8
flake8 syntha tests

# Type checking with mypy
mypy syntha
```

### Testing
- Write tests for all new features
- Maintain test coverage above 90%
- Use pytest for testing framework
- Write both unit tests and integration tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=syntha --cov-report=html

# Run specific test file
pytest tests/test_context.py

# Run tests with specific marker
pytest -m "not slow"
```

## Pull Request Process

1. **Fork the Repository**
   - Fork the project on GitHub
   - Clone your fork locally

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Write your code
   - Add tests for new functionality
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   pytest
   black --check syntha tests
   flake8 syntha tests
   mypy syntha
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Open a pull request on GitHub
   - Provide clear description of changes
   - Link any related issues

## Commit Message Convention

We follow the Conventional Commits specification:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `test:` adding or updating tests
- `refactor:` code refactoring
- `perf:` performance improvements
- `ci:` CI/CD changes

Example:
```
feat: add PostgreSQL persistence backend

- Add PostgreSQL adapter for persistence layer
- Include connection pooling and migration support
- Add comprehensive tests for PostgreSQL operations
```

## Documentation

### Writing Documentation
- Use Markdown format
- Include code examples
- Write clear, concise explanations
- Test all code examples

### Building Documentation Locally
```bash
# Install documentation dependencies
pip install -e ".[docs]"

# Build documentation
mkdocs build

# Serve locally for development
mkdocs serve
```

## Reporting Issues

When reporting issues:
1. Check existing issues first
2. Use the issue template
3. Provide clear reproduction steps
4. Include environment details
5. Add relevant logs or error messages

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct

## Getting Help

- GitHub Issues for bug reports and feature requests
- GitHub Discussions for questions and general discussion
- Documentation for guides and API reference

## Release Process

Releases are handled by maintainers:
1. Version bumping follows semantic versioning
2. Changelog is automatically generated
3. Documentation is updated
4. PyPI package is published

## Recognition

Contributors are recognized in:
- CHANGELOG.md
- Contributors section in README
- Release notes

Thank you for contributing to Syntha!
