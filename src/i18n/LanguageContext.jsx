import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

export const LANGS = ['en', 'nl', 'fr']

const LanguageContext = createContext(null)

function detectLang() {
  try {
    const saved = localStorage.getItem('bt-lang')
    if (LANGS.includes(saved)) return saved
  } catch { /* geen opslag */ }
  const nav = (typeof navigator !== 'undefined' && navigator.language || '').slice(0, 2).toLowerCase()
  return LANGS.includes(nav) ? nav : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('bt-lang', lang) } catch { /* geen opslag */ }
  }, [lang])

  const t = (key, vars) => {
    let s = translations[lang]?.[key] ?? translations.en[key] ?? key
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll(`{${k}}`, v) })
    return s
  }

  // Kies uit een object { en, nl, fr } de juiste taal
  const pick = (obj) => (obj && typeof obj === 'object' && !Array.isArray(obj) && ('en' in obj)) ? (obj[lang] ?? obj.en) : obj

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState, t, pick }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext)
}

// Vertaal een kleur/ondertitel als er een vertaling voor bestaat, anders ongewijzigd
// eslint-disable-next-line react-refresh/only-export-components
export function T_SUB(t, sub) {
  const k = 'sub.' + sub
  const r = t(k)
  return r === k ? sub : r
}
