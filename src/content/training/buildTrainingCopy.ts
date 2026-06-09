import { applyContent } from '@/content/apply'
import type { QuizAnswers, VslPageContent } from '@/types/quiz'

const resultPhrases: Record<QuizAnswers['result'], string> = {
  A: 'lean out and drop body fat',
  B: 'build muscle and actually look strong',
  C: 'look sharp and feel confident',
  D: 'stay consistent through travel and busy seasons',
  E: 'get more energy and clarity through long weeks',
}

const holdingBackHeadlines: Record<QuizAnswers['holdingBack'], string> = {
  A: 'You don\'t need more discipline. You need a plan that holds when work or travel ramps up.',
  B: 'Fitting in workouts isn\'t the issue. You need training that changes how you look.',
  C: 'Eating well at home isn\'t enough when dinners, events, and travel are in the mix.',
  D: 'You don\'t need more info. You need clear direction and less guesswork.',
  E: 'When sleep and recovery are off, willpower isn\'t the fix. You need structure.',
}

const occupationContext: Record<QuizAnswers['occupation'], string> = {
  A: 'Built for desk bound weeks and schedules that break most programs.',
  B: 'Built for high pressure roles with long, unpredictable hours.',
  C: 'Built for active days with recovery and energy that lasts.',
  D: 'A clear path that works even when your schedule fluctuates.',
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || 'there'
}

export function buildTrainingCopy(answers: QuizAnswers): VslPageContent {
  const name = firstName(answers.name)
  const goal = resultPhrases[answers.result]
  const painLine = holdingBackHeadlines[answers.holdingBack]
  const contextLine = occupationContext[answers.occupation]

  return {
    eyebrow: `ACCESS YOUR TRAINING BELOW`,
    headline: `You want to ${goal}. ${painLine} ${contextLine}`,
    stepLabel: `${name}, watch this before you book.`,
    ctaLabel: 'BOOK YOUR CONSULTATION',
    vimeoId: applyContent.vimeoId,
    vimeoTitle: applyContent.vimeoTitle,
  }
}
