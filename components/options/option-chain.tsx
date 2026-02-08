'use client'

import { useMemo } from 'react'
import { blackScholesCall, blackScholesPut, calculateAllGreeks } from '@/lib/engine/options'
import { cn } from '@/lib/utils/cn'
import type { OptionType } from '@/lib/engine/types'

interface ChainSelection {
  strikePrice: number
  optionType: OptionType
}

interface OptionChainProps {
  spotPrice: number
  strikes: number[]
  expirations: { label: string; days: number; date: Date }[]
  selectedExpiry: number
  onSelectExpiry: (index: number) => void
  selection: ChainSelection | null
  onSelect: (selection: ChainSelection) => void
  volatility: number
  riskFreeRate: number
}

interface ChainCell {
  premium: number
  delta: number
  itm: boolean
}

function formatPremium(value: number, symbol: string): string {
  if (symbol === 'BTC' || value >= 100) {
    return value.toFixed(2)
  }
  return value.toFixed(4)
}

export function OptionChain({
  spotPrice,
  strikes,
  expirations,
  selectedExpiry,
  onSelectExpiry,
  selection,
  onSelect,
  volatility,
  riskFreeRate,
}: OptionChainProps) {
  const timeToExpiry = expirations[selectedExpiry].days / 365

  const chainData = useMemo(() => {
    if (!spotPrice || timeToExpiry <= 0) return null

    return strikes.map((strike) => {
      const callPremium = blackScholesCall(spotPrice, strike, timeToExpiry, riskFreeRate, volatility)
      const putPremium = blackScholesPut(spotPrice, strike, timeToExpiry, riskFreeRate, volatility)
      const callGreeks = calculateAllGreeks(spotPrice, strike, timeToExpiry, riskFreeRate, volatility, 'CALL')
      const putGreeks = calculateAllGreeks(spotPrice, strike, timeToExpiry, riskFreeRate, volatility, 'PUT')

      return {
        strike,
        call: {
          premium: callPremium,
          delta: callGreeks.delta,
          itm: spotPrice > strike,
        } as ChainCell,
        put: {
          premium: putPremium,
          delta: putGreeks.delta,
          itm: spotPrice < strike,
        } as ChainCell,
      }
    })
  }, [spotPrice, strikes, timeToExpiry, riskFreeRate, volatility])

  const isSelected = (strike: number, type: OptionType) =>
    selection?.strikePrice === strike && selection?.optionType === type

  return (
    <div className="glass rounded-2xl p-5 h-full flex flex-col">
      {/* Expiry tabs */}
      <div className="flex items-center gap-1 mb-4 p-1 rounded-xl bg-surface-overlay w-fit overflow-x-auto">
        {expirations.map((exp, i) => (
          <button
            key={exp.label}
            onClick={() => onSelectExpiry(i)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
              i === selectedExpiry
                ? 'gradient-accent text-white shadow-lg shadow-accent/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
            )}
          >
            {exp.label}
          </button>
        ))}
      </div>

      {/* Chain table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-surface-raised">
            <tr>
              <th colSpan={2} className="text-center text-success text-xs font-semibold pb-2 border-b border-border">
                CALLS
              </th>
              <th className="text-center text-text-muted text-xs font-semibold pb-2 border-b border-border px-2">
                Strike
              </th>
              <th colSpan={2} className="text-center text-danger text-xs font-semibold pb-2 border-b border-border">
                PUTS
              </th>
            </tr>
            <tr>
              <th className="text-left text-text-muted text-[10px] font-medium py-2 pr-2 pl-3">Premium</th>
              <th className="text-right text-text-muted text-[10px] font-medium py-2 pr-2">Delta</th>
              <th className="text-center text-text-muted text-[10px] font-medium py-2 px-2">$</th>
              <th className="text-left text-text-muted text-[10px] font-medium py-2 pl-2">Delta</th>
              <th className="text-right text-text-muted text-[10px] font-medium py-2 pl-2 pr-3">Premium</th>
            </tr>
          </thead>
          <tbody>
            {chainData?.map((row) => {
              const isAtm = Math.abs(row.strike - spotPrice) / spotPrice < 0.005

              return (
                <tr
                  key={row.strike}
                  className={cn(
                    'border-b border-border/30 transition-colors',
                    isAtm && 'bg-accent-muted/20'
                  )}
                >
                  {/* Call premium */}
                  <td
                    onClick={() => onSelect({ strikePrice: row.strike, optionType: 'CALL' })}
                    className={cn(
                      'py-2 pr-2 pl-3 font-numbers text-sm cursor-pointer transition-all',
                      row.call.itm && 'bg-success-muted/30',
                      isSelected(row.strike, 'CALL')
                        ? 'bg-accent/20 text-accent font-semibold'
                        : 'text-text-primary hover:bg-surface-overlay/50'
                    )}
                  >
                    {formatPremium(row.call.premium, '')}
                  </td>

                  {/* Call delta */}
                  <td
                    onClick={() => onSelect({ strikePrice: row.strike, optionType: 'CALL' })}
                    className={cn(
                      'py-2 pr-2 text-right font-numbers text-xs cursor-pointer transition-all',
                      row.call.itm && 'bg-success-muted/30',
                      isSelected(row.strike, 'CALL')
                        ? 'bg-accent/20'
                        : 'hover:bg-surface-overlay/50'
                    )}
                  >
                    <span className={cn(
                      row.call.delta > 0.7 ? 'text-success' :
                      row.call.delta > 0.3 ? 'text-text-secondary' :
                      'text-text-muted'
                    )}>
                      {row.call.delta.toFixed(3)}
                    </span>
                  </td>

                  {/* Strike */}
                  <td className={cn(
                    'py-2 px-2 text-center font-numbers text-sm font-semibold',
                    isAtm ? 'text-accent' : 'text-text-primary'
                  )}>
                    {row.strike.toLocaleString()}
                  </td>

                  {/* Put delta */}
                  <td
                    onClick={() => onSelect({ strikePrice: row.strike, optionType: 'PUT' })}
                    className={cn(
                      'py-2 pl-2 font-numbers text-xs cursor-pointer transition-all',
                      row.put.itm && 'bg-danger-muted/30',
                      isSelected(row.strike, 'PUT')
                        ? 'bg-accent/20'
                        : 'hover:bg-surface-overlay/50'
                    )}
                  >
                    <span className={cn(
                      row.put.delta < -0.7 ? 'text-danger' :
                      row.put.delta < -0.3 ? 'text-text-secondary' :
                      'text-text-muted'
                    )}>
                      {row.put.delta.toFixed(3)}
                    </span>
                  </td>

                  {/* Put premium */}
                  <td
                    onClick={() => onSelect({ strikePrice: row.strike, optionType: 'PUT' })}
                    className={cn(
                      'py-2 pl-2 pr-3 text-right font-numbers text-sm cursor-pointer transition-all',
                      row.put.itm && 'bg-danger-muted/30',
                      isSelected(row.strike, 'PUT')
                        ? 'bg-accent/20 text-accent font-semibold'
                        : 'text-text-primary hover:bg-surface-overlay/50'
                    )}
                  >
                    {formatPremium(row.put.premium, '')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Spot price indicator */}
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-text-muted text-xs">Spot Price</span>
        <span className="font-numbers text-sm font-semibold text-accent">
          ${spotPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  )
}
