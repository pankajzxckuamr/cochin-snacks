'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { CheckCircle, ArrowRight, Award, ShieldCheck, Package, Truck, Globe, Handshake } from 'lucide-react'
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

      <main id="main-content" className="flex-1 bg-white text-dark">

        {/* HERO SECTION — modern cream banner */}
        <section className="relative bg-cream overflow-hidden py-14 sm:py-20">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Grow With <span className="text-green-brand">Cochin Snacks</span>
            </h1>
            <p className="text-dark/60 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed">
              Whether you're a distributor, retailer, importer, wholesaler, supermarket, or food service business — partner with a trusted Kerala snack brand loved across India and 15+ countries worldwide.
            </p>
          </div>
        </section>

        {/* WHY PARTNER WITH US SECTION */}
        <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-brand/[0.06] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 bg-yellow/[0.07] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <SectionHeading
              title={<>Why Partner <span className="text-green-brand">With Us?</span></>}
              subtitle="Join our expanding global network and bring the authentic taste of Kerala to more customers around the world."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14">
              {[
                {
                  icon: <Award className="w-6 h-6" />,
                  title: 'Authentic Kerala Recipes',
                  desc: 'Traditional snacks and heritage recipes trusted by generations of Kerala families.'
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: 'Consistent Quality',
                  desc: 'World-class hygiene standards and FSSAI-certified production facility in Ernakulam.'
                },
                {
                  icon: <Package className="w-6 h-6" />,
                  title: 'Export-Ready Packaging',
                  desc: 'Attractive, durable packaging designed for international shelf display and shelf life.'
                },
                {
                  icon: <Truck className="w-6 h-6" />,
                  title: 'Reliable Supply Chain',
                  desc: 'Dependable fulfilment, consistent stock availability, and dedicated distribution support.'
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: 'Growing Brand Recognition',
                  desc: 'A trusted name in 15+ countries with loyal diaspora communities worldwide.'
                },
                {
                  icon: <Handshake className="w-6 h-6" />,
                  title: 'Flexible Partnerships',
                  desc: 'Custom terms for distributors, wholesalers, supermarkets, and food service businesses.'
                },
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.06}>
                  <div className="group relative h-full bg-white rounded-2xl border border-black/[0.06] p-6 overflow-hidden hover:border-green-brand/40 hover:shadow-[0_16px_40px_-16px_rgba(45,184,45,0.3)] hover:-translate-y-1 transition-all duration-300">
                    <span className="absolute -top-2 right-4 font-mono text-5xl font-black text-black/[0.035] group-hover:text-green-brand/10 transition-colors duration-300 select-none pointer-events-none">
                      0{idx + 1}
                    </span>
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-green-dark text-white flex items-center justify-center shadow-lg shadow-green-brand/25 mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="relative font-heading text-lg font-bold text-dark group-hover:text-green-brand transition-colors mb-2">{item.title}</h3>
                    <p className="relative text-dark/60 text-sm leading-relaxed">{item.desc}</p>
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-brand to-yellow group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Stats band */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-cream border border-green-brand/15 rounded-3xl p-8">
              <div className="text-center">
                <AnimatedCounter end={76} suffix="+ Years" label="Pavithram Group Legacy" valueClassName="text-green-brand" labelClassName="text-dark/55" />
              </div>
              <div className="text-center border-t sm:border-t-0 sm:border-l border-black/10 pt-6 sm:pt-0 sm:pl-6">
                <AnimatedCounter end={80} suffix="+" label="Authentic SKUs" valueClassName="text-green-brand" labelClassName="text-dark/55" />
              </div>
              <div className="text-center border-t sm:border-t-0 sm:border-l border-black/10 pt-6 sm:pt-0 sm:pl-6">
                <AnimatedCounter end={29} suffix="+" label="Countries Served" valueClassName="text-green-brand" labelClassName="text-dark/55" />
              </div>
            </div>
          </div>
        </section>

        {/* PARTNER ENQUIRY FORM SECTION */}
        <section className="bg-cream border-t border-black/5 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-brand font-mono mb-3 block">
                Let's Collaborate
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-dark tracking-tight mb-3">
                B2B Partnership <span className="text-green-brand">Enquiry</span>
              </h2>
              <p className="text-dark/60 text-sm sm:text-base leading-relaxed">
                Complete the form below and our export team will respond within 24 business hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 p-8 sm:p-10 bg-white border border-black/[0.06] rounded-3xl text-center shadow-sm"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-green-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-green-brand/30"
                  >
                    <CheckCircle className="w-9 h-9" />
                  </m.div>
                  <h3 className="font-heading text-2xl font-black text-dark">Enquiry Submitted!</h3>
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
                  className="bg-white border border-black/[0.06] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-bold text-dark/80">
                        Full Name <span className="text-flame-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-sm font-bold text-dark/80">
                        Company Name <span className="text-flame-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        placeholder="Snack Importers Ltd"
                      />
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="country" className="text-sm font-bold text-dark/80">
                        Country <span className="text-flame-orange">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        placeholder="Germany"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-bold text-dark/80">
                        Email Address <span className="text-flame-orange">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        placeholder="partner@company.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-bold text-dark/80">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    {/* Partner Type */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="partnerType" className="text-sm font-bold text-dark/80">
                        Partner Type <span className="text-flame-orange">*</span>
                      </label>
                      <select
                        id="partnerType"
                        value={formData.partnerType}
                        onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                        disabled={status === 'loading'}
                        className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all font-bold cursor-pointer"
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
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-bold text-dark/80">
                      Message / Requirement details
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'loading'}
                      className="bg-cream border border-black/[0.08] rounded-xl py-3.5 px-4 text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:border-green-brand focus:ring-2 focus:ring-green-brand/20 focus:bg-white transition-all resize-none"
                      placeholder="Tell us about your distribution reach, monthly requirements, etc."
                    />
                  </div>

                  {/* Button / Errors */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-green-brand text-white hover:bg-green-dark font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-lg shadow-green-brand/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-brand focus:ring-offset-2 disabled:opacity-70 disabled:translate-y-0"
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
