import { AlertTriangle, Phone, Mail, User, Flame, Flag, MessageCircle } from 'lucide-react'

const CONTACTS = [
  {
    name: 'Purdue PD',
    icon: <User size={22} color="#1a56db" />,
    color: '#1a56db',
    phone: null,
    email: null,
    showPhone: true,
    showEmail: false,
  },
  {
    name: 'Purdue Fire',
    icon: <Flame size={22} color="#e02424" />,
    color: '#e02424',
    phone: null,
    email: null,
    showPhone: true,
    showEmail: false,
  },
  {
    name: 'BSA Incident Reporting',
    icon: <Flag size={22} color="#cfb991" />,
    color: '#cfb991',
    phone: null,
    email: null,
    showPhone: false,
    showEmail: false,
  },
  {
    name: 'Bryon Haverstick',
    icon: <MessageCircle size={22} color="#057a55" />,
    color: '#057a55',
    phone: 'tel:',
    email: 'mailto:',
    showPhone: true,
    showEmail: true,
  },
]

export default function EmergencyContacts() {
  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        <AlertTriangle size={20} color="#f5a623" />
        <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)' }}>
          Emergency Services (911)
        </h2>
      </div>

      {CONTACTS.map(({ name, icon, color, phone, email, showPhone, showEmail }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px 12px',
            marginBottom: '10px',
            border: '1px solid var(--light-gray)',
            borderRadius: '8px',
            boxShadow: '0 1px 3px var(--shadow)',
            gap: '12px',
          }}
        >
          <div style={{ flexShrink: 0 }}>{icon}</div>
          <p style={{ flex: 1, fontSize: '15px', fontWeight: 700, color }}>{name}</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {showPhone && (
              <a href={phone ?? 'tel:'} style={{ color: '#cfb991' }}>
                <Phone size={20} />
              </a>
            )}
            {showEmail && (
              <a href={email ?? 'mailto:'} style={{ color: '#cfb991' }}>
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
