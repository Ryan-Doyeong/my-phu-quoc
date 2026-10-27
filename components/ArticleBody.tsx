import type {ReactNode} from 'react'
import {imageUrl} from '@/lib/imageUrl'

function inline(text:string):ReactNode[]{
  const token=/\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/(?!\/)[^\s)]*)\)/g
  const out:ReactNode[]=[]
  let last=0,m:RegExpExecArray|null
  while((m=token.exec(text))){
    if(m.index>last)out.push(text.slice(last,m.index))
    if(m[1])out.push(<strong key={`${m.index}-b`}>{m[1]}</strong>)
    else {
      const isInternal = m[3].startsWith('/') || (!!process.env.NEXT_PUBLIC_SITE_URL && m[3].startsWith(process.env.NEXT_PUBLIC_SITE_URL));
      if (isInternal) {
        out.push(<a key={`${m.index}-a`} href={m[3]}>{m[2]}</a>)
      } else {
        out.push(<a key={`${m.index}-a`} href={m[3]} target="_blank" rel="noreferrer">{m[2]}</a>)
      }
    }
    last=token.lastIndex
  }
  if(last<text.length)out.push(text.slice(last))
  return out
}

export function ArticleBody({body}:{body:string|null|undefined}){
  const normalized = String(body || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
  const lines = normalized.split('\n')
  const nodes:ReactNode[]=[]
  let bullets:string[]=[]
  let tableRows:string[][] = []

  const flushTable = () => {
    if (tableRows.length >= 2) {
      const header = tableRows[0]
      const dataRows = tableRows.slice(1).filter(r => !r.every(c => /^:?-+:?$/.test(c.trim())))
      nodes.push(
        <div key={`tbl-${nodes.length}`} className="articleTableWrapper" style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table className="articleTable" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0, 0, 0, 0.04)', borderBottom: '2px solid rgba(0, 0, 0, 0.12)' }}>
                {header.map((col, idx) => (
                  <th key={idx} style={{ padding: '0.75rem 1rem', fontWeight: 600, border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    {inline(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ padding: '0.75rem 1rem', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
    }
  }

  const flush = () => {
    if (bullets.length) {
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="articleBulletList">
          {bullets.map((b, i) => (
            <li key={i}>{inline(b)}</li>
          ))}
        </ul>
      )
      bullets = []
    }
    flushTable()
  }

  lines.forEach((raw, i) => {
    const line = raw.trim()
    if (!line) {
      flush()
      return
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      if (bullets.length) {
        nodes.push(
          <ul key={`ul-${nodes.length}`} className="articleBulletList">
            {bullets.map((b, bIdx) => (
              <li key={bIdx}>{inline(b)}</li>
            ))}
          </ul>
        )
        bullets = []
      }
      tableRows.push(line.split('|').slice(1, -1).map((c) => c.trim()))
      return
    }

    if (line === '---') {
      flush()
      nodes.push(<hr key={`hr-${i}`} />)
      return
    }
    if (line.startsWith('- ')) {
      flushTable()
      bullets.push(line.slice(2))
      return
    }
    flush()
    const image = line.match(/^!\[([^\]]*)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)$/)
    if (image) {
      nodes.push(
        <figure key={`img-${i}`} className="articleInlineFigure">
          <img
            src={imageUrl(image[2], 1200, 76)}
            alt={image[1] || 'Article photo'}
            loading="lazy"
            decoding="async"
          />
          {image[1] && image[1] !== 'Article photo' && <figcaption>{image[1]}</figcaption>}
        </figure>
      )
      return
    }
    if (line.startsWith('### ')) nodes.push(<h3 key={i}>{inline(line.slice(4))}</h3>)
    else if (line.startsWith('## ')) nodes.push(<h2 key={i}>{inline(line.slice(3))}</h2>)
    else if (line.startsWith('> ')) nodes.push(<blockquote key={i}>{inline(line.slice(2))}</blockquote>)
    else nodes.push(<p key={i}>{inline(line)}</p>)
  })
  flush()
  return <div className="articleCopy structuredArticleCopy">{nodes}</div>
}
