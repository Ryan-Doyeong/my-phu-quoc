#!/usr/bin/env node
/**
 * scripts/generate_menus_seed.js
 * 
 * menus/*.json (59곳)의 메뉴 데이터를 읽어
 * public.business_menu_items 테이블에 연결 삽입하는
 * supabase/seed_menus.sql 생성기
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function escapeSql(str) {
  if (str === null || str === undefined || str === '') return 'NULL'
  return `'${String(str).replace(/'/g, "''")}'`
}

function parseVndPrice(str) {
  if (!str) return null
  const cleaned = String(str).replace(/[^0-9]/g, '')
  if (!cleaned) return null
  const num = parseInt(cleaned, 10)
  return isNaN(num) ? null : num
}

function run() {
  console.log('🔄 메뉴 시드 SQL 생성 시작 (59곳)...')

  const menusDir = 'menus'
  const files = readdirSync(menusDir).filter((f) => f.endsWith('.json') && f !== '_progress.json')
  console.log(`📖 메뉴 JSON 파일 총 ${files.length}개 발견`)

  const sqlLines = [
    '--',
    '-- Supabase Seed: My Phu Quoc Business Menus (59 Places)',
    `-- Generated At: ${new Date().toISOString()}`,
    `-- Total Venues: ${files.length}`,
    '--',
    'BEGIN;',
    '',
    '-- Optional cleanup of previous menu items if re-seeding',
    '-- DELETE FROM public.business_menu_items;',
    '',
  ]

  let totalDishes = 0
  const venueStats = { A: 0, B: 0, C: 0, D: 0 }
  const itemStats = { A: 0, B: 0, C: 0, D: 0 }

  for (const file of files) {
    const filePath = join(menusDir, file)
    const data = JSON.parse(readFileSync(filePath, 'utf8'))
    const placeId = data.place_id || file.replace('.json', '')
    const grade = (data.info_level || 'C').toUpperCase()
    venueStats[grade] = (venueStats[grade] || 0) + 1

    const sourceText = (data.sources || [])
      .map((s) => s.note || s.url)
      .filter(Boolean)
      .join('; ') || 'Sunset Town Master Menu DB'
    const rawDate = data.menu_date || (data.sources && data.sources[0]?.accessed) || '2026-10-25'
    let verifiedDate = '2026-10-25'
    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      verifiedDate = rawDate
    } else if (/^\d{4}-\d{2}$/.test(rawDate)) {
      verifiedDate = `${rawDate}-01`
    }

    let dishesForVenue = []

    // 1. Check sections
    if (data.sections && data.sections.length > 0) {
      let sortIdx = 1
      for (const sec of data.sections) {
        const sectionName = sec.name_ko || sec.name_original || '메뉴'
        if (sec.items && sec.items.length > 0) {
          for (const item of sec.items) {
            dishesForVenue.push({
              section: sectionName,
              name_original: item.name_original || item.name_ko || 'Menu Item',
              name_ko: item.name_ko || item.name_original || null,
              name_en: item.name_original || item.name_ko || null,
              price_vnd: item.price_vnd ? Number(item.price_vnd) : null,
              price_text: item.price_note || (item.price_vnd ? `${Number(item.price_vnd).toLocaleString()} VND` : null),
              grade,
              source: sourceText,
              verified_date: verifiedDate,
              sort_order: sortIdx++,
            })
          }
        }
      }
    }

    // 2. Check known_dishes if no section dishes
    if (dishesForVenue.length === 0 && data.known_dishes && data.known_dishes.length > 0) {
      let sortIdx = 1
      for (const dish of data.known_dishes) {
        let vnd = null
        if (dish.price_approx) {
          // extract first number
          const match = dish.price_approx.replace(/,/g, '').match(/\d+/)
          if (match) vnd = parseInt(match[0], 10)
        }
        dishesForVenue.push({
          section: '대표 메뉴 / 추천',
          name_original: dish.name_original || dish.name_ko || 'Recommended Dish',
          name_ko: dish.name_ko || dish.name_original || null,
          name_en: dish.name_original || dish.name_ko || null,
          price_vnd: vnd,
          price_text: dish.price_approx || null,
          grade,
          source: sourceText,
          verified_date: verifiedDate,
          sort_order: sortIdx++,
        })
      }
    }

    // 3. Fallback for Grade D (Unconfirmed)
    if (dishesForVenue.length === 0) {
      dishesForVenue.push({
        section: '메뉴 안내',
        name_original: 'Menu Unconfirmed',
        name_ko: '메뉴 정보 현장 확인 필요 (미확인)',
        name_en: 'Menu information to be verified on-site',
        price_vnd: null,
        price_text: '현장 문의',
        grade: 'D',
        source: '현장 미확인',
        verified_date: '2026-10-25',
        sort_order: 1,
      })
    }

    // Generate SQL block for this venue
    sqlLines.push(`-- Venue: ${data.name_display || data.name_google} (Grade ${grade}, place_id: ${placeId})`)
    for (const d of dishesForVenue) {
      totalDishes++
      itemStats[d.grade] = (itemStats[d.grade] || 0) + 1

      const sql = `INSERT INTO public.business_menu_items (
  business_id, section, name_original, name_ko, name_en,
  price_vnd, price_text, grade, source, verified_date, sort_order
)
SELECT
  b.id,
  ${escapeSql(d.section)},
  ${escapeSql(d.name_original)},
  ${escapeSql(d.name_ko)},
  ${escapeSql(d.name_en)},
  ${d.price_vnd !== null ? d.price_vnd : 'NULL'},
  ${escapeSql(d.price_text)},
  ${escapeSql(d.grade)},
  ${escapeSql(d.source)},
  ${escapeSql(d.verified_date)}::date,
  ${d.sort_order}
FROM public.businesses b
WHERE b.google_place_id = ${escapeSql(placeId)}
LIMIT 1;`
      sqlLines.push(sql)
    }
    sqlLines.push('')
  }

  sqlLines.push('COMMIT;')
  sqlLines.push('')

  writeFileSync('supabase/seed_menus.sql', sqlLines.join('\n'), 'utf8')
  console.log(`💾 메뉴 시드 파일 생성 완료: supabase/seed_menus.sql`)
  console.log('\n--- 메뉴 데이터 통계 ---')
  console.log(`- 전체 연결 업체 수: ${files.length}곳`)
  console.log(`- 업체별 등급 분포:`, venueStats)
  console.log(`- 전체 메뉴 아이템 수: ${totalDishes}건`)
  console.log(`- 아이템별 등급 분포:`, itemStats)
}

run()
