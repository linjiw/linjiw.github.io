# 🚀 **Development Guide: Astro Personal Website**

## 📁 **Project Structure**

```
astro-site/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Hero.astro       # Homepage hero section
│   │   ├── Skills.astro     # Skills showcase
│   │   ├── Nav.astro        # Navigation bar
│   │   └── ...              # Other components
│   ├── content/             # Markdown content
│   │   └── work/            # Project portfolio
│   │       ├── gan-cats.md  # AI projects
│   │       ├── rl-curriculum-robotics.md  # Robotics projects
│   │       └── ...          # More projects
│   ├── layouts/
│   │   └── BaseLayout.astro # Main page layout
│   ├── pages/               # Website pages
│   │   ├── index.astro      # Homepage
│   │   ├── ai.astro         # AI research section
│   │   ├── robotics.astro   # Robotics section
│   │   ├── about.astro      # About page
│   │   └── work.astro       # All projects page
│   └── styles/
│       └── global.css       # Global styles
├── public/                  # Static assets
│   ├── assets/              # Images and media
│   └── favicon.svg          # Site icon
├── .github/workflows/       # CI/CD automation
│   └── deploy.yml           # GitHub Pages deployment
├── package.json             # Dependencies and scripts
├── astro.config.mjs         # Astro configuration
└── tsconfig.json            # TypeScript config
```

## 🛠️ **Development Commands**

### **Quick Start**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# ➜ Open http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Development Workflow**
```bash
# 1. Start development server
npm run dev

# 2. Make changes to files in src/
# 3. See changes automatically in browser

# 4. Build and test before deploying
npm run build && npm run preview
```

## ✏️ **Adding New Content**

### **Adding a New Project**

1. **Create new markdown file** in `src/content/work/`:
```bash
# Example: src/content/work/my-new-project.md
```

2. **Use this template:**
```markdown
---
title: "Your Project Title"
publishDate: 2024-01-15 00:00:00
img: /assets/project-image.jpg
img_alt: "Description of your project image"
description: |
  Brief description of what this project does and its key features.
tags:
  - Technology 1
  - Technology 2
  - Technology 3
category: ai  # Options: ai, robotics, sde, rl
---

## Project Overview
Your detailed project description here...

## Technical Implementation
Details about how you built it...

## Results and Impact
What you achieved and learned...
```

3. **Add project image** to `public/assets/`
4. **The project will automatically appear** on your website!

### **Adding a New Section Page**

1. **Create new page** in `src/pages/`:
```bash
# Example: src/pages/new-section.astro
```

2. **Use existing pages as templates** (copy from `ai.astro` or `robotics.astro`)
3. **Filter projects by category** in the page:
```astro
const sectionProjects = allProjects.filter(project => 
  project.data.category === 'your-category'
);
```

### **Updating Personal Information**

**Homepage (`src/pages/index.astro`):**
- Update Hero component with your latest title/tagline
- Modify Skills component for your expertise areas
- Update project showcase sections

**About Page (`src/pages/about.astro`):**
- Update background section
- Add new education entries
- Update skills and experience

**Navigation (`src/components/Nav.astro`):**
- Add new section links
- Update menu structure

## 🎨 **Customizing Design**

### **Colors and Themes**
Edit `src/styles/global.css`:
```css
:root {
  --accent-regular: #3b82f6;    /* Primary accent color */
  --accent-dark: #1e40af;       /* Darker accent */
  --gray-0: #ffffff;            /* Light text */
  --gray-999: #111827;          /* Dark backgrounds */
}
```

### **Typography**
Update font families and sizes in `global.css`:
```css
html {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### **Component Styling**
Each `.astro` file has its own `<style>` section:
```astro
<style>
  .my-component {
    background: var(--accent-regular);
    padding: 2rem;
  }
</style>
```

## 📱 **Responsive Design**

All components use mobile-first approach:
```css
/* Mobile first (default) */
.container {
  display: flex;
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 50em) {
  .container {
    flex-direction: row;
  }
}
```

## 📊 **SEO and Performance**

### **Meta Tags**
Update in `src/layouts/BaseLayout.astro`:
```astro
<meta name="description" content="Your site description">
<meta property="og:title" content="Your Name - AI Researcher">
<meta property="og:description" content="Your description">
```

### **Images**
- **Optimize images** before adding to `public/assets/`
- **Use WebP format** when possible
- **Include alt text** for accessibility

### **Performance Monitoring**
```bash
# Check Lighthouse scores
npm run build
npm run preview
# Test with browser dev tools
```

## 🚀 **Deployment**

### **GitHub Pages Setup**

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Deploy new Astro site"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy!

3. **Custom Domain** (optional):
   - Add `CNAME` file to `public/` directory
   - Configure DNS to point to GitHub Pages

### **Build Process**
The `.github/workflows/deploy.yml` automatically:
- ✅ Installs dependencies
- ✅ Builds Astro site
- ✅ Deploys to GitHub Pages
- ✅ Updates on every push to main

### **Deployment Verification**
After deployment:
- ✅ Check site loads: `https://yourusername.github.io/repository`
- ✅ Test all pages work
- ✅ Verify mobile responsiveness
- ✅ Check Lighthouse scores

## 🔧 **Common Tasks**

### **Update Resume/CV**
1. **Replace PDF** in `public/files/cv.pdf`
2. **Update download links** in components if needed

### **Add New Skills**
Edit `src/components/Skills.astro`:
```astro
<div class="tech-tags">
  <span class="tech-tag">New Technology</span>
</div>
```

### **Update Contact Information**
Edit `src/components/ContactCTA.astro` and footer sections.

### **Add Blog Section**
1. Create `src/content/blog/` directory
2. Add blog posts as markdown files
3. Create `src/pages/blog.astro` page
4. Update navigation

## 🐛 **Troubleshooting**

### **Development Server Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **Build Errors**
```bash
# Check TypeScript errors
npm run build
# Fix any reported issues
```

### **Deployment Failures**
- Check GitHub Actions logs
- Verify all files are committed
- Ensure GitHub Pages is enabled

### **Missing Images**
- Verify images are in `public/assets/`
- Check file paths in markdown frontmatter
- Ensure correct file extensions

## 📚 **Resources**

### **Astro Documentation**
- [Astro Docs](https://docs.astro.build/)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Deployment Guide](https://docs.astro.build/en/guides/deploy/)

### **Design Inspiration**
- [Astro Themes](https://astro.build/themes/)
- [Component Examples](https://astro.build/themes/details/portfolio/)

### **Performance Tools**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- [WebPageTest](https://www.webpagetest.org/)

## 🎯 **Best Practices**

### **Content Organization**
- ✅ Use descriptive filenames for projects
- ✅ Include all required frontmatter fields
- ✅ Organize projects by category
- ✅ Keep descriptions concise but informative

### **Code Quality**
- ✅ Use TypeScript for type safety
- ✅ Follow component-based architecture
- ✅ Keep styles scoped to components
- ✅ Write semantic HTML

### **Performance**
- ✅ Optimize images before uploading
- ✅ Use lazy loading for images
- ✅ Minimize JavaScript usage
- ✅ Test on mobile devices

### **Accessibility**
- ✅ Include alt text for images
- ✅ Use proper heading hierarchy
- ✅ Ensure keyboard navigation works
- ✅ Test with screen readers

---

## 🆘 **Need Help?**

1. **Check Astro docs**: https://docs.astro.build/
2. **Review this guide** for common tasks
3. **Test changes locally** before deploying
4. **Check browser console** for errors

**Your website is now ready for easy management and continuous updates!** 🎉