import {
  pgTable,
  text,
  decimal,
  timestamp,
  uuid,
  integer,
  jsonb,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const positionSideEnum = pgEnum('position_side', ['LONG', 'SHORT'])
export const futuresStatusEnum = pgEnum('futures_status', ['OPEN', 'CLOSED', 'LIQUIDATED'])
export const optionTypeEnum = pgEnum('option_type', ['CALL', 'PUT'])
export const optionSideEnum = pgEnum('option_side', ['BUY', 'SELL'])
export const optionStatusEnum = pgEnum('option_status', [
  'OPEN',
  'EXERCISED',
  'EXPIRED',
  'CLOSED',
])
export const tradeTypeEnum = pgEnum('trade_type', ['FUTURES', 'OPTIONS'])
export const tradeActionEnum = pgEnum('trade_action', ['OPEN', 'CLOSE', 'LIQUIDATION', 'EXERCISE'])

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Auth0 sub
  balance: decimal('balance', { precision: 20, scale: 2 }).notNull().default('100000'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const futuresPositions = pgTable('futures_positions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  symbol: text('symbol').notNull(),
  side: positionSideEnum('side').notNull(),
  entryPrice: decimal('entry_price', { precision: 20, scale: 8 }).notNull(),
  markPrice: decimal('mark_price', { precision: 20, scale: 8 }),
  quantity: decimal('quantity', { precision: 20, scale: 8 }).notNull(),
  leverage: integer('leverage').notNull(),
  liquidationPrice: decimal('liquidation_price', { precision: 20, scale: 8 }).notNull(),
  margin: decimal('margin', { precision: 20, scale: 8 }).notNull(),
  status: futuresStatusEnum('status').notNull().default('OPEN'),
  openedAt: timestamp('opened_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
})

export const optionsPositions = pgTable('options_positions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  symbol: text('symbol').notNull(),
  optionType: optionTypeEnum('option_type').notNull(),
  side: optionSideEnum('side').notNull(),
  strikePrice: decimal('strike_price', { precision: 20, scale: 8 }).notNull(),
  premium: decimal('premium', { precision: 20, scale: 8 }).notNull(),
  expirationDate: timestamp('expiration_date').notNull(),
  quantity: decimal('quantity', { precision: 20, scale: 8 }).notNull(),
  greeks: jsonb('greeks').$type<{
    delta: number
    gamma: number
    theta: number
    vega: number
  }>(),
  status: optionStatusEnum('status').notNull().default('OPEN'),
  openedAt: timestamp('opened_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
})

export const tradeHistory = pgTable('trade_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  positionId: uuid('position_id').notNull(),
  type: tradeTypeEnum('type').notNull(),
  action: tradeActionEnum('action').notNull(),
  price: decimal('price', { precision: 20, scale: 8 }).notNull(),
  quantity: decimal('quantity', { precision: 20, scale: 8 }).notNull(),
  pnl: decimal('pnl', { precision: 20, scale: 8 }),
  executedAt: timestamp('executed_at').defaultNow().notNull(),
})

export const courseProgress = pgTable(
  'course_progress',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    courseId: text('course_id').notNull(),
    chapterSlug: text('chapter_slug').notNull(),
    completedAt: timestamp('completed_at').defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.courseId, table.chapterSlug] })]
)
