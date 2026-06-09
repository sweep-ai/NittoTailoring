const SCRIPT_URL = 'https://embed.typeform.com/next/embed.js'

declare global {
  interface Window {
    tf?: {
      load: () => void
    }
    arsTypeformOnSubmit?: () => void
    arsTypeformOnEnding?: () => void
  }
}

let scriptPromise: Promise<void> | null = null

export function loadTypeformEmbedScript(): Promise<void> {
  if (window.tf) return Promise.resolve()

  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_URL}"]`)
    if (existing) {
      if (window.tf) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Typeform embed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Typeform embed'))
    document.body.appendChild(script)
  })

  return scriptPromise
}

export function mountTypeformLiveEmbed(
  container: HTMLElement,
  liveId: string,
  handlers: {
    onSubmit: string
    onEndingButtonClick?: string
  },
): void {
  container.replaceChildren()
  container.setAttribute('data-tf-live', liveId)
  container.setAttribute('data-tf-on-submit', handlers.onSubmit)

  if (handlers.onEndingButtonClick) {
    container.setAttribute('data-tf-on-ending-button-click', handlers.onEndingButtonClick)
  }

  window.tf?.load()
}

export function warmTypeformLiveEmbed(): void {
  void loadTypeformEmbedScript()
}
