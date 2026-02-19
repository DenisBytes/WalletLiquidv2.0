import { describe, it, expect } from 'vitest'
import { calculatePnl, calculateMargin, calculateRoe, isLiquidated } from '../futures'

describe('futures engine', () => {
  it('calculates long PnL correctly', () => {
    expect(calculatePnl(50000, 51000, 1, 'LONG')).toBe(1000)
  })

  it('calculates short PnL correctly', () => {
    expect(calculatePnl(50000, 49000, 1, 'SHORT')).toBe(1000)
  })

  it('calculates margin correctly', () => {
    expect(calculateMargin(1, 50000, 10)).toBe(5000)
  })

  it('calculates ROE correctly', () => {
    expect(calculateRoe(500, 5000)).toBe(10)
  })

  it('detects long liquidation', () => {
    expect(isLiquidated(44000, 45000, 'LONG')).toBe(true)
    expect(isLiquidated(46000, 45000, 'LONG')).toBe(false)
  })
})
