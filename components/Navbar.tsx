'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const navLinks = [
  { label: 'Menu', href: '#dishes' },
  { label: 'Experience', href: '#experience' },
  { label: 'Chef', href: '#chef' },
  { label: 'Gallery', href: '#gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const navBg = useTransform(scrollY, [0, 80], ['rgba(8,8,8,0)', 'rgba(8,8,8,0.85)'])
  const navBorder = useTransform(scrollY, [0, 80], ['rgba(201,168,76,0)', 'rgba(201,168,76,0.15)'])

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 50))
  }, [scrollY])

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBg, borderBottomColor: navBorder }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500"
      >
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col leading-none"
          >
            <span className="text-display text-2xl font-light tracking-[0.08em] text-cream">
              Ember <span className="text-gradient-gold">&</span> Ash
            </span>
            <span className="section-label text-[0.55rem] tracking-[0.4em] mt-0.5 opacity-60">
              Fine Dining
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map((link, i) => (
              <NavLink key={link.label} href={link.href} delay={i * 0.08}>
                {link.label}
              </NavLink>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden md:flex items-center gap-4"
          >
            <a
              href="#reservation"
              className="relative px-6 py-2.5 overflow-hidden group"
            >
              <span className="absolute inset-0 border border-gold/40 group-hover:border-gold/80 transition-colors duration-500" />
              <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
              <span className="relative text-cream/90 group-hover:text-cream transition-colors duration-300 text-sm tracking-[0.15em] uppercase font-light">
                Reserve a Table
              </span>
            </a>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-end gap-1.5"
          >
            <motion.span
              animate={{ width: menuOpen ? '100%' : '60%', rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.4 }}
              className="block h-[1px] bg-cream origin-right"
              style={{ width: '60%' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 20 : 0 }}
              transition={{ duration: 0.3 }}
              className="block h-[1px] bg-cream w-full"
            />
            <motion.span
              animate={{ width: menuOpen ? '100%' : '80%', rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.4 }}
              className="block h-[1px] bg-cream origin-right"
              style={{ width: '80%' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-obsidian/98 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-display text-5xl font-light text-cream/80 hover:text-gradient-gold transition-all duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#reservation"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navLinks.length * 0.08 }}
                className="mt-4 px-10 py-4 border border-gold/50 text-gold tracking-[0.2em] uppercase text-sm"
              >
                Reserve a Table
              </motion.a>
            </div>
            {/* Decorative glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-ember/5 blur-[120px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-cream/60 hover:text-cream/90 transition-colors duration-300 text-sm tracking-[0.12em] uppercase font-light"
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 origin-left"
      />
    </a>
  )
}
