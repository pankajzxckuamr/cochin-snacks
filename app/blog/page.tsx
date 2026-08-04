import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, BookOpen, ArrowRight } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { ALL_BLOG_POSTS_QUERY } from '@/lib/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DotPattern from '@/components/ui/DotPattern'
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

      <main id="main-content" className="flex-1 bg-white text-dark">
        {/* Hero — modern cream banner (matches About/Products) */}
        <section className="relative bg-cream overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
              style={{
                WebkitTextStroke: '2px #ffffff',
                fontFamily: 'Impact, "Arial Black", sans-serif',
                filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
              }}
            >
              Cochin Blog
            </h1>
            <p className="text-dark/60 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">
              Traditional recipes and spice stories from our kitchen in Kerala.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-10 sm:pb-20">
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
                      className="bg-white rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-[0_20px_44px_-18px_rgba(45,139,45,0.35)] hover:border-green-brand/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
                    >
                      {/* Image */}
                      <Link href={`/blog/${post.slug}`} className="relative aspect-[15/9] block overflow-hidden bg-cream">
                        <Image
                          src={imageUrl}
                          alt={post.featuredImage?.alt || post.title}
                          width={600}
                          height={360}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.tags && post.tags[0] && (
                          <span className="absolute top-4 left-4 bg-green-brand text-white font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md shadow-green-brand/25">
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
                        <h2 className="font-heading text-lg sm:text-xl font-bold text-dark group-hover:text-green-brand transition-colors leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-dark/60 text-xs sm:text-sm leading-relaxed">
                          {excerpt}
                        </p>

                        {/* Footer Link */}
                        <div className="mt-auto pt-4 border-t border-black/5">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-green-brand hover:text-green-dark uppercase tracking-wider transition-colors group/link"
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
            <div className="text-center py-16 sm:py-20 bg-cream rounded-3xl border border-black/[0.06] shadow-sm max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-7 h-7" />
              </div>
              <h2 className="font-heading text-xl font-black text-dark mb-2">No Articles Yet</h2>
              <p className="text-dark/60 text-sm leading-relaxed mb-6 px-6">
                We are currently crafting some spicy food stories. Please check back soon!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-brand hover:bg-green-dark text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-green-brand/25 hover:-translate-y-0.5 transition-all"
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
