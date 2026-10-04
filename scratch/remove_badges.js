const fs = require('fs');
const path = require('path');

function cleanBadges(fileName) {
  const filePath = path.join(__dirname, '..', fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Single line badges with badge-red, badge-gold, or bg-stone-100:
  // e.g. <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold badge-red">...</div>
  content = content.replace(/[ \t]*<div class="inline-flex items-center px-2\.5 py-0\.5 rounded-full text-xs font-semibold (badge-red|badge-gold|bg-stone-100 text-stone-700 border border-stone-200)">.*?<\/div>\r?\n/g, '');

  // 2. Multiline badges for Pablo Encinas (Instructor de Sede Pechan):
  content = content.replace(/[ \t]*<div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge-red">\s*Instructor de Sede Pechan[^\n]*\s*<\/div>\r?\n/g, '');

  // 3. Badges in discipulos-shaolin.html:
  content = content.replace(/[ \t]*<div class="inline-flex items-center px-2\.5 py-0\.5 rounded-full text-\[11px\] font-(semibold|bold) badge-red mb-2">.*?<\/div>\r?\n/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully cleaned badges in ' + fileName);
  } else {
    console.log('No matches found in ' + fileName);
  }
}

cleanBadges('maestros-shaolin.html');
cleanBadges('maestros-taiji.html');
cleanBadges('discipulos-shaolin.html');
