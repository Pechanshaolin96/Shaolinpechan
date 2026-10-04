const https = require('https');

https.get('https://www.shaolin.ar/wp-json/wp/v2/media?per_page=1', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  console.log('Status:', res.statusCode);
  console.log('Total Media (x-wp-total):', res.headers['x-wp-total']);
  console.log('Total Pages (x-wp-totalpages):', res.headers['x-wp-totalpages']);
}).on('error', e => console.error(e));
