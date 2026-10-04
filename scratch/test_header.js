const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('index.html', 'utf8');
const start = content.indexOf('<header id="site-header"');
const end = content.indexOf('</header>', start) + 9;
console.log('Header length:', end - start);
console.log('First 400 chars:\n', content.slice(start, start + 400));
