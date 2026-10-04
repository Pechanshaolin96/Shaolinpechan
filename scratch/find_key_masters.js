const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'imagenes');
const files = fs.readdirSync(targetDir);

const encinas = files.filter(f => f.toLowerCase().includes('encinas') || f.toLowerCase().includes('pablo'));
console.log('Encinas/Pablo images found:', encinas);

const vera = files.filter(f => f.toLowerCase().includes('vera') || f.toLowerCase().includes('daniel'));
console.log('Vera/Daniel images found:', vera);

const deyang = files.filter(f => f.toLowerCase().includes('de_yang') || f.toLowerCase().includes('deyang') || f.toLowerCase().includes('shi_de'));
console.log('Shi De Yang images found:', deyang);

const ziqiang = files.filter(f => f.toLowerCase().includes('ziqiang') || f.toLowerCase().includes('chen_zi'));
console.log('Chen Ziqiang images found:', ziqiang);
