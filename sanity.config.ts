import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = 'dd2wc1hr'
const dataset   = 'production'

export default defineConfig({
  name:    'cochin-snacks',
  title:   'Cochin Snacks CMS',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Categories').schemaType('category').child(
              S.documentTypeList('category').title('Categories'),
            ),
            S.listItem().title('Products').schemaType('product').child(
              S.documentTypeList('product').title('Products'),
            ),
            S.divider(),
            S.listItem().title('Blog Posts').schemaType('blogPost').child(
              S.documentTypeList('blogPost').title('Blog Posts'),
            ),
            S.listItem().title('FAQs').schemaType('faqItem').child(
              S.documentTypeList('faqItem').title('FAQs'),
            ),
            S.listItem().title('Testimonials').schemaType('testimonial').child(
              S.documentTypeList('testimonial').title('Testimonials'),
            ),
            S.divider(),
            S.listItem().title('Partner Enquiries').schemaType('partnerEnquiry').child(
              S.documentTypeList('partnerEnquiry').title('Partner Enquiries'),
            ),
            S.listItem().title('Newsletter Subscribers').schemaType('newsletterSubscriber').child(
              S.documentTypeList('newsletterSubscriber').title('Newsletter Subscribers'),
            ),
            S.listItem().title('Contact Messages').schemaType('contactMessage').child(
              S.documentTypeList('contactMessage').title('Contact Messages'),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
