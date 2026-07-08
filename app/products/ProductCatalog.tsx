'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, RefreshCw, X } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

interface Product {
  _id: string
  title: string
  slug: string
  category: {
    _id: string
    title: string
    slug: string
  }
  description?: string
  packSize?: string
  isHot: boolean
  isBestseller: boolean
  isAvailable: boolean
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<string>('default')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // Read active category from URL (?category=[slug]) initially, then manage locally for speed
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')

  // Update category slug in search parameters without full page reload
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug)
    
    // Update URL silently without triggering Next.js server requests
    const params = new URLSearchParams(window.location.search)
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    window.history.replaceState(null, '', newUrl)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearch('')
    setSortBy('default')
    setActiveCategory('all')
    window.history.replaceState(null, '', pathname)
  }

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search text matching
        const matchSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
          (p.category?.title?.toLowerCase().includes(search.toLowerCase()) ?? false)

        // Category matching
        const matchCategory =
          activeCategory === 'all' || p.category?.slug === activeCategory

        return matchSearch && matchCategory
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title)
        if (sortBy === 'name-desc') return b.title.localeCompare(a.title)

        // Default: bestsellers first, then alphabetically
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return a.title.localeCompare(b.title)
      })
  }, [initialProducts, search, activeCategory, sortBy])

  const hasActiveFilters = search || activeCategory !== 'all' || sortBy !== 'default'

  return (
    <div className="w-full bg-white">
      {/* 1. STICKY FILTER BAR — frosted light */}
      <div className="sticky top-[76px] lg:top-[96px] z-30 bg-white/85 backdrop-blur-xl border-y border-black/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Categories list horizontal row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-green-brand/30 ${
                activeCategory === 'all'
                  ? 'bg-green-brand text-white shadow-sm shadow-green-brand/25'
                  : 'bg-cream text-dark/70 border border-black/[0.06] hover:border-green-brand/40 hover:text-green-brand'
              }`}
            >
              All Snacks
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-green-brand/30 ${
                  activeCategory === cat.slug
                    ? 'bg-green-brand text-white shadow-sm shadow-green-brand/25'
                    : 'bg-cream text-dark/70 border border-black/[0.06] hover:border-green-brand/40 hover:text-green-brand'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick controls (Search input & Sorters) */}
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search snacks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cream border border-black/[0.06] rounded-full py-2.5 pl-10 pr-9 text-sm text-dark placeholder:text-dark/40 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 transition-all"
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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream border border-black/[0.06] rounded-full py-2.5 px-4 text-sm text-dark font-semibold focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 transition-all cursor-pointer"
            >
              <option value="default">Popularity</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>

        </div>
      </div>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="bg-white py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stats Bar */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-xs sm:text-sm text-dark/50 font-bold uppercase tracking-wider font-mono">
              Showing <span className="text-green-brand">{filteredProducts.length}</span> authentic snacks
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-brand hover:text-green-dark transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Grid list with AnimatePresence */}
          {filteredProducts.length > 0 ? (
            <m.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((p, idx) => (
                  <m.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ProductCard product={p} />
                  </m.div>
                ))}
              </AnimatePresence>
            </m.div>
          ) : (
            <div className="text-center py-16 sm:py-20 bg-cream rounded-3xl border border-black/[0.06] max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto mb-5">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-black text-dark mb-2">No snacks found</h3>
              <p className="text-dark/60 text-sm leading-relaxed mb-6 px-6">
                We couldn't find any snacks matching your filter. Try adjusting or resetting.
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
