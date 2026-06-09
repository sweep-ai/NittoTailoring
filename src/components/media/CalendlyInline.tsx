import { useEffect, useRef } from 'react'
import {
  appendCalendlyEmbedParams,
  listenForCalendlyEventScheduled,
  type CalendlyScheduledPayload,
} from '@/lib/calendlyEvents'
import styles from './CalendlyInline.module.css'

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
      }) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadCalendlyScript(): Promise<void> {
  if (window.Calendly) return Promise.resolve()

  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Calendly')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = WIDGET_SCRIPT
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Calendly'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

type CalendlyInlineProps = {
  url: string
  title?: string
  onEventScheduled?: (payload: CalendlyScheduledPayload | undefined) => void
}

export function CalendlyInline({ url, title = 'Schedule a call', onEventScheduled }: CalendlyInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onEventScheduledRef = useRef(onEventScheduled)

  useEffect(() => {
    onEventScheduledRef.current = onEventScheduled
  }, [onEventScheduled])

  useEffect(() => {
    if (!onEventScheduled) return undefined
    return listenForCalendlyEventScheduled((payload) => {
      onEventScheduledRef.current?.(payload)
    })
  }, [onEventScheduled])

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    let cancelled = false
    parent.replaceChildren()

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.Calendly) return
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
        })
      })
      .catch(() => {
        if (cancelled || !containerRef.current) return
        const iframe = document.createElement('iframe')
        iframe.src = appendCalendlyEmbedParams(url)
        iframe.title = title
        iframe.className = styles.fallbackFrame
        containerRef.current.replaceChildren(iframe)
      })

    return () => {
      cancelled = true
    }
  }, [url, title])

  return (
    <div
      ref={containerRef}
      className={styles.widget}
      aria-label={title}
    />
  )
}
