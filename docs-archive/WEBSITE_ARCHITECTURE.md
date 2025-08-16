# Website Architecture & Workflow Design

## Current State Analysis
- **Primary Domain**: linjiwang.com (via Netlify)
- **GitHub Repo**: github.com/linjiw/linjiwang
- **Static Generator**: Hugo with Wowchemy Academic theme
- **Deployment**: Netlify (automatic on push to main)
- **Resume Management**: Manual PDF uploads in `/static/files/`

## Proposed Architecture

### 1. Multi-Domain Strategy
```
┌─────────────────┐
│   GitHub Repo   │
│  (Source Code)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────────┐ ┌──────────┐
│ Netlify  │ │  GitHub  │
│  Pages   │ │  Pages   │
└──────────┘ └──────────┘
     │            │
     ▼            ▼
linjiwang.com  linjiw.github.io/linjiwang
```

### 2. Automated Workflow Features

#### A. Resume Generation Pipeline
- **Source**: Markdown/YAML file with structured data
- **Output**: Auto-generated PDF via LaTeX/Pandoc
- **Versioning**: Tagged releases with date stamps
- **Distribution**: Automatic upload to both domains

#### B. Content Management
- **Blog Posts**: Markdown with auto-generated TOC
- **Projects**: Jupyter notebook rendering
- **Gallery**: Automated image optimization
- **Updates**: RSS feed generation

#### C. Version Control
- **Production Branch**: `main` (stable release)
- **Development Branch**: `dev` (staging)
- **Feature Branches**: For major updates
- **Tag System**: Semantic versioning (v1.0.0)

### 3. GitHub Actions Workflows

#### Workflow 1: Build & Deploy
- Triggers on push to main
- Builds Hugo site
- Deploys to GitHub Pages
- Syncs with Netlify

#### Workflow 2: Resume Generation
- Triggers on resume source update
- Generates PDF from Markdown/LaTeX
- Creates timestamped versions
- Updates download links

#### Workflow 3: Content Validation
- Checks broken links
- Validates image sizes
- Lints markdown files
- Runs accessibility tests

### 4. Directory Structure Enhancement
```
linjiwang/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml
│   │   ├── resume-gen.yml
│   │   └── validate.yml
│   └── ISSUE_TEMPLATE/
├── content/
│   ├── resume/
│   │   ├── data.yaml      # Structured resume data
│   │   └── template.tex   # LaTeX template
│   └── ...
├── scripts/
│   ├── build-resume.sh
│   └── optimize-images.sh
├── versions/
│   └── resume/
│       └── archives/      # Historical CV versions
└── public/                # Generated site
```

### 5. Feature Implementation

#### Resume System
- Single source of truth (YAML/Markdown)
- Multiple output formats (PDF, HTML, DOCX)
- Automatic versioning with timestamps
- One-click download from website

#### Multi-Version Support
- Language variants (EN/CN)
- Academic vs Industry versions
- Short vs Detailed formats
- Project-specific CVs

#### Analytics & Monitoring
- Google Analytics integration
- Download tracking for resume
- Page view statistics
- Error monitoring

## Implementation Timeline
1. **Phase 1**: GitHub Actions setup (Week 1)
2. **Phase 2**: Resume automation (Week 2)
3. **Phase 3**: Multi-domain deployment (Week 3)
4. **Phase 4**: Testing & optimization (Week 4)