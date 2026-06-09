import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { env } from '@/config/env'
import { loadTypeformEmbedScript, mountTypeformLiveEmbed } from '@/lib/typeformLive'
import styles from './TypeformLiveOverlay.module.css'

const SUBMIT_HANDLER = 'arsTypeformOnSubmit'
const ENDING_HANDLER = 'arsTypeformOnEnding'

type TypeformLiveOverlayProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function TypeformLiveOverlay({ isOpen, onClose, onComplete }: TypeformLiveOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadError, setLoadError] = useState(false)

  const handleComplete = useCallback(() => {
    onComplete()
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
    if (!isOpen) return

    let cancelled = false
    setLoadError(false)

    loadTypeformEmbedScript()
      .then(() => {
        if (cancelled || !containerRef.current) return
        mountTypeformLiveEmbed(containerRef.current, env.typeformLiveId, {
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
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Coaching application">
      <button type="button" className={styles.backdrop} aria-label="Close application" onClick={onClose} />
      <div className={styles.panel}>
        <button type="button" className={styles.closeButton} aria-label="Close application" onClick={onClose}>
          ×
        </button>
        {loadError ? (
          <p className={styles.error}>Unable to load the application form. Please try again.</p>
        ) : (
          <div ref={containerRef} className={styles.embed} />
        )}
      </div>
    </div>,
    document.body,
  )
}
