/**
 * Google Drive photo upload service.
 *
 * Behavior:
 *  - If VITE_GOOGLE_CLIENT_ID and VITE_DRIVE_FOLDER_ID are both set in env
 *    AND Google Identity Services is loaded, uploadPhotoToDrive() will:
 *      1. Request an OAuth access token (drive.file scope, popup on first call)
 *      2. Multipart-upload the file into the configured folder
 *      3. Grant 'reader' permission to 'anyone' so the URL works in <img>
 *      4. Return a direct image URL (lh3.googleusercontent.com/d/<id>)
 *  - Otherwise isDriveConfigured() returns false and callers should fall back.
 *
 * To enable Drive uploads in production:
 *  1. Google Cloud Console → APIs & Services → Credentials → Create OAuth Client ID
 *     - Application type: Web application
 *     - Authorized JavaScript origins: your Netlify URL + http://localhost:5173
 *  2. Enable "Google Drive API" in the same project
 *  3. Create a Drive folder ("University of Scouting - Student Photos")
 *     - Right-click → Share → Anyone with link can view (so public images work)
 *     - Copy the folder ID from its URL (the part after /folders/)
 *  4. Set in .env (and Netlify env vars):
 *       VITE_GOOGLE_CLIENT_ID=...apps.googleusercontent.com
 *       VITE_DRIVE_FOLDER_ID=1AbCd...
 */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
const FOLDER_ID = import.meta.env.VITE_DRIVE_FOLDER_ID as string | undefined
const SCOPE = 'https://www.googleapis.com/auth/drive.file'

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: TokenClientConfig) => TokenClient
        }
      }
    }
  }
}

interface TokenClientConfig {
  client_id: string
  scope: string
  callback: (response: TokenResponse) => void
}
interface TokenClient {
  requestAccessToken: (opts?: { prompt?: '' | 'consent' | 'none' }) => void
}
interface TokenResponse {
  access_token?: string
  error?: string
  error_description?: string
}

let cachedToken: { token: string; expiresAt: number } | null = null

/** True when env vars are present and the GIS client script is loaded. */
export function isDriveConfigured(): boolean {
  return Boolean(
    CLIENT_ID &&
    FOLDER_ID &&
    typeof window !== 'undefined' &&
    window.google?.accounts?.oauth2
  )
}

/** Get an OAuth access token (cached in-memory until near-expiry). */
function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return Promise.resolve(cachedToken.token)
  }
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services not loaded'))
      return
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID!,
      scope: SCOPE,
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          reject(new Error(resp.error_description || resp.error || 'OAuth failed'))
          return
        }
        cachedToken = {
          token: resp.access_token,
          // GIS tokens last 1 hour; we conservatively assume 50 min
          expiresAt: Date.now() + 50 * 60 * 1000,
        }
        resolve(resp.access_token)
      },
    })
    // prompt: '' = use cached consent if available, popup otherwise
    client.requestAccessToken({ prompt: '' })
  })
}

/**
 * Upload a photo to the configured Drive folder.
 * Returns a public image URL suitable for <img src>.
 * Throws if Drive isn't configured or any step fails — callers should catch
 * and fall back to localStorage.
 */
export async function uploadPhotoToDrive(file: File, email: string): Promise<string> {
  if (!isDriveConfigured()) {
    throw new Error('Drive not configured (missing VITE_GOOGLE_CLIENT_ID or VITE_DRIVE_FOLDER_ID)')
  }

  const token = await getAccessToken()
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const filename = `${email}.${ext}`

  // Step 1: multipart upload (metadata + binary in one request)
  const metadata = {
    name: filename,
    parents: [FOLDER_ID!],
  }
  const form = new FormData()
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  )
  form.append('file', file)

  const uploadRes = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }
  )
  if (!uploadRes.ok) {
    const errBody = await uploadRes.text().catch(() => '')
    throw new Error(`Drive upload failed (${uploadRes.status}): ${errBody}`)
  }
  const { id } = (await uploadRes.json()) as { id: string }

  // Step 2: grant anyone-with-link read permission so <img> can fetch it
  const permRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${id}/permissions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'reader', type: 'anyone' }),
    }
  )
  if (!permRes.ok) {
    // Upload succeeded but we couldn't make it public — log and continue
    console.warn(`Drive: failed to set public permission on ${id}`)
  }

  // Direct-image URL that works in <img src> without CORS issues.
  // ?sz=w400 gets a 400px-wide variant; remove for full size.
  return `https://lh3.googleusercontent.com/d/${id}=w400`
}
