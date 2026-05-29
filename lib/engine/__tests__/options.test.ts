import { describe, it, expect } from 'vitest'
import {
  blackScholesCall,
  blackScholesPut,
  calculateDelta,
  calculateGamma,
  calculateVega,
  calculateTheta,
  calculateAllGreeks,
} from '../options'

describe('options engine — pricing', () => {
  it('prices an ATM call as a finite positive number', () => {
    const price = blackScholesCall(50000, 50000, 30 / 365, 0.05, 0.6)
    expect(price).toBeGreaterThan(0)
    expect(Number.isFinite(price)).toBe(true)
  })

  it('respects put-call parity within tolerance', () => {
    const spot = 50000
    const strike = 48000
    const t = 30 / 365
    const r = 0.05
    const vol = 0.6
    const call = blackScholesCall(spot, strike, t, r, vol)
    const put = blackScholesPut(spot, strike, t, r, vol)
    // C - P should equal S - K*e^(-rt)
    const parity = spot - strike * Math.exp(-r * t)
    expect(Math.abs(call - put - parity)).toBeLessThan(1e-6)
  })

  it('call delta is between 0 and 1', () => {
    const delta = calculateDelta(50000, 50000, 30 / 365, 0.05, 0.6, 'CALL')
    expect(delta).toBeGreaterThan(0)
    expect(delta).toBeLessThan(1)
  })
})

describe('options engine — input guards', () => {
  it('does not return NaN/Infinity for an expired option (timeToExpiry = 0)', () => {
    expect(blackScholesCall(50000, 50000, 0, 0.05, 0.6)).toBe(0)
    expect(calculateGamma(50000, 50000, 0, 0.05, 0.6)).toBe(0)
    expect(calculateVega(50000, 50000, 0, 0.05, 0.6)).toBe(0)
    expect(calculateTheta(50000, 50000, 0, 0.05, 0.6, 'CALL')).toBe(0)
  })

  it('does not divide by zero when volatility is 0', () => {
    expect(calculateGamma(50000, 50000, 30 / 365, 0.05, 0)).toBe(0)
    const price = blackScholesCall(50000, 50000, 30 / 365, 0.05, 0)
    expect(Number.isFinite(price)).toBe(true)
  })

  it('does not produce NaN when spot or strike is non-positive', () => {
    expect(Number.isFinite(blackScholesCall(0, 50000, 30 / 365, 0.05, 0.6))).toBe(true)
    expect(Number.isFinite(blackScholesPut(50000, 0, 30 / 365, 0.05, 0.6))).toBe(true)
  })

  it('returns all-finite Greeks for degenerate inputs', () => {
    const greeks = calculateAllGreeks(0, 0, 0, 0.05, 0, 'CALL')
    for (const v of Object.values(greeks)) {
      expect(Number.isFinite(v)).toBe(true)
    }
  })
})
