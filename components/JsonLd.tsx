/** Renders one JSON-LD script tag. `<` is escaped so the payload can never close the script element. */
export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
