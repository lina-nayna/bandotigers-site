import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])
  const textY      = useTransform(scrollYProgress, [0, 1], [0, 160])
  const textOpacity= useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} style={{
      position: 'relative', height: '100dvh', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Cinematic background image */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        scale: imgScale, opacity: imgOpacity,
      }}>
        <img
          src="/images/g.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'brightness(0.45) contrast(1.1)',
          }}
        />
        {/* Gradient overlays for cinematic depth */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }} />
      </motion.div>

      {/* Hero text */}
      <motion.div style={{ position: 'relative', zIndex: 2, textAlign: 'center', y: textY, opacity: textOpacity }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.5, delay: 1 }}
          style={{
            fontSize: '0.65rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--silver)',
            marginBottom: '2rem', fontFamily: 'Inter, sans-serif',
          }}
        >
          SS 2025 Collection
        </motion.p>

        {/* Main title */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(4.5rem, 12vw, 11rem)',
              fontWeight: 900, lineHeight: 0.9,
              color: 'var(--off-white)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            Bando<br />
            <em style={{ fontStyle: 'italic', color: 'var(--cream)' }}>Tigers</em>
          </motion.h1>
        </div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '120px', height: '1px',
            background: 'var(--silver)', margin: '2.5rem auto',
            transformOrigin: 'left',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{
            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--silver)', fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
          }}
        >
          Victory is reserved for those who are willing to pay its price
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#collection" style={{
            padding: '1rem 2.8rem', background: 'var(--off-white)',
            color: 'var(--black)', fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: 'Inter, sans-serif', transition: 'opacity 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Shop the Drop
          </a>
          <a href="#lookbook" style={{
            padding: '1rem 2.8rem', border: '1px solid rgba(255,255,255,0.25)',
            color: 'var(--off-white)', fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', textDecoration: 'none',
            fontFamily: 'Inter, sans-serif', transition: 'border-color 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
          >
            Lookbook
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '0.75rem', zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--silver)', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--silver), transparent)', transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
