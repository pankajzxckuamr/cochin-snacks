import { groq } from 'next-sanity'

/* ─────────────────────────── CATEGORIES ────────────────────────────────── */

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    title,
    "slug": slug.current,
    tagline,
  }
`

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tagline,
    catalogueTagline,
    description,
    bannerImage { asset, alt },
    displayOrder,
  }
`

/* ─────────────────────────── PRODUCTS ──────────────────────────────────── */

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product" && isAvailable == true] | order(isBestseller desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->{ title, "slug": slug.current },
    description,
    packSize,
    isHot,
    isBestseller,
    "images": images[0...1] { asset, alt },
  }
`

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && isAvailable == true && category->slug.current == $categorySlug]
  | order(isBestseller desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->{ _id, title, "slug": slug.current },
    description,
    packSize,
    mrp,
    isHot,
    isBestseller,
    isAvailable,
    images[] { asset, alt },
    purchaseLinks[] { platformName, url },
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "category": category->{ _id, title, "slug": slug.current },
    description,
    ingredients,
    nutritionalInfo,
    packSize,
    mrp,
    aboutProduct,
    storageInstructions,
    countryOfOrigin,
    fssaiNumber,
    manufacturer,
    images[] { asset, alt },
    isHot,
    isBestseller,
    isAvailable,
    seoTitle,
    seoDescription,
    purchaseLinks[] { platformName, url },
  }
`

export const BESTSELLER_PRODUCTS_QUERY = groq`
  *[_type == "product" && isAvailable == true && title in [
    "Kerala Murukku", "Kerala Mixture", "Tomato Murukku",
    "Beetroot Murukku", "Banana Chips", "Ripe Banana Chips"
  ]] | order(title asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    "category": category->{ _id, title, "slug": slug.current },
    description,
    packSize,
    mrp,
    isHot,
    isBestseller,
    images[] { asset, alt },
    purchaseLinks[] { platformName, url },
  }
`

/* ─────────────────────────── BLOG POSTS ────────────────────────────────── */

export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    featuredImage { asset, alt },
    tags,
    seoTitle,
    seoDescription,
  }
`

export const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    featuredImage { asset, alt },
    body,
    tags,
    seoTitle,
    seoDescription,
  }
`

/* ─────────────────────────── FAQs ──────────────────────────────────────── */

export const ALL_FAQS_QUERY = groq`
  *[_type == "faqItem"] | order(displayOrder asc) {
    _id,
    question,
    answer,
    displayOrder,
  }
`

/* ─────────────────────────── TESTIMONIALS ──────────────────────────────── */

export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id,
    name,
    location,
    quote,
    rating,
    displayOrder,
  }
`

/* ─────────────────────────── COUNTRIES & PLATFORMS ──────────────────────── */

export const ALL_COUNTRIES_QUERY = groq`
  *[_type == "country"] | order(displayOrder asc, name asc) {
    _id,
    name,
    flag,
    displayOrder
  }
`

export const ALL_PLATFORMS_QUERY = groq`
  *[_type == "platform" && isActive == true] | order(displayOrder asc, name asc) {
    _id,
    name,
    url,
    displayOrder,
    isActive
  }
`

