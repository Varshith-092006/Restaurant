'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const galleryItems = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=85',
    label: 'The Main Dining Room',
    span: 'col-span-2 row-span-2',
    height: 'h-80',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop&q=85',
    label: 'Artisan Bread Service',
    span: 'col-span-1',
    height: 'h-36',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&q=85',
    label: 'The Ember Hearth',
    span: 'col-span-1',
    height: 'h-36',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop&q=85',
    label: 'Plated Perfection',
    span: 'col-span-1',
    height: 'h-44',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=85',
    label: 'The Evening Setup',
    span: 'col-span-2',
    height: 'h-44',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&q=85',
    label: 'Dessert Artistry',
    span: 'col-span-1',
    height: 'h-36',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop&q=85',
    label: 'The Wine Vault',
    span: 'col-span-1',
    height: 'h-36',
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null)

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-smoke overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] rounded-full bg-ember/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-gold/60" />
              <span className="section-label">Captured Moments</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
              className="text-display text-[clamp(2rem,5.5vw,4.5rem)] font-light text-cream"
            >
              Inside the<br />
              <span className="text-gradient-gold italic">Sanctuary</span>
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#"
            className="group inline-flex items-center gap-3 text-cream/50 hover:text-cream/80 transition-colors duration-300 text-sm tracking-[0.15em] uppercase"
          >
            <span>View Full Gallery</span>
            <span className="block w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-500" />
          </motion.a>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          {galleryItems.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
              onOpen={() => setLightbox(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-obsidian/95 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10]">
                <Image src={lightbox.img} alt={lightbox.label} fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-obsidian to-transparent">
                <p className="text-display text-2xl font-light text-cream">{lightbox.label}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 glass rounded-full w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors duration-300"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryItem({
  item,
  index,
  isInView,
  onOpen,
}: {
  item: typeof galleryItems[0]
  index: number
  isInView: boolean
  onOpen: () => void
}) {
  const [hovered, setHovered] = useState(false)

  // Vary heights for masonry feel
  const heights = ['h-48', 'h-64', 'h-48', 'h-72', 'h-56', 'h-48', 'h-64', 'h-40']
  const height = heights[index % heights.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-xl cursor-pointer ${
        index === 0 ? 'col-span-2 row-span-2' : ''
      } ${index === 4 ? 'col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <div className={`relative ${index === 0 ? 'h-80' : height}`}>
        <Image
          src={item.img}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-1000"
          style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent"
        />

        {/* Label */}
        <motion.div
          animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <p className="text-cream/90 text-sm font-light">{item.label}</p>
          <span className="section-label text-[0.55rem] text-gold/60 mt-0.5 block">
            Tap to expand
          </span>
        </motion.div>

        {/* Corner glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-xl"
          style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.1)' }}
        />
      </div>
    </motion.div>
  )
}
