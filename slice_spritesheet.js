/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function sliceSpritesheet() {
  const inputFile = '/Users/saurabhjain/.gemini/antigravity-ide/brain/3c9a82ed-5572-448f-a5bf-c5e17d7b4c8e/keyboard_spritesheet_1785231585531.png';
  const outputDir = path.join(__dirname, 'public', 'keyboard');

  try {
    const metadata = await sharp(inputFile).metadata();
    const width = metadata.width;
    const height = metadata.height;

    // It's a 4x2 grid
    const cols = 4;
    const rows = 2;
    
    const frameWidth = Math.floor(width / cols);
    const frameHeight = Math.floor(height / rows);

    let frameCount = 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const outputFile = path.join(outputDir, `frame-${frameCount.toString().padStart(2, '0')}.png`);
        
        await sharp(inputFile)
          .extract({ left: c * frameWidth, top: r * frameHeight, width: frameWidth, height: frameHeight })
          .toFile(outputFile);
        
        console.log(`Generated ${outputFile}`);
        frameCount++;
      }
    }
  } catch (err) {
    console.error('Error slicing spritesheet:', err);
  }
}

sliceSpritesheet();
