import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  holdingBackQuestion,
  occupationQuestion,
  resultQuestion,
} from '@/content/quiz/questions'
import { saveQuizAnswers } from '@/lib/quizStorage'
import type { OccupationChoiceId, QuizAnswers, QuizChoiceId } from '@/types/quiz'
import { FunnelToolShell } from './FunnelToolShell'
import shellStyles from './FunnelToolShell.module.css'
import styles from './QuizFlow.module.css'

type ChoiceStepKey = 'result' | 'holdingBack' | 'occupation'

type Step =
  | { type: 'name' }
  | { type: 'choice'; key: 'result' | 'holdingBack'; question: typeof resultQuestion | typeof holdingBackQuestion }
  | { type: 'instagram' }
  | { type: 'choice'; key: 'occupation'; question: typeof occupationQuestion }
  | { type: 'contact' }

const steps: Step[] = [
  { type: 'name' },
  { type: 'choice', key: 'result', question: resultQuestion },
  { type: 'choice', key: 'holdingBack', question: holdingBackQuestion },
  { type: 'instagram' },
  { type: 'choice', key: 'occupation', question: occupationQuestion },
  { type: 'contact' },
]

type FormState = {
  name: string
  result: QuizChoiceId | ''
  holdingBack: QuizChoiceId | ''
  instagram: string
  occupation: OccupationChoiceId | ''
  email: string
  phone: string
}

const initialState: FormState = {
  name: '',
  result: '',
  holdingBack: '',
  instagram: '',
  occupation: '',
  email: '',
  phone: '',
}

const CHOICE_ADVANCE_MS = 220

type QuizFlowProps = {
  productLabel?: string
  introTitle?: string
  introSubtitle?: string
}

export function QuizFlow({
  productLabel = 'Training quiz',
  introTitle,
  introSubtitle,
}: QuizFlowProps) {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState('')
  const [stepDirection, setStepDirection] = useState<'forward' | 'back'>('forward')
  const [isAdvancingChoice, setIsAdvancingChoice] = useState(false)

  const step = steps[stepIndex]
  const progress = ((stepIndex + 1) / steps.length) * 100
  const isChoiceStep = step?.type === 'choice'

  const canContinue = useMemo(() => {
    if (!step) return false
    switch (step.type) {
      case 'name':
        return form.name.trim().length >= 2
      case 'instagram':
        return form.instagram.trim().length >= 2
      case 'contact':
        return form.email.includes('@') && form.phone.trim().length >= 7
      default:
        return false
    }
  }, [form, step])

  const submitQuiz = (nextForm: FormState) => {
    const answers: QuizAnswers = {
      name: nextForm.name.trim(),
      result: nextForm.result as QuizChoiceId,
      holdingBack: nextForm.holdingBack as QuizChoiceId,
      instagram: nextForm.instagram.trim(),
      occupation: nextForm.occupation as OccupationChoiceId,
      email: nextForm.email.trim(),
      phone: nextForm.phone.trim(),
    }
    saveQuizAnswers(answers)
    navigate('/training')
  }

  const goNext = () => {
    if (!canContinue) {
      setError('Please complete this step before continuing.')
      return
    }
    setError('')
    if (stepIndex < steps.length - 1) {
      setStepDirection('forward')
      setStepIndex((current) => current + 1)
      return
    }

    submitQuiz(form)
  }

  const handleChoiceSelect = (key: ChoiceStepKey, optionId: QuizChoiceId | OccupationChoiceId) => {
    if (isAdvancingChoice) return

    setIsAdvancingChoice(true)
    setError('')
    setForm((current) => ({ ...current, [key]: optionId } as FormState))
    setStepDirection('forward')

    window.setTimeout(() => {
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
            {stepIndex === steps.length - 1 ? 'See my plan' : 'Continue'}
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
          <label className={styles.srOnly} htmlFor="quiz-name">
            Your name
          </label>
          <input
            id="quiz-name"
            type="text"
            className={styles.textInput}
            placeholder="Your first name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            autoComplete="name"
          />
        </div>
      )}

      {step?.type === 'choice' && (
        <div className={styles.step}>
          <h2 className={styles.prompt}>{step.question.prompt}</h2>
          <fieldset className={styles.fieldset} disabled={isAdvancingChoice}>
            <legend className={styles.srOnly}>{step.question.prompt}</legend>
            {step.question.options.map((option) => (
              <label key={option.id} className={styles.option}>
                <input
                  type="radio"
                  name={step.key}
                  value={option.id}
                  checked={form[step.key as ChoiceStepKey] === option.id}
                  onChange={() => handleChoiceSelect(step.key, option.id)}
                  className={styles.optionInput}
                />
                <span className={styles.optionRadio} aria-hidden="true" />
                <span className={styles.optionLabel}>{option.label}</span>
              </label>
            ))}
          </fieldset>
        </div>
      )}

      {step?.type === 'instagram' && (
        <div className={styles.step}>
          <h2 className={styles.prompt}>What's your Instagram @?</h2>
          <p className={styles.hint}>So we can find you if we have talked before.</p>
          <label className={styles.srOnly} htmlFor="quiz-instagram">
            Instagram handle
          </label>
          <input
            id="quiz-instagram"
            type="text"
            className={styles.textInput}
            placeholder="@yourhandle"
            value={form.instagram}
            onChange={(event) => setForm({ ...form, instagram: event.target.value })}
            autoComplete="username"
            required
          />
        </div>
      )}

      {step?.type === 'contact' && (
        <div className={styles.step}>
          <h2 className={styles.prompt}>Where should we send your training link?</h2>
          <div className={styles.contactFields}>
            <label className={styles.fieldLabel} htmlFor="quiz-email">
              Email
            </label>
            <input
              id="quiz-email"
              type="email"
              className={styles.textInput}
              placeholder="you@email.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              autoComplete="email"
            />
            <label className={styles.fieldLabel} htmlFor="quiz-phone">
              Phone number
            </label>
            <input
              id="quiz-phone"
              type="tel"
              className={styles.textInput}
              placeholder="(555) 555-5555"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              autoComplete="tel"
            />
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
      </div>
    </FunnelToolShell>
  )
}
