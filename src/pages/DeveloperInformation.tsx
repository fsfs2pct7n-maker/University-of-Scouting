import { Mail } from 'lucide-react'

export default function DeveloperInformation() {
  return (
    <div style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px' }}>
        Joshua Zapata, Eagle Scout and Purdue Senior
      </h2>

      <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, marginBottom: '24px' }}>
        I am currently a Senior here at Purdue University double-majoring in Computer and Electrical
        Engineering Technology. I learned the rank of Eagle Scout in 2022 and have been involved in
        the Scouting program since I was a Cub Scout as part of the Pathway to Adventure Council. I
        created this app as a test to my skills, and I hope it makes your experience better for the
        University of Scouting! I also currently serve as the President for Scouting Purdue, so
        check us out and the reason this app came to be! You can find me during the event at the HQ
        for app related help if needed. Otherwise, please use one of the emails below to reach me
        for any questions or concerns. Thank you!
      </p>

      {[
        {
          label: 'For help/support specifically with this app, please contact me at:',
          email: 'joshzapata@sagamorebsa.org',
        },
        {
          label: 'For other inquiries, please feel free to contact me at:',
          email: 'zapata4@purdue.edu',
        },
      ].map(({ label, email }) => (
        <div key={email} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '6px', lineHeight: 1.4 }}>
            {label}
          </p>
          <a
            href={`mailto:${email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#0066cc',
              textDecoration: 'underline',
            }}
          >
            <Mail size={15} />
            {email}
          </a>
        </div>
      ))}
    </div>
  )
}
