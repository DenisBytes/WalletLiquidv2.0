import { describe, it, expect } from 'vitest'
import {
  calculateWinRate,
  calculateProfitFactor,
  calculateMaxDrawdown,
  calculateSharpeRatio,
  calculateAnalytics,
} from '../analytics'

const makeTrade = (pnl: string | null, action: string) => ({
  pnl,
  action,
  executedAt: new Date(),
})

describe('calculateWinRate', () => {
  it('returns 0 for no closed trades', () => {
    expect(calculateWinRate([])).toBe(0)
  })

  it('calculates from CLOSE and LIQUIDATION trades only', () => {
    const trades = [
      makeTrade(null, 'OPEN'),
      makeTrade('100', 'CLOSE'),
      makeTrade('-50', 'CLOSE'),
      makeTrade('200', 'CLOSE'),
      makeTrade('-1000', 'LIQUIDATION'),
    ]
    expect(calculateWinRate(trades)).toBeCloseTo(0.5)
  })
})

describe('calculateProfitFactor', () => {
  it('returns 0 for no trades', () => {
    expect(calculateProfitFactor([])).toBe(0)
  })

  it('returns Infinity for no losses', () => {
    const trades = [makeTrade('100', 'CLOSE'), makeTrade('200', 'CLOSE')]
    expect(calculateProfitFactor(trades)).toBe(Infinity)
  })

  it('calculates gross profit / gross loss', () => {
    const trades = [
      makeTrade('300', 'CLOSE'),
      makeTrade('-100', 'CLOSE'),
      makeTrade('200', 'CLOSE'),
      makeTrade('-150', 'LIQUIDATION'),
    ]
    expect(calculateProfitFactor(trades)).toBe(2)
  })
})

describe('calculateMaxDrawdown', () => {
  it('returns 0 for no trades', () => {
    expect(calculateMaxDrawdown([])).toBe(0)
  })

  it('calculates peak-to-trough decline', () => {
    const trades = [
      makeTrade('500', 'CLOSE'),
      makeTrade('-300', 'CLOSE'),
      makeTrade('600', 'CLOSE'),
      makeTrade('-1000', 'LIQUIDATION'),
    ]
    expect(calculateMaxDrawdown(trades, 100000)).toBe(1000)
  })
})

describe('calculateSharpeRatio', () => {
  it('returns 0 for fewer than 2 trades', () => {
    expect(calculateSharpeRatio([makeTrade('100', 'CLOSE')])).toBe(0)
  })

  it('returns a positive ratio for mostly profitable trades', () => {
    const trades = [
      ...Array.from({ length: 15 }, (_, i) => makeTrade(`${50 + i * 10}`, 'CLOSE')),
      ...Array.from({ length: 5 }, (_, i) => makeTrade(`${-20 - i * 5}`, 'CLOSE')),
    ]
    expect(calculateSharpeRatio(trades)).toBeGreaterThan(0)
  })
})

describe('calculateAnalytics', () => {
  it('returns all metrics', () => {
    const trades = [
      makeTrade('500', 'CLOSE'),
      makeTrade('-200', 'CLOSE'),
      makeTrade('300', 'CLOSE'),
    ]
    const result = calculateAnalytics(trades, 100000)
    expect(result).toHaveProperty('winRate')
    expect(result).toHaveProperty('profitFactor')
    expect(result).toHaveProperty('maxDrawdown')
    expect(result).toHaveProperty('sharpeRatio')
    expect(result).toHaveProperty('totalTrades')
    expect(result).toHaveProperty('winningTrades')
    expect(result).toHaveProperty('losingTrades')
  })
})
