'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden bg-obsidian"
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ember/20 via-obsidian to-gold/10" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 50%, rgba(200,75,49,0.25) 0%, transparent 70%)',
              'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.2) 0%, transparent 70%)',
              'radial-gradient(ellipse at 50% 30%, rgba(200,75,49,0.2) 0%, transparent 70%)',
              'radial-gradient(ellipse at 30% 50%, rgba(200,75,49,0.25) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
      }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-gold/60" />
              <span className="section-label">Begin Your Journey</span>
              <span className="w-8 h-[1px] bg-gold/60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
              className="text-display text-[clamp(2.5rem,7vw,6rem)] font-light text-cream leading-tight mb-6"
            >
              Reserve Your<br />
              <span className="text-gradient-gold italic">Evening</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-cream/40 text-lg font-light max-w-md mx-auto"
            >
              Tables are limited. Each evening accepts twelve tables only. Reservations open 60 days in advance.
            </motion.p>
          </div>

          {/* Form or Success */}
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LuxuryInput
                  label="Full Name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Your Name"
                />
                <LuxuryInput
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="your@email.com"
                />
                <LuxuryInput
                  label="Preferred Date"
                  type="date"
                  value={form.date}
                  onChange={(v) => setForm({ ...form, date: v })}
                  placeholder=""
                />
                <LuxuryInput
                  label="Preferred Time"
                  type="time"
                  value={form.time}
                  onChange={(v) => setForm({ ...form, time: v })}
                  placeholder="19:30"
                />

                {/* Guests selector */}
                <div className="space-y-2">
                  <label className="section-label text-[0.62rem] text-cream/40 block">Number of Guests</label>
                  <div className="flex gap-2">
                    {['1', '2', '3', '4', '5', '6+'].map((n) => (
                      <button
                        key={n}
                        onClick={() => setForm({ ...form, guests: n })}
                        className={`flex-1 py-2 rounded-lg text-sm transition-all duration-300 ${
                          form.guests === n
                            ? 'bg-gold/20 border border-gold/40 text-gold'
                            : 'border border-cream/10 text-cream/40 hover:border-cream/20 hover:text-cream/60'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-2">
                  <label className="section-label text-[0.62rem] text-cream/40 block">Occasion (Optional)</label>
                  <select
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                    className="w-full bg-transparent border border-cream/10 rounded-lg px-4 py-3 text-cream/60 text-sm focus:outline-none focus:border-gold/40 transition-colors duration-300 appearance-none"
                  >
                    <option value="" className="bg-obsidian">Select an occasion</option>
                    <option value="birthday" className="bg-obsidian">Birthday Celebration</option>
                    <option value="anniversary" className="bg-obsidian">Anniversary</option>
                    <option value="proposal" className="bg-obsidian">Marriage Proposal</option>
                    <option value="business" className="bg-obsidian">Business Dinner</option>
                    <option value="other" className="bg-obsidian">Other</option>
                  </select>
                </div>

                {/* Notes - full width */}
                <div className="md:col-span-2 space-y-2">
                  <label className="section-label text-[0.62rem] text-cream/40 block">Special Requests</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Dietary requirements, allergies, special arrangements..."
                    rows={3}
                    className="w-full bg-transparent border border-cream/10 rounded-lg px-4 py-3 text-cream/60 text-sm focus:outline-none focus:border-gold/40 transition-colors duration-300 placeholder:text-cream/20 resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 text-center">
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden group px-14 py-5 bg-ember text-cream text-sm tracking-[0.2em] uppercase font-light transition-all duration-500"
                >
                  <motion.span
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-amber"
                  />
                  <span className="relative">Request Reservation</span>
                </motion.button>
                <p className="text-cream/25 text-xs mt-4 font-light">
                  We'll confirm your booking within 2 hours via email.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-3xl p-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-8 text-3xl"
              >
                ✦
              </motion.div>
              <h3 className="text-display text-4xl font-light text-cream mb-4">
                Request <span className="text-gradient-gold italic">Received</span>
              </h3>
              <p className="text-cream/40 font-light max-w-sm mx-auto leading-relaxed">
                Your reservation request has been received with grace. Our host team will reach out within two hours to confirm your evening.
              </p>
            </motion.div>
          )}

          {/* Contact alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
          >
            <a href="tel:+12125550198" className="group flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors duration-300 text-sm">
              <span className="text-gold/60 group-hover:text-gold transition-colors duration-300">✆</span>
              +1 (212) 555-0198
            </a>
            <span className="hidden sm:block w-[1px] h-4 bg-cream/10" />
            <a href="mailto:reservations@emberash.com" className="group flex items-center gap-3 text-cream/40 hover:text-cream/70 transition-colors duration-300 text-sm">
              <span className="text-gold/60 group-hover:text-gold transition-colors duration-300">✉</span>
              reservations@emberash.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LuxuryInput({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-2">
      <label className="section-label text-[0.62rem] text-cream/40 block">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent border border-cream/10 rounded-lg px-4 py-3 text-cream/80 text-sm focus:outline-none placeholder:text-cream/20 transition-colors duration-300"
          style={{ borderColor: focused ? 'rgba(201,168,76,0.4)' : undefined }}
        />
        <motion.div
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-gold/0 via-gold to-gold/0 origin-left"
        />
      </div>
    </div>
  )
}
