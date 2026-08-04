'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Leaf,
  Factory,
  Globe,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  MapPin,
} from 'lucide-react'
import FlameIcon from '@/components/ui/FlameIcon'
import SectionHeading from '@/components/ui/SectionHeading'
import ProductCard from '@/components/ui/ProductCard'
import homeStyles from '@/components/ui/HomeCard.module.css'

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
  img?: string
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

const FALLBACK_BESTSELLERS = [
  { name: 'Banana Chips', category: 'Chips', img: '/products/banana.png', description: 'Sweet, golden banana chips fried fresh in pure coconut oil.', hot: true },
  { name: 'Kerala Mixture', category: 'Mixture', img: '/products/mixture.png', description: 'A crunchy savoury blend of nuts, lentils and Kerala spices.', hot: true },
  { name: 'Murukku', category: 'Snacks', img: '/products/murukku.png', description: 'Traditional spiral snack with a light, crispy bite.', hot: false },
  { name: 'Pakkavada', category: 'Snacks', img: '/products/pakkavada.png', description: 'Ribbon-shaped fritters with a bold, spiced crunch.', hot: false },
]

export default function HomeClient({ bestsellers }: HomeClientProps) {
  const bestsellersRef = useRef<HTMLDivElement>(null)

  const carouselImages = useMemo(() => [
    { src: '/products/banana.png', alt: 'Kerala Banana Chips' },
    { src: '/products/tapioca.png', alt: 'Tapioca Chips' },
    { src: '/products/mixture.png', alt: 'Spicy Kerala Mixture' },
    { src: '/products/murukku.png', alt: 'Crunchy Murukku' },
    { src: '/products/potato-chips.png', alt: 'Spiced Potato Chips' },
  ], [])

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [carouselImages.length])

  const scrollBestsellers = (direction: 'left' | 'right') => {
    if (bestsellersRef.current) {
      const container = bestsellersRef.current
      const cardWidth = container.firstElementChild?.clientWidth || 280
      const gap = 20
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap)
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }



  const features = [
    {
      title: 'Authentic Kerala Recipes',
      desc: 'Traditional recipes handed down through generations, preserving the true taste of Kerala.',
      icon: <ChefHat className="w-5 h-5 text-white" />,
    },
    {
      title: 'Premium Ingredients',
      desc: 'Finest bananas, tapiocas, and spices sourced directly from local South Indian farmers.',
      icon: <Leaf className="w-5 h-5 text-white" />,
    },
    {
      title: 'Hygienic Manufacturing',
      desc: 'State-of-the-art production facility in Ernakulam with world-class hygiene standards.',
      icon: <Factory className="w-5 h-5 text-white" />,
    },
    {
      title: 'Freshness Guaranteed',
      desc: 'No oil reuse. Every batch is fried fresh, pure, and packed at peak quality.',
      icon: <Sparkles className="w-5 h-5 text-white" />,
    },
    {
      title: 'Global Distribution',
      desc: 'Available in 20+ countries — delivered directly to your door.',
      icon: <Globe className="w-5 h-5 text-white" />,
    },
    {
      title: 'Trusted Quality',
      desc: 'Part of Pavithram Group — 75 years of food excellence and consumer trust.',
      icon: <Award className="w-5 h-5 text-white" />,
    },
  ]

  return (
    <div className="overflow-hidden">

      {/* ────────────────── SECTION 2: WELCOME (ABOUT US) ────────────────── */}
      <section className="relative pt-16 lg:pt-20 pb-16 sm:pb-20 bg-white">
        
        {/* Full-width screen-edge Visual Hero Carousel */}
        <div className="relative w-full h-[360px] sm:h-[500px] lg:h-[620px] overflow-hidden group bg-[#F2F7F2] mb-12 sm:mb-16">
          <AnimatePresence mode="wait">
            <m.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={carouselImages[currentSlide].src}
                alt={carouselImages[currentSlide].alt}
                fill
                sizes="100vw"
                className="object-cover select-none"
                priority
              />
              {/* Subtle vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />
            </m.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-dark flex items-center justify-center shadow-md hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-dark flex items-center justify-center shadow-md hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-white shadow-sm' : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Narrative Content & Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Col: Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <SectionHeading
                align="left"
                title={<>Welcome to <span className="text-green-brand">Cochin Snacks</span></>}
                className="mb-5"
              />

              <div className="text-dark/70 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                A proud venture of Pavithram, Cochin Snacks celebrates Kerala's culinary legacy with premium snacks crafted from time-tested recipes and pure ingredients.
              </div>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md"
              >
                Discover Our Story <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Right Col: Stats Grid */}
            <div className="lg:col-span-5 w-full pt-2 lg:pt-6">
              <div className="grid grid-cols-3 gap-6 pb-6 border-b border-black/5 w-full">
                {[
                  { value: '75+', label: 'Years of Legacy' },
                  { value: '20+', label: 'Countries Served' },
                  { value: '10k+', label: 'Happy Customers' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center text-center">
                    <span className="font-heading text-3xl sm:text-4xl font-black text-green-brand leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark/50 mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Showcase Section: Center image surrounded by satellite KPI cards with custom patterns */}
          <div className="mt-16 lg:mt-24 flex flex-col items-center relative w-full py-8 lg:py-12 overflow-hidden">
            {/* Subtle background radial dot pattern layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-70" 
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(27, 133, 27, 0.08) 1.5px, transparent 0)',
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)'
              }}
            />

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center max-w-5xl mx-auto relative z-10">
              
              {/* Left Column Satellite Cards (Col span 4) */}
              <div className="lg:col-span-4 flex flex-col gap-6 w-full">
                {[
                  { title: 'Fresh & Hygienic', desc: 'Prepared under strict quality and sanitation guidelines.', icon: <Sparkles className="w-5 h-5" /> },
                  { title: 'Premium Quality', desc: 'Crafted using only A-grade ingredients and oil.', icon: <Award className="w-5 h-5" /> },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-row lg:flex-row-reverse items-start gap-4 p-5 bg-[#F3F7F3] border border-green-brand/[0.08] hover:bg-white rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(27,133,27,0.08)] hover:border-green-brand/20 transition-all duration-300 text-left lg:text-right"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-green-brand flex items-center justify-center shrink-0 border border-green-brand/15 group-hover:bg-green-brand/10 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-dark">{feature.title}</span>
                      <span className="text-xs text-dark/50 mt-1 leading-normal">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Column: Rotating Dummy Showcase Image (Col span 4) */}
              <div className="lg:col-span-4 flex justify-center py-4 w-full">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500 bg-[#F3F7F3] shadow-green-brand/5">
                  <Image
                    src="/products/hero-snacks.png"
                    alt="Authentic Cochin Snacks"
                    fill
                    sizes="(max-width: 1024px) 250px, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column Satellite Cards (Col span 4) */}
              <div className="lg:col-span-4 flex flex-col gap-6 w-full">
                {[
                  { title: '100% Natural', desc: 'No artificial preservatives, colors or chemical additives.', icon: <Leaf className="w-5 h-5" /> },
                  { title: 'Delicious Taste', desc: 'Uncompromised traditional Kerala flavour in every bite.', icon: <ChefHat className="w-5 h-5" /> },
                  { title: 'Authentic Recipes', desc: 'Handed down through families for decades.', icon: <MapPin className="w-5 h-5" /> }
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-row items-start gap-4 p-5 bg-[#F3F7F3] border border-green-brand/[0.08] hover:bg-white rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgba(27,133,27,0.08)] hover:border-green-brand/20 transition-all duration-300 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-green-brand flex items-center justify-center shrink-0 border border-green-brand/15 group-hover:bg-green-brand/10 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-dark">{feature.title}</span>
                      <span className="text-xs text-dark/50 mt-1 leading-normal">{feature.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 4: BESTSELLERS ────────────────── */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={<>Our <span className="text-green-brand">Best Sellers</span></>}
            subtitle="The flavours Kerala loves — now available worldwide."
          />

          {bestsellers && bestsellers.length > 0 ? (
            <div className="relative mt-2">
              {bestsellers.length > 4 && (
                <>
                  <button
                    onClick={() => scrollBestsellers('left')}
                    className="absolute -left-4 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20"
                    aria-label="Previous best sellers"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollBestsellers('right')}
                    className="absolute -right-4 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-dark shadow-md border border-gray-100 hover:bg-green-brand hover:text-white flex items-center justify-center transition-all z-20"
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

      {/* ────────────────── SECTION 5: EXPLORE CATEGORIES ────────────────── */}
      <section className="relative py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <SectionHeading
              align="left"
              title={<>Explore Our <span className="text-green-brand">Categories</span></>}
              subtitle="Browse through our authentic collection of chips, mixtures, and traditional snacks."
              className="mb-0 mx-auto md:mx-0 items-center md:items-start text-center md:text-left"
            />
            <div className="flex-shrink-0 text-center md:text-right">
              <Link href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Potato Chips', img: '/products/potato-chips.png', href: '/products?category=chips' },
              { name: 'Mixture', img: '/products/mixture.png', href: '/products?category=mixture' },
              { name: 'Banana Chips', img: '/products/banana.png', href: '/products?category=banana' },
              { name: 'Tapioca Chips', img: '/products/tapioca.png', href: '/products?category=tapioca' },
              { name: 'Murukku', img: '/products/murukku.png', href: '/products?category=murukku' },
              { name: 'Pakkavada', img: '/products/pakkavada.png', href: '/products?category=pakkavada' },
            ].map((prod) => (
              <Link
                key={prod.name}
                href={prod.href}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 flex items-center justify-between">
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base drop-shadow-sm leading-snug">
                    {prod.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION 7: WHY CHOOSE COCHIN SNACKS ────────────────── */}
      <section className="relative bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
              Why Choose <span className="text-green-brand">Cochin Snacks</span>
            </h2>
            <p className="text-dark/60 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Every bag carries a promise — authentic flavour, honest ingredients, and the warmth of Kerala in every crunch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-green-brand text-white flex items-center justify-center mb-4 shrink-0 shadow-sm">
                  {feat.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">
                  {feat.title}
                </h3>
                <p className="text-dark/60 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>



    </div>
  )
}
