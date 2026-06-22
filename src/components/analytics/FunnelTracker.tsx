import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getFunnelPageEvent } from '@/lib/funnelPageEvents'
import { trackEvent } from '@/lib/funnelTrack'

export function FunnelTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    const eventName = getFunnelPageEvent(pathname)
    if (!eventName) return

    void trackEvent(eventName, { route: pathname })
  }, [pathname])

  return null
}
