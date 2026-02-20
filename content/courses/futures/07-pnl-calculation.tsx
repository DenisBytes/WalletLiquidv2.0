import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">PnL Calculation</h1>

      <Callout type="info">
        In this chapter, you will learn the difference between unrealized and realized PnL, how to calculate profit and loss for long and short positions, what return on equity (ROE) means, how leverage amplifies PnL, and which fees impact your bottom line.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Unrealized vs Realized PnL</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Understanding the distinction between unrealized and realized PnL is fundamental to managing your futures positions effectively.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Unrealized PnL">The profit or loss on an open position based on the current market price. It changes in real time and only becomes real when the position is closed.</KeyTerm> represents the paper gain or loss on your currently open positions. It fluctuates with every price tick and is sometimes called "floating PnL."
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Realized PnL">The actual profit or loss recorded when a position is fully or partially closed. Once realized, it is added to or subtracted from your account balance.</KeyTerm> is locked in when you close a position. It reflects your actual gain or loss after accounting for entry price, exit price, and position size.
      </p>

      <Callout type="info">
        Unrealized PnL only becomes realized PnL when you close the trade. A position showing +$500 in unrealized profit can still end as a loss if the market reverses before you exit.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Calculating PnL for Long Positions</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you go long, you profit when the price rises and lose when the price falls.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Long PnL = (Exit Price - Entry Price) × Position Size</strong>
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You open a long position on ETH at $3,000 with a position size of 2 ETH.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>If ETH rises to $3,300: PnL = ($3,300 - $3,000) × 2 = <strong className="font-semibold text-text-primary">+$600</strong></li>
        <li>If ETH falls to $2,800: PnL = ($2,800 - $3,000) × 2 = <strong className="font-semibold text-text-primary">-$400</strong></li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Calculating PnL for Short Positions</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        When you go short, you profit when the price falls and lose when the price rises.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Short PnL = (Entry Price - Exit Price) × Position Size</strong>
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You open a short position on BTC at $60,000 with a position size of 0.5 BTC.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>If BTC falls to $57,000: PnL = ($60,000 - $57,000) × 0.5 = <strong className="font-semibold text-text-primary">+$1,500</strong></li>
        <li>If BTC rises to $62,000: PnL = ($60,000 - $62,000) × 0.5 = <strong className="font-semibold text-text-primary">-$1,000</strong></li>
      </ul>

      <Callout type="tip">
        An easy way to remember: <strong className="font-semibold text-text-primary">Longs profit from price going up, shorts profit from price going down.</strong> The PnL formula is always the difference between exit and entry, times position size, adjusted for direction.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Return on Equity (ROE)</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Return on Equity (ROE)">The percentage return on your actual invested margin, not the total position value. ROE reflects the true return on the capital you put up.</KeyTerm> measures your profit or loss as a percentage of the margin (collateral) you committed to the trade.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">ROE = (PnL / Initial Margin) × 100%</strong>
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You go long on BTC at $50,000 with 10x leverage, using $1,000 as margin (controlling a $10,000 position, or 0.2 BTC).
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        BTC rises to $52,500 — a 5% move.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>PnL = ($52,500 - $50,000) × 0.2 = $500</li>
        <li>ROE = ($500 / $1,000) × 100% = <strong className="font-semibold text-text-primary">50%</strong></li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        A 5% price increase produced a 50% return on your margin because of 10x leverage.
      </p>

      <Callout type="info">
        ROE is the most meaningful metric for evaluating leveraged trades because it shows the return on capital you actually risked, not the notional position size.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The Impact of Leverage on PnL</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Leverage is a double-edged sword. It multiplies both your profits and your losses by the same factor.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">ROE ≈ Price Change % × Leverage</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Consider a $1,000 margin position on BTC at $50,000 with different leverage levels, and BTC moves 2%:
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Leverage</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Position Size</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">PnL from +2%</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">PnL from -2%</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">ROE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">1x</td>
              <td className="py-2 px-3">$1,000</td>
              <td className="py-2 px-3">+$20</td>
              <td className="py-2 px-3">-$20</td>
              <td className="py-2 px-3">±2%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">5x</td>
              <td className="py-2 px-3">$5,000</td>
              <td className="py-2 px-3">+$100</td>
              <td className="py-2 px-3">-$100</td>
              <td className="py-2 px-3">±10%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">10x</td>
              <td className="py-2 px-3">$10,000</td>
              <td className="py-2 px-3">+$200</td>
              <td className="py-2 px-3">-$200</td>
              <td className="py-2 px-3">±20%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">25x</td>
              <td className="py-2 px-3">$25,000</td>
              <td className="py-2 px-3">+$500</td>
              <td className="py-2 px-3">-$500</td>
              <td className="py-2 px-3">±50%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">100x</td>
              <td className="py-2 px-3">$100,000</td>
              <td className="py-2 px-3">+$2,000</td>
              <td className="py-2 px-3">-$2,000</td>
              <td className="py-2 px-3">±200%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        At 100x leverage, a mere 1% move against your position results in a 100% loss of your margin — complete liquidation. High leverage makes your PnL extremely sensitive to small price fluctuations.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Fees That Affect PnL</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Your actual profit is not just entry minus exit. Several fees eat into your PnL, and ignoring them is a common mistake among new traders.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Trading Fees</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Every time you open or close a position, you pay a trading fee. Most exchanges charge:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Maker fee:</strong> 0.01-0.02% (for limit orders that add liquidity)</li>
        <li><strong className="font-semibold text-text-primary">Taker fee:</strong> 0.04-0.06% (for market orders that remove liquidity)</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        These fees are charged on the <strong className="font-semibold text-text-primary">notional value</strong> of your position, not your margin. With a $10,000 position at 0.04% taker fee, you pay $4 to open and $4 to close — a total of $8.
      </p>

      <Callout type="tip">
        Use limit orders whenever possible. The difference between maker and taker fees may seem small, but over hundreds of trades and large position sizes, it adds up significantly.
      </Callout>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Funding Rate Fees</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        Perpetual futures have no expiration, so they use funding rates to stay anchored to the spot price. Every 8 hours, either longs pay shorts or shorts pay longs. If you hold a position across a funding interval, this fee (or income) directly impacts your PnL.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        For example, if the funding rate is +0.01% and you hold a $50,000 long position, you pay $5 every 8 hours to short holders. Over a day, that is $15. Over a week, $105. These costs compound and can significantly erode profits on longer-duration trades.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Net PnL Formula</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Net PnL = Gross PnL - Opening Fee - Closing Fee ± Funding Payments</strong>
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        You go long 1 BTC at $50,000 with 10x leverage ($5,000 margin). BTC rises to $51,000 and you close.
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Gross PnL: ($51,000 - $50,000) × 1 = +$1,000</li>
        <li>Opening fee (taker, 0.04%): $50,000 × 0.04% = -$20</li>
        <li>Closing fee (maker, 0.02%): $51,000 × 0.02% = -$10.20</li>
        <li>Funding (held for 16 hours, 2 intervals at 0.01%): $50,000 × 0.01% × 2 = -$10</li>
        <li><strong className="font-semibold text-text-primary">Net PnL: $1,000 - $20 - $10.20 - $10 = $959.80</strong></li>
        <li><strong className="font-semibold text-text-primary">Net ROE: $959.80 / $5,000 = 19.2%</strong></li>
      </ul>

      <Callout type="info">
        Always factor in fees when planning your trades. A trade that looks profitable on paper can become a net loss after accounting for trading fees and funding payments, especially with frequent trading or small price targets.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        PnL calculation in futures trading extends beyond simple price differences. Leverage amplifies both gains and losses, ROE gives you the true picture of your capital efficiency, and fees — both trading and funding — can meaningfully reduce your returns. Track your net PnL, not just gross PnL, to get an honest assessment of your trading performance.
      </p>

      <Quiz
        question="If you go long on BTC at $40,000 with 20x leverage using $500 margin and BTC rises 3%, what is your approximate ROE?"
        answers={["3%", "30%", "60%"]}
        correctIndex={2}
      />
    </>
  )
}
