// 챗지피티가 만든 i18n_vi_drop/*.vi.json 을 data/i18n/translations/*.json 에 "vi" 키로 병합한다.
// 사용: node scripts/merge-vi.mjs <drop 폴더 경로>
// 원본 키·다른 언어 값은 건드리지 않고, 값에 한글이 섞였거나 비어 있으면 건너뛴다.
import fs from 'node:fs'
import path from 'node:path'

const dropDir = process.argv[2]
if (!dropDir) { console.error('usage: node scripts/merge-vi.mjs <drop-dir>'); process.exit(1) }
const targetDir = 'data/i18n/translations'
const names = ['ui_strings', 'section_titles', 'biz_desc', 'menu_names', 'menu_descriptions']
const HANGUL = /[가-힣]/
for (const n of names) {
  const src = path.join(dropDir, `${n}.vi.json`)
  if (!fs.existsSync(src)) { console.log(`skip ${n} (no drop file)`); continue }
  const dst = path.join(targetDir, `${n}.json`)
  const base = JSON.parse(fs.readFileSync(dst, 'utf8'))
  const drop = JSON.parse(fs.readFileSync(src, 'utf8'))
  let merged = 0, missing = 0, bad = 0
  for (const key of Object.keys(base)) {
    const v = drop[key]?.vi ?? (typeof drop[key] === 'string' ? drop[key] : undefined)
    if (typeof v !== 'string' || !v.trim()) { missing++; continue }
    if (HANGUL.test(v)) { bad++; continue }
    base[key] = { ...base[key], vi: v }
    merged++
  }
  const extra = Object.keys(drop).filter((k) => !(k in base)).length
  fs.writeFileSync(dst, JSON.stringify(base, null, 2) + '\n')
  console.log(`${n}: merged ${merged}, missing ${missing}, hangul-skipped ${bad}, unknown-keys ${extra}`)
}
