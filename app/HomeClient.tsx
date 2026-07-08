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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Leaf,
  Factory,
  Globe,
  Award,
  Mail,
  Send,
} from 'lucide-react'
import FlameIcon from '@/components/ui/FlameIcon'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DotPattern from '@/components/ui/DotPattern'
import SectionHeading from '@/components/ui/SectionHeading'
import ProductCard from '@/components/ui/ProductCard'
import homeStyles from '@/components/ui/HomeCard.module.css'
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
    let width = (canvas.width = document.documentElement.clientWidth)
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
      width = canvas.width = document.documentElement.clientWidth
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
  description?: string
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

    const runAnimation = async () => {
      try {
        // 1. Fall animation with spring physics
        await controls.start({
          y: chip.settledY,
          rotate: chip.randomRotate,
          transition: {
            type: 'spring',
            stiffness: 60,
            damping: 12,
            delay: chip.delay,
          }
        })
        
        if (!active) return

        // Emit particles
        setShowParticles(true)
        onLand()

        // 2. Landing scale bounce
        await controls.start({
          scale: [1, 1.08, 1],
          transition: {
            duration: 0.2,
            ease: 'easeInOut',
          }
        })
        
        if (!active) return

        // 3. Ambient floating oscillation
        await controls.start({
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
      } catch (err) {
        // Silently ignore "controls.start() should only be called after a component has mounted"
        // This can happen in React StrictMode or during fast unmounts.
      }
    }

    // Small delay ensures Framer Motion has bound the element to the controls
    const timeoutId = setTimeout(() => {
      if (active) runAnimation()
    }, 50)

    return () => {
      active = false
      clearTimeout(timeoutId)
      controls.stop()
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

// Curated fallback bestsellers shown when the CMS has no data yet.
const FALLBACK_BESTSELLERS = [
  { name: 'Banana Chips', category: 'Chips', img: '/products/banana.png', description: 'Sweet, golden banana chips fried fresh in pure coconut oil.', hot: true },
  { name: 'Kerala Mixture', category: 'Mixture', img: '/products/mixture.png', description: 'A crunchy savoury blend of nuts, lentils and Kerala spices.', hot: true },
  { name: 'Murukku', category: 'Snacks', img: '/products/murukku.png', description: 'Traditional spiral snack with a light, crispy bite.', hot: false },
  { name: 'Pakkavada', category: 'Snacks', img: '/products/pakkavada.png', description: 'Ribbon-shaped fritters with a bold, spiced crunch.', hot: false },
]

export default function HomeClient({ bestsellers, categories, testimonials }: HomeClientProps) {
  const bestsellersRef = useRef<HTMLDivElement>(null)

  const scrollBestsellers = (direction: 'left' | 'right') => {
    if (bestsellersRef.current) {
      const container = bestsellersRef.current
      const cardWidth = container.firstElementChild?.clientWidth || 280
      const gap = 20 // gap-5
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
      icon: <ChefHat className="w-6 h-6" />,
    },
    {
      title: 'Premium Ingredients',
      desc: 'Finest bananas, tapiocas, spices — sourced directly from South Indian farmers.',
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      title: 'Hygienic Manufacturing',
      desc: 'State-of-the-art production facility in Ernakulam with world-class hygiene standards.',
      icon: <Factory className="w-6 h-6" />,
    },
    {
      title: 'Freshness Guaranteed',
      desc: 'No oil reuse. Every batch is fresh, pure and packed at peak quality.',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: 'Global Distribution',
      desc: 'Available in 20+ countries — delivered to your door wherever you are.',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: 'Trusted Quality',
      desc: 'Part of Pavithram Group — 75 years of food excellence and consumer trust.',
      icon: <Award className="w-6 h-6" />,
    },
  ]

  return (
    <div className="overflow-hidden">

      {/* ────────────────── SECTION 1: HERO (Modern Light Theme) ────────────────── */}
      <section className="relative min-h-[85vh] flex items-center bg-cream overflow-hidden pt-20 sm:pt-24 lg:pt-26 pb-8 lg:pb-12">

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
          <DotPattern className="top-0 left-0 h-full w-1/4" color="#1E6B2E" opacity={0.06} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/4" color="#1E6B2E" opacity={0.06} fade="right" />
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
                {[
                  '/products/banana.png',
                  '/products/murukku.png',
                  '/products/mixture.png',
                  '/products/pakkavada.png',
                ].map((src) => (
                  <div key={src} className="w-10 h-10 rounded-full border-2 border-white bg-cream overflow-hidden flex items-center justify-center shadow-sm">
                    <Image src={src} alt="Cochin Snacks product" width={40} height={40} className="object-cover w-full h-full" />
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
              className="absolute z-10 pointer-events-none flex items-center justify-center w-[320px] sm:w-[500px] lg:w-[600px] aspect-square"
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
                src="/products/hero-snacks.png"
                alt="A bowl of assorted authentic Kerala snacks — banana chips, murukku, mixture and pakkavada"
                width={600}
                height={600}
                priority
                className="w-full h-auto object-cover rounded-[2rem] hover:scale-105 transition-transform duration-700 ease-out shadow-2xl ring-4 ring-white"
              />

              {/* Floating Element 1 */}
              <div className="absolute top-[20%] -right-2 sm:-right-8 lg:-right-12 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-dark/5 z-30 animate-float" style={{ animationDuration: '4s' }}>
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
              <div className="absolute bottom-[20%] -left-2 sm:-left-8 lg:-left-12 bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-dark/5 z-30 animate-float" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
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
              className="absolute z-30 pointer-events-none flex items-center justify-center w-[320px] sm:w-[500px] lg:w-[600px] aspect-square"
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
      <section ref={aboutSectionRef} className="relative py-16 sm:py-20 bg-white overflow-hidden">

        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-green-brand/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Col: Narrative Content */}
            <div className="order-2 lg:order-1 flex flex-col items-start">
              <ScrollReveal direction="right">

                <SectionHeading
                  align="left"
                  eyebrow="Our Heritage"
                  title={<>Welcome to <span className="text-green-brand">Cochin Snacks</span></>}
                  className="mb-6"
                />

                {/* Body Text */}
                <div className="text-dark/70 text-base lg:text-lg leading-relaxed flex flex-col gap-5 font-body mb-8">
                  <p className="font-medium text-dark bg-cream border-l-4 border-green-brand rounded-r-2xl pl-5 pr-6 py-4">
                    At Cochin Snacks, a proud venture of Pavithram, we celebrate Kerala's rich culinary heritage through a delightful range of authentic snacks.
                  </p>
                  <p>
                    From the timeless crunch of banana chips to the sweetness of achappam, our offerings are crafted with love, tradition, and uncompromising quality. Our snacks bring together the flavours of nostalgia and modern excellence, perfect for every occasion.
                  </p>
                  <p>
                    Experience the authentic taste of Kerala with every bite, as we continue to uphold our legacy of purity and deliciousness.
                  </p>
                </div>

                {/* Mini stats strip */}
                <div className="flex flex-wrap gap-x-10 gap-y-4 mb-8 pb-8 border-b border-black/5 w-full">
                  {[
                    { value: '75+', label: 'Years of Legacy' },
                    { value: '20+', label: 'Countries Served' },
                    { value: '10k+', label: 'Happy Customers' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="font-heading text-3xl sm:text-4xl font-black text-green-brand leading-none">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-dark/50 mt-1.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5"
                >
                  Discover Our Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </ScrollReveal>
            </div>

            {/* Right Col: Modern Image Collage */}
            <div className="flex order-1 lg:order-2 relative w-full h-[340px] sm:h-[440px] lg:h-[560px] items-center justify-center lg:justify-end">
              <ScrollReveal direction="left" className="w-full h-full relative">

                {/* Main Large Image */}
                <div className="absolute top-0 right-0 w-[82%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-white bg-white">
                  <Image
                    src="/products/banana.png"
                    alt="Kerala banana chips"
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Overlapping Small Image */}
                <div className="absolute bottom-[4%] left-0 w-[48%] h-[44%] rounded-3xl overflow-hidden shadow-2xl z-20 border-[6px] border-white bg-white">
                  <Image
                    src="/products/murukku.png"
                    alt="Traditional murukku"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute top-[16%] -left-1 sm:left-2 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-xl border border-black/5 z-30 flex items-center gap-3 animate-float" style={{ animationDuration: '4s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-brand/10 flex items-center justify-center text-green-brand">
                    <span className="font-black text-base sm:text-lg">20+</span>
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
          <div className="mt-12 sm:mt-16 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                { title: 'Fresh & Hygienic', icon: <Sparkles className="w-5 h-5 text-green-brand" /> },
                { title: 'Premium Quality', icon: <Star className="w-5 h-5 text-green-brand" /> },
                { title: '100% Natural', icon: <CheckCircle className="w-5 h-5 text-green-brand" /> },
                { title: 'Delicious & Nutritious', icon: <FlameIcon size="sm" color="orange" delay={0} /> },
                { title: 'Authentic Taste', icon: <MapPin className="w-5 h-5 text-green-brand" /> }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-cream rounded-2xl px-4 py-4 border border-black/[0.06] shadow-sm hover:shadow-md hover:border-green-brand/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-dark leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 4: BESTSELLERS ────────────────── */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Customer Favourites"
            title={<>Our <span className="text-green-brand">Best Sellers</span></>}
            subtitle="The flavours Kerala loves — now available worldwide."
          />

          {bestsellers && bestsellers.length > 0 ? (
            <div className="relative mt-2">
              {bestsellers.length > 4 && (
                <>
                  <button
                    onClick={() => scrollBestsellers('left')}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20"
                    aria-label="Previous best sellers"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollBestsellers('right')}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20"
                    aria-label="Next best sellers"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div
                ref={bestsellersRef}
                className="flex overflow-x-auto gap-4 sm:gap-5 scrollbar-hide pt-2 pb-4 snap-x snap-mandatory flex-nowrap -mx-1 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {bestsellers.map((product, idx) => (
                  <div key={product._id} className={`${homeStyles.carouselItem} snap-start`}>
                    <ProductCard product={product} variant="home" priority={idx < 4} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="flex overflow-x-auto gap-4 sm:gap-5 scrollbar-hide pt-2 pb-4 snap-x snap-mandatory flex-nowrap -mx-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {FALLBACK_BESTSELLERS.map((p, idx) => (
                <div key={p.name} className={`${homeStyles.carouselItem} snap-start`}>
                  <ProductCard
                    variant="home"
                    priority={idx < 4}
                    product={{
                      _id: `fallback-${idx}`,
                      title: p.name,
                      slug: 'products',
                      description: p.description,
                      category: { title: p.category, slug: 'snacks' },
                      isHot: p.hot,
                      isBestseller: true,
                      img: p.img,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 5: OUR PRODUCTS ────────────────── */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-white">
        {/* Soft ambient background accents */}
        <div className="absolute -bottom-40 -left-32 w-[36rem] h-[36rem] bg-green-brand/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeading
              align="left"
              eyebrow="Our Range"
              title={<>Explore Our <span className="text-green-brand">Products</span></>}
              subtitle="A delightful range of Chips, Murukku, Pakkavada and Kerala Mixture — each packed with authentic flavours and a perfect balance of sweet and spicy."
              className="mb-0 mx-auto md:mx-0 items-center md:items-start text-center md:text-left"
            />
            <div className="flex-shrink-0 text-center md:text-right">
              <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* One-row modern listing with patterned green cards */}
          <div
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { name: 'Potato Chips', img: '/products/potato-chips.png', href: '/products?category=chips' },
              { name: 'Mixture', img: '/products/mixture.png', href: '/products?category=mixture' },
              { name: 'Banana', img: '/products/banana.png', href: '/products?category=banana' },
              { name: 'Tapioca', img: '/products/tapioca.png', href: '/products?category=tapioca' },
              { name: 'Murukku', img: '/products/murukku.png', href: '/products?category=murukku' },
              { name: 'Pakkavada', img: '/products/pakkavada.png', href: '/products?category=pakkavada' },
            ].map((prod) => (
              <Link
                key={prod.name}
                href={prod.href}
                aria-label={`Explore ${prod.name}`}
                className="group relative snap-start shrink-0 w-[176px] sm:w-[200px] aspect-[3/4] rounded-[1.35rem] overflow-hidden bg-gradient-to-br from-green-brand via-green-brand to-green-dark shadow-[0_14px_34px_-16px_rgba(30,107,46,0.6)] hover:shadow-[0_22px_44px_-16px_rgba(30,107,46,0.75)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.14] pointer-events-none z-[1]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, #fff 1.1px, transparent 1.1px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.1] pointer-events-none z-[1]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(135deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)',
                  }}
                />
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full border border-white/15 pointer-events-none z-[1]" />
                <div className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full border border-white/10 pointer-events-none z-[1]" />

                <Image
                  src={prod.img}
                  alt={prod.name}
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-dark/75 via-green-dark/15 to-transparent z-[1]" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 flex items-end justify-between gap-2">
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug drop-shadow-sm line-clamp-2 pr-1">
                    {prod.name}
                  </h3>
                  <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-green-brand shadow-lg group-hover:bg-yellow group-hover:text-green-dark group-hover:scale-105 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 7: WHY CHOOSE COCHIN SNACKS ────────────────── */}
      <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
        {/* Ambient brand glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-brand/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 bg-yellow/[0.07] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left · sticky heading + trust strip */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-4">
                  <span className="w-8 h-px bg-green-brand/50" /> Why Us
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1]">
                  Why Choose <span className="text-green-brand">Cochin Snacks</span>
                </h2>
                <p className="text-dark/60 text-base sm:text-lg mt-5 leading-relaxed">
                  Every bag carries a promise — authentic flavour, honest ingredients, and the warmth of Kerala in every crunch.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cream border border-black/[0.06] px-4 py-2 text-sm font-semibold text-dark/75">
                    <CheckCircle className="w-4 h-4 text-green-brand" /> 75 years of trust
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-cream border border-black/[0.06] px-4 py-2 text-sm font-semibold text-dark/75">
                    <Globe className="w-4 h-4 text-green-brand" /> 20+ countries
                  </span>
                </div>
              </m.div>
            </div>

            {/* Right · feature cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 sm:gap-5">
              {features.map((feat, idx) => {
                const isFreshness = feat.title === 'Freshness Guaranteed';
                const cardContent = (
                  <div className="group relative h-full bg-white rounded-2xl border border-black/[0.06] p-6 overflow-hidden hover:border-green-brand/40 hover:shadow-[0_16px_40px_-16px_rgba(45,184,45,0.3)] hover:-translate-y-1 transition-all duration-300">
                    {/* watermark index */}
                    <span className="absolute -top-2 right-4 font-mono text-5xl font-black text-black/[0.035] group-hover:text-green-brand/10 transition-colors duration-300 select-none pointer-events-none">
                      0{idx + 1}
                    </span>
                    {/* icon tile */}
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white flex items-center justify-center shadow-lg shadow-green-brand/25 mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {feat.icon}
                    </div>
                    <h3 className="relative font-heading text-lg font-bold text-dark group-hover:text-green-brand transition-colors mb-2">
                      {feat.title}
                    </h3>
                    <p className="relative text-dark/60 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                    {/* bottom accent bar */}
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-brand to-yellow group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                );

                return (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.06}>
                    {isFreshness ? (
                      <SteamEffect intensity="subtle">{cardContent}</SteamEffect>
                    ) : (
                      cardContent
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* ────────────────── SECTION 9: NEWSLETTER ────────────────── */}
      <section className="relative bg-cream py-16 sm:py-24 overflow-hidden">
        {/* Subtle background patterns */}
        <DotPattern className="top-0 left-0 h-full w-1/4" color="#1E6B2E" opacity={0.07} fade="left" />
        <DotPattern className="top-0 right-0 h-full w-1/4" color="#1E6B2E" opacity={0.07} fade="right" />
        <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-yellow/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-28 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* LEFT: copy */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 mb-6">
                  <Mail className="w-7 h-7" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-green-brand font-mono mb-3">
                  Stay in the Loop
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1]">
                  Get Snacking Tips &amp; <span className="text-green-brand">New Flavour Alerts</span>
                </h2>
                <p className="text-dark/60 text-base sm:text-lg mt-4 max-w-md leading-relaxed">
                  Join the Cochin Snacks community for early access to new flavours, exclusive offers, and snacking inspiration. No spam, just snacks.
                </p>
              </div>

              {/* RIGHT: form */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {newsletterStatus === 'success' ? (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 text-center bg-white border border-black/[0.06] rounded-3xl p-8 sm:p-10 shadow-sm"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-green-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-green-brand/30"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </m.div>
                      <p className="text-dark font-bold text-lg">
                        You're in! Welcome to the Cochin Snacks family.
                      </p>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleNewsletterSubmit}
                      className="bg-white border border-black/[0.06] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-4"
                    >
                      <label htmlFor="newsletter-email" className="text-sm font-bold text-dark/80">
                        Enter your email to get started
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-dark/30 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="newsletter-email"
                          type="email"
                          placeholder="you@example.com"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          disabled={newsletterStatus === 'loading'}
                          required
                          className="w-full bg-cream rounded-2xl py-3.5 pl-12 pr-4 text-sm text-dark placeholder:text-dark/40 focus:outline-none border border-black/[0.08] focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-brand hover:bg-green-dark text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-brand focus:ring-offset-2 disabled:opacity-70 disabled:translate-y-0"
                      >
                        {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                        <Send className="w-4 h-4" />
                      </button>

                      {newsletterStatus === 'error' ? (
                        <p className="text-flame-red text-xs font-semibold font-mono text-center">
                          {newsletterMsg}
                        </p>
                      ) : (
                        <p className="flex items-center justify-center gap-1.5 text-dark/50 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-green-brand" />
                          We respect your privacy. Unsubscribe anytime.
                        </p>
                      )}
                    </m.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
