"use client"

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {createPublicClient} from '@/lib/supabase/public'

const PRIVATE_PREFIXES=['/admin','/editor','/login','/account','/auth','/api']
const VISITOR_KEY='gl_analytics_visitor_v1'
const SESSION_KEY='gl_analytics_session_v1'
const THIRTY_DAYS=30*24*60*60*1000
const SESSION_TIMEOUT=30*60*1000

function uuid(){
  if(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function') return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16)})
}

function visitorId(){
  try{
    const raw=localStorage.getItem(VISITOR_KEY)
    if(raw){const parsed=JSON.parse(raw);if(parsed?.id&&Number(parsed?.expires)>Date.now())return String(parsed.id)}
    const id=uuid();localStorage.setItem(VISITOR_KEY,JSON.stringify({id,expires:Date.now()+THIRTY_DAYS}));return id
  }catch{return uuid()}
}

function sessionId(){
  try{
    const raw=localStorage.getItem(SESSION_KEY),now=Date.now()
    if(raw){const parsed=JSON.parse(raw);if(parsed?.id&&now-Number(parsed?.lastSeen||0)<SESSION_TIMEOUT){localStorage.setItem(SESSION_KEY,JSON.stringify({id:parsed.id,lastSeen:now}));return String(parsed.id)}}
    const id=uuid();localStorage.setItem(SESSION_KEY,JSON.stringify({id,lastSeen:now}));return id
  }catch{return uuid()}
}

function safeTarget(anchor:HTMLAnchorElement){
  const raw=anchor.getAttribute('href')||''
  if(raw.startsWith('mailto:'))return 'mailto'
  if(raw.startsWith('tel:'))return 'tel'
  if(raw.startsWith('#'))return raw
  try{
    const u=new URL(anchor.href,location.href)
    return u.origin===location.origin?u.pathname:`${u.hostname}${u.pathname}`
  }catch{return raw.slice(0,700)}
}

function referrerHost(){try{return document.referrer?new URL(document.referrer).hostname:null}catch{return null}}

export function AnalyticsTracker(){
  const pathname=usePathname()
  useEffect(()=>{
    if(!pathname||PRIVATE_PREFIXES.some(p=>pathname.startsWith(p)))return
    if(typeof navigator!=='undefined'&&(navigator.webdriver||navigator.doNotTrack==='1'))return
    const supabase=createPublicClient()
    const write=(payload:Record<string,unknown>)=>{void supabase.from('analytics_events').insert({visitor_id:visitorId(),session_id:sessionId(),...payload})}
    const timer=window.setTimeout(()=>write({event_type:'page_view',path:pathname,referrer_host:referrerHost()}),250)
    const onClick=(event:MouseEvent)=>{
      const el=(event.target as Element|null)?.closest?.('a,button') as HTMLElement|null
      if(!el)return
      if(el.closest('[data-no-analytics="true"]'))return
      const a=el instanceof HTMLAnchorElement?el:null
      const target=a?safeTarget(a):`button:${(el.textContent||el.getAttribute('aria-label')||'button').trim().replace(/\s+/g,' ').slice(0,100)}`
      const entity_type=el.dataset.analyticsType||null
      const entity_id=el.dataset.analyticsId||null
      write({event_type:'click',path:pathname,target,entity_type,entity_id})
    }
    document.addEventListener('click',onClick,true)
    return()=>{window.clearTimeout(timer);document.removeEventListener('click',onClick,true)}
  },[pathname])
  return null
}
