import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const INSTAGRAM_HANDLE = 'bandotigers'
const INSTAGRAM_URL = 'https://www.instagram.com/bandotigers'

// Placeholder posts — replace src with real Instagram image URLs once embedded
const posts = [
  { id: 1, img: '/images/x.jpeg', caption: 'Victory Hoodie — Off White', likes: '1.2K' },
  { id: 2, img: '/images/trui.jpeg', caption: 'Victory Hoodie — Obsidian Black', likes: '987' },
  { id: 3, img: '/images/xxxx.jpeg', caption: 'The Riders', likes: '2.1K' },
  { id: 4, img: '/images/xxx.jpeg', caption: 'Iron Horse', likes: '1.8K' },
  { id: 5, img: '/images/d.jpeg', caption: 'Victory Or Death', likes: '3.4K' },
  { id: 6, img: '/images/r.jpeg', caption: 'Victory Hoodie II — Ivory', likes: '756' },
]

function PostCard({ post, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'block', position: 'relative',
        aspectRatio: '1/1', overflow: 'hidden',
        background: '#111', cursor: 'none',
        textDecoration: 'none',
      }}
      whileHover="hover"
    >
      <motion.img
        src={post.img}
        alt={post.caption}
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '0.6rem',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" opacity="0.9">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span style={{
          fontFamily: 'Inter', fontSize: '0.6rem',
          letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)',
          textTransform: 'uppercase',
        }}>
          ♡ {post.likes}
        </span>
      </motion.div>
    </motion.a>
  )
}

export default function InstagramFeed() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{
      background: 'var(--black)',
      padding: '8rem 0 0',
    }}>
      {/* Header */}
      <div ref={ref} style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 4rem 4rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem',
      }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'Inter', fontSize: '0.58rem',
              letterSpacing: '0.25em', color: 'var(--silver)',
              textTransform: 'uppercase', marginBottom: '0.8rem',
            }}
          >
            — Follow Our Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, color: 'var(--off-white)',
              textTransform: 'uppercase', lineHeight: 1,
            }}
          >
            @{INSTAGRAM_HANDLE}
          </motion.h2>
        </div>

        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
            fontFamily: 'Inter', fontSize: '0.62rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--silver)', textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            paddingBottom: '0.3rem',
            transition: 'color 0.3s, border-color 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--off-white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
        >
          Volg ons →
        </motion.a>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '2px',
      }}
        className="ig-grid">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ig-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .ig-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
