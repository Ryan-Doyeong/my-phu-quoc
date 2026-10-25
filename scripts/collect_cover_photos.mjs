// scripts/collect_cover_photos.mjs
// Ryan 결정 및 Claude 수정 지시 3차 준수:
// 1순위: 업체 공식 홈페이지(website_url) 또는 공식 SNS(instagram_url 등)에 이미 올라와 있는 실제 사진을 타이틀 사진으로 사용.
// 2순위: 사진이 없으면 단색 배경 + 영어 상호 레터링(BusinessCover).
// 출처 URL을 data/cover-photos.json 에 { slug, image_url, source_page_url, found_at } 기록.
// 구글 지도 사진, OSM, 스톡 사진 사용 금지. 로그인 필요 시 건너뜀.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const registryPath = path.join(rootDir, 'data', 'businesses-registry.json');
const outputPath = path.join(rootDir, 'data', 'cover-photos.json');
const coversPhotoDir = path.join(rootDir, 'public', 'covers-photo');

if (!fs.existsSync(coversPhotoDir)) {
  fs.mkdirSync(coversPhotoDir, { recursive: true });
}

const businesses = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

// Blacklist keywords for images that are clearly logos, icons, placeholders or generic graphics
const BLACKLIST_PATTERNS = [
  /logo/i,
  /favicon/i,
  /icon/i,
  /avatar/i,
  /placeholder/i,
  /banner_default/i,
  /spinner/i,
  /badge/i,
  /\.svg$/i,
  /tripadvisor/i,
  /google/i,
  /facebook.*default/i,
  /wix_icon/i,
  /loading/i,
  /1x1/i
];

function isDisallowedSocial(url) {
  if (!url) return true;
  const lower = url.toLowerCase();
  // Facebook profiles or private accounts require login
  if (lower.includes('facebook.com/profile.php') || lower.includes('facebook.com/share/')) return true;
  if (lower.includes('instagram.com') && !lower.includes('/p/')) return true; // generic profile often blocked
  if (lower.includes('google.com') || lower.includes('goo.gl')) return true;
  if (lower.includes('tripadvisor.com')) return true;
  return false;
}

function resolveUrl(relativeOrAbsolute, base) {
  try {
    return new URL(relativeOrAbsolute, base).href;
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url, timeoutMs = 4500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi,en-US,en;q=0.9,ko;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    return null;
  }
}

async function extractOfficialPhoto(business) {
  const websiteUrl = business.website_url;
  if (!websiteUrl || isDisallowedSocial(websiteUrl)) {
    return null;
  }

  // Only check http/https
  if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
    return null;
  }

  const res = await fetchWithTimeout(websiteUrl, 4500);
  if (!res || !res.ok) return null;

  const html = await res.text();

  // Try og:image
  let match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
              html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
              html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
              html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);

  let candidateUrl = match ? match[1] : null;

  // If og:image not found, search for hero banner / main slider image
  if (!candidateUrl) {
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
    for (const m of imgMatches) {
      const src = m[1];
      const tag = m[0].toLowerCase();
      if ((tag.includes('banner') || tag.includes('hero') || tag.includes('slider') || tag.includes('cover')) &&
          !BLACKLIST_PATTERNS.some(p => p.test(src))) {
        candidateUrl = src;
        break;
      }
    }
  }

  if (!candidateUrl) return null;

  // Resolve absolute URL
  const resolved = resolveUrl(candidateUrl, websiteUrl);
  if (!resolved) return null;

  // Check blacklists
  for (const pattern of BLACKLIST_PATTERNS) {
    if (pattern.test(resolved)) {
      return null;
    }
  }

  // Validate that image is reachable and really an image
  const imgRes = await fetchWithTimeout(resolved, 4000);
  if (!imgRes || !imgRes.ok) return null;

  const contentType = imgRes.headers.get('content-type') || '';
  if (!contentType.startsWith('image/')) return null;

  const buffer = Buffer.from(await imgRes.arrayBuffer());
  // Skip if image is too small (e.g. less than 15KB is likely a tiny badge or spacer)
  if (buffer.length < 15000) return null;

  // Determine file extension
  let ext = 'jpg';
  if (contentType.includes('png')) ext = 'png';
  else if (contentType.includes('webp')) ext = 'webp';
  else if (contentType.includes('jpeg')) ext = 'jpg';

  // Save local copy to public/covers-photo/${slug}.${ext}
  const localFileName = `${business.slug}.${ext}`;
  const localFilePath = path.join(coversPhotoDir, localFileName);
  fs.writeFileSync(localFilePath, buffer);

  const localPublicUrl = `/covers-photo/${localFileName}`;

  return {
    slug: business.slug,
    name: business.public_name,
    image_url: localPublicUrl, // Stable local served URL
    original_image_url: resolved, // Original remote URL
    source_page_url: websiteUrl,
    found_at: new Date().toISOString(),
    content_type: contentType,
    file_size_bytes: buffer.length
  };
}

async function main() {
  console.log(`Starting cover photo collection for ${businesses.length} businesses...`);
  const collected = [];
  let checked = 0;
  let skipped = 0;

  for (const b of businesses) {
    checked++;
    if (!b.website_url || isDisallowedSocial(b.website_url)) {
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`[${checked}/${businesses.length}] Checking ${b.slug}... `);
      const photo = await extractOfficialPhoto(b);
      if (photo) {
        collected.push(photo);
        console.log(`FOUND! (${photo.image_url})`);
      } else {
        console.log(`No valid real photo found -> Fallback to BusinessCover`);
      }
    } catch (e) {
      console.log(`Error: ${e.message} -> Fallback to BusinessCover`);
    }
  }

  console.log(`\nCollection complete!`);
  console.log(`Total businesses checked: ${checked}`);
  console.log(`Official real photos found: ${collected.length}`);
  console.log(`Fallback to BusinessCover: ${businesses.length - collected.length}`);

  fs.writeFileSync(outputPath, JSON.stringify(collected, null, 2), 'utf8');
  console.log(`Saved results to ${outputPath}`);
}

main();
