export type Audience = 'men' | 'women'

export function getAudience(): Audience {
  return import.meta.env.VITE_AUDIENCE === 'women' ? 'women' : 'men'
}
