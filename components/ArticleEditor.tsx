"use client"

import {useMemo,useRef,useState,useEffect} from 'react'
import {ArticleBody} from '@/components/ArticleBody'

type TemplateKey='news'|'impact'|'event'|'blog'|'story'

const TEMPLATE_LABELS:Record<TemplateKey,string>={
  news:'Local News',impact:'Community Impact',event:'Event',blog:'Guide / Blog',story:'People / Neighborhood Story',
}

const TEMPLATES:Record<TemplateKey,string>={
  news:`Write the most important fact first in 2–3 short sentences.\n\n## What happened\n\nExplain the update clearly and only include verified details.\n\n## What residents should know\n\nExplain who is affected, what changes, and what readers need to do.\n\n## Key details\n\n- Date:\n- Location:\n- Who it affects:\n\n## Good to know\n\nAdd practical context, a deadline, or a useful next step.`,
  impact:`Start with the real community action or outcome in 2–3 sentences.\n\n## What happened\n\nDescribe the activity, project, support, or result.\n\n## Why it matters\n\nExplain the local impact in simple, specific terms.\n\n## Who is involved\n\nName the people, groups, or businesses involved when confirmed.\n\n## How to take part\n\nExplain how readers can help, join, donate, volunteer, or learn more.`,
  event:`Start with one short paragraph explaining what the event is and why it may be useful or enjoyable.\n\n## What to expect\n\nDescribe the experience, program, or activities.\n\n## When & where\n\n- Date:\n- Time:\n- Location:\n\n## Who it is for\n\nExplain the audience, age range, or community group.\n\n## Good to know\n\nAdd booking details, price, what to bring, or useful access information.`,
  blog:`Open with the reader’s question or need, then explain why this guide is useful.\n\n## Why this matters\n\nGive the context in a short section.\n\n## What to know\n\nBreak the main information into clear, practical paragraphs.\n\n## Our practical take\n\nAdd local context, useful comparisons, or things readers may overlook.\n\n## Before you go\n\nSummarize the most useful final details or next steps.`,
  story:`Open with a person, place, or moment rather than a long introduction.\n\n## The beginning\n\nSet the scene and explain how the story started.\n\n## What changed\n\nDescribe the turning point, challenge, or development.\n\n## Why it matters here\n\nConnect the story to everyday life in Phu Quoc.\n\n## A local note\n\nClose with a short reflection, practical detail, or invitation to learn more.`,
}

function splitSentences(text:string){
  return text.trim().split(/(?<=[.!?。！？])\s+(?=[A-Z0-9À-ỹ가-힣“"'(])/u).map(s=>s.trim()).filter(Boolean)
}

function splitLongParagraph(text:string){
  if(text.length<=430)return [text.trim()]
  const sentences=splitSentences(text)
  if(sentences.length<2)return [text.trim()]
  const groups:string[]=[]
  let current:string[]=[]
  let chars=0
  for(const sentence of sentences){
    if(current.length>=3 || (current.length>=2 && chars+sentence.length>360)){
      groups.push(current.join(' '));current=[];chars=0
    }
    current.push(sentence);chars+=sentence.length+1
  }
  if(current.length)groups.push(current.join(' '))
  return groups
}

function optimizeDraft(raw:string,template:TemplateKey){
  let text=raw.replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim()
  if(!text)return ''

  const hasStructure=/^#{2,3}\s|^-\s|^>\s|^!\[/m.test(text)
  const sourceBlocks=text.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)
  const blocks:string[]=[]
  for(const block of sourceBlocks){
    if(/^#{2,3}\s|^-\s|^>\s|^---$|^!\[/.test(block))blocks.push(block)
    else blocks.push(...splitLongParagraph(block))
  }

  // If a pasted draft is one long wall of text, create a light editorial structure without rewriting facts.
  let normalized=blocks
  if(!hasStructure && normalized.length>=3){
    const headingSets:Record<TemplateKey,string[]>={
      news:['What happened','What residents should know','Good to know'],
      impact:['What happened','Why it matters','How to take part'],
      event:['What to expect','When & where','Good to know'],
      blog:['What to know','Practical details','Before you go'],
      story:['The story','What changed','Why it matters here'],
    }
    const headings=headingSets[template]
    const withHeadings:string[]=[normalized[0]]
    const remaining=normalized.slice(1)
    const chunk=Math.max(1,Math.ceil(remaining.length/headings.length))
    remaining.forEach((p,i)=>{
      if(i%chunk===0 && headings[Math.floor(i/chunk)])withHeadings.push(`## ${headings[Math.floor(i/chunk)]}`)
      withHeadings.push(p)
    })
    normalized=withHeadings
  }
  return normalized.join('\n\n').replace(/\n{3,}/g,'\n\n').trim()
}

export function ArticleEditor({defaultValue='',defaultTemplate='news'}:{defaultValue?:string,defaultTemplate?:string}){
  const ref=useRef<HTMLTextAreaElement>(null)
  const imageInputRef=useRef<HTMLInputElement>(null)
  const initialTemplate=(['news','impact','event','blog','story'].includes(defaultTemplate)?defaultTemplate:'news') as TemplateKey
  const [template,setTemplate]=useState<TemplateKey>(initialTemplate)
  const [value,setValue]=useState(defaultValue)
  const [preview,setPreview]=useState(false)
  const [uploading,setUploading]=useState(false)
  const [notice,setNotice]=useState('')

  function insertText(inserted:string){
    const el=ref.current
    if(!el){setValue(v=>v+inserted);return}
    const start=el.selectionStart,end=el.selectionEnd
    const next=value.slice(0,start)+inserted+value.slice(end)
    setValue(next)
    requestAnimationFrame(()=>{el.focus();el.setSelectionRange(start+inserted.length,start+inserted.length)})
  }

  
  
const DRAFT_KEY = 'antigravity-article-draft';
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved && saved !== defaultValue && !window.location.search.includes('edit=')) {
      if (window.confirm('임시저장된 글이 있습니다. 복구할까요?')) {
        setValue(saved);
      } else {
        localStorage.removeItem(DRAFT_KEY);
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (value.trim() && value !== defaultValue) localStorage.setItem(DRAFT_KEY, value);
    }, 3000);
    return () => clearTimeout(t);
  }, [value, defaultValue]);

  useEffect(() => {
    const t = setInterval(() => {
      if (value.trim() && value !== defaultValue) localStorage.setItem(DRAFT_KEY, value);
    }, 30000);
    return () => clearInterval(t);
  }, [value, defaultValue]);

  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const handleFormSubmit = () => localStorage.removeItem(DRAFT_KEY);
    form.addEventListener('submit', handleFormSubmit);
    return () => form.removeEventListener('submit', handleFormSubmit);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      replaceSelection('**', '**');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      replaceSelection('[', '](https://example.com)');
    }
  }

  function handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    const item = Array.from(e.dataTransfer.items).find(x => x.type.startsWith('image/'));
    if (item) {
      e.preventDefault();
      uploadInlineImage(item.getAsFile()!);
    }
  }

  async function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const item = Array.from(e.clipboardData.items).find(x => x.type.startsWith('image/'));
    if (item) {
      e.preventDefault();
      uploadInlineImage(item.getAsFile()!);
      return;
    }
    const html = e.clipboardData.getData('text/html');
    if (html) {
      e.preventDefault();
      try {
        const TurndownService = (await import('turndown')).default;
        const turndown = new TurndownService({ headingStyle: 'atx' });
        const md = turndown.turndown(html);
        insertText(md);
      } catch (err) {
        insertText(e.clipboardData.getData('text/plain'));
      }
    }
  }

  function replaceSelection(before:string,after='',linePrefix=false){
    const el=ref.current
    if(!el)return
    const start=el.selectionStart,end=el.selectionEnd
    const selected=value.slice(start,end)
    let inserted=''
    if(linePrefix){
      inserted=(selected||'Text').split('\n').map(line=>before+line).join('\n')
    }else inserted=before+(selected||'text')+after
    const next=value.slice(0,start)+inserted+value.slice(end)
    setValue(next)
    requestAnimationFrame(()=>{el.focus();el.setSelectionRange(start+inserted.length,start+inserted.length)})
  }

  async function pasteAndOptimize(){
    setNotice('')
    try{
      const text=await navigator.clipboard.readText()
      if(!text.trim()){setNotice('Clipboard is empty. Paste into the editor, then choose Optimize current draft.');return}
      setValue(optimizeDraft(text,template))
      setNotice('Pasted and formatted for easier mobile reading.')
    }catch{
      setNotice('Clipboard access was blocked. Paste into the editor, then choose Optimize current draft.')
    }
  }

  function applyOptimizer(){
    if(!value.trim()){setNotice('Paste or write a draft first.');return}
    setValue(optimizeDraft(value,template))
    setNotice('Layout optimized. Review headings before publishing.')
  }

  function insertTemplate(){
    if(value.trim() && !window.confirm('Replace the current article body with this template?'))return
    setValue(TEMPLATES[template])
    setNotice(`${TEMPLATE_LABELS[template]} template inserted.`)
  }

  async function uploadInlineImage(file:File){
    if(!file)return
    setUploading(true);setNotice('Uploading image…')
    try{
      const formData=new FormData();formData.append('file',file)
      const res=await fetch('/api/editorial-upload',{method:'POST',body:formData})
      const data=await res.json().catch(()=>({}))
      if(!res.ok)throw new Error(data?.error||'Upload failed.')
      const caption=window.prompt('Photo caption (optional)', '')||''
      insertText(`\n\n![${caption||'Article photo'}](${data.url})\n\n`)
      setNotice('Photo inserted at the cursor. You can move it by cutting and pasting its image line.')
    }catch(error){
      setNotice(error instanceof Error?error.message:'Image upload failed.')
    }finally{
      setUploading(false)
      if(imageInputRef.current)imageInputRef.current.value=''
    }
  }

  const stats=useMemo(()=>{
    const clean=value.trim()
    const words=clean?clean.replace(/^!\[[^\]]*\]\([^\n]+\)$/gm,'').split(/\s+/).filter(Boolean).length:0
    const paragraphs=clean?clean.split(/\n\s*\n/).filter(x=>x.trim()&&!/^#{2,3}\s|^-\s|^>\s|^---$|^!\[/.test(x.trim())):[]
    const longParagraphs=paragraphs.filter(p=>p.length>430).length
    const headings=(clean.match(/^#{2,3}\s/gm)||[]).length
    const images=(clean.match(/^!\[[^\]]*\]\([^\n]+\)$/gm)||[]).length
    return {words,paragraphs:paragraphs.length,longParagraphs,headings,images,minutes:Math.max(1,Math.ceil(words/220))}
  },[value])

  const [formState, setFormState] = useState({ title: '', cover: '', source: '' })

  function togglePreview() {
    if (!preview) {
      setFormState({
        title: (document.querySelector('input[name="title"]') as HTMLInputElement)?.value || '',
        cover: (document.querySelector('input[name="cover_image_url"]') as HTMLInputElement)?.value || '',
        source: (document.querySelector('input[name="source_name"]') as HTMLInputElement)?.value || '',
      });
    }
    setPreview(!preview);
  }

  return <div className={`articleEditorWidget ${preview ? 'hasPreview' : ''}`}>
    <div className="editorComposeArea">
    <div className="smartWritingPanel">
      <div><strong>Smart Article Template</strong><span>Paste a rough draft and let the editor organize spacing and section flow without rewriting your facts.</span></div>
      <div className="smartWritingActions">
        <select aria-label="Article template" value={template} onChange={e=>setTemplate(e.target.value as TemplateKey)}>{Object.entries(TEMPLATE_LABELS).map(([k,label])=><option key={k} value={k}>{label}</option>)}</select>
        <button type="button" onClick={pasteAndOptimize}>Paste & Optimize</button>
        <button type="button" onClick={applyOptimizer}>Optimize current draft</button>
        <button type="button" onClick={insertTemplate}>Insert template</button>
      </div>
    </div>

    <div className="articleToolbar" aria-label="Article formatting toolbar">
      <button type="button" onClick={()=>replaceSelection('## ','',true)}>H2</button>
      <button type="button" onClick={()=>replaceSelection('### ','',true)}>H3</button>
      <button type="button" onClick={()=>replaceSelection('**','**')}>Bold</button>
      <button type="button" onClick={()=>replaceSelection('- ','',true)}>List</button>
      <button type="button" onClick={()=>replaceSelection('> ','',true)}>Quote</button>
      <button type="button" onClick={()=>replaceSelection('[','](https://example.com)')}>Link</button>
      <button type="button" onClick={()=>replaceSelection('\n---\n')}>Rule</button>
      <button type="button" onClick={()=>imageInputRef.current?.click()} disabled={uploading}>{uploading?'Uploading…':'Photo'}</button>
      <button type="button" onClick={togglePreview}>{preview?'Write':'Preview'}</button>
      <input ref={imageInputRef} className="inlineImageInput" type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(file)uploadInlineImage(file)}}/>
    </div>
    <textarea ref={ref} name="body_en" onKeyDown={handleKeyDown} onPaste={handlePaste} onDrop={handleDrop} onDragOver={e => e.preventDefault()} rows={22} value={value} onChange={e=>setValue(e.target.value)} placeholder={'Paste your draft here, then choose Optimize current draft.\n\n## Section heading\nParagraph text…\n\n- Bullet point\n> Important callout'}/>
    {notice&&<div className="articleEditorNotice">{notice}</div>}
    <div className="articleReadability">
      <div><strong>{stats.words.toLocaleString()}</strong><span>words</span></div><div><strong>{stats.minutes}</strong><span>min read</span></div><div><strong>{stats.paragraphs}</strong><span>paragraphs</span></div><div><strong>{stats.headings}</strong><span>headings</span></div><div><strong>{stats.images}</strong><span>inline photos</span></div>
    </div>
    <div className="articleEditorHelp"><span>{stats.longParagraphs>0?`${stats.longParagraphs} long paragraph${stats.longParagraphs>1?'s':''} detected. Aim for 2–4 sentences per paragraph.`:'Mobile-friendly target: 2–4 sentences per paragraph, with a section heading every few paragraphs.'}</span><strong>{value.length.toLocaleString()} characters</strong></div>
    </div>
    {preview&&<div className="articleLivePreview"><div className="prePublishChecklist">
      <h3>Pre-publish Checklist</h3>
      <ul>
        {formState.cover === '' || formState.cover.includes('/stock/wellness') ? <li className="warn">⚠️ Cover image might be missing or default.</li> : <li className="ok">✅ Cover image set.</li>}
        {formState.title.length < 15 || formState.title.length > 70 ? <li className="warn">⚠️ Title length is {formState.title.length} chars (aim for 15-70).</li> : <li className="ok">✅ Title length is good.</li>}
        {!formState.source ? <li className="warn">⚠️ Source name is empty (important for news).</li> : <li className="ok">✅ Source provided.</li>}
        {(() => {
          const missingAlts = (value.match(/!\[\s*\]\([^\)]+\)/g) || []).length;
          return missingAlts > 0 ? <li className="warn">⚠️ {missingAlts} body image(s) missing alt text (caption).</li> : <li className="ok">✅ Body images have alt text.</li>
        })()}
      </ul>
    </div>
<div className="articlePreviewHead"><span className="eyebrow">LIVE BODY PREVIEW</span><small>Cover, title and metadata are not shown here.</small></div><ArticleBody body={value}/></div>}
  </div>
}
