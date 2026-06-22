import { useEffect, useRef, useState } from 'react'
import { getAudience } from '@/config/audience'
import { getTestimonialPhotos } from '@/content/testimonialPhotos'
import { preloadImages } from '@/lib/preloadImages'
import { TestimonialBannerInner } from './TestimonialBannerInner'
import styles from './TestimonialBanner.module.css'

export function TestimonialBanner() {
  const photos = getTestimonialPhotos(getAudience())
  const photoUrls = photos.map((photo) => photo.src)
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)

  useEffect(() => {
    if (photoUrls.length === 0) return

    let cancelled = false
    setImagesReady(false)
    preloadImages(photoUrls).then(() => {
      if (!cancelled) setImagesReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [photoUrls])

  useEffect(() => {
    const node = rootRef.current
    if (!node || photoUrls.length === 0) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldMount(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [photoUrls.length])

  if (photos.length === 0) return null

  const showBanner = shouldMount && imagesReady

  return (
    <div ref={rootRef} className={styles.root}>
      {showBanner ? (
        <TestimonialBannerInner photos={photos} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  )
}
