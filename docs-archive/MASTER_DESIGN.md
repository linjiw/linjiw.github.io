# 🎯 Master Website Design & Architecture

## Vision Statement
Create a flexible, multi-purpose personal website that adapts to different contexts (AI research, robotics, software engineering, reinforcement learning) with tailored content and resume versions for each audience.

## 🌐 URL Structure & Routing

### Main Domain Routes
```
linjiwang.com/                 # Main portfolio
├── /ai                        # AI Research focus
├── /robotics                  # Robotics projects & research  
├── /sde                       # Software Development Engineer portfolio
├── /rl                        # Reinforcement Learning specialization
├── /cv                        # Dynamic resume (context-aware)
├── /blog                      # Technical blog posts
├── /projects                  # All projects gallery
└── /contact                   # Contact information
```

### Hidden/Specialized Routes
```
linjiwang.com/
├── /resume/ai                 # AI-focused resume
├── /resume/sde               # SDE-focused resume
├── /resume/robotics          # Robotics-focused resume
├── /resume/research          # Academic research CV
├── /api/resume.json          # JSON resume API
└── /admin                    # Content management
```

## 🏗️ Technical Architecture

### 1. Content Structure
```
content/
├── _index.md                  # Home page
├── ai/                        # AI section
│   ├── _index.md             # AI landing page
│   ├── projects/             # AI projects
│   ├── publications/         # AI papers
│   └── resume.yaml           # AI-specific resume data
├── robotics/
│   ├── _index.md
│   ├── projects/
│   ├── research/
│   └── resume.yaml
├── sde/
│   ├── _index.md
│   ├── portfolio/
│   ├── skills/
│   └── resume.yaml
├── rl/
│   ├── _index.md
│   ├── research/
│   ├── demos/
│   └── resume.yaml
└── shared/
    ├── blog/
    ├── publications/
    └── base-resume.yaml      # Shared resume components
```

### 2. Resume System Architecture

#### A. Data Structure
```yaml
# base-resume.yaml (shared)
personal:
  name: "Linji Wang"
  email: "joewwang@outlook.com"
  core_skills: [...]

# ai/resume.yaml (AI-specific)
extends: shared/base-resume.yaml
focus: "AI Research"
highlight_projects:
  - "Neural Architecture Search"
  - "Computer Vision Systems"
relevant_experience:
  - filter: ["AI", "ML", "Research"]
skills_emphasis: ["PyTorch", "TensorFlow", "Research"]
```

#### B. Dynamic Generation
```python
class ResumeBuilder:
    def __init__(self, context="general"):
        self.context = context  # ai, sde, robotics, rl
        self.base_data = load_yaml("shared/base-resume.yaml")
        self.context_data = load_yaml(f"{context}/resume.yaml")
    
    def generate(self, format="pdf"):
        # Merge base + context-specific data
        # Apply filters based on context
        # Generate appropriate format
```

### 3. Hugo Configuration

#### A. Section Templates
```
layouts/
├── ai/
│   ├── baseof.html          # AI-themed layout
│   ├── single.html
│   └── list.html
├── robotics/
│   ├── baseof.html          # Robotics-themed layout
│   └── ...
├── sde/
│   ├── baseof.html          # SDE-themed layout
│   └── ...
└── _default/
    └── baseof.html          # Default layout
```

#### B. Custom Shortcodes
```
shortcodes/
├── resume-download.html      # Context-aware resume download
├── project-gallery.html      # Filtered project display
├── skill-chart.html         # Visual skill representation
└── publication-list.html    # Academic publication list
```

## 🎨 Design System

### 1. Themed Sections
Each section has its own visual identity:

| Section | Primary Color | Theme | Focus |
|---------|--------------|-------|-------|
| Main | Blue (#0066cc) | Professional | General portfolio |
| AI | Purple (#6B46C1) | Futuristic | Research & innovation |
| Robotics | Orange (#FF6B35) | Technical | Hardware & systems |
| SDE | Green (#10B981) | Modern | Code & architecture |
| RL | Red (#DC2626) | Dynamic | Algorithms & theory |

### 2. Responsive Components
- **Smart Navigation**: Context-aware menu that highlights relevant sections
- **Adaptive Content**: Show/hide content based on visitor context
- **Dynamic CTAs**: Different calls-to-action per section

## 🚀 Implementation Plan

### Phase 1: Foundation (Week 1)
- [x] Set up GitHub Actions workflows
- [x] Configure dual deployment (Netlify + GitHub Pages)
- [ ] Create base Hugo structure
- [ ] Implement routing system

### Phase 2: Content Sections (Week 2)
- [ ] Create AI section with landing page
- [ ] Create Robotics section
- [ ] Create SDE section
- [ ] Create RL section
- [ ] Set up blog structure

### Phase 3: Resume System (Week 3)
- [ ] Build dynamic resume generator
- [ ] Create context-specific templates
- [ ] Implement API endpoints
- [ ] Add download tracking

### Phase 4: Polish & Launch (Week 4)
- [ ] Add analytics
- [ ] Optimize SEO per section
- [ ] Create demo content
- [ ] Performance optimization

## 📁 File Organization

### Required Files Structure
```
linjiwang/
├── .github/
│   └── workflows/
│       ├── deploy.yml         # Deployment workflow
│       ├── resume-gen.yml     # Resume generation
│       └── validate.yml       # Content validation
├── config/
│   └── _default/
│       ├── config.yaml        # Main config
│       ├── menus.yaml         # Navigation menus
│       └── params.yaml        # Site parameters
├── content/
│   ├── ai/                   # AI section
│   ├── robotics/             # Robotics section
│   ├── sde/                  # SDE section
│   ├── rl/                   # RL section
│   └── resume/               # Resume data
├── data/
│   ├── resume/               # Resume configurations
│   └── skills/               # Skills database
├── layouts/
│   ├── shortcodes/           # Custom shortcodes
│   └── partials/             # Reusable components
├── scripts/
│   ├── build-resume.py       # Resume builder
│   ├── generate-section.sh   # Section generator
│   └── deploy.sh            # Deployment helper
└── static/
    ├── css/                  # Custom styles
    ├── js/                   # Custom scripts
    └── files/                # Downloads

```

## 🔧 Configuration Examples

### 1. Hugo Menu Configuration (menus.yaml)
```yaml
main:
  - name: Home
    url: /
    weight: 10
  - name: AI Research
    url: /ai/
    weight: 20
  - name: Robotics
    url: /robotics/
    weight: 30
  - name: Software
    url: /sde/
    weight: 40
  - name: RL
    url: /rl/
    weight: 50
  - name: Blog
    url: /blog/
    weight: 60
  - name: Resume
    url: /cv/
    weight: 70
    
# Context-specific menus
ai:
  - name: Research
    url: /ai/research/
  - name: Publications
    url: /ai/publications/
  - name: Projects
    url: /ai/projects/
  - name: AI Resume
    url: /resume/ai/
```

### 2. Section Front Matter Template
```yaml
---
title: "AI Research & Development"
description: "Exploring the frontiers of artificial intelligence"
layout: "ai"
menu: "ai"
theme_color: "#6B46C1"
resume_context: "ai"
featured_projects:
  - "neural-architecture-search"
  - "computer-vision-pipeline"
skills_emphasis:
  - "Deep Learning"
  - "Computer Vision"
  - "NLP"
---
```

## 🎯 Key Features

### 1. Smart Resume System
- **Context Detection**: Auto-detect visitor context from referrer/path
- **Dynamic Generation**: Generate role-specific resumes on-demand
- **Version Control**: Track all resume versions with Git
- **Analytics**: Track which version gets downloaded most

### 2. Content Adaptation
- **Smart Filtering**: Show relevant projects per section
- **Skill Highlighting**: Emphasize different skills per context
- **Dynamic Bio**: Adjust bio based on visitor context

### 3. SEO Optimization
- **Section-specific meta tags**
- **Structured data per context**
- **Sitemap with priorities**
- **Open Graph tags per section**

### 4. Performance Features
- **Lazy loading** for images
- **Progressive enhancement**
- **CDN integration**
- **Caching strategies**

## 📊 Analytics & Tracking

### 1. Metrics to Track
- Page views per section
- Resume downloads by type
- Visitor flow between sections
- Contact form submissions per context
- Time spent on each section

### 2. Implementation
```javascript
// Context-aware analytics
function trackContext() {
  const path = window.location.pathname;
  const context = path.split('/')[1] || 'main';
  
  gtag('event', 'page_view', {
    'page_context': context,
    'page_path': path
  });
}

// Resume download tracking
function trackResumeDownload(type) {
  gtag('event', 'download', {
    'file_name': `resume_${type}.pdf`,
    'file_type': 'pdf',
    'context': type
  });
}
```

## 🚦 Testing Strategy

### 1. Pre-deployment Checks
- [ ] All sections load correctly
- [ ] Resume generation works for all contexts
- [ ] Navigation works across sections
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### 2. Post-deployment Monitoring
- [ ] Both domains accessible
- [ ] SSL certificates valid
- [ ] Analytics tracking working
- [ ] Form submissions working
- [ ] Download links functional

## 🎬 Next Steps

1. **Immediate Actions**:
   - Create section directories
   - Set up routing configuration
   - Implement base templates

2. **Short-term Goals**:
   - Launch AI and SDE sections
   - Implement dynamic resume system
   - Add analytics

3. **Long-term Vision**:
   - A/B testing for different layouts
   - Visitor personalization
   - API for external integrations
   - Interactive demos/playground