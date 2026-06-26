'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { sanityClient, urlFor } from '@/lib/sanity/client'

// Fallback/Initial categories details if Sanity client is still fetching
const DEFAULT_CATEGORIES = [
  { title: 'Chips', slug: 'chips', count: 12, imageUrl: '/default-snack.svg' },
  { title: 'Murukku', slug: 'murukku', count: 8, imageUrl: '/default-snack.svg' },
  { title: 'Mixture', slug: 'mixture', count: 10, imageUrl: '/default-snack.svg' },
  { title: 'Pakkavada', slug: 'pakkavada', count: 6, imageUrl: '/default-snack.svg' },
  { title: 'Snacks', slug: 'snacks', count: 14, imageUrl: '/default-snack.svg' },
]

interface Category {
  title: string
  slug: string
  count: number
  imageUrl: string
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false) // Mobile drawer state
  const [dropdownOpen, setDropdownOpen] = useState(false) // Desktop dropdown state
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES)
  
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Track scroll position via Framer Motion useScroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80)
  })

  // Fetch dynamic categories and product counts from Sanity
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"] | order(displayOrder asc) {
          _id,
          title,
          "slug": slug.current,
          "count": count(*[_type == "product" && category._ref == ^._id && isAvailable == true]),
          "image": *[_type == "product" && category._ref == ^._id && isAvailable == true && defined(images[0])][0].images[0]
        }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((cat: any) => ({
            title: cat.title,
            slug: cat.slug,
            count: cat.count || 0,
            imageUrl: cat.image ? urlFor(cat.image).width(160).format('webp').url() || '/default-snack.svg' : '/default-snack.svg',
          }))
          setCategories(formatted)
        }
      })
      .catch((err) => {
        console.error('Error fetching categories for header dropdown:', err)
      })
  }, [])

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false)
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false)
    setIsOpen(false)
  }, [pathname])

  // Navigation config
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products', isDropdownTrigger: true },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Partners', path: '/contact?tab=partner' },
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
        className={`fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300 w-full ${
          isScrolled || pathname !== '/'
            ? 'bg-[#1E6B2E] backdrop-blur-md shadow-lg border-b border-white/10 h-[72px] md:h-[72px]'
            : 'bg-transparent h-16 md:h-[72px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile Layout (Header) */}
          <div className="flex md:hidden items-center justify-between w-full">
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
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#FFD600] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow rounded-lg"
              aria-label="Open navigation menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>

          {/* Desktop Layout (3 Columns Grid) */}
          <div className="hidden md:grid grid-cols-12 items-center w-full">
            {/* Col 1: Left - Logo */}
            <div className="col-span-3 flex items-center">
              <Link href="/" aria-label="Cochin Snacks Home">
                <Image
                  src="/logo.png"
                  alt="Cochin Snacks Logo"
                  width={130}
                  height={52}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Col 2: Center - Nav Links */}
            <div className="col-span-6 flex justify-center items-center">
              <nav className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path

                  if (link.isDropdownTrigger) {
                    return (
                      <div key={link.name} className="relative">
                        <button
                          ref={triggerRef}
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          aria-expanded={dropdownOpen}
                          aria-controls="products-mega-dropdown"
                          className="flex items-center gap-1 text-sm font-semibold tracking-wide uppercase text-white hover:text-[#FFD600] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] px-2 py-1 rounded"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-sm font-semibold tracking-wide uppercase transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] ${
                        isActive ? 'text-[#FFD600] font-bold' : 'text-white hover:text-[#FFD600]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Col 3: Right - Tagline / Phone details */}
            <div className="col-span-3 flex flex-col items-end text-right">
              <span className="text-sm italic font-medium text-[#FFD600]">
                Snack it... love it...
              </span>
              <span className="text-[11px] text-white block mt-0.5 font-semibold font-mono">
                +91 94460 06447
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Products Dropdown (Full-width below header) */}
        <AnimatePresence>
          {dropdownOpen && (
            <m.div
              id="products-mega-dropdown"
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-[72px] left-0 w-full bg-[#1E6B2E] border-t border-white/10 shadow-2xl py-8 z-40 hidden md:block"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-5 gap-6 justify-center">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setDropdownOpen(false)}
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-transparent hover:border-[#FFD600] bg-white/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
                    >
                      <div className="relative w-[160px] h-[120px] overflow-hidden rounded-xl bg-black/10">
                        <Image
                          src={cat.imageUrl}
                          alt={cat.title}
                          fill
                          sizes="160px"
                          className="object-cover group-hover:scale-106 transition-transform duration-400"
                        />
                      </div>
                      <div className="text-center">
                        <span className="block text-sm font-bold text-white group-hover:text-[#FFD600] transition-colors font-heading">
                          {cat.title}
                        </span>
                        <span className="text-xs text-[#FFD600] font-black font-mono mt-0.5 block uppercase tracking-wider">
                          {cat.count} {cat.count === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
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
              className="fixed inset-0 z-50 bg-black/75 md:hidden"
            />

            {/* Sidebar Drawer */}
            <m.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-[#1E6B2E] shadow-2xl p-6 flex flex-col md:hidden"
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
                      href={link.isDropdownTrigger ? '/products' : link.path}
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
      {pathname !== '/' && <div className="h-16 md:h-[72px]" />}
    </>
  )
}
