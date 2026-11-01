import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
const dir='public/covers-photo'
let before=0, after=0, n=0
for (const f of fs.readdirSync(dir).filter(x=>x.endsWith('.webp'))) {
  const p=path.join(dir,f); const s=fs.statSync(p).size; before+=s
  if (s>300000) {
    const buf = await sharp(p).rotate().resize({width:1400,withoutEnlargement:true}).webp({quality:76}).toBuffer()
    if (buf.length < s) { fs.writeFileSync(p,buf); after+=buf.length; n++; continue }
  }
  after+=fs.statSync(p).size
}
console.log('shrunk',n,'files;',(before/1048576).toFixed(1),'MB ->',(after/1048576).toFixed(1),'MB')
