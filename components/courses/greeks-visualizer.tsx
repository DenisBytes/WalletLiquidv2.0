'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils/cn'
import {
  blackScholesCall,
  blackScholesPut,
  calculateDelta,
  calculateGamma,
  calculateTheta,
  calculateVega,
} from '@/lib/engine/options'
import type { OptionType } from '@/lib/engine/types'

interface GreeksVisualizerProps {
  type?: 'call' | 'put'
  initialPrice?: number
  strike?: number
  volatility?: number
  riskFreeRate?: number
  daysToExpiry?: number
}

export function GreeksVisualizer({
  type = 'call',
  initialPrice = 3000,
  strike = 3000,
  volatility = 0.6,
  riskFreeRate = 0.05,
  daysToExpiry = 30,
}: GreeksVisualizerProps) {
  const [price, setPrice] = useState(initialPrice)
  const [days, setDays] = useState(daysToExpiry)

  const greeks = useMemo(() => {
    const t = days / 365
    if (t <= 0) return { price: 0, delta: 0, gamma: 0, theta: 0, vega: 0 }

    const engineType: OptionType = type === 'call' ? 'CALL' : 'PUT'
    const optionPrice = type === 'call'
      ? blackScholesCall(price, strike, t, riskFreeRate, volatility)
      : blackScholesPut(price, strike, t, riskFreeRate, volatility)
    const delta = calculateDelta(price, strike, t, riskFreeRate, volatility, engineType)
    const gamma = calculateGamma(price, strike, t, riskFreeRate, volatility)
    const theta = calculateTheta(price, strike, t, riskFreeRate, volatility, engineType)
    const vega = calculateVega(price, strike, t, riskFreeRate, volatility)

    return { price: optionPrice, delta, gamma, theta, vega }
  }, [price, strike, days, type, volatility, riskFreeRate])

  const priceMin = Math.round(strike * 0.7)
  const priceMax = Math.round(strike * 1.3)

  const greekCards = [
    {
      label: 'Delta',
      value: greeks.delta,
      format: (v: number) => v.toFixed(4),
      min: type === 'call' ? 0 : -1,
      max: type === 'call' ? 1 : 0,
      color: 'accent',
      barColor: 'bg-accent',
    },
    {
      label: 'Gamma',
      value: greeks.gamma,
      format: (v: number) => v.toFixed(6),
      min: 0,
      max: 0.005,
      color: 'success',
      barColor: 'bg-success',
    },
    {
      label: 'Theta',
      value: greeks.theta,
      format: (v: number) => v.toFixed(4),
      min: type === 'call' ? -20 : -20,
      max: 0,
      color: 'danger',
      barColor: 'bg-danger',
    },
    {
      label: 'Vega',
      value: greeks.vega,
      format: (v: number) => v.toFixed(4),
      min: 0,
      max: 20,
      color: '[#3B82F6]',
      barColor: 'bg-[#3B82F6]',
    },
  ]

  return (
    <div className="glass rounded-xl p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Greeks Visualizer
        </span>
        <span className={cn(
          'text-xs font-medium px-2 py-0.5 rounded',
          type === 'call' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
        )}>
          {type === 'call' ? 'CALL' : 'PUT'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-muted">Underlying Price</span>
            <span className="font-numbers text-sm text-text-primary">${price.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            step={Math.round((priceMax - priceMin) / 100)}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-muted">Days to Expiry</span>
            <span className="font-numbers text-sm text-text-primary">{days}d</span>
          </div>
          <input
            type="range"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <div className="glass rounded-lg p-3 mb-4 text-center">
        <p className="text-xs text-text-muted mb-1">Option Price</p>
        <p className="font-numbers text-xl font-bold text-text-primary">
          ${greeks.price.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        {greekCards.map((g) => {
          const range = g.max - g.min
          const normalized = range !== 0 ? Math.abs((g.value - g.min) / range) : 0
          const barWidth = Math.min(Math.max(normalized * 100, 2), 100)

          return (
            <div key={g.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">{g.label}</span>
                <span className="font-numbers text-sm text-text-primary">{g.format(g.value)}</span>
              </div>
              <div className="h-1.5 bg-surface-overlay rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-300', g.barColor)}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-xs text-text-muted text-center mt-3">
        Strike: <span className="font-numbers">${strike.toLocaleString()}</span>
        {' · '}
        IV: <span className="font-numbers">{(volatility * 100).toFixed(0)}%</span>
        {' · '}
        Rate: <span className="font-numbers">{(riskFreeRate * 100).toFixed(1)}%</span>
      </div>
    </div>
  )
}
