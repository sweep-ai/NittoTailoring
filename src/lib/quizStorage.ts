import type { QuizAnswers } from '@/types/quiz'

const STORAGE_KEY = 'ars-quiz-answers'

export function saveQuizAnswers(answers: QuizAnswers): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
}

export function loadQuizAnswers(): QuizAnswers | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as QuizAnswers
  } catch {
    return null
  }
}

export function clearQuizAnswers(): void {
  sessionStorage.removeItem(STORAGE_KEY)
}
