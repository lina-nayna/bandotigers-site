import createMollieClient from '@mollie/api-client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { form, items, totalPrice } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in cart' })
  }

  try {
    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bandotigerss.com'

    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: totalPrice.toFixed(2),
      },
      description: `Bando Tigers — ${items.map(i => `${i.name} ${i.size} x${i.qty}`).join(', ')}`,
      redirectUrl: `${baseUrl}/order-success`,
      webhookUrl: `${baseUrl}/api/payment-webhook`,
      metadata: {
        order: JSON.stringify({ form, items }),
      },
      billingAddress: {
        givenName: form.firstName,
        familyName: form.lastName,
        email: form.email,
        streetAndNumber: form.address,
        postalCode: form.zip,
        city: form.city,
        country: form.country,
      },
    })

    res.status(200).json({ checkoutUrl: payment.getCheckoutUrl() })
  } catch (err) {
    console.error('Mollie error:', err)
    res.status(500).json({ error: err.message || 'Payment creation failed' })
  }
}
