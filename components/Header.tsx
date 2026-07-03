'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false) // Mobile drawer state
  const [isScrolled, setIsScrolled] = useState(false)

  const pathname = usePathname()
  const { scrollY } = useScroll()

  const hasBg = isScrolled || pathname !== '/'

  // Dynamic link classes
  const getLinkClassName = (isActive: boolean) => {
    const base = 'text-sm font-semibold tracking-wide uppercase transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2'
    if (hasBg) {
      return `${base} focus-visible:ring-[#FFD600] ${isActive ? 'text-[#FFD600] font-bold' : 'text-white hover:text-[#FFD600]'}`
    } else {
      return `${base} focus-visible:ring-green-brand ${isActive ? 'text-green-brand font-bold' : 'text-dark hover:text-green-brand'}`
    }
  }

  // Track scroll position via Framer Motion useScroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Navigation config
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ]

  // Mobile Drawer animation variants
  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'tween' as const,
        duration: 0.3,
        ease: 'easeOut' as const,
        staggerChildren: 0.05,
      },
    },
    exit: {
      x: '100%',
      transition: {
        type: 'tween' as const,
        duration: 0.25,
        ease: 'easeIn' as const,
      },
    },
  }

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 w-full ${isScrolled || pathname !== '/'
          ? 'bg-green-brand backdrop-blur-md shadow-lg border-b border-white/10 h-16 lg:h-[72px]'
          : 'bg-transparent h-16 lg:h-[72px]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile Layout (Header) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link href="/" className="flex items-center" aria-label="Cochin Snacks Home">
              <Image
                src="/logo.png"
                alt="Cochin Snacks Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 rounded-lg ${hasBg
                ? 'text-[#FFD600] hover:text-white focus-visible:ring-yellow'
                : 'text-green-brand hover:text-green-dark focus-visible:ring-green-brand'
                }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Layout (Flexible Flexbox) */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left - Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" aria-label="Cochin Snacks Home">
                <Image
                  src="/logo.png"
                  alt="Cochin Snacks Logo"
                  width={100}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Center - Nav Links */}
            <nav className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={getLinkClassName(isActive)}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            {/* Right - Warm brown contact pill button */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="tel:+919446006447"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#A65B32] hover:bg-[#8F4A24] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>+91 94460 06447</span>
              </a>
            </div>
          </div>
        </div>


      </header>

      {/* Mobile Drawer (Backdrop & Sidebar) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 lg:hidden"
            />

            {/* Sidebar Drawer */}
            <m.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-green-brand shadow-2xl p-6 flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <Link href="/" onClick={() => setIsOpen(false)} aria-label="Cochin Snacks Home">
                  <Image
                    src="/logo.png"
                    alt="Cochin Snacks Logo"
                    width={100}
                    height={40}
                    className="object-contain"
                  />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded-lg"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <m.div variants={linkVariants} key={link.name}>
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-bold font-heading text-white hover:text-[#FFD600] py-2 px-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                    >
                      {link.name}
                    </Link>
                  </m.div>
                ))}
              </nav>

              {/* Drawer Footer info */}
              <div className="mt-auto pt-6 border-t border-white/10 text-center flex flex-col gap-2.5 text-xs text-white/50 font-mono">
                <a
                  href="tel:+919446006447"
                  className="hover:text-[#FFD600] transition-colors py-1.5 focus:outline-none focus-visible:underline"
                >
                  +91 94460 06447
                </a>
                <a
                  href="mailto:export@cochinsnacks.com"
                  className="hover:text-[#FFD600] transition-colors py-1.5 focus:outline-none focus-visible:underline"
                >
                  export@cochinsnacks.com
                </a>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacing to compensate for fixed header height (except on homepage for banner visual overlay) */}
      {pathname !== '/' && <div className="h-16 lg:h-[72px]" />}
    </>
  )
}
