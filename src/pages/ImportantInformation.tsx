import { useState } from 'react'

const TABS = ['Expectations', 'Pre Reqs and Blue Cards', 'Buddy System'] as const
type Tab = (typeof TABS)[number]

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '10px 6px',
        fontSize: '13px',
        fontWeight: active ? 700 : 400,
        color: active ? 'var(--text)' : 'var(--gray)',
        background: 'none',
        border: 'none',
        borderBottom: active ? '3px solid #cfb991' : '3px solid transparent',
        cursor: 'pointer',
        lineHeight: 1.2,
      }}
    >
      {label}
    </button>
  )
}

function Expectations() {
  return (
    <div style={{ padding: '16px', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>
      <p style={{ marginBottom: '16px' }}>
        <strong>BE PREPARED:</strong> Make sure that if there are pre-requisites for your classes
        that you complete them before the event. Pre-requisite information can be found in the next
        tab over, "Pre Reqs and Blue Cards". It's December in Indiana, no telling what the weather
        will hold, some classes will venture outdoors, be ready for that. This event isn't designed
        to be a rubber stamp for advancement. Be ready to engage and learn. Scouts that don't take
        an active part in their class will not be given credit for attending. This is at the
        discretion of the counselor/instructor for that class.
      </p>
      <p style={{ marginBottom: '16px' }}>
        <strong>EXPECTATIONS:</strong> Be patient. An event of this size brings challenges; some we
        can plan for, others just pop up and we have to adjust on the fly. A Scout Friendly,
        Courteous, and Kind. The Scout Oath and Law apply at all times. We are guests on campus. We
        have 125 rooms reserved across campus in 20 different buildings and all of that space is
        donated. Let's not risk ruining an amazing relationship that we have with Purdue. Don't take
        that for granted. Be grateful. Let's show the Boilermaker Community how amazing we are as
        Scouts. If you have a Scout Uniform, we encourage you to wear it. Wear it proud. Please make
        sure that any trash you make on campus you ensure that it makes it into a trash can or
        dumpster. We will have coffee for the adults on site while supplies last. Thanks to Java
        House for their services! Free will donations are accepted. Coffee will be provided at the
        Armory. Any coffee taken into the Elliott Hall of Music must have a lid!
      </p>
      <p>
        <strong>WHAT TO BRING:</strong> Scouts: All MB classes will receive the unofficial MB
        workbook to help guide the Scouts through the requirements of their selected badges. While
        it's not required to complete it is a great tool. Make sure you have your MB booklet and a
        writing utensil. Cub Scouts don't need to bring anything but themselves and an attitude to
        learn and have fun. We will take care of the rest. Adult leaders, there are numerous classes
        that will help you be a better leader, engage and have fun! Scouting needs you! Thank you for
        your commitment to Scouting. A pen and a notebook would be helpful for you.
      </p>
    </div>
  )
}

function PreReqs() {
  return (
    <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
      {[
        {
          title: 'Pre Reqs',
          body: 'PRE-REQUISITES: Requirements on merit badges that have to be completed before coming to the event. Scouts should bring proof of their completion to class to show their counselor so they get credit for its completion. Some classes will have post requisites that will need to be completed after the event. Those counselors will work with you to complete those and help record them into Black Pug.',
        },
        {
          title: 'Blue Cards',
          body: 'BLUE CARDS: We do not use blue cards for advancements at this event. Scout progress will be recorded by their counselor on their class roster and then input into Black Pug (where you will register for the event) after the event by our Council Staff. Please allow 2-3 weeks for that data to be input in the system. Once we have that data input into Black Pug, your Scouts account will be updated!',
        },
      ].map(({ title, body }) => (
        <div
          key={title}
          style={{
            flex: 1,
            padding: '14px',
            border: '1px solid var(--light-gray)',
            borderRadius: '6px',
            boxShadow: '0 1px 3px var(--shadow)',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: 'var(--text)' }}>
            {title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>{body}</p>
        </div>
      ))}
    </div>
  )
}

function BuddySystem() {
  return (
    <div style={{ padding: '16px', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>
      <p style={{ marginBottom: '12px' }}>
        The buddy system is designed to provide an additional layer of safeguarding by ensuring no
        youth member is alone and that a buddy can get help in an emergency. The buddy system is used
        whenever youth members are outside the line of sight of qualified adult leadership and
        specific activities where the buddy system is required for participation. Of note:
      </p>
      {[
        'The adult unit leadership oversees and approves buddies.',
        'Buddies are two and can also be three to prevent youth members from being alone.',
        'A buddy pair cannot be mixed gender, where appropriate a third youth must be added (for a buddy group of 3).',
        'Youth siblings of the same gender may serve as buddies regardless of age with permission from their parents or legal guardians.',
        'Except for siblings, it is recommended that the age gap between buddies be at most three years for all non-sleeping activities but must be no more than two years for all tenting.',
      ].map((item, i) => (
        <p key={i} style={{ marginBottom: '8px', paddingLeft: '12px', borderLeft: '2px solid #cfb991' }}>
          {item}
        </p>
      ))}
    </div>
  )
}

export default function ImportantInformation() {
  const [activeTab, setActiveTab] = useState<Tab>('Expectations')

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
        {TABS.map((tab) => (
          <TabBtn key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {activeTab === 'Expectations' && <Expectations />}
      {activeTab === 'Pre Reqs and Blue Cards' && <PreReqs />}
      {activeTab === 'Buddy System' && <BuddySystem />}
    </div>
  )
}
