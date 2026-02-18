'use client'

import { useState, useEffect, useCallback } from 'react'
import { getCurrentFundingRate } from '@/lib/actions/funding'
import { cn } from '@/lib/utils/cn'

interface FundingRateBadgeProps {
  symbol: string
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0h 0m'
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

export function FundingRateBadge({ symbol }: FundingRateBadgeProps) {
  const [rate, setRate] = useState<number | null>(null)
  const [nextFundingTime, setNextFundingTime] = useState<number | null>(null)
  const [countdown, setCountdown] = useState<string>('')

  const fetchRate = useCallback(async () => {
    try {
      const data = await getCurrentFundingRate(symbol)
      setRate(data.rate)
      setNextFundingTime(data.nextFundingTime)
    } catch {
      setRate(null)
      setNextFundingTime(null)
    }
  }, [symbol])

  useEffect(() => {
    fetchRate()
  }, [fetchRate])

  // Countdown timer
  useEffect(() => {
    if (nextFundingTime == null) return

    function tick() {
      const remaining = nextFundingTime! - Date.now()
      setCountdown(formatCountdown(Math.max(0, remaining)))
    }

    tick()
    const interval = setInterval(tick, 60_000)
    return () => clearInterval(interval)
  }, [nextFundingTime])

  if (rate == null) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised text-xs text-text-muted">
        <span>Funding: --</span>
      </div>
    )
  }

  const ratePercent = (rate * 100).toFixed(4)
  // rate > 0 means longs pay shorts (red/orange for longs)
  // rate < 0 means shorts pay longs (green for longs)
  const isPositive = rate > 0
  const isNeutral = rate === 0

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-text-muted">Funding</span>
        <span
          className={cn(
            'text-xs font-semibold font-numbers',
            isNeutral && 'text-text-secondary',
            isPositive && 'text-orange-400',
            !isPositive && !isNeutral && 'text-emerald-400'
          )}
        >
          {isPositive ? '+' : ''}{ratePercent}%
        </span>
      </div>
      {countdown && (
        <div className="flex items-center gap-1 border-l border-border pl-2">
          <span className="text-xs text-text-muted">Next:</span>
          <span className="text-xs font-numbers text-text-secondary">{countdown}</span>
        </div>
      )}
    </div>
  )
}
