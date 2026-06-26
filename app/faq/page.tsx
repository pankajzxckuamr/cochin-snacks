import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_FAQS_QUERY } from '@/lib/sanity/queries'
import { HelpCircleIcon } from 'lucide-react'
import FAQAccordion from './FAQAccordion'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Link from 'next/link'

export const metadata = {
  title: 'Frequently Asked Questions | Cochin Snacks',
  description: 'Find answers to common questions about Cochin Snacks ingredients, certifications, shipping, and bulk ordering.',
}

interface FAQItem {
  _id: string
  question: string
  answer: string
  displayOrder: number
}

export const revalidate = 60 // ISR revalidation every 60 seconds

export default async function FAQPage() {
  const faqs = (await sanityFetch<FAQItem[]>(ALL_FAQS_QUERY)) || []

  // Construct FAQPage JSON-LD schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  }

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen bg-off-white text-dark pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Heading & Intro */}
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h1 className="font-heading text-4xl sm:text-5xl font-black text-green-dark mb-4">
                  Frequently Asked Questions
                </h1>
                <div className="w-24 h-1 bg-yellow mx-auto mb-6 rounded-full" />
                <p className="text-dark/60 text-base max-w-lg mx-auto font-body">
                  Have questions about our authentic snacks, distribution network, or ingredients? Explore our answers below.
                </p>
              </div>
            </ScrollReveal>

            {/* Accordion Section */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col gap-6">
                {faqs && faqs.length > 0 ? (
                  <FAQAccordion faqs={faqs} />
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-green-dark/10 shadow-md">
                    <HelpCircleIcon className="w-12 h-12 text-green-brand mx-auto mb-4 opacity-50" />
                    <p className="text-dark/60 font-semibold">No FAQ items found in the database.</p>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Still have questions? CTA Section */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-16 text-center bg-green-dark text-off-white p-8 rounded-2xl relative overflow-hidden shadow-xl border border-green-light/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.1),transparent)] pointer-events-none" />
                <h3 className="font-heading text-2xl sm:text-3xl font-black mb-3">Still have questions?</h3>
                <p className="text-off-white/80 text-sm sm:text-base max-w-md mx-auto mb-6 font-body">
                  We're here to help! Get in touch for product enquiries, export opportunities, or general questions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#FFD600] text-dark font-bold px-8 py-3 rounded-full hover:bg-[#FFE94D] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>

          </div>
        </main>
      </PageTransition>
      <Footer />

      {/* Inject JSON-LD Schema */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}

