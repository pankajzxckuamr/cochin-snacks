import PartnersClient from './PartnersClient'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "Partner With Cochin Snacks — Distributors & Export Partners",
    description: "Partner with Cochin Snacks to bring authentic Kerala taste to global supermarkets, food service, and wholesale distributors. Joint expansion opportunities.",
    path: "/partners",
  })
}

export default function PartnersPage() {
  return <PartnersClient />
}
