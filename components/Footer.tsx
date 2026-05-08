'use client'

import { motion } from 'framer-motion'

const footerLinks = {
  Explore: ['Our Menu', 'Wine Cellar', 'Private Dining', 'Chef\'s Table'],
  Visit: ['Reservations', 'Location & Hours', 'Parking', 'Accessibility'],
  Connect: ['Instagram', 'Newsletter', 'Press Inquiries', 'Careers'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-smoke border-t border-cream/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-ember/5 blur-[150px] pointer-events-none" />

      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-12 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-display text-3xl font-light text-cream">
                Ember <span className="text-gradient-gold">&</span> Ash
              </h3>
              <p className="section-label text-[0.6rem] tracking-[0.4em] text-cream/30 mt-1">
                Fine Dining · New York
              </p>
            </div>

            <p className="text-cream/35 text-sm leading-loose font-light max-w-xs mb-8">
              A sanctuary where fire, craft, and obsession converge. Located in the heart of Manhattan, open six evenings per week.
            </p>

            {/* Address */}
            <div className="space-y-1 text-cream/30 text-sm font-light">
              <p>48 East 20th Street</p>
              <p>New York, NY 10003</p>
              <p className="mt-2 text-gold/50">Tues–Sun · 6:00 PM – 11:00 PM</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-8">
              {['IG', 'FB', 'TW'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="glass w-10 h-10 rounded-full flex items-center justify-center text-cream/30 hover:text-gold/70 hover:border-gold/20 transition-all duration-300 text-xs font-mono"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="section-label text-[0.65rem] text-cream/40 mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-cream/30 hover:text-cream/70 transition-colors duration-300 text-sm font-light"
                    >
                      <span className="block w-0 group-hover:w-3 h-[1px] bg-gold/50 transition-all duration-400" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs font-light tracking-wide">
            © {year} Ember & Ash Restaurant Group. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-cream/20 hover:text-cream/40 transition-colors duration-300 text-xs font-light"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Large brand watermark */}
        <div className="mt-12 overflow-hidden pointer-events-none">
          <p className="text-mono text-[12vw] font-bold text-cream/[0.02] leading-none whitespace-nowrap text-center select-none">
            EMBER & ASH
          </p>
        </div>
      </div>
    </footer>
  )
}
