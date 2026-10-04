const fs = require('fs');
const path = require('path');

const root = process.cwd();
const imgDir = path.join(root, 'imagenes');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const referencedImages = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const regex = /["'](imagenes\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const clean = match[1].split('?')[0].split('#')[0];
    const base = path.basename(clean);
    referencedImages.add(base);
  }
});

console.log(`Total unique image filenames referenced in HTML: ${referencedImages.size}`);

const allDiskFiles = fs.readdirSync(imgDir);
console.log(`Total files currently in imagenes/: ${allDiskFiles.length}`);

let kept = 0;
let removed = 0;

allDiskFiles.forEach(file => {
  if (!referencedImages.has(file)) {
    const filePath = path.join(imgDir, file);
    fs.unlinkSync(filePath);
    removed++;
  } else {
    kept++;
  }
});

console.log(`Cleaned up unused images! Kept: ${kept}, Removed: ${removed}`);
