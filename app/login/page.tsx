import { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false } };
import Link from 'next/link'
import {AuthButtons} from '@/components/AuthButtons'
import {Logo} from '@/components/Logo'

export const dynamic='force-dynamic'

export default async function LoginPage({searchParams}:{searchParams:Promise<{next?:string,error?:string}>}){
  const sp=await searchParams
  const next=sp.next&&sp.next.startsWith('/')&&!sp.next.startsWith('//')?sp.next:'/editor'
  return <main className="loginPage"><div className="loginCard"><Logo/><span className="eyebrow">STAFF ACCESS ONLY</span><h1>Admin & Writer sign in.</h1><p>Good life in Thaodien is a public information site. Visitors can browse without registering. This login is only for administrators and editorial staff.</p>{sp.error==='admin_role'&&<p className="formMessage">This account is signed in but does not have Admin permission.</p>}{sp.error==='editor_role'&&<p className="formMessage">This account is signed in but does not have Writer / Editor permission.</p>}<AuthButtons next={next}/><div className="loginLinks"><Link href="/" className="textLink">← Back to public website</Link></div></div></main>
}
