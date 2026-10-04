const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const imgDir = path.join(dir, 'imagenes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'iconos-catalogo.html');

console.log('Auditing and updating image paths across HTML files...\n');

let totalReplacements = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanges = 0;

  // Regex to match shaolin.ar upload URLs
  const regex = /https?:\/\/(www\.)?shaolin\.ar\/wp-content\/uploads\/([^\s"'><]+)/g;

  content = content.replace(regex, (match, www, filenameWithQuery) => {
    let filename = path.basename(filenameWithQuery.split('?')[0]);

    // Check if filename has WordPress thumbnail dimension like -495x400.jpg
    const thumbMatch = filename.match(/^(.+)-(\d+)x(\d+)\.(jpg|jpeg|png|webp)$/i);
    if (thumbMatch) {
      const originalCandidate = `${thumbMatch[1]}.${thumbMatch[4]}`;
      if (fs.existsSync(path.join(imgDir, originalCandidate))) {
        filename = originalCandidate;
      }
    }

    if (fs.existsSync(path.join(imgDir, filename))) {
      fileChanges++;
      return `imagenes/${filename}`;
    }

    console.warn(`[WARN] File not found locally in ${f}: ${filename}`);
    return match;
  });

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED] ${f}: ${fileChanges} image URLs localized to imagenes/`);
    totalReplacements += fileChanges;
  }
});

console.log(`\nTotal URLs localized: ${totalReplacements}`);
