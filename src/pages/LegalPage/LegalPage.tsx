import { Link, Navigate, useLocation } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { legalDocuments, type LegalDocumentSlug } from '@/content/legal/documents'
import styles from './LegalPage.module.css'

const pathToSlug: Record<string, LegalDocumentSlug> = {
  '/privacy-policy': 'privacy-policy',
  '/terms': 'terms',
  '/disclaimer': 'disclaimer',
}

export function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathToSlug[pathname]

  if (!slug) {
    return <Navigate to="/applynow" replace />
  }

  const document = legalDocuments[slug]

  return (
    <PageShell wide>
      <article className={styles.article}>
        <Link to="/applynow" className={styles.backLink}>
          ← Back
        </Link>
        <header className={styles.header}>
          <h1 className={styles.title}>{document.title}</h1>
          <p className={styles.updated}>Last updated: {document.lastUpdated}</p>
        </header>
        {document.intro && <p className={styles.intro}>{document.intro}</p>}
        <div className={styles.sections}>
          {document.sections.map((section) => (
            <section key={section.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className={styles.list}>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  )
}
