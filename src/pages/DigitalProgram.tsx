import { HelpCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'If my Scout is assisting with the Opening Ceremony, where do they report to?',
    a: 'They report to door 3 on the second level of Elliott Hall of Music by 7:45 AM with their flag assembled and ready to go. They will report to Darwin Nunn.',
  },
  {
    q: 'BACKPACKS: Where do we pick up our backpacks?',
    a: 'Purdue Armory.',
  },
  {
    q: 'SPECIAL PROGRAMS: Where are the following components of the day?',
    a: 'Vendor Midway, Trading Post, Blood Drive, Toy Drive, and Online Auction are all in the Armory.',
  },
  {
    q: 'OFF SITE MERIT BADGES: What are the offsite merit badges?',
    a: 'Aviation, Graphic Arts, Orienteering, Plumbing, Archery, Wildland Fire Mgmt., Home Repairs, Climbing, Welding, Ice Skating, Automotive Maintenance, Woodworking, Canoeing, Kayaking, Rowing, Dentistry, Scuba Diving, Electricity, Truck Transportation, Health Care Professions, Roller Skating, Swimming, Lifesaving, Public Health, and Horsemanship.',
  },
]

export default function DigitalProgram() {
  return (
    <div style={{ padding: '0' }}>
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2a1f0e 0%, #4a3520 100%)',
          padding: '28px 20px',
          textAlign: 'center',
          borderBottom: '3px solid #cfb991',
        }}
      >
        <div
          style={{
            backgroundColor: '#cfb991',
            borderRadius: '8px',
            padding: '10px 20px',
            display: 'inline-block',
            marginBottom: '14px',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#2a1f0e', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            University of Scouting
          </span>
        </div>
        <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
          Digital Event Program
        </p>
        <p style={{ fontSize: '14px', color: '#cfb991', fontWeight: 500 }}>
          2025 — Purdue University
        </p>
      </div>

      {/* FAQs */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <HelpCircle size={18} color="#cfb991" />
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                padding: '14px 16px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f0ece5',
                borderLeft: '4px solid #cfb991',
              }}
            >
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', lineHeight: 1.4 }}>
                {q}
              </p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
