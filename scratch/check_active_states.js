const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log('Checking active states across all HTML files:');
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const desktopMatch = content.match(/id="desktop-nav"[\s\S]*?<\/nav>/);
  if (desktopMatch) {
    const activeLinks = (desktopMatch[0].match(/class="[^"]*nav-desktop-link[^"]*active[^"]*"/g) || []).length;
    const activeItems = (desktopMatch[0].match(/class="[^"]*nav-dropdown-item[^"]*active[^"]*"/g) || []).length;
    console.log(`${f.padEnd(25)} : activeLinks=${activeLinks}, activeItems=${activeItems}`);
  } else {
    console.log(`${f.padEnd(25)} : NO desktop-nav`);
  }
});
