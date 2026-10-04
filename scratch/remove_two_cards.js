const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'kung-fu.html');
let content = fs.readFileSync(filePath, 'utf8');

// Regex targeting Card 3 and Card 4 in Programas Formativos
const cardRegex = /\s*<!-- Card 3: Taolu Avanzado & Armas -->[\s\S]*?<!-- Card 4: Sanda & Combate -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

// Let's verify what matches:
// Card 3 starts with `<!-- Card 3: Taolu Avanzado & Armas -->`
// Card 4 ends before `</div>\s*</div>\s*</section>`
const targetCardsRegex = /\s*<!-- Card 3: Taolu Avanzado & Armas -->[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/section>\s*<!-- PERFIL DEL INSTRUCTOR)/;

if (targetCardsRegex.test(content)) {
  content = content.replace(targetCardsRegex, '');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully removed Card 3 and Card 4 from kung-fu.html');
} else {
  console.log('Target cards regex did not match');
}
