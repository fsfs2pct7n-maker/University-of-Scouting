import { X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getStudentEmail, getAdminEmail, isAdmin } from '../utils/auth'

type MenuItem = { label: string; path: string; icon: string }

const MENU_ITEMS: MenuItem[] = [
  { label: 'Profile',                path: '/profile',                 icon: 'fa-user' },
  { label: 'Important Information',  path: '/important-information',   icon: 'fa-info-circle' },
  { label: 'Vendor Midway',          path: '/vendor-midway',           icon: 'fa-store' },
  { label: 'Sponsors',               path: '/sponsors',                icon: 'fa-building' },
  { label: 'Digital Program & FAQs', path: '/digital-program',         icon: 'fa-book' },
  { label: 'Online Auction',         path: '/online-auction',          icon: 'fa-gavel' },
  { label: 'Testimony',              path: '/testimony',               icon: 'fa-comment-dots' },
  { label: 'Parking Options',        path: '/parking-options',         icon: 'fa-parking' },
  { label: 'Emergency Contacts',     path: '/emergency-contacts',      icon: 'fa-exclamation-triangle' },
  { label: 'Developer Information',  path: '/developer-information',   icon: 'fa-code' },
  { label: 'About',                  path: '/about',                   icon: 'fa-circle-info' },
  { label: 'Feedback',               path: '/feedback',                icon: 'fa-envelope' },
  { label: 'Share',                  path: '/share',                   icon: 'fa-share-nodes' },
  { label: 'App Gallery',            path: '/app-gallery',             icon: 'fa-images' },
]

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate()
  const location = useLocation()

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
            position: 'fixed', inset: 0,
            backgroundColor: 'var(--color-overlay)',
            zIndex: 1100,
            animation: 'fadeIn 0.2s ease-out',
          }}
        />
      )}

      <aside
        style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          width: 'min(82vw, 300px)',
          backgroundColor: '#fff',
          zIndex: 1101,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isOpen ? '2px 0 16px rgba(0,0,0,0.18)' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 16px',
            background: 'linear-gradient(180deg, #cfb991 0%, #b39b77 100%)',
            color: 'var(--color-text-dark)',
          }}
        >
          <img
            src="/seal.png"
            alt=""
            onError={e => { e.currentTarget.style.display = 'none' }}
            style={{ width: '36px', height: '36px', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.01em' }}>
              University of Scouting
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(44,44,44,0.7)', marginTop: '1px' }}>
              Crossroads of America
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: '36px', height: '36px',
              borderRadius: '10px',
              backgroundColor: 'rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background-color 150ms ease-out',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.16)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)' }}
          >
            <X size={18} color="var(--color-text-dark)" />
          </button>
        </div>

        {/* Menu items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {MENU_ITEMS.map(({ label, path, icon }) => {
            const active = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => handleNavigate(path)}
                className={`menu-item ${active ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  textAlign: 'left',
                  minHeight: '48px',
                  padding: '10px 16px',
                  paddingLeft: active ? '12px' : '16px',
                  fontSize: '14px',
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--color-primary-dark)' : 'var(--color-text-base)',
                  background: active ? 'var(--color-primary-bg)' : 'none',
                  borderLeft: active ? '4px solid var(--color-primary)' : '4px solid transparent',
                  transition: 'background-color 150ms ease-out, color 150ms ease-out',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = '#fafafa'
                    e.currentTarget.style.color = 'var(--color-text-dark)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--color-text-base)'
                  }
                }}
              >
                <i
                  className={`fas ${icon}`}
                  aria-hidden="true"
                  style={{
                    width: '20px',
                    fontSize: '16px',
                    color: active ? 'var(--color-primary-dark)' : 'var(--color-text-base)',
                    flexShrink: 0,
                    textAlign: 'center',
                    transition: 'color 150ms ease-out, transform 150ms ease-out',
                  }}
                />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* User footer */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-alt)',
            padding: '14px 16px',
          }}
        >
          <p className="text-label" style={{ marginBottom: '3px' }}>
            {isAdmin() ? 'Admin' : 'Signed in as'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-base)', wordBreak: 'break-all', fontWeight: 500 }}>
            {getAdminEmail() || getStudentEmail() || '—'}
          </p>
        </div>
      </aside>
    </>
  )
}
