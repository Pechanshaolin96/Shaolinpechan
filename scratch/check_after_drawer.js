const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  let drawerEnd = -1;
  if (content.includes('</aside>')) {
    drawerEnd = content.indexOf('</aside>') + '</aside>'.length;
  } else if (content.includes('id="mobile-menu"')) {
    const mIdx = content.indexOf('id="mobile-menu"');
    const heroIdx = content.search(/<!--\s*(HERO|ENCABEZADO|CONTENIDO)/i);
    const mainIdx = content.indexOf('<main');
    const secIdx = content.indexOf('<section');
    const candidates = [heroIdx, mainIdx, secIdx].filter(x => x > mIdx);
    drawerEnd = Math.min(...candidates);
  }
  const nextSnippet = content.substring(drawerEnd, drawerEnd + 60).replace(/\r?\n/g, ' ').trim();
  console.log(`${f.padEnd(25)} -> Next: ${nextSnippet}`);
});
