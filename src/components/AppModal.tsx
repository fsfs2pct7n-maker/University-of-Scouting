import { useNavigate } from 'react-router-dom'

export default function AppModal() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '340px',
          padding: '28px 20px 20px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
      >
        {/* Seal logo */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#cfb991',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
            border: '3px solid #a89060',
            fontSize: '36px',
          }}
        >
          ⚜️
        </div>

        {/* Sub-text */}
        <p style={{ fontSize: '11px', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '12px' }}>
          SAGAMORE COUNCIL
          <br />
          PURDUE UNIVERSITY
          <br />
          HOME OF 100+ MERIT BADGES
        </p>

        {/* Title */}
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
          University of Scouting
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '14px' }}>
          University of Scouting 2025 App
        </p>

        {/* Description */}
        <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '20px' }}>
          The official management app for the 2025 University of Scouting hosted at Purdue
          University! Here you can view your personal merit badge schedule, find it's location, and
          see various other relevant information for the event. This app is possible due to the
          contributions of Scouting Purdue and its members.
        </p>

        {/* OK button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: '#cfb991',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 700,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '14px',
          }}
        >
          OK
        </button>

        {/* Footer links */}
        <p style={{ fontSize: '10px', color: 'var(--gray)' }}>
          Terms&nbsp;|&nbsp;Privacy&nbsp;|&nbsp;Licenses&nbsp;|&nbsp;Version 1.000763
        </p>
      </div>
    </div>
  )
}
