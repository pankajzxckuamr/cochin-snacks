'use client'

import { m } from 'framer-motion'

const countries = [
  { name: 'USA', flag: '🇺🇸' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Malta', flag: '🇲🇹' },
]

export default function ExportMarquee() {
  // Duplicate array multiple times to create a seamless infinite loop
  const duplicatedCountries = [...countries, ...countries, ...countries, ...countries]

  return (
    <div className="w-full overflow-hidden relative py-12 sm:py-20 flex bg-white border-y border-gray-100">
      {/* Gradient masks for smooth fading at the edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <m.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 35,
          repeat: Infinity,
        }}
      >
        {duplicatedCountries.map((country, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-8 sm:px-12 group hover:scale-110 transition-transform duration-300 cursor-default"
          >
            <span className="text-4xl sm:text-6xl filter drop-shadow-md group-hover:drop-shadow-xl transition-all">{country.flag}</span>
            <span className="text-xl sm:text-3xl font-bold text-dark/70 font-heading group-hover:text-dark transition-colors">
              {country.name}
            </span>
          </div>
        ))}
      </m.div>
    </div>
  )
}
