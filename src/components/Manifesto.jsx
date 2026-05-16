import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const words = ['Victory', 'is', 'reserved', 'for', 'those', 'who', 'are', 'willing', 'to', 'pay', 'its', 'price.']

export default function Manifesto() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      padding: '12rem 4rem', background: 'var(--charcoal)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Subtle bg texture via gradient */}
      <motion.div style={{
        position: 'absolute', inset: '-10%', y: bgY, opacity: 0.06,
        backgroundImage: `repeating-linear-gradient(-15deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 40px)`,
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '0.62rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--silver)',
            fontFamily: 'Inter, sans-serif', marginBottom: '3rem',
          }}
        >— The Manifesto</motion.p>

        {/* Animated word-by-word reveal */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          fontWeight: 900, lineHeight: 1.05,
          color: 'transparent',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          display: 'flex', flexWrap: 'wrap', gap: '0 1rem',
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.12, color: 'rgba(242,237,230,0.12)' }}
              animate={inView ? { opacity: 1, color: 'rgba(242,237,230,1)' } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              {word === 'price.' ? (
                <em style={{ fontStyle: 'italic', color: 'inherit' }}>{word}</em>
              ) : word}
            </motion.span>
          ))}
        </h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2 }}
          style={{
            height: '1px', background: 'rgba(255,255,255,0.12)',
            margin: '4rem 0', transformOrigin: 'left',
          }}
        />

        {/* Sub text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.4 }}
          style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: '420px' }}>
            <p style={{
              color: 'var(--silver)', fontSize: '0.85rem',
              lineHeight: 1.9, fontFamily: 'Inter, sans-serif', fontWeight: 300,
            }}>
              Bando Tigers was born from the streets, built in garages and forged on racetracks.
              We don't make clothes. We make statements. Every stitch is a commitment.
              Every tiger is a reminder of what you're capable of.
            </p>
          </div>
          <div>
            <p style={{
              fontSize: '0.62rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--silver)',
              fontFamily: 'Inter, sans-serif', marginBottom: '0.75rem',
            }}>Est.</p>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3rem', fontWeight: 900,
              color: 'var(--off-white)', lineHeight: 1,
            }}>2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
