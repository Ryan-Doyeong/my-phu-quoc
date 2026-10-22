import {NextResponse} from 'next/server'
import {createClient} from '@/lib/supabase/server'

export async function POST(request:Request){
  const supabase=await createClient()
  const {data:{user}}=await supabase.auth.getUser()
  if(!user)return NextResponse.json({error:'Please sign in to upload article photos.'},{status:401})
  const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle()
  if(!profile||!['editor','admin','owner'].includes(profile.role))return NextResponse.json({error:'Editorial access is required.'},{status:403})

  const formData=await request.formData()
  const file=formData.get('file')
  if(!(file instanceof File)||file.size===0)return NextResponse.json({error:'Choose an image file.'},{status:400})
  if(!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.heic') && !file.name.toLowerCase().endsWith('.heif'))return NextResponse.json({error:'Only image files are allowed.'},{status:400})
  if(file.size>5_000_000)return NextResponse.json({error:'Each image must be under 5 MB.'},{status:400})

  const { processUpload } = await import('@/lib/image/process');
  const { convertHeicToJpeg } = await import('@/lib/image/heic');
  let buffer = Buffer.from(await file.arrayBuffer()) as any;
  
  if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      try {
        buffer = await convertHeicToJpeg(buffer) as Buffer;
      } catch (err: any) {
        return NextResponse.json({error: err.message},{status:400});
      }
  }
  const processed = await processUpload(buffer);
  
  const baseName = `inline/${Date.now()}-${crypto.randomUUID()}`;
  let fullUrl = '';
  
  for (const img of processed) {
    const path = `editorial-gallery/${baseName}${img.suffix}`;
    const { error } = await supabase.storage.from('site-media').upload(path, img.buffer, { upsert: false, contentType: img.contentType });
    if (error) return NextResponse.json({error:error.message},{status:400});
    if (img.suffix === '-full.webp') {
      fullUrl = supabase.storage.from('site-media').getPublicUrl(path).data.publicUrl;
    }
  }
  return NextResponse.json({url: fullUrl});
}
