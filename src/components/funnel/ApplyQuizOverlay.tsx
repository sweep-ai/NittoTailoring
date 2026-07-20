import { useEffect } from 'react'
import type { ApplyQuizVariant } from '@/types/quiz'
import { ApplyQuizFlow } from './ApplyQuizFlow'
import styles from './ApplyQuizOverlay.module.css'

type ApplyQuizOverlayProps = {
  isOpen: boolean
  variant: ApplyQuizVariant
  productLabel?: string
  onClose: () => void
  onComplete: () => void
}

export function ApplyQuizOverlay({
  isOpen,
  variant,
  productLabel,
  onClose,
  onComplete,
}: ApplyQuizOverlayProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Coaching application">
      <button type="button" className={styles.backdrop} aria-label="Close application" onClick={onClose} />
      <div className={styles.panel}>
        <button type="button" className={styles.closeButton} aria-label="Close application" onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <ApplyQuizFlow variant={variant} productLabel={productLabel} onComplete={onComplete} />
        </div>
      </div>
    </div>
  )
}
