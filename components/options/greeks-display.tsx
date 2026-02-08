'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'
import type { Greeks } from '@/lib/engine/types'

interface GreeksDisplayProps {
  greeks: Greeks | null
}

const GREEK_CONFIG = [
  {
    key: 'delta' as const,
    label: 'Delta',
    description: 'Price sensitivity',
    min: -1,
    max: 1,
    format: (v: number) => v.toFixed(4),
    color: (v: number) => (v >= 0 ? 'bg-success' : 'bg-danger'),
    barColor: (v: number) => (v >= 0 ? 'text-success' : 'text-danger'),
  },
  {
    key: 'gamma' as const,
    label: 'Gamma',
    description: 'Delta sensitivity',
    min: 0,
    max: 0.05,
    format: (v: number) => v.toFixed(6),
    color: () => 'bg-accent',
    barColor: () => 'text-accent',
  },
  {
    key: 'theta' as const,
    label: 'Theta',
    description: 'Time decay / day',
    min: -500,
    max: 0,
    format: (v: number) => v.toFixed(4),
    color: () => 'bg-danger',
    barColor: () => 'text-danger',
  },
  {
    key: 'vega' as const,
    label: 'Vega',
    description: 'Vol sensitivity',
    min: 0,
    max: 500,
    format: (v: number) => v.toFixed(4),
    color: () => 'bg-accent',
    barColor: () => 'text-accent',
  },
]

export function GreeksDisplay({ greeks }: GreeksDisplayProps) {
  const bars = useMemo(() => {
    if (!greeks) return null

    return GREEK_CONFIG.map((config) => {
      const value = greeks[config.key]
      const range = config.max - config.min
      const normalized = Math.min(
        Math.max((value - config.min) / range, 0),
        1
      )

      return {
        ...config,
        value,
        normalized,
      }
    })
  }, [greeks])

  return (
    <div className="glass rounded-2xl p-5 h-full">
      <h3 className="text-sm font-semibold text-text-primary mb-4">Greeks</h3>

      {!greeks ? (
        <div className="py-8 text-center">
          <p className="text-text-muted text-sm">Select an option to view Greeks</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bars?.map((bar) => (
            <div key={bar.key}>
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <span className={cn('text-sm font-medium', bar.barColor(bar.value))}>
                    {bar.label}
                  </span>
                  <span className="text-text-muted text-[10px] ml-2">
                    {bar.description}
                  </span>
                </div>
                <span className="font-numbers text-sm text-text-primary">
                  {bar.format(bar.value)}
                </span>
              </div>

              <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-300', bar.color(bar.value))}
                  style={{
                    width: `${Math.max(bar.normalized * 100, 2)}%`,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
