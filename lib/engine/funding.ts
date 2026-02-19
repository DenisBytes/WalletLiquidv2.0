import type { PositionSide } from './types'

/**
 * Calculate funding payment for a position.
 * Returns positive = credit to balance, negative = debit from balance.
 *
 * Longs pay positive rates, shorts pay negative rates.
 */
export function calculateFundingPayment(
  positionSize: number,
  markPrice: number,
  fundingRate: number,
  side: PositionSide
): number {
  const notional = positionSize * markPrice
  const payment = notional * fundingRate

  return side === 'LONG' ? -payment : payment
}
