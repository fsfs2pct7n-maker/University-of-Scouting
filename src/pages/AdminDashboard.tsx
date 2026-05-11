import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, UserPlus, Users, Trash2, Pencil, X, RotateCcw, AlertTriangle, Bell, Upload, Download, Send, FileDown } from 'lucide-react'
import { getStudentData, saveStudentData, clearSession, saveAdminNotification, type StudentRecord } from '../utils/auth'
import { BADGES, BADGE_NAMES } from '../data/badges'
import { validateStudent, LUNCH_OPTIONS } from '../utils/validation'
import { parseCSV, generateCSVTemplate, type CsvError } from '../utils/csvParser'
import { exportStudentsCSV, exportNotificationsCSV, exportSystemSummary } from '../services/exportService'
import { sendNotification, getPermission, requestPermission } from '../services/notificationService'

// ── Constants ────────────────────────────────────────────────────
const MORNING_BADGES = BADGES.filter(b => b.time === '9:00 AM').map(b => b.name)
const AFTERNOON_BADGES = BADGES.filter(b => b.time !== '9:00 AM').map(b => b.name)

type FormState = { email: string; classes: string[]; lunch: string }
type FormErrors = { email: string; classes: string; lunch: string }
const EMPTY_FORM: FormState = { email: '', classes: [], lunch: '' }
const EMPTY_ERRORS: FormErrors = { email: '', classes: '', lunch: '' }

// ── Main component ───────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userRole') !== 'admin') navigate('/', { replace: true })
  }, [navigate])

  const adminEmail = localStorage.getItem('adminEmail') ?? ''

  const [students, setStudents] = useState<StudentRecord[]>(() =>
    getStudentData().map(s => ({ ...s, lunch: s.lunch ?? '' }))
  )

  // Add form
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS)
  const [addSuccess, setAddSuccess] = useState('')

  // Edit modal
  const [editStudent, setEditStudent] = useState<StudentRecord | null>(null)
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM)
  const [editErrors, setEditErrors] = useState<FormErrors>(EMPTY_ERRORS)

  // Delete confirmation
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null)

  // Toast
  const [toast, setToast] = useState('')

  // Send Notification
  const [notifTitle, setNotifTitle] = useState('')
  const [notifBody, setNotifBody] = useState('')
  const [notifType, setNotifType] = useState<'alert' | 'info'>('info')
  const [notifTarget, setNotifTarget] = useState('all')
  const [notifSent, setNotifSent] = useState('')

  // CSV Import
  const csvInputRef = useRef<HTMLInputElement>(null)
  type CsvState = { status: 'idle' | 'parsed'; valid: StudentRecord[]; errors: CsvError[]; totalRows: number }
  const [csvState, setCsvState] = useState<CsvState>({ status: 'idle', valid: [], errors: [], totalRows: 0 })

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function refreshStudents() {
    setStudents(getStudentData().map(s => ({ ...s, lunch: s.lunch ?? '' })))
  }

  function toggleClass(name: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(name) ? list.filter(c => c !== name) : [...list, name])
  }

  // ── Add student ──────────────────────────────────────────────
  function handleAdd() {
    const v = validateStudent(form.email, form.classes, form.lunch)
    if (!v.isValid) { setErrors(v.errors); return }
    const existing = getStudentData()
    if (existing.find(s => s.email.toLowerCase() === form.email.trim().toLowerCase())) {
      setErrors({ ...EMPTY_ERRORS, email: 'This email already exists. Use Manage Students to edit.' })
      return
    }
    const updated: StudentRecord[] = [
      ...existing,
      { email: form.email.trim().toLowerCase(), classes: form.classes, lunch: form.lunch },
    ]
    saveStudentData(updated)
    refreshStudents()
    setAddSuccess(`"${form.email.trim()}" added successfully!`)
    setTimeout(() => setAddSuccess(''), 4000)
    setForm(EMPTY_FORM)
    setErrors(EMPTY_ERRORS)
  }

  // ── Edit student ─────────────────────────────────────────────
  function openEdit(s: StudentRecord) {
    setEditStudent(s)
    setEditForm({ email: s.email, classes: s.classes, lunch: s.lunch ?? '' })
    setEditErrors(EMPTY_ERRORS)
  }

  function handleSaveEdit() {
    if (!editStudent) return
    const v = validateStudent(editForm.email, editForm.classes, editForm.lunch)
    if (!v.isValid) { setEditErrors(v.errors); return }
    const existing = getStudentData()
    const updated = existing.map(s =>
      s.email === editStudent.email
        ? { email: editForm.email.trim().toLowerCase(), classes: editForm.classes, lunch: editForm.lunch }
        : s
    )
    saveStudentData(updated)
    refreshStudents()
    setEditStudent(null)
    showToast('Student updated successfully.')
  }

  // ── Delete student ───────────────────────────────────────────
  function handleDelete() {
    if (!deleteEmail) return
    const updated = getStudentData().filter(s => s.email !== deleteEmail)
    saveStudentData(updated)
    refreshStudents()
    setDeleteEmail(null)
    showToast('Student deleted.')
  }

  // ── Send Notification ────────────────────────────────────────
  function handleSendNotification() {
    if (!notifTitle.trim() || !notifBody.trim()) {
      showToast('Please fill in title and message.')
      return
    }
    const now = new Date()
    const date = now.toLocaleString('en-US', {
      month: 'numeric', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
    })
    saveAdminNotification({
      id: `notif-${Date.now()}`,
      date,
      title: notifTitle.trim(),
      body: notifBody.trim(),
      type: notifType,
      target: notifTarget,
      sentAt: now.getTime(),
    })
    // Fire browser notification if permission granted
    if (getPermission() === 'granted') {
      sendNotification(notifTitle.trim(), notifBody.trim())
    }
    setNotifTitle('')
    setNotifBody('')
    setNotifSent(`Notification sent at ${date}`)
    setTimeout(() => setNotifSent(''), 5000)
    showToast('Notification sent!')
  }

  // ── CSV Import ───────────────────────────────────────────────
  function handleCSVFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const content = ev.target?.result as string
      const result = parseCSV(content)
      setCsvState({ status: 'parsed', ...result })
    }
    reader.readAsText(file)
    // Reset so same file can be re-selected
    e.target.value = ''
  }

  function handleCSVImport() {
    if (csvState.valid.length === 0) return
    const existing = getStudentData()
    const existingEmails = new Set(existing.map(s => s.email))
    const newStudents = csvState.valid.filter(s => !existingEmails.has(s.email))
    const updated = [...existing, ...newStudents]
    saveStudentData(updated)
    refreshStudents()
    showToast(`${newStudents.length} students imported (${csvState.valid.length - newStudents.length} duplicates skipped).`)
    setCsvState({ status: 'idle', valid: [], errors: [], totalRows: 0 })
  }

  function downloadTemplate() {
    const content = generateCSVTemplate()
    const blob = new Blob([content], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'uos-import-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Request notification permission ─────────────────────────
  async function handleEnableNotifications() {
    const perm = await requestPermission()
    showToast(perm === 'granted' ? 'Browser notifications enabled!' : 'Notification permission denied.')
  }

  function handleLogout() {
    clearSession()
    navigate('/login', { replace: true })
  }

  // ── Render ───────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f0e8', paddingBottom: '40px' }}>

      {/* ── Top bar ── */}
      <div style={topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/seal.png" alt="" style={{ width: '28px', height: '28px' }}
            onError={e => { e.currentTarget.style.display = 'none' }} />
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              Admin Dashboard
            </div>
            {adminEmail && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1 }}>
                {adminEmail}
              </div>
            )}
          </div>
        </div>
        <button onClick={handleLogout} style={logoutBtn}>
          <LogOut size={15} /> Logout
        </button>
      </div>

      {/* ── Main content ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── LEFT: Add Student form ── */}
        <div style={{ flex: '0 0 340px', minWidth: '280px' }}>
          <SectionCard icon={<UserPlus size={17} color="#cfb991" />} title="Add New Student">
            {/* Email */}
            <FieldLabel>Student Email</FieldLabel>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="student@example.com"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
              onBlur={e => { e.currentTarget.style.borderColor = errors.email ? '#e05252' : '#e0d9cf' }}
            />
            {errors.email && <ErrMsg>{errors.email}</ErrMsg>}

            {/* Classes */}
            <FieldLabel style={{ marginTop: '14px' }}>
              Classes Registered For ({form.classes.length} selected)
            </FieldLabel>
            <ClassPicker
              selected={form.classes}
              onToggle={name => toggleClass(name, form.classes, cls => setForm(f => ({ ...f, classes: cls })))}
              hasError={!!errors.classes}
            />
            {errors.classes && <ErrMsg>{errors.classes}</ErrMsg>}

            {/* Lunch */}
            <FieldLabel style={{ marginTop: '14px' }}>Lunch Preference</FieldLabel>
            <LunchPicker
              value={form.lunch}
              onChange={lunch => setForm(f => ({ ...f, lunch }))}
              hasError={!!errors.lunch}
            />
            {errors.lunch && <ErrMsg>{errors.lunch}</ErrMsg>}

            {addSuccess && (
              <p style={{ fontSize: '13px', color: '#3c8f5c', marginTop: '10px', fontWeight: 600 }}>
                ✓ {addSuccess}
              </p>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button onClick={handleAdd} style={btnPrimary}>
                Add Student
              </button>
              <button
                onClick={() => { setForm(EMPTY_FORM); setErrors(EMPTY_ERRORS); setAddSuccess('') }}
                style={btnGhost}
              >
                <RotateCcw size={14} /> Clear
              </button>
            </div>
          </SectionCard>
        </div>

        {/* ── RIGHT: Manage Students table ── */}
        <div style={{ flex: '1 1 380px', minWidth: '280px' }}>
          <SectionCard
            icon={<Users size={17} color="#cfb991" />}
            title="Manage Students"
            badge={`${students.length} student${students.length !== 1 ? 's' : ''}`}
          >
            {students.length === 0 ? (
              <div style={{ padding: '32px 0', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
                No students added yet.
                <br />
                <span style={{ fontSize: '12px' }}>Use the form to add your first student.</span>
              </div>
            ) : (
              <div style={{ overflowX: 'auto', margin: '0 -18px', padding: '0 18px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#cfb991' }}>
                      {['Email', 'Classes', 'Lunch', 'Actions'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr
                        key={s.email}
                        style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fdfaf6', verticalAlign: 'top' }}
                      >
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 600, fontSize: '13px', wordBreak: 'break-all' }}>
                            {s.email}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, maxWidth: '180px' }}>
                          <span style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>
                            {s.classes.length === 0 ? '—' : s.classes.join(', ')}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span style={{ fontSize: '12px', color: '#555' }}>
                            {s.lunch || '—'}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => openEdit(s)}
                              title="Edit"
                              style={{ ...iconBtn, backgroundColor: '#f7f2eb', borderColor: '#e8dcc5' }}
                            >
                              <Pencil size={13} color="#cfb991" />
                            </button>
                            <button
                              onClick={() => setDeleteEmail(s.email)}
                              title="Delete"
                              style={{ ...iconBtn, backgroundColor: '#fff0f0', borderColor: '#ffd6d6' }}
                            >
                              <Trash2 size={13} color="#e05252" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      {/* ── Bottom sections (full width) ── */}
      <div style={{ padding: '0 16px 16px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* ── Send Notification ── */}
        <SectionCard icon={<Bell size={17} color="#cfb991" />} title="Send Notification">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {/* Left col */}
            <div style={{ flex: '1 1 260px', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <FieldLabel>Title</FieldLabel>
                <input
                  type="text"
                  value={notifTitle}
                  onChange={e => setNotifTitle(e.target.value)}
                  placeholder="e.g. Aviation Class Cancelled"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
                />
              </div>
              <div>
                <FieldLabel>Message</FieldLabel>
                <textarea
                  value={notifBody}
                  onChange={e => setNotifBody(e.target.value)}
                  placeholder="Enter the full notification message..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
                />
              </div>
            </div>
            {/* Right col */}
            <div style={{ flex: '0 0 200px', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <FieldLabel>Type</FieldLabel>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['alert', 'info'] as const).map(t => (
                    <label key={t} style={{
                      flex: 1, display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '7px 10px', border: `1.5px solid ${notifType === t ? '#cfb991' : '#e0d9cf'}`,
                      borderRadius: '7px', cursor: 'pointer', backgroundColor: notifType === t ? '#f7f2eb' : '#fafaf8',
                    }}>
                      <input type="radio" name="notif-type" checked={notifType === t}
                        onChange={() => setNotifType(t)} style={{ accentColor: '#cfb991' }} />
                      <span style={{ fontSize: '13px', textTransform: 'capitalize', color: '#3a2e1e' }}>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Target</FieldLabel>
                <select
                  value={notifTarget}
                  onChange={e => setNotifTarget(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="all">All Students</option>
                  {BADGE_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <button onClick={handleSendNotification} style={{ ...btnPrimary, marginTop: 'auto' }}>
                <Send size={14} /> Send
              </button>
            </div>
          </div>
          {notifSent && <p style={{ fontSize: '12px', color: '#3c8f5c', marginTop: '10px', fontWeight: 600 }}>✓ {notifSent}</p>}
          {getPermission() !== 'granted' && (
            <p style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
              <button onClick={handleEnableNotifications} style={{ background: 'none', border: 'none', color: '#cfb991', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}>
                Enable browser notifications
              </button>
              {' '}to also push alerts to devices.
            </p>
          )}
        </SectionCard>

        {/* ── CSV Bulk Import ── */}
        <SectionCard icon={<Upload size={17} color="#cfb991" />} title="Bulk Import Students (CSV)">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <input ref={csvInputRef} type="file" accept=".csv" onChange={handleCSVFile} style={{ display: 'none' }} />
            <button onClick={() => csvInputRef.current?.click()} style={btnPrimary}>
              <Upload size={14} /> Choose CSV File
            </button>
            <button onClick={downloadTemplate} style={btnGhost}>
              <FileDown size={14} /> Download Template
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#aaa', marginBottom: '14px', lineHeight: 1.5 }}>
            CSV format: <code style={{ backgroundColor: '#f5f0e8', padding: '1px 4px', borderRadius: '3px' }}>email,classes,lunch</code>
            {' '}— classes are comma-separated and must be quoted if multiple.
          </p>

          {csvState.status === 'parsed' && (
            <div>
              {/* Summary */}
              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px',
                padding: '12px 14px', backgroundColor: '#f7f2eb', borderRadius: '8px', border: '1px solid #e8dcc5',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#3a2e1e' }}>{csvState.totalRows}</p>
                  <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>Total Rows</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#3c8f5c' }}>{csvState.valid.length}</p>
                  <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>Valid</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#e05252' }}>{csvState.errors.length}</p>
                  <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>Errors</p>
                </div>
              </div>

              {/* Errors */}
              {csvState.errors.length > 0 && (
                <div style={{ marginBottom: '12px', maxHeight: '160px', overflowY: 'auto', border: '1px solid #ffd6d6', borderRadius: '8px' }}>
                  {csvState.errors.map((err, i) => (
                    <div key={i} style={{ padding: '7px 12px', borderBottom: '1px solid #fff0f0', backgroundColor: i % 2 === 0 ? '#fff' : '#fffafa' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#e05252', marginRight: '8px' }}>Row {err.row}</span>
                      <span style={{ fontSize: '12px', color: '#888' }}>{err.error}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCSVImport}
                  disabled={csvState.valid.length === 0}
                  style={{ ...btnPrimary, opacity: csvState.valid.length === 0 ? 0.5 : 1 }}
                >
                  Import {csvState.valid.length} Valid Students
                </button>
                <button onClick={() => setCsvState({ status: 'idle', valid: [], errors: [], totalRows: 0 })} style={btnGhost}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </SectionCard>

        {/* ── Data Export ── */}
        <SectionCard icon={<Download size={17} color="#cfb991" />} title="Export Data">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={exportStudentsCSV} style={btnPrimary}>
              <FileDown size={14} /> Download Student Data (.csv)
            </button>
            <button onClick={exportNotificationsCSV} style={{ ...btnGhost, color: '#cfb991', borderColor: '#cfb991' }}>
              <FileDown size={14} /> Download Notifications (.csv)
            </button>
            <button onClick={exportSystemSummary} style={{ ...btnGhost, color: '#888', borderColor: '#ddd' }}>
              <FileDown size={14} /> System Summary (.txt)
            </button>
          </div>
          <p style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
            Student export includes email, classes, and lunch. System summary shows totals and lunch breakdown.
          </p>
        </SectionCard>
      </div>

      {/* ── Edit Modal ── */}
      {editStudent && (
        <Overlay onClick={() => setEditStudent(null)}>
          <div
            style={modalCard}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#3a2e1e' }}>
                Edit Student
              </h3>
              <button onClick={() => setEditStudent(null)} style={closeBtn}><X size={18} /></button>
            </div>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '16px', marginTop: '-12px' }}>
              {editStudent.email}
            </p>

            <FieldLabel>Student Email</FieldLabel>
            <input
              type="email"
              value={editForm.email}
              onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = '#cfb991' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e0d9cf' }}
            />
            {editErrors.email && <ErrMsg>{editErrors.email}</ErrMsg>}

            <FieldLabel style={{ marginTop: '14px' }}>
              Classes ({editForm.classes.length} selected)
            </FieldLabel>
            <ClassPicker
              selected={editForm.classes}
              onToggle={name => toggleClass(name, editForm.classes, cls => setEditForm(f => ({ ...f, classes: cls })))}
              hasError={!!editErrors.classes}
            />
            {editErrors.classes && <ErrMsg>{editErrors.classes}</ErrMsg>}

            <FieldLabel style={{ marginTop: '14px' }}>Lunch Preference</FieldLabel>
            <LunchPicker
              value={editForm.lunch}
              onChange={lunch => setEditForm(f => ({ ...f, lunch }))}
              hasError={!!editErrors.lunch}
            />
            {editErrors.lunch && <ErrMsg>{editErrors.lunch}</ErrMsg>}

            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button onClick={handleSaveEdit} style={btnPrimary}>Save Changes</button>
              <button onClick={() => setEditStudent(null)} style={btnGhost}>Cancel</button>
            </div>
          </div>
        </Overlay>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteEmail && (
        <Overlay onClick={() => setDeleteEmail(null)}>
          <div style={{ ...modalCard, maxWidth: '360px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={22} color="#e05252" />
              </div>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#3a2e1e', marginBottom: '8px' }}>
              Delete Student?
            </h3>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, marginBottom: '20px' }}>
              Are you sure you want to delete <strong>{deleteEmail}</strong>?
              <br />This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleDelete}
                style={{ ...btnPrimary, flex: 1, backgroundColor: '#e05252' }}
              >
                Delete
              </button>
              <button onClick={() => setDeleteEmail(null)} style={{ ...btnGhost, flex: 1 }}>
                Cancel
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#3a2e1e',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '24px',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          zIndex: 9999,
          whiteSpace: 'nowrap',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────

function SectionCard({
  icon, title, badge, children,
}: { icon: React.ReactNode; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      border: '1px solid #f0ece5',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '13px 18px',
        borderBottom: '1px solid #f0ece5',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {icon}
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#3a2e1e' }}>{title}</span>
        {badge && (
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999', fontWeight: 600 }}>
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding: '18px' }}>{children}</div>
    </div>
  )
}

function ClassPicker({
  selected, onToggle, hasError,
}: { selected: string[]; onToggle: (n: string) => void; hasError: boolean }) {
  return (
    <div style={{
      border: `1.5px solid ${hasError ? '#e05252' : '#e0d9cf'}`,
      borderRadius: '8px',
      backgroundColor: '#fafaf8',
      maxHeight: '220px',
      overflowY: 'auto',
    }}>
      <GroupHeader>Morning (9:00 AM)</GroupHeader>
      {MORNING_BADGES.map(name => (
        <CheckRow key={name} name={name} checked={selected.includes(name)} onToggle={onToggle} />
      ))}
      <GroupHeader>Afternoon (1:00 PM)</GroupHeader>
      {AFTERNOON_BADGES.map(name => (
        <CheckRow key={name} name={name} checked={selected.includes(name)} onToggle={onToggle} />
      ))}
    </div>
  )
}

function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '5px 12px 4px', backgroundColor: '#f0ece5' }}>
      <span style={{ fontSize: '10px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {children}
      </span>
    </div>
  )
}

function CheckRow({ name, checked, onToggle }: { name: string; checked: boolean; onToggle: (n: string) => void }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '6px 12px',
      cursor: 'pointer',
      backgroundColor: checked ? '#f7f2eb' : 'transparent',
      borderBottom: '1px solid #f5f0e8',
      transition: 'background-color 100ms',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(name)}
        style={{ accentColor: '#cfb991', width: '14px', height: '14px', flexShrink: 0 }}
      />
      <span style={{ fontSize: '13px', color: '#3a2e1e', lineHeight: 1.3 }}>{name}</span>
    </label>
  )
}

function LunchPicker({
  value, onChange, hasError,
}: { value: string; onChange: (v: string) => void; hasError: boolean }) {
  return (
    <div style={{
      border: `1.5px solid ${hasError ? '#e05252' : '#e0d9cf'}`,
      borderRadius: '8px',
      backgroundColor: '#fafaf8',
      overflow: 'hidden',
    }}>
      {LUNCH_OPTIONS.map(option => (
        <label key={option} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          cursor: 'pointer',
          backgroundColor: value === option ? '#f7f2eb' : 'transparent',
          borderBottom: '1px solid #f5f0e8',
          transition: 'background-color 100ms',
        }}>
          <input
            type="radio"
            name="lunch-picker"
            checked={value === option}
            onChange={() => onChange(option)}
            style={{ accentColor: '#cfb991', width: '14px', height: '14px', flexShrink: 0 }}
          />
          <span style={{ fontSize: '13px', color: '#3a2e1e' }}>{option}</span>
        </label>
      ))}
    </div>
  )
}

function Overlay({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {children}
    </div>
  )
}

function FieldLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <label style={{
      display: 'block',
      fontSize: '11px',
      fontWeight: 700,
      color: '#666',
      marginBottom: '6px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      ...style,
    }}>
      {children}
    </label>
  )
}

function ErrMsg({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '12px', color: '#e05252', marginTop: '5px' }}>{children}</p>
}

// ── Shared styles ─────────────────────────────────────────────────
const topBar: React.CSSProperties = {
  backgroundColor: '#cfb991',
  padding: '12px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
}

const logoutBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: 'rgba(255,255,255,0.25)',
  border: '1px solid rgba(255,255,255,0.4)',
  borderRadius: '8px',
  padding: '7px 12px',
  color: '#fff',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  fontSize: '14px',
  border: '1.5px solid #e0d9cf',
  borderRadius: '8px',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#333',
  backgroundColor: '#fafaf8',
  transition: 'border-color 150ms',
}

const btnPrimary: React.CSSProperties = {
  flex: 1,
  padding: '10px 16px',
  backgroundColor: '#cfb991',
  color: '#fff',
  fontWeight: 700,
  fontSize: '14px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
}

const btnGhost: React.CSSProperties = {
  padding: '10px 14px',
  backgroundColor: 'transparent',
  color: '#888',
  fontWeight: 600,
  fontSize: '13px',
  border: '1.5px solid #e0d9cf',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
}

const thStyle: React.CSSProperties = {
  padding: '9px 12px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 700,
  color: '#fff',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '13px',
  color: 'var(--text)',
  borderBottom: '1px solid #f5f0e8',
}

const iconBtn: React.CSSProperties = {
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #e8dcc5',
  borderRadius: '6px',
  cursor: 'pointer',
  padding: 0,
}

const modalCard: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '14px',
  width: '100%',
  maxWidth: '520px',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: '24px',
  boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
}

const closeBtn: React.CSSProperties = {
  width: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #e0d9cf',
  borderRadius: '6px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#888',
  flexShrink: 0,
}
