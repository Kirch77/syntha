# GitHub Pages Setup Guide

This guide will help you set up automatic documentation deployment to GitHub Pages for your Syntha SDK documentation.

## Quick Setup (5 minutes)

### Step 1: Push to GitHub

1. Make sure all your documentation files are committed:
```bash
git add .
git commit -m "Add MkDocs documentation with GitHub Pages workflow"
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (in the repository menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. Click **Save**

That's it! The workflow will automatically run and deploy your documentation.

### Step 3: Access Your Documentation

After the workflow completes (usually 2-3 minutes):
- Your docs will be available at: `https://[your-username].github.io/[repository-name]`
- You can find the exact URL in the Pages settings or workflow output

## What Happens Automatically

✅ **On every push to main/master:**
- Documentation is built with MkDocs
- Static files are deployed to GitHub Pages
- Your live docs are updated

✅ **On pull requests:**
- Documentation is built to check for errors
- No deployment happens (keeps main site stable)

✅ **Manual deployment:**
- Go to Actions tab → "Deploy Documentation" → "Run workflow"

## Troubleshooting

### Workflow Not Running?

**Check the workflow file exists:**
```bash
ls -la .github/workflows/docs.yml
```

**Verify GitHub Pages setting:**
- Repository Settings → Pages → Source should be "GitHub Actions"

### Build Failing?

**Test locally first:**
```bash
pip install -r requirements-docs.txt
mkdocs build --strict
```

**Check the error in GitHub:**
- Go to Actions tab
- Click on the failed workflow
- Check the build logs for specific errors

### Common Issues

**"Permission denied" errors:**
- The workflow has the correct permissions set
- Make sure your repository allows GitHub Actions

**"Page not found" after deployment:**
- Wait 5-10 minutes for GitHub's CDN to update
- Check that the workflow completed successfully
- Clear your browser cache

**Custom domain not working:**
- Add a `CNAME` file to your `docs/` directory containing your domain
- Configure DNS with your domain provider
- Allow 24-48 hours for DNS propagation

## Advanced Configuration

### Custom Domain

1. Add a `CNAME` file to your `docs/` directory:
```bash
echo "docs.yourcompany.com" > docs/CNAME
```

2. Configure DNS at your domain provider:
```
Type: CNAME
Name: docs (or your subdomain)
Value: [your-username].github.io
```

### Branch Protection

If you have branch protection on main/master:
1. Go to Settings → Branches
2. Edit the protection rule
3. Under "Restrict pushes that create files", allow the GitHub Actions bot

### Multiple Environments

You can modify the workflow to deploy different branches to different environments:

```yaml
# In .github/workflows/docs.yml
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  # Deploy to staging environment

- name: Deploy to production  
  if: github.ref == 'refs/heads/main'
  # Deploy to production environment
```

## Monitoring

### Check Deployment Status

1. **Actions Tab**: See all workflow runs and their status
2. **Environments**: Repository → Environments → github-pages shows deployment history
3. **Pages Settings**: Shows current deployment status and URL

### Notifications

GitHub will automatically:
- Show status checks on pull requests
- Send email notifications on workflow failures (if enabled)
- Update commit status indicators

## Security

The workflow uses minimal permissions:
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for Pages deployment

No secrets or tokens are needed - GitHub handles authentication automatically.

---

**Need help?** Check the [main README](README.md) for more detailed troubleshooting or open an issue in the repository.