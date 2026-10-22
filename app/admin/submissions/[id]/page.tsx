import Link from 'next/link'
import {notFound} from 'next/navigation'
import {requireAdmin} from '@/lib/auth'
import {reviewSubmission} from '@/app/actions'
import {Logo} from '@/components/Logo'

export const dynamic='force-dynamic'

const statusLabel:Record<string,string>={
  submitted:'Waiting review',
  manual_review:'In review',
  needs_info:'Needs changes',
  approved:'Approved',
  rejected:'Rejected'
}

export default async function SubmissionReviewPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const {supabase,profile}=await requireAdmin()
  const {data:x}=await supabase.from('business_submissions').select('*').eq('id',id).maybeSingle()
  if(!x)notFound()

  return <div className="adminShell"><aside className="adminSidebar"><Logo href="/"/><nav><Link href="/admin#submissions">← Review queue</Link><Link href="/admin">Admin dashboard</Link><Link href="/editor">Editorial Studio</Link></nav><small>{profile.email}</small></aside><main className="adminMain">
    <header><div><span className="eyebrow">BUSINESS REVIEW</span><h1>{x.public_name}</h1><p>Check the information below, then make one decision.</p></div><span className={`status ${x.status}`}>{statusLabel[x.status]||x.status}</span></header>

    <section className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">1 · BUSINESS INFORMATION</span><h2>Submitted details</h2></div>
      <div className="verificationInfoGrid">
        <article><strong>Category</strong><p>{x.category} · {x.subcategory||'—'}</p></article>
        <article><strong>Address</strong><p>{x.address||'—'}</p></article>
        <article><strong>Phone</strong><p>{x.phone||'—'}</p></article>
        <article><strong>Tax code</strong><p>{x.tax_code||'—'}</p></article>
        <article><strong>Contact</strong><p>{x.contact_name||'—'}<br/>{x.contact_email}</p></article>
        <article><strong>Google Maps</strong><p>{x.google_maps_url?<a href={x.google_maps_url} target="_blank" rel="noreferrer">Open Google Maps ↗</a>:'—'}</p></article>
      </div>
      {x.description_en&&<div className="reviewDescription"><strong>Business introduction</strong><p>{x.description_en}</p></div>}
      <div className="verificationInfoGrid">
        {x.website_url&&<article><strong>Website</strong><p><a href={x.website_url} target="_blank" rel="noreferrer">Open website ↗</a></p></article>}
        {x.facebook_url&&<article><strong>Facebook</strong><p><a href={x.facebook_url} target="_blank" rel="noreferrer">Open Facebook ↗</a></p></article>}
        {x.instagram_url&&<article><strong>Instagram</strong><p><a href={x.instagram_url} target="_blank" rel="noreferrer">Open Instagram ↗</a></p></article>}
        {x.tiktok_url&&<article><strong>TikTok</strong><p><a href={x.tiktok_url} target="_blank" rel="noreferrer">Open TikTok ↗</a></p></article>}
      </div>
    </section>

    <section className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">2 · PHOTOS</span><h2>Submitted photos</h2><p>Open a photo if you need to inspect it at full size.</p></div>
      <div className="submissionGallery">{(x.photo_urls||[]).map((p:string,i:number)=><a key={p} href={p} target="_blank" rel="noreferrer"><img src={p} alt={`Submitted business photo ${i+1}`}/></a>)}</div>
    </section>

    <section className="adminSection"><div className="adminSectionTitle"><span className="eyebrow">3 · DECISION</span><h2>Simple review</h2><p>No multi-step checklist. Review the information and choose one action.</p></div>
      <form action={reviewSubmission} className="fields simpleReviewForm">
        <input type="hidden" name="id" value={x.id}/>
        <label>Internal note <span className="fieldHint">Optional — visible only to staff</span><textarea name="verification_note" rows={3} defaultValue={x.verification_note||''} placeholder="Example: Maps listing and business details look consistent."/></label>
        <label>Changes requested from business <span className="fieldHint">Use this only when selecting Needs changes</span><textarea name="requested_changes" rows={3} defaultValue={x.requested_changes||''} placeholder="Example: Please send a clearer storefront photo and correct the phone number."/></label>
        <div className="simpleDecisionBar">
          <button name="decision" value="approved" className="primaryButton">Approve & publish</button>
          <button name="decision" value="needs_info" className="outlineDark">Needs changes</button>
          <button name="decision" value="manual_review" className="outlineDark">Save note only</button>
          <button name="decision" value="rejected" className="dangerButton">Reject</button>
        </div>
      </form>
      {x.status==='approved'&&<p className="reviewOutcome success">This submission has been approved and published in the directory.</p>}
      {x.status==='needs_info'&&<p className="reviewOutcome">This submission is waiting for corrected information.</p>}
      {x.status==='rejected'&&<p className="reviewOutcome danger">This submission was rejected.</p>}
    </section>
  </main></div>
}
