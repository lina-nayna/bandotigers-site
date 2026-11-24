/* eslint-disable react-refresh/only-export-components */
/* Juridische teksten in drie talen. De Nederlandse tekst is het origineel;
   Engels en Frans zijn vertalingen. Pas je iets aan, doe het dan in alle drie. */
import { Link } from 'react-router-dom'

const EMAIL = 'bandotiger@hotmail.com'
const a = { color: 'var(--off-white)' }
const Mail = () => <a href={`mailto:${EMAIL}`} style={a}>{EMAIL}</a>
const Ext = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={a}>{children}</a>
const B = ({ children }) => <strong style={{ color: 'var(--off-white)' }}>{children}</strong>
const UL = ({ items, top }) => (
  <ul style={{ paddingLeft: '1.5rem', marginTop: top ? '0.8rem' : 0 }}>
    {items.map((it, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{it}</li>)}
  </ul>
)
const P = ({ children, top }) => <p style={top ? { marginTop: '0.8rem' } : undefined}>{children}</p>

/* ───────────── ALGEMENE VOORWAARDEN ───────────── */
export const terms = {
  nl: {
    title1: 'Algemene', title2: 'Voorwaarden',
    subtitle: 'Geldig vanaf: Mei 2025 · Van toepassing op alle aankopen via bandotigerss.com',
    sections: [
      { title: '1. Identiteit van de verkoper', body: <p>Bando Tigers<br />België<br />E-mail: <Mail /><br />Website: bandotigerss.com</p> },
      { title: '2. Toepassingsgebied', body: <p>Deze algemene voorwaarden zijn van toepassing op alle aankopen gedaan via bandotigerss.com. Door een bestelling te plaatsen aanvaard je deze voorwaarden volledig.</p> },
      { title: '3. Aanbod en prijzen', body: <UL items={[
        'Alle prijzen zijn inclusief 21% btw, exclusief verzendkosten tenzij anders vermeld',
        'Wij behouden het recht om prijzen te wijzigen zonder voorafgaande kennisgeving',
        'Stukken zijn gelimiteerd — zodra uitverkocht, wordt er niet gerestockt',
        'Alle afbeeldingen zijn zo accuraat mogelijk maar kleuren kunnen licht afwijken op scherm',
      ]} /> },
      { title: '4. Bestellingen', body: <p>Een bestelling is pas definitief na ontvangst van je orderbevestiging per e-mail. Wij behouden het recht om een bestelling te annuleren bij fraude of technische fouten.</p> },
      { title: '5. Betaling', body: <>
        <p>Wij aanvaarden:</p>
        <UL top items={['Krediet- en debetkaarten (Visa, Mastercard, American Express)', 'Bancontact', 'iDEAL', 'Apple Pay / Google Pay']} />
        <P top>Betalingen worden beveiligd verwerkt via Shopify Payments.</P>
      </> },
      { id: 'verzending', title: '6. Verzending en levering', body: <>
        <p>Verwachte levertijden na betaling:</p>
        <UL top items={[
          <><B>België, Nederland, Luxemburg, Duitsland:</B> 2–4 werkdagen — gratis</>,
          <><B>Rest van Europa:</B> 3–7 werkdagen — €7,95 (gratis boven €150)</>,
          <><B>Wereldwijd:</B> 5–12 werkdagen — €14,95 (gratis boven €150)</>,
        ]} />
        <P top>Wij zijn niet verantwoordelijk voor vertragingen door de vervoerder of douane.</P>
      </> },
      { id: 'herroeping', title: '7. Herroepingsrecht', body: <>
        <p>Je hebt het recht om je bestelling binnen <B>14 dagen</B> na ontvangst te retourneren, zonder opgave van reden.</p>
        <UL top items={[
          'Artikelen moeten ongedragen, ongewassen en met alle originele labels zijn',
          'Retourkosten zijn voor de klant',
          `Stuur een e-mail naar ${EMAIL} om je retour aan te melden`,
          'Terugbetaling volgt binnen 14 werkdagen na ontvangst van de retour',
        ]} />
      </> },
      { title: '8. Garantie en klachten', body: <p>Producten met fabricagefouten of schade kunnen worden teruggestuurd. Neem contact op via <Mail /> met foto's van het probleem.</p> },
      { title: '9. Aansprakelijkheid', body: <p>Bando Tigers is niet aansprakelijk voor indirecte schade, gevolgschade of winstderving. Onze aansprakelijkheid is beperkt tot het bedrag van de betreffende bestelling.</p> },
      { title: '10. Toepasselijk recht', body: <p>Op deze voorwaarden is het Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbanken in België. Als consument kun je ook terecht bij het Online Dispute Resolution-platform van de Europese Commissie: <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext></p> },
    ],
  },
  en: {
    title1: 'Terms &', title2: 'Conditions',
    subtitle: 'Effective from: May 2025 · Applies to all purchases via bandotigerss.com',
    sections: [
      { title: '1. Seller identity', body: <p>Bando Tigers<br />Belgium<br />Email: <Mail /><br />Website: bandotigerss.com</p> },
      { title: '2. Scope', body: <p>These terms and conditions apply to all purchases made via bandotigerss.com. By placing an order, you fully accept these terms.</p> },
      { title: '3. Offer and prices', body: <UL items={[
        'All prices include 21% VAT and exclude shipping costs unless stated otherwise',
        'We reserve the right to change prices without prior notice',
        'Pieces are limited — once sold out, they will not be restocked',
        'All images are as accurate as possible, but colours may differ slightly on screen',
      ]} /> },
      { title: '4. Orders', body: <p>An order is only final once you receive your order confirmation by email. We reserve the right to cancel an order in case of fraud or technical errors.</p> },
      { title: '5. Payment', body: <>
        <p>We accept:</p>
        <UL top items={['Credit and debit cards (Visa, Mastercard, American Express)', 'Bancontact', 'iDEAL', 'Apple Pay / Google Pay']} />
        <P top>Payments are processed securely via Shopify Payments.</P>
      </> },
      { id: 'verzending', title: '6. Shipping and delivery', body: <>
        <p>Expected delivery times after payment:</p>
        <UL top items={[
          <><B>Belgium, the Netherlands, Luxembourg, Germany:</B> 2–4 working days — free</>,
          <><B>Rest of Europe:</B> 3–7 working days — €7.95 (free over €150)</>,
          <><B>Worldwide:</B> 5–12 working days — €14.95 (free over €150)</>,
        ]} />
        <P top>We are not responsible for delays caused by the carrier or customs.</P>
      </> },
      { id: 'herroeping', title: '7. Right of withdrawal', body: <>
        <p>You have the right to return your order within <B>14 days</B> of receipt, without giving a reason.</p>
        <UL top items={[
          'Items must be unworn, unwashed and with all original labels attached',
          'Return shipping costs are paid by the customer',
          `Send an email to ${EMAIL} to register your return`,
          'Refunds are made within 14 working days of receiving the return',
        ]} />
      </> },
      { title: '8. Warranty and complaints', body: <p>Products with manufacturing defects or damage can be returned. Contact us at <Mail /> with photos of the problem.</p> },
      { title: '9. Liability', body: <p>Bando Tigers is not liable for indirect damage, consequential damage or loss of profit. Our liability is limited to the amount of the order concerned.</p> },
      { title: '10. Applicable law', body: <p>These terms are governed by Belgian law. Disputes will be submitted to the competent courts in Belgium. As a consumer, you can also use the European Commission's Online Dispute Resolution platform: <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext></p> },
    ],
  },
  fr: {
    title1: 'Conditions', title2: 'Générales',
    subtitle: 'En vigueur depuis : mai 2025 · Applicables à tous les achats sur bandotigerss.com',
    sections: [
      { title: '1. Identité du vendeur', body: <p>Bando Tigers<br />Belgique<br />E-mail : <Mail /><br />Site web : bandotigerss.com</p> },
      { title: "2. Champ d'application", body: <p>Les présentes conditions générales s'appliquent à tous les achats effectués sur bandotigerss.com. En passant commande, tu acceptes pleinement ces conditions.</p> },
      { title: '3. Offre et prix', body: <UL items={[
        'Tous les prix incluent 21 % de TVA, hors frais de livraison sauf mention contraire',
        'Nous nous réservons le droit de modifier les prix sans préavis',
        'Les pièces sont limitées — une fois épuisées, elles ne sont pas réassorties',
        "Toutes les images sont aussi fidèles que possible, mais les couleurs peuvent légèrement varier à l'écran",
      ]} /> },
      { title: '4. Commandes', body: <p>Une commande n'est définitive qu'après réception de la confirmation de commande par e-mail. Nous nous réservons le droit d'annuler une commande en cas de fraude ou d'erreur technique.</p> },
      { title: '5. Paiement', body: <>
        <p>Nous acceptons :</p>
        <UL top items={['Cartes de crédit et de débit (Visa, Mastercard, American Express)', 'Bancontact', 'iDEAL', 'Apple Pay / Google Pay']} />
        <P top>Les paiements sont traités de manière sécurisée via Shopify Payments.</P>
      </> },
      { id: 'verzending', title: '6. Expédition et livraison', body: <>
        <p>Délais de livraison prévus après paiement :</p>
        <UL top items={[
          <><B>Belgique, Pays-Bas, Luxembourg, Allemagne :</B> 2 à 4 jours ouvrables — gratuit</>,
          <><B>Reste de l'Europe :</B> 3 à 7 jours ouvrables — 7,95 € (gratuit dès 150 €)</>,
          <><B>Monde entier :</B> 5 à 12 jours ouvrables — 14,95 € (gratuit dès 150 €)</>,
        ]} />
        <P top>Nous ne sommes pas responsables des retards dus au transporteur ou à la douane.</P>
      </> },
      { id: 'herroeping', title: '7. Droit de rétractation', body: <>
        <p>Tu as le droit de retourner ta commande dans les <B>14 jours</B> suivant sa réception, sans avoir à te justifier.</p>
        <UL top items={[
          'Les articles doivent être non portés, non lavés et munis de toutes leurs étiquettes d\'origine',
          'Les frais de retour sont à la charge du client',
          `Envoie un e-mail à ${EMAIL} pour signaler ton retour`,
          'Le remboursement est effectué dans les 14 jours ouvrables suivant la réception du retour',
        ]} />
      </> },
      { title: '8. Garantie et réclamations', body: <p>Les produits présentant un défaut de fabrication ou un dommage peuvent être renvoyés. Contacte-nous à <Mail /> avec des photos du problème.</p> },
      { title: '9. Responsabilité', body: <p>Bando Tigers n'est pas responsable des dommages indirects, des dommages consécutifs ou du manque à gagner. Notre responsabilité est limitée au montant de la commande concernée.</p> },
      { title: '10. Droit applicable', body: <p>Les présentes conditions sont régies par le droit belge. Les litiges sont soumis aux tribunaux compétents en Belgique. En tant que consommateur, tu peux aussi recourir à la plateforme de règlement en ligne des litiges de la Commission européenne : <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext></p> },
    ],
  },
}

/* ───────────── PRIVACYBELEID ───────────── */
export const privacy = {
  nl: {
    title1: 'Privacy', title2: 'Beleid',
    subtitle: 'Laatst bijgewerkt: Mei 2025',
    sections: [
      { title: '1. Wie zijn wij?', body: <>
        <p>Bando Tigers is een Belgisch premium streetwear merk. Wij zijn verantwoordelijk voor de verwerking van jouw persoonsgegevens als je onze website bezoekt (bandotigerss.com) of bij ons bestelt.</p>
        <P top>Contact: <Mail /></P>
      </> },
      { title: '2. Welke gegevens verzamelen wij?', body: <>
        <p>Wij verwerken de volgende persoonsgegevens:</p>
        <UL top items={[
          'Naam en e-mailadres (bij nieuwsbrief inschrijving of early access)',
          'Naam, adres, telefoonnummer (bij het plaatsen van een bestelling)',
          'Betalingsgegevens (verwerkt via Shopify Payments — wij zien nooit jouw volledige kaartgegevens)',
          'Browsing- en klikgedrag via analytische cookies (zie Cookiebeleid)',
        ]} />
      </> },
      { title: '3. Waarvoor gebruiken wij jouw gegevens?', body: <UL items={[
        'Verwerken en leveren van je bestelling',
        'Sturen van orderbevestigingen en verzendmeldingen',
        'Versturen van onze nieuwsbrief (alleen als je je hebt aangemeld)',
        'Verbeteren van onze website en klantenservice',
        'Voldoen aan wettelijke verplichtingen',
      ]} /> },
      { title: '4. Hoe lang bewaren wij je gegevens?', body: <>
        <p>Wij bewaren je gegevens niet langer dan noodzakelijk:</p>
        <UL top items={['Bestelgegevens: 7 jaar (wettelijke bewaarplicht)', 'Nieuwsbrief: tot jij je uitschrijft', 'Analytische cookies: max. 2 jaar']} />
      </> },
      { title: '5. Delen wij jouw gegevens?', body: <>
        <p>Wij verkopen jouw gegevens nooit. Wij delen ze enkel met:</p>
        <UL top items={['Shopify Inc. — voor websitebeheer en betalingen', 'Verzendpartners (PostNL, bPost) — voor levering van je bestelling', 'Belastingautoriteiten — indien wettelijk vereist']} />
      </> },
      { title: '6. Jouw rechten (AVG/GDPR)', body: <>
        <p>Onder de AVG heb je het recht op:</p>
        <UL top items={['Inzage van je persoonsgegevens', 'Correctie van onjuiste gegevens', 'Verwijdering van je gegevens ("recht op vergetelheid")', 'Bezwaar tegen gebruik van je gegevens voor marketing', 'Overdraagbaarheid van je gegevens']} />
        <p style={{ marginTop: '1rem' }}>Mail je verzoek naar <Mail />. Wij reageren binnen 30 dagen.</p>
      </> },
      { title: '7. Beveiliging', body: <p>Wij nemen passende technische en organisatorische maatregelen om jouw gegevens te beschermen. Onze website gebruikt HTTPS-encryptie. Betalingen worden beveiligd verwerkt door Shopify Payments (PCI DSS compliant).</p> },
      { title: '8. Cookies', body: <p>Wij gebruiken cookies om onze website goed te laten werken. Zie ons <Link to="/cookies" style={a}>Cookiebeleid</Link> voor meer informatie.</p> },
      { title: '9. Contact en klachten', body: <p>Vragen of klachten over onze privacypraktijken? Stuur een e-mail naar <Mail />. Je hebt ook het recht om een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA): <Ext href="https://www.gegevensbeschermingsautoriteit.be">gegevensbeschermingsautoriteit.be</Ext></p> },
    ],
  },
  en: {
    title1: 'Privacy', title2: 'Policy',
    subtitle: 'Last updated: May 2025',
    sections: [
      { title: '1. Who are we?', body: <>
        <p>Bando Tigers is a Belgian premium streetwear brand. We are responsible for processing your personal data when you visit our website (bandotigerss.com) or order from us.</p>
        <P top>Contact: <Mail /></P>
      </> },
      { title: '2. What data do we collect?', body: <>
        <p>We process the following personal data:</p>
        <UL top items={[
          'Name and email address (when signing up for the newsletter or early access)',
          'Name, address, phone number (when placing an order)',
          'Payment details (processed via Shopify Payments — we never see your full card details)',
          'Browsing and click behaviour via analytics cookies (see Cookie Policy)',
        ]} />
      </> },
      { title: '3. What do we use your data for?', body: <UL items={[
        'Processing and delivering your order',
        'Sending order confirmations and shipping notifications',
        'Sending our newsletter (only if you signed up)',
        'Improving our website and customer service',
        'Complying with legal obligations',
      ]} /> },
      { title: '4. How long do we keep your data?', body: <>
        <p>We do not keep your data longer than necessary:</p>
        <UL top items={['Order data: 7 years (legal retention requirement)', 'Newsletter: until you unsubscribe', 'Analytics cookies: max. 2 years']} />
      </> },
      { title: '5. Do we share your data?', body: <>
        <p>We never sell your data. We only share it with:</p>
        <UL top items={['Shopify Inc. — for website management and payments', 'Shipping partners (PostNL, bPost) — to deliver your order', 'Tax authorities — when legally required']} />
      </> },
      { title: '6. Your rights (GDPR)', body: <>
        <p>Under the GDPR, you have the right to:</p>
        <UL top items={['Access your personal data', 'Correct inaccurate data', 'Have your data deleted ("right to be forgotten")', 'Object to the use of your data for marketing', 'Data portability']} />
        <p style={{ marginTop: '1rem' }}>Email your request to <Mail />. We respond within 30 days.</p>
      </> },
      { title: '7. Security', body: <p>We take appropriate technical and organisational measures to protect your data. Our website uses HTTPS encryption. Payments are processed securely by Shopify Payments (PCI DSS compliant).</p> },
      { title: '8. Cookies', body: <p>We use cookies to make our website work properly. See our <Link to="/cookies" style={a}>Cookie Policy</Link> for more information.</p> },
      { title: '9. Contact and complaints', body: <p>Questions or complaints about our privacy practices? Send an email to <Mail />. You also have the right to file a complaint with the Belgian Data Protection Authority (GBA/APD): <Ext href="https://www.dataprotectionauthority.be">dataprotectionauthority.be</Ext></p> },
    ],
  },
  fr: {
    title1: 'Politique de', title2: 'Confidentialité',
    subtitle: 'Dernière mise à jour : mai 2025',
    sections: [
      { title: '1. Qui sommes-nous ?', body: <>
        <p>Bando Tigers est une marque belge de streetwear premium. Nous sommes responsables du traitement de tes données personnelles lorsque tu visites notre site (bandotigerss.com) ou que tu passes commande chez nous.</p>
        <P top>Contact : <Mail /></P>
      </> },
      { title: '2. Quelles données collectons-nous ?', body: <>
        <p>Nous traitons les données personnelles suivantes :</p>
        <UL top items={[
          "Nom et adresse e-mail (lors de l'inscription à la newsletter ou à l'accès anticipé)",
          "Nom, adresse, numéro de téléphone (lors d'une commande)",
          'Données de paiement (traitées via Shopify Payments — nous ne voyons jamais tes données de carte complètes)',
          'Comportement de navigation et de clic via des cookies analytiques (voir Politique en matière de cookies)',
        ]} />
      </> },
      { title: '3. À quoi servent tes données ?', body: <UL items={[
        'Traiter et livrer ta commande',
        "Envoyer les confirmations de commande et les avis d'expédition",
        'Envoyer notre newsletter (uniquement si tu es inscrit)',
        'Améliorer notre site et notre service client',
        'Respecter nos obligations légales',
      ]} /> },
      { title: '4. Combien de temps conservons-nous tes données ?', body: <>
        <p>Nous ne conservons pas tes données plus longtemps que nécessaire :</p>
        <UL top items={['Données de commande : 7 ans (obligation légale de conservation)', "Newsletter : jusqu'à ta désinscription", 'Cookies analytiques : 2 ans maximum']} />
      </> },
      { title: '5. Partageons-nous tes données ?', body: <>
        <p>Nous ne vendons jamais tes données. Nous les partageons uniquement avec :</p>
        <UL top items={['Shopify Inc. — pour la gestion du site et les paiements', 'Nos partenaires de livraison (PostNL, bpost) — pour livrer ta commande', "Les autorités fiscales — lorsque la loi l'exige"]} />
      </> },
      { title: '6. Tes droits (RGPD)', body: <>
        <p>En vertu du RGPD, tu as le droit :</p>
        <UL top items={["d'accéder à tes données personnelles", 'de corriger des données inexactes', "de faire supprimer tes données (« droit à l'oubli »)", "de t'opposer à l'utilisation de tes données à des fins marketing", 'à la portabilité de tes données']} />
        <p style={{ marginTop: '1rem' }}>Envoie ta demande à <Mail />. Nous répondons dans les 30 jours.</p>
      </> },
      { title: '7. Sécurité', body: <p>Nous prenons les mesures techniques et organisationnelles appropriées pour protéger tes données. Notre site utilise le chiffrement HTTPS. Les paiements sont traités de manière sécurisée par Shopify Payments (conforme PCI DSS).</p> },
      { title: '8. Cookies', body: <p>Nous utilisons des cookies pour assurer le bon fonctionnement de notre site. Consulte notre <Link to="/cookies" style={a}>Politique en matière de cookies</Link> pour plus d'informations.</p> },
      { title: '9. Contact et réclamations', body: <p>Des questions ou des réclamations concernant nos pratiques en matière de vie privée ? Envoie un e-mail à <Mail />. Tu as également le droit d'introduire une réclamation auprès de l'Autorité de protection des données (APD) : <Ext href="https://www.autoriteprotectiondonnees.be">autoriteprotectiondonnees.be</Ext></p> },
    ],
  },
}

/* ───────────── COOKIEBELEID ───────────── */
const CookieCards = ({ cards, requiredLabel, optionalLabel, examplesLabel }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
    {cards.map(cookie => (
      <div key={cookie.type} style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--off-white)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cookie.type}</p>
          <span style={{
            fontFamily: 'Inter', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.2rem 0.6rem',
            background: cookie.required ? 'rgba(212,130,90,0.15)' : 'rgba(255,255,255,0.06)',
            color: cookie.required ? '#D4825A' : 'var(--silver)',
            border: `1px solid ${cookie.required ? 'rgba(212,130,90,0.3)' : 'rgba(255,255,255,0.1)'}`,
          }}>{cookie.required ? requiredLabel : optionalLabel}</span>
        </div>
        <p style={{ marginBottom: '0.5rem' }}>{cookie.desc}</p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(242,237,230,0.4)' }}>{examplesLabel}: {cookie.examples}</p>
      </div>
    ))}
  </div>
)

const browsers = (firefox, safari) => (
  <UL top items={[
    <Ext href="https://support.google.com/chrome/answer/95647">Google Chrome</Ext>,
    <Ext href={firefox}>Mozilla Firefox</Ext>,
    <Ext href={safari}>Safari</Ext>,
  ]} />
)

export const cookies = {
  nl: {
    title1: 'Cookie', title2: 'Beleid',
    subtitle: 'Laatst bijgewerkt: Mei 2025',
    sections: [
      { title: '1. Wat zijn cookies?', body: <p>Cookies zijn kleine tekstbestanden die op jouw apparaat worden opgeslagen wanneer je onze website bezoekt. Ze helpen ons de website goed te laten functioneren en te verbeteren.</p> },
      { title: '2. Welke cookies gebruiken wij?', body: <CookieCards requiredLabel="Verplicht" optionalLabel="Optioneel" examplesLabel="Voorbeelden" cards={[
        { type: 'Strikt noodzakelijke cookies', desc: 'Deze cookies zijn noodzakelijk voor de werking van de website. Ze onthouden je winkelwagen, taalvoorkeur en inlogsessie. Je kunt deze niet uitschakelen.', examples: 'bt-cart (winkelwagen), bt-lang (taal), bt-early-access (early access lijst)', required: true },
        { type: 'Analytische cookies', desc: 'Wij kunnen analytische tools gebruiken (zoals Google Analytics) om te zien welke paginas populair zijn en hoe bezoekers de site gebruiken. Deze data is geanonimiseerd.', examples: '_ga, _gid (Google Analytics)', required: false },
        { type: 'Functionele cookies', desc: 'Cookies die jouw voorkeuren opslaan, zoals taalinstelling of eerder bekeken producten.', examples: 'Taalvoorkeur, recente producten', required: false },
      ]} /> },
      { title: '3. Hoe lang blijven cookies actief?', body: <UL items={[
        'Sessiecookies: verdwijnen automatisch als je je browser sluit',
        'Persistente cookies: blijven actief voor een bepaalde periode (max. 2 jaar)',
        'Onze winkelwagen cookie (bt-cart) blijft actief totdat je hem leegt of je browser lokale opslag wist',
      ]} /> },
      { title: '4. Cookies uitschakelen of verwijderen', body: <>
        <p>Je kunt cookies uitschakelen via de instellingen van je browser. Let op: als je cookies uitschakelt, werkt de winkelwagen mogelijk niet meer correct.</p>
        {browsers('https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen', 'https://support.apple.com/nl-be/guide/safari/sfri11471/mac')}
      </> },
      { title: '5. Derde partijen', body: <p>Onze betalingsprovider Shopify Payments kan eigen cookies plaatsen voor fraudepreventie en betalingsverwerking. Shopify voldoet aan de AVG/GDPR. Meer info: <Ext href="https://www.shopify.com/legal/privacy">shopify.com/legal/privacy</Ext></p> },
      { title: '6. Wijzigingen in dit beleid', body: <p>Wij kunnen dit cookiebeleid van tijd tot tijd aanpassen. De meest recente versie staat altijd op deze pagina met de datum van de laatste aanpassing.</p> },
      { title: '7. Contact', body: <p>Vragen over ons cookiebeleid? Stuur een e-mail naar <Mail /></p> },
    ],
  },
  en: {
    title1: 'Cookie', title2: 'Policy',
    subtitle: 'Last updated: May 2025',
    sections: [
      { title: '1. What are cookies?', body: <p>Cookies are small text files stored on your device when you visit our website. They help us make the website work properly and improve it.</p> },
      { title: '2. Which cookies do we use?', body: <CookieCards requiredLabel="Required" optionalLabel="Optional" examplesLabel="Examples" cards={[
        { type: 'Strictly necessary cookies', desc: 'These cookies are necessary for the website to work. They remember your cart, language preference and login session. You cannot disable them.', examples: 'bt-cart (cart), bt-lang (language), bt-early-access (early access list)', required: true },
        { type: 'Analytics cookies', desc: 'We may use analytics tools (such as Google Analytics) to see which pages are popular and how visitors use the site. This data is anonymised.', examples: '_ga, _gid (Google Analytics)', required: false },
        { type: 'Functional cookies', desc: 'Cookies that store your preferences, such as language settings or recently viewed products.', examples: 'Language preference, recent products', required: false },
      ]} /> },
      { title: '3. How long do cookies stay active?', body: <UL items={[
        'Session cookies: disappear automatically when you close your browser',
        'Persistent cookies: remain active for a set period (max. 2 years)',
        "Our cart cookie (bt-cart) remains active until you empty it or clear your browser's local storage",
      ]} /> },
      { title: '4. Disabling or deleting cookies', body: <>
        <p>You can disable cookies in your browser settings. Please note: if you disable cookies, the cart may no longer work correctly.</p>
        {browsers('https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox', 'https://support.apple.com/guide/safari/sfri11471/mac')}
      </> },
      { title: '5. Third parties', body: <p>Our payment provider Shopify Payments may place its own cookies for fraud prevention and payment processing. Shopify complies with the GDPR. More info: <Ext href="https://www.shopify.com/legal/privacy">shopify.com/legal/privacy</Ext></p> },
      { title: '6. Changes to this policy', body: <p>We may update this cookie policy from time to time. The most recent version is always on this page, with the date of the last update.</p> },
      { title: '7. Contact', body: <p>Questions about our cookie policy? Send an email to <Mail /></p> },
    ],
  },
  fr: {
    title1: 'Politique', title2: 'Cookies',
    subtitle: 'Dernière mise à jour : mai 2025',
    sections: [
      { title: "1. Qu'est-ce qu'un cookie ?", body: <p>Les cookies sont de petits fichiers texte enregistrés sur ton appareil lorsque tu visites notre site. Ils nous aident à faire fonctionner le site correctement et à l'améliorer.</p> },
      { title: '2. Quels cookies utilisons-nous ?', body: <CookieCards requiredLabel="Obligatoire" optionalLabel="Facultatif" examplesLabel="Exemples" cards={[
        { type: 'Cookies strictement nécessaires', desc: 'Ces cookies sont indispensables au fonctionnement du site. Ils retiennent ton panier, ta préférence de langue et ta session. Tu ne peux pas les désactiver.', examples: 'bt-cart (panier), bt-lang (langue), bt-early-access (liste accès anticipé)', required: true },
        { type: 'Cookies analytiques', desc: 'Nous pouvons utiliser des outils analytiques (comme Google Analytics) pour voir quelles pages sont populaires et comment les visiteurs utilisent le site. Ces données sont anonymisées.', examples: '_ga, _gid (Google Analytics)', required: false },
        { type: 'Cookies fonctionnels', desc: 'Cookies qui enregistrent tes préférences, comme la langue ou les produits consultés récemment.', examples: 'Préférence de langue, produits récents', required: false },
      ]} /> },
      { title: '3. Combien de temps les cookies restent-ils actifs ?', body: <UL items={[
        'Cookies de session : disparaissent automatiquement à la fermeture du navigateur',
        'Cookies persistants : restent actifs pendant une durée déterminée (2 ans maximum)',
        "Notre cookie de panier (bt-cart) reste actif jusqu'à ce que tu le vides ou que tu effaces le stockage local de ton navigateur",
      ]} /> },
      { title: '4. Désactiver ou supprimer les cookies', body: <>
        <p>Tu peux désactiver les cookies dans les paramètres de ton navigateur. Attention : si tu désactives les cookies, le panier risque de ne plus fonctionner correctement.</p>
        {browsers('https://support.mozilla.org/fr/kb/effacer-cookies-donnees-site-firefox', 'https://support.apple.com/fr-be/guide/safari/sfri11471/mac')}
      </> },
      { title: '5. Tiers', body: <p>Notre prestataire de paiement Shopify Payments peut placer ses propres cookies pour la prévention de la fraude et le traitement des paiements. Shopify est conforme au RGPD. Plus d'infos : <Ext href="https://www.shopify.com/legal/privacy">shopify.com/legal/privacy</Ext></p> },
      { title: '6. Modifications de cette politique', body: <p>Nous pouvons modifier cette politique en matière de cookies de temps à autre. La version la plus récente figure toujours sur cette page, avec la date de la dernière mise à jour.</p> },
      { title: '7. Contact', body: <p>Des questions sur notre politique en matière de cookies ? Envoie un e-mail à <Mail /></p> },
    ],
  },
}
