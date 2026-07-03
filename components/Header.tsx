'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { sanityClient, urlFor } from '@/lib/sanity/client'

// Fallback/Initial categories details if Sanity client is still fetching
const DEFAULT_CATEGORIES = [
  { title: 'Chips', slug: 'chips', count: 12, imageUrl: '/default-snack.svg', tagline: 'Crunchy' },
  { title: 'Murukku', slug: 'murukku', count: 8, imageUrl: '/default-snack.svg', tagline: 'Spiral' },
  { title: 'Mixture', slug: 'mixture', count: 10, imageUrl: '/default-snack.svg', tagline: 'Savoury' },
  { title: 'Pakkavada', slug: 'pakkavada', count: 6, imageUrl: '/default-snack.svg', tagline: 'Crispy' },
  { title: 'Snacks', slug: 'snacks', count: 14, imageUrl: '/default-snack.svg', tagline: 'Traditional' },
]

interface Category {
  title: string
  slug: string
  count: number
  imageUrl: string
  tagline?: string
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

  // Fetch dynamic categories and product counts from Sanity
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"] | order(displayOrder asc) {
          _id,
          title,
          tagline,
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
            tagline: cat.tagline,
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
        onMouseLeave={() => {
          setDropdownOpen(false)
        }}
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

                if (link.isDropdownTrigger) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <Link
                        href={link.path}
                        ref={triggerRef}
                        onMouseEnter={() => setDropdownOpen(true)}
                        aria-expanded={dropdownOpen}
                        aria-controls="products-mega-dropdown"
                        className={`text-sm font-semibold tracking-wide uppercase transition-all duration-200 px-4 py-2 rounded-full focus:outline-none focus-visible:ring-2 flex items-center gap-1.5 ${dropdownOpen
                          ? 'bg-[#F2E6DF] text-[#A65B32] font-bold shadow-sm'
                          : hasBg
                            ? `focus-visible:ring-[#FFD600] ${isActive ? 'text-[#FFD600] font-bold' : 'text-white hover:text-[#FFD600]'}`
                            : `focus-visible:ring-green-brand ${isActive ? 'text-green-brand font-bold' : 'text-dark hover:text-green-brand'}`
                          }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#A65B32]' : 'text-current'}`} />
                      </Link>

                      {/* Desktop Products Dropdown (Horizontal row relative to PRODUCTS item) */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <m.div
                            id="products-mega-dropdown"
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-[48px] left-1/2 -translate-x-1/2 bg-white rounded-[20px] shadow-2xl z-40 hidden lg:block overflow-visible border border-gray-100 p-5"
                            style={{ width: 'max-content' }}
                          >
                            {/* Pointing triangle pointer */}
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100" />

                            <div className="flex items-center gap-6">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.slug}
                                  href={`/products?category=${cat.slug}`}
                                  onClick={() => setDropdownOpen(false)}
                                  className="group transition-colors duration-200 text-left px-2 py-1"
                                >
                                  <span className="font-heading font-black text-sm uppercase tracking-wider text-[#0F0F0F] group-hover:text-green-brand transition-colors">
                                    {cat.title}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

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
      {pathname !== '/' && <div className="h-16 lg:h-[72px]" />}
    </>
  )
}
