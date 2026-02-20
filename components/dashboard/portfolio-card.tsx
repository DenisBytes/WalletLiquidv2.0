'use client'

import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { usePriceStore } from '@/lib/stores/price-store'
import { calculatePnl } from '@/lib/engine/futures'
import { cn } from '@/lib/utils/cn'
import type { OpenPositions } from './types'

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

interface PortfolioCardProps {
  balance: number
  positions: OpenPositions
}

export function PortfolioCard({ balance, positions }: PortfolioCardProps) {
  const balanceRef = useRef<HTMLSpanElement>(null)
  const counterRef = useRef({ value: 0 })
  const prices = usePriceStore((s) => s.prices)

  // Connect to price feed for all symbols with open futures positions
  useEffect(() => {
    const symbols = positions.futures.map((p) => p.symbol)
    const unique = [...new Set(symbols)]
    if (unique.length > 0) {
      usePriceStore.getState().connect(unique)
    }
    return () => usePriceStore.getState().disconnect()
  }, [positions.futures])

  // Animate balance counter on mount
  useEffect(() => {
    if (!balanceRef.current) return
    gsap.to(counterRef.current, {
      value: balance,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate() {
        if (balanceRef.current) {
          balanceRef.current.textContent = `$${formatUsd(counterRef.current.value)}`
        }
      },
    })
  }, [balance])

  const unrealizedPnl = useMemo(() => {
    let total = 0
    for (const pos of positions.futures) {
      const currentPrice = prices.get(pos.symbol)
      if (currentPrice != null) {
        total += calculatePnl(
          parseFloat(pos.entryPrice),
          currentPrice,
          parseFloat(pos.quantity),
          pos.side
        )
      }
    }
    return total
  }, [positions.futures, prices])

  const pnlPositive = unrealizedPnl >= 0

  return (
    <div className="glass rounded-2xl p-6 h-full relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent" />

      <p className="text-text-secondary text-sm mb-1">Portfolio Value</p>
      <span
        ref={balanceRef}
        className="font-numbers text-4xl font-bold text-text-primary block"
      >
        $0.00
      </span>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-text-secondary text-sm">Unrealized PnL</span>
        <span
          className={cn(
            'font-numbers text-sm font-medium',
            pnlPositive ? 'pnl-positive' : 'pnl-negative'
          )}
        >
          {pnlPositive ? '+' : ''}${formatUsd(unrealizedPnl)}
        </span>
      </div>

      {/* Sparkline placeholder */}
      <div className="mt-6 h-16 rounded-lg overflow-hidden relative">
        <svg
          viewBox="0 0 400 64"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 48 Q50 40 80 32 T160 28 T240 20 T320 24 T400 16"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
          />
          <path
            d="M0 48 Q50 40 80 32 T160 28 T240 20 T320 24 T400 16 V64 H0 Z"
            fill="url(#sparkline-gradient)"
          />
        </svg>
      </div>
    </div>
  )
}
