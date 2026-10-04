const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('<div class="header-brand-row');
const end = content.indexOf('<!-- FILA INFERIOR:');
console.log(content.slice(start, end));
