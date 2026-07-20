import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useApplyQuizPopup() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const openQuiz = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeQuiz = useCallback(() => {
    setIsOpen(false)
  }, [])

  const completeQuiz = useCallback(() => {
    setIsOpen(false)
    navigate('/thank-you')
  }, [navigate])

  return {
    isQuizOpen: isOpen,
    openQuiz,
    closeQuiz,
    completeQuiz,
  }
}
