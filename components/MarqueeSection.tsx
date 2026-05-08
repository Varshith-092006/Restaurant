'use client'

import { motion } from 'framer-motion'

const items = [
  'Signature Tasting Menu',
  '·',
  'A5 Wagyu',
  '·',
  'Black Truffle',
  '·',
  'Sommelier Selections',
  '·',
  'Seasonal Ingredients',
  '·',
  'Private Dining',
  '·',
  'Michelin Starred',
  '·',
  'New York\'s Finest',
  '·',
]

export default function MarqueeSection() {
  return (
    <div className="relative py-5 overflow-hidden border-y border-cream/5">
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian pointer-events-none z-10" />

      {/* Track 1 — left */}
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0 gap-8 items-center whitespace-nowrap"
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`text-sm tracking-[0.15em] uppercase font-light ${
                item === '·' ? 'text-gold/60 text-base' : 'text-cream/30'
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
