const https = require('https');

function testJson(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url, 'Status:', res.statusCode);
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log('Is Array?', Array.isArray(json), 'Count:', json.length);
        if (Array.isArray(json) && json.length > 0) {
          console.log('Sample item:', json[0].source_url, json[0].media_details ? json[0].media_details.width + 'x' + json[0].media_details.height : 'no media_details');
        } else {
          console.log('Response sample:', data.substring(0, 200));
        }
      } catch (e) {
        console.log('Non-JSON response length:', data.length, data.substring(0, 200));
      }
    });
  }).on('error', e => console.error(e));
}

testJson('https://www.shaolin.ar/wp-json/wp/v2/media?per_page=10');
testJson('https://www.shaolin.ar/wp-sitemap.xml');
