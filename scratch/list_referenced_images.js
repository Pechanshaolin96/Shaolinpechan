const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

const referencedImages = new Set();

files.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const matches = content.match(/(?:src|url)\(?['"]?(imagenes\/[^'"\)\?\#]+)/gi) || [];
  matches.forEach(m => {
    const clean = m.replace(/^(?:src|url)\(?['"]?/, '').trim();
    referencedImages.add(clean);
  });
});

console.log('Referenced images list:');
Array.from(referencedImages).sort().forEach(img => console.log(' -', img));
