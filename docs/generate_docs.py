#!/usr/bin/env python3
"""
Simple documentation generator for Syntha SDK
Converts Markdown files to HTML with navigation
"""

import os
import markdown
import re
from pathlib import Path

def generate_navigation(docs_dir):
    """Generate navigation HTML from directory structure"""
    nav_html = """
    <nav class="sidebar">
        <div class="logo">
            <h2>Syntha SDK</h2>
        </div>
        <div class="nav-section">
            <h3>Getting Started</h3>
            <ul>
                <li><a href="guides/installation.html">Installation</a></li>
                <li><a href="guides/quick-start.html">Quick Start</a></li>
                <li><a href="guides/core-concepts.html">Core Concepts</a></li>
            </ul>
        </div>
        <div class="nav-section">
            <h3>Tutorials</h3>
            <ul>
                <li><a href="tutorials/basic-usage.html">Basic Usage</a></li>
                <li><a href="tutorials/agent-communication.html">Agent Communication</a></li>
                <li><a href="tutorials/context-management.html">Context Management</a></li>
            </ul>
        </div>
        <div class="nav-section">
            <h3>API Reference</h3>
            <ul>
                <li><a href="api/context-mesh.html">ContextMesh</a></li>
                <li><a href="api/tool-handler.html">ToolHandler</a></li>
                <li><a href="api/prompt-builders.html">Prompt Builders</a></li>
                <li><a href="api/tool-schemas.html">Tool Schemas</a></li>
            </ul>
        </div>
        <div class="nav-section">
            <h3>Advanced</h3>
            <ul>
                <li><a href="guides/performance.html">Performance</a></li>
                <li><a href="guides/security.html">Security</a></li>
                <li><a href="guides/best-practices.html">Best Practices</a></li>
            </ul>
        </div>
        <div class="nav-section">
            <h3>Examples</h3>
            <ul>
                <li><a href="examples/ecommerce.html">E-commerce Platform</a></li>
            </ul>
        </div>
    </nav>
    """
    return nav_html

def generate_css():
    """Generate CSS for documentation"""
    return """
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            display: flex;
            min-height: 100vh;
        }
        
        .sidebar {
            width: 280px;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            overflow-y: auto;
            position: fixed;
            height: 100vh;
        }
        
        .sidebar .logo h2 {
            color: #3498db;
            margin-bottom: 30px;
            font-size: 1.5em;
        }
        
        .nav-section {
            margin-bottom: 25px;
        }
        
        .nav-section h3 {
            color: #bdc3c7;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        
        .nav-section ul {
            list-style: none;
        }
        
        .nav-section ul li {
            margin-bottom: 5px;
        }
        
        .nav-section ul li a {
            color: #ecf0f1;
            text-decoration: none;
            padding: 5px 10px;
            display: block;
            border-radius: 3px;
            transition: background-color 0.3s;
        }
        
        .nav-section ul li a:hover {
            background-color: #34495e;
            color: #3498db;
        }
        
        .content {
            flex: 1;
            margin-left: 280px;
            padding: 40px;
            max-width: 1000px;
        }
        
        .content h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        
        .content h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        
        .content h3 {
            color: #7f8c8d;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        
        .content pre {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;
            padding: 15px;
            overflow-x: auto;
            margin: 15px 0;
        }
        
        .content code {
            background-color: #f8f9fa;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.9em;
        }
        
        .content pre code {
            background-color: transparent;
            padding: 0;
        }
        
        .content blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            margin: 15px 0;
            color: #7f8c8d;
        }
        
        .content table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .content table th,
        .content table td {
            border: 1px solid #dee2e6;
            padding: 8px 12px;
            text-align: left;
        }
        
        .content table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        .content a {
            color: #3498db;
            text-decoration: none;
        }
        
        .content a:hover {
            text-decoration: underline;
        }
        
        .content ul, .content ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        .content li {
            margin-bottom: 5px;
        }
        
        .breadcrumb {
            background-color: #e9ecef;
            padding: 10px 20px;
            margin: -40px -40px 30px -40px;
            border-bottom: 1px solid #dee2e6;
        }
        
        .breadcrumb a {
            color: #6c757d;
            text-decoration: none;
        }
        
        .breadcrumb a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .sidebar {
                width: 100%;
                position: relative;
                height: auto;
            }
            
            .content {
                margin-left: 0;
                padding: 20px;
            }
        }
    </style>
    """

def convert_markdown_links(content):
    """Convert .md links to .html links"""
    # Convert relative markdown links to html links
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\.md\)', r'[\1](\2.html)', content)
    return content

def generate_html_page(md_content, title, current_path=""):
    """Generate complete HTML page from markdown content"""
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['codehilite', 'tables', 'toc'])
    html_content = md.convert(convert_markdown_links(md_content))
    
    # Generate breadcrumb
    breadcrumb = ""
    if current_path:
        parts = current_path.split('/')
        breadcrumb = '<div class="breadcrumb">'
        breadcrumb += '<a href="../index.html">Home</a>'
        for i, part in enumerate(parts[:-1]):
            breadcrumb += f' > <a href="../{"/".join(parts[:i+1])}">{part.title()}</a>'
        breadcrumb += f' > {parts[-1].replace(".html", "").replace("-", " ").title()}'
        breadcrumb += '</div>'
    
    nav_html = generate_navigation("docs")
    css = generate_css()
    
    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{title} - Syntha SDK Documentation</title>
        {css}
    </head>
    <body>
        <div class="container">
            {nav_html}
            <main class="content">
                {breadcrumb}
                {html_content}
            </main>
        </div>
    </body>
    </html>
    """
    
    return html_template

def process_directory(input_dir, output_dir):
    """Process all markdown files in a directory"""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    # Create output directory
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Process all .md files
    for md_file in input_path.rglob("*.md"):
        # Skip if it's not a markdown file
        if not md_file.suffix == '.md':
            continue
            
        # Read markdown content
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Generate title from filename
        title = md_file.stem.replace('-', ' ').title()
        if md_file.name == 'README.md':
            title = "Syntha SDK Documentation"
        
        # Calculate relative path for breadcrumb
        rel_path = md_file.relative_to(input_path)
        current_path = str(rel_path).replace('\\', '/').replace('.md', '.html')
        
        # Generate HTML
        html_content = generate_html_page(md_content, title, current_path)
        
        # Create output file path
        html_file = output_path / rel_path.with_suffix('.html')
        html_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Write HTML file
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"Generated: {html_file}")
    
    # Create index.html from README.md
    readme_path = output_path / 'README.html'
    if readme_path.exists():
        index_path = output_path / 'index.html'
        readme_path.rename(index_path)
        print(f"Created index.html from README.html")

def main():
    """Main function"""
    docs_dir = "."
    output_dir = "html"
    
    print("Generating HTML documentation...")
    process_directory(docs_dir, output_dir)
    print(f"Documentation generated in '{output_dir}' directory")
    print(f"Open '{output_dir}/index.html' in your browser to view the documentation")

if __name__ == "__main__":
    main()
