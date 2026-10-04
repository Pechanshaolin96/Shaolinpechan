const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let total = 0;
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = [...content.matchAll(/https?:\/\/(www\.)?shaolin\.ar\/wp-content\/uploads\/([^\s"'><]+)/g)];
  if (matches.length > 0) {
    console.log(`${f.padEnd(25)} -> ${matches.length} remote images`);
    total += matches.length;
  }
});

console.log(`\nTotal remote shaolin.ar upload links: ${total}`);
