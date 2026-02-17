# Trading-Critical Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add portfolio analytics, funding rates, advanced order types, and multi-leg option strategies to the paper trading platform.

**Architecture:** Vertical slices — each feature built end-to-end (types → engine → schema → actions → UI) before starting the next. Pure engine functions tested with vitest. Integration verified with `bun run build`.

**Tech Stack:** Next.js 15 + Drizzle ORM + Neon Postgres + Zustand + Tailwind v4 + vitest (new)

---

## Task 0: Set Up Vitest for Engine Tests

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (add vitest dep + test script)
- Create: `lib/engine/__tests__/futures.test.ts` (sanity test on existing code)

**Step 1: Install vitest**

Run: `bun add -d vitest`

**Step 2: Create vitest config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: ['lib/engine/__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
})
```

**Step 3: Add test script to package.json**

Add to `"scripts"`: `"test": "vitest run"`, `"test:watch": "vitest"`

**Step 4: Write sanity test for existing futures engine**

```ts
// lib/engine/__tests__/futures.test.ts
import { describe, it, expect } from 'vitest'
import { calculatePnl, calculateMargin, calculateRoe, isLiquidated } from '../futures'

describe('futures engine', () => {
  it('calculates long PnL correctly', () => {
    // Buy 1 BTC at $50,000, price moves to $51,000
    expect(calculatePnl(50000, 51000, 1, 'LONG')).toBe(1000)
  })

  it('calculates short PnL correctly', () => {
    // Short 1 BTC at $50,000, price drops to $49,000
    expect(calculatePnl(50000, 49000, 1, 'SHORT')).toBe(1000)
  })

  it('calculates margin correctly', () => {
    // 1 BTC at $50,000 with 10x leverage
    expect(calculateMargin(1, 50000, 10)).toBe(5000)
  })

  it('calculates ROE correctly', () => {
    expect(calculateRoe(500, 5000)).toBe(10)
  })

  it('detects long liquidation', () => {
    expect(isLiquidated(44000, 45000, 'LONG')).toBe(true)
    expect(isLiquidated(46000, 45000, 'LONG')).toBe(false)
  })
})
```

**Step 5: Run tests**

Run: `bun run test`
Expected: All 5 tests PASS

**Step 6: Commit**

```bash
git add vitest.config.ts package.json bun.lockb lib/engine/__tests__/futures.test.ts
git commit -m "Add vitest with sanity tests for futures engine"
```

---

## Task 1: Portfolio Analytics — Engine

**Files:**
- Create: `lib/engine/analytics.ts`
- Create: `lib/engine/__tests__/analytics.test.ts`

**Step 1: Write failing tests**

```ts
// lib/engine/__tests__/analytics.test.ts
import { describe, it, expect } from 'vitest'
import {
  calculateWinRate,
  calculateProfitFactor,
  calculateMaxDrawdown,
  calculateSharpeRatio,
  calculateAnalytics,
} from '../analytics'

// Trade shape matching what getTradeHistory returns (pnl as string, action as string)
const makeTrade = (pnl: string | null, action: string) => ({
  pnl,
  action,
  executedAt: new Date(),
})

describe('calculateWinRate', () => {
  it('returns 0 for no closed trades', () => {
    expect(calculateWinRate([])).toBe(0)
  })

  it('calculates from CLOSE and LIQUIDATION trades only', () => {
    const trades = [
      makeTrade(null, 'OPEN'),       // ignored
      makeTrade('100', 'CLOSE'),     // win
      makeTrade('-50', 'CLOSE'),     // loss
      makeTrade('200', 'CLOSE'),     // win
      makeTrade('-1000', 'LIQUIDATION'), // loss
    ]
    expect(calculateWinRate(trades)).toBeCloseTo(0.5) // 2 wins / 4 closed
  })
})

describe('calculateProfitFactor', () => {
  it('returns 0 for no trades', () => {
    expect(calculateProfitFactor([])).toBe(0)
  })

  it('returns Infinity for no losses', () => {
    const trades = [makeTrade('100', 'CLOSE'), makeTrade('200', 'CLOSE')]
    expect(calculateProfitFactor(trades)).toBe(Infinity)
  })

  it('calculates gross profit / gross loss', () => {
    const trades = [
      makeTrade('300', 'CLOSE'),
      makeTrade('-100', 'CLOSE'),
      makeTrade('200', 'CLOSE'),
      makeTrade('-150', 'LIQUIDATION'),
    ]
    // gross profit = 500, gross loss = 250
    expect(calculateProfitFactor(trades)).toBe(2)
  })
})

describe('calculateMaxDrawdown', () => {
  it('returns 0 for no trades', () => {
    expect(calculateMaxDrawdown([])).toBe(0)
  })

  it('calculates peak-to-trough decline', () => {
    // Equity curve: 100000 -> 100500 -> 100200 -> 100800 -> 99800
    const trades = [
      makeTrade('500', 'CLOSE'),
      makeTrade('-300', 'CLOSE'),
      makeTrade('600', 'CLOSE'),
      makeTrade('-1000', 'LIQUIDATION'),
    ]
    // Peak at 100800, trough at 99800 => drawdown = 1000
    expect(calculateMaxDrawdown(trades, 100000)).toBe(1000)
  })
})

describe('calculateSharpeRatio', () => {
  it('returns 0 for fewer than 2 trades', () => {
    expect(calculateSharpeRatio([makeTrade('100', 'CLOSE')])).toBe(0)
  })

  it('returns a positive ratio for consistently profitable trades', () => {
    const trades = Array.from({ length: 20 }, () => makeTrade('100', 'CLOSE'))
    expect(calculateSharpeRatio(trades)).toBeGreaterThan(0)
  })
})

describe('calculateAnalytics', () => {
  it('returns all metrics', () => {
    const trades = [
      makeTrade('500', 'CLOSE'),
      makeTrade('-200', 'CLOSE'),
      makeTrade('300', 'CLOSE'),
    ]
    const result = calculateAnalytics(trades, 100000)
    expect(result).toHaveProperty('winRate')
    expect(result).toHaveProperty('profitFactor')
    expect(result).toHaveProperty('maxDrawdown')
    expect(result).toHaveProperty('sharpeRatio')
    expect(result).toHaveProperty('totalTrades')
    expect(result).toHaveProperty('winningTrades')
    expect(result).toHaveProperty('losingTrades')
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `bun run test`
Expected: FAIL — module `../analytics` not found

**Step 3: Implement analytics engine**

```ts
// lib/engine/analytics.ts
export interface Analytics {
  winRate: number
  profitFactor: number
  maxDrawdown: number
  sharpeRatio: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
}

interface TradeInput {
  pnl: string | null
  action: string
  executedAt: Date
}

const CLOSED_ACTIONS = ['CLOSE', 'LIQUIDATION', 'STOP_LOSS', 'TAKE_PROFIT', 'EXERCISE']
const STARTING_BALANCE = 100000

function getClosedTrades(trades: TradeInput[]): { pnl: number }[] {
  return trades
    .filter((t) => CLOSED_ACTIONS.includes(t.action) && t.pnl != null)
    .map((t) => ({ pnl: parseFloat(t.pnl!) }))
}

export function calculateWinRate(trades: TradeInput[]): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0
  const wins = closed.filter((t) => t.pnl > 0).length
  return wins / closed.length
}

export function calculateProfitFactor(trades: TradeInput[]): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0

  const grossProfit = closed.reduce((sum, t) => sum + (t.pnl > 0 ? t.pnl : 0), 0)
  const grossLoss = closed.reduce((sum, t) => sum + (t.pnl < 0 ? Math.abs(t.pnl) : 0), 0)

  if (grossLoss === 0) return grossProfit > 0 ? Infinity : 0
  return grossProfit / grossLoss
}

export function calculateMaxDrawdown(
  trades: TradeInput[],
  startingBalance = STARTING_BALANCE
): number {
  const closed = getClosedTrades(trades)
  if (closed.length === 0) return 0

  let equity = startingBalance
  let peak = startingBalance
  let maxDrawdown = 0

  for (const trade of closed) {
    equity += trade.pnl
    if (equity > peak) peak = equity
    const drawdown = peak - equity
    if (drawdown > maxDrawdown) maxDrawdown = drawdown
  }

  return maxDrawdown
}

export function calculateSharpeRatio(
  trades: TradeInput[],
  riskFreeAnnual = 0.05
): number {
  const closed = getClosedTrades(trades)
  if (closed.length < 2) return 0

  const returns = closed.map((t) => t.pnl)
  const mean = returns.reduce((s, r) => s + r, 0) / returns.length
  const variance =
    returns.reduce((s, r) => s + (r - mean) ** 2, 0) / (returns.length - 1)
  const stddev = Math.sqrt(variance)

  if (stddev === 0) return 0

  // Approximate: assume ~250 trades/year for annualization
  const periodsPerYear = 250
  const riskFreePerPeriod = riskFreeAnnual / periodsPerYear
  const excessReturn = mean - riskFreePerPeriod

  return (excessReturn / stddev) * Math.sqrt(periodsPerYear)
}

export function calculateAnalytics(
  trades: TradeInput[],
  startingBalance = STARTING_BALANCE
): Analytics {
  const closed = getClosedTrades(trades)
  const wins = closed.filter((t) => t.pnl > 0).length
  const losses = closed.filter((t) => t.pnl <= 0).length

  return {
    winRate: calculateWinRate(trades),
    profitFactor: calculateProfitFactor(trades),
    maxDrawdown: calculateMaxDrawdown(trades, startingBalance),
    sharpeRatio: calculateSharpeRatio(trades),
    totalTrades: closed.length,
    winningTrades: wins,
    losingTrades: losses,
  }
}
```

**Step 4: Run tests**

Run: `bun run test`
Expected: All tests PASS

**Step 5: Commit**

```bash
git add lib/engine/analytics.ts lib/engine/__tests__/analytics.test.ts
git commit -m "Add portfolio analytics engine with tests"
```

---

## Task 2: Portfolio Analytics — Server Action + UI

**Files:**
- Create: `lib/actions/analytics.ts`
- Create: `components/dashboard/analytics-cards.tsx`
- Modify: `app/(app)/dashboard/page.tsx`

**Step 1: Create the server action**

```ts
// lib/actions/analytics.ts
'use server'

import { db } from '@/lib/db'
import { tradeHistory } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getOrCreateUser, getBalance } from './user'
import { calculateAnalytics } from '@/lib/engine/analytics'

export async function getPortfolioAnalytics() {
  const user = await getOrCreateUser()
  const balance = parseFloat(user.balance)

  const trades = await db
    .select()
    .from(tradeHistory)
    .where(eq(tradeHistory.userId, user.id))

  return calculateAnalytics(trades, balance)
}
```

**Step 2: Create the AnalyticsCards component**

Use the `/frontend-design` skill for this component. It should:
- Accept `analytics: Analytics` prop from the design doc `lib/engine/analytics.ts`
- Display 4 glass cards in a responsive grid: Win Rate, Profit Factor, Max Drawdown, Sharpe Ratio
- Color coding: Win Rate green/red at 50% threshold, Profit Factor green/red at 1.0, Max Drawdown always danger color, Sharpe green >1 / yellow 0-1 / red <0
- Each card shows: label, formatted value, and a small count indicator (e.g., "23 trades")
- Use `font-numbers` for all values, glass card styling consistent with existing dashboard
- Handle zero-trades state gracefully (show dashes or "No data")

**Step 3: Add analytics to the dashboard page**

Modify `app/(app)/dashboard/page.tsx`:
- Import and call `getPortfolioAnalytics()` in the Promise.all
- Add `<AnalyticsCards analytics={analytics} />` after the portfolio/allocation row

**Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds with no type errors

**Step 5: Commit**

```bash
git add lib/actions/analytics.ts components/dashboard/analytics-cards.tsx app/\(app\)/dashboard/page.tsx
git commit -m "Add portfolio analytics cards to dashboard"
```

---

## Task 3: Funding Rates — Types + Engine

**Files:**
- Modify: `lib/engine/types.ts` (add new types)
- Create: `lib/engine/funding.ts`
- Create: `lib/engine/__tests__/funding.test.ts`

**Step 1: Extend types**

Add to `lib/engine/types.ts`:

```ts
export type TradeAction = 'OPEN' | 'CLOSE' | 'LIQUIDATION' | 'EXERCISE' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'FUNDING'
```

(Replace the existing `TradeAction` line.)

**Step 2: Write failing tests for funding engine**

```ts
// lib/engine/__tests__/funding.test.ts
import { describe, it, expect } from 'vitest'
import { calculateFundingPayment } from '../funding'

describe('calculateFundingPayment', () => {
  it('long pays positive funding rate', () => {
    // 1 BTC position, mark $50,000, rate 0.01% (0.0001)
    const payment = calculateFundingPayment(1, 50000, 0.0001, 'LONG')
    expect(payment).toBe(-5) // pays $5
  })

  it('short receives positive funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, 0.0001, 'SHORT')
    expect(payment).toBe(5) // receives $5
  })

  it('long receives negative funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, -0.0001, 'LONG')
    expect(payment).toBe(5) // receives $5
  })

  it('short pays negative funding rate', () => {
    const payment = calculateFundingPayment(1, 50000, -0.0001, 'SHORT')
    expect(payment).toBe(-5) // pays $5
  })

  it('scales with position size', () => {
    const payment = calculateFundingPayment(2, 50000, 0.0001, 'LONG')
    expect(payment).toBe(-10)
  })
})
```

**Step 3: Run tests to verify they fail**

Run: `bun run test`
Expected: FAIL

**Step 4: Implement funding engine**

```ts
// lib/engine/funding.ts
import type { PositionSide } from './types'

/**
 * Calculate funding payment for a position.
 * Returns positive = credit to balance, negative = debit from balance.
 *
 * Longs pay positive rates, shorts pay negative rates.
 * payment = positionSize * markPrice * fundingRate
 */
export function calculateFundingPayment(
  positionSize: number,
  markPrice: number,
  fundingRate: number,
  side: PositionSide
): number {
  const notional = positionSize * markPrice
  const payment = notional * fundingRate

  // Longs pay when rate is positive (return negative = debit)
  // Shorts receive when rate is positive (return positive = credit)
  return side === 'LONG' ? -payment : payment
}
```

**Step 5: Run tests**

Run: `bun run test`
Expected: All pass

**Step 6: Commit**

```bash
git add lib/engine/types.ts lib/engine/funding.ts lib/engine/__tests__/funding.test.ts
git commit -m "Add funding rate engine with payment calculation"
```

---

## Task 4: Funding Rates — Schema + Migration

**Files:**
- Modify: `lib/db/schema.ts` (add fundingRateHistory table, update tradeActionEnum)

**Step 1: Update the schema**

Add to `lib/db/schema.ts`:

1. Update the `tradeActionEnum` to include new values:
```ts
export const tradeActionEnum = pgEnum('trade_action', [
  'OPEN', 'CLOSE', 'LIQUIDATION', 'EXERCISE', 'STOP_LOSS', 'TAKE_PROFIT', 'FUNDING',
])
```

2. Add the new table after `tradeHistory`:
```ts
export const fundingRateHistory = pgTable('funding_rate_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  positionId: uuid('position_id')
    .notNull()
    .references(() => futuresPositions.id),
  symbol: text('symbol').notNull(),
  fundingRate: decimal('funding_rate', { precision: 20, scale: 10 }).notNull(),
  payment: decimal('payment', { precision: 20, scale: 8 }).notNull(),
  appliedAt: timestamp('applied_at').defaultNow().notNull(),
})
```

**Step 2: Push schema to database**

Run: `bunx drizzle-kit push`

**Important:** The `trade_action` enum alteration may require manual SQL if drizzle-kit can't add values to an existing enum. If push fails, run this manually against Neon:

```sql
ALTER TYPE trade_action ADD VALUE IF NOT EXISTS 'STOP_LOSS';
ALTER TYPE trade_action ADD VALUE IF NOT EXISTS 'TAKE_PROFIT';
ALTER TYPE trade_action ADD VALUE IF NOT EXISTS 'FUNDING';
```

Then re-run `bunx drizzle-kit push` for the new table.

**Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add lib/db/schema.ts
git commit -m "Add funding rate history table and extend trade actions enum"
```

---

## Task 5: Funding Rates — Server Action

**Files:**
- Create: `lib/actions/funding.ts`

**Step 1: Implement the server action**

```ts
// lib/actions/funding.ts
'use server'

import { db } from '@/lib/db'
import {
  users,
  futuresPositions,
  fundingRateHistory,
  tradeHistory,
} from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculateFundingPayment } from '@/lib/engine/funding'
import type { PositionSide } from '@/lib/engine/types'

const FUNDING_INTERVAL_MS = 8 * 60 * 60 * 1000 // 8 hours
const BINANCE_PREMIUM_INDEX = 'https://fapi.binance.com/fapi/v1/premiumIndex'

interface BinancePremiumIndex {
  symbol: string
  lastFundingRate: string
  nextFundingTime: number
}

async function fetchFundingRate(symbol: string): Promise<number> {
  try {
    const res = await fetch(`${BINANCE_PREMIUM_INDEX}?symbol=${symbol}USDT`)
    if (!res.ok) return 0.0001 // fallback to 0.01%
    const data: BinancePremiumIndex = await res.json()
    return parseFloat(data.lastFundingRate)
  } catch {
    return 0.0001 // fallback
  }
}

export async function applyFundingRates(): Promise<{
  applied: number
  totalPayment: number
}> {
  const user = await getOrCreateUser()

  // Get all open futures positions
  const positions = await db
    .select()
    .from(futuresPositions)
    .where(
      and(eq(futuresPositions.userId, user.id), eq(futuresPositions.status, 'OPEN'))
    )

  if (positions.length === 0) return { applied: 0, totalPayment: 0 }

  let applied = 0
  let totalPayment = 0

  for (const position of positions) {
    // Check if funding was already applied in the last 8 hours for this position
    const [lastFunding] = await db
      .select()
      .from(fundingRateHistory)
      .where(eq(fundingRateHistory.positionId, position.id))
      .orderBy(desc(fundingRateHistory.appliedAt))
      .limit(1)

    if (lastFunding) {
      const elapsed = Date.now() - new Date(lastFunding.appliedAt).getTime()
      if (elapsed < FUNDING_INTERVAL_MS) continue
    }

    // Fetch the current funding rate from Binance
    const rate = await fetchFundingRate(position.symbol)
    const positionSize = parseFloat(position.quantity)
    const markPrice = parseFloat(position.entryPrice) // use entry as proxy when no live price
    const payment = calculateFundingPayment(
      positionSize,
      markPrice,
      rate,
      position.side as PositionSide
    )

    // Record funding rate application
    await db.insert(fundingRateHistory).values({
      userId: user.id,
      positionId: position.id,
      symbol: position.symbol,
      fundingRate: rate.toString(),
      payment: payment.toString(),
    })

    // Update user balance
    await db
      .update(users)
      .set({
        balance: `(${users.balance}::numeric + ${payment.toString()}::numeric)`,
      })
      .where(eq(users.id, user.id))

    // Log to trade history
    await db.insert(tradeHistory).values({
      userId: user.id,
      positionId: position.id,
      type: 'FUTURES',
      action: 'FUNDING',
      price: markPrice.toString(),
      quantity: position.quantity,
      pnl: payment.toString(),
    })

    applied++
    totalPayment += payment
  }

  return { applied, totalPayment }
}

export async function getFundingHistory(positionId?: string) {
  const user = await getOrCreateUser()

  if (positionId) {
    return db
      .select()
      .from(fundingRateHistory)
      .where(
        and(
          eq(fundingRateHistory.userId, user.id),
          eq(fundingRateHistory.positionId, positionId)
        )
      )
      .orderBy(desc(fundingRateHistory.appliedAt))
  }

  return db
    .select()
    .from(fundingRateHistory)
    .where(eq(fundingRateHistory.userId, user.id))
    .orderBy(desc(fundingRateHistory.appliedAt))
    .limit(50)
}

export async function getCurrentFundingRate(
  symbol: string
): Promise<{ rate: number; nextFundingTime: number }> {
  try {
    const res = await fetch(`${BINANCE_PREMIUM_INDEX}?symbol=${symbol}USDT`)
    if (!res.ok) return { rate: 0.0001, nextFundingTime: 0 }
    const data: BinancePremiumIndex = await res.json()
    return {
      rate: parseFloat(data.lastFundingRate),
      nextFundingTime: data.nextFundingTime,
    }
  } catch {
    return { rate: 0.0001, nextFundingTime: 0 }
  }
}
```

**Important note on balance update:** The raw SQL template in the action above uses the same pattern as existing actions in `lib/actions/trade.ts`. Use the `sql` template literal from drizzle-orm:

```ts
import { sql } from 'drizzle-orm'
// ...
.set({ balance: sql`${users.balance}::numeric + ${payment.toString()}::numeric` })
```

**Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add lib/actions/funding.ts
git commit -m "Add funding rate server actions with Binance API fetch"
```

---

## Task 6: Funding Rates — UI Integration

**Files:**
- Modify: `components/trading/futures-trading.tsx` (add funding rate display + lazy trigger)
- Modify: `components/trading/positions-table.tsx` (add funding column)
- Modify: `components/dashboard/recent-trades.tsx` (handle FUNDING action)

**Step 1: Add funding rate display to futures page**

In `components/trading/futures-trading.tsx`:
- Add a `useFundingRate` hook or inline `useEffect` that:
  1. On mount, calls `applyFundingRates()` server action (the lazy trigger)
  2. Fetches `getCurrentFundingRate(symbol)` to display the badge
- Display a funding rate badge next to the symbol selector showing the rate (e.g., "0.01%")
- Color: green if rate < 0 (longs receive), red if rate > 0 (longs pay)

**Step 2: Add funding info to positions table**

In `components/trading/positions-table.tsx`:
- Add a "Funding" column after the PnL column
- For each position, fetch cumulative funding from the position's funding history
- Display as green (received) or red (paid) amount

**Step 3: Handle FUNDING action in recent trades**

In `components/dashboard/recent-trades.tsx`:
- Add to `actionConfig`:
```ts
FUNDING: { label: 'FUND', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/15' },
STOP_LOSS: { label: 'SL', color: 'text-orange-400', bg: 'bg-orange-400/15' },
TAKE_PROFIT: { label: 'TP', color: 'text-success', bg: 'bg-success/15' },
```

**Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add components/trading/futures-trading.tsx components/trading/positions-table.tsx components/dashboard/recent-trades.tsx
git commit -m "Add funding rate UI to futures page and dashboard"
```

---

## Task 7: Advanced Orders — Engine

**Files:**
- Create: `lib/engine/orders.ts`
- Create: `lib/engine/__tests__/orders.test.ts`

**Step 1: Write failing tests**

```ts
// lib/engine/__tests__/orders.test.ts
import { describe, it, expect } from 'vitest'
import { shouldTriggerOrder, updateTrailingStop, validateOrderPrice } from '../orders'

describe('shouldTriggerOrder', () => {
  it('triggers stop-loss for long when price drops below trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 49000, 50000, 'LONG')).toBe(true)
    expect(shouldTriggerOrder('STOP_LOSS', 51000, 50000, 'LONG')).toBe(false)
  })

  it('triggers stop-loss for short when price rises above trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 51000, 50000, 'SHORT')).toBe(true)
    expect(shouldTriggerOrder('STOP_LOSS', 49000, 50000, 'SHORT')).toBe(false)
  })

  it('triggers take-profit for long when price rises above trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 55000, 54000, 'LONG')).toBe(true)
    expect(shouldTriggerOrder('TAKE_PROFIT', 53000, 54000, 'LONG')).toBe(false)
  })

  it('triggers take-profit for short when price drops below trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 45000, 46000, 'SHORT')).toBe(true)
    expect(shouldTriggerOrder('TAKE_PROFIT', 47000, 46000, 'SHORT')).toBe(false)
  })
})

describe('updateTrailingStop', () => {
  it('moves trigger up for long when price increases', () => {
    // Trailing distance: 1000. Current trigger: 49000. New price: 52000.
    // New trigger should be 52000 - 1000 = 51000
    const result = updateTrailingStop(49000, 1000, 52000, 'LONG')
    expect(result).toBe(51000)
  })

  it('does not move trigger down for long when price decreases', () => {
    const result = updateTrailingStop(49000, 1000, 48000, 'LONG')
    expect(result).toBe(49000) // unchanged
  })

  it('moves trigger down for short when price decreases', () => {
    // Trailing distance: 1000. Current trigger: 51000. New price: 48000.
    // New trigger should be 48000 + 1000 = 49000
    const result = updateTrailingStop(51000, 1000, 48000, 'SHORT')
    expect(result).toBe(49000)
  })

  it('does not move trigger up for short when price increases', () => {
    const result = updateTrailingStop(51000, 1000, 52000, 'SHORT')
    expect(result).toBe(51000) // unchanged
  })
})

describe('validateOrderPrice', () => {
  it('validates stop-loss below entry for long', () => {
    expect(validateOrderPrice(49000, 50000, 'LONG', 'STOP_LOSS')).toBe(true)
    expect(validateOrderPrice(51000, 50000, 'LONG', 'STOP_LOSS')).toBe(false)
  })

  it('validates stop-loss above entry for short', () => {
    expect(validateOrderPrice(51000, 50000, 'SHORT', 'STOP_LOSS')).toBe(true)
    expect(validateOrderPrice(49000, 50000, 'SHORT', 'STOP_LOSS')).toBe(false)
  })

  it('validates take-profit above entry for long', () => {
    expect(validateOrderPrice(55000, 50000, 'LONG', 'TAKE_PROFIT')).toBe(true)
    expect(validateOrderPrice(45000, 50000, 'LONG', 'TAKE_PROFIT')).toBe(false)
  })

  it('validates take-profit below entry for short', () => {
    expect(validateOrderPrice(45000, 50000, 'SHORT', 'TAKE_PROFIT')).toBe(true)
    expect(validateOrderPrice(55000, 50000, 'SHORT', 'TAKE_PROFIT')).toBe(false)
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `bun run test`
Expected: FAIL

**Step 3: Implement orders engine**

```ts
// lib/engine/orders.ts
import type { PositionSide } from './types'

export type OrderType = 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
export type OrderStatus = 'PENDING' | 'TRIGGERED' | 'CANCELLED'

export function shouldTriggerOrder(
  orderType: OrderType | 'STOP_LOSS' | 'TAKE_PROFIT',
  currentPrice: number,
  triggerPrice: number,
  side: PositionSide
): boolean {
  if (orderType === 'STOP_LOSS' || orderType === 'TRAILING_STOP') {
    return side === 'LONG'
      ? currentPrice <= triggerPrice
      : currentPrice >= triggerPrice
  }

  // TAKE_PROFIT
  return side === 'LONG'
    ? currentPrice >= triggerPrice
    : currentPrice <= triggerPrice
}

export function updateTrailingStop(
  currentTrigger: number,
  trailingDistance: number,
  currentPrice: number,
  side: PositionSide
): number {
  if (side === 'LONG') {
    const newTrigger = currentPrice - trailingDistance
    return Math.max(newTrigger, currentTrigger)
  }

  // SHORT
  const newTrigger = currentPrice + trailingDistance
  return Math.min(newTrigger, currentTrigger)
}

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
```

**Step 4: Run tests**

Run: `bun run test`
Expected: All pass

**Step 5: Commit**

```bash
git add lib/engine/orders.ts lib/engine/__tests__/orders.test.ts
git commit -m "Add order trigger engine with stop-loss, take-profit, trailing stop"
```

---

## Task 8: Advanced Orders — Schema

**Files:**
- Modify: `lib/db/schema.ts` (add orders table + enums)

**Step 1: Add to schema**

Add enums and table to `lib/db/schema.ts`:

```ts
export const orderTypeEnum = pgEnum('order_type', ['STOP_LOSS', 'TAKE_PROFIT', 'TRAILING_STOP'])
export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'TRIGGERED', 'CANCELLED'])

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  positionId: uuid('position_id')
    .notNull()
    .references(() => futuresPositions.id),
  type: orderTypeEnum('type').notNull(),
  triggerPrice: decimal('trigger_price', { precision: 20, scale: 8 }).notNull(),
  trailingDistance: decimal('trailing_distance', { precision: 20, scale: 8 }),
  reduceOnly: integer('reduce_only').notNull().default(1),
  status: orderStatusEnum('status').notNull().default('PENDING'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  triggeredAt: timestamp('triggered_at'),
})
```

**Step 2: Push schema**

Run: `bunx drizzle-kit push`

**Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add lib/db/schema.ts
git commit -m "Add orders table for stop-loss, take-profit, trailing stop"
```

---

## Task 9: Advanced Orders — Server Actions

**Files:**
- Create: `lib/actions/orders.ts`

**Step 1: Implement order CRUD actions**

```ts
// lib/actions/orders.ts
'use server'

import { db } from '@/lib/db'
import { orders, futuresPositions, users, tradeHistory } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculatePnl } from '@/lib/engine/futures'
import { validateOrderPrice } from '@/lib/engine/orders'
import type { PositionSide } from '@/lib/engine/types'
import { z } from 'zod'

const createOrderSchema = z.object({
  positionId: z.string().uuid(),
  type: z.enum(['STOP_LOSS', 'TAKE_PROFIT', 'TRAILING_STOP']),
  triggerPrice: z.number().positive(),
  trailingDistance: z.number().positive().optional(),
})

export async function createOrder(data: {
  positionId: string
  type: 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
  triggerPrice: number
  trailingDistance?: number
}) {
  const validated = createOrderSchema.parse(data)
  const user = await getOrCreateUser()

  // Verify position exists and belongs to user
  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.id, validated.positionId),
        eq(futuresPositions.userId, user.id),
        eq(futuresPositions.status, 'OPEN')
      )
    )

  if (!position) throw new Error('Position not found')

  // Validate trigger price
  if (validated.type !== 'TRAILING_STOP') {
    const orderType = validated.type as 'STOP_LOSS' | 'TAKE_PROFIT'
    const isValid = validateOrderPrice(
      validated.triggerPrice,
      parseFloat(position.entryPrice),
      position.side as PositionSide,
      orderType
    )
    if (!isValid) {
      throw new Error(
        validated.type === 'STOP_LOSS'
          ? `Stop-loss must be ${position.side === 'LONG' ? 'below' : 'above'} entry price`
          : `Take-profit must be ${position.side === 'LONG' ? 'above' : 'below'} entry price`
      )
    }
  }

  const [order] = await db
    .insert(orders)
    .values({
      userId: user.id,
      positionId: validated.positionId,
      type: validated.type,
      triggerPrice: validated.triggerPrice.toString(),
      trailingDistance: validated.trailingDistance?.toString() ?? null,
    })
    .returning()

  return order
}

export async function executeOrder(orderId: string, executePrice: number) {
  const user = await getOrCreateUser()

  const [order] = await db
    .select()
    .from(orders)
    .where(
      and(eq(orders.id, orderId), eq(orders.userId, user.id), eq(orders.status, 'PENDING'))
    )

  if (!order) throw new Error('Order not found')

  // Get the position
  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(eq(futuresPositions.id, order.positionId), eq(futuresPositions.status, 'OPEN'))
    )

  if (!position) {
    // Position already closed — cancel the order
    await db.update(orders).set({ status: 'CANCELLED' }).where(eq(orders.id, orderId))
    return null
  }

  // Calculate PnL
  const pnl = calculatePnl(
    parseFloat(position.entryPrice),
    executePrice,
    parseFloat(position.quantity),
    position.side as PositionSide
  )

  const margin = parseFloat(position.margin)
  const returnAmount = Math.max(margin + pnl, 0)

  // Close position
  await db
    .update(futuresPositions)
    .set({ status: 'CLOSED', closedAt: new Date() })
    .where(eq(futuresPositions.id, position.id))

  // Return margin + PnL to balance
  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric + ${returnAmount.toString()}::numeric` })
    .where(eq(users.id, user.id))

  // Mark order as triggered
  await db
    .update(orders)
    .set({ status: 'TRIGGERED', triggeredAt: new Date() })
    .where(eq(orders.id, orderId))

  // Cancel any other pending orders for this position
  await db
    .update(orders)
    .set({ status: 'CANCELLED' })
    .where(
      and(
        eq(orders.positionId, position.id),
        eq(orders.status, 'PENDING')
      )
    )

  // Record in trade history
  const action = order.type === 'TAKE_PROFIT' ? 'TAKE_PROFIT' : 'STOP_LOSS'
  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'FUTURES',
    action,
    price: executePrice.toString(),
    quantity: position.quantity,
    pnl: pnl.toString(),
  })

  return pnl
}

export async function cancelOrder(orderId: string) {
  const user = await getOrCreateUser()

  await db
    .update(orders)
    .set({ status: 'CANCELLED' })
    .where(and(eq(orders.id, orderId), eq(orders.userId, user.id)))
}

export async function getOrdersForPosition(positionId: string) {
  const user = await getOrCreateUser()

  return db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.positionId, positionId),
        eq(orders.userId, user.id),
        eq(orders.status, 'PENDING')
      )
    )
}
```

**Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add lib/actions/orders.ts
git commit -m "Add order CRUD server actions with position close logic"
```

---

## Task 10: Advanced Orders — UI (Order Monitor Hook + Positions Table)

**Files:**
- Create: `lib/hooks/use-order-monitor.ts`
- Modify: `components/trading/positions-table.tsx` (add SL/TP columns + order form)
- Modify: `components/trading/futures-trading.tsx` (integrate order monitor)

**Step 1: Create the order monitor hook**

`lib/hooks/use-order-monitor.ts`:
- Subscribes to `usePriceStore` prices
- Takes an array of orders (from server) and position sides
- On each price tick, iterates pending orders and calls `shouldTriggerOrder`
- For trailing stops, calls `updateTrailingStop` and updates the local trigger
- When an order triggers, calls `executeOrder` server action and invokes `router.refresh()`
- Debounce or throttle evaluation to every 500ms (not every tick)

**Step 2: Extend PositionsTable**

In `components/trading/positions-table.tsx`:
- Add "SL" and "TP" columns to the header (after Liq. Price)
- For each position row, show the pending SL/TP trigger prices (or "--" if none)
- Add an "Add SL/TP" button (or edit icon) that expands an inline form
- The inline form has: stop-loss price input, take-profit price input, optional trailing stop checkbox with distance input
- Validate prices client-side using `validateOrderPrice` before submitting
- On submit, call `createOrder` server action

**Step 3: Integrate order monitor**

In `components/trading/futures-trading.tsx`:
- Fetch orders along with positions (add a new server action call in the page)
- Or: fetch orders client-side in the component via a useEffect
- Pass orders to `useOrderMonitor` hook
- The hook runs alongside existing price feed

**Step 4: Modify futures page to pass orders**

In `app/(app)/trade/futures/page.tsx`:
- Add `getOpenOrders()` call (or modify `getOpenPositions` to include orders)
- Pass orders to `FuturesTrading` component

**Step 5: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add lib/hooks/use-order-monitor.ts components/trading/positions-table.tsx components/trading/futures-trading.tsx app/\(app\)/trade/futures/page.tsx
git commit -m "Add order monitor hook and SL/TP UI to positions table"
```

---

## Task 11: Multi-Leg Strategies — Engine

**Files:**
- Create: `lib/engine/strategies.ts`
- Create: `lib/engine/__tests__/strategies.test.ts`

**Step 1: Write failing tests**

```ts
// lib/engine/__tests__/strategies.test.ts
import { describe, it, expect } from 'vitest'
import {
  STRATEGY_TEMPLATES,
  generateStrategyLegs,
  calculateStrategyPayoff,
  calculateStrategyGreeks,
  calculateStrategyMetrics,
} from '../strategies'

describe('STRATEGY_TEMPLATES', () => {
  it('defines all 5 strategy types', () => {
    expect(STRATEGY_TEMPLATES).toHaveProperty('BULL_CALL_SPREAD')
    expect(STRATEGY_TEMPLATES).toHaveProperty('BEAR_PUT_SPREAD')
    expect(STRATEGY_TEMPLATES).toHaveProperty('STRADDLE')
    expect(STRATEGY_TEMPLATES).toHaveProperty('STRANGLE')
    expect(STRATEGY_TEMPLATES).toHaveProperty('IRON_CONDOR')
  })

  it('BULL_CALL_SPREAD has 2 legs', () => {
    expect(STRATEGY_TEMPLATES.BULL_CALL_SPREAD.legs).toHaveLength(2)
  })

  it('IRON_CONDOR has 4 legs', () => {
    expect(STRATEGY_TEMPLATES.IRON_CONDOR.legs).toHaveLength(4)
  })
})

describe('generateStrategyLegs', () => {
  it('generates bull call spread legs with correct types', () => {
    const legs = generateStrategyLegs('BULL_CALL_SPREAD', 50000, 0.6, 0.05, 30)
    expect(legs).toHaveLength(2)
    expect(legs[0].optionType).toBe('CALL')
    expect(legs[0].side).toBe('BUY')
    expect(legs[1].optionType).toBe('CALL')
    expect(legs[1].side).toBe('SELL')
    expect(legs[0].strike).toBeLessThan(legs[1].strike)
  })

  it('generates straddle with same strike', () => {
    const legs = generateStrategyLegs('STRADDLE', 50000, 0.6, 0.05, 30)
    expect(legs).toHaveLength(2)
    expect(legs[0].strike).toBe(legs[1].strike)
    expect(legs[0].optionType).toBe('CALL')
    expect(legs[1].optionType).toBe('PUT')
  })
})

describe('calculateStrategyPayoff', () => {
  it('returns an array of {price, payoff} points', () => {
    const legs = generateStrategyLegs('BULL_CALL_SPREAD', 50000, 0.6, 0.05, 30)
    const payoff = calculateStrategyPayoff(legs, 50000)
    expect(payoff.length).toBeGreaterThan(0)
    expect(payoff[0]).toHaveProperty('price')
    expect(payoff[0]).toHaveProperty('payoff')
  })

  it('bull call spread has limited profit and limited loss', () => {
    const legs = generateStrategyLegs('BULL_CALL_SPREAD', 50000, 0.6, 0.05, 30)
    const payoff = calculateStrategyPayoff(legs, 50000)
    const payoffs = payoff.map((p) => p.payoff)
    const maxPayoff = Math.max(...payoffs)
    const minPayoff = Math.min(...payoffs)
    // Both should be finite (not unlimited)
    expect(maxPayoff).toBeLessThan(Infinity)
    expect(minPayoff).toBeGreaterThan(-Infinity)
  })
})

describe('calculateStrategyMetrics', () => {
  it('returns max profit, max loss, and breakevens', () => {
    const legs = generateStrategyLegs('BULL_CALL_SPREAD', 50000, 0.6, 0.05, 30)
    const metrics = calculateStrategyMetrics(legs, 50000)
    expect(metrics).toHaveProperty('maxProfit')
    expect(metrics).toHaveProperty('maxLoss')
    expect(metrics).toHaveProperty('breakevens')
    expect(metrics.maxProfit).toBeGreaterThan(0)
    expect(metrics.maxLoss).toBeLessThan(0)
  })
})

describe('calculateStrategyGreeks', () => {
  it('returns aggregated greeks', () => {
    const legs = generateStrategyLegs('STRADDLE', 50000, 0.6, 0.05, 30)
    const greeks = calculateStrategyGreeks(legs)
    expect(greeks).toHaveProperty('delta')
    expect(greeks).toHaveProperty('gamma')
    expect(greeks).toHaveProperty('theta')
    expect(greeks).toHaveProperty('vega')
  })

  it('straddle has near-zero delta at ATM', () => {
    const legs = generateStrategyLegs('STRADDLE', 50000, 0.6, 0.05, 30)
    const greeks = calculateStrategyGreeks(legs)
    // ATM straddle: call delta ~0.5, put delta ~-0.5 → net ~0
    expect(Math.abs(greeks.delta)).toBeLessThan(0.15)
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `bun run test`
Expected: FAIL

**Step 3: Implement strategies engine**

```ts
// lib/engine/strategies.ts
import { blackScholesCall, blackScholesPut, calculateAllGreeks } from './options'
import type { OptionType, OptionSide, Greeks } from './types'

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
  strikeOffset: number // multiplier of spotPrice (e.g., -0.05 = 5% below spot)
}

interface StrategyTemplate {
  name: string
  description: string
  legs: LegTemplate[]
}

export const STRATEGY_TEMPLATES: Record<StrategyType, StrategyTemplate> = {
  BULL_CALL_SPREAD: {
    name: 'Bull Call Spread',
    description: 'Buy lower-strike call, sell higher-strike call. Limited profit/loss.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: -0.03 },
      { optionType: 'CALL', side: 'SELL', strikeOffset: 0.03 },
    ],
  },
  BEAR_PUT_SPREAD: {
    name: 'Bear Put Spread',
    description: 'Buy higher-strike put, sell lower-strike put. Profits from decline.',
    legs: [
      { optionType: 'PUT', side: 'BUY', strikeOffset: 0.03 },
      { optionType: 'PUT', side: 'SELL', strikeOffset: -0.03 },
    ],
  },
  STRADDLE: {
    name: 'Straddle',
    description: 'Buy call and put at same strike. Profits from large moves.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0 },
      { optionType: 'PUT', side: 'BUY', strikeOffset: 0 },
    ],
  },
  STRANGLE: {
    name: 'Strangle',
    description: 'Buy OTM call and OTM put. Cheaper than straddle, needs bigger move.',
    legs: [
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0.05 },
      { optionType: 'PUT', side: 'BUY', strikeOffset: -0.05 },
    ],
  },
  IRON_CONDOR: {
    name: 'Iron Condor',
    description: 'Sell OTM strangle, buy further OTM protection. Profits from range-bound.',
    legs: [
      { optionType: 'PUT', side: 'BUY', strikeOffset: -0.08 },
      { optionType: 'PUT', side: 'SELL', strikeOffset: -0.04 },
      { optionType: 'CALL', side: 'SELL', strikeOffset: 0.04 },
      { optionType: 'CALL', side: 'BUY', strikeOffset: 0.08 },
    ],
  },
}

function roundStrike(price: number, symbol?: string): number {
  if (price > 10000) return Math.round(price / 1000) * 1000
  if (price > 1000) return Math.round(price / 100) * 100
  return Math.round(price / 10) * 10
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

  return template.legs.map((legTemplate) => {
    const strike = roundStrike(spotPrice * (1 + legTemplate.strikeOffset))
    const premium =
      legTemplate.optionType === 'CALL'
        ? blackScholesCall(spotPrice, strike, timeToExpiry, riskFreeRate, volatility)
        : blackScholesPut(spotPrice, strike, timeToExpiry, riskFreeRate, volatility)
    const greeks = calculateAllGreeks(
      spotPrice,
      strike,
      timeToExpiry,
      riskFreeRate,
      volatility,
      legTemplate.optionType
    )

    return {
      optionType: legTemplate.optionType,
      side: legTemplate.side,
      strike,
      premium,
      quantity: 1,
      greeks,
    }
  })
}

function legPayoffAtExpiry(
  price: number,
  leg: StrategyLeg
): number {
  let intrinsic: number
  if (leg.optionType === 'CALL') {
    intrinsic = Math.max(price - leg.strike, 0)
  } else {
    intrinsic = Math.max(leg.strike - price, 0)
  }

  const multiplier = leg.side === 'BUY' ? 1 : -1
  return (intrinsic - leg.premium) * multiplier * leg.quantity
}

export function calculateStrategyPayoff(
  legs: StrategyLeg[],
  spotPrice: number
): { price: number; payoff: number }[] {
  const range = spotPrice * 0.3
  const min = Math.max(spotPrice - range, 0)
  const max = spotPrice + range
  const steps = 100
  const points: { price: number; payoff: number }[] = []

  for (let i = 0; i <= steps; i++) {
    const price = min + (max - min) * (i / steps)
    const payoff = legs.reduce((sum, leg) => sum + legPayoffAtExpiry(price, leg), 0)
    points.push({ price, payoff })
  }

  return points
}

export function calculateStrategyGreeks(legs: StrategyLeg[]): Greeks {
  return legs.reduce(
    (acc, leg) => {
      const multiplier = leg.side === 'BUY' ? 1 : -1
      return {
        delta: acc.delta + leg.greeks.delta * multiplier * leg.quantity,
        gamma: acc.gamma + leg.greeks.gamma * multiplier * leg.quantity,
        theta: acc.theta + leg.greeks.theta * multiplier * leg.quantity,
        vega: acc.vega + leg.greeks.vega * multiplier * leg.quantity,
      }
    },
    { delta: 0, gamma: 0, theta: 0, vega: 0 }
  )
}

export function calculateStrategyMetrics(
  legs: StrategyLeg[],
  spotPrice: number
): { maxProfit: number; maxLoss: number; breakevens: number[]; netPremium: number } {
  const payoff = calculateStrategyPayoff(legs, spotPrice)
  const payoffs = payoff.map((p) => p.payoff)
  const maxProfit = Math.max(...payoffs)
  const maxLoss = Math.min(...payoffs)

  // Find breakeven points (where payoff crosses zero)
  const breakevens: number[] = []
  for (let i = 1; i < payoff.length; i++) {
    if (
      (payoff[i - 1].payoff <= 0 && payoff[i].payoff > 0) ||
      (payoff[i - 1].payoff >= 0 && payoff[i].payoff < 0)
    ) {
      // Linear interpolation
      const x0 = payoff[i - 1].price
      const x1 = payoff[i].price
      const y0 = payoff[i - 1].payoff
      const y1 = payoff[i].payoff
      const be = x0 + (0 - y0) * ((x1 - x0) / (y1 - y0))
      breakevens.push(Math.round(be))
    }
  }

  // Net premium: positive = net credit, negative = net debit
  const netPremium = legs.reduce((sum, leg) => {
    const multiplier = leg.side === 'SELL' ? 1 : -1
    return sum + leg.premium * multiplier * leg.quantity
  }, 0)

  return { maxProfit, maxLoss, breakevens, netPremium }
}
```

**Step 4: Run tests**

Run: `bun run test`
Expected: All pass

**Step 5: Commit**

```bash
git add lib/engine/strategies.ts lib/engine/__tests__/strategies.test.ts
git commit -m "Add multi-leg option strategy engine with templates and payoff calculation"
```

---

## Task 12: Multi-Leg Strategies — Schema

**Files:**
- Modify: `lib/db/schema.ts` (add optionStrategies table + enum)

**Step 1: Add to schema**

```ts
export const strategyTypeEnum = pgEnum('strategy_type', [
  'BULL_CALL_SPREAD',
  'BEAR_PUT_SPREAD',
  'STRADDLE',
  'STRANGLE',
  'IRON_CONDOR',
])
export const strategyStatusEnum = pgEnum('strategy_status', ['OPEN', 'CLOSED', 'EXPIRED'])

export const optionStrategies = pgTable('option_strategies', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  symbol: text('symbol').notNull(),
  strategyType: strategyTypeEnum('strategy_type').notNull(),
  legs: jsonb('legs').$type<{
    optionPositionId: string
    optionType: 'CALL' | 'PUT'
    side: 'BUY' | 'SELL'
    strike: number
    premium: number
    quantity: number
  }[]>().notNull(),
  totalPremium: decimal('total_premium', { precision: 20, scale: 8 }).notNull(),
  maxProfit: decimal('max_profit', { precision: 20, scale: 8 }),
  maxLoss: decimal('max_loss', { precision: 20, scale: 8 }),
  status: strategyStatusEnum('status').notNull().default('OPEN'),
  openedAt: timestamp('opened_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
})
```

**Step 2: Push schema**

Run: `bunx drizzle-kit push`

**Step 3: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add lib/db/schema.ts
git commit -m "Add option strategies table with JSONB legs"
```

---

## Task 13: Multi-Leg Strategies — Server Actions

**Files:**
- Create: `lib/actions/strategies.ts`

**Step 1: Implement strategy actions**

Create `lib/actions/strategies.ts` with:

- `openStrategy(data)`:
  - Accepts: `{ symbol, strategyType, legs: StrategyLeg[], expirationDate, metrics }`
  - Validates all legs
  - Calculates net premium (debit or credit)
  - Checks balance for debit strategies
  - Opens each leg as an individual `optionsPositions` row (using `openOptionsPosition` pattern but in a loop)
  - Creates the `optionStrategies` row linking all leg position IDs
  - Records a single OPEN trade history entry
  - Returns the strategy

- `closeStrategy(strategyId, closePrices: Record<string, number>)`:
  - Closes each leg position individually
  - Calculates combined PnL
  - Updates strategy status to CLOSED
  - Records CLOSE trade history

- `getOpenStrategies()`:
  - Returns all OPEN strategies for the current user

Use the same patterns as `lib/actions/trade.ts` for balance updates and trade history recording.

**Step 2: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add lib/actions/strategies.ts
git commit -m "Add strategy CRUD server actions with atomic multi-leg execution"
```

---

## Task 14: Multi-Leg Strategies — Strategy Builder UI

**Files:**
- Create: `components/options/strategy-builder.tsx`
- Modify: `components/options/options-trading.tsx` (add Single/Strategy toggle)
- Modify: `app/(app)/trade/options/page.tsx` (pass strategies data)

**Step 1: Create the StrategyBuilder component**

Use the `/frontend-design` skill. The component should include:

1. **Mode toggle** at the top of the options page: "Single" | "Strategy" buttons (same style as BTC/ETH selector)

2. **Strategy selector** — 5 horizontal cards for each strategy type. Each card shows: name, 1-line description, and a tiny SVG of the payoff shape. Selected card gets accent glow.

3. **Parameter form** — based on selected type:
   - All types: expiry dropdown (reuse existing expirations)
   - Spreads: lower strike + upper strike (auto-calculated from spot)
   - Straddle: single strike (ATM default)
   - Strangle: OTM call strike + OTM put strike
   - Iron condor: 4 strike inputs with auto-fill
   - Quantity input with balance % buttons

4. **Combined payoff diagram** — reuse the `PayoffDiagram` SVG structure but feed it `calculateStrategyPayoff` data instead of single-option data

5. **Strategy summary panel** — shows: net premium, max profit, max loss, breakeven points, combined Greeks

6. **Execute button** — calls `openStrategy` server action, refreshes page

7. **Open strategies table** — below the builder, similar to OptionsPositionsTable but for strategies. Shows: strategy type, legs summary, net premium, current PnL, close button.

**Step 2: Wire up the toggle in options-trading.tsx**

Add state: `const [mode, setMode] = useState<'single' | 'strategy'>('single')`

Render either the existing chain+order layout (single mode) or the StrategyBuilder (strategy mode).

**Step 3: Pass strategies data from the page**

In `app/(app)/trade/options/page.tsx`, add `getOpenStrategies()` call and pass to OptionsTrading.

**Step 4: Verify build**

Run: `bun run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add components/options/strategy-builder.tsx components/options/options-trading.tsx app/\(app\)/trade/options/page.tsx
git commit -m "Add strategy builder UI with preset templates and combined payoff"
```

---

## Task 15: Final Integration + Build Verification

**Files:**
- All previously modified files

**Step 1: Run full test suite**

Run: `bun run test`
Expected: All engine tests pass

**Step 2: Run production build**

Run: `bun run build`
Expected: Build succeeds with no type errors

**Step 3: Run linter**

Run: `bun run lint`
Expected: No errors (warnings OK)

**Step 4: Final commit if any fixups needed**

```bash
git add -A
git commit -m "Fix lint and type issues from feature integration"
```
