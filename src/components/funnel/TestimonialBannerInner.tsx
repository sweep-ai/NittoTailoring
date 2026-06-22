import type { TestimonialPhoto } from '@/content/testimonialPhotos'
import { testimonialSlideSize } from '@/content/testimonialPhotos'
import styles from './TestimonialBanner.module.css'

type TestimonialBannerInnerProps = {
  photos: TestimonialPhoto[]
}

export function TestimonialBannerInner({ photos }: TestimonialBannerInnerProps) {
  const slides = [...photos, ...photos]
  const { width, height } = testimonialSlideSize

  return (
    <div className={styles.banner} aria-label="Member before and after results">
      <div className={styles.track}>
        {slides.map((photo, index) => (
          <figure key={`${photo.id}-${index}`} className={styles.slide}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.image}
              width={width}
              height={height}
              loading="eager"
              decoding="async"
              fetchPriority={index < 4 ? 'high' : 'auto'}
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
