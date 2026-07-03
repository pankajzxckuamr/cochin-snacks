import { defineType, defineField } from 'sanity'

const PARTNER_TYPES = [
  { title: 'Distributor',  value: 'Distributor'  },
  { title: 'Retailer',     value: 'Retailer'     },
  { title: 'Importer',     value: 'Importer'     },
  { title: 'Wholesaler',   value: 'Wholesaler'   },
  { title: 'Supermarket',  value: 'Supermarket'  },
  { title: 'Food Service', value: 'Food Service' },
]

export default defineType({
  name: 'partnerEnquiry',
  title: 'Partner Enquiry',
  type: 'document',
  // Read-only document — populated by the contact form API route
  fields: [
    defineField({ name: 'name',        title: 'Name',         type: 'string'   }),
    defineField({ name: 'company',     title: 'Company',      type: 'string'   }),
    defineField({ name: 'country',     title: 'Country',      type: 'string'   }),
    defineField({ name: 'email',       title: 'Email',        type: 'string'   }),
    defineField({ name: 'phone',       title: 'Phone',        type: 'string'   }),
    defineField({
      name: 'partnerType',
      title: 'Partner Type',
      type: 'string',
      options: { list: PARTNER_TYPES, layout: 'radio' },
    }),
    defineField({ name: 'message',     title: 'Message',      type: 'text', rows: 5 }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
    },
    prepare({ title, subtitle }: any) {
      return { title: title ?? '(unnamed)', subtitle: subtitle ?? '' }
    },
  },
})
