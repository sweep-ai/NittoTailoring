function normalizeApiBaseUrl(url: string): string {
  return url.trim().replace(/\/$/, '')
}

const SWEEP_PRODUCTION_API = 'https://api.sweepai.site'
const SAME_ORIGIN_API_PROXY = '/sweep-api'

const proxyTarget = import.meta.env.VITE_API_PROXY_TARGET?.trim()
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

function resolveApiBaseUrl(): string {
  const configured = configuredApiBaseUrl ?? 'http://localhost:8000'

  // Relative path — same-origin proxy (Vite in dev, Vercel rewrite in prod).
  if (configured.startsWith('/')) {
    return normalizeApiBaseUrl(configured)
  }

  const normalized = normalizeApiBaseUrl(configured)

  // Dev: route through Vite proxy when a remote target is configured.
  if (import.meta.env.DEV && proxyTarget) {
    return SAME_ORIGIN_API_PROXY
  }

  // Prod: the Sweep API blocks browser CORS from custom funnel domains.
  // vercel.json rewrites /sweep-api/* → api.sweepai.site/* (same pattern as local dev).
  if (!import.meta.env.DEV && normalized === SWEEP_PRODUCTION_API) {
    return SAME_ORIGIN_API_PROXY
  }

  return normalized
}

const apiBaseUrl = resolveApiBaseUrl()

export const env = {
  siteName: import.meta.env.VITE_SITE_NAME ?? 'Executive Athlete Method',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  apiBaseUrl,
  apiProxyTarget: proxyTarget ? normalizeApiBaseUrl(proxyTarget) : undefined,
  funnelId: import.meta.env.VITE_FUNNEL_ID ?? 'ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c',
  funnelTrackDebug: import.meta.env.VITE_FUNNEL_TRACK_DEBUG === 'true',
  funnelTrackingEnabled: import.meta.env.VITE_FUNNEL_TRACKING_ENABLED !== 'false',
} as const

if (import.meta.env.DEV && env.funnelTrackDebug && env.apiProxyTarget) {
  console.info(
    `[Sweep] Dev proxy active: ${env.apiBaseUrl} → ${env.apiProxyTarget}`,
  )
}
