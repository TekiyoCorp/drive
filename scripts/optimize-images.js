const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeHeroImage() {
  const inputPath = path.join(__dirname, '../public/images/main/hero.webp');
  const outputDir = path.join(__dirname, '../public/images/main/');
  
  if (!fs.existsSync(inputPath)) {
    console.error('Error: hero.webp not found');
    return;
  }

  console.log('Optimizing hero image...');
  
  try {
    // Create highly compressed WebP (target: reduce by ~60KB)
    await sharp(inputPath)
      .webp({ 
        quality: 60, 
        effort: 6,
        smartSubsample: true 
      })
      .toFile(path.join(outputDir, 'hero-optimized.webp'));
    
    // Create AVIF version (typically 40-50% smaller than WebP)
    await sharp(inputPath)
      .avif({ 
        quality: 50, 
        effort: 9,
        chromaSubsampling: '4:2:0'
      })
      .toFile(path.join(outputDir, 'hero.avif'));
    
    // Create different quality versions for responsive loading
    await sharp(inputPath)
      .webp({ quality: 50, effort: 6 })
      .toFile(path.join(outputDir, 'hero-50.webp'));
    
    await sharp(inputPath)
      .webp({ quality: 70, effort: 6 })
      .toFile(path.join(outputDir, 'hero-70.webp'));
    
    // Get file sizes
    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(path.join(outputDir, 'hero-optimized.webp'));
    const avifStats = fs.statSync(path.join(outputDir, 'hero.avif'));
    
    console.log('Optimization complete!');
    console.log(`Original WebP: ${(originalStats.size / 1024).toFixed(1)} KB`);
    console.log(`Optimized WebP: ${(optimizedStats.size / 1024).toFixed(1)} KB`);
    console.log(`AVIF: ${(avifStats.size / 1024).toFixed(1)} KB`);
    console.log(`Savings: ${((originalStats.size - optimizedStats.size) / 1024).toFixed(1)} KB`);
    
    console.log('\nTo apply optimizations:');
    console.log('1. Replace hero.webp with hero-optimized.webp');
    console.log('2. The AVIF version is ready to use');
    
  } catch (error) {
    console.error('Optimization failed:', error);
  }
}

optimizeHeroImage();