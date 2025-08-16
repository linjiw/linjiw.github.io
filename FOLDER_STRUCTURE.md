# Jekyll al-folio Folder Structure

## Essential Jekyll Directories (KEEP)

### Core Content Directories
- **`_pages/`** - Main website pages (about, cv, blog, projects, etc.)
  - Status: ✅ KEEP - Contains main navigation pages
  
- **`_posts/`** - Blog posts directory
  - Status: ✅ KEEP - Empty but ready for future blog posts
  
- **`_projects/`** - Project portfolio entries
  - Status: ✅ KEEP - Contains 3 configured projects
  
- **`_news/`** - News/announcements
  - Status: ✅ KEEP - Empty but ready for future announcements

### Data & Configuration
- **`_data/`** - Site data files (CV, repositories, social links)
  - Status: ✅ KEEP - Contains essential site data
  - Files: cv.yml, repositories.yml, socials.yml, venues.yml, coauthors.yml

- **`_bibliography/`** - BibTeX files for publications
  - Status: ✅ KEEP - Contains papers.bib for academic publications

### Theme & Layout
- **`_layouts/`** - Page templates
  - Status: ✅ KEEP - Essential Jekyll layouts (12 files)
  
- **`_includes/`** - Reusable components
  - Status: ✅ KEEP - Essential includes for CV, citations, etc. (25 files)
  
- **`_sass/`** - Stylesheet source files
  - Status: ✅ KEEP - Theme styling (10 files including Font Awesome)

### Assets & Resources
- **`assets/`** - Static files (CSS, JS, images, fonts)
  - Status: ✅ KEEP - Essential assets (13 subdirectories)
  - Contains: audio, bibliography, css, fonts, html, img, js, json, jupyter, pdf, plotly, video, webfonts

### Jekyll Plugins
- **`_plugins/`** - Ruby plugins for Jekyll
  - Status: ✅ KEEP - Essential plugins for bibliography, caching, etc. (9 files)

- **`_scripts/`** - JavaScript for analytics and search
  - Status: ✅ KEEP - Frontend scripts (5 files)

## Configuration Files (Root)
- **`_config.yml`** - Main Jekyll configuration
- **`Gemfile`** - Ruby dependencies
- **`Gemfile.lock`** - Locked dependency versions
- **`.gitignore`** - Git ignore rules
- **`LICENSE`** - MIT license
- **`README.md`** - Repository documentation
- **`CLAUDE.md`** - Claude AI instructions
- **`FOLDER_STRUCTURE.md`** - This file

## Summary

All remaining directories are **ESSENTIAL** for the Jekyll al-folio theme to function properly. The structure is:
- **Clean**: No redundant or duplicate folders
- **Organized**: Standard Jekyll structure
- **Ready**: Set up for academic portfolio with blog, projects, CV, and publications

Total directories: 13 (all necessary)
Status: ✅ **OPTIMAL STRUCTURE - NO FURTHER CLEANUP NEEDED**