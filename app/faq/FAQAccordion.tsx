'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  _id: string
  question: string
  answer: string
  displayOrder: number
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq._id
        return (
          <div
            key={faq._id}
            className={`bg-white rounded-2xl border border-green-dark/10 border-l-[3px] transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-l-yellow bg-yellow/5 shadow-md'
                : 'border-l-transparent hover:border-green-brand/20 shadow-sm'
            }`}
          >
            <button
              onClick={() => toggle(faq._id)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-heading text-lg font-bold text-green-dark focus:outline-none"
            >
              <span className="leading-snug">{faq.question}</span>
              <m.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className={`p-1.5 rounded-full shrink-0 transition-colors ${
                  isOpen ? 'bg-yellow text-dark' : 'bg-off-white text-dark/45'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </m.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-dark/75 border-t border-green-dark/5">
                    {faq.answer}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

