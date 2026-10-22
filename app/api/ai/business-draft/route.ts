import {NextResponse} from 'next/server'

export const dynamic='force-dynamic'

function textFromResponse(data:any){
  if(typeof data?.output_text==='string') return data.output_text
  for(const item of data?.output||[]) for(const part of item?.content||[]) if(part?.type==='output_text'&&part?.text) return part.text
  return ''
}

export async function POST(req:Request){
  if(process.env.AI_INTAKE_ENABLED!=='true') return NextResponse.json({ok:false,message:'AI photo drafting is not enabled on this deployment.'},{status:503})
  const key=process.env.OPENAI_API_KEY
  if(!key) return NextResponse.json({ok:false,message:'OPENAI_API_KEY is not configured.'},{status:503})
  const form=await req.formData()
  const name=String(form.get('public_name')||'').trim(),category=String(form.get('category')||'').trim(),subcategory=String(form.get('subcategory')||'').trim(),address=String(form.get('address')||'').trim()
  const files=form.getAll('business_photos').filter((x):x is File=>x instanceof File&&x.size>0).slice(0,3)
  if(!name) return NextResponse.json({ok:false,message:'Enter the business name first.'},{status:400})
  const content:any[]=[{type:'input_text',text:`Create a concise English business-listing draft for Good life in Thaodien.\nBusiness name: ${name}\nCategory: ${category}\nSubcategory: ${subcategory}\nAddress supplied by owner: ${address}\n\nUse the attached owner-provided photos only for visible, non-sensitive observations such as interior style, seating, equipment, food presentation or general atmosphere. Do not infer opening hours, price, ownership, ratings, health/safety claims, location, menu items, certifications or services that are not explicitly provided or clearly visible. Do not identify people.\n\nReturn only a 70-110 word neutral introduction suitable for a local directory. Avoid hype and unverifiable superlatives.`}]
  for(const file of files){
    if(file.size>3_000_000) continue
    if(!file.type.startsWith('image/')) continue
    const b64=Buffer.from(await file.arrayBuffer()).toString('base64')
    content.push({type:'input_image',image_url:`data:${file.type};base64,${b64}`,detail:'low'})
  }
  const res=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify({model:process.env.OPENAI_BUSINESS_MODEL||'gpt-5.6-luna',input:[{role:'user',content}],max_output_tokens:350})})
  const data=await res.json()
  if(!res.ok) return NextResponse.json({ok:false,message:data?.error?.message||'AI draft request failed.'},{status:502})
  const draft=textFromResponse(data).trim()
  return NextResponse.json({ok:true,draft})
}
