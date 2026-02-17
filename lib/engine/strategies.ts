import type { OptionType, OptionSide, Greeks } from './types'
import {
  blackScholesCall,
  blackScholesPut,
  calculateAllGreeks,
} from './options'

export type StrategyType =
  | 'BULL_CALL_SPREAD'
  | 'BEAR_PUT_SPREAD'
  | 'STRADDLE'
  | 'STRANGLE'
  | 'IRON_CONDOR'

export interface StrategyLeg {
  optionType: OptionType
  side: OptionSide
  strike: number
  premium: number
  quantity: number
  greeks: Greeks
}

interface LegTemplate {
  optionType: OptionType
  side: OptionSide
  strikeOffset: number
}

interface StrategyTemplate {
  name: string
  description: string
  legs: LegTemplate[]
}

export const STRATEGY_TEMPLATES: Record<StrategyType, StrategyTemplate> = {
  BULL_CALL_SPREAD: {
    name: 'Bull Call Spread',
    description:
      'Buy a lower-strike call and sell a higher-strike call. Limited profit and limited loss with a bullish outlook.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: -0.03 },
      { optionType: 'CALL', side: 'SELL', strikeOffset: 0.03 },
    ],
  },
  BEAR_PUT_SPREAD: {
    name: 'Bear Put Spread',
    description:
      'Buy a higher-strike put and sell a lower-strike put. Limited profit and limited loss with a bearish outlook.',
    legs: [
      { optionType: 'PUT', side: 'BUY', strikeOffset: 0.03 },
      { optionType: 'PUT', side: 'SELL', strikeOffset: -0.03 },
    ],
  },
  STRADDLE: {
    name: 'Straddle',
    description:
      'Buy a call and a put at the same strike. Profits from large moves in either direction.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0 },
      { optionType: 'PUT', side: 'BUY', strikeOffset: 0 },
    ],
  },
  STRANGLE: {
    name: 'Strangle',
    description:
      'Buy an OTM call and an OTM put. Cheaper than a straddle but needs a bigger move to profit.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0.05 },
      { optionType: 'PUT', side: 'BUY', strikeOffset: -0.05 },
    ],
  },
  IRON_CONDOR: {
    name: 'Iron Condor',
    description:
      'Sell an OTM put spread and an OTM call spread. Profits when price stays within a range.',
    legs: [
      { optionType: 'PUT', side: 'BUY', strikeOffset: -0.08 },
      { optionType: 'PUT', side: 'SELL', strikeOffset: -0.04 },
      { optionType: 'CALL', side: 'SELL', strikeOffset: 0.04 },
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0.08 },
    ],
  },
}

function roundStrike(price: number): number {
  if (price > 10000) return Math.round(price / 1000) * 1000
  if (price > 1000) return Math.round(price / 100) * 100
  return Math.round(price / 10) * 10
}

function priceLeg(
  optionType: OptionType,
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): number {
  return optionType === 'CALL'
    ? blackScholesCall(spot, strike, timeToExpiry, riskFreeRate, volatility)
    : blackScholesPut(spot, strike, timeToExpiry, riskFreeRate, volatility)
}

export function generateStrategyLegs(
  strategyType: StrategyType,
  spotPrice: number,
  volatility: number,
  riskFreeRate: number,
  daysToExpiry: number
): StrategyLeg[] {
  const template = STRATEGY_TEMPLATES[strategyType]
  const timeToExpiry = daysToExpiry / 365

  return template.legs.map((leg) => {
    const rawStrike = spotPrice * (1 + leg.strikeOffset)
    const strike = roundStrike(rawStrike)
    const premium = priceLeg(
      leg.optionType,
      spotPrice,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility
    )
    const greeks = calculateAllGreeks(
      spotPrice,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility,
      leg.optionType
    )

    return {
      optionType: leg.optionType,
      side: leg.side,
      strike,
      premium,
      quantity: 1,
      greeks,
    }
  })
}

function legPayoffAtExpiry(
  leg: StrategyLeg,
  priceAtExpiry: number
): number {
  const sideMultiplier = leg.side === 'BUY' ? 1 : -1
  const intrinsic =
    leg.optionType === 'CALL'
      ? Math.max(priceAtExpiry - leg.strike, 0)
      : Math.max(leg.strike - priceAtExpiry, 0)

  return (intrinsic - leg.premium) * sideMultiplier * leg.quantity
}

export function calculateStrategyPayoff(
  legs: StrategyLeg[],
  spotPrice: number
): { price: number; payoff: number }[] {
  const points: { price: number; payoff: number }[] = []
  const low = spotPrice * 0.7
  const high = spotPrice * 1.3
  const step = (high - low) / 100

  for (let i = 0; i <= 100; i++) {
    const price = low + step * i
    let payoff = 0
    for (const leg of legs) {
      payoff += legPayoffAtExpiry(leg, price)
    }
    points.push({ price, payoff })
  }

  return points
}

export function calculateStrategyGreeks(legs: StrategyLeg[]): Greeks {
  const aggregated: Greeks = { delta: 0, gamma: 0, theta: 0, vega: 0 }

  for (const leg of legs) {
    const multiplier = (leg.side === 'BUY' ? 1 : -1) * leg.quantity
    aggregated.delta += leg.greeks.delta * multiplier
    aggregated.gamma += leg.greeks.gamma * multiplier
    aggregated.theta += leg.greeks.theta * multiplier
    aggregated.vega += leg.greeks.vega * multiplier
  }

  return aggregated
}

export function calculateStrategyMetrics(
  legs: StrategyLeg[],
  spotPrice: number
): {
  maxProfit: number
  maxLoss: number
  breakevens: number[]
  netPremium: number
} {
  const payoffData = calculateStrategyPayoff(legs, spotPrice)

  let maxProfit = -Infinity
  let maxLoss = Infinity
  for (const point of payoffData) {
    if (point.payoff > maxProfit) maxProfit = point.payoff
    if (point.payoff < maxLoss) maxLoss = point.payoff
  }

  // Net premium: positive means net debit (you pay), negative means net credit (you receive)
  let netPremium = 0
  for (const leg of legs) {
    const multiplier = leg.side === 'BUY' ? 1 : -1
    netPremium += leg.premium * multiplier * leg.quantity
  }

  // Find breakeven points via linear interpolation where payoff crosses zero
  const breakevens: number[] = []
  for (let i = 0; i < payoffData.length - 1; i++) {
    const a = payoffData[i]
    const b = payoffData[i + 1]
    if ((a.payoff <= 0 && b.payoff > 0) || (a.payoff >= 0 && b.payoff < 0)) {
      // Linear interpolation
      const t = Math.abs(a.payoff) / (Math.abs(a.payoff) + Math.abs(b.payoff))
      const breakevenPrice = a.price + t * (b.price - a.price)
      breakevens.push(Math.round(breakevenPrice * 100) / 100)
    }
  }

  return { maxProfit, maxLoss, breakevens, netPremium }
}
