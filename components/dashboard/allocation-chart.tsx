'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'
import type { OpenPositions } from './types'

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

interface AllocationChartProps {
  positions: OpenPositions
  balance: number
}

interface Segment {
  label: string
  value: number
  color: string
  bgClass: string
}

export function AllocationChart({ positions, balance }: AllocationChartProps) {
  const segments = useMemo(() => {
    const futuresMargin = positions.futures.reduce(
      (sum, p) => sum + parseFloat(p.margin),
      0
    )
    const optionsPremium = positions.options.reduce(
      (sum, p) => sum + parseFloat(p.premium) * parseFloat(p.quantity),
      0
    )
    const cash = balance

    const result: Segment[] = []
    if (cash > 0) {
      result.push({ label: 'Cash', value: cash, color: '#7C5CFC', bgClass: 'bg-accent' })
    }
    if (futuresMargin > 0) {
      result.push({ label: 'Futures Margin', value: futuresMargin, color: '#22C55E', bgClass: 'bg-success' })
    }
    if (optionsPremium > 0) {
      result.push({ label: 'Options Premium', value: optionsPremium, color: '#3B82F6', bgClass: 'bg-[#3B82F6]' })
    }
    return result
  }, [positions, balance])

  const total = segments.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Allocation</h2>

      {/* Donut chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            {total > 0 ? (
              segments.reduce<{ elements: React.ReactNode[]; offset: number }>(
                (acc, segment, i) => {
                  const pct = segment.value / total
                  const circumference = Math.PI * 100
                  const dashLength = pct * circumference
                  const dashGap = circumference - dashLength

                  acc.elements.push(
                    <circle
                      key={i}
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="10"
                      strokeDasharray={`${dashLength} ${dashGap}`}
                      strokeDashoffset={-acc.offset}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  )
                  acc.offset += dashLength
                  return acc
                },
                { elements: [], offset: 0 }
              ).elements
            ) : (
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#2A2A3A"
                strokeWidth="10"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-text-muted">Total</span>
            <span className="font-numbers text-sm font-bold text-text-primary">
              ${formatUsd(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {segments.map((segment) => {
          const pct = total > 0 ? ((segment.value / total) * 100).toFixed(1) : '0'
          return (
            <div key={segment.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn('w-2.5 h-2.5 rounded-full', segment.bgClass)} />
                <span className="text-sm text-text-secondary">{segment.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-numbers text-sm text-text-primary">
                  ${formatUsd(segment.value)}
                </span>
                <span className="font-numbers text-xs text-text-muted w-12 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          )
        })}

        {segments.length === 0 && (
          <div className="text-center py-4">
            <p className="text-text-muted text-sm">No allocations</p>
          </div>
        )}
      </div>
    </div>
  )
}
