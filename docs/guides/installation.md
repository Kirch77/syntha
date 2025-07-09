# Installation Guide

This guide covers installing Syntha SDK in different environments and for various use cases.

## Requirements

- **Python**: 3.8 or higher
- **Dependencies**: None! Syntha is framework-agnostic with zero required dependencies

## Quick Installation

### PyPI Installation (Recommended)

```bash
pip install syntha
```

### Development Installation

For contributing or accessing the latest features:

```bash
# Clone the repository
git clone https://github.com/syntha-ai/syntha.git
cd syntha

# Install in development mode
pip install -e .

# Run tests to verify installation
pytest tests/ -v
```

## Verify Installation

Create a simple test script to verify everything works:

```python
# test_installation.py
from syntha import ContextMesh, ToolHandler, build_system_prompt

# Test basic functionality
mesh = ContextMesh()
handler = ToolHandler(mesh)

# Add some test context
mesh.push("test_key", "test_value")

# Generate a system prompt
prompt = build_system_prompt("TestAgent", mesh)

# Get tool schemas
tools = handler.get_schemas()

print("✅ Syntha SDK installed successfully!")
print(f"✅ {len(tools)} tool schemas available")
print(f"✅ Context system working: {mesh.get('test_key')}")
```

Run the test:

```bash
python test_installation.py
```

Expected output:

```
✅ Syntha SDK installed successfully!
✅ 7 tool schemas available
✅ Context system working: test_value
```

## Environment-Specific Setup

### Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv syntha-env

# Activate (Windows)
syntha-env\Scripts\activate

# Activate (macOS/Linux)
source syntha-env/bin/activate

# Install Syntha
pip install syntha
```

### Conda Environment

```bash
# Create conda environment
conda create -n syntha python=3.9

# Activate environment
conda activate syntha

# Install Syntha
pip install syntha
```

### Docker Environment

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install Syntha
RUN pip install syntha

# Copy your application
COPY . .

CMD ["python", "your_app.py"]
```

### Production Environment

For production deployments, consider pinning the version:

```bash
# requirements.txt
syntha==0.2.0
```

Or with poetry:

```toml
# pyproject.toml
[tool.poetry.dependencies]
syntha = "^0.2.0"
```

## Framework-Specific Setup

### With OpenAI

```bash
pip install syntha openai
```

### With Anthropic

```bash
pip install syntha anthropic
```

### With LangChain

```bash
pip install syntha langchain langchain-openai
```

### With LangGraph

```bash
pip install syntha langgraph
```

## Troubleshooting

### Common Issues

**Import Error**: If you get import errors, ensure you're in the correct environment:

```bash
python -c "import syntha; print('Installation successful')"
```

**Version Conflicts**: If you have version conflicts with other packages:

```bash
pip install --upgrade syntha
```

**Permission Issues**: On some systems, you may need:

```bash
pip install --user syntha
```

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](troubleshooting.md)
2. Review the [GitHub Issues](https://github.com/syntha-ai/syntha/issues)
3. Run the verification script above
4. Check your Python version: `python --version`

## Next Steps

Now that Syntha is installed:

1. **Quick Start**: Follow the [Quick Start Guide](quick-start.md)
2. **Learn Concepts**: Read [Core Concepts](core-concepts.md)
3. **Try Examples**: Explore [Basic Usage Tutorial](../tutorials/basic-usage.md)
4. **Framework Integration**: Choose your [LLM framework integration](integrations/)

---

**Ready to build your first multi-agent system?** → [Quick Start Guide](quick-start.md)
