'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }

    const animateFollower = () => {
      followerPosRef.current.x += (posRef.current.x - followerPosRef.current.x) * 0.1
      followerPosRef.current.y += (posRef.current.y - followerPosRef.current.y) * 0.1
      follower.style.transform = `translate(${followerPosRef.current.x - 20}px, ${followerPosRef.current.y - 20}px)`
      rafRef.current = requestAnimationFrame(animateFollower)
    }

    const onEnterInteractive = () => {
      cursor.style.transform += ' scale(2)'
      follower.style.width = '60px'
      follower.style.height = '60px'
      follower.style.marginLeft = '-30px'
      follower.style.marginTop = '-30px'
      follower.style.borderColor = 'rgba(201, 168, 76, 0.8)'
    }

    const onLeaveInteractive = () => {
      follower.style.width = '40px'
      follower.style.height = '40px'
      follower.style.marginLeft = '0'
      follower.style.marginTop = '0'
      follower.style.borderColor = 'rgba(201, 168, 76, 0.4)'
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animateFollower)

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none' }}
      />
    </>
  )
}
