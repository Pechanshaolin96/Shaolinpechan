const https = require('https');

function checkUrl(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url, '->', res.statusCode);
    if (res.headers.location) console.log('  redirect ->', res.headers.location);
  }).on('error', e => console.error(url, e.message));
}

checkUrl('https://www.shaolin.ar/sitemap.xml');
checkUrl('https://www.shaolin.ar/sitemap_index.xml');
checkUrl('https://www.shaolin.ar/wp-sitemap.xml');
checkUrl('https://www.shaolin.ar/robots.txt');
