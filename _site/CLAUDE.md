# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Repository Overview

Personal academic website for Linji Wang built with Jekyll using the al-folio theme - a simple, clean, and responsive Jekyll theme for academics.

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

## Important Notes

- This is a Jekyll site, not Hugo or Astro
- Uses al-folio theme (MIT licensed)
- Optimized for academic portfolios
- Includes example content that should be customized