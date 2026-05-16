import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.4rem', fontWeight: 700,
      color: 'var(--off-white)', marginBottom: '1rem',
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{title}</h2>
    <div style={{
      fontFamily: 'Inter', fontSize: '0.82rem',
      color: 'rgba(242,237,230,0.65)', lineHeight: 1.9,
    }}>
      {children}
    </div>
  </div>
)

export default function CookiePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
        {/* Hero */}
        <div style={{
          padding: '12rem 4rem 6rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          maxWidth: '800px', margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.58rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--silver)', marginBottom: '1.2rem',
          }}>— Legal</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 900, color: 'var(--off-white)',
            textTransform: 'uppercase', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>Cookie<br /><em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Beleid</em></h1>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.75rem',
            color: 'var(--silver)', letterSpacing: '0.1em',
          }}>Laatst bijgewerkt: Mei 2025</p>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 4rem 8rem' }}>
          <Section title="1. Wat zijn cookies?">
            <p>Cookies zijn kleine tekstbestanden die op jouw apparaat worden opgeslagen wanneer je onze website bezoekt. Ze helpen ons de website goed te laten functioneren en te verbeteren.</p>
          </Section>

          <Section title="2. Welke cookies gebruiken wij?">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
              {[
                {
                  type: 'Strikt noodzakelijke cookies',
                  desc: 'Deze cookies zijn noodzakelijk voor de werking van de website. Ze onthouden je winkelwagen, taalvoorkeur en inlogsessie. Je kunt deze niet uitschakelen.',
                  examples: 'bt-cart (winkelwagen), bt-early-access (early access lijst)',
                  required: true,
                },
                {
                  type: 'Analytische cookies',
                  desc: 'Wij kunnen analytische tools gebruiken (zoals Google Analytics) om te zien welke paginas populair zijn en hoe bezoekers de site gebruiken. Deze data is geanonimiseerd.',
                  examples: '_ga, _gid (Google Analytics)',
                  required: false,
                },
                {
                  type: 'Functionele cookies',
                  desc: 'Cookies die jouw voorkeuren opslaan, zoals taalinstelling of eerder bekeken producten.',
                  examples: 'Taalvoorkeur, recente producten',
                  required: false,
                },
              ].map(cookie => (
                <div key={cookie.type} style={{
                  padding: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem',
                  }}>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--off-white)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cookie.type}</p>
                    <span style={{
                      fontFamily: 'Inter', fontSize: '0.5rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      background: cookie.required ? 'rgba(212,130,90,0.15)' : 'rgba(255,255,255,0.06)',
                      color: cookie.required ? '#D4825A' : 'var(--silver)',
                      border: `1px solid ${cookie.required ? 'rgba(212,130,90,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                      {cookie.required ? 'Verplicht' : 'Optioneel'}
                    </span>
                  </div>
                  <p style={{ marginBottom: '0.5rem' }}>{cookie.desc}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(242,237,230,0.4)' }}>Voorbeelden: {cookie.examples}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Hoe lang blijven cookies actief?">
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Sessiecookies: verdwijnen automatisch als je je browser sluit</li>
              <li style={{ marginBottom: '0.5rem' }}>Persistente cookies: blijven actief voor een bepaalde periode (max. 2 jaar)</li>
              <li style={{ marginBottom: '0.5rem' }}>Onze winkelwagen cookie (bt-cart) blijft actief totdat je hem leegt of je browser lokale opslag wist</li>
            </ul>
          </Section>

          <Section title="4. Cookies uitschakelen of verwijderen">
            <p>Je kunt cookies uitschakelen via de instellingen van je browser. Let op: als je cookies uitschakelt, werkt de winkelwagen mogelijk niet meer correct.</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>Google Chrome</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>Mozilla Firefox</a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>Safari</a>
              </li>
            </ul>
          </Section>

          <Section title="5. Derde partijen">
            <p>Onze betalingsprovider Shopify Payments kan eigen cookies plaatsen voor fraudepreventie en betalingsverwerking. Shopify voldoet aan de AVG/GDPR. Meer info: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>shopify.com/legal/privacy</a></p>
          </Section>

          <Section title="6. Wijzigingen in dit beleid">
            <p>Wij kunnen dit cookiebeleid van tijd tot tijd aanpassen. De meest recente versie staat altijd op deze pagina met de datum van de laatste aanpassing.</p>
          </Section>

          <Section title="7. Contact">
            <p>Vragen over ons cookiebeleid? Stuur een e-mail naar <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a></p>
          </Section>

          <div style={{
            display: 'flex', gap: '2rem', marginTop: '4rem',
            paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}>
            <Link to="/privacy" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Privacybeleid →</Link>
            <Link to="/terms" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Algemene voorwaarden →</Link>
            <Link to="/" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>← Terug naar home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
