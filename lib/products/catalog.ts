/**
 * Local product catalogue — used as a fallback when the Sanity CMS returns no
 * data (e.g. before a real project is connected / seeded). Mirrors the data in
 * scripts/seed.mjs so the storefront always has the full range to display.
 *
 * Once a real Sanity project is configured and seeded, the live data takes
 * precedence and this fallback is ignored automatically.
 */

export interface CatalogCategory {
  _id: string
  title: string
  slug: string
  tagline?: string
  displayOrder: number
}

export interface CatalogProduct {
  _id: string
  title: string
  slug: string
  category: { _id: string; title: string; slug: string }
  description?: string
  packSize?: string
  mrp: number
  spiceLevel: number
  isHot: boolean
  isBestseller: boolean
  isAvailable: boolean
  images: any[]
  purchaseLinks: { platformName: string; url: string }[]
  /** Direct image path used by the fallback (no Sanity asset). */
  img: string
}

export const FALLBACK_CATEGORIES: CatalogCategory[] = [
  { _id: 'cat-chips', title: 'Chips', slug: 'chips', tagline: "Kerala's crispiest snacks", displayOrder: 1 },
  { _id: 'cat-murukku', title: 'Murukku', slug: 'murukku', tagline: 'A traditional South Indian classic', displayOrder: 2 },
  { _id: 'cat-mixture', title: 'Mixture', slug: 'mixture', tagline: 'A medley of South Indian flavours', displayOrder: 3 },
  { _id: 'cat-pakkavada', title: 'Pakkavada', slug: 'pakkavada', tagline: 'A Kerala snack house staple', displayOrder: 4 },
  { _id: 'cat-snacks', title: 'Snacks', slug: 'snacks', tagline: 'Roasted & flavoured premium snacks', displayOrder: 5 },
]

const CATEGORY_BY_SLUG = Object.fromEntries(
  FALLBACK_CATEGORIES.map((c) => [c.slug, c])
)

type RawProduct = {
  title: string
  categorySlug: string
  packSize?: string
  mrp?: number
  spiceLevel?: number
  isBestseller?: boolean
  isHot?: boolean
  description?: string
}

const RAW_PRODUCTS: RawProduct[] = [
  // ── CHIPS ──
  { title: 'Banana Chips', categorySlug: 'chips', packSize: '175g', mrp: 120, spiceLevel: 1, isBestseller: true, description: 'Crispy, thin-sliced Nendran banana chips fried in vegetable oil with a hint of salt & turmeric.' },
  { title: 'Ripe Banana Chips', categorySlug: 'chips', packSize: '175g', mrp: 70, spiceLevel: 0, isBestseller: true, description: 'Thinly sliced ripe bananas fried in vegetable oil with salt and natural sweetness. Crunchy, golden brown.' },
  { title: 'Tapioca Chips', categorySlug: 'chips', packSize: '150g', mrp: 70, spiceLevel: 0, isBestseller: true, description: 'Crunchy, traditional Kerala snack made from fresh tapioca & salt. Light & crispy.' },
  { title: 'Masala Tapioca Chips', categorySlug: 'chips', packSize: '150g', mrp: 70, spiceLevel: 2, description: 'Thinly sliced tapioca fried in vegetable oil with chili powder & salt.' },
  { title: 'Potato Chips Spanish Tomato', categorySlug: 'chips', packSize: '70g', mrp: 48, spiceLevel: 1, description: 'Tangy, zesty tomato-flavoured ridged potato chips.' },
  { title: 'Potato Chips Sour Cream & Onion', categorySlug: 'chips', packSize: '70g', mrp: 48, spiceLevel: 1, description: 'Ridged potato chips seasoned with onion powder and salt. Tangy, creamy, savoury.' },
  { title: 'Banana Chips Chilly', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Golden banana chips coated with chilli powder for a spicy kick.' },
  { title: '4 Cut Banana Chips', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 1, description: 'Light golden banana slices cut into four pieces. Crisp texture, characteristic aroma.' },
  { title: '4 Cut Banana Chips Chilli', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Four-piece cut banana chips coated with chilli powder for a spicy punch.' },
  { title: 'Banana Chips Cinnamon', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 0, description: 'Golden banana chips coated with cinnamon powder. Sweet, warm, and aromatic.' },
  { title: 'Banana Chips Pepper', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Classic banana chips coated with black pepper powder for a peppery bite.' },
  { title: 'Banana Chips Cardamom', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 0, description: 'Banana chips coated with fragrant cardamom powder — a traditional Kerala favourite.' },
  { title: 'Banana Chips Dry Ginger', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Banana chips coated with dry ginger powder for a warm, spiced flavour.' },
  { title: 'Banana Lemon Chilli', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Pale banana chips with a lemon aroma and mild chilli taste.' },
  { title: 'Tapioca Slice Peri Peri', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Uniformly sliced tapioca coated with peri peri seasoning. Spicy, aromatic, crunchy.' },
  { title: 'Tapioca Slice Spanish Tomato', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Tapioca slices coated with tangy Spanish tomato seasoning.' },
  { title: 'Bitter Gourd Chips', categorySlug: 'chips', packSize: '340g', mrp: 0, spiceLevel: 1, description: 'Thin bitter gourd slices — crisp, characteristic flavour, packed with fibre.' },

  // ── MURUKKU ──
  { title: 'Coconut Milk Murukku', categorySlug: 'murukku', packSize: '150g', mrp: 75, spiceLevel: 0, isBestseller: true, description: 'Crispy snack from rice powder, gram flour & coconut milk powder with sesame seeds.' },
  { title: 'Butter Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 0, isBestseller: true, description: 'Classic Kerala snack of rice powder, gram flour, urad & butter. Rich, aromatic, crisp.' },
  { title: 'Rice Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 1, isBestseller: true, description: 'Rice flour, gram flour & carom seeds, fried golden and crunchy. Perfect tea-time snack.' },
  { title: 'Kerala Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 3, isHot: true, description: 'A spicy version of the classic murukku with chili powder & cumin. Crispy, spicy bite.' },
  { title: 'Garlic Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 1, description: 'Crispy murukku with a strong garlic flavour. Zesty Kerala snack.' },
  { title: 'Stick Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 2, description: 'Crispy spiral rice flour snack seasoned with cumin, sesame & chilli.' },
  { title: 'Palakk Murukku', categorySlug: 'murukku', packSize: '175g', mrp: 70, spiceLevel: 1, description: 'Crispy spinach murukku with rice flour, black gram & spinach leaves.' },
  { title: 'Tomato Murukku', categorySlug: 'murukku', packSize: '100g', mrp: 45, spiceLevel: 2, description: 'Crispy ribbon-shaped savoury snack with tomato + chili flavour.' },
  { title: 'Onion Masala Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Reddish brown, crisp snack with a characteristic onion aroma and spicy taste.' },
  { title: 'Onion Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Reddish brown, crisp snack with a characteristic onion aroma and spicy taste.' },
  { title: 'Ginger Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Golden brown rod-shaped fried snack with the aroma and taste of ginger and spices.' },
  { title: 'Chit Chilly Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Flower-shaped, reddish-orange, crisp with a spicy chilli kick.' },
  { title: 'Star Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 1, description: 'Star-shaped, golden brown, crisp texture with characteristic aroma and taste.' },
  { title: 'Ring Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 0, description: 'Uniformly ring-shaped, golden brown, crisp with a savoury aroma and taste.' },
  { title: 'Ribbon Masala Vada', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Golden ribbon-shaped crispy snack with a characteristic spicy aroma.' },
  { title: 'Hand Murukku Chilly', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Golden to reddish-brown round crispy snack with a chilli aroma.' },
  { title: 'Chakli Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 1, description: 'Round-shaped, yellow crispy snack with a fried aroma and crunchy texture.' },
  { title: 'Thenkasi Murukku', categorySlug: 'murukku', packSize: '340g', mrp: 0, spiceLevel: 0, description: 'Small round crispy snack, mildly sweet with cardamom.' },

  // ── MIXTURE ──
  { title: 'Kerala Mixture', categorySlug: 'mixture', packSize: '200g', mrp: 70, spiceLevel: 2, isBestseller: true, description: 'Crunchy mix of sev, boondi, peanuts & curry leaves with chilli spice.' },
  { title: 'Garlic Mixture', categorySlug: 'mixture', packSize: '150g', mrp: 55, spiceLevel: 2, description: 'Spicy South Indian chivda with sev, peanuts, garlic & curry leaves.' },
  { title: 'Kerala Mixture Spicy', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 4, isHot: true, description: 'Golden-brown crispy mixed snack with a spicy chilli aroma.' },
  { title: 'Bombay Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Yellow crispy snack with lentils and curry leaves.' },
  { title: 'Garlic Mixture Large', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Golden brown crisp mix with a characteristic garlic aroma and savoury taste.' },
  { title: 'Mysore Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 3, description: 'Small sev, uniformly mixed, crisp, golden yellow colour.' },
  { title: 'Malabar Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 3, description: 'Well-blended mix, golden to brown, crisp with a spicy aroma and taste.' },
  { title: 'Kozhikodan Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true, description: 'Fried, uniformly mixed, crisp, golden yellow to light brown colour.' },
  { title: 'Andhra Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 4, isHot: true, description: 'Uniformly blended, crispy, characteristic colour, taste and aroma.' },
  { title: 'Payyoli Mixture', categorySlug: 'mixture', packSize: '340g', mrp: 0, spiceLevel: 3, description: 'Two types of sev, a mixed crispy snack with a spicy aroma and crunchy texture.' },

  // ── PAKKAVADA ──
  { title: 'Pakkavada', categorySlug: 'pakkavada', packSize: '175g', mrp: 65, spiceLevel: 3, isBestseller: true, isHot: true, description: 'Spicy, ribbon-shaped crispy snack of rice flour, gram flour & chilly powder with curry leaves.' },
  { title: 'Garlic Pakkavada', categorySlug: 'pakkavada', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Golden-yellow, crispy, spiral snack with a characteristic garlic aroma.' },

  // ── SNACKS ──
  { title: 'Roasted Peanuts', categorySlug: 'snacks', packSize: '75g', mrp: 45, spiceLevel: 2, isBestseller: true, description: 'Peanuts coated with gram flour, rice flour and spices, then fried.' },
  { title: 'Masala Peanuts', categorySlug: 'snacks', packSize: '75g', mrp: 45, spiceLevel: 3, isHot: true, description: 'Crunchy masala peanuts coated in chili & curry leaves. High protein tea-time snack.' },
  { title: 'Kara Boondhi', categorySlug: 'snacks', packSize: '340g', mrp: 0, spiceLevel: 2, description: 'Small round crispy snack with peanuts and curry leaves and a spicy aroma.' },
]

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Pick a representative image from /public/products for a fallback product. */
function pickImage(title: string, categorySlug: string): string {
  const t = title.toLowerCase()
  if (t.includes('banana')) return '/products/banana.png'
  if (t.includes('tapioca')) return '/products/tapioca.png'
  if (t.includes('potato')) return '/products/potato-chips.png'
  switch (categorySlug) {
    case 'murukku': return '/products/murukku.png'
    case 'mixture': return '/products/mixture.png'
    case 'pakkavada': return '/products/pakkavada.png'
    case 'snacks': return '/products/mixture.png'
    case 'chips': return '/products/banana.png'
    default: return '/products/banana.png'
  }
}

export const FALLBACK_PRODUCTS: CatalogProduct[] = RAW_PRODUCTS.map((raw) => {
  const cat = CATEGORY_BY_SLUG[raw.categorySlug]
  const slug = slugify(raw.title)
  return {
    _id: `local-${slug}`,
    title: raw.title,
    slug,
    category: { _id: cat._id, title: cat.title, slug: cat.slug },
    description: raw.description,
    packSize: raw.packSize,
    mrp: raw.mrp ?? 0,
    spiceLevel: raw.spiceLevel ?? 0,
    isHot: raw.isHot ?? false,
    isBestseller: raw.isBestseller ?? false,
    isAvailable: true,
    images: [],
    purchaseLinks: [],
    img: pickImage(raw.title, raw.categorySlug),
  }
})
  // Bestsellers first, then alphabetical — matches the Sanity query ordering.
  .sort((a, b) => {
    if (a.isBestseller && !b.isBestseller) return -1
    if (!a.isBestseller && b.isBestseller) return 1
    return a.title.localeCompare(b.title)
  })
