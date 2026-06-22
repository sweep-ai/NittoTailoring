function normalizeApiBaseUrl(url: string): string {
  return url.trim().replace(/\/$/, '')
}

const proxyTarget = import.meta.env.VITE_API_PROXY_TARGET?.trim()
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

// In dev, route through the Vite proxy to avoid CORS when hitting remote APIs.
const apiBaseUrl =
  import.meta.env.DEV && proxyTarget
    ? '/sweep-api'
    : normalizeApiBaseUrl(configuredApiBaseUrl ?? 'http://localhost:8000')

export const env = {
  typeformLiveId: import.meta.env.VITE_TYPEFORM_LIVE_ID ?? '01KTNBNYDMJSH7PKS373QG2AJF',
  siteName: import.meta.env.VITE_SITE_NAME ?? 'Alpha Reset System',
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
