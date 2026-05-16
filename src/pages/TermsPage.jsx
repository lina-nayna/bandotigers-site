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

export default function TermsPage() {
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
          }}>Algemene<br /><em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Voorwaarden</em></h1>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.75rem',
            color: 'var(--silver)', letterSpacing: '0.1em',
          }}>Geldig vanaf: Mei 2025 · Van toepassing op alle aankopen via bandotigerss.com</p>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 4rem 8rem' }}>
          <Section title="1. Identiteit van de verkoper">
            <p>Bando Tigers<br />België<br />E-mail: <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a><br />Website: bandotigerss.com</p>
          </Section>

          <Section title="2. Toepassingsgebied">
            <p>Deze algemene voorwaarden zijn van toepassing op alle aankopen gedaan via bandotigerss.com. Door een bestelling te plaatsen aanvaard je deze voorwaarden volledig.</p>
          </Section>

          <Section title="3. Aanbod en prijzen">
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Alle prijzen zijn inclusief 21% btw, exclusief verzendkosten tenzij anders vermeld</li>
              <li style={{ marginBottom: '0.5rem' }}>Wij behouden het recht om prijzen te wijzigen zonder voorafgaande kennisgeving</li>
              <li style={{ marginBottom: '0.5rem' }}>Stukken zijn gelimiteerd — zodra uitverkocht, wordt er niet gerestockt</li>
              <li style={{ marginBottom: '0.5rem' }}>Alle afbeeldingen zijn zo accuraat mogelijk maar kleuren kunnen licht afwijken op scherm</li>
            </ul>
          </Section>

          <Section title="4. Bestellingen">
            <p>Een bestelling is pas definitief na ontvangst van je orderbevestiging per e-mail. Wij behouden het recht om een bestelling te annuleren bij fraude of technische fouten.</p>
          </Section>

          <Section title="5. Betaling">
            <p>Wij aanvaarden:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Krediet- en debetkaarten (Visa, Mastercard, American Express)</li>
              <li style={{ marginBottom: '0.5rem' }}>Bancontact</li>
              <li style={{ marginBottom: '0.5rem' }}>iDEAL</li>
              <li style={{ marginBottom: '0.5rem' }}>Apple Pay / Google Pay</li>
            </ul>
            <p style={{ marginTop: '0.8rem' }}>Betalingen worden beveiligd verwerkt via Shopify Payments.</p>
          </Section>

          <Section title="6. Verzending en levering">
            <p>Verwachte levertijden na betaling:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--off-white)' }}>België, Nederland, Luxemburg, Duitsland:</strong> 2–4 werkdagen — gratis</li>
              <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--off-white)' }}>Rest van Europa:</strong> 3–7 werkdagen — €7,95 (gratis boven €150)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--off-white)' }}>Wereldwijd:</strong> 5–12 werkdagen — €14,95 (gratis boven €150)</li>
            </ul>
            <p style={{ marginTop: '0.8rem' }}>Wij zijn niet verantwoordelijk voor vertragingen door de vervoerder of douane.</p>
          </Section>

          <Section title="7. Herroepingsrecht">
            <p>Je hebt het recht om je bestelling binnen <strong style={{ color: 'var(--off-white)' }}>14 dagen</strong> na ontvangst te retourneren, zonder opgave van reden.</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Artikelen moeten ongedragen, ongewassen en met alle originele labels zijn</li>
              <li style={{ marginBottom: '0.5rem' }}>Retourkosten zijn voor de klant</li>
              <li style={{ marginBottom: '0.5rem' }}>Stuur een e-mail naar bandotiger@hotmail.com om je retour aan te melden</li>
              <li style={{ marginBottom: '0.5rem' }}>Terugbetaling volgt binnen 14 werkdagen na ontvangst van de retour</li>
            </ul>
          </Section>

          <Section title="8. Garantie en klachten">
            <p>Producten met fabricagefouten of schade kunnen worden teruggestuurd. Neem contact op via <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a> met foto's van het probleem.</p>
          </Section>

          <Section title="9. Aansprakelijkheid">
            <p>Bando Tigers is niet aansprakelijk voor indirecte schade, gevolgschade of winstderving. Onze aansprakelijkheid is beperkt tot het bedrag van de betreffende bestelling.</p>
          </Section>

          <Section title="10. Toepasselijk recht">
            <p>Op deze voorwaarden is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbanken in België. Als consument kun je ook terecht bij het Online Dispute Resolution-platform van de Europese Commissie: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>ec.europa.eu/consumers/odr</a></p>
          </Section>

          <div style={{
            display: 'flex', gap: '2rem', marginTop: '4rem',
            paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}>
            <Link to="/privacy" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Privacybeleid →</Link>
            <Link to="/cookies" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Cookiebeleid →</Link>
            <Link to="/" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>← Terug naar home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
