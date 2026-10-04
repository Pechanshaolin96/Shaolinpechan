const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const referencedImages = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  // Match src="imagenes/..." or url('imagenes/...')
  const matches = content.match(/(?:src|url)\(?['"]?(imagenes\/[^'"\)\?\#]+)/gi) || [];
  matches.forEach(m => {
    const clean = m.replace(/^(?:src|url)\(?['"]?/, '').trim();
    referencedImages.add(clean);
  });
});

console.log(`Total HTML files scanned: ${files.length}`);
console.log(`Total unique referenced images in HTML: ${referencedImages.size}`);

const missingOnDisk = [];
const existingOnDisk = [];

referencedImages.forEach(img => {
  const fullPath = path.join(root, img);
  if (fs.existsSync(fullPath)) {
    existingOnDisk.push(img);
  } else {
    missingOnDisk.push(img);
  }
});

console.log(`Existing on disk: ${existingOnDisk.length}`);
console.log(`Missing on disk: ${missingOnDisk.length}`);
if (missingOnDisk.length > 0) {
  console.log('Missing files sample:', missingOnDisk.slice(0, 10));
}
