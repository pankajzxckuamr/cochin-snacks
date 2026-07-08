import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity/queries'
import ProductCatalog from './ProductCatalog'
import DotPattern from '@/components/ui/DotPattern'
import { generateSeoMetadata } from '@/lib/seo'
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from '@/lib/products/catalog'

import { Suspense } from 'react'

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

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "Our Snacks — Cochin Snacks | Authentic Kerala Flavours",
    description: "Browse all 50 authentic Cochin Snacks. Filter by category, spice levels, and search for your favourite snacks. FSSAI certified. Ships to 20+ countries.",
    path: "/products",
  })
}

export default async function ProductsPage() {
  // Parallel fetches
  const [rawProducts, rawCategories] = await Promise.all([
    sanityFetch<Product[]>(ALL_PRODUCTS_QUERY),
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY),
  ])

  // Fall back to the local catalogue when the CMS has no data yet.
  const products = rawProducts && rawProducts.length > 0 ? rawProducts : (FALLBACK_PRODUCTS as unknown as Product[])
  const categories = rawCategories && rawCategories.length > 0 ? rawCategories : (FALLBACK_CATEGORIES as unknown as Category[])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1 bg-white text-dark">
        {/* Hero — modern cream banner (matches About/Home) */}
        <section className="relative bg-cream overflow-hidden py-14 sm:py-20">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-brand/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-flame-orange" />
              <span className="text-xs font-bold text-green-dark tracking-widest uppercase font-mono">Our Range</span>
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Our Cochin <span className="text-green-brand">Snacks</span>
            </h1>
            <p className="text-dark/60 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
              Explore authentic Kerala varieties — fried in 100% pure oil, packed fresh, and loved across 20+ countries.
            </p>
          </div>
        </section>

        {/* Dynamic Catalog */}
        <Suspense fallback={<div className="py-20 text-center font-bold">Loading snacks...</div>}>
          <ProductCatalog initialProducts={products} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
