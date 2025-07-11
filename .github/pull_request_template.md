## Description

Brief description of the changes in this pull request.

## Type of Change

Please select the relevant option:

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update (changes to documentation only)
- [ ] 🔧 Refactoring (code changes that neither fix bugs nor add features)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test improvements

## Related Issues

Closes #(issue number)
Related to #(issue number)

## Changes Made

- [ ] List the main changes
- [ ] Include any new files created
- [ ] Mention any files deleted
- [ ] Note any configuration changes

## Testing

- [ ] All existing tests pass
- [ ] Added new tests for changes
- [ ] Updated existing tests if needed
- [ ] Manual testing completed

### Test Coverage

```bash
# Include test coverage output if relevant
pytest --cov=syntha --cov-report=term-missing
```

## Code Quality

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code is properly documented
- [ ] Type hints added where appropriate

### Quality Checks

```bash
# Run these commands and paste any relevant output
black syntha/ tests/
isort syntha/ tests/
flake8 syntha/ tests/
mypy syntha/
```

## Performance Impact

- [ ] No performance impact
- [ ] Performance improved
- [ ] Performance regression (explain below)

If there are performance changes, please include benchmark results:

## Breaking Changes

If this is a breaking change, please describe:

- What breaks?
- How to migrate existing code?
- Are there deprecation warnings?

## Documentation

- [ ] Documentation updated in README.md
- [ ] API documentation updated
- [ ] Examples updated if needed
- [ ] CHANGELOG.md updated

## Security

- [ ] No security impact
- [ ] Security improvement
- [ ] Potential security concern (explain below)

## Screenshots/Examples

If applicable, add screenshots or code examples demonstrating the changes:

```python
# Example of new functionality
```

## Checklist

- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Additional Notes

Any additional information, concerns, or questions for reviewers.
