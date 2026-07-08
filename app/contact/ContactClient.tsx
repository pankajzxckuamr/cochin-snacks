'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DotPattern from '@/components/ui/DotPattern'
import { MapPin, Phone, Mail, Globe, CheckCircle, User, Tag, MessageSquare, Send } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

const contactCards = [
  {
    icon: MapPin,
    label: 'Address',
    content: (
      <p className="text-dark/75 text-sm sm:text-base font-medium leading-relaxed">
        Pavithram Snacks, Mullankunnu,<br />
        Ponjassery P.O., Ernakulam,<br />
        Kerala, India - 683547
      </p>
    ),
  },
  {
    icon: Phone,
    label: 'Phone',
    content: (
      <a
        href="tel:+919446006447"
        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors"
      >
        +91 94460 06447
      </a>
    ),
  },
  {
    icon: Mail,
    label: 'Email',
    content: (
      <a
        href="mailto:export@cochinsnacks.com"
        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors break-all"
      >
        export@cochinsnacks.com
      </a>
    ),
  },
  {
    icon: Globe,
    label: 'Website',
    content: (
      <a
        href="https://www.cochinsnacks.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors"
      >
        www.cochinsnacks.com
      </a>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        const data = await res.json()
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection.')
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <Header />

      <main id="main-content" className="flex-1 bg-white text-dark">

        {/* HERO */}
        <section className="relative bg-cream overflow-hidden py-14 sm:py-20">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <m.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-brand/10 mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-flame-orange animate-pulse" />
              <span className="text-xs font-bold text-green-dark tracking-widest uppercase font-mono">Contact Us</span>
            </m.span>
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-3xl"
            >
              Get in <span className="text-green-brand">Touch</span>
            </m.h1>
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-dark/60 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed font-medium"
            >
              Reach out for product enquiries, distributorship opportunities, export partnerships, and bulk orders — we'd love to hear from you.
            </m.p>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left — info cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ScrollReveal direction="left">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3 block">
                  Reach Us
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1] mb-8">
                  Contact <span className="text-green-brand">Information</span>
                </h2>
              </ScrollReveal>

              <div className="flex flex-col gap-4">
                {contactCards.map((card, idx) => {
                  const Icon = card.icon
                  return (
                    <m.div
                      key={card.label}
                      custom={idx}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      whileHover={{ y: -4, transition: { duration: 0.25 } }}
                      className="flex gap-4 items-start group bg-cream border border-black/[0.06] rounded-2xl p-5 hover:border-green-brand/40 hover:shadow-[0_14px_34px_-16px_rgba(45,139,45,0.35)] transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-dark mb-1.5">
                          {card.label}
                        </h4>
                        {card.content}
                      </div>
                    </m.div>
                  )
                })}
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <m.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 p-8 sm:p-10 bg-cream border border-black/[0.06] rounded-3xl text-center shadow-sm"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                        className="w-16 h-16 bg-green-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-green-brand/30"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </m.div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black text-dark">Message Sent!</h3>
                      <p className="text-dark/65 text-sm sm:text-base font-medium max-w-sm leading-relaxed">
                        Thank you! Your message was submitted successfully. We will get back to you shortly.
                      </p>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45 }}
                      onSubmit={handleSubmit}
                      className="relative bg-cream border border-black/[0.06] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-5 overflow-hidden"
                    >
                      <div className="absolute -top-16 -right-16 w-48 h-48 bg-green-brand/10 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative z-10 mb-1">
                        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-2 block">
                          Write to Us
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-black text-dark tracking-tight">
                          Send a <span className="text-green-brand">Message</span>
                        </h3>
                      </div>

                      {[
                        {
                          id: 'name',
                          label: 'Full Name',
                          required: true,
                          type: 'text',
                          placeholder: 'Your Name',
                          icon: User,
                          value: formData.name,
                          onChange: (v: string) => setFormData({ ...formData, name: v }),
                        },
                        {
                          id: 'email',
                          label: 'Email Address',
                          required: true,
                          type: 'email',
                          placeholder: 'yourname@domain.com',
                          icon: Mail,
                          value: formData.email,
                          onChange: (v: string) => setFormData({ ...formData, email: v }),
                        },
                        {
                          id: 'subject',
                          label: 'Subject',
                          required: false,
                          type: 'text',
                          placeholder: 'What is this enquiry about?',
                          icon: Tag,
                          value: formData.subject,
                          onChange: (v: string) => setFormData({ ...formData, subject: v }),
                        },
                      ].map((field, idx) => {
                        const Icon = field.icon
                        return (
                          <m.div
                            key={field.id}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.12 + idx * 0.07, duration: 0.4 }}
                            className="relative z-10 flex flex-col gap-2"
                          >
                            <label htmlFor={field.id} className="text-sm font-semibold text-dark/75">
                              {field.label} {field.required && <span className="text-flame-orange">*</span>}
                            </label>
                            <div className="group relative">
                              <Icon className="w-5 h-5 text-dark/30 group-focus-within:text-green-brand absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                              <input
                                type={field.type}
                                id={field.id}
                                required={field.required}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                disabled={status === 'loading'}
                                className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-sm sm:text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all"
                                placeholder={field.placeholder}
                              />
                            </div>
                          </m.div>
                        )
                      })}

                      <m.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.33, duration: 0.4 }}
                        className="relative z-10 flex flex-col gap-2"
                      >
                        <label htmlFor="message" className="text-sm font-semibold text-dark/75">
                          Message <span className="text-flame-orange">*</span>
                        </label>
                        <div className="group relative">
                          <MessageSquare className="w-5 h-5 text-dark/30 group-focus-within:text-green-brand absolute left-4 top-4 pointer-events-none transition-colors" />
                          <textarea
                            id="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            disabled={status === 'loading'}
                            className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-sm sm:text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all resize-none"
                            placeholder="Your message details..."
                          />
                        </div>
                      </m.div>

                      <m.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="relative z-10 flex flex-col gap-3"
                      >
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-4 bg-green-brand text-white hover:bg-green-dark font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-brand focus:ring-offset-2 disabled:opacity-70 disabled:translate-y-0"
                        >
                          {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                          <Send className="w-4 h-4" />
                        </button>

                        {status === 'error' && (
                          <span className="text-xs text-red-500 font-semibold text-center">
                            {errorMessage}
                          </span>
                        )}
                      </m.div>
                    </m.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section className="bg-cream relative overflow-hidden">
          <DotPattern className="top-0 left-0 h-full w-1/4" color="#1E6B2E" opacity={0.06} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/4" color="#1E6B2E" opacity={0.06} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3 block">
                  Find Us
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-[1.1]">
                  Our <span className="text-green-brand">Kerala Home</span>
                </h2>
                <p className="text-dark/55 text-sm sm:text-base font-medium mt-4 leading-relaxed">
                  Visit our facility in Ernakulam — where every batch is crafted with care.
                </p>
              </div>
            </ScrollReveal>

            <m.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-24px_rgba(30,107,46,0.45)] border border-black/[0.06]"
            >
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Pavithram%20Snacks,%20Ernakulam,%20Kerala,%20India&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cochin Snacks Manufacturing Facility Location Map"
              />
            </m.div>
          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
