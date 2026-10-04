const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const referencedImages = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  // Match any string starting with imagenes/ inside quotes or parentheses
  const regex = /["'](imagenes\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    // Remove query params if any
    const clean = match[1].split('?')[0].split('#')[0];
    referencedImages.add(clean);
  }
});

console.log(`Total unique referenced images in HTML (broad regex): ${referencedImages.size}`);
console.log('List of all referenced images:');
Array.from(referencedImages).sort().forEach(img => console.log(' -', img));
