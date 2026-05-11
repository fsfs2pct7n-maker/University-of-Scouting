export type Badge = {
  name: string
  time: string
  room: string
  instructor: string
}

export const BADGES: Badge[] = [
  { name: 'Farm Mechanics', time: '9:00 AM', room: 'ABE 1164', instructor: 'Roger Tormoehlen' },
  { name: 'Aviation', time: '9:00 AM', room: 'Airport', instructor: 'Anthony Clevinger' },
  { name: 'Plumbing with Zane Anderson', time: '9:00 AM', room: 'Anderson Plumbing', instructor: 'Zane Anderson' },
  { name: 'Citizenship in Society with Ebony Barrett', time: '9:00 AM', room: 'ARMS 1021', instructor: 'Ebony Barrett' },
  { name: 'Citizenship in the World with Mike Ferris', time: '9:00 AM', room: 'ARMS 1028', instructor: 'Mike Ferris' },
  { name: 'Animal Science', time: '9:00 AM', room: 'ARMS 1103', instructor: 'Amber Brad' },
  { name: 'Insect Study', time: '9:00 AM', room: 'ARMS 1109', instructor: 'Dean Brad' },
  { name: 'American Business', time: '9:00 AM', room: 'ARMS 3109', instructor: 'Sanford Swanson' },
  { name: 'Fire Safety', time: '9:00 AM', room: 'FIRE DEPT.', instructor: 'Mike Dwyer' },
  { name: 'Model Design and Building', time: '9:00 AM', room: 'ARMS B071', instructor: 'Brad Shafer' },
  { name: 'Citizenship in the Nation with Angel Valentin', time: '9:00 AM', room: 'BHEE 117', instructor: 'Angel Valentin' },
  { name: 'Cycling', time: '9:00 AM', room: 'BHEE 129', instructor: 'Bob Burchell' },
  { name: 'Sustainability with Kevin Bump', time: '9:00 AM', room: 'BHEE 222', instructor: 'Kevin Bump' },
  { name: 'Backpacking & Hiking Combo', time: '9:00 AM', room: 'BHEE 224', instructor: 'Daniel Dehn' },
  { name: 'American Heritage', time: '9:00 AM', room: 'BHEE 226', instructor: 'Chris Cordray' },
  { name: 'Disabilities Awareness', time: '9:00 AM', room: 'BHEE 234', instructor: 'Tom Hoffer' },
  { name: 'Soil and Water Conservation', time: '9:00 AM', room: 'BHEE 236', instructor: 'Mike Smith' },
  { name: 'Plumbing with Randy Lynch', time: '9:00 AM', room: 'Brenneco Plumbing', instructor: 'Randy Lynch' },
  { name: 'Personal Management with Trent Hanthorn', time: '9:00 AM', room: 'BRNG 1206', instructor: 'Trent Hanthorn' },
  { name: 'Engineering With Purdue American Nuclear Society', time: '9:00 AM', room: 'BRNG 1222', instructor: 'Charles Behrman & Shivam Dave' },
  { name: 'Electricity', time: '9:00 AM', room: 'BRNG 2290', instructor: 'Rob Koester' },
  { name: 'Programming', time: '9:00 AM', room: 'BRNG 2298', instructor: 'Noraa Silver' },
  { name: 'Space Exploration', time: '9:00 AM', room: 'CL50 224', instructor: 'Scott Semeyn' },
  { name: 'Chess', time: '9:00 AM', room: 'CL50 320', instructor: 'Keith Bays' },
  { name: 'Salesmanship', time: '9:00 AM', room: 'DUDL G162', instructor: 'Steve Haggerty' },
  { name: 'Genealogy', time: '9:00 AM', room: 'DUDL G164', instructor: 'Susan Harley' },
  { name: 'Metalwork', time: '9:00 AM', room: 'KNOY B004', instructor: 'Mike Rumer' },
  { name: 'Woodwork', time: '9:00 AM', room: 'KNOY B006', instructor: 'Tim Hayworth' },
  { name: 'Photography', time: '9:00 AM', room: 'LILY 1105', instructor: 'Tom Donoho' },
  { name: 'Nature', time: '9:00 AM', room: 'LILY G126', instructor: 'Jeff Plocher' },
  { name: 'Signs Signals and Codes', time: '9:00 AM', room: 'ME 1051', instructor: 'Brian Baumgartner' },
  { name: 'Welding', time: '9:00 AM', room: 'ME 1052', instructor: 'David Selig' },
  { name: 'Environmental Science', time: '9:00 AM', room: 'MJIS 1001', instructor: 'Mike Heinz' },
  { name: 'Nuclear Science', time: '9:00 AM', room: 'NUCL 1154', instructor: 'Shivam Dave' },
  { name: 'Communications', time: '1:00 PM', room: 'ARMS 1021', instructor: 'Ebony Barrett' },
  { name: 'Public Health', time: '1:00 PM', room: 'ARMS 1028', instructor: 'Mike Ferris' },
  { name: 'Veterinary Medicine', time: '1:00 PM', room: 'ARMS 1103', instructor: 'Amber Brad' },
  { name: 'Horsemanship', time: '1:00 PM', room: 'ARMS 1109', instructor: 'Dean Brad' },
  { name: 'Personal Fitness', time: '1:00 PM', room: 'BHEE 117', instructor: 'Angel Valentin' },
  { name: 'First Aid', time: '1:00 PM', room: 'BHEE 129', instructor: 'Bob Burchell' },
]

export const BADGE_NAMES = BADGES.map(b => b.name)
