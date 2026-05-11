export const LUNCH_OPTIONS = [
  'Turkey Sack Lunch',
  'Ham Sack Lunch',
  'Vegan Lunch',
  'Pack Your Own Lunch',
]

export function validateEmail(email: string): { isValid: boolean; error: string } {
  if (!email.trim()) return { isValid: false, error: 'Please enter an email address.' }
  const trimmed = email.trim()
  if (!trimmed.includes('@') || !trimmed.includes('.')) {
    return { isValid: false, error: 'Please enter a valid email address.' }
  }
  return { isValid: true, error: '' }
}

export function validateClasses(classes: string[]): { isValid: boolean; error: string } {
  if (!classes || classes.length === 0) {
    return { isValid: false, error: 'Please select at least one class.' }
  }
  return { isValid: true, error: '' }
}

export function validateLunch(lunch: string): { isValid: boolean; error: string } {
  if (!lunch) return { isValid: false, error: 'Please select a lunch option.' }
  if (!LUNCH_OPTIONS.includes(lunch)) {
    return { isValid: false, error: 'Please select a valid lunch option.' }
  }
  return { isValid: true, error: '' }
}

export function validateStudent(
  email: string,
  classes: string[],
  lunch: string,
): { isValid: boolean; errors: { email: string; classes: string; lunch: string } } {
  const ev = validateEmail(email)
  const cv = validateClasses(classes)
  const lv = validateLunch(lunch)
  return {
    isValid: ev.isValid && cv.isValid && lv.isValid,
    errors: { email: ev.error, classes: cv.error, lunch: lv.error },
  }
}
