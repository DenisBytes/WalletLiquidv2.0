'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const HEADING_WORDS = ['Master', 'Derivatives', 'Trading']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs — slow ambient drift
      gsap.to(orb1Ref.current, {
        x: 60,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(orb2Ref.current, {
        x: -50,
        y: 30,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(orb3Ref.current, {
        x: 40,
        y: 50,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Scanline sweep
      gsap.to(scanlineRef.current, {
        y: '100vh',
        duration: 4,
        repeat: -1,
        ease: 'none',
        delay: 2,
      })

      // Master timeline for entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Grid fade in
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        0
      )

      // Badge slide in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        0.3
      )

      // Heading words stagger
      const words = wordRefs.current.filter(Boolean)
      tl.fromTo(
        words,
        { y: '110%', rotateX: -15 },
        {
          y: '0%',
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
        },
        0.5
      )

      // Subheading
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.2
      )

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.5
      )

      // Ticker
      tl.fromTo(
        tickerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.8
      )

      // Floating particles
      if (particlesRef.current) {
        const dots = particlesRef.current.children
        gsap.fromTo(
          dots,
          { opacity: 0 },
          {
            opacity: () => 0.1 + Math.random() * 0.3,
            duration: 2,
            stagger: { each: 0.15, from: 'random' },
            delay: 0.5,
          }
        )
        Array.from(dots).forEach((dot) => {
          gsap.to(dot, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            duration: `random(6, 12)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Parallax on mouse move
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2

      gsap.to(orb1Ref.current, { x: x * 30, y: y * 20, duration: 1.5, ease: 'power2.out' })
      gsap.to(orb2Ref.current, { x: x * -20, y: y * -15, duration: 1.5, ease: 'power2.out' })
      gsap.to(orb3Ref.current, { x: x * 15, y: y * 25, duration: 1.5, ease: 'power2.out' })
      gsap.to(gridRef.current, { x: x * 5, y: y * 5, duration: 2, ease: 'power2.out' })
    }

    section.addEventListener('mousemove', handleMove)
    return () => section.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Perspective grid floor */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 92, 252, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 92, 252, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)',
        }}
      />

      {/* Gradient orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-[15%] left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C5CFC 0%, transparent 70%)' }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22C55E 0%, transparent 70%)' }}
      />

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-[0.06]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #7C5CFC 50%, transparent 100%)',
          top: '-2vh',
        }}
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-accent"
            style={{
              left: `${5 + ((i * 31) % 90)}%`,
              top: `${5 + ((i * 47) % 90)}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-8 opacity-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-text-muted px-4 py-1.5 rounded-full border border-border/50">
            Paper Trading — Zero Risk
          </span>
        </div>

        {/* Heading — pre-split into word spans for GSAP */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          {HEADING_WORDS.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden">
              <span
                ref={(el) => { wordRefs.current[i] = el }}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #F1F1F4 0%, #7C5CFC 50%, #3B82F6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'translateY(110%)',
                }}
              >
                {word}
              </span>
              {i < HEADING_WORDS.length - 1 && (
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
          Learn the Greeks, build strategies, and sharpen your edge — all with paper money.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Auth0 API route requires full navigation */}
          <a
            href="/auth/login"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 gradient-accent" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10">Start Trading</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="/learn"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-text-secondary border border-border/60 hover:border-accent/40 transition-colors"
          >
            Explore Courses
          </a>
        </div>
      </div>

      {/* Bottom ticker */}
      <div
        ref={tickerRef}
        className="absolute bottom-0 left-0 right-0 border-t border-border/30 opacity-0"
      >
        <div className="flex items-center justify-center gap-8 py-4 overflow-hidden">
          {['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE'].map((symbol) => (
            <div key={symbol} className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-xs font-medium text-text-muted">
                {symbol}
              </span>
              <span className="font-mono text-xs text-success">●</span>
            </div>
          ))}
          <span className="text-xs text-text-muted">Live Binance Prices</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-border/20 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-border/20 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-16 left-8 w-16 h-16 border-l border-b border-border/20 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-16 h-16 border-r border-b border-border/20 rounded-br-lg pointer-events-none" />
    </section>
  )
}
