const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log(`Found ${files.length} HTML files to inspect:\n`);

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const bodyIdx = content.indexOf('<body');
  const bodyTagEnd = content.indexOf('>', bodyIdx);
  const headerIdx = content.indexOf('<header');
  
  // Find where header ends and mobile drawer ends
  let drawerEndIdx = -1;
  const asideCloseIdx = content.indexOf('</aside>');
  const mobileMenuCloseIdx = content.indexOf('<!-- HERO');
  const mainIdx = content.indexOf('<main');
  
  console.log(`${f.padEnd(25)} | body: ${bodyIdx} | header: ${headerIdx} | </aside>: ${asideCloseIdx} | <main: ${mainIdx}`);
});
