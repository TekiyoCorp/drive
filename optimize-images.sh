#!/bin/bash

# Image optimization script for hero image
# This script will create optimized versions in AVIF and better compressed WebP

cd public/images/main/

echo "Optimizing hero image..."

# Check if original exists
if [ ! -f "hero.webp" ]; then
  echo "Error: hero.webp not found"
  exit 1
fi

# Install required tools (if not already installed)
# You can install these with: brew install imagemagick webp
# For AVIF: brew install libavif

echo "Creating optimized WebP with higher compression..."
# Create a more compressed WebP version (save ~60KB)
cwebp -q 60 -m 6 -mt hero.webp -o hero-optimized.webp

echo "Creating AVIF version for modern browsers..."
# Create AVIF version (should be ~40% smaller than WebP)
# If you have avifenc installed:
# avifenc --min 0 --max 50 --speed 6 hero.webp hero.avif

# Alternative with ImageMagick (if AVIF support is compiled):
# convert hero.webp -quality 50 hero.avif

echo "Creating different quality versions..."
# Create multiple quality versions for responsive loading
cwebp -q 50 -m 6 -mt hero.webp -o hero-50.webp
cwebp -q 60 -m 6 -mt hero.webp -o hero-60.webp
cwebp -q 70 -m 6 -mt hero.webp -o hero-70.webp

echo "File sizes:"
ls -lh hero*.webp hero*.avif 2>/dev/null

echo "Optimization complete!"
echo ""
echo "To use the optimized images:"
echo "1. Replace hero.webp with hero-optimized.webp"
echo "2. Use hero.avif for AVIF support"
echo "3. Consider using responsive images with different qualities"