import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from '@/components/layout/Layout'
import { PageLoader } from '@/components/ui/PageLoader'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const HullCleaningPage = lazy(() =>
  import('@/pages/HullCleaningPage').then((m) => ({ default: m.HullCleaningPage }))
)
const PropellerCleaningPage = lazy(() =>
  import('@/pages/PropellerCleaningPage').then((m) => ({ default: m.PropellerCleaningPage }))
)
const HullInspectionPage = lazy(() =>
  import('@/pages/HullInspectionPage').then((m) => ({ default: m.HullInspectionPage }))
)
const PricingPage = lazy(() =>
  import('@/pages/PricingPage').then((m) => ({ default: m.PricingPage }))
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)
const HowOftenCleanPage = lazy(() =>
  import('@/pages/blog/HowOftenCleanPage').then((m) => ({ default: m.HowOftenCleanPage }))
)
const CostHullCleaningPage = lazy(() =>
  import('@/pages/blog/CostHullCleaningPage').then((m) => ({ default: m.CostHullCleaningPage }))
)
const BarnacleRemovalPage = lazy(() =>
  import('@/pages/blog/BarnacleRemovalPage').then((m) => ({ default: m.BarnacleRemovalPage }))
)
const UnderwaterWeldingRepairPage = lazy(() =>
  import('@/pages/blog/UnderwaterWeldingRepairPage').then((m) => ({
    default: m.UnderwaterWeldingRepairPage,
  }))
)

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="hull-cleaning-seattle"
            element={
              <Suspense fallback={<PageLoader />}>
                <HullCleaningPage />
              </Suspense>
            }
          />
          <Route
            path="propeller-cleaning-seattle"
            element={
              <Suspense fallback={<PageLoader />}>
                <PropellerCleaningPage />
              </Suspense>
            }
          />
          <Route
            path="hull-inspection-seattle"
            element={
              <Suspense fallback={<PageLoader />}>
                <HullInspectionPage />
              </Suspense>
            }
          />
          <Route
            path="pricing"
            element={
              <Suspense fallback={<PageLoader />}>
                <PricingPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="blog/how-often-clean-boat-hull-seattle"
            element={
              <Suspense fallback={<PageLoader />}>
                <HowOftenCleanPage />
              </Suspense>
            }
          />
          <Route
            path="blog/cost-hull-cleaning-seattle-marinas"
            element={
              <Suspense fallback={<PageLoader />}>
                <CostHullCleaningPage />
              </Suspense>
            }
          />
          <Route
            path="blog/barnacle-removal-seattle-boats"
            element={
              <Suspense fallback={<PageLoader />}>
                <BarnacleRemovalPage />
              </Suspense>
            }
          />
          <Route
            path="blog/underwater-welding-repair-seattle-docks"
            element={
              <Suspense fallback={<PageLoader />}>
                <UnderwaterWeldingRepairPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
