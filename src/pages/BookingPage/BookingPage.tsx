import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { CalendlyInline } from '@/components/media/CalendlyInline'
import { bookingContent } from '@/content/booking'
import { prefetchThankYouPage } from '@/lib/prefetchRoutes'
import { scrollToTop } from '@/lib/scrollToTop'
import styles from './BookingPage.module.css'

const calendlyEmbedUrl = `${bookingContent.calendlyUrl}?hide_gdpr_banner=1&hide_landing_page_details=1`

export function BookingPage() {
  const navigate = useNavigate()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    prefetchThankYouPage()
    scrollToTop()
  }, [])

  const handleEventScheduled = useCallback(() => {
    setIsRedirecting(true)
    scrollToTop()
    // Let the redirecting state paint before swapping routes.
    requestAnimationFrame(() => {
      navigate('/thank-you', { replace: true })
    })
  }, [navigate])

  return (
    <PageShell wide>
      <section className={styles.hero}>
        <h1 className={styles.title}>{bookingContent.title}</h1>
        <p className={styles.subtitle}>{bookingContent.subtitle}</p>
      </section>

      <section className={styles.embedSection} aria-label="Booking calendar">
        {isRedirecting ? (
          <p className={styles.redirecting} role="status">
            Booking confirmed. Taking you to your next steps…
          </p>
        ) : (
          <CalendlyInline
            url={calendlyEmbedUrl}
            title={bookingContent.title}
            onEventScheduled={handleEventScheduled}
          />
        )}
      </section>

      {!isRedirecting && (
        <section className={styles.bannerSection} aria-label="Member results">
          <TestimonialBanner />
        </section>
      )}
    </PageShell>
  )
}
