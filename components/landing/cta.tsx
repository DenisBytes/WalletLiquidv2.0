'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className="relative rounded-2xl border border-border bg-surface-raised p-12 md:p-16 text-center opacity-0"
        >
          {/* Decorative gold rule */}
          <div className="mx-auto mb-8 h-px w-16 bg-accent" />

          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4 italic">
            Ready to start?
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-10">
            Join thousands of traders practicing derivatives with zero risk.
            Your $100,000 paper portfolio is waiting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/auth/login"
              className="group inline-flex items-center gap-2 px-10 py-3.5 rounded-lg text-sm font-semibold bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
            >
              <span>Create Free Account</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-text-muted mt-6">
            No credit card required · Powered by live Binance data
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border-subtle">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <span className="font-medium text-text-secondary">WalletLiquid</span>
          <span>Paper trading platform for crypto derivatives</span>
        </div>
      </div>
    </section>
  )
}
