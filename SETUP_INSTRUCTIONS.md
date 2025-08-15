# 🚀 Setup Instructions for Deployment

## Quick Setup Guide

### Option 1: GitHub Pages Only (Recommended) ✅

**Step 1: Enable GitHub Pages**
1. Go to: https://github.com/linjiw/linjiwang/settings/pages
2. Under "Source", select "GitHub Actions"
3. Save

**Step 2: The workflow will automatically run**
- Push any change to trigger deployment
- Or go to Actions tab and manually run "GitHub Pages (Alternative)"

**Step 3: Access your site**
- Your site will be available at: https://linjiw.github.io/linjiwang/
- First deployment takes ~10 minutes
- Subsequent updates take ~2-3 minutes

### Option 2: Fix Netlify + Keep GitHub Pages 🔧

**Fix Netlify Authentication:**

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Select your site: linjiwang.com

2. **Reconnect Repository**
   - Go to: Site Settings → Build & Deploy → Continuous Deployment
   - Click "Link to a different repository"
   - Choose GitHub (OAuth, not GitHub App)
   - Re-authorize and select `linjiw/linjiwang`

3. **Alternative: Use Deploy Keys**
   ```bash
   # Generate deploy key
   ssh-keygen -t ed25519 -C "netlify-deploy" -f netlify-deploy-key
   
   # Add public key to GitHub:
   # Settings → Deploy keys → Add deploy key
   # Title: Netlify Deploy
   # Key: (paste public key content)
   # Allow write access: NO (read-only is fine)
   
   # Add private key to Netlify:
   # Site Settings → Build & Deploy → Deploy key
   # Paste the private key content
   ```

4. **Update Build Settings in Netlify**
   - Build command: `hugo --gc --minify`
   - Publish directory: `public`
   - Production branch: `main`

### Option 3: GitHub Pages as Primary, Remove Netlify 🎯

**This is the simplest approach:**

1. **Use GitHub Pages exclusively**
   - Free forever
   - No authentication issues
   - Automatic deployment

2. **Point your domain to GitHub Pages**
   ```bash
   # Add CNAME file to repository
   echo "linjiwang.com" > static/CNAME
   git add static/CNAME
   git commit -m "Add CNAME for custom domain"
   git push
   ```

3. **Configure DNS (at your domain registrar)**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   
   Type: CNAME
   Name: www
   Value: linjiw.github.io
   ```

## 🔍 Verification Steps

### Check GitHub Pages Status
```bash
# Check if Actions are running
curl -s https://api.github.com/repos/linjiw/linjiwang/actions/runs | jq '.workflow_runs[0].status'

# Check if site is live
curl -I https://linjiw.github.io/linjiwang/
```

### Check Netlify Status
- Dashboard: https://app.netlify.com
- Deploy log shows the error
- Site should show "Published" when working

## 🛠️ Troubleshooting

### GitHub Pages Not Working?
1. **Check Settings**
   - Ensure "GitHub Actions" is selected as source
   - Check that repository is public

2. **Check Workflow**
   ```bash
   # See workflow runs
   gh run list --workflow=gh-pages.yml
   
   # View latest run details
   gh run view
   ```

3. **Force Rebuild**
   ```bash
   # Make a small change
   echo "<!-- Rebuild $(date) -->" >> README.md
   git add README.md
   git commit -m "Trigger rebuild"
   git push
   ```

### Netlify Still Failing?
1. **Check Repository Access**
   - Ensure Netlify app has access to your repo
   - GitHub Settings → Applications → Netlify → Check permissions

2. **Try Manual Deploy**
   ```bash
   # Build locally
   hugo --gc --minify
   
   # Drag and drop the 'public' folder to Netlify dashboard
   ```

3. **Use Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod --dir=public
   ```

## 📊 Platform Comparison

| Task | GitHub Pages | Netlify |
|------|--------------|---------|
| Setup Difficulty | ⭐ Easy | ⭐⭐⭐ Moderate |
| Reliability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Build Speed | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Free Tier | Unlimited | 300 min/month |
| Custom Domain | ✅ Yes | ✅ Yes |
| HTTPS | ✅ Yes | ✅ Yes |
| Your Needs | ✅ Perfect | ⚠️ Overkill |

## 🎯 Final Recommendation

**Use GitHub Pages only.** It's simpler, free, and perfect for your static Hugo site.

1. **Immediate Action:**
   ```bash
   # Push the updated workflows
   git add .
   git commit -m "fix: Update GitHub Pages deployment workflow"
   git push
   ```

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "GitHub Actions" as source

3. **Wait 10 minutes**
   - Visit: https://linjiw.github.io/linjiwang/

4. **Optional: Cancel Netlify**
   - If you don't need it, you can delete the Netlify site
   - Your GitHub Pages site will work independently

## 🔗 Useful Links

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Hugo Docs**: https://gohugo.io/hosting-and-deployment/hosting-on-github/
- **Netlify Docs**: https://docs.netlify.com/site-deploys/create-deploys/
- **Your GitHub Repo**: https://github.com/linjiw/linjiwang
- **Your GitHub Pages**: https://linjiw.github.io/linjiwang/
- **Your Netlify Site**: https://app.netlify.com/sites/linjiwang