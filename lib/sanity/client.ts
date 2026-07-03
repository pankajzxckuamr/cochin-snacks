import { createClient, type SanityClient } from 'next-sanity'

/* ── Client configuration ────────────────────────────────────────────────── */
export const sanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  useCdn:    false, // Disable CDN during build to avoid cache/timeout issues
})


/**
 * Authenticated write client — used only in server-side API routes
 * (contact forms, newsletter sign-ups, partner enquiries).
 * Never expose SANITY_API_TOKEN to the browser.
 */
export const sanityWriteClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
})

/**
 * Typed fetch helper — all responses are revalidated every 60 seconds
 * (ISR via Next.js fetch cache tags).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: 60 } // Use ISR instead of disabling cache
    })
  } catch (error) {
    console.error('Sanity fetch failed, returning fallback to prevent crash:', error)
    
    // Fallback detection based on typical GROQ return type
    const trimmedQuery = query.trim()
    const isSingleDoc = /\[0\]\s*$/.test(trimmedQuery)
    if (trimmedQuery.startsWith('*') && !isSingleDoc) {
      return [] as unknown as T
    }
    return null as unknown as T
  }
}

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

