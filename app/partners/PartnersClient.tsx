'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

export default function PartnersClient() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    partnerType: 'Distributor',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const partnerTypes = [
    'Distributor',
    'Retailer',
    'Importer',
    'Wholesaler',
    'Supermarket',
    'Food Service',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.company || !formData.country || !formData.email) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/partner-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          company: '',
          country: '',
          email: '',
          phone: '',
          partnerType: 'Distributor',
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
        <section className="relative py-16 bg-gradient-to-b from-[#0F0F0F] to-[#1E6B2E] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.12),transparent)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-black mb-3">
              Grow With Cochin Snacks Worldwide
            </h1>
            <p className="text-[#FFD600] text-sm sm:text-base font-semibold uppercase tracking-wider">
              Supercharge your business with premium traditional Kerala savouries
            </p>
          </div>
        </section>

        {/* WHY PARTNER SECTION (2-col) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: text narrative copy */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <ScrollReveal direction="left">
                <div className="text-dark/80 text-sm sm:text-base leading-relaxed flex flex-col gap-4 font-body">
                  <p>
                    Whether you're a distributor, retailer, importer, wholesaler, supermarket, or food service business, Cochin Snacks offers the opportunity to partner with a trusted Kerala snack brand loved by customers across India and international markets.
                  </p>
                  
                  <div className="my-2">
                    <strong className="text-[#1E6B2E] font-black text-sm uppercase tracking-wider block mb-4">
                      Why Partner With Us:
                    </strong>
                    <ul className="flex flex-col gap-3.5 pl-2">
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Authentic Kerala snacks and traditional recipes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Consistent product quality and hygiene standards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Attractive and export-ready packaging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Reliable supply and distribution support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Growing brand recognition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#FFD600] font-bold text-lg leading-none">✓</span>
                        <span>Flexible business partnership opportunities</span>
                      </li>
                    </ul>
                  </div>

                  <p className="font-semibold text-green-dark">
                    Join our expanding network and bring the authentic taste of Kerala to more customers around the world.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Counters stack */}
            <div className="lg:col-span-5 bg-[#1E6B2E] text-white rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col gap-6 divide-y divide-white/10 text-center">
              <div className="py-2">
                <AnimatedCounter end={20} suffix="+ Countries" label="Export Footprint" />
              </div>
              <div className="pt-6 pb-2">
                <AnimatedCounter end={40} suffix="+ Products" label="Authentic SKUs" />
              </div>
              <div className="pt-6 pb-2">
                <AnimatedCounter end={75} suffix=" Years" label="Heritage of Legacy" />
              </div>
            </div>

          </div>
        </section>

        {/* PARTNER ENQUIRY FORM SECTION (bg #FAFAF0) */}
        <section className="bg-white border-t border-dark/5 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-black text-green-dark mb-3">
                B2B Partnership Enquiry
              </h2>
              <p className="text-dark/60 text-sm">
                Complete the form below and our export team will respond within 24 business hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 p-8 bg-[#FAFAF0] border border-green-dark/10 rounded-3xl text-center shadow-md"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-[#1E6B2E] text-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-9 h-9 text-white fill-current stroke-[#1E6B2E]" />
                  </m.div>
                  <h3 className="font-heading text-xl font-bold text-green-dark">Enquiry Submitted!</h3>
                  <p className="text-dark/70 text-sm max-w-sm">
                    Thank you! Our team will contact you shortly to discuss potential collaboration opportunities.
                  </p>
                </m.div>
              ) : (
                <m.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-[#FAFAF0] border border-green-dark/10 rounded-3xl p-6 sm:p-10 shadow-md flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                        placeholder="Snack Importers Ltd"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="country" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                        placeholder="Germany"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                        placeholder="partner@company.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    {/* Partner Type */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="partnerType" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                        Partner Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="partnerType"
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all font-bold"
                      >
                        {partnerTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs uppercase font-extrabold tracking-wider text-dark/65 font-mono">
                      Message / Requirement details
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'loading'}
                      className="bg-white border border-dark/10 rounded-xl py-3 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-[#FFD600] focus:ring-2 focus:ring-[#FFD600]/20 transition-all resize-none"
                      placeholder="Tell us about your distribution reach, monthly requirements, etc."
                    />
                  </div>

                  {/* Button / Errors */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-[#1E6B2E] text-white hover:bg-green-brand font-black text-sm uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2"
                    >
                      {status === 'loading' ? 'Sending Enquiry...' : 'Send Enquiry'}
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

          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
