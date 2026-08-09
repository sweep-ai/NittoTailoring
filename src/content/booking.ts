export const bookingContent = {
  title: 'Book your 1 on 1 discovery call',
  subtitle: 'Pick a time that works for you. We will send confirmation details by email.',
  bookingWidgetUrl: 'https://links.roaslabs.cloud/widget/booking/Do2YvhDrd9sFFNK3mjUM',
  /**
   * In GHL calendar confirmation settings: use Default (or a custom message inside the iframe).
   * Do not redirect the parent window — the app listens for `msgsndr-booking-complete`
   * and routes to /thank-you itself.
   */
} as const
