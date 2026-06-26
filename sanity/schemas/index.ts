import category            from './category'
import product             from './product'
import blogPost            from './blogPost'
import faqItem             from './faqItem'
import testimonial         from './testimonial'
import partnerEnquiry      from './partnerEnquiry'
import newsletterSubscriber from './newsletterSubscriber'
import contactMessage      from './contactMessage'

export const schemaTypes = [
  // Content types (listed in Sanity Studio sidebar order)
  category,
  product,
  blogPost,
  faqItem,
  testimonial,
  // Form submission records (admin view only)
  partnerEnquiry,
  newsletterSubscriber,
  contactMessage,
]
