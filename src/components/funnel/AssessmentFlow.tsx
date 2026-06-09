import { useMemo, useState } from 'react'
import { assessmentQuestions } from '@/content/assessment/questions'
import { calculateAssessmentResult } from '@/content/assessment/scoring'
import { saveAssessmentResult } from '@/lib/assessmentStorage'
import type { AssessmentAnswers, AssessmentChoiceId } from '@/types/assessment'
import { AssessmentResults } from './AssessmentResults'
import { FunnelToolShell } from './FunnelToolShell'
import shellStyles from './FunnelToolShell.module.css'
import styles from './QuizFlow.module.css'

type QuestionId = (typeof assessmentQuestions)[number]['id']

type Step = { type: 'name' } | { type: 'choice'; questionIndex: number }

const steps: Step[] = [
  { type: 'name' },
  ...assessmentQuestions.map((_, questionIndex) => ({
    type: 'choice' as const,
    questionIndex,
  })),
]

type FormState = {
  name: string
} & Partial<Record<QuestionId, AssessmentChoiceId>>

const CHOICE_ADVANCE_MS = 220

const initialState: FormState = { name: '' }

type AssessmentFlowProps = {
  productLabel?: string
  introTitle?: string
  introSubtitle?: string
  onComplete?: () => void
}

export function AssessmentFlow({
  productLabel = 'Fitness assessment',
  introTitle,
  introSubtitle,
  onComplete,
}: AssessmentFlowProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState('')
  const [stepDirection, setStepDirection] = useState<'forward' | 'back'>('forward')
  const [isAdvancingChoice, setIsAdvancingChoice] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof calculateAssessmentResult> | null>(null)

  const step = steps[stepIndex]
  const progress = ((stepIndex + 1) / steps.length) * 100
  const isChoiceStep = step?.type === 'choice'

  const canContinue = useMemo(() => {
    if (!step) return false
    if (step.type === 'name') return form.name.trim().length >= 2
    return false
  }, [form.name, step])

  const finishAssessment = (nextForm: FormState) => {
    const answers = {
      name: nextForm.name.trim(),
      weeklyTrainingDays: nextForm.weeklyTrainingDays!,
      monthlyWorkouts: nextForm.monthlyWorkouts!,
      sleepHours: nextForm.sleepHours!,
      dailyActivity: nextForm.dailyActivity!,
      progressTimeline: nextForm.progressTimeline!,
      proteinHabit: nextForm.proteinHabit!,
      alcoholSocialMeals: nextForm.alcoholSocialMeals!,
      clothesFit: nextForm.clothesFit!,
    } satisfies AssessmentAnswers

    const computed = calculateAssessmentResult(answers)
    saveAssessmentResult(computed)
    setResult(computed)
    onComplete?.()
  }

  const goNext = () => {
    if (!canContinue) {
      setError('Please complete this step before continuing.')
      return
    }
    setError('')
    setStepDirection('forward')
    setStepIndex((current) => current + 1)
  }

  const handleChoiceSelect = (questionId: QuestionId, optionId: AssessmentChoiceId) => {
    if (isAdvancingChoice) return

    setIsAdvancingChoice(true)
    setError('')

    const nextForm = { ...form, [questionId]: optionId } as FormState
    setForm(nextForm)
    setStepDirection('forward')

    window.setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        finishAssessment(nextForm)
        setIsAdvancingChoice(false)
        return
      }
      setStepIndex((current) => current + 1)
      setIsAdvancingChoice(false)
    }, CHOICE_ADVANCE_MS)
  }

  const goBack = () => {
    if (stepIndex === 0) return
    setError('')
    setIsAdvancingChoice(false)
    setStepDirection('back')
    setStepIndex((current) => current - 1)
  }

  if (result) {
    return <AssessmentResults result={result} />
  }

  const currentQuestion = step?.type === 'choice' ? assessmentQuestions[step.questionIndex] : null
  const showIntro = stepIndex === 0 && Boolean(introTitle || introSubtitle)

  const footer =
    stepIndex > 0 || !isChoiceStep ? (
      <div className={`${shellStyles.footerActions} ${isChoiceStep ? shellStyles.footerBackOnly : ''}`}>
        {stepIndex > 0 && (
          <button type="button" className={styles.backButton} onClick={goBack}>
            Back
          </button>
        )}
        {!isChoiceStep && (
          <button type="button" className={styles.nextButton} onClick={goNext}>
            {stepIndex === 0 ? 'Start assessment' : 'Continue'}
          </button>
        )}
      </div>
    ) : undefined

  return (
    <FunnelToolShell
      productLabel={productLabel}
      stepIndex={stepIndex}
      stepTotal={steps.length}
      progress={progress}
      title={showIntro ? introTitle : undefined}
      subtitle={showIntro ? introSubtitle : undefined}
      footer={footer}
    >
      <div
        key={stepIndex}
        className={`${styles.stepPanel} ${
          stepDirection === 'forward' ? styles.stepEnterForward : styles.stepEnterBack
        }`}
      >
        {step?.type === 'name' && (
          <div className={styles.step}>
            <h2 className={styles.prompt}>What should we call you?</h2>
            <p className={styles.hint}>Your results will be personalized to you.</p>
            <label className={styles.srOnly} htmlFor="assessment-name">
              Your name
            </label>
            <input
              id="assessment-name"
              type="text"
              className={styles.textInput}
              placeholder="Your first name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              autoComplete="name"
            />
          </div>
        )}

        {currentQuestion && (
          <div className={styles.step}>
            <h2 className={styles.prompt}>{currentQuestion.prompt}</h2>
            {currentQuestion.hint && <p className={styles.hint}>{currentQuestion.hint}</p>}
            <fieldset className={styles.fieldset} disabled={isAdvancingChoice}>
              <legend className={styles.srOnly}>{currentQuestion.prompt}</legend>
              {currentQuestion.options.map((option) => (
                <label key={option.id} className={styles.option}>
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.id}
                    checked={form[currentQuestion.id] === option.id}
                    onChange={() => handleChoiceSelect(currentQuestion.id, option.id)}
                    className={styles.optionInput}
                  />
                  <span className={styles.optionRadio} aria-hidden="true" />
                  <span className={styles.optionLabel}>{option.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </FunnelToolShell>
  )
}
