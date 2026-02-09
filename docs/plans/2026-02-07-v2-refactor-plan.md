# WalletLiquid v2.0 Refactor — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Incrementally refactor WalletLiquid from a Next.js 14 prototype into a production-grade paper trading platform with Next.js 15, Neon Postgres, Auth0, Drizzle ORM, Zustand, MDX courses, and a premium animated UI.

**Architecture:** Route groups `(landing)` and `(app)` with completely separate layouts. Pure TypeScript trading engine in `lib/engine/`, Zustand stores for client state, server actions for all DB mutations, MDX for course content. Client-side Binance WS for real-time prices.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Auth0 v4, Neon Postgres, Drizzle ORM, Zustand 5, GSAP 3 + ScrollTrigger + SplitText, Lenis, next-mdx-remote, TradingView Lightweight Charts, Howler, Zod, bun.

**UI Rule:** Use `/frontend-design` skill for all page and component implementations.

---

## Phase 1: Foundation — Stack Migration

Everything else depends on this. Upgrade the core stack, swap auth, swap DB, establish the new project structure.

---

### Task 1: Upgrade Next.js, React, Tailwind, TypeScript

Upgrade the core framework to latest versions. This breaks the existing app — that's expected, we'll fix forward.

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `next.config.js` → rename to `next.config.ts`
- Delete: `postcss.config.js` (Tailwind v4 doesn't need it)
- Modify: `tailwind.config.ts` → migrate to Tailwind v4 CSS-based config
- Create: `app/globals.css` (new Tailwind v4 entry point)

**Step 1: Update package.json dependencies**

Replace versions:
```json
{
  "next": "^15",
  "react": "^19",
  "react-dom": "^19",
  "tailwindcss": "^4",
  "typescript": "^5.7",
  "@tailwindcss/vite": "^4"
}
```

Remove:
- `autoprefixer`
- `postcss`
- `@tailwindcss/forms` (incompatible with v4)

Dev deps — update:
```json
{
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

**Step 2: Run `bun install`**

**Step 3: Migrate Tailwind v4**

Delete `postcss.config.js`. Replace `tailwind.config.ts` content with a minimal v4-compatible version or remove entirely if using CSS-based config.

New `app/globals.css`:
```css
@import "tailwindcss";
```

**Step 4: Update `next.config.ts`**

Rename `next.config.js` → `next.config.ts`. Minimal config for Cloudflare Pages compatibility.

**Step 5: Update `tsconfig.json`**

Enable strict mode, update module resolution for Next.js 15.

**Step 6: Verify `bun run build` compiles (will have errors — that's OK, just confirm the framework boots)**

**Step 7: Commit**

```
Upgrade to Next.js 15, React 19, Tailwind v4, TS 5.7
```

---

### Task 2: Swap Auth — NextAuth → Auth0

Remove NextAuth and bcrypt. Install and configure Auth0.

**Files:**
- Delete: `auth.ts`
- Delete: `auth.config.ts`
- Modify: `middleware.ts`
- Create: `app/api/auth/[...auth0]/route.ts`
- Modify: `package.json`

**Step 1: Remove NextAuth dependencies**

```bash
bun remove next-auth bcrypt @types/bcrypt
```

**Step 2: Install Auth0**

```bash
bun add @auth0/nextjs-auth0
```

**Step 3: Create Auth0 route handler**

Create `app/api/auth/[...auth0]/route.ts`:
```ts
import { handleAuth } from '@auth0/nextjs-auth0';
export const GET = handleAuth();
```

**Step 4: Update middleware**

Replace NextAuth middleware with Auth0 middleware. Protect `(app)` routes, leave `(landing)` public.

**Step 5: Delete old auth files**

Delete `auth.ts` and `auth.config.ts`.

**Step 6: Commit**

```
Swap NextAuth for Auth0
```

---

### Task 3: Swap DB — Vercel Postgres → Neon + Drizzle

**Files:**
- Create: `lib/db/schema.ts`
- Create: `lib/db/index.ts`
- Modify: `package.json`
- Create: `drizzle.config.ts`

**Step 1: Remove Vercel Postgres**

```bash
bun remove @vercel/postgres
```

**Step 2: Install Neon + Drizzle**

```bash
bun add drizzle-orm @neondatabase/serverless
bun add -d drizzle-kit
```

**Step 3: Create Drizzle config**

Create `drizzle.config.ts` pointing to `DATABASE_URL` env var.

**Step 4: Create schema**

Create `lib/db/schema.ts` with all tables from the design doc:
- `users` (id from Auth0 sub, balance, createdAt)
- `futuresPositions` (symbol, side, entryPrice, leverage, liquidationPrice, margin, status, etc.)
- `optionsPositions` (symbol, optionType, side, strikePrice, premium, greeks as jsonb, etc.)
- `tradeHistory` (positionId, type, action, price, pnl, etc.)
- `courseProgress` (userId, courseId, chapterSlug, completedAt)

**Step 5: Create DB connection**

Create `lib/db/index.ts` using Neon serverless driver + Drizzle.

**Step 6: Run `drizzle-kit push` to sync schema to Neon**

**Step 7: Commit**

```
Add Neon Postgres with Drizzle schema
```

---

### Task 4: Install remaining dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install production deps**

```bash
bun add @base-ui-components/react zustand next-mdx-remote lightweight-charts
```

**Step 2: Remove unused deps**

```bash
bun remove @vercel/speed-insights next-themes @heroicons/react
```

**Step 3: Verify `bun install` clean**

**Step 4: Commit**

```
Update dependencies for v2 stack
```

---

### Task 5: Establish new project structure

Create the directory skeleton. Move nothing yet — just create the new folders.

**Files:**
- Create directories:
  - `app/(landing)/`
  - `app/(app)/dashboard/`
  - `app/(app)/trade/futures/`
  - `app/(app)/trade/options/`
  - `app/(app)/history/`
  - `app/(app)/learn/options/[slug]/`
  - `app/(app)/learn/futures/[slug]/`
  - `lib/engine/`
  - `lib/stores/`
  - `lib/actions/`
  - `lib/utils/`
  - `content/courses/options/`
  - `content/courses/futures/`
  - `components/landing/`
  - `components/trading/`
  - `components/options/`
  - `components/courses/`
  - `components/dashboard/`
  - `components/ui/`

**Step 1: Create all directories with placeholder `.gitkeep` or initial files**

**Step 2: Create `lib/utils/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install `tailwind-merge`:
```bash
bun add tailwind-merge
```

**Step 3: Commit**

```
Establish v2 project structure
```

---

## Phase 2: Core Engine — Pure TypeScript, No UI

Build the trading engine and state management layer before any UI work.

---

### Task 6: Futures trading engine

Pure TypeScript, no React. All calculations that the futures trading UI needs.

**Files:**
- Create: `lib/engine/types.ts`
- Create: `lib/engine/futures.ts`

**Step 1: Define shared types in `lib/engine/types.ts`**

All types for positions, orders, sides (LONG/SHORT), status (OPEN/CLOSED/LIQUIDATED), etc.

**Step 2: Implement `lib/engine/futures.ts`**

Functions:
- `calculateLiquidationPrice(entryPrice, leverage, side, maintenanceMarginRate)` → number
- `calculatePnl(entryPrice, markPrice, quantity, side)` → number
- `calculateRoe(pnl, margin)` → number
- `calculateMargin(quantity, entryPrice, leverage)` → number
- `isLiquidated(markPrice, liquidationPrice, side)` → boolean

All pure functions, no side effects.

**Step 3: Commit**

```
Add futures trading engine
```

---

### Task 7: Options pricing engine

Black-Scholes + Greeks. Pure TypeScript.

**Files:**
- Create: `lib/engine/options.ts`

**Step 1: Implement `lib/engine/options.ts`**

Functions:
- `blackScholesCall(spot, strike, timeToExpiry, riskFreeRate, volatility)` → number
- `blackScholesPut(spot, strike, timeToExpiry, riskFreeRate, volatility)` → number
- `calculateDelta(spot, strike, timeToExpiry, riskFreeRate, volatility, optionType)` → number
- `calculateGamma(...)` → number
- `calculateTheta(...)` → number
- `calculateVega(...)` → number
- `calculateImpliedVolatility(historicalPrices[])` → number
- Helper: `normalCDF(x)` → number (standard normal cumulative distribution)

All pure functions.

**Step 2: Commit**

```
Add Black-Scholes options pricing engine
```

---

### Task 8: Zustand stores

Client-side state management for prices, trading, and UI.

**Files:**
- Create: `lib/stores/price-store.ts`
- Create: `lib/stores/trading-store.ts`
- Create: `lib/stores/ui-store.ts`

**Step 1: Price store**

Manages Binance WebSocket connection and live prices.
- State: `prices` map (symbol → price), `connected` boolean
- Actions: `connect(symbols[])`, `disconnect()`, `subscribe(symbol)`, `unsubscribe(symbol)`
- Handles WS reconnection logic

**Step 2: Trading store**

Manages open positions, balance, and order state.
- State: `balance`, `futuresPositions[]`, `optionsPositions[]`, `isLoading`
- Actions: `openFuturesPosition(...)`, `closeFuturesPosition(...)`, `openOptionsPosition(...)`, `closeOptionsPosition(...)`, `refreshPositions()`
- Liquidation middleware: watches price store, checks positions against liquidation prices

**Step 3: UI store**

- State: `sidebarOpen`, `activeModal`, `toasts[]`
- Actions: `toggleSidebar()`, `openModal(id)`, `closeModal()`, `addToast(...)`, `removeToast(id)`

**Step 4: Commit**

```
Add Zustand stores for prices, trading, and UI
```

---

### Task 9: Server actions

All database mutations and queries.

**Files:**
- Create: `lib/actions/trade.ts`
- Create: `lib/actions/history.ts`
- Create: `lib/actions/progress.ts`
- Create: `lib/actions/user.ts`

**Step 1: `lib/actions/user.ts`**

- `getOrCreateUser()` — reads Auth0 session, upserts user in DB, returns user
- `getBalance()` — returns current balance

**Step 2: `lib/actions/trade.ts`**

- `openFuturesPosition(data)` — validate with Zod, calculate margin/liquidation, insert position, deduct balance, record in trade_history
- `closeFuturesPosition(positionId, closePrice)` — calculate PnL, update position status, add balance, record in trade_history
- `liquidatePosition(positionId, markPrice)` — close as LIQUIDATED, record loss
- `openOptionsPosition(data)` — validate, deduct premium from balance, insert position
- `closeOptionsPosition(positionId, closePrice)` — calculate PnL, update status

**Step 3: `lib/actions/history.ts`**

- `getTradeHistory(filters?)` — query trade_history with optional type/date/symbol filters
- `getOpenPositions()` — query all OPEN futures + options positions

**Step 4: `lib/actions/progress.ts`**

- `markChapterComplete(courseId, chapterSlug)` — upsert course_progress
- `getCourseProgress(courseId)` — return completed chapters

**Step 5: Commit**

```
Add server actions for trading, history, and progress
```

---

## Phase 3: Layouts & Navigation

Set up the app shell before building individual pages.

---

### Task 10: Root layout + fonts + providers

**Files:**
- Rewrite: `app/layout.tsx`
- Rewrite: `app/globals.css`

**Step 1: Root layout**

Set up Inter + JetBrains Mono fonts. Wrap with Auth0 `UserProvider` and Zustand providers if needed. Import `globals.css`.

**Step 2: `globals.css`**

Tailwind v4 import + CSS custom properties for the design system:
- Color tokens (charcoal base, accent gradient, success/danger)
- Glass card utilities
- Font assignments

Replace the 752-line monster with a clean, minimal file.

**Step 3: Commit**

```
Set up root layout with fonts and design tokens
```

---

### Task 11: Landing layout + page shell

**Files:**
- Create: `app/(landing)/layout.tsx`
- Create: `app/(landing)/page.tsx`

**Step 1: Landing layout**

Minimal — no sidebar, no navbar. Just children. This is the immersive canvas.

**Step 2: Landing page shell**

Create the scroll container with Lenis smooth scroll. Placeholder sections for Hero, Features, How It Works, CTA. We'll build these out in Phase 5.

**Step 3: Commit**

```
Add landing page layout and scroll shell
```

---

### Task 12: App layout — sidebar + topbar

**Files:**
- Create: `app/(app)/layout.tsx`
- Create: `components/ui/sidebar.tsx`
- Create: `components/ui/topbar.tsx`

Use `/frontend-design` skill for implementation.

**Step 1: App layout**

Auth-guarded layout with sidebar navigation and topbar. Premium dark fintech aesthetic.

Sidebar links:
- Dashboard (`/dashboard`)
- Futures Trading (`/trade/futures`)
- Options Trading (`/trade/options`)
- Trade History (`/history`)
- Learn Options (`/learn/options`)
- Learn Futures (`/learn/futures`)

Topbar: user avatar (from Auth0), balance display, logout.

**Step 2: Commit**

```
Add app layout with sidebar and topbar
```

---

## Phase 4: Core Pages

Build each page using `/frontend-design` skill. Each task is one page.

---

### Task 13: Dashboard page

**Files:**
- Create: `app/(app)/dashboard/page.tsx`
- Create: `components/dashboard/portfolio-card.tsx`
- Create: `components/dashboard/positions-list.tsx`
- Create: `components/dashboard/recent-trades.tsx`
- Create: `components/dashboard/allocation-chart.tsx`

Use `/frontend-design` skill.

**Step 1: Server component**

Fetch user balance, open positions, recent trades via server actions.

**Step 2: Client components**

- Portfolio card: animated value counter with sparkline (GSAP counter, lightweight-charts sparkline)
- Positions list: glass cards with live PnL (subscribes to price store)
- Recent trades: compact timeline
- Allocation chart: donut/pie chart showing position distribution

**Step 3: Commit**

```
Add dashboard page
```

---

### Task 14: Futures trading page

**Files:**
- Create: `app/(app)/trade/futures/page.tsx`
- Create: `components/trading/price-chart.tsx`
- Create: `components/trading/order-panel.tsx`
- Create: `components/trading/leverage-slider.tsx`
- Create: `components/trading/positions-table.tsx`

Use `/frontend-design` skill.

**Step 1: Page layout**

Split layout — chart (60%) left, order panel (40%) right, positions table bottom.

**Step 2: Price chart**

TradingView Lightweight Charts candlestick chart. Connect to Binance WS kline stream for real-time candles.

**Step 3: Order panel**

Symbol selector (BTC/ETH + more), side buttons (Long/Short), leverage slider (1x-125x with snap points), quantity input, margin display, estimated liquidation price preview. Submit calls server action.

**Step 4: Positions table**

Live PnL from price store. Liquidation price with warning color when close. Close button.

**Step 5: Commit**

```
Add futures trading page
```

---

### Task 15: Options trading page

**Files:**
- Create: `app/(app)/trade/options/page.tsx`
- Create: `components/options/option-chain.tsx`
- Create: `components/options/payoff-diagram.tsx`
- Create: `components/options/greeks-display.tsx`
- Create: `components/options/order-panel.tsx`

Use `/frontend-design` skill.

**Step 1: Page layout**

Option chain table top, payoff diagram + order panel bottom.

**Step 2: Option chain**

Grid of strikes × expiry dates. Each cell shows calculated premium (Black-Scholes from engine), delta color-coded. Click to select.

**Step 3: Payoff diagram**

Interactive SVG payoff curve. GSAP morphing when parameters change. Shows break-even point, max loss, max profit.

**Step 4: Greeks display**

Visual gauges/bars for Delta, Gamma, Theta, Vega. Updates in real-time as price streams.

**Step 5: Order panel**

Call/Put toggle, Buy/Sell, strike selection, expiry selection, quantity, premium display. Submit calls server action.

**Step 6: Commit**

```
Add options trading page
```

---

### Task 16: Trade history page

**Files:**
- Create: `app/(app)/history/page.tsx`
- Create: `components/trading/history-table.tsx`
- Create: `components/trading/history-filters.tsx`

Use `/frontend-design` skill.

**Step 1: Server component**

Fetch trade history with filters via server actions.

**Step 2: History table**

Columns: date, type (futures/options), symbol, action, side, price, quantity, PnL. Sortable. PnL color-coded green/red.

**Step 3: Filters**

Type filter (All/Futures/Options), date range, symbol search. Client-side filtering with server-side pagination.

**Step 4: Commit**

```
Add trade history page
```

---

### Task 17: Course selection page

**Files:**
- Create: `app/(app)/learn/page.tsx`

Use `/frontend-design` skill.

**Step 1: Course cards**

Two cards — Options course (20 chapters) and Futures course. Each shows title, description, progress bar, chapter count, "Continue" or "Start" button.

**Step 2: Commit**

```
Add course selection page
```

---

### Task 18: MDX course infrastructure

**Files:**
- Create: `content/courses/options/meta.json`
- Create: `content/courses/futures/meta.json`
- Create: `app/(app)/learn/options/[slug]/page.tsx`
- Create: `app/(app)/learn/futures/[slug]/page.tsx`
- Create: `components/courses/chapter-layout.tsx`
- Create: `components/courses/chapter-sidebar.tsx`
- Create: `components/courses/mdx-components.tsx`

**Step 1: Meta files**

JSON files defining chapter order, titles, descriptions for each course.

**Step 2: Dynamic route pages**

Server components that load the MDX file for the given slug, render with `next-mdx-remote`, pass custom components.

**Step 3: Chapter layout**

Left sidebar (chapter list + progress), main content area, right sidebar (table of contents). Previous/next navigation at bottom.

**Step 4: MDX custom components**

Register custom components for MDX rendering:
- `PayoffDiagram` (placeholder — built in Task 20)
- `PriceSimulator` (placeholder)
- `GreeksVisualizer` (placeholder)
- `Quiz` (placeholder)
- `Callout` (styled tip/warning/info)
- `KeyTerm` (hover tooltip)

**Step 5: Commit**

```
Add MDX course rendering infrastructure
```

---

### Task 19: Migrate options course content to MDX

**Files:**
- Create: `content/courses/options/01-what-are-options.mdx` through `content/courses/options/20-*.mdx`

**Step 1: Extract content from existing chapter pages**

Go through each of the 20 `app/home/learn/options/chapterN/page.tsx` files. Extract the text content, convert to MDX format. Embed `<Quiz>` and `<Callout>` components where appropriate.

**Step 2: Create meta.json with chapter order**

**Step 3: Verify all 20 chapters render correctly**

**Step 4: Commit**

```
Migrate options course to MDX
```

---

### Task 20: Interactive MDX components

**Files:**
- Create: `components/courses/payoff-diagram.tsx`
- Create: `components/courses/price-simulator.tsx`
- Create: `components/courses/greeks-visualizer.tsx`
- Create: `components/courses/quiz.tsx`
- Create: `components/courses/callout.tsx`
- Create: `components/courses/key-term.tsx`

Use `/frontend-design` skill.

**Step 1: PayoffDiagram**

Interactive SVG. Drag strike price slider, watch payoff curve morph (GSAP). Show call vs put payoff. Break-even, max loss, max profit labels.

**Step 2: PriceSimulator**

Mini lightweight-charts candlestick. Play/pause button simulates price movement. Shows how a theoretical position would perform.

**Step 3: GreeksVisualizer**

Sliders for spot price, time to expiry, volatility. Shows how each Greek changes. Color-coded heatmap.

**Step 4: Quiz**

Multiple choice questions. Progress saved via server action. Shake animation on wrong answer (GSAP). Checkmark on correct.

**Step 5: Callout + KeyTerm**

Styled boxes for tips/warnings/info. KeyTerm shows hover tooltip with definition.

**Step 6: Commit**

```
Add interactive MDX components for courses
```

---

## Phase 5: Landing Page

The immersive scroll experience. This is the portfolio showcase piece.

---

### Task 21: Landing page — Hero section

**Files:**
- Modify: `app/(landing)/page.tsx`
- Create: `components/landing/hero.tsx`

Use `/frontend-design` skill.

**Step 1: Hero**

Full viewport. Bold headline with GSAP SplitText letter-by-letter animation. Animated gradient mesh background (CSS, no images). Floating trading interface mockup with parallax depth. Sound toggle (Howler ambient synth, opt-in).

**Step 2: Commit**

```
Add landing hero section
```

---

### Task 22: Landing page — Features + How It Works

**Files:**
- Create: `components/landing/features.tsx`
- Create: `components/landing/how-it-works.tsx`

Use `/frontend-design` skill.

**Step 1: Features showcase**

Three panels pinned on scroll (GSAP ScrollTrigger pin). Futures, Options, Courses. Each slides in, old fades. Mockup screenshots with animated counters.

**Step 2: How it works**

Horizontal scroll section. Three steps with SVG path-drawing animations (GSAP drawSVG-style). Sign up → Get $100K → Trade.

**Step 3: Commit**

```
Add landing features and how-it-works sections
```

---

### Task 23: Landing page — CTA + final polish

**Files:**
- Create: `components/landing/cta.tsx`
- Modify: `app/(landing)/page.tsx`

Use `/frontend-design` skill.

**Step 1: CTA section**

Magnetic hover button (GSAP, follows cursor). Background grid reacting to mouse. "Start Trading" with gradient fill. Links to Auth0 login.

**Step 2: Wire all sections together in page.tsx**

Proper scroll sequencing with Lenis + ScrollTrigger. Ensure smooth transitions between sections.

**Step 3: Commit**

```
Add landing CTA and wire scroll sequence
```

---

## Phase 6: Cleanup & Deploy

---

### Task 24: Delete old code

**Files:**
- Delete: `app/home/` (entire old app directory)
- Delete: `app/ui/` (old components)
- Delete: `app/lib/` (old server actions, data, definitions)
- Delete: `app/page.tsx` (old landing — replaced by `(landing)/page.tsx`)
- Delete: `auth.ts`, `auth.config.ts`
- Delete: `scripts/` (old DB seed script)
- Delete: `compose.yaml`, `Dockerfile` (Cloudflare Pages, not Docker)
- Clean up: `public/` — remove unused images/audio if replaced

**Step 1: Delete all old directories and files**

**Step 2: Verify `bun run build` succeeds**

**Step 3: Verify `bun run lint` passes**

**Step 4: Commit**

```
Remove legacy v1 code
```

---

### Task 25: Cloudflare Pages setup

**Files:**
- Modify: `next.config.ts` (add `@opennextjs/cloudflare` config if needed)
- Modify: `package.json` (add build script for Cloudflare)

**Step 1: Install OpenNext for Cloudflare**

```bash
bun add -d @opennextjs/cloudflare
```

**Step 2: Update build script**

```json
{
  "scripts": {
    "build:cf": "npx @opennextjs/cloudflare build"
  }
}
```

**Step 3: Verify build succeeds**

**Step 4: Commit**

```
Add Cloudflare Pages build configuration
```

---

### Task 26: Final integration pass

**Step 1: Walk through every page — verify data flows end to end**

- Landing → Auth0 login → Dashboard with real balance
- Dashboard → Futures trading → open position → see in dashboard
- Dashboard → Options trading → open position → see in dashboard
- Trade history shows all trades
- Courses load MDX, quizzes save progress
- Liquidation engine fires when price crosses threshold

**Step 2: Fix any broken connections**

**Step 3: Final commit**

```
Integration fixes and v2 ready
```

---

## Execution Order Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1–5 | Foundation: stack upgrade, auth, DB, deps, structure |
| 2 | 6–9 | Core engine: futures, options, stores, server actions |
| 3 | 10–12 | Layouts: root, landing shell, app shell |
| 4 | 13–20 | Pages: dashboard, trading, history, courses |
| 5 | 21–23 | Landing page: hero, features, CTA |
| 6 | 24–26 | Cleanup: delete old code, deploy config, integration |

Each task is one commit. 26 commits total.
