import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Trading Strategies</h1>

      <Callout type="info">
        In this chapter, you will learn about common futures trading strategies including trend following, mean reversion, scalping, swing trading, hedging, and dollar-cost averaging with leverage. We will also recap the key concepts from this course and discuss how to build a trading plan for paper trading.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Trend Following</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Trend following">A trading strategy that seeks to capture gains by entering positions in the direction of an established market trend and riding the move until signs of reversal appear.</KeyTerm> is one of the most reliable and widely used trading strategies.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        The core idea is simple: <strong className="font-semibold text-text-primary">the trend is your friend.</strong> When BTC is making higher highs and higher lows, you look for long entries. When it is making lower highs and lower lows, you look for short entries.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">How to Identify a Trend</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Moving averages:</strong> Price consistently above the 50-period or 200-period moving average indicates an uptrend. Below indicates a downtrend.</li>
        <li><strong className="font-semibold text-text-primary">Higher highs and higher lows</strong> for uptrends; <strong className="font-semibold text-text-primary">lower highs and lower lows</strong> for downtrends.</li>
        <li><strong className="font-semibold text-text-primary">Trendlines:</strong> Draw a line connecting swing lows in an uptrend or swing highs in a downtrend.</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Trend Following in Practice</h3>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Identify the trend direction on a higher timeframe (4-hour or daily chart).</li>
        <li>Wait for a pullback to a support level, moving average, or trendline.</li>
        <li>Enter in the direction of the trend with a stop-loss below the recent swing low (for longs).</li>
        <li>Let the position run with a trailing stop until the trend structure breaks.</li>
      </ol>

      <Callout type="tip">
        Trade in the direction of the higher-timeframe trend and use lower timeframes for entries. A long on the 15-minute chart that aligns with a daily uptrend has much better odds than one that fights the daily trend.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Mean Reversion</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Mean reversion">A strategy based on the idea that price tends to return to its average or mean level after making extreme moves in either direction.</KeyTerm> takes the opposite approach to trend following. Instead of riding momentum, you bet that overextended moves will snap back.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">When Mean Reversion Works</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>BTC has dropped 15% in 24 hours on no fundamental news — a bounce is likely.</li>
        <li>The price has moved multiple standard deviations away from a moving average.</li>
        <li>Funding rates are extremely negative (heavy shorting), suggesting a potential short squeeze.</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Tools for Mean Reversion</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Bollinger Bands:</strong> When price touches or pierces the outer band, a reversion to the middle band (20-period moving average) is anticipated.</li>
        <li><strong className="font-semibold text-text-primary">RSI (Relative Strength Index):</strong> Readings above 70 suggest overbought conditions; below 30 suggest oversold.</li>
        <li><strong className="font-semibold text-text-primary">Funding rate extremes:</strong> Very high positive funding suggests the market is overextended long; very negative funding suggests overextended short.</li>
      </ul>

      <Callout type="warning">
        Mean reversion is dangerous in strongly trending markets. A "cheap" price can always get cheaper. Always use stop-losses and confirm reversal signals before entering mean reversion trades.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Scalping</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Scalping">A high-frequency trading style that aims to capture very small price movements (often just a few basis points) through rapid entries and exits, typically within minutes.</KeyTerm> involves taking many small trades throughout the day, capturing tiny price movements with leverage.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Characteristics of Scalping</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Timeframe:</strong> 1-minute to 5-minute charts</li>
        <li><strong className="font-semibold text-text-primary">Hold time:</strong> Seconds to minutes</li>
        <li><strong className="font-semibold text-text-primary">Target:</strong> 0.05-0.3% per trade</li>
        <li><strong className="font-semibold text-text-primary">Leverage:</strong> Often higher (10-20x) due to small price targets</li>
        <li><strong className="font-semibold text-text-primary">Volume:</strong> Many trades per session (10-50+)</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Requirements for Scalping</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Fast execution and reliable internet connection</li>
        <li>Very tight spreads and low trading fees (maker orders are essential)</li>
        <li>Strong focus and screen time</li>
        <li>Strict discipline to cut losers immediately</li>
      </ul>

      <Callout type="info">
        Scalping is the most demanding trading style in terms of time, focus, and execution speed. Fees play an outsized role — a 0.04% taker fee on both entry and exit consumes 0.08% of your position, which can erase the profit from a 0.1% scalp.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Swing Trading</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Swing trading">A medium-term strategy that captures price moves over days to weeks by identifying "swings" between support and resistance levels.</KeyTerm> sits between scalping and long-term holding. It is often considered the most practical style for non-professional traders.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">How Swing Trading Works</h3>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Identify a trading range or trend on the daily chart.</li>
        <li>Wait for price to reach a key level (support, resistance, or a Fibonacci retracement).</li>
        <li>Enter a position with a stop-loss on the other side of the key level.</li>
        <li>Hold for days to weeks, targeting the next major level.</li>
      </ol>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        ETH is trading in a range between $2,800 (support) and $3,200 (resistance). You go long at $2,850 with a stop at $2,750 and a target at $3,150.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Risk: $100 per ETH</li>
        <li>Reward: $300 per ETH</li>
        <li>Risk-reward ratio: 1:3</li>
      </ul>

      <Callout type="tip">
        Swing trading is well-suited for futures because moderate leverage (3-5x) can amplify returns on multi-day moves without the liquidation risk that comes with scalping at 20x. It also requires far less screen time than scalping.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Hedging with Futures</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Hedging">Using a futures position to offset potential losses in an existing portfolio or position, reducing overall risk exposure.</KeyTerm> is not about making money — it is about protecting it.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Scenario: Protecting a Spot Portfolio</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You hold 2 BTC in your wallet at $50,000 each ($100,000 total). You are concerned about a short-term downturn but do not want to sell your BTC.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Solution:</strong> Open a short BTC perpetual position worth $100,000. If BTC drops 10%, your spot holdings lose $10,000, but your short position gains approximately $10,000. Your portfolio value stays roughly flat regardless of price direction.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Partial Hedging</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You do not have to hedge 100% of your exposure. A 50% hedge (shorting $50,000 against a $100,000 spot position) reduces your downside exposure by half while still allowing you to benefit from upside movement.
      </p>

      <Callout type="info">
        Hedging turns futures from a speculative tool into a risk management tool. Institutional traders and funds use futures hedging extensively to manage portfolio risk without liquidating core positions.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Dollar-Cost Averaging with Leverage</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Dollar-cost averaging (DCA)">A strategy where a trader enters a position incrementally over time rather than all at once, reducing the impact of short-term price volatility on the average entry price.</KeyTerm> can be adapted for futures trading, though it requires careful risk management.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">How It Works</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Instead of entering your full position at once, you split it into multiple entries:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Open 25% of your intended position at the current price.</li>
        <li>If price moves against you by a set amount (e.g., 2%), add another 25%.</li>
        <li>Continue scaling in at predetermined levels.</li>
        <li>Your average entry price improves with each addition.</li>
      </ol>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You want to go long 1 BTC. Instead of entering all at $50,000:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Buy 0.25 BTC at $50,000</li>
        <li>Buy 0.25 BTC at $49,000</li>
        <li>Buy 0.25 BTC at $48,000</li>
        <li>Buy 0.25 BTC at $47,000</li>
        <li>Average entry: $48,500</li>
      </ul>

      <Callout type="warning">
        DCA into a losing futures position is risky. You are adding leverage to a trade that is already going against you. Always have a hard stop for the entire position — if price reaches your invalidation level, close everything. Never DCA without a maximum loss defined.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Course Recap</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Over the last ten chapters, we have covered the full foundation of futures trading:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">What futures are</strong> — derivative contracts that let you trade price movements without owning the asset.</li>
        <li><strong className="font-semibold text-text-primary">Perpetual contracts</strong> — futures without expiration dates, unique to crypto markets.</li>
        <li><strong className="font-semibold text-text-primary">Long and short</strong> — profiting from both rising and falling markets.</li>
        <li><strong className="font-semibold text-text-primary">Leverage</strong> — amplifying position size with borrowed capital.</li>
        <li><strong className="font-semibold text-text-primary">Margin</strong> — the collateral required to maintain leveraged positions.</li>
        <li><strong className="font-semibold text-text-primary">Liquidation</strong> — how positions are forcibly closed and how to avoid it.</li>
        <li><strong className="font-semibold text-text-primary">PnL calculation</strong> — unrealized vs realized PnL, ROE, and the impact of fees.</li>
        <li><strong className="font-semibold text-text-primary">Funding rates</strong> — the mechanism that anchors perpetual prices to spot.</li>
        <li><strong className="font-semibold text-text-primary">Risk management</strong> — position sizing, stop-losses, and emotional discipline.</li>
        <li><strong className="font-semibold text-text-primary">Trading strategies</strong> — practical approaches to the market.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Building a Trading Plan</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Before you start trading — even with paper money — write down a plan that covers:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">What you will trade:</strong> Stick to 1-2 assets (BTC and ETH) until you are consistent.</li>
        <li><strong className="font-semibold text-text-primary">Your timeframe:</strong> Are you scalping, swing trading, or trend following?</li>
        <li><strong className="font-semibold text-text-primary">Entry criteria:</strong> What conditions must be met before you enter a trade?</li>
        <li><strong className="font-semibold text-text-primary">Exit criteria:</strong> Where is your stop-loss? Where is your take-profit?</li>
        <li><strong className="font-semibold text-text-primary">Position sizing:</strong> How much of your account will you risk per trade?</li>
        <li><strong className="font-semibold text-text-primary">Leverage:</strong> What leverage will you use? (Start with 3-5x.)</li>
        <li><strong className="font-semibold text-text-primary">Daily loss limit:</strong> At what point do you stop trading for the day?</li>
        <li><strong className="font-semibold text-text-primary">Review process:</strong> How and when will you review your trades?</li>
      </ul>

      <Callout type="info">
        A trading plan removes emotion from decision-making. When you have a written plan, you do not need to make judgment calls in the heat of the moment — you simply follow the rules you set during calm, rational analysis.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Advice for Paper Trading</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Paper trading is your training ground. Here is how to get the most out of it:
      </p>

      <ol className="list-decimal list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Treat it like real money.</strong> The habits you build in paper trading will carry over to live trading. If you take reckless risks with paper money, you will do the same with real capital.</li>
        <li><strong className="font-semibold text-text-primary">Track everything.</strong> Log every trade — entry, exit, position size, reasoning, and outcome. Your trading journal is your most valuable learning tool.</li>
        <li><strong className="font-semibold text-text-primary">Focus on process, not profits.</strong> A great trade is one where you followed your plan, regardless of whether it won or lost. A bad trade is one where you deviated from your plan, even if it was profitable.</li>
        <li><strong className="font-semibold text-text-primary">Start with low leverage.</strong> Begin with 2-3x leverage. Once you are consistently following your plan and managing risk, gradually increase.</li>
        <li><strong className="font-semibold text-text-primary">Paper trade for at least 30 days</strong> before considering real capital. This gives you enough data to evaluate whether your strategy has an edge.</li>
      </ol>

      <Callout type="tip">
        WalletLiquid gives you a risk-free environment to practice everything you have learned in this course. Open positions, experience liquidation, pay funding rates, and learn from mistakes — all without losing a single dollar.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        There is no single "best" strategy — the best strategy is the one that fits your personality, time availability, and risk tolerance. Start with paper trading, keep a journal, follow your plan, and prioritize risk management above everything else. Consistent profitability comes from disciplined execution, not from finding the perfect indicator or setup.
      </p>

      <Quiz
        question="What is the primary benefit of paper trading before using real capital?"
        answers={["Paper trading guarantees profits when switching to live trading", "It allows you to build disciplined habits and test your strategy without financial risk", "Paper trading uses different market data than live trading"]}
        correctIndex={1}
      />
    </>
  )
}
