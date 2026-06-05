import { useEffect, useRef, useState } from 'react'
import {
  buildVimeoEmbedUrl,
  buildVimeoThumbnailUrl,
  fetchVimeoThumbnail,
  warmVimeoPlayer,
} from './vimeo'
import styles from './VimeoPlayer.module.css'

type VimeoPlayerProps = {
  vimeoId: string
  title: string
  vimeoHash?: string
  autoplay?: boolean
  /** Mount iframe and play immediately on page load (main VSLs) */
  autoplayOnLoad?: boolean
  /** When false, parent controls when iframe mounts (e.g. accordion expand) */
  active?: boolean
  className?: string
}

export function VimeoPlayer({
  vimeoId,
  title,
  vimeoHash,
  autoplay = true,
  autoplayOnLoad = false,
  active = true,
  className = '',
}: VimeoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplayOnLoad && active)
  const [iframeReady, setIframeReady] = useState(false)
  const [thumbnail, setThumbnail] = useState<string>(() => buildVimeoThumbnailUrl(vimeoId))
  const warmedRef = useRef(false)

  useEffect(() => {
    if (warmedRef.current) return
    warmedRef.current = true
    warmVimeoPlayer(vimeoId, vimeoHash)
  }, [vimeoId, vimeoHash])

  useEffect(() => {
    let cancelled = false

    fetchVimeoThumbnail(vimeoId).then((url) => {
      if (!cancelled && url) {
        setThumbnail(url)
      }
    })

    return () => {
      cancelled = true
    }
  }, [vimeoId])

  useEffect(() => {
    if (autoplayOnLoad && active) {
      setIsPlaying(true)
      setIframeReady(false)
    }
  }, [autoplayOnLoad, active, vimeoId])

  const showIframe = isPlaying && active
  const showPosterWhileLoading = autoplayOnLoad && showIframe && !iframeReady

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {(showPosterWhileLoading || !showIframe) && (
        <div className={styles.posterLayer} aria-hidden={showIframe && iframeReady}>
          <img
            src={thumbnail}
            alt=""
            className={styles.poster}
            loading={autoplayOnLoad ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={autoplayOnLoad ? 'high' : 'auto'}
          />
          {!autoplayOnLoad && !showIframe && (
            <button
              type="button"
              className={styles.facadeButton}
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${title}`}
            >
              <span className={styles.playButton} aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48" fill="none">
                  <path
                    d="M66.52 7.74a8 8 0 0 0-5.63-5.66C55.83 1 34 1 34 1S12.17 1 7.11 2.08a8 8 0 0 0-5.63 5.66A83.27 83.27 0 0 0 1 24a83.27 83.27 0 0 0 1.48 16.26 8 8 0 0 0 5.63 5.66C12.17 47 34 47 34 47s21.83 0 26.89-1.08a8 8 0 0 0 5.63-5.66A83.27 83.27 0 0 0 67 24a83.27 83.27 0 0 0-1.48-16.26Z"
                    fill="#212121"
                    fillOpacity="0.8"
                  />
                  <path d="M45 24 27 14v20l18-10Z" fill="#fff" />
                </svg>
              </span>
            </button>
          )}
        </div>
      )}

      {showIframe && (
        <iframe
          src={buildVimeoEmbedUrl(vimeoId, autoplay, vimeoHash)}
          title={title}
          className={`${styles.iframe} ${iframeReady ? styles.iframeReady : ''}`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setIframeReady(true)}
        />
      )}
    </div>
  )
}
