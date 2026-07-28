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

export const revalidate = 300 // ISR — 5 minutes; catalogue rarely changes minute-to-minute

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


        {/* Dynamic Catalog */}
        <Suspense fallback={<div className="py-20 text-center text-dark/50 font-medium">Loading snacks...</div>}>
          <ProductCatalog initialProducts={products} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
