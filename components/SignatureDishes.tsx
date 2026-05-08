'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const dishes = [
  {
    id: 1,
    name: 'Black Truffle Risotto',
    category: 'Signature',
    description: 'Aged carnaroli, shaved Périgord truffle, 36-month parmesan foam, truffle oil emulsion',
    price: '$68',
    img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=800&fit=crop&q=85',
    label: '01',
    highlight: true,
  },
  {
    id: 2,
    name: 'Wagyu A5 Strip',
    category: 'Premium Cut',
    description: 'Japanese A5 Wagyu, ember-kissed, bone marrow butter, smoked sea salt crystals',
    price: '$145',
    img: 'https://images.unsplash.com/photo-1573806439793-82aa612294b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    label: '02',
    highlight: false,
  },
  {
    id: 3,
    name: 'Seared Diver Scallop',
    category: 'From the Sea',
    description: 'Day-boat scallop, saffron beurre blanc, micro herb salad, golden caviar pearls',
    price: '$54',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=800&fit=crop&q=85',
    label: '03',
    highlight: false,
  },
  {
    id: 4,
    name: 'Grand Dessert Plate',
    category: 'Pâtisserie',
    description: 'Valrhona dark chocolate soufflé, gold leaf, cherry coulis, vanilla bean glacé',
    price: '$34',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=800&fit=crop&q=85',
    label: '04',
    highlight: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section
      id="dishes"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-obsidian overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-ember/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-gold/6 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-gold/60" />
              <span className="section-label">Signature Collection</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
              className="text-display text-[clamp(2.5rem,6vw,5rem)] font-light text-cream leading-tight"
            >
              Culinary<br />
              <span className="text-gradient-gold italic">Masterpieces</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-xs text-cream/40 text-sm leading-relaxed font-light tracking-wide"
          >
            Each dish is a conversation between fire and finesse, between tradition and the audacity of innovation.
          </motion.p>
        </div>

        {/* Dishes grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </motion.div>

        {/* View full menu link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-4 text-cream/50 hover:text-cream/90 transition-colors duration-300 text-sm tracking-[0.2em] uppercase"
          >
            <span className="w-12 h-[1px] bg-current transition-all duration-500 group-hover:w-20" />
            Explore Full Menu
            <span className="w-12 h-[1px] bg-current transition-all duration-500 group-hover:w-20" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function DishCard({ dish }: { dish: typeof dishes[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
        dish.highlight ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {/* Image container */}
      <div className="img-zoom-container relative h-[380px] md:h-[440px]">
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/0 transition-colors duration-700" />

        {/* Glow on hover */}
        <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/10 transition-colors duration-700 rounded-2xl" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
          style={{ boxShadow: 'inset 0 0 60px rgba(200,75,49,0.15)' }} />

        {/* Label */}
        <div className="absolute top-5 left-5">
          <span className="text-mono text-gold/50 text-3xl font-bold leading-none">
            {dish.label}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-5 right-5">
          <span className="glass px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase text-cream/60 rounded-full">
            {dish.category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-display text-xl font-light text-cream mb-1.5">{dish.name}</h3>
          <p className="text-cream/40 text-xs leading-relaxed mb-3 font-light">{dish.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-gradient-gold text-xl font-light text-display">{dish.price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-warm text-gold/80 text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full hover:text-gold transition-colors duration-300"
            >
              Add to Order
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
