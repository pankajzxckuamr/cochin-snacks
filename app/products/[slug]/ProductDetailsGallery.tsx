'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'

interface ProductDetailsGalleryProps {
  title: string
  images?: any[]
}

export default function ProductDetailsGallery({ title, images }: ProductDetailsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const fallbackUrl = '/default-snack.svg'
  
  // Format images list and limit to 5 thumbnails if needed
  const formattedImages = images && images.length > 0
    ? images.map(img => urlFor(img).width(600).format('webp').url() || fallbackUrl)
    : [fallbackUrl]

  const activeImage = formattedImages[activeIndex] || fallbackUrl

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % formattedImages.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + formattedImages.length) % formattedImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, formattedImages.length])

  return (
    <div className="flex flex-col gap-6">
      {/* Active Main Display Display (Explicit width/height container) */}
      <div className="relative w-full max-w-[580px] aspect-square rounded-2xl bg-white border border-green-dark/10 overflow-hidden shadow-lg group flex items-center justify-center p-2">
        
        {/* Click to open Lightbox */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-4 top-4 z-10 p-2.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Expand image view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          <m.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={activeImage}
              alt={`${title} - image ${activeIndex + 1}`}
              width={580}
              height={580}
              className="object-cover rounded-xl w-full h-full"
              priority
            />
          </m.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails row (limit to 5) */}
      {formattedImages.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {formattedImages.slice(0, 5).map((img, idx) => {
            const isSelected = activeIndex === idx
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-[90px] h-[90px] rounded-xl overflow-hidden bg-white border transition-all ${
                  isSelected
                    ? 'border-[#FFD600] ring-2 ring-[#FFD600]/25 shadow-md scale-105'
                    : 'border-green-dark/10 hover:border-green-brand/40 hover:scale-102'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  width={90}
                  height={90}
                  className="object-cover w-full h-full p-1 rounded-lg"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-6 top-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
              aria-label="Close image lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Left arrow */}
            {formattedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((prev) => (prev - 1 + formattedImages.length) % formattedImages.length)
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Main Lightbox Image */}
            <div
              className="relative max-w-[90vw] max-h-[85vh] aspect-square flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={`${title} fullscreen`}
                width={1000}
                height={1000}
                className="object-contain max-w-full max-h-full rounded-lg"
              />
            </div>

            {/* Right arrow */}
            {formattedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((prev) => (prev + 1) % formattedImages.length)
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Footer index display */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono">
              {activeIndex + 1} / {formattedImages.length}
            </div>

          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
