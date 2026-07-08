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

      <main id="main-content" className="flex-1 bg-[#FAFAF0] text-dark pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Breadcrumb / Back button row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E6B2E] hover:text-[#2D9142] uppercase tracking-widest group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all snacks</span>
            </Link>
            
            {/* Breadcrumb nav */}
            <nav className="text-[10px] uppercase font-bold tracking-widest text-dark/45 flex items-center gap-1">
              <Link href="/" className="hover:text-green-brand">Home</Link>
              <span>›</span>
              <Link href="/products" className="hover:text-green-brand">Products</Link>
              <span>›</span>
              <Link href={`/products?category=${product.category?.slug}`} className="hover:text-green-brand">
                {product.category?.title}
              </Link>
              <span>›</span>
              <span className="text-dark/80">{product.title}</span>
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
                      <span className="bg-[#FFD600] text-[#0F0F0F] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        BESTSELLER
                      </span>
                    )}
                    {product.isHot && (
                      <span className="bg-[#FF6B00] text-off-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-yellow" />
                        <span>HOT</span>
                      </span>
                    )}
                  </div>

                  {/* Name and category link */}
                  <div className="flex flex-col gap-2">
                    <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E6B2E] leading-tight">
                      {product.title}
                    </h1>
                    <Link
                      href={`/products?category=${product.category?.slug}`}
                      className="inline-block bg-[#1E6B2E] text-white hover:bg-[#2D9142] transition-colors text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full w-max"
                    >
                      {product.category?.title}
                    </Link>
                  </div>

                  {/* Key Features Section */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-dark/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-dark/70">
                      <Globe className="w-4 h-4 text-green-brand" />
                      <span>Shipping to 29+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-dark/70">
                      <Zap className="w-4 h-4 text-green-brand" />
                      <span>Zero Oil Reuse — Pure &amp; Fresh</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-dark/70">
                      <Heart className="w-4 h-4 text-green-brand" />
                      <span>Farm-Sourced Ingredients</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-dark/70">
                      <Award className="w-4 h-4 text-green-brand" />
                      <span>FSSAI & ISO 27001 Certified Safety</span>
                    </div>
                  </div>

                  {/* About This Product */}
                  {product.aboutProduct && product.aboutProduct.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-sm font-bold text-[#1E6B2E] mb-2 uppercase tracking-wider">About This Item</h3>
                      <ul className="list-disc pl-5 space-y-2 text-dark/80 text-sm">
                        {product.aboutProduct.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Description */}
                  {product.description && (
                    <p className="text-dark/80 text-sm sm:text-base leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Ingredients Section */}
                  {product.ingredients && (
                    <div className="bg-white rounded-2xl border border-green-dark/10 p-5">
                      <strong className="text-xs uppercase font-extrabold tracking-wider text-[#1E6B2E] mb-2 block">
                        Ingredients
                      </strong>
                      <p className="text-dark/85 text-xs sm:text-sm leading-relaxed mb-3">
                        {product.ingredients}
                      </p>
                      <span className="text-[10px] text-green-brand font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Contains no artificial preservatives</span>
                      </span>
                    </div>
                  )}



                  {/* Nutritional Info collapsible accordion */}
                  {product.nutritionalInfo && (
                    <details className="group border border-green-dark/10 bg-white rounded-2xl shadow-sm p-4 overflow-hidden cursor-pointer">
                      <summary className="flex items-center justify-between font-heading text-sm sm:text-base font-bold text-[#1E6B2E] focus:outline-none list-none select-none">
                        <span>Nutritional Information</span>
                        <ChevronDown className="w-5 h-5 text-green-brand transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-dark/5">
                        <NutritionalTable nutritionalInfo={product.nutritionalInfo} />
                      </div>
                    </details>
                  )}

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-dark/5 shadow-sm">
                      <strong className="text-dark/45 uppercase text-[10px] tracking-wider block mb-1">Country of Origin</strong>
                      <span className="text-dark/85 font-semibold">India</span>
                    </div>
                    {product.storageInstructions && (
                      <div className="bg-white p-4 rounded-xl border border-dark/5 shadow-sm col-span-2">
                        <strong className="text-dark/45 uppercase text-[10px] tracking-wider block mb-1">Storage Instructions</strong>
                        <span className="text-dark/85 leading-relaxed">{product.storageInstructions}</span>
                      </div>
                    )}
                    <div className="bg-white p-4 rounded-xl border border-dark/5 shadow-sm col-span-2">
                      <strong className="text-dark/45 uppercase text-[10px] tracking-wider block mb-1">Manufacturer &amp; FSSAI</strong>
                      <span className="text-dark/85 block mb-1.5">{product.manufacturer || 'PAVITHRAM SNACKS, Mullankunnu, Ponjassery P.O., Ernakulam, Kerala - 683547'}</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-brand/10 border border-green-brand/20 text-[10px] text-green-dark font-bold font-mono">
                        FSSAI: 11324007000398
                      </span>
                    </div>
                  </div>



                  {/* Enquiry CTA */}
                  <div className="bg-[#1E6B2E] text-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 mt-4">
                    <h3 className="font-heading text-lg font-bold text-[#FFD600]">
                      Interested in this product?
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Whether you need private labeling, custom packing parameters, or a bulk export quotation, our B2B export team is ready to assist.
                    </p>
                    <Link
                      href={`/partners?product=${product.title}`}
                      className="inline-flex items-center justify-center w-full py-3 bg-[#FFD600] text-[#0F0F0F] hover:bg-[#FFE94D] font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md mt-2"
                    >
                      Enquire Now
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* Customer Reviews Section */}
          <div className="mt-20 pt-12 border-t border-dark/10">
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#1E6B2E] mb-8">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Ratings Summary */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-black text-dark">4.8</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex text-[#FFD600]">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current text-[#FFD600]/40" />
                    </div>
                    <span className="text-xs text-dark/60 font-semibold tracking-wider">Based on 124 reviews</span>
                  </div>
                </div>
                {/* Progress bars */}
                <div className="space-y-2 mb-8">
                  {[5, 4, 3, 2, 1].map((star, idx) => {
                    const percents = [78, 15, 5, 2, 0];
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs font-bold text-dark/60">
                        <span className="w-12">{star} star</span>
                        <div className="flex-1 h-3 bg-dark/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FFD600] rounded-full" style={{ width: `${percents[idx]}%` }} />
                        </div>
                        <span className="w-8 text-right">{percents[idx]}%</span>
                      </div>
                    )
                  })}
                </div>
                <button className="w-full py-3 border-2 border-dark/10 rounded-xl font-bold text-sm text-dark hover:border-dark/30 hover:bg-white transition-all">
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
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1E6B2E]/10 text-[#1E6B2E] flex items-center justify-center font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-dark text-sm">{review.name}</h4>
                          <span className="text-[10px] text-green-brand font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-dark/40 font-semibold">{review.date}</span>
                    </div>
                    <div className="flex text-[#FFD600] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-dark/10'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-dark/80 leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products Grid (3 items below) */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-dark/10">
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#1E6B2E] mb-8">
                You May Also Like
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
