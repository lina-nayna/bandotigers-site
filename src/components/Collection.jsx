import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { products, STORE } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const [pickingSize, setPickingSize] = useState(false)
  const { addItem } = useCart()

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPickingSize(false) }}
      style={{ position: 'relative', cursor: 'none' }}
    >
      {/* Image wrapper */}
      <div className="card-media" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#111' }}>
        <motion.img
          src={product.img}
          alt={product.name}
          loading="lazy"
          decoding="async"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.88)',
            display: 'block',
          }}
        />

        {/* Hover overlay */}
        <motion.div
          className="card-actions"
          animate={{ opacity: (hovered || pickingSize) ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)',
            display: 'flex', alignItems: 'flex-end',
            gap: '0.6rem', padding: '1.5rem',
          }}
        >
          {pickingSize ? (
            /* Maat kiezen — daarna gaat het product meteen in de winkelmand */
            <div className="size-row" style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => { addItem(product, size); setPickingSize(false) }}
                  className="size-btn"
                  style={{
                    flex: 1, fontSize: '0.62rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--black)',
                    background: 'var(--off-white)', padding: '0.65rem 0',
                    border: 'none', cursor: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => setPickingSize(true)}
                className="card-buy"
                style={{
                  flex: 1, fontSize: '0.62rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--black)',
                  background: 'var(--off-white)', padding: '0.65rem 0',
                  border: 'none', cursor: 'none',
                  fontFamily: 'Inter, sans-serif', textAlign: 'center',
                }}
              >
                Koop Nu
              </button>
              <Link
                to={`/product/${product.handle}`}
                className="card-info"
                style={{
                  fontSize: '0.62rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'var(--off-white)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  padding: '0.65rem 1rem',
                  textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                Info →
              </Link>
            </>
          )}
        </motion.div>

        {/* Tag */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          fontSize: '0.58rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--black)',
          background: 'var(--off-white)', padding: '0.3rem 0.7rem',
          fontFamily: 'Inter, sans-serif',
        }}>
          {product.tag}
        </div>
      </div>

      {/* Info */}
      <div style={{ marginTop: '1.1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1rem', fontWeight: 700,
              color: 'var(--off-white)', marginBottom: '0.2rem',
            }}>{product.name}</p>
            <p style={{
              fontSize: '0.7rem', letterSpacing: '0.1em',
              color: 'var(--silver)', fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
            }}>{product.sub}</p>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem', color: 'var(--off-white)',
            letterSpacing: '0.05em',
          }}>{product.price}</p>
        </div>
      </div>
    </motion.article>
  )
}

function SectionLabel({ children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        fontSize: '0.65rem', letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--silver)',
        fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
      }}
    >{children}</motion.p>
  )
}

export default function Collection() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="collection" className="collection" style={{
      background: 'var(--black)', padding: '8rem 4rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div className="collection-header" style={{ marginBottom: '5rem' }}>
          <SectionLabel>— The Drop · SS 2025</SectionLabel>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              ref={titleRef}
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 900, lineHeight: 0.95,
                color: 'var(--off-white)',
                textTransform: 'uppercase',
              }}
            >
              Featured<br />
              <em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Collection</em>
            </motion.h2>
          </div>
        </div>

        {/* Grid */}
        <div className="collection-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {products.map((p, i) => (
            <ProductCard key={p.handle} product={p} index={i} />
          ))}
        </div>

        {/* View all */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a
            href={`${STORE}/collections/all`}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-link"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--silver)',
              textDecoration: 'none', fontFamily: 'Inter, sans-serif',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '0.4rem',
              transition: 'color 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--off-white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            View All Pieces →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .collection { padding: 6rem 2rem !important; }
        }
        @media (max-width: 768px) {
          .collection { padding: 4.5rem 1.25rem !important; }
          .collection-header { margin-bottom: 3rem !important; }
          .collection-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 480px) {
          .collection-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
