import type { Badge } from '../data/badges'

/** Opens a styled print window for the student's schedule */
export function printSchedule(email: string, classes: Badge[], lunch: string): void {
  const rows = classes
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))
    .map(
      c => `<tr>
        <td>${c.name}</td>
        <td style="white-space:nowrap">${c.time}</td>
        <td style="white-space:nowrap">${c.room}</td>
        <td>${c.instructor}</td>
      </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>My Schedule – University of Scouting</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; color: #333; padding: 32px 40px; }
    .header { text-align: center; margin-bottom: 28px; border-bottom: 3px solid #cfb991; padding-bottom: 16px; }
    .header h1 { font-size: 22px; color: #3a2e1e; margin-bottom: 4px; }
    .header p  { font-size: 13px; color: #888; }
    .meta { display: flex; gap: 32px; margin-bottom: 20px; flex-wrap: wrap; }
    .meta-item { font-size: 13px; }
    .meta-item strong { color: #cfb991; display: block; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 2px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    thead tr { background: #cfb991; color: #fff; }
    th { padding: 8px 10px; text-align: left; font-weight: 700; }
    td { padding: 7px 10px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) td { background: #fafaf8; }
    .footer { margin-top: 24px; font-size: 11px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 12px; }
    @media print {
      @page { margin: 16mm 20mm; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>University of Scouting</h1>
    <p>Crossroads of America Council · December 6, 2025</p>
  </div>
  <div class="meta">
    <div class="meta-item"><strong>Student</strong>${email}</div>
    <div class="meta-item"><strong>Lunch</strong>${lunch || 'Not specified'}</div>
    <div class="meta-item"><strong>Classes</strong>${classes.length} registered</div>
    <div class="meta-item"><strong>Printed</strong>${new Date().toLocaleDateString()}</div>
  </div>
  <table>
    <thead>
      <tr><th>Class Name</th><th>Time</th><th>Room</th><th>Instructor</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">University of Scouting · Crossroads of America Council · Purdue University, West Lafayette, IN</div>
  <script>window.onload = () => { window.print(); window.onafterprint = () => window.close(); }</script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=800,height=600')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
