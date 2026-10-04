const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const referencedImages = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const regex = /["'](imagenes\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const clean = match[1].split('?')[0].split('#')[0];
    referencedImages.add(clean);
  }
});

const missing = [];
const existing = [];

referencedImages.forEach(img => {
  const fullPath = path.join(root, img);
  if (fs.existsSync(fullPath)) {
    existing.push(img);
  } else {
    missing.push(img);
  }
});

console.log(`Total referenced: ${referencedImages.size}`);
console.log(`Existing: ${existing.length}`);
console.log(`Missing: ${missing.length}`);

if (missing.length > 0) {
  console.log('Missing images:', missing);
}
