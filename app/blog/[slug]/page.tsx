import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { sanityFetch, urlFor } from '@/lib/sanity/client'
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Calendar, User, ArrowLeft, Tag, BookOpen } from 'lucide-react'

// Custom query to fetch related posts
const RELATED_POSTS_QUERY = groq`
  *[_type == "blogPost" && slug.current != $currentSlug] | order(publishedAt desc)[0...2] {
    _id,
    title,
    "slug": slug.current,
    author,
    publishedAt,
    featuredImage { asset, alt },
    tags,
    seoDescription
  }
`

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
  body?: any[]
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

import { generateSeoMetadata } from '@/lib/seo'

export const revalidate = 60 // ISR revalidation every 60 seconds

export async function generateStaticParams() {
  const posts = await sanityFetch<Array<{ slug: string }>>(groq`
    *[_type == "blogPost"] {
      "slug": slug.current
    }
  `)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await sanityFetch<BlogPost>(BLOG_POST_BY_SLUG_QUERY, { slug: params.slug })
  if (!post) {
    return generateSeoMetadata({
      title: 'Article Not Found | Cochin Snacks',
      description: 'The requested Cochin Snacks blog post could not be found.',
      path: `/blog/${params.slug}`,
    })
  }

  const title = post.seoTitle || `${post.title} — Cochin Snacks`
  const description = post.seoDescription || `Read about "${post.title}" on the Cochin Snacks blog.`
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).format('webp').url() : '/og-image.png'

  return generateSeoMetadata({
    title,
    description,
    path: `/blog/${params.slug}`,
    ogImage: imageUrl || '/og-image.png',
    ogType: 'article',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await sanityFetch<BlogPost>(BLOG_POST_BY_SLUG_QUERY, { slug: params.slug })

  if (!post) {
    notFound()
  }

  // Fetch 2 related posts
  const relatedPosts = await sanityFetch<any[]>(RELATED_POSTS_QUERY, {
    currentSlug: params.slug,
  })

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).format('webp').url() || '/default-snack.svg'
    : '/default-snack.svg'
  
  // Format date as "DD MMM YYYY"
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Recent Post'

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': imageUrl,
    'datePublished': post.publishedAt || '',
    'author': {
      '@type': 'Person',
      'name': post.author || 'Cochin Snacks Writer',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Cochin Snacks',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://cochinsnacks.com/logo.png',
      },
    },
    'description': post.seoDescription || '',
  }

  // Render Portable Text Blocks
  const renderPortableText = (body: any[] | undefined) => {
    if (!body || !Array.isArray(body)) return null

    return body.map((block: any) => {
      if (block._type === 'block') {
        const text = (block.children || []).map((child: any) => {
          let content = child.text
          if (child.marks?.includes('strong')) {
            content = <strong key={child._key} className="font-extrabold text-[#1E6B2E]">{content}</strong>
          }
          if (child.marks?.includes('em')) {
            content = <em key={child._key} className="italic text-green-mid">{content}</em>
          }
          return content
        })

        switch (block.style) {
          case 'h2':
            return (
              <h2 key={block._key} className="font-heading text-2xl sm:text-3xl font-black text-[#1E6B2E] mt-10 mb-4 leading-tight">
                {text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={block._key} className="font-heading text-xl sm:text-2xl font-bold text-[#1E6B2E] mt-8 mb-3 leading-snug">
                {text}
              </h3>
            )
          case 'blockquote':
            return (
              <blockquote key={block._key} className="border-l-4 border-[#FFD600] bg-[#1E6B2E]/5 py-4 px-6 rounded-r-2xl italic my-6 text-dark/80 text-lg leading-relaxed">
                {text}
              </blockquote>
            )
          default:
            return (
              <p key={block._key} className="text-dark/80 text-sm sm:text-base leading-relaxed mb-6 font-body">
                {text}
              </p>
            )
        }
      }

      if (block._type === 'image') {
        const imageUrl = urlFor(block).width(800).format('webp').url()
        if (imageUrl) {
          return (
            <figure key={block._key} className="my-8 flex flex-col gap-2">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-green-dark/10 bg-dark/5">
                <Image src={imageUrl} alt={block.alt || 'Post illustration'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px" className="object-cover" />
              </div>
              {block.caption && (
                <figcaption className="text-xs sm:text-sm text-dark/50 text-center font-medium italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          )
        }
      }

      return null
    })
  }

  return (
    <PageTransition>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main id="main-content" className="min-h-screen bg-[#FAFAF0] text-dark pb-24">
        
        {/* HERO IMAGE SECTION (1200x500 context) */}
        <section className="relative w-full max-w-7xl mx-auto px-4 pt-6">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl bg-black">
            {/* Background Image */}
            <Image
              src={imageUrl}
              alt={post.featuredImage?.alt || post.title}
              width={1200}
              height={500}
              className="object-cover w-full h-full opacity-65"
              priority
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-12" />
            
            {/* Overlay Info (Centered-Left overlay) */}
            <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 z-10 flex flex-col gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD600] uppercase tracking-widest hover:text-white transition-colors w-max"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </Link>
              
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/70">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FFD600]" />
                  {formattedDate}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#FFD600]" />
                    By {post.author}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT CONTAINER */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Tags row */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-8 border-b border-dark/5 pb-4">
              <Tag className="w-4 h-4 text-green-brand" />
              <div className="flex gap-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#1E6B2E]/10 border border-[#1E6B2E]/25 text-[#1E6B2E] font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Render Portable Text Body */}
          <div className="prose max-w-none prose-green">
            {renderPortableText(post.body)}
          </div>

          {/* Related Posts Row */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-dark/10">
              <h3 className="font-heading text-2xl font-black text-[#1E6B2E] mb-8">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => {
                  const rImageUrl = rPost.featuredImage
                    ? urlFor(rPost.featuredImage).width(600).format('webp').url() || '/default-snack.svg'
                    : '/default-snack.svg'
                  const rDate = rPost.publishedAt
                    ? new Date(rPost.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recent Post'
                  
                  return (
                    <article
                      key={rPost._id}
                      className="bg-white rounded-3xl overflow-hidden border border-green-dark/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group h-full"
                    >
                      <Link href={`/blog/${rPost.slug}`} className="relative aspect-[16/9] block overflow-hidden bg-dark/5">
                        <Image
                          src={rImageUrl}
                          alt={rPost.title}
                          width={600}
                          height={360}
                          className="object-cover w-full h-full group-hover:scale-103 transition-all duration-300"
                        />
                      </Link>
                      <div className="p-5 flex flex-col flex-1 gap-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-dark/40 uppercase font-bold">
                          <Calendar className="w-3.5 h-3.5 text-green-brand" />
                          <span>{rDate}</span>
                        </div>
                        <h4 className="font-heading text-base font-bold text-green-dark group-hover:text-green-brand leading-snug transition-colors">
                          <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                        </h4>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

        </article>
      </main>

      <Footer />
    </PageTransition>
  )
}
