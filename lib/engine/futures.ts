import type { PositionSide } from './types'

const DEFAULT_MAINTENANCE_MARGIN_RATE = 0.005

export function calculateMargin(
  quantity: number,
  entryPrice: number,
  leverage: number
): number {
  return (quantity * entryPrice) / leverage
}

export function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  side: PositionSide,
  maintenanceMarginRate = DEFAULT_MAINTENANCE_MARGIN_RATE
): number {
  if (side === 'LONG') {
    return entryPrice * (1 - 1 / leverage + maintenanceMarginRate)
  }
  return entryPrice * (1 + 1 / leverage - maintenanceMarginRate)
}

export function calculatePnl(
  entryPrice: number,
  markPrice: number,
  quantity: number,
  side: PositionSide
): number {
  if (side === 'LONG') {
    return (markPrice - entryPrice) * quantity
  }
  return (entryPrice - markPrice) * quantity
}

export function calculateRoe(pnl: number, margin: number): number {
  return (pnl / margin) * 100
}

export function isLiquidated(
  markPrice: number,
  liquidationPrice: number,
  side: PositionSide
): boolean {
  if (side === 'LONG') {
    return markPrice <= liquidationPrice
  }
  return markPrice >= liquidationPrice
}
