'use client'

import { useRef, useState } from 'react'
import { m } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import CountriesMarquee from '@/components/animations/CountriesMarquee'

interface GlobalReachSectionProps {
  /** Section background — also drives the marquee edge-fade colour. */
  bg?: 'cream' | 'white'
  /** Number the counter animates up to. */
  countTo?: number
}

export default function GlobalReachSection({ bg = 'cream', countTo = 20 }: GlobalReachSectionProps) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  const startCount = () => {
    if (startedRef.current) return
    startedRef.current = true
    let start = 0
    const end = countTo
    const duration = 1800
    const step = Math.max(duration / end, 16)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, step)
  }

  return (
    <section
      className={`${bg === 'white' ? 'bg-white' : 'bg-cream'} text-dark py-16 sm:py-20 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
              style={{
                WebkitTextStroke: '2px #ffffff',
                fontFamily: 'Impact, "Arial Black", sans-serif',
                filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
              }}
            >
              Global Reach
            </h2>
          </div>

          {/* Big animated counter — modern card */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            onViewportEnter={startCount}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group relative inline-flex flex-col items-center justify-center bg-white rounded-3xl border border-black/[0.06] px-12 py-10 shadow-sm overflow-hidden hover:border-green-brand/40 hover:shadow-[0_18px_44px_-18px_rgba(45,184,45,0.35)] hover:-translate-y-1 transition-all duration-300 mb-10"
          >
            <span className="font-heading text-7xl sm:text-8xl font-black text-green-brand tabular-nums leading-none">
              {count}
              <span className="text-green-brand">+</span>
            </span>
            <span className="text-dark/60 text-sm font-bold uppercase tracking-widest mt-3 font-mono">
              Countries We Serve
            </span>
            <span className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-brand to-green-dark group-hover:w-full transition-all duration-500 rounded-full" />
          </m.div>
        </div>

        {/* Country flags marquee — two opposing seamless rows */}
        <CountriesMarquee bg={bg} />
      </div>
    </section>
  )
}
