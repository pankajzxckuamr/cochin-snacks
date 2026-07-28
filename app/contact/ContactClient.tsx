'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import DotPattern from '@/components/ui/DotPattern'
import { CheckCircle, User, Tag, MessageSquare, Send, Mail } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

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
        <section className="relative bg-cream overflow-hidden pt-14 pb-4 sm:pt-20 sm:pb-6">
          <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] bg-yellow/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] bg-green-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/3" color="#1E6B2E" opacity={0.08} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 sm:pt-6 sm:pb-20">
          <div className="max-w-2xl mx-auto w-full">
            <ScrollReveal direction="up">
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
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
