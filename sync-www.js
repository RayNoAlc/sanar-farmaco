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

// Copy assets directory if exists
const assetsSrc = path.join(__dirname, 'assets');
const assetsDest = path.join(wwwDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  if (!fs.existsSync(assetsDest)) {
    fs.mkdirSync(assetsDest, { recursive: true });
  }
  const files = fs.readdirSync(assetsSrc);
  for (const file of files) {
    fs.copyFileSync(path.join(assetsSrc, file), path.join(assetsDest, file));
  }
}

console.log('Successfully synced index.html and assets into www/ directory!');
