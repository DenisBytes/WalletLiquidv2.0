# WalletLiquid v2.0

Paper trading platform for crypto derivatives. Trade futures and options with fake money, learn with interactive courses.

Built with Next.js 15, deployed on Cloudflare Pages at $0/month.

## Features

**Futures Trading**
- Long/short positions with 1x–125x leverage
- Real-time prices from Binance WebSocket
- Liquidation engine, margin calculation, live PnL
- Stop-loss, take-profit, and trailing stop orders
- Funding rate simulation (8h intervals)

**Options Trading**
- Buy/sell calls and puts
- Black-Scholes pricing with Greeks (Delta, Gamma, Theta, Vega)
- Interactive payoff diagrams
- Multi-leg strategies: spreads, straddles, strangles, iron condors

**Courses**
- 20-chapter options course
- 10-chapter futures course
- Interactive MDX components: quizzes, simulators, visualizers
- Progress tracking

**Dashboard**
- Portfolio overview with sparkline
- Open positions with live PnL
- Asset allocation breakdown
- Trade history with filtering and sorting

## Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Neon Postgres + Drizzle ORM
- **Auth:** Auth0
- **Styling:** Tailwind CSS v4
- **Charts:** TradingView Lightweight Charts
- **Animations:** GSAP + ScrollTrigger + Lenis
- **State:** Zustand
- **Content:** MDX via next-mdx-remote
- **Runtime:** Cloudflare Pages (@opennextjs/cloudflare)

## Local Development

```bash
git clone https://github.com/DenisBytes/WalletLiquidv2.0.git
cd WalletLiquidv2.0
bun install
cp .env.example .env  # fill in your env vars
bun dev
```

Requires a Neon database and Auth0 tenant. See `.env.example` for required variables.

## License

MIT
