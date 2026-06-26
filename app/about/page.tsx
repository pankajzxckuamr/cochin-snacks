import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import FlameIcon from '@/components/ui/FlameIcon'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { ArrowRight, Award, ShieldCheck, Heart, Leaf } from 'lucide-react'

import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "About Cochin Snacks — Kerala's Authentic Snack Brand Since 2023",
    description: "Learn about Cochin Snacks, preserving the authentic taste and crunch of Kerala banana chips and traditional savouries. Part of the 75-year legacy of Pavithram Foods.",
    path: "/about",
  })
}

export default function AboutPage() {
  const heroWords = 'Born in Kerala. Loved Worldwide.'.split(' ')
  const timelineItems = [
    { year: '1950s', title: 'Pavithram Foods Established', desc: 'Decades of Kerala food expertise and local culinary excellence.' },
    { year: '75 Years', title: 'Legacy of Trust', desc: 'A trusted household name in Kerala food, agriculture, and quality standards.' },
    { year: '2023', title: 'Cochin Snacks Brand Born', desc: 'Launched as a dedicated sub-brand to bring authentic Kerala crunch to global markets.' },
    { year: 'Today', title: 'Global Export Footprint', desc: 'Exporting premium Kerala savouries to 20+ countries worldwide.' },
  ]

  const processSteps = [
    { name: 'Sourcing', desc: 'Raw materials from South Indian farms' },
    { name: 'Preparation', desc: 'Sorted and washed raw ingredients' },
    { name: 'Frying', desc: 'Fried in 100% pure coconut oil' },
    { name: 'Seasoning', desc: 'Infused with organic spice blends' },
    { name: 'Packing', desc: 'Airtight nitrogen-flushed packages' },
    { name: 'Distribution', desc: 'Shipped fresh worldwide' }
  ]

  const countryPills = [
    'USA', 'UK', 'Germany', 'Netherlands', 'Norway', 'Sweden', 'Canada',
    'Ireland', 'Australia', 'UAE', 'Oman', 'Qatar', 'Kuwait', 'Bahrain',
    'Saudi Arabia', 'France', 'South Africa', 'Malta'
  ]

  return (
    <PageTransition>
      <Header />

      <main id="main-content" className="min-h-screen bg-[#FAFAF0] text-dark overflow-hidden">
        
        {/* 1. HERO SECTION (100vh) */}
        <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-center bg-[#0F0F0F] text-white px-4 text-center select-none overflow-hidden pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.15),transparent)] pointer-events-none" />
          
          {/* Floating Flame Icons */}
          <div className="absolute inset-x-0 top-20 flex justify-center gap-16 pointer-events-none">
            <FlameIcon size="lg" color="red" delay={0.1} />
            <FlameIcon size="lg" color="orange" delay={0.4} />
            <FlameIcon size="lg" color="yellow" delay={0.7} />
          </div>

          <h1 className="relative z-10 font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none max-w-4xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 select-text">
            <span className="text-white">Born in Kerala.</span>
            <span className="text-[#FFD600] drop-shadow-[0_2px_12px_rgba(255,214,0,0.35)]">Loved Worldwide.</span>
          </h1>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <ArrowRight className="w-6 h-6 text-[#FFD600] rotate-90" />
          </div>
        </section>

        {/* 2. COMPANY OVERVIEW SECTION (2-col desktop, image right) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <ScrollReveal direction="left">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#1E6B2E] block mb-2 font-mono">
                  OVERVIEW
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1E6B2E] leading-tight">
                  Cochin Snacks — Sharing the Real Taste of Kerala
                </h2>
                <div className="text-dark/80 text-sm sm:text-base leading-relaxed flex flex-col gap-4 font-body">
                  <p>
                    Cochin Snacks is all about sharing the real taste of Kerala with everyone, not just in India, but everywhere. As part of the Pavithram Group, which has been a big name in food for 75 years, Cochin Snacks focuses on making traditional Kerala snacks that people love — banana chips, tapioca chips, murukku, and pakkavada.
                  </p>
                  <p>
                    By using old recipes and methods, Cochin Snacks brings a piece of Kerala to your home, so you can enjoy the unique flavors of this amazing state.
                  </p>
                  <p>
                    Cochin Snacks brings together old recipes and new ways of making things to create products that are real, clean, and always taste good.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-6 flex justify-center">
              <ScrollReveal direction="right">
                <div className="relative aspect-[6/5] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-off-white">
                  <Image
                    src="/product-family.png"
                    alt="Cochin Snacks Product Family"
                    width={600}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. HISTORY TIMELINE SECTION (dark green bg) */}
        <section className="bg-[#1E6B2E] text-white py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-center text-[#FFD600] mb-16">
              Our History
            </h2>
            
            {/* Timeline container */}
            <div className="relative">
              {/* Vertical line - hidden on mobile, visible on desktop */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#FFD600]/30 hidden md:block" />

              <div className="flex flex-col gap-12 md:gap-16">
                {timelineItems.map((item, idx) => {
                  const isEven = idx % 2 === 0
                  return (
                    <ScrollReveal key={idx} direction={isEven ? 'right' : 'left'}>
                      <div className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        {/* Dot selector */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-4 h-4 bg-[#FFD600] border-2 border-[#1E6B2E] rounded-full z-10 hidden md:block" />

                        {/* Card Column */}
                        <div className="w-full md:w-[45%] bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
                          <span className="text-2xl font-black text-[#FFD600] block mb-2 font-mono">
                            {item.year}
                          </span>
                          <h4 className="font-heading text-lg font-bold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Empty spacing column to balance grid */}
                        <div className="w-full md:w-[45%] hidden md:block" />
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. VISION & MISSION SECTION (2 cards, #FAFAF0) */}
        <section className="bg-[#FAFAF0] py-16 sm:py-24 border-t border-dark/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Vision Card */}
              <ScrollReveal direction="up" delay={0.05}>
                <div className="bg-white rounded-2xl p-8 border border-green-dark/10 shadow-sm h-full flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-brand/10 text-green-dark flex items-center justify-center mb-2">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#1E6B2E]">Our Vision</h3>
                  <p className="text-dark/80 text-sm leading-relaxed">
                    To make people all over the world love and trust us as the best Kerala snack brand. We want to bring Kerala's special taste and traditions into every home.
                  </p>
                </div>
              </ScrollReveal>

              {/* Mission Card */}
              <ScrollReveal direction="up" delay={0.15}>
                <div className="bg-white rounded-2xl p-8 border border-green-dark/10 shadow-sm h-full flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-brand/10 text-green-dark flex items-center justify-center mb-2">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#1E6B2E]">Our Mission</h3>
                  <p className="text-dark/80 text-sm leading-relaxed">
                    To deliver fresh, authentic, and high-quality Kerala snacks made using traditional recipes, premium ingredients, and world-class manufacturing standards while ensuring exceptional customer satisfaction and preserving Kerala's culinary heritage.
                  </p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* 5. MANUFACTURING SECTION (dark bg) */}
        <section className="bg-[#0F0F0F] text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#FFD600] mb-4">
                World-Class Manufacturing in Kerala
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Cochin Snacks has its base in Ernakulam, Kerala, where it uses modern facilities to make its products. It's careful about keeping everything clean and making sure products are good quality — checking every step of the way.
              </p>
            </div>

            {/* Process steps horizontal */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-center">
              {processSteps.map((step, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-md text-center flex flex-col justify-between h-full relative group hover:border-[#FFD600] transition-colors">
                    <div>
                      <span className="text-[10px] font-mono text-[#FFD600] block mb-2 font-bold uppercase tracking-wider">
                        Step 0{idx + 1}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-white mb-2">
                        {step.name}
                      </h4>
                      <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FOUNDER'S MESSAGE (#FAFAF0) */}
        <section className="bg-[#FAFAF0] py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="font-serif text-[#1E6B2E]/10 text-9xl absolute -top-10 left-4 font-black pointer-events-none">
              “
            </span>
            <span className="font-serif text-[#1E6B2E]/10 text-9xl absolute bottom-0 right-4 font-black pointer-events-none">
              ”
            </span>

            <ScrollReveal direction="fade">
              <div className="text-dark/85 text-base sm:text-lg italic leading-relaxed flex flex-col gap-6 font-medium">
                <p>
                  "Cochin Snacks started with a simple idea: to bring the real taste of Kerala to everyone. We're part of the Pavithram family, and we've always thought that food is about more than just eating — it's about connecting with our culture, memories, and the way we've always done things.
                </p>
                <p>
                  We take old recipes and mix them with new ways of making things to ensure that every time you eat our Cochin Snacks, it tastes the same and feels the same as it has for a long time.
                </p>
                <p>
                  We're grateful to everyone who's been with us on this journey — our amazing customers, distributors, partners, and team members. Now, we're excited to share the delicious snacks of Kerala with even more people all around the world."
                </p>
              </div>

              <div className="mt-8">
                <span className="block text-base font-bold text-[#1E6B2E] italic">
                  — Founder, Cochin Snacks
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. EXPORT MARKETS SECTION (dark-gradient) */}
        <section className="bg-gradient-to-r from-[#0F0F0F] to-[#1E6B2E] text-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#FFD600] mb-6">
              Reaching 20+ Countries
            </h2>
            
            <div className="flex justify-center mb-10">
              <AnimatedCounter end={20} suffix="+ Countries" label="Active Export Networks" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {countryPills.map((country) => (
                <span
                  key={country}
                  className="px-4.5 py-1.5 bg-[#FFD600] text-[#0F0F0F] font-bold text-xs uppercase tracking-wider rounded-full shadow-sm"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </PageTransition>
  )
}
