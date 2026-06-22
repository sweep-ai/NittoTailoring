export const META_PIXEL_ID = '1527763398901243'

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export function trackMetaPageView() {
  window.fbq?.('track', 'PageView')
}
