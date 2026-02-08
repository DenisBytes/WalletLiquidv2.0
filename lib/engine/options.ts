import type { OptionType, Greeks } from './types'

function normalCDF(x: number): number {
  if (x < 0) return 1 - normalCDF(-x)

  const t = 1 / (1 + 0.2316419 * x)
  const d = 0.3989422804014327
  const p =
    d *
    Math.exp((-x * x) / 2) *
    (t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))))

  return 1 - p
}

function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

function d1d2(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): { d1: number; d2: number } {
  const sqrtT = Math.sqrt(timeToExpiry)
  const d1 =
    (Math.log(spot / strike) +
      (riskFreeRate + (volatility * volatility) / 2) * timeToExpiry) /
    (volatility * sqrtT)
  const d2 = d1 - volatility * sqrtT

  return { d1, d2 }
}

export function blackScholesCall(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): number {
  const { d1, d2 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)

  return (
    spot * normalCDF(d1) -
    strike * Math.exp(-riskFreeRate * timeToExpiry) * normalCDF(d2)
  )
}

export function blackScholesPut(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): number {
  const { d1, d2 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)

  return (
    strike * Math.exp(-riskFreeRate * timeToExpiry) * normalCDF(-d2) -
    spot * normalCDF(-d1)
  )
}

export function calculateDelta(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number,
  optionType: OptionType
): number {
  const { d1 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)

  return optionType === 'CALL' ? normalCDF(d1) : normalCDF(d1) - 1
}

export function calculateGamma(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): number {
  const { d1 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)

  return normalPDF(d1) / (spot * volatility * Math.sqrt(timeToExpiry))
}

export function calculateTheta(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number,
  optionType: OptionType
): number {
  const { d1, d2 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)
  const sqrtT = Math.sqrt(timeToExpiry)
  const discount = Math.exp(-riskFreeRate * timeToExpiry)

  const common = -(spot * normalPDF(d1) * volatility) / (2 * sqrtT)

  const theta =
    optionType === 'CALL'
      ? common - riskFreeRate * strike * discount * normalCDF(d2)
      : common + riskFreeRate * strike * discount * normalCDF(-d2)

  return theta / 365
}

export function calculateVega(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number
): number {
  const { d1 } = d1d2(spot, strike, timeToExpiry, riskFreeRate, volatility)

  return (spot * normalPDF(d1) * Math.sqrt(timeToExpiry)) / 100
}

export function calculateAllGreeks(
  spot: number,
  strike: number,
  timeToExpiry: number,
  riskFreeRate: number,
  volatility: number,
  optionType: OptionType
): Greeks {
  return {
    delta: calculateDelta(
      spot,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility,
      optionType
    ),
    gamma: calculateGamma(
      spot,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility
    ),
    theta: calculateTheta(
      spot,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility,
      optionType
    ),
    vega: calculateVega(spot, strike, timeToExpiry, riskFreeRate, volatility),
  }
}

export function calculateImpliedVolatility(
  historicalPrices: number[]
): number {
  if (historicalPrices.length < 2) return 0

  const logReturns: number[] = []
  for (let i = 1; i < historicalPrices.length; i++) {
    logReturns.push(Math.log(historicalPrices[i] / historicalPrices[i - 1]))
  }

  const mean = logReturns.reduce((sum, r) => sum + r, 0) / logReturns.length
  const variance =
    logReturns.reduce((sum, r) => sum + (r - mean) ** 2, 0) /
    (logReturns.length - 1)
  const stddev = Math.sqrt(variance)

  return stddev * Math.sqrt(252)
}
