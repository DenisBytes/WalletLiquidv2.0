'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import type { tradeHistory } from '@/lib/db/schema'

type TradeRow = typeof tradeHistory.$inferSelect
type SortKey = 'executedAt' | 'type' | 'action' | 'price' | 'quantity' | 'pnl'
type SortDir = 'asc' | 'desc'

const actionConfig = {
  OPEN: { color: 'text-accent', bg: 'bg-accent/15' },
  CLOSE: { color: 'text-text-primary', bg: 'bg-surface-overlay' },
  LIQUIDATION: { color: 'text-danger', bg: 'bg-danger/15' },
  EXERCISE: { color: 'text-success', bg: 'bg-success/15' },
} as const

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatUsd(value: number): string {
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function formatPnl(value: number): string {
  const formatted = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${value >= 0 ? '+' : '-'}$${formatted}`
}

const columns: { key: SortKey | 'positionId'; label: string; sortable: boolean }[] = [
  { key: 'executedAt', label: 'Date', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'action', label: 'Action', sortable: true },
  { key: 'positionId', label: 'Symbol', sortable: false },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'quantity', label: 'Quantity', sortable: true },
  { key: 'pnl', label: 'PnL', sortable: true },
]

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={cn(
        'inline-block ml-1 transition-colors',
        active ? 'text-accent' : 'text-text-muted/40'
      )}
    >
      <path
        d="M6 2L9 5H3L6 2Z"
        fill={active && dir === 'asc' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M6 10L3 7H9L6 10Z"
        fill={active && dir === 'desc' ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  )
}

interface HistoryTableProps {
  trades: TradeRow[]
}

export function HistoryTable({ trades }: HistoryTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('executedAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = useMemo(() => {
    const copy = [...trades]
    const dir = sortDir === 'asc' ? 1 : -1

    copy.sort((a, b) => {
      switch (sortKey) {
        case 'executedAt':
          return dir * (new Date(a.executedAt).getTime() - new Date(b.executedAt).getTime())
        case 'type':
          return dir * a.type.localeCompare(b.type)
        case 'action':
          return dir * a.action.localeCompare(b.action)
        case 'price':
          return dir * (parseFloat(a.price) - parseFloat(b.price))
        case 'quantity':
          return dir * (parseFloat(a.quantity) - parseFloat(b.quantity))
        case 'pnl': {
          const aPnl = a.pnl ? parseFloat(a.pnl) : -Infinity
          const bPnl = b.pnl ? parseFloat(b.pnl) : -Infinity
          return dir * (aPnl - bPnl)
        }
        default:
          return 0
      }
    })

    return copy
  }, [trades, sortKey, sortDir])

  if (trades.length === 0) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="py-20 text-center">
          <div className="text-text-muted/40 text-4xl mb-3">
            <svg
              className="inline-block"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <p className="text-text-muted text-sm">No trades match your filters</p>
          <p className="text-text-muted/60 text-xs mt-1">
            Try adjusting the filters or make some trades first
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'text-left text-text-muted text-xs font-medium pb-3 pr-4 last:pr-0',
                    col.sortable && 'cursor-pointer select-none hover:text-text-secondary transition-colors'
                  )}
                  onClick={col.sortable ? () => handleSort(col.key as SortKey) : undefined}
                >
                  {col.label}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((trade) => {
              const config = actionConfig[trade.action]
              const pnl = trade.pnl ? parseFloat(trade.pnl) : null

              return (
                <tr
                  key={trade.id}
                  className="border-b border-border/50 last:border-0 glass-hover transition-colors"
                >
                  <td className="py-3 pr-4 text-sm text-text-secondary font-numbers whitespace-nowrap">
                    {formatDate(trade.executedAt)}
                  </td>

                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded',
                        trade.type === 'FUTURES'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                      )}
                    >
                      {trade.type}
                    </span>
                  </td>

                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded',
                        config.bg,
                        config.color
                      )}
                    >
                      {trade.action}
                    </span>
                  </td>

                  <td className="py-3 pr-4 text-sm text-text-secondary font-numbers">
                    {trade.positionId.slice(0, 8)}
                  </td>

                  <td className="py-3 pr-4 text-sm text-text-primary font-numbers">
                    ${formatUsd(parseFloat(trade.price))}
                  </td>

                  <td className="py-3 pr-4 text-sm text-text-secondary font-numbers">
                    {parseFloat(trade.quantity).toFixed(6)}
                  </td>

                  <td className="py-3 pr-0">
                    {pnl != null ? (
                      <span
                        className={cn(
                          'font-numbers text-sm font-medium',
                          pnl >= 0 ? 'pnl-positive' : 'pnl-negative'
                        )}
                      >
                        {formatPnl(pnl)}
                      </span>
                    ) : (
                      <span className="text-text-muted text-sm">&mdash;</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
