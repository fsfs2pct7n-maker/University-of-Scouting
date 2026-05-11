import { Menu, Search, RefreshCw, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, clearSession } from '../utils/auth'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Individual Schedule',
  '/maps': 'Maps',
  '/schedules-info': 'Schedules / Info',
  '/notifications': 'Notifications',
  '/badge-list': 'Badge List',
  '/attractions-amenities': 'Attractions and Amenities',
  '/uos-kokomo': 'UoS Kokomo',
  '/profile': 'Profile',
  '/important-information': 'Important Information',
  '/vendor-midway': 'Vendor Midway',
  '/sponsors': 'Sponsors',
  '/digital-program': 'Digital Program & FAQs',
  '/online-auction': 'Online Auction',
  '/testimony': 'Testimony',
  '/parking-options': 'Parking Options',
  '/emergency-contacts': 'Emergency Contacts',
  '/developer-information': 'Developer Information',
  '/about': 'About',
  '/feedback': 'Feedback',
  '/share': 'Share',
  '/app-gallery': 'App Gallery',
}

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const title = PAGE_TITLES[location.pathname] ?? 'University of Scouting'
  const loggedIn = isLoggedIn()

  function handleLogout() {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <header
      style={{
        height: '56px',
        backgroundColor: 'var(--primary)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px var(--shadow)',
      }}
    >
      <button
        onClick={onMenuToggle}
        style={{ color: 'var(--text)', flexShrink: 0 }}
        className="p-2 rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-200"
      >
        <Menu size={24} />
      </button>

      <img
        src="/seal.png"
        alt="Seal"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        style={{ width: '32px', height: '32px', flexShrink: 0 }}
      />

      <span
        style={{
          flex: 1,
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </span>

      <button
        style={{ color: 'var(--text)', flexShrink: 0 }}
        className="p-2 rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-200"
      >
        <Search size={22} />
      </button>
      <button
        style={{ color: 'var(--text)', flexShrink: 0 }}
        className="p-2 rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-200"
      >
        <RefreshCw size={22} />
      </button>

      {loggedIn && (
        <button
          onClick={handleLogout}
          title="Logout"
          style={{ color: 'var(--text)', flexShrink: 0 }}
          className="p-2 rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-200"
        >
          <LogOut size={22} />
        </button>
      )}
    </header>
  )
}
