import {NextResponse} from 'next/server'
import {requireAdmin} from '@/lib/auth'

export const dynamic='force-dynamic'

export async function GET(){
  const {supabase}=await requireAdmin()
  const tables=['profiles','businesses','business_submissions','business_claims','verification_checks','stories','newsletter_subscribers','sponsor_banners','site_settings','impact_programs','promotions','community_suggestions','volunteer_applications','saved_businesses','audit_logs'] as const
  const backup:Record<string,unknown>={generated_at:new Date().toISOString(),format_version:1,note:'Authentication secrets are intentionally excluded. Member profile IDs, emails, roles and application data are included.'}
  for(const table of tables){const {data,error}=await supabase.from(table).select('*');if(error)return NextResponse.json({error:`Backup failed on ${table}: ${error.message}`},{status:500});backup[table]=data||[]}
  const stamp=new Date().toISOString().replace(/[:.]/g,'-')
  return new NextResponse(JSON.stringify(backup,null,2),{status:200,headers:{'content-type':'application/json; charset=utf-8','content-disposition':`attachment; filename="good-life-backup-${stamp}.json"`,'cache-control':'private, no-store'}})
}
