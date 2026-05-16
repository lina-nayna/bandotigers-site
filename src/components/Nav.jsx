import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const links = [
    { label: 'Shop',     href: '/#collection' },
    { label: 'Lookbook', href: '/#lookbook' },
    { label: 'Story',    href: '/#manifesto' },
    { label: 'Contact',  href: 'mailto:bandotiger@hotmail.com' },
  ]

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.5rem 3rem',
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.6s, border 0.6s',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900, fontSize: '1.15rem',
            color: 'var(--off-white)', letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Bando Tigers
          </div>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none', margin: 0 }}
          className="nav-desktop">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={{
                color: 'var(--silver)', textDecoration: 'none',
                fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                transition: 'color 0.3s',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.target.style.color = 'var(--silver)'}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="/#collection" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--black)',
          background: 'var(--off-white)', padding: '0.6rem 1.4rem',
          textDecoration: 'none', fontFamily: 'Inter, sans-serif',
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={e => e.target.style.opacity = '0.8'}
        onMouseLeave={e => e.target.style.opacity = '1'}
        >Shop Now</a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'none',
            padding: '4px',
          }}
          className="nav-hamburger"
          aria-label="Menu"
        >
          <span style={{ width: 22, height: 1.5, background: 'var(--off-white)', display: 'block' }} />
          <span style={{ width: 22, height: 1.5, background: 'var(--off-white)', display: 'block' }} />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'var(--black)',
              zIndex: 99, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
            }}
          >
            {links.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.5rem', color: 'var(--off-white)',
                  textDecoration: 'none', fontWeight: 700,
                }}
              >{l.label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 768px) {
          nav > a:last-of-type { display: none; }
        }
      `}</style>
    </>
  )
}
