import { useEffect, useLayoutEffect, useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { VimeoPlayer } from '@/components/media/VimeoPlayer'
import { warmVimeoPlayer } from '@/components/media/vimeo'
import { ApplyCta } from '@/components/funnel/ApplyCta'
import { ApplyQuizOverlay } from '@/components/funnel/ApplyQuizOverlay'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { useApplyQuizPopup } from '@/hooks/useApplyQuizPopup'
import { scrollToTop } from '@/lib/scrollToTop'
import type { TestimonialVideo } from '@/content/testimonialVideos'
import type { ApplyQuizVariant, VslPageContent } from '@/types/quiz'
import styles from '@/pages/ApplyPage/ApplyPage.module.css'

type VslLandingProps = {
  content: VslPageContent
  quizVariant: ApplyQuizVariant
  quizProductLabel?: string
  autoplayOnLoad?: boolean
  featuredTestimonials?: TestimonialVideo[]
}

export function VslLanding({
  content,
  quizVariant,
  quizProductLabel,
  autoplayOnLoad = true,
  featuredTestimonials,
}: VslLandingProps) {
  const { isQuizOpen, openQuiz, closeQuiz, completeQuiz } = useApplyQuizPopup()
  const [showBelowFold, setShowBelowFold] = useState(false)

  useLayoutEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    warmVimeoPlayer(content.vimeoId, content.vimeoHash)
  }, [content.vimeoId, content.vimeoHash])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShowBelowFold(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!showBelowFold || !featuredTestimonials?.length) return
    featuredTestimonials.forEach((video) => {
      warmVimeoPlayer(video.vimeoId, video.vimeoHash)
    })
  }, [showBelowFold, featuredTestimonials])

  return (
    <PageShell>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.headline}>{content.headline}</h2>
        {content.instructions ? (
          <div className={styles.instructionsCallout} role="note">
            <p className={styles.instructionsTitle}>Before you continue</p>
            <p className={styles.instructionsText}>{content.instructions}</p>
          </div>
        ) : null}
      </section>

      <section className={styles.videoSection}>
        <div className={styles.mainVslBlock}>
          <h3 className={styles.stepLabel}>{content.stepLabel}</h3>
          <VimeoPlayer
            vimeoId={content.vimeoId}
            vimeoHash={content.vimeoHash}
            title={content.vimeoTitle ?? 'Program overview video'}
            className={styles.mainVslVideo}
            autoplayOnLoad={autoplayOnLoad}
          />
        </div>
        <div className={styles.ctaWrapper}>
          <ApplyCta label={content.ctaLabel} onClick={openQuiz} fullWidth />
        </div>
      </section>

      {showBelowFold ? (
        featuredTestimonials && featuredTestimonials.length > 0 ? (
          <section className={styles.testimonialsSection} aria-label="Member testimonials">
            <div className={styles.bannerSection}>
              <TestimonialBanner />
            </div>
            <div className={styles.testimonialsGrid}>
              {featuredTestimonials.map((video) => (
                <VimeoPlayer
                  key={video.id}
                  vimeoId={video.vimeoId}
                  vimeoHash={video.vimeoHash}
                  title={video.title}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.bannerSection} aria-label="Member results">
            <TestimonialBanner />
          </section>
        )
      ) : null}

      <ApplyQuizOverlay
        isOpen={isQuizOpen}
        variant={quizVariant}
        productLabel={quizProductLabel}
        onClose={closeQuiz}
        onComplete={completeQuiz}
      />
    </PageShell>
  )
}
