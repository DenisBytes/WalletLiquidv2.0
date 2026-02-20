'use client'

import { Fragment, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils/cn'

const HEADING = [
  { text: 'Master', accent: false },
  { text: 'Derivatives', accent: true },
  { text: 'Trading.', accent: false },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Gold rule grows from center
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        0
      )

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      )

      // Heading words stagger
      const words = wordRefs.current.filter(Boolean)
      tl.fromTo(
        words,
        { y: '120%', rotateX: -10 },
        {
          y: '0%',
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        0.4
      )

      // Subheading
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.1
      )

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.4
      )

      // Ticker
      tl.fromTo(
        tickerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.6
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grain texture */}
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16">
        {/* Decorative gold rule */}
        <div
          ref={ruleRef}
          className="mx-auto mb-10 h-px w-20 bg-accent origin-center"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 mb-8 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-text-secondary">
            Paper Trading — Zero Risk
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-8">
          {HEADING.map((word, i) => (
            <span key={word.text} className="inline-block overflow-hidden">
              <span
                ref={(el) => { wordRefs.current[i] = el }}
                className={cn(
                  'inline-block',
                  word.accent ? 'text-accent italic' : 'text-text-primary'
                )}
                style={{ transform: 'translateY(120%)' }}
              >
                {word.text}
              </span>
              {i < HEADING.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Trade crypto futures and options with real-time prices, zero capital risk.
          Learn the Greeks, build strategies, and sharpen your edge.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/auth/login"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
          >
            <span>Start Trading</span>
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="/learn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-medium text-text-secondary border border-border hover:text-text-primary transition-colors"
          >
            Explore Courses
          </a>
        </div>
      </div>

      {/* Bottom ticker */}
      <div
        ref={tickerRef}
        className="absolute bottom-0 left-0 right-0 border-t border-border-subtle opacity-0"
      >
        <div className="flex items-center justify-center gap-6 py-4">
          {['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE'].map((symbol, i) => (
            <Fragment key={symbol}>
              {i > 0 && <span className="text-border-subtle">·</span>}
              <span className="font-mono text-xs text-text-muted tracking-wider">{symbol}</span>
            </Fragment>
          ))}
          <span className="hidden sm:inline text-border-subtle ml-2">|</span>
          <span className="hidden sm:inline text-xs text-text-muted">Live Binance Data</span>
        </div>
      </div>
    </section>
  )
}
