import type { ApplicationChoiceId, CommitmentChoiceId } from '@/types/quiz'
import type { QuizOption } from '@/content/quiz/questions'

export const pastAttemptQuestion = {
  id: 'pastAttempt' as const,
  prompt: 'In the past, I have...',
  required: true,
  options: [
    {
      id: 'A' as ApplicationChoiceId,
      label: 'Tried countless diets without lasting results',
    },
    {
      id: 'B' as ApplicationChoiceId,
      label: 'Worked with an in-person PT but had minimal support outside the gym',
    },
    {
      id: 'C' as ApplicationChoiceId,
      label: 'Done online programs but never saw much change',
    },
    {
      id: 'D' as ApplicationChoiceId,
      label: 'Nothing, this is my first real attempt of getting in shape',
    },
  ] satisfies QuizOption<ApplicationChoiceId>[],
}

export const workSituationQuestion = {
  id: 'workSituation' as const,
  prompt: 'My occupation is....',
  required: true,
  options: [
    {
      id: 'A' as ApplicationChoiceId,
      label: 'Sedentary, I am full time at a desk',
    },
    {
      id: 'B' as ApplicationChoiceId,
      label: 'A high stress, high pressure role',
    },
    {
      id: 'C' as ApplicationChoiceId,
      label: 'Very active. I work full time on my feet most of the time',
    },
    {
      id: 'D' as ApplicationChoiceId,
      label: 'Part time or unemployed',
    },
  ] satisfies QuizOption<ApplicationChoiceId>[],
}

export const commitmentQuestion = {
  id: 'commitment' as const,
  prompt: 'If my results were guaranteed, I am..',
  required: true,
  options: [
    {
      id: 'A' as CommitmentChoiceId,
      label: '100% committed and ready to invest into myself',
    },
    {
      id: 'B' as CommitmentChoiceId,
      label: 'Not ready and would like to delay my success even more',
    },
  ] satisfies QuizOption<CommitmentChoiceId>[],
}
