import { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false } };
import Link from 'next/link'
import {requireAdmin} from '@/lib/auth'
import {defaultSettings,type SiteSettings} from '@/lib/types'
import {saveAppearance,saveCategoryIcons,saveHomeSections,saveSponsorSlot,createEvent,createBackupSnapshot,importOsmCsv} from '@/app/actions'
import {mergeHomeSections} from '@/lib/homeSections'
import {Logo} from '@/components/Logo'
import {DIRECTORY_CATEGORIES,DIRECTORY_CATEGORY_KEYS,mergeDirectoryCategoryAppearance} from '@/lib/directory'
import {SponsorApplicationsList} from '@/components/SponsorApplicationsList'

export const dynamic='force-dynamic'

export default async function AdminPage(){
  const {supabase,profile}=await requireAdmin()
  const [{data:settingRow},{data:homeSectionsRow},{data:categorySettingRow},{data:subs},{data:suggestions},{data:volunteers},{data:stories},{data:banners},{data:backups},{data:businesses},{count:businessCount},{count:staffCount},{count:newsletterCount},{data:analytics7},{data:analytics30},{data:sponsorApps}] = await Promise.all([
    supabase.from('site_settings').select('value').eq('key','appearance').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key','home_sections').maybeSingle(),
    supabase.from('site_settings').select('value').eq('key','directory_categories').maybeSingle(),
    supabase.from('business_submissions').select('*').order('created_at',{ascending:false}).limit(30),
    supabase.from('community_suggestions').select('*').order('created_at',{ascending:false}).limit(30),
    supabase.from('volunteer_applications').select('*').order('created_at',{ascending:false}).limit(30),
    supabase.from('stories').select('id,title,status,content_type,updated_at').order('updated_at',{ascending:false}).limit(30),
    supabase.from('sponsor_banners').select('*').order('sort_order'),
    supabase.from('backup_snapshots').select('id,label,created_at').order('created_at',{ascending:false}).limit(10),
    supabase.from('businesses').select('id,public_name,slug,category,subcategory,status,verification_status,badges,is_good_life_member,updated_at').order('updated_at',{ascending:false}).limit(120),
    supabase.from('businesses').select('*',{count:'exact',head:true}),
    supabase.from('profiles').select('*',{count:'exact',head:true}).in('role',['editor','admin','owner']),
    supabase.from('newsletter_subscribers').select('*',{count:'exact',head:true}),
    supabase.rpc('analytics_summary',{p_days:7}),
    supabase.rpc('analytics_summary',{p_days:30}),
    supabase.from('sponsor_applications').select('*, businesses(id, public_name, slug)').order('created_at',{ascending:true}),
  ])
  const s={...defaultSettings,...((settingRow?.value||{}) as Partial<SiteSettings>)}
  const categoryAppearance=mergeDirectoryCategoryAppearance(categorySettingRow?.value)
  const homeSections=mergeHomeSections(homeSectionsRow?.value)
  const bySlot=Object.fromEntries((banners||[]).map(x=>[x.slot_key,x]))
  const activeSubs=(subs||[]).filter(x=>['submitted','manual_review','needs_info'].includes(x.status))
  const completedSubs=(subs||[]).filter(x=>['approved','rejected'].includes(x.status)).slice(0,10)
  const statusLabel:Record<string,string>={submitted:'Waiting review',manual_review:'In review',needs_info:'Needs changes',approved:'Approved',rejected:'Rejected'}
  return <div className="adminShell"><aside className="adminSidebar"><Logo href="/"/><nav><a href="#overview">Overview</a><a href="#analytics">Analytics</a><a href="#appearance">Appearance</a><a href="#homeSections">Home Text</a><a href="#categoryIcons">Category icons</a><a href="#sponsors">Sponsors</a><a href="#sponsorApplications">Sponsor Applications</a><a href="#events">Events</a><a href="#submissions">Business Intake</a><a href="#businesses">Businesses</a><Link href="/editor">Editorial Studio</Link><a href="#content">Content</a><a href="#backup">Backup</a><a href="#communityInbox">Community</a></nav><small>{profile.email}</small></aside><main className="adminMain">
    <header><div><span className="eyebrow">MASTER ADMIN</span><h1>Operations dashboard</h1></div><div className="headerAdminLinks"><Link href="/" className="outlineDark">View website</Link><a href="/api/admin/backup" className="primaryButton">Download full backup</a></div></header>
    <section id="overview" className="metricGrid"><article><span>Businesses</span><strong>{businessCount||0}</strong></article><article><span>Staff accounts</span><strong>{staffCount||0}</strong></article><article><span>Newsletter</span><strong>{newsletterCount||0}</strong></article><article><span>Waiting review</span><strong>{activeSubs.length}</strong></article></section>

    <AnalyticsSection seven={analytics7} thirty={analytics30}/>

    <section id="appearance" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">APPEARANCE</span><h2>Homepage hero & template</h2><p>The original sprout identity is restored across the site. Update the hero without touching content data.</p></div><form action={saveAppearance} className="appearanceForm"><div className="previewPanel"><img src={s.hero_image_url} alt="Current hero"/><p>Current hero image</p></div><div className="fields"><label>Hero image URL<input name="hero_image_url" defaultValue={s.hero_image_url}/></label><label>Upload new hero image<input name="hero_image" type="file" accept="image/*"/></label><label>Topline<input name="hero_topline" defaultValue={s.hero_topline}/></label><label>Title<textarea name="hero_title" rows={2} defaultValue={s.hero_title}/></label><label>Slogan<input name="hero_subtitle" defaultValue={s.hero_subtitle}/></label><label>Description<textarea name="hero_description" rows={2} defaultValue={s.hero_description}/></label><div className="twoCols"><label>Primary CTA<input name="hero_primary_cta" defaultValue={s.hero_primary_cta}/></label><label>Secondary CTA<input name="hero_secondary_cta" defaultValue={s.hero_secondary_cta}/></label></div><label>Side note<textarea name="hero_note" rows={2} defaultValue={s.hero_note}/></label><div className="threeCols"><label>Blur<input name="hero_blur" type="number" min="0" max="18" defaultValue={s.hero_blur}/></label><label>Overlay<input name="hero_overlay" type="number" step="0.01" min="0" max="0.75" defaultValue={s.hero_overlay}/></label><label>Radius<input name="radius" type="number" min="16" max="40" defaultValue={s.radius}/></label></div><div className="threeCols"><label>Accent<input name="accent_color" type="color" defaultValue={s.accent_color}/></label><label>Background<input name="bg_color" type="color" defaultValue={s.bg_color}/></label><label>Paper<input name="paper_color" type="color" defaultValue={s.paper_color}/></label></div><button className="primaryButton">Save appearance</button></div></form></section>

    
    <section id="homeSections" className="adminSection">
      <div className="adminSectionTitle">
        <span className="eyebrow">HOMEPAGE SECTIONS</span>
        <h2>Home Screen Text</h2>
        <p>Edit the titles and descriptions of the main sections on the homepage. Toggle visibility for each section.</p>
      </div>
      <form action={saveHomeSections} className="fields compactFields">
        <h3>Sponsored with Purpose</h3>
        <label className="inlineCheck"><input type="checkbox" name="purposeVisible" defaultChecked={homeSections.purpose.visible}/> Show section</label>
        <label>Title<input name="purposeTitle" defaultValue={homeSections.purpose.title} maxLength={120}/></label>
        <label>Description<textarea name="purposeDescription" rows={2} defaultValue={homeSections.purpose.description} maxLength={400}/></label>
        <label>Handwritten note<textarea name="purposeHandNote" rows={2} defaultValue={homeSections.purpose.handNote} maxLength={120}/></label>

        <h3>Discover Local Living</h3>
        <label className="inlineCheck"><input type="checkbox" name="discoverVisible" defaultChecked={homeSections.discover.visible}/> Show section</label>
        <label>Title<input name="discoverTitle" defaultValue={homeSections.discover.title} maxLength={120}/></label>
        <label>Description<textarea name="discoverDescription" rows={2} defaultValue={homeSections.discover.description} maxLength={400}/></label>

        <h3>News, Blog & Stories</h3>
        <label className="inlineCheck"><input type="checkbox" name="storiesVisible" defaultChecked={homeSections.stories.visible}/> Show section</label>
        <label>Title<input name="storiesTitle" defaultValue={homeSections.stories.title} maxLength={120}/></label>
        <label>Description<textarea name="storiesDescription" rows={2} defaultValue={homeSections.stories.description} maxLength={400}/></label>

        <h3>Newsletter</h3>
        <label className="inlineCheck"><input type="checkbox" name="newsletterVisible" defaultChecked={homeSections.newsletter.visible}/> Show section</label>
        <label>Title<input name="newsletterTitle" defaultValue={homeSections.newsletter.title} maxLength={120}/></label>
        <label>Description<textarea name="newsletterDescription" rows={2} defaultValue={homeSections.newsletter.description} maxLength={400}/></label>

        <h3>Participation (Suggestions & Volunteer)</h3>
        <label className="inlineCheck"><input type="checkbox" name="participationVisible" defaultChecked={homeSections.participation.visible}/> Show section</label>
        <div className="twoCols">
          <label>Suggestion Title<input name="suggestionTitle" defaultValue={homeSections.participation.suggestionTitle} maxLength={120}/></label>
          <label>Volunteer Title<input name="volunteerTitle" defaultValue={homeSections.participation.volunteerTitle} maxLength={120}/></label>
        </div>
        <div className="twoCols">
          <label>Suggestion Description<textarea name="suggestionDescription" rows={2} defaultValue={homeSections.participation.suggestionDescription} maxLength={400}/></label>
          <label>Volunteer Description<textarea name="volunteerDescription" rows={2} defaultValue={homeSections.participation.volunteerDescription} maxLength={400}/></label>
        </div>

        <h3>Closing</h3>
        <label className="inlineCheck"><input type="checkbox" name="closingVisible" defaultChecked={homeSections.closing.visible}/> Show section</label>
        <label>Title<textarea name="closingTitle" rows={2} defaultValue={homeSections.closing.title} maxLength={120}/></label>
        <label>Description<textarea name="closingDescription" rows={2} defaultValue={homeSections.closing.description} maxLength={400}/></label>

        <h3>Event Promo</h3>
        <label className="inlineCheck"><input type="checkbox" name="eventPromoVisible" defaultChecked={homeSections.eventPromo.visible}/> Show section</label>

        <button className="primaryButton">Save home sections</button>
      </form>
    </section>

    <section id="categoryIcons" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">CATEGORY ICONS</span><h2>Edit directory category icons</h2><p>Upload a simple square icon for each directory category. If no image is uploaded, the short text symbol is used instead.</p></div><form action={saveCategoryIcons} className="categoryIconAdminGrid">{DIRECTORY_CATEGORY_KEYS.map(key=>{const c=DIRECTORY_CATEGORIES[key],icon=categoryAppearance[key];return <article className="categoryIconEditor" key={key}><div className="categoryIconPreview">{icon.icon_url?<img src={icon.icon_url} alt={`${c.label} icon`}/>:<span>{icon.icon_text}</span>}</div><div><span className="eyebrow">{key.toUpperCase()}</span><h3>{c.label}</h3></div><label>Fallback symbol<input name={`icon_text_${key}`} defaultValue={icon.icon_text} maxLength={6}/></label><label>Icon image URL<input name={`icon_url_${key}`} defaultValue={icon.icon_url}/></label><label>Upload icon<input name={`icon_image_${key}`} type="file" accept="image/png,image/jpeg,image/webp,image/avif"/></label>{icon.icon_url&&<label className="inlineCheck"><input type="checkbox" name={`remove_icon_${key}`} value="yes"/> Remove current image</label>}</article>})}<div className="categoryIconSave"><button className="primaryButton">Save category icons</button><small>Recommended: square PNG/WebP, transparent background, at least 256×256 px.</small></div></form></section>

    <section id="sponsors" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">SPONSORS</span><h2>7 rotating main banners + 4 small banners</h2><p>Main banners rotate automatically on the homepage. Sponsorship remains visually labeled and separate from organic directory ranking.</p></div><div className="sponsorAdminGrid">{Array.from({length:7},(_,i)=>{const key=`main-${i+1}`,x=bySlot[key];return <SponsorSlot key={key} slot={key} size="main" data={x}/>})}</div><h3 className="subAdminHeading">Supporting banners</h3><div className="sponsorAdminGrid smallSlots">{Array.from({length:4},(_,i)=>{const key=`small-${i+1}`,x=bySlot[key];return <SponsorSlot key={key} slot={key} size="small" data={x}/>})}</div></section>

    <section id="sponsorApplications" className="adminSection">
      <div className="adminSectionTitle">
        <span className="eyebrow">COMMUNITY PARTNERS</span>
        <h2>Sponsor applications</h2>
        <p>Review incoming Community Partner applications. Ordered oldest first to preserve queue priority.</p>
      </div>
      <SponsorApplicationsList applications={(sponsorApps as any) || []} />
    </section>

    <section id="events" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">EVENTS</span><h2>Homepage event banner</h2><p>Publish a Phu Quoc event announcement. The newest upcoming event appears directly below the sponsor area and links to the Events news page.</p></div><form action={createEvent} className="fields compactFields"><label>Event title<input name="title" required/></label><label>Short summary<textarea name="excerpt" rows={2}/></label><label>Article body<textarea name="body_en" rows={5}/></label><div className="twoCols"><label>Date & time<input name="event_date" type="datetime-local"/></label><label>Location<input name="event_location" placeholder="Sunset Town, Phu Quoc"/></label></div><label>Cover image URL<input name="cover_image_url" defaultValue="/features/nightlife_featured_1280.webp"/></label><label>Or upload cover image<input name="cover_image" type="file" accept="image/*"/></label><button className="primaryButton">Publish event announcement</button></form></section>

    <section id="submissions" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">BUSINESS INTAKE</span><h2>Simple review queue</h2><p>Open a submission, check the details and photos, then choose Approve, Needs changes or Reject. There is no multi-step checklist.</p></div><div className="adminList">{activeSubs.length?activeSubs.map(x=><article key={x.id}><div><strong>{x.public_name}</strong><p>{x.category} · {x.subcategory||'Uncategorized'}</p><small>{x.address}</small><div className="submissionPhotos">{(x.photo_urls||[]).slice(0,4).map((p:string,i:number)=><img key={i} src={p} alt=""/>)}</div></div><span className={`status ${x.status}`}>{statusLabel[x.status]||x.status}</span><div className="submissionActions"><Link className="primaryButton" href={`/admin/submissions/${x.id}`}>Review</Link></div></article>):<p>No businesses are waiting for review.</p>}</div>{completedSubs.length>0&&<><h3 className="subAdminHeading">Recent decisions</h3><div className="adminList compactReviewHistory">{completedSubs.map(x=><article key={x.id}><div><strong>{x.public_name}</strong><small>{new Date(x.reviewed_at||x.created_at).toLocaleDateString()}</small></div><span className={`status ${x.status}`}>{statusLabel[x.status]||x.status}</span><Link href={`/admin/submissions/${x.id}`} className="outlineDark">View</Link></article>)}</div></>}</section>

    
    <section id="import" className="adminSection">
      <div className="adminSectionTitle">
        <span className="eyebrow">BULK IMPORT</span>
        <h2>Import OSM Candidates</h2>
        <p>Upload a CSV file (e.g. from collect-osm.mjs). Entries will be added as "draft" and "unverified". You can review and verify them manually.</p>
      </div>
      <form action={importOsmCsv} className="fields compactFields">
        <label>
          CSV File
          <input type="file" name="csv_file" accept=".csv" required />
        </label>
        <button className="primaryButton">Upload & Import Drafts</button>
      </form>
    </section>

    <section id="businesses" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">DIRECTORY MANAGEMENT</span><h2>Published & draft businesses</h2><p>Edit, correct, archive or delete business listings without touching the verification intake records.</p></div><div className="adminList businessManagementList">{businesses?.length?businesses.map(x=><article key={x.id}><div><strong>{x.public_name}</strong><p>{x.category} · {x.subcategory||'Uncategorized'} · {x.status}</p>{((x.badges||[]).length>0||x.is_good_life_member)&&<div className="postBadges">{(x.badges||[]).map((b:string)=><span key={b}>{b}</span>)}{x.is_good_life_member&&<span>My Phu Quoc member</span>}</div>}<small>{x.verification_status} · Updated {new Date(x.updated_at).toLocaleDateString()}</small></div><div className="adminRowActions"><Link href={`/business/${x.slug}`} className="outlineDark">Preview</Link><Link href={`/admin/businesses/${x.id}`} className="primaryButton">Edit listing</Link></div></article>):<p>No businesses.</p>}</div></section>

    <section id="content" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">CONTENT</span><h2>News, blog, events & impact</h2><p>Use Editorial Studio to create, edit, preview and delete content. Content data remains separate from visual design settings.</p><Link href="/editor" className="primaryButton sectionAdminCta">Open Editorial Studio →</Link></div><div className="adminList">{stories?.length?stories.map(x=><article key={x.id}><div><strong>{x.title}</strong><p>{x.content_type} · {x.status}</p></div><div className="adminRowActions"><small>{new Date(x.updated_at).toLocaleDateString()}</small><Link href={`/editor?edit=${x.id}`} className="outlineDark">Edit</Link></div></article>):<p>No stories yet.</p>}</div></section>

    <section id="backup" className="adminSection backupSection"><div className="adminSectionTitle"><span className="eyebrow">DATA SAFETY</span><h2>Staff, business & content backups</h2><p>The backup includes staff profiles, business data, submissions, news/blog/event content, newsletter subscribers, sponsors, settings and community records. Passwords and authentication secrets are never exported.</p></div><div className="backupActions"><a className="primaryButton" href="/api/admin/backup">Download complete JSON backup</a><form action={createBackupSnapshot}><input name="label" placeholder="Snapshot label, e.g. Before homepage redesign"/><button className="outlineDark">Create database snapshot</button></form></div><div className="adminList">{backups?.length?backups.map(x=><article key={x.id}><strong>{x.label}</strong><small>{new Date(x.created_at).toLocaleString()}</small></article>):<p>No snapshots yet.</p>}</div></section>

    <section id="communityInbox" className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">COMMUNITY</span><h2>Suggestions & volunteers</h2></div><div className="inboxColumns"><div><h3>Suggestions</h3>{suggestions?.length?suggestions.map(x=><article key={x.id} className="inboxItem"><strong>{x.suggestion_type}</strong><p>{x.message}</p><small>{x.name||'Anonymous'} · {x.email}</small></article>):<p>No suggestions.</p>}</div><div><h3>Volunteer applications</h3>{volunteers?.length?volunteers.map(x=><article key={x.id} className="inboxItem"><strong>{x.area}</strong><p>{x.message}</p><small>{x.name||'Anonymous'} · {x.email}</small></article>):<p>No volunteers.</p>}</div></div></section>
  </main></div>
}

function SponsorSlot({slot,size,data}:{slot:string,size:'main'|'small',data:any}){return <form action={saveSponsorSlot} className="sponsorSlot"><input type="hidden" name="slot_key" value={slot}/><input type="hidden" name="size" value={size}/><div className="slotTitle"><strong>{slot.toUpperCase()}</strong><label><input type="checkbox" name="is_active" value="yes" defaultChecked={data?.is_active??true}/> Active</label></div>{data?.image_url&&<img src={data.image_url} alt=""/>}<label>Title<input name="title" defaultValue={data?.title||''}/></label>{size==='main'&&<label>Subtitle<input name="subtitle" defaultValue={data?.subtitle||''}/></label>}<label>Target URL<input name="target_url" defaultValue={data?.target_url||'#'}/></label><label>Image URL<input name="image_url" defaultValue={data?.image_url||''}/></label><label>Or upload<input name="image" type="file" accept="image/*"/></label><button className="outlineDark">Save slot</button></form>}

function AnalyticsSection({seven,thirty}:{seven:any,thirty:any}){
  const a7=seven||{},a30=thirty||{}
  const topPages=Array.isArray(a30.top_pages)?a30.top_pages:[]
  const topClicks=Array.isArray(a30.top_clicks)?a30.top_clicks:[]
  const topBusinesses=Array.isArray(a30.top_businesses)?a30.top_businesses:[]
  const topSponsors=Array.isArray(a30.top_sponsors)?a30.top_sponsors:[]
  const pagesPerVisit=a30.visits?Number(a30.page_views||0)/Number(a30.visits):0
  return <section id="analytics" className="adminSection analyticsSection"><div className="adminSectionTitle"><span className="eyebrow">FIRST-PARTY ANALYTICS</span><h2>Traffic & engagement</h2><p>Approximate traffic measured directly by My Phu Quoc. Admin/editor activity, IP addresses and precise location are not collected.</p></div>
    <div className="analyticsPeriod"><div><span>LAST 7 DAYS</span><strong>{Number(a7.visitors||0).toLocaleString()} visitors</strong></div><div><span>Visits</span><strong>{Number(a7.visits||0).toLocaleString()}</strong></div><div><span>Page views</span><strong>{Number(a7.page_views||0).toLocaleString()}</strong></div><div><span>Clicks</span><strong>{Number(a7.clicks||0).toLocaleString()}</strong></div></div>
    <div className="analyticsPeriod thirty"><div><span>LAST 30 DAYS</span><strong>{Number(a30.visitors||0).toLocaleString()} visitors</strong></div><div><span>Visits</span><strong>{Number(a30.visits||0).toLocaleString()}</strong></div><div><span>Page views</span><strong>{Number(a30.page_views||0).toLocaleString()}</strong></div><div><span>Pages / visit</span><strong>{pagesPerVisit.toFixed(1)}</strong></div><div><span>Clicks</span><strong>{Number(a30.clicks||0).toLocaleString()}</strong></div></div>
    <div className="analyticsLists">
      <AnalyticsList title="Top pages" rows={topPages.map((x:any)=>({label:x.path,value:`${Number(x.views||0).toLocaleString()} views`}))}/>
      <AnalyticsList title="Top business clicks" rows={topBusinesses.map((x:any)=>({label:x.name||x.id,value:`${Number(x.clicks||0).toLocaleString()} clicks`}))}/>
      <AnalyticsList title="Top sponsor clicks" rows={topSponsors.map((x:any)=>({label:x.name||x.slot,value:`${Number(x.clicks||0).toLocaleString()} clicks`}))}/>
      <AnalyticsList title="Top click destinations" rows={topClicks.map((x:any)=>({label:x.target,value:`${Number(x.clicks||0).toLocaleString()} clicks`}))}/>
    </div>
    <p className="analyticsNote">Visitor count is an estimate based on a first-party 30-day browser identifier. One person using multiple browsers/devices may be counted more than once.</p>
  </section>
}

function AnalyticsList({title,rows}:{title:string,rows:{label:string,value:string}[]}){return <div className="analyticsList"><h3>{title}</h3>{rows.length?<ol>{rows.slice(0,10).map((r,i)=><li key={`${r.label}-${i}`}><span>{r.label}</span><strong>{r.value}</strong></li>)}</ol>:<p>No data yet.</p>}</div>}
