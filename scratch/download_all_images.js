const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const inventoryPath = path.join(__dirname, 'shaolin_media_inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const targetDir = path.resolve(__dirname, '..', 'imagenes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Starting download of ${inventory.length} images into: ${targetDir}`);

const CONCURRENCY = 8;
let currentIndex = 0;
let completedCount = 0;
let skippedCount = 0;
let failedCount = 0;
const errors = [];

function downloadFile(url, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    // Check if already exists and non-empty
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      if (stats.size > 0) {
        skippedCount++;
        return resolve('skipped');
      }
    }

    const fileStream = fs.createWriteStream(destPath);
    const lib = url.startsWith('https') ? https : http;

    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fileStream.close();
        fs.unlink(destPath, () => {});
        return downloadFile(res.headers.location, destPath, retries).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        fileStream.close();
        fs.unlink(destPath, () => {});
        if (retries > 0) {
          setTimeout(() => {
            downloadFile(url, destPath, retries - 1).then(resolve).catch(reject);
          }, 1000);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        return;
      }

      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          completedCount++;
          resolve('downloaded');
        });
      });
    });

    req.on('error', err => {
      fileStream.close();
      fs.unlink(destPath, () => {});
      if (retries > 0) {
        setTimeout(() => {
          downloadFile(url, destPath, retries - 1).then(resolve).catch(reject);
        }, 1000);
      } else {
        reject(err);
      }
    });

    req.setTimeout(30000, () => {
      req.destroy();
      fileStream.close();
      fs.unlink(destPath, () => {});
      if (retries > 0) {
        setTimeout(() => {
          downloadFile(url, destPath, retries - 1).then(resolve).catch(reject);
        }, 1000);
      } else {
        reject(new Error(`Timeout downloading ${url}`));
      }
    });
  });
}

async function worker() {
  while (currentIndex < inventory.length) {
    const item = inventory[currentIndex++];
    const url = item.source_url;
    const filename = path.basename(new URL(url).pathname);
    const destPath = path.join(targetDir, filename);

    try {
      await downloadFile(url, destPath);
    } catch (err) {
      failedCount++;
      errors.push({ url, error: err.message });
      console.error(`[FAIL] ${filename}: ${err.message}`);
    }

    const totalProcessed = completedCount + skippedCount + failedCount;
    if (totalProcessed % 100 === 0 || totalProcessed === inventory.length) {
      const pct = ((totalProcessed / inventory.length) * 100).toFixed(1);
      console.log(`[Progress ${pct}%] Processed: ${totalProcessed}/${inventory.length} | New: ${completedCount} | Skipped: ${skippedCount} | Failed: ${failedCount}`);
    }
  }
}

async function run() {
  const startTime = Date.now();
  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n========================================`);
  console.log(`Download finished in ${durationSec}s!`);
  console.log(`Total files processed: ${inventory.length}`);
  console.log(`Newly downloaded: ${completedCount}`);
  console.log(`Already existed (skipped): ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (errors.length > 0) {
    console.log(`Writing error log (${errors.length} errors)...`);
    fs.writeFileSync(path.join(__dirname, 'download_errors.json'), JSON.stringify(errors, null, 2), 'utf8');
  }

  // Count files in targetDir
  const diskFiles = fs.readdirSync(targetDir);
  console.log(`Total files in ${targetDir}: ${diskFiles.length}`);
}

run().catch(console.error);
