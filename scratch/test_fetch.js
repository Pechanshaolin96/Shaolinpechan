const https = require('https');
const http = require('http');

function fetchUrl(targetUrl) {
  const lib = targetUrl.startsWith('https') ? https : http;
  lib.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    console.log('Fetching:', targetUrl, '-> Status:', res.statusCode);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirecting to:', res.headers.location);
      fetchUrl(res.headers.location);
      return;
    }
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Body length:', data.length);
      const imgMatches = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
      console.log('Sample images found (' + imgMatches.length + ' total):', imgMatches.slice(0, 10));
      const srcsetMatches = [...data.matchAll(/srcset=["']([^"']+)["']/gi)].map(m => m[1]);
      console.log('Sample srcset found (' + srcsetMatches.length + ' total)');
      const bgMatches = [...data.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map(m => m[1]);
      console.log('Sample CSS bg found (' + bgMatches.length + ' total):', bgMatches.slice(0, 10));
    });
  }).on('error', err => console.error('Error:', err.message));
}

fetchUrl('https://www.shaolin.ar/');
