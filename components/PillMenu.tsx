'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export interface PillMenuGroup {
  title?: string
  items: { href: string; label: string }[]
}

export function PillMenu({ label, groups }: { label: string; groups: PillMenuGroup[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="pillMenu" ref={ref}>
      <button
        type="button"
        className="pillMenuButton"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{label}</span>
        <svg className={`pillMenuChevron${open ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="pillMenuPanel" role="menu">
          {groups.map((g, gi) => (
            <div className="pillMenuGroup" key={gi}>
              {g.title && <p className="pillMenuTitle">{g.title}</p>}
              {g.items.map((it) => (
                <Link key={it.href} href={it.href} role="menuitem" className="pillMenuItem">
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
