import { validateStudent } from './validation'
import { BADGE_NAMES } from '../data/badges'
import type { StudentRecord } from './auth'

export type CsvRow = {
  email: string
  classes: string[]
  lunch: string
}

export type CsvError = {
  row: number
  line: string
  error: string
}

export type ParseResult = {
  valid: StudentRecord[]
  errors: CsvError[]
  totalRows: number
}

/** Parse a single CSV line handling quoted fields (RFC 4180) */
export function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      // Handle escaped quote ""
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current.trim())
  return fields
}

/** Parse a full CSV file string into validated student records */
export function parseCSV(fileContent: string): ParseResult {
  // Normalize line endings
  const lines = fileContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')

  const valid: StudentRecord[] = []
  const errors: CsvError[] = []

  // Skip header row (first line) and blank lines
  const dataLines = lines.slice(1).filter(l => l.trim() !== '')
  const totalRows = dataLines.length

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i]
    const rowNum = i + 2 // +2 because 1-indexed and skipped header

    let fields: string[]
    try {
      fields = parseCSVLine(line)
    } catch {
      errors.push({ row: rowNum, line, error: 'Could not parse this row.' })
      continue
    }

    if (fields.length < 3) {
      errors.push({ row: rowNum, line, error: `Expected 3 columns (email, classes, lunch), got ${fields.length}.` })
      continue
    }

    const email = fields[0].toLowerCase().trim()
    const classesRaw = fields[1].trim()
    const lunch = fields[2].trim()

    // Parse classes — may be a single value or comma-separated list
    const classes = classesRaw
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0)

    // Validate
    const v = validateStudent(email, classes, lunch)
    if (!v.isValid) {
      const msgs = [v.errors.email, v.errors.classes, v.errors.lunch].filter(Boolean)
      errors.push({ row: rowNum, line, error: msgs.join(' · ') })
      continue
    }

    // Warn about unknown class names (but still import)
    const unknownClasses = classes.filter(c => !BADGE_NAMES.includes(c))
    if (unknownClasses.length > 0) {
      errors.push({
        row: rowNum,
        line,
        error: `Warning: Unknown class(es): ${unknownClasses.join(', ')}. Row imported anyway.`,
      })
    }

    valid.push({ email, classes, lunch })
  }

  return { valid, errors, totalRows }
}

/** Generate a sample CSV string the admin can download as a template */
export function generateCSVTemplate(): string {
  const header = 'email,classes,lunch'
  const examples = [
    `student1@example.com,"Farm Mechanics,Aviation",Turkey Sack Lunch`,
    `student2@example.com,"Communications",Vegan Lunch`,
    `student3@example.com,"Public Health,First Aid",Ham Sack Lunch`,
  ]
  return [header, ...examples].join('\n')
}
