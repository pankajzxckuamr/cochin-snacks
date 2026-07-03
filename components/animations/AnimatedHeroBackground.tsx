'use client'

import { m } from 'framer-motion'

export default function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <m.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#1B851B]/30 to-transparent blur-3xl"
      />
      <m.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#FFD600]/30 to-transparent blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,15,0)_0%,rgba(15,15,15,1)_100%)]" />
    </div>
  )
}
