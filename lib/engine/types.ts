export type PositionSide = 'LONG' | 'SHORT'
export type FuturesStatus = 'OPEN' | 'CLOSED' | 'LIQUIDATED'
export type OptionType = 'CALL' | 'PUT'
export type OptionSide = 'BUY' | 'SELL'
export type OptionStatus = 'OPEN' | 'EXERCISED' | 'EXPIRED' | 'CLOSED'
export type TradeType = 'FUTURES' | 'OPTIONS'
export type TradeAction = 'OPEN' | 'CLOSE' | 'LIQUIDATION' | 'EXERCISE' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'FUNDING'

export interface FuturesPosition {
  id: string
  userId: string
  symbol: string
  side: PositionSide
  entryPrice: number
  markPrice: number | null
  quantity: number
  leverage: number
  liquidationPrice: number
  margin: number
  status: FuturesStatus
  openedAt: Date
  closedAt: Date | null
}

export interface OptionsPosition {
  id: string
  userId: string
  symbol: string
  optionType: OptionType
  side: OptionSide
  strikePrice: number
  premium: number
  expirationDate: Date
  quantity: number
  greeks: Greeks | null
  status: OptionStatus
  openedAt: Date
  closedAt: Date | null
}

export interface Greeks {
  delta: number
  gamma: number
  theta: number
  vega: number
}

export interface TradeRecord {
  id: string
  userId: string
  positionId: string
  type: TradeType
  action: TradeAction
  price: number
  quantity: number
  pnl: number | null
  executedAt: Date
}
