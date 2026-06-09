import type { AssessmentCategory } from '@/types/assessment'

export type ScoredOption = {
  id: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
  scores: Partial<Record<AssessmentCategory, number>>
}

export type AssessmentQuestion = {
  id: keyof Omit<import('@/types/assessment').AssessmentAnswers, 'name'>
  prompt: string
  hint?: string
  options: ScoredOption[]
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'weeklyTrainingDays',
    prompt: 'How many days per week do you train right now?',
    options: [
      { id: 'A', label: '0 days', scores: { consistency: 8, execution: 6 } },
      { id: 'B', label: '1 day', scores: { consistency: 6, execution: 5 } },
      { id: 'C', label: '2 days', scores: { consistency: 4, execution: 3 } },
      { id: 'D', label: '3 days', scores: { consistency: 2, execution: 1 } },
      { id: 'E', label: '4 or more days', scores: {} },
    ],
  },
  {
    id: 'monthlyWorkouts',
    prompt: 'About how many workouts did you complete in the last 30 days?',
    options: [
      { id: 'A', label: '0 to 3', scores: { consistency: 7, execution: 6 } },
      { id: 'B', label: '4 to 8', scores: { consistency: 5, execution: 4 } },
      { id: 'C', label: '9 to 12', scores: { consistency: 3, execution: 2 } },
      { id: 'D', label: '13 to 16', scores: { consistency: 1 } },
      { id: 'E', label: '17 or more', scores: {} },
    ],
  },
  {
    id: 'sleepHours',
    prompt: 'How many hours of sleep do you average per night?',
    options: [
      { id: 'A', label: 'Less than 5 hours', scores: { recovery: 8, execution: 2 } },
      { id: 'B', label: '5 to 6 hours', scores: { recovery: 6, execution: 1 } },
      { id: 'C', label: '6 to 7 hours', scores: { recovery: 3 } },
      { id: 'D', label: '7 to 8 hours', scores: { recovery: 1 } },
      { id: 'E', label: '8 or more hours', scores: {} },
    ],
  },
  {
    id: 'dailyActivity',
    prompt: 'Outside the gym, how active is a typical workday for you?',
    options: [
      { id: 'A', label: 'Mostly seated. Under 3,000 steps', scores: { consistency: 3, execution: 2 } },
      { id: 'B', label: 'Light movement. About 3,000 to 5,000 steps', scores: { consistency: 2, execution: 1 } },
      { id: 'C', label: 'Moderate movement. About 5,000 to 8,000 steps', scores: { consistency: 1 } },
      { id: 'D', label: 'Active day. About 8,000 to 12,000 steps', scores: {} },
      { id: 'E', label: 'Very active. Over 12,000 steps', scores: {} },
    ],
  },
  {
    id: 'progressTimeline',
    prompt: 'When did you last notice real progress in the mirror, scale, or strength?',
    options: [
      { id: 'A', label: 'Within the last 4 weeks', scores: {} },
      { id: 'B', label: '1 to 3 months ago', scores: { execution: 2 } },
      { id: 'C', label: '3 to 6 months ago', scores: { execution: 5, structure: 2 } },
      { id: 'D', label: '6 to 12 months ago', scores: { execution: 7, structure: 3 } },
      { id: 'E', label: 'Over a year ago, or I am not sure', scores: { execution: 8, structure: 4 } },
    ],
  },
  {
    id: 'proteinHabit',
    prompt: 'Do you hit a daily protein target most days?',
    options: [
      { id: 'A', label: 'Yes. I know my target and hit it consistently', scores: {} },
      { id: 'B', label: 'Some days yes, some days no', scores: { nutrition: 3, structure: 2 } },
      { id: 'C', label: 'I try, but I do not track it', scores: { nutrition: 5, structure: 3 } },
      { id: 'D', label: 'Rarely think about protein', scores: { nutrition: 7, structure: 4 } },
      { id: 'E', label: 'No idea what my target should be', scores: { nutrition: 8, structure: 5 } },
    ],
  },
  {
    id: 'alcoholSocialMeals',
    prompt: 'How many social meals or drink nights do you have per week?',
    options: [
      { id: 'A', label: '0 to 1', scores: {} },
      { id: 'B', label: '2 to 3', scores: { nutrition: 3 } },
      { id: 'C', label: '4 to 5', scores: { nutrition: 5, consistency: 2 } },
      { id: 'D', label: '6 to 7', scores: { nutrition: 7, consistency: 3 } },
      { id: 'E', label: 'Most nights of the week', scores: { nutrition: 8, consistency: 4 } },
    ],
  },
  {
    id: 'clothesFit',
    prompt: 'How do your pants or belt fit compared to 12 months ago?',
    options: [
      { id: 'A', label: 'Same fit or looser', scores: {} },
      { id: 'B', label: 'Slightly tighter', scores: { execution: 2, nutrition: 2 } },
      { id: 'C', label: 'One belt notch tighter', scores: { execution: 4, nutrition: 3 } },
      { id: 'D', label: 'Clearly tighter or had to size up', scores: { execution: 6, nutrition: 5 } },
      { id: 'E', label: 'Multiple sizes tighter or significantly uncomfortable', scores: { execution: 8, nutrition: 6 } },
    ],
  },
]

export const categoryLabels: Record<AssessmentCategory, string> = {
  consistency: 'Training consistency',
  execution: 'Progress & output',
  nutrition: 'Nutrition habits',
  recovery: 'Sleep & recovery',
  structure: 'Tracking & direction',
}

export const categoryDescriptions: Record<AssessmentCategory, string> = {
  consistency: 'Your actual training frequency is too low or too irregular to drive change.',
  execution: 'You are putting time in, but the output in strength, scale, or fit is not moving.',
  nutrition: 'Protein, social meals, or off plan eating are limiting visible progress.',
  recovery: 'Sleep volume is likely limiting recovery, energy, and training quality.',
  structure: 'You lack clear targets for protein, training, or progress tracking.',
}
