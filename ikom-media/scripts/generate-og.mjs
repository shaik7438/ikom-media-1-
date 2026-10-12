/**
 * Generates /public/og-image.png (1200×630) used for social sharing previews.
 * Run: npm run og
 *
 * Composites the official logo from public/brand/ikom-media-logo.png.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.82" cy="0.2" r="0.7">
      <stop offset="0" stop-color="#343BFF" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#343BFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="core" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c7d0ff"/>
      <stop offset="0.4" stop-color="#5D72FF"/>
      <stop offset="1" stop-color="#111747"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#080B18"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="250" font-family="Inter Display, Inter, sans-serif" font-size="66" font-weight="800" fill="#ffffff" letter-spacing="-2">We Build Brands</text>
  <text x="80" y="330" font-family="Inter Display, Inter, sans-serif" font-size="66" font-weight="800" fill="#93a2ff" letter-spacing="-2">That Get Noticed.</text>
  <text x="80" y="430" font-family="Inter, sans-serif" font-size="26" font-weight="500" fill="#B9C1D9">Social Media · Performance Marketing</text>
  <text x="80" y="468" font-family="Inter, sans-serif" font-size="26" font-weight="500" fill="#B9C1D9">Websites · SEO · Branding</text>
</svg>`;

// Official logo (white, transparent) composited on the right
const logo = await sharp(path.join(root, "public", "brand", "ikom-media-logo.png")).resize({ height: 400 }).toBuffer();
await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: 1200 - 404 - 90, top: 115 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "og-image.png"));
console.log("✓ public/og-image.png");
