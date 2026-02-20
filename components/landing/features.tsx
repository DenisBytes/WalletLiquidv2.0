'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'Futures Trading',
    description: 'Long and short positions with adjustable leverage up to 125x. Real-time liquidation engine and margin management.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 10L16 15L24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 4H24V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: 'text-accent',
    bg: 'bg-accent-muted',
  },
  {
    title: 'Options Trading',
    description: 'Buy and sell calls and puts with Black-Scholes pricing. Full Greeks display — Delta, Gamma, Theta, Vega.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M14 8V14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    accent: 'text-[#A78BFA]',
    bg: 'bg-[#A78BFA]/15',
  },
  {
    title: 'Live Prices',
    description: 'Real-time candlestick charts and price feeds from Binance WebSocket. No API key needed, no delay.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 22V16M10 22V10M14 22V14M18 22V8M22 22V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    accent: 'text-success',
    bg: 'bg-success-muted',
  },
  {
    title: 'Interactive Courses',
    description: '20-chapter options masterclass and futures course. Quizzes, payoff diagrams, and Greeks visualizers built in.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 6H20C21.1 6 22 6.9 22 8V22L17 19L12 22L7 19L4 22V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 11H17M9 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    accent: 'text-[#F9A8D4]',
    bg: 'bg-[#F9A8D4]/15',
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent mb-4 block">
            Features
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            A full-featured paper trading platform with real market data and professional-grade tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group rounded-2xl border border-border bg-surface-raised p-8 hover:border-accent-muted transition-colors duration-300 opacity-0"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.bg} ${feature.accent}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
