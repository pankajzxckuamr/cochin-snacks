'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m, AnimatePresence, useScroll, useTransform, useAnimation, useMotionValue, useSpring } from 'framer-motion'
import {
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import FlameIcon from '@/components/ui/FlameIcon'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ProductCard from '@/components/ui/ProductCard'
import IngredientMorph from '@/components/animations/IngredientMorph'
import SteamEffect from '@/components/animations/SteamEffect'
import RotatingMedallionText from '@/components/animations/RotatingMedallionText'

// ── Image Fallback Wrapper Component ──────────────────────────────────────────
function FallbackImage({ src, alt, width, height, className, style }: any) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={() => setImgSrc('/default-snack.svg')}
    />
  )
}

// ── Particle Field Canvas Component ───────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
    }> = []

    // 60-80 tiny dots in yellow/orange
    const particleCount = 75
    const colors = [
      'rgba(255, 214, 0, 0.35)', // Yellow glow
      'rgba(255, 107, 0, 0.35)', // Orange glow
      'rgba(255, 233, 77, 0.25)', // Light yellow
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3, // slow drift sideways
        vy: -Math.random() * 0.4 - 0.1, // slowly drift upwards
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        // Wrap around borders
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}

interface Product {
  _id: string
  title: string
  slug: string
  category: {
    _id: string
    title: string
    slug: string
  }
  packSize?: string
  mrp: number
  spiceLevel: number
  isHot: boolean
  isBestseller: boolean
  images?: any[]
}

interface Category {
  _id: string
  title: string
  slug: string
  count: number
  imageUrl: string
}

interface Testimonial {
  _id: string
  name: string
  location?: string
  quote: string
  rating: number
}

interface Country {
  _id: string
  name: string
  flag: string
  displayOrder: number
}

interface HomeClientProps {
  bestsellers: Product[]
  categories: Category[]
  testimonials: Testimonial[]
  countries: Country[]
}

interface ChipData {
  id: number
  delay: number
  left: string
  settledY: number
  randomRotate: number
  floatDuration: number
  pathIndex: number
}

const CHIPS_DATA: ChipData[] = [
  { id: 1, delay: 0, left: '12%', settledY: 520, randomRotate: -45, floatDuration: 3.2, pathIndex: 0 },
  { id: 2, delay: 0.1, left: '28%', settledY: 590, randomRotate: 30, floatDuration: 3.8, pathIndex: 1 },
  { id: 3, delay: 0.2, left: '45%', settledY: 640, randomRotate: -15, floatDuration: 3.5, pathIndex: 2 },
  { id: 4, delay: 0.3, left: '60%', settledY: 560, randomRotate: 60, floatDuration: 4.0, pathIndex: 0 },
  { id: 5, delay: 0.15, left: '76%', settledY: 660, randomRotate: -60, floatDuration: 3.4, pathIndex: 1 },
  { id: 6, delay: 0.25, left: '88%', settledY: 610, randomRotate: 15, floatDuration: 3.7, pathIndex: 2 },
]

function FallingChip({ chip, onLand }: { chip: ChipData; onLand: () => void }) {
  const controls = useAnimation()
  const [showParticles, setShowParticles] = useState(false)

  const particlesData = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / 8 + (Math.random() - 0.5) * 0.2
      const distance = 15 + Math.random() * 20
      const targetX = Math.cos(angle) * distance
      const targetY = Math.sin(angle) * distance
      const size = 3 + Math.random() * 2
      return { targetX, targetY, size }
    })
  }, [])

  useEffect(() => {
    let active = true

    // 1. Fall animation with spring physics
    controls.start({
      y: chip.settledY,
      rotate: chip.randomRotate,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 12,
        delay: chip.delay,
      }
    }).then(() => {
      if (!active) return

      // Emit particles
      setShowParticles(true)
      onLand()

      // 2. Landing scale bounce
      controls.start({
        scale: [1, 1.08, 1],
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        }
      }).then(() => {
        if (!active) return

        // 3. Ambient floating oscillation
        controls.start({
          y: [chip.settledY - 6, chip.settledY + 6],
          rotate: [chip.randomRotate - 3, chip.randomRotate + 3],
          transition: {
            y: {
              duration: chip.floatDuration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            rotate: {
              duration: chip.floatDuration * 1.1,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }
          }
        })
      })
    })

    return () => {
      active = false
    }
  }, [controls, chip, onLand])

  // Organic banana chip SVG paths
  const CHIP_PATHS = [
    "M 50,10 C 75,10 92,28 90,50 C 88,72 70,90 50,90 C 30,90 10,70 10,50 C 10,30 25,10 50,10 Z",
    "M 50,12 C 72,8 90,22 88,48 C 86,74 72,88 50,88 C 28,88 12,72 14,48 C 16,24 28,16 50,12 Z",
    "M 50,10 C 78,14 88,32 86,52 C 84,72 68,88 48,86 C 28,84 14,70 12,50 C 10,30 22,6 50,10 Z"
  ]

  return (
    <div
      className="absolute pointer-events-none z-10 select-none"
      style={{
        left: chip.left,
        top: 0,
        transform: 'translateX(-50%)',
      }}
    >
      <m.div
        initial={{ y: -200, rotate: 0, scale: 1 }}
        animate={controls}
        className="relative"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-md"
        >
          {/* Chip base */}
          <path
            d={CHIP_PATHS[chip.pathIndex]}
            fill="#FFD600"
            stroke="#C97A10"
            strokeWidth="3.5"
          />
          {/* Inner ring for banana core */}
          <path
            d="M 50,28 C 62,28 72,38 72,50 C 72,62 62,72 50,72 C 38,72 28,62 28,50 C 28,38 38,28 50,28 Z"
            fill="none"
            stroke="#C97A10"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.65"
          />
          {/* Center core seeds */}
          <circle cx="46" cy="48" r="2" fill="#C97A10" opacity="0.8" />
          <circle cx="54" cy="46" r="1.5" fill="#C97A10" opacity="0.8" />
          <circle cx="50" cy="54" r="2" fill="#C97A10" opacity="0.8" />
          <circle cx="44" cy="52" r="1" fill="#C97A10" opacity="0.8" />
        </svg>

        {/* Impact Particles */}
        {showParticles && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particlesData.map((p, i) => (
              <m.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: p.targetX, y: p.targetY, opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute rounded-full bg-[#FFD600] border border-[#C97A10]/30 shadow-sm"
                style={{
                  width: p.size,
                  height: p.size,
                }}
              />
            ))}
          </div>
        )}
      </m.div>
    </div>
  )
}

// ── Countries We Serve Section ─────────────────────────────────────────────────
const SERVE_COUNTRIES = [
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

function CountriesWeServeSection({ countries }: { countries: Country[] }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const activeCountries = (countries && countries.length > 0 ? countries : SERVE_COUNTRIES) as Country[]

  const getCountryCode = (flagEmoji: string) => {
    if (!flagEmoji || flagEmoji.length < 2) return 'in';
    const code1 = flagEmoji.codePointAt(0);
    const code2 = flagEmoji.codePointAt(2);
    if (code1 && code2) {
      return (String.fromCharCode(code1 - 127397) + String.fromCharCode(code2 - 127397)).toLowerCase();
    }
    return 'in';
  };

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const end = activeCountries.length
          const duration = 1800
          const step = duration / end
          const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start >= end) clearInterval(timer)
          }, step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, activeCountries.length])

  return (
    <section
      ref={sectionRef}
      className="bg-white text-dark py-8 sm:py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline + animated counter */}
        <div className="text-center mb-10">
          <m.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-extrabold tracking-widest text-green-brand block mb-3 font-mono"
          >
            Global Reach
          </m.span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-dark mb-4">
            {"From Cochin To The World".split(" ").map((word, idx, arr) => (
              <m.span
                key={idx}
                className="inline-block"
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.1, 0.8, 1],
                  delay: idx * 0.2
                }}
              >
                {word}{idx < arr.length - 1 && "\u00A0"}
              </m.span>
            ))}
          </h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-dark/60 text-sm sm:text-base max-w-xl mx-auto mb-8"
          >
            Bringing authentic Kerala snacks to families in every corner of the globe.
          </m.p>

          {/* Big animated counter */}
          <div className="inline-flex flex-col items-center justify-center bg-green-brand/5 border-2 border-green-brand/20 rounded-3xl px-12 py-6 shadow-sm">
            <span className="font-heading text-7xl sm:text-8xl font-black text-green-brand tabular-nums leading-none">
              {count}
            </span>
            <span className="text-dark/80 text-sm font-bold uppercase tracking-widest mt-2 font-mono">
              Countries We Serve
            </span>
          </div>
        </div>

        {/* Country flags marquee */}
        <div className="relative overflow-hidden w-full max-w-5xl mx-auto">
          {/* Fade masks for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <m.div
            className="flex gap-4 w-max"
            animate={{ x: [0, -((activeCountries.length * 126) / 2)] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
          >
            {[...activeCountries, ...activeCountries, ...activeCountries].map((country, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 shrink-0 w-[110px] bg-white hover:bg-off-white border border-gray-100 hover:border-green-brand/40 rounded-2xl p-3 shadow-sm transition-all duration-200 cursor-default mx-[2px]"
              >
                <div className="w-10 h-10 mb-1 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm bg-white shrink-0">
                  <img src={`https://flagcdn.com/w80/${getCountryCode(country.flag)}.png`} alt={`${country.name} flag`} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-dark/70 text-center font-mono tracking-wide leading-tight">
                  {country.name}
                </span>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  )
}

export default function HomeClient({ bestsellers, categories, testimonials, countries }: HomeClientProps) {
  const bestsellersRef = useRef<HTMLDivElement>(null)

  const scrollBestsellers = (direction: 'left' | 'right') => {
    if (bestsellersRef.current) {
      const container = bestsellersRef.current
      const cardWidth = container.firstElementChild?.clientWidth || 280
      const gap = 24 // gap-6 is 24px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Parallax Scroll references
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutSectionRef,
    offset: ['start end', 'end start'],
  })
  const yParallax = useTransform(aboutScroll, [0, 1], [50, -50])

  // Testimonials auto scroll status
  const [isTestimonialsHovered, setIsTestimonialsHovered] = useState(false)

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMsg, setNewsletterMsg] = useState('')

  // Mouse Parallax for Hero
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const moveX = clientX - window.innerWidth / 2
    const moveY = clientY - window.innerHeight / 2
    mouseX.set(moveX)
    mouseY.set(moveY)
  }

  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  // Different depths for parallax
  const bgX = useTransform(mouseXSpring, [-500, 500], [15, -15])
  const bgY = useTransform(mouseYSpring, [-500, 500], [15, -15])

  const midX = useTransform(mouseXSpring, [-500, 500], [35, -35])
  const midY = useTransform(mouseYSpring, [-500, 500], [35, -35])

  const frontX = useTransform(mouseXSpring, [-500, 500], [60, -60])
  const frontY = useTransform(mouseYSpring, [-500, 500], [60, -60])

  // Pour & Crunch State
  const [chipsLanded, setChipsLanded] = useState(0)
  const handleChipLand = () => {
    setChipsLanded(prev => prev + 1)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    setNewsletterStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })

      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
      } else {
        const data = await res.json()
        setNewsletterStatus('error')
        setNewsletterMsg(data.message || 'Subscription failed. Please try again.')
      }
    } catch {
      setNewsletterStatus('error')
      setNewsletterMsg('Network error. Please check your internet connection.')
    }
  }


  // Custom Features list for Section 6
  const features = [
    {
      title: 'Authentic Kerala Recipes',
      desc: 'Traditional recipes handed down through generations, preserving the true taste of Kerala.',
    },
    {
      title: 'Premium Ingredients',
      desc: 'Finest bananas, tapiocas, spices — sourced directly from South Indian farmers.',
    },
    {
      title: 'Hygienic Manufacturing',
      desc: 'State-of-the-art production facility in Ernakulam with world-class hygiene standards.',
    },
    {
      title: 'Freshness Guaranteed',
      desc: 'No oil reuse. Every batch is fresh, pure and packed at peak quality.',
    },
    {
      title: 'Global Distribution',
      desc: 'Available in 20+ countries — delivered to your door wherever you are.',
    },
    {
      title: 'Trusted Quality',
      desc: 'Part of Pavithram Group — 75 years of food excellence and consumer trust.',
    },
  ]

  return (
    <div className="overflow-hidden">

      {/* ────────────────── SECTION 1: HERO (Modern Light Theme) ────────────────── */}
      <section className="relative min-h-[85vh] flex items-center bg-[#FAFAF0] overflow-hidden pt-20 sm:pt-24 lg:pt-26 pb-8 lg:pb-12">

        <ParticleField />

        {CHIPS_DATA.map((chip) => (
          <FallingChip
            key={chip.id}
            chip={chip}
            onLand={handleChipLand}
          />
        ))}

        {/* Background Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-yellow/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 -right-20 w-[35rem] h-[35rem] bg-green-brand/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side Content (Now visually on Right on Desktop) */}
          <div className="flex flex-col items-start text-left pt-6 lg:pt-0 order-1 lg:order-2">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-brand/10 mb-0">
              <span className="flex h-2 w-2 rounded-full bg-flame-orange"></span>
              <span className="text-xs font-bold text-green-dark tracking-widest uppercase font-mono">100% Natural Ingredients</span>
            </div>

            {/* Headlines */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 tracking-tight leading-[1.1] text-dark">
              Authentic Kerala <br className="hidden lg:block" />
              <span className="text-green-brand relative inline-block mt-2 lg:mt-0">
                Snacks,
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Crafted for You.
            </h1>

            {/* Subtext */}
            <p className="text-dark/70 text-base md:text-lg max-w-lg mb-6 leading-relaxed font-body">
              Experience the rich taste and tradition of Kerala's favourite snacks. Perfectly spiced, golden crispy, and made for every special occasion.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-xl shadow-green-brand/30 hover:-translate-y-0.5"
              >
                OUR STORY <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-100 hover:border-green-brand hover:text-green-brand text-dark font-bold text-sm tracking-wide rounded-full transition-all shadow-sm"
              >
                EXPLORE SNACKS
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-200/60 w-full max-w-md">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FAFAF0] bg-gray-200 overflow-hidden flex items-center justify-center">
                    <Image src="/placeholder-product.svg" alt="User" width={40} height={40} className="object-cover scale-150" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs font-bold text-dark/60 font-mono uppercase">Loved by 10k+ Customers</p>
              </div>
            </div>
          </div>

          {/* Right Side Image Composition (Now visually on Left on Desktop) */}
          <div className="relative flex justify-center items-center h-[350px] lg:h-[480px] w-full order-2 lg:order-1" style={{ perspective: '1200px' }}>
            {/* Organic Blob Background */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-green-brand/20 to-yellow/20"
              style={{
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                transform: 'scale(0.85)',
              }}
            />

            {/* BACK HALF OF ROTATING RING (Bottom half visible, z-index behind card) */}
            <div
              className="absolute z-10 pointer-events-none flex items-center justify-center w-[400px] sm:w-[500px] lg:w-[600px] aspect-square"
              style={{
                transform: 'rotateX(-60deg) translateY(5%) scale(1.05)',
                clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'
              }}
            >
              <RotatingMedallionText />
            </div>

            {/* Main Hero Image Group */}
            <div className="relative z-20 w-[280px] sm:w-[320px] lg:w-[360px] drop-shadow-2xl rounded-3xl" style={{ transform: 'translateZ(0)' }}>
              <Image
                src="/placeholder-hero.svg"
                alt="Kerala Snacks"
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-[2rem] hover:scale-105 transition-transform duration-700 ease-out shadow-2xl"
              />

              {/* Floating Element 1 */}
              <div className="absolute top-[20%] -right-8 sm:-right-12 lg:-right-16 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-dark/5 z-30 animate-float" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow/20 flex items-center justify-center text-yellow-dark">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-dark/50 uppercase tracking-wider mb-0.5">Quality</p>
                    <p className="text-xs sm:text-sm font-bold text-dark whitespace-nowrap">Export Grade</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute bottom-[20%] -left-8 sm:-left-12 lg:-left-16 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-dark/5 z-30 animate-float" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-flame-orange/10 flex items-center justify-center">
                    <FlameIcon size="sm" color="orange" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-dark/50 uppercase tracking-wider mb-0.5">Taste</p>
                    <p className="text-xs sm:text-sm font-bold text-dark whitespace-nowrap">Perfectly Spiced</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FRONT HALF OF ROTATING RING (Top half visible, z-index in front of card) */}
            <div
              className="absolute z-30 pointer-events-none flex items-center justify-center w-[400px] sm:w-[500px] lg:w-[600px] aspect-square"
              style={{
                transform: 'rotateX(-60deg) translateY(5%) scale(1.05)',
                clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
              }}
            >
              <RotatingMedallionText />
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── SECTION 2: WELCOME (ABOUT US) ────────────────── */}
      <section ref={aboutSectionRef} className="relative py-8 sm:py-12 bg-gradient-to-b from-white to-[#FAFAF0] overflow-hidden">

        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-green-brand/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Col: Narrative Content */}
            <div className="order-2 lg:order-1 flex flex-col items-start">
              <ScrollReveal direction="right">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow/20 rounded-full mb-6">
                  <Star className="w-4 h-4 text-yellow-dark fill-current" />
                  <span className="text-xs font-bold text-yellow-dark tracking-widest uppercase font-mono">Our Heritage</span>
                </div>

                {/* Headline */}
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-dark mb-8 tracking-tight leading-[1.15]">
                  Welcome to <br className="hidden sm:block" />
                  <span className="text-green-brand relative inline-block mt-2 sm:mt-0">
                    Cochin Snacks
                    <svg className="absolute w-full h-3 -bottom-2 left-0 text-yellow/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>

                {/* Body Text */}
                <div className="text-dark/80 text-base lg:text-lg leading-relaxed flex flex-col gap-6 font-body mb-10">
                  <p className="font-medium text-dark border-l-4 border-green-brand pl-4">
                    At Cochin Snacks, a proud venture of Pavithram, we celebrate Kerala's rich culinary heritage through a delightful range of authentic snacks.
                  </p>
                  <p>
                    From the timeless crunch of banana chips to the sweetness of achappam, our offerings are crafted with love, tradition, and uncompromising quality. Our snacks bring together the flavours of nostalgia and modern excellence, perfect for every occasion.
                  </p>
                  <p>
                    Experience the authentic taste of Kerala with every bite, as we continue to uphold our legacy of purity and deliciousness.
                  </p>
                </div>

                {/* Action Button */}
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-dark hover:bg-green-brand text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-xl hover:-translate-y-1"
                >
                  DISCOVER OUR STORY
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </ScrollReveal>
            </div>

            {/* Right Col: Modern Image Collage */}
            <div className="order-1 lg:order-2 relative w-full h-[450px] sm:h-[600px] flex items-center justify-center lg:justify-end">
              <ScrollReveal direction="left" className="w-full h-full relative">

                {/* Main Large Image */}
                <div className="absolute top-0 right-0 w-[85%] h-[80%] rounded-[2rem] sm:rounded-tl-[5rem] sm:rounded-br-[5rem] overflow-hidden shadow-2xl z-10 border-4 border-white">
                  <Image
                    src="/placeholder-hero.svg"
                    alt="Kerala Snacks Tradition"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-dark/10 hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Overlapping Small Image */}
                <div className="absolute bottom-[5%] left-0 w-[55%] sm:w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-[#FAFAF0]">
                  <Image
                    src="/placeholder-product.svg"
                    alt="Authentic Ingredients"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute top-1/3 sm:top-1/2 -left-4 sm:-left-8 sm:-translate-y-1/2 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl z-30 flex items-center gap-3 sm:gap-4 animate-float" style={{ animationDuration: '4s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-brand/10 flex items-center justify-center text-green-brand">
                    <span className="font-black text-lg sm:text-xl">20+</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-bold text-dark/50 uppercase tracking-wider">Years of</span>
                    <span className="text-xs sm:text-sm font-bold text-dark">Excellence</span>
                  </div>
                </div>

              </ScrollReveal>
            </div>

          </div>

          {/* ────────────────── FEATURES ROW (Integrated) ────────────────── */}
          <div className="mt-8 pt-8 border-t border-dark/5 relative z-20">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { title: 'Fresh &\nHygienic', icon: <Sparkles className="w-6 h-6 text-white" /> },
                { title: 'Premium\nQuality', icon: <Star className="w-6 h-6 text-white" /> },
                { title: '100% Natural &\nNo Additives', icon: <CheckCircle className="w-6 h-6 text-white" /> },
                { title: 'Delicious &\nNutritious', icon: <FlameIcon size="sm" color="white" delay={0} /> },
                { title: 'Authentic\nTaste', icon: <MapPin className="w-6 h-6 text-white" /> }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-full pr-6 pl-2 py-2 shadow-sm border border-white/50 min-w-[200px] hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-green-brand rounded-full flex items-center justify-center shrink-0 shadow-inner">
                    {feature.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-dark whitespace-pre-line leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 4: BESTSELLERS ────────────────── */}
      <section className="bg-off-white py-8 sm:py-12 border-t border-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-green-brand mb-3">
              Our Best Sellers
            </h2>
            <p className="text-dark/60 text-sm sm:text-base">
              The flavours Kerala loves — now available worldwide.
            </p>
          </div>

          {bestsellers && bestsellers.length > 0 ? (
            <div className="relative group/carousel px-4 sm:px-8">
              {/* Left Arrow Button */}
              {bestsellers.length > 4 && (
                <button
                  onClick={() => scrollBestsellers('left')}
                  className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                  aria-label="Previous best sellers"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={bestsellersRef}
                className="flex overflow-x-auto gap-4 sm:gap-6 scrollbar-hide pb-6 px-1 snap-x snap-mandatory flex-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {bestsellers.map((product) => {
                  const card = <ProductCard key={product._id} product={product} />;
                  const cardWrapped = product.title === 'Banana Chips' ? (
                    <SteamEffect key={product._id} intensity="subtle">
                      {card}
                    </SteamEffect>
                  ) : card;

                  return (
                    <div
                      key={product._id}
                      className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-start"
                    >
                      {cardWrapped}
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              {bestsellers.length > 4 && (
                <button
                  onClick={() => scrollBestsellers('right')}
                  className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                  aria-label="Next best sellers"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          ) : (
            <p className="text-center text-dark/40 py-10 italic">No bestseller snacks found.</p>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 5: OUR PRODUCTS ────────────────── */}
      <section className="relative py-8 sm:py-12 overflow-hidden bg-off-white">
        {/* Curved light green background */}
        <div className="absolute inset-0 top-[20%] bottom-[20%] bg-green-brand/5" style={{ borderTopRightRadius: '100% 50%', borderBottomLeftRadius: '100% 50%' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
              <span className="text-sm font-semibold tracking-wide text-dark/70 block mb-1">Our</span>
              <h2 className="font-heading text-4xl sm:text-5xl font-black text-dark mb-4 tracking-tight">Products</h2>
              <p className="text-dark/70 text-sm sm:text-base leading-relaxed">
                Cochin Snacks offers a delightful range of Chips, Murukku, Pakkavada and Kerala Mixture. Each packed with authentic flavours of Kerala and delivers a perfect balance of sweet and spicy flavours.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <Link href="/products" className="inline-flex items-center justify-center px-6 py-2.5 bg-yellow hover:bg-yellow-dark text-white font-bold text-sm tracking-wide rounded-full transition-colors shadow-sm">
                View All
              </Link>
            </div>
          </div>

          {/* Carousel / Cards */}
          <div className="flex items-center gap-4 relative">
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-dark transition-colors z-20 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="flex overflow-x-auto gap-6 scrollbar-hide flex-1 pb-10 px-4 -mx-4 md:px-0 md:mx-0 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                { name: 'Potato Chips', img: '/placeholder-product.svg' },
                { name: 'Mixture', img: '/placeholder-product.svg' },
                { name: 'Banana', img: '/placeholder-product.svg' },
                { name: 'Tapioca', img: '/placeholder-product.svg' }
              ].map((prod, idx) => (
                <div key={idx} className="w-[200px] shrink-0 snap-center">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative mt-16 hover:-translate-y-2 transition-transform duration-300">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 drop-shadow-md">
                      <Image src={prod.img} alt={prod.name} fill className="object-cover object-top scale-110" />
                    </div>
                    <div className="pt-20 pb-2 text-center">
                      <h3 className="font-bold text-dark">{prod.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-dark transition-colors z-20 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-brand"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 6: COUNTRIES WE SERVE ────────────────── */}
      <CountriesWeServeSection countries={countries} />


      {/* ────────────────── SECTION 7: WHY CHOOSE COCHIN SNACKS ────────────────── */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-green-brand mb-3">
              Why Choose Cochin Snacks
            </h2>
            <p className="text-dark/60 text-sm sm:text-base">
              Every bag carries a promise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const isFreshness = feat.title === 'Freshness Guaranteed';
              const cardContent = (
                <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-green-brand/50 transition-all duration-300 group flex flex-col justify-between h-full`}>
                  <div>
                    <span className="w-10 h-10 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center font-mono font-bold text-sm mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-dark group-hover:text-green-brand transition-colors mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );

              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                  {isFreshness ? (
                    <SteamEffect intensity="subtle">
                      {cardContent}
                    </SteamEffect>
                  ) : (
                    cardContent
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 8: KERALA SPICE HERITAGE BAND ────────────────── */}
      <section className="bg-off-white text-dark py-8 sm:py-12 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-x-0 top-10 flex justify-center gap-20 pointer-events-none opacity-50">
          <FlameIcon size="lg" color="red" delay={0.2} />
          <FlameIcon size="lg" color="orange" delay={0.8} />
          <FlameIcon size="lg" color="yellow" delay={0.5} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-green-brand drop-shadow-sm">
              The Spice Capital of the World
            </h2>
            <p className="text-dark/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Kerala's legendary spice heritage lives in every Cochin Snacks bite.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <IngredientMorph />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full flex flex-col gap-4">
                <FlameIcon size="sm" color="orange" />
                <h3 className="font-heading text-lg font-bold text-dark">
                  Kerala's Agricultural Bounty
                </h3>
                <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                  Fertile lands nurtured for centuries. Bananas, tapioca, potato, rice, coconut — each ingredient carrying the soul of Kerala.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full flex flex-col gap-4">
                <FlameIcon size="sm" color="orange" />
                <h3 className="font-heading text-lg font-bold text-dark">
                  A Spice Haven
                </h3>
                <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                  Cardamom, pepper, clove, cinnamon, turmeric, ginger — the aromatic treasures of the world's original Spice Capital infuse every Cochin Snacks recipe.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={0.3}>
              <SteamEffect intensity="medium">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full flex flex-col gap-4">
                  <FlameIcon size="sm" color="orange" />
                  <h3 className="font-heading text-lg font-bold text-dark">
                    Tradition Meets Innovation
                  </h3>
                  <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                    Classic South Indian recipes. Modernised production. Zero oil reuse. State-of-the-art hygiene. The same unforgettable authentic taste.
                  </p>
                </div>
              </SteamEffect>
            </ScrollReveal>
          </div>
        </div>
      </section>





      {/* ────────────────── SECTION 9: NEWSLETTER ────────────────── */}
      <section className="bg-off-white text-dark py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FlameIcon size="sm" color="orange" />
            <Sparkles className="w-5 h-5 text-green-brand" />
            <FlameIcon size="sm" color="orange" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-black text-green-brand mb-3">
            Get Snacking Tips & New Flavour Alerts
          </h2>
          <p className="text-dark/80 text-sm sm:text-base mb-8">
            Join the Cochin Snacks community. No spam, just snacks.
          </p>

          <AnimatePresence mode="wait">
            {newsletterStatus === 'success' ? (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 bg-green-brand text-white rounded-full flex items-center justify-center shadow-md"
                >
                  <CheckCircle className="w-8 h-8 text-white fill-current stroke-green-brand" />
                </m.div>
                <p className="text-dark font-bold text-base sm:text-lg">
                  You're in! Welcome to the Cochin Snacks family.
                </p>
              </m.div>
            ) : (
              <m.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={newsletterStatus === 'loading'}
                    required
                    className="w-full bg-white border border-gray-200 rounded-full py-4 px-6 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/25 transition-all text-center sm:text-left shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-8 py-4 bg-yellow hover:bg-yellow-dark text-white font-black text-sm uppercase tracking-wider rounded-full transition-colors shrink-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-dark"
                >
                  {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </m.form>
            )}
          </AnimatePresence>

          {newsletterStatus === 'error' && (
            <p className="text-red-500 text-xs mt-3 font-semibold font-mono">
              {newsletterMsg}
            </p>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 10: CONTACT BAND ────────────────── */}
      <section className="bg-white text-dark py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-dark">
              We'd Love to Hear From You
            </h2>
            <p className="text-dark/60 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Get in touch for product enquiries, distributorship opportunities, export partnerships, and bulk orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-green-brand/30 transition-all">
              <MapPin className="w-6 h-6 text-green-brand shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-dark/50 uppercase tracking-widest mb-1.5 font-mono">Address</h4>
                <p className="text-dark/80 text-sm leading-relaxed">
                  Pavithram Snacks, Mullankunnu,<br />
                  Ponjassery P.O., Ernakulam,<br />
                  Kerala, India - 683547
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-green-brand/30 transition-all">
              <Phone className="w-6 h-6 text-green-brand shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-dark/50 uppercase tracking-widest mb-1.5 font-mono">Phone</h4>
                <a
                  href="tel:+919446006447"
                  className="text-dark/80 hover:text-green-brand text-sm font-semibold transition-colors block mt-1 font-mono"
                >
                  +91 94460 06447
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-start gap-4 hover:border-green-brand/30 transition-all">
              <Mail className="w-6 h-6 text-green-brand shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-dark/50 uppercase tracking-widest mb-1.5 font-mono">Email</h4>
                <a
                  href="mailto:export@cochinsnacks.com"
                  className="text-dark/80 hover:text-green-brand text-sm font-semibold transition-colors block mt-1 font-mono"
                >
                  export@cochinsnacks.com
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-8 py-4 bg-yellow text-white hover:bg-yellow-dark font-black text-sm uppercase tracking-wider rounded-xl shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
            >
              <span>Send Us a Message</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
