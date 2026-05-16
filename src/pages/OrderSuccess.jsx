import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

export default function OrderSuccess() {
  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', cursor: 'none' }}>
      <Nav />
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', gap: '2rem', padding: '2rem',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            width: 64, height: 64,
            border: '2px solid var(--off-white)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '1.5rem',
          }}>
            ✓
          </div>

          <p style={{
            fontFamily: 'Inter', fontSize: '0.6rem',
            letterSpacing: '0.3em', color: 'var(--silver)',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            Betaling geslaagd
          </p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 1,
            marginBottom: '1.5rem',
          }}>
            Bedankt voor<br />
            <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>je bestelling</em>
          </h1>

          <p style={{
            fontFamily: 'Inter', fontSize: '0.82rem',
            color: 'rgba(242,237,230,0.65)', lineHeight: 1.8,
            maxWidth: '400px', margin: '0 auto 2.5rem',
          }}>
            Je ontvangt een bevestigingsmail. Je bestelling wordt zo snel mogelijk verwerkt en verzonden.
          </p>

          <Link to="/" style={{
            display: 'inline-block', padding: '1rem 2.5rem',
            background: 'var(--off-white)', color: 'var(--black)',
            textDecoration: 'none', fontFamily: 'Inter',
            fontSize: '0.65rem', letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            Terug naar collectie →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
