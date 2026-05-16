import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 200, backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(420px, 100vw)',
              background: '#0a0a0a',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              zIndex: 201,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.8rem 2rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem', fontWeight: 700,
                  color: 'var(--off-white)', textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  Winkelwagen
                </p>
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.6rem',
                  color: 'var(--silver)', letterSpacing: '0.15em',
                  textTransform: 'uppercase', marginTop: '0.2rem',
                }}>
                  {totalItems} {totalItems === 1 ? 'artikel' : 'artikelen'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--silver)', cursor: 'none',
                  fontSize: '1.2rem', lineHeight: 1,
                  padding: '0.5rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem' }}>
              {items.length === 0 ? (
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  height: '100%', gap: '1.5rem',
                }}>
                  <p style={{
                    fontFamily: 'Inter', fontSize: '0.65rem',
                    color: 'var(--silver)', letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    Je winkelwagen is leeg
                  </p>
                  <Link
                    to="/#collection"
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontFamily: 'Inter', fontSize: '0.62rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'var(--off-white)', textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.3)',
                      paddingBottom: '0.2rem',
                    }}
                  >
                    Bekijk collectie →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {items.map(item => (
                    <div key={item.key} style={{
                      display: 'grid', gridTemplateColumns: '80px 1fr',
                      gap: '1rem', paddingBottom: '1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
                        <img
                          src={item.img} alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <p style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '0.9rem', color: 'var(--off-white)',
                          fontWeight: 700,
                        }}>{item.name}</p>
                        <p style={{
                          fontFamily: 'Inter', fontSize: '0.6rem',
                          color: 'var(--silver)', letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}>{item.sub} — {item.size}</p>
                        <p style={{
                          fontFamily: 'Inter', fontSize: '0.85rem',
                          color: 'var(--off-white)', marginTop: '0.2rem',
                        }}>
                          {(item.priceNum * item.qty).toFixed(2).replace('.', ',')} €
                        </p>

                        {/* Qty controls */}
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          gap: '0.8rem', marginTop: '0.4rem',
                        }}>
                          <button onClick={() => updateQty(item.key, item.qty - 1)} style={{
                            width: '1.8rem', height: '1.8rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'var(--silver)', fontFamily: 'Inter',
                            cursor: 'none', fontSize: '0.9rem',
                          }}>−</button>
                          <span style={{
                            fontFamily: 'Inter', fontSize: '0.75rem',
                            color: 'var(--off-white)', minWidth: '1rem',
                            textAlign: 'center',
                          }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)} style={{
                            width: '1.8rem', height: '1.8rem',
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'var(--silver)', fontFamily: 'Inter',
                            cursor: 'none', fontSize: '0.9rem',
                          }}>+</button>
                          <button onClick={() => removeItem(item.key)} style={{
                            marginLeft: 'auto', background: 'none',
                            border: 'none', color: 'rgba(255,255,255,0.3)',
                            fontFamily: 'Inter', fontSize: '0.6rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            cursor: 'none',
                          }}>
                            Verwijder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                padding: '1.5rem 2rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '1.2rem',
                }}>
                  <p style={{
                    fontFamily: 'Inter', fontSize: '0.62rem',
                    color: 'var(--silver)', letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}>Subtotaal</p>
                  <p style={{
                    fontFamily: 'Inter', fontSize: '0.95rem',
                    color: 'var(--off-white)',
                  }}>
                    {totalPrice.toFixed(2).replace('.', ',')} €
                  </p>
                </div>
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.55rem',
                  color: 'var(--silver)', letterSpacing: '0.12em',
                  marginBottom: '1.2rem', opacity: 0.7,
                }}>
                  Verzendkosten worden berekend bij het afrekenen
                </p>
                <a
                  href={`https://bandotiger.myshopify.com/cart/${items.map(i => `${i.variantId}:${i.qty}`).join(',')}`}
                  style={{
                    display: 'block', width: '100%', padding: '1.1rem',
                    background: 'var(--off-white)', color: 'var(--black)',
                    textAlign: 'center', textDecoration: 'none',
                    fontFamily: 'Inter', fontSize: '0.65rem',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    marginBottom: '0.8rem',
                  }}
                >
                  Afrekenen →
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block', width: '100%', padding: '0.8rem',
                    background: 'transparent', color: 'var(--silver)',
                    textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'Inter', fontSize: '0.62rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    cursor: 'none',
                  }}
                >
                  Verder winkelen
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
