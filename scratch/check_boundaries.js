const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const bodyMatch = content.match(/<body[^>]*>/);
  if (!bodyMatch) return;
  const bodyEnd = bodyMatch.index + bodyMatch[0].length;
  const headerStart = content.indexOf('<header');
  const between = content.substring(bodyEnd, headerStart).trim();
  const hasDoctrinal = between.includes('doctrinal-top-bar') || between.includes('少林是禅不是拳');
  
  // Also check where mobile drawer ends
  let drawerEnd = -1;
  if (content.includes('</aside>')) {
    drawerEnd = content.indexOf('</aside>') + '</aside>'.length;
  } else if (content.includes('id="mobile-menu"')) {
    // Find matching closing div for mobile-menu
    const mIdx = content.indexOf('id="mobile-menu"');
    const heroIdx = content.search(/<!--\s*(HERO|ENCABEZADO|CONTENIDO)/i);
    const mainIdx = content.indexOf('<main');
    const secIdx = content.indexOf('<section');
    const candidates = [heroIdx, mainIdx, secIdx].filter(x => x > mIdx);
    drawerEnd = Math.min(...candidates);
  }
  
  console.log(`${f.padEnd(25)} | hasDoctrinal: ${hasDoctrinal} | drawerEnd: ${drawerEnd}`);
});
