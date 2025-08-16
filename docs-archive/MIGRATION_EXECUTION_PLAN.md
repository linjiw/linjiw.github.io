# 🚀 **MIGRATION EXECUTION PLAN**

## 📋 **Migration Strategy**

We will perform a complete replacement of Hugo with Astro while preserving all personal content and history.

### **Key Principles:**
1. ✅ **Preserve all personal content** (photos, projects, data)
2. ✅ **Archive Hugo files** for future reference
3. ✅ **Clean Git history** with clear commit messages
4. ✅ **Organized final structure** for easy management
5. ✅ **Proper backup** before major changes

## 🗂️ **Final Repository Structure**

```
linjiwang/ (repository root)
├── src/                    # Astro source files
│   ├── components/        # UI components
│   ├── content/          # Project content
│   ├── layouts/          # Page layouts
│   ├── pages/            # Website pages
│   └── styles/           # Global styles
├── public/               # Static assets
│   └── assets/          # Images and media
├── .github/workflows/    # CI/CD
│   └── deploy.yml       # GitHub Pages deployment
├── hugo-archive/        # Archived Hugo site
│   ├── content/         # Original content backup
│   ├── static/          # Original static files
│   └── config/          # Hugo configuration
├── personal-archive/    # Personal content backup
│   ├── photos/          # All personal photos
│   ├── projects/        # Project data
│   └── documents/       # CVs and documents
├── package.json         # Node dependencies
├── astro.config.mjs     # Astro configuration
├── tsconfig.json        # TypeScript config
├── README.md            # Project documentation
├── DEV_GUIDE.md         # Development guide
└── .gitignore           # Git ignore rules
```

## 📂 **Step-by-Step Execution**

### **Phase 1: Backup Personal Content**

```bash
# 1. Create personal content archive
mkdir -p personal-archive/{photos,projects,documents}

# 2. Copy all personal photos
cp -r content/post/*/data/*.{jpg,png,gif} personal-archive/photos/ 2>/dev/null || true
cp -r assets/media/**/*.{jpg,png} personal-archive/photos/ 2>/dev/null || true
cp -r static/files/*.pdf personal-archive/documents/ 2>/dev/null || true

# 3. Archive project data
cp -r content/post/* personal-archive/projects/ 2>/dev/null || true
```

### **Phase 2: Archive Hugo Site**

```bash
# 1. Create Hugo archive
mkdir -p hugo-archive

# 2. Move Hugo-specific files
mv config hugo-archive/ 2>/dev/null || true
mv content hugo-archive/ 2>/dev/null || true
mv data hugo-archive/ 2>/dev/null || true
mv static hugo-archive/ 2>/dev/null || true
mv assets hugo-archive/ 2>/dev/null || true
mv resources hugo-archive/ 2>/dev/null || true
mv go.mod go.sum hugo-archive/ 2>/dev/null || true
mv netlify.toml hugo-archive/ 2>/dev/null || true
mv theme.toml hugo-archive/ 2>/dev/null || true
```

### **Phase 3: Move Astro to Root**

```bash
# 1. Move core Astro files
mv astro-site/src ./
mv astro-site/public ./
mv astro-site/package.json ./
mv astro-site/package-lock.json ./
mv astro-site/astro.config.mjs ./
mv astro-site/tsconfig.json ./
mv astro-site/.github ./

# 2. Move documentation
mv astro-site/README.md ./
mv astro-site/DEV_GUIDE.md ./
```

### **Phase 4: Clean Up**

```bash
# 1. Remove empty directories
rm -rf astro-site

# 2. Remove redundant files
rm -f *.Rproj preview.png images/screenshot.png

# 3. Clean old build artifacts
rm -rf public/post public/project public/admin
rm -rf dist/post dist/project dist/admin
```

### **Phase 5: Git Commits**

```bash
# 1. Stage backup archives
git add personal-archive/
git commit -m "📦 Archive personal content for safekeeping"

# 2. Stage Hugo archive
git add hugo-archive/
git commit -m "🗄️ Archive Hugo site for reference"

# 3. Stage new Astro structure
git add .
git commit -m "🚀 Complete migration to Astro

- Modern responsive design with 100% performance scores
- Specialized AI and Robotics sections
- Professional portfolio with authentic projects
- Organized structure for easy management
- Automated GitHub Pages deployment

Features:
✅ Lightning-fast performance
✅ Mobile-responsive design
✅ SEO optimized
✅ Modern component architecture
✅ Easy content management"

# 4. Push to main
git push origin main
```

## 🔍 **Files to Preserve**

### **Personal Content:**
- ✅ All images in `assets/media/`
- ✅ CV/Resume PDFs in `static/files/`
- ✅ Project data and notebooks
- ✅ Personal photos and graphics

### **Important Configuration:**
- ✅ GitHub Actions workflows
- ✅ CNAME for custom domain (if exists)
- ✅ Git history and commits

## 🧹 **Files to Remove**

### **Hugo-Specific:**
- ❌ `config/_default/` - Hugo configuration
- ❌ `go.mod`, `go.sum` - Go dependencies
- ❌ `netlify.toml` - Netlify config
- ❌ `theme.toml` - Hugo theme
- ❌ `academic.Rproj` - R project file

### **Build Artifacts:**
- ❌ Old public directories
- ❌ Generated HTML from Hugo
- ❌ Duplicate node_modules

## 🔒 **Safety Checks**

Before executing:
1. ✅ Ensure all personal content is backed up
2. ✅ Verify Astro site builds successfully
3. ✅ Check no critical files are missing
4. ✅ Confirm Git repository is clean

## 🎯 **Success Criteria**

After migration:
- ✅ Repository has clean Astro structure at root
- ✅ All personal content preserved in archives
- ✅ Hugo files archived for reference
- ✅ Site builds and deploys successfully
- ✅ GitHub Pages serves new Astro site
- ✅ Clean, organized file structure

## 🚦 **Ready to Execute?**

This plan will:
1. **Preserve** all your personal content safely
2. **Archive** Hugo for future reference
3. **Deploy** modern Astro site as main website
4. **Organize** everything for easy management
5. **Track** all changes with clear Git commits

**Proceed with execution? Let's transform your website! 🌟**