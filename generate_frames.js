/* eslint-disable */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFrames() {
  const inputFile = path.join(__dirname, 'public', 'keyboard', 'gaming-keyboard.png');
  const outputDir = path.join(__dirname, 'public', 'keyboard');

  try {
    const metadata = await sharp(inputFile).metadata();
    const width = metadata.width;
    const height = metadata.height;

    // Define 8 frames with different scales and translations
    // Frame 1: Center, original
    // Frame 2: Zoom in 10%, move right
    // Frame 3: Zoom in 20%, move right
    // Frame 4: Zoom in 30%, move right (focusing on mouse)
    // Frame 5: Zoom in 30%, move left (focusing on keyboard keys)
    // Frame 6: Zoom in 20%, move left
    // Frame 7: Zoom in 10%, move left
    // Frame 8: Back to center, zoom out

    const frames = [
      { scale: 1.0, dx: 0, dy: 0 },
      { scale: 1.1, dx: 0.05, dy: 0.05 },
      { scale: 1.2, dx: 0.1, dy: 0.1 },
      { scale: 1.3, dx: 0.15, dy: 0.15 },
      { scale: 1.4, dx: -0.1, dy: -0.05 },
      { scale: 1.25, dx: -0.05, dy: -0.02 },
      { scale: 1.1, dx: 0, dy: 0 },
      { scale: 1.0, dx: 0, dy: 0 },
    ];

    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      const newWidth = Math.floor(width / frame.scale);
      const newHeight = Math.floor(height / frame.scale);
      
      const left = Math.floor((width - newWidth) / 2 + (width * frame.dx));
      const top = Math.floor((height - newHeight) / 2 + (height * frame.dy));
      
      // Ensure bounds
      const safeLeft = Math.max(0, Math.min(left, width - newWidth));
      const safeTop = Math.max(0, Math.min(top, height - newHeight));

      const outputFile = path.join(outputDir, `frame-0${i + 1}.png`);
      
      await sharp(inputFile)
        .extract({ left: safeLeft, top: safeTop, width: newWidth, height: newHeight })
        .resize(width, height)
        .toFile(outputFile);
      
      console.log(`Generated ${outputFile}`);
    }
  } catch (err) {
    console.error('Error generating frames:', err);
  }
}

generateFrames();
