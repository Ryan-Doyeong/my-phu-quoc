"use client"

import {FormEvent,useState} from 'react'

function friendlyError(message:string){
  const m=message.toLowerCase()
  if(m.includes('invalid login credentials')) return 'The email or password is incorrect.'
  if(m.includes('email not confirmed')) return 'This staff account has not completed email confirmation yet.'
  if(m.includes('not authorized')||m.includes('staff')) return 'This account does not have Admin or Writer access.'
  if(m.includes('rate limit')||m.includes('too many')) return 'Too many attempts were made. Please wait a few minutes before trying again.'
  return message
}

export function AuthButtons({next='/editor'}:{next?:string}){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  const [busy,setBusy]=useState(false)
  const safeNext=next.startsWith('/')&&!next.startsWith('//')?next:'/editor'

  async function submit(e:FormEvent){
    e.preventDefault();setBusy(true);setMessage('')
    try{
      const r=await fetch('/api/auth/email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'signin',email,password,next:safeNext})})
      const data=await r.json()
      if(!r.ok||!data.ok){setMessage(friendlyError(data.message||'Sign-in failed.'));return}
      window.location.assign(data.next||safeNext)
    }catch{setMessage('Could not contact the authentication service. Please try again.')}
    finally{setBusy(false)}
  }

  return <div className="authButtons staffAuthOnly">
    <form onSubmit={submit} className="emailAuthForm staffEmailAuthForm">
      <label>Staff email<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com" required/></label>
      <label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required minLength={8}/></label>
      <button disabled={busy}>{busy?'Signing in…':'Sign in to staff tools'}</button>
    </form>
    {message&&<p className="formMessage">{message}</p>}
    <p className="authHelp">Public visitors do not need an account. Staff accounts are created privately by the site owner and assigned an Admin or Writer role.</p>
  </div>
}
