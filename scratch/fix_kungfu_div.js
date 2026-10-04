const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'kung-fu.html');
let content = fs.readFileSync(filePath, 'utf8');

const target = `<a class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-on-primary`;
const replacement = `<div class="mt-8 flex flex-wrap items-center justify-center gap-4">\r\n          <a class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-on-primary`;

if (content.includes(target) && !content.includes('<div class="mt-8 flex flex-wrap items-center justify-center gap-4">')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Restored opening div');
} else {
  console.log('Already present or target not found');
}
