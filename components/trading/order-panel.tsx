'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceStore } from '@/lib/stores/price-store'
import { calculateMargin, calculateLiquidationPrice } from '@/lib/engine/futures'
import { openFuturesPosition } from '@/lib/actions/trade'
import { cn } from '@/lib/utils/cn'
import type { PositionSide } from '@/lib/engine/types'

const LEVERAGE_SNAPS = [1, 2, 5, 10, 25, 50, 75, 100, 125]
const BALANCE_PERCENTAGES = [25, 50, 75, 100]

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface OrderPanelProps {
  symbol: string
  balance: number
}

export function OrderPanel({ symbol, balance }: OrderPanelProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [side, setSide] = useState<PositionSide>('LONG')
  const [leverage, setLeverage] = useState(10)
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState<string | null>(null)

  const currentPrice = usePriceStore((s) => s.getPrice(symbol))

  const quantityNum = parseFloat(quantity) || 0
  const price = currentPrice ?? 0

  const calculations = useMemo(() => {
    if (!price || !quantityNum) {
      return { margin: 0, liquidationPrice: 0 }
    }

    const sizeInAsset = quantityNum / price
    const margin = calculateMargin(sizeInAsset, price, leverage)
    const liqPrice = calculateLiquidationPrice(price, leverage, side)

    return { margin, liquidationPrice: liqPrice }
  }, [price, quantityNum, leverage, side])

  function handleSubmit() {
    if (!price) {
      setError('Waiting for market price...')
      return
    }

    if (!quantityNum || quantityNum <= 0) {
      setError('Enter a valid amount')
      return
    }

    if (calculations.margin > balance) {
      setError('Insufficient balance')
      return
    }

    setError(null)
    const sizeInAsset = quantityNum / price

    startTransition(async () => {
      try {
        await openFuturesPosition({
          symbol,
          side,
          entryPrice: price,
          quantity: sizeInAsset,
          leverage,
        })
        setQuantity('')
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to open position')
      }
    })
  }

  return (
    <div className="glass rounded-2xl p-5 h-full flex flex-col">
      {/* Side selector */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <button
          onClick={() => setSide('LONG')}
          className={cn(
            'py-3 rounded-xl text-sm font-semibold transition-all',
            side === 'LONG'
              ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/20'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Long
        </button>
        <button
          onClick={() => setSide('SHORT')}
          className={cn(
            'py-3 rounded-xl text-sm font-semibold transition-all',
            side === 'SHORT'
              ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/20'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Short
        </button>
      </div>

      {/* Leverage */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-sm">Leverage</span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={125}
              value={leverage}
              onChange={(e) => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 1 && v <= 125) setLeverage(v)
              }}
              className="w-12 bg-surface-overlay border border-border rounded-md px-1.5 py-0.5
                font-numbers text-sm font-semibold text-accent text-right
                focus:outline-none focus:border-accent/50
                [appearance:textfield]
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="font-numbers text-sm font-semibold text-accent">x</span>
          </div>
        </div>

        <div className="px-2">
          <input
            type="range"
            min={1}
            max={125}
            step={1}
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-surface-overlay cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
              [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(124,92,252,0.5)]
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow
              [&::-webkit-slider-thumb]:hover:shadow-[0_0_12px_rgba(124,92,252,0.7)]"
          />
        </div>

        <div className="flex mt-2 px-2" style={{ justifyContent: 'space-between' }}>
          {LEVERAGE_SNAPS.map((snap) => (
            <button
              key={snap}
              onClick={() => setLeverage(snap)}
              style={{ left: `${((snap - 1) / 124) * 100}%` }}
              className={cn(
                'font-numbers text-[10px] px-1.5 py-0.5 rounded transition-colors',
                leverage === snap
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {snap}x
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-sm">Amount (USDT)</span>
          <span className="font-numbers text-xs text-text-muted">
            Available: ${formatUsd(balance)}
          </span>
        </div>

        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value)
              setError(null)
            }}
            placeholder="0.00"
            className="w-full bg-surface-overlay border border-border rounded-xl px-4 py-3
              font-numbers text-text-primary placeholder:text-text-muted
              focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
              transition-all [appearance:textfield]
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
            USDT
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          {BALANCE_PERCENTAGES.map((pct) => (
            <button
              key={pct}
              onClick={() => setQuantity(((balance * pct) / 100).toFixed(2))}
              className="font-numbers text-xs py-1.5 rounded-lg bg-surface-overlay
                text-text-secondary hover:text-text-primary hover:bg-surface-overlay/80
                transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Info display */}
      <div className="space-y-2.5 mb-5 py-4 border-t border-b border-border">
        <InfoRow label="Market Price" value={price ? `$${formatUsd(price)}` : '--'} />
        <InfoRow
          label="Margin Required"
          value={calculations.margin > 0 ? `$${formatUsd(calculations.margin)}` : '--'}
        />
        <InfoRow
          label="Liquidation Price"
          value={calculations.liquidationPrice > 0 ? `$${formatUsd(calculations.liquidationPrice)}` : '--'}
          highlight
        />
      </div>

      {error && (
        <p className="text-danger text-xs mb-3">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isPending || !currentPrice}
        className={cn(
          'mt-auto py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed',
          side === 'LONG'
            ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30'
            : 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30'
        )}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Opening...
          </span>
        ) : (
          `Open ${side === 'LONG' ? 'Long' : 'Short'}`
        )}
      </button>
    </div>
  )
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-muted text-sm">{label}</span>
      <span
        className={cn(
          'font-numbers text-sm',
          highlight ? 'text-orange-400' : 'text-text-primary'
        )}
      >
        {value}
      </span>
    </div>
  )
}
