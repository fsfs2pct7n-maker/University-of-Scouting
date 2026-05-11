import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin() {
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setError('')
    localStorage.setItem('studentEmail', email.trim().toLowerCase())
    navigate('/schedule')
  }

  function handleAdminLogin() {
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setError('')
    localStorage.setItem('adminEmail', email.trim().toLowerCase())
    localStorage.setItem('userRole', 'admin')
    navigate('/admin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #faf7f1 0%, #f5f0e8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      {/* Branding */}
      <div style={{ textAlign: 'center', marginBottom: '28px', animation: 'fadeIn 0.4s ease-out' }}>
        <img
          src="/seal.png"
          alt="University of Scouting seal"
          style={{
            width: '76px',
            height: '76px',
            marginBottom: '14px',
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.10))',
          }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <h1 className="text-h1" style={{ marginBottom: '4px' }}>
          University of Scouting
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          Crossroads of America Council
        </p>
      </div>

      {/* Login card */}
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '28px 24px',
          animation: 'slideInUp 0.3s ease-out',
        }}
      >
        <h2 className="text-h3" style={{ marginBottom: '4px', fontWeight: 700 }}>
          Sign In
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '22px' }}>
          Enter your registered email to continue
        </p>

        {/* Email */}
        <div style={{ marginBottom: '14px' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '6px', letterSpacing: '0.02em' }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px 14px' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '8px' }}>
          <label
            htmlFor="password"
            style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '6px', letterSpacing: '0.02em' }}
          >
            Password <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>(optional)</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password if you have one"
            style={{ width: '100%', padding: '12px 14px' }}
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="animate-shake"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: 'var(--color-error-bg)',
              border: '1px solid #f5c6c1',
              borderRadius: 'var(--radius-md)',
              marginTop: '12px',
            }}
          >
            <AlertCircle size={16} color="var(--color-error)" />
            <p style={{ fontSize: '13px', color: 'var(--color-error)', fontWeight: 500 }}>{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={handleLogin}
            className="btn-primary"
            style={{ width: '100%', height: '48px', fontSize: '15px' }}
          >
            Sign In
            <ArrowRight size={16} />
          </button>

          <button
            onClick={handleAdminLogin}
            className="btn-secondary"
            style={{ width: '100%', height: '46px', fontSize: '14px' }}
          >
            Admin Login
          </button>
        </div>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--color-text-faint)', marginTop: '24px', textAlign: 'center' }}>
        © 2025 University of Scouting · Crossroads of America Council
      </p>
    </div>
  )
}
