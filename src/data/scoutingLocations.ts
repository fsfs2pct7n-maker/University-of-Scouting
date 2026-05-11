export interface ScoutingLocation {
  id: string
  code: string
  name: string
  type: 'Classroom' | 'Parking'
  onCampus: boolean
  address: string
  latitude: number
  longitude: number
  classes: string[]
}

export const scoutingLocations: ScoutingLocation[] = [
  // OFF-CAMPUS (30)
  { id: 'glca', code: 'GLCA', name: 'Greater Lafayette Career Academy', type: 'Classroom', onCampus: false, address: '2201 S 18th St, Lafayette, IN 47909', latitude: 40.401876, longitude: -86.874821, classes: [] },
  { id: 'jhs', code: 'JHS', name: 'Jefferson High School', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.387532, longitude: -86.865412, classes: [] },
  { id: 'ghf', code: 'GHF', name: "Geneo's Hunting and Fishing", type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.395678, longitude: -86.884532, classes: [] },
  { id: 'dad', code: 'DAD', name: 'D.A. Dodd', type: 'Classroom', onCampus: false, address: '3416 Rascal Drive, Lafayette, IN 47909', latitude: 40.385448, longitude: -86.854526, classes: [] },
  { id: 'gus', code: 'GUS', name: 'Great United Skates', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.412234, longitude: -86.891234, classes: [] },
  { id: 'ap', code: 'AP', name: 'Anderson Plumbing', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.406745, longitude: -86.892321, classes: [] },
  { id: 'hcc', code: 'HCC', name: 'Halsema Custom Crafts', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.419832, longitude: -86.875621, classes: [] },
  { id: 'gat', code: 'GAT', name: 'Guaranteed Automotive and Transmission', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.393421, longitude: -86.873421, classes: [] },
  { id: 'ci', code: 'CI', name: 'Creative Inc', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.401234, longitude: -86.882654, classes: [] },
  { id: 'tpir', code: 'TPIR', name: 'Tapawingo Park', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.395654, longitude: -86.861234, classes: [] },
  { id: 'wlw', code: 'WLW', name: 'West Lafayette Waste Water', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.383421, longitude: -86.904532, classes: [] },
  { id: 'he', code: 'HE', name: 'Huston Electric', type: 'Classroom', onCampus: false, address: '2723 Old Romney Rd, Lafayette, IN 47909', latitude: 40.390017, longitude: -86.912478, classes: [] },
  { id: 'luab', code: 'LUAB', name: 'Lamkin Union Apprenticeship Building', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.408932, longitude: -86.873421, classes: [] },
  { id: 'adm', code: 'ADM', name: 'ADM Agricultural Innovation Center', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.445632, longitude: -86.921234, classes: [] },
  { id: 'odfl', code: 'ODFL', name: 'Old Dominion Freight Lines', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.371234, longitude: -86.893421, classes: [] },
  { id: 'pa', code: 'PA', name: 'Purdue Airport', type: 'Classroom', onCampus: false, address: '1501 Aviation Dr, West Lafayette, IN 47907', latitude: 40.416363, longitude: -86.930972, classes: [] },
  { id: 'bp', code: 'BP', name: 'Brenneco Plumbing', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.383421, longitude: -86.905632, classes: [] },
  { id: 'cl', code: 'CL', name: 'Climb Lafayette', type: 'Classroom', onCampus: false, address: '4650 Dale Dr, Lafayette, IN 47905', latitude: 40.363163, longitude: -86.815719, classes: [] },
  { id: 'rbh', code: 'RBH', name: 'River Bend Hospital / North Central Health Services', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.371234, longitude: -86.877821, classes: [] },
  { id: 'bbgc', code: 'BBGC', name: 'Birck Boilermaker Golf Complex', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.383421, longitude: -86.923421, classes: [] },
  { id: 'wlfi', code: 'WLFI', name: 'WLFI', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.404532, longitude: -86.884532, classes: [] },
  { id: 'jdwc', code: 'JDWC', name: 'John R. Dennis Wellness Center', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.423421, longitude: -86.907821, classes: [] },
  { id: 'cc', code: 'CC', name: 'Cary Camp', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.387832, longitude: -86.945632, classes: [] },
  { id: 'wfs', code: 'WFS', name: 'Wabash Township Fire Station #1', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.431234, longitude: -86.923421, classes: [] },
  { id: 'hhs', code: 'HHS', name: 'Harrison High School', type: 'Classroom', onCampus: false, address: 'Lafayette, IN', latitude: 40.393421, longitude: -86.853421, classes: [] },
  { id: 'kdc', code: 'KDC', name: 'Klondike Dental Care', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.415632, longitude: -86.895632, classes: [] },
  { id: 'mf', code: 'MF', name: 'Martell Forest', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.435621, longitude: -86.861234, classes: [] },
  { id: 'wah', code: 'WAH', name: 'Wild About Horses Equestrian', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.371234, longitude: -86.907821, classes: [] },
  { id: 'cb', code: 'CB', name: 'Camp Buffalo', type: 'Classroom', onCampus: false, address: 'West Lafayette, IN', latitude: 40.385632, longitude: -86.923421, classes: [] },
  { id: 'ab', code: 'AB', name: 'Applied Ballistics', type: 'Classroom', onCampus: false, address: '3217 Olympia Dr, Lafayette, IN 47909', latitude: 40.376448, longitude: -86.859084, classes: [] },

  // ON-CAMPUS PURDUE (36)
  { id: 'knoy', code: 'KNOY', name: 'Knoy (Maurice G.) Hall of Technology', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.923421, classes: [] },
  { id: 'pmu', code: 'PMU', name: 'Purdue Memorial Union', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.427832, longitude: -86.916754, classes: [] },
  { id: 'pvet', code: 'PVET', name: 'Purdue Charles J. Lynn Hall of Veterinary Medicine', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.417821, longitude: -86.903421, classes: [] },
  { id: 'grissom', code: 'GRISSOM', name: 'Grissom Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.915632, classes: [] },
  { id: 'hb', code: 'HB', name: 'Horticulture Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.422321, longitude: -86.908932, classes: [] },
  { id: 'hg', code: 'HG', name: 'Horticulture Greenhouses', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.912321, classes: [] },
  { id: 'sc', code: 'SC', name: 'Stewart Center', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.920132, classes: [] },
  { id: 'dudley', code: 'DUDLEY', name: 'Dudley Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.928932, classes: [] },
  { id: 'lambertus', code: 'LAMBERTUS', name: 'Lambertus Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.926754, classes: [] },
  { id: 'blab', code: 'BLAB', name: 'Brown (Herbert C.) Laboratory of Chemistry', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.921234, classes: [] },
  { id: 'fb', code: 'FB', name: 'Forestry Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.912321, classes: [] },
  { id: 'abe', code: 'ABE', name: 'Agricultural and Biological Engineering', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.914532, classes: [] },
  { id: 'pfah', code: 'PFAH', name: 'David C. Pfendler Hall of Agriculture', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.908932, classes: [] },
  { id: 'wetherill', code: 'WETHERILL', name: 'Wetherill Lab of Chemistry', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.916754, classes: [] },
  { id: 'wesh', code: 'WESH', name: 'Winthrop E. Stone Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.923421, classes: [] },
  { id: 'mee', code: 'MEE', name: 'Max W. and Maileen Brown Family Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.930132, classes: [] },
  { id: 'walc', code: 'WALC', name: 'Wilmeth Active Learning Center', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.422321, longitude: -86.920132, classes: [] },
  { id: 'meb', code: 'MEB', name: 'Mechanical Engineering Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.916754, classes: [] },
  { id: 'sch', code: 'SCH', name: 'Stanley Coulter Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.930132, classes: [] },
  { id: 'hbsh', code: 'HBSH', name: 'Helen B. Schleman Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.921234, classes: [] },
  { id: 'mee2', code: 'MEE2', name: 'Materials and Electrical Engineering', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.915632, classes: [] },
  { id: 'c1950', code: 'C1950', name: 'Class of 1950 Lecture Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.923421, classes: [] },
  { id: 'beering', code: 'BEERING', name: 'Beering (Steven C.) Hall of Liberal Arts and Education', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.908932, classes: [] },
  { id: 'msb', code: 'MSB', name: 'Mathematical Sciences Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.914532, classes: [] },
  { id: 'hls', code: 'HLS', name: 'Hall of Life Sciences', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.926754, classes: [] },
  { id: 'slwh', code: 'SLWH', name: 'Seng-Liang Wang Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.422321, longitude: -86.928932, classes: [] },
  { id: 'ehm', code: 'EHM', name: 'Elliot Hall of Music', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.916754, classes: [] },
  { id: 'fhce', code: 'FHCE', name: 'Forney Hall of Chemical Engineering', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.908932, classes: [] },
  { id: 'pb', code: 'PB', name: 'Physics Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.912321, classes: [] },
  { id: 'dhce', code: 'DHCE', name: 'Delon and Elizabeth Hampton Hall of Civil Engineering', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.921234, classes: [] },
  { id: 'lawson', code: 'LAWSON', name: 'Lawson Computer Science Building', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.915632, classes: [] },
  { id: 'nahe', code: 'NAHE', name: 'Neil Armstrong Hall of Engineering', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.923421, classes: [] },
  { id: 'mshale', code: 'MSHALE', name: 'Marc and Sharon Hagle Hall', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.422321, longitude: -86.914532, classes: [] },
  { id: 'optd', code: 'OPTD', name: 'Oliver Perkins Terry House (Police Department)', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.921234, classes: [] },
  { id: 'corec', code: 'COREC', name: 'CoRec', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.417821, longitude: -86.908932, classes: [] },
  { id: 'pfd', code: 'PFD', name: 'Purdue Fire Department', type: 'Classroom', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.908932, classes: [] },

  // PARKING (10)
  { id: 'wsg', code: 'WSG', name: 'Wood Street Garage', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.930132, classes: [] },
  { id: 'marsteller', code: 'MARSTELLER', name: 'Marsteller Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.921234, classes: [] },
  { id: 'ag', code: 'AG', name: 'Agriculture Mall Drive & S University Street Parking', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.915632, classes: [] },
  { id: 'russell', code: 'RUSSELL', name: 'Russell Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.925632, classes: [] },
  { id: 'usg', code: 'USG', name: 'University Street Parking Garage', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.426754, longitude: -86.933421, classes: [] },
  { id: 'laa', code: 'LAA', name: 'Lawson/AA Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.423432, longitude: -86.926754, classes: [] },
  { id: 'discovery', code: 'DISCOVERY', name: 'Discovery Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.420132, longitude: -86.930132, classes: [] },
  { id: 'bb', code: 'BB', name: 'BB Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.431234, longitude: -86.914532, classes: [] },
  { id: 'rankin', code: 'RANKIN', name: 'Rankin Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.428932, longitude: -86.921234, classes: [] },
  { id: 'corec_p', code: 'COREC_P', name: 'CoRec Parking Lot', type: 'Parking', onCampus: true, address: 'Purdue University, West Lafayette, IN 47906', latitude: 40.417821, longitude: -86.914532, classes: [] },

  // ARMORY
  { id: 'armory', code: 'AR', name: 'Armory', type: 'Classroom', onCampus: true, address: '812 3rd Street, West Lafayette, IN 47907', latitude: 40.428079, longitude: -86.916325, classes: [] },
]
