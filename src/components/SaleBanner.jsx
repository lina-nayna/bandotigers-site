/* eslint-disable react-refresh/only-export-components */
import { SALE } from '../data/products'
import { useLang } from '../i18n/LanguageContext'

export const SALE_BANNER_HEIGHT = 36

export default function SaleBanner() {
  const { t } = useLang()
  if (!SALE.active) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101,
      height: SALE_BANNER_HEIGHT,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--orange)', color: '#000',
      fontFamily: "'Barlow Condensed', Inter, sans-serif",
      fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.12em',
      textTransform: 'uppercase', textAlign: 'center', padding: '0 1rem',
    }}>
      <span className="sale-long">🐅 {t('sale.long', { label: SALE.label, pct: SALE.percent })}</span>
      <span className="sale-short">🐅 {t('sale.short', { label: SALE.label, pct: SALE.percent })}</span>
    </div>
  )
}
