import { Metadata } from 'next'

interface SEOParams {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: 'website' | 'article'
}

export function generateSeoMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.png',
  ogType = 'website',
}: SEOParams): Metadata {
  const url = `https://cochinsnacks.com${path}`
  return {
    title,
    description,
    metadataBase: new URL('https://cochinsnacks.com'),
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://cochinsnacks.com${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Cochin Snacks',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `https://cochinsnacks.com${ogImage}`],
    },
    alternates: {
      canonical: url,
    },
  }
}
