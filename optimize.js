/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage() {
  const inputFile = path.join(__dirname, 'public', 'keyboard', 'high-res-keyboard.png');
  const tempFile = path.join(__dirname, 'public', 'keyboard', 'high-res-keyboard-temp.png');

  try {
    // Compress and resize to max 1920x1920
    await sharp(inputFile)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(tempFile);
      
    // Replace original
    fs.renameSync(tempFile, inputFile);
    console.log('Image successfully optimized and compressed.');
  } catch (err) {
    console.error('Error optimizing image:', err);
  }
}

optimizeImage();
