'use client'

import { useState, useMemo, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { blackScholesCall, blackScholesPut, calculateAllGreeks } from '@/lib/engine/options'
import { openOptionsPosition } from '@/lib/actions/trade'
import { cn } from '@/lib/utils/cn'
import type { OptionType, OptionSide, Greeks } from '@/lib/engine/types'

const BALANCE_PERCENTAGES = [25, 50, 75, 100]

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface OrderPanelProps {
  symbol: string
  balance: number
  spotPrice: number
  strikes: number[]
  expirations: { label: string; days: number; date: Date }[]
  selectedStrike: number
  selectedExpiry: number
  optionType: OptionType
  volatility: number
  riskFreeRate: number
  onOptionTypeChange: (type: OptionType) => void
  onStrikeChange: (strike: number) => void
  onExpiryChange: (index: number) => void
  onGreeksChange: (greeks: Greeks | null) => void
}

export function OptionsOrderPanel({
  symbol,
  balance,
  spotPrice,
  strikes,
  expirations,
  selectedStrike,
  selectedExpiry,
  optionType,
  volatility,
  riskFreeRate,
  onOptionTypeChange,
  onStrikeChange,
  onExpiryChange,
  onGreeksChange,
}: OrderPanelProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [side, setSide] = useState<OptionSide>('BUY')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState<string | null>(null)

  const quantityNum = parseFloat(quantity) || 0
  const timeToExpiry = expirations[selectedExpiry].days / 365

  const { premium, greeks } = useMemo(() => {
    if (!spotPrice || timeToExpiry <= 0) {
      return { premium: 0, greeks: null }
    }

    const prem = optionType === 'CALL'
      ? blackScholesCall(spotPrice, selectedStrike, timeToExpiry, riskFreeRate, volatility)
      : blackScholesPut(spotPrice, selectedStrike, timeToExpiry, riskFreeRate, volatility)

    const g = calculateAllGreeks(
      spotPrice, selectedStrike, timeToExpiry, riskFreeRate, volatility, optionType
    )

    return { premium: prem, greeks: g }
  }, [spotPrice, selectedStrike, timeToExpiry, riskFreeRate, volatility, optionType])

  useEffect(() => {
    onGreeksChange(greeks)
  }, [greeks, onGreeksChange])

  const totalCost = premium * quantityNum

  function handleSubmit() {
    if (!spotPrice) {
      setError('Waiting for market price...')
      return
    }
    if (!quantityNum || quantityNum <= 0) {
      setError('Enter a valid quantity')
      return
    }
    if (side === 'BUY' && totalCost > balance) {
      setError('Insufficient balance')
      return
    }
    if (!greeks) {
      setError('Unable to calculate option price')
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        await openOptionsPosition({
          symbol,
          optionType,
          side,
          strikePrice: selectedStrike,
          premium,
          expirationDate: expirations[selectedExpiry].date.toISOString(),
          quantity: quantityNum,
          greeks,
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
      <h3 className="text-sm font-semibold text-text-primary mb-4">Order</h3>

      {/* Option Type toggle */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => onOptionTypeChange('CALL')}
          className={cn(
            'py-2.5 rounded-xl text-sm font-semibold transition-all',
            optionType === 'CALL'
              ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/20'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Call
        </button>
        <button
          onClick={() => onOptionTypeChange('PUT')}
          className={cn(
            'py-2.5 rounded-xl text-sm font-semibold transition-all',
            optionType === 'PUT'
              ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/20'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Put
        </button>
      </div>

      {/* Side toggle */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setSide('BUY')}
          className={cn(
            'py-2 rounded-xl text-xs font-semibold transition-all',
            side === 'BUY'
              ? 'bg-accent/20 text-accent border border-accent/30'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('SELL')}
          className={cn(
            'py-2 rounded-xl text-xs font-semibold transition-all',
            side === 'SELL'
              ? 'bg-accent/20 text-accent border border-accent/30'
              : 'bg-surface-overlay text-text-secondary hover:text-text-primary'
          )}
        >
          Sell
        </button>
      </div>

      {/* Strike price */}
      <div className="mb-4">
        <label className="text-text-secondary text-sm mb-2 block">Strike Price</label>
        <select
          value={selectedStrike}
          onChange={(e) => onStrikeChange(Number(e.target.value))}
          className="w-full bg-surface-overlay border border-border rounded-xl px-4 py-2.5
            font-numbers text-sm text-text-primary
            focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
            transition-all cursor-pointer appearance-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239CA3AF\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          {strikes.map((strike) => (
            <option key={strike} value={strike}>
              ${strike.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      {/* Expiration */}
      <div className="mb-4">
        <label className="text-text-secondary text-sm mb-2 block">Expiration</label>
        <select
          value={selectedExpiry}
          onChange={(e) => onExpiryChange(Number(e.target.value))}
          className="w-full bg-surface-overlay border border-border rounded-xl px-4 py-2.5
            font-numbers text-sm text-text-primary
            focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
            transition-all cursor-pointer appearance-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239CA3AF\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
          {expirations.map((exp, i) => (
            <option key={exp.label} value={i}>
              {exp.label} ({exp.date.toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-sm">Quantity (contracts)</span>
          <span className="font-numbers text-xs text-text-muted">
            Avail: ${formatUsd(balance)}
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
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full bg-surface-overlay border border-border rounded-xl px-4 py-2.5
              font-numbers text-text-primary placeholder:text-text-muted text-sm
              focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
              transition-all [appearance:textfield]
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 mt-2">
          {BALANCE_PERCENTAGES.map((pct) => {
            const maxQty = premium > 0 ? (balance * pct) / 100 / premium : 0
            return (
              <button
                key={pct}
                onClick={() => premium > 0 && setQuantity(Math.floor(maxQty * 100) / 100 + '')}
                className="font-numbers text-xs py-1.5 rounded-lg bg-surface-overlay
                  text-text-secondary hover:text-text-primary hover:bg-surface-overlay/80
                  transition-colors"
              >
                {pct}%
              </button>
            )
          })}
        </div>
      </div>

      {/* Calculated info */}
      <div className="space-y-2 mb-4 py-3 border-t border-b border-border">
        <InfoRow label="Premium / contract" value={premium > 0 ? `$${formatUsd(premium)}` : '--'} />
        <InfoRow label="Total Cost" value={totalCost > 0 ? `$${formatUsd(totalCost)}` : '--'} highlight />
        {greeks && (
          <>
            <InfoRow label="Delta" value={greeks.delta.toFixed(4)} />
            <InfoRow label="Theta" value={greeks.theta.toFixed(4)} />
          </>
        )}
      </div>

      {error && (
        <p className="text-danger text-xs mb-3">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isPending || !spotPrice || !premium}
        className={cn(
          'mt-auto py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed',
          side === 'BUY'
            ? optionType === 'CALL'
              ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30'
              : 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30'
            : 'gradient-accent text-white shadow-lg shadow-accent/20 hover:shadow-accent/30'
        )}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Opening...
          </span>
        ) : (
          `${side === 'BUY' ? 'Buy' : 'Sell'} ${optionType === 'CALL' ? 'Call' : 'Put'}`
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
      <span className="text-text-muted text-xs">{label}</span>
      <span
        className={cn(
          'font-numbers text-sm',
          highlight ? 'text-accent font-semibold' : 'text-text-primary'
        )}
      >
        {value}
      </span>
    </div>
  )
}
