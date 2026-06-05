import { PageShell } from '@/components/layout/PageShell'
import { QuizFlow } from '@/components/funnel/QuizFlow'
import { TestimonialBanner } from '@/components/funnel/TestimonialBanner'
import { quizLanding } from '@/content/quiz/landing'
import styles from './QuizPage.module.css'

export function QuizPage() {
  return (
    <div className={styles.quizPage}>
      <PageShell headerLabel={quizLanding.headerLabel}>
        <header className={styles.intro}>
          <h1 className={styles.title}>{quizLanding.title}</h1>
          <p className={styles.subtitle}>{quizLanding.subtitle}</p>
        </header>
        <QuizFlow />
        <section className={styles.bannerSection} aria-label="Member results">
          <TestimonialBanner />
        </section>
      </PageShell>
    </div>
  )
}
