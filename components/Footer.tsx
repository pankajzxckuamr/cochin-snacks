'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Globe, ArrowRight } from 'lucide-react'
import DotPattern from '@/components/ui/DotPattern'

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const EXPLORE_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/faq' },
]

const SNACK_LINKS = [
  { name: 'Chips', href: '/products?category=chips' },
  { name: 'Murukku', href: '/products?category=murukku' },
  { name: 'Mixture', href: '/products?category=mixture' },
  { name: 'Pakkavada', href: '/products?category=pakkavada' },
  { name: 'Snacks', href: '/products?category=snacks' },
]

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand rounded"
    >
      <span className="h-px w-0 group-hover:w-4 bg-green-brand transition-all duration-300" />
      {children}
    </Link>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-white font-bold text-sm uppercase tracking-wider">{children}</h3>
      <span className="mt-2 block w-8 h-0.5 rounded-full bg-green-brand" />
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#0c120e] text-white/70 overflow-hidden">
      {/* Ambient green glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-green-brand/10 blur-[120px] rounded-full" />
      {/* Subtle grid patterns on both sides */}
      <DotPattern variant="grid" gap={38} size={1} className="top-0 left-0 h-full w-2/5" color="#ffffff" opacity={0.06} fade="left" />
      <DotPattern variant="grid" gap={38} size={1} className="top-0 right-0 h-full w-2/5" color="#ffffff" opacity={0.06} fade="right" />
      {/* Brand accent line */}
      <div className="relative z-10 h-1 w-full bg-gradient-to-r from-green-brand via-green-light to-yellow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Top CTA band ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-12 border-b border-white/10">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              Craving authentic <span className="text-green-light">Kerala snacks?</span>
            </h2>
            <p className="text-white/50 mt-3 text-sm sm:text-base">
              From Cochin to your doorstep — now shipping to 20+ countries worldwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-brand hover:bg-green-dark text-white font-bold text-sm shadow-lg shadow-green-brand/30 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
            >
              Explore Snacks <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919446006447"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 hover:border-green-brand text-white/85 hover:text-white font-bold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>

        {/* ── Link columns ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-5 max-w-xs">
            <Link href="/" className="inline-block" aria-label="Cochin Snacks Home">
              <Image
                src="/logo-mark.png"
                alt="Cochin Snacks Logo"
                width={122}
                height={100}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-yellow italic text-sm font-medium font-heading">
              Snack it… love it…
            </p>
            <div className="text-white/50 text-xs leading-relaxed">
              <p className="font-semibold text-white/70">A Pavithram Group Brand</p>
              <p className="text-white/40 mt-0.5">Est. 1950s · Cochin Snacks launched 2023</p>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://instagram.com/cochinsnacks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-green-brand hover:border-green-brand hover:text-white transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
                aria-label="Follow Cochin Snacks on Instagram"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://facebook.com/cochinsnacks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-green-brand hover:border-green-brand hover:text-white transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
                aria-label="Follow Cochin Snacks on Facebook"
              >
                <FacebookIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="flex flex-col gap-3">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Snacks */}
          <div>
            <FooterHeading>Our Snacks</FooterHeading>
            <ul className="flex flex-col gap-3">
              {SNACK_LINKS.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <FooterHeading>Get in Touch</FooterHeading>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-green-brand shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Pavithram Snacks, Mullankunnu,<br />
                  Ponjassery P.O., Ernakulam, Kerala - 683547
                </span>
              </li>
              <li>
                <a
                  href="tel:+919446006447"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:underline"
                >
                  <Phone className="w-4 h-4 text-green-brand shrink-0" />
                  +91 94460 06447
                </a>
              </li>
              <li>
                <a
                  href="mailto:export@cochinsnacks.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:underline"
                >
                  <Mail className="w-4 h-4 text-green-brand shrink-0" />
                  export@cochinsnacks.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.cochinsnacks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:underline"
                >
                  <Globe className="w-4 h-4 text-green-brand shrink-0" />
                  www.cochinsnacks.com
                </a>
              </li>
            </ul>

            {/* FSSAI badge */}
            <div className="mt-5 inline-flex flex-col rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                FSSAI Licence
              </span>
              <span className="text-sm text-green-light font-semibold font-mono tracking-wider">
                11324007000398
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-white/10">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {currentYear} Cochin Snacks. A Pavithram Group Brand. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Crafted with care in Kerala, India
          </p>
        </div>
      </div>
    </footer>
  )
}
