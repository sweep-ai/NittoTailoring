import { useEffect, useRef, useState } from 'react'
import { testimonialPhotos } from '@/content/testimonialPhotos'
import { preloadImages } from '@/lib/preloadImages'
import { TestimonialBannerInner } from './TestimonialBannerInner'
import styles from './TestimonialBanner.module.css'

const photoUrls = testimonialPhotos.map((photo) => photo.src)

export function TestimonialBanner() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    preloadImages(photoUrls).then(() => {
      if (!cancelled) setImagesReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

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
  }, [])

  const showBanner = shouldMount && imagesReady

  return (
    <div ref={rootRef} className={styles.root}>
      {showBanner ? (
        <TestimonialBannerInner />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  )
}
