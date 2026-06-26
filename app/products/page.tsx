import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity/queries'
import ProductCatalog from './ProductCatalog'
import { generateSeoMetadata } from '@/lib/seo'

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
  const [products, categories] = await Promise.all([
    sanityFetch<Product[]>(ALL_PRODUCTS_QUERY),
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY),
  ])

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-off-white text-dark pb-20">
        {/* Banner */}
        <section className="relative py-20 bg-green-dark text-off-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.12),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
              Our Cochin Snacks
            </h1>
            <p className="text-yellow text-sm sm:text-base font-semibold uppercase tracking-wider">
              Explore 50 authentic Kerala varieties, fried in 100% pure oil
            </p>
          </div>
        </section>

        {/* Dynamic Catalog */}
        <ProductCatalog initialProducts={products} categories={categories} />
      </main>
      <Footer />
    </>
  )
}
