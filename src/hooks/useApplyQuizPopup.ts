import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { prefetchBookingPage } from '@/lib/prefetchRoutes'
import { scrollToTop } from '@/lib/scrollToTop'

export function useApplyQuizPopup() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const openQuiz = useCallback(() => {
    prefetchBookingPage()
    setIsOpen(true)
  }, [])

  const closeQuiz = useCallback(() => {
    setIsOpen(false)
  }, [])

  const completeQuiz = useCallback(() => {
    setIsOpen(false)
    scrollToTop()
    navigate('/booking', { replace: true })
  }, [navigate])

  return {
    isQuizOpen: isOpen,
    openQuiz,
    closeQuiz,
    completeQuiz,
  }
}
