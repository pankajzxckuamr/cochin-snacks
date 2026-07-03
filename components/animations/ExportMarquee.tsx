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

const getCountryCode = (flagEmoji: string) => {
  if (!flagEmoji || flagEmoji.length < 2) return 'in';
  const code1 = flagEmoji.codePointAt(0);
  const code2 = flagEmoji.codePointAt(2);
  if (code1 && code2) {
    return (String.fromCharCode(code1 - 127397) + String.fromCharCode(code2 - 127397)).toLowerCase();
  }
  return 'in';
};

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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm bg-white shrink-0 group-hover:border-green-brand/40 group-hover:shadow-md transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://flagcdn.com/w80/${getCountryCode(country.flag)}.png`} 
                alt={`${country.name} flag`} 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-xl sm:text-3xl font-bold text-dark/70 font-heading group-hover:text-dark transition-colors">
              {country.name}
            </span>
          </div>
        ))}
      </m.div>
    </div>
  )
}
