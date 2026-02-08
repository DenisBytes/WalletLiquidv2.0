'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <main>
      {/* Hero Section — Task 21 */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold gradient-accent-text">
          WalletLiquid
        </h1>
      </section>

      {/* Features Section — Task 22 */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-text-secondary">Features coming soon</p>
      </section>

      {/* How It Works — Task 22 */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-text-secondary">How it works coming soon</p>
      </section>

      {/* CTA — Task 23 */}
      <section className="h-screen flex items-center justify-center">
        <a
          href="/api/auth/login"
          className="gradient-accent px-8 py-4 rounded-xl text-lg font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Start Trading
        </a>
      </section>
    </main>
  )
}
