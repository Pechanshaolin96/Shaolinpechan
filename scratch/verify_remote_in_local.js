const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const targetDir = path.join(dir, 'imagenes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let found = 0;
let missing = 0;
const missingList = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = [...content.matchAll(/https?:\/\/(www\.)?shaolin\.ar\/wp-content\/uploads\/([^\s"'><]+)/g)];
  matches.forEach(m => {
    const rawFilename = path.basename(m[2]);
    const localPath = path.join(targetDir, rawFilename);
    if (fs.existsSync(localPath)) {
      found++;
    } else {
      missing++;
      missingList.push({ file: f, url: m[0], filename: rawFilename });
    }
  });
});

console.log(`Found locally: ${found}`);
console.log(`Missing locally: ${missing}`);
if (missingList.length > 0) {
  console.log('Missing items:', missingList);
}
