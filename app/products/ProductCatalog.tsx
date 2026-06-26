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
  mrp: number
  spiceLevel: number
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
  const [spiceFilter, setSpiceFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('default')
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // Read active category from URL (?category=[slug])
  const activeCategory = searchParams.get('category') || 'all'

  // Update category slug in search parameters without full page reload
  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Reset all filters
  const resetFilters = () => {
    setSearch('')
    setSpiceFilter('all')
    setSortBy('default')
    router.push(pathname, { scroll: false })
  }

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Search text matching
        const matchSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()) ||
          p.category.title.toLowerCase().includes(search.toLowerCase())

        // Category matching
        const matchCategory =
          activeCategory === 'all' || p.category.slug === activeCategory

        // Spice matching
        let matchSpice = true
        if (spiceFilter === 'sweet') matchSpice = p.spiceLevel === 0
        else if (spiceFilter === 'mild') matchSpice = p.spiceLevel >= 1 && p.spiceLevel <= 2
        else if (spiceFilter === 'spicy') matchSpice = p.spiceLevel >= 3

        return matchSearch && matchCategory && matchSpice
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.mrp - b.mrp
        if (sortBy === 'price-desc') return b.mrp - a.mrp
        if (sortBy === 'name-asc') return a.title.localeCompare(b.title)
        if (sortBy === 'name-desc') return b.title.localeCompare(a.title)

        // Default: bestsellers first, then alphabetically
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return a.title.localeCompare(b.title)
      })
  }, [initialProducts, search, activeCategory, spiceFilter, sortBy])

  return (
    <div className="w-full">
      {/* 1. STICKY FILTER PILLS BAR */}
      <div className="sticky top-16 md:top-[72px] z-30 bg-[#0F0F0F] border-b border-white/10 shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories list horizontal row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FFD600] ${
                activeCategory === 'all'
                  ? 'bg-[#FFD600] text-[#0F0F0F]'
                  : 'border border-[#2D9142] text-white hover:bg-white/5'
              }`}
            >
              All Snacks
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FFD600] ${
                  activeCategory === cat.slug
                    ? 'bg-[#FFD600] text-[#0F0F0F]'
                    : 'border border-[#2D9142] text-white hover:bg-white/5'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Quick controls (Search input & Sorters) */}
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-60">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-3 pr-8 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD600] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-2.5 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#FFD600] font-bold"
            >
              <option value="default" className="text-dark bg-[#0F0F0F] text-white">Popularity</option>
              <option value="price-asc" className="text-dark bg-[#0F0F0F] text-white">Price: Low-High</option>
              <option value="price-desc" className="text-dark bg-[#0F0F0F] text-white">Price: High-Low</option>
              <option value="name-asc" className="text-dark bg-[#0F0F0F] text-white">Name: A-Z</option>
              <option value="name-desc" className="text-dark bg-[#0F0F0F] text-white">Name: Z-A</option>
            </select>
          </div>

        </div>
      </div>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="bg-[#FAFAF0] py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats Bar */}
          <div className="flex justify-between items-center mb-8 text-xs text-dark/50 font-bold uppercase tracking-wider">
            <span>Showing {filteredProducts.length} authentic snacks</span>
            {(search || activeCategory !== 'all' || spiceFilter !== 'all' || sortBy !== 'default') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-flame-orange hover:text-flame-red font-black"
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
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
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
            <div className="text-center py-20 bg-white rounded-3xl border border-green-dark/10 max-w-md mx-auto shadow-sm">
              <SlidersHorizontal className="w-12 h-12 text-[#2D9142]/40 mx-auto mb-4" />
              <h3 className="font-heading text-lg font-bold text-green-dark mb-1">No items found</h3>
              <p className="text-dark/60 text-sm leading-relaxed mb-6 px-4">
                We couldn't find any snacks matching your filter. Try adjusting or resetting.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#1E6B2E] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#2D9142] transition-colors"
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
