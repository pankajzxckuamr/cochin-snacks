'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Col: Narrative Content */}
            <div className="flex flex-col items-start">
              <SectionHeading
                align="left"
                title={<>Welcome to <span className="text-green-brand">Cochin Snacks</span></>}
                className="mb-6"
              />

              <div className="text-dark/70 text-base leading-relaxed flex flex-col gap-4 font-body mb-8">
                <p className="font-medium text-dark bg-cream border-l-4 border-green-brand rounded-r-xl pl-4 pr-4 py-3">
                  At Cochin Snacks, a proud venture of Pavithram, we celebrate Kerala's culinary legacy through a premium range of authentic snacks.
                </p>
                <p>
                  From the timeless crunch of banana chips to traditional mixture and murukku, our snacks are made using authentic recipes and high-quality ingredients. We strive to deliver the authentic taste of South India to your home, preserving purity and flavor in every batch.
                </p>
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-8 mb-6 pb-6 border-b border-black/5 w-full">
                {[
                  { value: '75+', label: 'Years of Legacy' },
                  { value: '20+', label: 'Countries Served' },
                  { value: '10k+', label: 'Happy Customers' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-heading text-2xl sm:text-3xl font-black text-green-brand leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark/50 mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-brand hover:bg-green-dark text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md"
              >
                Discover Our Story <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Right Col: Simple clean image */}
            <div className="relative w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src="/products/banana.png"
                alt="Kerala banana chips"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

          </div>

          {/* Features Row */}
          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: 'Fresh & Hygienic', icon: <Sparkles className="w-4 h-4 text-green-brand" /> },
                { title: 'Premium Quality', icon: <Star className="w-4 h-4 text-green-brand" /> },
                { title: '100% Natural', icon: <CheckCircle className="w-4 h-4 text-green-brand" /> },
                { title: 'Delicious Taste', icon: <FlameIcon size="sm" color="orange" delay={0} /> },
                { title: 'Authentic Recipes', icon: <MapPin className="w-4 h-4 text-green-brand" /> }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-cream rounded-xl px-4 py-3 border border-black/[0.06] shadow-sm"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-bold text-dark leading-tight">
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
