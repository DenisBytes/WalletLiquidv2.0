# WalletLiquid v2.0 — Full Refactor Design

## Goal

Incremental refactor of WalletLiquid into a premium paper trading platform for crypto derivatives (futures and options) with interactive learning courses. The most animated UI possible on the landing page, a polished premium fintech feel in the app itself.

---

## Stack

| Layer | Choice | Version | Rationale |
|-------|--------|---------|-----------|
| Framework | Next.js (App Router) | 15.x | Latest, RSC, edge-compatible |
| Runtime | Cloudflare Pages | — | Unlimited bandwidth, zero cost |
| Database | Neon Postgres | — | Serverless, auto-suspend, free tier (512MB, 190 compute hrs/mo) |
| ORM | Drizzle | latest | Type-safe, lightweight, edge-friendly |
| Auth | Auth0 (`@auth0/nextjs-auth0` v4) | 4.x | Free 7K MAU, hosted login, zero password handling |
| UI | Base UI + shadcn/ui (cherry-picked) | latest | Unstyled primitives + polished components |
| Animations | GSAP + ScrollTrigger + SplitText | 3.x | Timeline-based, performant, scroll-driven |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) | latest | Buttery scroll for landing page |
| State | Zustand | 5.x | Lightweight, sliced stores, 1KB |
| Content | MDX (`next-mdx-remote`) | latest | Courses as Markdown + embedded React components |
| Charts | TradingView Lightweight Charts | latest | Free, 40KB, built for financial data |
| Prices | Binance WebSocket API (client-side) | — | Free, real-time, no API key needed |
| Styling | Tailwind CSS | 4.x | Utility-first |
| Validation | Zod | latest | Schema validation for forms and server actions |
| Sound | Howler | latest | Landing page ambient audio (opt-in) |
| Classnames | clsx | latest | Utility |

### Dependencies to install

**Production:**
```
next react react-dom
@auth0/nextjs-auth0
drizzle-orm @neondatabase/serverless
@base-ui-components/react
tailwindcss
gsap @studio-freight/lenis
zustand
next-mdx-remote
lightweight-charts
zod clsx howler
```

**Dev:**
```
drizzle-kit
typescript @types/react @types/react-dom @types/howler
eslint eslint-config-next prettier prettier-plugin-tailwindcss
```

### Dependencies to remove

- `@vercel/postgres` — replaced by Neon
- `@vercel/speed-insights` — Cloudflare has built-in analytics
- `next-auth` — replaced by Auth0
- `next-themes` — single dark theme, handled manually
- `bcrypt` / `@types/bcrypt` — Auth0 handles password hashing
- `autoprefixer` — Tailwind v4 doesn't need it

---

## Environment Variables

```bash
# Auth0
AUTH0_SECRET='<openssl rand -hex 32>'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_TENANT.auth0.com'
AUTH0_CLIENT_ID='<from Auth0 dashboard>'
AUTH0_CLIENT_SECRET='<from Auth0 dashboard>'

# Neon Postgres
DATABASE_URL='postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/walletliquid?sslmode=require'

# Binance
NEXT_PUBLIC_BINANCE_WS_URL='wss://stream.binance.com:9443/ws'

# App
NEXT_PUBLIC_STARTING_BALANCE='100000'
```

Six environment variables total. Auth0 dashboard requires:
1. Create "Regular Web Application"
2. Allowed Callback URLs: `{BASE_URL}/api/auth/callback`
3. Allowed Logout URLs: `{BASE_URL}`
4. Allowed Web Origins: `{BASE_URL}`

---

## Project Structure

```
app/
├── (landing)/
│   ├── page.tsx                  # Immersive animated landing page
│   └── layout.tsx                # Minimal layout (no sidebar, no app shell)
├── (app)/
│   ├── layout.tsx                # App shell: sidebar + topbar + auth guard
│   ├── dashboard/page.tsx        # Portfolio command center
│   ├── trade/
│   │   ├── futures/page.tsx      # Futures trading interface
│   │   └── options/page.tsx      # Options trading interface
│   ├── history/page.tsx          # Full trade history
│   └── learn/
│       ├── page.tsx              # Course selection
│       ├── options/
│       │   └── [slug]/page.tsx   # Dynamic MDX chapter renderer
│       └── futures/
│           └── [slug]/page.tsx   # Dynamic MDX chapter renderer
├── api/
│   └── auth/[...auth0]/route.ts  # Auth0 callback handler
├── layout.tsx                    # Root layout (fonts, providers, Zustand)
└── globals.css

lib/
├── db/
│   ├── schema.ts                 # Drizzle schema (all tables)
│   ├── index.ts                  # Neon connection + Drizzle instance
│   └── migrations/               # Drizzle migration files
├── engine/
│   ├── futures.ts                # Liquidation calc, PnL, margin requirements
│   ├── options.ts                # Black-Scholes pricing, Greeks computation
│   └── types.ts                  # Shared trading types
├── stores/
│   ├── price-store.ts            # Zustand: Binance WS price stream
│   ├── trading-store.ts          # Zustand: positions, orders, balance
│   └── ui-store.ts               # Zustand: sidebar state, modals, toasts
├── actions/
│   ├── trade.ts                  # Server actions: open/close positions
│   ├── history.ts                # Server actions: fetch trade history
│   └── progress.ts              # Server actions: course progress tracking
└── utils/
    ├── format.ts                 # Currency, number, percentage formatting
    └── cn.ts                     # clsx + tailwind-merge helper

content/
├── courses/
│   ├── options/
│   │   ├── meta.json             # Title, description, chapter order
│   │   └── *.mdx                 # 20 chapters
│   └── futures/
│       ├── meta.json
│       └── *.mdx

components/
├── landing/                      # Hero, features, how-it-works, CTA sections
├── trading/                      # Chart, order panel, position cards, leverage slider
├── options/                      # Option chain table, payoff diagram, Greeks display
├── courses/                      # MDX custom components, sidebar, progress bar
├── dashboard/                    # Portfolio cards, sparklines, allocation chart
└── ui/                           # Shared: glass cards, buttons, inputs, modals
```

**Key architectural decisions:**
- Route groups `(landing)` and `(app)` share no layout — completely different visual identities
- `lib/engine/` is pure TypeScript with no React dependencies — testable and portable
- Server actions in `lib/actions/` for all DB mutations — no API routes needed beyond Auth0
- Zustand stores in `lib/stores/` — price data streams client-side, never touches the DB
- Components organized by domain, not by type

---

## Database Schema

### users
| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Auth0 `sub` claim |
| balance | decimal | Starting: $100,000 |
| createdAt | timestamp | |

### futures_positions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| userId | text (FK → users) | |
| symbol | text | e.g. BTCUSDT |
| side | enum | LONG, SHORT |
| entryPrice | decimal | |
| markPrice | decimal | Last updated mark price |
| quantity | decimal | |
| leverage | integer | 1–125 |
| liquidationPrice | decimal | Calculated at open |
| margin | decimal | Collateral locked |
| status | enum | OPEN, CLOSED, LIQUIDATED |
| openedAt | timestamp | |
| closedAt | timestamp | nullable |

### options_positions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| userId | text (FK → users) | |
| symbol | text | |
| optionType | enum | CALL, PUT |
| side | enum | BUY, SELL |
| strikePrice | decimal | |
| premium | decimal | Price paid/received |
| expirationDate | timestamp | |
| quantity | decimal | |
| greeks | jsonb | { delta, gamma, theta, vega } |
| status | enum | OPEN, EXERCISED, EXPIRED |
| openedAt | timestamp | |
| closedAt | timestamp | nullable |

### trade_history
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | |
| userId | text (FK → users) | |
| positionId | uuid | FK to futures or options position |
| type | enum | FUTURES, OPTIONS |
| action | enum | OPEN, CLOSE, LIQUIDATION, EXERCISE |
| price | decimal | Execution price |
| quantity | decimal | |
| pnl | decimal | Realized PnL (null on OPEN) |
| executedAt | timestamp | |

### course_progress
| Column | Type | Notes |
|--------|------|-------|
| userId | text (FK → users) | |
| courseId | text | "futures" or "options" |
| chapterSlug | text | |
| completedAt | timestamp | |
| PK | composite | (userId, courseId, chapterSlug) |

---

## Trading Engine

### Futures

**Liquidation price calculation (at position open):**
- Long: `entryPrice * (1 - 1/leverage + maintenanceMarginRate)`
- Short: `entryPrice * (1 + 1/leverage - maintenanceMarginRate)`
- Maintenance margin rate: 0.5% (Binance-style tiered rates documented for future)

**PnL calculation (real-time, client-side):**
- Long: `(markPrice - entryPrice) * quantity`
- Short: `(entryPrice - markPrice) * quantity`
- ROE: `pnl / margin * 100`

**Liquidation detection:**
- Zustand middleware watches Binance WS price stream
- Compares mark price against all open positions' liquidation prices
- On breach: fires server action to close position as LIQUIDATED, records in trade_history, returns margin minus losses to balance

**Margin requirements:**
- Initial margin: `(quantity * entryPrice) / leverage`
- Deducted from user balance on position open
- Returned (plus/minus PnL) on position close

### Options

**Black-Scholes pricing (client-side):**
- Inputs: spot price (Binance WS), strike price, time to expiry, volatility, risk-free rate (default 5%)
- Call: `S*N(d1) - K*e^(-rT)*N(d2)`
- Put: `K*e^(-rT)*N(-d2) - S*N(-d1)`
- Where `d1 = (ln(S/K) + (r + σ²/2)T) / (σ√T)`, `d2 = d1 - σ√T`

**Greeks (computed in real-time):**
- Delta: rate of change of option price vs underlying price
- Gamma: rate of change of delta vs underlying price
- Theta: rate of decay per day
- Vega: sensitivity to volatility changes

**Implied volatility:**
- Derived from historical price data (rolling 30-day standard deviation of log returns)
- Updated periodically, not on every tick

---

## UI Design

All UI pages and components are built using the `/frontend-design` skill for production-grade, distinctive interfaces.

### Landing Page — Immersive Synth-Wave Experience

Dark, retro-futuristic, scroll-driven. Inspired by old Tapioca XYZ aesthetic.

**Sections (single scroll journey):**

1. **Hero** — Full viewport. Headline animates letter-by-letter (GSAP SplitText). Background: animated gradient mesh (dark purples, deep blues, neon accents) shifting slowly. Floating mockup of trading interface with parallax depth. Sound toggle in corner (subtle ambient synth via Howler, opt-in).

2. **What is WalletLiquid** — Text reveals on scroll (ScrollTrigger). Punchy copy with words highlighting in accent gradient as they enter viewport.

3. **Features showcase** — Three panels that pin and swap on scroll. Futures trading, options trading, courses. Each slides in from right, old fades left. Mockup screenshots with animated number counters.

4. **How it works** — Horizontal scroll section. Three steps with SVG path-drawing animations. Sign up, get $100K, start trading.

5. **CTA** — Magnetic hover button (follows cursor slightly). Background grid lines reacting to mouse movement. "Start Trading" with gradient fill.

**Tech:** GSAP + ScrollTrigger + SplitText, Lenis smooth scroll, CSS gradient mesh backgrounds (no heavy images), Howler for audio.

### App — Premium Dark Fintech

Not the synth-wave of the landing page — its own refined premium identity.

**Design language:**
- **Palette**: Deep charcoal base (`#0A0A0F`), signature gradient accent (cool violet to electric blue). Success green, danger red for PnL. Warm grays for secondary text.
- **Glass cards**: Key data panels use frosted glass — `backdrop-blur` with 1px luminous borders. Subtle, not overdone.
- **Typography**: Inter for UI text, JetBrains Mono for all numerical/financial data. Monospace numbers align columns and feel intentional.
- **Micro-interactions**: GSAP number counters (PnL rolling up/down), staggered card entrances, tactile button hover states. Every animation serves a purpose.
- **Charts**: TradingView Lightweight Charts for candlesticks. SVG + GSAP morphing for payoff diagrams.

### Dashboard

Portfolio command center:
- Large animated portfolio value counter with sparkline trend
- Open positions as glass cards with live PnL pulsing green/red
- Asset allocation donut chart
- Recent trades as compact timeline
- Account health indicators

### Trade / Futures

Split layout:
- Left (60%): TradingView Lightweight Chart with real-time candles
- Right (40%): Order panel — leverage slider with snap points, amount input, long/short gradient buttons
- Bottom: Open positions table with live PnL, liquidation price warning, close button

### Trade / Options

Unique layout:
- Option chain table: strikes x expiry grid, Greeks in each cell, color-coded by magnitude
- Interactive payoff diagram: morphs in real-time as strike/premium adjusts (GSAP SVG morph)
- Position builder panel on right
- Greeks summary display with visual gauges

### Courses

Clean, spacious, interactive textbook feel:
- Left sidebar: chapter list with completion checkmarks, overall progress bar
- Main content: MDX rendered with generous whitespace, proper heading hierarchy
- Right sidebar (desktop): sticky "On this page" table of contents
- Bottom: previous/next chapter navigation with titles

**Custom MDX components:**
- `<PayoffDiagram />` — Interactive SVG, drag strike price, watch curve morph
- `<PriceSimulator />` — Mini candlestick chart with play/pause, simulates price movement
- `<GreeksVisualizer />` — Sliders for each variable, color-coded heatmap display
- `<Quiz />` — Inline multiple-choice, progress saved to DB
- `<Callout />` — Styled tip/warning/info boxes
- `<KeyTerm />` — Hover tooltip definitions, auto-builds glossary

---

## Deployment

### Cloudflare Pages
- Connect GitHub repo
- Build command: `npx @opennextjs/cloudflare build`
- Output directory: `.open-next`
- Environment variables set in Cloudflare dashboard
- Unlimited bandwidth, zero cost

### Neon Postgres
- Free tier: 512MB storage, 190 compute hours/month
- Auto-suspend after 5 min inactivity (stretches compute hours)
- Migrations via `drizzle-kit push` or `drizzle-kit migrate`

### Auth0
- Free tier: 7,000 monthly active users
- Hosted universal login page (no custom login UI to maintain)

### Cost: $0/month
No paid services required. All free tiers are hard-capped — no surprise billing.

---

## Future Roadmap (Not Day One)

These features are documented for future implementation. The codebase should be structured to accommodate them without major refactoring.

- **Funding rates**: Periodic application to open futures positions (every 8 hours, Binance-style)
- **Advanced order types**: Stop-loss, take-profit, trailing stop, reduce-only
- **Multi-leg option strategies**: Spreads, straddles, strangles, iron condors
- **Strategy builder UI**: Visual strategy constructor with combined payoff diagrams
- **Leaderboard**: Global PnL rankings, weekly/monthly competitions
- **Social features**: Share trades, follow traders, trade feed
- **Mobile-optimized trading**: Responsive trading interface for mobile viewports
- **Notifications**: Liquidation warnings, funding rate alerts, price alerts
- **API rate limiting**: Abuse protection for server actions
- **Portfolio analytics**: Sharpe ratio, max drawdown, win rate, risk metrics
