import { useEffect, useRef, useState } from 'react'
import { getAudience } from '@/config/audience'
import { getTestimonialPhotos } from '@/content/testimonialPhotos'
import { preloadImages } from '@/lib/preloadImages'
import { TestimonialBannerInner } from './TestimonialBannerInner'
import styles from './TestimonialBanner.module.css'

export function TestimonialBanner() {
  const photos = getTestimonialPhotos(getAudience())
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    if (photos.length === 0) return

    let cancelled = false
    const urls = photos.map((photo) => photo.src)
    preloadImages(urls).then(() => {
      if (!cancelled) setImagesReady(true)
    })
    return () => {
      cancelled = true
    }
    // photos is a stable module-level array per audience
  }, [photos])

  useEffect(() => {
    const node = rootRef.current
    if (!node || photos.length === 0) return

    let hasMounted = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          if (!hasMounted) {
            hasMounted = true
            setShouldMount(true)
          }
          setIsInView(true)
        } else {
          setIsInView(false)
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [photos.length])

  if (photos.length === 0) return null

  const showBanner = shouldMount && imagesReady

  return (
    <div ref={rootRef} className={styles.root} data-in-view={isInView ? 'true' : 'false'}>
      {showBanner ? (
        <TestimonialBannerInner photos={photos} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  )
}
