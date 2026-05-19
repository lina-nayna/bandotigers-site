import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FireCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, W, H, t = 0

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
      buildFlames()
    }

    // ─── Flame tongue class ───────────────────────────────────────────────────
    class Flame {
      constructor(layer) {
        this.layer = layer
        this.init()
      }
      init() {
        this.x         = Math.random() * W
        this.baseW     = W * (0.025 + Math.random() * 0.055) * (this.layer === 0 ? 1.5 : 1)
        this.maxH      = H * (this.layer === 0
                           ? 0.55 + Math.random() * 0.40   // back: tall
                           : this.layer === 1
                             ? 0.40 + Math.random() * 0.35  // mid
                             : 0.20 + Math.random() * 0.30) // front: shorter
        this.phase     = Math.random() * Math.PI * 2
        this.speed     = 0.6 + Math.random() * 1.0
        this.wobble    = 12 + Math.random() * 28
        this.wFreq     = 1.2 + Math.random() * 1.8
        this.hue       = 5  + Math.random() * 28            // red → orange
        this.opacity   = this.layer === 0 ? 0.28 + Math.random() * 0.22
                       : this.layer === 1 ? 0.45 + Math.random() * 0.30
                       :                   0.55 + Math.random() * 0.35
        this.twist     = (Math.random() - 0.5) * 0.4
      }
      draw(t) {
        const baseY = H + 4
        // Height flicker
        const hNow = this.maxH * (0.78 + 0.22 * Math.sin(t * this.speed * 1.1 + this.phase))
        const tipY = baseY - hNow
        const midY = baseY - hNow * 0.52
        const lowY = baseY - hNow * 0.18

        // Horizontal sway
        const sw1 = Math.sin(t * this.wFreq * 0.5 + this.phase) * this.wobble
        const sw2 = Math.sin(t * this.wFreq * 0.8 + this.phase * 1.4) * this.wobble * 0.55
        const sw3 = Math.sin(t * this.wFreq * 0.3 + this.phase * 0.7) * this.wobble * 0.25

        const tipX  = this.x + sw1 + this.twist * hNow * 0.15
        const midLX = this.x - this.baseW * 0.45 + sw2
        const midRX = this.x + this.baseW * 0.45 + sw2
        const lowLX = this.x - this.baseW * 0.70 + sw3
        const lowRX = this.x + this.baseW * 0.70 + sw3
        const basLX = this.x - this.baseW * 0.82
        const basRX = this.x + this.baseW * 0.82

        // Flame shape: left bezier up to tip, right bezier back down
        ctx.beginPath()
        ctx.moveTo(basLX, baseY)
        ctx.bezierCurveTo(lowLX, lowY, midLX - this.baseW * 0.1, midY, tipX, tipY)
        ctx.bezierCurveTo(midRX + this.baseW * 0.1, midY, lowRX, lowY, basRX, baseY)
        ctx.closePath()

        // Gradient: deep red at root → orange → yellow → transparent tip
        const g = ctx.createLinearGradient(this.x, baseY, this.x, tipY)
        g.addColorStop(0,    `hsla(${this.hue},      100%, 28%, ${this.opacity})`)
        g.addColorStop(0.18, `hsla(${this.hue + 8},  100%, 38%, ${this.opacity * 0.95})`)
        g.addColorStop(0.42, `hsla(${this.hue + 18}, 100%, 50%, ${this.opacity * 0.80})`)
        g.addColorStop(0.68, `hsla(${this.hue + 30}, 100%, 60%, ${this.opacity * 0.55})`)
        g.addColorStop(0.88, `hsla(${this.hue + 42}, 100%, 72%, ${this.opacity * 0.25})`)
        g.addColorStop(1,    `hsla(50, 100%, 85%, 0)`)

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = g
        ctx.fill()
      }
    }

    // ─── Ember spark class ────────────────────────────────────────────────────
    class Ember {
      constructor() { this.reset(true) }
      reset(born = false) {
        this.x    = (0.1 + Math.random() * 0.8) * W
        this.y    = born ? Math.random() * H : H
        this.vy   = -(0.35 + Math.random() * 1.1)
        this.vx   = (Math.random() - 0.5) * 0.45
        this.life = born ? Math.random() : 0
        this.r    = 0.8 + Math.random() * 2.2
        this.hue  = 20 + Math.random() * 35
        this.phase= Math.random() * Math.PI * 2
      }
      update() {
        this.vx += Math.sin(t * 2 + this.phase) * 0.015
        this.x  += this.vx
        this.y  += this.vy
        this.life += 0.004 + Math.random() * 0.003
        if (this.life >= 1 || this.y < -10) this.reset()
      }
      draw() {
        const alpha = this.life < 0.15
          ? this.life / 0.15
          : this.life > 0.6
            ? (1 - this.life) / 0.4
            : 1
        if (alpha <= 0) return
        const eg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3)
        eg.addColorStop(0,   `hsla(${this.hue + 20}, 100%, 96%, ${alpha})`)
        eg.addColorStop(0.35,`hsla(${this.hue},      100%, 65%, ${alpha * 0.7})`)
        eg.addColorStop(1,   `hsla(${this.hue - 10}, 90%,  30%, 0)`)
        ctx.globalCompositeOperation = 'screen'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = eg
        ctx.fill()
      }
    }

    let backFlames = [], midFlames = [], frontFlames = [], embers = []

    function buildFlames() {
      // Spread flames evenly across width in 3 layers
      const nBack  = Math.max(18, Math.round(W / 55))
      const nMid   = Math.max(28, Math.round(W / 38))
      const nFront = Math.max(22, Math.round(W / 46))

      backFlames  = Array.from({ length: nBack  }, () => { const f = new Flame(0); f.x = Math.random() * W; return f })
      midFlames   = Array.from({ length: nMid   }, () => { const f = new Flame(1); f.x = Math.random() * W; return f })
      frontFlames = Array.from({ length: nFront }, () => { const f = new Flame(2); f.x = Math.random() * W; return f })
      embers      = Array.from({ length: 90 }, () => new Ember())
    }

    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      t += 0.016
      ctx.clearRect(0, 0, W, H)

      // ── Deep red base atmosphere ──
      ctx.globalCompositeOperation = 'source-over'
      const base = ctx.createLinearGradient(0, H * 0.55, 0, H)
      base.addColorStop(0, 'rgba(0,0,0,0)')
      base.addColorStop(0.5, 'rgba(90, 15, 0, 0.25)')
      base.addColorStop(1,   'rgba(160, 30, 0, 0.45)')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, W, H)

      // ── Flames: back → mid → front ──
      backFlames.forEach  (f => f.draw(t))
      midFlames.forEach   (f => f.draw(t))
      frontFlames.forEach (f => f.draw(t))

      // ── Hot dense glow at the base ──
      ctx.globalCompositeOperation = 'screen'
      const hotBase = ctx.createLinearGradient(0, H * 0.72, 0, H)
      hotBase.addColorStop(0, 'rgba(255,80,10, 0.0)')
      hotBase.addColorStop(0.5,'rgba(255,80,10, 0.18)')
      hotBase.addColorStop(1,  'rgba(255,140,20, 0.40)')
      ctx.fillStyle = hotBase
      ctx.fillRect(0, 0, W, H)

      // ── Embers ──
      embers.forEach(e => { e.update(); e.draw() })

      ctx.globalCompositeOperation = 'source-over'
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function FireDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} style={{
      position: 'relative', background: '#000',
      height: '600px', overflow: 'hidden',
    }}>
      {/* Top fade — blends into section above */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '38%',
        background: 'linear-gradient(to bottom, #000, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.8 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <FireCanvas />
      </motion.div>

      {/* Victory or Death text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(242,220,190,0.6)',
          fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
        }}>
          — The Creed
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900, textAlign: 'center',
          color: '#FFF5E8', lineHeight: 1.05,
          textShadow: '0 0 30px rgba(255,100,10,1), 0 0 80px rgba(220,60,5,0.8), 0 0 160px rgba(180,30,0,0.5)',
          textTransform: 'uppercase',
        }}>
          Victory<br />
          <em style={{ fontStyle: 'italic', color: '#FFAA55' }}>Or Death</em>
        </h2>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to top, #000, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
    </section>
  )
}
