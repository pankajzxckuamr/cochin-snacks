import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { BESTSELLER_PRODUCTS_QUERY, ALL_TESTIMONIALS_QUERY } from '@/lib/sanity/queries'
import { groq } from 'next-sanity'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import HomeClient from './HomeClient'
import { generateSeoMetadata } from '@/lib/seo'

// Custom query to fetch category cards along with product count and first product image
const CATEGORIES_WITH_COUNTS_QUERY = groq`
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    "count": count(*[_type == "product" && category._ref == ^._id && isAvailable == true]),
    "image": *[_type == "product" && category._ref == ^._id && isAvailable == true && defined(images[0])][0].images[0]
  }
`

interface RawCategory {
  _id: string
  title: string
  slug: string
  count: number
  image?: any
}

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "Cochin Snacks — Authentic Kerala Snacks | Snack it... love it...",
    description: "Shop authentic Kerala snacks — banana chips, tapioca chips, murukku, pakkavada, mixture and more. FSSAI certified. Ships to 20+ countries.",
    path: "/",
  })
}

export default async function Home() {
  // Parallel fetch from Sanity CMS
  const [rawBestsellers, rawTestimonials, rawCategories] = await Promise.all([
    sanityFetch<any[]>(BESTSELLER_PRODUCTS_QUERY),
    sanityFetch<any[]>(ALL_TESTIMONIALS_QUERY),
    sanityFetch<RawCategory[]>(CATEGORIES_WITH_COUNTS_QUERY),
  ])

  // Map categories to format containing processed Image URLs
  const categories = rawCategories.map((cat) => ({
    _id: cat._id,
    title: cat.title,
    slug: cat.slug,
    count: cat.count || 0,
    imageUrl: cat.image ? urlFor(cat.image).width(160).format('webp').url() : '/default-snack.svg',
  }))

  // Map products to ensure safe structure
  const bestsellers = rawBestsellers.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: typeof p.slug === 'string' ? p.slug : p.slug?.current || '',
    category: {
      _id: p.category?._id || '',
      title: p.category?.title || 'Snacks',
      slug: p.category?.slug || 'snacks',
    },
    packSize: p.packSize,
    mrp: p.mrp || 0,
    spiceLevel: p.spiceLevel || 0,
    isHot: !!p.isHot,
    isBestseller: !!p.isBestseller,
    images: p.images || [],
  }))

  return (
    <PageTransition>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#FAFAF0] text-[#0F0F0F] overflow-hidden">
        <HomeClient
          bestsellers={bestsellers}
          categories={categories}
          testimonials={rawTestimonials}
        />
      </main>
      <Footer />
    </PageTransition>
  )
}
