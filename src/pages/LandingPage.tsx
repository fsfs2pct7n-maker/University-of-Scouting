import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar, MapPinned, Bell, Smartphone, LayoutDashboard, CloudCheck,
  ArrowRight, Mail, ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Calendar,        title: 'Personal Schedule', desc: 'View every registered class and activity, tailored to your account. Sort, search, and tap any class for full details.' },
  { icon: MapPinned,       title: 'Interactive Map',    desc: 'Explore 76 campus and off-campus locations with live filters, search, and one-tap directions in Apple Maps or Google Maps.' },
  { icon: Bell,            title: 'Live Updates',       desc: 'Stay informed with instant push notifications about class changes, cancellations, and important event announcements.' },
  { icon: Smartphone,      title: 'Mobile-First',       desc: 'Designed for phones first. Smooth, fast, and accessible on any device — no app store download required.' },
  { icon: LayoutDashboard, title: 'Admin Dashboard',    desc: 'Built-in tools for organizers: CSV bulk import, send notifications, manage registrations, and export rosters.' },
  { icon: CloudCheck,      title: 'Always Available',   desc: 'Your schedule is cached locally for offline access. Print or download a PDF anytime you need a hard copy.' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleQuickLogin() {
    if (!email.trim()) {
      setError('Enter your email to continue.')
      return
    }
    localStorage.setItem('studentEmail', email.trim().toLowerCase())
    navigate('/schedule')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(160deg, #cfb991 0%, #b39b77 100%)',
        padding: 'clamp(48px, 11vw, 96px) 24px clamp(56px, 12vw, 112px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '340px', height: '340px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', animation: 'fadeIn 0.5s ease-out' }}>
          <img
            src="/seal.png"
            alt="Sagamore Council seal"
            style={{
              width: 'clamp(110px, 18vw, 150px)',
              height: 'clamp(110px, 18vw, 150px)',
              marginBottom: '20px',
              filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.18))',
            }}
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <h1 style={{
            fontSize: 'clamp(28px, 7vw, 44px)',
            fontWeight: 800,
            color: '#2c2c2c',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '14px',
            textShadow: '0 1px 2px rgba(255,255,255,0.2)',
          }}>
            University of Scouting
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: '#3a2e1e',
            fontWeight: 600,
            marginBottom: '18px',
            letterSpacing: '-0.01em',
          }}>
            Your Complete Event Management System
          </p>
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            color: 'rgba(58,46,30,0.85)',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto 32px',
          }}>
            Designed for scout leaders and participants. Manage your schedule, explore locations,
            and stay connected — all in one beautifully simple app.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
            style={{
              height: '52px',
              fontSize: '15px',
              padding: '0 32px',
              backgroundColor: '#2c2c2c',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1a1a1a' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2c2c2c' }}
          >
            Sign In
            <ArrowRight size={16} />
          </button>
          <p style={{ fontSize: '12px', color: 'rgba(58,46,30,0.6)', marginTop: '14px', fontWeight: 500 }}>
            Use your registered email — no password required
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURES
          ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px, 10vw, 96px) 20px',
        backgroundColor: 'var(--color-bg)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="text-label" style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--color-primary-dark)' }}>
            Everything You Need
          </p>
          <h2 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 800,
            color: 'var(--color-text-dark)',
            textAlign: 'center',
            letterSpacing: '-0.015em',
            marginBottom: '12px',
          }}>
            Built for the modern scout event
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            maxWidth: '540px',
            margin: '0 auto 56px',
            lineHeight: 1.55,
          }}>
            Six pillars that replace the spreadsheets, printouts, and back-and-forth emails.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-soft)',
                  transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
                  animation: `fadeIn 0.4s ease-out ${i * 50}ms backwards`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-soft)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'linear-gradient(135deg, #fefaf2 0%, var(--color-primary-bg) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                  border: '1px solid var(--color-primary-light)',
                }}>
                  <f.icon size={24} color="var(--color-primary-dark)" strokeWidth={2} />
                </div>
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: 'var(--color-text-dark)',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INLINE CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(56px, 10vw, 96px) 20px',
        background: 'linear-gradient(180deg, var(--color-bg-warm) 0%, #f0e9dc 100%)',
        borderTop: '1px solid var(--color-border-soft)',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: 'var(--color-bg)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-primary-light)',
            marginBottom: '18px',
          }}>
            <ShieldCheck size={14} color="var(--color-primary-dark)" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              Secure & private — your data stays on your device
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 800,
            color: 'var(--color-text-dark)',
            letterSpacing: '-0.015em',
            marginBottom: '12px',
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            color: 'var(--color-text-secondary)',
            marginBottom: '28px',
            lineHeight: 1.55,
          }}>
            Enter the email you used to register for University of Scouting.
            We'll find your personal schedule.
          </p>

          {/* Inline email form */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '200px' }}>
              <Mail size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleQuickLogin()}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  height: '52px',
                  padding: '0 14px 0 42px',
                  fontSize: '15px',
                  backgroundColor: '#fff',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>
            <button
              onClick={handleQuickLogin}
              className="btn-primary"
              style={{
                height: '52px',
                padding: '0 26px',
                fontSize: '15px',
                flex: '0 1 auto',
                minWidth: '140px',
              }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>

          {error && (
            <p style={{ fontSize: '13px', color: 'var(--color-error)', marginTop: '12px', fontWeight: 500 }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '20px' }}>
            Are you an organizer? <button onClick={() => navigate('/login')} style={{ color: 'var(--color-primary-dark)', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', fontSize: '12px' }}>Admin sign-in</button>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        backgroundColor: '#2c2c2c',
        color: '#d4d4d4',
        padding: 'clamp(36px, 6vw, 56px) 20px 24px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img
                  src="/seal.png"
                  alt=""
                  onError={e => { e.currentTarget.style.display = 'none' }}
                  style={{ width: '32px', height: '32px' }}
                />
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                  University of Scouting
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>
                Crossroads of America Council<br />
                Purdue University · West Lafayette, IN
              </p>
            </div>

            {/* Links */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Explore
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'About', path: '/about' },
                  { label: 'Feedback', path: '/feedback' },
                  { label: 'Developer Info', path: '/developer-information' },
                  { label: 'App Gallery', path: '/app-gallery' },
                ].map(l => (
                  <button
                    key={l.path}
                    onClick={() => navigate(l.path)}
                    style={{
                      fontSize: '13px',
                      color: '#bbb',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'color 150ms',
                      width: 'fit-content',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#cfb991' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#bbb' }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                Event Info
              </p>
              <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>
                Saturday, December 6, 2025<br />
                Purdue University Campus
              </p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #404040',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '12px',
            color: '#888',
          }}>
            <span>© 2025 Crossroads of America Council. All rights reserved.</span>
            <span>Built by Owen Medley Software</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
