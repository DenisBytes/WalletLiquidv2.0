'use client'

import { useState, useEffect, useMemo } from 'react'
import { usePriceStore } from '@/lib/stores/price-store'
import { cn } from '@/lib/utils/cn'
import { PriceChart } from './price-chart'
import { OrderPanel } from './order-panel'
import { PositionsTable } from './positions-table'
import { FundingRateBadge } from './funding-rate-badge'
import { applyFundingRates } from '@/lib/actions/funding'
import { useOrderMonitor } from '@/lib/hooks/use-order-monitor'
import type { OrderWithPosition } from '@/lib/hooks/use-order-monitor'
import type { futuresPositions, orders } from '@/lib/db/schema'

type FuturesRow = typeof futuresPositions.$inferSelect
type OrderRow = typeof orders.$inferSelect

const SYMBOLS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE'] as const

interface FuturesTradingProps {
  initialBalance: number
  initialPositions: FuturesRow[]
  initialOrders: OrderRow[]
}

export function FuturesTrading({ initialBalance, initialPositions, initialOrders }: FuturesTradingProps) {
  const [symbol, setSymbol] = useState('BTC')
  const connect = usePriceStore((s) => s.connect)
  const disconnect = usePriceStore((s) => s.disconnect)

  useEffect(() => {
    const positionSymbols = initialPositions.map((p) => p.symbol)
    const allSymbols = [...new Set([symbol, ...positionSymbols])]
    connect(allSymbols)
    return () => disconnect()
  }, [symbol, connect, disconnect, initialPositions])

  // Lazy trigger: apply any pending funding rates when user visits the page
  useEffect(() => {
    applyFundingRates().catch(() => {})
  }, [])

  // Build the order+position mapping for the monitor hook
  const ordersWithPositions = useMemo<OrderWithPosition[]>(() => {
    const positionMap = new Map(initialPositions.map((p) => [p.id, p]))
    const result: OrderWithPosition[] = []

    for (const order of initialOrders) {
      if (order.status !== 'PENDING') continue
      const position = positionMap.get(order.positionId)
      if (!position) continue

      result.push({
        order: {
          id: order.id,
          positionId: order.positionId,
          type: order.type,
          triggerPrice: order.triggerPrice,
          trailingDistance: order.trailingDistance,
          status: order.status,
        },
        positionSide: position.side as 'LONG' | 'SHORT',
        symbol: position.symbol,
      })
    }

    return result
  }, [initialOrders, initialPositions])

  useOrderMonitor(ordersWithPositions)

  return (
    <div className="flex flex-col gap-4">
      {/* Symbol selector + funding rate */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised w-fit overflow-x-auto">
          {SYMBOLS.map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0',
                s === symbol
                  ? 'gradient-accent text-white shadow-lg shadow-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <FundingRateBadge symbol={symbol} />
      </div>

      {/* Chart + Order Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        <div className="min-h-[400px] lg:min-h-[480px]">
          <PriceChart symbol={symbol} />
        </div>
        <div>
          <OrderPanel symbol={symbol} balance={initialBalance} />
        </div>
      </div>

      {/* Positions */}
      <PositionsTable positions={initialPositions} orders={initialOrders} />
    </div>
  )
}
