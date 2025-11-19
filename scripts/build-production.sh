#!/bin/bash

# Production Build Optimization Script
set -e

echo "🚀 Starting production build optimization..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Optimize images first
echo "🖼️  Optimizing images..."
if [ -f "./scripts/optimize-images-performance.sh" ]; then
  ./scripts/optimize-images-performance.sh
fi

# Set production environment
export NODE_ENV=production

# Build with optimizations
echo "📦 Building optimized bundle..."
pnpm build

# Check bundle sizes
echo "📊 Bundle size analysis:"
du -sh .next/static/chunks/* | sort -hr | head -10

echo "✅ Production build completed!"
echo "💡 To analyze bundle: pnpm run build:analyze"