import { describe, it, expect } from 'vitest'
import {
  STRATEGY_TEMPLATES,
  generateStrategyLegs,
  calculateStrategyPayoff,
  calculateStrategyMetrics,
  calculateStrategyGreeks,
} from '../strategies'
import type { StrategyType } from '../strategies'

const SPOT = 50000
const VOLATILITY = 0.6
const RISK_FREE_RATE = 0.05
const DAYS_TO_EXPIRY = 30

describe('STRATEGY_TEMPLATES', () => {
  it('contains all 5 strategy types', () => {
    const types: StrategyType[] = [
      'BULL_CALL_SPREAD',
      'BEAR_PUT_SPREAD',
      'STRADDLE',
      'STRANGLE',
      'IRON_CONDOR',
    ]
    for (const t of types) {
      expect(STRATEGY_TEMPLATES[t]).toBeDefined()
    }
  })

  it('bull call spread has 2 legs', () => {
    expect(STRATEGY_TEMPLATES.BULL_CALL_SPREAD.legs).toHaveLength(2)
  })

  it('iron condor has 4 legs', () => {
    expect(STRATEGY_TEMPLATES.IRON_CONDOR.legs).toHaveLength(4)
  })
})

describe('generateStrategyLegs', () => {
  it('produces correct leg types for bull call spread', () => {
    const legs = generateStrategyLegs(
      'BULL_CALL_SPREAD',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    expect(legs).toHaveLength(2)
    expect(legs[0].optionType).toBe('CALL')
    expect(legs[0].side).toBe('BUY')
    expect(legs[1].optionType).toBe('CALL')
    expect(legs[1].side).toBe('SELL')
    // Buy leg strike should be below sell leg strike
    expect(legs[0].strike).toBeLessThan(legs[1].strike)
    // Premiums should be positive
    expect(legs[0].premium).toBeGreaterThan(0)
    expect(legs[1].premium).toBeGreaterThan(0)
  })

  it('produces correct leg types for straddle', () => {
    const legs = generateStrategyLegs(
      'STRADDLE',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    expect(legs).toHaveLength(2)
    expect(legs[0].optionType).toBe('CALL')
    expect(legs[0].side).toBe('BUY')
    expect(legs[1].optionType).toBe('PUT')
    expect(legs[1].side).toBe('BUY')
    // Both legs should have the same strike (ATM)
    expect(legs[0].strike).toBe(legs[1].strike)
  })

  it('legs include greeks', () => {
    const legs = generateStrategyLegs(
      'STRADDLE',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    for (const leg of legs) {
      expect(leg.greeks).toBeDefined()
      expect(typeof leg.greeks.delta).toBe('number')
      expect(typeof leg.greeks.gamma).toBe('number')
      expect(typeof leg.greeks.theta).toBe('number')
      expect(typeof leg.greeks.vega).toBe('number')
    }
  })
})

describe('calculateStrategyPayoff', () => {
  it('returns 101 points with price and payoff', () => {
    const legs = generateStrategyLegs(
      'BULL_CALL_SPREAD',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const payoff = calculateStrategyPayoff(legs, SPOT)
    expect(payoff).toHaveLength(101)
    for (const point of payoff) {
      expect(typeof point.price).toBe('number')
      expect(typeof point.payoff).toBe('number')
    }
  })

  it('bull call spread has bounded profit and loss', () => {
    const legs = generateStrategyLegs(
      'BULL_CALL_SPREAD',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const payoff = calculateStrategyPayoff(legs, SPOT)
    const payoffs = payoff.map((p) => p.payoff)
    const maxPayoff = Math.max(...payoffs)
    const minPayoff = Math.min(...payoffs)

    // Bull call spread: max profit = strike difference minus net debit, max loss = net debit
    // Both should be finite
    expect(maxPayoff).toBeGreaterThan(0)
    expect(minPayoff).toBeLessThan(0)
    expect(Number.isFinite(maxPayoff)).toBe(true)
    expect(Number.isFinite(minPayoff)).toBe(true)

    // Profit and loss should be bounded (not growing unboundedly at extremes)
    // The first several and last several points should be nearly equal
    const lowEnd = payoffs.slice(0, 5)
    const highEnd = payoffs.slice(-5)
    const lowRange = Math.max(...lowEnd) - Math.min(...lowEnd)
    const highRange = Math.max(...highEnd) - Math.min(...highEnd)
    expect(lowRange).toBeLessThan(1)
    expect(highRange).toBeLessThan(1)
  })
})

describe('calculateStrategyMetrics', () => {
  it('returns maxProfit > 0, maxLoss < 0, and breakevens array', () => {
    const legs = generateStrategyLegs(
      'BULL_CALL_SPREAD',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const metrics = calculateStrategyMetrics(legs, SPOT)
    expect(metrics.maxProfit).toBeGreaterThan(0)
    expect(metrics.maxLoss).toBeLessThan(0)
    expect(Array.isArray(metrics.breakevens)).toBe(true)
    expect(metrics.breakevens.length).toBeGreaterThanOrEqual(1)
  })

  it('returns a netPremium value', () => {
    const legs = generateStrategyLegs(
      'STRADDLE',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const metrics = calculateStrategyMetrics(legs, SPOT)
    expect(typeof metrics.netPremium).toBe('number')
    // Straddle is a debit strategy: net premium should be positive
    expect(metrics.netPremium).toBeGreaterThan(0)
  })
})

describe('calculateStrategyGreeks', () => {
  it('returns aggregated greeks', () => {
    const legs = generateStrategyLegs(
      'BULL_CALL_SPREAD',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const greeks = calculateStrategyGreeks(legs)
    expect(typeof greeks.delta).toBe('number')
    expect(typeof greeks.gamma).toBe('number')
    expect(typeof greeks.theta).toBe('number')
    expect(typeof greeks.vega).toBe('number')
  })

  it('straddle has near-zero delta', () => {
    const legs = generateStrategyLegs(
      'STRADDLE',
      SPOT,
      VOLATILITY,
      RISK_FREE_RATE,
      DAYS_TO_EXPIRY
    )
    const greeks = calculateStrategyGreeks(legs)
    // ATM straddle delta should be close to zero (call delta ~0.5, put delta ~-0.5)
    expect(Math.abs(greeks.delta)).toBeLessThan(0.15)
  })
})
