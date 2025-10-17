#!/bin/bash

echo "=========================================="
echo "DEBUG: Build Environment"
echo "=========================================="
echo "PWD: $(pwd)"
echo "HOME: $HOME"
echo "USER: $USER"
echo ""
echo "=========================================="
echo "DEBUG: Environment Variables"
echo "=========================================="
env | grep -i "base\|url\|vercel\|astro" | sort
echo ""
echo "=========================================="
echo "DEBUG: Directory Structure"
echo "=========================================="
ls -la
echo ""
echo "=========================================="
echo "DEBUG: package.json location"
echo "=========================================="
cat package.json | grep -A2 '"build"'
echo ""
echo "=========================================="
echo "DEBUG: astro.config.mjs"
echo "=========================================="
cat astro.config.mjs
echo ""
echo "=========================================="
echo "DEBUG: Running build..."
echo "=========================================="
npm run build
echo ""
echo "=========================================="
echo "DEBUG: Checking built index.html"
echo "=========================================="
grep -o 'href="[^"]*style[^"]*"' dist/index.html | head -5
echo ""
echo "=========================================="
echo "DEBUG: Checking dist structure"
echo "=========================================="
ls -la dist/
echo ""
if [ -d "dist/assets" ]; then
  echo "✅ dist/assets EXISTS"
  ls dist/assets/ | grep style
else
  echo "❌ dist/assets DOES NOT EXIST"
fi
echo ""
if [ -d "dist/agency" ]; then
  echo "❌ WARNING: dist/agency EXISTS (THIS IS THE PROBLEM!)"
  ls -la dist/agency/
else
  echo "✅ dist/agency does not exist (good)"
fi
