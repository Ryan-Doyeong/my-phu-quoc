import {NextRequest,NextResponse} from 'next/server'

export async function GET(request:NextRequest){
  const target=request.nextUrl.clone()
  target.pathname='/auth/confirm'
  return NextResponse.redirect(target)
}
