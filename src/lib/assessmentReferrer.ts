const REFERRER_KEY = 'ars-assessment-from-thank-you'

export function markAssessmentFromThankYou(): void {
  sessionStorage.setItem(REFERRER_KEY, '1')
}

export function isAssessmentFromThankYou(): boolean {
  return sessionStorage.getItem(REFERRER_KEY) === '1'
}

export function clearAssessmentFromThankYou(): void {
  sessionStorage.removeItem(REFERRER_KEY)
}
