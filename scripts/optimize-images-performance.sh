#!/bin/bash

# Image optimization script for better web performance
# This script converts images to modern formats (AVIF, WebP) and optimizes them

echo "🖼️  Starting image optimization for better web performance..."

# Create optimized directory if it doesn't exist
mkdir -p public/images/optimized

# Function to optimize a single image
optimize_image() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file" .jpg)
    filename=$(basename "$filename" .jpeg)
    filename=$(basename "$filename" .png)
    
    echo "Optimizing: $input_file"
    
    # Convert to AVIF (best compression)
    if command -v avif &> /dev/null; then
        avif --quality 60 --effort 9 "$input_file" "$output_dir/${filename}.avif"
        echo "  ✅ AVIF created: $output_dir/${filename}.avif"
    else
        echo "  ⚠️  AVIF encoder not found, skipping AVIF conversion"
    fi
    
    # Convert to WebP (good compression, wide support)
    if command -v cwebp &> /dev/null; then
        cwebp -q 75 -m 6 "$input_file" -o "$output_dir/${filename}.webp"
        echo "  ✅ WebP created: $output_dir/${filename}.webp"
    else
        echo "  ⚠️  WebP encoder not found, skipping WebP conversion"
    fi
    
    # Optimize original JPEG/PNG
    if [[ "$input_file" == *.jpg ]] || [[ "$input_file" == *.jpeg ]]; then
        if command -v jpegoptim &> /dev/null; then
            jpegoptim --max=80 --strip-all --preserve --dest="$output_dir" "$input_file"
            echo "  ✅ JPEG optimized: $output_dir/$(basename "$input_file")"
        fi
    elif [[ "$input_file" == *.png ]]; then
        if command -v optipng &> /dev/null; then
            optipng -o7 -strip all -out "$output_dir/$(basename "$input_file")" "$input_file"
            echo "  ✅ PNG optimized: $output_dir/$(basename "$input_file")"
        fi
    fi
}

# Find and optimize all images in the public/images directory
if [ -d "public/images" ]; then
    find public/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r image; do
        # Skip already optimized images
        if [[ "$image" != *"/optimized/"* ]]; then
            optimize_image "$image" "public/images/optimized"
        fi
    done
else
    echo "❌ public/images directory not found!"
    exit 1
fi

# Create responsive image variants for hero image
if [ -f "public/images/main/hero.jpg" ] || [ -f "public/images/main/hero.png" ]; then
    echo "🎯 Creating responsive variants for hero image..."
    
    hero_file=""
    if [ -f "public/images/main/hero.jpg" ]; then
        hero_file="public/images/main/hero.jpg"
    elif [ -f "public/images/main/hero.png" ]; then
        hero_file="public/images/main/hero.png"
    fi
    
    if [ -n "$hero_file" ]; then
        # Create different sizes for responsive loading
        sizes=(640 828 1080 1200 1920)
        
        for size in "${sizes[@]}"; do
            if command -v convert &> /dev/null; then
                # AVIF variants
                convert "$hero_file" -resize "${size}x" -quality 60 "public/images/main/hero-${size}w.avif" 2>/dev/null
                # WebP variants  
                convert "$hero_file" -resize "${size}x" -quality 75 "public/images/main/hero-${size}w.webp" 2>/dev/null
                echo "  ✅ Created ${size}w variants"
            fi
        done
    fi
fi

echo "✨ Image optimization completed!"
echo "📊 Performance tips:"
echo "   - Use AVIF for modern browsers (best compression)"
echo "   - Fallback to WebP for wider support"
echo "   - Use responsive images with srcset"
echo "   - Preload critical images with fetchpriority='high'"