const https = require('https');

https.get('https://www.shaolin.ar/wp-json/wp/v2/media?per_page=20', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const items = JSON.parse(data);
      console.log('Got', items.length, 'items');
      items.forEach((item, idx) => {
        const mime = item.mime_type;
        const width = item.media_details?.width;
        const height = item.media_details?.height;
        const title = item.title?.rendered;
        const url = item.source_url;
        console.log(`[${idx + 1}] ${mime} | ${width}x${height} | ${url}`);
      });
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', e => console.error(e));
