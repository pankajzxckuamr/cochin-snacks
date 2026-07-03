'use client'

import { ReactNode, useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

interface SteamEffectProps {
  children: ReactNode
  intensity: 'subtle' | 'medium'
}

interface WispProps {
  height: number
  maxOpacity: number
  delay: number
  duration: number
  leftOffset: string
}

function SteamWisp({ height, maxOpacity, delay, duration, leftOffset }: WispProps) {
  return (
    <m.div
      initial={{ y: 0, opacity: 0, x: 0 }}
      animate={{
        y: -45,
        opacity: [0, maxOpacity, maxOpacity * 0.7, 0],
        x: [0, 4, -4, 4, -4, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: leftOffset,
        height: `${height}px`,
        width: '16px',
        transformOrigin: 'bottom center',
      }}
      className="pointer-events-none select-none text-white"
    >
      <svg
        viewBox="0 0 20 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ filter: 'blur(1.5px)' }}
      >
        <path
          d="M10 100 C15 75 5 50 10 25 C15 12 10 0 10 0"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </m.div>
  )
}

export default function SteamEffect({ children, intensity }: SteamEffectProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  const baseOpacity = intensity === 'subtle' ? 0.35 : 0.55  // Increased slightly for solid visibility
  const maxOpacity = isMobile ? baseOpacity * 0.5 : baseOpacity
  const height = intensity === 'subtle' ? 35 : 55

  const wisps = [
    { delay: 0.0, duration: 2.2, leftOffset: '20%' },
    { delay: 0.6, duration: 2.8, leftOffset: '45%' },
    { delay: 1.2, duration: 2.4, leftOffset: '65%' },
    { delay: 1.8, duration: 2.6, leftOffset: '80%' },
  ]

  return (
    <div className="relative w-full h-full">
      {/* Steam Wisps Container (z-index 10 so it's visible ON the card) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 10,
        }}
      >
        {wisps.map((w, i) => (
          <SteamWisp
            key={i}
            height={height}
            maxOpacity={maxOpacity}
            delay={w.delay}
            duration={w.duration}
            leftOffset={w.leftOffset}
          />
        ))}
      </div>

      {/* Wrapped Content */}
      <div className="relative w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  )
}
