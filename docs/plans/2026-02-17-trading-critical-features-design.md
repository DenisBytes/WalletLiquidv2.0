# Trading-Critical Features Design

**Date:** 2026-02-17
**Scope:** Portfolio Analytics, Funding Rates, Advanced Orders, Multi-Leg Strategies
**Approach:** Vertical slices — each feature built end-to-end before starting the next

## Implementation Order

1. Portfolio Analytics (no schema changes, pure computation)
2. Funding Rates (1 new table, Binance API fetch)
3. Advanced Orders (1 new table, client-side trigger monitoring)
4. Multi-Leg Option Strategies (1 new table, strategy templates, combined payoff UI)

---

## 1. Portfolio Analytics

### Engine — `lib/engine/analytics.ts`

Pure functions operating on trade history arrays:

- `calculateWinRate(trades)` — winning CLOSE/LIQUIDATION trades / total
- `calculateProfitFactor(trades)` — gross profit / gross loss
- `calculateMaxDrawdown(trades)` — peak-to-trough decline over sorted equity curve
- `calculateSharpeRatio(trades, riskFreeRate)` — annualized (mean excess return / std dev)
- `calculateAnalytics(trades)` — runs all four, returns `Analytics` object

### Server Action — `lib/actions/analytics.ts`

- `getPortfolioAnalytics()` — fetches all closed trades for current user, runs `calculateAnalytics`, returns results. Computed on-demand.

### UI — Dashboard expansion

New `AnalyticsCards` component in the dashboard grid (below portfolio card row). Four glass cards:

| Card | Value | Color Logic |
|------|-------|-------------|
| Win Rate | percentage | green if > 50%, red if < 50% |
| Profit Factor | ratio | green if > 1, red if < 1 |
| Max Drawdown | percentage | always red (it's a loss metric) |
| Sharpe Ratio | number | green if > 1, yellow if 0-1, red if < 0 |

No new database tables.

---

## 2. Funding Rates

### Schema — `fundingRateHistory` table

```
id            uuid PK
userId        text FK -> users
positionId    uuid FK -> futuresPositions
symbol        text
fundingRate   decimal    -- rate from Binance (e.g., 0.0001 = 0.01%)
payment       decimal    -- actual amount: positionSize * markPrice * rate
appliedAt     timestamp
```

### Engine — `lib/engine/funding.ts`

- `calculateFundingPayment(positionSize, markPrice, fundingRate, side)` — longs pay positive rates, receive negative. Shorts reverse.

### Data Source

Binance public endpoint: `GET https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT`
Returns `lastFundingRate`. No API key needed. Fetched server-side.

### Server Actions — `lib/actions/funding.ts`

- `applyFundingRates()` — for each symbol with open positions: fetch current rate from Binance, calculate payment per position, update balance, insert into history. Checks if 8h+ since last application per position.
- `getFundingHistory(positionId?)` — returns funding rate history.

### Trigger Mechanism

Lazy evaluation on page load. When user opens the futures page, client checks last application time. If 8h+ elapsed, calls `applyFundingRates()`. Acceptable for paper trading (no always-on worker).

### UI Changes

- Funding rate badge next to spot price on futures page (e.g., "Funding: 0.01%")
- Funding total column in positions table (cumulative funding paid/received)
- "FUNDING" action type in dashboard recent trades timeline

### Type Extension

Add `FUNDING` to `TradeAction` type.

---

## 3. Advanced Order Types

### Schema — `orders` table

```
id                uuid PK
userId            text FK -> users
positionId        uuid FK -> futuresPositions
type              enum: STOP_LOSS | TAKE_PROFIT | TRAILING_STOP
triggerPrice      decimal       -- price that fires the order
trailingDistance  decimal NULL  -- for trailing stops: distance from peak/trough
reduceOnly        boolean DEFAULT true
status            enum: PENDING | TRIGGERED | CANCELLED
createdAt         timestamp
triggeredAt       timestamp NULL
```

### Engine — `lib/engine/orders.ts`

- `shouldTriggerOrder(order, currentPrice, side)` — checks if price crossed threshold
  - STOP_LOSS: long triggers when price <= trigger; short when price >= trigger
  - TAKE_PROFIT: long triggers when price >= trigger; short when price <= trigger
  - TRAILING_STOP: same as STOP_LOSS but trigger moves
- `updateTrailingStop(order, currentPrice, side)` — adjusts trigger as price moves favorably
- `validateOrderPrice(triggerPrice, entryPrice, side, type)` — ensures SL below entry for longs, TP above entry for longs, etc.

### Server Actions — `lib/actions/orders.ts`

- `createOrder(data)` — validates and creates pending order
- `executeOrder(orderId, executePrice)` — closes position, marks TRIGGERED, logs to trade history
- `cancelOrder(orderId)` — marks CANCELLED
- `getOrdersForPosition(positionId)` — returns pending orders

### Client-Side Trigger — `useOrderMonitor` hook

Subscribes to price updates for symbols with pending orders. On each tick:
1. Check all pending orders via `shouldTriggerOrder`
2. For trailing stops, call `updateTrailingStop`
3. When triggered, call `executeOrder` server action

### UI Changes

- **Order attachment form** — from positions table, "Add SL/TP" button opens inline form with trigger price inputs + optional trailing stop toggle
- **Positions table** — new SL/TP columns. Orange for stop-loss, green for take-profit. Edit button.
- **Trade history** — new `STOP_LOSS` and `TAKE_PROFIT` action types

### Type Extension

Add `STOP_LOSS | TAKE_PROFIT` to `TradeAction` type.

---

## 4. Multi-Leg Option Strategies

### Schema — `optionStrategies` table

```
id              uuid PK
userId          text FK -> users
symbol          text
strategyType    enum: BULL_CALL_SPREAD | BEAR_PUT_SPREAD | STRADDLE | STRANGLE | IRON_CONDOR
legs            jsonb     -- [{optionPositionId, optionType, side, strike, premium, quantity}]
totalPremium    decimal   -- net premium paid/received
maxProfit       decimal NULL
maxLoss         decimal NULL
status          enum: OPEN | CLOSED | EXPIRED
openedAt        timestamp
closedAt        timestamp NULL
```

Legs stored as JSONB (not junction table) — always read/written together, small arrays (2-4 items).

### Engine — `lib/engine/strategies.ts`

**Strategy templates:**

| Strategy | Legs |
|----------|------|
| Bull Call Spread | Buy lower-strike call + Sell higher-strike call |
| Bear Put Spread | Buy higher-strike put + Sell lower-strike put |
| Straddle | Buy call + Buy put at same strike |
| Strangle | Buy OTM call + Buy OTM put |
| Iron Condor | Bull put spread + Bear call spread (4 legs) |

**Functions:**
- `STRATEGY_TEMPLATES` — config object defining each strategy's leg structure
- `generateStrategyLegs(type, spotPrice, strikes, expiry, vol, rfr)` — auto-generates legs with smart default strikes
- `calculateStrategyPayoff(legs, priceRange)` — combined payoff curve across all legs
- `calculateStrategyGreeks(legs)` — aggregated delta, gamma, theta, vega
- `calculateStrategyMetrics(legs)` — max profit, max loss, breakeven points

### Server Actions — `lib/actions/strategies.ts`

- `openStrategy(data)` — validates all legs, checks balance, opens each leg as an options position atomically (transaction), creates strategy record, deducts net premium
- `closeStrategy(strategyId, closePrices)` — closes all legs, calculates combined PnL
- `getOpenStrategies()` — returns strategies with legs and current values

### UI — Strategy Builder

New `StrategyBuilder` component on the options page, accessed via toggle: **Single** | **Strategy**.

Components:
1. **Strategy selector** — horizontal cards for 5 types with payoff shape icons
2. **Parameter form** — strike prices, expiry. Auto-fills smart defaults based on spot.
3. **Combined payoff diagram** — reuses `PayoffDiagram` with aggregated data
4. **Combined Greeks** — aggregated across all legs
5. **Execution summary** — net premium, max profit, max loss, breakevens
6. **Execute button** — opens all legs atomically

---

## Shared Changes

### Type System (`lib/engine/types.ts`)

Extend `TradeAction`:
```typescript
type TradeAction = 'OPEN' | 'CLOSE' | 'LIQUIDATION' | 'EXERCISE' | 'STOP_LOSS' | 'TAKE_PROFIT' | 'FUNDING'
```

Add new types:
```typescript
type OrderType = 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
type OrderStatus = 'PENDING' | 'TRIGGERED' | 'CANCELLED'
type StrategyType = 'BULL_CALL_SPREAD' | 'BEAR_PUT_SPREAD' | 'STRADDLE' | 'STRANGLE' | 'IRON_CONDOR'
type StrategyStatus = 'OPEN' | 'CLOSED' | 'EXPIRED'

interface Analytics {
  winRate: number
  profitFactor: number
  maxDrawdown: number
  sharpeRatio: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
}
```

### Sidebar Navigation

No changes needed — analytics lives on existing dashboard, other features live on existing futures/options pages.

### Dashboard Components

Update `RecentTrades` to handle new action types (FUNDING, STOP_LOSS, TAKE_PROFIT) with appropriate colors and labels.
