const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'shaolin_media_inventory.json'), 'utf8'));

const filenames = new Map();
let duplicates = 0;

inventory.forEach(item => {
  const url = item.source_url;
  const basename = path.basename(new URL(url).pathname);
  if (filenames.has(basename)) {
    duplicates++;
    filenames.get(basename).push(url);
  } else {
    filenames.set(basename, [url]);
  }
});

console.log('Total files:', inventory.length);
console.log('Unique basenames:', filenames.size);
console.log('Duplicate basenames count:', duplicates);

if (duplicates > 0) {
  console.log('Sample duplicates:');
  let shown = 0;
  for (const [name, urls] of filenames.entries()) {
    if (urls.length > 1 && shown < 5) {
      console.log(`  ${name} (${urls.length} times):`, urls);
      shown++;
    }
  }
}
