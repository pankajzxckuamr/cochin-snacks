/**
 * scripts/seed.mjs
 *
 * Seeds Sanity with categories, products, and FAQs.
 *
 * Prerequisites:
 *   1. Fill in .env.local (NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN with Editor role)
 *   2. npm install sanity @sanity/vision --legacy-peer-deps
 *
 * Usage:
 *   node scripts/seed.mjs
 *
 * Safe to re-run: checks for existing docs and skips creation if found.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Load .env.local ─────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
try {
  const envPath = resolve(__dirname, '..', '.env.local')
  const content = readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/)
    if (m) process.env[m[1].trim()] = m[2].trim()
  }
} catch {
  console.warn('⚠  Could not load .env.local — using existing environment variables.')
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN      = process.env.SANITY_API_TOKEN

if (!PROJECT_ID || !TOKEN) {
  console.error('❌  Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2024-01-01',
  token:     TOKEN,
  useCdn:    false,
})

// ── Shared defaults ──────────────────────────────────────────────────────────
const DEFAULTS = {
  countryOfOrigin: 'India',
  fssaiNumber:     '11324007000398',
  manufacturer:    'PAVITHRAM SNACKS, Mullankunnu, PO. Ponjassery, Ernakulam, Kerala - 683547',
  storageInstructions:
    'Once the pack is open, store the content in an airtight container, away from direct sunlight.',
  shelfLife:   '3 MONTHS',
  isAvailable: true,
  isHot:       false,
  isBestseller: false,
  mrp:         0,
  spiceLevel:  0,
  images:      [],
}

// ── Category data ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { title: 'Chips',     slug: 'chips',     tagline: "Kerala's crispiest snacks",         displayOrder: 1 },
  { title: 'Murukku',   slug: 'murukku',   tagline: 'A traditional South Indian classic', displayOrder: 2 },
  { title: 'Mixture',   slug: 'mixture',   tagline: 'A medley of South Indian flavours',  displayOrder: 3 },
  { title: 'Pakkavada', slug: 'pakkavada', tagline: 'A Kerala snack house staple',        displayOrder: 4 },
  { title: 'Snacks',    slug: 'snacks',    tagline: 'Roasted & flavoured premium snacks', displayOrder: 5 },
]

// ── Product data ─────────────────────────────────────────────────────────────
// categorySlug is resolved to a Sanity reference after categories are created.
const RAW_PRODUCTS = [
  // ── CHIPS ──────────────────────────────────────────────────────────────────
  {
    title: 'Banana Chips',
    categorySlug: 'chips',
    packSize: '175g', mrp: 120, spiceLevel: 1, isBestseller: true,
    description: 'Crispy, thin-sliced Nendran banana chips fried in vegetable oil with a hint of salt & turmeric.',
    ingredients: 'Raw Banana, Turmeric Powder, Salt, Vegetable Oil',
    nutritionalInfo: 'Per 100g: Calories 484kcal | Fat 28g | Saturated Fat 6g | Carbs 56g | Fibre 5.2g | Sugar 1.8g | Protein 2g | Calcium 260mg | Potassium 398mg | Iron 0.4mg',
  },
  {
    title: 'Ripe Banana Chips',
    categorySlug: 'chips',
    packSize: '175g', mrp: 70, spiceLevel: 0, isBestseller: true,
    description: 'Thinly sliced ripe bananas fried in vegetable oil with salt and natural sweetness from ripe bananas. Crunchy texture with golden brown colour.',
    ingredients: 'Ripe Banana, Salt, Vegetable Oil',
    nutritionalInfo: 'Per 100g: Calories 396kcal | Fat 24g | Saturated Fat 10.9g | Carbs 43g | Fibre 5.5g | Sugar 16g | Protein 2g | Calcium 167mg | Potassium 402mg',
  },
  {
    title: 'Tapioca Chips',
    categorySlug: 'chips',
    packSize: '150g', mrp: 70, spiceLevel: 0, isBestseller: true,
    description: 'Crunchy, traditional Kerala snack made from fresh tapioca & salt. Light & crispy, fried in vegetable oil.',
    ingredients: 'Fresh Tapioca, Salt, Vegetable Oil',
    nutritionalInfo: 'Per 100g: Calories 478kcal | Fat 27g | Carbs 56g | Fibre 4.2g | Protein 2g | Calcium 121mg | Potassium 390mg | Iron 3mg',
  },
  {
    title: 'Masala Tapioca Chips',
    categorySlug: 'chips',
    packSize: '150g', mrp: 70, spiceLevel: 2,
    description: 'Thinly sliced tapioca fried in vegetable oil with chili powder & salt.',
    ingredients: 'Tapioca, Chilli Powder, Salt, Vegetable Oil',
    nutritionalInfo: 'Per 100g: Calories 492kcal | Fat 23g | Carbs 64g | Fibre 4.4g | Protein 3.8g | Potassium 380mg | Iron 6mg',
  },
  {
    title: 'Potato Chips Spanish Tomato',
    categorySlug: 'chips',
    packSize: '70g', mrp: 48, spiceLevel: 1,
    description: 'Tangy, zesty tomato-flavored ridged chips. Crunchy potato chips with tomato powder.',
    ingredients: 'Potato, Salt, Vegetable Oil, Tomato Powder',
    nutritionalInfo: 'Per 50g: Calories 268kcal | Fat 18g | Carbs 29g | Fibre 1.6g | Sugar 1.4g | Protein 3.6g | Vitamin C 6.5mg | Potassium 643mg',
  },
  {
    title: 'Potato Chips Sour Cream & Onion',
    categorySlug: 'chips',
    packSize: '70g', mrp: 48, spiceLevel: 1,
    description: 'Ridged potato chips fried in vegetable oil and seasoned with onion powder and salt. Tangy, creamy taste with savory onion notes.',
    ingredients: 'Potato, Salt, Vegetable Oil, Milk Solids, Onion Powder',
    nutritionalInfo: 'Per 50g: Calories 244kcal | Fat 16g | Carbs 28g | Fibre 1.9g | Sugar 2.7g | Protein 3.3g | Vitamin C 31.2mg | Potassium 93mg',
  },
  {
    title: 'Banana Chips Chilly',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Golden banana chips coated with chilli powder for a spicy kick.',
    ingredients: 'Raw Banana, Turmeric Powder, Chilli Powder, Salt, Vegetable Oil',
  },
  {
    title: '4 Cut Banana Chips',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 1,
    description: 'Light yellow to golden banana slices cut into four pieces. Crisp texture, characteristic aroma.',
    ingredients: 'Raw Banana, Turmeric Powder, Salt, Vegetable Oil',
  },
  {
    title: '4 Cut Banana Chips Chilli',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Four-piece cut banana chips coated with chilli powder for a spicy punch.',
    ingredients: 'Raw Banana, Turmeric Powder, Chilli Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Banana Chips Cinnamon',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 0,
    description: 'Golden banana chips coated with cinnamon powder. Sweet, warm, and aromatic.',
    ingredients: 'Raw Banana, Turmeric Powder, Cinnamon Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Banana Chips Pepper',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Classic banana chips coated with black pepper powder for a peppery bite.',
    ingredients: 'Raw Banana, Turmeric Powder, Pepper Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Banana Chips Cardamom',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 0,
    description: 'Banana chips coated with fragrant cardamom powder — a traditional Kerala favourite.',
    ingredients: 'Raw Banana, Turmeric Powder, Cardamom Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Banana Chips Dry Ginger',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Banana chips coated with dry ginger powder for a warm, spiced flavour.',
    ingredients: 'Raw Banana, Turmeric Powder, Dry Ginger Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Banana Lemon Chilli',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Pale yellow banana chips with a characteristic lemon aroma and mild chilli taste.',
    ingredients: 'Raw Banana, Turmeric Powder, Lemon Chilli Flavour, Salt, Vegetable Oil',
  },
  {
    title: 'Tapioca Slice Peri Peri',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Uniformly sliced tapioca coated with peri peri seasoning. Spicy, aromatic, crunchy.',
    ingredients: 'Fresh Tapioca, Salt, Vegetable Oil, Peri Peri Flavour',
  },
  {
    title: 'Tapioca Slice Spanish Tomato',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Tapioca slices coated with tangy Spanish tomato seasoning.',
    ingredients: 'Fresh Tapioca, Vegetable Oil, Salt, Spanish Tomato Flavour',
  },
  {
    title: 'Bitter Gourd Chips',
    categorySlug: 'chips',
    packSize: '340g', mrp: 0, spiceLevel: 1,
    description: 'Thin dark brown bitter gourd slices — crisp, characteristic flavour, packed with dietary fibre.',
    ingredients: 'Bitter Gourd, Corn Flour, Chilli Powder, Salt, Vegetable Oil',
  },

  // ── MURUKKU ────────────────────────────────────────────────────────────────
  {
    title: 'Coconut Milk Murukku',
    categorySlug: 'murukku',
    packSize: '150g', mrp: 75, spiceLevel: 0, isBestseller: true,
    shelfLife: '2 MONTHS',
    description: 'Crispy snack made from rice powder, gram flour & coconut milk powder, fried in vegetable oil with sesame seeds & a touch of sugar & salt. 100% vegetarian.',
    ingredients: 'Rice Flour, Salt, Vegetable Oil, Coconut Milk, Coconut Milk Powder, Sugar',
    nutritionalInfo: 'Per 100g: Calories 610kcal | Fat 24g | Saturated Fat 7.8g | Carbs 61g | Fibre 1.8g | Protein 5.5g | Iron 1.8mg | Calcium 120mg',
  },
  {
    title: 'Butter Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 0, isBestseller: true,
    description: 'A classic Kerala snack from rice powder, gram flour, urad & butter. Mixed with sesame seeds, fried to a crisp flavorful spiral. The addition of butter gives it a rich, aromatic taste.',
    ingredients: 'Rice Flour, Butter, Gram Flour, Vegetable Oil, Cumin Seed, Sesame Seeds, Salt',
    nutritionalInfo: 'Per 100g: Calories 475kcal | Fat 24g | Carbs 60g | Fibre 3.3g | Protein 3.8g | Iron 3mg | Calcium 121mg',
  },
  {
    title: 'Rice Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 1, isBestseller: true,
    description: 'Prepared from rice flour, gram flour, starch powder, carom seeds, salt & sesame seeds. Fried golden and crunchy. Carom seeds add a subtle aroma and aid digestion. Perfect tea-time snack.',
    ingredients: 'Rice Powder, Gram Flour, Black Sesame Seed, Cumin Seed, Carom Seed, Vegetable Oil, Salt',
    nutritionalInfo: 'Per 100g: Calories 490kcal | Fat 24g | Carbs 64g | Fibre 1.8g | Protein 6.5g | Iron 1.8mg | Calcium 63mg',
  },
  {
    title: 'Kerala Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 3, isHot: true,
    description: 'A spicy version of the classic murukku. Made from rice powder, gram flour & urad, flavored with chili powder & cumin seed. Crispy, spicy bite with aromatic flavor.',
    ingredients: 'Rice Flour, Gram Flour, Carom Seeds, Cumin Seeds, Sesame Seeds, Chilli Powder, Vegetable Oil, Salt',
    nutritionalInfo: 'Per 100g: Calories 447kcal | Fat 22g | Carbs 63g | Fibre 2.5g | Protein 6g | Iron 2mg | Calcium 121mg',
  },
  {
    title: 'Garlic Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 1,
    description: 'Crispy murukku with a strong garlic flavor. Made with rice powder, gram flour & garlic for a zesty Kerala snack.',
    ingredients: 'Rice Flour, Gram Flour, Garlic, Vegetable Oil, Salt',
    nutritionalInfo: 'Per 100g: Calories 455kcal | Fat 23g | Carbs 57g | Fibre 6g | Protein 9g | Iron 3mg | Calcium 122mg',
  },
  {
    title: 'Stick Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 2,
    description: 'Crispy spiral rice flour snack seasoned with cumin, sesame & chilli.',
    ingredients: 'Rice Powder, Gram Flour, Starch Powder, Chilli Powder, Sesame Seed, Cumin Seed, Carom Seeds, Salt, Vegetable Oil',
    nutritionalInfo: 'Per 100g: Calories 461.8kcal | Fat 21g | Carbs 62g | Fibre 2g | Protein 6.6g | Iron 3mg | Calcium 88mg',
  },
  {
    title: 'Palakk Murukku',
    categorySlug: 'murukku',
    packSize: '175g', mrp: 70, spiceLevel: 1,
    description: 'Crispy spinach murukku made with rice flour, black gram & spinach leaves. Green, flavorful twist on traditional murukku.',
    ingredients: 'Rice Flour, Black Gram, Coriander, Jeera, Spinach Leaves, Salt, Vegetable Oil',
  },
  {
    title: 'Tomato Murukku',
    categorySlug: 'murukku',
    packSize: '100g', mrp: 45, spiceLevel: 2,
    description: 'Crispy ribbon-shaped savory snack with tomato + chili flavor.',
    ingredients: 'Rice Flour, Gram Flour, Urad Dal Flour, Refined Flour, Tomato Powder, Red Chili Powder, Corn Flour, Vegetable Oil, Salt',
    nutritionalInfo: 'Per 50g: Calories 401kcal | Fat 21g | Carbs 47g | Fibre 1.4g | Protein 6.5g | Iron 5.6mg | Potassium 344mg',
  },
  {
    title: 'Onion Masala Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Reddish brown, crisp snack with a characteristic onion aroma and spicy taste.',
    ingredients: 'Rice Flour, Vegetable Oil, Gram Flour, Onion, Blended Masala, Salt, Chilli Powder',
    nutritionalInfo: 'Per 68g: Calories 360 | Fat 20g | Carbs 39g | Fibre 3g | Protein 5g | Sodium 380mg',
  },
  {
    title: 'Onion Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Reddish brown, crisp snack with a characteristic onion aroma and spicy taste.',
    ingredients: 'Rice Flour, Vegetable Oil, Gram Flour, Onion, Salt, Chilli Powder',
    nutritionalInfo: 'Per 68g: Calories 340 | Fat 18.5g | Carbs 38g | Fibre 2.5g | Protein 5g | Sodium 390mg',
  },
  {
    title: 'Ginger Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Golden brown rod-shaped fried snack with characteristic aroma and taste of ginger and spices.',
    ingredients: 'Rice Flour, Ginger, Gram Flour, Chilli Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Chit Chilly Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Flower-shaped, evenly fried, reddish-orange in colour. Crisp with a spicy chilli kick.',
    ingredients: 'Rice Flour, Gram Flour, Chilli Powder, Sesame Seed, Carom Seed, Cumin Seed, Blended Masala, Salt, Vegetable Oil',
  },
  {
    title: 'Star Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 1,
    description: 'Star-shaped, golden brown, crisp texture with characteristic aroma and taste.',
    ingredients: 'Rice Flour, Gram Flour, Fried Chickpeas Flour, Red Chilli Powder, Salt, Vegetable Oil',
  },
  {
    title: 'Ring Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 0,
    description: 'Uniformly ring-shaped, golden brown, crisp with a characteristic savoury aroma and taste.',
    ingredients: 'Rice Flour, Gram Flour, Cumin Seeds, Sesame Seeds, Carom Seed, Salt, Vegetable Oil',
  },
  {
    title: 'Ribbon Masala Vada',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Golden-yellow to light brown, flat ribbon-shaped crispy snack with a characteristic spicy aroma.',
    ingredients: 'Rice Flour, Gram Flour, Chilli Powder, Asafoetida, Tapioca Flour, Curry Leaves, Blended Masala, Salt, Vegetable Oil',
  },
  {
    title: 'Hand Murukku Chilly',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Light golden to reddish-brown, medium round-shaped crispy snack with a characteristic chilli aroma.',
    ingredients: 'Rice Flour, Gram Flour, Chilli Powder, Sesame Seed, Salt, Vegetable Oil',
  },
  {
    title: 'Chakli Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 1,
    description: 'Round-shaped, yellow-coloured crispy snack with a characteristic fried aroma and crunchy texture.',
    ingredients: 'Rice Flour, Gram Flour, Cumin Seeds, Sesame Seeds, Carom Seed, Salt, Vegetable Oil',
  },
  {
    title: 'Thenkasi Murukku',
    categorySlug: 'murukku',
    packSize: '340g', mrp: 0, spiceLevel: 0,
    description: 'White to off-white, small round-shaped crispy snack with a characteristic fried aroma. Mildly sweet with cardamom.',
    ingredients: 'Rice Flour, Gram Flour, Salt, Vegetable Oil, Sugar, Cardamom Powder',
  },

  // ── MIXTURE ────────────────────────────────────────────────────────────────
  {
    title: 'Kerala Mixture',
    categorySlug: 'mixture',
    packSize: '200g', mrp: 70, spiceLevel: 2, isBestseller: true,
    description: 'Crunchy mix of sev, boondi, peanuts & curry leaves with chilli spice.',
    ingredients: 'Rice Powder, Vegetable Oil, Peanut, Gram Flour, Salt, Pepper & Chilli Powder, Asafoetida, Curry Leaves',
    nutritionalInfo: 'Per 100g: Calories 458kcal | Fat 26g | Carbs 39g | Fibre 6.2g | Protein 16g | Iron 3mg | Calcium 121mg',
  },
  {
    title: 'Garlic Mixture',
    categorySlug: 'mixture',
    packSize: '150g', mrp: 55, spiceLevel: 2,
    description: 'Spicy South Indian chivda with sev, peanuts, garlic & curry leaves. Crunchy tea-time snack.',
    ingredients: 'Peanuts, Gram Flour, Rice Powder, Tapioca Powder, Chilli Powder, Asafoetida, Garlic Powder, Garlic, Curry Leaves, Vegetable Oil',
  },
  {
    title: 'Kerala Mixture Spicy',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 4, isHot: true,
    description: 'Golden to reddish-brown crispy mixed snack with characteristic spicy chilli aroma, containing sev, peanuts, roasted gram and curry leaves.',
    ingredients: 'Rice Flour, Vegetable Oil, Gram Flour, Peanut, Chilli Powder, Salt, Blended Masala, Curry Leaf, Asafoetida',
  },
  {
    title: 'Bombay Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Yellow coloured crispy snack containing lentils and curry leaves with a characteristic aroma.',
    ingredients: 'Rice Flour, Gram Flour, Tapioca Flour, Masoor Dal, Salt, Asafoetida, Curry Leaves, Black Salt, Chilli Powder, Turmeric Powder, Vegetable Oil',
  },
  {
    title: 'Garlic Mixture Large',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Properly blended mix of fried ingredients, golden brown, crisp texture with characteristic garlic aroma and savoury taste.',
    ingredients: 'Rice Flour, Gram Flour, Tapioca Flour, Salt, Chilli Powder, Garlic, Garlic Powder, Blended Masala, Turmeric Powder, Peanut, Curry Leaves, Asafoetida, Vegetable Oil',
  },
  {
    title: 'Mysore Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 3,
    description: 'Small sev, uniformly mixed, crisp texture, golden yellow colour.',
    ingredients: 'Rice Flour, Gram Flour, Chilli Powder, Salt, Peanuts, Asafoetida, Blended Masala, Curry Leaves, Vegetable Oil',
  },
  {
    title: 'Malabar Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 3,
    description: 'Well-blended mix, golden to brown colour, crisp texture with characteristic spicy aroma and taste.',
    ingredients: 'Rice Flour, Gram Flour, Gram Split, Chilli Powder, Turmeric Powder, Blended Masala, Salt, Asafoetida, Curry Leaves, Peanuts, Vegetable Oil',
  },
  {
    title: 'Kozhikodan Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 3, isHot: true,
    description: 'Fried, uniformly mixed, crisp texture, characteristic golden yellow to light brown colour.',
    ingredients: 'Rice Flour, Gram Flour, Peanuts, Chilli Powder, Salt, Curry Leaves, Asafoetida, Split Gram, Blended Masala, Vegetable Oil',
  },
  {
    title: 'Andhra Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 4, isHot: true,
    description: 'Uniformly blended, crispy texture, characteristic colour, taste and aroma.',
    ingredients: 'Rice Flour, Gram Flour, Roasted Gram, Chilli Powder, Salt, Blended Masala, Asafoetida, Curry Leaves, Corn Flakes, Peanuts, Vegetable Oil',
  },
  {
    title: 'Payyoli Mixture',
    categorySlug: 'mixture',
    packSize: '340g', mrp: 0, spiceLevel: 3,
    description: 'Two types of sev (two colours), a mixed crispy snack with characteristic spicy aroma and crunchy texture.',
    ingredients: 'Rice Flour, Gram Flour, Tapioca Flour, Chilli Powder, Turmeric Powder, Salt, Blended Masala, Peanut, Curry Leaves, Asafoetida, Vegetable Oil',
  },

  // ── PAKKAVADA ──────────────────────────────────────────────────────────────
  {
    title: 'Pakkavada',
    categorySlug: 'pakkavada',
    packSize: '175g', mrp: 65, spiceLevel: 3, isBestseller: true, isHot: true,
    description: 'Spicy, ribbon-shaped crispy snack made with rice flour, gram flour & chilly powder. Loaded with curry leaves for authentic flavor.',
    ingredients: 'Rice Flour, Gram Flour, Chilly Powder, Asafoetida, Salt, Vegetable Oil, Curry Leaves',
    nutritionalInfo: 'Per 100g: Calories 448kcal | Fat 28g | Carbs 39g | Fibre 3.1g | Protein 7.4g | Vitamin C 27mg | Vitamin A 140mcg | Iron 1.7mg | Calcium 71mg',
  },
  {
    title: 'Garlic Pakkavada',
    categorySlug: 'pakkavada',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Golden-yellow, crispy, spiral-shaped snack with characteristic garlic aroma and crunchy texture.',
    ingredients: 'Gram Flour, Rice Flour, Turmeric Powder, Garlic, Asafoetida, Salt, Curry Leaf, Vegetable Oil',
  },

  // ── SNACKS ─────────────────────────────────────────────────────────────────
  {
    title: 'Roasted Peanuts',
    categorySlug: 'snacks',
    packSize: '75g', mrp: 45, spiceLevel: 2, isBestseller: true,
    description: 'Peanuts coated with gram flour, rice flour and a blend of spices including chili powder, then fried in vegetable oil.',
    ingredients: 'Peanuts, Gram Flour, Rice Flour, Salt, Vegetable Oil, Chili Powder',
    nutritionalInfo: 'Per 75g: Calories 463kcal | Fat 38g | Carbs 18g | Fibre 6g | Protein 18g | Iron 1mg | Calcium 43.6mg',
  },
  {
    title: 'Masala Peanuts',
    categorySlug: 'snacks',
    packSize: '75g', mrp: 45, spiceLevel: 3, isHot: true,
    description: 'Crunchy masala peanuts coated in chili & curry leaves. High protein, high fiber tea-time snack.',
    ingredients: 'Peanuts, Salt, Chili Powder, Asafoetida, Curry Leaves, Vegetable Oil',
    nutritionalInfo: 'Per 75g: Calories 410kcal | Fat 34g | Carbs 19g | Fibre 5.8g | Protein 16g | Iron 2.9mg | Calcium 57.6mg',
  },
  {
    title: 'Kara Boondhi',
    categorySlug: 'snacks',
    packSize: '340g', mrp: 0, spiceLevel: 2,
    description: 'Golden-yellow to light brown, small round crispy snack containing peanuts and curry leaves, with characteristic spicy aroma.',
    ingredients: 'Gram Flour, Salt, Peanut, Chilli Powder, Turmeric Powder, Gram Split, Vegetable Oil, Curry Leaves',
  },
]

// ── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: 'What products does Cochin Snacks offer?',
    answer: 'We offer a wide range of traditional Kerala snacks, including banana chips, tapioca chips, mixtures, murukku, pakkavada, and more.',
    displayOrder: 1,
  },
  {
    question: 'Are your snacks suitable for gifting?',
    answer: 'Yes. Many of our products are ideal for festive gifting, family occasions, and special celebrations.',
    displayOrder: 2,
  },
  {
    question: 'Do you export internationally?',
    answer: 'Yes. We work with export partners and distributors in multiple international markets including the United States, United Kingdom, Germany, Netherlands, Norway, Sweden, Canada, Ireland, Australia, UAE, and many more.',
    displayOrder: 3,
  },
  {
    question: 'How can I become a distributor?',
    answer: 'Simply submit the distributor enquiry form on our website and our team will contact you.',
    displayOrder: 4,
  },
  {
    question: 'Are your snacks made with authentic Kerala recipes?',
    answer: 'Yes. Every product is made using traditional Kerala recipes combined with modern hygienic manufacturing standards.',
    displayOrder: 5,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Seed function ─────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌱 Seeding Sanity project "${PROJECT_ID}" (dataset: ${DATASET})\n`)

  // 1. Categories
  console.log('📁 Creating categories…')
  const categoryMap = {}

  for (const cat of CATEGORIES) {
    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug: cat.slug },
    )

    if (existing) {
      console.log(`   ⏭  Skipped (exists): ${cat.title}`)
      categoryMap[cat.slug] = existing
      continue
    }

    const doc = {
      _type: 'category',
      title: cat.title,
      slug:  { _type: 'slug', current: cat.slug },
      tagline: cat.tagline,
      displayOrder: cat.displayOrder,
    }

    const result = await client.create(doc)
    categoryMap[cat.slug] = result._id
    console.log(`   ✅  Created: ${cat.title}`)
  }

  // 2. Products
  console.log('\n📦 Creating products…')
  let created = 0, skipped = 0

  for (const raw of RAW_PRODUCTS) {
    const titleSlug = slugify(raw.title)
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]._id`,
      { slug: titleSlug },
    )

    if (existing) {
      console.log(`   ⏭  Skipped (exists): ${raw.title}`)
      skipped++
      continue
    }

    const { categorySlug, ...rest } = raw
    const categoryId = categoryMap[categorySlug]

    if (!categoryId) {
      console.warn(`   ⚠  No category found for slug "${categorySlug}" — skipping ${raw.title}`)
      continue
    }

    const doc = {
      _type: 'product',
      ...DEFAULTS,
      ...rest,
      slug: { _type: 'slug', current: titleSlug },
      category: { _type: 'reference', _ref: categoryId },
      // Override shelf life for Coconut Milk Murukku
      shelfLife: rest.shelfLife ?? DEFAULTS.shelfLife,
    }

    await client.create(doc)
    console.log(`   ✅  Created: ${raw.title}`)
    created++
  }

  // 3. FAQs
  console.log('\n❓ Creating FAQs…')
  for (const faq of FAQS) {
    const existing = await client.fetch(
      `*[_type == "faqItem" && question == $q][0]._id`,
      { q: faq.question },
    )

    if (existing) {
      console.log(`   ⏭  Skipped (exists): FAQ #${faq.displayOrder}`)
      continue
    }

    await client.create({ _type: 'faqItem', ...faq })
    console.log(`   ✅  Created: FAQ #${faq.displayOrder}`)
  }

  console.log(`
✨ Seed complete!
   Categories : ${CATEGORIES.length}
   Products   : ${created} created, ${skipped} skipped
   FAQs       : ${FAQS.length}

📌 Next steps:
   1. Visit /studio to add product images (≥5 per product required).
   2. Run: npx sanity deploy  (to publish the hosted Studio)
`)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
