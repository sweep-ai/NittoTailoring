import { useCallback, useState } from 'react'
import type { FaqVideo } from '@/content/faqVideos'
import { VimeoPlayer } from '@/components/media/VimeoPlayer'
import styles from './FaqAccordion.module.css'

type FaqAccordionProps = {
  items: FaqVideo[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  return (
    <div className={styles.accordion}>
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div key={item.id} className={styles.item}>
            <button
              type="button"
              className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              id={`faq-trigger-${item.id}`}
            >
              <span className={styles.triggerText}>{item.title}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
              hidden={!isOpen}
            >
              {isOpen && (
                <VimeoPlayer
                  vimeoId={item.vimeoId}
                  title={item.title}
                  active={isOpen}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
