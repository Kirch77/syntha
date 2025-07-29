# Syntha SDK Documentation

This directory contains the complete documentation for the Syntha SDK, built with MkDocs and Material theme.

## Building the Documentation

### Prerequisites

- Python 3.9+
- pip

### Setup

1. Install MkDocs and required plugins:
```bash
pip install mkdocs mkdocs-material mkdocstrings[python]
```

2. Build and serve the documentation:
```bash
mkdocs serve
```

3. Open your browser to `http://localhost:8000`

### Building for Production

```bash
mkdocs build
```

The built documentation will be in the `site/` directory.

## Documentation Structure

- **Home**: Engaging introduction to the problem and solution
- **Core Concepts**: Architecture and design principles
- **Installation**: Getting started guide
- **API Reference**: Complete API documentation
  - ContextMesh API
  - Tools API  
  - Prompts API
  - Persistence API
  - Tool Schemas
- **Guides**: Practical tutorials
  - Overview
  - Basics
  - Context Management
  - Tools & Permissions
  - Final Remarks

## Features

- All code examples are tested and ready to copy/paste
- Comprehensive API reference generated from actual code
- Security best practices throughout
- Production deployment guidance
- Framework-agnostic examples

## Contributing

When updating documentation:

1. Ensure all code examples work as written
2. Follow the established tone (clear, practical, not overly technical)
3. Include security warnings where appropriate
4. Test the build with `mkdocs serve`

The documentation emphasizes practical usage over exhaustive API coverage, with working examples that users can immediately run.
