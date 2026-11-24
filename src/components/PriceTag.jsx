import { SALE, basePrice, currentPrice, formatPrice } from '../data/products'

/* Toont de prijs. Tijdens een sale: oude prijs doorstreept, nieuwe in oranje. */
export default function PriceTag({ product, style = {} }) {
  if (!SALE.active) {
    return <p style={style}>{product.price}</p>
  }
  return (
    <p style={{ ...style, display: 'flex', alignItems: 'baseline', gap: '0.6em', flexWrap: 'wrap' }}>
      <span style={{ textDecoration: 'line-through', color: 'var(--silver)', fontSize: '0.8em' }}>
        {formatPrice(basePrice(product))}
      </span>
      <span style={{ color: 'var(--orange)', fontWeight: 600 }}>
        {formatPrice(currentPrice(product))}
      </span>
    </p>
  )
}
