import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 5000)
  }

  return (
    <footer style={{
      background: 'var(--charcoal)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Newsletter band */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '6rem 4rem',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.62rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--silver)',
            fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
          }}>— Join the Pack</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>
            Early Access<br />
            <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Every Drop</em>
          </h2>
          <p style={{
            color: 'var(--silver)', fontSize: '0.82rem',
            lineHeight: 1.8, fontFamily: 'Inter, sans-serif',
            fontWeight: 300, marginBottom: '2.5rem',
          }}>
            Be the first to know about new drops, limited releases and exclusive behind-the-scenes content.
          </p>
          <form onSubmit={handleSubmit} style={{
            display: 'flex', maxWidth: '440px', margin: '0 auto',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1, background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRight: 'none', color: 'var(--off-white)',
                padding: '0.9rem 1.25rem',
                fontSize: '0.78rem', fontFamily: 'Inter, sans-serif',
                outline: 'none', letterSpacing: '0.05em',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            />
            <button type="submit" style={{
              background: done ? '#2a6b00' : 'var(--off-white)',
              color: 'var(--black)', border: 'none', cursor: 'none',
              padding: '0.9rem 1.75rem', fontSize: '0.65rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
              transition: 'background 0.3s',
            }}>
              {done ? 'Joined ✓' : 'Join →'}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div style={{
        padding: '5rem 4rem 3rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '3rem',
        maxWidth: '1280px', margin: '0 auto',
      }}>
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900, fontSize: '1.5rem',
            color: 'var(--off-white)', marginBottom: '1rem',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>Bando Tigers</p>
          <p style={{
            color: 'var(--silver)', fontSize: '0.8rem',
            lineHeight: 1.8, fontFamily: 'Inter, sans-serif',
            fontWeight: 300, maxWidth: '240px', marginBottom: '2rem',
          }}>
            Dark. Bold. Untamed.<br />
            Luxury streetwear for those who refuse to be ordinary.
          </p>
          {/* Socials */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['IG', 'TT', 'PIN'].map(s => (
              <a key={s} href="#" style={{
                width: '36px', height: '36px',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', letterSpacing: '0.08em',
                color: 'var(--silver)', textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = 'var(--off-white)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--silver)' }}
              >{s}</a>
            ))}
          </div>
        </div>

        {[
          { title: 'Shop', links: ['New Arrivals', 'Hoodies', 'T-Shirts', 'Accessories', 'Sale'] },
          { title: 'Info', links: ['Our Story', 'Size Guide', 'Delivery', 'Returns', 'FAQ'] },
          { title: 'Contact', links: ['Instagram DM', 'hello@bandotigers.com', 'Wholesale', 'Press'] },
        ].map(col => (
          <div key={col.title}>
            <p style={{
              fontSize: '0.62rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--off-white)',
              fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
              fontWeight: 600,
            }}>{col.title}</p>
            <ul style={{ listStyle: 'none' }}>
              {col.links.map(l => (
                <li key={l} style={{ marginBottom: '0.75rem' }}>
                  <a href="#" style={{
                    color: 'var(--silver)', textDecoration: 'none',
                    fontSize: '0.78rem', fontFamily: 'Inter, sans-serif',
                    fontWeight: 300, transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--silver)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '1.5rem 4rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        maxWidth: '1280px', margin: '0 auto',
      }}>
        <p style={{
          fontSize: '0.68rem', color: 'var(--silver)',
          fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em',
        }}>
          © 2025 Bando Tigers. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" style={{
              fontSize: '0.68rem', color: 'var(--silver)',
              textDecoration: 'none', fontFamily: 'Inter, sans-serif',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
            onMouseLeave={e => e.target.style.color = 'var(--silver)'}
            >{l}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { footer > div:nth-of-type(2) { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
          footer > div:nth-of-type(2) { grid-template-columns: 1fr; padding: 3rem 2rem; }
          footer > div:nth-of-type(1) { padding: 4rem 2rem; }
          footer > div:last-of-type { padding: 1.5rem 2rem; flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}
