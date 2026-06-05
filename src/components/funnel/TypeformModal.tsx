import { lazy, Suspense, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { env } from '@/config/env'
import { Modal } from '@/components/ui/Modal'
import styles from './TypeformModal.module.css'

const TypeformWidget = lazy(() =>
  import('@typeform/embed-react').then((mod) => ({ default: mod.Widget })),
)

type TypeformModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function TypeformModal({ isOpen, onClose }: TypeformModalProps) {
  const navigate = useNavigate()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = useCallback(() => {
    setHasSubmitted(true)
    navigate('/thank-you')
  }, [navigate])

  const handleEndingButtonClick = useCallback(() => {
    navigate('/thank-you')
  }, [navigate])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="1 on 1 Coaching Application" size="large">
      <div className={styles.widgetContainer}>
        {isOpen && !hasSubmitted && (
          <Suspense fallback={<div className={styles.loading}>Loading application form…</div>}>
            <TypeformWidget
              id={env.typeformId}
              style={{ width: '100%', height: '600px' }}
              hidden={{ footer: '1' }}
              hideHeaders
              opacity={100}
              onSubmit={handleSubmit}
              onEndingButtonClick={handleEndingButtonClick}
            />
          </Suspense>
        )}
        {hasSubmitted && (
          <div className={styles.submitted}>
            <p>Thank you! Redirecting to your next step…</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
