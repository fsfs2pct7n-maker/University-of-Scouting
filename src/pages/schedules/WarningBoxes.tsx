const WARNINGS = [
  'Scouts should not be dropped off on campus without an assigned chaperone or leader. Scouts should travel campus with a buddy at all times.',
  'All Scouts/Leaders should attend the Opening Ceremony (Instructors do not need to attend)',
]

export default function WarningBoxes() {
  return (
    <>
      {WARNINGS.map((text, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#F68B7C',
            padding: '12px 14px',
            borderRadius: '4px',
            marginBottom: '10px',
            fontSize: '14px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      ))}
    </>
  )
}
