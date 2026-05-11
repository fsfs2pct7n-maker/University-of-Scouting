import { Menu, Search, RefreshCw, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, clearSession } from '../utils/auth'

const PAGE_TITLES: Record<string, string> = {
  '/schedule': 'Your Schedule',
  '/maps': 'Explore Locations',
  '/schedules-info': 'Schedules & Info',
  '/notifications': 'Your Messages',
  '/badge-list': 'Available Classes',
  '/attractions-amenities': 'Attractions',
  '/uos-kokomo': 'UoS Kokomo',
  '/profile': 'Profile',
  '/important-information': 'Important Info',
  '/vendor-midway': 'Vendor Midway',
  '/sponsors': 'Sponsors',
  '/digital-program': 'Digital Program',
  '/online-auction': 'Online Auction',
  '/testimony': 'Testimony',
  '/parking-options': 'Parking',
  '/emergency-contacts': 'Emergency Contacts',
  '/developer-information': 'Developer Info',
  '/about': 'About',
  '/feedback': 'Feedback',
  '/share': 'Share',
  '/app-gallery': 'App Gallery',
}

interface HeaderProps {
  onMenuToggle: () => void
}

const iconBtnStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'var(--color-text-dark)',
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
        height: 'var(--header-h)',
        background: 'linear-gradient(180deg, #cfb991 0%, #c2ab82 100%)',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}
    >
      <button
        onClick={onMenuToggle}
        aria-label="Open menu"
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <Menu size={22} />
      </button>

      <img
        src="/seal.png"
        alt=""
        onError={e => { e.currentTarget.style.display = 'none' }}
        style={{ width: '30px', height: '30px', flexShrink: 0, marginLeft: '2px' }}
      />

      <span
        style={{
          flex: 1,
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--color-text-dark)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginLeft: '6px',
          letterSpacing: '-0.005em',
        }}
      >
        {title}
      </span>

      <button
        aria-label="Search"
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <Search size={20} />
      </button>
      <button
        aria-label="Refresh"
        style={iconBtnStyle}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <RefreshCw size={20} />
      </button>

      {loggedIn && (
        <button
          onClick={handleLogout}
          title="Sign out"
          aria-label="Sign out"
          style={iconBtnStyle}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <LogOut size={20} />
        </button>
      )}
    </header>
  )
}
