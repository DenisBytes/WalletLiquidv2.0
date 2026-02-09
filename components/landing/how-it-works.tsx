'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up with one click. You start with $100,000 in paper money — no credit card, no deposits.',
  },
  {
    number: '02',
    title: 'Learn the Fundamentals',
    description: 'Work through interactive courses on futures and options. Quizzes and visual tools make concepts stick.',
  },
  {
    number: '03',
    title: 'Trade with Real Prices',
    description: 'Open positions on BTC, ETH, SOL and more using live Binance data. Track PnL in real time.',
  },
  {
    number: '04',
    title: 'Build Your Edge',
    description: 'Analyze your trade history, refine strategies, and build confidence before going live.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

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
          },
        }
      )

      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )

      // Steps stagger
      stepsRef.current.filter(Boolean).forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            From zero to trader
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el }}
                className="relative flex items-start gap-8 opacity-0"
              >
                {/* Dot on timeline */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-surface shrink-0 z-10" />

                {/* Content — alternating sides on desktop */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <span className="font-mono text-sm text-accent font-bold">{step.number}</span>
                  <h3 className="text-xl font-semibold text-text-primary mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
