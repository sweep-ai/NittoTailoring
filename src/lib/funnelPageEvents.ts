const FUNNEL_PAGE_EVENTS: Record<string, string> = {
  '/': 'quiz_page_view',
  '/applynow': 'apply_page_view',
  '/training': 'training_page_view',
  '/booking': 'booking_page_view',
  '/thank-you': 'thank_you_page_view',
}

export function getFunnelPageEvent(pathname: string): string | undefined {
  return FUNNEL_PAGE_EVENTS[pathname]
}
