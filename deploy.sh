#!/bin/bash
# deploy.sh — Deploy heparamotor.ru
# Usage: bash /Users/up/paramotor/deploy.sh "commit message"

set -e

REPO="/Users/up/paramotor"
MSG="${1:-Auto-deploy from MiMoCode}"

cd "$REPO"

# Check if git repo
if [ ! -d ".git" ]; then
  echo "ERROR: Not a git repo"
  exit 1
fi

# Sync root files from dist/ (GitHub Pages serves from repo root)
if [ -f "dist/index.html" ]; then
  cp dist/index.html index.html
  echo "Synced: dist/index.html -> index.html"
fi
if [ -f "dist/sitemap.xml" ]; then
  cp dist/sitemap.xml sitemap.xml
  echo "Synced: dist/sitemap.xml -> sitemap.xml"
fi
if [ -f "dist/robots.txt" ]; then
  cp dist/robots.txt robots.txt
  echo "Synced: dist/robots.txt -> robots.txt"
fi

# Stage all changes
git add -A

# Check if there are changes
if git diff --cached --quiet; then
  echo "No changes to deploy"
  exit 0
fi

# Commit
git commit -m "$MSG"

# Push
git push origin main

# Get SHA
SHA=$(git rev-parse --short HEAD)
echo ""
echo "=== DEPLOYED ==="
echo "Commit: $SHA"
echo "Message: $MSG"
echo "Live: https://heparamotor.ru (1-2 min)"
echo ""