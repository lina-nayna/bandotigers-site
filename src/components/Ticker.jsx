import { motion } from 'framer-motion'

const ITEMS = [
  'Victory Or Death',
  'Bando Tigers',
  'SS 2025',
  'Victory Is Reserved For Those Who Are Willing To Pay Its Price',
  'Bando Tigers',
  'Victory Or Death',
  'SS 2025',
  'Victory Is Reserved For Those Who Are Willing To Pay Its Price',
]

export default function Ticker() {
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '1.1rem 0', overflow: 'hidden',
      background: 'var(--charcoal)',
    }}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'inline-flex', gap: '4rem', whiteSpace: 'nowrap' }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '4rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--silver)',
          }}>
            {item}
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
