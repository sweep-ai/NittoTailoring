import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import styles from './TestimonialBanner.module.css'

const TestimonialBannerInner = lazy(() =>
  import('./TestimonialBannerInner').then((mod) => ({ default: mod.TestimonialBannerInner })),
)

export function TestimonialBanner() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={styles.root}>
      {shouldLoad ? (
        <Suspense fallback={<div className={styles.placeholder} aria-hidden="true" />}>
          <TestimonialBannerInner />
        </Suspense>
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  )
}
