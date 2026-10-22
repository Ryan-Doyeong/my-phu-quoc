import { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false } };
import Link from 'next/link'
import {requireStaff} from '@/lib/auth'
import {Logo} from '@/components/Logo'
import {saveArticle,deleteArticle} from '@/app/actions'
import {ArticleEditor} from '@/components/ArticleEditor'
import {PhotoRemoveGrid} from '@/components/PhotoRemoveGrid'
import {SponsorApplicationsList} from '@/components/SponsorApplicationsList'

export const dynamic='force-dynamic'

function dt(v:any){return v?String(v).slice(0,16):''}
function lines(v:any){return Array.isArray(v)?v.join('\n'):''}

export default async function EditorPage({searchParams}:{searchParams:Promise<{edit?:string,q?:string,type?:string,status?:string,compose?:string}>}){
  const sp=await searchParams
  const {supabase,profile}=await requireStaff('/editor')
  const [{data:rawPosts},{data:selected},{data:businesses},{data:sponsorApps}]=await Promise.all([
    supabase.from('stories').select('id,title,subtitle,slug,category,status,content_type,excerpt,cover_image_url,updated_at,published_at,is_featured,newsletter_ready').order('updated_at',{ascending:false}).limit(150),
    sp.edit?supabase.from('stories').select('*').eq('id',sp.edit).maybeSingle():Promise.resolve({data:null} as any),
    supabase.from('businesses').select('id,public_name,slug,category,subcategory,editor_note,editor_name,editor_visited_at').eq('status','published').order('public_name').limit(160),
    supabase.from('sponsor_applications').select('*, businesses(id, public_name, slug)').order('created_at',{ascending:true}),
  ])
  const term=(sp.q||'').trim().toLowerCase()
  const posts=(rawPosts||[]).filter((p:any)=>(!term||`${p.title} ${p.subtitle||''} ${p.excerpt||''} ${p.category||''}`.toLowerCase().includes(term))&&(!sp.type||sp.type==='all'||p.content_type===sp.type)&&(!sp.status||sp.status==='all'||p.status===sp.status))
  const x=selected as any
  const composeImpact=!x && sp.compose==='impact'
  const gallery=Array.isArray(x?.gallery_urls)?x.gallery_urls:[]
  return <div className="editorShell"><aside className="editorSidebar"><Logo/><span className="eyebrow">EDITORIAL STUDIO</span><nav><a href="#compose">Write / Edit</a><Link href="/editor?compose=impact#compose">Write Impact News</Link><a href="#posts">Content library</a><a href="#sponsorApplications">Sponsor applications</a><a href="#business-notes">Business editor’s notes</a><Link href="/news">Public News</Link><Link href="/news/events">Events</Link><Link href="/impact">Impact News</Link>{['admin','owner'].includes(profile.role)&&<Link href="/admin">Master Admin</Link>}</nav><small>{profile.email}</small></aside><main className="editorMain">
    <header><div><span className="eyebrow">ENGLISH-FIRST PUBLISHING</span><h1>{x?'Edit article':composeImpact?'Write Community Impact News':'Create a new article'}</h1><p>Use structured sections, source dates, key points, SEO fields, galleries and publication controls. Public visitors never need an account.</p></div><div className="editorHeaderActions"><Link className="outlineDark" href="/news">View public news</Link><Link className="outlineDark" href="/editor?compose=impact#compose">Write Impact News</Link><Link className="primaryButton" href="/editor">New article</Link></div></header>

    <section id="compose" className="editorPanel"><form action={saveArticle} className="editorForm detailedEditorForm" encType="multipart/form-data">
      <input type="hidden" name="id" value={x?.id||''}/><input type="hidden" name="existing_gallery" value={gallery.join('\n')}/>
      <div className="editorFormMain">
        <div className="editorSectionLabel"><span>01</span><div><strong>Story identity</strong><small>Headline, type and URL</small></div></div>
        <label>Headline<input name="title" required defaultValue={x?.title||''} placeholder="Clear, useful headline"/></label>
        <label>Subtitle / deck<input name="subtitle" defaultValue={x?.subtitle||''} placeholder="Optional second line that adds context"/></label>
        <div className="formTwo"><label>Content type<select name="content_type" defaultValue={x?.content_type||(composeImpact?'impact':'news')}><option value="news">Local News / Notice</option><option value="blog">Blog / Guide</option><option value="event">Event Announcement</option><option value="impact">Community Impact</option><option value="story">People / Neighborhood Story</option></select></label><label>Category<input name="category" defaultValue={x?.category||(composeImpact?'Community Impact':'Local News')} placeholder="Expat Notice, Food, Wellness…"/></label></div>
        <div className="formTwo"><label>URL slug<input name="slug" defaultValue={x?.slug||''} placeholder="auto-generated if blank"/></label><label>Author display name<input name="author_name" defaultValue={x?.author_name||profile.full_name||''} placeholder="Good life Editorial Desk"/></label></div>
        <label>Tags<input name="tags" defaultValue={(x?.tags||[]).join(', ')} placeholder="visa, expat life, Thao Dien, transport"/><small>Separate tags with commas.</small></label>

        <div className="editorSectionLabel"><span>02</span><div><strong>Reader summary</strong><small>What readers should understand before the full article</small></div></div>
        <label>Short summary / card excerpt<textarea name="excerpt" rows={4} defaultValue={x?.excerpt||''} placeholder="2–3 concise sentences used on listing cards and newsletter previews."/></label>
        <label>Key points <small>one point per line</small><textarea name="key_points" rows={6} defaultValue={lines(x?.key_points)} placeholder={'Visa extension rules changed\nNew requirement applies from 1 October\nResidents should check their current status'}/></label>
        <label>Important callout<textarea name="callout" rows={3} defaultValue={x?.callout||''} placeholder="Optional warning, deadline or important takeaway shown in a highlighted box."/></label>

        <div className="editorSectionLabel"><span>03</span><div><strong>Main article</strong><small>Paste a draft, optimize the layout, insert photos directly into the body, and preview before publishing.</small></div></div>
        <ArticleEditor defaultValue={x?.body_en||''} defaultTemplate={x?.content_type||(composeImpact?'impact':'news')}/>

        <div className="editorSectionLabel"><span>04</span><div><strong>Source & dates</strong><small>Especially important for visa, tax and official notices</small></div></div>
        <div className="formTwo"><label>Source name<input name="source_name" defaultValue={x?.source_name||''} placeholder="Official authority / publication"/></label><label>Source URL<input type="url" name="source_url" defaultValue={x?.source_url||''} placeholder="https://…"/></label></div>
        <div className="formThree"><label>Source published<input type="datetime-local" name="source_published_at" defaultValue={dt(x?.source_published_at)}/></label><label>Effective date<input type="datetime-local" name="effective_date" defaultValue={dt(x?.effective_date)}/></label><label>Public publish date<input type="datetime-local" name="published_at" defaultValue={dt(x?.published_at)}/></label></div>

        <div className="editorConditionalGrid"><div><h3>Event fields</h3><label>Event date<input type="datetime-local" name="event_date" defaultValue={dt(x?.event_date)}/></label><label>Event location<input name="event_location" defaultValue={x?.event_location||''} placeholder="Thao Dien, Thu Duc City"/></label></div><div><h3>Impact fields</h3><label>Impact topic<select name="impact_topic" defaultValue={x?.impact_topic||''}><option value="">Not an impact post</option><option value="community-care">Community Care</option><option value="volunteering-giving">Volunteer & Giving</option><option value="animal-welfare">Animal Welfare</option><option value="children-families">Children & Families</option><option value="neighborhood-projects">Neighborhood Projects</option><option value="rescue-dogs">Animal Welfare (legacy)</option><option value="orphanage-support">Children & Families (legacy)</option><option value="community-volunteering">Volunteer & Giving (legacy)</option></select></label></div></div>

        <div className="editorSectionLabel"><span>05</span><div><strong>Search & distribution</strong><small>SEO and newsletter preparation</small></div></div>
        <label>SEO title<input name="seo_title" defaultValue={x?.seo_title||''} maxLength={70} placeholder="Optional search title, ideally under 60 characters"/></label>
        <label>SEO description<textarea name="seo_description" rows={3} maxLength={180} defaultValue={x?.seo_description||''} placeholder="Optional search description, ideally 140–160 characters"/></label>
        <div className="editorCheckGrid"><label><input type="checkbox" name="is_featured" value="yes" defaultChecked={Boolean(x?.is_featured)}/> Feature this article</label><label><input type="checkbox" name="newsletter_ready" value="yes" defaultChecked={Boolean(x?.newsletter_ready)}/> Ready for email magazine</label></div>
        <label>Internal editor note<textarea name="editor_note" rows={3} defaultValue={x?.editor_note||''} placeholder="Private note for the editorial team. Not shown publicly."/></label>
        <div className="publishBox"><label>Publication status<select name="status" defaultValue={x?.status||'draft'}><option value="draft">Draft — not public</option><option value="published">Published — visible publicly</option></select></label><button className="primaryButton">{x?'Save all changes':'Save article'}</button></div>
      </div>

      <aside className="editorMedia">
        <div className="editorMediaSticky"><h2>Images</h2><label>Cover image URL<input name="cover_image_url" defaultValue={x?.cover_image_url||'/stock/wellness.webp'}/></label><label>Or upload cover<input type="file" name="cover_image" accept="image/*"/></label>{x?.cover_image_url&&<img className="editorCoverPreview" src={x.cover_image_url} alt="Current cover"/>}<label>Cover caption<input name="hero_caption" defaultValue={x?.hero_caption||''} placeholder="Photo credit or short caption"/></label><label>Gallery images <small>(up to 10 total)</small><input type="file" name="gallery_images" accept="image/*" multiple/></label>{gallery.length>0&&<PhotoRemoveGrid urls={gallery} className="editorGalleryManage"/>}<div className="editorTip"><strong>Editorial checklist</strong><ul><li>Confirm names, dates and locations.</li><li>Use official sources for visa, tax and government notices.</li><li>Summarize source material in our own words.</li><li>Use multiple useful images, not decorative duplicates.</li><li>Insert body photos exactly where they help the story.</li><li>Keep paragraphs to roughly 2–4 sentences for mobile readability.</li><li>Use a section heading every few paragraphs.</li></ul></div></div>
      </aside>
    </form></section>

    <section id="posts" className="editorPanel"><div className="editorPanelHead"><div><span className="eyebrow">CONTENT LIBRARY</span><h2>Manage published content</h2></div><div className="editorHeaderActions"><Link className="outlineDark" href="/editor?compose=impact#compose">Write Impact News</Link><Link className="primaryButton" href="/editor">New article</Link></div></div>
      <form className="editorFilters" method="get" action="/editor"><input name="q" defaultValue={sp.q||''} placeholder="Search articles…"/><select name="type" defaultValue={sp.type||'all'}><option value="all">All types</option><option value="news">News</option><option value="blog">Blog</option><option value="event">Event</option><option value="impact">Impact</option><option value="story">Story</option></select><select name="status" defaultValue={sp.status||'all'}><option value="all">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select><button className="outlineDark">Filter</button></form>
      <div className="editorPostList">{posts.map((p:any)=><article key={p.id}><img src={p.cover_image_url||'/stock/wellness.webp'} alt=""/><div><div className="postBadges"><span>{p.content_type}</span><span className={p.status==='published'?'publishedBadge':'draftBadge'}>{p.status}</span>{p.is_featured&&<span>featured</span>}{p.newsletter_ready&&<span>newsletter</span>}</div><h3>{p.title}</h3>{p.subtitle&&<p className="postSubtitle">{p.subtitle}</p>}<p>{p.excerpt}</p><small>Updated {new Date(p.updated_at).toLocaleDateString()}</small></div><div className="editorPostActions"><Link href={`/editor?edit=${p.id}#compose`} className="primaryButton">Edit</Link>{p.status==='published'&&<Link href={`/news/${p.slug}`} className="outlineDark">Preview</Link>}<form action={deleteArticle}><input type="hidden" name="id" value={p.id}/><button className="dangerButton">Delete</button></form></div></article>)}{!posts.length&&<p className="muted">No content matches these filters.</p>}</div>
    </section>

    <section id="sponsorApplications" className="editorPanel">
      <div className="editorPanelHead">
        <div>
          <span className="eyebrow">COMMUNITY PARTNERS</span>
          <h2>Sponsor applications</h2>
          <p>Review incoming Community Partner applications. Ordered oldest first to preserve priority.</p>
        </div>
      </div>
      <SponsorApplicationsList applications={(sponsorApps as any) || []} />
    </section>

    <section id="business-notes" className="editorPanel"><div className="editorPanelHead"><div><span className="eyebrow">BUSINESS VISITS</span><h2>Editor’s notes</h2><p>After an actual visit, leave a short first-hand impression that appears on the public business page.</p></div></div><div className="editorBusinessList">{(businesses||[]).map((b:any)=><article key={b.id}><div><span className="eyebrow">{b.category} · {b.subcategory||'General'}</span><h3>{b.public_name}</h3>{b.editor_note?<><p>{b.editor_note}</p><small>{b.editor_name||'Editor'}{b.editor_visited_at?` · ${new Date(`${b.editor_visited_at}T00:00:00`).toLocaleDateString()}`:''}</small></>:<p className="muted">No editor’s visit note yet.</p>}</div><div className="adminRowActions"><Link href={`/business/${b.slug}`} className="outlineDark">Preview</Link><Link href={`/editor/businesses/${b.id}`} className="primaryButton">{b.editor_note?'Edit note':'Add note'}</Link></div></article>)}</div></section>
  </main></div>
}
