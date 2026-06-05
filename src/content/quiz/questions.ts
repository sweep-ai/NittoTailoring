import type { OccupationChoiceId, QuizChoiceId } from '@/types/quiz'

export type QuizOption<T extends string = QuizChoiceId> = {
  id: T
  label: string
}

export const resultQuestion = {
  id: 'result' as const,
  prompt: "What's the #1 result you want right now?",
  required: true,
  options: [
    { id: 'A' as QuizChoiceId, label: 'Drop 20 to 30 pounds and look lean' },
    { id: 'B' as QuizChoiceId, label: 'Build muscle and look and feel strong' },
    { id: 'C' as QuizChoiceId, label: 'Look better in clothes and feel confident' },
    { id: 'D' as QuizChoiceId, label: "Stay in shape for life (no more yo yo'ing)" },
    { id: 'E' as QuizChoiceId, label: 'Improve energy and feel your best' },
  ] satisfies QuizOption[],
}

export const holdingBackQuestion = {
  id: 'holdingBack' as const,
  prompt: "What's been holding you back?",
  required: true,
  options: [
    {
      id: 'A' as QuizChoiceId,
      label: 'I start strong but fall off when life gets in the way',
    },
    { id: 'B' as QuizChoiceId, label: "I work out, but my body doesn't change" },
    { id: 'C' as QuizChoiceId, label: 'I eat healthy, but nothing shifts' },
    { id: 'D' as QuizChoiceId, label: "I know what to do, I'm just not doing it" },
    { id: 'E' as QuizChoiceId, label: "I'm not confident in my training or nutrition" },
  ] satisfies QuizOption[],
}

export const occupationQuestion = {
  id: 'occupation' as const,
  prompt: 'My occupation is…',
  required: true,
  options: [
    { id: 'A' as OccupationChoiceId, label: 'Sedentary. Full time at a desk' },
    { id: 'B' as OccupationChoiceId, label: 'High stress, high pressure role' },
    { id: 'C' as OccupationChoiceId, label: 'Very active. On my feet most of the day' },
    { id: 'D' as OccupationChoiceId, label: 'Part time or unemployed' },
  ] satisfies QuizOption<OccupationChoiceId>[],
}
