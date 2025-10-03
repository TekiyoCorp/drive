#!/bin/bash

# Production build script with performance optimizations
echo "🚀 Starting optimized production build..."

# Clean up previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Set environment variables for production
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Run image optimization first
echo "🖼️ Optimizing images..."
if [ -f "./scripts/optimize-images-performance.sh" ]; then
    ./scripts/optimize-images-performance.sh
fi

# Build with optimization flags
echo "🏗️ Building application..."
npx next build

# Check build output
echo "📊 Build analysis:"
if [ -d ".next" ]; then
    echo "✅ Build completed successfully"
    echo "📁 Build size:"
    du -h .next/ | tail -1
    
    echo "🧮 Bundle analysis:"
    find .next/static/chunks -name "*.js" -exec basename {} \; | head -10
else
    echo "❌ Build failed"
    exit 1
fi

echo "🎉 Production build complete!"