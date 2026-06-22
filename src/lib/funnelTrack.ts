import { env } from '@/config/env'

const VISITOR_ID_KEY = 'visitor_id'
const SESSION_ID_KEY = 'session_id'
const UTM_KEY = 'sweep_utm'
const REFERRER_KEY = 'sweep_referrer'
const FORM_ID_ROOT_QUIZ = 'root-quiz'

type UtmParams = Record<string, string>

type TrackEventOptions = {
  idempotencyKey?: string
  /** Survives SPA route changes / page unload (use for events fired right before navigate). */
  keepalive?: boolean
}

export type LeadPayload = {
  email?: string
  name?: string
  first_name?: string
  last_name?: string
  phone?: string
  instagram?: string
  notes?: string
  source?: string
  quiz_answers?: Record<string, unknown>
  opt_in_data?: Record<string, unknown>
  funnel_step_reached?: string
}

export type SubmitLeadResult = {
  ok: boolean
  clientId?: string
  created?: boolean
  error?: string
}

function createId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}

export function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (!visitorId) {
    visitorId = createId('visitor')
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }
  return visitorId
}

export function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY)
  if (!sessionId) {
    sessionId = createId('session')
    sessionStorage.setItem(SESSION_ID_KEY, sessionId)
  }
  return sessionId
}

export function buildFormSubmitIdempotencyKey(formId: string, sessionId = getSessionId()): string {
  return `form_submit_${sessionId}_${formId}`
}

function readUtmFromUrl(): UtmParams | undefined {
  const params = new URLSearchParams(window.location.search)
  const utm: UtmParams = {}

  for (const key of ['source', 'medium', 'campaign', 'term', 'content'] as const) {
    const value = params.get(`utm_${key}`)
    if (value) utm[key] = value
  }

  return Object.keys(utm).length > 0 ? utm : undefined
}

function getUtmParams(): UtmParams | undefined {
  const fromUrl = readUtmFromUrl()
  if (fromUrl) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl))
    return fromUrl
  }

  const stored = sessionStorage.getItem(UTM_KEY)
  if (!stored) return undefined

  try {
    return JSON.parse(stored) as UtmParams
  } catch {
    return undefined
  }
}

function getReferrer(): string | undefined {
  const current = document.referrer || undefined
  if (current) {
    sessionStorage.setItem(REFERRER_KEY, current)
    return current
  }

  return sessionStorage.getItem(REFERRER_KEY) || undefined
}

function buildMetadata(metadata?: Record<string, unknown>): Record<string, unknown> {
  return {
    ...metadata,
    page_url: window.location.href,
    page_title: document.title,
    utm: getUtmParams(),
    referrer: getReferrer(),
  }
}

function isTrackingConfigured(): boolean {
  return Boolean(env.funnelTrackingEnabled && env.funnelId && env.apiBaseUrl)
}

export function trackEvent(
  eventName: string,
  metadata?: Record<string, unknown>,
  options?: TrackEventOptions,
): Promise<void> {
  if (!env.funnelTrackingEnabled) {
    if (env.funnelTrackDebug) {
      console.log('Sweep funnel tracking disabled (VITE_FUNNEL_TRACKING_ENABLED=false):', eventName)
    }
    return Promise.resolve()
  }

  if (!env.funnelId || !env.apiBaseUrl) {
    if (env.funnelTrackDebug) {
      console.warn('Sweep funnel tracking skipped — set VITE_FUNNEL_ID and VITE_API_BASE_URL in .env')
    }
    return Promise.resolve()
  }

  const payload: Record<string, unknown> = {
    funnel_id: env.funnelId,
    event_name: eventName,
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    metadata: buildMetadata(metadata),
    event_timestamp: new Date().toISOString(),
  }

  if (options?.idempotencyKey) {
    payload.idempotency_key = options.idempotencyKey
  }

  if (env.funnelTrackDebug) {
    console.log('Sweep funnel tracking →', `${env.apiBaseUrl}/funnels/events`, eventName, payload)
  }

  return fetch(`${env.apiBaseUrl}/funnels/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    keepalive: options?.keepalive ?? false,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorBody = env.funnelTrackDebug ? await response.text() : ''
        console.error(
          'Sweep funnel tracking failed:',
          response.status,
          response.statusText,
          errorBody || undefined,
        )
        return
      }

      if (env.funnelTrackDebug) {
        const data = (await response.json()) as { event_id?: string; status?: string }
        console.log('Sweep funnel tracking accepted:', data)
      }
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      console.error('Sweep funnel tracking failed:', message)

      if (
        env.funnelTrackDebug &&
        import.meta.env.DEV &&
        !env.apiProxyTarget &&
        env.apiBaseUrl.startsWith('http')
      ) {
        console.warn(
          'Tip: direct cross-origin requests to the API are blocked by CORS in the browser. ' +
            'Set VITE_API_PROXY_TARGET=https://api.sweepai.site in .env and restart npm run dev.',
        )
      }
    })
}

export async function submitLead(fields: LeadPayload): Promise<SubmitLeadResult> {
  if (!isTrackingConfigured()) {
    if (env.funnelTrackDebug) {
      console.warn('Sweep lead capture skipped — set VITE_FUNNEL_ID and VITE_API_BASE_URL in .env')
    }
    return { ok: false, error: 'Lead capture not configured' }
  }

  const payload = {
    funnel_id: env.funnelId,
    ...fields,
  }

  if (env.funnelTrackDebug) {
    console.log('Sweep lead capture →', `${env.apiBaseUrl}/funnels/leads`, payload)
  }

  try {
    const response = await fetch(`${env.apiBaseUrl}/funnels/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })

    const data = (await response.json().catch(() => ({}))) as {
      client_id?: string
      created?: boolean
      detail?: string
      message?: string
    }

    if (!response.ok) {
      const error = data.detail ?? data.message ?? response.statusText
      console.error('Sweep lead capture failed:', response.status, error)
      return { ok: false, error }
    }

    if (env.funnelTrackDebug) {
      console.log('Sweep lead capture accepted:', data)
    }

    return {
      ok: true,
      clientId: data.client_id,
      created: data.created,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Sweep lead capture failed:', message)
    return { ok: false, error: message }
  }
}

type QuizFormSubmitInput = {
  email: string
  name: string
  phone: string
  instagram: string
  formId?: string
  quizAnswers: Record<string, unknown>
}

/** Track form_submit + create/update Client Board lead (see FUNNEL_INTEGRATION_GUIDE-1.md). */
export async function submitQuizLead(input: QuizFormSubmitInput): Promise<void> {
  const formId = input.formId ?? FORM_ID_ROOT_QUIZ
  const sessionId = getSessionId()
  const idempotencyKey = buildFormSubmitIdempotencyKey(formId, sessionId)

  await Promise.race([
    Promise.all([
      trackEvent(
        'form_submit',
        {
          form_id: formId,
          form_fields: ['name', 'result', 'holdingBack', 'instagram', 'occupation', 'email', 'phone'],
          ...input.quizAnswers,
        },
        { keepalive: true, idempotencyKey },
      ),
      submitLead({
        email: input.email,
        name: input.name,
        phone: input.phone,
        instagram: input.instagram,
        source: 'quiz',
        funnel_step_reached: 'form_submit',
        quiz_answers: input.quizAnswers,
      }),
    ]),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1200)
    }),
  ])
}
