'use client'

interface SectionDividerProps {
  color: string // Tailwind color or hex value, e.g. "fill-[#FAFAF0]" or "fill-green-dark"
  flip?: boolean
}

export default function SectionDivider({
  color,
  flip = false,
}: SectionDividerProps) {
  // Determine SVG classes based on flipping needs
  const flipClass = flip ? 'scale-y-[-1] scale-x-[-1]' : ''

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flipClass}`}>
      <svg
        viewBox="0 0 1440 74"
        className={`relative block w-full h-[32px] sm:h-[48px] md:h-[64px] ${color}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C240,70 480,70 720,32 C960,-6 1200,-6 1440,32 L1440,74 L0,74 Z"
        />
      </svg>
    </div>
  )
}
