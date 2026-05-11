import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import IndividualSchedule from './pages/IndividualSchedule'
const Maps = lazy(() => import('./pages/Maps'))
import SchedulesInfo from './pages/SchedulesInfo'
import GeneralSchedule from './pages/schedules/GeneralSchedule'
import VendorMidwayBloodDrive from './pages/schedules/VendorMidwayBloodDrive'
import PlacesToEatLunch from './pages/schedules/PlacesToEatLunch'
import Notifications from './pages/Notifications'
import BadgeList from './pages/BadgeList'
import AttractionsAmenities from './pages/AttractionsAmenities'
import UosKokomo from './pages/UosKokomo'
import Profile from './pages/Profile'
import ImportantInformation from './pages/ImportantInformation'
import VendorMidway from './pages/VendorMidway'
import Sponsors from './pages/Sponsors'
import DigitalProgram from './pages/DigitalProgram'
import OnlineAuction from './pages/OnlineAuction'
import Testimony from './pages/Testimony'
import ParkingOptions from './pages/ParkingOptions'
import EmergencyContacts from './pages/EmergencyContacts'
import DeveloperInformation from './pages/DeveloperInformation'
import About from './pages/About'
import Feedback from './pages/Feedback'
import Share from './pages/Share'
import AppGallery from './pages/AppGallery'
import { isLoggedIn } from './utils/auth'

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Protected — all inside Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#cfb991', fontSize: '14px' }}>Loading…</div>}>
                <Layout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<IndividualSchedule />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/schedules-info" element={<SchedulesInfo />} />
          <Route path="/schedules-info/general-schedule" element={<GeneralSchedule />} />
          <Route path="/schedules-info/vendor-midway-blood-drive-toy-drive" element={<VendorMidwayBloodDrive />} />
          <Route path="/schedules-info/places-to-eat-lunch" element={<PlacesToEatLunch />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/badge-list" element={<BadgeList />} />
          <Route path="/attractions-amenities" element={<AttractionsAmenities />} />
          <Route path="/uos-kokomo" element={<UosKokomo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/important-information" element={<ImportantInformation />} />
          <Route path="/vendor-midway" element={<VendorMidway />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/digital-program" element={<DigitalProgram />} />
          <Route path="/online-auction" element={<OnlineAuction />} />
          <Route path="/testimony" element={<Testimony />} />
          <Route path="/parking-options" element={<ParkingOptions />} />
          <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          <Route path="/developer-information" element={<DeveloperInformation />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/share" element={<Share />} />
          <Route path="/app-gallery" element={<AppGallery />} />
        </Route>

        {/* Catch-all → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
