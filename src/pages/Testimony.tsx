export default function Testimony() {
  return (
    <div style={{ padding: '0' }}>
      {/* Hero image placeholder */}
      <div
        style={{
          backgroundColor: '#2d5a27',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#fff',
          textAlign: 'center',
          padding: '16px',
        }}
      >
        <div style={{ fontSize: '56px' }}>🧑‍⚕️</div>
        <p style={{ fontSize: '13px', opacity: 0.8 }}>Purdue University College of Veterinary Medicine</p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
          Justin C, Eagle Scout and Purdue Freshman
        </h2>
        <p
          style={{
            fontSize: '16px',
            fontStyle: 'italic',
            color: 'var(--text)',
            lineHeight: 1.7,
          }}
        >
          "Taking the Veterinary Medicine Merit Badge at Purdue University helped me to create
          connections for my future career as a veterinarian. As part of my path to become an Eagle
          Scout, I envisioned myself in my future career as a veterinarian."
        </p>
      </div>
    </div>
  )
}
