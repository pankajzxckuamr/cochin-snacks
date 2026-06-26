'use client'

import FlameIcon from './FlameIcon'

interface SpiceMeterProps {
  level: number
}

export default function SpiceMeter({ level }: SpiceMeterProps) {
  // Clamp level between 0 and 5
  const clampedLevel = Math.max(0, Math.min(5, Math.floor(level)))
  const greyFlamesCount = 5 - clampedLevel

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase font-bold tracking-widest text-dark/40">
        Spice Level
      </span>
      <div className="flex items-center gap-1">
        {/* Render active orange flames */}
        {Array.from({ length: clampedLevel }).map((_, i) => (
          <FlameIcon
            key={`active-${i}`}
            size="sm"
            color="orange"
            delay={i * 0.15} // Staggered delays
          />
        ))}

        {/* Render inactive gray flames */}
        {Array.from({ length: greyFlamesCount }).map((_, i) => (
          <FlameIcon
            key={`inactive-${i}`}
            size="sm"
            color="gray"
          />
        ))}

        {/* Verbal indicator */}
        <span className="text-xs text-dark/50 font-bold ml-1 font-mono uppercase tracking-wider">
          ({clampedLevel}/5)
        </span>
      </div>
    </div>
  )
}
