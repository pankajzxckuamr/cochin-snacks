'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DotPattern from '@/components/ui/DotPattern'
import { MapPin, Phone, Mail, Globe, CheckCircle, User, Tag, MessageSquare, Send } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

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

        {/* HERO SECTION — modern cream banner */}
        <section className="relative bg-cream overflow-hidden py-14 sm:py-20">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-green-brand/10 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-flame-orange" />
              <span className="text-xs font-bold text-green-dark tracking-widest uppercase font-mono">Contact Us</span>
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Get in <span className="text-green-brand">Touch</span>
            </h1>
            <p className="text-dark/60 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
              Reach out for product enquiries, distributorship opportunities, export partnerships, and bulk orders — we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* 2-COL CONTACT CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Address info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <ScrollReveal direction="left">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3 block">
                  Reach Us
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-dark tracking-tight mb-8">
                  Contact <span className="text-green-brand">Information</span>
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Address */}
                  <div className="flex gap-4 items-start group bg-cream border border-black/[0.06] rounded-2xl p-5 hover:border-green-brand/40 hover:shadow-[0_12px_30px_-16px_rgba(45,139,45,0.35)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Address</h4>
                      <p className="text-dark/80 text-sm sm:text-base font-semibold leading-relaxed">
                        Pavithram Snacks, Mullankunnu,<br />
                        Ponjassery P.O., Ernakulam,<br />
                        Kerala, India - 683547
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start group bg-cream border border-black/[0.06] rounded-2xl p-5 hover:border-green-brand/40 hover:shadow-[0_12px_30px_-16px_rgba(45,139,45,0.35)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Phone</h4>
                      <a
                        href="tel:+919446006447"
                        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors"
                      >
                        +91 94460 06447
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start group bg-cream border border-black/[0.06] rounded-2xl p-5 hover:border-green-brand/40 hover:shadow-[0_12px_30px_-16px_rgba(45,139,45,0.35)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Email</h4>
                      <a
                        href="mailto:export@cochinsnacks.com"
                        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors break-all"
                      >
                        export@cochinsnacks.com
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex gap-4 items-start group bg-cream border border-black/[0.06] rounded-2xl p-5 hover:border-green-brand/40 hover:shadow-[0_12px_30px_-16px_rgba(45,139,45,0.35)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white shadow-lg shadow-green-brand/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Website</h4>
                      <a
                        href="https://www.cochinsnacks.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark/80 hover:text-green-brand text-sm sm:text-base font-semibold transition-colors"
                      >
                        www.cochinsnacks.com
                      </a>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <m.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 p-8 sm:p-10 bg-cream border border-black/[0.06] rounded-3xl text-center shadow-sm"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-green-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-green-brand/30"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </m.div>
                      <h3 className="font-heading text-2xl font-black text-dark">Message Sent!</h3>
                      <p className="text-dark/70 text-sm max-w-sm">
                        Thank you! Your message was submitted successfully. We will get back to you shortly.
                      </p>
                    </m.div>
                  ) : (
                    <m.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="bg-cream border border-black/[0.06] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-6"
                    >
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-dark/80">
                          Full Name <span className="text-flame-orange">*</span>
                        </label>
                        <div className="group relative">
                          <User className="w-5 h-5 text-dark/30 group-focus-within:text-green-brand absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={status === 'loading'}
                            className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-dark/80">
                          Email Address <span className="text-flame-orange">*</span>
                        </label>
                        <div className="group relative">
                          <Mail className="w-5 h-5 text-dark/30 group-focus-within:text-green-brand absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={status === 'loading'}
                            className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all"
                            placeholder="yourname@domain.com"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-sm font-bold text-dark/80">
                          Subject
                        </label>
                        <div className="group relative">
                          <Tag className="w-5 h-5 text-dark/30 group-focus-within:text-green-brand absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                          <input
                            type="text"
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            disabled={status === 'loading'}
                            className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all"
                            placeholder="What is this enquiry about?"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-bold text-dark/80">
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
                            className="w-full bg-white border border-black/[0.08] rounded-2xl py-3.5 pl-12 pr-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-4 focus:ring-green-brand/10 transition-all resize-none"
                            placeholder="Your message details..."
                          />
                        </div>
                      </div>

                      {/* Button / Errors */}
                      <div className="flex flex-col gap-3">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-4 bg-green-brand text-white hover:bg-green-dark font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-brand focus:ring-offset-2 disabled:opacity-70 disabled:translate-y-0"
                        >
                          {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                          <Send className="w-4 h-4" />
                        </button>
                        
                        {status === 'error' && (
                          <span className="text-xs text-red-500 font-bold font-mono text-center">
                            {errorMessage}
                          </span>
                        )}
                      </div>
                    </m.form>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* GOOGLE MAP */}
        <section className="bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3 block">
                Find Us
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-dark tracking-tight">
                Our <span className="text-green-brand">Kerala Home</span>
              </h2>
            </div>
            <div className="relative w-full h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-sm border border-black/[0.06]">
              {/* Standard embedded map of Ponjassery P.O., Ernakulam, Kerala */}
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
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
