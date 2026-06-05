import { env } from '@/config/env'
import styles from './FunnelHeader.module.css'

type FunnelHeaderProps = {
  label?: string
}

export function FunnelHeader({ label }: FunnelHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.brand}>{label ?? env.siteName}</h1>
      </div>
    </header>
  )
}
