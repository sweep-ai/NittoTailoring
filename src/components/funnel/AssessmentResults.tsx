import { Link } from 'react-router-dom'
import { assessmentLanding } from '@/content/assessment/landing'
import { buildAssessmentResultsCopy } from '@/content/assessment/buildResultsCopy'
import { categoryDescriptions, categoryLabels } from '@/content/assessment/questions'
import { getGapTier } from '@/content/assessment/scoring'
import { clearAssessmentFromThankYou } from '@/lib/assessmentReferrer'
import type { AssessmentCategory, AssessmentResult } from '@/types/assessment'
import styles from './AssessmentResults.module.css'

const categoryOrder: AssessmentCategory[] = [
  'consistency',
  'execution',
  'nutrition',
  'recovery',
  'structure',
]

type AssessmentResultsProps = {
  result: AssessmentResult
  returnToThankYou?: boolean
}

export function AssessmentResults({ result, returnToThankYou = false }: AssessmentResultsProps) {
  const copy = buildAssessmentResultsCopy(result)
  const tier = getGapTier(result.overallGap)

  return (
    <div className={styles.results}>
      <div className={styles.instructionsCallout} role="note">
        <p className={styles.instructionsTitle}>{assessmentLanding.beforeYouContinue.title}</p>
        <p className={styles.instructionsText}>{assessmentLanding.beforeYouContinue.text}</p>
      </div>

      <header className={styles.header}>
        <div className={styles.scoreRow}>
          <div className={styles.scoreBlock}>
            <p className={styles.scoreLabel}>Gap score</p>
            <p className={styles.scoreValue}>{result.overallGap}</p>
          </div>
          <p className={styles.scoreCaption}>
            {tier === 'critical' || tier === 'elevated'
              ? 'Higher score means more friction between effort and results.'
              : 'Address these gaps before busy season compounds them.'}
          </p>
        </div>
        <h2 className={styles.headline}>{copy.headline}</h2>
        <p className={styles.personalLine}>{copy.personalLine}</p>
        <p className={styles.summary}>{copy.summary}</p>
      </header>

      <section className={styles.breakdown} aria-label="Score breakdown">
        <h3 className={styles.sectionTitle}>Where the gaps show up</h3>
        <ul className={styles.categoryList}>
          {categoryOrder.map((category) => {
            const percent = result.categoryPercents[category]
            const isTop = result.topCategories.includes(category)
            return (
              <li key={category} className={styles.categoryItem}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryName}>
                    {categoryLabels[category]}
                    {isTop && <span className={styles.primaryTag}>Primary gap</span>}
                  </span>
                  <span className={styles.categoryPercent}>{percent}%</span>
                </div>
                <div className={styles.categoryTrack} aria-hidden="true">
                  <div className={styles.categoryBar} style={{ width: `${percent}%` }} />
                </div>
                <p className={styles.categoryDescription}>{categoryDescriptions[category]}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.callPrep}>
        <h3 className={styles.sectionTitle}>{copy.callPrepTitle}</h3>
        <ul className={styles.prepList}>
          {copy.callPrepItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className={styles.actions}>
        {returnToThankYou ? (
          <>
            <Link
              to="/thank-you"
              className={styles.primaryCta}
              onClick={() => clearAssessmentFromThankYou()}
            >
              {assessmentLanding.returnToThankYou.ctaLabel}
            </Link>
            <p className={styles.ctaHint}>{assessmentLanding.returnToThankYou.hint}</p>
          </>
        ) : (
          <>
            <Link to="/booking" className={styles.primaryCta}>
              Book your discovery call
            </Link>
            <p className={styles.ctaHint}>
              Bring this score with you. The call works best when you already know where you are stuck.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
