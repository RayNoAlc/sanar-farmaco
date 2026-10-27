const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, 'www');
if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir, { recursive: true });
}

// Copy index.html, manifest.json, sw.js
const rootFiles = ['index.html', 'manifest.json', 'sw.js'];
for (const file of rootFiles) {
  const src = path.join(__dirname, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(wwwDir, file));
  }
}

// Copy assets directory recursively
const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(wwwDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
}

console.log('Successfully synced index.html and assets into www/ directory!');
