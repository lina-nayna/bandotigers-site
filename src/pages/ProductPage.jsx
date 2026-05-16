import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { handle } = useParams()
  const product = products.find(p => p.handle === handle)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <p style={{ color: 'var(--silver)', fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Product niet gevonden
        </p>
        <Link to="/" style={{ color: 'var(--off-white)', fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← Terug naar collectie
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', cursor: 'none' }}>
      <Nav />

      <div style={{ paddingTop: '6rem' }}>

        {/* Back */}
        <div style={{ padding: '2rem 4rem 0' }}>
          <Link to="/" style={{
            color: 'var(--silver)', textDecoration: 'none',
            fontFamily: 'Inter', fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--off-white)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--silver)'}
          >
            ← Collection
          </Link>
        </div>

        {/* Main grid */}
        <div className="product-grid">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'sticky', top: '6rem', alignSelf: 'start' }}
          >
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#0d0d0d' }}>
              <motion.img
                src={product.img}
                alt={product.name}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)', display: 'block' }}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingTop: '1rem' }}
          >
            {/* Tag */}
            <div style={{
              display: 'inline-block', marginBottom: '2rem',
              fontSize: '0.55rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--black)',
              background: 'var(--off-white)', padding: '0.3rem 0.8rem',
              fontFamily: 'Inter',
            }}>
              {product.tag}
            </div>

            {/* Name + sub */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 900, lineHeight: 0.95,
              color: 'var(--off-white)',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}>
              {product.name}
            </h1>
            <p style={{
              fontSize: '0.72rem', letterSpacing: '0.18em',
              color: 'var(--silver)', fontFamily: 'Inter',
              textTransform: 'uppercase', marginBottom: '2rem',
            }}>
              {product.sub}
            </p>

            {/* Price */}
            <p style={{
              fontFamily: 'Inter', fontSize: '1.6rem',
              color: 'var(--off-white)', letterSpacing: '0.04em',
              marginBottom: '3rem',
            }}>
              {product.price}
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2.5rem' }} />

            {/* Size selector */}
            <div style={{ marginBottom: '3rem' }}>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '0.22em',
                color: 'var(--silver)', fontFamily: 'Inter',
                textTransform: 'uppercase', marginBottom: '1.2rem',
              }}>
                Maat{selectedSize ? ` — ${selectedSize}` : ''}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '3.2rem', height: '3.2rem',
                      background: selectedSize === size ? 'var(--off-white)' : 'transparent',
                      color: selectedSize === size ? 'var(--black)' : 'var(--silver)',
                      border: `1px solid ${selectedSize === size ? 'var(--off-white)' : 'rgba(255,255,255,0.12)'}`,
                      fontFamily: 'Inter', fontSize: '0.62rem',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { if (selectedSize !== size) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'var(--off-white)' } }}
                    onMouseLeave={e => { if (selectedSize !== size) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--silver)' } }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            {product.sizes.length === 0 ? (
              <button disabled style={{
                display: 'block', width: '100%', padding: '1.1rem',
                background: 'rgba(242,237,230,0.15)', color: 'var(--silver)',
                textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Inter', fontSize: '0.65rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                marginBottom: '0.8rem', cursor: 'none',
              }}>
                Binnenkort beschikbaar
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                style={{
                  display: 'block', width: '100%', padding: '1.1rem',
                  background: added ? '#2a2a2a' : selectedSize ? 'var(--off-white)' : 'rgba(242,237,230,0.15)',
                  color: added ? 'var(--off-white)' : selectedSize ? 'var(--black)' : 'var(--silver)',
                  textAlign: 'center', border: selectedSize ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'Inter', fontSize: '0.65rem',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  marginBottom: '0.8rem', cursor: 'none',
                  transition: 'all 0.3s',
                }}
              >
                {added ? '✓ Toegevoegd aan winkelwagen' : selectedSize ? `In winkelwagen — ${selectedSize}` : 'Selecteer een maat'}
              </button>
            )}

            {/* Description */}
            <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--silver)',
                fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                Over dit product
              </p>
              <p style={{
                fontFamily: 'Inter', fontSize: '0.87rem',
                color: 'rgba(242,237,230,0.65)', lineHeight: 1.9,
              }}>
                {product.description}
              </p>
            </div>

            {/* Details list */}
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--silver)',
                fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: '1.2rem',
              }}>
                Details
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {product.details.map((d, i) => (
                  <li key={i} style={{
                    fontFamily: 'Inter', fontSize: '0.82rem',
                    color: 'rgba(242,237,230,0.65)',
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                  }}>
                    <span style={{ color: 'var(--orange)', fontSize: '0.45rem', flexShrink: 0 }}>◆</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1300px;
          margin: 0 auto;
          padding: 3rem 4rem 8rem;
          gap: 7rem;
        }
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
            padding: 2rem 1.5rem 6rem;
            gap: 3rem;
          }
          .product-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}
