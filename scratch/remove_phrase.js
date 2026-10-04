const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'kung-fu.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetRegex = /\s*<li class="flex items-center gap-2">\s*<span class="material-symbols-outlined text-ochre-gold text-\[18px\]">check<\/span>\s*<span>Primera forma tradicional continua: Lian Huan Quan \(连环拳\)<\/span>\s*<\/li>/;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully removed the phrase from kung-fu.html');
} else {
  console.log('Phrase not matched');
}
