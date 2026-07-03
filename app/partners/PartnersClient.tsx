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
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFD600] block mb-4 font-mono">
              B2B &amp; Export Partnerships
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
              Grow With Cochin Snacks
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Whether you're a distributor, retailer, importer, wholesaler, supermarket, or food service business — partner with a trusted Kerala snack brand loved across India and 15+ countries worldwide.
            </p>
          </div>
        </section>

        {/* WHY PARTNER WITH US SECTION */}
        <section className="bg-gradient-to-b from-[#0F0F0F] to-[#0a3015] text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFD600] block mb-3 font-mono">
                Partnership Benefits
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-white mb-3">
                Why Partner With Us?
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
                Join our expanding global network and bring the authentic taste of Kerala to more customers around the world.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {[
                {
                  icon: '🏆',
                  title: 'Authentic Kerala Recipes',
                  desc: 'Traditional snacks and heritage recipes trusted by generations of Kerala families.'
                },
                {
                  icon: '✅',
                  title: 'Consistent Quality',
                  desc: 'World-class hygiene standards and FSSAI-certified production facility in Ernakulam.'
                },
                {
                  icon: '📦',
                  title: 'Export-Ready Packaging',
                  desc: 'Attractive, durable packaging designed for international shelf display and shelf life.'
                },
                {
                  icon: '🚚',
                  title: 'Reliable Supply Chain',
                  desc: 'Dependable fulfilment, consistent stock availability, and dedicated distribution support.'
                },
                {
                  icon: '🌍',
                  title: 'Growing Brand Recognition',
                  desc: 'A trusted name in 15+ countries with loyal diaspora communities worldwide.'
                },
                {
                  icon: '🤝',
                  title: 'Flexible Partnerships',
                  desc: 'Custom terms for distributors, wholesalers, supermarkets, and food service businesses.'
                },
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                  <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD600]/40 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,214,0,0.1)] h-full">
                    <span className="text-3xl leading-none">{item.icon}</span>
                    <h3 className="font-heading text-base font-bold text-[#FFD600]">{item.title}</h3>
                    <p className="text-white/65 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Stats band */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#FFD600]/5 border border-[#FFD600]/20 rounded-3xl p-8">
              <div className="text-center">
                <AnimatedCounter end={76} suffix="+ Years" label="Pavithram Group Legacy" />
              </div>
              <div className="text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-6">
                <AnimatedCounter end={80} suffix="+" label="Authentic SKUs" />
              </div>
              <div className="text-center border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-6">
                <AnimatedCounter end={29} suffix="+" label="Countries Served" />
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
