'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { urlFor } from '@/lib/sanity/client'
import ScrollReveal from './ScrollReveal'
import styles from './ProductCard.module.css'

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
  mrp?: number
  isHot?: boolean
  isBestseller?: boolean
  images?: any[]
  /** Direct image path used by the local fallback catalogue. */
  img?: string
  purchaseLinks?: { platformName: string; url: string }[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  
  // Safe extraction of slug string
  const slugStr = typeof product.slug === 'string'
    ? product.slug
    : product.slug?.current || ''
  
  const fallbackUrl = '/default-snack.svg'
  const mainImage = product.images?.[0]
  const imageUrl = product.img
    ? product.img
    : mainImage
      ? urlFor(mainImage).width(400).format('webp').url() || fallbackUrl
      : fallbackUrl

  // Stable mock rating based on product ID
  const ratingData = React.useMemo(() => {
    let hash = 0
    const str = product._id || ''
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    const absHash = Math.abs(hash)
    const score = 4.0 + (absHash % 11) / 10 // 4.0 to 5.0
    const count = 30 + (absHash % 170) // 30 to 200 reviews
    return { score, count }
  }, [product._id])

  const stars = ratingData.score >= 4.5 ? '★★★★★' : '★★★★☆'

  const handleCardClick = () => {
    router.push(`/products/${slugStr}`)
  }

  return (
    <ScrollReveal direction="up">
      <div 
        onClick={handleCardClick} 
        className={styles.productCard}
      >
        {/* Badges */}
        {product.isBestseller && (
          <span className={`${styles.badge} ${styles.new}`}>
            Bestseller
          </span>
        )}
        {product.isHot && (
          <span className={`${styles.badge} ${styles.sale}`} style={{ left: 'auto', right: '16px' }}>
            Hot
          </span>
        )}

        {/* Image Container */}
        <div className={styles.cardImage}>
          <Image
            src={imageUrl}
            alt={product.title}
            width={400}
            height={400}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={styles.image}
          />
        </div>

        {/* Body Content */}
        <div className={styles.cardContent}>
          {/* Category Tag */}
          {product.category?.title && (
            <span className={styles.categoryTag}>
              {product.category.title}
            </span>
          )}

          {/* Title */}
          <h3 className={styles.title} title={product.title}>
            {product.title}
          </h3>

          {/* Description */}
          {product.description && (
            <p className={styles.description}>
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className={styles.rating}>
            <span className={styles.stars}>{stars}</span>
            <span className={styles.count}>({ratingData.count})</span>
          </div>

          {/* Purchase Platform Links */}
          {product.purchaseLinks && product.purchaseLinks.length > 0 && (
            <div className={styles.platformSection}>
              <span className={styles.platformLabel}>Available on</span>
              {product.purchaseLinks.slice(0, 2).map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={styles.platformLink}
                >
                  {link.platformName}
                </a>
              ))}
            </div>
          )}

          {/* Footer (single CTA only) */}
          <div className={styles.cardFooter}>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/products/${slugStr}`)
              }}
              className={styles.actionBtn}
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
