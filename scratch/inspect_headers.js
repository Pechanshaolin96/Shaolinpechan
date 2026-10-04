const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log(`Inspecting header in ${files.length} files...\n`);

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hasSiteHeader = content.includes('id="site-header"');
  const hasHeaderBrandRow = content.includes('header-brand-row');
  const hasHeaderNavRow = content.includes('id="header-nav-row"');
  const hasBrandCenterLink = content.includes('brand-center-link');
  const hasDesktopNav = content.includes('id="desktop-nav"');

  console.log(`${f.padEnd(25)} | siteHeader: ${hasSiteHeader} | brandRow: ${hasHeaderBrandRow} | navRow: ${hasHeaderNavRow}`);
});
