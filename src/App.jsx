import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Collection from './components/Collection'
import Discount from './components/Discount'
import FireDivider from './components/FireDivider'
import Lookbook from './components/Lookbook'
import Manifesto from './components/Manifesto'
import Campaign from './components/Campaign'
import EarlyAccess from './components/EarlyAccess'
import InstagramFeed from './components/InstagramFeed'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccess from './pages/OrderSuccess'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CookiePage from './pages/CookiePage'
import ShopPage from './pages/ShopPage'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './context/CartContext'
import './index.css'

function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(useMotionValue(-100), { stiffness: 80, damping: 20 })
  const ringY = useSpring(useMotionValue(-100), { stiffness: 80, damping: 20 })
  const [cursorHover, setCursorHover] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 3)
      cursorY.set(e.clientY - 3)
      ringX.set(e.clientX - 20)
      ringY.set(e.clientY - 20)
    }
    window.addEventListener('mousemove', move)

    const onEnter = () => setCursorHover(true)
    const onLeave = () => setCursorHover(false)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <motion.div className="cursor-dot" style={{ left: cursorX, top: cursorY }} />
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
          transform: cursorHover ? 'scale(2.2)' : 'scale(1)',
          borderColor: cursorHover ? 'var(--orange)' : 'var(--off-white)',
        }}
      />
    </>
  )
}

/* Bij een paginawissel onthoudt de browser hoe ver je gescrold stond.
   Klik je onderaan de homepage op "View All Pieces", dan kom je dus
   halverwege de shoppagina terecht. Dit zet je bij elke wissel weer
   bovenaan — behalve bij een ankerlink (#collection), want dan wil je
   juist naar dat blok toe.
   Zonder 'instant' zou de smooth-scroll uit index.css de hele pagina
   zichtbaar omhoog laten glijden bij elke klik. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Discount />
        <Collection />
        <Manifesto />
        <Campaign />
        <EarlyAccess />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        {!isMobile && <Cursor />}
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:handle" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
