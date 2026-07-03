import category            from './category'
import product             from './product'
import blogPost            from './blogPost'
import faqItem             from './faqItem'
import testimonial         from './testimonial'
import country             from './country'
import partnerEnquiry      from './partnerEnquiry'
import newsletterSubscriber from './newsletterSubscriber'
import contactMessage      from './contactMessage'

export const schemaTypes = [
  // Content types (listed in Sanity Studio sidebar order)
  category,
  product,
  country,
  blogPost,
  faqItem,
  testimonial,
  // Form submission records (admin view only)
  partnerEnquiry,
  newsletterSubscriber,
  contactMessage,
]
