import { PageShell } from '@/components/layout/PageShell'
import { ClientLogoBanner } from '@/components/funnel/ClientLogoBanner'
import { QuizFlow } from '@/components/funnel/QuizFlow'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { quizLanding } from '@/content/quiz/landing'
import styles from './QuizPage.module.css'

export function QuizPage() {
  return (
    <div className={styles.quizPage}>
      <PageShell header={<ClientLogoBanner />}>
        <QuizFlow
          productLabel="Generate Your Free Resource"
          introTitle={quizLanding.title}
          introSubtitle={quizLanding.subtitle}
        />
        <section className={styles.bannerSection} aria-label="Member results">
          <TestimonialBanner />
        </section>
      </PageShell>
    </div>
  )
}
