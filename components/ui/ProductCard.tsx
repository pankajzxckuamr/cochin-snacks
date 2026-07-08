'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

  const isHome = variant === 'home'

  return (
    <Link
      href={`/products/${slugStr}`}
      className={isHome ? homeStyles.card : styles.productCard}
      aria-label={`View ${product.title}`}
    >
      {product.isBestseller && (
        <span className={`${styles.badge} ${styles.new}`}>Bestseller</span>
      )}
      {product.isHot && !product.isBestseller && (
        <span className={`${styles.badge} ${styles.sale}`}>Hot</span>
      )}

      <div className={isHome ? homeStyles.imageWrap : styles.cardImage}>
        <Image
          src={imageUrl}
          alt={product.title}
          width={360}
          height={360}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className={styles.image}
          priority={priority}
        />
      </div>

      <div className={isHome ? homeStyles.body : styles.cardContent}>
        <div className={styles.metaRow}>
          {product.category?.title ? (
            <span className={styles.categoryTag}>{product.category.title}</span>
          ) : (
            <span />
          )}
          <div className={styles.rating}>
            <span className={styles.stars} aria-hidden>
              {stars}
            </span>
            <span className={styles.count}>({count})</span>
          </div>
        </div>

        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>

        <p className={isHome ? homeStyles.description : styles.description}>{subtitle}</p>

        <div className={styles.cardFooter}>
          <span className={isHome ? homeStyles.cta : styles.actionBtn}>Enquiry Price</span>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)
