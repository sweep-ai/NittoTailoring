export type CalendlyScheduledPayload = {
  event?: {
    uri?: string
  }
  invitee?: {
    uri?: string
    email?: string
    name?: string
  }
}

export type CalendlyMessageData = {
  event?: string
  payload?: CalendlyScheduledPayload
}

const CALENDLY_ORIGIN = 'https://calendly.com'
export const CALENDLY_EVENT_SCHEDULED = 'calendly.event_scheduled'

export function isCalendlyMessageEvent(event: MessageEvent): event is MessageEvent<CalendlyMessageData> {
  if (event.origin !== CALENDLY_ORIGIN) return false
  const data = event.data
  if (!data || typeof data !== 'object') return false
  if (typeof data.event !== 'string') return false
  return data.event.startsWith('calendly.')
}

export function isCalendlyEventScheduled(event: MessageEvent): event is MessageEvent<CalendlyMessageData> {
  return isCalendlyMessageEvent(event) && event.data.event === CALENDLY_EVENT_SCHEDULED
}

export function appendCalendlyEmbedParams(url: string): string {
  const parsed = new URL(url)
  parsed.searchParams.set('embed_domain', window.location.host)
  parsed.searchParams.set('embed_type', 'Inline')
  if (!parsed.searchParams.has('embed')) {
    parsed.searchParams.set('embed', 'true')
  }
  return parsed.toString()
}

export function listenForCalendlyEventScheduled(
  onScheduled: (payload: CalendlyScheduledPayload | undefined) => void,
): () => void {
  let handled = false

  const handleMessage = (event: MessageEvent) => {
    if (!isCalendlyEventScheduled(event) || handled) return
    handled = true
    onScheduled(event.data.payload)
  }

  window.addEventListener('message', handleMessage)
  return () => window.removeEventListener('message', handleMessage)
}
