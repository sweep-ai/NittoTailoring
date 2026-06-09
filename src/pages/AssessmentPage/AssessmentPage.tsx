import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { AssessmentFlow } from '@/components/funnel/AssessmentFlow'
import { assessmentLanding } from '@/content/assessment/landing'
import { isAssessmentFromThankYou, markAssessmentFromThankYou } from '@/lib/assessmentReferrer'
import styles from './AssessmentPage.module.css'

export function AssessmentPage() {
  const [searchParams] = useSearchParams()
  const [showIntro, setShowIntro] = useState(true)

  const fromThankYou = useMemo(
    () => searchParams.get('from') === 'thank-you' || isAssessmentFromThankYou(),
    [searchParams],
  )

  useEffect(() => {
    if (searchParams.get('from') === 'thank-you') {
      markAssessmentFromThankYou()
    }
  }, [searchParams])

  return (
    <div className={styles.page}>
      <PageShell headerLabel={assessmentLanding.headerLabel}>
        <AssessmentFlow
          productLabel="Fitness assessment"
          introTitle={showIntro ? assessmentLanding.title : undefined}
          introSubtitle={showIntro ? assessmentLanding.subtitle : undefined}
          returnToThankYou={fromThankYou}
          onComplete={() => setShowIntro(false)}
        />
      </PageShell>
    </div>
  )
}
