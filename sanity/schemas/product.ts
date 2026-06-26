import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'details',   title: 'Product Details',  default: true },
    { name: 'nutrition', title: 'Nutritional & Legal' },
    { name: 'flags',     title: 'Flags & Visibility' },
    { name: 'seo',       title: 'SEO' },
  ],
  fields: [
    // ── Core ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'details',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'details',
      rows: 4,
    }),
    defineField({
      name: 'packSize',
      title: 'Pack Size',
      type: 'string',
      group: 'details',
      description: 'e.g. "175g", "340g"',
    }),
    defineField({
      name: 'mrp',
      title: 'MRP (INR)',
      type: 'number',
      group: 'details',
      description: 'Set to 0 if not publicly listed (bulk / B2B)',
      initialValue: 0,
    }),
    defineField({
      name: 'spiceLevel',
      title: 'Spice Level (0–5)',
      type: 'number',
      group: 'details',
      description: '0 = No spice, 5 = Extremely hot',
      validation: (Rule) => Rule.min(0).max(5).integer(),
      initialValue: 0,
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility & SEO',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      // min 5 as a warning so the studio highlights it; seeding with 0 is allowed
      validation: (Rule) =>
        Rule.min(5).warning('Add at least 5 images for this product'),
    }),

    // ── Nutritional & Legal ───────────────────────────────────────────────────
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
      group: 'nutrition',
      description: 'Comma-separated ingredients list',
      rows: 3,
    }),
    defineField({
      name: 'nutritionalInfo',
      title: 'Nutritional Information',
      type: 'text',
      group: 'nutrition',
      description: 'Formatted nutritional block, e.g. "Per 100g: Calories 484kcal | Fat 28g …"',
      rows: 4,
    }),
    defineField({
      name: 'shelfLife',
      title: 'Shelf Life',
      type: 'string',
      group: 'nutrition',
      description: 'e.g. "3 MONTHS"',
      initialValue: '3 MONTHS',
    }),
    defineField({
      name: 'storageInstructions',
      title: 'Storage Instructions',
      type: 'string',
      group: 'nutrition',
      initialValue:
        'Once the pack is open, store the content in an airtight container, away from direct sunlight.',
    }),
    defineField({
      name: 'countryOfOrigin',
      title: 'Country of Origin',
      type: 'string',
      group: 'nutrition',
      initialValue: 'India',
    }),
    defineField({
      name: 'fssaiNumber',
      title: 'FSSAI Number',
      type: 'string',
      group: 'nutrition',
      initialValue: '11324007000398',
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'string',
      group: 'nutrition',
      initialValue:
        'PAVITHRAM SNACKS, Mullankunnu, PO. Ponjassery, Ernakulam, Kerala - 683547',
    }),

    // ── Flags ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'isAvailable',
      title: 'Available?',
      type: 'boolean',
      group: 'flags',
      initialValue: true,
      description: 'Uncheck to hide from the storefront',
    }),
    defineField({
      name: 'isBestseller',
      title: 'Bestseller?',
      type: 'boolean',
      group: 'flags',
      initialValue: false,
    }),
    defineField({
      name: 'isHot',
      title: 'Hot / Spicy Badge?',
      type: 'boolean',
      group: 'flags',
      initialValue: false,
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'packSize',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: subtitle ? `Pack: ${subtitle}` : '', media }
    },
  },
})
