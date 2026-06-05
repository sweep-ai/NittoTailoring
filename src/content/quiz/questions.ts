import type { OccupationChoiceId, QuizChoiceId } from '@/types/quiz'

export type QuizOption<T extends string = QuizChoiceId> = {
  id: T
  label: string
}

export const resultQuestion = {
  id: 'result' as const,
  prompt: 'What do you want most right now?',
  required: true,
  options: [
    { id: 'A' as QuizChoiceId, label: 'Drop 20 to 30 pounds and look lean' },
    { id: 'B' as QuizChoiceId, label: 'Build muscle and look strong, not just less soft' },
    { id: 'C' as QuizChoiceId, label: 'Look sharp in a suit and feel confident' },
    { id: 'D' as QuizChoiceId, label: 'Stay consistent through travel and busy seasons' },
    { id: 'E' as QuizChoiceId, label: 'More energy and clarity through long weeks' },
  ] satisfies QuizOption[],
}

export const holdingBackQuestion = {
  id: 'holdingBack' as const,
  prompt: 'What sounds most familiar?',
  required: true,
  options: [
    {
      id: 'A' as QuizChoiceId,
      label: 'My routine falls apart when work or travel ramps up',
    },
    { id: 'B' as QuizChoiceId, label: 'I train when I can, but my body does not change' },
    {
      id: 'C' as QuizChoiceId,
      label: 'I eat well at home, but dinners, events, and travel throw me off',
    },
    {
      id: 'D' as QuizChoiceId,
      label: 'I know the basics. I need clear direction and less guesswork',
    },
    {
      id: 'E' as QuizChoiceId,
      label: 'Sleep, recovery, and energy are off, and it shows',
    },
  ] satisfies QuizOption[],
}

export const occupationQuestion = {
  id: 'occupation' as const,
  prompt: 'What best describes your work?',
  required: true,
  options: [
    {
      id: 'A' as OccupationChoiceId,
      label: 'Mostly at a desk (law, finance, corporate, consulting)',
    },
    {
      id: 'B' as OccupationChoiceId,
      label: 'High pressure role with long or unpredictable hours',
    },
    { id: 'C' as OccupationChoiceId, label: 'On my feet or physically active most of the day' },
    { id: 'D' as OccupationChoiceId, label: 'Between roles or a lighter schedule right now' },
  ] satisfies QuizOption<OccupationChoiceId>[],
}
