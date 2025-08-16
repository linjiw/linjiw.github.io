#!/bin/bash

# Test Deployment Script
# Tests both local build and checks deployment status

echo "🧪 Testing Website Deployment"
echo "=============================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check Hugo installation
echo -e "\n${YELLOW}Test 1: Checking Hugo installation${NC}"
if command -v hugo &> /dev/null; then
    hugo version
    echo -e "${GREEN}✓ Hugo is installed${NC}"
else
    echo -e "${RED}✗ Hugo is not installed${NC}"
    echo "Install with: brew install hugo"
    exit 1
fi

# Test 2: Build site locally
echo -e "\n${YELLOW}Test 2: Building site locally${NC}"
if hugo --gc --minify --buildDrafts; then
    echo -e "${GREEN}✓ Site builds successfully${NC}"
    echo "Local files in: ./public/"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Test 3: Check GitHub Pages deployment
echo -e "\n${YELLOW}Test 3: Checking GitHub Pages${NC}"
GITHUB_URL="https://linjiw.github.io/linjiwang/"
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" $GITHUB_URL)

if [ $HTTP_STATUS -eq 200 ] || [ $HTTP_STATUS -eq 301 ] || [ $HTTP_STATUS -eq 302 ]; then
    echo -e "${GREEN}✓ GitHub Pages is accessible${NC}"
    echo "URL: $GITHUB_URL"
    echo "Status: $HTTP_STATUS"
else
    echo -e "${YELLOW}⚠ GitHub Pages not yet deployed or accessible${NC}"
    echo "Status: $HTTP_STATUS"
    echo "This is normal for first deployment. Wait 10 minutes."
fi

# Test 4: Check custom domain (if using GitHub Pages)
echo -e "\n${YELLOW}Test 4: Checking custom domain${NC}"
CUSTOM_URL="https://linjiwang.com"
HTTP_STATUS_CUSTOM=$(curl -o /dev/null -s -w "%{http_code}" -L $CUSTOM_URL)

if [ $HTTP_STATUS_CUSTOM -eq 200 ]; then
    echo -e "${GREEN}✓ Custom domain is working${NC}"
    echo "URL: $CUSTOM_URL"
else
    echo -e "${YELLOW}⚠ Custom domain not configured or not working${NC}"
    echo "Status: $HTTP_STATUS_CUSTOM"
fi

# Test 5: Check specialized sections
echo -e "\n${YELLOW}Test 5: Checking specialized sections${NC}"
SECTIONS=("ai" "robotics" "sde" "rl")

for section in "${SECTIONS[@]}"; do
    if [ -d "content/$section" ]; then
        echo -e "${GREEN}✓ /$section section exists${NC}"
    else
        echo -e "${RED}✗ /$section section missing${NC}"
    fi
done

# Test 6: Check resume generation
echo -e "\n${YELLOW}Test 6: Checking resume system${NC}"
if [ -f "scripts/build-contextual-resume.py" ]; then
    echo -e "${GREEN}✓ Resume builder script exists${NC}"
    
    # Check if Python dependencies are installed
    if python3 -c "import yaml, jinja2" 2>/dev/null; then
        echo -e "${GREEN}✓ Python dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠ Python dependencies missing${NC}"
        echo "Install with: pip3 install pyyaml jinja2"
    fi
else
    echo -e "${RED}✗ Resume builder script missing${NC}"
fi

# Test 7: Check GitHub Actions status
echo -e "\n${YELLOW}Test 7: Checking GitHub Actions${NC}"
if command -v gh &> /dev/null; then
    echo "Recent workflow runs:"
    gh run list --limit 3
else
    echo -e "${YELLOW}⚠ GitHub CLI not installed${NC}"
    echo "Install with: brew install gh"
    echo "Then run: gh auth login"
fi

# Summary
echo -e "\n${YELLOW}========== Summary ==========${NC}"
echo "1. GitHub Pages URL: https://linjiw.github.io/linjiwang/"
echo "2. Custom Domain: https://linjiwang.com"
echo "3. Local Server: hugo server -D (http://localhost:1313)"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Enable GitHub Pages in repository settings"
echo "2. Select 'GitHub Actions' as source"
echo "3. Push changes to trigger deployment"
echo "4. Wait 10 minutes for first deployment"
echo ""
echo -e "${GREEN}Testing complete!${NC}"