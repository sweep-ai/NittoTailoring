import type { ReactNode } from 'react'
import styles from './FunnelToolShell.module.css'

type FunnelToolShellProps = {
  productLabel: string
  stepIndex: number
  stepTotal: number
  progress: number
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function FunnelToolShell({
  productLabel,
  stepIndex,
  stepTotal,
  progress,
  title,
  subtitle,
  children,
  footer,
}: FunnelToolShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        <header className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.productLabel}>{productLabel}</span>
            <span className={styles.stepCount}>
              Step {stepIndex + 1} of {stepTotal}
            </span>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        </header>

        {(title || subtitle) && (
          <div className={styles.context}>
            {title && <h1 className={styles.contextTitle}>{title}</h1>}
            {subtitle && <p className={styles.contextSubtitle}>{subtitle}</p>}
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  )
}
