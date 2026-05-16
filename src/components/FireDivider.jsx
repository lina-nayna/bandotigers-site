import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Cinematic canvas fire effect
function FireCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.offsetWidth
    let H = canvas.offsetHeight

    canvas.width = W
    canvas.height = H

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', resize)

    // Particle system
    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = W * 0.5 + (Math.random() - 0.5) * W * 0.4
        this.y = H
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = -(Math.random() * 3.5 + 2)
        this.life = 0
        this.maxLife = Math.random() * 90 + 60
        this.size = Math.random() * 28 + 12
        this.hue = Math.random() * 30 // 0-30 orange to yellow
      }
      update() {
        this.x += this.vx + Math.sin(this.life * 0.06) * 0.6
        this.y += this.vy
        this.vy *= 0.993
        this.vx *= 0.99
        this.size *= 0.994
        this.life++
        if (this.life >= this.maxLife) this.reset()
      }
      draw() {
        const progress = this.life / this.maxLife
        const alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? (1 - progress) / 0.3
            : 1

        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        // Core: bright yellow-white
        grad.addColorStop(0, `hsla(${50 + this.hue}, 100%, 95%, ${alpha * 0.9})`)
        // Middle: orange
        grad.addColorStop(0.3, `hsla(${25 + this.hue}, 100%, 60%, ${alpha * 0.7})`)
        // Edge: deep red fading to transparent
        grad.addColorStop(0.7, `hsla(${10 + this.hue}, 90%, 30%, ${alpha * 0.4})`)
        grad.addColorStop(1, `hsla(0, 80%, 15%, 0)`)

        ctx.globalCompositeOperation = 'screen'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    // Smoke particles (above fire)
    class Smoke {
      constructor() { this.reset() }
      reset() {
        this.x = W * 0.5 + (Math.random() - 0.5) * W * 0.35
        this.y = H * 0.55
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = -(Math.random() * 1.2 + 0.5)
        this.life = 0
        this.maxLife = Math.random() * 140 + 80
        this.size = Math.random() * 60 + 30
      }
      update() {
        this.x += this.vx + Math.sin(this.life * 0.04) * 0.4
        this.y += this.vy
        this.size += 0.5
        this.life++
        if (this.life >= this.maxLife) this.reset()
      }
      draw() {
        const progress = this.life / this.maxLife
        const alpha = progress < 0.15
          ? (progress / 0.15) * 0.08
          : progress > 0.6
            ? ((1 - progress) / 0.4) * 0.08
            : 0.08
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        grad.addColorStop(0, `rgba(80,50,30,${alpha})`)
        grad.addColorStop(1, `rgba(20,10,5,0)`)
        ctx.globalCompositeOperation = 'source-over'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    const particles = Array.from({ length: 80 }, () => {
      const p = new Particle()
      p.life = Math.floor(Math.random() * p.maxLife) // stagger
      return p
    })
    const smokes = Array.from({ length: 20 }, () => {
      const s = new Smoke()
      s.life = Math.floor(Math.random() * s.maxLife)
      return s
    })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Dark base glow
      const baseGlow = ctx.createRadialGradient(W * 0.5, H, 0, W * 0.5, H, W * 0.45)
      baseGlow.addColorStop(0, 'rgba(180,60,10,0.18)')
      baseGlow.addColorStop(0.5, 'rgba(100,30,5,0.08)')
      baseGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = baseGlow
      ctx.fillRect(0, 0, W, H)

      smokes.forEach(s => { s.update(); s.draw() })
      particles.forEach(p => { p.update(); p.draw() })

      // Floor glow
      const floor = ctx.createLinearGradient(0, H * 0.85, 0, H)
      floor.addColorStop(0, 'rgba(0,0,0,0)')
      floor.addColorStop(1, 'rgba(0,0,0,0.95)')
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = floor
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
        position: 'absolute', top: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to bottom, var(--black), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Fire canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <FireCanvas />
      </motion.div>

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--silver)',
          fontFamily: 'Inter, sans-serif', marginBottom: '1rem',
        }}>
          — The Creed
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900, textAlign: 'center',
          color: 'var(--off-white)', lineHeight: 1.05,
          textShadow: '0 0 60px rgba(212,82,26,0.6), 0 0 120px rgba(180,50,10,0.3)',
          textTransform: 'uppercase',
        }}>
          Victory<br />
          <em style={{ fontStyle: 'italic', color: '#D4825A' }}>Or Death</em>
        </h2>
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to top, var(--black), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
    </section>
  )
}
