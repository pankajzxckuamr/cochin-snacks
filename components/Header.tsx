'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false) // Mobile drawer state
  const [isScrolled, setIsScrolled] = useState(false)

  const pathname = usePathname()
  const { scrollY } = useScroll()

  // On inner pages (or once scrolled) the floating bar becomes more solid.
  const solid = isScrolled || pathname !== '/'

  // Track scroll position via Framer Motion useScroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24)
  })

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Auto-reveal each page section on scroll.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section:not([data-no-auto-reveal])')
    )
    if (sections.length === 0) return

    // Home + Products: avoid opacity/transform reveals so content is visible
    // immediately (Products catalogue must show without scrolling).
    if (pathname === '/' || pathname === '/products' || pathname.startsWith('/products/')) {
      sections.forEach((section) => {
        section.classList.remove('auto-reveal-section', 'is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    sections.forEach((section, idx) => {
      section.classList.add('auto-reveal-section')
      if (idx === 0) {
        section.classList.add('is-visible')
      } else {
        section.classList.remove('is-visible')
      }
      observer.observe(section)
    })

    return () => observer.disconnect()
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
    hidden: { x: '110%' },
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
      x: '110%',
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
      {/* ── Docked Full-Width Navbar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b-4 transition-all duration-300 ${
          solid
            ? 'bg-white/95 backdrop-blur-md border-green-brand shadow-sm'
            : 'bg-white/80 backdrop-blur-md border-green-brand/60'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-16 lg:h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Cochin Snacks Home">
            <Image
              src="/logo-mark.png"
              alt="Cochin Snacks Logo"
              width={122}
              height={100}
              className="object-contain h-10 sm:h-11 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav — pill links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2 text-sm font-semibold tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand nav-link-premium ${
                    isActive
                      ? 'text-green-brand active'
                      : 'text-dark/70 hover:text-green-brand'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+919446006447"
              className="hidden sm:inline-flex items-center gap-2 h-10 lg:h-11 px-4 lg:px-5 bg-green-brand hover:bg-green-dark text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-md shadow-green-brand/30 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xl:inline">+91 94460 06447</span>
              <span className="xl:hidden">Call Us</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full text-dark hover:text-green-brand hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-dark/40 backdrop-blur-sm lg:hidden"
            />

            {/* Sidebar Drawer — clean white rounded panel */}
            <m.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-3 top-3 bottom-3 z-[60] w-[82vw] max-w-[340px] bg-white rounded-3xl shadow-2xl border border-black/5 p-6 flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-black/5 pb-5 mb-5">
                <Link href="/" onClick={() => setIsOpen(false)} aria-label="Cochin Snacks Home">
                  <Image
                    src="/logo-mark.png"
                    alt="Cochin Snacks Logo"
                    width={122}
                    height={100}
                    className="object-contain h-11 w-auto"
                  />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 flex items-center justify-center text-dark/60 hover:text-green-brand hover:bg-black/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand rounded-full"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path
                  return (
                    <m.div variants={linkVariants} key={link.name}>
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between text-lg font-bold font-heading py-2.5 px-4 rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand ${
                          isActive
                            ? 'text-green-brand bg-green-brand/10'
                            : 'text-dark hover:text-green-brand hover:bg-black/[0.04]'
                        }`}
                      >
                        {link.name}
                        {isActive && <ArrowRight className="w-4 h-4" />}
                      </Link>
                    </m.div>
                  )
                })}
              </nav>

              {/* Drawer Footer — CTA + contact */}
              <div className="mt-auto pt-5 flex flex-col gap-4">
                <a
                  href="tel:+919446006447"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-green-brand hover:bg-green-dark text-white rounded-full font-bold text-sm uppercase tracking-wider shadow-md shadow-green-brand/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-brand"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Call Us
                </a>
                <a
                  href="mailto:export@cochinsnacks.com"
                  className="text-center text-xs text-dark/50 font-mono hover:text-green-brand transition-colors focus:outline-none focus-visible:underline"
                >
                  export@cochinsnacks.com
                </a>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacing to compensate for the docked navbar (homepage handles its own top padding) */}
      {pathname !== '/' && <div className="h-16 lg:h-20" />}
    </>
  )
}
