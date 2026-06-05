export function buildVimeoEmbedUrl(
  vimeoId: string,
  autoplay = true,
  vimeoHash?: string,
  muted = false,
): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0',
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
  })
  if (vimeoHash) {
    params.set('h', vimeoHash)
  }
  return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`
}

export function buildVimeoPageUrl(vimeoId: string): string {
  return `https://vimeo.com/${vimeoId}`
}

export function buildVimeoThumbnailUrl(vimeoId: string): string {
  return `https://vumbnail.com/${vimeoId}.jpg`
}

const WARMED = new Set<string>()

export function warmVimeoPlayer(vimeoId: string, vimeoHash?: string) {
  const key = `${vimeoId}:${vimeoHash ?? ''}`
  if (WARMED.has(key)) return
  WARMED.add(key)

  const origins = ['https://f.vimeocdn.com', 'https://i.vimeocdn.com', 'https://vumbnail.com']
  for (const href of origins) {
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      document.head.appendChild(link)
    }
  }

  const thumb = document.createElement('link')
  thumb.rel = 'preload'
  thumb.as = 'image'
  thumb.href = buildVimeoThumbnailUrl(vimeoId)
  document.head.appendChild(thumb)

  const prefetch = document.createElement('link')
  prefetch.rel = 'prefetch'
  prefetch.href = buildVimeoEmbedUrl(vimeoId, true, vimeoHash)
  document.head.appendChild(prefetch)
}

export async function fetchVimeoThumbnail(vimeoId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(buildVimeoPageUrl(vimeoId))}`,
    )
    if (!response.ok) return null
    const data = (await response.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}
