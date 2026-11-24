import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import { useLang } from '../i18n/LanguageContext'

const Section = ({ id, title, children }) => (
  <div id={id} style={{ marginBottom: '3rem', scrollMarginTop: '9rem' }}>
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.4rem', fontWeight: 700,
      color: 'var(--off-white)', marginBottom: '1rem',
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{title}</h2>
    <div style={{
      fontFamily: 'Inter', fontSize: '0.82rem',
      color: 'rgba(242,237,230,0.65)', lineHeight: 1.9,
    }}>
      {children}
    </div>
  </div>
)

const linkStyle = { fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }

const LINKS = {
  terms: { to: '/terms', key: 'legal.link.terms' },
  privacy: { to: '/privacy', key: 'legal.link.privacy' },
  cookies: { to: '/cookies', key: 'legal.link.cookies' },
}

/* content = { en, nl, fr }, elk { title1, title2, subtitle, sections: [{ id?, title, body }] } */
export default function LegalPage({ content, page }) {
  const { t, lang } = useLang()
  const c = content[lang] ?? content.en

  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
        <div className="legal-hero" style={{
          padding: '12rem 4rem 6rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          maxWidth: '800px', margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.58rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--silver)', marginBottom: '1.2rem',
          }}>{t('legal.label')}</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>{c.title1}<br /><em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>{c.title2}</em></h1>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.75rem',
            color: 'var(--silver)', letterSpacing: '0.1em',
          }}>{c.subtitle}</p>
        </div>

        <div className="legal-body" style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 4rem 8rem' }}>
          {c.sections.map(s => (
            <Section key={s.title} id={s.id} title={s.title}>{s.body}</Section>
          ))}

          <div className="legal-links" style={{
            display: 'flex', gap: '2rem', marginTop: '4rem',
            paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}>
            {Object.entries(LINKS).filter(([k]) => k !== page).map(([k, l]) => (
              <Link key={k} to={l.to} className="tap-link" style={linkStyle}>{t(l.key)} →</Link>
            ))}
            <Link to="/" className="tap-link" style={linkStyle}>{t('legal.home')}</Link>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .legal-hero { padding: 8rem 1.25rem 3rem !important; }
          .legal-body { padding: 3rem 1.25rem 5rem !important; }
        }
      `}</style>

      <Footer />
    </>
  )
}
