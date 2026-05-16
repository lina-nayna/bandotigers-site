import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

function FullPanel({ img, label, title, sub, align = 'left', dark = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
    }}>
      {/* BG image with parallax */}
      <motion.div style={{
        position: 'absolute', inset: '-15%',
        y: imgY,
      }}>
        <img src={img} alt="" aria-hidden="true" style={{
          width: '100%', height: '100%', objectFit: 'cover',
          filter: dark ? 'brightness(0.42) contrast(1.08)' : 'brightness(0.55)',
        }} />
      </motion.div>

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: align === 'left'
          ? 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
          : 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
      }} />

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          padding: '0 5rem', maxWidth: '560px',
        }}
      >
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'var(--silver)',
          fontFamily: 'Inter, sans-serif', marginBottom: '1.2rem',
        }}>{label}</p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          fontWeight: 900, color: 'var(--off-white)',
          lineHeight: 1, marginBottom: '1.5rem',
          textTransform: 'uppercase',
        }}>
          {title}
        </h2>

        <p style={{
          color: 'var(--silver)', fontSize: '0.85rem',
          lineHeight: 1.8, fontFamily: 'Inter, sans-serif',
          fontWeight: 300, maxWidth: '380px',
          marginBottom: '2.5rem',
        }}>{sub}</p>

        <a href="#" style={{
          display: 'inline-block',
          fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--off-white)',
          textDecoration: 'none', fontFamily: 'Inter, sans-serif',
          borderBottom: '1px solid rgba(255,255,255,0.35)',
          paddingBottom: '0.3rem',
        }}>
          Explore →
        </a>
      </motion.div>
    </section>
  )
}

export default function Lookbook() {
  return (
    <div id="lookbook">
      <FullPanel
        img="/images/xxxx.jpeg"
        label="— Lookbook · Chapter I"
        title={"The\nRiders"}
        sub="Where raw power meets refined taste. The Victory hoodie — built for those who move without permission."
        align="left"
      />
      <FullPanel
        img="/images/xxx.jpeg"
        label="— Lookbook · Chapter II"
        title={"Iron\nHorse"}
        sub="The G-Wagon. The hoodie. The attitude. No explanation needed."
        align="right"
      />
      <FullPanel
        img="/images/d.jpeg"
        label="— Lookbook · Chapter III"
        title={"Victory\nOr Death"}
        sub="The black hoodie against the black machine. Two forces. One identity."
        align="left"
      />
    </div>
  )
}
