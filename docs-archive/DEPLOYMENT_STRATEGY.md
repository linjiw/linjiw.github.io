# 🚀 Deployment Strategy & Platform Comparison

## Platform Evaluation: Netlify vs GitHub Pages

### GitHub Pages (Recommended Primary)
**Pros:**
- ✅ **Free forever** for public repos
- ✅ **Native GitHub integration** - no authentication issues
- ✅ **Simple setup** - just push to gh-pages branch or use Actions
- ✅ **Custom domain support** with HTTPS
- ✅ **No build time limits**
- ✅ **Reliable and maintained by GitHub**
- ✅ **Perfect for static sites**

**Cons:**
- ❌ No server-side features (forms, functions)
- ❌ Limited to 1GB site size
- ❌ 100GB bandwidth/month soft limit

**Best For:** Your academic portfolio site with multiple sections

### Netlify (Optional Secondary)
**Pros:**
- ✅ Instant rollbacks
- ✅ Deploy previews for PRs
- ✅ Form handling
- ✅ Serverless functions
- ✅ Split testing
- ✅ Better CDN

**Cons:**
- ❌ **300 build minutes/month on free tier**
- ❌ Git authentication issues (as we're seeing)
- ❌ More complex configuration
- ❌ Potential costs as you scale

## 🎯 Recommended Strategy

### Primary: GitHub Pages
Use GitHub Pages as your main deployment platform because:
1. No authentication issues
2. Unlimited builds
3. Perfect for static Hugo sites
4. Free forever for public repos

### Secondary: Keep Netlify (Optional)
- Use for staging/preview deployments
- Leverage advanced features if needed
- Keep as backup

## 🔧 Implementation Plan

### Step 1: Fix GitHub Pages Deployment

The GitHub Actions workflow needs updating for proper GitHub Pages deployment.

### Step 2: Fix Netlify (Optional)

The error shows Netlify can't access your GitHub repo. This is because:
- Netlify is trying to use SSH authentication
- Your repo might be set to HTTPS in Netlify

**Solution Options:**
1. **Reconnect Repository in Netlify:**
   - Go to Netlify Dashboard → Site Settings → Build & Deploy
   - Under "Repository", click "Link to a different repository"
   - Re-authenticate with GitHub
   - Select your repository again

2. **Switch to GitHub OAuth:**
   - Ensure Netlify is using OAuth, not SSH keys
   - This is done during repository connection

3. **Use Deploy Key (Advanced):**
   - Generate a deploy key in GitHub
   - Add it to Netlify

### Step 3: Dual Deployment Setup

```yaml
# GitHub Pages (Primary) - Direct and simple
# Netlify (Secondary) - Advanced features if needed
```

## 📝 Updated Configuration Files

### GitHub Pages Configuration
See updated workflow below for automatic deployment.

### Netlify Configuration (if keeping)
The current `netlify.toml` is fine, just needs repository access fixed.

## 🌐 Domain Strategy

### Option 1: GitHub Pages with Custom Domain
```
linjiwang.com → GitHub Pages (CNAME)
www.linjiwang.com → GitHub Pages (CNAME)
```

### Option 2: Split Deployment
```
linjiwang.com → Netlify (if you need forms/functions)
linjiw.github.io → GitHub Pages (always available)
```

## 📊 Cost Analysis

| Feature | GitHub Pages | Netlify Free | Netlify Pro |
|---------|--------------|--------------|-------------|
| Price | $0 | $0 | $19/month |
| Builds | Unlimited | 300 min/month | 1000 min/month |
| Bandwidth | 100GB soft | 100GB | 1TB |
| Sites | 1 per repo | Unlimited | Unlimited |
| Custom Domain | Yes | Yes | Yes |
| HTTPS | Yes | Yes | Yes |
| Forms | No | 100/month | 1000/month |
| Functions | No | 125k runs | 125k runs |

## 🚀 Quick Fix Actions

1. **GitHub Pages (Immediate)**
   - Enable in repository settings
   - Deploy with updated workflow

2. **Netlify (If Needed)**
   - Reconnect repository with OAuth
   - Or disable and use GitHub Pages only

## 📍 Recommendation

**Use GitHub Pages as primary** - it's simpler, free, and sufficient for your academic portfolio. Keep Netlify only if you need:
- Form submissions
- Serverless functions
- A/B testing
- Deploy previews

For your use case (academic portfolio with multiple sections), GitHub Pages is the better choice.