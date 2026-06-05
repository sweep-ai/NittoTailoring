import { testimonialPhotos, testimonialSlideSize } from '@/content/testimonialPhotos'
import styles from './TestimonialBanner.module.css'

export function TestimonialBannerInner() {
  const slides = [...testimonialPhotos, ...testimonialPhotos]
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
