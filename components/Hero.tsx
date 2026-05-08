'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const floatingDishes = [
  {
    id: 1,
    name: 'Black Truffle Risotto',
    price: '$68',
    category: 'Signature',
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&h=200&fit=crop&q=80',
    style: { top: '20%', right: '6%' },
    delay: 0.8,
  },
  {
    id: 2,
    name: 'Wagyu A5 Strip',
    price: '$145',
    category: 'Premium Cut',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop&q=80',
    style: { bottom: '22%', left: '4%' },
    delay: 1.2,
  },
  {
    id: 3,
    name: "Chef's Amuse-Bouche",
    price: 'Complimentary',
    category: 'Daily Special',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&q=80',
    style: { bottom: '15%', right: '8%' },
    delay: 1.5,
  },
]

// Animated word reveal
function RevealWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="text-reveal-mask">
      <motion.span
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.77, 0, 0.175, 1] }}
        className="inline-block"
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [mounted, setMounted] = useState(false)

  const springConfig = { damping: 30, stiffness: 100 }
  const parallaxX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig)
  const parallaxY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), springConfig)
  const bgParallaxX = useSpring(useTransform(mouseX, [-1, 1], [10, -10]), springConfig)
  const bgParallaxY = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), springConfig)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mounted, mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-obsidian flex items-center justify-center"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ x: bgParallaxX, y: bgParallaxY }}
        className="absolute inset-[-5%] will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1800&h=1200&fit=crop&q=90"
          alt="Restaurant interior"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Deep overlay layers */}
        <div className="absolute inset-0 bg-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/40" />
      </motion.div>

      {/* Floating ember glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-ember/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/15 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-amber/15 blur-[80px]"
        />
      </div>

      {/* Animated particles */}
      <Particles />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="block w-8 h-[1px] bg-gold/60" />
          <span className="section-label text-[0.65rem]">Est. 2019 · New York</span>
          <span className="block w-8 h-[1px] bg-gold/60" />
        </motion.div>

        {/* Main headline */}
        <h1 className="text-display font-light leading-[0.92] mb-6 overflow-visible">
          <div className="text-[clamp(3.5rem,10vw,9rem)] text-cream/90 flex justify-center gap-4 flex-wrap">
            <RevealWord word="Where" delay={0.5} />
            <RevealWord word="Fire" delay={0.65} />
          </div>
          <div className="text-[clamp(3.5rem,10vw,9rem)] flex justify-center gap-4 flex-wrap">
            <span className="text-reveal-mask">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="inline-block text-gradient-gold text-glow-gold italic"
              >
                Meets
              </motion.span>
            </span>
            <RevealWord word="Art" delay={0.95} />
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-cream/50 text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed tracking-wide"
        >
          A transcendent dining journey through flavors forged in ember,<br className="hidden md:block" />
          crafted with obsession, served with grace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="#reservation" primary>
            Reserve Your Evening
          </MagneticButton>
          <MagneticButton href="#dishes">
            Explore the Menu
          </MagneticButton>
        </motion.div>
      </div>

      {/* Floating dish cards */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none hidden lg:block will-change-transform"
      >
        {floatingDishes.map((dish) => (
          <FloatingCard key={dish.id} dish={dish} />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="section-label text-[0.6rem] text-cream/40">Scroll</span>
        <div className="relative w-[1px] h-12 bg-cream/10 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
    </section>
  )
}

function FloatingCard({ dish }: { dish: typeof floatingDishes[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: dish.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={dish.style as React.CSSProperties}
      className="absolute w-[200px] glass-warm rounded-2xl overflow-hidden animate-float"
    >
      <div className="img-zoom-container h-28 relative">
        <Image src={dish.img} alt={dish.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
      </div>
      <div className="p-3">
        <span className="section-label text-[0.55rem] text-gold/70 block mb-1">{dish.category}</span>
        <p className="text-cream/90 text-xs font-light leading-snug">{dish.name}</p>
        <p className="text-gold text-sm mt-1 font-medium">{dish.price}</p>
      </div>
    </motion.div>
  )
}

function MagneticButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative px-8 py-4 text-sm tracking-[0.2em] uppercase font-light overflow-hidden group ${
        primary
          ? 'bg-ember text-cream'
          : 'border border-cream/20 text-cream/80 hover:text-cream'
      }`}
    >
      {primary && (
        <motion.span
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-amber"
        />
      )}
      {!primary && (
        <motion.span
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-cream/5"
        />
      )}
      <span className="relative">{children}</span>
    </motion.a>
  )
}

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? 'rgba(201,168,76,0.6)' : 'rgba(200,75,49,0.4)',
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -120, -200],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
