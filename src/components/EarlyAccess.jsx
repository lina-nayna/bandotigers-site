import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return timeLeft
}

function CountUnit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '70px' }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 900, color: 'var(--off-white)',
        lineHeight: 1, letterSpacing: '-0.02em',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: 'Inter', fontSize: '0.5rem',
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'var(--silver)', marginTop: '0.5rem',
      }}>
        {label}
      </div>
    </div>
  )
}

// Next drop: June 15, 2025
const DROP_DATE = '2025-07-01T12:00:00'

export default function EarlyAccess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const timeLeft = useCountdown(DROP_DATE)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    // Store in localStorage for now — replace with your email service
    try {
      const existing = JSON.parse(localStorage.getItem('bt-early-access') || '[]')
      if (!existing.includes(email)) existing.push(email)
      localStorage.setItem('bt-early-access', JSON.stringify(existing))
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="early-access" ref={ref} style={{
      background: 'var(--black)', padding: '10rem 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,130,90,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: '10%', right: '10%',
          height: '1px', background: 'rgba(255,255,255,0.08)',
          transformOrigin: 'left',
        }}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'Inter', fontSize: '0.58rem',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#D4825A', marginBottom: '1.5rem',
          }}
        >
          ◆ Exclusive Drop Access
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}
        >
          Next Drop<br />
          <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Coming Soon</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'Inter', fontSize: '0.82rem',
            color: 'rgba(242,237,230,0.55)', lineHeight: 1.8,
            maxWidth: '480px', margin: '0 auto 3.5rem',
          }}
        >
          Limited pieces. Geen restocks. Members get 24-hour early access before the public drop.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex', gap: 'clamp(1.5rem, 5vw, 4rem)',
            justifyContent: 'center', alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <CountUnit value={timeLeft.days} label="Dagen" />
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>·</div>
          <CountUnit value={timeLeft.hours} label="Uren" />
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>·</div>
          <CountUnit value={timeLeft.minutes} label="Minuten" />
          <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '2rem', fontFamily: "'Playfair Display', serif" }}>·</div>
          <CountUnit value={timeLeft.seconds} label="Seconden" />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            width: '60px', height: '1px',
            background: 'rgba(255,255,255,0.15)',
            margin: '0 auto 3.5rem',
          }}
        />

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {status === 'success' ? (
            <div style={{
              padding: '1.5rem 2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}>
              <p style={{
                fontFamily: 'Inter', fontSize: '0.65rem',
                letterSpacing: '0.2em', color: 'var(--off-white)',
                textTransform: 'uppercase',
              }}>
                ✓ Je staat op de lijst — we nemen contact op voor de drop
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex', gap: '0',
                maxWidth: '480px', margin: '0 auto',
              }}
                className="early-access-form">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jouw@email.com"
                  required
                  style={{
                    flex: 1, padding: '1rem 1.2rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRight: 'none',
                    color: 'var(--off-white)', fontFamily: 'Inter',
                    fontSize: '0.78rem', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                />
                <button
                  type="submit"
                  style={{
                    padding: '1rem 1.8rem',
                    background: 'var(--off-white)', color: 'var(--black)',
                    border: 'none', fontFamily: 'Inter',
                    fontSize: '0.62rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', cursor: 'none',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  Join →
                </button>
              </div>
              <p style={{
                fontFamily: 'Inter', fontSize: '0.52rem',
                color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
                marginTop: '1rem',
              }}>
                Geen spam. Alleen exclusieve drops en early access.
              </p>
            </form>
          )}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            display: 'flex', gap: '3rem', justifyContent: 'center',
            marginTop: '4rem', flexWrap: 'wrap',
          }}
        >
          {['24h Early Access', 'Exclusieve Pieces', 'Members Only Drops'].map(benefit => (
            <div key={benefit} style={{
              fontFamily: 'Inter', fontSize: '0.58rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ color: '#D4825A', fontSize: '0.4rem' }}>◆</span>
              {benefit}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .early-access-form {
            flex-direction: column !important;
          }
          .early-access-form input {
            border-right: 1px solid rgba(255,255,255,0.12) !important;
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  )
}
