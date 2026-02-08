'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils/cn'

interface PriceSimulatorProps {
  type?: 'call' | 'put'
  initialPrice?: number
  strike?: number
  premium?: number
}

export function PriceSimulator({
  type = 'call',
  initialPrice = 3000,
  strike = 3200,
  premium = 150,
}: PriceSimulatorProps) {
  const [price, setPrice] = useState(initialPrice)

  const { intrinsic, pnl, moneyness } = useMemo(() => {
    const intrinsicVal = type === 'call'
      ? Math.max(price - strike, 0)
      : Math.max(strike - price, 0)
    const pnlVal = intrinsicVal - premium

    let money: 'ITM' | 'ATM' | 'OTM'
    if (type === 'call') {
      money = price > strike ? 'ITM' : price === strike ? 'ATM' : 'OTM'
    } else {
      money = price < strike ? 'ITM' : price === strike ? 'ATM' : 'OTM'
    }

    return { intrinsic: intrinsicVal, pnl: pnlVal, moneyness: money }
  }, [price, type, strike, premium])

  const min = Math.round(strike * 0.7)
  const max = Math.round(strike * 1.3)

  return (
    <div className="glass rounded-xl p-6 my-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Price Simulator
        </span>
        <span className={cn(
          'text-xs font-medium px-2 py-0.5 rounded',
          type === 'call' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
        )}>
          {type === 'call' ? 'CALL' : 'PUT'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Underlying Price</span>
            <span className="font-numbers text-lg font-bold text-text-primary">${price.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={Math.round((max - min) / 100)}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-text-muted font-numbers mt-1">
            <span>${min.toLocaleString()}</span>
            <span>${max.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-text-muted mb-1">Moneyness</p>
            <p className={cn(
              'font-numbers text-sm font-semibold',
              moneyness === 'ITM' ? 'text-success' : moneyness === 'OTM' ? 'text-danger' : 'text-text-primary'
            )}>
              {moneyness}
            </p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-text-muted mb-1">Intrinsic Value</p>
            <p className="font-numbers text-sm font-semibold text-text-primary">
              ${intrinsic.toLocaleString()}
            </p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-text-muted mb-1">Premium Paid</p>
            <p className="font-numbers text-sm font-semibold text-text-secondary">
              ${premium.toLocaleString()}
            </p>
          </div>
          <div className="glass rounded-lg p-3">
            <p className="text-xs text-text-muted mb-1">Net P&L</p>
            <p className={cn(
              'font-numbers text-sm font-semibold',
              pnl >= 0 ? 'text-success' : 'text-danger'
            )}>
              {pnl >= 0 ? '+' : ''}${pnl.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="text-xs text-text-muted text-center">
          Strike: <span className="font-numbers">${strike.toLocaleString()}</span>
          {' · '}
          Drag the slider to simulate price changes
        </div>
      </div>
    </div>
  )
}
