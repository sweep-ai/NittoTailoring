import type { ReactNode } from 'react'
import { FunnelFooter } from './FunnelFooter'
import { FunnelHeader } from './FunnelHeader'
import styles from './PageShell.module.css'

type PageShellProps = {
  children: ReactNode
  wide?: boolean
  headerLabel?: string
}

export function PageShell({ children, wide = false, headerLabel }: PageShellProps) {
  return (
    <div className={styles.shell}>
      <FunnelHeader label={headerLabel} />
      <main className={`${styles.main} ${wide ? styles.wide : ''}`}>{children}</main>
      <FunnelFooter />
    </div>
  )
}
