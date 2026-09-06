import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

/* Zie Collection.jsx: hover bestaat niet op een touchscreen, dus de
   zoom zou na één tik blijven hangen. */
const CAN_HOVER = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

const hoodies = products.filter(p => p.category === 'hoodie')
const shirts = products.filter(p => p.category === 'shirt')
const shorts = products.filter(p => p.category === 'short')

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [pickingSize, setPickingSize] = useState(false)

  const handlePick = (e, size) => {
    e.stopPropagation()
    addItem(product, size)
    setPickingSize(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/product/${product.handle}`)}
      style={{ cursor: 'none', position: 'relative' }}
    >
      {/* Tag */}
      {product.tag && (
        <div style={{
          position: 'absolute', top: 16, left: 16, zIndex: 2,
          background: product.tag === 'New' ? '#D4825A' : 'var(--off-white)',
          color: product.tag === 'New' ? '#fff' : 'var(--black)',
          fontSize: '0.55rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', padding: '4px 10px',
        }}>
          {product.tag}
        </div>
      )}

      {/* Image */}
      <div className="card-media" style={{
        background: '#f5f3f0',
        aspectRatio: '3/4',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <motion.img
          src={product.img}
          alt={product.name}
          whileHover={CAN_HOVER ? { scale: 1.04 } : undefined}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Quick add overlay */}
        <motion.div
          className="card-actions card-actions--shop"
          initial={{ opacity: 0 }}
          animate={{ opacity: pickingSize ? 1 : undefined }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(10,10,10,0.85)',
            padding: '16px',
            display: 'flex', justifyContent: 'center',
          }}
        >
          {pickingSize ? (
            <div className="size-row" style={{ display: 'flex', gap: '0.4rem', width: '100%' }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => handlePick(e, size)}
                  className="size-btn"
                  style={{
                    flex: 1, background: 'var(--off-white)', border: 'none',
                    color: 'var(--black)', fontFamily: 'Inter',
                    fontSize: '0.6rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '10px 0',
                    cursor: 'none',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); setPickingSize(true) }}
              className="card-add"
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.3)',
                color: '#f2ede6', fontFamily: 'Inter',
                fontSize: '0.6rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', padding: '10px 24px',
                cursor: 'none', width: '100%',
                transition: 'all 0.2s',
              }}
            >
              Add to Cart
            </button>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{
              fontFamily: 'Inter', fontSize: '0.7rem',
              letterSpacing: '0.08em', color: 'var(--off-white)',
              textTransform: 'uppercase', marginBottom: '4px',
            }}>
              {product.name}
            </p>
            <p style={{
              fontFamily: 'Inter', fontSize: '0.6rem',
              color: 'rgba(242,237,230,0.4)', letterSpacing: '0.05em',
            }}>
              {product.sub}
            </p>
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1rem', color: 'var(--off-white)',
          }}>
            {product.price}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ShopPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--black)', minHeight: '100vh', paddingTop: '120px' }}>

        {/* Header */}
        <div ref={ref} style={{ padding: '0 2rem 2.5rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900, color: 'var(--off-white)',
              textTransform: 'uppercase', lineHeight: 1,
            }}
          >
            Shop
          </motion.h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
          >
            {products.length} Pieces
          </motion.span>
        </div>

        {/* Hoodies */}
        <div className="shop-section" style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Hoodies</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>
          <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem 1.5rem' }}>
            {hoodies.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Shirts */}
        <div className="shop-section" style={{ padding: '0 2rem', maxWidth: '1400px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>T-Shirts</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>
          <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem 1.5rem' }}>
            {shirts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

        {/* Shorts */}
        <div className="shop-section shop-section--last" style={{ padding: '0 2rem 8rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Shorts</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>
          <div className="shop-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem 1.5rem' }}>
            {shorts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>

      </main>

      <style>{`
        @media (max-width: 1024px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .shop-grid { gap: 2rem 1rem !important; }
          .shop-section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .shop-section--last { padding-bottom: 5rem !important; }
        }
        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  )
}
