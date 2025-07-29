# Syntha SDK Documentation

This directory contains the complete documentation for the Syntha SDK, built with MkDocs and Material theme.

## 🌐 Live Documentation

The documentation is automatically deployed to GitHub Pages at:
**https://[your-username].github.io/syntha-sdk**

## Building the Documentation

### Prerequisites

- Python 3.9+
- pip

### Local Development

1. Install documentation dependencies:
```bash
# Option 1: Install specific packages
pip install mkdocs mkdocs-material mkdocstrings[python]

# Option 2: Install from requirements file
pip install -r requirements-docs.txt
```

2. Serve the documentation locally:
```bash
mkdocs serve
```

3. Open your browser to `http://localhost:8000`

### Building for Production

```bash
mkdocs build
```

The built documentation will be in the `site/` directory.

## 🚀 GitHub Pages Deployment

### Automatic Deployment

The documentation is automatically built and deployed to GitHub Pages when:
- You push changes to the `main` or `master` branch
- Changes are made to files in the `docs/` directory or `mkdocs.yml`
- You can also trigger deployment manually from the Actions tab

### Setup Instructions

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - The workflow will handle the rest

2. **First-time setup**:
   - Push this repository to GitHub
   - The workflow will automatically run and deploy your docs
   - Your documentation will be available at `https://[username].github.io/[repository-name]`

3. **Custom domain** (optional):
   - Add a `CNAME` file to the `docs/` directory with your domain
   - Configure DNS settings with your domain provider

### Workflow Features

- ✅ **Automatic builds** on documentation changes
- ✅ **Pull request previews** (builds but doesn't deploy)
- ✅ **Manual triggering** via GitHub Actions UI
- ✅ **Build verification** with strict mode
- ✅ **Optimized caching** for faster builds

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

## Contributing to Documentation

### Making Changes

1. Edit files in the `docs/` directory
2. Test locally with `mkdocs serve`
3. Commit and push your changes
4. GitHub Actions will automatically build and deploy

### Writing Guidelines

When updating documentation:

1. **Test all code examples** - Ensure they work as written
2. **Follow the established tone** - Clear, practical, not overly technical
3. **Include security warnings** where appropriate (use `!!! danger` blocks)
4. **Verify the build** with `mkdocs build --strict` before committing

### Code Example Standards

All code examples should be:
- **Copy-pasteable** and work immediately
- **Based on actual SDK code** (no made-up APIs)
- **Include imports** and setup code
- **Show expected output** where helpful

Example format:
```python
from syntha import ContextMesh

# Create context with user isolation (always required in production!)
context = ContextMesh(user_id="user123")

# Your example code here
context.push("example", "data")

# Show what happens
result = context.get("example", "agent")
print(result)  # Output: data

# Clean up
context.close()
```

## Troubleshooting

### Local Build Issues

**MkDocs not found:**
```bash
pip install --upgrade pip
pip install -r requirements-docs.txt
```

**Build errors:**
```bash
# Check for syntax errors
mkdocs build --strict

# Clean build
rm -rf site/
mkdocs build
```

### GitHub Pages Issues

**Workflow not running:**
- Check that GitHub Pages is enabled in repository settings
- Verify the workflow file is in `.github/workflows/docs.yml`
- Ensure you're pushing to `main` or `master` branch

**Build failing:**
- Check the Actions tab for error details
- Common issues: missing dependencies, syntax errors in markdown
- Test locally first with `mkdocs build --strict`

**Pages not updating:**
- GitHub Pages can take a few minutes to update
- Check the Actions tab to see if deployment completed
- Clear browser cache if needed

## Advanced Configuration

### Adding Plugins

To add MkDocs plugins:

1. Add to `requirements-docs.txt`
2. Update `mkdocs.yml` plugins section
3. Test locally before pushing

### Custom Themes

The current setup uses Material theme with custom configuration in `mkdocs.yml`. To modify:

1. Edit the `theme` section in `mkdocs.yml`
2. Add custom CSS in `docs/stylesheets/` if needed
3. Test thoroughly as theme changes can break layouts

### Analytics and SEO

Add Google Analytics or other tracking by updating the `mkdocs.yml` extra section:

```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

The documentation emphasizes practical usage over exhaustive API coverage, with working examples that users can immediately run.
