'use client'

import { useMemo } from 'react'
import Link from 'next/link'
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

interface PositionsListProps {
  positions: OpenPositions
}

export function PositionsList({ positions }: PositionsListProps) {
  const totalCount = positions.futures.length + positions.options.length

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Open Positions</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent font-numbers">
          {totalCount}
        </span>
      </div>

      {totalCount === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-muted mb-3">No open positions</p>
          <Link
            href="/trade/futures"
            className="text-accent hover:text-accent-hover text-sm font-medium transition-colors"
          >
            Start trading
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {positions.futures.map((pos) => (
            <FuturesPositionRow key={pos.id} position={pos} />
          ))}
          {positions.options.map((pos) => (
            <OptionsPositionRow key={pos.id} position={pos} />
          ))}
        </div>
      )}
    </div>
  )
}

function FuturesPositionRow({
  position,
}: {
  position: OpenPositions['futures'][number]
}) {
  const prices = usePriceStore((s) => s.prices)

  const { pnl, currentPrice } = useMemo(() => {
    const price = prices.get(position.symbol)
    if (price == null) {
      return { pnl: null, currentPrice: null }
    }
    return {
      pnl: calculatePnl(
        parseFloat(position.entryPrice),
        price,
        parseFloat(position.quantity),
        position.side
      ),
      currentPrice: price,
    }
  }, [prices, position])

  const pnlPositive = pnl != null && pnl >= 0

  return (
    <div className="glass-hover rounded-xl p-4 flex items-center justify-between transition-all cursor-default">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent/15 text-accent">
          FUTURES
        </span>
        <div>
          <p className="text-text-primary font-medium">{position.symbol}</p>
          <p className="text-xs text-text-muted">
            <span
              className={cn(
                'font-medium',
                position.side === 'LONG' ? 'text-success' : 'text-danger'
              )}
            >
              {position.side}
            </span>
            {' '}
            <span className="font-numbers">{position.leverage}x</span>
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-numbers text-sm text-text-secondary">
          {currentPrice != null
            ? `$${formatUsd(currentPrice)}`
            : `$${formatUsd(parseFloat(position.entryPrice))}`}
        </p>
        {pnl != null ? (
          <p
            className={cn(
              'font-numbers text-sm font-medium',
              pnlPositive ? 'pnl-positive' : 'pnl-negative'
            )}
          >
            {pnlPositive ? '+' : ''}${formatUsd(pnl)}
          </p>
        ) : (
          <p className="font-numbers text-sm text-text-muted">--</p>
        )}
      </div>
    </div>
  )
}

function OptionsPositionRow({
  position,
}: {
  position: OpenPositions['options'][number]
}) {
  const premium = parseFloat(position.premium)
  const quantity = parseFloat(position.quantity)
  const totalPremium = premium * quantity

  return (
    <div className="glass-hover rounded-xl p-4 flex items-center justify-between transition-all cursor-default">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#3B82F6]/15 text-[#3B82F6]">
          OPTIONS
        </span>
        <div>
          <p className="text-text-primary font-medium">{position.symbol}</p>
          <p className="text-xs text-text-muted">
            <span className={cn(
              'font-medium',
              position.optionType === 'CALL' ? 'text-success' : 'text-danger'
            )}>
              {position.optionType}
            </span>
            {' '}
            <span className="font-numbers">${formatUsd(parseFloat(position.strikePrice))}</span>
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-numbers text-sm text-text-secondary">
          Premium
        </p>
        <p className="font-numbers text-sm text-text-primary">
          ${formatUsd(totalPremium)}
        </p>
      </div>
    </div>
  )
}
