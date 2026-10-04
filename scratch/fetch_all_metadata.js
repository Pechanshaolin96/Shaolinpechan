const https = require('https');
const fs = require('fs');
const path = require('path');

async function fetchPage(page) {
  const url = `https://www.shaolin.ar/wp-json/wp/v2/media?per_page=100&page=${page}`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode !== 200) {
        return resolve({ page, items: [], totalPages: 0, status: res.statusCode });
      }
      const totalPages = parseInt(res.headers['x-wp-totalpages'] || '0', 10);
      const totalItems = parseInt(res.headers['x-wp-total'] || '0', 10);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const items = JSON.parse(data);
          resolve({ page, items, totalPages, totalItems, status: 200 });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching first page to determine total pages...');
  const first = await fetchPage(1);
  console.log(`Total items reported: ${first.totalItems}, total pages: ${first.totalPages}`);

  let allMedia = [...first.items];

  for (let p = 2; p <= first.totalPages; p++) {
    console.log(`Fetching page ${p}/${first.totalPages}...`);
    try {
      const res = await fetchPage(p);
      if (res.items && res.items.length > 0) {
        allMedia.push(...res.items);
      }
    } catch (err) {
      console.error(`Error on page ${p}:`, err.message);
      // retry once
      try {
        await new Promise(r => setTimeout(r, 1500));
        const res = await fetchPage(p);
        if (res.items) allMedia.push(...res.items);
      } catch (e) {
        console.error(`Retry failed for page ${p}`);
      }
    }
    // Small delay to be polite to the server
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nSuccessfully gathered ${allMedia.length} media records!`);

  // Map to clean inventory
  const cleanInventory = allMedia.map(item => {
    const details = item.media_details || {};
    return {
      id: item.id,
      title: item.title?.rendered || '',
      date: item.date || '',
      mime: item.mime_type || '',
      source_url: item.source_url || '',
      width: details.width || 0,
      height: details.height || 0,
      file: details.file || '',
      sizes: details.sizes ? Object.keys(details.sizes) : []
    };
  }).filter(item => item.source_url && item.mime.startsWith('image/'));

  console.log(`Total image files: ${cleanInventory.length}`);

  const outputPath = path.join(__dirname, 'shaolin_media_inventory.json');
  fs.writeFileSync(outputPath, JSON.stringify(cleanInventory, null, 2), 'utf8');
  console.log(`Saved inventory to ${outputPath}`);
}

main().catch(console.error);
