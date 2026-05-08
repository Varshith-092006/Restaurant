'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: '18+', label: 'Years of Mastery' },
  { value: '3', label: 'Michelin Stars' },
  { value: '40+', label: 'Global Kitchens' },
  { value: '12', label: 'Awarded Dishes' },
]

export default function ChefShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })

  return (
    <section
      id="chef"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-smoke overflow-hidden"
    >
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-mono text-[25vw] font-bold text-cream/[0.015] select-none leading-none">
          CHEF
        </span>
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-ember/6 blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-[1px] bg-gold/60" />
          <span className="section-label">The Artist</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-start">
          {/* Left: Big headline */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-5 lg:pt-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
              className="text-display text-[clamp(3rem,7vw,6rem)] font-light text-cream leading-[0.92] mb-8"
            >
              Chef<br />
              <span className="text-gradient-gold italic">Marco</span><br />
              De Luca
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: '5rem' } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[1px] bg-ember/60 mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-cream/40 leading-loose font-light text-sm md:text-base max-w-sm mb-10"
            >
              Born in Naples, trained under Ducasse and Robuchon, Marco brings an irreverent elegance to classical technique. His food tells stories of memory, landscape, and obsession.
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="glass-warm rounded-full px-5 py-2.5">
                <span className="text-display italic text-gold/80 text-lg">Marco De Luca</span>
              </div>
              <span className="text-cream/30 text-xs tracking-wide">Executive Chef</span>
            </motion.div>
          </motion.div>

          {/* Center: Chef image */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-4 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop&q=85"
                  alt="Chef Marco De Luca"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              </div>

              {/* Floating award badge */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute top-6 -right-4 glass-warm rounded-2xl p-4 animate-float-slow"
              >
                <div className="text-center">
                  <span className="text-mono text-gold text-2xl block leading-none">★★★</span>
                  <span className="section-label text-[0.55rem] text-cream/60 mt-1 block">Michelin</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Vertical label */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90">
              <span className="section-label text-[0.55rem] text-cream/20 whitespace-nowrap">
                Executive Chef · Ember & Ash · NYC
              </span>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <div className="lg:col-span-3 lg:pt-32 space-y-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
                className="group"
              >
                <div className="text-display text-4xl md:text-5xl font-light text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-cream/30 text-xs tracking-[0.15em] uppercase font-light">
                  {stat.label}
                </div>
                <div className="mt-3 h-[1px] bg-cream/5 w-0 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
