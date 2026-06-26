import ContactClient from './ContactClient'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "Contact Cochin Snacks | +91 94460 06447",
    description: "Get in touch with Cochin Snacks for bulk orders, export enquiries, and distributorship partnerships. Call +91 94460 06447 or email export@cochinsnacks.com.",
    path: "/contact",
  })
}

export default function ContactPage() {
  return <ContactClient />
}
