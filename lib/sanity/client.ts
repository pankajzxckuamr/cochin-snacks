import { createClient, type SanityClient } from '@sanity/client'

/* ── Client configuration ────────────────────────────────────────────────── */
export const sanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
  useCdn:    process.env.NODE_ENV === 'production',
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
  return sanityClient.fetch<T>(query, params, {
    cache: 'no-store', // Disable cache temporarily to prevent hanging
  })
}

import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

