'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Connects GSAP ScrollTrigger to Lenis smooth scroll.
 * Import and call this hook in any client component that uses GSAP animations.
 *
 * @example
 * const containerRef = useRef(null)
 * useGSAPScrollTrigger(containerRef, (gsap, ScrollTrigger) => {
 *   gsap.fromTo(containerRef.current, { opacity: 0 }, {
 *     opacity: 1,
 *     scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
 *   })
 * })
 */
export function useGSAPScrollTrigger<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (gsap: any, ScrollTrigger: any) => (() => void) | void
) {
  useEffect(() => {
    let cleanup: (() => void) | void

    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      // Sync ScrollTrigger with Lenis
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      }

      if (ref.current) {
        cleanup = callback(gsap, ScrollTrigger)
      }
    }

    init()

    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [ref, callback])
}

/**
 * Creates a text reveal animation on scroll for a container of words.
 * Each word is wrapped in a span with overflow-hidden and animated up.
 */
export function createWordReveal(gsap: any, ScrollTrigger: any, selector: string) {
  const elements = document.querySelectorAll(selector)

  elements.forEach((el) => {
    const words = el.innerHTML.split(' ')
    el.innerHTML = words
      .map((w) => `<span class="text-reveal-mask"><span class="inline-block">${w}</span></span>`)
      .join(' ')

    gsap.from(el.querySelectorAll('.text-reveal-mask > span'), {
      y: '110%',
      opacity: 0,
      stagger: 0.06,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  })
}

/**
 * Parallax effect for images inside containers.
 */
export function createParallax(gsap: any, ScrollTrigger: any, selector: string, strength = 0.3) {
  const elements = document.querySelectorAll(selector)

  elements.forEach((el) => {
    const parent = el.closest('[data-parallax-container]') || el.parentElement
    if (!parent) return

    gsap.fromTo(
      el,
      { y: `-${strength * 100}px` },
      {
        y: `${strength * 100}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: parent,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })
}
