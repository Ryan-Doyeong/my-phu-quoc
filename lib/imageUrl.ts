/**
 * Keep image bytes off the app server whenever possible and request a size
 * appropriate to the UI surface. /api/unsplash resolves to the Unsplash CDN.
 */
export function imageUrl(src: string | null | undefined, width = 900, quality = 72) {
  if (!src) return ''
  
  if (src.endsWith('-full.webp')) {
    if (width <= 480) {
      return src.replace('-full.webp', '-thumb.webp');
    } else if (width <= 960) {
      return src.replace('-full.webp', '-card.webp');
    } else {
      return src; // keep -full.webp
    }
  }

  // Replaced stock routing
  // legacy check removed

  if (src.startsWith('/api/unsplash/')) {
    // Generate a simple hash from the src string
    let hash = 0;
    for (let i = 0; i < src.length; i++) {
      hash = src.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const options = ['closing', 'hobby', 'cafe', 'wellness', 'workout', 'brunch', 'bakery'];
    const selected = options[absHash % options.length];
    return `/features/${selected}_640.webp`;
  }
  
  if (src.startsWith('https://images.unsplash.com/')) {
    try {
      const u = new URL(src)
      u.searchParams.set('auto', 'format')
      u.searchParams.set('fit', 'crop')
      u.searchParams.set('w', String(Math.max(320, Math.min(2200, Math.round(width)))))
      u.searchParams.set('q', String(Math.max(55, Math.min(88, Math.round(quality)))))
      return u.toString()
    } catch {
      return src
    }
  }
  return src
}
