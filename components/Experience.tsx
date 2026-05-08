'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const experiences = [
  {
    number: '01',
    title: 'The Ember Ritual',
    subtitle: 'An Ancient Technique Reborn',
    description:
      'Our kitchen breathes with fire. Every dish passes through our 900°C wood-fired hearth — a Spanish-crafted behemoth that imparts a primal depth of flavor no other technique can replicate. We source single-origin hardwoods monthly, each chosen for the unique smokiness it lends.',
    img: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=1000&fit=crop&q=85',
    accent: 'ember',
    reverse: false,
  },
  {
    number: '02',
    title: 'The Seasonal Edit',
    subtitle: 'Farm to Flame Philosophy',
    description:
      'Our menu rewrites itself with the seasons. We partner exclusively with twelve farms within 80 miles of Manhattan. When the truffle hunter calls, we listen. When the fisherman brings in a rare haul at dawn, your table benefits by evening. This is living cuisine.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop&q=85',
    accent: 'gold',
    reverse: true,
  },
  {
    number: '03',
    title: 'The Private Cellar',
    subtitle: '2,000 Labels, One Vision',
    description:
      'Our Sommelier curates over two thousand labels across six climate-controlled vaults. From first-growth Bordeaux to obscure Georgian amphora wines, each bottle was chosen to complement a specific dish, a specific moment, a specific guest. This is not a wine list. This is a library.',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=1000&fit=crop&q=85',
    accent: 'ember',
    reverse: false,
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-obsidian overflow-hidden"
    >
      {/* Background line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cream/5 to-transparent hidden xl:block" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeader />

        {/* Experience items */}
        <div className="mt-24 space-y-32 md:space-y-48">
          {experiences.map((exp) => (
            <ExperienceItem key={exp.number} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <span className="w-8 h-[1px] bg-gold/60" />
        <span className="section-label">The Ember & Ash Way</span>
        <span className="w-8 h-[1px] bg-gold/60" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
          className="text-display text-[clamp(2rem,5.5vw,4.5rem)] font-light text-cream leading-tight"
        >
          An Experience Beyond<br />
          <span className="text-gradient-gold italic">the Ordinary</span>
        </motion.h2>
      </div>
    </div>
  )
}

function ExperienceItem({ experience: exp }: { experience: typeof experiences[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          exp.reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: exp.reverse ? 60 : -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
            <Image
              src={exp.img}
              alt={exp.title}
              fill
              className="object-cover transition-transform duration-[2000ms] ease-out"
              style={{ transform: isInView ? 'scale(1)' : 'scale(1.1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />

            {/* Corner accent */}
            <div className={`absolute top-4 left-4 w-8 h-8 border-t border-l ${
              exp.accent === 'ember' ? 'border-ember/60' : 'border-gold/60'
            }`} />
            <div className={`absolute bottom-4 right-4 w-8 h-8 border-b border-r ${
              exp.accent === 'ember' ? 'border-ember/60' : 'border-gold/60'
            }`} />
          </div>

          {/* Floating number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`absolute -bottom-6 ${exp.reverse ? 'right-0' : 'left-0'} glass rounded-xl p-4`}
          >
            <span className={`text-mono text-6xl font-bold leading-none ${
              exp.accent === 'ember' ? 'text-gradient-ember' : 'text-gradient-gold'
            }`}>
              {exp.number}
            </span>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: exp.reverse ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`section-label mb-3 ${exp.accent === 'ember' ? 'text-ember' : 'text-gold'}`}
            >
              {exp.subtitle}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
              className="text-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-tight"
            >
              {exp.title}
            </motion.h3>
          </div>

          <div className={`h-[1px] w-16 ${exp.accent === 'ember' ? 'bg-ember/60' : 'bg-gold/60'}`} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-cream/45 leading-loose font-light text-base"
          >
            {exp.description}
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            href="#"
            className={`group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase ${
              exp.accent === 'ember' ? 'text-ember/70 hover:text-ember' : 'text-gold/70 hover:text-gold'
            } transition-colors duration-300`}
          >
            <span>Discover More</span>
            <span className="block w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-14" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
