const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const data = JSON.parse(fs.readFileSync('/tmp/extracted_agoda_9_hotels.json', 'utf8'));

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  const root = '/tmp/test-repo';
  for (const h of data) {
    console.log(`\nDownloading photos for ${h.slug}...`);
    const hotelDir = path.join(root, 'public', 'images', 'hotels', h.slug);
    fs.mkdirSync(hotelDir, { recursive: true });

    const localPhotos = [];
    let idx = 1;
    for (const pUrl of (h.photos || [])) {
      if (!pUrl || (!pUrl.startsWith('http://') && !pUrl.startsWith('https://'))) continue;
      const pad = String(idx).padStart(2, '0');
      const filename = `photo_${pad}.jpg`;
      const dest = path.join(hotelDir, filename);
      try {
        await downloadFile(pUrl, dest);
        console.log(`  Downloaded -> /images/hotels/${h.slug}/${filename}`);
        localPhotos.push(`/images/hotels/${h.slug}/${filename}`);
        idx++;
        if (idx > 6) break;
      } catch (err) {
        console.error(`  Error downloading ${pUrl}: ${err.message}`);
      }
    }

    if (localPhotos.length > 0) {
      // Also copy photo_01.jpg as covers-photo webp/jpg fallback
      const coversDir = path.join(root, 'public', 'covers-photo');
      fs.mkdirSync(coversDir, { recursive: true });
      fs.copyFileSync(path.join(hotelDir, 'photo_01.jpg'), path.join(coversDir, `${h.slug}-1.webp`));
      console.log(`  Created cover photo fallback: /covers-photo/${h.slug}-1.webp`);
    }

    h.savedLocalPhotos = localPhotos;
  }

  fs.writeFileSync('/tmp/extracted_agoda_9_hotels.json', JSON.stringify(data, null, 2));
  console.log('\nAll downloads complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
