export type QuizChoiceId = 'A' | 'B' | 'C' | 'D' | 'E'

export type OccupationChoiceId = 'A' | 'B' | 'C' | 'D'

export type QuizAnswers = {
  name: string
  result: QuizChoiceId
  holdingBack: QuizChoiceId
  instagram: string
  occupation: OccupationChoiceId
  email: string
  phone: string
}

export type VslPageContent = {
  eyebrow: string
  headline: string
  stepLabel: string
  instructions?: string
  applicationInstructions?: string
  ctaLabel: string
  vimeoId: string
  vimeoHash: string
}
