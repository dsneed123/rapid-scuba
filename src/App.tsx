import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { HullCleaningPage } from '@/pages/HullCleaningPage'
import { UnderwaterWeldingPage } from '@/pages/UnderwaterWeldingPage'
import { PropellerCleaningPage } from '@/pages/PropellerCleaningPage'
import { BoatRepairPage } from '@/pages/BoatRepairPage'
import { ZincAnodePage } from '@/pages/ZincAnodePage'
import { HullInspectionPage } from '@/pages/HullInspectionPage'
import { PricingPage } from '@/pages/PricingPage'
import { ReviewsPage } from '@/pages/ReviewsPage'
import { ContactPage } from '@/pages/ContactPage'
import { HowOftenCleanPage } from '@/pages/blog/HowOftenCleanPage'
import { CostHullCleaningPage } from '@/pages/blog/CostHullCleaningPage'
import { BarnacleRemovalPage } from '@/pages/blog/BarnacleRemovalPage'
import { UnderwaterWeldingRepairPage } from '@/pages/blog/UnderwaterWeldingRepairPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hull-cleaning-seattle" element={<HullCleaningPage />} />
          <Route path="underwater-welding-seattle" element={<UnderwaterWeldingPage />} />
          <Route path="propeller-cleaning-seattle" element={<PropellerCleaningPage />} />
          <Route path="boat-repair-underwater-seattle" element={<BoatRepairPage />} />
          <Route path="zinc-anode-replacement-seattle" element={<ZincAnodePage />} />
          <Route path="hull-inspection-seattle" element={<HullInspectionPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="blog/how-often-clean-boat-hull-seattle"
            element={<HowOftenCleanPage />}
          />
          <Route
            path="blog/cost-hull-cleaning-seattle-marinas"
            element={<CostHullCleaningPage />}
          />
          <Route
            path="blog/barnacle-removal-seattle-boats"
            element={<BarnacleRemovalPage />}
          />
          <Route
            path="blog/underwater-welding-repair-seattle-docks"
            element={<UnderwaterWeldingRepairPage />}
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
