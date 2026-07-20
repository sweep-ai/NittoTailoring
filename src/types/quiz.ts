export type QuizChoiceId = 'A' | 'B' | 'C' | 'D' | 'E'

export type OccupationChoiceId = 'A' | 'B' | 'C' | 'D'

export type ApplicationChoiceId = 'A' | 'B' | 'C' | 'D'

export type CommitmentChoiceId = 'A' | 'B'

export type QuizAnswers = {
  name: string
  result: QuizChoiceId
  holdingBack: QuizChoiceId
  instagram: string
  occupation: OccupationChoiceId
  email: string
  phone: string
}

/** Extra qualification answers collected on /training and /applynow application quizzes. */
export type ApplicationAnswers = {
  pastAttempt: ApplicationChoiceId
  workSituation: ApplicationChoiceId
  commitment: CommitmentChoiceId
}

export type ApplyQuizVariant = 'training' | 'applynow'

export type VslPageContent = {
  eyebrow: string
  headline: string
  stepLabel: string
  instructions?: string
  applicationInstructions?: string
  ctaLabel: string
  vimeoId: string
  vimeoHash?: string
  vimeoTitle?: string
}
