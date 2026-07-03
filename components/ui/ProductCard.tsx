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
  purchaseLinks?: { platformName: string; url: string }[]
}

interface ProductCardProps {
  product: Product
}

const getPlatformIcon = (platformName: string) => {
  const name = platformName.toLowerCase()
  if (name.includes('amazon')) return '🛍️'
  if (name.includes('flipkart')) return '📦'
  if (name.includes('swiggy') || name.includes('instamart') || name.includes('blinkit')) return '🛒'
  return '🔗'
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  
  // Safe extraction of slug string
  const slugStr = typeof product.slug === 'string'
    ? product.slug
    : product.slug?.current || ''
  
  const fallbackUrl = '/default-snack.svg'
  const mainImage = product.images?.[0]
  const imageUrl = mainImage ? urlFor(mainImage).width(400).format('webp').url() || fallbackUrl : fallbackUrl

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

  const mrp = product.mrp ?? 0
  const hasPrice = mrp > 0
  const originalPrice = hasPrice ? Math.round(mrp * 1.25) : 0

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
              {product.purchaseLinks.map((link, idx) => {
                const icon = getPlatformIcon(link.platformName)
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={styles.platformLink}
                  >
                    <span className={styles.platIcon}>{icon}</span> {link.platformName}
                  </a>
                )
              })}
            </div>
          )}

          {/* Footer (Price & Action) */}
          <div className={styles.cardFooter}>
            <div className={styles.price}>
              {hasPrice ? (
                <>
                  <span className={styles.current}>₹{product.mrp}</span>
                  {product.isBestseller && (
                    <span className={styles.original}>₹{originalPrice}</span>
                  )}
                </>
              ) : (
                <span className={styles.current} style={{ fontSize: '0.85rem', color: '#6b6b6b' }}>
                  Price on request
                </span>
              )}
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/products/${slugStr}`)
              }}
              className={styles.actionBtn}
            >
              {hasPrice ? 'Details' : 'Enquire'}
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className={styles.tagline}>Snack it… love it…</div>
      </div>
    </ScrollReveal>
  )
}
