import { categoryDescriptions, categoryLabels } from '@/content/assessment/questions'
import { getGapTier } from '@/content/assessment/scoring'
import type { AssessmentAnswers, AssessmentCategory, AssessmentResult } from '@/types/assessment'

const trainingDaysLabel: Record<AssessmentAnswers['weeklyTrainingDays'], string> = {
  A: '0 days',
  B: '1 day',
  C: '2 days',
  D: '3 days',
  E: '4 or more days',
}

const sleepLabel: Record<AssessmentAnswers['sleepHours'], string> = {
  A: 'under 5 hours',
  B: '5 to 6 hours',
  C: '6 to 7 hours',
  D: '7 to 8 hours',
  E: '8 or more hours',
}

const progressLabel: Record<AssessmentAnswers['progressTimeline'], string> = {
  A: 'within the last month',
  B: '1 to 3 months ago',
  C: '3 to 6 months ago',
  D: '6 to 12 months ago',
  E: 'over a year ago',
}

const tierHeadlines: Record<ReturnType<typeof getGapTier>, string> = {
  critical: 'Your numbers show a large gap between effort and results',
  elevated: 'Your numbers show clear gaps in how your routine is performing',
  moderate: 'Your numbers show friction that will keep slowing progress',
  emerging: 'Your numbers show early gaps worth fixing before they compound',
}

const tierSummaries: Record<ReturnType<typeof getGapTier>, string> = {
  critical:
    'These are measurable signals, not motivation issues. Bring this score to your call so you can talk about what is actually happening, not what you wish were true.',
  elevated:
    'You can answer these questions precisely, which means the fix can be precise too. That is the point of this assessment.',
  moderate:
    'Some habits are in place, but the data points to weak spots that will cap results if nothing changes.',
  emerging:
    'You are not starting from zero, but the numbers show where progress starts to stall.',
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || 'there'
}

function formatCategoryList(categories: AssessmentCategory[]): string {
  return categories.map((category) => categoryLabels[category].toLowerCase()).join(' and ')
}

export type AssessmentResultsCopy = {
  headline: string
  summary: string
  personalLine: string
  callPrepTitle: string
  callPrepItems: string[]
  topCategoryLabels: string[]
}

export function buildAssessmentResultsCopy(result: AssessmentResult): AssessmentResultsCopy {
  const { answers, topCategories, overallGap } = result
  const name = firstName(answers.name)
  const tier = getGapTier(overallGap)

  return {
    headline: tierHeadlines[tier],
    summary: tierSummaries[tier],
    personalLine: `${name}, you train ${trainingDaysLabel[answers.weeklyTrainingDays]} per week, sleep ${sleepLabel[answers.sleepHours]} on average, and last saw progress ${progressLabel[answers.progressTimeline]}. Those inputs explain this score.`,
    callPrepTitle: 'Bring these facts to your call',
    callPrepItems: [
      `Your biggest gaps: ${formatCategoryList(topCategories)}.`,
      categoryDescriptions[topCategories[0]!],
      topCategories[1] ? categoryDescriptions[topCategories[1]!] : '',
      'Do not justify the numbers on the call. Use them to define what needs to change first.',
    ].filter(Boolean),
    topCategoryLabels: topCategories.map((category) => categoryLabels[category]),
  }
}
