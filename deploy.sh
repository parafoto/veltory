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