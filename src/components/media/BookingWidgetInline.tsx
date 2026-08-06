import { useEffect, useRef } from 'react'
import { listenForBookingWidgetSubmission } from '@/lib/bookingWidgetEvents'
import styles from './BookingWidgetInline.module.css'

type BookingWidgetInlineProps = {
  url: string
  title?: string
  onSubmitted?: () => void
}

export function BookingWidgetInline({
  url,
  title = 'Schedule a call',
  onSubmitted,
}: BookingWidgetInlineProps) {
  const onSubmittedRef = useRef(onSubmitted)

  useEffect(() => {
    onSubmittedRef.current = onSubmitted
  }, [onSubmitted])

  useEffect(() => {
    if (!onSubmitted) return undefined
    return listenForBookingWidgetSubmission(() => {
      onSubmittedRef.current?.()
    })
  }, [onSubmitted])

  return (
    <iframe
      src={url}
      title={title}
      className={styles.widget}
      loading="eager"
      allow="camera; microphone; autoplay; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  )
}
