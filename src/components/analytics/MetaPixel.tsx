import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackMetaPageView } from '@/lib/metaPixel'

export function MetaPixel() {
  const { pathname } = useLocation()
  const isInitialPageView = useRef(true)

  useEffect(() => {
    if (isInitialPageView.current) {
      isInitialPageView.current = false
      return
    }

    trackMetaPageView()
  }, [pathname])

  return null
}
