import createMollieClient from '@mollie/api-client'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { id } = req.body

  try {
    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })
    const payment = await mollie.payments.get(id)

    if (payment.status === 'paid') {
      const { form, items } = JSON.parse(payment.metadata.order)

      // Create order in Shopify
      const shopifyRes = await fetch(
        `https://bandotiger.myshopify.com/admin/api/2024-01/orders.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
          },
          body: JSON.stringify({
            order: {
              email: form.email,
              phone: form.phone || '',
              financial_status: 'paid',
              line_items: items.map(item => ({
                variant_id: item.variantId,
                quantity: item.qty,
                price: item.priceNum.toFixed(2),
              })),
              shipping_address: {
                first_name: form.firstName,
                last_name: form.lastName,
                address1: form.address,
                city: form.city,
                zip: form.zip,
                country_code: form.country,
                phone: form.phone || '',
              },
              note: `Betaald via Mollie — Payment ID: ${id}`,
            },
          }),
        }
      )

      if (!shopifyRes.ok) {
        const err = await shopifyRes.text()
        console.error('Shopify order error:', err)
      }
    }

    res.status(200).end()
  } catch (err) {
    console.error('Webhook error:', err)
    res.status(500).end()
  }
}
