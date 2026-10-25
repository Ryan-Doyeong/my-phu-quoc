// lib/coverPhotos.ts
import coverPhotosData from '@/data/cover-photos.json'

export interface CoverPhotoEntry {
  slug: string
  name?: string
  image_url: string
  original_image_url?: string
  source_page_url: string
  found_at: string
  content_type?: string
  file_size_bytes?: number
  status?: string
  revocation_reason?: string
}

const coverMap = new Map<string, CoverPhotoEntry>()

if (Array.isArray(coverPhotosData)) {
  for (const item of coverPhotosData) {
    if (item && item.slug && item.status !== 'revoked') {
      coverMap.set(item.slug, item as CoverPhotoEntry)
    }
  }
}

export function getCoverPhoto(slug: string | null | undefined): CoverPhotoEntry | null {
  if (!slug) return null
  return coverMap.get(slug) || null
}

export function getAllCoverPhotos(): CoverPhotoEntry[] {
  return Array.from(coverMap.values())
}
