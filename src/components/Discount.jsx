import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* De kortingscode staat als "Inschrijfkorting 25%" in Shopify.
   Verander je hem daar, verander hem dan ook hier. */
const CODE = 'TIGER25'

export default function Discount() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_BREVO_API_KEY,
        },
        body: JSON.stringify({ email, listIds: [5], updateEnabled: true }),
      })
      if (res.ok || res.status === 204) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyCode = () => {
    navigator.clipboard?.writeText(CODE)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      .catch(() => {})
  }

  return (
    <section ref={ref} className="discount" style={{
      background: 'var(--charcoal)', padding: '7rem 3rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Warme gloed achter de tekst */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(212,130,90,0.10) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        {/* Kopje */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'Inter', fontSize: '0.58rem',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#D4825A', marginBottom: '1.5rem',
          }}
        >
          ◆ Schrijf je in
        </motion.p>

        {/* Titel */}
        <motion.h2
          className="discount-title"
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.6rem, 8vw, 5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}
        >
          25% Korting<br />
          <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Op Alles</em>
        </motion.h2>

        {/* Uitleg */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'Inter', fontSize: '0.82rem',
            color: 'rgba(242,237,230,0.55)', lineHeight: 1.8,
            maxWidth: '440px', margin: '0 auto 3rem',
          }}
        >
          Laat je e-mailadres achter en ontvang direct je code.
          Geldig op de hele collectie — hoodies, tees, alles.
        </motion.p>

        {/* Formulier, of de code na inschrijving */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {status === 'success' ? (
            <div style={{
              maxWidth: '440px', margin: '0 auto',
              padding: '2rem 1.5rem',
              border: '1px solid rgba(212,130,90,0.35)',
              background: 'rgba(212,130,90,0.06)',
            }}>
              <p style={{
                fontFamily: 'Inter', fontSize: '0.58rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(242,237,230,0.6)', marginBottom: '1rem',
              }}>
                Je code
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 9vw, 2.8rem)', fontWeight: 900,
                color: 'var(--off-white)', letterSpacing: '0.08em',
                marginBottom: '1.5rem',
              }}>
                {CODE}
              </p>
              <button
                onClick={copyCode}
                className="discount-copy"
                style={{
                  padding: '1.05rem 2rem', background: 'transparent',
                  border: '1px solid rgba(242,237,230,0.3)',
                  color: 'var(--off-white)', fontFamily: 'Inter',
                  fontSize: '0.62rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: 'none',
                }}
              >
                {copied ? '✓ Gekopieerd' : 'Kopieer code'}
              </button>
              <p style={{
                fontFamily: 'Inter', fontSize: '0.62rem',
                color: 'rgba(242,237,230,0.45)', lineHeight: 1.7,
                marginTop: '1.5rem',
              }}>
                Vul de code in bij het afrekenen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="discount-form" style={{
                display: 'flex', gap: 0,
                maxWidth: '440px', margin: '0 auto',
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jouw@email.com"
                  required
                  aria-label="E-mailadres"
                  style={{
                    flex: 1, padding: '1.05rem 1.2rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    color: 'var(--off-white)', fontFamily: 'Inter',
                    fontSize: '0.78rem', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,130,90,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  type="submit"
                  className="discount-submit"
                  disabled={status === 'loading'}
                  style={{
                    padding: '1.05rem 1.8rem',
                    background: '#D4825A', color: '#0a0a0a',
                    border: 'none', fontFamily: 'Inter',
                    fontSize: '0.62rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', cursor: 'none',
                    whiteSpace: 'nowrap', flexShrink: 0, fontWeight: 600,
                  }}
                >
                  {status === 'loading' ? '...' : 'Claim 25%'}
                </button>
              </div>

              {status === 'error' && (
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.65rem',
                  color: '#D4825A', marginTop: '1rem',
                }}>
                  Er ging iets mis. Probeer het nog eens.
                </p>
              )}

              <p style={{
                fontFamily: 'Inter', fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
                marginTop: '1rem',
              }}>
                Geen spam. Alleen drops en early access.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .discount { padding: 5.5rem 2rem !important; }
        }
        @media (max-width: 768px) {
          .discount { padding: 4.5rem 1.25rem !important; }
          /* Onder elkaar: naast elkaar wordt het veld te smal om in te typen */
          .discount-form { flex-direction: column !important; gap: 0.75rem !important; }
          .discount-form input {
            border-right: 1px solid rgba(255,255,255,0.12) !important;
            width: 100% !important;
          }
          .discount-submit { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
