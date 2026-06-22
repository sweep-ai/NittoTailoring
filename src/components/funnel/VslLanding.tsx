import { useEffect } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { VimeoPlayer } from '@/components/media/VimeoPlayer'
import { warmVimeoPlayer } from '@/components/media/vimeo'
import { ApplyCta } from '@/components/funnel/ApplyCta'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { TypeformLiveEmbed } from '@/components/funnel/TypeformLiveEmbed'
import { TypeformLiveOverlay } from '@/components/funnel/TypeformLiveOverlay'
import { useTypeformPopup } from '@/hooks/useTypeformPopup'
import { env } from '@/config/env'
import { warmTypeformLiveEmbed } from '@/lib/typeformLive'
import type { TestimonialVideo } from '@/content/testimonialVideos'
import type { VslPageContent } from '@/types/quiz'
import styles from '@/pages/ApplyPage/ApplyPage.module.css'

type VslLandingProps = {
  content: VslPageContent
  autoplayOnLoad?: boolean
  featuredTestimonials?: TestimonialVideo[]
  typeformLiveId?: string
  typeformInline?: boolean
  typeformStepLabel?: string
}

export function VslLanding({
  content,
  autoplayOnLoad = true,
  featuredTestimonials,
  typeformLiveId,
  typeformInline = false,
  typeformStepLabel,
}: VslLandingProps) {
  const { isTypeformOpen, openTypeform, closeTypeform, completeTypeform } = useTypeformPopup()
  const resolvedTypeformLiveId = typeformLiveId ?? env.typeformLiveId

  useEffect(() => {
    warmTypeformLiveEmbed()
  }, [])

  useEffect(() => {
    warmVimeoPlayer(content.vimeoId, content.vimeoHash)
  }, [content.vimeoId, content.vimeoHash])

  useEffect(() => {
    featuredTestimonials?.forEach((video) => {
      warmVimeoPlayer(video.vimeoId, video.vimeoHash)
    })
  }, [featuredTestimonials])

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
        {typeformInline ? (
          <section className={styles.typeformSection} aria-label="Application form">
            {typeformStepLabel ? <h3 className={styles.stepLabel}>{typeformStepLabel}</h3> : null}
            <TypeformLiveEmbed liveId={resolvedTypeformLiveId} onComplete={completeTypeform} />
          </section>
        ) : (
          <div className={styles.ctaWrapper}>
            <ApplyCta label={content.ctaLabel} onClick={openTypeform} fullWidth />
          </div>
        )}
      </section>

      {featuredTestimonials && featuredTestimonials.length > 0 ? (
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
      )}

      <TypeformLiveOverlay
        isOpen={!typeformInline && isTypeformOpen}
        liveId={resolvedTypeformLiveId}
        onClose={closeTypeform}
        onComplete={completeTypeform}
      />
    </PageShell>
  )
}
