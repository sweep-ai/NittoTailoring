/** Real GHL / msgsndr booking-complete signal (array form). */
const GHL_BOOKING_COMPLETE = 'msgsndr-booking-complete'

const BOOKING_EVENT_KEYWORDS = [
  GHL_BOOKING_COMPLETE,
  'msgsndr_booking_complete',
  'appointment_booked',
  'appointmentbooked',
  'appointment_scheduled',
  'appointmentscheduled',
  'booking_complete',
  'bookingcomplete',
  'booking_success',
  'bookingsuccess',
  'calendar_event_scheduled',
  'event_scheduled',
  'eventscheduled',
] as const

const BOOKING_HOST_KEYWORDS = [
  'roaslabs.cloud',
  'leadconnectorhq.com',
  'gohighlevel.com',
  'msgsndr.com',
] as const

function isSupportedOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname.toLowerCase()
    return BOOKING_HOST_KEYWORDS.some((host) => hostname === host || hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_')
}

function extractEventName(data: unknown): string | null {
  if (typeof data === 'string') return data

  if (Array.isArray(data) && typeof data[0] === 'string') {
    return data[0]
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>
    for (const key of ['event', 'type', 'name', 'action', 'message'] as const) {
      const value = record[key]
      if (typeof value === 'string') return value
    }
  }

  return null
}

function stringifyMessageData(data: unknown): string {
  if (typeof data === 'string') return data
  try {
    return JSON.stringify(data)
  } catch {
    return ''
  }
}

function containsBookingSuccessSignal(data: unknown): boolean {
  const eventName = extractEventName(data)
  if (eventName) {
    const normalizedEvent = normalizeToken(eventName)
    if (
      normalizedEvent === normalizeToken(GHL_BOOKING_COMPLETE) ||
      BOOKING_EVENT_KEYWORDS.some((keyword) => normalizedEvent.includes(normalizeToken(keyword)))
    ) {
      return true
    }
  }

  const serialized = normalizeToken(stringifyMessageData(data))
  if (!serialized) return false
  return BOOKING_EVENT_KEYWORDS.some((keyword) => serialized.includes(normalizeToken(keyword)))
}

export function isBookingWidgetSubmissionEvent(event: MessageEvent): boolean {
  if (!isSupportedOrigin(event.origin)) return false
  return containsBookingSuccessSignal(event.data)
}

export function listenForBookingWidgetSubmission(onSubmit: () => void): () => void {
  let handled = false

  const handleMessage = (event: MessageEvent) => {
    if (handled || !isBookingWidgetSubmissionEvent(event)) return
    handled = true
    onSubmit()
  }

  window.addEventListener('message', handleMessage)
  return () => window.removeEventListener('message', handleMessage)
}
