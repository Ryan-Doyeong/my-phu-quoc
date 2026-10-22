#!/usr/bin/env node
// OpenStreetMap(Overpass)에서 타오디엔 업체 "후보"를 수집해 CSV로 저장합니다.
// 실행: node scripts/collect-osm.mjs   (Node 18+, 인터넷 필요, API 키 불필요)
// 결과: data/candidates-osm.csv, data/osm-report.md
// 주의: 후보 목록일 뿐입니다. 사실 확인 전에는 게시하지 마세요. 출처 표기: © OpenStreetMap contributors (ODbL)
import {writeFileSync,mkdirSync} from 'node:fs'
import {createClient} from '@supabase/supabase-js'

// 타오디엔 대략 범위(남,서,북,동). 지도로 확인 후 조정 가능.
const BBOX=process.env.BBOX||'10.795,106.720,10.825,106.760'
const ENDPOINTS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter']

const RULES=[
  ['food','amenity','restaurant'],['food','amenity','fast_food'],
  ['cafe','amenity','cafe'],['cafe','shop','bakery'],['cafe','shop','coffee'],
  ['workout','leisure','fitness_centre'],['workout','leisure','sports_centre'],['workout','sport','yoga'],['workout','sport','pilates'],['workout','sport','crossfit'],['workout','sport','boxing'],
  ['wellness','amenity','spa'],['wellness','shop','massage'],['wellness','leisure','sauna'],['wellness','shop','beauty'],['wellness','shop','hairdresser'],['wellness','amenity','clinic'],
  ['hobby','sport','tennis'],['hobby','sport','golf'],['hobby','sport','dance'],['hobby','amenity','music_school'],['hobby','amenity','dancing_school'],['hobby','amenity','arts_centre'],['hobby','leisure','playground'],
]
const query=`[out:json][timeout:90];(${RULES.map(([,k,v])=>`nwr["${k}"="${v}"]["name"](${BBOX});`).join('')});out center tags;`

const CUISINE={korean:'Korean',japanese:'Japanese',chinese:'Chinese',vietnamese:'Vietnamese',thai:'Thai',italian:'Italian',indian:'Indian',pizza:'Pizza',burger:'Western',american:'Western',french:'Western',steak_house:'Grill',barbecue:'Grill',vegetarian:'Vegetarian',vegan:'Vegetarian',asian:'Asian',sushi:'Japanese',ramen:'Japanese',noodle:'Vietnamese',pho:'Vietnamese'}
const SUB={spa:'Spa',massage:'Massage',sauna:'Sauna & Ice Bath',beauty:'Beauty & Skin',hairdresser:'Beauty & Skin',clinic:'Clinic',fitness_centre:'Public Gym',sports_centre:'Public Gym',yoga:'Yoga',pilates:'Pilates',crossfit:'CrossFit',boxing:'Boxing Fitness',tennis:'Tennis',golf:'Golf',dance:'Dance',dancing_school:'Dance',music_school:'Music',arts_centre:'Art & Craft',playground:'Kids Activities',bakery:'Bakery Cafe',coffee:'Specialty Coffee',cafe:'Cafe'}

async function run(){
  let lastErr
  for(const url of ENDPOINTS){
    try{
      const res=await fetch(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded','User-Agent':'Node/18.x (Antigravity)'},body:'data='+encodeURIComponent(query)})
      if(!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
      return await res.json()
    }catch(e){lastErr=e;console.error('실패, 다음 서버 시도:',e.message)}
  }
  throw lastErr
}

function classify(tags){
  for(const [cat,k,v] of RULES){
    if(tags[k]===v){
      let sub=SUB[v]||''
      if(cat==='food'){
        const c=(tags.cuisine||'').split(';')[0].trim().toLowerCase()
        sub=CUISINE[c]||'Restaurant'
      }
      return {cat,sub}
    }
  }
  return null
}
const csv=v=>{const s=String(v??'');return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s}
function address(t){
  const parts=[[t['addr:housenumber'],t['addr:street']].filter(Boolean).join(' '),t['addr:suburb']||t['addr:quarter'],t['addr:district']||t['addr:city']].filter(Boolean)
  return t['addr:full']||parts.join(', ')
}


function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Fetch existing businesses
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://trsghkrfccufpvcbqrab.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1M7c7-XT7Oao5mneBfCm9w_jjWTE3Ye');
const { data: existing } = await sb.from('businesses').select('public_name, category, subcategory'); // no lat/lng in DB yet before migration!
// Wait, lat/lng might not exist in the live DB yet. So we can only match by name for now!

const data=await run()
const seen=new Set(),rows=[]
for(const el of data.elements||[]){
  const t=el.tags||{},c=classify(t); if(!c||!t.name) continue
  const lat=el.lat??el.center?.lat,lng=el.lon??el.center?.lon; if(lat==null) continue
  const id=`${el.type}/${el.id}`; if(seen.has(id)) continue; seen.add(id)
  
  const nameLower = t.name.toLowerCase();
  // We match by name since lat/lng aren't in staging DB yet.
  const isMatched = (existing || []).some(b => {
     const bName = b.public_name.toLowerCase();
     return bName === nameLower || bName.includes(nameLower) || nameLower.includes(bName);
  });

  rows.push({name:t.name,name_en:t['name:en']||'',category:c.cat,subcategory:c.sub,address:address(t),lat:lat.toFixed(6),lng:lng.toFixed(6),
    phone:t.phone||t['contact:phone']||'',website:t.website||t['contact:website']||'',facebook:t['contact:facebook']||'',instagram:t['contact:instagram']||'',
    opening_hours:t.opening_hours||'',osm_id:id,osm_url:`https://www.openstreetmap.org/${id}`,
    google_maps_search:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.name)}%20${lat},${lng}`,
    source:'osm',needs_verification:'yes',
    match_status: isMatched ? 'matched' : 'new'})
}
rows.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name))
mkdirSync('data',{recursive:true})
const cols=Object.keys(rows[0]||{name:1})
writeFileSync('data/candidates-osm.csv','﻿'+[cols.join(','),...rows.map(r=>cols.map(c=>csv(r[c])).join(','))].join('\n'))

const by={matched: 0, new: 0}, catCounts={}, filled={phone:0,website:0,opening_hours:0,address:0}
for(const r of rows){
  by[r.match_status]++;
  if (!catCounts[r.category]) catCounts[r.category] = {matched: 0, new: 0};
  catCounts[r.category][r.match_status]++;
  for(const k in filled) if(r[k]) filled[k]++
}
const md=`# OSM 후보 수집 리포트

- 범위(BBOX): ${BBOX}
- 총 후보: ${rows.length}곳 (신규 ${by.new}곳, 중복 매칭 ${by.matched}곳)

## 카테고리별 부족 수 (목표: 카테고리당 25~30곳)
${Object.entries(catCounts).map(([k,v])=>`- **${k}**: 총 ${v.matched + v.new}곳 (신규 ${v.new}, 기존 ${v.matched})`).join('\n')}

## 정보 보유율 (OSM 원본 데이터 기준)
${Object.entries(filled).map(([k,v])=>`- ${k}: ${v}/${rows.length}`).join('\n')}

※ 후보일 뿐입니다. 이름·주소·영업시간·전화는 사람이 확인한 뒤에만 게시하세요.
※ 사이트에 "© OpenStreetMap contributors" 출처 표기가 필요합니다.
`
writeFileSync('data/osm-report.md',md)
console.log(md)
