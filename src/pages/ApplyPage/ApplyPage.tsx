import { applyContent } from '@/content/apply'
import { VslLanding } from '@/components/funnel/VslLanding'

export function ApplyPage() {
  return (
    <VslLanding
      content={{
        eyebrow: applyContent.eyebrow,
        headline: applyContent.headline,
        stepLabel: applyContent.stepLabel,
        ctaLabel: applyContent.ctaLabel,
        vimeoId: applyContent.vimeoId,
        vimeoTitle: applyContent.vimeoTitle,
      }}
    />
  )
}
