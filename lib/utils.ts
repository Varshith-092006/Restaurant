import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Easing functions for use with GSAP or custom animations
 */
export const easings = {
  /** Luxury smooth out — good for reveals */
  luxuryOut: 'power4.out',
  /** Cinematic enter — dramatic, then settles */
  cinematicIn: 'expo.out',
  /** Elastic snap — for buttons and micro-interactions */
  elastic: 'elastic.out(1.2, 0.5)',
  /** Linear — for scroll-scrubbed animations */
  scrub: 'none',
}

/**
 * Stagger config helpers for Framer Motion
 */
export const stagger = {
  fast: { staggerChildren: 0.06, delayChildren: 0.1 },
  medium: { staggerChildren: 0.1, delayChildren: 0.15 },
  slow: { staggerChildren: 0.15, delayChildren: 0.2 },
}

/**
 * Animation presets for Framer Motion
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
