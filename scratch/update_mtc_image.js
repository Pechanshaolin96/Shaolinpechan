const fs = require('fs');
const path = require('path');

// 1. Update index.html
const indexFile = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexFile, 'utf8');

const oldIndexImg = `<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Medicina Tradicional China y Acupuntura" src="imagenes/actividad-medicina-china.jpg" loading="lazy">`;
const newIndexImg = `<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style="object-position: 60% 35%;" alt="Medicina Tradicional China y Acupuntura" src="imagenes/medicina7.jpg" loading="lazy">`;

if (indexContent.includes(oldIndexImg)) {
  indexContent = indexContent.replace(oldIndexImg, newIndexImg);
  fs.writeFileSync(indexFile, indexContent, 'utf8');
  console.log('Successfully updated MTC image in index.html');
} else {
  console.log('Target not found in index.html');
}

// 2. Update linaje-sedes.html
const linajeFile = path.join(__dirname, '..', 'linaje-sedes.html');
let linajeContent = fs.readFileSync(linajeFile, 'utf8');

const oldLinajeImg = `<img alt="Atención en Medicina Tradicional China" class="w-full h-full object-cover" src="imagenes/actividad-medicina-china.jpg" loading="lazy">`;
const newLinajeImg = `<img alt="Atención en Medicina Tradicional China" class="w-full h-full object-cover" style="object-position: 60% 35%;" src="imagenes/medicina7.jpg" loading="lazy">`;

if (linajeContent.includes(oldLinajeImg)) {
  linajeContent = linajeContent.replace(oldLinajeImg, newLinajeImg);
  fs.writeFileSync(linajeFile, linajeContent, 'utf8');
  console.log('Successfully updated MTC image in linaje-sedes.html');
} else {
  console.log('Target not found in linaje-sedes.html');
}
