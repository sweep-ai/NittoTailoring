import { BrowserRouter } from 'react-router-dom'
import { FunnelTracker } from '@/components/analytics/FunnelTracker'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { Providers } from './providers'
import { AppRoutes } from './routes'

export function App() {
  return (
    <Providers>
      <BrowserRouter>
        <MetaPixel />
        <FunnelTracker />
        <AppRoutes />
      </BrowserRouter>
    </Providers>
  )
}
