'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'

interface PayoffDiagramProps {
  type: 'call' | 'put'
  side?: 'buy' | 'sell'
  strike?: number
  premium?: number
}

export function PayoffDiagram({
  type,
  side = 'buy',
  strike = 100,
  premium = 10,
}: PayoffDiagramProps) {
  const width = 400
  const height = 200
  const padding = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const data = useMemo(() => {
    const points: { price: number; pnl: number }[] = []
    const min = strike * 0.6
    const max = strike * 1.4
    const step = (max - min) / 80

    for (let price = min; price <= max; price += step) {
      let pnl: number
      if (type === 'call') {
        pnl = side === 'buy'
          ? Math.max(price - strike, 0) - premium
          : premium - Math.max(price - strike, 0)
      } else {
        pnl = side === 'buy'
          ? Math.max(strike - price, 0) - premium
          : premium - Math.max(strike - price, 0)
      }
      points.push({ price, pnl })
    }
    return points
  }, [type, side, strike, premium])

  const priceMin = data[0].price
  const priceMax = data[data.length - 1].price
  const pnlMin = Math.min(...data.map((d) => d.pnl))
  const pnlMax = Math.max(...data.map((d) => d.pnl))
  const pnlRange = Math.max(Math.abs(pnlMin), Math.abs(pnlMax)) * 1.2

  const scaleX = (price: number) =>
    padding.left + ((price - priceMin) / (priceMax - priceMin)) * chartW
  const scaleY = (pnl: number) =>
    padding.top + chartH / 2 - (pnl / pnlRange) * (chartH / 2)

  const zeroY = scaleY(0)
  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${scaleX(d.price)},${scaleY(d.pnl)}`).join(' ')

  const profitFill = data
    .filter((d) => d.pnl > 0)
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${scaleX(d.price)},${scaleY(d.pnl)}`)
    .join(' ')
  const profitArea = profitFill
    ? `${profitFill} L${scaleX(data.filter((d) => d.pnl > 0).pop()!.price)},${zeroY} L${scaleX(data.filter((d) => d.pnl > 0)[0].price)},${zeroY} Z`
    : ''

  const lossFill = data
    .filter((d) => d.pnl < 0)
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${scaleX(d.price)},${scaleY(d.pnl)}`)
    .join(' ')
  const lossArea = lossFill
    ? `${lossFill} L${scaleX(data.filter((d) => d.pnl < 0).pop()!.price)},${zeroY} L${scaleX(data.filter((d) => d.pnl < 0)[0].price)},${zeroY} Z`
    : ''

  const label = `${side === 'buy' ? 'Long' : 'Short'} ${type === 'call' ? 'Call' : 'Put'}`

  return (
    <div className="glass rounded-xl p-6 my-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Payoff Diagram
        </span>
        <span className={cn(
          'text-xs font-medium px-2 py-0.5 rounded',
          side === 'buy' ? 'bg-success-muted text-success' : 'bg-danger-muted text-danger'
        )}>
          {label}
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Zero line */}
        <line
          x1={padding.left}
          y1={zeroY}
          x2={width - padding.right}
          y2={zeroY}
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Strike line */}
        <line
          x1={scaleX(strike)}
          y1={padding.top}
          x2={scaleX(strike)}
          y2={height - padding.bottom}
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* Profit area */}
        {profitArea && (
          <path d={profitArea} fill="#22C55E" opacity="0.1" />
        )}

        {/* Loss area */}
        {lossArea && (
          <path d={lossArea} fill="#EF4444" opacity="0.1" />
        )}

        {/* Payoff line */}
        <path d={pathD} fill="none" stroke="var(--color-accent)" strokeWidth="2" />

        {/* Labels */}
        <text x={scaleX(strike)} y={height - 10} textAnchor="middle" fill="#6B7280" fontSize="10">
          Strike ${strike}
        </text>
        <text x={padding.left - 5} y={zeroY + 3} textAnchor="end" fill="#6B7280" fontSize="10">
          $0
        </text>
        <text x={padding.left + 5} y={height - 10} fill="#6B7280" fontSize="10">
          Price →
        </text>
      </svg>

      <div className="flex items-center justify-center gap-6 mt-2 text-xs text-text-muted">
        <span>Strike: <span className="font-numbers text-text-secondary">${strike}</span></span>
        <span>Premium: <span className="font-numbers text-text-secondary">${premium}</span></span>
        <span>Max Loss: <span className="font-numbers text-danger">${side === 'buy' ? premium : '∞'}</span></span>
      </div>
    </div>
  )
}
