const fs = require('fs');
const path = require('path');

// 1. Read master DB and registry
const dbPath = path.join(__dirname, '../3_푸꾸옥_선셋타운_전체시설_마스터DB.json');
const regPath = path.join(__dirname, '../data/businesses-registry.json');
const csvPath = path.join(__dirname, '../khem_beach_businesses_draft_2026-10-27_v5.csv');

const masterDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));

function getPublicCategory(item) {
  const mc = item.master_category;
  const sc = item.sub_category || '';
  if (mc === '1. 호텔 & 숙박') return 'hotels';
  if (mc === '2. 식당 & 레스토랑') return 'dining';
  if (mc === '3. 카페 & 베이커리' || mc === '4. 바 & 펍 & 비치클럽') return 'bars';
  if (mc === '5. 편의점 & 마트 & 쇼핑') return 'shopping';
  if (mc === '7. 스파 & 마사지 & 뷰티') return 'wellness';
  if (mc === '6. 병원 & 약국') return 'essentials';
  if (mc === '8. 관광명소 & 편의시설') {
    if (sc.includes('세탁')) return 'essentials';
    if (sc.includes('ATM') || sc.includes('은행') || sc.includes('환전')) return 'banking';
    if (sc.includes('교통') || sc.includes('버기') || sc.includes('렌트')) return 'transport';
    return 'activities';
  }
  return 'unknown';
}

// 2. Parse CSV v5 verified rows
const csvText = fs.readFileSync(csvPath, 'utf8');
const lines = csvText.trim().split('\n');

const verifiedKhemRows = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.includes('verified')) continue;
  
  // Custom split respecting quotes
  const parts = [];
  let cur = '', inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { parts.push(cur.trim()); cur = ''; }
    else { cur += ch; }
  }
  parts.push(cur.trim());
  
  const id = parts[0];
  const public_name = parts[1];
  const name_local = parts[2];
  const category = parts[3];
  const subcategory = parts[4];
  const address = parts[5].replace(/^"|"$/g, '');
  const notes = parts[parts.length - 1]
    .replace(/^"|"$/g, '')
    .replace(/\(ChIJyT4u[^\)]*\)/g, '')
    .replace(/@?10\.0298533[^\s,]*/g, '')
    .replace(/104\.0322303[^\s,]*/g, '')
    .trim();
  
  verifiedKhemRows.push({
    id,
    public_name,
    name_local,
    category: category === 'beach' ? 'beaches' : category,
    subcategory,
    address,
    notes
  });
}

console.log('Total verified Khem rows parsed:', verifiedKhemRows.length);

// 3. Build Khem Beach Businesses JSON (21 new businesses, excluding khem-draft-025 which is local-sunset-288)
const khemBusinesses = [];
const slugMap = {
  'khem-draft-001': 'jw-marriott-phu-quoc-emerald-bay',
  'khem-draft-002': 'premier-residences-phu-quoc-emerald-bay',
  'khem-draft-003': 'new-world-phu-quoc-resort',
  'khem-draft-004': 'paralia-khem-beach-phu-quoc-hotel',
  'khem-draft-005': 'jm-boutique-hotel-phu-quoc',
  'khem-draft-006': 'ann-hotel-spa-phu-quoc',
  'khem-draft-007': 'pink-pearl-jw-marriott',
  'khem-draft-008': 'tempus-fugit-jw-marriott',
  'khem-draft-009': 'red-rum-jw-marriott',
  'khem-draft-010': 'clubhouse-premier-residences',
  'khem-draft-011': 'mercato-restaurant-premier-residences',
  'khem-draft-012': 'the-bay-kitchen-new-world',
  'khem-draft-017': 'department-of-chemistry-bar-jw-marriott',
  'khem-draft-018': 'french-and-co-jw-marriott',
  'khem-draft-019': 'pool-bar-premier-residences',
  'khem-draft-020': 'chanterelle-spa-by-jw',
  'khem-draft-021': 'emerald-spa-premier-residences',
  'khem-draft-022': 'the-spa-at-new-world',
  'khem-draft-023': 'bai-khem-beach',
  'khem-draft-024': 'water-sports-premier-residences',
  'khem-draft-026': 'taxi-stand-khem-beach-resorts'
};

for (const row of verifiedKhemRows) {
  if (row.id === 'khem-draft-025') {
    // local-sunset-288 is already in businesses-registry.json
    continue;
  }
  const slug = slugMap[row.id] || row.id;
  khemBusinesses.push({
    id: row.id,
    public_name: row.public_name,
    name_local: row.name_local,
    slug: slug,
    category: row.category,
    subcategory: row.subcategory,
    address: row.address,
    description_en: `${row.public_name} located at Khem Beach, Phu Quoc.`,
    description_ko: `푸꾸옥 켐비치에 위치한 ${row.public_name}.`,
    google_maps_name: row.name_local,
    google_maps_url: null,
    phone: null,
    website_url: null,
    instagram_url: null,
    status: 'published',
    verification_status: 'verified',
    verification_note: row.notes,
    google_rating: null,
    google_review_count: null,
    gallery_urls: ['/zones/khem-beach-hero.webp'],
    tags: ['Khem Beach', row.category],
    zone: 'khem-beach'
  });
}

// 4. Build zone-assignments.json
const zoneAssignments = {};

let sunsetCoreCount = 0;
let sunsetAdjacentCount = 0;
let khemBeachCount = 0;

// Add 291 master registry businesses
for (let i = 0; i < registry.length; i++) {
  const r = registry[i];
  const d = masterDb[i];
  const isCore = d.zone === '선셋타운 내부 (Sunset Town)';
  const cat = getPublicCategory(d);

  if (r.id === 'local-sunset-288') {
    khemBeachCount++;
    sunsetAdjacentCount++;
    zoneAssignments[r.id] = {
      place_id: r.id,
      google_place_id: r.google_place_id || null,
      name: r.public_name,
      zone: 'khem-beach',
      public_category: 'banking',
      service_areas: ['khem-beach', 'sunset-town-adjacent']
    };
  } else if (isCore) {
    sunsetCoreCount++;
    zoneAssignments[r.id] = {
      place_id: r.id,
      google_place_id: r.google_place_id || null,
      name: r.public_name,
      zone: 'sunset-town',
      public_category: cat,
      service_areas: ['sunset-town']
    };
  } else {
    sunsetAdjacentCount++;
    zoneAssignments[r.id] = {
      place_id: r.id,
      google_place_id: r.google_place_id || null,
      name: r.public_name,
      zone: 'sunset-town',
      public_category: cat,
      service_areas: ['sunset-town-adjacent']
    };
  }
}

// Add 21 new verified Khem businesses
for (const kb of khemBusinesses) {
  khemBeachCount++;
  zoneAssignments[kb.id] = {
    place_id: kb.id,
    google_place_id: null,
    name: kb.public_name,
    zone: 'khem-beach',
    public_category: kb.category,
    service_areas: ['khem-beach']
  };
}

// Write files to dev directory and PhuQuoc directory
const outAssignmentsPath1 = path.join(__dirname, '../data/zone-assignments.json');
const outKhemPath1 = path.join(__dirname, '../data/khem-beach-businesses.json');
const outAssignmentsPath2 = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/data/zone-assignments.json';
const outKhemPath2 = '/Users/admin/내 드라이브(namdo772@gmail.com)/PhuQuoc/data/khem-beach-businesses.json';

const assignmentsJson = JSON.stringify(zoneAssignments, null, 2);
const khemJson = JSON.stringify(khemBusinesses, null, 2);

fs.writeFileSync(outAssignmentsPath1, assignmentsJson, 'utf8');
fs.writeFileSync(outKhemPath1, khemJson, 'utf8');
fs.writeFileSync(outAssignmentsPath2, assignmentsJson, 'utf8');
fs.writeFileSync(outKhemPath2, khemJson, 'utf8');

console.log('✓ Successfully wrote zone-assignments.json & khem-beach-businesses.json');
console.log(`Summary:`);
console.log(`- Total zone assignments: ${Object.keys(zoneAssignments).length}`);
console.log(`- Sunset Town Core: ${sunsetCoreCount} (Target: 251)`);
console.log(`- Sunset Town Adjacent: ${sunsetAdjacentCount} (Target: 40)`);
console.log(`- Khem Beach Verified Total: ${khemBeachCount} (Target: 22)`);
console.log(`- Khem Beach New Businesses: ${khemBusinesses.length} (Target: 21)`);
