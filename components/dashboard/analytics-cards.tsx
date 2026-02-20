'use client'

import { cn } from '@/lib/utils/cn'
import type { Analytics } from '@/lib/engine/analytics'

interface AnalyticsCardsProps {
  analytics: Analytics
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

function formatRatio(value: number): string {
  if (value === Infinity) return '∞'
  return value.toFixed(2)
}

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const cards = [
  {
    key: 'winRate' as const,
    label: 'Win Rate',
    format: (a: Analytics) => a.totalTrades > 0 ? formatPercent(a.winRate) : '--',
    sub: (a: Analytics) => `${a.winningTrades}W / ${a.losingTrades}L`,
    color: (a: Analytics) =>
      a.totalTrades === 0 ? 'text-text-muted' : a.winRate >= 0.5 ? 'text-success' : 'text-danger',
  },
  {
    key: 'profitFactor' as const,
    label: 'Profit Factor',
    format: (a: Analytics) => a.totalTrades > 0 ? formatRatio(a.profitFactor) : '--',
    sub: (a: Analytics) => `${a.totalTrades} trades`,
    color: (a: Analytics) =>
      a.totalTrades === 0 ? 'text-text-muted' : a.profitFactor >= 1 ? 'text-success' : 'text-danger',
  },
  {
    key: 'maxDrawdown' as const,
    label: 'Max Drawdown',
    format: (a: Analytics) => a.totalTrades > 0 ? `$${formatUsd(a.maxDrawdown)}` : '--',
    sub: () => 'peak to trough',
    color: (a: Analytics) => (a.totalTrades === 0 ? 'text-text-muted' : 'text-danger'),
  },
  {
    key: 'sharpeRatio' as const,
    label: 'Sharpe Ratio',
    format: (a: Analytics) => a.totalTrades > 1 ? a.sharpeRatio.toFixed(2) : '--',
    sub: () => 'risk-adjusted return',
    color: (a: Analytics) =>
      a.totalTrades <= 1
        ? 'text-text-muted'
        : a.sharpeRatio > 1
          ? 'text-success'
          : a.sharpeRatio >= 0
            ? 'text-[#FB923C]'
            : 'text-danger',
  },
]

export function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.key} className="glass rounded-2xl p-5">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
            {card.label}
          </p>
          <p className={cn('font-numbers text-2xl font-bold', card.color(analytics))}>
            {card.format(analytics)}
          </p>
          <p className="text-text-muted text-xs mt-1 font-numbers">
            {card.sub(analytics)}
          </p>
        </div>
      ))}
    </div>
  )
}
