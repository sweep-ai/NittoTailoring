import { Navigate } from 'react-router-dom'
import { buildTrainingCopy } from '@/content/training/buildTrainingCopy'
import { getAudience } from '@/config/audience'
import { getFeaturedTestimonialVideos } from '@/content/testimonialVideos'
import { loadQuizAnswers } from '@/lib/quizStorage'
import { VslLanding } from '@/components/funnel/VslLanding'

export function TrainingPage() {
  const answers = loadQuizAnswers()

  if (!answers) {
    return <Navigate to="/" replace />
  }

  const content = buildTrainingCopy(answers)

  return (
    <VslLanding
      content={content}
      quizVariant="training"
      quizProductLabel="Application"
      featuredTestimonials={getFeaturedTestimonialVideos(getAudience())}
    />
  )
}
