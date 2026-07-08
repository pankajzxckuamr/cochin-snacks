import React from 'react'

type Fade = 'left' | 'right' | 'top' | 'bottom' | 'radial' | 'none'
type Variant = 'dots' | 'grid' | 'crosshatch' | 'diagonal'

interface DotPatternProps {
  /** Positioning / sizing utilities, e.g. "top-0 left-0 w-1/3 h-full" */
  className?: string
  /** Pattern style */
  variant?: Variant
  /** Line / dot colour (any valid CSS colour). Defaults to white for dark surfaces. */
  color?: string
  /** Grid spacing / tile size in px */
  gap?: number
  /** Line thickness or dot radius in px */
  size?: number
  /** Overall opacity of the pattern layer */
  opacity?: number
  /** Direction the pattern fades out for a soft, subtle edge */
  fade?: Fade
}

const FADE_MASKS: Record<Fade, string | undefined> = {
  left: 'linear-gradient(to right, black, transparent)',
  right: 'linear-gradient(to left, black, transparent)',
  top: 'linear-gradient(to bottom, black, transparent)',
  bottom: 'linear-gradient(to top, black, transparent)',
  radial: 'radial-gradient(circle at center, black, transparent 70%)',
  none: undefined,
}

function buildBackground(
  variant: Variant,
  color: string,
  gap: number,
  size: number,
): React.CSSProperties {
  switch (variant) {
    case 'grid':
      return {
        backgroundImage: `linear-gradient(${color} ${size}px, transparent ${size}px), linear-gradient(90deg, ${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }
    case 'crosshatch':
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} ${size}px, transparent ${size}px, transparent ${gap}px), repeating-linear-gradient(-45deg, ${color} 0, ${color} ${size}px, transparent ${size}px, transparent ${gap}px)`,
      }
    case 'diagonal':
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} ${size}px, transparent ${size}px, transparent ${gap}px)`,
      }
    default:
      return {
        backgroundImage: `radial-gradient(circle, ${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }
  }
}

/**
 * Subtle decorative background layer. Render inside a `relative
 * overflow-hidden` container; it sits behind content (keep content at z-10).
 */
export default function DotPattern({
  className = '',
  variant = 'dots',
  color = '#ffffff',
  gap = 22,
  size = 1,
  opacity = 0.07,
  fade = 'none',
}: DotPatternProps) {
  const mask = FADE_MASKS[fade]

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        opacity,
        ...buildBackground(variant, color, gap, size),
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
      }}
    />
  )
}
