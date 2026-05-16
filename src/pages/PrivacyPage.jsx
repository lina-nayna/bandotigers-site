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

export default function PrivacyPage() {
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
          }}>Privacy<br /><em style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Policy</em></h1>
          <p style={{
            fontFamily: 'Inter', fontSize: '0.75rem',
            color: 'var(--silver)', letterSpacing: '0.1em',
          }}>Laatst bijgewerkt: Mei 2025</p>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 4rem 8rem' }}>
          <Section title="1. Wie zijn wij?">
            <p>Bando Tigers is een Belgisch premium streetwear merk. Wij zijn verantwoordelijk voor de verwerking van jouw persoonsgegevens als je onze website bezoekt (bandotigerss.com) of bij ons bestelt.</p>
            <p style={{ marginTop: '0.8rem' }}>Contact: <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a></p>
          </Section>

          <Section title="2. Welke gegevens verzamelen wij?">
            <p>Wij verwerken de volgende persoonsgegevens:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Naam en e-mailadres (bij nieuwsbrief inschrijving of early access)</li>
              <li style={{ marginBottom: '0.5rem' }}>Naam, adres, telefoonnummer (bij het plaatsen van een bestelling)</li>
              <li style={{ marginBottom: '0.5rem' }}>Betalingsgegevens (verwerkt via Shopify Payments — wij zien nooit jouw volledige kaartgegevens)</li>
              <li style={{ marginBottom: '0.5rem' }}>Browsing- en klikgedrag via analytische cookies (zie Cookiebeleid)</li>
            </ul>
          </Section>

          <Section title="3. Waarvoor gebruiken wij jouw gegevens?">
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Verwerken en leveren van je bestelling</li>
              <li style={{ marginBottom: '0.5rem' }}>Sturen van orderbevestigingen en verzendmeldingen</li>
              <li style={{ marginBottom: '0.5rem' }}>Versturen van onze nieuwsbrief (alleen als je je hebt aangemeld)</li>
              <li style={{ marginBottom: '0.5rem' }}>Verbeteren van onze website en klantenservice</li>
              <li style={{ marginBottom: '0.5rem' }}>Voldoen aan wettelijke verplichtingen</li>
            </ul>
          </Section>

          <Section title="4. Hoe lang bewaren wij je gegevens?">
            <p>Wij bewaren je gegevens niet langer dan noodzakelijk:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Bestelgegevens: 7 jaar (wettelijke bewaarplicht)</li>
              <li style={{ marginBottom: '0.5rem' }}>Nieuwsbrief: tot jij je uitschrijft</li>
              <li style={{ marginBottom: '0.5rem' }}>Analytische cookies: max. 2 jaar</li>
            </ul>
          </Section>

          <Section title="5. Delen wij jouw gegevens?">
            <p>Wij verkopen jouw gegevens nooit. Wij delen ze enkel met:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Shopify Inc. — voor websitebeheer en betalingen</li>
              <li style={{ marginBottom: '0.5rem' }}>Verzendpartners (PostNL, bPost) — voor levering van je bestelling</li>
              <li style={{ marginBottom: '0.5rem' }}>Belastingautoriteiten — indien wettelijk vereist</li>
            </ul>
          </Section>

          <Section title="6. Jouw rechten (AVG/GDPR)">
            <p>Onder de AVG heb je het recht op:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Inzage van je persoonsgegevens</li>
              <li style={{ marginBottom: '0.5rem' }}>Correctie van onjuiste gegevens</li>
              <li style={{ marginBottom: '0.5rem' }}>Verwijdering van je gegevens ("recht op vergetelheid")</li>
              <li style={{ marginBottom: '0.5rem' }}>Bezwaar tegen gebruik van je gegevens voor marketing</li>
              <li style={{ marginBottom: '0.5rem' }}>Overdraagbaarheid van je gegevens</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>Mail je verzoek naar <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a>. Wij reageren binnen 30 dagen.</p>
          </Section>

          <Section title="7. Beveiliging">
            <p>Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beschermen. Onze website gebruikt HTTPS-encryptie. Betalingen worden beveiligd verwerkt door Shopify Payments (PCI DSS compliant).</p>
          </Section>

          <Section title="8. Cookies">
            <p>Wij gebruiken cookies om onze website goed te laten werken. Zie ons <Link to="/cookies" style={{ color: 'var(--off-white)' }}>Cookiebeleid</Link> voor meer informatie.</p>
          </Section>

          <Section title="9. Contact en klachten">
            <p>Vragen of klachten over onze privacypraktijken? Stuur een e-mail naar <a href="mailto:bandotiger@hotmail.com" style={{ color: 'var(--off-white)' }}>bandotiger@hotmail.com</a>. Je hebt ook het recht om een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA): <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--off-white)' }}>gegevensbeschermingsautoriteit.be</a></p>
          </Section>

          <div style={{
            display: 'flex', gap: '2rem', marginTop: '4rem',
            paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}>
            <Link to="/terms" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Algemene voorwaarden →</Link>
            <Link to="/cookies" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>Cookiebeleid →</Link>
            <Link to="/" style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--silver)', textDecoration: 'none' }}>← Terug naar home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
