'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: 'Ember & Ash doesn\'t just serve dinner — it curates an emotional journey. The truffle risotto alone justifies the pilgrimage to New York. I\'ve dined in three-star kitchens across the world, and this is singular.',
    author: 'Elena Marchetti',
    role: 'Food Editor, La Cucina Italiana',
    stars: 5,
    location: 'Milan, Italy',
  },
  {
    id: 2,
    quote: 'The moment the first amuse-bouche arrived, I understood that this team is not playing by the same rules as everyone else. Chef Marco\'s command of fire is almost spiritual. An unforgettable evening.',
    author: 'James Holloway',
    role: 'Critic, The New York Times',
    stars: 5,
    location: 'New York, USA',
  },
  {
    id: 3,
    quote: 'The private dining experience was transcendent. Every detail — from the decanted Barolo to the hand-written menu cards — speaks of a team that cares about nothing less than perfection.',
    author: 'Sophia Laurent',
    role: 'Chef & Restaurateur',
    stars: 5,
    location: 'Paris, France',
  },
  {
    id: 4,
    quote: 'I\'ve celebrated every milestone of my adult life here. Ember & Ash understands that a great meal is also a great memory. The dessert cart is, frankly, illegal in its decadence.',
    author: 'David Chen',
    role: 'Entrepreneur & Gastronome',
    stars: 5,
    location: 'San Francisco, USA',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const navigate = (idx: number) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-obsidian overflow-hidden"
    >
      {/* Bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gold/60" />
            <span className="section-label">Voices of Distinction</span>
            <span className="w-8 h-[1px] bg-gold/60" />
          </div>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] font-light text-cream">
            What Our Guests <span className="text-gradient-gold italic">Say</span>
          </h2>
        </motion.div>

        {/* Main testimonial display */}
        <div className="max-w-4xl mx-auto">
          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-2 mb-10"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="text-gold text-xl"
              >
                ★
              </motion.span>
            ))}
          </motion.div>

          {/* Quote card */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass rounded-3xl p-8 md:p-12 text-center relative"
              >
                {/* Decorative quote mark */}
                <div className="absolute top-6 left-8 text-gold/10 text-8xl font-serif leading-none select-none">
                  "
                </div>

                <p className="text-display text-xl md:text-2xl font-light text-cream/80 leading-relaxed italic mb-8 relative z-10">
                  "{testimonials[active].quote}"
                </p>

                <div className="divider-gold mb-8" />

                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-cream/90 font-light tracking-wide">
                    {testimonials[active].author}
                  </span>
                  <span className="text-cream/40 text-sm font-light">
                    {testimonials[active].role}
                  </span>
                  <span className="section-label text-[0.6rem] text-gold/50 mt-1">
                    {testimonials[active].location}
                  </span>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/20" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/20" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className="group p-1"
              >
                <motion.div
                  animate={{
                    width: i === active ? '2rem' : '0.5rem',
                    background: i === active ? '#C9A84C' : 'rgba(201,168,76,0.2)',
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-[2px] rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Side testimonial teasers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => navigate(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className={`text-left p-4 rounded-xl border transition-all duration-500 ${
                i === active
                  ? 'border-gold/30 bg-gold/5'
                  : 'border-cream/5 hover:border-cream/10'
              }`}
            >
              <p className="text-cream/40 text-xs leading-relaxed mb-2 line-clamp-2 font-light">
                "{t.quote.slice(0, 80)}..."
              </p>
              <p className="text-cream/60 text-xs font-light">{t.author}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
