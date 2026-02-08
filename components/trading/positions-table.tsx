'use client'

import { useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceStore } from '@/lib/stores/price-store'
import { calculatePnl, calculateRoe } from '@/lib/engine/futures'
import { closeFuturesPosition } from '@/lib/actions/trade'
import { cn } from '@/lib/utils/cn'
import type { PositionSide } from '@/lib/engine/types'
import type { futuresPositions } from '@/lib/db/schema'

type FuturesRow = typeof futuresPositions.$inferSelect

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

function formatRoe(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

interface PositionsTableProps {
  positions: FuturesRow[]
}

export function PositionsTable({ positions }: PositionsTableProps) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Open Positions</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent font-numbers">
          {positions.length}
        </span>
      </div>

      {positions.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-text-muted text-sm">No open positions</p>
          <p className="text-text-muted/60 text-xs mt-1">
            Open a long or short position to get started
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Symbol', 'Side', 'Entry Price', 'Mark Price', 'Size', 'Leverage', 'Liq. Price', 'PnL', 'ROE%', ''].map(
                  (header) => (
                    <th
                      key={header || 'action'}
                      className="text-left text-text-muted text-xs font-medium pb-3 pr-4 last:pr-0 last:text-right"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <PositionRow key={pos.id} position={pos} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function PositionRow({ position }: { position: FuturesRow }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const prices = usePriceStore((s) => s.prices)

  const markPrice = prices.get(position.symbol)

  const entryPrice = parseFloat(position.entryPrice)
  const quantity = parseFloat(position.quantity)
  const liqPrice = parseFloat(position.liquidationPrice)
  const margin = parseFloat(position.margin)
  const side = position.side as PositionSide

  const { pnl, roe } = useMemo(() => {
    if (markPrice == null) return { pnl: null, roe: null }

    const pnlVal = calculatePnl(entryPrice, markPrice, quantity, side)
    const roeVal = calculateRoe(pnlVal, margin)
    return { pnl: pnlVal, roe: roeVal }
  }, [markPrice, entryPrice, quantity, side, margin])

  const liqProximity = useMemo(() => {
    if (markPrice == null) return false
    const distance = Math.abs(markPrice - liqPrice) / markPrice
    return distance < 0.05
  }, [markPrice, liqPrice])

  function handleClose() {
    if (!markPrice) return

    startTransition(async () => {
      try {
        await closeFuturesPosition(position.id, markPrice)
        router.refresh()
      } catch {
        // silently fail - position might already be closed
      }
    })
  }

  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-surface-overlay/30 transition-colors">
      <td className="py-3 pr-4">
        <span className="text-text-primary font-medium text-sm">{position.symbol}</span>
      </td>

      <td className="py-3 pr-4">
        <span
          className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-md',
            side === 'LONG'
              ? 'bg-success-muted text-success'
              : 'bg-danger-muted text-danger'
          )}
        >
          {side}
        </span>
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        ${formatUsd(entryPrice)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-primary">
        {markPrice != null ? `$${formatUsd(markPrice)}` : '--'}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        {quantity.toFixed(6)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-accent">
        {position.leverage}x
      </td>

      <td className={cn(
        'py-3 pr-4 font-numbers text-sm',
        liqProximity ? 'text-orange-400 font-semibold' : 'text-text-secondary'
      )}>
        ${formatUsd(liqPrice)}
      </td>

      <td className="py-3 pr-4">
        {pnl != null ? (
          <span className={cn('font-numbers text-sm font-medium', pnl >= 0 ? 'pnl-positive' : 'pnl-negative')}>
            {formatPnl(pnl)}
          </span>
        ) : (
          <span className="font-numbers text-sm text-text-muted">--</span>
        )}
      </td>

      <td className="py-3 pr-4">
        {roe != null ? (
          <span className={cn('font-numbers text-sm font-medium', roe >= 0 ? 'pnl-positive' : 'pnl-negative')}>
            {formatRoe(roe)}
          </span>
        ) : (
          <span className="font-numbers text-sm text-text-muted">--</span>
        )}
      </td>

      <td className="py-3 text-right">
        <button
          onClick={handleClose}
          disabled={isPending || !markPrice}
          className="text-xs font-medium px-3 py-1.5 rounded-lg
            bg-danger-muted text-danger hover:bg-danger/20
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors"
        >
          {isPending ? 'Closing...' : 'Close'}
        </button>
      </td>
    </tr>
  )
}
