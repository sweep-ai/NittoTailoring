import { useCallback, useEffect, useRef, useState } from 'react'
import { loadTypeformEmbedScript, mountTypeformLiveEmbed } from '@/lib/typeformLive'
import styles from './TypeformLiveEmbed.module.css'

const SUBMIT_HANDLER = 'arsTypeformOnSubmit'
const ENDING_HANDLER = 'arsTypeformOnEnding'

type TypeformLiveEmbedProps = {
  liveId: string
  onComplete?: () => void
  className?: string
}

export function TypeformLiveEmbed({ liveId, onComplete, className }: TypeformLiveEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadError, setLoadError] = useState(false)

  const handleComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    window.arsTypeformOnSubmit = handleComplete
    window.arsTypeformOnEnding = handleComplete

    return () => {
      delete window.arsTypeformOnSubmit
      delete window.arsTypeformOnEnding
    }
  }, [handleComplete])

  useEffect(() => {
    let cancelled = false
    setLoadError(false)

    loadTypeformEmbedScript()
      .then(() => {
        if (cancelled || !containerRef.current) return
        mountTypeformLiveEmbed(containerRef.current, liveId, {
          onSubmit: SUBMIT_HANDLER,
          onEndingButtonClick: ENDING_HANDLER,
        })
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })

    return () => {
      cancelled = true
    }
  }, [liveId])

  if (loadError) {
    return (
      <p className={styles.error}>Unable to load the application form. Please refresh and try again.</p>
    )
  }

  return <div ref={containerRef} className={`${styles.embed} ${className ?? ''}`.trim()} />
}
