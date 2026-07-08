'use client'

import React from 'react'
import { m } from 'framer-motion'

interface SectionHeadingProps {
  /** Small uppercase kicker shown above the title */
  eyebrow?: string
  /** Main heading. Wrap a word in <span className="text-green-brand">…</span> for the accent. */
  title: React.ReactNode
  /** Supporting sentence below the title */
  subtitle?: React.ReactNode
  align?: 'center' | 'left'
  /** Override the default bottom margin (e.g. "mb-0" when placed inside a flex row) */
  className?: string
}

/**
 * Shared section header used across the home page so every section shares the
 * same type scale, colour hierarchy (dark title + single green accent) and
 * spacing rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = 'mb-12 sm:mb-16',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-80px' }}
      className={`${isCenter ? 'text-center mx-auto items-center' : 'text-left items-start'} flex flex-col max-w-2xl ${className}`}
    >
      {eyebrow && (
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-dark/60 text-base sm:text-lg mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </m.div>
  )
}
