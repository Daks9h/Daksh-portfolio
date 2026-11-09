/**
 * MNIST Preprocessing Utilities
 * 
 * Takes drawing canvas pixel data, finds drawn digit bounding box,
 * scales to fit within 20x20 preserving aspect ratio, centers inside a 28x28
 * black frame, and exports a Float32Array of 784 normalized grayscale values.
 */

// Normalization factor: 1/255 for [0, 1] range; easily toggleable to 1 for [0, 255]
export const INPUT_SCALE = 1 / 255;

/**
 * Preprocesses a canvas element to match MNIST format [1, 1, 28, 28].
 * 
 * @param {HTMLCanvasElement} canvas - The source drawing canvas
 * @returns {Float32Array|null} 784 Float32 values or null if nothing is drawn
 */
export function preprocessCanvas(canvas) {
  if (!canvas) return null;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const width = canvas.width;
  const height = canvas.height;
  if (width === 0 || height === 0) return null;

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  // Scan for drawn strokes (white on black background)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;

      // Filter out background noise
      if (brightness > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Nothing was drawn
  if (maxX === -1 || maxY === -1) {
    return null;
  }

  const boxWidth = maxX - minX + 1;
  const boxHeight = maxY - minY + 1;

  // Scale bounding box to fit inside a 20x20 area preserving aspect ratio
  const scale = 20 / Math.max(boxWidth, boxHeight);
  const scaledWidth = Math.max(1, Math.round(boxWidth * scale));
  const scaledHeight = Math.max(1, Math.round(boxHeight * scale));

  // Create an offscreen 28x28 canvas
  const offscreen = document.createElement('canvas');
  offscreen.width = 28;
  offscreen.height = 28;
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!offCtx) return null;

  // Fill with solid black background
  offCtx.fillStyle = '#000000';
  offCtx.fillRect(0, 0, 28, 28);

  // Center the 20x20 scaled digit inside the 28x28 frame
  const dx = Math.round((28 - scaledWidth) / 2);
  const dy = Math.round((28 - scaledHeight) / 2);

  offCtx.imageSmoothingEnabled = true;
  offCtx.imageSmoothingQuality = 'medium';
  offCtx.drawImage(
    canvas,
    minX, minY, boxWidth, boxHeight,
    dx, dy, scaledWidth, scaledHeight
  );

  // Extract 28x28 grayscale values
  const offImgData = offCtx.getImageData(0, 0, 28, 28).data;
  const float32Data = new Float32Array(784);

  for (let i = 0; i < 784; i++) {
    const idx = i * 4;
    const r = offImgData[idx];
    const g = offImgData[idx + 1];
    const b = offImgData[idx + 2];
    const gray = (r + g + b) / 3;
    float32Data[i] = gray * INPUT_SCALE;
  }

  return float32Data;
}

