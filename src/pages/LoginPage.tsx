import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin() {
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    setError('')
    localStorage.setItem('studentEmail', email.trim().toLowerCase())
    navigate('/schedule')
  }

  function handleAdminLogin() {
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    setError('')
    localStorage.setItem('adminEmail', email.trim().toLowerCase())
    localStorage.setItem('userRole', 'admin')
    navigate('/admin')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f0e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      {/* Logo / branding */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <img
          src="/seal.png"
          alt="University of Scouting seal"
          style={{ width: '72px', height: '72px', marginBottom: '14px' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#3a2e1e', margin: 0 }}>
          University of Scouting
        </h1>
        <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
          Crossroads of America Council
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          backgroundColor: '#fff',
          borderRadius: '14px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          padding: '28px 24px',
          border: '1px solid #f0ece5',
        }}
      >
        <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#3a2e1e', marginBottom: '20px' }}>
          Sign In
        </h2>

        {/* Email */}
        <div style={{ marginBottom: '14px' }}>
          <label
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '16px',
              border: '1.5px solid #e0d9cf',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
              color: '#333',
              backgroundColor: '#fafaf8',
              transition: 'border-color 150ms',
              minHeight: '48px',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '8px' }}>
          <label
            style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '16px',
              border: '1.5px solid #e0d9cf',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
              color: '#333',
              backgroundColor: '#fafaf8',
              transition: 'border-color 150ms',
              minHeight: '48px',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ fontSize: '13px', color: '#e05252', marginBottom: '12px', marginTop: '4px' }}>
            {error}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#cfb991',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              borderRadius: '9px',
              cursor: 'pointer',
              transition: 'background-color 150ms, transform 100ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#b8a07a' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#cfb991' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Login
          </button>

          <button
            onClick={handleAdminLogin}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              color: '#cfb991',
              fontWeight: 600,
              fontSize: '14px',
              border: '1.5px solid #cfb991',
              borderRadius: '9px',
              cursor: 'pointer',
              transition: 'background-color 150ms, transform 100ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f7f2eb' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            Admin Login
          </button>
        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#aaa', marginTop: '24px', textAlign: 'center' }}>
        © 2025 University of Scouting · Crossroads of America Council
      </p>
    </div>
  )
}
