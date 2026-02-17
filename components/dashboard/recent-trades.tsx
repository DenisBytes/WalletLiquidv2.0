'use client'

import { cn } from '@/lib/utils/cn'
import type { TradeRow } from './types'

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function relativeTime(date: Date): string {
  const now = Date.now()
  const diff = now - new Date(date).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

const actionConfig = {
  OPEN: { label: 'OPEN', color: 'text-accent', bg: 'bg-accent/15' },
  CLOSE: { label: 'CLOSE', color: 'text-text-primary', bg: 'bg-surface-overlay' },
  LIQUIDATION: { label: 'LIQ', color: 'text-danger', bg: 'bg-danger/15' },
  EXERCISE: { label: 'EXERCISE', color: 'text-success', bg: 'bg-success/15' },
  STOP_LOSS: { label: 'SL', color: 'text-orange-400', bg: 'bg-orange-400/15' },
  TAKE_PROFIT: { label: 'TP', color: 'text-success', bg: 'bg-success/15' },
  FUNDING: { label: 'FUND', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/15' },
} as const

interface RecentTradesProps {
  trades: TradeRow[]
}

export function RecentTrades({ trades }: RecentTradesProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Trades</h2>

      {trades.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-muted">No trades yet</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-1">
            {trades.map((trade) => {
              const config = actionConfig[trade.action]
              const pnl = trade.pnl ? parseFloat(trade.pnl) : null
              const pnlPositive = pnl != null && pnl >= 0

              return (
                <div key={trade.id} className="relative flex items-center gap-3 py-2 pl-1">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'relative z-10 w-[10px] h-[10px] rounded-full shrink-0',
                      trade.action === 'LIQUIDATION'
                        ? 'bg-danger'
                        : trade.action === 'OPEN'
                          ? 'bg-accent'
                          : trade.action === 'FUNDING'
                            ? 'bg-[#3B82F6]'
                            : trade.action === 'STOP_LOSS'
                              ? 'bg-orange-400'
                              : 'bg-text-muted'
                    )}
                  />

                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={cn(
                          'text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0',
                          config.bg,
                          config.color
                        )}
                      >
                        {config.label}
                      </span>
                      <span className="text-sm text-text-primary truncate">
                        {trade.positionId.slice(0, 8)}
                      </span>
                      <span
                        className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded shrink-0',
                          trade.type === 'FUTURES'
                            ? 'bg-accent/10 text-accent'
                            : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        )}
                      >
                        {trade.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {pnl != null && (
                        <span
                          className={cn(
                            'font-numbers text-sm font-medium',
                            pnlPositive ? 'pnl-positive' : 'pnl-negative'
                          )}
                        >
                          {pnlPositive ? '+' : ''}${formatUsd(pnl)}
                        </span>
                      )}
                      <span className="text-xs text-text-muted whitespace-nowrap">
                        {relativeTime(trade.executedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
