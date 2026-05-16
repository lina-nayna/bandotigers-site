import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function EditorialRow({ left, right, reversed = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 1.6fr' : '1.6fr 1fr',
        gap: '1.5rem', marginBottom: '1.5rem',
      }}
    >
      {(reversed ? [right, left] : [left, right]).map((item, i) => (
        <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
          {typeof item === 'string' ? (
            <>
              <img src={item} alt="" aria-hidden="true" style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                filter: 'brightness(0.78)',
                aspectRatio: '4/5',
              }} />
              <motion.div
                whileHover={{ scaleX: 1 }}
                initial={{ scaleX: 0 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px', background: 'var(--off-white)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s ease',
                }}
              />
            </>
          ) : (
            <div style={{
              background: 'var(--charcoal2)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 3rem',
              height: '100%', minHeight: '300px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {item}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default function Campaign() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: 'var(--black)', padding: '8rem 3rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
            style={{
              fontSize: '0.62rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'var(--silver)',
              fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
            }}
          >— Campaign · SS 2025</motion.p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
          }}>
            The Editorial
          </h2>
        </div>

        {/* Editorial grid */}
        <EditorialRow
          left="/images/h.jpeg"
          right={
            <>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--silver)',
                fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
              }}>Chapter I — Power</p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900, color: 'var(--off-white)',
                lineHeight: 1.05, marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}>
                The Machine<br />
                <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Never Stops</em>
              </h3>
              <p style={{
                color: 'var(--silver)', fontSize: '0.82rem',
                lineHeight: 1.85, fontFamily: 'Inter, sans-serif',
                fontWeight: 300, marginBottom: '2.5rem',
              }}>
                The E63. The hoodie. Two symbols of relentless ambition —
                built to move fast and look effortless doing it.
              </p>
              <a href="#" style={{
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--off-white)',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '0.3rem',
              }}>Shop Look →</a>
            </>
          }
        />

        <EditorialRow
          left={
            <>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--silver)',
                fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
              }}>Chapter II — Craft</p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900, color: 'var(--off-white)',
                lineHeight: 1.05, marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}>
                Packed<br />
                <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>With Care</em>
              </h3>
              <p style={{
                color: 'var(--silver)', fontSize: '0.82rem',
                lineHeight: 1.85, fontFamily: 'Inter, sans-serif',
                fontWeight: 300, marginBottom: '2.5rem',
              }}>
                Every order is a personal delivery. Handwritten notes,
                sealed in black — because your experience matters as much as the piece.
              </p>
              <a href="#" style={{
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--off-white)',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '0.3rem',
              }}>Order Now →</a>
            </>
          }
          right="/images/a.jpeg"
          reversed
        />

        {/* Full width cinematic image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', overflow: 'hidden', marginTop: '1.5rem' }}
        >
          <img src="/images/g.jpeg" alt="Bando Tigers campaign" style={{
            width: '100%', height: '70vh', objectFit: 'cover',
            objectPosition: 'center 25%',
            filter: 'brightness(0.55) contrast(1.1)',
            display: 'block',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
          }}>
            <p style={{
              fontSize: '0.62rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--silver)',
              fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem',
            }}>— The Riders</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 900, color: 'var(--off-white)',
              lineHeight: 0.9, textTransform: 'uppercase',
              textShadow: '0 4px 40px rgba(0,0,0,0.8)',
            }}>
              Born to<br />
              <em style={{ fontStyle: 'italic' }}>Ride</em>
            </h2>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
