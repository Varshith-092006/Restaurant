# 🔥 Ember & Ash — Luxury Restaurant Website

A cinematic, Awwwards-caliber luxury restaurant website built with Next.js 15, Framer Motion, GSAP, and Lenis smooth scrolling.

---

## ✨ Features

- **Cinematic Hero** — Mouse parallax, floating dish cards, staggered text reveals, ambient particle system
- **Premium Navbar** — Glass morphism, Framer Motion scroll-reactive blur, magnetic hover links, animated mobile menu
- **Marquee** — Infinite smooth scroll marquee belt
- **Signature Dishes** — GSAP stagger reveals, hover zoom, floating glassmorphism cards, animated pricing
- **Experience Section** — Split-layout scroll reveals, parallax images, clip-path transitions
- **Chef Showcase** — Editorial layout, scroll-reactive parallax, animated stat counters
- **Testimonials** — Auto-cycling carousel, direction-aware slide transitions, glassmorphism cards
- **Gallery** — Masonry grid, hover reveal, click-to-lightbox, lazy loading
- **Reservation** — Animated gradient background, luxurious form inputs with micro-interactions, success state
- **Footer** — Large brand watermark, elegant link hover animations, social icons
- **Custom Cursor** — Smooth magnetic cursor with follower
- **Lenis Smooth Scroll** — Ultra-smooth 1.4s duration easing

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 📁 Project Structure

```
luxury-restaurant/
├── app/
│   ├── layout.tsx          # Root layout with Lenis + Custom Cursor
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design system: tokens, glass, noise, animations
│
├── components/
│   ├── SmoothScroll.tsx    # Lenis smooth scroll provider
│   ├── CustomCursor.tsx    # Magnetic cursor with follower animation
│   ├── Navbar.tsx          # Glass navbar with scroll behavior
│   ├── Hero.tsx            # Cinematic fullscreen hero
│   ├── MarqueeSection.tsx  # Infinite scrolling brand belt
│   ├── SignatureDishes.tsx # Dish cards with stagger + zoom
│   ├── Experience.tsx      # Split scroll storytelling
│   ├── ChefShowcase.tsx    # Editorial chef feature
│   ├── Testimonials.tsx    # Auto-cycling testimonials
│   ├── Gallery.tsx         # Masonry gallery + lightbox
│   ├── Reservation.tsx     # Reservation form with animations
│   └── Footer.tsx          # Elegant footer
│
├── hooks/
│   └── useGSAP.ts         # GSAP + Lenis sync hook + utilities
│
├── lib/
│   └── utils.ts           # Animation presets, cn(), easing constants
│
├── tailwind.config.ts      # Custom colors, fonts, keyframes
├── next.config.mjs         # Image domains config
└── package.json
```

---

## 🎨 Design System

### Colors
```
obsidian  #080808   — Primary background
charcoal  #111111   — Card backgrounds
smoke     #1A1A1A   — Section alternates
ember     #C84B31   — Primary accent (fire)
amber     #D4813A   — Secondary warm accent
gold      #C9A84C   — Premium accent (metallic)
gold-light #E8C76A  — Highlight shimmer
cream     #F5EDD7   — Primary text
```

### Typography
- **Display** — Cormorant Garamond (serif, for headings)
- **Body** — DM Sans (geometric, for body text)
- **Mono** — Bebas Neue (decorative numerals, labels)

### Animation Easings
```ts
// Luxury reveal
[0.25, 0.46, 0.45, 0.94]

// Cinematic snap
[0.77, 0, 0.175, 1]

// Framer elastic spring
type: 'spring', stiffness: 300, damping: 20
```

---

## 🎬 Animation Architecture

### Scroll Orchestration
1. **Lenis** handles smooth scroll with 1.4s duration
2. **Framer Motion** `useInView` + `useScroll` / `useTransform` for React components
3. **GSAP ScrollTrigger** synced to Lenis via the `useGSAP` hook for complex timelines

### Pattern: Section Reveal
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-10%' })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

### Pattern: Parallax on Scroll
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
<motion.div style={{ y }}>...</motion.div>
```

### Pattern: Mouse Parallax
```tsx
const mouseX = useMotionValue(0)
const parallaxX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]))
// Update on mousemove: mouseX.set(normalizedX)
<motion.div style={{ x: parallaxX }}>...</motion.div>
```

### Pattern: Stagger Children
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}
```

---

## 🛠 Customization

### Change Restaurant Name / Brand
1. Edit `app/layout.tsx` — update `metadata`
2. Edit `components/Navbar.tsx` — update logo text
3. Edit `components/Footer.tsx` — update brand info

### Swap Images
Replace Unsplash URLs with your own:
- Hero: `components/Hero.tsx` — background image
- Dishes: `components/SignatureDishes.tsx` — `dishes[]` array
- Chef: `components/ChefShowcase.tsx` — chef portrait
- Gallery: `components/Gallery.tsx` — `galleryItems[]` array

### Adjust Colors
Edit `tailwind.config.ts` under `theme.extend.colors`.

### Modify Animations
- Timing: Change `duration` values in transitions
- Easing: Swap `ease` arrays for different feels
- Distance: Adjust `y`, `x`, `scale` initial values

---

## 🔌 Adding Real Data

Replace static data with API calls using Next.js server components:

```tsx
// app/page.tsx (server component)
const dishes = await fetch('https://your-api.com/dishes').then(r => r.json())
return <SignatureDishes dishes={dishes} />
```

Or connect to a headless CMS (Sanity, Contentful, Strapi) for full content management.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `framer-motion` | React animation library |
| `gsap` | Professional animation engine |
| `@studio-freight/lenis` | Smooth scroll |
| `next` | React framework |
| `tailwindcss` | Utility CSS |

---

## 🏆 Performance

- Images use `next/image` with lazy loading + priority hints
- Animations use `will-change: transform` where appropriate
- GSAP lazy-imported to reduce initial bundle
- Framer Motion `AnimatePresence` for unmount animations
- Lenis runs on `requestAnimationFrame` for 60/120fps smoothness

---

## 📄 License

MIT — Free for personal and commercial use.
