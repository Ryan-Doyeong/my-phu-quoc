type Props={website?:string|null,facebook?:string|null,instagram?:string|null,tiktok?:string|null,businessId?:string|null}

const icons={
  website:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3c3 3 4.2 6 4.2 9S15 18 12 21c-3-3-4.2-6-4.2-9S9 6 12 3Z"/></svg>,
  facebook:<svg viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.7 1.8-1.7H18V3.8c-.4-.1-1.5-.2-2.7-.2-2.7 0-4.6 1.7-4.6 4.7V10H8v3h2.7v8H14Z"/></svg>,
  instagram:<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r="1" className="fill"/></svg>,
  tiktok:<svg viewBox="0 0 24 24"><path d="M14 3v11.2a4.4 4.4 0 1 1-3.4-4.3V13a1.5 1.5 0 1 0 .5 1.2V3h2.9c.4 2 1.6 3.3 4 3.8v3c-1.6-.2-2.9-.8-4-1.8"/></svg>,
}

export function SocialIcons(p:Props){
  const links=[['website',p.website],['facebook',p.facebook],['instagram',p.instagram],['tiktok',p.tiktok]] as const
  return <div className="socialIcons">{links.filter(([,url])=>url).map(([k,url])=><a key={k} href={url!} target="_blank" rel="noreferrer" aria-label={k} data-analytics-type="business-social" data-analytics-id={p.businessId||undefined}>{icons[k]}</a>)}</div>
}
