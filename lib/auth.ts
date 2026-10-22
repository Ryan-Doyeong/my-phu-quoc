import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireStaff(next='/editor') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`)
  const { data: profile } = await supabase.from('profiles').select('role,email,full_name').eq('id', user.id).single()
  if (!profile || !['editor','admin','owner'].includes(profile.role)) redirect(`/login?error=editor_role&next=${encodeURIComponent(next)}`)
  return { supabase, user, profile }
}

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/admin')
  const { data: profile } = await supabase.from('profiles').select('role,email,full_name').eq('id', user.id).single()
  if (!profile || !['admin','owner'].includes(profile.role)) redirect('/login?error=admin_role&next=/admin')
  return { supabase, user, profile }
}
