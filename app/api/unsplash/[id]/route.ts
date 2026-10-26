import {NextRequest,NextResponse} from 'next/server'

export const revalidate = 2592000

function clamp(value:number,min:number,max:number){return Math.max(min,Math.min(max,value))}

export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id}=await params
  if(!/^[A-Za-z0-9_-]{6,32}$/.test(id)) return new Response('Invalid photo id',{status:400})
  const width=clamp(Number(req.nextUrl.searchParams.get('w')||900)||900,320,2200)
  const quality=clamp(Number(req.nextUrl.searchParams.get('q')||72)||72,55,88)
  const download=`https://unsplash.com/photos/${encodeURIComponent(id)}/download?force=true&w=${Math.round(width)}&q=${Math.round(quality)}`
  try{
    // Ask only for the redirect target. The image bytes then travel directly
    // from Unsplash's CDN to the visitor rather than through the Hostinger app.
    const upstream=await fetch(download,{
      redirect:'manual',
      headers:{'User-Agent':'MyPhuQuoc/1.0'},
      next:{revalidate:2592000},
    })
    const location=upstream.headers.get('location')
    if(location && [301,302,303,307,308].includes(upstream.status)){
      const response=NextResponse.redirect(location,307)
      response.headers.set('Cache-Control','public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400')
      return response
    }
    // Fallback for an upstream that returns the image directly.
    if(upstream.ok && upstream.body){
      return new Response(upstream.body,{headers:{
        'Content-Type':upstream.headers.get('content-type')||'image/jpeg',
        'Cache-Control':'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400',
        'X-Content-Type-Options':'nosniff',
      }})
    }
    return new Response('Image unavailable',{status:upstream.status||502})
  }catch{
    return new Response('Image unavailable',{status:502})
  }
}
