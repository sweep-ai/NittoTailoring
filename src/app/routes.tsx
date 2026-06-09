import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const QuizPage = lazy(() =>
  import('@/pages/QuizPage/QuizPage').then((mod) => ({ default: mod.QuizPage })),
)

const ApplyPage = lazy(() =>
  import('@/pages/ApplyPage/ApplyPage').then((mod) => ({ default: mod.ApplyPage })),
)

const TrainingPage = lazy(() =>
  import('@/pages/TrainingPage/TrainingPage').then((mod) => ({ default: mod.TrainingPage })),
)

const ThankYouPage = lazy(() =>
  import('@/pages/ThankYouPage/ThankYouPage').then((mod) => ({ default: mod.ThankYouPage })),
)

const LegalPage = lazy(() =>
  import('@/pages/LegalPage/LegalPage').then((mod) => ({ default: mod.LegalPage })),
)

const BookingPage = lazy(() =>
  import('@/pages/BookingPage/BookingPage').then((mod) => ({ default: mod.BookingPage })),
)

const AssessmentPage = lazy(() =>
  import('@/pages/AssessmentPage/AssessmentPage').then((mod) => ({ default: mod.AssessmentPage })),
)

function PageFallback() {
  return <div className="page-loading">Loading…</div>
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/quiz" element={<AssessmentPage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/applynow" element={<ApplyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/disclaimer" element={<LegalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
