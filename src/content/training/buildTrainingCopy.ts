import { applyContent } from '@/content/apply'
import type { QuizAnswers, VslPageContent } from '@/types/quiz'

const resultPhrases: Record<QuizAnswers['result'], string> = {
  A: 'lean out and drop body fat',
  B: 'build muscle and confidence behind your strength',
  C: 'look sharper and feel move with confidence',
  D: 'stay in shape without starting over',
  E: 'get your energy and edge back',
}

const holdingBackHeadlines: Record<QuizAnswers['holdingBack'], string> = {
  A: 'You do not need more motivation. You need a plan that survives travel and a full calendar.',
  B: 'More gym time is not the answer. You need training and nutrition that change how you look.',
  C: 'Eating clean is not enough when stress and recovery work against you.',
  D: 'The gap is not knowledge. It is direction so you stop guessing every week.',
  E: 'You should not have to become a fitness expert. You need a system you can trust.',
}

const occupationContext: Record<QuizAnswers['occupation'], string> = {
  A: 'Built for desk days and schedules that break most programs.',
  B: 'Designed for high performers who cannot afford to burn out chasing fitness.',
  C: 'Built for active days, recovery, and sustainable energy.',
  D: 'A clear path so momentum does not depend on perfect conditions.',
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
