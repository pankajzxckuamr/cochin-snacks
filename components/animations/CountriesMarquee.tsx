interface MarqueeCountry {
  name: string
  flag: string
}

const SERVE_COUNTRIES: MarqueeCountry[] = [
  { name: 'UK', flag: '🇬🇧' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Malta', flag: '🇲🇹' },
  { name: 'New Zealand', flag: '🇳🇿' },
]

const getCountryCode = (flagEmoji: string) => {
  if (!flagEmoji || flagEmoji.length < 2) return 'in'
  const code1 = flagEmoji.codePointAt(0)
  const code2 = flagEmoji.codePointAt(2)
  if (code1 && code2) {
    return (String.fromCharCode(code1 - 127397) + String.fromCharCode(code2 - 127397)).toLowerCase()
  }
  return 'in'
}

const renderChip = (country: MarqueeCountry, idx: number) => (
  <span
    key={idx}
    className="mr-3 inline-flex items-center gap-2.5 shrink-0 rounded-full bg-white border border-black/[0.06] pl-2 pr-4 py-2 shadow-[0_2px_10px_-4px_rgba(17,17,17,0.15)] hover:border-green-brand/40 hover:shadow-[0_6px_18px_-6px_rgba(45,184,45,0.35)] transition-all duration-200"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`https://flagcdn.com/w80/${getCountryCode(country.flag)}.png`}
      alt={`${country.name} flag`}
      loading="lazy"
      className="w-7 h-[21px] rounded-[3px] object-cover ring-1 ring-black/10 shrink-0"
    />
    <span className="text-sm font-semibold text-dark/75 whitespace-nowrap">
      {country.name}
    </span>
  </span>
)

interface CountriesMarqueeProps {
  /** Background of the surrounding section, used to colour the edge fade masks. */
  bg?: 'cream' | 'white'
  countries?: MarqueeCountry[]
}

export default function CountriesMarquee({ bg = 'cream', countries }: CountriesMarqueeProps) {
  const list = countries && countries.length > 0 ? countries : SERVE_COUNTRIES
  const rowSplit = Math.ceil(list.length / 2)
  const rowA = list.slice(0, rowSplit)
  const rowB = list.slice(rowSplit)

  const fadeLeft =
    bg === 'white'
      ? 'from-white to-transparent'
      : 'from-cream to-transparent'

  return (
    <div className="group/marquee relative w-full mx-auto flex flex-col gap-3 sm:gap-4">
      {/* Edge fade masks */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r ${fadeLeft} z-10`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l ${fadeLeft} z-10`} />

      {/* Row A → scrolls left */}
      <div className="flex overflow-hidden">
        <div className="flex w-max animate-marquee-left">
          <div className="flex shrink-0">{rowA.map(renderChip)}</div>
          <div className="flex shrink-0" aria-hidden="true">{rowA.map(renderChip)}</div>
        </div>
      </div>

      {/* Row B → scrolls right */}
      <div className="flex overflow-hidden">
        <div className="flex w-max animate-marquee-right">
          <div className="flex shrink-0">{rowB.map(renderChip)}</div>
          <div className="flex shrink-0" aria-hidden="true">{rowB.map(renderChip)}</div>
        </div>
      </div>
    </div>
  )
}
