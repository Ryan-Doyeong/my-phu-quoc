// Generates responsive hero variants from the 1920 source. Usage: node scripts/build-hero-variants.mjs
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'hero')
const src = path.join(dir, '02_kiss_bridge_aerial_1920.webp')
const meta = await sharp(src).metadata()
console.log(`source ${meta.width}x${meta.height}`)
for (const w of [480, 768, 1200]) {
  const out = path.join(dir, `02_kiss_bridge_aerial_${w}.webp`)
  const info = await sharp(src).resize({ width: w }).webp({ quality: 72 }).toFile(out)
  console.log(`${path.basename(out)} ${info.width}x${info.height} ${info.size}B`)
}
