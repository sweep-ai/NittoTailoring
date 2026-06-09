export type AssessmentCategory =
  | 'consistency'
  | 'execution'
  | 'nutrition'
  | 'recovery'
  | 'structure'

export type AssessmentChoiceId = 'A' | 'B' | 'C' | 'D' | 'E'

export type AssessmentAnswers = {
  name: string
  weeklyTrainingDays: AssessmentChoiceId
  monthlyWorkouts: AssessmentChoiceId
  sleepHours: AssessmentChoiceId
  dailyActivity: AssessmentChoiceId
  progressTimeline: AssessmentChoiceId
  proteinHabit: AssessmentChoiceId
  alcoholSocialMeals: AssessmentChoiceId
  clothesFit: AssessmentChoiceId
}

export type CategoryScores = Record<AssessmentCategory, number>

export type AssessmentResult = {
  overallGap: number
  categories: CategoryScores
  categoryPercents: Record<AssessmentCategory, number>
  topCategories: AssessmentCategory[]
  answers: AssessmentAnswers
}
