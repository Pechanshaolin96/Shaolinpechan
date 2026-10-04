const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/<a class="brand-center-link[\s\S]*?<\/a>/);
  if (match) {
    const text = match[0].replace(/\s+/g, ' ');
    console.log(`${f.padEnd(25)} : length=${match[0].length}, includes 'Sede Oficial'=${text.includes('Sede Oficial')}`);
  } else {
    console.log(`${f.padEnd(25)} : NO brand-center-link`);
  }
});
