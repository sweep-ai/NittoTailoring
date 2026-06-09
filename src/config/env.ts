export const env = {
  typeformLiveId: import.meta.env.VITE_TYPEFORM_LIVE_ID ?? '01KTNBNYDMJSH7PKS373QG2AJF',
  siteName: import.meta.env.VITE_SITE_NAME ?? 'Alpha Reset System',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? '',
} as const
