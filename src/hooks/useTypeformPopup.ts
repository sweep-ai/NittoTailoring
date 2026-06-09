import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useTypeformPopup() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const openTypeform = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeTypeform = useCallback(() => {
    setIsOpen(false)
  }, [])

  const completeTypeform = useCallback(() => {
    setIsOpen(false)
    navigate('/thank-you')
  }, [navigate])

  return {
    isTypeformOpen: isOpen,
    openTypeform,
    closeTypeform,
    completeTypeform,
  }
}
