import { Button } from '@/components/ui/Button'

type ApplyCtaProps = {
  label: string
  onClick: () => void
  fullWidth?: boolean
  className?: string
}

export function ApplyCta({ label, onClick, fullWidth = false, className = '' }: ApplyCtaProps) {
  return (
    <Button variant="primary" fullWidth={fullWidth} onClick={onClick} className={className}>
      {label}
    </Button>
  )
}
