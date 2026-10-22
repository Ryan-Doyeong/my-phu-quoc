import Link from 'next/link'
import {notFound} from 'next/navigation'
import {requireStaff} from '@/lib/auth'
import {Logo} from '@/components/Logo'
import {saveBusinessEditorNote} from '@/app/actions'

export const dynamic='force-dynamic'
export default async function EditorBusinessNote({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const {supabase,profile}=await requireStaff(`/editor/businesses/${id}`)
  const {data:b}=await supabase.from('businesses').select('id,public_name,slug,category,subcategory,address,editor_note,editor_name,editor_visited_at').eq('id',id).maybeSingle()
  if(!b)notFound()
  return <main className="businessAdminPage"><header className="detailNav"><Logo/><nav><Link href="/editor#business-notes">← Writer desk</Link><Link href={`/business/${b.slug}`}>Public preview</Link></nav></header><section className="businessAdminShell"><div className="businessAdminHeading"><div><span className="eyebrow">EDITOR'S VISIT NOTE</span><h1>{b.public_name}</h1><p>{b.category} · {b.subcategory||'General'} · {b.address||''}</p></div><small>{profile.email}</small></div><form action={saveBusinessEditorNote} className="businessAdminForm"><input type="hidden" name="id" value={b.id}/><section className="adminEditCard"><h2>Editor’s</h2><p className="muted">Write a short first-hand impression after an actual visit. Keep it specific, useful and non-promotional.</p><div className="formTwo"><label>Editor display name<input name="editor_name" defaultValue={b.editor_name||profile.full_name||''} required/></label><label>Visited date<input name="editor_visited_at" type="date" defaultValue={b.editor_visited_at||''}/></label></div><label>Visit note<textarea name="editor_note" rows={7} defaultValue={b.editor_note||''} placeholder="A concise first-hand note: atmosphere, service style, who it may suit, and one useful observation."/></label><button className="primaryButton">Save editor’s note</button></section></form></section></main>
}
