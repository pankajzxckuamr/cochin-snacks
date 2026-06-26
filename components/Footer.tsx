'use client'

import Link from 'next/link'
import Image from 'next/image'
import SectionDivider from './ui/SectionDivider'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="w-full bg-[#0F0F0F]">
      {/* Wave Section Divider above footer - dark fill, flipped */}
      <SectionDivider color="fill-[#0F0F0F]" flip={true} />

      <footer className="text-white/80 pb-8 border-t-[3px] border-[#FFD600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* Footer 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
            
            {/* Column 1: Logo & Brand Info */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-block" aria-label="Cochin Snacks Home">
                <Image
                  src="/logo.png"
                  alt="Cochin Snacks Logo"
                  width={140}
                  height={56}
                  className="opacity-90 object-contain"
                />
              </Link>
              <p className="text-[#FFD600] italic text-sm font-medium font-heading">
                Snack it... love it...
              </p>
              <div className="flex flex-col gap-1 text-white/60 text-xs">
                <p className="font-semibold">A Pavithram Group Brand</p>
                <p className="text-white/40 text-[10px]">
                  Est. 1950s · Cochin Snacks launched 2023
                </p>
              </div>
              
              {/* Social icons */}
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#FFD600]/10 rounded-full transition-all text-[#FFD600] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                  aria-label="Follow Cochin Snacks on Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#FFD600]/10 rounded-full transition-all text-[#FFD600] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                  aria-label="Follow Cochin Snacks on Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6 font-mono">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact?tab=partner"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Our Snacks */}
            <div>
              <h3 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-6 font-mono">
                Our Snacks
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link
                    href="/products?category=chips"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Chips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=murukku"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Murukku
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=mixture"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Mixture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=pakkavada"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Pakkavada
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=snacks"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1 py-0.5"
                  >
                    Snacks
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Get in Touch */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#FFD600] font-black text-xs uppercase tracking-widest mb-2 font-mono">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                <p className="leading-relaxed">
                  Pavithram Snacks, Mullankunnu,<br />
                  Ponjassery P.O., Ernakulam,<br />
                  Kerala - 683547
                </p>
                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  <a
                    href="tel:+919446006447"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:underline"
                  >
                    +91 94460 06447
                  </a>
                  <a
                    href="mailto:export@cochinsnacks.com"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:underline"
                  >
                    export@cochinsnacks.com
                  </a>
                  <a
                    href="https://www.cochinsnacks.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:underline"
                  >
                    www.cochinsnacks.com
                  </a>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <span className="text-[10px] uppercase font-bold text-white/40 block">
                    FSSAI No
                  </span>
                  <span className="text-xs text-[#FFD600] font-semibold font-mono tracking-wider">
                    11324007000398
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#1E6B2E] pt-6 mt-8">
            <p className="text-center text-white/40 text-[10px] tracking-wide">
              © {currentYear} Cochin Snacks. A Pavithram Group Brand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
