const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Target 1: Shaolin Kung Fu Card
const oldCard1 = `<div class="relative h-52 sm:h-56 overflow-hidden bg-stone-950 flex items-center justify-center">
            <img class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Shaolin Kung Fu Tradicional" src="imagenes/yo/Captura de pantalla 2024-04-21 095439.png" loading="lazy">
          </div>`;

const newCard1 = `<div class="relative h-60 sm:h-64 overflow-hidden bg-surface-container">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style="object-position: 65% 65%;" alt="Shaolin Kung Fu Tradicional" src="imagenes/yo/Captura de pantalla 2024-04-21 095439.png" loading="lazy">
          </div>`;

// Target 2: Chen Taijiquan Card
const oldCard2 = `<div class="relative h-52 sm:h-56 overflow-hidden bg-stone-950 flex items-center justify-center">
            <img class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Chen Taijiquan Tradicional" src="imagenes/yo/Captura de pantalla 2024-04-21 095522.png" loading="lazy">
          </div>`;

const newCard2 = `<div class="relative h-60 sm:h-64 overflow-hidden bg-surface-container">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style="object-position: 50% 55%;" alt="Chen Taijiquan Tradicional" src="imagenes/yo/Captura de pantalla 2024-04-21 095522.png" loading="lazy">
          </div>`;

// Replace normalizing CRLF
content = content.replace(
  /<div class="relative h-52 sm:h-56 overflow-hidden bg-stone-950 flex items-center justify-center">\s*<img class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Shaolin Kung Fu Tradicional" src="imagenes\/yo\/Captura de pantalla 2024-04-21 095439\.png" loading="lazy">\s*<\/div>/,
  newCard1
);

content = content.replace(
  /<div class="relative h-52 sm:h-56 overflow-hidden bg-stone-950 flex items-center justify-center">\s*<img class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Chen Taijiquan Tradicional" src="imagenes\/yo\/Captura de pantalla 2024-04-21 095522\.png" loading="lazy">\s*<\/div>/,
  newCard2
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated cards images in index.html');
