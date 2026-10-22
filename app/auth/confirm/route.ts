import {type EmailOtpType} from '@supabase/supabase-js'
import {NextRequest,NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

export async function GET(request:NextRequest){
  const url=request.nextUrl.clone()
  const tokenHash=url.searchParams.get('token_hash')
  const type=url.searchParams.get('type') as EmailOtpType|null
  const code=url.searchParams.get('code')
  const requested=url.searchParams.get('next')||'/account'
  const next=requested.startsWith('/')&&!requested.startsWith('//')?requested:'/account'
  const supabase=await createClient()

  let ok=false
  if(tokenHash&&type){
    const {error}=await supabase.auth.verifyOtp({type,token_hash:tokenHash})
    ok=!error
  }else if(code){
    const {error}=await supabase.auth.exchangeCodeForSession(code)
    ok=!error
  }

  if(ok){
    const target=request.nextUrl.clone()
    target.pathname=next
    target.search=''
    return NextResponse.redirect(target)
  }
  const fallback=request.nextUrl.clone()
  fallback.pathname='/login'
  fallback.search='?error=auth_callback&next='+encodeURIComponent(next)
  return NextResponse.redirect(fallback)
}
