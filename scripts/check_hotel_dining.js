import { readFileSync } from 'node:fs'

const master = JSON.parse(readFileSync('3_푸꾸옥_선셋타운_전체시설_마스터DB.json', 'utf8'))
const seed3 = readFileSync('supabase/seed_phuquoc_businesses_v3.sql', 'utf8')

const checks = []
for (const m of master) {
  const name = m.name_display || m.name_google
  const masterCat = m.master_category || ''
  const subCat = m.sub_category || ''

  const escapedName = name.replace(/'/g, "''")
  const idx = seed3.indexOf(`'${escapedName}',`)
  if (idx !== -1) {
    const snippet = seed3.slice(idx, idx + 300)
    const lines = snippet.split('\n')
    const slug = lines[1]?.trim().replace(/^'|',?$/g, '')
    const cat = lines[2]?.trim().replace(/^'|',?$/g, '')
    const sub = lines[3]?.trim().replace(/^'|',?$/g, '')

    if (masterCat.includes('2. 식당') && cat !== 'dining') {
      checks.push({ name, slug, cat, sub, masterCat, subCat })
    }
    if (masterCat.includes('3. 카페') && (cat !== 'dining' || sub !== 'cafe')) {
      checks.push({ name, slug, cat, sub, masterCat, subCat })
    }
    if (masterCat.includes('4. 바') && cat !== 'bars') {
      checks.push({ name, slug, cat, sub, masterCat, subCat })
    }
  }
}

console.log('Total discrepancies found in food/beverage:', checks.length)
checks.forEach((c, i) => console.log(`${i + 1}. [${c.slug}] ${c.name} => currently: ${c.cat}/${c.sub} (master: ${c.masterCat})`))
