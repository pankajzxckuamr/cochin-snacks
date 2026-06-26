'use client'

interface FlameIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'orange' | 'red' | 'yellow' | 'gray'
  delay?: number // delay in seconds
}

export default function FlameIcon({
  size = 'md',
  color = 'orange',
  delay = 0,
}: FlameIconProps) {
  // Sizes mapping
  const sizeClasses = {
    sm: 16,
    md: 32,
    lg: 64,
  }
  const pixelSize = sizeClasses[size]

  // Colors mapping
  const colorMap = {
    orange: 'fill-[#FF6B00] drop-shadow-[0_2px_8px_rgba(255,107,0,0.5)]',
    red: 'fill-[#E8230A] drop-shadow-[0_2px_8px_rgba(232,35,10,0.5)]',
    yellow: 'fill-[#FFD600] drop-shadow-[0_2px_8px_rgba(255,214,0,0.6)]',
    gray: 'fill-[#9CA3AF] opacity-30',
  }

  const fillClass = colorMap[color]

  // CSS Animations styles to run both float and flicker independently (nested)
  const floatStyle = color !== 'gray' 
    ? {
        animation: 'float 3s ease-in-out infinite',
        animationDelay: `${delay}s`,
      }
    : {}

  const flickerStyle = color !== 'gray'
    ? {
        animation: 'flicker 1.5s ease-in-out infinite alternate',
        animationDelay: `${delay}s`,
        transformOrigin: 'bottom center',
      }
    : {}

  return (
    <span
      className="inline-block"
      style={{
        ...floatStyle,
        width: pixelSize,
        height: pixelSize,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        className={fillClass}
        style={flickerStyle}
      >
        <path d="M12 2C12 2 19 7.5 19 13.5C19 18.2 15.8 21 12 21C8.2 21 5 18.2 5 13.5C5 7.5 12 2 12 2ZM12 6.5C12 6.5 9 10 9 13.5C9 15.5 10.2 17 12 17C13.8 17 15 15.5 15 13.5C15 10 12 6.5 12 6.5Z" />
      </svg>
    </span>
  )
}
