import { PageShell } from '@/components/layout/PageShell'
import { VimeoPlayer } from '@/components/media/VimeoPlayer'
import { warmVimeoPlayer } from '@/components/media/vimeo'
import { FaqAccordion } from '@/components/funnel/FaqAccordion'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { thankYouContent } from '@/content/thankYou'
import { faqVideos } from '@/content/faqVideos'
import { testimonialVideos } from '@/content/testimonialVideos'
import { useEffect } from 'react'
import styles from './ThankYouPage.module.css'

export function ThankYouPage() {
  useEffect(() => {
    warmVimeoPlayer(thankYouContent.mainVimeoId)
  }, [])
  return (
    <PageShell wide>
      <section className={styles.hero}>
        <h2 className={styles.congrats}>{thankYouContent.congratulations}</h2>
        <p className={styles.subheadline}>{thankYouContent.subheadline}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.mainVslBlock}>
          <h3 className={styles.stepLabel}>{thankYouContent.step1Label}</h3>
          <VimeoPlayer
            vimeoId={thankYouContent.mainVimeoId}
            title="Alpha Reset System thank you video"
            className={styles.mainVslVideo}
            autoplayOnLoad
          />
        </div>
        <div className={styles.expectChecklist}>
          <h4 className={styles.expectTitle}>{thankYouContent.whatToExpectTitle}</h4>
          <ol className={styles.expectList}>
            {thankYouContent.whatToExpectItems.map((item) => (
              <li key={item} className={styles.expectItem}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.stepLabel}>{thankYouContent.step2Label}</h3>
        <FaqAccordion items={faqVideos} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.stepLabel}>{thankYouContent.step3Label}</h3>
        <TestimonialBanner />
        <div className={styles.testimonialsGrid}>
          {testimonialVideos.map((video) => (
            <VimeoPlayer
              key={video.id}
              vimeoId={video.vimeoId}
              vimeoHash={video.vimeoHash}
              title={video.title}
            />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
