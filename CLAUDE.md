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
```

### Deployment
```bash
# Deploy to GitHub Pages (automatic on push to main)
git push origin main
```

## Project Structure

```
/
├── _bibliography/     # BibTeX files for publications
├── _data/            # Site data (CV, repositories, etc.)
├── _includes/        # Reusable components
├── _layouts/         # Page templates
├── _news/            # News/announcements
├── _pages/           # Main pages
├── _posts/           # Blog posts
├── _projects/        # Project pages
├── _sass/            # Stylesheets
├── assets/           # Static assets (images, css, js)
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

## Content Management

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

### Adding Publications
- Add BibTeX entries to `_bibliography/papers.bib`
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
- **DDP** (2025) - Decremental Dynamics Planning → `DDP.png`
- **GACL** (2025) - Grounded Adaptive Curriculum Learning → `GACL.png`
- **RTW** (2025) - Reward Training Wheels → `RTW.png`

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
- `_bibliography/papers.bib`: All publications in BibTeX format
- `_projects/*.md`: Individual project pages with `related_publications` field
- `assets/json/resume.json`: Resume data in JSON Resume format
- `_data/cv.yml`: Alternative CV data location

## Recent Updates (August 2025)

1. **Repository Migration**: Renamed from `linjiwang` to `linjiw.github.io` for cleaner URL
2. **Publication Previews**: Added preview images for all papers
3. **Project Updates**: Aligned projects with actual publications
4. **Resume Integration**: Updated with actual experience including Amazon SDE internship
5. **Base URL Fix**: Corrected baseurl configuration for proper GitHub Pages deployment

## Important Notes

- This is a Jekyll site, not Hugo or Astro
- Uses al-folio theme (MIT licensed)
- Optimized for academic portfolios
- Publication previews should be square images for best display
- The site supports both light and dark modes automatically