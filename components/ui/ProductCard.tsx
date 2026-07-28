'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Flame } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'
import styles from './ProductCard.module.css'
import homeStyles from './HomeCard.module.css'

interface Product {
  _id: string
  title: string
  description?: string
  slug: string | { current: string }
  category?: {
    title: string
    slug: string
  }
  packSize?: string
  isHot?: boolean
  isBestseller?: boolean
  images?: any[]
  /** Direct image path used by the local fallback catalogue. */
  img?: string
}

interface ProductCardProps {
  product: Product
  /** Kept for call-site compatibility; no longer used for animation. */
  index?: number
  /** Eager-load image for above-the-fold cards. */
  priority?: boolean
  /** Use compact home-carousel sizing (fixed height). */
  variant?: 'default' | 'home'
}

function ProductCard({ product, priority = false, variant = 'default' }: ProductCardProps) {
  const slugStr =
    typeof product.slug === 'string'
      ? product.slug
      : product.slug?.current || ''

  const fallbackUrl = '/default-snack.svg'
  const mainImage = product.images?.[0]
  const imageUrl = product.img
    ? product.img
    : mainImage
      ? urlFor(mainImage).width(360).height(360).format('webp').quality(75).url() || fallbackUrl
      : fallbackUrl

  let hash = 0
  const str = product._id || ''
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const absHash = Math.abs(hash)
  const score = 4.0 + (absHash % 11) / 10
  const count = 30 + (absHash % 170)
  const stars = score >= 4.5 ? '★★★★★' : '★★★★☆'

  const subtitle =
    product.description || product.packSize || 'Authentic Kerala snack'

  return (
    <Link
      href={`/products/${slugStr}`}
      className={homeStyles.card}
      aria-label={`View ${product.title}`}
    >
      {/* Top Image Section */}
      <div className={homeStyles.imageWrap}>
        {product.isBestseller && (
          <span className={homeStyles.badge}>
            <Award className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.5px] shrink-0" /> Bestseller
          </span>
        )}
        {product.isHot && !product.isBestseller && (
          <span className={`${homeStyles.badge} ${homeStyles.badgeHot}`}>
            <Flame className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.5px] shrink-0" /> Hot Pick
          </span>
        )}
        <Image
          src={imageUrl}
          alt={product.title}
          width={360}
          height={360}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={homeStyles.image}
          priority={priority}
        />
      </div>

      {/* Bottom Content Section */}
      <div className={homeStyles.body}>
        <h3 className={homeStyles.title} title={product.title}>
          {product.title}
        </h3>

        <div className={homeStyles.metaGrid}>
          <div className={homeStyles.metaLeft}>
            <span className={homeStyles.category}>{product.category?.title || 'Kerala Special'}</span>
            <span className={homeStyles.tagline}>Fried in Pure Oil</span>
          </div>
          
          <div className={homeStyles.metaDivider} />
          
          <div className={homeStyles.metaRight}>
            <span className={homeStyles.metricValue}>{product.packSize || '250g'}</span>
            <span className={homeStyles.metricLabel}>Pack Size</span>
          </div>
          
          <div className={homeStyles.metaDivider} />
          
          <div className={homeStyles.metaRight}>
            <span className={homeStyles.metricValue}>★ {score.toFixed(1)}</span>
            <span className={homeStyles.metricLabel}>Rating</span>
          </div>
        </div>

        <div className={homeStyles.horizontalDivider} />

        <div className={homeStyles.footer}>
          <span className={homeStyles.footerText}>By Cochin Snacks</span>
          <span className={homeStyles.enquiryBtn}>
            Enquiry Price
            <ArrowRight className={homeStyles.actionIcon} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)
