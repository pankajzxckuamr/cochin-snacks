'use client'

import { ReactNode } from 'react'
import { m } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number // in seconds
  direction?: 'up' | 'left' | 'right' | 'fade'
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  // Animation presets mapping
  const presets = {
    up: {
      hidden: { y: 40, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    left: {
      hidden: { x: -40, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    right: {
      hidden: { x: 40, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  }

  const selectedPreset = presets[direction]

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={selectedPreset}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: delay,
      }}
    >
      {children}
    </m.div>
  )
}
