# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

Personal academic website for Linji Wang built with Jekyll using the al-folio theme - a simple, clean, and responsive Jekyll theme for academics.

**Website URL**: https://linjiw.github.io/  
**Repository**: https://github.com/linjiw/linjiw.github.io

## Quick Commands

### Development
```bash
# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Sync publications from BibTeX to resume and CV
python3 scripts/sync_publications.py
```

### Deployment
```bash
# Deploy to GitHub Pages (automatic on push to main)
git push origin main
```

## Project Structure

```
/
├── _bibliography/     # BibTeX files for publications (SOURCE OF TRUTH)
├── _data/            # Site data (CV, repositories, etc.)
├── _includes/        # Reusable components
├── _layouts/         # Page templates
├── _news/            # News/announcements
├── _pages/           # Main pages
├── _posts/           # Blog posts
├── _projects/        # Project pages
├── _sass/            # Stylesheets
├── assets/           # Static assets (images, css, js)
│   └── json/         # Contains resume.json (synced from BibTeX)
├── scripts/          # Utility scripts
│   └── sync_publications.py  # Syncs publications across site
├── _config.yml       # Jekyll configuration
└── Gemfile          # Ruby dependencies
```

## Key Features

- **Publications**: Auto-generated from BibTeX in `_bibliography/`
- **Projects**: Portfolio items in `_projects/`
- **Blog**: Posts in `_posts/`
- **CV**: Data-driven from `_data/cv.yml` or `assets/json/resume.json`
- **Dark/Light Mode**: Automatic theme switching
- **Responsive Design**: Mobile-first approach
- **Publication Sync**: Automatic syncing from BibTeX to resume and CV

## Content Management

### Publications Synchronization

The site maintains publication data in multiple formats for different purposes:
- **Source of Truth**: `_bibliography/papers.bib` (BibTeX format)
- **Resume**: `assets/json/resume.json` (JSON Resume format)
- **CV Page**: `_pages/cv.md` (Markdown format)

To sync publications across all formats:
```bash
python3 scripts/sync_publications.py
```

This script:
1. Parses the BibTeX file
2. Updates resume.json with formatted publications
3. Updates the CV page with publication list
4. Generates a reference markdown file

### Adding a Blog Post
```bash
# Create new post with date prefix
touch _posts/YYYY-MM-DD-post-title.md
```

### Adding a Project
```bash
# Create new project (numbered for ordering)
touch _projects/N_project_name.md
```

### Updating CV
- Edit `_data/cv.yml` for YAML format
- Or edit `assets/json/resume.json` for JSON format
- Run `python3 scripts/sync_publications.py` after updating publications in BibTeX

### Adding Publications
- Add BibTeX entries to `_bibliography/papers.bib`
- Run `python3 scripts/sync_publications.py` to sync to resume and CV
- Supports PDF, code, slides, poster links via BibTeX fields

## Configuration

Main settings in `_config.yml`:
- Site title, description, URL
- Author information
- Social media links
- Google Analytics
- Theme colors

## Deployment

The site automatically deploys to GitHub Pages when pushing to the main branch.

## Current Content Status

### Publications (`_bibliography/papers.bib`)
Current papers with preview images:
- **II-NVM** (2025) - Enhanced SLAM mapping with normal vectors → `II-NVM.png`
- **DDP** (2025) - Decremental Dynamics Planning → `DDP.png` [IROS 2025 Accepted]
- **GACL** (2025) - Grounded Adaptive Curriculum Learning → `GACL.png` [IROS 2025 Accepted]
- **RTW** (2025) - Reward Training Wheels → `RTW.png` [IROS 2025 Accepted]

### Projects (`_projects/`)
1. **RL for Robotic Manipulation** - Links to GACL & RTW papers
2. **Robot Navigation with Dynamics Planning** - Links to DDP paper
3. **Enhanced SLAM with Normal Vectors** - Links to II-NVM paper

### Publication Preview Images
Located in `assets/img/publication_preview/`:
- DDP.png
- GACL.png
- II-NVM.png
- RTW.png
- brownian-motion.gif (available for use)
- wave-mechanics.gif (available for use)

## Important Configuration Notes

### GitHub Pages Setup
- **Repository Name**: Must be `linjiw.github.io` for user site
- **Base URL**: Leave empty in `_config.yml` (no subpath needed)
- **Deployment**: Automatic via GitHub Actions on push to main branch

### Key Files to Remember
- `_config.yml`: Main site configuration (URL, baseurl, etc.)
- `_bibliography/papers.bib`: All publications in BibTeX format (SOURCE OF TRUTH)
- `_projects/*.md`: Individual project pages with `related_publications` field
- `assets/json/resume.json`: Resume data in JSON Resume format (auto-synced)
- `_data/cv.yml`: Alternative CV data location
- `_pages/cv.md`: CV page (auto-updated with publications)
- `scripts/sync_publications.py`: Script to sync publications across formats

## Recent Updates (August 2025)

1. **Repository Migration**: Renamed from `linjiwang` to `linjiw.github.io` for cleaner URL
2. **Publication Previews**: Added preview images for all papers
3. **Project Updates**: Aligned projects with actual publications
4. **Resume Integration**: Updated with actual experience including Amazon SDE internship
5. **Base URL Fix**: Corrected baseurl configuration for proper GitHub Pages deployment
6. **Publication Sync**: Created automatic sync mechanism for publications across BibTeX, resume.json, and CV page
7. **IROS 2025 Updates**: Updated GACL status from submitted to accepted at IROS 2025

## Important Notes

- This is a Jekyll site, not Hugo or Astro
- Uses al-folio theme (MIT licensed)
- Optimized for academic portfolios
- Publication previews should be square images for best display
- The site supports both light and dark modes automatically
- Publications are synced automatically from BibTeX to other formats
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.