#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ttf2woff2 = require("ttf2woff2");

const fontsDir = path.join(__dirname, "../public/fonts");
const optimizedDir = path.join(fontsDir, "optimized");

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Font files to optimize
const fontFiles = [
  "InterDisplay-Regular.ttf",
  "InterDisplay-SemiBold.ttf",
  "InterDisplay-Medium.ttf",
  "InterDisplay-Light.ttf",
];

console.log("🔧 Starting font optimization...");

fontFiles.forEach((fontFile) => {
  const inputPath = path.join(fontsDir, fontFile);
  const outputPath = path.join(
    optimizedDir,
    fontFile.replace(".ttf", ".woff2")
  );

  if (fs.existsSync(inputPath)) {
    try {
      console.log(`Converting ${fontFile} to WOFF2...`);

      // Read the TTF file
      const ttfBuffer = fs.readFileSync(inputPath);

      // Convert TTF to WOFF2 using default export
      const woff2Buffer = ttf2woff2.default
        ? ttf2woff2.default(ttfBuffer)
        : ttf2woff2(ttfBuffer);

      // Write the WOFF2 file
      fs.writeFileSync(outputPath, woff2Buffer);

      // Get file sizes for comparison
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = (
        ((originalSize - optimizedSize) / originalSize) *
        100
      ).toFixed(1);

      console.log(
        `✅ ${fontFile}: ${(originalSize / 1024).toFixed(1)}KB → ${(
          optimizedSize / 1024
        ).toFixed(1)}KB (${savings}% smaller)`
      );
    } catch (error) {
      console.error(`❌ Error converting ${fontFile}:`, error.message);
    }
  } else {
    console.warn(`⚠️  Font file not found: ${fontFile}`);
  }
});

console.log("🎉 Font optimization complete!");
console.log("\n📊 Benefits of WOFF2:");
console.log("• 60-80% smaller file sizes");
console.log("• Better compression than TTF/WOFF");
console.log("• Supported by all modern browsers");
console.log("• Faster loading times");
