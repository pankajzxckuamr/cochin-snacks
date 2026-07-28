'use client'

import { useState, useMemo, startTransition } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { Search, RefreshCw, X, SlidersHorizontal } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'

interface Product {
  _id: string
  title: string
  slug: string
  category: {
    title: string
    slug: string
  }
  description?: string
  packSize?: string
  isHot: boolean
  isBestseller: boolean
  images?: any[]
}

interface Category {
  _id: string
  title: string
  slug: string
  tagline?: string
}

interface ProductCatalogProps {
  initialProducts: Product[]
  categories: Category[]
}

export default function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')

  const handleCategoryChange = (slug: string) => {
    startTransition(() => setActiveCategory(slug))

    const params = new URLSearchParams(window.location.search)
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    window.history.replaceState(null, '', newUrl)
  }

  const resetFilters = () => {
    startTransition(() => {
      setSearch('')
      setActiveCategory('all')
    })
    window.history.replaceState(null, '', pathname)
  }

  const filteredProducts = useMemo(() => {
    const normalize = (value?: string) => (value ?? '').toLowerCase().trim()
    const searchQuery = normalize(search)

    return initialProducts
      .filter((p) => {
        const matchSearch =
          searchQuery.length === 0 || normalize(p.title).includes(searchQuery)
        const matchCategory =
          activeCategory === 'all' || p.category?.slug === activeCategory
        return matchSearch && matchCategory
      })
      .sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return a.title.localeCompare(b.title)
      })
  }, [initialProducts, search, activeCategory])

  const hasActiveFilters = search || activeCategory !== 'all'

  return (
    <div className="w-full">
      {/* Sticky filter bar */}
      <div className="sticky top-[64px] lg:top-[80px] z-30 bg-green-brand/95 backdrop-blur-md border-y border-white/[0.08] pt-6 pb-4 sm:pt-8 sm:pb-5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                activeCategory === 'all'
                  ? 'bg-white text-green-brand shadow-md font-extrabold'
                  : 'bg-white/10 text-white/90 border border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              All Snacks
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  activeCategory === cat.slug
                    ? 'bg-white text-green-brand shadow-md font-extrabold'
                    : 'bg-white/10 text-white/90 border border-white/20 hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search snacks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-black/[0.06] rounded-full py-2.5 pl-10 pr-9 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product grid — cream canvas so white cards pop */}
      <section className="relative bg-cream py-12 min-h-[60vh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(30,107,46,0.07) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {filteredProducts.length > 0 ? (
            <m.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p) => (
                  <m.div
                    layout
                    key={p._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex"
                  >
                    <ProductCard
                      product={p}
                      priority={false}
                    />
                  </m.div>
                ))}
              </AnimatePresence>
            </m.div>
          ) : (
            <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-black/[0.06] max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto mb-5">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-black text-dark mb-2">No snacks found</h3>
              <p className="text-dark/60 text-sm leading-relaxed mb-6 px-6">
                We couldn&apos;t find any snacks matching your filter. Try adjusting or resetting.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-brand text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-green-brand/25 hover:bg-green-dark hover:-translate-y-0.5 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
