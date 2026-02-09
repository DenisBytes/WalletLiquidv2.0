'use client'

import { useRef, useMemo, useEffect } from 'react'
import { gsap } from 'gsap'
import type { OptionType, OptionSide } from '@/lib/engine/types'

interface PayoffDiagramProps {
  optionType: OptionType
  side: OptionSide
  strikePrice: number
  premium: number
  spotPrice: number
}

const WIDTH = 500
const HEIGHT = 280
const PADDING = { top: 30, right: 40, bottom: 40, left: 60 }
const CHART_W = WIDTH - PADDING.left - PADDING.right
const CHART_H = HEIGHT - PADDING.top - PADDING.bottom

function calculatePayoff(
  price: number,
  strike: number,
  premium: number,
  optionType: OptionType,
  side: OptionSide
): number {
  let intrinsic: number
  if (optionType === 'CALL') {
    intrinsic = Math.max(price - strike, 0)
  } else {
    intrinsic = Math.max(strike - price, 0)
  }

  if (side === 'BUY') {
    return intrinsic - premium
  }
  return premium - intrinsic
}

export function PayoffDiagram({
  optionType,
  side,
  strikePrice,
  premium,
  spotPrice,
}: PayoffDiagramProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const profitFillRef = useRef<SVGPathElement>(null)
  const lossFillRef = useRef<SVGPathElement>(null)
  const prevPathRef = useRef<string>('')

  const { points, xMin, xMax, yMin, yMax, breakEven, maxLoss, maxProfit } = useMemo(() => {
    const range = strikePrice * 0.3
    const xMin = Math.max(strikePrice - range, 0)
    const xMax = strikePrice + range
    const steps = 100

    const pts: { x: number; y: number }[] = []
    let minY = Infinity
    let maxY = -Infinity

    for (let i = 0; i <= steps; i++) {
      const price = xMin + (xMax - xMin) * (i / steps)
      const payoff = calculatePayoff(price, strikePrice, premium, optionType, side)
      pts.push({ x: price, y: payoff })
      minY = Math.min(minY, payoff)
      maxY = Math.max(maxY, payoff)
    }

    const yPad = Math.max((maxY - minY) * 0.15, premium * 0.5)
    const yMinFinal = minY - yPad
    const yMaxFinal = maxY + yPad

    let breakEvenPrice: number
    if (optionType === 'CALL') {
      breakEvenPrice = side === 'BUY' ? strikePrice + premium : strikePrice + premium
    } else {
      breakEvenPrice = side === 'BUY' ? strikePrice - premium : strikePrice - premium
    }

    const maxLossVal = side === 'BUY' ? -premium : null
    const maxProfitVal = side === 'BUY' ? null : premium

    return {
      points: pts,
      xMin,
      xMax,
      yMin: yMinFinal,
      yMax: yMaxFinal,
      breakEven: breakEvenPrice,
      maxLoss: maxLossVal,
      maxProfit: maxProfitVal,
    }
  }, [strikePrice, premium, optionType, side])

  const scaleX = (val: number) => PADDING.left + ((val - xMin) / (xMax - xMin)) * CHART_W
  const scaleY = (val: number) => PADDING.top + (1 - (val - yMin) / (yMax - yMin)) * CHART_H

  const pathD = useMemo(() => {
    const sx = (val: number) => PADDING.left + ((val - xMin) / (xMax - xMin)) * CHART_W
    const sy = (val: number) => PADDING.top + (1 - (val - yMin) / (yMax - yMin)) * CHART_H
    return points
      .map((p, i) => {
        const x = sx(p.x)
        const y = sy(p.y)
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')
  }, [points, xMin, xMax, yMin, yMax])

  const { profitFillD, lossFillD } = useMemo(() => {
    const sx = (val: number) => PADDING.left + ((val - xMin) / (xMax - xMin)) * CHART_W
    const sy = (val: number) => PADDING.top + (1 - (val - yMin) / (yMax - yMin)) * CHART_H
    const zeroY = sy(0)

    let profitPath = ''
    let lossPath = ''

    let profitStarted = false
    let lossStarted = false

    for (let i = 0; i < points.length; i++) {
      const x = sx(points[i].x)
      const y = sy(points[i].y)

      if (points[i].y >= 0) {
        if (!profitStarted) {
          profitPath += `M${x.toFixed(2)},${zeroY.toFixed(2)} L${x.toFixed(2)},${y.toFixed(2)}`
          profitStarted = true
        } else {
          profitPath += ` L${x.toFixed(2)},${y.toFixed(2)}`
        }

        if (i === points.length - 1 || points[i + 1].y < 0) {
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

        if (i === points.length - 1 || points[i + 1].y >= 0) {
          lossPath += ` L${x.toFixed(2)},${zeroY.toFixed(2)} Z`
          lossStarted = false
        }
      }
    }

    return { profitFillD: profitPath || 'M0,0', lossFillD: lossPath || 'M0,0' }
  }, [points, xMin, xMax, yMin, yMax])

  useEffect(() => {
    if (!pathRef.current) return

    if (prevPathRef.current && prevPathRef.current !== pathD) {
      gsap.to(pathRef.current, {
        attr: { d: pathD },
        duration: 0.4,
        ease: 'power2.out',
      })
      if (profitFillRef.current) {
        gsap.to(profitFillRef.current, {
          attr: { d: profitFillD },
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      if (lossFillRef.current) {
        gsap.to(lossFillRef.current, {
          attr: { d: lossFillD },
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }

    prevPathRef.current = pathD
  }, [pathD, profitFillD, lossFillD])

  const zeroY = scaleY(0)
  const beX = scaleX(breakEven)
  const strikeX = scaleX(strikePrice)
  const spotX = scaleX(spotPrice)

  const xTicks = useMemo(() => {
    const step = (xMax - xMin) / 5
    const ticks: number[] = []
    for (let i = 0; i <= 5; i++) {
      ticks.push(Math.round((xMin + step * i) / 100) * 100)
    }
    return ticks
  }, [xMin, xMax])

  function formatCompact(val: number): string {
    if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(0)}k`
    return val.toFixed(0)
  }

  return (
    <div className="glass rounded-2xl p-5 h-full">
      <h3 className="text-sm font-semibold text-text-primary mb-3">Payoff at Expiration</h3>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        {/* Grid lines */}
        <line
          x1={PADDING.left} y1={zeroY}
          x2={WIDTH - PADDING.right} y2={zeroY}
          stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4,4"
        />

        {/* Filled regions */}
        <path
          ref={profitFillRef}
          d={profitFillD}
          fill="var(--color-success)"
          opacity="0.1"
        />
        <path
          ref={lossFillRef}
          d={lossFillD}
          fill="var(--color-danger)"
          opacity="0.1"
        />

        {/* Main payoff curve */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Strike price marker */}
        {strikeX >= PADDING.left && strikeX <= WIDTH - PADDING.right && (
          <>
            <line
              x1={strikeX} y1={PADDING.top}
              x2={strikeX} y2={HEIGHT - PADDING.bottom}
              stroke="var(--color-text-muted)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"
            />
            <text
              x={strikeX} y={HEIGHT - PADDING.bottom + 16}
              textAnchor="middle"
              className="fill-text-muted font-numbers"
              fontSize="9"
            >
              Strike
            </text>
          </>
        )}

        {/* Break-even marker */}
        {beX >= PADDING.left && beX <= WIDTH - PADDING.right && (
          <>
            <line
              x1={beX} y1={PADDING.top}
              x2={beX} y2={HEIGHT - PADDING.bottom}
              stroke="var(--color-accent-hover)" strokeWidth="1" strokeDasharray="2,4" opacity="0.6"
            />
            <text
              x={beX} y={PADDING.top - 8}
              textAnchor="middle"
              className="fill-accent-hover font-numbers"
              fontSize="9"
            >
              BE: ${formatCompact(breakEven)}
            </text>
          </>
        )}

        {/* Current spot marker */}
        {spotX >= PADDING.left && spotX <= WIDTH - PADDING.right && (
          <circle
            cx={spotX}
            cy={scaleY(calculatePayoff(spotPrice, strikePrice, premium, optionType, side))}
            r="4"
            fill="var(--color-accent)"
            stroke="var(--color-surface)"
            strokeWidth="2"
          />
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

        {/* Max loss label */}
        {maxLoss !== null && (
          <text
            x={PADDING.left + 4}
            y={scaleY(maxLoss) + 14}
            className="fill-danger font-numbers"
            fontSize="9"
          >
            Max Loss: ${Math.abs(maxLoss).toFixed(2)}
          </text>
        )}

        {/* Max profit label (for sellers) */}
        {maxProfit !== null && (
          <text
            x={PADDING.left + 4}
            y={scaleY(maxProfit) - 6}
            className="fill-success font-numbers"
            fontSize="9"
          >
            Max Profit: ${maxProfit.toFixed(2)}
          </text>
        )}

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
    </div>
  )
}
