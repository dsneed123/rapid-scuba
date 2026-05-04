import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from '@/components/layout/Layout'
import { PageLoader } from '@/components/ui/PageLoader'
import { AuthProvider } from '@/contexts/AuthContext'

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
const SignupPage = lazy(() =>
  import('@/pages/account/SignupPage').then((m) => ({ default: m.SignupPage }))
)
const LoginPage = lazy(() =>
  import('@/pages/account/LoginPage').then((m) => ({ default: m.LoginPage }))
)
const AccountPage = lazy(() =>
  import('@/pages/account/AccountPage').then((m) => ({ default: m.AccountPage }))
)
const StaffDashboardPage = lazy(() =>
  import('@/pages/account/StaffDashboardPage').then((m) => ({
    default: m.StaffDashboardPage,
  }))
)

function lazyRoute(Component: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={lazyRoute(HomePage)} />
            <Route path="hull-cleaning-seattle" element={lazyRoute(HullCleaningPage)} />
            <Route
              path="propeller-cleaning-seattle"
              element={lazyRoute(PropellerCleaningPage)}
            />
            <Route
              path="hull-inspection-seattle"
              element={lazyRoute(HullInspectionPage)}
            />
            <Route path="pricing" element={lazyRoute(PricingPage)} />
            <Route path="contact" element={lazyRoute(ContactPage)} />
            <Route path="signup" element={lazyRoute(SignupPage)} />
            <Route path="login" element={lazyRoute(LoginPage)} />
            <Route path="account" element={lazyRoute(AccountPage)} />
            <Route path="staff" element={lazyRoute(StaffDashboardPage)} />
            <Route
              path="blog/how-often-clean-boat-hull-seattle"
              element={lazyRoute(HowOftenCleanPage)}
            />
            <Route
              path="blog/cost-hull-cleaning-seattle-marinas"
              element={lazyRoute(CostHullCleaningPage)}
            />
            <Route
              path="blog/barnacle-removal-seattle-boats"
              element={lazyRoute(BarnacleRemovalPage)}
            />
            <Route
              path="blog/underwater-welding-repair-seattle-docks"
              element={lazyRoute(UnderwaterWeldingRepairPage)}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
