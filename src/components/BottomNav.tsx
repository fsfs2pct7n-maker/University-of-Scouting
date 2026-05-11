import { Clock, MapPin, List, Bell, Award, Building2, CalendarDays } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: Clock, label: 'Individual Schedule', path: '/' },
  { icon: MapPin, label: 'Maps', path: '/maps' },
  { icon: List, label: 'Schedules/ Info', path: '/schedules-info' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Award, label: 'Badge List', path: '/badge-list' },
  { icon: Building2, label: 'Attractions and Amenities', path: '/attractions-amenities' },
  { icon: CalendarDays, label: 'UoS Kokomo', path: '/uos-kokomo' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{
        height: '64px',
        backgroundColor: 'var(--primary)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'stretch',
        boxShadow: '0 -1px 3px var(--shadow)',
      }}
    >
      {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              color: 'var(--text)',
              padding: '4px 2px',
              border: 'none',
              cursor: 'pointer',
              opacity: active ? 1 : 0.7,
              transition: 'all 200ms ease-in-out',
              background: active ? 'rgba(255,255,255,0.3)' : 'none',
              borderRadius: '8px',
              transform: active ? 'scale(1.05)' : 'scale(1)',
            }}
            className="hover:bg-white/20 active:scale-95"
          >
            <Icon size={24} strokeWidth={active ? 2.5 : 1.5} />
            <span
              style={{
                fontSize: '10px',
                lineHeight: 1.2,
                textAlign: 'center',
                maxWidth: '100%',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontWeight: active ? 700 : 400,
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
