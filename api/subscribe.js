/*
 * Inschrijven op de nieuwsbrief.
 *
 * Dit draait op de server, niet in de browser. Dat is het hele punt:
 * de Brevo-sleutel mag nooit in de JavaScript belanden die bezoekers
 * binnenkrijgen, want die kan iedereen lezen.
 *
 * De sleutel komt uit de omgevingsvariabelen van Vercel. BREVO_API_KEY
 * heeft de voorkeur; VITE_BREVO_API_KEY blijft werken zolang die naam
 * nog in Vercel staat, zodat inschrijven niet stukgaat bij het
 * overzetten. Let op: een naam die met VITE_ begint wordt door Vite in
 * de browserbundel gezet zodra code hem aanroept — daarom roept alleen
 * dit serverbestand hem nog aan, nooit meer een component.
 */

const LIST_ID = 5

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Ongeldig e-mailadres' })
  }

  const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY
  if (!apiKey) {
    console.error('Geen Brevo-sleutel ingesteld in de omgevingsvariabelen')
    return res.status(500).json({ error: 'Inschrijven is tijdelijk niet mogelijk' })
  }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({ email, listIds: [LIST_ID], updateEnabled: true }),
    })

    if (r.ok || r.status === 204) {
      return res.status(200).json({ ok: true })
    }

    // Foutdetails alleen in het serverlog, nooit terug naar de browser:
    // die kunnen verraden hoe de koppeling in elkaar zit.
    console.error('Brevo gaf', r.status, await r.text())
    return res.status(502).json({ error: 'Inschrijven mislukt' })
  } catch (err) {
    console.error('Brevo onbereikbaar:', err)
    return res.status(502).json({ error: 'Inschrijven mislukt' })
  }
}
