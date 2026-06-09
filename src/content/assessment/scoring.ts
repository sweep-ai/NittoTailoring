import { assessmentQuestions } from '@/content/assessment/questions'
import type {
  AssessmentAnswers,
  AssessmentCategory,
  AssessmentChoiceId,
  AssessmentResult,
  CategoryScores,
} from '@/types/assessment'

const CATEGORY_MAX: Record<AssessmentCategory, number> = {
  consistency: 22,
  execution: 28,
  nutrition: 24,
  recovery: 8,
  structure: 14,
}

const emptyScores = (): CategoryScores => ({
  consistency: 0,
  execution: 0,
  nutrition: 0,
  recovery: 0,
  structure: 0,
})

function addScores(target: CategoryScores, addition: Partial<Record<AssessmentCategory, number>>) {
  for (const [key, value] of Object.entries(addition) as [AssessmentCategory, number][]) {
    target[key] += value
  }
}

type AssessmentQuestionId = (typeof assessmentQuestions)[number]['id']

function scoreForAnswer(questionId: AssessmentQuestionId, choiceId: AssessmentChoiceId) {
  const question = assessmentQuestions.find((item) => item.id === questionId)
  const option = question?.options.find((item) => item.id === choiceId)
  return option?.scores ?? {}
}

export function calculateAssessmentResult(answers: AssessmentAnswers): AssessmentResult {
  const categories = emptyScores()

  for (const question of assessmentQuestions) {
    const choiceId = answers[question.id]
    addScores(categories, scoreForAnswer(question.id, choiceId))
  }

  const categoryPercents = Object.fromEntries(
    (Object.keys(CATEGORY_MAX) as AssessmentCategory[]).map((category) => [
      category,
      Math.min(100, Math.round((categories[category] / CATEGORY_MAX[category]) * 100)),
    ]),
  ) as Record<AssessmentCategory, number>

  const overallGap = Math.round(
    Object.values(categoryPercents).reduce((sum, value) => sum + value, 0) /
      Object.values(categoryPercents).length,
  )

  const topCategories = (Object.entries(categoryPercents) as [AssessmentCategory, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([category]) => category)

  return {
    overallGap,
    categories,
    categoryPercents,
    topCategories,
    answers,
  }
}

export function getGapTier(overallGap: number): 'critical' | 'elevated' | 'moderate' | 'emerging' {
  if (overallGap >= 75) return 'critical'
  if (overallGap >= 55) return 'elevated'
  if (overallGap >= 35) return 'moderate'
  return 'emerging'
}
