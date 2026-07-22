/** Prefetch lazy route chunks so quiz → next page navigations feel instant. */

export function prefetchTrainingPage(): void {
  void import('@/pages/TrainingPage/TrainingPage')
}

export function prefetchBookingPage(): void {
  void import('@/pages/BookingPage/BookingPage')
}

export function prefetchThankYouPage(): void {
  void import('@/pages/ThankYouPage/ThankYouPage')
}
