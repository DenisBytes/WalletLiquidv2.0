import type { PositionSide } from './types'

export type OrderType = 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
export type OrderStatus = 'PENDING' | 'TRIGGERED' | 'CANCELLED'

/** Returns true if the order should trigger at the current price */
export function shouldTriggerOrder(
  orderType: OrderType | 'STOP_LOSS' | 'TAKE_PROFIT',
  currentPrice: number,
  triggerPrice: number,
  side: PositionSide
): boolean {
  if (orderType === 'TAKE_PROFIT') {
    return side === 'LONG'
      ? currentPrice >= triggerPrice
      : currentPrice <= triggerPrice
  }
  // STOP_LOSS and TRAILING_STOP share the same trigger logic
  return side === 'LONG'
    ? currentPrice <= triggerPrice
    : currentPrice >= triggerPrice
}

/** Updates a trailing stop trigger price. Only moves in the favorable direction. */
export function updateTrailingStop(
  currentTrigger: number,
  trailingDistance: number,
  currentPrice: number,
  side: PositionSide
): number {
  if (side === 'LONG') {
    return Math.max(currentTrigger, currentPrice - trailingDistance)
  }
  return Math.min(currentTrigger, currentPrice + trailingDistance)
}

/** Validates that a stop-loss or take-profit price makes sense relative to entry */
export function validateOrderPrice(
  triggerPrice: number,
  entryPrice: number,
  side: PositionSide,
  orderType: 'STOP_LOSS' | 'TAKE_PROFIT'
): boolean {
  if (orderType === 'STOP_LOSS') {
    return side === 'LONG'
      ? triggerPrice < entryPrice
      : triggerPrice > entryPrice
  }
  // TAKE_PROFIT
  return side === 'LONG'
    ? triggerPrice > entryPrice
    : triggerPrice < entryPrice
}
