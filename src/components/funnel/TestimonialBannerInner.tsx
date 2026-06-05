import { testimonialPhotos } from '@/content/testimonialPhotos'
import styles from './TestimonialBanner.module.css'

export function TestimonialBannerInner() {
  const slides = [...testimonialPhotos, ...testimonialPhotos]

  return (
    <div className={styles.banner} aria-label="Member before and after results">
      <div className={styles.track}>
        {slides.map((photo, index) => (
          <figure key={`${photo.id}-${index}`} className={styles.slide}>
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.image}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
