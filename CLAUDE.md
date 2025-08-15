# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-purpose personal website for Linji Wang with specialized sections for AI, Robotics, Software Development, and Reinforcement Learning. Built with Hugo and featuring context-aware resume generation.

## Quick Commands

### Development
```bash
# Start local server
hugo server -D

# Build for production
hugo --gc --minify

# Generate all resume versions
python3 scripts/build-contextual-resume.py --context all

# Generate specific resume
python3 scripts/build-contextual-resume.py --context ai    # AI-focused
python3 scripts/build-contextual-resume.py --context sde   # Software engineering
python3 scripts/build-contextual-resume.py --context robotics # Robotics
python3 scripts/build-contextual-resume.py --context rl    # Reinforcement learning
```

### Deployment
```bash
# Deploy to both domains (automatic on push to main)
git push origin main  # Triggers GitHub Actions for dual deployment
```

## Enhanced Project Structure

### Content Sections
```
/content/
├── ai/           # AI research section (purple theme)
├── robotics/     # Robotics section (orange theme)
├── sde/          # Software development (green theme)
├── rl/           # Reinforcement learning (red theme)
├── resume/       # Resume data and templates
├── post/         # Blog posts
└── project/      # Project showcases
```

### Configuration Files
```
/data/resume/
├── ai-focus.yaml       # AI resume configuration
├── sde-focus.yaml      # SDE resume configuration
├── robotics-focus.yaml # Robotics resume configuration
└── rl-focus.yaml       # RL resume configuration
```

### Scripts & Workflows
```
/scripts/
├── build-resume.py           # Basic resume builder
├── build-contextual-resume.py # Context-aware resume builder
└── setup-website.sh          # Setup helper

/.github/workflows/
├── deploy.yml          # GitHub Pages deployment
├── resume-generator.yml # Automated resume generation
└── validate.yml        # Content validation
```

## URL Structure

### Main Sections
- `linjiwang.com/` - Main portfolio
- `linjiwang.com/ai` - AI research focus
- `linjiwang.com/robotics` - Robotics projects
- `linjiwang.com/sde` - Software development
- `linjiwang.com/rl` - Reinforcement learning

### Resume Endpoints
- `/resume/ai` - AI-focused resume
- `/resume/sde` - SDE-focused resume
- `/resume/robotics` - Robotics resume
- `/resume/rl` - RL research resume

## Key Features

### 1. Context-Aware Resume System
- Single source of truth in YAML
- Generates role-specific versions
- Automatic PDF generation with LaTeX
- Web-friendly Markdown versions

### 2. Multi-Domain Deployment
- **Primary**: linjiwang.com (Netlify)
- **Secondary**: linjiw.github.io (GitHub Pages)
- Automatic deployment on push to main

### 3. Specialized Sections
Each section has:
- Custom theme colors
- Filtered content
- Specific resume version
- Tailored project emphasis

### 4. Content Validation
- Link checking
- Image size validation
- Hugo build verification
- Accessibility testing

## Development Workflow

### Adding New Content
```bash
# Create new post
hugo new post/my-post/index.md

# Create section-specific content
hugo new ai/projects/new-project.md
hugo new robotics/research/new-research.md
```

### Updating Resume
1. Edit `/content/resume/data.yaml` for base data
2. Edit `/data/resume/*-focus.yaml` for context-specific config
3. Run `python3 scripts/build-contextual-resume.py --context all`
4. Commit and push changes

### Testing
```bash
# Test locally
hugo server -D

# Validate content
find . -name "*.md" | xargs -I {} markdown-link-check {}

# Check build
hugo --gc --minify --buildDrafts
```

## Architecture Notes

### Technology Stack
- **SSG**: Hugo v0.108.0
- **Theme**: Wowchemy Academic (customized)
- **Resume**: Python + LaTeX/Pandoc
- **CI/CD**: GitHub Actions
- **Hosting**: Netlify + GitHub Pages

### Design System
| Section | Color | Focus |
|---------|-------|-------|
| Main | Blue | General |
| AI | Purple | Research |
| Robotics | Orange | Systems |
| SDE | Green | Software |
| RL | Red | Theory |

## Important Files
- `MASTER_DESIGN.md` - Complete architecture documentation
- `WORKFLOW_README.md` - Detailed workflow guide
- `WEBSITE_ARCHITECTURE.md` - Technical implementation details

## Maintenance Commands
```bash
# Update dependencies
hugo mod get -u

# Clean build cache
hugo mod clean

# Check for large files
find . -size +2M -type f

# Generate sitemap
hugo --gc --minify  # Automatically generates sitemap.xml
```