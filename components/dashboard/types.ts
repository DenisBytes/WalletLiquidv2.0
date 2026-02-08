import type {
  futuresPositions,
  optionsPositions,
  tradeHistory,
} from '@/lib/db/schema'

// Drizzle select types — decimals come back as strings
type FuturesRow = typeof futuresPositions.$inferSelect
type OptionsRow = typeof optionsPositions.$inferSelect

export type OpenPositions = {
  futures: FuturesRow[]
  options: OptionsRow[]
}

export type TradeRow = typeof tradeHistory.$inferSelect
