const BOOKING_EVENT_KEYWORDS = [
  'appointment_booked',
  'appointmentbooked',
  'appointment_scheduled',
  'appointmentscheduled',
  'booking_success',
  'bookingsuccess',
  'calendar_event_scheduled',
  'event_scheduled',
  'eventscheduled',
  'form_submitted',
  'formsubmitted',
] as const

const BOOKING_HOST_KEYWORDS = ['roaslabs.cloud', 'leadconnectorhq.com', 'gohighlevel.com'] as const

function isSupportedOrigin(origin: string): boolean {
  try {
    const parsed = new URL(origin)
    return BOOKING_HOST_KEYWORDS.some((host) => parsed.hostname.includes(host))
  } catch {
    return false
  }
}

function stringifyMessageData(data: unknown): string {
  if (typeof data === 'string') return data
  try {
    return JSON.stringify(data)
  } catch {
    return ''
  }
}

function containsBookingSuccessSignal(serialized: string): boolean {
  const normalized = serialized.toLowerCase().replace(/[^a-z0-9]+/g, '_')
  return BOOKING_EVENT_KEYWORDS.some((keyword) => normalized.includes(keyword))
}

export function isBookingWidgetSubmissionEvent(event: MessageEvent): boolean {
  if (!isSupportedOrigin(event.origin)) return false
  const serialized = stringifyMessageData(event.data)
  if (!serialized) return false
  return containsBookingSuccessSignal(serialized)
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
