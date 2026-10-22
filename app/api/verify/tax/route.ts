import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(req: Request){
  await requireAdmin()
  const { taxCode } = await req.json()
  const endpoint=process.env.TAX_LOOKUP_ENDPOINT
  const apiKey=process.env.TAX_LOOKUP_API_KEY
  if(!endpoint) return NextResponse.json({ok:false,configured:false,message:'No approved tax lookup provider is configured. Keep this check in manual review until you connect one.'},{status:501})
  const url=new URL(endpoint); url.searchParams.set('taxCode',taxCode)
  const res=await fetch(url,{headers:apiKey?{Authorization:`Bearer ${apiKey}`}:{},cache:'no-store'})
  const data=await res.json().catch(()=>({}))
  return NextResponse.json({ok:res.ok,data})
}
