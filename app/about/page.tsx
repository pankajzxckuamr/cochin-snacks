import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/ui/PageTransition'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import DotPattern from '@/components/ui/DotPattern'
import { ArrowRight, Award, Leaf, Sprout, Droplets, Flame, Sparkles, Package, Truck } from 'lucide-react'
import GlobalReachSection from '@/components/animations/GlobalReachSection'

import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return generateSeoMetadata({
    title: "About Cochin Snacks — Kerala's Authentic Snack Brand Since 2023",
    description: "Learn about Cochin Snacks, preserving the authentic taste and crunch of Kerala banana chips and traditional savouries. Part of the 75-year legacy of Pavithram Foods.",
    path: "/about",
  })
}

export default function AboutPage() {
  const timelineItems = [
    { year: '1950s', title: 'Pavithram Foods Established', desc: 'Decades of Kerala food expertise and local culinary excellence.' },
    { year: '75 Years', title: 'Legacy of Trust', desc: 'A trusted household name in Kerala food, agriculture, and quality standards.' },
    { year: '2023', title: 'Cochin Snacks Brand Born', desc: 'Launched as a dedicated sub-brand to bring authentic Kerala crunch to global markets.' },
    { year: 'Today', title: 'Global Export Footprint', desc: 'Exporting premium Kerala savouries to 20+ countries worldwide.' },
  ]

  const processSteps = [
    { name: 'Sourcing', desc: 'Raw materials from South Indian farms', icon: <Sprout className="w-6 h-6" /> },
    { name: 'Preparation', desc: 'Sorted and washed raw ingredients', icon: <Droplets className="w-6 h-6" /> },
    { name: 'Frying', desc: 'Fried in 100% pure coconut oil', icon: <Flame className="w-6 h-6" /> },
    { name: 'Seasoning', desc: 'Infused with organic spice blends', icon: <Sparkles className="w-6 h-6" /> },
    { name: 'Packing', desc: 'Airtight nitrogen-flushed packages', icon: <Package className="w-6 h-6" /> },
    { name: 'Distribution', desc: 'Shipped fresh worldwide', icon: <Truck className="w-6 h-6" /> }
  ]

  return (
    <PageTransition>
      <Header />

      <main id="main-content" className="flex-1 bg-cream text-dark overflow-hidden">

        {/* 2. COMPANY OVERVIEW — white */}
        <section className="bg-white pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="flex flex-col items-start">
                <ScrollReveal direction="right">
                  <div className="flex flex-col items-start mb-6">
                    <h2 
                      className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
                      style={{
                        WebkitTextStroke: '2px #ffffff',
                        fontFamily: 'Impact, "Arial Black", sans-serif',
                        filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
                      }}
                    >
                      Taste of Kerala
                    </h2>
                  </div>
                  <div className="text-dark/70 text-base lg:text-lg leading-relaxed flex flex-col gap-5 mb-8">
                    <p className="font-medium text-dark bg-cream border-l-4 border-green-brand rounded-r-2xl pl-5 pr-6 py-4">
                      Cochin Snacks is all about sharing the real taste of Kerala with everyone — not just in India, but everywhere.
                    </p>
                    <p>
                      As part of the Pavithram Group, a big name in food for 75 years, we focus on traditional Kerala snacks people love — banana chips, tapioca chips, murukku, and pakkavada.
                    </p>
                    <p>
                      We bring together old recipes and new ways of making things to create products that are real, clean, and always taste good.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="relative h-[340px] sm:h-[440px] lg:h-[520px]">
                <ScrollReveal direction="left" className="w-full h-full relative">
                  <div className="absolute top-0 right-0 w-[82%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-white bg-white">
                    <Image src="/products/mixture.png" alt="Kerala mixture snack" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute bottom-[4%] left-0 w-[48%] h-[44%] rounded-3xl overflow-hidden shadow-2xl z-20 border-[6px] border-white bg-white">
                    <Image src="/products/pakkavada.png" alt="Kerala pakkavada" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HISTORY TIMELINE — cream */}
        <section className="bg-cream py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
                style={{
                  WebkitTextStroke: '2px #ffffff',
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
                }}
              >
                75 Years Legacy
              </h2>
              <p className="text-dark/60 text-base sm:text-lg mt-4 leading-relaxed">
                From a trusted Kerala food house to a global snack brand.
              </p>
            </div>

            <div className="relative">
              {/* Horizontal connector line (desktop) */}
              <div className="hidden lg:block absolute top-[21px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-green-brand/15 via-green-brand/40 to-green-brand/15" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
                {timelineItems.map((item, idx) => (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.12}>
                    <div className="flex flex-col items-center h-full">
                      {/* Node dot on the line */}
                      <div className="hidden lg:flex mb-8 w-11 h-11 rounded-full bg-white border-2 border-green-brand items-center justify-center shadow-[0_4px_14px_-4px_rgba(45,184,45,0.5)] relative z-10">
                        <span className="w-3.5 h-3.5 rounded-full bg-green-brand" />
                      </div>

                      {/* Card */}
                      <div className="group relative w-full h-full bg-gradient-to-br from-green-brand to-green-dark border border-green-dark/20 rounded-2xl p-6 shadow-[0_14px_34px_-16px_rgba(30,107,46,0.55)] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_22px_46px_-16px_rgba(30,107,46,0.65)] transition-all duration-300">
                        <span className="absolute -bottom-3 right-3 font-heading text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-300 select-none pointer-events-none">
                          0{idx + 1}
                        </span>
                        <span className="relative inline-flex items-center rounded-full bg-white/15 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 mb-3 font-mono">
                          {item.year}
                        </span>
                        <h4 className="relative font-heading text-lg font-bold text-white mb-2">{item.title}</h4>
                        <p className="relative text-white/75 text-sm leading-relaxed">{item.desc}</p>
                        <span className="absolute left-0 bottom-0 h-1 w-0 bg-yellow group-hover:w-full transition-all duration-500 rounded-full" />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. VISION & MISSION — white */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
                style={{
                  WebkitTextStroke: '2px #ffffff',
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
                }}
              >
                Our Vision & Mission
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  icon: <Leaf className="w-7 h-7" />,
                  title: 'Our Vision',
                  text: "To make people all over the world love and trust us as the best Kerala snack brand. We want to bring Kerala's special taste and traditions into every home.",
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  title: 'Our Mission',
                  text: "To deliver fresh, authentic, and high-quality Kerala snacks made using traditional recipes, premium ingredients, and world-class manufacturing standards while ensuring exceptional customer satisfaction and preserving Kerala's culinary heritage.",
                },
              ].map((card, idx) => (
                <ScrollReveal key={card.title} direction="up" delay={idx * 0.1}>
                  <div className="group relative h-full bg-cream rounded-3xl border border-black/[0.06] p-8 sm:p-10 overflow-hidden hover:border-green-brand/40 hover:shadow-[0_16px_40px_-16px_rgba(45,184,45,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
                    <span className="absolute -top-3 right-5 font-mono text-6xl font-black text-black/[0.035] group-hover:text-green-brand/10 transition-colors duration-300 select-none pointer-events-none">
                      0{idx + 1}
                    </span>
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-green-brand to-green-dark text-white flex items-center justify-center shadow-lg shadow-green-brand/25 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {card.icon}
                    </div>
                    <h3 className="relative font-heading text-2xl font-black text-dark group-hover:text-green-brand transition-colors">{card.title}</h3>
                    <p className="relative text-dark/65 text-base leading-relaxed">{card.text}</p>
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-brand to-yellow group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MANUFACTURING — light band */}
        <section className="bg-cream py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] bg-green-brand/[0.07] rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-28 -right-24 w-[32rem] h-[32rem] bg-yellow/10 rounded-full blur-[110px] pointer-events-none" />
          <DotPattern className="top-0 left-0 h-full w-1/4" color="#1E6B2E" opacity={0.07} fade="left" />
          <DotPattern className="top-0 right-0 h-full w-1/4" color="#1E6B2E" opacity={0.07} fade="right" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#1B851B] select-none leading-none py-2"
                style={{
                  WebkitTextStroke: '2px #ffffff',
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  filter: 'drop-shadow(2px 2.5px 0px rgba(0,0,0,0.18))'
                }}
              >
                Our Kitchen
              </h2>
              <p className="text-dark/60 text-base sm:text-lg mt-4 leading-relaxed">
                Based in Ernakulam, our modern facility keeps everything clean and quality-checked — at every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {processSteps.map((step, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                  <div className="group relative h-full bg-white border border-black/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center overflow-hidden hover:border-green-brand/40 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(45,184,45,0.35)] transition-all duration-300">
                    <span className="absolute top-3 right-3.5 font-mono text-xs font-black text-black/[0.06] group-hover:text-green-brand/40 transition-colors select-none pointer-events-none">
                      0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-brand to-green-dark text-white flex items-center justify-center shadow-lg shadow-green-brand/25 mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <h4 className="font-heading text-sm font-bold text-dark mb-1.5 group-hover:text-green-brand transition-colors">{step.name}</h4>
                    <p className="text-dark/55 text-xs leading-relaxed">{step.desc}</p>
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-brand to-green-dark group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FOUNDER'S MESSAGE — white */}
        <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ScrollReveal direction="fade">
              <span className="block font-heading text-green-brand text-6xl font-black leading-none mb-4">“</span>
              <div className="text-dark/75 text-base sm:text-lg italic leading-relaxed flex flex-col gap-5 font-medium">
                <p>
                  Cochin Snacks started with a simple idea: to bring the real taste of Kerala to everyone. We're part of the Pavithram family, and we've always thought that food is about more than just eating — it's about connecting with our culture, memories, and the way we've always done things.
                </p>
                <p>
                  We take old recipes and mix them with new ways of making things to ensure that every time you eat our Cochin Snacks, it tastes the same and feels the same as it has for a long time.
                </p>
                <p>
                  We're grateful to everyone who's been with us on this journey — our amazing customers, distributors, partners, and team members. Now, we're excited to share the delicious snacks of Kerala with even more people all around the world.
                </p>
              </div>
              <div className="mt-8 inline-flex flex-col items-center">
                <span className="w-10 h-0.5 rounded-full bg-green-brand mb-3" />
                <span className="text-sm font-bold text-dark">Founder, Cochin Snacks</span>
                <span className="text-xs text-dark/50 mt-0.5">A Pavithram Group Brand</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. GLOBAL REACH — cream (counter + flag marquee) */}
        <GlobalReachSection bg="cream" />

      </main>

      <Footer />
    </PageTransition>
  )
}
