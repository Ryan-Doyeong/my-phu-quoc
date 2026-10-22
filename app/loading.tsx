import { Logo } from '@/components/Logo'
import Link from 'next/link'

export default function Loading() {
  return (
    <main>
      <header className="detailNav">
        <Logo />
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>
      <section className="shell" style={{ padding: '60px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ height: '40px', width: '30%', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
        <div style={{ height: '20px', width: '60%', backgroundColor: '#f0f0f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
        <div style={{ height: '200px', width: '100%', backgroundColor: '#f0f0f0', borderRadius: '8px', animation: 'pulse 1.5s infinite', marginTop: '20px' }}></div>
      </section>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}} />
    </main>
  )
}
