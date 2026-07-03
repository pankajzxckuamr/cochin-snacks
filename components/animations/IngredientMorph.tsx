'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useInView } from 'framer-motion'

// Define the ingredient icons
const BananaIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M10 36C14 38 20 37 26 31C34 23 38 14 36 8C34 6 30 7 24 13C18 19 12 28 9 32C8 33 8 35 10 36Z"
      fill="#FFD600"
    />
    <path
      d="M34 8C35.5 6.5 37 5 38 4"
      stroke="#5C4033"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
)

const ChilliIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M36 12C30 14 18 20 13 28C8 36 8 42 10 42C12 42 18 40 26 33C34 26 38 18 36 12Z"
      fill="#E8230A"
    />
    <path
      d="M35 13C36 11 37 8 35 6C33 4 30 6 29 8"
      fill="none"
      stroke="#3CC120"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
)

const GarlicIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M24 6C20 12 10 18 10 28C10 36 16 42 24 42C32 42 38 36 38 28C38 18 28 12 24 6Z"
      fill="#F5F5F0"
      stroke="#D1D1C6"
      strokeWidth="1.5"
    />
    <path
      d="M24 6C24 18 19 38 19 42M24 6C24 18 29 38 29 42"
      stroke="#D1D1C6"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M20 42H28"
      stroke="#8B7E66"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
)

const CurryLeafIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M24 6V42"
      stroke="#2E7D32"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M24 6C24 6 21 11 24 14C27 11 24 6 24 6Z" fill="#3CC120" />
    <path d="M24 17C16 15 12 19 12 19C12 19 18 23 24 21Z" fill="#3CC120" />
    <path d="M24 17C32 15 36 19 36 19C36 19 30 23 24 21Z" fill="#3CC120" />
    <path d="M24 27C16 25 13 29 13 29C13 29 18 33 24 31Z" fill="#3CC120" />
    <path d="M24 27C32 25 35 29 35 29C35 29 30 33 24 31Z" fill="#3CC120" />
  </svg>
)

const OilDropIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M24 6C24 6 12 22 12 32C12 38.6 17.4 44 24 44C30.6 44 36 38.6 36 32C36 22 24 6 24 6Z"
      fill="#C97A10"
    />
    <path
      d="M20 28C20 24 24 18 24 18"
      stroke="#FFE0B2"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.6"
      fill="none"
    />
  </svg>
)

const SnackPackIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <path
      d="M16 12C28 8 36 8 48 12C56 20 58 36 48 48C38 58 26 58 16 48C6 36 8 20 16 12Z"
      fill="#3CC120"
    />
    <path
      d="M20 15C28 12 36 12 44 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.3"
      fill="none"
    />
    <path
      d="M24 18 C22 28 22 36 24 46 L40 46 C42 36 42 28 40 18 Z"
      fill="#1E6B2E"
      stroke="#FFD600"
      strokeWidth="1.5"
    />
    <path d="M22 18 L42 18" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 46 L42 46" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M32 26 L34 31 L39 31 L35 34 L37 39 L32 36 L27 39 L29 34 L25 31 L30 31 Z"
      fill="#FFD600"
    />
    <text
      x="32"
      y="43"
      fill="#FFFFFF"
      fontSize="5"
      fontWeight="black"
      textAnchor="middle"
      letterSpacing="0.5"
      fontFamily="var(--font-inter), sans-serif"
    >
      COCHIN
    </text>
  </svg>
)

type Stage = 'idle' | 'appearing' | 'converging' | 'snack' | 'fadeout'

export default function IngredientMorph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [stage, setStage] = useState<Stage>('idle')

  useEffect(() => {
    if (!isInView) {
      setStage('idle')
      return
    }

    let timer: NodeJS.Timeout

    const runSequence = () => {
      // Step 1: Staggered entry from below
      setStage('appearing')

      // Step 2: Icons converge 1.5s after starting Step 1
      timer = setTimeout(() => {
        setStage('converging')

        // Step 3: Snack pack appears exactly as the icons converge (0.8s converge animation)
        timer = setTimeout(() => {
          setStage('snack')

          // Step 5: After 2s pause (2.3s total snack stage length to include 0.3s tagline delay + 2s tagline pause), fade out
          timer = setTimeout(() => {
            setStage('fadeout')

            // Reset back to idle after 0.5s fade out duration
            timer = setTimeout(() => {
              setStage('idle')

              // Start gap of 0.5s before restarting Step 1
              timer = setTimeout(() => {
                runSequence()
              }, 500)
            }, 500)
          }, 2300)
        }, 800)
      }, 1500)
    }

    runSequence()

    return () => {
      clearTimeout(timer)
    }
  }, [isInView])

  // Spacing math for 64px horizontal offset centers relative to parent center:
  const ingredients = [
    { component: <BananaIcon />, targetX: 128, targetRotate: -180, leftOffset: -128 },
    { component: <ChilliIcon />, targetX: 64, targetRotate: 180, leftOffset: -64 },
    { component: <GarlicIcon />, targetX: 0, targetRotate: -360, leftOffset: 0 },
    { component: <CurryLeafIcon />, targetX: -64, targetRotate: 360, leftOffset: 64 },
    { component: <OilDropIcon />, targetX: -128, targetRotate: -180, leftOffset: 128 },
  ]

  // Parent wrapper animation properties
  const getParentAnimate = () => {
    switch (stage) {
      case 'idle':
        return { opacity: 0, scale: 1 }
      case 'appearing':
      case 'converging':
      case 'snack':
        return { opacity: 1, scale: 1 }
      case 'fadeout':
        return { opacity: 0, scale: 0.9 }
    }
  }

  const getParentTransition = () => {
    if (stage === 'fadeout') {
      return { duration: 0.5, ease: 'easeInOut' as const }
    }
    if (stage === 'idle') {
      return { duration: 0 }
    }
    return { duration: 0.2 }
  }

  // Children ingredients animation properties
  const getIconAnimate = (targetX: number, targetRotate: number) => {
    switch (stage) {
      case 'idle':
        return { opacity: 0, y: 40, x: 0, scale: 1, rotate: 0 }
      case 'appearing':
        return { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
      case 'converging':
        return { opacity: 0, y: -20, x: targetX, scale: 0.3, rotate: targetRotate }
      case 'snack':
      case 'fadeout':
        return { opacity: 0, y: -20, x: targetX, scale: 0.3, rotate: targetRotate }
    }
  }

  const getIconTransition = (index: number) => {
    switch (stage) {
      case 'appearing':
        return {
          delay: index * 0.1,
          duration: 0.5,
          ease: 'easeOut' as const,
        }
      case 'converging':
        return { duration: 0.8, ease: 'easeInOut' as const }
      default:
        return { duration: 0.2 }
    }
  }

  // Snack pack animation properties
  const getSnackAnimate = () => {
    switch (stage) {
      case 'idle':
      case 'appearing':
      case 'converging':
        return { scale: 0, opacity: 0, rotate: 0 }
      case 'snack':
      case 'fadeout':
        return { scale: 1, opacity: 1, rotate: [-12, 8, -4, 0] }
    }
  }

  const getSnackTransition = () => {
    if (stage === 'snack') {
      return {
        scale: { type: 'spring' as const, stiffness: 200, damping: 15 },
        opacity: { duration: 0.2 },
        rotate: { duration: 0.6, ease: 'easeOut' as const }
      }
    }
    return { duration: 0.2 }
  }

  // Glow wrapper animation properties
  const getGlowAnimate = () => {
    if (stage === 'snack') {
      return {
        boxShadow: [
          '0 0 0px rgba(255,214,0,0)',
          '0 0 40px rgba(255,214,0,0.8)',
          '0 0 0px rgba(255,214,0,0)',
        ],
      }
    }
    return { boxShadow: '0 0 0px rgba(255,214,0,0)' }
  }

  const getGlowTransition = () => {
    if (stage === 'snack') {
      return {
        duration: 1.0,
        times: [0, 0.5, 1],
        ease: 'easeInOut' as const,
      }
    }
    return { duration: 0.2 }
  }

  // Tagline animation properties
  const getTaglineAnimate = () => {
    switch (stage) {
      case 'idle':
      case 'appearing':
      case 'converging':
        return { opacity: 0, y: 10 }
      case 'snack':
      case 'fadeout':
        return { opacity: 1, y: 0 }
    }
  }

  const getTaglineTransition = () => {
    if (stage === 'snack') {
      return { delay: 0.3, duration: 0.4, ease: 'easeOut' as const }
    }
    return { duration: 0.2 }
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="min-h-[160px] h-[160px] relative w-full flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      <m.div
        animate={getParentAnimate()}
        transition={getParentTransition()}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Ingredient Icons */}
        {ingredients.map((ing, i) => (
          <m.div
            key={i}
            animate={getIconAnimate(ing.targetX, ing.targetRotate)}
            transition={getIconTransition(i)}
            style={{
              left: `calc(50% + ${ing.leftOffset}px - 24px)`,
              top: 'calc(50% - 24px)',
            }}
            className="absolute w-12 h-12 flex items-center justify-center"
          >
            {ing.component}
          </m.div>
        ))}

        {/* Snack Pack Icon with Glow Wrapper */}
        <m.div
          animate={getGlowAnimate()}
          transition={getGlowTransition()}
          style={{
            left: 'calc(50% - 32px)',
            top: 'calc(50% - 32px)',
          }}
          className="absolute w-16 h-16 rounded-full flex items-center justify-center"
        >
          <m.div
            animate={getSnackAnimate()}
            transition={getSnackTransition()}
            className="w-full h-full flex items-center justify-center"
          >
            <SnackPackIcon />
          </m.div>
        </m.div>

        {/* Tagline text below snack pack */}
        <m.p
          animate={getTaglineAnimate()}
          transition={getTaglineTransition()}
          style={{
            top: 'calc(50% + 40px)',
          }}
          className="absolute left-0 right-0 text-[#FFD600] font-semibold italic font-body text-sm sm:text-base text-center tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        >
          Farm to Bag. Kerala in Every Bite.
        </m.p>
      </m.div>
    </div>
  )
}
