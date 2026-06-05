import { useCallback, useEffect, useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { VimeoPlayer } from '@/components/media/VimeoPlayer'
import { warmVimeoPlayer } from '@/components/media/vimeo'
import { ApplyCta } from '@/components/funnel/ApplyCta'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { TypeformModal } from '@/components/funnel/TypeformModal'
import type { TestimonialVideo } from '@/content/testimonialVideos'
import type { VslPageContent } from '@/types/quiz'
import styles from '@/pages/ApplyPage/ApplyPage.module.css'

type VslLandingProps = {
  content: VslPageContent
  autoplayOnLoad?: boolean
  featuredTestimonials?: TestimonialVideo[]
}

export function VslLanding({
  content,
  autoplayOnLoad = true,
  featuredTestimonials,
}: VslLandingProps) {
  const [isTypeformOpen, setIsTypeformOpen] = useState(false)

  useEffect(() => {
    warmVimeoPlayer(content.vimeoId, content.vimeoHash)
  }, [content.vimeoId, content.vimeoHash])

  useEffect(() => {
    featuredTestimonials?.forEach((video) => {
      warmVimeoPlayer(video.vimeoId, video.vimeoHash)
    })
  }, [featuredTestimonials])

  const openTypeform = useCallback(() => {
    setIsTypeformOpen(true)
  }, [])

  const closeTypeform = useCallback(() => {
    setIsTypeformOpen(false)
  }, [])

  return (
    <PageShell>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.headline}>{content.headline}</h2>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.mainVslBlock}>
          <h3 className={styles.stepLabel}>{content.stepLabel}</h3>
          <VimeoPlayer
            vimeoId={content.vimeoId}
            vimeoHash={content.vimeoHash}
            title="Program overview video"
            className={styles.mainVslVideo}
            autoplayOnLoad={autoplayOnLoad}
          />
        </div>
        <div className={styles.ctaWrapper}>
          <ApplyCta label={content.ctaLabel} onClick={openTypeform} fullWidth />
        </div>
      </section>

      {featuredTestimonials ? (
        <section className={styles.testimonialsSection} aria-label="Member testimonials">
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
      )}

      <TypeformModal isOpen={isTypeformOpen} onClose={closeTypeform} />
    </PageShell>
  )
}
