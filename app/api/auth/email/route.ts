import {NextRequest,NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

function safeNext(value:unknown){
  const v=typeof value==='string'?value:'/editor'
  return v.startsWith('/')&&!v.startsWith('//')?v:'/editor'
}
function friendly(message:string){
  const m=message.toLowerCase()
  if(m.includes('email not confirmed')) return 'This staff account has not completed email confirmation yet.'
  if(m.includes('invalid login credentials')) return 'The email or password is incorrect.'
  if(m.includes('rate limit')||m.includes('too many')) return 'Too many authentication attempts were made. Please wait before trying again.'
  return message
}

export async function POST(request:NextRequest){
  try{
    const body=await request.json()
    if(body?.mode&&body.mode!=='signin') return NextResponse.json({ok:false,message:'Public account creation is disabled.'},{status:403})
    const email=String(body?.email||'').trim().toLowerCase()
    const password=String(body?.password||'')
    const next=safeNext(body?.next)
    if(!email||!email.includes('@')) return NextResponse.json({ok:false,message:'Enter a valid staff email address.'},{status:400})
    if(password.length<8) return NextResponse.json({ok:false,message:'Enter your staff password.'},{status:400})
    const supabase=await createClient()
    const {data,error}=await supabase.auth.signInWithPassword({email,password})
    if(error) return NextResponse.json({ok:false,message:friendly(error.message)},{status:error.status||400})
    if(!data.user||!data.session) return NextResponse.json({ok:false,message:'Sign-in did not create a verified session.'},{status:401})
    const {data:profile,error:profileError}=await supabase.from('profiles').select('role').eq('id',data.user.id).maybeSingle()
    if(profileError||!profile||!['editor','admin','owner'].includes(profile.role)){
      await supabase.auth.signOut()
      return NextResponse.json({ok:false,message:'This account is not authorized for staff access.'},{status:403})
    }
    let destination=next
    if(destination==='/account'||destination==='/login') destination=profile.role==='editor'?'/editor':'/admin'
    if(destination.startsWith('/admin')&&!['admin','owner'].includes(profile.role)) destination='/editor'
    return NextResponse.json({ok:true,signedIn:true,next:destination,message:'Signed in successfully.'})
  }catch(e){
    return NextResponse.json({ok:false,message:e instanceof Error?e.message:'Authentication failed.'},{status:500})
  }
}
