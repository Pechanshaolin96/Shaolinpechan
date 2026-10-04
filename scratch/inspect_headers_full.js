const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const brandRowMatch = content.match(/<div class="header-brand-row[^>]*>/);
  const brandLinkMatch = content.match(/<a class="brand-center-link[^>]*>/);
  const mobileTriggerMatch = content.match(/<div class="mobile-menu-trigger-wrap[^>]*>/);
  const navRowMatch = content.match(/<div id="header-nav-row"[^>]*>/);

  console.log(`=== ${f} ===`);
  console.log('Brand Row:', brandRowMatch ? brandRowMatch[0] : 'MISSING');
  console.log('Brand Link:', brandLinkMatch ? brandLinkMatch[0] : 'MISSING');
  console.log('Mobile Trigger:', mobileTriggerMatch ? mobileTriggerMatch[0] : 'MISSING');
  console.log('Nav Row:', navRowMatch ? navRowMatch[0] : 'MISSING');
});
