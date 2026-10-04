const fs = require('fs');

['index.html', 'linaje-sedes.html', 'tai-ji-mtc.html'].forEach(file => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('googleusercontent.com')) {
      console.log(`${file} line ${idx + 1}: ${line.trim().substring(0, 120)}...`);
    }
  });
});
