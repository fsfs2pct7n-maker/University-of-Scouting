import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Bell, Smartphone, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Calendar,   title: 'Personalized Schedule', desc: 'Every class and activity organized in one clear, sortable view.' },
  { icon: MapPin,     title: 'Interactive Map',       desc: '76 campus locations with search, filters, and directions.' },
  { icon: Bell,       title: 'Live Notifications',    desc: 'Instant alerts when classes change, get cancelled, or move.' },
  { icon: Smartphone, title: 'Mobile First',          desc: 'Designed for phones. Fast, smooth, works without an app store.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-warm)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #cfb991 0%, #b39b77 100%)',
        padding: 'clamp(40px, 9vw, 64px) 24px clamp(48px, 10vw, 72px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }} />

        <img
          src="/seal.png"
          alt="Sagamore Council seal"
          style={{
            width: 'clamp(96px, 22vw, 140px)',
            height: 'clamp(96px, 22vw, 140px)',
            marginBottom: '18px',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <h1 className="text-display" style={{
          color: '#2c2c2c',
          marginBottom: '10px',
          textShadow: '0 1px 2px rgba(255,255,255,0.2)',
        }}>
          University of Scouting
        </h1>
        <p style={{
          fontSize: 'clamp(14px, 3.5vw, 17px)',
          color: '#3a2e1e',
          maxWidth: '420px',
          margin: '0 auto',
          lineHeight: 1.5,
          fontWeight: 500,
        }}>
          Event management for Scout Leaders &amp; Participants
        </p>
        <p style={{
          fontSize: '12px',
          color: 'rgba(58,46,30,0.7)',
          marginTop: '8px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          Crossroads of America Council · Purdue
        </p>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{
        padding: '24px 16px 32px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '720px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <p className="text-label" style={{ textAlign: 'center', marginTop: '4px' }}>
          Everything you need
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '12px',
        }}>
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="card"
              style={{ padding: '18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <f.icon size={20} color="var(--color-primary-dark)" strokeWidth={2.2} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '4px' }}>
                  {f.title}
                </p>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div
          className="card"
          style={{
            padding: '28px 24px',
            textAlign: 'center',
            marginTop: '8px',
            background: 'linear-gradient(180deg, #ffffff 0%, #fffaf0 100%)',
          }}
        >
          <h2 className="text-h2" style={{ marginBottom: '8px' }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px', maxWidth: '320px', margin: '0 auto 20px' }}>
            Sign in with your registered email to view your personalized schedule and event information.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
            style={{ width: '100%', height: '48px', fontSize: '15px', maxWidth: '340px' }}
          >
            Sign In
            <ArrowRight size={16} />
          </button>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--color-text-faint)', textAlign: 'center', marginTop: '8px' }}>
          © 2025 University of Scouting · Crossroads of America Council
        </p>
      </div>
    </div>
  )
}
