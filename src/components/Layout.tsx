import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import SideMenu from './SideMenu'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ minWidth: '375px' }}>
      <Header onMenuToggle={() => setMenuOpen((o) => !o)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main
        style={{
          marginTop: '56px',
          marginBottom: '64px',
          minHeight: 'calc(100vh - 120px)',
          backgroundColor: 'var(--background)',
          padding: '12px',
        }}
      >
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}
