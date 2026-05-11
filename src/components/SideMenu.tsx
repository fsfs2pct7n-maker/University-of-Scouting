import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getStudentEmail, getAdminEmail, isAdmin } from '../utils/auth'

const MENU_ITEMS = [
  { label: 'Profile', path: '/profile' },
  { label: 'Important Information', path: '/important-information' },
  { label: 'Vendor Midway', path: '/vendor-midway' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Digital Program & FAQs', path: '/digital-program' },
  { label: 'Online Auction', path: '/online-auction' },
  { label: 'Testimony', path: '/testimony' },
  { label: 'Parking Options', path: '/parking-options' },
  { label: 'Emergency Contacts', path: '/emergency-contacts' },
  { label: 'Developer Information', path: '/developer-information' },
  { label: 'About', path: '/about' },
  { label: 'Feedback', path: '/feedback' },
  { label: 'Share', path: '/share' },
  { label: 'App Gallery', path: '/app-gallery' },
]

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1100,
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'min(70vw, 280px)',
          backgroundColor: '#ffffff',
          zIndex: 1101,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isOpen ? '2px 0 8px var(--shadow)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px',
            backgroundColor: 'var(--primary)',
          }}
        >
          <img
            src="/seal.png"
            alt="Seal"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            style={{ width: '36px', height: '36px', flexShrink: 0 }}
          />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', flex: 1 }}>
            University of Scouting
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: '36px', height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <X size={18} color="var(--text)" />
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto' }}>
          {MENU_ITEMS.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => handleNavigate(path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                textAlign: 'left',
                minHeight: '48px',
                padding: '10px 16px',
                fontSize: '15px',
                color: 'var(--text)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--light-gray)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--light-gray)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div
          style={{
            borderTop: '1px solid #ddd',
            backgroundColor: 'var(--light-gray)',
            padding: '12px 16px',
          }}
        >
          <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            {isAdmin() ? 'Admin' : 'Signed in as'}
          </p>
          <span style={{ fontSize: '13px', color: 'var(--text)', wordBreak: 'break-all' }}>
            {getAdminEmail() || getStudentEmail() || '—'}
          </span>
        </div>
      </aside>
    </>
  )
}
