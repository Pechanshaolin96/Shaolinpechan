const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const target = `<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Qi Gong Cultivo de la Energía Vital" src="imagenes/qi-gong11.jpg" loading="lazy">`;

const replacement = `<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style="object-position: center top;" alt="Qi Gong Cultivo de la Energía Vital" src="imagenes/qi-gong11.jpg" loading="lazy">`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated Qi Gong image position in index.html');
} else {
  console.log('Target not found in index.html');
}
