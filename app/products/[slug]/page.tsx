import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { PRODUCT_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NutritionalTable from '@/components/ui/NutritionalTable'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ProductCard from '@/components/ui/ProductCard'
import ProductDetailsGallery from './ProductDetailsGallery'
import PageTransition from '@/components/ui/PageTransition'
import {
  ArrowLeft,
  Flame,
  CheckCircle,
  PackageOpen,
  Award,
  ShieldCheck,
  Zap,
  Globe,
  Heart,
  HelpCircle,
  FileText,
  ChevronDown,
  Star
} from 'lucide-react'

// Custom query to fetch related products from the same category
const RELATED_PRODUCTS_QUERY = groq`
  *[_type == "product" && isAvailable == true && category->slug.current == $categorySlug && _id != $currentId][0...3] {
    _id,
    title,
    "slug": slug.current,
    "category": category->{ _id, title, "slug": slug.current },
    packSize,
    isHot,
    isBestseller,
    images[] { asset, alt }
  }
`

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
  ingredients?: string
  nutritionalInfo?: string
  packSize?: string
  storageInstructions?: string
  countryOfOrigin?: string
  fssaiNumber?: string
  manufacturer?: string
  images?: any[]
  aboutProduct?: string[]
  isHot: boolean
  isBestseller: boolean
  isAvailable: boolean
  seoTitle?: string
  seoDescription?: string
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

import { generateSeoMetadata } from '@/lib/seo'

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateStaticParams() {
  const products = await sanityFetch<Array<{ slug: string }>>(groq`
    *[_type == "product" && isAvailable == true] {
      "slug": slug.current
    }
  `)
  return products.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await sanityFetch<Product>(PRODUCT_BY_SLUG_QUERY, { slug: params.slug })
  if (!product) {
    return generateSeoMetadata({
      title: 'Product Not Found | Cochin Snacks',
      description: 'The requested Cochin Snacks product could not be found.',
      path: `/products/${params.slug}`,
    })
  }

  const title = product.seoTitle || `${product.title} — Cochin Snacks`
  const description = product.seoDescription || product.description || `Savour our authentic ${product.title} prepared in pure oil with traditional spices.`
  const mainImageObj = product.images?.[0]
  const ogImage = mainImageObj ? urlFor(mainImageObj).width(1200).format('webp').url() : '/og-image.png'

  return generateSeoMetadata({
    title,
    description,
    path: `/products/${params.slug}`,
    ogImage: ogImage || '/og-image.png',
  })
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await sanityFetch<Product>(PRODUCT_BY_SLUG_QUERY, { slug: params.slug })

  if (!product) {
    notFound()
  }

  // Fetch related products in parallel
  const categorySlug = product.category?.slug || 'snacks'
  const relatedProducts = await sanityFetch<any[]>(RELATED_PRODUCTS_QUERY, {
    categorySlug,
    currentId: product._id,
  })


  // Product Image for JSON-LD Structured data
  const mainImageObj = product.images?.[0]
  const mainImageUrl = mainImageObj ? urlFor(mainImageObj).width(1200).format('webp').url() : ''

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.title,
    'description': product.description || '',
    'image': mainImageUrl,
    'brand': {
      '@type': 'Brand',
      'name': 'Cochin Snacks',
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'Pavithram Foods',
    },
  }

  return (
    <PageTransition>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main id="main-content" className="flex-1 bg-white text-dark pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Breadcrumb / Back button row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-green-brand hover:text-green-dark uppercase tracking-widest group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all snacks</span>
            </Link>
            
            {/* Breadcrumb nav */}
            <nav className="text-xs font-semibold text-dark/45 flex items-center gap-1.5">
              <Link href="/" className="hover:text-green-brand transition-colors">Home</Link>
              <span className="text-dark/25">/</span>
              <Link href="/products" className="hover:text-green-brand transition-colors">Products</Link>
              <span className="text-dark/25">/</span>
              <Link href={`/products?category=${product.category?.slug}`} className="hover:text-green-brand transition-colors">
                {product.category?.title}
              </Link>
              <span className="text-dark/25">/</span>
              <span className="text-dark/80 font-medium">{product.title}</span>
            </nav>
          </div>

          {/* Product Layout Grid (Gallery 55% left, details 45% right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Gallery (55%) */}
            <div className="lg:col-span-7">
              <ProductDetailsGallery title={product.title} images={product.images} />
            </div>

            {/* RIGHT COLUMN: Details (45%) */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="flex flex-col gap-6">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {product.isBestseller && (
                      <span className="bg-yellow text-dark font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        BESTSELLER
                      </span>
                    )}
                    {product.isHot && (
                      <span className="bg-flame-orange text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-yellow" />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>

                  {/* Name and category link */}
                  <div className="flex flex-col gap-3">
                    <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1]">
                      {product.title}
                    </h1>
                    <Link
                      href={`/products?category=${product.category?.slug}`}
                      className="inline-block bg-green-brand text-white hover:bg-green-dark transition-colors text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full w-max"
                    >
                      {product.category?.title}
                    </Link>
                  </div>

                  {/* Key Features Section */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-black/[0.06]">
                    <div className="flex items-center gap-2 text-sm font-medium text-dark/70">
                      <Globe className="w-4 h-4 text-green-brand shrink-0" />
                      <span>Shipping to 29+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-dark/70">
                      <Zap className="w-4 h-4 text-green-brand shrink-0" />
                      <span>Zero Oil Reuse — Pure &amp; Fresh</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-dark/70">
                      <Heart className="w-4 h-4 text-green-brand shrink-0" />
                      <span>Farm-Sourced Ingredients</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-dark/70">
                      <Award className="w-4 h-4 text-green-brand shrink-0" />
                      <span>FSSAI & ISO Certified</span>
                    </div>
                  </div>

                  {/* About This Product */}
                  {product.aboutProduct && product.aboutProduct.length > 0 && (
                    <div className="pt-2">
                      <h3 className="font-heading text-lg font-bold text-dark mb-3">About This Item</h3>
                      <ul className="list-disc pl-5 space-y-2 text-dark/70 text-sm sm:text-base font-medium leading-relaxed">
                        {product.aboutProduct.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Description */}
                  {product.description && (
                    <p className="text-dark/65 text-sm sm:text-base font-medium leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Ingredients Section */}
                  {product.ingredients && (
                    <div className="bg-cream rounded-2xl border border-black/[0.06] p-5">
                      <h3 className="font-heading text-base font-bold text-dark mb-2">
                        Ingredients
                      </h3>
                      <p className="text-dark/70 text-sm font-medium leading-relaxed mb-3">
                        {product.ingredients}
                      </p>
                      <span className="text-xs text-green-brand font-semibold flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Contains no artificial preservatives</span>
                      </span>
                    </div>
                  )}

                  {/* Nutritional Info collapsible accordion */}
                  {product.nutritionalInfo && (
                    <details className="group border border-black/[0.06] bg-cream rounded-2xl shadow-sm p-4 overflow-hidden cursor-pointer">
                      <summary className="flex items-center justify-between font-heading text-base font-bold text-dark focus:outline-none list-none select-none">
                        <span>Nutritional Information</span>
                        <ChevronDown className="w-5 h-5 text-green-brand transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-black/[0.06]">
                        <NutritionalTable nutritionalInfo={product.nutritionalInfo} />
                      </div>
                    </details>
                  )}

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-cream p-4 rounded-xl border border-black/[0.06]">
                      <strong className="text-dark/45 text-xs font-semibold tracking-wide block mb-1">Country of Origin</strong>
                      <span className="text-dark font-semibold">India</span>
                    </div>
                    {product.storageInstructions && (
                      <div className="bg-cream p-4 rounded-xl border border-black/[0.06] col-span-2">
                        <strong className="text-dark/45 text-xs font-semibold tracking-wide block mb-1">Storage Instructions</strong>
                        <span className="text-dark/75 font-medium leading-relaxed">{product.storageInstructions}</span>
                      </div>
                    )}
                    <div className="bg-cream p-4 rounded-xl border border-black/[0.06] col-span-2">
                      <strong className="text-dark/45 text-xs font-semibold tracking-wide block mb-1">Manufacturer &amp; FSSAI</strong>
                      <span className="text-dark/75 font-medium block mb-1.5">{product.manufacturer || 'PAVITHRAM SNACKS, Mullankunnu, Ponjassery P.O., Ernakulam, Kerala - 683547'}</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-brand/10 border border-green-brand/20 text-xs text-green-dark font-bold font-mono">
                        FSSAI: 11324007000398
                      </span>
                    </div>
                  </div>

                  {/* Enquiry CTA */}
                  <div className="bg-gradient-to-br from-green-brand to-green-dark text-white p-6 rounded-2xl shadow-lg shadow-green-brand/25 flex flex-col gap-3 mt-4">
                    <h3 className="font-heading text-xl font-black text-white">
                      Interested in this product?
                    </h3>
                    <p className="text-sm text-white/80 font-medium leading-relaxed">
                      Whether you need private labeling, custom packing, or a bulk export quotation, our B2B export team is ready to assist.
                    </p>
                    <Link
                      href={`/partners?product=${product.title}`}
                      className="inline-flex items-center justify-center w-full py-3.5 bg-white text-green-dark hover:bg-cream font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md mt-1"
                    >
                      Enquire Now
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* Customer Reviews Section */}
          <div className="mt-20 pt-12 border-t border-black/[0.06]">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-dark tracking-tight mb-8">
              Customer <span className="text-green-brand">Reviews</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Ratings Summary */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="font-heading text-5xl font-black text-dark">4.8</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex text-yellow">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current text-yellow/40" />
                    </div>
                    <span className="text-sm text-dark/55 font-medium">Based on 124 reviews</span>
                  </div>
                </div>
                {/* Progress bars */}
                <div className="space-y-2 mb-8">
                  {[5, 4, 3, 2, 1].map((star, idx) => {
                    const percents = [78, 15, 5, 2, 0];
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs font-semibold text-dark/60">
                        <span className="w-12">{star} star</span>
                        <div className="flex-1 h-3 bg-dark/5 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow rounded-full" style={{ width: `${percents[idx]}%` }} />
                        </div>
                        <span className="w-8 text-right">{percents[idx]}%</span>
                      </div>
                    )
                  })}
                </div>
                <button className="w-full py-3 border-2 border-black/[0.08] rounded-full font-bold text-sm text-dark hover:border-green-brand/40 hover:bg-cream transition-all">
                  Write a review
                </button>
              </div>

              {/* Sample Reviews */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {[
                  { name: "Arun K.", rating: 5, date: "2 weeks ago", text: "Absolutely brilliant! The authentic taste of Kerala right at my doorstep. You can tell they use fresh oil, there is no stale smell at all." },
                  { name: "Priya S.", rating: 5, date: "1 month ago", text: "I've ordered these multiple times for my family in the UK. The packaging is excellent and the snacks always arrive fresh and crispy." },
                  { name: "Rahul V.", rating: 4, date: "2 months ago", text: "Very good quality. The spice level is just perfect for us. Only wish they had larger family packs available for all varieties." }
                ].map((review, idx) => (
                  <div key={idx} className="bg-cream p-6 rounded-2xl border border-black/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center font-heading font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-dark text-sm">{review.name}</h4>
                          <span className="text-xs text-green-brand font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-dark/40 font-medium">{review.date}</span>
                    </div>
                    <div className="flex text-yellow mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-dark/10'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-dark/70 font-medium leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products Grid (3 items below) */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-black/[0.06]">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-dark tracking-tight mb-8">
                You May Also <span className="text-green-brand">Like</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </PageTransition>
  )
}
