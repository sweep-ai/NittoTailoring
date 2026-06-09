import type { AssessmentResult } from '@/types/assessment'

const STORAGE_KEY = 'ars-assessment-result'

export function saveAssessmentResult(result: AssessmentResult): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result))
}

export function loadAssessmentResult(): AssessmentResult | null {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AssessmentResult
  } catch {
    return null
  }
}
