'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react'
import FlameIcon from '@/components/ui/FlameIcon'
import SpiceMeter from '@/components/ui/SpiceMeter'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionDivider from '@/components/ui/SectionDivider'
import ProductCard from '@/components/ui/ProductCard'

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

interface HomeClientProps {
  bestsellers: Product[]
  categories: Category[]
  testimonials: Testimonial[]
}

export default function HomeClient({ bestsellers, categories, testimonials }: HomeClientProps) {
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

  // Hero Section Header Text Anim Config
  const heroWords = 'Authentic Kerala Snacks, Crafted for Every Occasion'.split(' ')
  
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

  // Countries List for Section 8
  const exportCountries = [
    'USA', 'UK', 'Germany', 'Netherlands', 'Norway', 'Sweden', 'Canada', 'Ireland',
    'Australia', 'UAE', 'Oman', 'Qatar', 'Kuwait', 'Bahrain', 'Saudi Arabia',
    'France', 'South Africa', 'Malta'
  ]

  return (
    <div className="overflow-hidden">
      
      {/* ────────────────── SECTION 1: HERO ────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-[#0F0F0F] text-white px-4 text-center select-none overflow-hidden pt-16">
        {/* Particle Canvas */}
        <ParticleField />
        
        {/* Glow styling layer */}
        <div className="absolute top-[20%] w-[30vw] h-[30vw] bg-yellow/5 rounded-full blur-3xl pointer-events-none" />

        {/* 3 FlameIcon (lg) above headline */}
        <div className="relative z-10 flex gap-4 mb-6">
          <FlameIcon size="lg" color="red" delay={0} />
          <FlameIcon size="lg" color="orange" delay={0.3} />
          <FlameIcon size="lg" color="yellow" delay={0.6} />
        </div>

        {/* Staggered Headline */}
        <h1 className="relative z-10 font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none max-w-5xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 select-text">
          {heroWords.map((word, idx) => {
            const isYellow = idx >= 3 // "Crafted for Every Occasion" onwards
            return (
              <m.span
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: idx * 0.08,
                }}
                className={
                  isYellow
                    ? 'text-[#FFD600] drop-shadow-[0_2px_12px_rgba(255,214,0,0.35)]'
                    : 'text-white'
                }
              >
                {word}
              </m.span>
            )
          })}
        </h1>

        {/* Subtitle (fades in 0.8s after) */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative z-10 text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mt-8 leading-relaxed font-body select-text"
        >
          Cochin Snacks brings the rich taste and tradition of Kerala's favourite snacks to customers across India and around the world.
        </m.p>

        {/* Buttons (slide up 1.0s after) */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 justify-center w-full max-w-md"
        >
          <m.div whileHover={{ scale: 1.06 }} className="w-full sm:w-auto">
            <Link
              href="/products"
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-[#FFD600] text-[#0F0F0F] font-black text-sm uppercase tracking-wider rounded-full shadow-lg shadow-yellow/20 hover:bg-[#FFE94D] transition-colors animate-pulse-glow"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </m.div>

          <m.div
            whileHover={{ scale: 1.04, backgroundColor: '#FFD600', color: '#0F0F0F' }}
            className="w-full sm:w-auto rounded-full border-2 border-[#FFD600] text-[#FFD600] overflow-hidden"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center w-full px-8 py-4 font-bold text-sm uppercase tracking-wider h-full transition-colors"
            >
              Explore Products
            </Link>
          </m.div>
        </m.div>

        {/* Bouncing Chevron Down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#FFD600]" />
        </div>
      </section>

      {/* ────────────────── SECTION 2: STATS BAND ────────────────── */}
      <section className="bg-gradient-to-r from-[#1E6B2E] to-[#2D9142] py-12 border-y-2 border-[#FFD600]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
            <div className="flex flex-col items-center">
              <AnimatedCounter end={75} suffix="+ Years" label="Pavithram Group Legacy" />
            </div>
            <div className="flex flex-col items-center pl-2">
              <AnimatedCounter end={20} suffix="+ Countries" label="Export Markets" />
            </div>
            <div className="flex flex-col items-center pl-2">
              <AnimatedCounter end={40} suffix="+ Products" label="Authentic SKUs" />
            </div>
            <div className="flex flex-col items-center pl-2">
              <AnimatedCounter end={5} suffix=" Categories" label="Snack Families" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 3: ABOUT COCHIN SNACKS ────────────────── */}
      <section ref={aboutSectionRef} className="bg-[#FAFAF0] py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Col: Parallax Image */}
            <div className="lg:col-span-6 flex justify-center">
              <m.div
                style={{ y: yParallax }}
                className="relative aspect-[6/5] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-off-white"
              >
                <FallbackImage
                  src="/product-family.png"
                  alt="Cochin Snacks Product Family"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </m.div>
            </div>

            {/* Right Col: narrative content */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#1E6B2E] block mb-2 font-mono">
                  OUR STORY
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#0F0F0F] mb-6 leading-tight">
                  Born from the trusted legacy of Pavithram Foods
                </h2>
                <div className="text-dark/80 text-sm sm:text-base leading-relaxed flex flex-col gap-4 font-body">
                  <p>
                    Born from the trusted legacy of Pavithram Foods, Cochin Snacks was created to bring the authentic taste of Kerala to snack lovers across India and around the world.
                  </p>
                  <p>
                    Combining traditional recipes with modern manufacturing practices, we craft a wide range of Kerala's favourite snacks using quality ingredients, hygienic processes, and a commitment to excellence. From crispy banana chips and tapioca chips to classic mixtures and savouries, every product reflects the rich culinary heritage of Kerala and the flavours cherished for generations.
                  </p>
                  <p>
                    Today, Cochin Snacks continues to grow as a trusted brand, delivering fresh, delicious, and authentic Kerala snacks while staying true to the values of quality, authenticity, and customer satisfaction.
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 px-6 py-3 border-2 border-[#1E6B2E] text-[#1E6B2E] font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#1E6B2E] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6B2E]"
                  >
                    <span>Read Our Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 4: BESTSELLERS ────────────────── */}
      <section className="bg-[#FAFAF0] py-16 sm:py-24 border-t border-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#1E6B2E] mb-3">
              Our Best Sellers
            </h2>
            <p className="text-dark/60 text-sm sm:text-base">
              The flavours Kerala loves — now available worldwide.
            </p>
          </div>

          {bestsellers && bestsellers.length > 0 ? (
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {bestsellers.slice(0, 6).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </m.div>
          ) : (
            <p className="text-center text-dark/40 py-10 italic">No bestseller snacks found.</p>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 5: CATEGORY STRIP ────────────────── */}
      <section className="bg-gradient-to-b from-[#0F0F0F] to-[#1E6B2E] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white">
              Five Families. <span className="text-[#FFD600]">Forty-Plus Flavours.</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base italic mt-2">
              Every snack a piece of Kerala.
            </p>
          </div>

          {/* Cards container */}
          <div className="flex gap-6 overflow-x-auto pb-8 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.slug} direction="up" delay={idx * 0.1}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group block w-[260px] md:w-full bg-[#1A1A1A] border border-[#2D9142] hover:border-[#FFD600] rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl shrink-0"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/25">
                    <FallbackImage
                      src={cat.imageUrl}
                      alt={cat.title}
                      width={280}
                      height={220}
                      className="object-cover w-full h-full transition-transform duration-400 group-hover:scale-108"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between items-start gap-3">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#FFD600] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <span className="text-xs text-[#FFD600] font-semibold font-mono tracking-wider">
                        {cat.count} {cat.count === 1 ? 'variety' : 'varieties'}
                      </span>
                    </div>
                    <span className="px-3.5 py-1.5 bg-[#1E6B2E] text-white font-bold text-[10px] uppercase tracking-widest rounded-lg transition-colors group-hover:bg-[#FFD600] group-hover:text-[#0F0F0F] flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 6: WHY CHOOSE COCHIN SNACKS ────────────────── */}
      <section className="bg-[#FAFAF0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#1E6B2E] mb-3">
              Why Choose Cochin Snacks
            </h2>
            <p className="text-dark/60 text-sm sm:text-base">
              Every bag carries a promise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                <div className="bg-white rounded-2xl shadow-sm border border-dark/5 p-6 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full border-l-4 border-l-transparent hover:border-l-[#3CC120]">
                  <div>
                    <span className="w-10 h-10 rounded-full bg-green-brand/10 text-green-dark flex items-center justify-center font-mono font-bold text-sm mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-dark group-hover:text-[#1E6B2E] transition-colors mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 7: KERALA SPICE HERITAGE BAND ────────────────── */}
      <section className="bg-gradient-to-b from-[#0F0F0F] to-[#1E6B2E] text-white py-20 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-x-0 top-10 flex justify-center gap-20 pointer-events-none">
          <FlameIcon size="lg" color="red" delay={0.2} />
          <FlameIcon size="lg" color="orange" delay={0.8} />
          <FlameIcon size="lg" color="yellow" delay={0.5} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#FFD600] drop-shadow-[0_2px_10px_rgba(255,214,0,0.3)]">
              The Spice Capital of the World
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Kerala's legendary spice heritage lives in every Cochin Snacks bite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-[#1A1A1A]/80 border border-[#FFD600]/30 rounded-2xl p-6 shadow-xl h-full flex flex-col gap-4">
                <FlameIcon size="sm" color="orange" />
                <h3 className="font-heading text-lg font-bold text-[#FFD600]">
                  Kerala's Agricultural Bounty
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Fertile lands nurtured for centuries. Bananas, tapioca, potato, rice, coconut — each ingredient carrying the soul of Kerala.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#1A1A1A]/80 border border-[#FFD600]/30 rounded-2xl p-6 shadow-xl h-full flex flex-col gap-4">
                <FlameIcon size="sm" color="orange" />
                <h3 className="font-heading text-lg font-bold text-[#FFD600]">
                  A Spice Haven
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Cardamom, pepper, clove, cinnamon, turmeric, ginger — the aromatic treasures of the world's original Spice Capital infuse every Cochin Snacks recipe.
                </p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="bg-[#1A1A1A]/80 border border-[#FFD600]/30 rounded-2xl p-6 shadow-xl h-full flex flex-col gap-4">
                <FlameIcon size="sm" color="orange" />
                <h3 className="font-heading text-lg font-bold text-[#FFD600]">
                  Tradition Meets Innovation
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Classic South Indian recipes. Modernised production. Zero oil reuse. State-of-the-art hygiene. The same unforgettable authentic taste.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 8: DISTRIBUTION & EXPORT ────────────────── */}
      <section className="bg-[#1E6B2E] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-white">
              Grow With Cochin Snacks Worldwide
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-3xl mx-auto leading-relaxed">
              Whether you're a distributor, retailer, importer, wholesaler, supermarket, or food service business, Cochin Snacks offers the opportunity to partner with a trusted Kerala snack brand loved by customers across India and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: why partner list */}
            <div className="lg:col-span-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold mb-6 text-[#FFD600]">
                Why Partner With Us?
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-white/90">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Authentic Kerala snacks and traditional recipes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Consistent product quality and hygiene standards</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Attractive and export-ready packaging</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Reliable supply and distribution support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Growing brand recognition</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FFD600] shrink-0" />
                  <span>Flexible business partnership opportunities</span>
                </li>
              </ul>
            </div>

            {/* Right Col: countries list */}
            <div className="lg:col-span-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold mb-6 text-[#FFD600]">
                Global Export Footprint
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {exportCountries.map((country) => (
                  <span
                    key={country}
                    className="px-4.5 py-1.5 bg-[#FFD600] text-[#0F0F0F] font-bold text-xs uppercase tracking-wider rounded-full shadow-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact?tab=partner"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFD600] text-[#0F0F0F] font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#FFE94D] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
            >
              Submit a Partnership Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 9: TESTIMONIALS ────────────────── */}
      <section className="bg-[#FAFAF0] py-16 sm:py-24 border-b border-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#1E6B2E]">
              What Our Customers Say
            </h2>
            <p className="text-dark/60 text-sm sm:text-base">
              From Kerala to the world — the taste that feels like home.
            </p>
          </div>

          {testimonials && testimonials.length > 0 ? (
            <div
              className="relative w-full overflow-hidden py-4"
              onMouseEnter={() => setIsTestimonialsHovered(true)}
              onMouseLeave={() => setIsTestimonialsHovered(false)}
            >
              {/* Infinite carousel wrapper */}
              <m.div
                className="flex gap-8 w-max"
                animate={{ x: isTestimonialsHovered ? undefined : [0, -1200] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 35,
                    ease: 'linear',
                  },
                }}
              >
                {/* Triple list length to guarantee seamless looping wrap width */}
                {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                  <div
                    key={idx}
                    className="w-[320px] bg-white rounded-2xl shadow-md border border-dark/5 p-6 flex flex-col justify-between shrink-0"
                  >
                    <div>
                      {/* Rating */}
                      <div className="flex gap-1 mb-4 text-[#FFD600]">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FFD600]" />
                        ))}
                      </div>
                      <p className="text-dark/80 text-sm italic leading-relaxed mb-6">
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="border-t border-off-white/80 pt-4 flex flex-col mt-auto">
                      <strong className="text-sm text-green-dark font-black">{t.name}</strong>
                      {t.location && (
                        <span className="text-[9px] text-dark/40 uppercase tracking-widest font-semibold font-mono mt-0.5">
                          {t.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </m.div>
            </div>
          ) : (
            <p className="text-center text-dark/40 py-8 italic">Check back later for reviews!</p>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 10: INSTAGRAM FEED ────────────────── */}
      <section className="bg-[#0F0F0F] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-black text-[#FFD600]">
              Follow the Crunch
            </h2>
            <p className="text-white/50 text-sm font-semibold tracking-wider font-mono mt-1">
              @cochinsnacks
            </p>
          </div>

          {/* Elfsight placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="min-h-64 flex items-center justify-center border border-dashed border-[#FFD600]/40 rounded-2xl text-[#FFD600] text-sm p-8 bg-white/5 font-mono text-center">
              Instagram Feed — Add Elfsight widget ID here
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 11: NEWSLETTER ────────────────── */}
      <section className="bg-[#1E6B2E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FlameIcon size="sm" color="yellow" />
            <Sparkles className="w-5 h-5 text-[#FFD600]" />
            <FlameIcon size="sm" color="yellow" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#FFD600] mb-3">
            Get Snacking Tips & New Flavour Alerts
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-8">
            Join the Cochin Snacks community. No spam, just snacks.
          </p>

          <AnimatePresence mode="wait">
            {newsletterStatus === 'success' ? (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-3xl border border-white/20"
              >
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 bg-white text-green-dark rounded-full flex items-center justify-center shadow-lg"
                >
                  <CheckCircle className="w-8 h-8 text-[#1E6B2E] fill-current stroke-white" />
                </m.div>
                <p className="text-white font-bold text-base sm:text-lg">
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
                    className="w-full bg-black/20 border border-white/20 rounded-full py-4 px-6 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/25 transition-all text-center sm:text-left"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-8 py-4 bg-[#FFD600] hover:bg-[#FFE94D] text-[#0F0F0F] font-black text-sm uppercase tracking-wider rounded-full transition-colors shrink-0 shadow-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {newsletterStatus === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </m.form>
            )}
          </AnimatePresence>
          
          {newsletterStatus === 'error' && (
            <p className="text-red-300 text-xs mt-3 font-semibold font-mono">
              {newsletterMsg}
            </p>
          )}
        </div>
      </section>

      {/* ────────────────── SECTION 12: CONTACT BAND ────────────────── */}
      <section className="bg-[#0F0F0F] text-white py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
              We'd Love to Hear From You
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Get in touch for product enquiries, distributorship opportunities, export partnerships, and bulk orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-all">
              <MapPin className="w-6 h-6 text-[#FFD600] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-white/50 uppercase tracking-widest mb-1.5 font-mono">Address</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Pavithram Snacks, Mullankunnu,<br />
                  Ponjassery P.O., Ernakulam,<br />
                  Kerala, India - 683547
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-all">
              <Phone className="w-6 h-6 text-[#FFD600] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-white/50 uppercase tracking-widest mb-1.5 font-mono">Phone</h4>
                <a
                  href="tel:+919446006447"
                  className="text-white/80 hover:text-[#FFD600] text-sm font-semibold transition-colors block mt-1 font-mono"
                >
                  +91 94460 06447
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-all">
              <Mail className="w-6 h-6 text-[#FFD600] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-white/50 uppercase tracking-widest mb-1.5 font-mono">Email</h4>
                <a
                  href="mailto:export@cochinsnacks.com"
                  className="text-white/80 hover:text-[#FFD600] text-sm font-semibold transition-colors block mt-1 font-mono"
                >
                  export@cochinsnacks.com
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-8 py-4 bg-[#FFD600] text-[#0F0F0F] font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#FFE94D] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
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
