const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log('Auditing all image references across all 23 HTML pages...\n');

let totalImgs = 0;
let missingImgs = 0;
const report = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];

  imgMatches.forEach(m => {
    totalImgs++;
    const src = m[1];
    // Ignore data: URLs
    if (src.startsWith('data:')) return;

    // Check local path
    const localPath = path.resolve(dir, src);
    const exists = fs.existsSync(localPath);

    if (!exists) {
      missingImgs++;
      report.push({ file: f, src, status: 'MISSING' });
    }
  });
});

console.log(`Total <img> tags evaluated: ${totalImgs}`);
console.log(`Missing local images: ${missingImgs}`);

if (missingImgs > 0) {
  console.log('Missing images details:');
  console.table(report);
} else {
  console.log('\nSUCCESS! 100% of all image tags across all 23 HTML pages resolve to existing local files on disk!');
}
