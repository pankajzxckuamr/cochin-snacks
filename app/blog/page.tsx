import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, BookOpen, ArrowRight } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { ALL_BLOG_POSTS_QUERY } from '@/lib/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { generateSeoMetadata } from '@/lib/seo'

interface BlogPost {
  _id: string
  title: string
  slug: string
  author?: string
  publishedAt?: string
  featuredImage?: {
    asset: any
    alt: string
  }
  tags?: string[]
  seoDescription?: string
}

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "Our Blog — Cochin Snacks",
    description: "Traditional recipes, spice guides, and stories behind South Indian flavours. Read the Cochin Snacks blog.",
    path: "/blog",
  })
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>(ALL_BLOG_POSTS_QUERY)

  return (
    <PageTransition>
      <Header />

      <main id="main-content" className="min-h-screen bg-[#FAFAF0] text-dark pb-24">
        {/* Compact Hero Banner */}
        <section className="relative py-16 bg-gradient-to-b from-[#0F0F0F] to-[#1E6B2E] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.12),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-black mb-3">
              Cochin Food &amp; Spice Blog
            </h1>
            <p className="text-[#FFD600] text-sm sm:text-base font-semibold uppercase tracking-wider">
              Traditional recipes, spice guides, and stories behind South Indian flavours
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => {
                const imageUrl = post.featuredImage
                  ? urlFor(post.featuredImage).width(600).format('webp').url() || '/default-snack.svg'
                  : '/default-snack.svg'
                
                // Format date as "DD MMM YYYY"
                const formattedDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      })
                  : 'Recent Post'

                // 120-char excerpt
                const rawExcerpt = post.seoDescription || 'Savour the traditional culinary stories and authentic recipes from the heart of Kerala, prepared with care and love.'
                const excerpt = rawExcerpt.length > 120 
                  ? rawExcerpt.slice(0, 120) + '...'
                  : rawExcerpt

                return (
                  <ScrollReveal key={post._id} direction="up" delay={idx * 0.05}>
                    <article
                      className="bg-white rounded-3xl overflow-hidden border border-green-dark/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
                    >
                      {/* Image */}
                      <Link href={`/blog/${post.slug}`} className="relative aspect-[15/9] block overflow-hidden bg-dark/5">
                        <Image
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          width={600}
                          height={360}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.tags && post.tags[0] && (
                          <span className="absolute top-4 left-4 bg-[#FFD600] text-[#0F0F0F] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                            {post.tags[0]}
                          </span>
                        )}
                      </Link>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1 gap-3">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-dark/45 font-bold uppercase tracking-wider">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-green-brand" />
                            <span>{formattedDate}</span>
                          </div>
                          {post.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-green-brand" />
                              <span>{post.author}</span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1E6B2E] group-hover:text-green-brand transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-dark/70 text-xs sm:text-sm leading-relaxed">
                          {excerpt}
                        </p>

                        {/* Footer Link */}
                        <div className="mt-auto pt-4 border-t border-off-white/80">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-black text-green-dark hover:text-green-brand uppercase tracking-wider transition-colors group/link"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-green-dark/10 shadow-md max-w-xl mx-auto">
              <BookOpen className="w-12 h-12 text-green-brand/45 mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold text-green-dark mb-2">No Articles Found</h2>
              <p className="text-dark/60 text-sm leading-relaxed mb-6">
                We are currently crafting some spicy food stories. Please check back soon!
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-green-dark hover:bg-green-mid text-off-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md inline-block"
              >
                Back to Home
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </PageTransition>
  )
}
