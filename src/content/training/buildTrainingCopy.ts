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
  A: 'You do not need more discipline. You need a plan that holds when work or travel ramps up.',
  B: 'Fitting in workouts is not the issue. You need training that changes how you look.',
  C: 'Eating well at home is not enough when dinners, events, and travel are in the mix.',
  D: 'You do not need more information. You need clear direction and less guesswork.',
  E: 'When sleep and recovery are off, willpower is not the fix. You need structure that accounts for it.',
}

const occupationContext: Record<QuizAnswers['occupation'], string> = {
  A: 'Built for desk bound weeks and the kind of schedule that breaks most programs.',
  B: 'Built for high pressure roles with long or unpredictable hours.',
  C: 'Built for active days with recovery and energy that actually last.',
  D: 'A clear path that works even when your schedule is in flux.',
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
    vimeoHash: applyContent.vimeoHash,
  }
}
