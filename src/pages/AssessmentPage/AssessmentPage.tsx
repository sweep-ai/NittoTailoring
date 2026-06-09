import { useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { AssessmentFlow } from '@/components/funnel/AssessmentFlow'
import { assessmentLanding } from '@/content/assessment/landing'
import styles from './AssessmentPage.module.css'

export function AssessmentPage() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className={styles.page}>
      <PageShell headerLabel={assessmentLanding.headerLabel}>
        <AssessmentFlow
          productLabel="Fitness assessment"
          introTitle={showIntro ? assessmentLanding.title : undefined}
          introSubtitle={showIntro ? assessmentLanding.subtitle : undefined}
          onComplete={() => setShowIntro(false)}
        />
      </PageShell>
    </div>
  )
}
