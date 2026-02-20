import { Callout } from '@/components/courses/callout'
import { KeyTerm } from '@/components/courses/key-term'
import { Quiz } from '@/components/courses/quiz'

export default function Chapter() {
  return (
    <>
      <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">Risk Management</h1>

      <Callout type="info">
        In this chapter, you will learn about position sizing, risk-reward ratios, stop-loss and take-profit orders, the 1-2% rule, how to avoid overleveraging, emotional discipline, drawdown management, and correlation risk.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Why Risk Management Is Everything</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The difference between consistently profitable futures traders and those who blow up their accounts is not better predictions — it is better risk management. You can be wrong on more than half your trades and still be profitable if your winners are larger than your losers and your position sizes are controlled.
      </p>

      <Callout type="warning">
        Without a defined risk management framework, leveraged futures trading is indistinguishable from gambling. A single unmanaged trade can destroy weeks or months of profits.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Position Sizing</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Position sizing">The process of determining how large a position to take on a given trade, based on your account size, risk tolerance, and the specific trade setup.</KeyTerm> is the foundation of risk management. It answers the question: "How much should I put into this trade?"
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Fixed Percentage Method</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        The most common approach is to risk a fixed percentage of your total account on each trade. This means calculating your position size based on your stop-loss distance and the amount you are willing to lose.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        <strong className="font-semibold text-text-primary">Position Size = (Account Balance × Risk %) / (Entry Price - Stop-Loss Price)</strong>
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Example</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Account balance: $10,000</li>
        <li>Risk per trade: 2% = $200</li>
        <li>Entry price (long BTC): $50,000</li>
        <li>Stop-loss: $49,000 (2% below entry)</li>
        <li>Position size: $200 / ($50,000 - $49,000) = 0.2 BTC ($10,000 notional)</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        This means you would use leverage to control a $10,000 position while only risking $200 if your stop is hit.
      </p>

      <Callout type="tip">
        Always calculate your position size from your risk tolerance, not the other way around. Decide how much you can afford to lose first, then determine the appropriate position size.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Risk-Reward Ratio</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Risk-reward ratio">The ratio between the potential loss (risk) and the potential gain (reward) of a trade. A 1:3 ratio means you risk $1 to potentially make $3.</KeyTerm> helps you evaluate whether a trade is worth taking.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        A minimum risk-reward ratio of <strong className="font-semibold text-text-primary">1:2</strong> is a widely recommended baseline. This means for every $1 you risk, you target at least $2 in profit.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Why This Matters</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        With a 1:2 risk-reward ratio, you only need to win <strong className="font-semibold text-text-primary">34% of your trades</strong> to break even. With a 1:3 ratio, you only need a 25% win rate.
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-text-secondary text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Risk:Reward</th>
              <th className="text-left py-2 px-3 font-semibold text-text-primary">Required Win Rate to Break Even</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-3">1:1</td>
              <td className="py-2 px-3">50%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">1:2</td>
              <td className="py-2 px-3">34%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">1:3</td>
              <td className="py-2 px-3">25%</td>
            </tr>
            <tr>
              <td className="py-2 px-3">1:4</td>
              <td className="py-2 px-3">20%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info">
        A high risk-reward ratio gives you a mathematical edge. Even mediocre trade selection can be profitable if you consistently cut losses short and let winners run.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Stop-Loss and Take-Profit Orders</h2>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Stop-Loss Orders</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        A <KeyTerm term="Stop-loss order">An order placed to automatically close a position at a predetermined price level to limit losses.</KeyTerm> is your primary defense against catastrophic losses.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        Rules for setting stop-losses:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Place them at technically meaningful levels (support/resistance, recent swing lows/highs), not arbitrary percentages.</li>
        <li>Your stop-loss should always trigger before your liquidation price.</li>
        <li>Never widen your stop-loss on a losing trade. This is one of the most destructive habits in trading.</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Take-Profit Orders</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        A take-profit order locks in gains when price reaches your target. Consider scaling out — closing 50% of the position at your first target and letting the rest run with a trailing stop.
      </p>

      <Callout type="tip">
        Set both your stop-loss and take-profit before entering a trade. If you cannot define where you would exit at a loss and at a profit, you do not have a trade — you have a gamble.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">The 1-2% Rule</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        The 1-2% rule states: <strong className="font-semibold text-text-primary">never risk more than 1-2% of your total account balance on a single trade.</strong>
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        This sounds conservative, but it is the single most important rule for long-term survival.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Why It Works</h3>

      <p className="text-text-secondary leading-relaxed mb-4">
        With a $10,000 account risking 2% per trade:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>After 5 consecutive losses: $10,000 → $9,039 (a 9.6% drawdown)</li>
        <li>After 10 consecutive losses: $10,000 → $8,171 (an 18.3% drawdown)</li>
      </ul>

      <p className="text-text-secondary leading-relaxed mb-4">
        Compare this to risking 10% per trade:
      </p>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>After 5 consecutive losses: $10,000 → $5,905 (a 41% drawdown)</li>
        <li>After 10 consecutive losses: $10,000 → $3,487 (a 65% drawdown)</li>
      </ul>

      <Callout type="warning">
        Recovering from drawdowns gets exponentially harder. A 50% loss requires a 100% gain to recover. A 75% loss requires a 300% gain. The 1-2% rule keeps drawdowns manageable and recoverable.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Avoiding Overleveraging</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Overleveraging is the most common way traders blow up their accounts. Just because an exchange offers 125x leverage does not mean you should use it.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Practical Leverage Guidelines</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Conservative:</strong> 2-5x leverage — suitable for swing trades held for days or weeks</li>
        <li><strong className="font-semibold text-text-primary">Moderate:</strong> 5-10x leverage — suitable for intraday trades with defined stops</li>
        <li><strong className="font-semibold text-text-primary">Aggressive:</strong> 10-20x leverage — only for experienced traders with tight stops and small position sizes</li>
        <li><strong className="font-semibold text-text-primary">Extreme (20x+):</strong> Essentially gambling unless combined with very tight risk controls</li>
      </ul>

      <Callout type="info">
        Your effective leverage should be determined by your position size and stop-loss, not the leverage multiplier itself. Even at 20x leverage, if your position size is small relative to your account, your actual risk can be well-controlled.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Emotional Discipline</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Technical risk management only works if you actually follow it. Emotional trading is the primary reason traders deviate from their plans.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Common Emotional Traps</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">Revenge trading:</strong> Immediately entering another trade after a loss to "win back" the money. This leads to impulsive, oversized positions.</li>
        <li><strong className="font-semibold text-text-primary">FOMO (Fear of Missing Out):</strong> Entering a trade too late because the price has already moved, chasing the market.</li>
        <li><strong className="font-semibold text-text-primary">Moving stop-losses:</strong> Widening your stop because you "believe" the trade will eventually work out.</li>
        <li><strong className="font-semibold text-text-primary">Overtrading:</strong> Taking trades that do not meet your criteria simply because you want to be in the market.</li>
      </ul>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">How to Maintain Discipline</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Trade with a written plan — entry, stop-loss, take-profit, and position size defined before you execute.</li>
        <li>Set a daily loss limit. If you lose 3-5% of your account in a day, stop trading and walk away.</li>
        <li>Keep a trading journal. Review your trades weekly to identify emotional patterns.</li>
      </ul>

      <Callout type="tip">
        Paper trading on a platform like WalletLiquid is the ideal place to develop emotional discipline. The absence of real money allows you to focus on process over outcomes and build habits before live trading.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Drawdown Management</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Drawdown">The peak-to-trough decline in your account balance, measured as a percentage from the highest point to the lowest point before a new high is reached.</KeyTerm> is a natural part of trading. Managing it is about survival.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Drawdown Recovery Plan</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li><strong className="font-semibold text-text-primary">0-10% drawdown:</strong> Normal. Continue trading your plan.</li>
        <li><strong className="font-semibold text-text-primary">10-20% drawdown:</strong> Reduce position sizes by 50%. Review your recent trades for pattern errors.</li>
        <li><strong className="font-semibold text-text-primary">20-30% drawdown:</strong> Stop live trading. Return to paper trading or take a break. Something in your strategy or execution needs fixing.</li>
        <li><strong className="font-semibold text-text-primary">30%+ drawdown:</strong> Full stop. A drawdown this deep usually indicates a fundamental issue — either the strategy is broken or emotional discipline has collapsed.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Correlation Risk</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        <KeyTerm term="Correlation risk">The risk that arises when multiple positions in your portfolio move in the same direction simultaneously, creating concentrated exposure to a single market move.</KeyTerm> is an often-overlooked danger in crypto futures trading.
      </p>

      <p className="text-text-secondary leading-relaxed mb-4">
        If you are long BTC, long ETH, and long SOL simultaneously, you might think you have three separate trades. In reality, during a market-wide sell-off, all three will drop together. You effectively have one highly concentrated bet on the crypto market going up.
      </p>

      <h3 className="text-xl font-medium text-text-primary mt-4 mb-2">Managing Correlation</h3>

      <ul className="list-disc list-inside text-text-secondary space-y-1 mb-4 ml-2">
        <li>Treat correlated positions as a single combined position for risk purposes.</li>
        <li>If you are long BTC and long ETH, your total risk is not isolated — calculate your combined notional exposure.</li>
        <li>Consider offsetting positions (one long, one short) on correlated assets to reduce net directional risk.</li>
      </ul>

      <Callout type="warning">
        Crypto assets are highly correlated during sell-offs. Diversifying across multiple altcoin longs does not reduce risk the way diversifying across uncorrelated asset classes would.
      </Callout>

      <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">Key Takeaways</h2>

      <p className="text-text-secondary leading-relaxed mb-4">
        Risk management is the only edge that every trader can control. Size positions conservatively using the 1-2% rule, always use stop-losses, maintain a minimum 1:2 risk-reward ratio, and respect drawdown limits. Emotional discipline and awareness of correlation risk are just as important as technical setups.
      </p>

      <Quiz
        question="If you have a $10,000 account and follow the 2% rule, what is the maximum amount you should risk on a single trade?"
        answers={["$500", "$200", "$1,000"]}
        correctIndex={1}
      />
    </>
  )
}
