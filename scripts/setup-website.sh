#!/bin/bash

# Setup script for enhanced website workflow
# This script demonstrates the new features and organization

echo "🚀 Setting up enhanced website workflow..."

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p content/resume
mkdir -p static/files/resume-versions
mkdir -p scripts
mkdir -p .github/workflows

# Check for Hugo installation
if ! command -v hugo &> /dev/null; then
    echo "⚠️  Hugo is not installed. Please install it first:"
    echo "   brew install hugo"
    echo "   or visit: https://gohugo.io/installation/"
    exit 1
fi

# Check Python dependencies
echo "📦 Checking Python dependencies..."
if command -v python3 &> /dev/null; then
    echo "✓ Python3 found"
    
    # Install required packages
    pip3 install pyyaml jinja2 markdown || {
        echo "⚠️  Failed to install Python packages. Try:"
        echo "   pip3 install --user pyyaml jinja2 markdown"
    }
else
    echo "⚠️  Python3 not found. Please install Python 3.x"
fi

# Make scripts executable
chmod +x scripts/build-resume.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Available Commands:"
echo "  1. Build website locally:"
echo "     hugo server -D"
echo ""
echo "  2. Generate resume (requires LaTeX):"
echo "     python3 scripts/build-resume.py"
echo ""
echo "  3. Build for production:"
echo "     hugo --gc --minify"
echo ""
echo "🌐 Deployment:"
echo "  - Push to main branch → Auto-deploy to Netlify (linjiwang.com)"
echo "  - GitHub Actions will deploy to GitHub Pages (linjiw.github.io/linjiwang)"
echo ""
echo "📝 To update resume:"
echo "  1. Edit: content/resume/data.yaml"
echo "  2. Run: python3 scripts/build-resume.py"
echo "  3. Commit and push changes"
echo ""
echo "🔄 GitHub Actions Workflows:"
echo "  - deploy.yml: Dual deployment to Netlify & GitHub Pages"
echo "  - resume-generator.yml: Auto-generate resume PDFs"
echo "  - validate.yml: Content validation and link checking"