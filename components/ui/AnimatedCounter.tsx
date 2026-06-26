'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number // in milliseconds
  label: string
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  
  // Transform floating values to rounded integer values
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Subscribe to changes in the rounded value to trigger React re-renders
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [rounded])

  useEffect(() => {
    if (isInView) {
      // animate from 0 to end value
      const controls = animate(count, end, {
        duration: duration / 1000,
        ease: 'easeOut',
      })
      return () => controls.stop()
    }
  }, [isInView, count, end, duration])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center p-6">
      <m.div
        className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-yellow tracking-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span>{prefix}</span>
        <span>{displayValue.toLocaleString()}</span>
        <span>{suffix}</span>
      </m.div>
      <span className="text-off-white/80 uppercase text-xs sm:text-sm font-bold tracking-widest mt-2 block">
        {label}
      </span>
    </div>
  )
}
