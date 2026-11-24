import { useLang, LANGS } from '../i18n/LanguageContext'

export default function LanguageSwitcher({ style = {} }) {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Language" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', ...style }}>
      {LANGS.map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && <span style={{ color: 'rgba(242,237,230,0.25)', fontSize: '0.6rem', margin: '0 0.1rem' }}>/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.3rem 0.25rem',
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: lang === l ? 'var(--off-white)' : 'var(--silver)',
              fontWeight: lang === l ? 600 : 400,
              borderBottom: lang === l ? '1px solid var(--orange)' : '1px solid transparent',
            }}
          >{l}</button>
        </span>
      ))}
    </div>
  )
}
