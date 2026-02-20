'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import {
  STRATEGY_TEMPLATES,
  generateStrategyLegs,
  calculateStrategyPayoff,
  calculateStrategyGreeks,
  calculateStrategyMetrics,
} from '@/lib/engine/strategies'
import type { StrategyType, StrategyLeg } from '@/lib/engine/strategies'
import { openStrategy, closeStrategy } from '@/lib/actions/strategies'
import type { optionStrategies } from '@/lib/db/schema'

type StrategyRow = typeof optionStrategies.$inferSelect

const VOLATILITY = 0.6
const RISK_FREE_RATE = 0.05

const STRATEGY_TYPES: StrategyType[] = [
  'BULL_CALL_SPREAD',
  'BEAR_PUT_SPREAD',
  'STRADDLE',
  'STRANGLE',
  'IRON_CONDOR',
]

const WIDTH = 500
const HEIGHT = 280
const PADDING = { top: 30, right: 40, bottom: 40, left: 60 }
const CHART_W = WIDTH - PADDING.left - PADDING.right
const CHART_H = HEIGHT - PADDING.top - PADDING.bottom

function formatUsd(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatCompact(val: number): string {
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(0)}k`
  return val.toFixed(0)
}

interface StrategyBuilderProps {
  symbol: string
  spotPrice: number
  balance: number
  strategies: StrategyRow[]
}

export function StrategyBuilder({ symbol, spotPrice, balance, strategies }: StrategyBuilderProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyType>('BULL_CALL_SPREAD')
  const [selectedExpiry, setSelectedExpiry] = useState(2) // default 14 days

  const expirations = useMemo(
    () =>
      [1, 7, 14, 30, 90].map((days) => {
        const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        const label =
          days === 1 ? '1D' : days === 7 ? '1W' : days === 14 ? '2W' : days === 30 ? '1M' : '3M'
        return { label, days, date }
      }),
    []
  )

  const legs = useMemo(() => {
    if (!spotPrice) return []
    return generateStrategyLegs(
      selectedStrategy,
      spotPrice,
      VOLATILITY,
      RISK_FREE_RATE,
      expirations[selectedExpiry].days
    )
  }, [selectedStrategy, spotPrice, selectedExpiry, expirations])

  const payoffData = useMemo(() => {
    if (legs.length === 0 || !spotPrice) return []
    return calculateStrategyPayoff(legs, spotPrice)
  }, [legs, spotPrice])

  const greeks = useMemo(() => {
    if (legs.length === 0) return null
    return calculateStrategyGreeks(legs)
  }, [legs])

  const metrics = useMemo(() => {
    if (legs.length === 0 || !spotPrice) return null
    return calculateStrategyMetrics(legs, spotPrice)
  }, [legs, spotPrice])

  function handleExecute() {
    if (!metrics) return

    startTransition(async () => {
      try {
        await openStrategy({
          symbol,
          strategyType: selectedStrategy,
          legs,
          expirationDate: expirations[selectedExpiry].date,
          maxProfit: metrics.maxProfit,
          maxLoss: metrics.maxLoss,
        })
        router.refresh()
      } catch {
        // Insufficient balance or other error
      }
    })
  }

  const netPremium = metrics?.netPremium ?? 0
  const canAfford = netPremium <= 0 || balance >= netPremium

  return (
    <div className="flex flex-col gap-4">
      {/* Strategy Selector */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Select Strategy</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STRATEGY_TYPES.map((type) => {
            const template = STRATEGY_TEMPLATES[type]
            return (
              <button
                key={type}
                onClick={() => setSelectedStrategy(type)}
                className={cn(
                  'flex-shrink-0 rounded-xl px-4 py-3 text-left transition-all border',
                  'min-w-[160px]',
                  type === selectedStrategy
                    ? 'border-accent bg-accent-muted shadow-lg shadow-accent-muted'
                    : 'border-border bg-surface-overlay hover:border-border hover:bg-surface-overlay/80'
                )}
              >
                <p className={cn(
                  'text-sm font-medium',
                  type === selectedStrategy ? 'text-accent' : 'text-text-primary'
                )}>
                  {template.name}
                </p>
                <p className="text-[11px] text-text-muted mt-1 line-clamp-1">
                  {template.description.split('.')[0]}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Expiry Selector */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Expiration</h3>
        <div className="flex gap-1.5">
          {expirations.map((exp, i) => (
            <button
              key={exp.days}
              onClick={() => setSelectedExpiry(i)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                i === selectedExpiry
                  ? 'gradient-accent text-white shadow-lg shadow-accent-muted'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              )}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legs Preview + Payoff + Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Left column: Legs + Summary */}
        <div className="flex flex-col gap-4">
          {/* Legs Preview */}
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Strategy Legs</h3>
            {legs.length === 0 ? (
              <p className="text-text-muted text-sm py-4 text-center">
                Waiting for price data...
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {['Type', 'Side', 'Strike', 'Premium', 'Qty'].map((h) => (
                        <th
                          key={h}
                          className="text-left text-text-muted text-xs font-medium pb-2 pr-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {legs.map((leg, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-2.5 pr-3">
                          <span
                            className={cn(
                              'text-xs font-semibold px-2 py-0.5 rounded-md',
                              leg.optionType === 'CALL'
                                ? 'bg-success-muted text-success'
                                : 'bg-danger-muted text-danger'
                            )}
                          >
                            {leg.optionType}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span
                            className={cn(
                              'text-xs font-medium',
                              leg.side === 'BUY' ? 'text-success' : 'text-danger'
                            )}
                          >
                            {leg.side}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 font-numbers text-sm text-text-secondary">
                          ${formatUsd(leg.strike)}
                        </td>
                        <td className="py-2.5 pr-3 font-numbers text-sm text-text-secondary">
                          ${formatUsd(leg.premium)}
                        </td>
                        <td className="py-2.5 font-numbers text-sm text-text-secondary">
                          {leg.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Strategy Summary */}
          {metrics && greeks && (
            <div className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <SummaryItem
                  label="Net Premium"
                  value={`${netPremium > 0 ? 'Debit' : 'Credit'} $${formatUsd(Math.abs(netPremium))}`}
                  valueClass={netPremium > 0 ? 'text-danger' : 'text-success'}
                />
                <SummaryItem
                  label="Max Profit"
                  value={
                    metrics.maxProfit > 1e8
                      ? 'Unlimited'
                      : `$${formatUsd(metrics.maxProfit)}`
                  }
                  valueClass="text-success"
                />
                <SummaryItem
                  label="Max Loss"
                  value={
                    metrics.maxLoss < -1e8
                      ? 'Unlimited'
                      : `$${formatUsd(Math.abs(metrics.maxLoss))}`
                  }
                  valueClass="text-danger"
                />
                <SummaryItem
                  label="Breakeven"
                  value={
                    metrics.breakevens.length === 0
                      ? '--'
                      : metrics.breakevens.map((b) => `$${formatCompact(b)}`).join(', ')
                  }
                  valueClass="text-accent"
                />
              </div>

              {/* Combined Greeks */}
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs font-medium text-text-muted mb-2">Combined Greeks</p>
                <div className="grid grid-cols-4 gap-2">
                  {([
                    { key: 'delta', label: 'Delta' },
                    { key: 'gamma', label: 'Gamma' },
                    { key: 'theta', label: 'Theta' },
                    { key: 'vega', label: 'Vega' },
                  ] as const).map(({ key, label }) => (
                    <div key={key} className="text-center">
                      <p className="text-[10px] text-text-muted">{label}</p>
                      <p className="font-numbers text-xs text-text-primary">
                        {greeks[key].toFixed(4)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execute Button */}
              <button
                onClick={handleExecute}
                disabled={isPending || !canAfford || legs.length === 0}
                className={cn(
                  'w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all',
                  'gradient-accent text-white shadow-lg shadow-accent-muted',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none'
                )}
              >
                {isPending
                  ? 'Executing...'
                  : !canAfford
                    ? 'Insufficient Balance'
                    : `Execute ${STRATEGY_TEMPLATES[selectedStrategy].name}`}
              </button>
            </div>
          )}
        </div>

        {/* Right column: Payoff Chart */}
        <div className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Payoff at Expiration</h3>
          {payoffData.length > 0 && metrics ? (
            <StrategyPayoffChart
              payoffData={payoffData}
              metrics={metrics}
              spotPrice={spotPrice}
            />
          ) : (
            <div className="flex items-center justify-center h-[280px]">
              <p className="text-text-muted text-sm">Waiting for price data...</p>
            </div>
          )}
        </div>
      </div>

      {/* Open Strategies Table */}
      <OpenStrategiesTable strategies={strategies} />
    </div>
  )
}

function SummaryItem({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass: string
}) {
  return (
    <div className="bg-surface-overlay rounded-xl px-3 py-2.5">
      <p className="text-[10px] text-text-muted mb-0.5">{label}</p>
      <p className={cn('font-numbers text-sm font-medium', valueClass)}>{value}</p>
    </div>
  )
}

function StrategyPayoffChart({
  payoffData,
  metrics,
  spotPrice,
}: {
  payoffData: { price: number; payoff: number }[]
  metrics: { maxProfit: number; maxLoss: number; breakevens: number[]; netPremium: number }
  spotPrice: number
}) {
  const { pathD, profitFillD, lossFillD, xMin, xMax, yMin, yMax } = useMemo(() => {
    let minY = Infinity
    let maxY = -Infinity
    const xMin = payoffData[0].price
    const xMax = payoffData[payoffData.length - 1].price

    for (const p of payoffData) {
      if (p.payoff < minY) minY = p.payoff
      if (p.payoff > maxY) maxY = p.payoff
    }

    const yPad = Math.max((maxY - minY) * 0.15, 100)
    const yMin = minY - yPad
    const yMax = maxY + yPad

    const sx = (val: number) => PADDING.left + ((val - xMin) / (xMax - xMin)) * CHART_W
    const sy = (val: number) => PADDING.top + (1 - (val - yMin) / (yMax - yMin)) * CHART_H
    const zeroY = sy(0)

    // Main path
    const pathD = payoffData
      .map((p, i) => {
        const x = sx(p.price)
        const y = sy(p.payoff)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')

    // Profit and loss fills
    let profitPath = ''
    let lossPath = ''
    let profitStarted = false
    let lossStarted = false

    for (let i = 0; i < payoffData.length; i++) {
      const x = sx(payoffData[i].price)
      const y = sy(payoffData[i].payoff)

      if (payoffData[i].payoff >= 0) {
        if (!profitStarted) {
          profitPath += `M${x.toFixed(2)},${zeroY.toFixed(2)} L${x.toFixed(2)},${y.toFixed(2)}`
          profitStarted = true
        } else {
          profitPath += ` L${x.toFixed(2)},${y.toFixed(2)}`
        }
        if (i === payoffData.length - 1 || payoffData[i + 1].payoff < 0) {
          profitPath += ` L${x.toFixed(2)},${zeroY.toFixed(2)} Z`
          profitStarted = false
        }
      } else {
        if (!lossStarted) {
          lossPath += `M${x.toFixed(2)},${zeroY.toFixed(2)} L${x.toFixed(2)},${y.toFixed(2)}`
          lossStarted = true
        } else {
          lossPath += ` L${x.toFixed(2)},${y.toFixed(2)}`
        }
        if (i === payoffData.length - 1 || payoffData[i + 1].payoff >= 0) {
          lossPath += ` L${x.toFixed(2)},${zeroY.toFixed(2)} Z`
          lossStarted = false
        }
      }
    }

    return {
      pathD,
      profitFillD: profitPath || 'M0,0',
      lossFillD: lossPath || 'M0,0',
      xMin,
      xMax,
      yMin,
      yMax,
    }
  }, [payoffData])

  const scaleX = (val: number) => PADDING.left + ((val - xMin) / (xMax - xMin)) * CHART_W
  const scaleY = (val: number) => PADDING.top + (1 - (val - yMin) / (yMax - yMin)) * CHART_H

  const zeroY = scaleY(0)

  const xTicks = useMemo(() => {
    const step = (xMax - xMin) / 5
    const ticks: number[] = []
    for (let i = 0; i <= 5; i++) {
      ticks.push(Math.round((xMin + step * i) / 100) * 100)
    }
    return ticks
  }, [xMin, xMax])

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
      {/* Zero line */}
      <line
        x1={PADDING.left}
        y1={zeroY}
        x2={WIDTH - PADDING.right}
        y2={zeroY}
        stroke="var(--color-border)"
        strokeWidth="1"
        strokeDasharray="4,4"
      />

      {/* Filled regions */}
      <path d={profitFillD} fill="var(--color-success)" opacity="0.1" />
      <path d={lossFillD} fill="var(--color-danger)" opacity="0.1" />

      {/* Main payoff curve */}
      <path
        d={pathD}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Breakeven lines */}
      {metrics.breakevens.map((be, i) => {
        const bx = scaleX(be)
        if (bx < PADDING.left || bx > WIDTH - PADDING.right) return null
        return (
          <g key={i}>
            <line
              x1={bx}
              y1={PADDING.top}
              x2={bx}
              y2={HEIGHT - PADDING.bottom}
              stroke="var(--color-accent-hover)"
              strokeWidth="1"
              strokeDasharray="2,4"
              opacity="0.6"
            />
            <text
              x={bx}
              y={PADDING.top - 8}
              textAnchor="middle"
              className="fill-accent-hover font-numbers"
              fontSize="9"
            >
              BE: ${formatCompact(be)}
            </text>
          </g>
        )
      })}

      {/* Spot price marker */}
      {(() => {
        const sx = scaleX(spotPrice)
        if (sx < PADDING.left || sx > WIDTH - PADDING.right) return null
        // Find closest payoff point
        const closest = payoffData.reduce((prev, curr) =>
          Math.abs(curr.price - spotPrice) < Math.abs(prev.price - spotPrice) ? curr : prev
        )
        return (
          <circle
            cx={sx}
            cy={scaleY(closest.payoff)}
            r="4"
            fill="var(--color-accent)"
            stroke="var(--color-surface)"
            strokeWidth="2"
          />
        )
      })()}

      {/* Max profit label */}
      {metrics.maxProfit < 1e8 && (
        <text
          x={WIDTH - PADDING.right - 4}
          y={scaleY(metrics.maxProfit) - 6}
          textAnchor="end"
          className="fill-success font-numbers"
          fontSize="9"
        >
          Max: +${formatCompact(metrics.maxProfit)}
        </text>
      )}

      {/* Max loss label */}
      {metrics.maxLoss > -1e8 && (
        <text
          x={WIDTH - PADDING.right - 4}
          y={scaleY(metrics.maxLoss) + 14}
          textAnchor="end"
          className="fill-danger font-numbers"
          fontSize="9"
        >
          Max: -${formatCompact(Math.abs(metrics.maxLoss))}
        </text>
      )}

      {/* X axis ticks */}
      {xTicks.map((tick) => {
        const tx = scaleX(tick)
        if (tx < PADDING.left || tx > WIDTH - PADDING.right) return null
        return (
          <text
            key={tick}
            x={tx}
            y={HEIGHT - PADDING.bottom + 28}
            textAnchor="middle"
            className="fill-text-muted font-numbers"
            fontSize="9"
          >
            ${formatCompact(tick)}
          </text>
        )
      })}

      {/* Y axis label */}
      <text
        x={PADDING.left - 8}
        y={PADDING.top - 8}
        textAnchor="end"
        className="fill-text-muted"
        fontSize="9"
      >
        P&L
      </text>
    </svg>
  )
}

function OpenStrategiesTable({ strategies }: { strategies: StrategyRow[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Open Strategies</h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-muted text-accent font-numbers">
          {strategies.length}
        </span>
      </div>

      {strategies.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-text-muted text-sm">No open strategies</p>
          <p className="text-text-muted/60 text-xs mt-1">
            Select a strategy above and execute it to get started
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Type', 'Symbol', 'Legs', 'Net Premium', 'Status', ''].map((header) => (
                  <th
                    key={header || 'action'}
                    className="text-left text-text-muted text-xs font-medium pb-3 pr-4 last:pr-0 last:text-right"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <StrategyRow key={strategy.id} strategy={strategy} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function StrategyRow({ strategy }: { strategy: StrategyRow }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const legs = strategy.legs as {
    optionPositionId: string
    optionType: 'CALL' | 'PUT'
    side: 'BUY' | 'SELL'
    strike: number
    premium: number
    quantity: number
  }[]

  const totalPremium = parseFloat(strategy.totalPremium)
  const template = STRATEGY_TEMPLATES[strategy.strategyType as StrategyType]

  function handleClose() {
    startTransition(async () => {
      try {
        await closeStrategy(strategy.id)
        router.refresh()
      } catch {
        // Strategy may already be closed
      }
    })
  }

  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-surface-overlay/30 transition-colors">
      <td className="py-3 pr-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent-muted text-accent">
          {template?.name ?? strategy.strategyType}
        </span>
      </td>

      <td className="py-3 pr-4">
        <span className="text-text-primary font-medium text-sm">{strategy.symbol}</span>
      </td>

      <td className="py-3 pr-4 font-numbers text-sm text-text-secondary">{legs.length}</td>

      <td className="py-3 pr-4">
        <span
          className={cn(
            'font-numbers text-sm font-medium',
            totalPremium > 0 ? 'text-danger' : 'text-success'
          )}
        >
          {totalPremium > 0 ? '-' : '+'}${formatUsd(Math.abs(totalPremium))}
        </span>
      </td>

      <td className="py-3 pr-4">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-success-muted text-success">
          {strategy.status}
        </span>
      </td>

      <td className="py-3 text-right">
        <button
          onClick={handleClose}
          disabled={isPending}
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
