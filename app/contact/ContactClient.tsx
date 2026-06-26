'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { MapPin, Phone, Mail, Globe, CheckCircle, ArrowRight } from 'lucide-react'
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

      <main id="main-content" className="min-h-screen bg-[#FAFAF0] text-dark pb-24">
        
        {/* HERO SECTION */}
        <section className="relative py-16 bg-[#0F0F0F] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.12),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col gap-3">
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
              Get in Touch
            </h1>
            <p className="text-[#FFD600] text-sm sm:text-base font-bold uppercase tracking-wider">
              We look forward to hearing from you.
            </p>
            <p className="text-white/60 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
              Get in touch for product enquiries, distributorship opportunities, export partnerships, and bulk orders.
            </p>
          </div>
        </section>

        {/* 2-COL CONTACT CONTENT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Address info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <ScrollReveal direction="left">
                <h2 className="font-heading text-2xl font-black text-[#1E6B2E] mb-6">
                  Contact Information
                </h2>
                
                <div className="flex flex-col gap-6 text-dark">
                  {/* Address */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#FFD600] group-hover:text-[#1E6B2E] border border-green-dark/10 shadow-sm flex items-center justify-center shrink-0 transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Address</h4>
                      <p className="text-dark hover:text-[#1E6B2E] transition-colors text-base sm:text-lg leading-relaxed">
                        Pavithram Snacks, Mullankunnu,<br />
                        Ponjassery P.O., Ernakulam,<br />
                        Kerala, India - 683547
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#FFD600] group-hover:text-[#1E6B2E] border border-green-dark/10 shadow-sm flex items-center justify-center shrink-0 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Phone</h4>
                      <a
                        href="tel:+919446006447"
                        className="text-dark hover:text-[#1E6B2E] text-sm sm:text-base font-semibold transition-colors font-mono"
                      >
                        +91 94460 06447
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#FFD600] group-hover:text-[#1E6B2E] border border-green-dark/10 shadow-sm flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Email</h4>
                      <a
                        href="mailto:export@cochinsnacks.com"
                        className="text-dark hover:text-[#1E6B2E] text-sm sm:text-base font-semibold transition-colors font-mono"
                      >
                        export@cochinsnacks.com
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#FFD600] group-hover:text-[#1E6B2E] border border-green-dark/10 shadow-sm flex items-center justify-center shrink-0 transition-colors">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase text-dark/45 tracking-widest mb-1.5 font-mono">Website</h4>
                      <a
                        href="https://www.cochinsnacks.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark hover:text-[#1E6B2E] text-base sm:text-lg font-semibold transition-colors font-mono"
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
                      className="flex flex-col items-center gap-4 p-8 bg-white border border-green-dark/10 rounded-3xl text-center shadow-md"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-[#1E6B2E] text-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CheckCircle className="w-9 h-9 text-white fill-current stroke-[#1E6B2E]" />
                      </m.div>
                      <h3 className="font-heading text-xl font-bold text-green-dark">Message Sent!</h3>
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
                      className="bg-white border border-green-dark/10 rounded-3xl p-6 sm:p-10 shadow-md flex flex-col gap-6"
                    >
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={status === 'loading'}
                          className="bg-[#FAFAF0] border border-dark/10 rounded-xl py-3.5 px-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                          placeholder="Your Name"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={status === 'loading'}
                          className="bg-[#FAFAF0] border border-dark/10 rounded-xl py-3.5 px-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                          placeholder="yourname@domain.com"
                        />
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-sm uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          disabled={status === 'loading'}
                          className="bg-[#FAFAF0] border border-dark/10 rounded-xl py-3.5 px-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                          placeholder="What is this enquiry about?"
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          disabled={status === 'loading'}
                          className="bg-[#FAFAF0] border border-dark/10 rounded-xl py-3.5 px-4 text-base text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all resize-none"
                          placeholder="Your message details..."
                        />
                      </div>

                      {/* Button / Errors */}
                      <div className="flex flex-col gap-3">
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-4 bg-[#1E6B2E] text-white hover:bg-green-brand font-black text-base uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2"
                        >
                          {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                          <ArrowRight className="w-4 h-4" />
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

        {/* GOOGLE MAP IFRAME PLACEHOLDER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-md border border-dark/10">
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
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
