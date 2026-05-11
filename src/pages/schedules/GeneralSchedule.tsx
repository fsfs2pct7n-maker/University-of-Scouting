import WarningBoxes from './WarningBoxes'

const EVENTS = [
  { time: '6:30–8:00 AM', name: 'Merit Badge Counselors/Instructors Packet Pick Up', location: 'Purdue Armory, Room 101' },
  { time: '6:30–7:55 AM', name: 'Participant Packet and Backpack Pick Up', location: 'Purdue Armory' },
  { time: '6:30 AM–4:00 PM', name: 'Vendor Midway', location: 'Purdue Armory' },
  { time: '8:00 AM–2:00 PM', name: 'American Red Cross Blood Drive', location: 'Purdue Armory' },
  { time: '8:00–8:25 AM', name: 'Opening Ceremony', location: 'Elliot Hall of Music' },
  { time: '8:25–8:55 AM', name: 'Travel to First Classroom', location: '' },
  { time: '9:00 AM–12:00 PM', name: 'Morning Merit Badge Session and Adult Classes', location: '' },
  { time: '12:00–1:00 PM', name: 'Break for Lunch – distribution', location: 'Purdue Armory', note: 'All "Off Campus" merit badges will have lunch delivered to their location.' },
  { time: '1:00–2:00 PM', name: 'Scout Leader/Parent – Fireside Chat with Greg McCauley, Grand Universe: Starships to Mars presentation', location: 'CL50, Room 224' },
  { time: '1:00–4:00 PM', name: 'Afternoon Merit Badge Session (no gathering at end of day)', location: '' },
  { time: '2:00–3:00 PM', name: 'Afternoon Adult Classes (with some exceptions)', location: '' },
  { time: '4:15–5:30 PM', name: 'Campus Tour (for pre-RSVPd participants only)', location: 'CL50 (front of building)' },
]

export default function GeneralSchedule() {
  return (
    <div style={{ padding: '16px' }}>
      <WarningBoxes />

      <div style={{ marginTop: '16px' }}>
        {EVENTS.map((event, i) => (
          <div
            key={i}
            style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--light-gray)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <div style={{ minWidth: '130px', fontSize: '13px', color: 'var(--gray)', flexShrink: 0 }}>
              {event.time}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>
                {event.name}
              </p>
              {event.location ? (
                <p style={{ fontSize: '13px', color: 'var(--gray)', marginTop: '2px' }}>{event.location}</p>
              ) : null}
              {event.note ? (
                <p style={{ fontSize: '13px', color: 'var(--gray)', fontStyle: 'italic', marginTop: '4px' }}>
                  {event.note}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
