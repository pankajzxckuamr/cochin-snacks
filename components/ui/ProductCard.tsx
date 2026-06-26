'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'
import FlameIcon from './FlameIcon'
import SpiceMeter from './SpiceMeter'
import ScrollReveal from './ScrollReveal'

interface Product {
  _id: string
  title: string
  slug: string | { current: string }
  category?: {
    title: string
    slug: string
  }
  packSize?: string
  mrp: number
  spiceLevel?: number
  isHot?: boolean
  isBestseller?: boolean
  images?: any[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Safe extraction of slug string
  const slugStr = typeof product.slug === 'string'
    ? product.slug
    : product.slug?.current || ''

  const fallbackUrl = '/default-snack.svg'
  const mainImage = product.images?.[0]
  const imageUrl = mainImage ? urlFor(mainImage).width(400).format('webp').url() || fallbackUrl : fallbackUrl

  const formattedPrice = product.mrp > 0 
    ? `₹${product.mrp}` 
    : 'Price on request'

  return (
    <ScrollReveal direction="up">
      <Link href={`/products/${slugStr}`} className="block">
        <m.div
          whileHover={{
            y: -8,
            boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-2xl border border-green-dark/5 overflow-hidden flex flex-col group h-full shadow-sm"
        >
          {/* Image Container */}
          <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-off-white">
            {/* Top Left Bestseller Badge */}
            {product.isBestseller && (
              <span className="absolute top-4 left-4 z-10 bg-yellow text-dark font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                Bestseller
              </span>
            )}

            {/* Top Right Hot Badge */}
            {product.isHot && (
              <span className="absolute top-4 right-4 z-10 bg-[#FF6B00] text-off-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <FlameIcon size="sm" color="yellow" />
                <span>HOT</span>
              </span>
            )}

            <Image
              src={imageUrl}
              alt={product.title}
              width={400}
              height={400}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover w-full h-full p-2 rounded-t-2xl transition-transform duration-400 ease-out group-hover:scale-108"
            />
          </div>

          {/* Body Content */}
          <div className="p-4 flex flex-col flex-1 gap-3">
            {/* Category and Pack size */}
            <div className="flex items-center justify-between gap-2">
              {product.category?.title && (
                <span className="bg-green-dark text-off-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                  {product.category.title}
                </span>
              )}
              {product.packSize && (
                <span className="text-dark/45 text-xs font-bold">
                  {product.packSize}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-heading text-lg font-bold text-dark group-hover:text-green-brand transition-colors leading-snug">
              {product.title}
            </h3>

            {/* Spice Level */}
            {product.spiceLevel !== undefined && product.spiceLevel > 0 && (
              <SpiceMeter level={product.spiceLevel} />
            )}

            {/* Price & Action Button */}
            <div className="mt-auto pt-3 border-t border-off-white/80 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-dark/40 uppercase tracking-widest font-black">Price</span>
                <span className={`font-mono text-base font-black ${product.mrp > 0 ? 'text-green-dark' : 'text-green-brand text-xs uppercase tracking-wider'}`}>
                  {formattedPrice}
                </span>
              </div>

              <span className="w-full py-2.5 bg-green-dark group-hover:bg-green-brand text-off-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </m.div>
      </Link>
    </ScrollReveal>
  )
}
