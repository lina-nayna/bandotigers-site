import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Doom-style cellular automaton fire — every pixel is real flame, no circles
function FireCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    // Scale: each "fire cell" = SCALE real pixels
    const SCALE = 5

    let W, H, COLS, ROWS, fire
    let offscreen, offCtx

    // Fire color palette: transparent black → deep red → orange → yellow → white
    const palette = new Array(256)
    for (let i = 0; i < 256; i++) {
      let r, g, b, a
      if (i === 0) {
        r = 0; g = 0; b = 0; a = 0
      } else if (i < 50) {
        const t = i / 50
        r = Math.round(t * 160); g = 0; b = 0
        a = Math.round(t * 200)
      } else if (i < 110) {
        const t = (i - 50) / 60
        r = Math.round(160 + t * 95); g = Math.round(t * 90); b = 0
        a = Math.round(200 + t * 45)
      } else if (i < 175) {
        const t = (i - 110) / 65
        r = 255; g = Math.round(90 + t * 150); b = Math.round(t * 30)
        a = Math.round(245 + t * 10)
      } else {
        const t = (i - 175) / 80
        r = 255; g = 255; b = Math.round(30 + t * 225)
        a = 255
      }
      palette[i] = [
        Math.min(255, r),
        Math.min(255, g),
        Math.min(255, b),
        Math.min(255, a),
      ]
    }

    function init() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H

      COLS = Math.ceil(W / SCALE) + 2
      ROWS = Math.ceil(H / SCALE) + 2
      fire = new Uint8Array(COLS * ROWS)

      // Seed bottom row: full heat across full width, hottest in center
      for (let x = 0; x < COLS; x++) {
        const cx = (x / COLS - 0.5) * 2   // -1 to 1
        const heat = Math.max(0, 255 - Math.abs(cx) * 30) // slight center boost
        fire[(ROWS - 1) * COLS + x] = heat
      }

      offscreen = document.createElement('canvas')
      offscreen.width = COLS
      offscreen.height = ROWS
      offCtx = offscreen.getContext('2d')
    }

    init()
    window.addEventListener('resize', init)

    function updateFire() {
      for (let y = 1; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const src = y * COLS + x
          const srcVal = fire[src]
          if (srcVal === 0) { fire[(y - 1) * COLS + x] = 0; continue }

          // Random lateral spread + decay
          const decay  = Math.floor(Math.random() * 4)          // 0-3
          const spread = Math.floor(Math.random() * 3) - 1      // -1, 0, 1
          const dstX   = Math.max(0, Math.min(COLS - 1, x + spread))
          fire[(y - 1) * COLS + dstX] = Math.max(0, srcVal - decay)
        }
      }

      // Re-seed bottom row each frame so fire never dies
      for (let x = 0; x < COLS; x++) {
        // Small random flicker at base keeps it alive and varied
        const flicker = Math.random() < 0.08 ? Math.floor(Math.random() * 40) : 0
        fire[(ROWS - 1) * COLS + x] = Math.max(220, 255 - flicker)
      }
    }

    function renderFire() {
      const imgData = offCtx.createImageData(COLS, ROWS)
      const d = imgData.data
      for (let i = 0; i < COLS * ROWS; i++) {
        const [r, g, b, a] = palette[fire[i]]
        const p = i * 4
        d[p]     = r
        d[p + 1] = g
        d[p + 2] = b
        d[p + 3] = a
      }
      offCtx.putImageData(imgData, 0, 0)
    }

    // Floating ember particles on top
    const embers = Array.from({ length: 55 }, () => newEmber())
    function newEmber() {
      return {
        x: (Math.random() * 0.8 + 0.1),   // 0-1 relative
        y: 1,
        vy: -(Math.random() * 0.004 + 0.002),
        vx: (Math.random() - 0.5) * 0.001,
        life: 0,
        maxLife: Math.random() * 180 + 80,
        size: Math.random() * 2.5 + 0.8,
      }
    }

    const loop = () => {
      // Update fire twice per frame for richer motion
      updateFire()
      updateFire()
      renderFire()

      ctx.clearRect(0, 0, W, H)

      // Draw fire texture scaled up — browser bilinear smoothing = soft organic flames
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(offscreen, 0, 0, W, H)

      // Glowing base atmosphere
      ctx.globalCompositeOperation = 'screen'
      const baseGlow = ctx.createRadialGradient(W * 0.5, H, 0, W * 0.5, H, W * 0.55)
      baseGlow.addColorStop(0,   'rgba(255, 120, 20, 0.15)')
      baseGlow.addColorStop(0.5, 'rgba(200, 60,  10, 0.07)')
      baseGlow.addColorStop(1,   'rgba(0,   0,   0,  0)')
      ctx.fillStyle = baseGlow
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'source-over'

      // Draw embers
      embers.forEach(em => {
        em.x += em.vx + Math.sin(em.life * 0.05) * 0.0005
        em.y += em.vy
        em.life++
        if (em.life >= em.maxLife || em.y < 0) {
          Object.assign(em, newEmber())
          return
        }
        const progress = em.life / em.maxLife
        const alpha = progress < 0.2
          ? (progress / 0.2) * 0.85
          : progress > 0.65
            ? ((1 - progress) / 0.35) * 0.85
            : 0.85

        const ex = em.x * W
        const ey = em.y * H
        const hue = 25 + Math.random() * 30

        ctx.globalCompositeOperation = 'screen'
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, em.size * 3)
        eg.addColorStop(0,   `hsla(${hue + 30}, 100%, 95%, ${alpha})`)
        eg.addColorStop(0.4, `hsla(${hue},      100%, 65%, ${alpha * 0.6})`)
        eg.addColorStop(1,   `hsla(${hue - 10}, 90%,  30%, 0)`)
        ctx.beginPath()
        ctx.arc(ex, ey, em.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = eg
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      })

      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

export default function FireDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section ref={ref} style={{
      position: 'relative', background: 'var(--black)',
      height: '520px', overflow: 'hidden',
    }}>
      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to bottom, var(--black), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Fire canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 2 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <FireCanvas />
      </motion.div>

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(242,237,230,0.5)',
          fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
        }}>
          — The Creed
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900, textAlign: 'center',
          color: 'var(--off-white)', lineHeight: 1.05,
          textShadow: '0 0 40px rgba(255,120,20,0.8), 0 0 100px rgba(200,60,10,0.5), 0 2px 4px rgba(0,0,0,0.9)',
          textTransform: 'uppercase',
        }}>
          Victory<br />
          <em style={{ fontStyle: 'italic', color: '#FFB060' }}>Or Death</em>
        </h2>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, var(--black), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
    </section>
  )
}
