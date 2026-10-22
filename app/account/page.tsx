import { Metadata } from "next";
export const metadata: Metadata = { robots: { index: false } };
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'

export const dynamic='force-dynamic'

export default async function AccountPage(){
  const supabase=await createClient()
  const {data:{user}}=await supabase.auth.getUser()
  if(!user)redirect('/login')
  const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle()
  if(profile?.role==='editor')redirect('/editor')
  if(profile&&['admin','owner'].includes(profile.role))redirect('/admin')
  await supabase.auth.signOut()
  redirect('/login')
}
