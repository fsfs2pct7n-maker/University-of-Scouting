import { getStudentEmail, getAdminEmail, getUserRole, isLoggedIn as checkLoggedIn, isAdmin as checkAdmin } from '../utils/auth'

export function useAuth() {
  const studentEmail = getStudentEmail()
  const adminEmail = getAdminEmail()
  const userRole = getUserRole()
  const loggedIn = checkLoggedIn()
  const admin = checkAdmin()

  return {
    isLoggedIn: loggedIn,
    isAdmin: admin,
    studentEmail,
    adminEmail,
    userRole,
    /** The active email regardless of role */
    activeEmail: adminEmail ?? studentEmail,
  }
}
