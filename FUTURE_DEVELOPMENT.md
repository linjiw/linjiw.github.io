# Future Development Todo List

## 🚨 Critical Issues (Template Content Still Visible)

### 1. Fix Publication Years and Links
- [ ] Update publication years in `_bibliography/papers.bib` to actual publication dates (currently all show 2025)
- [ ] Replace duplicate PDF links with actual code repository URLs
- [ ] Add real slide deck URLs or remove slides links if not available
- [ ] Add poster URLs or remove poster links if not available

### 2. Remove Template Repositories
- [x] Replace template repositories in `_data/repositories.yml`
- [x] Remove `torvalds` and `alshedivat` from github_users
- [x] Add your own GitHub username (linjiw)
- [x] List your actual GitHub repositories (GACL, PAIR_Navigation, Explore_Text2Image, etc.)

### 3. Fix Blog Configuration
- [x] Update blog name in `_config.yml` line 89 (now "Research & Insights")
- [x] Update blog description in `_config.yml` line 90 (now "Thoughts on AI, Robotics, and Reinforcement Learning")
- [ ] Either add real blog posts or disable blog section entirely

### 4. Fix Jekyll Scholar Configuration
- [x] Update `_config.yml` lines 255-256 to use your name instead of Einstein
- [x] Set `last_name: [Wang]` and `first_name: [Linji, L.]`

## 📝 Content Development

### 5. News Section
- [ ] Add actual news items to `_news/` directory or hide news section
- [ ] Consider adding:
  - Paper acceptances
  - Conference presentations
  - Awards or recognitions
  - Research milestones

### 6. Blog Posts (if keeping blog)
- [ ] Create first blog post about research interests
- [ ] Write posts about:
  - Research methodologies
  - Conference experiences
  - Technical tutorials
  - Project updates
  - Reading lists/paper reviews

### 7. Project Page Enhancement
- [ ] Update main projects page description (remove "A growing collection of your cool projects")
- [ ] Add more detailed technical descriptions
- [ ] Include demo videos or GIFs
- [ ] Add links to datasets if available
- [ ] Include collaboration information

## 🔧 Technical Improvements

### 8. GitHub Integration
- [ ] Set up GitHub Actions for automatic deployment (if not already done)
- [ ] Configure Google Scholar sync script in `/scripts/`
- [ ] Set up automatic publication updates from Google Scholar

### 9. Analytics and SEO
- [ ] Add Google Analytics ID to `_config.yml` line 76
- [ ] Set up Google Search Console verification
- [ ] Enable Open Graph meta tags (`serve_og_meta: true`)
- [ ] Add structured data (`serve_schema_org: true`)

### 10. Comments System
- [ ] Either set up proper Disqus account or remove comments
- [ ] Update `disqus_shortname` in `_config.yml` line 118

## 🎨 Design and UX

### 11. Personal Branding
- [ ] Add personal logo/favicon if desired
- [ ] Customize color scheme if needed
- [ ] Add professional headshot to about page (if not already done)

### 12. Navigation Enhancement
- [ ] Review menu structure
- [ ] Consider adding dropdown menus for subsections
- [ ] Add quick links to important resources

## 📚 Documentation

### 13. Research Resources
- [ ] Add teaching materials section (if applicable)
- [ ] Create resources page with:
  - Useful tools and libraries
  - Reading lists
  - Tutorial links
  - Dataset references

### 14. Collaboration Information
- [ ] Add section about collaboration opportunities
- [ ] Include information about lab/research group
- [ ] Add advisor information if appropriate

## 🚀 Future Features

### 15. Interactive Elements
- [ ] Add interactive demos for projects
- [ ] Embed Jupyter notebooks for tutorials
- [ ] Add video presentations

### 16. Professional Development
- [ ] Add talks/presentations section
- [ ] Include workshop participation
- [ ] Add reviewer/committee service information

### 17. Social Media Integration
- [ ] Link Twitter/X for research updates
- [ ] Add LinkedIn profile
- [ ] Include ORCID ID
- [ ] Add ResearchGate profile

## 📊 Monitoring and Maintenance

### 18. Regular Updates
- [ ] Schedule quarterly CV updates
- [ ] Set reminders for publication updates
- [ ] Plan content calendar for blog posts
- [ ] Regular link checking

### 19. Performance Optimization
- [ ] Optimize images for web
- [ ] Enable lazy loading for images
- [ ] Minimize CSS/JS files
- [ ] Set up CDN if needed

## 🎯 Priority Order

1. **Immediate (Week 1)**
   - Fix publication years
   - Remove template repositories
   - Update Jekyll Scholar config
   - Fix blog configuration

2. **Short-term (Month 1)**
   - Add news items or hide section
   - Update project descriptions
   - Set up analytics
   - Fix repository links

3. **Medium-term (Months 2-3)**
   - Create blog content strategy
   - Add interactive demos
   - Enhance project pages
   - Set up automation scripts

4. **Long-term (Ongoing)**
   - Regular content updates
   - Feature enhancements
   - Performance optimization
   - Community engagement

## Notes

- Consider using GitHub Issues to track these todos
- Set up GitHub Projects for better project management
- Create templates for common content types (blog posts, project pages)
- Document any custom modifications to the al-folio theme