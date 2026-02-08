'use client'

import { useState, useEffect } from 'react'
import { usePriceStore } from '@/lib/stores/price-store'
import { cn } from '@/lib/utils/cn'
import { PriceChart } from './price-chart'
import { OrderPanel } from './order-panel'
import { PositionsTable } from './positions-table'
import type { futuresPositions } from '@/lib/db/schema'

type FuturesRow = typeof futuresPositions.$inferSelect

const SYMBOLS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE'] as const

interface FuturesTradingProps {
  initialBalance: number
  initialPositions: FuturesRow[]
}

export function FuturesTrading({ initialBalance, initialPositions }: FuturesTradingProps) {
  const [symbol, setSymbol] = useState('BTC')
  const connect = usePriceStore((s) => s.connect)
  const disconnect = usePriceStore((s) => s.disconnect)

  useEffect(() => {
    const positionSymbols = initialPositions.map((p) => p.symbol)
    const allSymbols = [...new Set([symbol, ...positionSymbols])]
    connect(allSymbols)
    return () => disconnect()
  }, [symbol, connect, disconnect, initialPositions])

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Symbol selector */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised w-fit">
        {SYMBOLS.map((s) => (
          <button
            key={s}
            onClick={() => setSymbol(s)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              s === symbol
                ? 'gradient-accent text-white shadow-lg shadow-accent/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chart + Order Panel */}
      <div className="grid grid-cols-5 gap-4 min-h-[480px]">
        <div className="col-span-3">
          <PriceChart symbol={symbol} />
        </div>
        <div className="col-span-2">
          <OrderPanel symbol={symbol} balance={initialBalance} />
        </div>
      </div>

      {/* Positions */}
      <PositionsTable positions={initialPositions} />
    </div>
  )
}
