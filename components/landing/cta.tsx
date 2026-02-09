'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
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

      // Orb pulse
      gsap.to(orbRef.current, {
        scale: 1.1,
        opacity: 0.12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto relative">
        {/* Background glow */}
        <div
          ref={orbRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)' }}
        />

        <div
          ref={contentRef}
          className="relative glass rounded-3xl p-12 md:p-16 text-center opacity-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Ready to start?
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto mb-10">
            Join thousands of traders practicing derivatives with zero risk.
            Your $100,000 paper portfolio is waiting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/api/auth/login"
              className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 gradient-accent" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="relative z-10">Create Free Account</span>
              <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
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
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <span className="font-medium text-text-secondary">WalletLiquid</span>
          <span>Paper trading platform for crypto derivatives</span>
        </div>
      </div>
    </section>
  )
}
