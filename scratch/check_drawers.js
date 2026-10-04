const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log('Checking mobile drawer across all HTML files:');
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hasDrawer = content.includes('id="mobile-drawer"');
  const hasBackdrop = content.includes('id="mobile-drawer-backdrop"');
  console.log(`${f.padEnd(25)} : hasDrawer=${hasDrawer}, hasBackdrop=${hasBackdrop}`);
});
