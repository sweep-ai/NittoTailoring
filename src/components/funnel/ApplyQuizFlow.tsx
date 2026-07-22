import { useEffect, useMemo, useState } from 'react'
import {
  commitmentQuestion,
  pastAttemptQuestion,
  workSituationQuestion,
} from '@/content/quiz/applicationQuestions'
import {
  holdingBackQuestion,
  occupationQuestion,
  resultQuestion,
} from '@/content/quiz/questions'
import { submitApplyLead } from '@/lib/funnelTrack'
import { prefetchBookingPage } from '@/lib/prefetchRoutes'
import { loadQuizAnswers, saveQuizAnswers } from '@/lib/quizStorage'
import type {
  ApplicationAnswers,
  ApplicationChoiceId,
  ApplyQuizVariant,
  CommitmentChoiceId,
  OccupationChoiceId,
  QuizAnswers,
  QuizChoiceId,
} from '@/types/quiz'
import { FunnelToolShell } from './FunnelToolShell'
import shellStyles from './FunnelToolShell.module.css'
import styles from './QuizFlow.module.css'

type RootChoiceKey = 'result' | 'holdingBack' | 'occupation'
type AppChoiceKey = 'pastAttempt' | 'workSituation' | 'commitment'

type Step =
  | { type: 'name' }
  | { type: 'choice'; key: 'result'; question: typeof resultQuestion }
  | { type: 'choice'; key: 'holdingBack'; question: typeof holdingBackQuestion }
  | { type: 'instagram' }
  | { type: 'choice'; key: 'occupation'; question: typeof occupationQuestion }
  | { type: 'contact' }
  | { type: 'choice'; key: 'pastAttempt'; question: typeof pastAttemptQuestion }
  | { type: 'choice'; key: 'workSituation'; question: typeof workSituationQuestion }
  | { type: 'choice'; key: 'commitment'; question: typeof commitmentQuestion }

const applicationSteps: Step[] = [
  { type: 'choice', key: 'pastAttempt', question: pastAttemptQuestion },
  { type: 'choice', key: 'workSituation', question: workSituationQuestion },
  { type: 'choice', key: 'commitment', question: commitmentQuestion },
]

const applynowSteps: Step[] = [
  { type: 'name' },
  { type: 'choice', key: 'result', question: resultQuestion },
  { type: 'choice', key: 'holdingBack', question: holdingBackQuestion },
  { type: 'instagram' },
  { type: 'choice', key: 'occupation', question: occupationQuestion },
  { type: 'contact' },
  ...applicationSteps,
]

const trainingSteps: Step[] = applicationSteps

type FormState = {
  name: string
  result: QuizChoiceId | ''
  holdingBack: QuizChoiceId | ''
  instagram: string
  occupation: OccupationChoiceId | ''
  email: string
  phone: string
  pastAttempt: ApplicationChoiceId | ''
  workSituation: ApplicationChoiceId | ''
  commitment: CommitmentChoiceId | ''
}

const emptyForm: FormState = {
  name: '',
  result: '',
  holdingBack: '',
  instagram: '',
  occupation: '',
  email: '',
  phone: '',
  pastAttempt: '',
  workSituation: '',
  commitment: '',
}

function formFromSession(): FormState {
  const saved = loadQuizAnswers()
  if (!saved) return emptyForm
  return {
    ...emptyForm,
    name: saved.name,
    result: saved.result,
    holdingBack: saved.holdingBack,
    instagram: saved.instagram,
    occupation: saved.occupation,
    email: saved.email,
    phone: saved.phone,
  }
}

const CHOICE_ADVANCE_MS = 220

type ApplyQuizFlowProps = {
  variant: ApplyQuizVariant
  productLabel?: string
  onComplete: () => void
}

function toSnakeCaseAnswers(input: {
  result?: QuizChoiceId | ''
  holdingBack?: QuizChoiceId | ''
  occupation?: OccupationChoiceId | ''
  pastAttempt: ApplicationChoiceId
  workSituation: ApplicationChoiceId
  commitment: CommitmentChoiceId
}): Record<string, string> {
  const answers: Record<string, string> = {
    past_attempt: input.pastAttempt,
    work_situation: input.workSituation,
    commitment: input.commitment,
  }
  if (input.result) answers.result = input.result
  if (input.holdingBack) answers.holding_back = input.holdingBack
  if (input.occupation) answers.occupation = input.occupation
  return answers
}

export function ApplyQuizFlow({
  variant,
  productLabel = 'Application',
  onComplete,
}: ApplyQuizFlowProps) {
  const steps = variant === 'training' ? trainingSteps : applynowSteps
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<FormState>(() =>
    variant === 'training' ? formFromSession() : emptyForm,
  )
  const [error, setError] = useState('')
  const [stepDirection, setStepDirection] = useState<'forward' | 'back'>('forward')
  const [isAdvancingChoice, setIsAdvancingChoice] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const step = steps[stepIndex]
  const progress = ((stepIndex + 1) / steps.length) * 100
  const isChoiceStep = step?.type === 'choice'
  const formId = variant === 'training' ? 'training-apply-quiz' : 'applynow-quiz'
  const nearEnd = stepIndex >= Math.max(0, steps.length - 2)

  useEffect(() => {
    if (nearEnd) prefetchBookingPage()
  }, [nearEnd])

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

  const submitApplication = (nextForm: FormState) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const application: ApplicationAnswers = {
      pastAttempt: nextForm.pastAttempt as ApplicationChoiceId,
      workSituation: nextForm.workSituation as ApplicationChoiceId,
      commitment: nextForm.commitment as CommitmentChoiceId,
    }

    const contact = {
      email: nextForm.email.trim(),
      name: nextForm.name.trim(),
      phone: nextForm.phone.trim(),
      instagram: nextForm.instagram.trim(),
    }

    if (variant === 'applynow') {
      const answers: QuizAnswers = {
        ...contact,
        result: nextForm.result as QuizChoiceId,
        holdingBack: nextForm.holdingBack as QuizChoiceId,
        occupation: nextForm.occupation as OccupationChoiceId,
      }
      saveQuizAnswers(answers)
    }

    submitApplyLead({
      ...contact,
      formId,
      quizAnswers: toSnakeCaseAnswers({
        result: nextForm.result,
        holdingBack: nextForm.holdingBack,
        occupation: nextForm.occupation,
        ...application,
      }),
    })

    onComplete()
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
    void submitApplication(form)
  }

  const handleChoiceSelect = (
    key: RootChoiceKey | AppChoiceKey,
    optionId: QuizChoiceId | OccupationChoiceId | ApplicationChoiceId | CommitmentChoiceId,
  ) => {
    if (isAdvancingChoice || isSubmitting) return

    setIsAdvancingChoice(true)
    setError('')
    const nextForm = { ...form, [key]: optionId } as FormState
    setForm(nextForm)
    setStepDirection('forward')

    window.setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        setIsAdvancingChoice(false)
        void submitApplication(nextForm)
        return
      }
      setStepIndex((current) => current + 1)
      setIsAdvancingChoice(false)
    }, CHOICE_ADVANCE_MS)
  }

  const goBack = () => {
    if (stepIndex === 0 || isSubmitting) return
    setError('')
    setIsAdvancingChoice(false)
    setStepDirection('back')
    setStepIndex((current) => current - 1)
  }

  const footer =
    stepIndex > 0 || !isChoiceStep ? (
      <div className={`${shellStyles.footerActions} ${isChoiceStep ? shellStyles.footerBackOnly : ''}`}>
        {stepIndex > 0 && (
          <button type="button" className={styles.backButton} onClick={goBack} disabled={isSubmitting}>
            Back
          </button>
        )}
        {!isChoiceStep && (
          <button type="button" className={styles.nextButton} onClick={goNext} disabled={isSubmitting}>
            {stepIndex === steps.length - 1 ? 'Submit application' : 'Continue'}
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
            <label className={styles.srOnly} htmlFor="apply-quiz-name">
              Your name
            </label>
            <input
              id="apply-quiz-name"
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
            <fieldset className={styles.fieldset} disabled={isAdvancingChoice || isSubmitting}>
              <legend className={styles.srOnly}>{step.question.prompt}</legend>
              {step.question.options.map((option) => (
                <label key={option.id} className={styles.option}>
                  <input
                    type="radio"
                    name={step.key}
                    value={option.id}
                    checked={form[step.key] === option.id}
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
            <label className={styles.srOnly} htmlFor="apply-quiz-instagram">
              Instagram handle
            </label>
            <input
              id="apply-quiz-instagram"
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
            <h2 className={styles.prompt}>Where should we send your details?</h2>
            <div className={styles.contactFields}>
              <label className={styles.fieldLabel} htmlFor="apply-quiz-email">
                Email
              </label>
              <input
                id="apply-quiz-email"
                type="email"
                className={styles.textInput}
                placeholder="you@email.com"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                autoComplete="email"
              />
              <label className={styles.fieldLabel} htmlFor="apply-quiz-phone">
                Phone number
              </label>
              <input
                id="apply-quiz-phone"
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
