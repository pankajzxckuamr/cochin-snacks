'use client'

import { useEffect, useRef } from 'react'

const WORD = 'COCHIN SNACKS '
const RADIUS = 300
const CX = 320
const CY = 320
const FONT_SIZE = 75
const FONT_FAMILY = 'var(--font-playfair), serif'

export default function RotatingMedallionText() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // We handle the letter generation once on mount to keep it clean
    // The animation will be handled by CSS
  }, [])

  const n = WORD.length
  const letters = Array.from(WORD).map((ch, i) => {
    const angle = -90 + i * (360 / n)
    const rad = (angle * Math.PI) / 180
    const x = CX + RADIUS * Math.cos(rad)
    const y = CY + RADIUS * Math.sin(rad)
    const rot = angle + 90

    if (ch === ' ') {
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={5.5}
          fill="#FFD600"
          style={{
            transformBox: 'fill-box',
            transformOrigin: '50% 50%',
          }}
        />
      )
    }

    return (
      <g
        key={i}
        className="letter-group"
        transform={`translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})`}
      >
        <g className="letter-inner" filter="url(#edgeWobble)">
          {/* Base Text */}
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={FONT_FAMILY}
            fontWeight="900"
            fontSize={FONT_SIZE}
            fill="url(#goldTex)"
            stroke="#C97A10"
            strokeWidth="0.7"
          >
            {ch}
          </text>
          {/* Sheen Text */}
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={FONT_FAMILY}
            fontWeight="900"
            fontSize={FONT_SIZE}
            fill="url(#sheenGlow)"
            style={{ mixBlendMode: 'screen' }}
          >
            {ch}
          </text>
        </g>
      </g>
    )
  })

  // We use the pattern from the user's snippet
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        .medallion-ring {
          transform-origin: 50% 50%;
          animation: medallionSpin 40s linear infinite;
          will-change: transform;
        }
        @keyframes medallionSpin {
          to { transform: rotate(-360deg); }
        }
      `}} />
      <svg
        ref={svgRef}
        viewBox="0 0 640 640"
        className="w-full h-full absolute"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <pattern
            id="goldTex"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(22)"
          >
            <rect width="26" height="26" fill="#FFD600" />
            <path
              d="M0,7.3 Q13.0,3.1 26.0,7.8"
              stroke="#C97A10"
              strokeWidth="0.9"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M0,18.2 Q13.0,22.9 26.0,16.6"
              stroke="#E59400"
              strokeWidth="0.8"
              fill="none"
              opacity="0.35"
            />
            <circle cx="12" cy="12" r="1.2" fill="#8C4A00" opacity="0.35" />
            <circle cx="20" cy="8" r="0.9" fill="#8C4A00" opacity="0.30" />
            <circle cx="6" cy="18" r="0.7" fill="#C97A10" opacity="0.30" />
            <circle cx="15" cy="20" r="0.5" fill="#FFF066" opacity="0.25" />
          </pattern>
          <radialGradient id="sheenGlow" cx="32%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#FFF6DE" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#FFF6DE" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFF6DE" stopOpacity="0" />
          </radialGradient>
          <filter
            id="edgeWobble"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.065"
              numOctaves={2}
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="disp"
            />
            <feDropShadow
              in="disp"
              dx="0"
              dy="2.5"
              stdDeviation="2.8"
              floodColor="#000000"
              floodOpacity="0.40"
            />
          </filter>
        </defs>
        <g className="medallion-ring">{letters}</g>
      </svg>
    </div>
  )
}
