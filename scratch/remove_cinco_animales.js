const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'kung-fu.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the link button to #cinco-animales
const btnRegex = /\s*<a class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface-container-lowest text-secondary font-semibold text-sm hover:text-on-surface transition-all border border-surface-container-highest shadow-sm gap-2" href="#cinco-animales">[\s\S]*?<\/a>/;
if (btnRegex.test(content)) {
  content = content.replace(btnRegex, '');
  console.log('Removed button link to #cinco-animales');
} else {
  console.log('Button link not found');
}

// 2. Update metric card
const metricOld = `<div class="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest text-center">
            <span class="block text-2xl font-bold text-on-surface">5 Animales</span>
            <span class="text-xs font-medium text-secondary">Tigre, Leopardo, Serpiente, Grulla, Dragón</span>
          </div>`;
const metricNew = `<div class="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest text-center">
            <span class="block text-2xl font-bold text-on-surface">Taolu &amp; Armas</span>
            <span class="text-xs font-medium text-secondary">Formas y Armas Tradicionales</span>
          </div>`;

if (content.includes('5 Animales') && content.includes('Tigre, Leopardo, Serpiente, Grulla, Dragón')) {
  content = content.replace(
    /<div class="p-4 rounded-xl bg-surface-container-low border border-surface-container-highest text-center">\s*<span class="block text-2xl font-bold text-on-surface">5 Animales<\/span>\s*<span class="text-xs font-medium text-secondary">Tigre, Leopardo, Serpiente, Grulla, Dragón<\/span>\s*<\/div>/,
    metricNew
  );
  console.log('Updated metric card');
}

// 3. Remove the entire Cinco Animales section
const sectionRegex = /\s*<!-- EL SISTEMA DE LOS CINCO ANIMALES DE JUE YUAN -->\s*<section class="w-full py-16 lg:py-20 bg-surface border-b border-surface-container-high" id="cinco-animales">[\s\S]*?<\/section>/;

if (sectionRegex.test(content)) {
  content = content.replace(sectionRegex, '');
  console.log('Removed Cinco Animales section');
} else {
  console.log('Cinco Animales section regex did not match');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating kung-fu.html');
