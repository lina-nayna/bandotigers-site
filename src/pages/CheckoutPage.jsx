import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', zip: '', country: 'BE',
    phone: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items, totalPrice }),
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        clearCart()
        window.location.href = data.checkoutUrl
      } else {
        setError('Er is iets misgegaan. Probeer opnieuw.')
      }
    } catch {
      setError('Verbindingsfout. Controleer je internet en probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
        <p style={{ color: 'var(--silver)', fontFamily: 'Inter', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Je winkelwagen is leeg
        </p>
        <Link to="/" style={{ color: 'var(--off-white)', fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
          ← Terug naar collectie
        </Link>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--off-white)', fontFamily: 'Inter',
    fontSize: '0.82rem', outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontFamily: 'Inter', fontSize: '0.58rem',
    letterSpacing: '0.18em', color: 'var(--silver)',
    textTransform: 'uppercase', display: 'block',
    marginBottom: '0.5rem',
  }

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', cursor: 'none' }}>
      <Nav />
      <div style={{ paddingTop: '6rem', maxWidth: '1100px', margin: '0 auto', padding: '8rem 2rem 6rem' }}>

        <Link to="/" style={{
          color: 'var(--silver)', textDecoration: 'none',
          fontFamily: 'Inter', fontSize: '0.62rem',
          letterSpacing: '0.22em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: '3rem', display: 'block',
        }}>
          ← Terug
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '5rem', alignItems: 'start' }}
          className="checkout-grid">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem', fontWeight: 900,
              color: 'var(--off-white)', textTransform: 'uppercase',
              marginBottom: '2.5rem', lineHeight: 1,
            }}>Afrekenen</p>

            <form onSubmit={handleSubmit}>
              {/* Contact */}
              <p style={{ ...labelStyle, fontSize: '0.65rem', color: 'var(--off-white)', marginBottom: '1.2rem' }}>
                Contactgegevens
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>E-mailadres</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="jouw@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Telefoonnummer (optioneel)</label>
                <input
                  type="tel" value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="+32 ..."
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {/* Shipping */}
              <p style={{ ...labelStyle, fontSize: '0.65rem', color: 'var(--off-white)', marginBottom: '1.2rem' }}>
                Verzendadres
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Voornaam</label>
                  <input required value={form.firstName} onChange={e => set('firstName', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label style={labelStyle}>Achternaam</label>
                  <input required value={form.lastName} onChange={e => set('lastName', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Adres</label>
                <input required value={form.address} onChange={e => set('address', e.target.value)}
                  placeholder="Straatnaam 12"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Postcode</label>
                  <input required value={form.zip} onChange={e => set('zip', e.target.value)}
                    placeholder="1000"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
                <div>
                  <label style={labelStyle}>Stad</label>
                  <input required value={form.city} onChange={e => set('city', e.target.value)}
                    placeholder="Brussel"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={labelStyle}>Land</label>
                <select value={form.country} onChange={e => set('country', e.target.value)}
                  style={{ ...inputStyle, cursor: 'none' }}>
                  <option value="BE">België</option>
                  <option value="NL">Nederland</option>
                  <option value="FR">Frankrijk</option>
                  <option value="DE">Duitsland</option>
                  <option value="LU">Luxemburg</option>
                </select>
              </div>

              {error && (
                <p style={{
                  fontFamily: 'Inter', fontSize: '0.7rem',
                  color: '#ff6b6b', marginBottom: '1rem',
                  letterSpacing: '0.05em',
                }}>{error}</p>
              )}

              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%', padding: '1.2rem',
                  background: loading ? 'rgba(242,237,230,0.5)' : 'var(--off-white)',
                  color: 'var(--black)', border: 'none',
                  fontFamily: 'Inter', fontSize: '0.65rem',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  cursor: loading ? 'none' : 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {loading ? 'Verwerken...' : `Betalen — ${totalPrice.toFixed(2).replace('.', ',')} € →`}
              </button>

              <p style={{
                fontFamily: 'Inter', fontSize: '0.55rem',
                color: 'var(--silver)', letterSpacing: '0.12em',
                textAlign: 'center', marginTop: '1rem',
                opacity: 0.7,
              }}>
                Veilig betalen via Mollie — Bancontact, Creditcard, iDEAL
              </p>
            </form>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '2rem',
              position: 'sticky', top: '7rem',
            }}
          >
            <p style={{
              fontFamily: 'Inter', fontSize: '0.62rem',
              letterSpacing: '0.2em', color: 'var(--silver)',
              textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>Bestelling</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
              {items.map(item => (
                <div key={item.key} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={item.img} alt={item.name}
                      style={{ width: 60, height: 80, objectFit: 'cover' }} />
                    <span style={{
                      position: 'absolute', top: -6, right: -6,
                      background: 'var(--silver)', color: 'var(--black)',
                      borderRadius: '50%', width: 18, height: 18,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', fontFamily: 'Inter', fontWeight: 700,
                    }}>{item.qty}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem', color: 'var(--off-white)', fontWeight: 700 }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {item.sub} — {item.size}
                    </p>
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--off-white)' }}>
                    {(item.priceNum * item.qty).toFixed(2).replace('.', ',')} €
                  </p>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.2rem' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--silver)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Subtotaal</p>
              <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--off-white)' }}>{totalPrice.toFixed(2).replace('.', ',')} €</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--silver)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Verzending</p>
              <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--silver)' }}>Berekend bij betaling</p>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.2rem' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: 'var(--off-white)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Totaal</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--off-white)', fontWeight: 700 }}>
                {totalPrice.toFixed(2).replace('.', ',')} €
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .checkout-grid > div:last-child {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </div>
  )
}
