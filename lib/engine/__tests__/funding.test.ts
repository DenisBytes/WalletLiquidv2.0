import { describe, it, expect } from 'vitest'
import { calculateFundingPayment } from '../funding'

describe('calculateFundingPayment', () => {
  it('long pays positive funding rate', () => {
    // 1 BTC position, mark $50,000, rate 0.01% (0.0001)
    const payment = calculateFundingPayment(1, 50000, 0.0001, 'LONG')
    expect(payment).toBe(-5) // pays $5
  })

  it('short receives positive funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, 0.0001, 'SHORT')
    expect(payment).toBe(5) // receives $5
  })

  it('long receives negative funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, -0.0001, 'LONG')
    expect(payment).toBe(5) // receives $5
  })

  it('short pays negative funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, -0.0001, 'SHORT')
    expect(payment).toBe(-5) // pays $5
  })

  it('scales with position size', () => {
    const payment = calculateFundingPayment(2, 50000, 0.0001, 'LONG')
    expect(payment).toBe(-10)
  })
})
