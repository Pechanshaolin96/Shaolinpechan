const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'shaolin_media_inventory.json'), 'utf8'));

console.log('Total images in inventory:', inventory.length);

const urls = new Set(inventory.map(i => i.source_url));
console.log('Unique source URLs:', urls.size);

// Resolution statistics
let over1080p = 0;
let over720p = 0;
let thumbnails = 0;

const categories = {};

inventory.forEach(item => {
  const w = item.width || 0;
  const h = item.height || 0;
  const maxDim = Math.max(w, h);
  if (maxDim >= 1200) over1080p++;
  else if (maxDim >= 700) over720p++;
  else thumbnails++;

  // Categorize by URL or filename keywords
  const fn = item.source_url.toLowerCase();
  let cat = 'general';
  if (fn.includes('maestro') || fn.includes('discipulo') || fn.includes('shifu') || fn.includes('prof') || fn.includes('chen') || fn.includes('vera') || fn.includes('deyang') || fn.includes('suxi') || fn.includes('encinas')) cat = 'maestros-linaje';
  else if (fn.includes('kung-fu') || fn.includes('kungfu') || fn.includes('shaolin')) cat = 'shaolin-kung-fu';
  else if (fn.includes('taiji') || fn.includes('taichi')) cat = 'taijiquan';
  else if (fn.includes('qigong') || fn.includes('qi-gong') || fn.includes('chi-kung')) cat = 'qi-gong';
  else if (fn.includes('meditacion') || fn.includes('chan')) cat = 'meditacion-chan';
  else if (fn.includes('china') || fn.includes('viaje')) cat = 'viajes-china';
  else if (fn.includes('retiro') || fn.includes('ceremonia') || fn.includes('seminario')) cat = 'eventos-galeria';
  else if (fn.includes('logo') || fn.includes('banner') || fn.includes('header')) cat = 'institucional';

  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('\nResolution Breakdown:');
console.log(`- High Res (>= 1200px): ${over1080p}`);
console.log(`- Medium Res (700-1199px): ${over720p}`);
console.log(`- Small / Avatar (< 700px): ${thumbnails}`);

console.log('\nCategory Breakdown:');
console.table(categories);

console.log('\nSample URLs:');
console.log(inventory.slice(0, 10).map(i => `${i.width}x${i.height} -> ${i.source_url}`));
