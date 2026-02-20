'use client'

import { useState, useEffect, useMemo, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { usePriceStore } from '@/lib/stores/price-store'
import { closeOptionsPosition } from '@/lib/actions/trade'
import { blackScholesCall, blackScholesPut } from '@/lib/engine/options'
import { cn } from '@/lib/utils/cn'
import { OptionChain } from './option-chain'
import { OptionsOrderPanel } from './order-panel'
import { PayoffDiagram } from './payoff-diagram'
import { GreeksDisplay } from './greeks-display'
import { StrategyBuilder } from './strategy-builder'
import type { OptionType, Greeks } from '@/lib/engine/types'
import type { optionsPositions, optionStrategies } from '@/lib/db/schema'

type OptionsRow = typeof optionsPositions.$inferSelect
type StrategyRow = typeof optionStrategies.$inferSelect

const SYMBOLS = ['BTC', 'ETH'] as const

const VOLATILITY = 0.6
const RISK_FREE_RATE = 0.05

function generateStrikes(spot: number, symbol: string): number[] {
  if (!spot) return []

  if (symbol === 'BTC') {
    const base = Math.round(spot / 1000) * 1000
    return [
      base - 15000,
      base - 10000,
      base - 5000,
      base - 3000,
      base - 1000,
      base,
      base + 1000,
      base + 3000,
      base + 5000,
      base + 10000,
      base + 15000,
    ].filter((s) => s > 0)
  }

  // ETH or other
  const base = Math.round(spot / 100) * 100
  return [
    base - 1000,
    base - 500,
    base - 300,
    base - 100,
    base,
    base + 100,
    base + 300,
    base + 500,
    base + 1000,
  ].filter((s) => s > 0)
}

function generateExpirations(): { label: string; days: number; date: Date }[] {
  const now = new Date()
  return [1, 7, 14, 30, 90].map((days) => {
    const date = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
    const label = days === 1 ? '1D' : days === 7 ? '1W' : days === 14 ? '2W' : days === 30 ? '1M' : '3M'
    return { label, days, date }
  })
}

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface OptionsTradingProps {
  initialBalance: number
  initialPositions: OptionsRow[]
  initialStrategies: StrategyRow[]
}

export function OptionsTrading({ initialBalance, initialPositions, initialStrategies }: OptionsTradingProps) {
  const [symbol, setSymbol] = useState<(typeof SYMBOLS)[number]>('BTC')
  const [mode, setMode] = useState<'single' | 'strategy'>('single')
  const [selectedExpiry, setSelectedExpiry] = useState(2) // default 14 days
  const [selectedStrike, setSelectedStrike] = useState<number>(0)
  const [optionType, setOptionType] = useState<OptionType>('CALL')
  const [greeks, setGreeks] = useState<Greeks | null>(null)

  const connect = usePriceStore((s) => s.connect)
  const disconnect = usePriceStore((s) => s.disconnect)
  const spotPrice = usePriceStore((s) => s.getPrice(symbol)) ?? 0

  const expirations = useMemo(() => generateExpirations(), [])

  const strikes = useMemo(() => {
    return generateStrikes(spotPrice, symbol)
  }, [spotPrice, symbol])

  // Set initial strike to ATM when we first get a price
  useEffect(() => {
    if (strikes.length > 0 && selectedStrike === 0) {
      const atm = strikes.reduce((prev, curr) =>
        Math.abs(curr - spotPrice) < Math.abs(prev - spotPrice) ? curr : prev
      )
      setSelectedStrike(atm)
    }
  }, [strikes, spotPrice, selectedStrike])

  useEffect(() => {
    const positionSymbols = initialPositions.map((p) => p.symbol)
    const allSymbols = [...new Set([symbol, ...positionSymbols])]
    connect(allSymbols)
    return () => disconnect()
  }, [symbol, connect, disconnect, initialPositions])

  const handleChainSelect = useCallback((sel: { strikePrice: number; optionType: OptionType }) => {
    setSelectedStrike(sel.strikePrice)
    setOptionType(sel.optionType)
  }, [])

  const handleGreeksChange = useCallback((g: Greeks | null) => {
    setGreeks(g)
  }, [])

  // Calculate premium for payoff diagram
  const premium = useMemo(() => {
    if (!spotPrice || selectedStrike === 0) return 0
    const timeToExpiry = expirations[selectedExpiry].days / 365
    if (timeToExpiry <= 0) return 0

    return optionType === 'CALL'
      ? blackScholesCall(spotPrice, selectedStrike, timeToExpiry, RISK_FREE_RATE, VOLATILITY)
      : blackScholesPut(spotPrice, selectedStrike, timeToExpiry, RISK_FREE_RATE, VOLATILITY)
  }, [spotPrice, selectedStrike, selectedExpiry, optionType, expirations])

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* Header: symbol selector + spot price */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised w-fit">
          {SYMBOLS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSymbol(s)
                setSelectedStrike(0)
              }}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                s === symbol
                  ? 'gradient-accent text-white shadow-lg shadow-accent-muted'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-text-muted text-sm">{symbol}/USDT</span>
          <span className="font-numbers text-lg font-semibold text-text-primary">
            {spotPrice > 0 ? `$${formatUsd(spotPrice)}` : '--'}
          </span>
          <span className={cn(
            'w-2 h-2 rounded-full',
            spotPrice > 0 ? 'bg-success animate-pulse' : 'bg-text-muted'
          )} />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised w-fit">
        {(['single', 'strategy'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              m === mode
                ? 'gradient-accent text-white shadow-lg shadow-accent-muted'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
            )}
          >
            {m === 'single' ? 'Single' : 'Strategy'}
          </button>
        ))}
      </div>

      {mode === 'strategy' ? (
        <StrategyBuilder
          symbol={symbol}
          spotPrice={spotPrice}
          balance={initialBalance}
          strategies={initialStrategies}
        />
      ) : (
      <>
      {/* Option Chain + Order Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <div className="min-w-0 min-h-[420px]">
          <OptionChain
            spotPrice={spotPrice}
            strikes={strikes}
            expirations={expirations}
            selectedExpiry={selectedExpiry}
            onSelectExpiry={setSelectedExpiry}
            selection={selectedStrike ? { strikePrice: selectedStrike, optionType } : null}
            onSelect={handleChainSelect}
            volatility={VOLATILITY}
            riskFreeRate={RISK_FREE_RATE}
          />
        </div>
        <div className="min-w-0">
          <OptionsOrderPanel
            symbol={symbol}
            balance={initialBalance}
            spotPrice={spotPrice}
            strikes={strikes}
            expirations={expirations}
            selectedStrike={selectedStrike || strikes[Math.floor(strikes.length / 2)] || 0}
            selectedExpiry={selectedExpiry}
            optionType={optionType}
            volatility={VOLATILITY}
            riskFreeRate={RISK_FREE_RATE}
            onOptionTypeChange={setOptionType}
            onStrikeChange={setSelectedStrike}
            onExpiryChange={setSelectedExpiry}
            onGreeksChange={handleGreeksChange}
          />
        </div>
      </div>

      {/* Payoff Diagram + Greeks */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <PayoffDiagram
          optionType={optionType}
          side="BUY"
          strikePrice={selectedStrike || strikes[Math.floor(strikes.length / 2)] || 50000}
          premium={premium}
          spotPrice={spotPrice}
        />
        <GreeksDisplay greeks={greeks} />
      </div>

      {/* Open Positions */}
      <OptionsPositionsTable positions={initialPositions} />
      </>
      )}
    </div>
  )
}

function OptionsPositionsTable({ positions }: { positions: OptionsRow[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Open Options</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent font-numbers">
          {positions.length}
        </span>
      </div>

      {positions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-muted text-sm">No open options positions</p>
          <p className="text-text-muted/60 text-xs mt-1">
            Select an option from the chain to get started
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Symbol', 'Type', 'Side', 'Strike', 'Premium', 'Qty', 'Expiry', 'PnL', ''].map(
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
                <OptionsPositionRow key={pos.id} position={pos} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function OptionsPositionRow({ position }: { position: OptionsRow }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const spotPrice = usePriceStore((s) => s.getPrice(position.symbol)) ?? 0

  const premium = parseFloat(position.premium)
  const strike = parseFloat(position.strikePrice)
  const quantity = parseFloat(position.quantity)
  const expiry = new Date(position.expirationDate)
  const daysLeft = Math.max(0, Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  // Estimate current option value for close price
  const currentValue = useMemo(() => {
    if (!spotPrice) return null
    const timeToExpiry = daysLeft / 365
    if (timeToExpiry <= 0) {
      // Expired: intrinsic value only
      if (position.optionType === 'CALL') return Math.max(spotPrice - strike, 0)
      return Math.max(strike - spotPrice, 0)
    }

    return position.optionType === 'CALL'
      ? blackScholesCall(spotPrice, strike, timeToExpiry, RISK_FREE_RATE, VOLATILITY)
      : blackScholesPut(spotPrice, strike, timeToExpiry, RISK_FREE_RATE, VOLATILITY)
  }, [spotPrice, strike, daysLeft, position.optionType])

  const pnl = useMemo(() => {
    if (currentValue === null) return null
    return position.side === 'BUY'
      ? (currentValue - premium) * quantity
      : (premium - currentValue) * quantity
  }, [currentValue, premium, quantity, position.side])

  function handleClose() {
    if (currentValue === null) return

    startTransition(async () => {
      try {
        await closeOptionsPosition(position.id, currentValue)
        router.refresh()
      } catch {
        // Position may already be closed
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
            position.optionType === 'CALL'
              ? 'bg-success-muted text-success'
              : 'bg-danger-muted text-danger'
          )}
        >
          {position.optionType}
        </span>
      </td>

      <td className="py-3 pr-4">
        <span className={cn(
          'text-xs font-medium',
          position.side === 'BUY' ? 'text-accent' : 'text-text-secondary'
        )}>
          {position.side}
        </span>
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        ${formatUsd(strike)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        ${formatUsd(premium)}
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">
        {quantity}
      </td>

      <td className="py-3 pr-4">
        <span className={cn(
          'font-numbers text-xs',
          daysLeft <= 1 ? 'text-danger font-semibold' :
          daysLeft <= 7 ? 'text-[#FB923C]' :
          'text-text-secondary'
        )}>
          {daysLeft}d left
        </span>
      </td>

      <td className="py-3 pr-4">
        {pnl !== null ? (
          <span className={cn('font-numbers text-sm font-medium', pnl >= 0 ? 'pnl-positive' : 'pnl-negative')}>
            {pnl >= 0 ? '+' : '-'}${formatUsd(Math.abs(pnl))}
          </span>
        ) : (
          <span className="font-numbers text-sm text-text-muted">--</span>
        )}
      </td>

      <td className="py-3 text-right">
        <button
          onClick={handleClose}
          disabled={isPending || currentValue === null}
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
