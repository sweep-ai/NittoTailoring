import { Link } from 'react-router-dom'
import { env } from '@/config/env'
import { footerLinks } from '@/content/legal/footerLinks'
import styles from './FunnelFooter.module.css'

export function FunnelFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Legal and compliance">
          {footerLinks.map((link, index) => (
            <span key={link.to} className={styles.linkItem}>
              {index > 0 && <span className={styles.separator} aria-hidden="true">·</span>}
              <Link to={link.to} className={styles.link}>
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
        <p className={styles.copyright}>
          © {year} {env.siteName}. All rights reserved.
        </p>
        {env.contactEmail && (
          <p className={styles.contact}>
            <a href={`mailto:${env.contactEmail}`} className={styles.link}>
              {env.contactEmail}
            </a>
          </p>
        )}
      </div>
    </footer>
  )
}
